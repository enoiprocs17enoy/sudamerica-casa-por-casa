
const $=id=>document.getElementById(id),MDP=[-38.0055,-57.5426],BA=[-34.6037,-58.3816],CORD=[-31.4201,-64.1888];
const map=L.map('map',{zoomSnap:.25,zoomDelta:.5,minZoom:1,maxZoom:19,maxBounds:[[-85.05,-180],[85.05,180]],maxBoundsViscosity:.8,preferCanvas:true}).setView([15,0],2);
// Accurate Natural Earth / GSHHG land outlines (offline bundled). No guessed
// continent polygon and no dependency on an external atlas download.
const geo=L.geoJSON(window.WORLD_LAND_DETAIL||window.WORLD_LAND||window.CONTINENT_LAND,{style:{color:'#729d7b',weight:.75,fillColor:'#d4e8c9',fillOpacity:1},interactive:false}).addTo(map);
// South American demo cities. Geographic markers use real coordinates;
// each 3D city is a separately generated virtual city, not satellite imagery.
const CITY_CATALOG=[
 {id:'ar-mar-del-plata',name:'Mar del Plata',country:'Argentina',lat:-38.0055,lng:-57.5426,pop:500},
 {id:'ar-buenos-aires',name:'Buenos Aires',country:'Argentina',lat:-34.6037,lng:-58.3816,pop:1800},
 {id:'ar-cordoba',name:'Córdoba',country:'Argentina',lat:-31.4201,lng:-64.1888,pop:650},
 {id:'ar-rosario',name:'Rosario',country:'Argentina',lat:-32.9442,lng:-60.6505,pop:350},
 {id:'uy-montevideo',name:'Montevideo',country:'Uruguay',lat:-34.9011,lng:-56.1645,pop:520},
 {id:'cl-santiago',name:'Santiago',country:'Cile',lat:-33.4489,lng:-70.6693,pop:1400},
 {id:'cl-valparaiso',name:'Valparaíso',country:'Cile',lat:-33.0472,lng:-71.6127,pop:270},
 {id:'br-sao-paulo',name:'São Paulo',country:'Brasile',lat:-23.5505,lng:-46.6333,pop:2200},
 {id:'br-rio',name:'Rio de Janeiro',country:'Brasile',lat:-22.9068,lng:-43.1729,pop:1200},
 {id:'br-brasilia',name:'Brasília',country:'Brasile',lat:-15.7939,lng:-47.8828,pop:390},
 {id:'br-salvador',name:'Salvador',country:'Brasile',lat:-12.9777,lng:-38.5016,pop:340},
 {id:'py-asuncion',name:'Asunción',country:'Paraguay',lat:-25.2637,lng:-57.5759,pop:310},
 {id:'bo-la-paz',name:'La Paz',country:'Bolivia',lat:-16.4897,lng:-68.1193,pop:380},
 {id:'pe-lima',name:'Lima',country:'Perù',lat:-12.0464,lng:-77.0428,pop:1250},
 {id:'pe-cusco',name:'Cusco',country:'Perù',lat:-13.5319,lng:-71.9675,pop:210},
 {id:'ec-quito',name:'Quito',country:'Ecuador',lat:-0.1807,lng:-78.4678,pop:540},
 {id:'ec-guayaquil',name:'Guayaquil',country:'Ecuador',lat:-2.1709,lng:-79.9224,pop:440},
 {id:'co-bogota',name:'Bogotá',country:'Colombia',lat:4.7110,lng:-74.0721,pop:1600},
 {id:'co-medellin',name:'Medellín',country:'Colombia',lat:6.2442,lng:-75.5812,pop:740},
 {id:'co-cartagena',name:'Cartagena',country:'Colombia',lat:10.3910,lng:-75.4794,pop:280},
 {id:'ve-caracas',name:'Caracas',country:'Venezuela',lat:10.4806,lng:-66.9036,pop:780},
 {id:'gy-georgetown',name:'Georgetown',country:'Guyana',lat:6.8013,lng:-58.1551,pop:170},
 {id:'sr-paramaribo',name:'Paramaribo',country:'Suriname',lat:5.8520,lng:-55.2038,pop:150}
,
 {id:'ar-la-plata',name:'La Plata',country:'Argentina',lat:-34.92,lng:-57.95,pop:620},
 {id:'ar-bahia-blanca',name:'Bahía Blanca',country:'Argentina',lat:-38.72,lng:-62.27,pop:260},
 {id:'ar-tandil',name:'Tandil',country:'Argentina',lat:-37.32,lng:-59.14,pop:120},
 {id:'ar-necochea',name:'Necochea',country:'Argentina',lat:-38.55,lng:-58.74,pop:90},
 {id:'ar-santa-fe',name:'Santa Fe',country:'Argentina',lat:-31.63,lng:-60.7,pop:320},
 {id:'ar-parana',name:'Paraná',country:'Argentina',lat:-31.73,lng:-60.53,pop:210},
 {id:'ar-rafaela',name:'Rafaela',country:'Argentina',lat:-31.25,lng:-61.49,pop:75},
 {id:'ar-san-nicolas',name:'San Nicolás',country:'Argentina',lat:-33.33,lng:-60.22,pop:110},
 {id:'ar-san-luis',name:'San Luis',country:'Argentina',lat:-33.3,lng:-66.34,pop:130},
 {id:'ar-mendoza',name:'Mendoza',country:'Argentina',lat:-32.89,lng:-68.84,pop:500},
 {id:'ar-san-juan',name:'San Juan',country:'Argentina',lat:-31.54,lng:-68.54,pop:240},
 {id:'ar-san-rafael',name:'San Rafael',country:'Argentina',lat:-34.62,lng:-68.33,pop:120},
 {id:'ar-villa-mercedes',name:'Villa Mercedes',country:'Argentina',lat:-33.68,lng:-65.46,pop:85},
 {id:'ar-rio-cuarto',name:'Río Cuarto',country:'Argentina',lat:-33.13,lng:-64.35,pop:145},
 {id:'ar-villa-maria',name:'Villa María',country:'Argentina',lat:-32.41,lng:-63.24,pop:90},
 {id:'ar-rio-tercero',name:'Río Tercero',country:'Argentina',lat:-32.18,lng:-64.11,pop:50},
 {id:'ar-salta',name:'Salta',country:'Argentina',lat:-24.79,lng:-65.41,pop:360},
 {id:'ar-jujuy',name:'Jujuy',country:'Argentina',lat:-24.19,lng:-65.3,pop:180},
 {id:'ar-tucuman',name:'Tucumán',country:'Argentina',lat:-26.83,lng:-65.22,pop:410},
 {id:'ar-santiago-del-estero',name:'Santiago del Estero',country:'Argentina',lat:-27.78,lng:-64.26,pop:190},
 {id:'ar-catamarca',name:'Catamarca',country:'Argentina',lat:-28.47,lng:-65.78,pop:120},
 {id:'ar-la-rioja',name:'La Rioja',country:'Argentina',lat:-29.41,lng:-66.86,pop:120},
 {id:'ar-resistencia',name:'Resistencia',country:'Argentina',lat:-27.45,lng:-58.99,pop:230},
 {id:'ar-corrientes',name:'Corrientes',country:'Argentina',lat:-27.47,lng:-58.83,pop:210},
 {id:'ar-posadas',name:'Posadas',country:'Argentina',lat:-27.37,lng:-55.9,pop:200},
 {id:'ar-formosa',name:'Formosa',country:'Argentina',lat:-26.18,lng:-58.18,pop:150},
 {id:'ar-concordia',name:'Concordia',country:'Argentina',lat:-31.39,lng:-58.02,pop:130},
 {id:'ar-gualeguaychu',name:'Gualeguaychú',country:'Argentina',lat:-33.01,lng:-58.52,pop:100},
 {id:'ar-neuquen',name:'Neuquén',country:'Argentina',lat:-38.95,lng:-68.06,pop:190},
 {id:'ar-general-roca',name:'General Roca',country:'Argentina',lat:-39.03,lng:-67.58,pop:90},
 {id:'ar-bariloche',name:'Bariloche',country:'Argentina',lat:-41.13,lng:-71.31,pop:130},
 {id:'ar-puerto-madryn',name:'Puerto Madryn',country:'Argentina',lat:-42.77,lng:-65.04,pop:85},
 {id:'ar-trelew',name:'Trelew',country:'Argentina',lat:-43.25,lng:-65.31,pop:95},
 {id:'ar-comodoro-rivadavia',name:'Comodoro Rivadavia',country:'Argentina',lat:-45.86,lng:-67.48,pop:160},
 {id:'ar-rio-gallegos',name:'Río Gallegos',country:'Argentina',lat:-51.62,lng:-69.22,pop:75},
 {id:'ar-ushuaia',name:'Ushuaia',country:'Argentina',lat:-54.81,lng:-68.31,pop:55},
 {id:'br-campinas',name:'Campinas',country:'Brasile',lat:-22.91,lng:-47.06,pop:720},
 {id:'br-santos',name:'Santos',country:'Brasile',lat:-23.91685,lng:-46.39229,pop:340},
 {id:'br-sorocaba',name:'Sorocaba',country:'Brasile',lat:-23.5,lng:-47.46,pop:370},
 {id:'br-sao-jose-dos-campos',name:'São José dos Campos',country:'Brasile',lat:-23.18,lng:-45.88,pop:390},
 {id:'br-ribeirao-preto',name:'Ribeirão Preto',country:'Brasile',lat:-21.18,lng:-47.81,pop:370},
 {id:'br-sao-jose-do-rio-preto',name:'São José do Rio Preto',country:'Brasile',lat:-20.81,lng:-49.38,pop:250},
 {id:'br-bauru',name:'Bauru',country:'Brasile',lat:-22.32,lng:-49.07,pop:230},
 {id:'br-piracicaba',name:'Piracicaba',country:'Brasile',lat:-22.73,lng:-47.65,pop:230},
 {id:'br-jundiai',name:'Jundiaí',country:'Brasile',lat:-23.19,lng:-46.88,pop:240},
 {id:'br-niteroi',name:'Niterói',country:'Brasile',lat:-22.88,lng:-43.1,pop:300},
 {id:'br-petropolis',name:'Petrópolis',country:'Brasile',lat:-22.51,lng:-43.18,pop:180},
 {id:'br-volta-redonda',name:'Volta Redonda',country:'Brasile',lat:-22.52,lng:-44.1,pop:170},
 {id:'br-belo-horizonte',name:'Belo Horizonte',country:'Brasile',lat:-19.92,lng:-43.94,pop:1350},
 {id:'br-uberlandia',name:'Uberlândia',country:'Brasile',lat:-18.92,lng:-48.28,pop:380},
 {id:'br-uberaba',name:'Uberaba',country:'Brasile',lat:-19.75,lng:-47.93,pop:180},
 {id:'br-juiz-de-fora',name:'Juiz de Fora',country:'Brasile',lat:-21.76,lng:-43.35,pop:320},
 {id:'br-montes-claros',name:'Montes Claros',country:'Brasile',lat:-16.73,lng:-43.86,pop:230},
 {id:'br-vitoria',name:'Vitória',country:'Brasile',lat:-20.32,lng:-40.34,pop:270},
 {id:'br-vila-velha',name:'Vila Velha',country:'Brasile',lat:-20.33,lng:-40.29,pop:290},
 {id:'br-curitiba',name:'Curitiba',country:'Brasile',lat:-25.43,lng:-49.27,pop:1080},
 {id:'br-londrina',name:'Londrina',country:'Brasile',lat:-23.31,lng:-51.16,pop:330},
 {id:'br-maringa',name:'Maringá',country:'Brasile',lat:-23.42,lng:-51.93,pop:260},
 {id:'br-cascavel',name:'Cascavel',country:'Brasile',lat:-24.96,lng:-53.46,pop:210},
 {id:'br-foz-do-iguacu',name:'Foz do Iguaçu',country:'Brasile',lat:-25.55,lng:-54.59,pop:190},
 {id:'br-ponta-grossa',name:'Ponta Grossa',country:'Brasile',lat:-25.09,lng:-50.16,pop:210},
 {id:'br-florianopolis',name:'Florianópolis',country:'Brasile',lat:-27.59,lng:-48.55,pop:350},
 {id:'br-joinville',name:'Joinville',country:'Brasile',lat:-26.3,lng:-48.85,pop:320},
 {id:'br-blumenau',name:'Blumenau',country:'Brasile',lat:-26.92,lng:-49.07,pop:230},
 {id:'br-itajai',name:'Itajaí',country:'Brasile',lat:-26.91,lng:-48.66,pop:150},
 {id:'br-chapeco',name:'Chapecó',country:'Brasile',lat:-27.1,lng:-52.62,pop:145},
 {id:'br-criciuma',name:'Criciúma',country:'Brasile',lat:-28.68,lng:-49.37,pop:130},
 {id:'br-porto-alegre',name:'Porto Alegre',country:'Brasile',lat:-30.03,lng:-51.23,pop:980},
 {id:'br-caxias-do-sul',name:'Caxias do Sul',country:'Brasile',lat:-29.17,lng:-51.18,pop:320},
 {id:'br-pelotas',name:'Pelotas',country:'Brasile',lat:-31.77,lng:-52.34,pop:230},
 {id:'br-santa-maria',name:'Santa Maria',country:'Brasile',lat:-29.69,lng:-53.81,pop:190},
 {id:'br-novo-hamburgo',name:'Novo Hamburgo',country:'Brasile',lat:-29.69,lng:-51.13,pop:170},
 {id:'br-rio-grande',name:'Rio Grande',country:'Brasile',lat:-32.04,lng:-52.1,pop:150},
 {id:'br-goiania',name:'Goiânia',country:'Brasile',lat:-16.68,lng:-49.25,pop:900},
 {id:'br-anapolis',name:'Anápolis',country:'Brasile',lat:-16.33,lng:-48.95,pop:230},
 {id:'br-campo-grande',name:'Campo Grande',country:'Brasile',lat:-20.47,lng:-54.62,pop:550},
 {id:'br-dourados',name:'Dourados',country:'Brasile',lat:-22.22,lng:-54.81,pop:160},
 {id:'br-cuiaba',name:'Cuiabá',country:'Brasile',lat:-15.6,lng:-56.1,pop:390},
 {id:'br-rondonopolis',name:'Rondonópolis',country:'Brasile',lat:-16.47,lng:-54.64,pop:155},
 {id:'br-manaus',name:'Manaus',country:'Brasile',lat:-3.12,lng:-60.02,pop:1250},
 {id:'br-belem',name:'Belém',country:'Brasile',lat:-1.65340,lng:-48.56290,pop:920},
 {id:'br-santarem',name:'Santarém',country:'Brasile',lat:-2.44,lng:-54.71,pop:180},
 {id:'br-macapa',name:'Macapá',country:'Brasile',lat:0.04,lng:-51.07,pop:300},
 {id:'br-boa-vista',name:'Boa Vista',country:'Brasile',lat:2.82,lng:-60.67,pop:240},
 {id:'br-porto-velho',name:'Porto Velho',country:'Brasile',lat:-8.76,lng:-63.9,pop:330},
 {id:'br-rio-branco',name:'Rio Branco',country:'Brasile',lat:-9.97,lng:-67.81,pop:250},
 {id:'br-palmas',name:'Palmas',country:'Brasile',lat:-10.18,lng:-48.33,pop:200},
 {id:'br-sao-luis',name:'São Luís',country:'Brasile',lat:-2.53,lng:-44.3,pop:700},
 {id:'br-teresina',name:'Teresina',country:'Brasile',lat:-5.09,lng:-42.8,pop:520},
 {id:'br-fortaleza',name:'Fortaleza',country:'Brasile',lat:-3.73,lng:-38.53,pop:1500},
 {id:'br-natal',name:'Natal',country:'Brasile',lat:-5.79,lng:-35.21,pop:570},
 {id:'br-joao-pessoa',name:'João Pessoa',country:'Brasile',lat:-7.12,lng:-34.86,pop:510},
 {id:'br-recife',name:'Recife',country:'Brasile',lat:-8.05,lng:-34.88,pop:1120},
 {id:'br-olinda',name:'Olinda',country:'Brasile',lat:-8.01,lng:-34.85,pop:260},
 {id:'br-maceio',name:'Maceió',country:'Brasile',lat:-9.67,lng:-35.74,pop:650},
 {id:'br-aracaju',name:'Aracaju',country:'Brasile',lat:-10.91,lng:-37.07,pop:410},
 {id:'br-feira-de-santana',name:'Feira de Santana',country:'Brasile',lat:-12.27,lng:-38.97,pop:390},
 {id:'br-vitoria-da-conquista',name:'Vitória da Conquista',country:'Brasile',lat:-14.86,lng:-40.84,pop:220},
 {id:'br-juazeiro-do-norte',name:'Juazeiro do Norte',country:'Brasile',lat:-7.21,lng:-39.32,pop:190},
 {id:'br-campina-grande',name:'Campina Grande',country:'Brasile',lat:-7.23,lng:-35.88,pop:260},
 {id:'br-caruaru',name:'Caruaru',country:'Brasile',lat:-8.28,lng:-35.98,pop:220},
 {id:'cl-concepcion',name:'Concepción',country:'Cile',lat:-36.83,lng:-73.05,pop:500},
 {id:'cl-talcahuano',name:'Talcahuano',country:'Cile',lat:-36.72,lng:-73.12,pop:170},
 {id:'cl-temuco',name:'Temuco',country:'Cile',lat:-38.74,lng:-72.59,pop:260},
 {id:'cl-valdivia',name:'Valdivia',country:'Cile',lat:-39.81,lng:-73.25,pop:150},
 {id:'cl-osorno',name:'Osorno',country:'Cile',lat:-40.57,lng:-73.13,pop:120},
 {id:'cl-puerto-montt',name:'Puerto Montt',country:'Cile',lat:-41.47,lng:-72.94,pop:160},
 {id:'cl-punta-arenas',name:'Punta Arenas',country:'Cile',lat:-53.16,lng:-70.91,pop:110},
 {id:'cl-antofagasta',name:'Antofagasta',country:'Cile',lat:-23.65,lng:-70.4,pop:270},
 {id:'cl-iquique',name:'Iquique',country:'Cile',lat:-20.21,lng:-70.15,pop:180},
 {id:'cl-arica',name:'Arica',country:'Cile',lat:-18.48,lng:-70.32,pop:170},
 {id:'cl-calama',name:'Calama',country:'Cile',lat:-22.46,lng:-68.93,pop:130},
 {id:'cl-copiapo',name:'Copiapó',country:'Cile',lat:-27.37,lng:-70.33,pop:110},
 {id:'cl-la-serena',name:'La Serena',country:'Cile',lat:-29.9,lng:-71.25,pop:180},
 {id:'cl-coquimbo',name:'Coquimbo',country:'Cile',lat:-29.95,lng:-71.34,pop:150},
 {id:'cl-vina-del-mar',name:'Viña del Mar',country:'Cile',lat:-33.02,lng:-71.55,pop:250},
 {id:'cl-rancagua',name:'Rancagua',country:'Cile',lat:-34.17,lng:-70.74,pop:190},
 {id:'cl-talca',name:'Talca',country:'Cile',lat:-35.43,lng:-71.67,pop:160},
 {id:'cl-chillan',name:'Chillán',country:'Cile',lat:-36.61,lng:-72.1,pop:150},
 {id:'cl-los-angeles',name:'Los Ángeles',country:'Cile',lat:-37.47,lng:-72.35,pop:140},
 {id:'uy-salto',name:'Salto',country:'Uruguay',lat:-31.39,lng:-57.97,pop:110},
 {id:'uy-paysandu',name:'Paysandú',country:'Uruguay',lat:-32.32,lng:-58.08,pop:90},
 {id:'uy-maldonado',name:'Maldonado',country:'Uruguay',lat:-34.9,lng:-54.95,pop:100},
 {id:'uy-punta-del-este',name:'Punta del Este',country:'Uruguay',lat:-34.97,lng:-54.95,pop:70},
 {id:'uy-colonia-del-sacramento',name:'Colonia del Sacramento',country:'Uruguay',lat:-34.47,lng:-57.84,pop:55},
 {id:'uy-mercedes',name:'Mercedes',country:'Uruguay',lat:-33.25,lng:-58.03,pop:40},
 {id:'uy-rivera',name:'Rivera',country:'Uruguay',lat:-30.9,lng:-55.55,pop:65},
 {id:'uy-tacuarembo',name:'Tacuarembó',country:'Uruguay',lat:-31.72,lng:-55.98,pop:55},
 {id:'py-ciudad-del-este',name:'Ciudad del Este',country:'Paraguay',lat:-25.51,lng:-54.61,pop:270},
 {id:'py-encarnacion',name:'Encarnación',country:'Paraguay',lat:-27.33,lng:-55.87,pop:120},
 {id:'py-san-lorenzo',name:'San Lorenzo',country:'Paraguay',lat:-25.34,lng:-57.51,pop:160},
 {id:'py-luque',name:'Luque',country:'Paraguay',lat:-25.27,lng:-57.49,pop:150},
 {id:'py-pedro-juan-caballero',name:'Pedro Juan Caballero',country:'Paraguay',lat:-22.55,lng:-55.74,pop:90},
 {id:'py-coronel-oviedo',name:'Coronel Oviedo',country:'Paraguay',lat:-25.45,lng:-56.44,pop:65},
 {id:'bo-santa-cruz-de-la-sierra',name:'Santa Cruz de la Sierra',country:'Bolivia',lat:-17.78,lng:-63.18,pop:920},
 {id:'bo-cochabamba',name:'Cochabamba',country:'Bolivia',lat:-17.39,lng:-66.16,pop:510},
 {id:'bo-el-alto',name:'El Alto',country:'Bolivia',lat:-16.5,lng:-68.16,pop:580},
 {id:'bo-sucre',name:'Sucre',country:'Bolivia',lat:-19.05,lng:-65.26,pop:200},
 {id:'bo-oruro',name:'Oruro',country:'Bolivia',lat:-17.97,lng:-67.11,pop:180},
 {id:'bo-potosi',name:'Potosí',country:'Bolivia',lat:-19.57,lng:-65.76,pop:125},
 {id:'bo-tarija',name:'Tarija',country:'Bolivia',lat:-21.53,lng:-64.73,pop:140},
 {id:'bo-trinidad',name:'Trinidad',country:'Bolivia',lat:-14.83,lng:-64.9,pop:95},
 {id:'bo-cobija',name:'Cobija',country:'Bolivia',lat:-11.03,lng:-68.77,pop:45},
 {id:'pe-arequipa',name:'Arequipa',country:'Perù',lat:-16.4,lng:-71.54,pop:650},
 {id:'pe-trujillo',name:'Trujillo',country:'Perù',lat:-8.11,lng:-79.03,pop:550},
 {id:'pe-chiclayo',name:'Chiclayo',country:'Perù',lat:-6.77,lng:-79.84,pop:400},
 {id:'pe-piura',name:'Piura',country:'Perù',lat:-5.19,lng:-80.63,pop:320},
 {id:'pe-iquitos',name:'Iquitos',country:'Perù',lat:-3.75,lng:-73.25,pop:260},
 {id:'pe-huancayo',name:'Huancayo',country:'Perù',lat:-12.07,lng:-75.21,pop:230},
 {id:'pe-pucallpa',name:'Pucallpa',country:'Perù',lat:-8.38,lng:-74.55,pop:230},
 {id:'pe-juliaca',name:'Juliaca',country:'Perù',lat:-15.5,lng:-70.13,pop:180},
 {id:'pe-puno',name:'Puno',country:'Perù',lat:-15.84,lng:-70.02,pop:100},
 {id:'pe-tacna',name:'Tacna',country:'Perù',lat:-18.01,lng:-70.25,pop:190},
 {id:'pe-huanuco',name:'Huánuco',country:'Perù',lat:-9.93,lng:-76.24,pop:120},
 {id:'pe-cajamarca',name:'Cajamarca',country:'Perù',lat:-7.16,lng:-78.52,pop:140},
 {id:'pe-ayacucho',name:'Ayacucho',country:'Perù',lat:-13.16,lng:-74.22,pop:120},
 {id:'pe-chimbote',name:'Chimbote',country:'Perù',lat:-9.08,lng:-78.59,pop:210},
 {id:'ec-cuenca',name:'Cuenca',country:'Ecuador',lat:-2.9,lng:-79.0,pop:380},
 {id:'ec-manta',name:'Manta',country:'Ecuador',lat:-0.95,lng:-80.71,pop:180},
 {id:'ec-portoviejo',name:'Portoviejo',country:'Ecuador',lat:-1.05,lng:-80.45,pop:160},
 {id:'ec-ambato',name:'Ambato',country:'Ecuador',lat:-1.24,lng:-78.62,pop:150},
 {id:'ec-riobamba',name:'Riobamba',country:'Ecuador',lat:-1.66,lng:-78.65,pop:110},
 {id:'ec-loja',name:'Loja',country:'Ecuador',lat:-3.99,lng:-79.2,pop:130},
 {id:'ec-machala',name:'Machala',country:'Ecuador',lat:-3.26,lng:-79.96,pop:170},
 {id:'ec-esmeraldas',name:'Esmeraldas',country:'Ecuador',lat:0.96,lng:-79.65,pop:115},
 {id:'ec-ibarra',name:'Ibarra',country:'Ecuador',lat:0.35,lng:-78.12,pop:110},
 {id:'ec-santo-domingo',name:'Santo Domingo',country:'Ecuador',lat:-0.25,lng:-79.17,pop:230},
 {id:'co-cali',name:'Cali',country:'Colombia',lat:3.45,lng:-76.53,pop:1120},
 {id:'co-barranquilla',name:'Barranquilla',country:'Colombia',lat:10.96,lng:-74.8,pop:760},
 {id:'co-bucaramanga',name:'Bucaramanga',country:'Colombia',lat:7.12,lng:-73.12,pop:400},
 {id:'co-cucuta',name:'Cúcuta',country:'Colombia',lat:7.89,lng:-72.5,pop:450},
 {id:'co-pereira',name:'Pereira',country:'Colombia',lat:4.81,lng:-75.7,pop:290},
 {id:'co-manizales',name:'Manizales',country:'Colombia',lat:5.07,lng:-75.52,pop:250},
 {id:'co-armenia',name:'Armenia',country:'Colombia',lat:4.53,lng:-75.68,pop:180},
 {id:'co-ibague',name:'Ibagué',country:'Colombia',lat:4.44,lng:-75.24,pop:310},
 {id:'co-villavicencio',name:'Villavicencio',country:'Colombia',lat:4.15,lng:-73.64,pop:300},
 {id:'co-pasto',name:'Pasto',country:'Colombia',lat:1.21,lng:-77.28,pop:260},
 {id:'co-popayan',name:'Popayán',country:'Colombia',lat:2.44,lng:-76.61,pop:180},
 {id:'co-santa-marta',name:'Santa Marta',country:'Colombia',lat:11.24,lng:-74.2,pop:280},
 {id:'co-monteria',name:'Montería',country:'Colombia',lat:8.75,lng:-75.88,pop:260},
 {id:'co-sincelejo',name:'Sincelejo',country:'Colombia',lat:9.3,lng:-75.4,pop:170},
 {id:'co-valledupar',name:'Valledupar',country:'Colombia',lat:10.46,lng:-73.25,pop:250},
 {id:'co-neiva',name:'Neiva',country:'Colombia',lat:2.94,lng:-75.28,pop:230},
 {id:'co-tunja',name:'Tunja',country:'Colombia',lat:5.53,lng:-73.37,pop:120},
 {id:'co-riohacha',name:'Riohacha',country:'Colombia',lat:11.54,lng:-72.91,pop:150},
 {id:'co-buenaventura',name:'Buenaventura',country:'Colombia',lat:3.88,lng:-77.03,pop:170},
 {id:'co-leticia',name:'Leticia',country:'Colombia',lat:-4.21,lng:-69.94,pop:40},
 {id:'ve-maracaibo',name:'Maracaibo',country:'Venezuela',lat:10.64,lng:-71.63,pop:880},
 {id:'ve-valencia',name:'Valencia',country:'Venezuela',lat:10.16,lng:-68.0,pop:650},
 {id:'ve-barquisimeto',name:'Barquisimeto',country:'Venezuela',lat:10.07,lng:-69.32,pop:550},
 {id:'ve-maracay',name:'Maracay',country:'Venezuela',lat:10.25,lng:-67.6,pop:380},
 {id:'ve-ciudad-guayana',name:'Ciudad Guayana',country:'Venezuela',lat:8.36,lng:-62.65,pop:440},
 {id:'ve-puerto-la-cruz',name:'Puerto La Cruz',country:'Venezuela',lat:10.21,lng:-64.63,pop:250},
 {id:'ve-barcelona',name:'Barcelona',country:'Venezuela',lat:10.13,lng:-64.69,pop:200},
 {id:'ve-maturin',name:'Maturín',country:'Venezuela',lat:9.75,lng:-63.18,pop:260},
 {id:'ve-merida',name:'Mérida',country:'Venezuela',lat:8.59,lng:-71.15,pop:190},
 {id:'ve-san-cristobal',name:'San Cristóbal',country:'Venezuela',lat:7.77,lng:-72.23,pop:190},
 {id:'ve-cumana',name:'Cumaná',country:'Venezuela',lat:10.46,lng:-64.17,pop:170},
 {id:'ve-coro',name:'Coro',country:'Venezuela',lat:11.4,lng:-69.67,pop:150},
 {id:'ve-barinas',name:'Barinas',country:'Venezuela',lat:8.62,lng:-70.21,pop:170},
 {id:'ve-puerto-cabello',name:'Puerto Cabello',country:'Venezuela',lat:10.47,lng:-68.01,pop:130},
 {id:'gy-linden',name:'Linden',country:'Guyana',lat:5.99,lng:-58.27,pop:50},
 {id:'gy-new-amsterdam',name:'New Amsterdam',country:'Guyana',lat:6.25,lng:-57.52,pop:35},
 {id:'sr-lelydorp',name:'Lelydorp',country:'Suriname',lat:5.7,lng:-55.23,pop:30},
 {id:'sr-nieuw-nickerie',name:'Nieuw Nickerie',country:'Suriname',lat:5.95,lng:-56.99,pop:25},
 {id:'br-guarulhos',name:'Guarulhos',country:'Brasile',lat:-23.2479,lng:-46.6753,pop:33,geoVerified:false},
 {id:'br-hortolandia',name:'Hortolândia',country:'Brasile',lat:-22.8297,lng:-47.292,pop:56,geoVerified:false},
 {id:'br-sao-vicente',name:'São Vicente',country:'Brasile',lat:-23.78030,lng:-45.95718,pop:14,geoVerified:false},
 {id:'br-votorantim',name:'Votorantim',country:'Brasile',lat:-23.7806,lng:-47.2353,pop:35,geoVerified:false},
 {id:'br-sertaozinho',name:'Sertãozinho',country:'Brasile',lat:-21.0242,lng:-47.6406,pop:19,geoVerified:false},
 {id:'br-jacarei',name:'Jacareí',country:'Brasile',lat:-22.8967,lng:-46.1374,pop:15,geoVerified:false},
 {id:'br-jau',name:'Jaú',country:'Brasile',lat:-22.146,lng:-48.9013,pop:52,geoVerified:false},
 {id:'br-catanduva',name:'Catanduva',country:'Brasile',lat:-20.8342,lng:-49.1027,pop:55,geoVerified:false},
 {id:'br-duque-de-caxias',name:'Duque de Caxias',country:'Brasile',lat:-22.9548,lng:-43.3735,pop:63,geoVerified:false},
 {id:'br-teresopolis',name:'Teresópolis',country:'Brasile',lat:-22.5842,lng:-43.3302,pop:60,geoVerified:false},
 {id:'br-barra-mansa',name:'Barra Mansa',country:'Brasile',lat:-22.3424,lng:-44.3543,pop:50,geoVerified:false},
 {id:'br-contagem',name:'Contagem',country:'Brasile',lat:-20.1165,lng:-44.0647,pop:43,geoVerified:false},
 {id:'br-barbacena',name:'Barbacena',country:'Brasile',lat:-21.7029,lng:-43.4679,pop:34,geoVerified:false},
 {id:'br-araguari',name:'Araguari',country:'Brasile',lat:-19.0165,lng:-48.3838,pop:53,geoVerified:false},
 {id:'br-janauba',name:'Janaúba',country:'Brasile',lat:-16.8358,lng:-43.9079,pop:47,geoVerified:false},
 {id:'br-serra-espirito-santo',name:'Serra Espírito Santo',country:'Brasile',lat:-20.3438,lng:-40.4806,pop:15,geoVerified:false},
 {id:'br-sao-jose-dos-pinhais',name:'São José dos Pinhais',country:'Brasile',lat:-25.1724,lng:-49.0652,pop:55,geoVerified:false},
 {id:'br-cambe',name:'Cambé',country:'Brasile',lat:-23.572,lng:-51.3664,pop:40,geoVerified:false},
 {id:'br-sarandi-parana',name:'Sarandi Paraná',country:'Brasile',lat:-23.1945,lng:-51.9256,pop:45,geoVerified:false},
 {id:'br-toledo-parana',name:'Toledo Paraná',country:'Brasile',lat:-25.156,lng:-53.8346,pop:20,geoVerified:false},
 {id:'br-sao-jose-santa-catarina',name:'São José Santa Catarina',country:'Brasile',lat:-27.675,lng:-48.6666,pop:38,geoVerified:false},
 {id:'br-jaragua-do-sul',name:'Jaraguá do Sul',country:'Brasile',lat:-26.2916,lng:-48.5391,pop:52,geoVerified:false},
 {id:'br-gaspar',name:'Gaspar',country:'Brasile',lat:-26.9634,lng:-49.2683,pop:34,geoVerified:false},
 {id:'br-balneario-camboriu',name:'Balneário Camboriú',country:'Brasile',lat:-26.78667,lng:-48.58378,pop:25,geoVerified:false},
 {id:'br-canoas',name:'Canoas',country:'Brasile',lat:-29.9113,lng:-51.131,pop:60,geoVerified:false},
 {id:'br-bento-goncalves',name:'Bento Gonçalves',country:'Brasile',lat:-28.9783,lng:-51.4619,pop:38,geoVerified:false},
 {id:'br-capao-do-leao',name:'Capão do Leão',country:'Brasile',lat:-32.1196,lng:-52.1856,pop:22,geoVerified:false},
 {id:'br-sao-pedro-do-sul',name:'São Pedro do Sul',country:'Brasile',lat:-29.7188,lng:-53.3531,pop:61,geoVerified:false},
 {id:'br-aparecida-de-goiania',name:'Aparecida de Goiânia',country:'Brasile',lat:-17.0267,lng:-49.4531,pop:62,geoVerified:false},
 {id:'br-sidrolandia',name:'Sidrolândia',country:'Brasile',lat:-20.2294,lng:-54.6328,pop:40,geoVerified:false},
 {id:'br-varzea-grande-mato-grosso',name:'Várzea Grande Mato Grosso',country:'Brasile',lat:-15.77,lng:-55.7738,pop:53,geoVerified:false},
 {id:'br-iranduba',name:'Iranduba',country:'Brasile',lat:-3.0533,lng:-59.9291,pop:55,geoVerified:false},
 {id:'br-ananindeua',name:'Ananindeua',country:'Brasile',lat:-1.5191,lng:-48.6885,pop:61,geoVerified:false},
 {id:'br-sao-jose-de-ribamar',name:'São José de Ribamar',country:'Brasile',lat:-2.47655,lng:-44.25143,pop:44,geoVerified:false},
 {id:'br-caucaia',name:'Caucaia',country:'Brasile',lat:-3.70294,lng:-38.47500,pop:38,geoVerified:false},
 {id:'br-jaboatao-dos-guararapes',name:'Jaboatão dos Guararapes',country:'Brasile',lat:-8.08111,lng:-34.87297,pop:44,geoVerified:false},
 {id:'br-lauro-de-freitas',name:'Lauro de Freitas',country:'Brasile',lat:-13.01461,lng:-38.47166,pop:12,geoVerified:false},
 {id:'br-parnamirim-rio-grande-do-norte',name:'Parnamirim Rio Grande do Norte',country:'Brasile',lat:-5.6121,lng:-35.3047,pop:29,geoVerified:false},
 {id:'br-bayeux',name:'Bayeux',country:'Brasile',lat:-7.5006,lng:-34.9087,pop:30,geoVerified:false},
 {id:'br-rio-largo',name:'Rio Largo',country:'Brasile',lat:-9.5875,lng:-35.6907,pop:55,geoVerified:false},
 {id:'br-nossa-senhora-do-socorro',name:'Nossa Senhora do Socorro',country:'Brasile',lat:-10.6416,lng:-37.1973,pop:34,geoVerified:false},
 {id:'br-altos-piaui',name:'Altos Piauí',country:'Brasile',lat:-5.3626,lng:-42.7871,pop:54,geoVerified:false},
 {id:'br-candeias-do-jamari',name:'Candeias do Jamari',country:'Brasile',lat:-9.0807,lng:-63.8411,pop:48,geoVerified:false},
 {id:'br-senador-guiomard',name:'Senador Guiomard',country:'Brasile',lat:-10.1395,lng:-67.7481,pop:59,geoVerified:false},
 {id:'br-porto-nacional',name:'Porto Nacional',country:'Brasile',lat:-10.2137,lng:-48.679,pop:49,geoVerified:false},
 {id:'br-osasco',name:'Osasco',country:'Brasile',lat:-23.6154,lng:-46.9723,pop:63,geoVerified:false},
 {id:'br-sumare',name:'Sumaré',country:'Brasile',lat:-22.6996,lng:-47.3428,pop:25,geoVerified:false},
 {id:'br-praia-grande-sao-paulo',name:'Praia Grande São Paulo',country:'Brasile',lat:-23.99167,lng:-46.18378,pop:59,geoVerified:false},
 {id:'br-aracoiaba-da-serra',name:'Araçoiaba da Serra',country:'Brasile',lat:-23.6008,lng:-47.5181,pop:59,geoVerified:false},
 {id:'br-jaboticabal',name:'Jaboticabal',country:'Brasile',lat:-21.3577,lng:-47.509,pop:23,geoVerified:false},
 {id:'br-taubate',name:'Taubaté',country:'Brasile',lat:-22.9756,lng:-45.7918,pop:20,geoVerified:false},
 {id:'br-botucatu',name:'Botucatu',country:'Brasile',lat:-22.2012,lng:-48.935,pop:65,geoVerified:false},
 {id:'br-mirassol',name:'Mirassol',country:'Brasile',lat:-20.7241,lng:-49.4189,pop:24,geoVerified:false},
 {id:'br-nova-iguacu',name:'Nova Iguaçu',country:'Brasile',lat:-22.966,lng:-43.33,pop:36,geoVerified:false},
 {id:'br-nova-friburgo',name:'Nova Friburgo',country:'Brasile',lat:-22.3493,lng:-43.0589,pop:25,geoVerified:false},
 {id:'br-resende',name:'Resende',country:'Brasile',lat:-22.5002,lng:-43.8779,pop:64,geoVerified:false},
 {id:'br-betim',name:'Betim',country:'Brasile',lat:-19.9822,lng:-43.951,pop:14,geoVerified:false},
 {id:'br-sao-joao-del-rei',name:'São João del-Rei',country:'Brasile',lat:-21.7979,lng:-43.0993,pop:48,geoVerified:false},
 {id:'br-ituiutaba',name:'Ituiutaba',country:'Brasile',lat:-18.9127,lng:-47.8735,pop:29,geoVerified:false},
 {id:'br-januaria',name:'Januária',country:'Brasile',lat:-16.7432,lng:-43.6785,pop:21,geoVerified:false},
 {id:'br-cariacica',name:'Cariacica',country:'Brasile',lat:-20.61264,lng:-40.41657,pop:63,geoVerified:false},
 {id:'br-colombo-parana',name:'Colombo Paraná',country:'Brasile',lat:-25.5882,lng:-49.3843,pop:20,geoVerified:false},
 {id:'br-ibipora',name:'Ibiporã',country:'Brasile',lat:-23.2362,lng:-51.4991,pop:28,geoVerified:false},
 {id:'br-paicandu',name:'Paiçandu',country:'Brasile',lat:-23.2951,lng:-52.2173,pop:66,geoVerified:false},
 {id:'br-marechal-candido-rondon',name:'Marechal Cândido Rondon',country:'Brasile',lat:-25.2967,lng:-53.239,pop:44,geoVerified:false},
 {id:'br-palhoca',name:'Palhoça',country:'Brasile',lat:-27.3312,lng:-48.5183,pop:35,geoVerified:false},
 {id:'br-sao-bento-do-sul',name:'São Bento do Sul',country:'Brasile',lat:-26.057,lng:-48.9532,pop:42,geoVerified:false},
 {id:'br-indaial',name:'Indaial',country:'Brasile',lat:-27.0475,lng:-49.1411,pop:39,geoVerified:false},
 {id:'br-camboriu',name:'Camboriú',country:'Brasile',lat:-26.8517,lng:-48.8791,pop:15,geoVerified:false},
 {id:'br-gravatai',name:'Gravataí',country:'Brasile',lat:-29.9,lng:-51.4704,pop:27,geoVerified:false},
 {id:'br-farroupilha',name:'Farroupilha',country:'Brasile',lat:-29.4462,lng:-50.8923,pop:56,geoVerified:false},
 {id:'br-sao-lourenco-do-sul',name:'São Lourenço do Sul',country:'Brasile',lat:-31.4562,lng:-52.2019,pop:50,geoVerified:false},
 {id:'br-sao-sepe',name:'São Sepé',country:'Brasile',lat:-29.7842,lng:-53.8857,pop:49,geoVerified:false},
 {id:'br-senador-canedo',name:'Senador Canedo',country:'Brasile',lat:-16.9872,lng:-49.2684,pop:62,geoVerified:false},
 {id:'br-terenos',name:'Terenos',country:'Brasile',lat:-20.7342,lng:-54.4503,pop:44,geoVerified:false},
 {id:'br-santo-antonio-de-leverger',name:'Santo Antônio de Leverger',country:'Brasile',lat:-15.6955,lng:-55.9466,pop:60,geoVerified:false},
 {id:'br-manacapuru',name:'Manacapuru',country:'Brasile',lat:-3.0292,lng:-60.078,pop:39,geoVerified:false},
 {id:'br-marituba',name:'Marituba',country:'Brasile',lat:-1.4108,lng:-48.7174,pop:18,geoVerified:false},
 {id:'br-paco-do-lumiar',name:'Paço do Lumiar',country:'Brasile',lat:-2.5889,lng:-44.408,pop:58,geoVerified:false},
 {id:'br-maracanau',name:'Maracanaú',country:'Brasile',lat:-3.69211,lng:-38.59087,pop:38,geoVerified:false},
 {id:'br-olinda-pernambuco',name:'Olinda Pernambuco',country:'Brasile',lat:-8.35583,lng:-34.93958,pop:62,geoVerified:false},
 {id:'br-camacari',name:'Camaçari',country:'Brasile',lat:-13.0088,lng:-38.6356,pop:57,geoVerified:false},
 {id:'br-sao-goncalo-do-amarante-rn',name:'São Gonçalo do Amarante RN',country:'Brasile',lat:-5.8584,lng:-35.1177,pop:13,geoVerified:false},
 {id:'br-santa-rita-paraiba',name:'Santa Rita Paraíba',country:'Brasile',lat:-6.9782,lng:-34.8386,pop:51,geoVerified:false},
 {id:'br-marechal-deodoro',name:'Marechal Deodoro',country:'Brasile',lat:-9.5336,lng:-35.6955,pop:32,geoVerified:false},
 {id:'br-sao-cristovao-sergipe',name:'São Cristóvão Sergipe',country:'Brasile',lat:-10.79133,lng:-36.89980,pop:42,geoVerified:false},
 {id:'br-jose-de-freitas',name:'José de Freitas',country:'Brasile',lat:-4.6989,lng:-42.8636,pop:62,geoVerified:false},
 {id:'br-ariquemes',name:'Ariquemes',country:'Brasile',lat:-8.6328,lng:-64.0732,pop:61,geoVerified:false},
 {id:'br-bujari',name:'Bujari',country:'Brasile',lat:-9.8276,lng:-67.9275,pop:16,geoVerified:false},
 {id:'br-paraiso-do-tocantins',name:'Paraíso do Tocantins',country:'Brasile',lat:-10.2616,lng:-48.2577,pop:19,geoVerified:false},
 {id:'br-santo-andre',name:'Santo André',country:'Brasile',lat:-23.7258,lng:-46.4887,pop:50,geoVerified:false},
 {id:'br-americana',name:'Americana',country:'Brasile',lat:-22.9581,lng:-46.817,pop:36,geoVerified:false},
 {id:'br-guaruja',name:'Guarujá',country:'Brasile',lat:-24.0246,lng:-46.439,pop:29,geoVerified:false},
 {id:'br-salto-sao-paulo',name:'Salto São Paulo',country:'Brasile',lat:-23.6733,lng:-47.285,pop:53,geoVerified:false},
 {id:'br-batatais',name:'Batatais',country:'Brasile',lat:-21.1148,lng:-47.6647,pop:54,geoVerified:false},
 {id:'br-cacapava',name:'Caçapava',country:'Brasile',lat:-23.5105,lng:-46.0712,pop:47,geoVerified:false},
 {id:'br-lencois-paulista',name:'Lençóis Paulista',country:'Brasile',lat:-22.3702,lng:-49.2517,pop:13,geoVerified:false},
 {id:'br-votuporanga',name:'Votuporanga',country:'Brasile',lat:-21.0582,lng:-49.6217,pop:35,geoVerified:false},
 {id:'br-sao-joao-de-meriti',name:'São João de Meriti',country:'Brasile',lat:-22.98211,lng:-43.05086,pop:60,geoVerified:false},
 {id:'br-cachoeiras-de-macacu',name:'Cachoeiras de Macacu',country:'Brasile',lat:-22.2802,lng:-42.9896,pop:23,geoVerified:false},
 {id:'br-itatiaia',name:'Itatiaia',country:'Brasile',lat:-22.452,lng:-44.0833,pop:48,geoVerified:false},
 {id:'br-ribeirao-das-neves',name:'Ribeirão das Neves',country:'Brasile',lat:-20.0944,lng:-43.7715,pop:58,geoVerified:false},
 {id:'br-conselheiro-lafaiete',name:'Conselheiro Lafaiete',country:'Brasile',lat:-22.1366,lng:-43.2515,pop:20,geoVerified:false},
 {id:'br-monte-carmelo',name:'Monte Carmelo',country:'Brasile',lat:-19.0163,lng:-47.8933,pop:45,geoVerified:false},
 {id:'br-pirapora',name:'Pirapora',country:'Brasile',lat:-17.002,lng:-43.9546,pop:64,geoVerified:false},
 {id:'br-viana-espirito-santo',name:'Viana Espírito Santo',country:'Brasile',lat:-20.22993,lng:-40.21118,pop:29,geoVerified:false},
 {id:'br-pinhais',name:'Pinhais',country:'Brasile',lat:-25.7021,lng:-49.3938,pop:26,geoVerified:false},
 {id:'br-rolandia',name:'Rolândia',country:'Brasile',lat:-23.6196,lng:-51.4182,pop:12,geoVerified:false},
 {id:'br-mandaguacu',name:'Mandaguaçu',country:'Brasile',lat:-23.8033,lng:-51.9251,pop:52,geoVerified:false},
 {id:'br-medianeira',name:'Medianeira',country:'Brasile',lat:-24.8301,lng:-53.4837,pop:54,geoVerified:false},
 {id:'br-biguacu',name:'Biguaçu',country:'Brasile',lat:-27.61679,lng:-48.43655,pop:47,geoVerified:false},
 {id:'br-guaramirim',name:'Guaramirim',country:'Brasile',lat:-26.3171,lng:-48.79,pop:17,geoVerified:false},
 {id:'br-timbo',name:'Timbó',country:'Brasile',lat:-26.7912,lng:-49.2428,pop:24,geoVerified:false},
 {id:'br-navegantes',name:'Navegantes',country:'Brasile',lat:-27.0796,lng:-48.9334,pop:38,geoVerified:false},
 {id:'br-viamao',name:'Viamão',country:'Brasile',lat:-30.1387,lng:-51.3406,pop:23,geoVerified:false},
 {id:'br-garibaldi',name:'Garibaldi',country:'Brasile',lat:-29.25,lng:-51.3081,pop:61,geoVerified:false},
 {id:'br-cangucu',name:'Canguçu',country:'Brasile',lat:-31.5868,lng:-52.7501,pop:62,geoVerified:false},
 {id:'br-julio-de-castilhos',name:'Júlio de Castilhos',country:'Brasile',lat:-29.5004,lng:-53.9055,pop:64,geoVerified:false},
 {id:'br-trindade-goias',name:'Trindade Goiás',country:'Brasile',lat:-16.6359,lng:-49.3027,pop:16,geoVerified:false},
 {id:'br-aquidauana',name:'Aquidauana',country:'Brasile',lat:-20.7689,lng:-54.5396,pop:38,geoVerified:false},
 {id:'br-chapada-dos-guimaraes',name:'Chapada dos Guimarães',country:'Brasile',lat:-15.9347,lng:-56.182,pop:19,geoVerified:false},
 {id:'br-itacoatiara',name:'Itacoatiara',country:'Brasile',lat:-2.7653,lng:-59.957,pop:33,geoVerified:false},
 {id:'br-benevides',name:'Benevides',country:'Brasile',lat:-1.7764,lng:-48.4399,pop:44,geoVerified:false},
 {id:'br-raposa-maranhao',name:'Raposa Maranhão',country:'Brasile',lat:-2.59256,lng:-44.55461,pop:24,geoVerified:false},
 {id:'br-eusebio',name:'Eusébio',country:'Brasile',lat:-3.6539,lng:-38.5554,pop:20,geoVerified:false},
 {id:'br-paulista-pernambuco',name:'Paulista Pernambuco',country:'Brasile',lat:-8.1249,lng:-35.0238,pop:47,geoVerified:false},
 {id:'br-simoes-filho',name:'Simões Filho',country:'Brasile',lat:-13.0081,lng:-38.3911,pop:37,geoVerified:false},
 {id:'br-macaiba',name:'Macaíba',country:'Brasile',lat:-5.9325,lng:-35.097,pop:19,geoVerified:false},
 {id:'br-cabedelo',name:'Cabedelo',country:'Brasile',lat:-6.96794,lng:-34.83503,pop:29,geoVerified:false},
 {id:'br-pilar-alagoas',name:'Pilar Alagoas',country:'Brasile',lat:-9.3522,lng:-35.9068,pop:24,geoVerified:false},
 {id:'br-barra-dos-coqueiros',name:'Barra dos Coqueiros',country:'Brasile',lat:-11.176,lng:-37.3596,pop:30,geoVerified:false},
 {id:'br-uniao-piaui',name:'União Piauí',country:'Brasile',lat:-5.028,lng:-42.9866,pop:55,geoVerified:false},
 {id:'br-ji-parana',name:'Ji-Paraná',country:'Brasile',lat:-8.8323,lng:-63.8218,pop:66,geoVerified:false},
 {id:'br-porto-acre',name:'Porto Acre',country:'Brasile',lat:-9.9755,lng:-68.1877,pop:32,geoVerified:false},
 {id:'br-miracema-do-tocantins',name:'Miracema do Tocantins',country:'Brasile',lat:-10.2629,lng:-48.3836,pop:60,geoVerified:false},
 {id:'br-sao-bernardo-do-campo',name:'São Bernardo do Campo',country:'Brasile',lat:-23.4183,lng:-46.5956,pop:29,geoVerified:false},
 {id:'br-santa-barbara-d-oeste',name:"Santa Bárbara d'Oeste",country:'Brasile',lat:-22.8997,lng:-46.8879,pop:16},
 {id:'br-cubatao',name:'Cubatão',country:'Brasile',lat:-24.0915,lng:-46.3991,pop:38,geoVerified:false},
 {id:'br-itu',name:'Itu',country:'Brasile',lat:-23.3989,lng:-47.8802,pop:24,geoVerified:false},
 {id:'br-cravinhos',name:'Cravinhos',country:'Brasile',lat:-21.1445,lng:-47.5744,pop:22,geoVerified:false},
 {id:'br-pindamonhangaba',name:'Pindamonhangaba',country:'Brasile',lat:-23.0944,lng:-46.2491,pop:57,geoVerified:false},
 {id:'br-agudos',name:'Agudos',country:'Brasile',lat:-22.3521,lng:-48.7984,pop:53,geoVerified:false},
 {id:'br-fernandopolis',name:'Fernandópolis',country:'Brasile',lat:-21.0256,lng:-49.4764,pop:13,geoVerified:false},
 {id:'br-belford-roxo',name:'Belford Roxo',country:'Brasile',lat:-22.9852,lng:-43.0762,pop:41,geoVerified:false},
 {id:'br-tres-rios',name:'Três Rios',country:'Brasile',lat:-22.4278,lng:-43.4702,pop:17,geoVerified:false},
 {id:'br-porto-real-rio-de-janeiro',name:'Porto Real Rio de Janeiro',country:'Brasile',lat:-22.2882,lng:-44.2424,pop:59,geoVerified:false},
 {id:'br-santa-luzia-minas-gerais',name:'Santa Luzia Minas Gerais',country:'Brasile',lat:-19.9514,lng:-44.2136,pop:32,geoVerified:false},
 {id:'br-ouro-preto',name:'Ouro Preto',country:'Brasile',lat:-21.52,lng:-43.5199,pop:62,geoVerified:false},
 {id:'br-patrocinio',name:'Patrocínio',country:'Brasile',lat:-18.6461,lng:-48.0801,pop:38,geoVerified:false},
 {id:'br-bocaiuva',name:'Bocaiúva',country:'Brasile',lat:-17.0222,lng:-44.0057,pop:31,geoVerified:false},
 {id:'br-guarapari',name:'Guarapari',country:'Brasile',lat:-20.1059,lng:-40.5385,pop:34,geoVerified:false},
 {id:'br-araucaria-parana',name:'Araucária Paraná',country:'Brasile',lat:-25.3386,lng:-49.5133,pop:41,geoVerified:false},
 {id:'br-arapongas',name:'Arapongas',country:'Brasile',lat:-23.6486,lng:-51.3475,pop:48,geoVerified:false},
 {id:'br-mandaguari',name:'Mandaguari',country:'Brasile',lat:-23.3452,lng:-51.555,pop:12,geoVerified:false},
 {id:'br-matelandia',name:'Matelândia',country:'Brasile',lat:-24.9187,lng:-53.3736,pop:40,geoVerified:false},
 {id:'br-santo-amaro-da-imperatriz',name:'Santo Amaro da Imperatriz',country:'Brasile',lat:-27.9113,lng:-48.5184,pop:28,geoVerified:false},
 {id:'br-araquari',name:'Araquari',country:'Brasile',lat:-26.415,lng:-48.6252,pop:15,geoVerified:false},
 {id:'br-pomerode',name:'Pomerode',country:'Brasile',lat:-27.0009,lng:-48.8912,pop:35,geoVerified:false},
 {id:'br-penha-santa-catarina',name:'Penha Santa Catarina',country:'Brasile',lat:-26.9669,lng:-48.9595,pop:58,geoVerified:false},
 {id:'br-alvorada-rio-grande-do-sul',name:'Alvorada Rio Grande do Sul',country:'Brasile',lat:-30.008,lng:-51.1702,pop:56,geoVerified:false},
 {id:'br-flores-da-cunha',name:'Flores da Cunha',country:'Brasile',lat:-28.9982,lng:-50.7784,pop:23,geoVerified:false},
 {id:'br-jaguarao',name:'Jaguarão',country:'Brasile',lat:-31.9076,lng:-52.6479,pop:56,geoVerified:false},
 {id:'br-santiago-rio-grande-do-sul',name:'Santiago Rio Grande do Sul',country:'Brasile',lat:-29.4987,lng:-53.9957,pop:53,geoVerified:false},
 {id:'br-goianira',name:'Goianira',country:'Brasile',lat:-16.5753,lng:-49.1429,pop:26,geoVerified:false},
 {id:'br-anastacio',name:'Anastácio',country:'Brasile',lat:-20.5935,lng:-54.2819,pop:56,geoVerified:false},
 {id:'br-nossa-senhora-do-livramento',name:'Nossa Senhora do Livramento',country:'Brasile',lat:-15.6372,lng:-55.7091,pop:43,geoVerified:false},
 {id:'br-rio-preto-da-eva',name:'Rio Preto da Eva',country:'Brasile',lat:-3.0402,lng:-59.9415,pop:18,geoVerified:false},
 {id:'br-santa-barbara-do-para',name:'Santa Bárbara do Pará',country:'Brasile',lat:-1.7469,lng:-48.2247,pop:58,geoVerified:false},
 {id:'br-alcantara-maranhao',name:'Alcântara Maranhão',country:'Brasile',lat:-2.5186,lng:-44.2316,pop:50,geoVerified:false},
 {id:'br-aquiraz',name:'Aquiraz',country:'Brasile',lat:-3.71484,lng:-38.46828,pop:17,geoVerified:false},
 {id:'br-camaragibe',name:'Camaragibe',country:'Brasile',lat:-7.9569,lng:-35.0085,pop:55,geoVerified:false},
 {id:'br-dias-d-avila',name:"Dias d'Ávila",country:'Brasile',lat:-13.00718,lng:-38.51205,pop:36},
 {id:'br-extremoz',name:'Extremoz',country:'Brasile',lat:-5.7104,lng:-35.4707,pop:36,geoVerified:false},
 {id:'br-conde-paraiba',name:'Conde Paraíba',country:'Brasile',lat:-7.19474,lng:-34.80002,pop:13,geoVerified:false},
 {id:'br-satuba',name:'Satuba',country:'Brasile',lat:-9.6447,lng:-35.8224,pop:17,geoVerified:false},
 {id:'br-itaporanga-d-ajuda',name:"Itaporanga d'Ajuda",country:'Brasile',lat:-10.799,lng:-37.002,pop:45},
 {id:'br-demerval-lobao',name:'Demerval Lobão',country:'Brasile',lat:-5.3935,lng:-42.5364,pop:21,geoVerified:false},
 {id:'br-cacoal',name:'Cacoal',country:'Brasile',lat:-9.0374,lng:-63.6514,pop:32,geoVerified:false},
 {id:'br-brasileia',name:'Brasiléia',country:'Brasile',lat:-10.058,lng:-67.6298,pop:31,geoVerified:false},
 {id:'br-gurupi',name:'Gurupi',country:'Brasile',lat:-10.0559,lng:-48.2826,pop:52,geoVerified:false},
 {id:'br-sao-caetano-do-sul',name:'São Caetano do Sul',country:'Brasile',lat:-23.3333,lng:-46.7795,pop:53,geoVerified:false},
 {id:'br-nova-odessa',name:'Nova Odessa',country:'Brasile',lat:-22.9475,lng:-46.9715,pop:27,geoVerified:false},
 {id:'br-bertioga',name:'Bertioga',country:'Brasile',lat:-23.8500,lng:-46.1400,pop:14},
 {id:'br-porto-feliz',name:'Porto Feliz',country:'Brasile',lat:-23.4421,lng:-47.616,pop:51,geoVerified:false},
 {id:'br-serrana',name:'Serrana',country:'Brasile',lat:-21.3517,lng:-47.4396,pop:62,geoVerified:false},
 {id:'br-guaratingueta',name:'Guaratinguetá',country:'Brasile',lat:-23.1112,lng:-45.6021,pop:54,geoVerified:false},
 {id:'br-pederneiras',name:'Pederneiras',country:'Brasile',lat:-22.1162,lng:-49.0032,pop:14,geoVerified:false},
 {id:'br-jales',name:'Jales',country:'Brasile',lat:-20.6787,lng:-49.763,pop:61,geoVerified:false},
 {id:'br-nilopolis',name:'Nilópolis',country:'Brasile',lat:-22.8328,lng:-43.3505,pop:54,geoVerified:false},
 {id:'br-paraiba-do-sul',name:'Paraíba do Sul',country:'Brasile',lat:-22.2089,lng:-43.1556,pop:54,geoVerified:false},
 {id:'br-pirai',name:'Piraí',country:'Brasile',lat:-22.5023,lng:-44.2725,pop:54,geoVerified:false},
 {id:'br-ibirite',name:'Ibirité',country:'Brasile',lat:-19.9807,lng:-44.2464,pop:36,geoVerified:false},
 {id:'br-mariana-minas-gerais',name:'Mariana Minas Gerais',country:'Brasile',lat:-21.691,lng:-43.7193,pop:39,geoVerified:false},
 {id:'br-araxa',name:'Araxá',country:'Brasile',lat:-18.5246,lng:-48.3169,pop:44,geoVerified:false},
 {id:'br-salinas-minas-gerais',name:'Salinas Minas Gerais',country:'Brasile',lat:-16.6471,lng:-44.1239,pop:49,geoVerified:false},
 {id:'br-aracruz',name:'Aracruz',country:'Brasile',lat:-20.35200,lng:-40.29171,pop:22,geoVerified:false},
 {id:'br-campo-largo',name:'Campo Largo',country:'Brasile',lat:-25.4419,lng:-49.1556,pop:58,geoVerified:false},
 {id:'br-apucarana',name:'Apucarana',country:'Brasile',lat:-23.4682,lng:-51.2254,pop:59,geoVerified:false},
 {id:'br-marialva',name:'Marialva',country:'Brasile',lat:-23.5909,lng:-51.9741,pop:27,geoVerified:false},
 {id:'br-palotina',name:'Palotina',country:'Brasile',lat:-25.2805,lng:-53.2325,pop:22,geoVerified:false},
 {id:'ar-avellaneda',name:'Avellaneda',country:'Argentina',lat:-34.7551,lng:-58.1981,pop:61,geoVerified:false},
 {id:'ar-miramar',name:'Miramar',country:'Argentina',lat:-38.04167,lng:-57.52045,pop:50,geoVerified:false},
 {id:'ar-punta-alta',name:'Punta Alta',country:'Argentina',lat:-38.6928,lng:-62.0985,pop:49,geoVerified:false},
 {id:'ar-villa-gobernador-galvez',name:'Villa Gobernador Gálvez',country:'Argentina',lat:-32.8911,lng:-60.8804,pop:63,geoVerified:false},
 {id:'ar-alta-gracia',name:'Alta Gracia',country:'Argentina',lat:-31.5056,lng:-64.0366,pop:46,geoVerified:false},
 {id:'ar-godoy-cruz',name:'Godoy Cruz',country:'Argentina',lat:-33.2284,lng:-68.7254,pop:25,geoVerified:false},
 {id:'ar-plottier',name:'Plottier',country:'Argentina',lat:-38.9414,lng:-67.5414,pop:15,geoVerified:false},
 {id:'ar-tartagal',name:'Tartagal',country:'Argentina',lat:-25.0045,lng:-65.3575,pop:48,geoVerified:false},
 {id:'ar-yerba-buena',name:'Yerba Buena',country:'Argentina',lat:-26.8633,lng:-65.4128,pop:31,geoVerified:false},
 {id:'ar-goya',name:'Goya',country:'Argentina',lat:-27.4363,lng:-59.1392,pop:58,geoVerified:false},
 {id:'ar-obera',name:'Oberá',country:'Argentina',lat:-27.3041,lng:-55.8449,pop:16,geoVerified:false},
 {id:'ar-caleta-olivia',name:'Caleta Olivia',country:'Argentina',lat:-45.7475,lng:-67.5353,pop:12,geoVerified:false},
 {id:'ar-lanus',name:'Lanús',country:'Argentina',lat:-34.6285,lng:-58.7118,pop:51,geoVerified:false},
 {id:'ar-balcarce',name:'Balcarce',country:'Argentina',lat:-37.7025,lng:-57.4942,pop:34,geoVerified:false},
 {id:'ar-coronel-suarez',name:'Coronel Suárez',country:'Argentina',lat:-38.4556,lng:-61.9321,pop:51,geoVerified:false},
 {id:'ar-granadero-baigorria',name:'Granadero Baigorria',country:'Argentina',lat:-32.761,lng:-60.739,pop:56,geoVerified:false},
 {id:'ar-villa-carlos-paz',name:'Villa Carlos Paz',country:'Argentina',lat:-31.1634,lng:-64.0751,pop:61,geoVerified:false},
 {id:'ar-guaymallen',name:'Guaymallén',country:'Argentina',lat:-32.9808,lng:-69.3028,pop:63,geoVerified:false},
 {id:'ar-centenario',name:'Centenario',country:'Argentina',lat:-38.7063,lng:-67.8649,pop:27,geoVerified:false},
 {id:'ar-oran',name:'Orán',country:'Argentina',lat:-24.6549,lng:-65.4046,pop:39,geoVerified:false},
 {id:'ar-tafi-viejo',name:'Tafí Viejo',country:'Argentina',lat:-26.7214,lng:-65.3882,pop:25,geoVerified:false},
 {id:'ar-mercedes-corrientes',name:'Mercedes Corrientes',country:'Argentina',lat:-27.3543,lng:-58.8338,pop:13,geoVerified:false},
 {id:'ar-eldorado',name:'Eldorado',country:'Argentina',lat:-27.4411,lng:-55.9729,pop:15,geoVerified:false},
 {id:'ar-sarmiento',name:'Sarmiento',country:'Argentina',lat:-46.1984,lng:-67.6783,pop:42,geoVerified:false},
 {id:'ar-lomas-de-zamora',name:'Lomas de Zamora',country:'Argentina',lat:-34.23463,lng:-58.06250,pop:61,geoVerified:false},
 {id:'ar-mar-chiquita',name:'Mar Chiquita',country:'Argentina',lat:-38.04167,lng:-57.52045,pop:44,geoVerified:false},
 {id:'ar-pigue',name:'Pigüé',country:'Argentina',lat:-38.4805,lng:-61.8809,pop:22,geoVerified:false},
 {id:'ar-funes',name:'Funes',country:'Argentina',lat:-32.8937,lng:-60.7027,pop:62,geoVerified:false},
 {id:'ar-cosquin',name:'Cosquín',country:'Argentina',lat:-31.3238,lng:-64.2657,pop:65,geoVerified:false},
 {id:'ar-las-heras',name:'Las Heras',country:'Argentina',lat:-32.8362,lng:-69.2431,pop:14,geoVerified:false},
 {id:'ar-cutral-co',name:'Cutral Có',country:'Argentina',lat:-39.087,lng:-68.0028,pop:34,geoVerified:false},
 {id:'ar-metan',name:'Metán',country:'Argentina',lat:-25.1018,lng:-65.3588,pop:18,geoVerified:false},
 {id:'ar-banda-del-rio-sali',name:'Banda del Río Salí',country:'Argentina',lat:-26.5031,lng:-65.387,pop:58,geoVerified:false},
 {id:'ar-paso-de-los-libres',name:'Paso de los Libres',country:'Argentina',lat:-27.7755,lng:-59.1139,pop:56,geoVerified:false},
 {id:'ar-puerto-iguazu',name:'Puerto Iguazú',country:'Argentina',lat:-27.5392,lng:-55.9915,pop:20,geoVerified:false},
 {id:'ar-rada-tilly',name:'Rada Tilly',country:'Argentina',lat:-45.7508,lng:-67.4159,pop:63,geoVerified:false},
 {id:'ar-quilmes',name:'Quilmes',country:'Argentina',lat:-34.72065,lng:-58.25454,pop:54,geoVerified:true},
 {id:'ar-villa-gesell',name:'Villa Gesell',country:'Argentina',lat:-37.911,lng:-57.6404,pop:64,geoVerified:false},
 {id:'ar-tornquist',name:'Tornquist',country:'Argentina',lat:-38.6005,lng:-62.438,pop:49,geoVerified:false},
 {id:'ar-roldan',name:'Roldán',country:'Argentina',lat:-33.1101,lng:-60.3005,pop:43,geoVerified:false},
 {id:'ar-la-falda',name:'La Falda',country:'Argentina',lat:-31.6389,lng:-64.4756,pop:22,geoVerified:false},
 {id:'ar-maipu-mendoza',name:'Maipú Mendoza',country:'Argentina',lat:-33.1109,lng:-68.9847,pop:16,geoVerified:false},
 {id:'ar-plaza-huincul',name:'Plaza Huincul',country:'Argentina',lat:-39.0147,lng:-67.7019,pop:26,geoVerified:false},
 {id:'ar-cafayate',name:'Cafayate',country:'Argentina',lat:-24.9891,lng:-65.4246,pop:54,geoVerified:false},
 {id:'ar-concepcion-tucuman',name:'Concepción Tucumán',country:'Argentina',lat:-27.1079,lng:-65.2202,pop:61,geoVerified:false},
 {id:'ar-curuzu-cuatia',name:'Curuzú Cuatiá',country:'Argentina',lat:-27.8147,lng:-58.8098,pop:62,geoVerified:false},
 {id:'ar-apostoles',name:'Apóstoles',country:'Argentina',lat:-27.4065,lng:-55.7294,pop:24,geoVerified:false},
 {id:'ar-las-heras-santa-cruz',name:'Las Heras Santa Cruz',country:'Argentina',lat:-45.7588,lng:-67.6693,pop:33,geoVerified:false},
 {id:'ar-berazategui',name:'Berazategui',country:'Argentina',lat:-34.2168,lng:-58.3639,pop:63,geoVerified:false},
 {id:'ar-pinamar',name:'Pinamar',country:'Argentina',lat:-37.7498,lng:-57.5095,pop:65,geoVerified:false},
 {id:'ar-tres-arroyos',name:'Tres Arroyos',country:'Argentina',lat:-38.3398,lng:-62.3294,pop:62,geoVerified:false},
 {id:'ar-san-lorenzo',name:'San Lorenzo',country:'Argentina',lat:-32.9724,lng:-60.5829,pop:64,geoVerified:false},
 {id:'ar-jesus-maria',name:'Jesús María',country:'Argentina',lat:-31.2058,lng:-63.9588,pop:36,geoVerified:false},
 {id:'ar-lujan-de-cuyo',name:'Luján de Cuyo',country:'Argentina',lat:-33.0247,lng:-68.8249,pop:45,geoVerified:false},
 {id:'ar-zapala',name:'Zapala',country:'Argentina',lat:-39.0568,lng:-67.9152,pop:49,geoVerified:false},
 {id:'ar-rosario-de-la-frontera',name:'Rosario de la Frontera',country:'Argentina',lat:-24.5247,lng:-65.555,pop:57,geoVerified:false},
 {id:'ar-aguilares',name:'Aguilares',country:'Argentina',lat:-26.7161,lng:-65.5899,pop:13,geoVerified:false},
 {id:'ar-ituzaingo-corrientes',name:'Ituzaingó Corrientes',country:'Argentina',lat:-27.6393,lng:-58.7423,pop:30,geoVerified:false},
 {id:'ar-jardin-america',name:'Jardín América',country:'Argentina',lat:-27.2542,lng:-56.2249,pop:31,geoVerified:false},
 {id:'ar-pico-truncado',name:'Pico Truncado',country:'Argentina',lat:-45.5198,lng:-67.2704,pop:29,geoVerified:false},
 {id:'ar-florencio-varela',name:'Florencio Varela',country:'Argentina',lat:-34.7364,lng:-58.1637,pop:62,geoVerified:false},
 {id:'ar-dolores',name:'Dolores',country:'Argentina',lat:-38.0454,lng:-57.6982,pop:14,geoVerified:false},
 {id:'cl-puente-alto',name:'Puente Alto',country:'Cile',lat:-33.322,lng:-71.0725,pop:29,geoVerified:false},
 {id:'cl-quilpue',name:'Quilpué',country:'Cile',lat:-33.316,lng:-71.5859,pop:50,geoVerified:false},
 {id:'cl-chiguayante',name:'Chiguayante',country:'Cile',lat:-37.0828,lng:-73.0371,pop:15,geoVerified:false},
 {id:'cl-padre-las-casas',name:'Padre Las Casas',country:'Cile',lat:-38.5852,lng:-72.5958,pop:46,geoVerified:false},
 {id:'cl-curico',name:'Curicó',country:'Cile',lat:-35.4508,lng:-71.529,pop:44,geoVerified:false},
 {id:'cl-puerto-varas',name:'Puerto Varas',country:'Cile',lat:-41.499,lng:-72.5277,pop:35,geoVerified:false},
 {id:'cl-tocopilla',name:'Tocopilla',country:'Cile',lat:-23.9816,lng:-70.3058,pop:13,geoVerified:false},
 {id:'cl-alto-hospicio',name:'Alto Hospicio',country:'Cile',lat:-20.351,lng:-70.1623,pop:33,geoVerified:false},
 {id:'cl-puerto-natales',name:'Puerto Natales',country:'Cile',lat:-53.13854,lng:-70.85956,pop:14,geoVerified:false},
 {id:'cl-maipu-chile',name:'Maipú Chile',country:'Cile',lat:-33.6027,lng:-70.4706,pop:65,geoVerified:false},
 {id:'cl-villa-alemana',name:'Villa Alemana',country:'Cile',lat:-33.4353,lng:-71.6526,pop:37,geoVerified:false},
 {id:'cl-san-pedro-de-la-paz',name:'San Pedro de la Paz',country:'Cile',lat:-36.5253,lng:-72.7568,pop:43,geoVerified:false},
 {id:'cl-villarrica',name:'Villarrica',country:'Cile',lat:-38.4667,lng:-72.5994,pop:34,geoVerified:false},
 {id:'cl-linares-chile',name:'Linares Chile',country:'Cile',lat:-35.2179,lng:-71.8414,pop:32,geoVerified:false},
 {id:'cl-calbuco',name:'Calbuco',country:'Cile',lat:-41.4227,lng:-73.0385,pop:48,geoVerified:false},
 {id:'cl-mejillones',name:'Mejillones',country:'Cile',lat:-23.9633,lng:-70.2676,pop:37,geoVerified:false},
 {id:'cl-pozo-almonte',name:'Pozo Almonte',country:'Cile',lat:-20.5447,lng:-70.0186,pop:57,geoVerified:false},
 {id:'cl-porvenir-chile',name:'Porvenir Chile',country:'Cile',lat:-53.30167,lng:-70.44583,pop:15,geoVerified:false},
 {id:'cl-la-florida-chile',name:'La Florida Chile',country:'Cile',lat:-33.6327,lng:-70.8509,pop:18,geoVerified:false},
 {id:'cl-concon',name:'Concón',country:'Cile',lat:-33.1837,lng:-71.6832,pop:36,geoVerified:false},
 {id:'cl-hualpen',name:'Hualpén',country:'Cile',lat:-36.77170,lng:-73.21800,pop:16,geoVerified:false},
 {id:'cl-pucon',name:'Pucón',country:'Cile',lat:-38.6883,lng:-72.6703,pop:41,geoVerified:false},
 {id:'cl-constitucion-chile',name:'Constitución Chile',country:'Cile',lat:-35.5197,lng:-71.9864,pop:15,geoVerified:false},
 {id:'cl-ancud',name:'Ancud',country:'Cile',lat:-41.64833,lng:-73.06795,pop:63,geoVerified:false},
 {id:'cl-taltal',name:'Taltal',country:'Cile',lat:-23.5559,lng:-70.3211,pop:26,geoVerified:false},
 {id:'cl-pica-chile',name:'Pica Chile',country:'Cile',lat:-19.90083,lng:-70.14961,pop:49,geoVerified:false},
 {id:'cl-puerto-williams',name:'Puerto Williams',country:'Cile',lat:-52.968,lng:-70.9871,pop:24,geoVerified:false},
 {id:'cl-las-condes',name:'Las Condes',country:'Cile',lat:-33.4148,lng:-70.5761,pop:36,geoVerified:false},
 {id:'cl-quillota',name:'Quillota',country:'Cile',lat:-32.79333,lng:-71.55047,pop:53,geoVerified:false},
 {id:'cl-coronel-chile',name:'Coronel Chile',country:'Cile',lat:-36.6032,lng:-72.8026,pop:22,geoVerified:false},
 {id:'cl-angol',name:'Angol',country:'Cile',lat:-38.7202,lng:-72.1673,pop:20,geoVerified:false},
 {id:'cl-san-javier-chile',name:'San Javier Chile',country:'Cile',lat:-35.2654,lng:-71.5212,pop:18,geoVerified:false},
 {id:'cl-castro-chile',name:'Castro Chile',country:'Cile',lat:-41.5842,lng:-73.2894,pop:36,geoVerified:false},
 {id:'cl-maria-elena',name:'María Elena',country:'Cile',lat:-23.4009,lng:-70.427,pop:35,geoVerified:false},
 {id:'cl-huara',name:'Huara',country:'Cile',lat:-20.2681,lng:-70.001,pop:24,geoVerified:false},
 {id:'cl-cerro-sombrero',name:'Cerro Sombrero',country:'Cile',lat:-53.27908,lng:-70.44395,pop:47,geoVerified:false},
 {id:'cl-providencia-chile',name:'Providencia Chile',country:'Cile',lat:-33.6288,lng:-70.5361,pop:47,geoVerified:false},
 {id:'cl-la-calera',name:'La Calera',country:'Cile',lat:-32.79333,lng:-71.55047,pop:35,geoVerified:false},
 {id:'cl-lota',name:'Lota',country:'Cile',lat:-36.9208,lng:-72.754,pop:61,geoVerified:false},
 {id:'pe-callao',name:'Callao',country:'Perù',lat:-12.20541,lng:-77.03919,pop:37,geoVerified:false},
 {id:'pe-cerro-colorado',name:'Cerro Colorado',country:'Perù',lat:-16.2595,lng:-71.2177,pop:26,geoVerified:false},
 {id:'pe-la-esperanza-peru',name:'La Esperanza Perú',country:'Perù',lat:-8.01342,lng:-79.18995,pop:14,geoVerified:false},
 {id:'pe-lambayeque',name:'Lambayeque',country:'Perù',lat:-6.8619,lng:-79.8593,pop:28,geoVerified:false},
 {id:'pe-sullana',name:'Sullana',country:'Perù',lat:-5.1197,lng:-80.7661,pop:37,geoVerified:false},
 {id:'pe-sicuani',name:'Sicuani',country:'Perù',lat:-13.4778,lng:-72.1027,pop:25,geoVerified:false},
 {id:'pe-el-tambo-peru',name:'El Tambo Perú',country:'Perù',lat:-11.8849,lng:-75.2412,pop:50,geoVerified:false},
 {id:'pe-nauta',name:'Nauta',country:'Perù',lat:-3.5254,lng:-73.1553,pop:22,geoVerified:false},
 {id:'pe-ventanilla',name:'Ventanilla',country:'Perù',lat:-12.20541,lng:-77.03919,pop:12,geoVerified:false},
 {id:'pe-cayma',name:'Cayma',country:'Perù',lat:-16.4806,lng:-71.8835,pop:60,geoVerified:false},
 {id:'pe-el-porvenir-peru',name:'El Porvenir Perú',country:'Perù',lat:-7.7076,lng:-79.0445,pop:44,geoVerified:false},
 {id:'pe-ferrenafe',name:'Ferreñafe',country:'Perù',lat:-7.02993,lng:-79.76571,pop:37,geoVerified:false},
 {id:'pe-talara',name:'Talara',country:'Perù',lat:-4.9008,lng:-80.5572,pop:37,geoVerified:false},
 {id:'pe-urubamba',name:'Urubamba',country:'Perù',lat:-13.8606,lng:-71.743,pop:43,geoVerified:false},
 {id:'pe-chilca-junin',name:'Chilca Junín',country:'Perù',lat:-11.8392,lng:-75.4639,pop:50,geoVerified:false},
 {id:'pe-yurimaguas',name:'Yurimaguas',country:'Perù',lat:-3.6773,lng:-73.0628,pop:49,geoVerified:false},
 {id:'pe-san-juan-de-lurigancho',name:'San Juan de Lurigancho',country:'Perù',lat:-12.2147,lng:-76.8334,pop:49,geoVerified:false},
 {id:'pe-yanahuara',name:'Yanahuara',country:'Perù',lat:-16.4904,lng:-71.4372,pop:66,geoVerified:false},
 {id:'pe-victor-larco-herrera',name:'Víctor Larco Herrera',country:'Perù',lat:-7.8505,lng:-79.3021,pop:31,geoVerified:false},
 {id:'pe-pimentel-peru',name:'Pimentel Perú',country:'Perù',lat:-6.6078,lng:-79.7097,pop:32,geoVerified:false},
 {id:'pe-paita',name:'Paita',country:'Perù',lat:-5.0115,lng:-80.5985,pop:36,geoVerified:false},
 {id:'pe-calca',name:'Calca',country:'Perù',lat:-13.2029,lng:-71.7263,pop:56,geoVerified:false},
 {id:'pe-jauja',name:'Jauja',country:'Perù',lat:-11.7882,lng:-75.1011,pop:24,geoVerified:false},
 {id:'pe-requena-peru',name:'Requena Perú',country:'Perù',lat:-3.5446,lng:-72.9918,pop:56,geoVerified:false},
 {id:'pe-comas',name:'Comas',country:'Perù',lat:-11.9483,lng:-77.1384,pop:12,geoVerified:false},
 {id:'pe-paucarpata',name:'Paucarpata',country:'Perù',lat:-16.2964,lng:-71.6293,pop:47,geoVerified:false},
 {id:'pe-huanchaco',name:'Huanchaco',country:'Perù',lat:-7.9377,lng:-78.9113,pop:46,geoVerified:false},
 {id:'pe-monsefu',name:'Monsefú',country:'Perù',lat:-6.386,lng:-79.8501,pop:40,geoVerified:false},
 {id:'co-soacha',name:'Soacha',country:'Colombia',lat:4.6525,lng:-74.2036,pop:63,geoVerified:false},
 {id:'co-bello-colombia',name:'Bello Colombia',country:'Colombia',lat:6.015,lng:-75.4376,pop:56,geoVerified:false},
 {id:'co-palmira-colombia',name:'Palmira Colombia',country:'Colombia',lat:3.3616,lng:-76.4335,pop:34,geoVerified:false},
 {id:'co-soledad-atlantico',name:'Soledad Atlántico',country:'Colombia',lat:10.9632,lng:-74.6456,pop:25,geoVerified:false},
 {id:'co-floridablanca',name:'Floridablanca',country:'Colombia',lat:7.2491,lng:-72.8222,pop:37,geoVerified:false},
 {id:'co-dosquebradas',name:'Dosquebradas',country:'Colombia',lat:4.4991,lng:-75.9485,pop:28,geoVerified:false},
 {id:'co-turbaco',name:'Turbaco',country:'Colombia',lat:10.57472,lng:-75.51283,pop:49,geoVerified:false},
 {id:'co-villa-del-rosario-colombia',name:'Villa del Rosario Colombia',country:'Colombia',lat:8.1144,lng:-72.6308,pop:50,geoVerified:false},
 {id:'co-chia',name:'Chía',country:'Colombia',lat:4.6994,lng:-73.8691,pop:44,geoVerified:false},
 {id:'co-itagui',name:'Itagüí',country:'Colombia',lat:6.4769,lng:-75.7086,pop:37,geoVerified:false},
 {id:'co-yumbo',name:'Yumbo',country:'Colombia',lat:3.5681,lng:-76.8091,pop:40,geoVerified:false},
 {id:'co-malambo',name:'Malambo',country:'Colombia',lat:10.86847,lng:-75.12661,pop:27,geoVerified:false},
 {id:'co-giron-santander',name:'Girón Santander',country:'Colombia',lat:7.0163,lng:-73.228,pop:61,geoVerified:false},
 {id:'co-santa-rosa-de-cabal',name:'Santa Rosa de Cabal',country:'Colombia',lat:5.0681,lng:-75.7997,pop:66,geoVerified:false},
 {id:'co-arjona-bolivar',name:'Arjona Bolívar',country:'Colombia',lat:10.3997,lng:-75.5945,pop:44,geoVerified:false},
 {id:'co-los-patios',name:'Los Patios',country:'Colombia',lat:7.9413,lng:-72.2614,pop:23,geoVerified:false},
 {id:'co-cajica',name:'Cajicá',country:'Colombia',lat:4.6773,lng:-74.1265,pop:60,geoVerified:false},
 {id:'co-envigado',name:'Envigado',country:'Colombia',lat:5.8403,lng:-75.5843,pop:51,geoVerified:false},
 {id:'co-jamundi',name:'Jamundí',country:'Colombia',lat:3.451,lng:-76.2966,pop:61,geoVerified:false},
 {id:'co-puerto-colombia',name:'Puerto Colombia',country:'Colombia',lat:11.11372,lng:-74.84333,pop:63,geoVerified:false},
 {id:'co-piedecuesta',name:'Piedecuesta',country:'Colombia',lat:6.8479,lng:-72.8675,pop:26,geoVerified:false},
 {id:'co-la-virginia',name:'La Virginia',country:'Colombia',lat:4.5748,lng:-75.3709,pop:19,geoVerified:false},
 {id:'co-magangue',name:'Magangué',country:'Colombia',lat:10.1239,lng:-75.4154,pop:62,geoVerified:false},
 {id:'co-pamplona-colombia',name:'Pamplona Colombia',country:'Colombia',lat:7.9856,lng:-72.4044,pop:25,geoVerified:false},
 {id:'co-zipaquira',name:'Zipaquirá',country:'Colombia',lat:4.6297,lng:-74.1221,pop:40,geoVerified:false},
 {id:'co-sabaneta-colombia',name:'Sabaneta Colombia',country:'Colombia',lat:6.0416,lng:-75.5509,pop:45,geoVerified:false},
 {id:'co-candelaria-valle',name:'Candelaria Valle',country:'Colombia',lat:3.6488,lng:-76.6178,pop:42,geoVerified:false},
 {id:'co-galapa',name:'Galapa',country:'Colombia',lat:11.11372,lng:-74.85423,pop:51,geoVerified:false},
 {id:'co-lebrija',name:'Lebrija',country:'Colombia',lat:7.1514,lng:-73.401,pop:36,geoVerified:false},
 {id:'co-marsella-risaralda',name:'Marsella Risaralda',country:'Colombia',lat:4.8518,lng:-75.5685,pop:25,geoVerified:false},
 {id:'ve-petare',name:'Petare',country:'Venezuela',lat:10.316,lng:-67.1698,pop:33,geoVerified:false},
 {id:'ve-san-francisco-zulia',name:'San Francisco Zulia',country:'Venezuela',lat:11.0089,lng:-71.6453,pop:16,geoVerified:false},
 {id:'ve-naguanagua',name:'Naguanagua',country:'Venezuela',lat:10.0541,lng:-67.7791,pop:20,geoVerified:false},
 {id:'ve-cabudare',name:'Cabudare',country:'Venezuela',lat:9.9577,lng:-69.0396,pop:44,geoVerified:false},
 {id:'ve-turmero',name:'Turmero',country:'Venezuela',lat:10.1821,lng:-67.7099,pop:12,geoVerified:false},
 {id:'ve-ciudad-bolivar',name:'Ciudad Bolívar',country:'Venezuela',lat:8.0843,lng:-62.8893,pop:45,geoVerified:false},
 {id:'ve-ejido-merida',name:'Ejido Mérida',country:'Venezuela',lat:8.7121,lng:-71.0512,pop:51,geoVerified:false},
 {id:'ve-tariba',name:'Táriba',country:'Venezuela',lat:7.7338,lng:-72.1628,pop:18,geoVerified:false},
 {id:'ve-guarenas',name:'Guarenas',country:'Venezuela',lat:10.4439,lng:-67.1988,pop:19,geoVerified:false},
 {id:'ve-cabimas',name:'Cabimas',country:'Venezuela',lat:10.5611,lng:-71.5107,pop:38,geoVerified:false},
 {id:'ve-san-diego-carabobo',name:'San Diego Carabobo',country:'Venezuela',lat:10.0215,lng:-67.972,pop:41,geoVerified:false},
 {id:'ve-duaca',name:'Duaca',country:'Venezuela',lat:9.8771,lng:-69.4623,pop:55,geoVerified:false},
 {id:'ve-cagua',name:'Cagua',country:'Venezuela',lat:10.4644,lng:-67.8019,pop:24,geoVerified:false},
 {id:'ve-upata',name:'Upata',country:'Venezuela',lat:8.6222,lng:-62.3576,pop:54,geoVerified:false},
 {id:'ve-tovar-merida',name:'Tovar Mérida',country:'Venezuela',lat:8.4146,lng:-71.0685,pop:19,geoVerified:false},
 {id:'ve-palmira-tachira',name:'Palmira Táchira',country:'Venezuela',lat:8.0352,lng:-72.1935,pop:52,geoVerified:false},
 {id:'ve-guatire',name:'Guatire',country:'Venezuela',lat:10.3821,lng:-66.7437,pop:21,geoVerified:false},
 {id:'ve-ciudad-ojeda',name:'Ciudad Ojeda',country:'Venezuela',lat:10.30334,lng:-71.39991,pop:61,geoVerified:false},
 {id:'ve-guacara',name:'Guacara',country:'Venezuela',lat:10.2635,lng:-68.118,pop:33,geoVerified:false},
 {id:'ve-quibor',name:'Quíbor',country:'Venezuela',lat:10.0709,lng:-69.253,pop:40,geoVerified:false},
 {id:'ve-la-victoria-aragua',name:'La Victoria Aragua',country:'Venezuela',lat:10.3557,lng:-67.5931,pop:25,geoVerified:false},
 {id:'ve-tumeremo',name:'Tumeremo',country:'Venezuela',lat:8.488,lng:-62.8618,pop:24,geoVerified:false},
 {id:'ve-el-vigia',name:'El Vigía',country:'Venezuela',lat:8.2218,lng:-71.0434,pop:53,geoVerified:false},
 {id:'ve-rubio-venezuela',name:'Rubio Venezuela',country:'Venezuela',lat:7.934,lng:-71.9959,pop:54,geoVerified:false},
 {id:'ve-los-teques',name:'Los Teques',country:'Venezuela',lat:10.62791,lng:-66.84589,pop:66,geoVerified:false},
 {id:'ec-sangolqui',name:'Sangolquí',country:'Ecuador',lat:-0.0014,lng:-78.2529,pop:56,geoVerified:false},
 {id:'ec-duran-ecuador',name:'Durán Ecuador',country:'Ecuador',lat:-2.186,lng:-80.2296,pop:23,geoVerified:false},
 {id:'ec-azogues',name:'Azogues',country:'Ecuador',lat:-3.2694,lng:-78.9514,pop:45,geoVerified:false},
 {id:'ec-montecristi-ecuador',name:'Montecristi Ecuador',country:'Ecuador',lat:-1.0148,lng:-80.7295,pop:56,geoVerified:false},
 {id:'ec-banos-de-agua-santa',name:'Baños de Agua Santa',country:'Ecuador',lat:-1.3719,lng:-78.375,pop:25,geoVerified:false},
 {id:'ec-catamayo',name:'Catamayo',country:'Ecuador',lat:-3.6857,lng:-79.1393,pop:12,geoVerified:false},
 {id:'ec-cumbaya',name:'Cumbayá',country:'Ecuador',lat:-0.1399,lng:-78.6185,pop:55,geoVerified:false},
 {id:'ec-samborondon',name:'Samborondón',country:'Ecuador',lat:-2.1813,lng:-80.0956,pop:47,geoVerified:false},
 {id:'ec-gualaceo',name:'Gualaceo',country:'Ecuador',lat:-2.8085,lng:-78.8182,pop:55,geoVerified:false},
 {id:'ec-jaramijo',name:'Jaramijó',country:'Ecuador',lat:-0.7795,lng:-80.5213,pop:59,geoVerified:false},
 {id:'ec-pelileo',name:'Pelileo',country:'Ecuador',lat:-0.9152,lng:-78.473,pop:62,geoVerified:false},
 {id:'ec-macara',name:'Macará',country:'Ecuador',lat:-4.1305,lng:-78.8737,pop:18,geoVerified:false},
 {id:'ec-tumbaco',name:'Tumbaco',country:'Ecuador',lat:-0.0834,lng:-78.2871,pop:54,geoVerified:false},
 {id:'ec-daule',name:'Daule',country:'Ecuador',lat:-1.9958,lng:-79.804,pop:36,geoVerified:false},
 {id:'ec-paute',name:'Paute',country:'Ecuador',lat:-3.0642,lng:-78.9363,pop:58,geoVerified:false},
 {id:'ec-bahia-de-caraquez',name:'Bahía de Caráquez',country:'Ecuador',lat:-1.01015,lng:-80.87477,pop:24,geoVerified:false},
 {id:'ec-pillaro',name:'Píllaro',country:'Ecuador',lat:-1.5259,lng:-78.7948,pop:50,geoVerified:false},
 {id:'ec-cariamanga',name:'Cariamanga',country:'Ecuador',lat:-3.7272,lng:-79.454,pop:42,geoVerified:false},
 {id:'ec-calderon-ecuador',name:'Calderón Ecuador',country:'Ecuador',lat:-0.3423,lng:-78.624,pop:33,geoVerified:false},
 {id:'ec-milagro-ecuador',name:'Milagro Ecuador',country:'Ecuador',lat:-2.0269,lng:-79.7753,pop:18,geoVerified:false},
 {id:'py-fernando-de-la-mora',name:'Fernando de la Mora',country:'Paraguay',lat:-25.384,lng:-57.6181,pop:34,geoVerified:false},
 {id:'py-presidente-franco',name:'Presidente Franco',country:'Paraguay',lat:-25.326,lng:-54.4721,pop:60,geoVerified:false},
 {id:'py-cambyreta',name:'Cambyretá',country:'Paraguay',lat:-27.0994,lng:-55.7108,pop:13,geoVerified:false},
 {id:'py-caaguazu',name:'Caaguazú',country:'Paraguay',lat:-25.1548,lng:-56.7005,pop:37,geoVerified:false},
 {id:'py-lambare',name:'Lambaré',country:'Paraguay',lat:-25.2227,lng:-57.7989,pop:45,geoVerified:false},
 {id:'py-hernandarias',name:'Hernandarias',country:'Paraguay',lat:-25.6558,lng:-54.8899,pop:41,geoVerified:false},
 {id:'py-capitan-miranda',name:'Capitán Miranda',country:'Paraguay',lat:-27.4054,lng:-55.6967,pop:37,geoVerified:false},
 {id:'py-villarrica-paraguay',name:'Villarrica Paraguay',country:'Paraguay',lat:-25.1668,lng:-56.2319,pop:17,geoVerified:false},
 {id:'py-villa-elisa',name:'Villa Elisa',country:'Paraguay',lat:-25.5062,lng:-57.7178,pop:37,geoVerified:false},
 {id:'py-minga-guazu',name:'Minga Guazú',country:'Paraguay',lat:-25.4495,lng:-54.5318,pop:34,geoVerified:false},
 {id:'py-hohenau',name:'Hohenau',country:'Paraguay',lat:-27.3247,lng:-55.7192,pop:24,geoVerified:false},
 {id:'py-carapegua',name:'Carapeguá',country:'Paraguay',lat:-25.2043,lng:-56.3619,pop:54,geoVerified:false},
 {id:'py-nemby',name:'Ñemby',country:'Paraguay',lat:-25.4389,lng:-57.2279,pop:57,geoVerified:false},
 {id:'py-santa-rita-paraguay',name:'Santa Rita Paraguay',country:'Paraguay',lat:-25.4625,lng:-54.4559,pop:25,geoVerified:false},
 {id:'py-obligado-paraguay',name:'Obligado Paraguay',country:'Paraguay',lat:-27.2146,lng:-56.1117,pop:15,geoVerified:false},
 {id:'py-paraguari',name:'Paraguarí',country:'Paraguay',lat:-25.4905,lng:-56.3685,pop:65,geoVerified:false},
 {id:'py-san-antonio-paraguay',name:'San Antonio Paraguay',country:'Paraguay',lat:-25.4663,lng:-57.3257,pop:25,geoVerified:false},
 {id:'bo-viacha',name:'Viacha',country:'Bolivia',lat:-16.7031,lng:-68.2268,pop:44,geoVerified:false},
 {id:'bo-montero',name:'Montero',country:'Bolivia',lat:-17.5401,lng:-62.9017,pop:16,geoVerified:false},
 {id:'bo-quillacollo',name:'Quillacollo',country:'Bolivia',lat:-17.6185,lng:-65.9711,pop:54,geoVerified:false},
 {id:'bo-yotala',name:'Yotala',country:'Bolivia',lat:-19.3664,lng:-65.0029,pop:20,geoVerified:false},
 {id:'bo-huanuni',name:'Huanuni',country:'Bolivia',lat:-17.8423,lng:-67.4754,pop:20,geoVerified:false},
 {id:'bo-yacuiba',name:'Yacuiba',country:'Bolivia',lat:-21.8777,lng:-64.6642,pop:62,geoVerified:false},
 {id:'bo-achocalla',name:'Achocalla',country:'Bolivia',lat:-16.7196,lng:-68.3574,pop:37,geoVerified:false},
 {id:'bo-warnes',name:'Warnes',country:'Bolivia',lat:-17.9356,lng:-63.4435,pop:66,geoVerified:false},
 {id:'bo-sacaba',name:'Sacaba',country:'Bolivia',lat:-17.7387,lng:-66.0558,pop:27,geoVerified:false},
 {id:'bo-tarabuco',name:'Tarabuco',country:'Bolivia',lat:-18.9819,lng:-64.9607,pop:57,geoVerified:false},
 {id:'bo-challapata',name:'Challapata',country:'Bolivia',lat:-18.1589,lng:-66.9108,pop:29,geoVerified:false},
 {id:'bo-bermejo-bolivia',name:'Bermejo Bolivia',country:'Bolivia',lat:-21.7586,lng:-64.5685,pop:17,geoVerified:false},
 {id:'bo-mecapaca',name:'Mecapaca',country:'Bolivia',lat:-16.4716,lng:-68.1996,pop:14,geoVerified:false},
 {id:'bo-la-guardia-bolivia',name:'La Guardia Bolivia',country:'Bolivia',lat:-17.8509,lng:-63.2498,pop:43,geoVerified:false},
 {id:'bo-tiquipaya',name:'Tiquipaya',country:'Bolivia',lat:-17.6254,lng:-65.9848,pop:29,geoVerified:false},
 {id:'uy-las-piedras',name:'Las Piedras',country:'Uruguay',lat:-34.5913,lng:-56.1836,pop:37,geoVerified:false},
 {id:'uy-san-carlos',name:'San Carlos',country:'Uruguay',lat:-34.90631,lng:-55.26422,pop:65,geoVerified:false},
 {id:'uy-bella-union',name:'Bella Unión',country:'Uruguay',lat:-31.4729,lng:-58.0344,pop:31,geoVerified:false},
 {id:'uy-trinidad',name:'Trinidad',country:'Uruguay',lat:-32.3381,lng:-58.2276,pop:45,geoVerified:false},
 {id:'uy-carmelo',name:'Carmelo',country:'Uruguay',lat:-34.58420,lng:-58.36458,pop:41,geoVerified:false},
 {id:'uy-la-paz-uruguay',name:'La Paz Uruguay',country:'Uruguay',lat:-34.76547,lng:-56.56333,pop:32,geoVerified:false},
 {id:'uy-piriapolis',name:'Piriápolis',country:'Uruguay',lat:-34.8766,lng:-55.3337,pop:36,geoVerified:false},
 {id:'uy-artigas',name:'Artigas',country:'Uruguay',lat:-31.3993,lng:-57.6856,pop:66,geoVerified:false},
 {id:'uy-durazno',name:'Durazno',country:'Uruguay',lat:-32.1964,lng:-58.3725,pop:52,geoVerified:false},
 {id:'uy-nueva-palmira',name:'Nueva Palmira',country:'Uruguay',lat:-34.4312,lng:-57.9008,pop:22,geoVerified:false},
 {id:'gy-bartica',name:'Bartica',country:'Guyana',lat:6.6499,lng:-57.9287,pop:56,geoVerified:false},
 {id:'gy-kwakwani',name:'Kwakwani',country:'Guyana',lat:6.0958,lng:-58.3464,pop:37,geoVerified:false},
 {id:'gy-anna-regina',name:'Anna Regina',country:'Guyana',lat:6.87791,lng:-58.27667,pop:41,geoVerified:false},
 {id:'gy-ituni',name:'Ituni',country:'Guyana',lat:5.8151,lng:-57.9952,pop:61,geoVerified:false},
 {id:'gy-vreed-en-hoop',name:'Vreed en Hoop',country:'Guyana',lat:6.67664,lng:-57.86615,pop:55,geoVerified:false},
 {id:'sr-meerzorg',name:'Meerzorg',country:'Suriname',lat:5.5315,lng:-55.2594,pop:53,geoVerified:false},
 {id:'sr-south-drain',name:'South Drain',country:'Suriname',lat:5.9909,lng:-57.1738,pop:29,geoVerified:false},
 {id:'sr-domburg-suriname',name:'Domburg Suriname',country:'Suriname',lat:5.8694,lng:-55.4293,pop:37,geoVerified:false},
 {id:'sr-henar',name:'Henar',country:'Suriname',lat:5.7225,lng:-57.266,pop:38,geoVerified:false},
 {id:'sr-groningen-suriname',name:'Groningen Suriname',country:'Suriname',lat:5.97585,lng:-55.39550,pop:65,geoVerified:false},
 {id:'ar-felix-u-camet',name:'Barrio Félix U. Camet',country:'Argentina',lat:-37.89299,lng:-57.53876,pop:1,geoVerified:true}
];
// Virtual continent: five million simulated residents, apportioned across
// geographic cities. The 3D renderer opens only one city's sample (<= 5000).
const CONTINENT_RESIDENTS=5000000;
const cityWeightTotal=CITY_CATALOG.reduce((sum,c)=>sum+c.pop,0);
let assignedResidents=0;
CITY_CATALOG.forEach((c,i)=>{
 c.rankWeight=c.pop;
 c.residents=i===CITY_CATALOG.length-1?CONTINENT_RESIDENTS-assignedResidents:
  Math.round(CONTINENT_RESIDENTS*c.rankWeight/cityWeightTotal);
 assignedResidents+=c.residents;
 c.points=Math.round(c.residents*(45+((i*37)%95)));
 c.pop=Math.max(1,Math.min(5000,Math.round(c.residents*.10)));
});
CITY_CATALOG.sort((a,b)=>b.points-a.points);
if(window.WorldAtlas)WorldAtlas.extend(CITY_CATALOG);
let currentCity=CITY_CATALOG.find(c=>c.id==='ar-mar-del-plata');
const scoreOverrides=new Map();
// Demo-only subscription state per city and owner. No payments or backend.
const designOverrides=new Map();
const colorOverrides=new Map();
// 0 points: no plants. At 1 point: pick one species. Gratis = 2,
// Premium = 4, with fixed slots for each house.
// Four handcrafted low-poly options for every unlockable decoration.
// Choice is stored per city, house and category, independently of design.
const GARDEN_CATALOG=[
 {id:'plant',min:1,label:'Cespuglio',options:['Sfera fiorita','Arbusto a foglie','Siepe compatta','Cespuglio a tre chiome']},
 {id:'path',min:10,label:'Vialetto',options:['Pietra chiara','Pietra scura','Cotto','Lastre separate']},
 {id:'flowers',min:20,label:'Aiuola',options:['Fiori misti','Rose rosse','Margherite','Lavanda']},
 {id:'lamp',min:35,label:'Lampioncino',options:['Classico','Globo','Lanterna quadrata','Paletto moderno']},
 {id:'bench',min:50,label:'Barbecue Premium',premium:true,options:['Muratura con cappa','Griglia con coperchio','Forno a legna','Cucina BBQ moderna']},
 {id:'mailbox',min:65,label:'Cassetta postale',options:['Rossa','Nera','Casetta','Acciaio']},
 {id:'fence',min:80,label:'Recinzione',options:['Legno','Ferro','Siepe','Muretto']},
 {id:'patio',min:90,label:'Piscina Premium',premium:true,options:['Piscina classica','Piscina ovale','Piscina sportiva','Piscina rotonda']}
];
const gardenChoices=new Map();
function gardenChoice(h,category){
 return gardenChoices.get(scoreOverrideKey(h.cityId,h.id)+':'+category)||0;
}
function housePlant(h){return gardenChoice(h,'plant');}
const GARDEN_PLANTS=GARDEN_CATALOG[0].options.map((name,i)=>({id:String(i),name}));
// One fixed architectural shape per evolution tier, with exactly two
// variants: standard and premium. Paint choices are independent of geometry.
const HOUSE_PAINTS=[
 {name:'Crema',wall:0xe6cba0,roof:0xa64e45},
 {name:'Bianco',wall:0xe9e7df,roof:0x6c6860},
 {name:'Rosa',wall:0xd9a99c,roof:0x95513e},
 {name:'Azzurro',wall:0xa0bfc3,roof:0x3e6583},
 {name:'Verde salvia',wall:0xaec8a4,roof:0x456b6b},
 {name:'Ocra',wall:0xd7a078,roof:0xb77a42},
 {name:'Grigio',wall:0xb4b9b7,roof:0x65515c},
 {name:'Terracotta',wall:0xc28c82,roof:0x6c6860}
];
// Coordinated architectural palette: wall, trims, pillars and plinth
// all derive from the user's selected paint rather than fixed ivory/white.
function coordinatedHouseColor(wall,other,amount){
 return new THREE.Color(wall).lerp(new THREE.Color(other),amount).getHex();
}
function housePaint(h){
 const index=colorOverrides.get(scoreOverrideKey(h.cityId,h.id))??0;
 return HOUSE_PAINTS[index]||HOUSE_PAINTS[0];
}
function isPremiumHouse(h){return designOverrides.get(scoreOverrideKey(h.cityId,h.id))??false;}

function scoreOverrideKey(city,id){return city+':'+id;}
let manualCityNavigation=false;
const cityStates=new Map(CITY_CATALOG.map(c=>[c.id,{count:c.pop,shops:Math.max(1,Math.round(c.pop/28)),balloons:Math.min(8,Math.max(1,Math.floor(c.pop/380)))}]));
const cities=L.layerGroup().addTo(map);
const cityPinIcon=L.divIcon({className:'south-city-pin',html:'<span></span>',iconSize:[22,22],iconAnchor:[11,11]});
const cityMarkers=new Map();
function cityZoomLevel(city){
 if(city.realPopulation!=null){const n=city.realPopulation;return n>=5000000?1:n>=1000000?3:n>=200000?4:n>=50000?5:n>=10000?7:n>=2000?9:11;}
 const r=city.residents;
 return r>=60000?3:r>=28000?4:r>=14000?5:r>=6500?6:r>=2600?7:r>=900?8:9;
}
function refreshCityMarkers(){
 const zoom=map.getZoom();
 const bounds=map.getBounds().pad(.16);
 const selected=[],pixelBuckets=new Map();
 const visibleIds=new Set();
 // Largest point totals first; declutter overlapping city pins.
 for(const city of (window.WorldAtlas?WorldAtlas.visible(bounds):CITY_CATALOG)){
  if(selected.length>=450&&city.id!==currentCity.id)continue;
  if(city.geoVerified===false)continue;
  if(city.id!==currentCity.id && (zoom<cityZoomLevel(city)||!bounds.contains([city.lat,city.lng])))continue;
  const pixel=map.latLngToContainerPoint([city.lat,city.lng]);
  const gap=zoom<5?37:zoom<7?30:zoom<9?23:15;
  const px=Math.floor(pixel.x/gap),py=Math.floor(pixel.y/gap);let overlaps=false;for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++)for(const pt of pixelBuckets.get((px+dx)+':'+(py+dy))||[])if(Math.hypot(pt.x-pixel.x,pt.y-pixel.y)<gap)overlaps=true;
  if(city.id!==currentCity.id&&overlaps)continue;
  const pixelKey=px+':'+py;if(!pixelBuckets.has(pixelKey))pixelBuckets.set(pixelKey,[]);pixelBuckets.get(pixelKey).push(pixel);selected.push(pixel);
  visibleIds.add(city.id);
  let marker=cityMarkers.get(city.id);
  if(!marker){
   const tooltip=document.createElement('span');tooltip.textContent=city.name+' · '+city.residents.toLocaleString('it-IT')+' abitanti simulati';
   marker=L.marker([city.lat,city.lng],{icon:cityPinIcon,zIndexOffset:1000,
    title:city.name+' · '+city.country}).bindTooltip(
     tooltip,{direction:'top'});
   marker.on('click',()=>selectCity(city.id,true));
   cityMarkers.set(city.id,marker);
  }
  if(!cities.hasLayer(marker))cities.addLayer(marker);
  const el=marker.getElement();
  if(el){
   el.classList.toggle('active-city',city.id===currentCity.id);
   el.style.zIndex=String(city.id===currentCity.id?9999:Math.max(1,Math.round(city.points/1000)));
  }
 }
 for(const [id,marker] of cityMarkers)if(!visibleIds.has(id)){cities.removeLayer(marker);cityMarkers.delete(id);}
}
map.on('zoomend moveend',refreshCityMarkers);
function updateCitySelection(){
 for(const city of CITY_CATALOG){
  const marker=cityMarkers.get(city.id);
  if(marker?.getElement())marker.getElement().classList.toggle('active-city',city.id===currentCity.id);
 }
 const select=$('citySelect');if(select){if(![...select.options].some(o=>o.value===currentCity.id)){const option=document.createElement('option');option.value=currentCity.id;option.textContent=currentCity.name;select.append(option);}select.value=currentCity.id;}
 const label=$('cityLabel');if(label)label.textContent=currentCity.name+' · '+currentCity.country;
 const name=$('currentCityName');if(name)name.textContent=currentCity.name;
 const overview=$('cityOverview');
 if(overview)overview.textContent=`${(window.WorldAtlas?.meta.total||CITY_CATALOG.length).toLocaleString('it-IT')} località nel catalogo · ${window.WorldAtlas?.countries.size||13} paesi e territori · simulazione · ${currentCity.residents.toLocaleString('it-IT')} in ${currentCity.name} · ${currentCity.points.toLocaleString('it-IT')} punti città · ${count.toLocaleString('it-IT')} case 3D caricate`;
 refreshCityMarkers();window.WorldRoads?.refresh();
}
function selectCity(id,fly=false){
 const next=window.WorldAtlas?.byId.get(id)||CITY_CATALOG.find(c=>c.id===id);
 if(!next||next.geoVerified===false)return;
 if(active)back();
 currentCity=next;
 if(!cityStates.has(next.id))cityStates.set(next.id,{count:next.pop,shops:Math.max(1,Math.round(next.pop/28)),balloons:Math.min(8,Math.max(1,Math.floor(next.pop/380)))});
 const state=cityStates.get(next.id);
 count=state.count;
 shopPurchases.length=0;
 for(let i=0;i<state.shops;i++)shopPurchases.push(shopLot(i));
 v4.balloons=state.balloons;
 count=state.count;
 homes=createHomes(count);
 $('counter').textContent=count.toLocaleString('it-IT');
 $('v4Population').textContent=count.toLocaleString('it-IT');
 syncPopulationControls();
 $('card').style.display='none';
 $('search').value=homes[0]?.user||'';
 target={x:-17,y:0,z:16};distance=115;azimuth=.72;elevation=.29;
 updateCitySelection();renderMilestones();
 if(fly){manualCityNavigation=true;map.flyTo([next.lat,next.lng],12,{duration:1.1});map.once('moveend',()=>{manualCityNavigation=false;});}
 else map.setView([next.lat,next.lng],12);
 $('status').textContent=`${next.name} · ${count} case demo · scegli Entra nel 3D`;
}
function cityAtMapCenter(){
 const center=map.getCenter();
 return (window.WorldAtlas?WorldAtlas.visible(map.getBounds().pad(.5)):CITY_CATALOG).filter(c=>c.geoVerified!==false).reduce((best,c)=>{
  const d=map.distance(center,[c.lat,c.lng]);
  return !best||d<best.distance?{city:c,distance:d}:best;
 },null);
}
let count=500,homes=[],threeReady=false,scene,camera,renderer,group,raycaster,houseMeshes=[],shown=0,active=false,target={x:-17,y:0,z:16},azimuth=.72,elevation=.29,distance=115,dragging=false,lastX=0,lastY=0,moved=false,panMode=true,pointers=new Map(),gesture=null;
const rnd=n=>{let x=Math.sin(n*127.13+19.1)*43758.5453;return x-Math.floor(x)};
// Urban layout v1.4: blocks, NOT one road per house.
// A block contains 30 private gardens. Streets are only between city blocks.
// Each username has a stable ordinal: existing coordinates never change.
// One city block is ~100×84 world units. Streets run ONLY on block boundaries.
// The central block is a public plaza, so residential growth begins around it.
const BLOCK_X=184, BLOCK_Z=92, LOT_COLS=8, LOT_ROWS=2;
const LOT_X=20.5, LOT_Z=45, STREET=11.5;
// v3.0: immutable, irregular city coordinates. Street spacing changes from
// block to block, but is a pure function of the grid coordinate. New users
// never cause any existing house or road to move.
// v4.1: ONE permanent Cartesian lattice. The road and lot layout
// never depends on the number of residents, shops, or civic milestones.
function blockAxis(index,axis){return index*(axis==='x'?BLOCK_X:BLOCK_Z)}
function blockCenter(col,row){return {x:blockAxis(col,'x'),z:blockAxis(row,'z')}}
function streetEdgeX(c){return (blockAxis(c,'x')+blockAxis(c+1,'x'))/2}
function streetEdgeZ(r){return (blockAxis(r,'z')+blockAxis(r+1,'z'))/2}

function spiralCell(n) {
  if(n===0)return {col:0,row:0};
  const k=Math.ceil((Math.sqrt(n+1)-1)/2), side=2*k, last=(2*k+1)**2-1, d=last-n;
  if(d<side)return {col:k-d,row:-k};
  if(d<2*side)return {col:-k,row:-k+d-side};
  if(d<3*side)return {col:-k+d-2*side,row:k};
  return {col:k,row:k-d+3*side};
}
// Every block has two rows of eight street-facing plots. All three uses
// share one immutable urban lot plan, independently of current counts.
const PUBLIC_STEPS=[
  {
    "at": 0,
    "kind": "park",
    "name": "Parco di quartiere",
    "phase": "Primi servizi"
  },
  {
    "at": 25,
    "kind": "water",
    "name": "Acquedotto e serbatoio",
    "phase": "Primi servizi"
  },
  {
    "at": 50,
    "kind": "clinic",
    "name": "Ambulatorio e pronto soccorso",
    "phase": "Primi servizi"
  },
  {
    "at": 80,
    "kind": "police",
    "name": "Stazione di polizia",
    "phase": "Primi servizi"
  },
  {
    "at": 120,
    "kind": "fire",
    "name": "Caserma dei pompieri",
    "phase": "Primi servizi"
  },
  {
    "at": 150,
    "kind": "nursery",
    "name": "Asilo e area giochi",
    "phase": "Primi servizi"
  },
  {
    "at": 180,
    "kind": "school",
    "name": "Scuola primaria",
    "phase": "Primi servizi"
  },
  {
    "at": 240,
    "kind": "recycling",
    "name": "Centro raccolta e riciclo",
    "phase": "Primi servizi"
  },
  {
    "at": 320,
    "kind": "football",
    "name": "Campo da calcio",
    "phase": "Servizi di quartiere"
  },
  {
    "at": 420,
    "kind": "library",
    "name": "Biblioteca pubblica",
    "phase": "Servizi di quartiere"
  },
  {
    "at": 550,
    "kind": "hospital",
    "name": "Ospedale generale",
    "phase": "Servizi di quartiere"
  },
  {
    "at": 700,
    "kind": "townhall",
    "name": "Municipio",
    "phase": "Servizi di quartiere"
  },
  {
    "at": 850,
    "kind": "bus",
    "name": "Autostazione",
    "phase": "Servizi di quartiere"
  },
  {
    "at": 1000,
    "kind": "power",
    "name": "Centrale elettrica di quartiere",
    "phase": "Servizi di quartiere"
  },
  {
    "at": 1150,
    "kind": "gardens",
    "name": "Giardini e area giochi",
    "phase": "Città in crescita"
  },
  {
    "at": 1300,
    "kind": "mall",
    "name": "Centro commerciale",
    "phase": "Città in crescita"
  },
  {
    "at": 1450,
    "kind": "baseball",
    "name": "Campo da baseball",
    "phase": "Città in crescita"
  },
  {
    "at": 1600,
    "kind": "sports",
    "name": "Centro sportivo",
    "phase": "Città in crescita"
  },
  {
    "at": 1800,
    "kind": "museum",
    "name": "Museo civico",
    "phase": "Città in crescita"
  },
  {
    "at": 2000,
    "kind": "theatre",
    "name": "Teatro e auditorium",
    "phase": "Città in crescita"
  },
  {
    "at": 2200,
    "kind": "pool",
    "name": "Piscina comunale",
    "phase": "Città in crescita"
  },
  {
    "at": 2500,
    "kind": "stadium",
    "name": "Stadio cittadino",
    "phase": "Città in crescita"
  },
  {
    "at": 2800,
    "kind": "university",
    "name": "Università e campus",
    "phase": "Grande città"
  },
  {
    "at": 3100,
    "kind": "station",
    "name": "Stazione ferroviaria",
    "phase": "Grande città"
  },
  {
    "at": 3400,
    "kind": "courthouse",
    "name": "Palazzo di giustizia",
    "phase": "Grande città"
  },
  {
    "at": 3800,
    "kind": "waterworks",
    "name": "Depuratore e servizi ambientali",
    "phase": "Grande città"
  },
  {
    "at": 4200,
    "kind": "monument",
    "name": "Piazza monumentale",
    "phase": "Grande città"
  },
  {
    "at": 4600,
    "kind": "heliport",
    "name": "Eliporto di soccorso",
    "phase": "Grande città"
  },
  {
    "at": 5000,
    "kind": "botanical",
    "name": "Orto botanico e serre",
    "phase": "Grande città"
  }
];
const HOUSE_LOTS_PER_BLOCK=10,SHOP_LOTS_PER_BLOCK=4;
const PUBLIC_BLOCK_INTERVAL=7;
// Four actual lots, TWO on each row, at a short end of the same block.
// No public building may use a lot assigned to a home or shop.
function facilityBlock(i){return i*PUBLIC_BLOCK_INTERVAL}
function facilitySlots(block){
  if(block%PUBLIC_BLOCK_INTERVAL!==0)return [];
  const right=(Math.floor(block/PUBLIC_BLOCK_INTERVAL)%2)===1;
  const first=right?LOT_COLS-2:0;
  return [first,first+1,LOT_COLS+first,LOT_COLS+first+1];
}
function facilityBounds(block){
  const slots=facilitySlots(block);
  if(slots.length!==4)throw Error('Invalid civic parcel');
  const parcels=slots.map(slot=>plotBounds(block,slot));
  const bb=blockBounds(block);
  const left=Math.max(bb.left,Math.min(...parcels.map(p=>p.left)));
  const right=Math.min(bb.right,Math.max(...parcels.map(p=>p.right)));
  const top=Math.max(bb.top,Math.min(...parcels.map(p=>p.top)));
  const bottom=Math.min(bb.bottom,Math.max(...parcels.map(p=>p.bottom)));
  const width=right-left,depth=bottom-top,x=(left+right)/2,z=(top+bottom)/2;
  if(width<20||depth<20)throw Error('Area pubblica troppo piccola '+block);
  return {x,z,width,depth,left,right,top,bottom};
}
// A single collision rule for every decorative generator.
// Civic parcels are reserved from the start, even before their milestones unlock.
function overlapsRect(x,z,w,d,b,margin=1.1){
 return x+w/2>b.left-margin&&x-w/2<b.right+margin&&
        z+d/2>b.top-margin&&z-d/2<b.bottom+margin;
}
function decorationAllowed(x,z,w,d){
 const col=Math.round(x/BLOCK_X),row=Math.round(z/BLOCK_Z);
 const bb=blockBoundsFromCell(col,row);
 if(!isInsideParcel(x,z,w,d,bb))return false;
 const block=cellBlockIndex(col,row);
 if(block!==null){
  // No landscaping/parking/playgrounds may overlap ANY permanently reserved lot.
  // This also protects lots which have not yet been purchased or occupied.
  for(let slot=0;slot<LOT_COLS*LOT_ROWS;slot++){
   if(overlapsRect(x,z,w,d,plotBounds(block,slot),.12))return false;
  }
  if(block%PUBLIC_BLOCK_INTERVAL===0&&overlapsRect(x,z,w,d,facilityBounds(block),.12))return false;
 }
 return true;
}
function cellBlockIndex(col,row){
 // Inverse of spiralCell, computed once and reused across rebuilding.
 const key=col+','+row;
 if(!cellBlockIndex.cache){
  cellBlockIndex.cache=new Map();
  for(let i=0;i<15000;i++){const c=spiralCell(i);cellBlockIndex.cache.set(c.col+','+c.row,i)}
 }
 return cellBlockIndex.cache.get(key)??null;
}
function slotType(block,slot){
  if(facilitySlots(block).includes(slot))return 'public';
  // Commercial corners and mid-block shops alternate with homes.
  return ((slot+block*3)%4===2)?'shop':'house';
}
const housePlots=[],shopPlots=[];
let allocationBlock=0;
function ensurePlots(type,id){
  const plots=type==='house'?housePlots:shopPlots;
  while(plots.length<=id){
    const block=allocationBlock++;
    for(let slot=0;slot<LOT_COLS*LOT_ROWS;slot++){
      const use=slotType(block,slot);
      if(use==='house')housePlots.push({block,slot});
      if(use==='shop')shopPlots.push({block,slot});
    }
  }
  return plots[id];
}
// The layout template is permanent per block. Houses and shops share the
// same fixed slots; only their positions inside the block differ.
function blockPattern(block){
  const style=districtStyle(block);
  const {col,row}=spiralCell(block);
  return {style,flip:Math.floor(rnd(block*19+3)*2)===1,
    stagger:style==='storico'||style==='giardino'||rnd(block*37+9)>.66,
    courtyard:style==='giardino'||(style==='moderno'&&rnd(block*41+5)>.5),
    rotate:Math.floor(rnd(block*47+6)*4)};
}
// Each lot is a fixed rectangle, not a randomized position.
// All future objects use the same coordinate and the same bounds.
const LOT_CLEARANCE=.025;
function blockBounds(block){
  const {col,row}=spiralCell(block);
  return {left:streetEdgeX(col-1)+STREET/2+1.23,
    right:streetEdgeX(col)-STREET/2-1.23,
    top:streetEdgeZ(row-1)+STREET/2+1.23,
    bottom:streetEdgeZ(row)-STREET/2-1.23};
}
function blockBoundsFromCell(col,row){
  return {left:streetEdgeX(col-1)+STREET/2+1.23,
    right:streetEdgeX(col)-STREET/2-1.23,
    top:streetEdgeZ(row-1)+STREET/2+1.23,
    bottom:streetEdgeZ(row)-STREET/2-1.23};
}
function plotBounds(block,slot){
  if(!Number.isInteger(block)||!Number.isInteger(slot)||slot<0||slot>=LOT_COLS*LOT_ROWS)throw Error('Identificativo lotto non valido: '+block+'/'+slot);
  const {col,row}=spiralCell(block);
  const lx=slot%LOT_COLS,lz=Math.floor(slot/LOT_COLS);
  const x=blockAxis(col,'x')+(lx-(LOT_COLS-1)/2)*LOT_X;
  const z=blockAxis(row,'z')+(lz-(LOT_ROWS-1)/2)*LOT_Z;
  const b=blockBounds(block);
  const left=Math.max(b.left,x-LOT_X/2+LOT_CLEARANCE);
  const right=Math.min(b.right,x+LOT_X/2-LOT_CLEARANCE);
  const top=Math.max(b.top,z-LOT_Z/2+LOT_CLEARANCE);
  const bottom=Math.min(b.bottom,z+LOT_Z/2-LOT_CLEARANCE);
  if(left>=right||top>=bottom)throw Error('Lotto senza spazio: '+block+'/'+slot);
  const halfW=Math.min(x-left,right-x),halfD=Math.min(z-top,bottom-z);
  if(halfW<6||halfD<9)throw Error('Lotto troppo stretto: '+block+'/'+slot);
  return {left:x-halfW,right:x+halfW,top:z-halfD,bottom:z+halfD,x,z,lx,lz};
}
function plotPosition(block,slot){
  const {col,row}=spiralCell(block);
  return {block,col,row,...plotBounds(block,slot)};
}
function isInsideParcel(x,z,w,d,b,eps=.01){
  return x-w/2>=b.left-eps&&x+w/2<=b.right+eps&&
         z-d/2>=b.top-eps&&z+d/2<=b.bottom+eps;
}
function assertInsideParcel(label,x,z,w,d,b){
  if(![x,z,w,d,b?.left,b?.right,b?.top,b?.bottom].every(Number.isFinite))throw Error(label+' coordinate non valide');
  if(!isInsideParcel(x,z,w,d,b))throw Error(label+' invade strada/lotto: '+JSON.stringify({x,z,w,d,b}));
}
const shopPurchases=[];
const shopProgress=new Map();
try {
 const saved=JSON.parse(localStorage.getItem('sudamerica-shop-progress')||'[]');
 if(Array.isArray(saved))for(const entry of saved){
  if(!Array.isArray(entry))continue;
  const [key,value]=entry;
  if(typeof key==='string'&&Number.isFinite(value?.points)&&value.points>=0)
   shopProgress.set(key,{points:value.points,premium:value.premium===true});
 }
}catch{}
function shopProgressFor(shop){
 return shopProgress.get(scoreOverrideKey(currentCity.id,shop.id))||{points:0,premium:false};
}
function facadeAngle(plot){return plot.lz===0?Math.PI:0}
function shopLot(id){
  const {block,slot}=ensurePlots('shop',id);
  const pos=plotPosition(block,slot);
  assertInsideParcel('Negozio '+id,pos.x,pos.z,17,18,pos);
  return {id,...pos,
    ownerId:Math.max(1,Math.min(count,1+Math.floor(rnd(id*127+(currentCity.catalogOrdinal??CITY_CATALOG.indexOf(currentCity))*19)*Math.max(1,count)))),
    owner:'',
    business:id%24===14?'Pizzeria':shopStyles[id%shopStyles.length]?.name||'Negozio'};
}
function citySquareRecords(){
 if(citySquareRecords.cache)return citySquareRecords.cache;
 try{const stored=JSON.parse(localStorage.getItem('sudamerica-city-squares-v2')||'{}');citySquareRecords.cache=stored&&typeof stored==='object'&&!Array.isArray(stored)?stored:{};}catch{citySquareRecords.cache={};}
 return citySquareRecords.cache;
}
function squareFromMap(city,elements){
 const valid=[];
 for(const element of elements||[]){
  if(element.type!=='way'||!Number.isSafeInteger(element.id)||element.id<=0||typeof element.tags?.name!=='string'||!element.tags.name.trim()||element.tags.name.length>200||!Array.isArray(element.geometry)||element.geometry.length<4)continue;
  if(element.tags.place!=='square'&&!(element.tags.highway==='pedestrian'&&element.tags.area==='yes'))continue;
  const ring=element.geometry;if(ring.length>800||!ring.every(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon)))continue;
  if(Math.abs(ring[0].lat-ring.at(-1).lat)>1e-6||Math.abs(ring[0].lon-ring.at(-1).lon)>1e-6)continue;
  const cos=Math.cos(city.lat*Math.PI/180),points=ring.map(p=>({x:(p.lon-city.lng)*111320*cos,z:-(p.lat-city.lat)*111320}));
  const xs=points.map(p=>p.x),zs=points.map(p=>p.z),minX=Math.min(...xs),maxX=Math.max(...xs),minZ=Math.min(...zs),maxZ=Math.max(...zs);
  const width=maxX-minX,depth=maxZ-minZ;if(width<8||depth<8||width>1500||depth>1500)continue;
  const area=Math.abs(points.reduce((sum,p,i)=>{const q=points[(i+1)%points.length];return sum+p.x*q.z-q.x*p.z;},0)/2);
  if(area<100||area>250000)continue;
  const range=Math.hypot((minX+maxX)/2,(minZ+maxZ)/2);
  if(range>3500)continue;
  const central=/principal|central|armas|mayor|independencia|matriz|grande/i.test(element.tags.name);
  const score=(element.tags.place==='square'?10000:0)+(central?1800:0)-range;
  valid.push({score,name:element.tags.name,outline:points.map(p=>({x:p.x-(minX+maxX)/2,z:p.z-(minZ+maxZ)/2})),source:'https://www.openstreetmap.org/way/'+element.id,osm:true,documented:true});
 }
 valid.sort((a,b)=>b.score-a.score);return valid[0]||null;
}
async function ensureCitySquare(city){
 if(!city||city.geoVerified===false||typeof window==='undefined'||window.CITY_SQUARE_DATA?.[city.id]||!window.PlazaMapResolver)return;
 const records=citySquareRecords();if(records[city.id]?.retryAfter>Date.now())return;
 const pending=ensureCitySquare.pending||(ensureCitySquare.pending=new Map());if(pending.has(city.id))return pending.get(city.id);
 const job=async()=>{
  try{const square=await window.PlazaMapResolver.resolve(city);records[city.id]={square,retryAfter:Date.now()+(square?90:7)*86400000};if(square&&currentCity.id===city.id&&active){rebuild();renderMilestones();}}
  catch{records[city.id]={square:null,retryAfter:Date.now()+86400000};}
  finally{pending.delete(city.id);try{localStorage.setItem('sudamerica-city-squares-v2',JSON.stringify(records));}catch{}}
 };
 const task=(ensureCitySquare.queue||Promise.resolve()).then(job);ensureCitySquare.queue=task.catch(()=>{});pending.set(city.id,task);return task;
}
function citySquareProfile(city){
 const bundled=typeof window!=='undefined'&&window.CITY_SQUARE_DATA?.[city.id];
 if(bundled){const profile={...bundled,realGeometry:true,stone:0xc9bda7,green:0x638d4c,palm:false};return window.SquareDetails?window.SquareDetails.enrich(profile,city):profile;}
 const profiles={
  'ar-buenos-aires':{name:'Plaza de Mayo',layout:'axial',stone:0xd8cbc0,green:0x6e9a58,palm:true,source:'https://buenosaires.gob.ar/gcaba_historico/plaza-de-mayo'},
  'ar-mar-del-plata':{name:'Plaza San Martín',layout:'garden',stone:0xd8d1c3,green:0x639457,palm:false,source:'https://turismomardelplata.gob.ar/ASP/SP/audioguias-extendida.htm'},
  'ar-quilmes':{name:'Plaza San Martín',layout:'diagonal',stone:0xcbb4a0,green:0x699c5a,palm:false,source:'https://www.quilmes.gov.ar/noticias/noticia.php?id_noti=3298'},
  'cl-santiago':{name:'Plaza de Armas',layout:'groves',stone:0xcec9bd,green:0x60925d,palm:true,source:'https://www.santiagoturismo.cl/es/plaza-de-armas/'},
  'pe-lima':{name:'Plaza Mayor',layout:'formal',stone:0xc6b59c,green:0x5c934d,palm:true,source:'https://visitalima.pe/experiencia/plaza-mayor-de-lima/'},
  'br-manaus':{name:'Largo de São Sebastião',layout:'wave',stone:0xd9d5c8,green:0x4b8656,palm:false,source:'https://www.manaus.am.gov.br/turismo/o-que-ver-e-fazer-em-manaus/'},
  'uy-montevideo':{name:'Plaza Independencia',layout:'axial',stone:0xc4beb0,green:0x749361,palm:true,source:'https://www.descubrimontevideo.uy/plaza-independencia?page=8'},
  'ec-quito':{name:'Plaza Grande',layout:'formal',stone:0xcbbbac,green:0x497b50,palm:true,source:'https://visitquito.ec/es/rutas-de-la-ciudad/'}
 };
 const record=citySquareRecords()[city.id]?.square;
 if(record?.realGeometry&&Array.isArray(record.outline)&&record.outline.length>=4&&record.outline.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.z)))return window.SquareDetails?window.SquareDetails.enrich({...record,stone:0xc9bda7,green:0x638d4c,palm:false},city):{...record,stone:0xc9bda7,green:0x638d4c,palm:false};
 if(record&&typeof record.name==='string'&&Array.isArray(record.outline)&&record.outline.length>=4&&record.outline.length<=800&&record.outline.every(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.z))&&/^https:\/\/www\.openstreetmap\.org\/way\/\d+$/.test(record.source))return {layout:'mapped',stone:0xcbbda6,green:0x67965b,palm:Math.abs(city.lat)<24,...record};
 if(profiles[city.id])return {...profiles[city.id],documented:true};
 const seed=Array.from(city.id).reduce((n,c)=>(Math.imul(n,31)+c.charCodeAt(0))>>>0,17);
 return {name:'Piazza civica di '+city.name,layout:['garden','diagonal','groves','formal','axial'][seed%5],stone:0xcbbda6,green:0x67965b,palm:Math.abs(city.lat)<24,seed,documented:false};
}
function addCitySquareNameSign(profile,b){
 const w=b.width,d=b.depth;
  // Every square, including automatic/default ones, always displays its city.
 const signWidth=Math.min(w*.20,8.0),signHeight=signWidth/4,signZ=b.z+d*.466;
 const material=new THREE.MeshBasicMaterial({map:billboardTexture([currentCity.name.toUpperCase(),profile.documented?profile.name:'PIAZZA CIVICA','PIAZZA PRINCIPALE'],'#234f63',{wide:true}),side:THREE.FrontSide,toneMapped:false});
 const geo=new THREE.PlaneGeometry(signWidth,signHeight);
 for(const rear of [false,true]){
  const label=new THREE.Mesh(geo,material);label.position.set(b.x-w*.26,1.30+signHeight/2,signZ+(rear?-.08:.08));label.rotation.y=rear?Math.PI:0;
  label.userData.citySquareName=currentCity.name;group.add(label);
 }
 const poleMaterial=new THREE.MeshStandardMaterial({color:0x344e4e,roughness:.8});
 for(const side of [-1,1]){const post=new THREE.Mesh(new THREE.BoxGeometry(.14,1.30,.14),poleMaterial);post.position.set(b.x-w*.26+side*signWidth*.43,.65,signZ);post.castShadow=true;group.add(post);}

}
function fitSquareToParcel(profile,b){
 const root=profile.outline,angles=[0,Math.PI/2];
 for(let i=1;i<root.length;i++){const a=root[i-1],c=root[i];if(Math.hypot(c.x-a.x,c.z-a.z)>.1){const angle=Math.atan2(c.z-a.z,c.x-a.x);angles.push(-angle,Math.PI/2-angle);}}
 let best;
 for(const angle of angles){const ca=Math.cos(angle),sa=Math.sin(angle),points=root.map(p=>({x:p.x*ca-p.z*sa,z:p.x*sa+p.z*ca}));
 const minX=Math.min(...points.map(p=>p.x)),maxX=Math.max(...points.map(p=>p.x)),minZ=Math.min(...points.map(p=>p.z)),maxZ=Math.max(...points.map(p=>p.z));
 const scale=Math.min((b.width-10)/Math.max(.1,maxX-minX),(b.depth-14)/Math.max(.1,maxZ-minZ));
 if(!best||scale>best.scale)best={angle,ca,sa,scale,cx:(minX+maxX)/2,cz:(minZ+maxZ)/2,width:(maxX-minX)*scale,depth:(maxZ-minZ)*scale};}
 best.point=p=>({x:(p.x*best.ca-p.z*best.sa-best.cx)*best.scale,z:(p.x*best.sa+p.z*best.ca-best.cz)*best.scale});return best;
}
function drawSurveyedCitySquare(profile,b){
 const fit=fitSquareToParcel(profile,b),root=profile.outline,scale=fit.scale;
 const detailPlan=typeof window!=='undefined'&&window.SquareDetails?window.SquareDetails.prepare(profile,fit,b,currentCity):null;
 const clearDetail=(x,z,r=0)=>!detailPlan||detailPlan.clear(x,z,r);
 const project=p=>{const q=fit.point(p);return new THREE.Vector2(q.x,-q.z);};
 const surfaceBatches=new Map(),batches=new Map(),dummy=new THREE.Object3D(),geometries={box:new THREE.BoxGeometry(1,1,1),round:new THREE.CylinderGeometry(.5,.5,1,12),leaf:new THREE.IcosahedronGeometry(1,1),ring:new THREE.TorusGeometry(.35,.045,6,16)};
 const put=(type,color,x,y,z,w,h,d,angle=0,casts=true)=>{
  if(x-w/2< -b.width/2+.15||x+w/2>b.width/2-.15||z-d/2< -b.depth/2+.15||z+d/2>b.depth/2-.15)return;
  const key=type+':'+color+':'+casts;if(!batches.has(key))batches.set(key,{type,color,casts,parts:[]});batches.get(key).parts.push({x,y,z,w,h,d,angle});
 };
 const box=(color,x,y,z,w,h,d,angle=0,casts=true)=>put('box',color,x,y,z,w,h,d,angle,casts);
 const segment=(a,c,color,width,height,y)=>{
  const dx=c.x-a.x,dz=c.z-a.z,length=Math.hypot(dx,dz);if(length<.02)return;
  put('box',color,(a.x+c.x)/2,y,(a.z+c.z)/2,width,height,length,Math.atan2(dx,dz),false);
 };
 const border=(ring,color,width,height,y)=>{for(let i=1;i<ring.length;i++)segment(fit.point(ring[i-1]),fit.point(ring[i]),color,width,height,y);};
 const polygon=(rings,color,y,raised=false)=>{
  if(!rings?.length)return;const shapes=[];let shape;
  const firstSign=Math.sign(THREE.ShapeUtils.area(rings[0].map(project)));
  for(const ring of rings){if(ring.length<4)continue;const points=ring.map(project),sign=Math.sign(THREE.ShapeUtils.area(points));if(!shape||sign===firstSign){shape=new THREE.Shape(points);shapes.push(shape);}else shape.holes.push(new THREE.Path(points));}
  if(!shapes.length)return;
  const key=color+':'+y;if(!surfaceBatches.has(key))surfaceBatches.set(key,{color,y,geometries:[]});surfaceBatches.get(key).geometries.push(new THREE.ShapeGeometry(shapes));
  if(raised)for(const ring of rings)border(ring,0xd9cebb,.16,.22,y-.06);
 };
 // The full permanent parcel is an architectural plaza, not an empty green backing sheet.
 box(0xc8bcaa,0,.22,0,b.width-.50,.22,b.depth-.50,0,false);
 for(const side of [-1,1]){
  box(0xe8deca,side*(b.width/2-.42),.39,0,.28,.30,b.depth-.70,0,false);
  box(0xe8deca,0,.39,side*(b.depth/2-.42),b.width-.70,.30,.28,0,false);
  box(0xa9947a,side*(b.width/2-4.1),.345,0,.18,.025,b.depth-2.2,0,false);
 }
 for(let z=-b.depth/2+4;z<b.depth/2-2;z+=4.5)for(const side of [-1,1])box(0xb1a18b,side*(b.width/2-2.35),.345,z,3.3,.02,.05,0,false);
 polygon([root,...(profile.holes||[])],profile.base==='lawn'?0x76965c:0xd2c5ad,.42);
 border(root,0xe5d8bd,.30,.24,.43);
 for(const surface of profile.surfaces||[]){const lawn=surface.kind==='lawn',water=surface.kind==='water';polygon(surface.rings,lawn?0x63894c:water?0x319bb5:0xded1b7,lawn?.57:water?.53:.49,lawn||water);}
 // Distribute the flower budget around each bed rather than filling only the first edge.
 const lawns=(profile.surfaces||[]).filter(surface=>surface.kind==='lawn'&&surface.rings?.[0]?.length>3);
 let blooms=0;const perBed=Math.max(1,Math.min(24,Math.floor(100/Math.max(1,lawns.length))));
 for(const surface of lawns){
  const ring=surface.rings[0],points=ring.map(fit.point),centre=points.reduce((p,q)=>({x:p.x+q.x/points.length,z:p.z+q.z/points.length}),{x:0,z:0});
  const lengths=[];let perimeter=0;for(let i=1;i<points.length;i++){const length=Math.hypot(points[i].x-points[i-1].x,points[i].z-points[i-1].z);lengths.push(length);perimeter+=length;}
  if(perimeter<2)continue;const count=Math.min(perBed,Math.max(1,Math.floor(perimeter/1.4)));
  for(let flower=0;flower<count&&blooms<100;flower++){
   let distance=(flower+.5)*perimeter/count,edge=0;while(edge<lengths.length-1&&distance>lengths[edge])distance-=lengths[edge++];
   const a=points[edge],c=points[edge+1],t=distance/Math.max(.001,lengths[edge]),x=(a.x+(c.x-a.x)*t)*.93+centre.x*.07,z=(a.z+(c.z-a.z)*t)*.93+centre.z*.07;
   if(!clearDetail(x,z,.35))continue;
   put('leaf',0x567d3e,x,.75,z,.24,.18,.24);
   for(let petal=0;petal<4;petal++){const angle=petal*Math.PI/2;put('leaf',[0xe5aecf,0xf1cd7a,0xe9dbca][blooms%3],x+Math.sin(angle)*.085,.95,z+Math.cos(angle)*.085,.09,.055,.09);}
   blooms++;
  }
 }
 const routes=profile.walkwayDetails?.length?profile.walkwayDetails:(profile.paths||[]).map(points=>({points}));
 for(const route of routes)for(let i=1;i<route.points.length;i++){
  const a=fit.point(route.points[i-1]),c=fit.point(route.points[i]),width=Math.max(.65,Math.min(1.8,(route.widthMeters||3)*scale));
  const color=/asphalt/i.test(route.surface||'')?0x9a9b90:/concrete/i.test(route.surface||'')?0xd1cdc0:0xe4d3b4;
  segment(a,c,color,width,.09,.56);
  const dx=c.x-a.x,dz=c.z-a.z,length=Math.hypot(dx,dz);if(length<.03)continue;
  for(const side of [-1,1]){const nx=-dz/length*width*.5*side,nz=dx/length*width*.5*side;segment({x:a.x+nx,z:a.z+nz},{x:c.x+nx,z:c.z+nz},0xc3b59d,.08,.12,.57);}
 }

 const bench=(x,z,angle=0)=>{
  if(!clearDetail(x,z,1.45))return;
  const ca=Math.cos(angle),sa=Math.sin(angle),part=(color,dx,y,dz,w,h,d)=>box(color,x+dx*ca+dz*sa,y,z-dx*sa+dz*ca,w,h,d,angle);
  for(let slat=-2;slat<=2;slat++)part(0xad7950,0,.88,slat*.115,2.1,.10,.087);
  for(let slat=0;slat<3;slat++)part(0xb88a57,0,1.14+slat*.14,-.30,2.1,.10,.08);
  for(const side of [-1,1]){part(0x344d48,side*.78,.59,0,.12,.62,.55);part(0x344d48,side*1.02,1.07,.02,.08,.14,.58);part(0x344d48,side*1.02,.98,-.22,.08,.50,.08);}
 };
 const lamp=(x,z)=>{
  if(!clearDetail(x,z,.35))return;
  put('round',0x314b48,x,2.38,z,.13,4,.13);put('round',0x425b51,x,.54,z,.34,.30,.34);
  box(0x314b48,x,4.53,z,.52,.10,.52);box(0xffdda0,x,4.32,z,.32,.34,.32);box(0x314b48,x,4.08,z,.45,.09,.45);
  for(const side of [-1,1])box(0x314b48,x+side*.17,4.31,z,.045,.42,.045);
 };
 const planter=(x,z,seed)=>{
  if(!clearDetail(x,z,1.55))return;
  box(0xd8c5a5,x,.56,z,1.40,.38,2.6,0,false);box(0x675a3d,x,.79,z,1.15,.09,2.34,0,false);
  for(let k=0;k<7;k++){
   const dx=Math.sin(k*9+seed)*.39,dz=(k-3)*.31;put('leaf',0x577e3e,x+dx,.99,z+dz,.28,.29,.28);
   const color=[0xd99ac4,0xf2cc72,0xf5d9d4][(k+seed)%3];for(let petal=0;petal<4;petal++){const a=petal*Math.PI/2;put('leaf',color,x+dx+Math.sin(a)*.095,1.20,z+dz+Math.cos(a)*.095,.10,.065,.10);}
  }
 };
 // Detailed perimeter promenade integrates irregular map footprints into the street block.
 for(const side of [-1,1])for(let i=0;i<7;i++){
  const z=-b.depth*.36+i*b.depth*.12,x=side*(b.width/2-2.1);
  if(i%2===0)lamp(x,z);else{planter(x,z,i);bench(side*(b.width/2-4.1),z,side*Math.PI/2);}
 }
 // Mapped planting is retained; sparse sources receive complementary planting in the promenade.
 const palmCity=['uy-montevideo','pe-lima','cl-santiago','ec-quito','br-manaus','br-brasilia'].includes(currentCity.id);
 const treePositions=[];
 for(const p of profile.trees||[]){const q=fit.point(p);if(Math.abs(q.x)<b.width/2-2&&Math.abs(q.z)<b.depth/2-3)treePositions.push(q);}
 if(!treePositions.length)for(const side of [-1,1])for(let i=0;i<5;i++)treePositions.push({x:side*(b.width/2-3.5),z:-b.depth*.32+i*b.depth*.16});
 const maxTrees=Math.min(72,treePositions.length);
 for(let i=0;i<maxTrees;i++){
  const p=treePositions[Math.floor(i*treePositions.length/maxTrees)],x=p.x,z=p.z;
  if(!clearDetail(x,z,1.65))continue;
  if(palmCity){
   put('round',0x88704e,x,2.75,z,.22,4.8,.22);
   for(let leaf=0;leaf<9;leaf++){const a=leaf*Math.PI*2/9;put('leaf',leaf%2?0x547f43:0x6c9048,x+Math.sin(a)*.64,5.21+Math.sin(a*2)*.12,z+Math.cos(a)*.64,.24,.13,1.2,a);}
  }else{
   put('round',0x75583d,x,1.95,z,.25,3.15,.25);
   for(let lobe=0;lobe<6;lobe++){const a=lobe*Math.PI*.8;put('leaf',[0x517b3e,0x67894a,0x789952][lobe%3],x+Math.sin(a)*.56,3.75+(lobe%3)*.36,z+Math.cos(a)*.48,.76,.85,.73,a);}
  }
 }
 // Extra space around square or compact outlines becomes furnished terraces.
 const gap=(b.depth-fit.depth)/2;
 if(gap>12)for(const side of [-1,1]){
  const z=side*(fit.depth/2+gap*.51);
  box(0xdccbb0,0,.40,z,12,.10,6.5,0,false);
  for(const x of [-4.7,4.7])bench(x,z,side<0?0:Math.PI);
  for(const x of [-7,7])planter(x,z,3);
  if(side<0){
   for(const x of [-5.7,5.7])for(const dz of [-2.6,2.6])box(0x92724e,x,2.03,z+dz,.20,3.3,.20);
   for(let slat=-8;slat<=8;slat++)box(slat%2?0xc8a778:0xb48a5f,slat*.70,3.79,z,.16,.17,5.9);
   for(const dz of [-2.75,2.75])box(0x98744c,0,3.61,z+dz,12,.20,.24);
  }
 }
 for(const side of [-1,1]){
  const x=side*(b.width/2-2.1),z=b.depth*.405;
  put('round',0x42796a,x,.90,z,.56,1.1,.56);put('round',0x2e5149,x,1.50,z,.63,.12,.63);
 }
 // Merge equal-height surfaces so a detailed plan does not create dozens of draw calls.
 for(const surface of surfaceBatches.values()){
  const positions=[];
  for(const source of surface.geometries){const expanded=source.index?source.toNonIndexed():source;for(const value of expanded.attributes.position.array)positions.push(value);if(expanded!==source)expanded.dispose();source.dispose();}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.computeVertexNormals();
  const mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:surface.color,roughness:surface.color===0x319bb5?.20:.88,metalness:surface.color===0x319bb5?.16:0,side:THREE.DoubleSide}));mesh.rotation.x=-Math.PI/2;mesh.position.set(b.x,surface.y,b.z);mesh.receiveShadow=true;mesh.castShadow=false;
  mesh.userData.citySquare={name:profile.name,documented:Boolean(profile.documented),source:profile.source||null,realGeometry:Boolean(profile.realGeometry),localDesign:Boolean(profile.localDesign)};group.add(mesh);
 }
 for(const batch of batches.values()){
  const mesh=new THREE.InstancedMesh(geometries[batch.type],new THREE.MeshStandardMaterial({color:batch.color,roughness:.83}),batch.parts.length);
  batch.parts.forEach((p,i)=>{dummy.position.set(b.x+p.x,p.y,b.z+p.z);dummy.rotation.set(0,p.angle,0);dummy.scale.set(p.w,p.h,p.d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);});
  mesh.computeBoundingSphere();mesh.castShadow=batch.casts;mesh.receiveShadow=true;mesh.userData.citySquareDetail=profile.name;mesh.userData.squareBatch= batch.type;group.add(mesh);
 }
 if(detailPlan){window.SquareDetails.render(detailPlan,group,b);group.userData.squareLandmarkCount=detailPlan.items.length;}
 group.userData.squareFit={angle:fit.angle,width:fit.width,depth:fit.depth,scale:fit.scale};
 addCitySquareNameSign(profile,b);return true;
}

function drawCitySquare(zone,b){
 const profile=citySquareProfile(currentCity);
 if(profile.realGeometry)return drawSurveyedCitySquare(profile,b);
 const w=b.width-10,d=b.depth-14;
 const rectangle=(cx,cz,width,depth)=>[{x:cx-width/2,z:cz-depth/2},{x:cx+width/2,z:cz-depth/2},{x:cx+width/2,z:cz+depth/2},{x:cx-width/2,z:cz+depth/2},{x:cx-width/2,z:cz-depth/2}];
 const surfaces=[-1,1].map(side=>({kind:'lawn',rings:[rectangle(side*w*.30,0,w*.22,d*.70)]}));
 return drawSurveyedCitySquare({name:'Piazza civica di '+currentCity.name,outline:rectangle(0,0,w,d),surfaces,paths:[],trees:[],benches:[],base:'paving',documented:false,realGeometry:false,localDesign:true},b);
}

function publicZones(){
  const zones=[];
  for(let i=0;i<PUBLIC_STEPS.length;i++){
    const step=PUBLIC_STEPS[i];
    if(count>=step.at)zones.push({...step,name:i===0?citySquareProfile(currentCity).name:step.name,block:facilityBlock(i)});
  }
  for(let i=PUBLIC_STEPS.length;count>=6000+(i-PUBLIC_STEPS.length)*1000;i++){
    const step=PUBLIC_STEPS[(i*5+3)%PUBLIC_STEPS.length];
    zones.push({...step,block:facilityBlock(i),name:step.name+' '+(Math.floor(i/PUBLIC_STEPS.length)+1)});
  }
  return zones;
}
// Stable, city-specific distribution: monolocali, villette, condomini
// and a minority of tall towers; no reroll when more users arrive.
const simulatedComments=[
 {user:'lazza',cityId:'ar-quilmes',residentId:1},
 {user:'dassell',cityId:'ar-felix-u-camet',residentId:1}
];
function demoResidentPoints(i,cityId){
 if(simulatedComments.some(comment=>comment.cityId===cityId&&comment.residentId===i+1))return 0;
 const citySeed=(window.WorldAtlas?.byId.get(cityId)?.catalogOrdinal??CITY_CATALOG.findIndex(c=>c.id===cityId))+1;
 const r=rnd((i+1)*71+citySeed*107);
 const magnitude=rnd((i+1)*31+citySeed*43);
 if(r<.40)return Math.floor(magnitude*500);
 if(r<.68)return 500+Math.floor(magnitude*3500);
 if(r<.87)return 4000+Math.floor(magnitude*6000);
 if(r<.967)return 10000+Math.floor(magnitude*15000);
 if(r<.995)return 25000+Math.floor(magnitude*35000);
 return 60000+Math.floor(magnitude*50000);
}
function createHomes(n){
  const result=[];
  for(let i=0;i<n;i++){
    const {block:blockIndex,slot}=ensurePlots('house',i);
    const pos=plotPosition(blockIndex,slot);
    assertInsideParcel('Casa '+(i+1),pos.x,pos.z,15,16,pos);
    result.push({id:i+1,cityId:currentCity.id,blockIndex,slot,...pos,
      user:simulatedComments.find(comment=>comment.cityId===currentCity.id&&comment.residentId===i+1)?.user??(i===0?(currentCity.id==='ar-mar-del-plata'?'Carlos75':'pionero_'+currentCity.id.replace(/[^a-z]/g,'')):i===1?'Lucia_'+currentCity.id.slice(0,2):i===2?'Mateo_'+currentCity.id.slice(0,2):'usuario_'+String(i+1).padStart(5,'0')),
      points:scoreOverrides.get(scoreOverrideKey(currentCity.id,i+1))??demoResidentPoints(i,currentCity.id),
      district:Math.max(Math.abs(pos.col),Math.abs(pos.row)),
      variant:(Math.floor(rnd(i+30)*9)+(currentCity.catalogOrdinal??CITY_CATALOG.indexOf(currentCity)))%9,type:(Math.floor(rnd(i+40)*7)+(currentCity.catalogOrdinal??CITY_CATALOG.indexOf(currentCity)))%7,garden:rnd(i+231+(currentCity.catalogOrdinal??CITY_CATALOG.indexOf(currentCity))*31)>.24});
  }
  return result;
}
// Visual release 6.7.0: procedural atmosphere with no external assets.
const coastalDirections={"ar-mar-del-plata":[1.426,3],"ar-buenos-aires":[2.173,3],"uy-montevideo":[0.06,3],"cl-valparaiso":[-2.445,3],"br-rio":[0.726,3],"br-salvador":[-1.19,3],"pe-lima":[-0.985,10],"co-cartagena":[-1.656,6],"ve-caracas":[-3.011,16],"gy-georgetown":[3.115,3],"sr-paramaribo":[-3.038,10],"ar-la-plata":[2.67,10],"ar-bahia-blanca":[0.224,10],"ar-necochea":[0.306,6],"ar-puerto-madryn":[1.833,3],"ar-trelew":[0.954,24],"ar-comodoro-rivadavia":[0.999,3],"ar-rio-gallegos":[1.739,3],"ar-ushuaia":[1.193,3],"br-santos":[0.449,3],"br-niteroi":[-0.043,6],"br-vitoria":[1.32,3],"br-vila-velha":[1.128,3],"br-florianopolis":[1.706,3],"br-joinville":[1.571,35],"br-itajai":[1.771,3],"br-criciuma":[0.68,24],"br-porto-alegre":[-0.222,3],"br-pelotas":[1.702,16],"br-rio-grande":[1.026,3],"br-belem":[-3.11,16],"br-macapa":[1.608,3],"br-sao-luis":[-2.134,3],"br-fortaleza":[2.816,3],"br-natal":[1.931,3],"br-joao-pessoa":[1.789,6],"br-recife":[1.099,3],"br-olinda":[1.203,3],"br-maceio":[0.553,3],"br-aracaju":[1.076,3],"cl-concepcion":[-1.904,6],"cl-talcahuano":[-1.642,3],"cl-valdivia":[-2.001,16],"cl-puerto-montt":[0.07,3],"cl-punta-arenas":[1.125,3],"cl-antofagasta":[-1.471,3],"cl-iquique":[-1.702,3],"cl-arica":[-1.309,3],"cl-la-serena":[-1.687,3],"cl-coquimbo":[-1.859,3],"cl-vina-del-mar":[-2.057,3],"uy-maldonado":[-0.183,6],"uy-punta-del-este":[0.131,3],"uy-colonia-del-sacramento":[-0.486,3],"pe-trujillo":[-0.759,6],"pe-chiclayo":[-0.881,16],"pe-chimbote":[-0.991,3],"ec-manta":[-2.947,3],"ec-portoviejo":[-2.487,24],"ec-machala":[-2.326,6],"ec-esmeraldas":[-3.065,3],"co-barranquilla":[-3.091,16],"co-santa-marta":[-2.233,3],"co-sincelejo":[-2.225,35],"co-riohacha":[-2.638,3],"co-buenaventura":[-1.194,3],"ve-maracaibo":[0.777,6],"ve-maracay":[-3.011,35],"ve-puerto-la-cruz":[-2.471,3],"ve-barcelona":[-2.447,6],"ve-cumana":[-2.72,3],"ve-coro":[3.12,10],"ve-puerto-cabello":[-3.127,3],"gy-new-amsterdam":[2.957,3],"sr-lelydorp":[3.142,35],"sr-nieuw-nickerie":[-3.045,3],"br-sao-vicente":[0.393,3],"br-duque-de-caxias":[0.169,10],"br-teresopolis":[0.524,24],"br-serra-espirito-santo":[1.178,24],"br-sao-jose-santa-catarina":[1.31,6],"br-jaragua-do-sul":[1.215,3],"br-balneario-camboriu":[1.702,3],"br-capao-do-leao":[1.293,6],"br-ananindeua":[-2.662,3],"br-sao-jose-de-ribamar":[-3.012,3],"br-caucaia":[2.618,3],"br-jaboatao-dos-guararapes":[1.194,3],"br-lauro-de-freitas":[0.378,3],"br-parnamirim-rio-grande-do-norte":[1.882,10],"br-bayeux":[1.29,6],"br-rio-largo":[0.882,3],"br-praia-grande-sao-paulo":[0.722,3],"br-nova-iguacu":[0.126,6],"br-cariacica":[1.036,3],"br-palhoca":[1.893,3],"br-camboriu":[1.856,24],"br-sao-lourenco-do-sul":[1.44,24],"br-marituba":[2.752,3],"br-paco-do-lumiar":[-0.512,3],"br-maracanau":[2.733,3],"br-olinda-pernambuco":[1.309,3],"br-camacari":[0.545,3],"br-sao-goncalo-do-amarante-rn":[1.833,3],"br-santa-rita-paraiba":[1.898,3],"br-marechal-deodoro":[0.782,10],"br-sao-cristovao-sergipe":[0.785,3],"br-santo-andre":[0.297,24],"br-guaruja":[0.273,3],"br-cacapava":[0.262,35],"br-sao-joao-de-meriti":[0.042,3],"br-viana-espirito-santo":[1.178,3],"br-biguacu":[1.152,3],"br-guaramirim":[1.674,6],"br-navegantes":[1.833,35],"br-viamao":[0.725,3],"br-benevides":[-2.88,24],"br-raposa-maranhao":[1.332,3],"br-eusebio":[2.733,3],"br-paulista-pernambuco":[1.28,16],"br-simoes-filho":[0.441,3],"br-macaiba":[1.833,3],"br-cabedelo":[1.833,3],"br-barra-dos-coqueiros":[0.916,16],"br-cubatao":[0.3,3],"br-belford-roxo":[0.022,3],"br-santo-amaro-da-imperatriz":[1.411,3],"br-araquari":[1.103,3],"br-pomerode":[1.702,35],"br-penha-santa-catarina":[1.702,35],"br-alcantara-maranhao":[-2.904,6],"br-aquiraz":[2.618,3],"br-camaragibe":[1.348,24],"br-dias-d-avila":[0.182,3],"br-extremoz":[1.833,35],"br-conde-paraiba":[1.62,3],"br-satuba":[0.929,6],"br-itaporanga-d-ajuda":[0.87,10],"br-bertioga":[0.902,3],"br-nilopolis":[0.924,10],"br-aracruz":[1.064,3],"ar-avellaneda":[2.542,3],"ar-miramar":[1.26,3],"ar-punta-alta":[-0.181,16],"ar-caleta-olivia":[1.089,16],"ar-lanus":[1.963,35],"ar-balcarce":[1.029,6],"ar-sarmiento":[1.647,6],"ar-lomas-de-zamora":[-0.802,3],"ar-mar-chiquita":[1.26,3],"ar-rada-tilly":[1.047,6],"ar-quilmes":[2.405,3],"ar-villa-gesell":[1.255,10],"ar-tornquist":[0.524,24],"ar-las-heras-santa-cruz":[1.146,24],"ar-berazategui":[0.739,3],"ar-pinamar":[1.02,10],"ar-pico-truncado":[0.906,6],"ar-florencio-varela":[2.618,3],"ar-dolores":[1.024,16],"cl-quilpue":[-1.639,10],"cl-chiguayante":[-1.895,16],"cl-puerto-varas":[-1.047,24],"cl-tocopilla":[-1.647,24],"cl-alto-hospicio":[-1.767,3],"cl-puerto-natales":[1.309,3],"cl-villa-alemana":[-1.183,6],"cl-san-pedro-de-la-paz":[-1.934,16],"cl-calbuco":[0.454,10],"cl-mejillones":[-1.833,35],"cl-pozo-almonte":[-1.702,24],"cl-porvenir-chile":[-1.399,3],"cl-concon":[-1.721,3],"cl-hualpen":[-1.833,3],"cl-ancud":[1.105,3],"cl-taltal":[-1.317,10],"cl-pica-chile":[-1.44,3],"cl-puerto-williams":[1.195,10],"cl-quillota":[-1.833,3],"cl-coronel-chile":[-2.03,16],"cl-castro-chile":[0.682,16],"cl-maria-elena":[-1.106,10],"cl-huara":[-1.633,16],"cl-cerro-sombrero":[-1.468,3],"cl-la-calera":[-1.833,3],"pe-callao":[-0.718,3],"pe-la-esperanza-peru":[-0.797,3],"pe-lambayeque":[-0.876,6],"pe-ventanilla":[-0.718,3],"pe-ferrenafe":[-0.797,3],"pe-san-juan-de-lurigancho":[-0.771,10],"pe-victor-larco-herrera":[-0.916,6],"pe-comas":[-1.349,3],"pe-huanchaco":[-0.785,35],"co-soledad-atlantico":[2.861,10],"co-turbaco":[-1.963,3],"co-malambo":[-2.487,3],"co-arjona-bolivar":[-1.634,3],"co-puerto-colombia":[-3.011,3],"co-magangue":[-1.797,16],"co-galapa":[-3.011,3],"ve-petare":[-2.88,35],"ve-san-francisco-zulia":[2.021,3],"ve-guarenas":[-2.981,16],"ve-cabimas":[-0.55,3],"ve-cagua":[-2.997,3],"ve-guatire":[3.142,35],"ve-ciudad-ojeda":[-1.047,3],"ve-guacara":[2.88,35],"ve-la-victoria-aragua":[-3.011,24],"ve-los-teques":[-3.011,3],"ec-montecristi-ecuador":[-2.437,10],"ec-jaramijo":[-2.094,3],"ec-bahia-de-caraquez":[-2.191,3],"uy-las-piedras":[0,35],"uy-san-carlos":[-0.382,3],"uy-carmelo":[2.225,3],"uy-la-paz-uruguay":[-0.393,3],"uy-piriapolis":[-0.262,3],"uy-nueva-palmira":[-0.857,3],"gy-bartica":[2.501,10],"gy-anna-regina":[2.946,3],"gy-vreed-en-hoop":[2.498,3],"sr-south-drain":[2.317,3],"sr-domburg-suriname":[3.077,16],"sr-groningen-suriname":[2.88,3],"ar-felix-u-camet":[1.342,3]};
const plataEstuary=new Set(['ar-buenos-aires','ar-quilmes','ar-avellaneda','ar-berazategui','ar-la-plata','uy-montevideo','uy-colonia-del-sacramento']);
let releaseSky=null;
let regionalWaterUniform=null;

// East is +X and north is -Z, matching the city compass.
function worldCityCells(selected=homes){
 const cells=new Map();for(const h of selected){const p=spiralCell(h.blockIndex);cells.set(p.col+':'+p.row,p);}for(const shop of shopPurchases){const p=spiralCell(shop.block);cells.set(p.col+':'+p.row,p);}for(const zone of publicZones()){const p=spiralCell(zone.block);cells.set(p.col+':'+p.row,p);}return [...cells.values()];
}
function buildRegionalLandscape(houses){
 const city=currentCity;
 const roadPlan=typeof window!=='undefined'&&window.WorldRoads&&window.WorldAtlas?window.WorldRoads.cityPlan(city,worldCityCells(houses),window.WorldAtlas):null;
 regionalWaterUniform=null;
 const coast=coastalDirections[city.id]||city.coast;
 const angle=coast?.[0]||0;
 const east=Math.sin(angle),south=Math.cos(angle);
 let minX=0,maxX=0,minZ=0,maxZ=0,shore=0;
 const developed=new Set(houses.map(house=>house.blockIndex));
 for(const shop of shopPurchases)developed.add(shop.block);
 for(const zone of publicZones())developed.add(zone.block);
 const cleared=new Set();
 for(const block of developed){
  const {col,row}=spiralCell(block);
  cleared.add(col+':'+row);
  const {x,z}=blockCenter(col,row);
  const halfX=BLOCK_X/2,halfZ=BLOCK_Z/2;
  minX=Math.min(minX,x-halfX);maxX=Math.max(maxX,x+halfX);
  minZ=Math.min(minZ,z-halfZ);maxZ=Math.max(maxZ,z+halfZ);
  shore=Math.max(shore,x*east+z*south+Math.abs(east)*halfX+Math.abs(south)*halfZ);
 }
 const region=window.WorldGeography?WorldGeography.makeRegion(city,{minX,maxX,minZ,maxZ,neighbors:roadPlan?.neighbors||[]}):null;
 if(region){group.userData.geography=region;for(const ground of scene.children.filter(m=>m.userData.regionalGround))WorldGeography.clipMaterial(ground.material,region);}
 const coastFrame=coast&&typeof window!=='undefined'&&window.WorldTerrain?window.WorldTerrain.coastFrame(coast,{minX,maxX,minZ,maxZ}):null;
 shore=coastFrame?coastFrame.shore:shore+85+(coast?.[1]||0)*1000;
 if(region?.hasWater){
  regionalWaterUniform={value:0};const waterClock=regionalWaterUniform;
  const material=new THREE.MeshStandardMaterial({color:0x238ba6,roughness:.43,metalness:.015});
  material.onBeforeCompile=shader=>{shader.uniforms.waterTime=waterClock;shader.vertexShader='varying vec2 waveXZ;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nwaveXZ=(modelMatrix*vec4(position,1.)).xz;');shader.fragmentShader='uniform float waterTime; varying vec2 waveXZ;\n'+shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\nfloat footprint=max(length(dFdx(waveXZ)),length(dFdy(waveXZ))); float detail=1.-smoothstep(1.,8.,footprint); float phaseA=dot(waveXZ,vec2(.83,.55))*.55-waterTime*1.05; float phaseB=dot(waveXZ,vec2(-.42,.91))*.79-waterTime*.76; float ripple=sin(phaseA)*.65+sin(phaseB)*.35; diffuseColor.rgb*=1.+ripple*.035*detail; diffuseColor.rgb=mix(vec3(.16,.53,.59),diffuseColor.rgb,smoothstep(0.,120.,-regionDistance)); float foam=pow(max(0.,sin(-regionDistance*.27-waterTime*.7+sin(waveXZ.x*.02))),12.)*(1.-smoothstep(0.,18.,-regionDistance)); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.72,.84,.85),foam*.22*detail);');shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\nvec3 waterNormal=normalize(vec3(-cos(phaseA)*.021*detail,1.,-cos(phaseB)*.015*detail)); normal=normalize((viewMatrix*vec4(waterNormal,0.)).xyz);');};
  WorldGeography.clipMaterial(material,region,'water');
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(100000,100000).rotateX(-Math.PI/2),material);sea.position.y=.04;sea.userData.regionalWater=true;group.add(sea);
 }
 const mountain=regionalMountain(city);
 const sky=releaseSky.material.uniforms;
 sky.ridgeDirection.value.set(Math.sin(mountain.angle),Math.cos(mountain.angle));
 sky.ridgeStrength.value=mountain.strength;
 let terrainHeight=()=>0;
 if(mountain.strength>.12){
  const axisX=Math.sin(mountain.angle),axisZ=Math.cos(mountain.angle);
  const edge=Math.max(minX*axisX,maxX*axisX)+Math.max(minZ*axisZ,maxZ*axisZ);
  const ridgeWidth=100000;
  const ridgeDepth=48000;
  const terrain=new THREE.PlaneGeometry(24000,12000,240,112);
  terrain.rotateX(-Math.PI/2);
  const position=terrain.attributes.position;
  const colors=[];
  const uv=terrain.attributes.uv;
  const meadow=new THREE.Color(0xc8d5ae),foothillGreen=new THREE.Color(0x8ba778);
  const stone=new THREE.Color(0x737c80),snow=new THREE.Color(0xe8eeed);
  const groundTint=new THREE.Color();
  const seed=city.lat*17+city.lng*9;

  function elevation(u,v){
   if(Math.abs(u)>ridgeWidth/2||Math.abs(v)>ridgeDepth/2)return 0;
   const inland=v+ridgeDepth/2;
   const start=90*Math.sin(u*.004+seed)+42*Math.sin(u*.009-seed);
   const approach=Math.max(0,Math.min(1,(inland-start)/2200));
   const toe=Math.max(0,Math.min(1,inland/280));
   const rise=approach*approach*(3-2*approach)*toe*toe*(3-2*toe);
   const ridges=.58+.18*Math.pow(Math.sin(u*.00032+inland*.00042+seed),2)
     +.16*Math.pow(Math.cos(u*.00062-inland*.00035),2);
   const crags=.98+.02*Math.sin(u*.0011+inland*.0007)*Math.cos(u*.0008-inland*.0009);
   const altitude=220+Math.min(inland,18000)*.16;
   return rise*ridges*crags*mountain.strength*altitude;
  }
  terrainHeight=(x,z)=>elevation(axisZ*x-axisX*z,axisX*x+axisZ*z-edge-160-ridgeDepth*.5);

  for(let index=0;index<position.count;index++){
   const oldU=position.getX(index),oldV=position.getZ(index),absU=Math.abs(oldU),u=absU<=9600?oldU:Math.sign(oldU)*(9600+(absU-9600)/2400*40400),t=(oldV+6000)/12000,inland=t<=.7?t/.7*8400:8400+(t-.7)/.3*39600,v=inland-ridgeDepth*.5;
   const along=edge+160+ridgeDepth*.5+v;
   const x=axisX*along+axisZ*u,z=axisZ*along-axisX*u;
   const peak=elevation(u,v);
   const dry=region?region.landDistance(x,z)<20:coast&&x*east+z*south>=shore-19;
   const y=dry?-.15:peak-.14;
   position.setXYZ(index,x,y,z);
   uv.setXY(index,.5+x/12000,.5-z/12000);
   
   const rock=Math.max(0,Math.min(1,(peak-110)/360));
   groundTint.copy(meadow).lerp(foothillGreen,Math.min(1,peak/170)).lerp(stone,rock);
   if(peak>620)groundTint.lerp(snow,Math.min(.92,(peak-620)/430));

   colors.push(groundTint.r,groundTint.g,groundTint.b);
  }
  terrain.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  terrain.computeVertexNormals();
  if(region)terrainHeight=WorldGeography.heightSampler(terrain,axisX,axisZ,edge);

  const mountainMaterial=new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,map:homePattern('grass')});
  mountainMaterial.onBeforeCompile=shader=>{
   shader.vertexShader='varying float mountainAltitude;\n'+shader.vertexShader.replace('#include <begin_vertex>',
    '#include <begin_vertex>\nmountainAltitude=position.y;');
   shader.fragmentShader='varying float mountainAltitude;\n'+shader.fragmentShader.replace('#include <map_fragment>',
    '#ifdef USE_MAP\nvec4 terrainTexel=texture2D(map,vMapUv); diffuseColor*=mix(terrainTexel,vec4(1.),smoothstep(80.,220.,mountainAltitude));\n#endif');
  };
  mountainMaterial.customProgramCacheKey=()=> 'continuous-mountain-meadow';
  if(region)WorldGeography.clipMaterial(mountainMaterial,region,'mountain');
  const foothills=new THREE.Mesh(terrain,mountainMaterial);
  foothills.receiveShadow=true;
  foothills.userData.regionalMountain=true;
  group.add(foothills);
 }



 if(roadPlan&&window.WorldTerrain)window.WorldTerrain.prepare(roadPlan,terrainHeight,region||coastFrame);
 if(roadPlan)group.userData.roadPlan=roadPlan;
 group.userData.terrainHeight=terrainHeight;
 if(roadPlan)window.WorldRoads.draw3D(roadPlan,group,terrainHeight,(x,z)=>region?region.landDistance(x,z)>15:!coast||x*east+z*south<shore-20);
 const candidates=[],spacing=48,horizon=6500;
 for(let col=Math.floor(-horizon/spacing);col<=Math.ceil(horizon/spacing);col++){
  for(let row=Math.floor(-horizon/spacing);row<=Math.ceil(horizon/spacing);row++){
   const i=col*73856093^row*19349663;
   const x=(col+rnd(i+city.lng))*spacing,z=(row+rnd(i+city.lat+37))*spacing;
   const radial=Math.hypot(x,z),nearKeep=1-Math.max(0,Math.min(1,(radial-4700)/1900));
   if(radial>6500||rnd(i+1927)>nearKeep)continue;
   if((roadPlan?.neighbors||[]).some(n=>Math.hypot(x-n.x,z-n.z)<n.radius+40))continue;
   let developedHere=false;
   for(let c=Math.round((x-28)/BLOCK_X);c<=Math.round((x+28)/BLOCK_X);c++)
    for(let r=Math.round((z-28)/BLOCK_Z);r<=Math.round((z+28)/BLOCK_Z);r++)
     if(cleared.has(c+':'+r))developedHere=true;
   if(developedHere||(region?region.landDistance(x,z)<35:coast&&x*east+z*south>shore-35)||roadPlan&&window.WorldRoads.distanceToRoad(x,z,roadPlan)<18)continue;
   const gap=Math.hypot(Math.max(minX-x,0,x-maxX),Math.max(minZ-z,0,z-maxZ));
   const transition=Math.max(0,Math.min(1,gap/1500));
   const density=.16+.73*transition*transition*(3-2*transition);
   const grove=.91+.09*Math.sin(x*.004)*Math.cos(z*.003);
   const aridity=region?.aridity(x,z)||0,coldness=region?.coldness(x,z)||0;
   if(rnd(i*79)>density*grove*(1-aridity*.987)*(1-coldness*.97))continue;
   const ground=terrainHeight(x,z);
   if(rnd(i+731)>1-Math.max(0,Math.min(1,(ground-650)/600)))continue;
   candidates.push({x,z,i,aridity,y:Math.max(0,ground-.15),detailed:gap<220});
  }
 }
 group.userData.nearForestTrees=candidates.length;
 const canopyMaterial=new THREE.MeshStandardMaterial({roughness:1});
 const barkMaterial=new THREE.MeshStandardMaterial({color:0x645039,roughness:1});
 const nearCount=candidates.filter(tree=>tree.detailed).length;
 const canopies=[nearCount,candidates.length-nearCount].map((count,index)=>
  new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,index===0?1:0),canopyMaterial,count));
 const trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.35,.62,1,6),barkMaterial,candidates.length);
 trunks.userData.regionalForest=true;
 const dummy=new THREE.Object3D(),color=new THREE.Color(),indices=[0,0];
 candidates.forEach(({x,z,i,y,detailed,aridity},index)=>{
  const baseSize=rnd(i*21)<.72?3+rnd(i*21+9)*5:8+rnd(i*21+9)*5;
  const size=baseSize*(1-aridity*.78);
  const trunkHeight=size*.71;
  dummy.position.set(x,y+trunkHeight*.5,z);
  dummy.rotation.set(0,0,0);
  dummy.scale.set(size*.20,trunkHeight,size*.20);
  dummy.updateMatrix();trunks.setMatrixAt(index,dummy.matrix);
  const tall=rnd(i*63)>.65,detail=detailed?0:1,canopy=canopies[detail],slot=indices[detail]++;
  dummy.position.set(x,y+trunkHeight+size*.39,z);
  dummy.rotation.y=rnd(i*87)*Math.PI;
  dummy.scale.set(size*(tall?.52:.88),size*(tall?1.20:.72),size*(tall?.52:.83));
  dummy.updateMatrix();canopy.setMatrixAt(slot,dummy.matrix);
  canopy.setColorAt(slot,color.setHSL(.22+rnd(i*31)*.10,.30+rnd(i*47)*.27,.21+rnd(i*12)*.16));
 });
 for(const mesh of [trunks,...canopies]){
  if(!mesh.count)continue;
  mesh.computeBoundingSphere();
  mesh.castShadow=true;mesh.receiveShadow=true;
  group.add(mesh);
 }

 if(region&&window.WorldForest)WorldForest.build({group,region,plan:roadPlan,height:terrainHeight,city,bounds:{minX,maxX,minZ,maxZ}});
 if(roadPlan&&window.WorldNeighbors)WorldNeighbors.build({group,plan:roadPlan,height:terrainHeight,states:cityStates,getCamera:()=>({target:{...target},distance,azimuth,elevation}),setCamera:state=>{Object.assign(target,state.target);distance=state.distance;azimuth=state.azimuth;elevation=state.elevation;updateCamera();},onEnter:enterNeighborCity});
}
function regionalMountain(city){
 if(typeof window!=='undefined'&&window.WorldAtlas)return window.WorldAtlas.mountain(city);
 // Approximate Andean ridge axis. Coastal and inland cities use the same compass.
 const ridge=[[-56,-70],[-47,-73],[-39,-71],[-33,-70],[-25,-68],[-18,-69],[-12,-75],[-5,-79],[0,-78],[6,-75],[10,-72]];
 for(let i=1;i<ridge.length;i++){
  const [lowLat,lowLng]=ridge[i-1],[highLat,highLng]=ridge[i];
  if(city.lat>highLat||city.lat<lowLat)continue;
  const axis=lowLng+(highLng-lowLng)*(city.lat-lowLat)/(highLat-lowLat);
  const offset=(axis-city.lng)*Math.cos(city.lat*Math.PI/180);
  return {angle:offset>=0?Math.PI/2:-Math.PI/2,strength:Math.max(0,1-Math.abs(offset)/3.6)};
 }
 return {angle:0,strength:0};
}

function installReleaseSky(){
 const mat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:{ridgeDirection:{value:new THREE.Vector2(1,0)},ridgeStrength:{value:0}},
 vertexShader:`varying vec3 d;void main(){d=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
 fragmentShader:`
 varying vec3 d;
 uniform vec2 ridgeDirection;
 uniform float ridgeStrength;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){
   vec2 i=floor(p),f=fract(p);
   f=f*f*(3.-2.*f);
   return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
              mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
 }
 void main(){
   vec3 ray=normalize(d);
   float height=ray.y;
   vec3 color=mix(vec3(.68,.86,.98),vec3(.035,.54,.92),smoothstep(-.015,.23,height));
   vec2 cloudPlane=ray.xz/max(height+.10,.09);
   float cloud=.60*noise(cloudPlane*3.)+.27*noise(cloudPlane*7.)+.13*noise(cloudPlane*17.);
   color=mix(color,mix(vec3(.69,.79,.87),vec3(1.,.99,.95),smoothstep(.56,.77,cloud)),
             smoothstep(.55,.70,cloud)*smoothstep(.025,.14,height));
   for(int layer=0;layer<3;layer++){
     float l=float(layer);
     vec2 ridge=ray.xz*(4.+l*2.)+vec2(l*17.,0.);
     float influence=smoothstep(-.22,.76,dot(normalize(ray.xz+vec2(.00001)),ridgeDirection))*ridgeStrength;
     float summit=(.007+(.106-l*.017)*pow(noise(ridge),1.7)+.009*noise(ridge*5.))*influence;
     float lightSide=noise(ridge*5.+vec2(height*95.,height*65.));
     vec3 rock=mix(vec3(.27,.49,.65),vec3(.15,.34,.49),l*.35);
     rock*=.85+lightSide*.27;
     float snow=smoothstep(.054,.089,height+lightSide*.022)*smoothstep(.064,.088,summit);
     vec3 slope=mix(rock,vec3(.89,.94,.97),snow);
     color=mix(color,slope,smoothstep(.015,.10,influence)*(1.-smoothstep(summit-.001,summit+.001,height)));
   }
   gl_FragColor=vec4(color,1.);
 }`});
 releaseSky=new THREE.Mesh(new THREE.SphereGeometry(3000,32,20),mat);releaseSky.frustumCulled=false;releaseSky.renderOrder=-1000;scene.add(releaseSky);
}
function makeScene(){if(!window.THREE){$('status').textContent='Motore 3D non caricato. Verifica Internet e ricarica.';return false}scene=new THREE.Scene();scene.background=new THREE.Color(0x9bc9e7);scene.fog=new THREE.FogExp2(0xb4d1e2,.000048);installReleaseSky();camera=new THREE.PerspectiveCamera(53,1,2,8000);renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=false;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=0.98;$('threeLayer').appendChild(renderer.domElement);scene.add(new THREE.HemisphereLight(0xc2dbff,0xb5a082,.96));let sun=new THREE.DirectionalLight(0xffe2b8,3.35);sun.position.set(130,240,90);scene.add(sun);if(window.SudamericaRender8)SudamericaRender8.setup(scene,camera,renderer);let ground=new THREE.Mesh(new THREE.PlaneGeometry(100000,100000),new THREE.MeshStandardMaterial({color:0xc8d5ae,roughness:1,map:homePattern('grass')}));ground.rotation.x=-Math.PI/2;ground.position.y=-.12;ground.receiveShadow=true;ground.userData.regionalGround=true;scene.add(ground);group=new THREE.Group();scene.add(group);raycaster=new THREE.Raycaster();let canvas=renderer.domElement;
// Earth-style navigation: left drag pans the ground, right drag or Shift
// rotates/tilts, wheel zooms toward the cursor, two fingers pan/pinch/rotate.
canvas.style.touchAction='none';
canvas.addEventListener('contextmenu',e=>e.preventDefault());
const pointerStart=new Map();
canvas.addEventListener('pointerdown',e=>{
 pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
 pointerStart.set(e.pointerId,{x:e.clientX,y:e.clientY});
 dragging=true;moved=false;
 gesture=pointers.size>1?'pinch':(e.button===2||e.shiftKey||!panMode?'orbit':'pan');
 canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove',e=>{
 if(!pointers.has(e.pointerId))return;
 const old=pointers.get(e.pointerId);
 pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
 const dx=e.clientX-old.x,dy=e.clientY-old.y;
 if(pointers.size>=2){
  const ids=[...pointers.keys()].slice(0,2),pts=ids.map(id=>pointers.get(id));
  const prev=ids.map(id=>id===e.pointerId?old:pointers.get(id));
  const length=a=>Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y);
  const before=length(prev),after=length(pts);
  if(before>3&&after>3)zoomBy(before/after);
  const beforeAng=Math.atan2(prev[1].y-prev[0].y,prev[1].x-prev[0].x);
  const afterAng=Math.atan2(pts[1].y-pts[0].y,pts[1].x-pts[0].x);
  azimuth-=afterAng-beforeAng;
  panPixels((pts[0].x+pts[1].x-prev[0].x-prev[1].x)/2,(pts[0].y+pts[1].y-prev[0].y-prev[1].y)/2);
  moved=true;updateCamera();return;
 }
 const origin=pointerStart.get(e.pointerId);
 if(origin&&Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>4)moved=true;
 if(gesture==='pan')panPixels(dx,dy);
 else{azimuth-=dx*.006;elevation=clamp(elevation+dy*.005,.22,1.55);}
 updateCamera();
});
canvas.addEventListener('pointerup',e=>{
 const start=pointerStart.get(e.pointerId);
 pointers.delete(e.pointerId);pointerStart.delete(e.pointerId);
 if(!pointers.size){dragging=false;gesture=null;
  if(start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)<5&&e.button===0)pick(e);
 }else gesture='pinch';
});
canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);pointerStart.delete(e.pointerId);dragging=false;gesture=null;});
canvas.addEventListener('wheel',e=>{
 e.preventDefault();
 const before=screenToGround(e.clientX,e.clientY);
 zoomBy(Math.exp(-e.deltaY*.0012));
 updateCamera();
 const after=screenToGround(e.clientX,e.clientY);
 if(before&&after){target.x+=before.x-after.x;target.z+=before.z-after.z;updateCamera();}
},{passive:false});
window.addEventListener('keydown',e=>{
 if(!active||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
 const step=Math.max(2,distance*.045);
 const forward={x:Math.sin(azimuth),z:Math.cos(azimuth)};
 const right={x:Math.cos(azimuth),z:-Math.sin(azimuth)};
 let dx=0,dz=0;
 if(['w','ArrowUp'].includes(e.key)){dx-=forward.x*step;dz-=forward.z*step;}
 if(['s','ArrowDown'].includes(e.key)){dx+=forward.x*step;dz+=forward.z*step;}
 if(['a','ArrowLeft'].includes(e.key)){dx-=right.x*step;dz-=right.z*step;}
 if(['d','ArrowRight'].includes(e.key)){dx+=right.x*step;dz+=right.z*step;}
 if(dx||dz){e.preventDefault();target.x+=dx;target.z+=dz;updateCamera();}
 if(e.key==='+'||e.key==='='){zoomBy(1.25);updateCamera();}
 if(e.key==='-'){zoomBy(.8);updateCamera();}
 if(e.key==='r'){azimuth=0;elevation=.95;updateCamera();}
});
window.addEventListener('resize',resize);threeReady=true;resize();animate();return true}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function zoomBy(factor){distance=clamp(distance/Math.max(.01,factor),12,5200);}
function panPixels(dx,dy){
 // Pixel-to-ground projection using the camera's actual right and up vectors.
 // This stays consistent at every tilt angle.
 const scale=2*distance*Math.tan(camera.fov*Math.PI/360)/Math.max(1,renderer.domElement.clientHeight);
 const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0);
 const up=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,1);
 const flatY=Math.max(.22,Math.sin(elevation));
 target.x+=(-dx*right.x+dy*up.x/flatY)*scale;
 target.z+=(-dx*right.z+dy*up.z/flatY)*scale;
}
function screenToGround(clientX,clientY){
 if(!camera||!renderer)return null;
 const r=renderer.domElement.getBoundingClientRect();
 if(r.width<1||r.height<1)return null;
 const ndc=new THREE.Vector2((clientX-r.left)/r.width*2-1,-(clientY-r.top)/r.height*2+1);
 const ray=new THREE.Raycaster();ray.setFromCamera(ndc,camera);
 if(ray.ray.direction.y>=-.0001)return null;
 const t=-ray.ray.origin.y/ray.ray.direction.y;
 if(t<0||t>20000)return null;
 return ray.ray.at(t,new THREE.Vector3());
}
function resize(){
 if(!renderer)return;
 const r=$('threeLayer').getBoundingClientRect();
 renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);
 camera.aspect=Math.max(1,r.width)/Math.max(1,r.height);
 camera.updateProjectionMatrix();updateCamera();
}
function updateCamera(){
 if(!camera)return;
 distance=clamp(Number.isFinite(distance)?distance:180,12,5200);
 azimuth=Number.isFinite(azimuth)?azimuth:.72;
 elevation=clamp(Number.isFinite(elevation)?elevation:.85,.22,1.55);
 target.x=Number.isFinite(target.x)?target.x:0;
 target.z=Number.isFinite(target.z)?target.z:0;
 target.y=Number.isFinite(target.y)?target.y:0;
 const c=Math.cos(elevation),sn=Math.sin(elevation);
 camera.position.set(target.x+distance*Math.sin(azimuth)*c,target.y+distance*sn,target.z+distance*Math.cos(azimuth)*c);
 // Camera.up must remain Y-up: prevents inverted or sky-only views.
 camera.up.set(0,1,0);
 camera.lookAt(target.x,target.y,target.z);
 camera.near=Math.max(.1,Math.min(8,distance/300));
 camera.near=Math.max(.6,Math.min(45,distance*.012));
 camera.far=Math.max(48000,distance*5);
 camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
}
function flyToWorld(point,opts={}){
 if(!active)enter();
 const dest={x:point.x,y:point.y??0,z:point.z};
 const from={x:target.x,y:target.y,z:target.z,d:distance,a:azimuth,e:elevation};
 const to={...dest,d:opts.distance??60,a:opts.azimuth??azimuth,e:opts.elevation??1.02};
 // Immediate, deterministic camera move; no delayed update to be overwritten.
 target.x=to.x;target.y=to.y;target.z=to.z;
 distance=to.d;azimuth=to.a;elevation=to.e;
 updateCamera();
 return {from,to};
}
// Static city: only the user's camera moves; no animated objects.
let roadDetailMeshes=[],lastRoadDetailUpdate=0;
const roadDetailFrustum=new THREE.Frustum(),roadDetailMatrix=new THREE.Matrix4();
const roadDetailSphere=new THREE.Sphere(new THREE.Vector3(),125);
function updateRoadDetailLOD(now){
 if(!roadDetailMeshes.length||now-lastRoadDetailUpdate<160)return;
 lastRoadDetailUpdate=now;
 const maxRange=distance>1050?0:distance>480?260:distance>220?340:410;
 if(!maxRange){for(const mesh of roadDetailMeshes)mesh.visible=false;return;}
 roadDetailMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
 roadDetailFrustum.setFromProjectionMatrix(roadDetailMatrix);
 const max2=(maxRange+125)**2;
 for(const mesh of roadDetailMeshes){
  const c=mesh.userData.roadDetailChunk;
  if((c.x-target.x)**2+(c.z-target.z)**2>max2){mesh.visible=false;continue;}
  roadDetailSphere.center.set(c.x,0,c.z);
  mesh.visible=roadDetailFrustum.intersectsSphere(roadDetailSphere);
 }
}
// Commercial LOD: each 90m chunk has independently culled decorative
// meshes. The shop silhouette, roof, windows and entrance stay visible.
let shopDetailMeshes=[],lastShopDetailUpdate=0;
const shopDetailFrustum=new THREE.Frustum(),shopDetailMatrix=new THREE.Matrix4();
const shopDetailSphere=new THREE.Sphere();
function updateShopDetailLOD(now){
 if(!shopDetailMeshes.length||now-lastShopDetailUpdate<180)return;
 lastShopDetailUpdate=now;
 const range=distance>850?0:distance>450?125:distance>220?195:275;
 if(!range){for(const mesh of shopDetailMeshes)mesh.visible=false;return;}
 shopDetailMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
 shopDetailFrustum.setFromProjectionMatrix(shopDetailMatrix);
 const limit=(range+82)**2;
 for(const mesh of shopDetailMeshes){
  const c=mesh.userData.shopDetailChunk;
  if((c.x-target.x)**2+(c.z-target.z)**2>limit){mesh.visible=false;continue;}
  shopDetailSphere.copy(mesh.boundingSphere).applyMatrix4(mesh.matrixWorld);
  mesh.visible=shopDetailFrustum.intersectsSphere(shopDetailSphere);
 }
}
let lastRenderedFrame=0;
function animate(now=0){
  if(!renderer)return;
  requestAnimationFrame(animate);
  if(!active||document.hidden)return;
  // Cap expensive large-city rendering at 30 FPS; smaller towns stay at 60.
  const minInterval=1000/60;
  const elapsed=now-lastRenderedFrame;
  if(elapsed+.001<minInterval)return;
  lastRenderedFrame+=Math.floor((elapsed+.001)/minInterval)*minInterval;
  const t=now*.001;
  if(window.WorldNeighbors)WorldNeighbors.update(now);
  if(regionalWaterUniform)regionalWaterUniform.value=t;
  updateProgressiveDetails();
  updateRoadDetailLOD(now);
  updateShopDetailLOD(now);
  animateLife(t);
  updateAvatarLabels(t);
  if(releaseSky)releaseSky.position.copy(camera.position);
  if(window.SudamericaRender8)SudamericaRender8.render(scene,camera,renderer,minInterval);
  else renderer.render(scene,camera);
}
const walls = [0xd98972,0xb4d8b3,0xdca1ad,0x89b9df,0xc6a7de,0xe6b768,0x9bc9bd,0xd9a184,0xbac8d5];
const roofs = [0xa44d3f,0x518a70,0x627bb2,0x9d5a73,0x886b9c,0xc07943,0x4d8b8c,0x795d48,0xc66a50];
function disposeGroup() {
  if (!group) return;
  const geometries=new Set(),materials=new Set();
  group.traverse(o=>{
    if(o.isInstancedMesh)o.dispose();
    if(o.geometry)geometries.add(o.geometry);
    if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));
  });
  geometries.forEach(g=>g.dispose());materials.forEach(m=>{if(m.map&&!Object.values(homeTextures).includes(m.map))m.map.dispose();if(!streetSurfaceMaterials||![...streetSurfaceMaterials.values()].includes(m))m.dispose()});
  group.clear();
  houseMeshes = [];
}
let streetSurfaceMaterials;
function streetSurfaceMaterial(color){
 if(!streetSurfaceMaterials)streetSurfaceMaterials=new Map();
 if(streetSurfaceMaterials.has(color))return streetSurfaceMaterials.get(color);
 const asphalt=color===0x474d58;
 const material=new THREE.MeshStandardMaterial({color,roughness:asphalt?.94:.82});
 material.onBeforeCompile=shader=>{
   shader.vertexShader='varying vec3 citySurface;\n'+shader.vertexShader.replace(
     '#include <begin_vertex>',
     '#include <begin_vertex>\nvec4 surfacePosition=vec4(position,1.);\n#ifdef USE_INSTANCING\nsurfacePosition=instanceMatrix*surfacePosition;\n#endif\ncitySurface=(modelMatrix*surfacePosition).xyz;');
   shader.fragmentShader='varying vec3 citySurface;\n'+shader.fragmentShader.replace(
     '#include <color_fragment>',
     '#include <color_fragment>\n'+(asphalt?
       'vec2 grain=floor(citySurface.xz*36.); float fleck=fract(sin(dot(grain,vec2(27.1,61.7)))*43758.5); float detail=1.-smoothstep(.012,.043,max(length(dFdx(citySurface.xz)),length(dFdy(citySurface.xz)))); diffuseColor.rgb*=1.+(fleck-.5)*.21*detail;':
       'vec2 slab=citySurface.xz*vec2(2.4,1.9); slab.x+=mod(floor(slab.y),2.)*.5; vec2 edge=min(fract(slab),1.-fract(slab)); float pixel=max(length(dFdx(citySurface.xz)),length(dFdy(citySurface.xz))); float jointWidth=max(.025,pixel*2.4); float seam=smoothstep(.015,.015+jointWidth,min(edge.x,edge.y)); float detail=1.-smoothstep(.055,.19,pixel); diffuseColor.rgb*=mix(1.,mix(.70,1.04,seam),detail);'));
 };
 material.customProgramCacheKey=()=>asphalt?'city-asphalt':'city-pavers';
 streetSurfaceMaterials.set(color,material);
 return material;
}
function addBox(w,h,d,x,y,z,color) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), color===0x474d58||color===0xc4a99e ? streetSurfaceMaterial(color) : new THREE.MeshLambertMaterial({color}));
  mesh.position.set(x,y,z);
  mesh.receiveShadow=w>=2||d>=2;
  mesh.castShadow=h>=.65&&w>=.15&&d>=.15;
  group.add(mesh);
  return mesh;
}
function addTree(x,z,seed,scale=1,flowering=false) {
 const height=2.1+rnd(seed*3+2)*1.15;
 const bark=new THREE.MeshStandardMaterial({color:0x795239,roughness:1});
 const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.12,.27,height,7),bark);
 trunk.scale.setScalar(scale);
 trunk.position.set(x,height*scale/2,z);
 trunk.castShadow=true;
 group.add(trunk);

 const palette=[0x55992e,0x78a932,0x3c893e,0x9b51c4,0x508f35,0x82af38];
 const color=flowering?0xb645d7:palette[Math.floor(rnd(seed+45)*palette.length)];
 const geometry=new THREE.IcosahedronGeometry(1,1);
 const canopy=new THREE.InstancedMesh(geometry,new THREE.MeshStandardMaterial({
   roughness:.96,flatShading:true
 }),25);
 const cluster=new THREE.Object3D();
 for(let i=0;i<25;i++){
   const angle=i*2.39996;
   const radius=i===0?0:.53+rnd(seed*7+i)*1.07;
   const size=i===0?1.32:i<10?.60+rnd(seed*13+i)*.43:.24+rnd(seed*13+i)*.38;
   cluster.position.set(Math.cos(angle)*radius,.56+rnd(seed*11+i)*1.65,Math.sin(angle)*radius);
   cluster.rotation.set(i*.6,angle,0);
   cluster.scale.set(size,size*.91,size);
   cluster.updateMatrix();
   canopy.setMatrixAt(i,cluster.matrix);
   canopy.setColorAt(i,new THREE.Color(color).lerp(new THREE.Color(flowering?0xffb8f4:0xd5ee62),i<10?.04:(i%4)*.10).multiplyScalar(.70+rnd(seed+i)*.42));
 }
 canopy.scale.setScalar(scale);
 canopy.position.set(x,(height-.1)*scale,z);
 canopy.castShadow=true;
 canopy.receiveShadow=true;
 canopy.computeBoundingSphere();
 group.add(canopy);
}

function civicFlowerbed(x,z,w,d,seed){
  addBox(w,.18,d,x,.18,z,0x4e9a63);
  const palette=[0xe989a6,0xf4d86b,0x9d80d2,0xfff4e1,0xf1856c];
  for(let j=0;j<7;j++){
    const xx=x+(rnd(seed*71+j)-.5)*(w-.6),zz=z+(rnd(seed*41+j+10)-.5)*(d-.5);
    const blossom=new THREE.Mesh(new THREE.IcosahedronGeometry(.24,0),new THREE.MeshLambertMaterial({color:palette[(seed+j)%palette.length]}));
    blossom.position.set(xx,.48,zz);group.add(blossom);
  }
}
function civicBench(x,z){
  addBox(2.5,.22,.68,x,.65,z,0x9d6b47);
  addBox(2.5,.75,.2,x,1.05,z-.3,0x9d6b47);
  for(const dx of [-.9,.9])addBox(.16,.52,.18,x+dx,.32,z,0x566b67);
}
function makeHouse(h) {
  const height = [2.4,3,3.8,5.6,7.3,2.8,4.4][h.type];
  const width = [2.7,3.5,3,4.1,4.3,3.3,3.7][h.type];
  const depth = [2.7,3.2,3.4,3.6,3.8,3.5,3.2][h.type];
  if (h.garden) addBox(12.7,.035,11.8,h.x,.015,h.z,0x69bc70);
  const body = addBox(width,height,depth,h.x,height/2,h.z,walls[h.variant]);
  body.userData.home = h;houseMeshes.push(body);
  let roof;
  if (h.type === 3 || h.type === 4) {
    roof = addBox(width+.4,.42,depth+.4,h.x,height+.23,h.z,roofs[h.variant]);
    // A second level gives some buildings a different silhouette.
    if (h.type === 4) addBox(width*.55,1.4,depth*.55,h.x,height+1.1,h.z,walls[h.variant]);
  } else {
    roof = new THREE.Mesh(new THREE.ConeGeometry(width*.78,1.5+(h.type%3)*.35,4),new THREE.MeshLambertMaterial({color:roofs[h.variant]}));
    roof.rotation.y=Math.PI/4;roof.position.set(h.x,height+.65,h.z);group.add(roof);
  }
  roof.userData.home=h;houseMeshes.push(roof);
  const door=addBox(.65,1.3,.09,h.x,.66,h.z+depth/2+.05,0x79543e);
  door.userData.home=h;houseMeshes.push(door);
  const windowCount = h.type > 2 ? 2 : 1;
  for(let k=0;k<windowCount;k++) {
    const win=addBox(.67,.63,.1,h.x-width*.24+k*width*.46,Math.min(height-.5,1.8),h.z+depth/2+.06,0x9cdaf0);
    win.userData.home=h;houseMeshes.push(win);
  }
  // v6.4.5: readable residential architecture, using existing box primitives.
  // Details sit slightly in front of the facade, without blocking the door.
  const facade=h.z+depth/2, accent=[0xf4e5d4,0xe5f0e1,0xf6e0e5,0xe5ecf4][h.variant%4];
  const sill=0xd0c6b3, dark=0x566b73;
  addBox(.87,.10,.21,h.x,1.39,facade+.15,sill); // entrance lintel
  addBox(.83,.11,.40,h.x,.12,facade+.23,0xbab2a4); // doorstep
  if(h.type<=2 || h.type===5 || h.type===6){
    // Compact houses: front pilasters and pitched-roof fascia.
    for(const side of [-1,1]){
      addBox(.11,Math.min(1.95,height*.65),.15,h.x+side*(width/2-.17),
        Math.min(1.95,height*.65)/2+.18,facade+.11,accent);
    }
    addBox(width*.84,.14,.23,h.x,height-.13,facade+.09,accent);
    if(h.type===1 || h.type===2){
      for(const side of [-1,1]){
        const wx=h.x+side*width*.24;
        addBox(.85,.09,.18,wx,2.20,facade+.14,sill);
        addBox(.09,.72,.14,wx-.37,1.81,facade+.14,accent);
        addBox(.09,.72,.14,wx+.37,1.81,facade+.14,accent);
      }
    }
    if(h.type===2){ // villa: pronounced portico above the entrance
      addBox(1.85,.16,.92,h.x,2.35,facade+.42,roofs[h.variant]);
      for(const side of [-1,1])
        addBox(.15,1.88,.17,h.x+side*.83,1.19,facade+.77,accent);
    }
    if(h.type===5){ // premium low house: contrasting side bays
      for(const side of [-1,1])
        addBox(.22,1.55,.33,h.x+side*(width*.40),1.45,facade+.15,roofs[h.variant]);
    }
    if(h.type===6){ // premium residence: balcony over entrance
      addBox(width*.60,.15,.74,h.x,2.60,facade+.34,sill);
      for(let i=-2;i<=2;i++)
        addBox(.07,.43,.07,h.x+i*width*.12,2.90,facade+.68,dark);
      addBox(width*.60,.08,.08,h.x,3.13,facade+.68,dark);
    }
  }else{
    // Apartment buildings: floor divisions and balconies, no overlapping awnings.
    const floors=h.type===4?3:2;
    for(let floor=1;floor<floors;floor++){
      const yy=height*(floor/floors);
      addBox(width*.94,.12,.20,h.x,yy,facade+.10,accent);
      addBox(width*.40,.12,.70,h.x+width*.22,yy+.11,facade+.36,sill);
      for(let j=0;j<3;j++)
        addBox(.07,.38,.08,h.x+width*.04+j*width*.18,yy+.34,facade+.69,dark);
      addBox(width*.40,.07,.09,h.x+width*.22,yy+.55,facade+.69,dark);
      addBox(.56,.72,.10,h.x+width*.22,yy+.87,facade+.09,0x9cdaf0);
    }
    if(h.type===4){ // condominium: rooftop terrace parapet
      for(const side of [-1,1])
        addBox(.14,.48,depth+.20,h.x+side*(width/2+.08),height+.51,h.z,accent);
      addBox(width+.20,.48,.14,h.x,height+.51,h.z-depth/2-.08,accent);
    }
  }
  if (h.garden && h.type < 4 && h.id%3===0 &&
      isInsideParcel(h.x+5.3,h.z-4.5,3.4,3.4,plotBounds(h.blockIndex,h.slot))) addTree(h.x+5.3,h.z-4.5,h.id);
}
// Streets are a connected graph of LONG segments. No roads around individual homes.
// The central plaza is always present, with small parks and civic landmarks.
function addPitch(x,z,w,d,baseColor,lines=true){
  // Facility foundation top is y=.12. The former pitch top was y=.125,
  // almost coplanar, while painted lines intersected its surface.
  // Give every visible surface an unambiguous height separation.
  const pitchCenterY=.235, pitchThickness=.12;
  const pitchTop=pitchCenterY+pitchThickness/2; // .295
  addBox(w,pitchThickness,d,x,pitchCenterY,z,baseColor);
  if(lines){
    const paint=0xf3f1d5;
    const thickness=.025;
    const lineY=pitchTop+thickness/2+.012;
    const t=.32;
    addBox(w-2.2,thickness,t,x,lineY,z-d/2+1.1,paint);
    addBox(w-2.2,thickness,t,x,lineY,z+d/2-1.1,paint);
    addBox(t,thickness,d-2.2,x-w/2+1.1,lineY,z,paint);
    addBox(t,thickness,d-2.2,x+w/2-1.1,lineY,z,paint);
    addBox(t,thickness,d-2.2,x,lineY,z,paint);
  }
}
function drawCivicBuilding(zone,b){
 const kind=zone.kind;
 if(kind==='park'||kind==='monument')return false;
 const w=b.width,d=b.depth,batches=new Map();
 const geometries={box:new THREE.BoxGeometry(1,1,1),glass:new THREE.BoxGeometry(1,1,1),
  cylinder:new THREE.CylinderGeometry(1,1,1,20),dome:new THREE.SphereGeometry(1,20,12,0,Math.PI*2,0,Math.PI/2),
  wheel:new THREE.CylinderGeometry(1,1,1,10)};
 geometries.wheel.rotateZ(Math.PI/2);
 const add=(geometry,color,fx,y,fz,sx,sy,sz,rotation=0)=>{
  if(![fx,y,fz,sx,sy,sz].every(Number.isFinite)||Math.min(sx,sy,sz)<=0)throw Error('Geometria pubblica '+kind);
  if(!batches.has(geometry))batches.set(geometry,[]);
  batches.get(geometry).push({color,x:b.x+fx*w,y,z:b.z+fz*d,sx,sy,sz,rotation});
 };
 const box=(color,fx,y,fz,fw,h,fd,glass=false,rotation=0)=>add(glass?'glass':'box',color,fx,y,fz,fw*w,h,fd*d,rotation);
 const round=(color,fx,y,fz,r,h)=>add('cylinder',color,fx,y,fz,r,h,r);
 const building=(fx,fz,fw,fd,floors,wall,trim)=>{
  const height=floors*3.5;
  box(wall,fx,height/2+.18,fz,fw,height,fd);
  box(trim,fx,height+.34,fz,fw+.018,.40,fd+.012);
  box(0xe5dcc9,fx,.38,fz,fw+.014,.38,fd+.008);
  for(let level=0;level<floors;level++){
   const y=1.92+level*3.5;
   const columns=Math.max(2,Math.floor(fw*w/4.3));
   for(const face of [-1,1]){
    for(let column=0;column<columns;column++){
     const wx=fx+((column+.5)/columns-.5)*fw;
     box(0x42869e,wx,y,fz+face*(fd/2+.0018),fw*.66/columns,1.64,.003,true);
     box(0xe6dfce,wx,y-.91,fz+face*(fd/2+.003),fw*.72/columns,.13,.006);
    }
    const bays=Math.max(2,Math.floor(fd*d/5));
    for(let bay=0;bay<bays;bay++)
     box(0x42869e,fx+face*(fw/2+.002),y,fz+((bay+.5)/bays-.5)*fd,.004,1.64,fd*.64/bays,true);
   }
  }
  // Recessed frames, sills and corner masonry give each facade real depth.
  const frame=0xe6dfcf;
  for(let level=0;level<floors;level++){
   const y=1.92+level*3.5,columns=Math.max(2,Math.floor(fw*w/4.3));
   for(const face of [-1,1])for(let column=0;column<columns;column++){
    const wx=fx+((column+.5)/columns-.5)*fw,ww=fw*.66/columns;
    for(const edge of [-1,1])box(frame,wx+edge*(ww/2+.0015),y,fz+face*(fd/2+.003),.003,1.88,.006);
    box(frame,wx,y+.93,fz+face*(fd/2+.003),ww+.007,.13,.006);
    if(floors<=3)box(trim,wx,y+.99,fz+face*(fd/2+.006),ww+.012,.10,.012);
   }
   if(level>0)for(const face of [-1,1])box(0xd6cdbc,fx,level*3.5+.30,fz+face*(fd/2+.002),fw+.008,.13,.007);
  }
  for(const side of [-1,1]){
   box(frame,fx+side*(fw/2-.009),height/2+.2,fz,.014,height,fd+.008);
   box(trim,fx+side*(fw/2+.003),height+.66,fz,.008,.34,fd+.018);
   box(trim,fx,height+.66,fz+side*(fd/2+.003),fw+.018,.34,.005);
   box(0x6d807f,fx+side*(fw/2-.018),height/2+.2,fz+fd/2+.005,.004,height,.004);
  }
  return height+.54;
 };
 const canopy=(fx,y,fz,fw,fd,trim)=>{
  box(trim,fx,y,fz,fw,.28,fd);
  for(const side of [-1,1])
   box(0xe9e1cd,fx+side*fw*.43,y/2,fz+fd*.36,.008,y-.12,.008);
 };
 const cross=(fx,y,fz,size,color)=>{
  add('box',color,fx,y,fz,size*.26,size,size*.12);
  add('box',color,fx,y,fz,size,size*.26,size*.14);
 };
 const car=(fx,fz,color,emergency=false)=>{
  box(color,fx,1.05,fz,.058,1.22,.060);
  box(0x315d75,fx,1.95,fz-.007,.046,.68,.033,true);
  for(const side of [-1,1])for(const end of [-1,1])
   add('wheel',0x303c42,fx+side*.031,.57,fz+end*.020,.47,.23,.47);
  box(0x385f6d,fx,1.57,fz+.029,.048,.41,.002,true);
  box(0xc6d6d4,fx,.66,fz+.032,.057,.16,.004);
  box(0x384d51,fx,1.03,fz+.032,.024,.23,.002);
  for(const side of [-1,1]){
   box(0xffe2a0,fx+side*.021,1.13,fz+.033,.009,.22,.003);
   box(0xd2453b,fx+side*.021,1.07,fz-.032,.008,.23,.003);
   box(0x557983,fx+side*.030,1.12,fz,.002,.68,.0015);
   box(0xc8d5d4,fx+side*.030,1.44,fz-.004,.002,.07,.006);
  }
  if(emergency){
   box(0xe95046,fx-.015,2.42,fz,.022,.23,.006);
   box(0x409edf,fx+.015,2.42,fz,.022,.23,.006);
  }
 };
 const frontDoor=(fx,fz,width=.10)=>{
  box(0x294f65,fx,1.48,fz,width,2.65,.006,true);
  box(0xe8dfcc,fx,2.96,fz,width+.02,.21,.009);
  box(0xc9d6d0,fx,1.47,fz+.004,.003,2.5,.003);
  for(const side of [-1,1])box(0xe9d7aa,fx+side*.018,1.45,fz+.007,.003,.40,.002);
 };
 const columns=(fz,fw,y=3.4)=>{
  for(const x of [-.42,-.21,0,.21,.42])round(0xe7ddc6,x*fw,y/2+.23,fz,.30,y);
  box(0xe4d6bc,0,y+.38,fz,fw+.06,.45,.060);
  for(let step=0;step<3;step++)box(0xcdbfa7,0,.18+step*.13,fz+.034-step*.009,fw+.09,.13,.040);
 };
 const field=(type='football',fz=-.06)=>{
  box(0x418f4d,0,.24,fz,.68,.18,.53);
  const line=0xf0edcf;
  for(const side of [-1,1]){
   box(line,side*.31,.35,fz,.004,.024,.48);
   box(line,0,.35,fz+side*.24,.62,.024,.002);
  }
  box(line,0,.35,fz,.62,.024,.002);
  if(type==='football')for(const side of [-1,1]){
   box(0xe6e5d9,0,2.13,fz+side*.237,.20,.10,.003);
   for(const post of [-1,1])box(0xe6e5d9,post*.095,1.21,fz+side*.237,.004,1.82,.003);
  }
 };
 const stands=(fz=-.06,large=false)=>{
  const steps=large?5:3;
  for(const side of [-1,1])for(let step=0;step<steps;step++)
   box(step%2?0xe6ba65:0x5a7f9a,side*(.36+step*.018),.55+step*.57,fz,.030,.42,.55);
  for(const side of [-1,1])for(const end of [-1,1]){
   const px=side*.43,pz=fz+end*.31,height=large?22:12;
   box(0x5e7179,px,height/2,pz,.005,height,.003);
   box(0xffe4a5,px,height,pz,.065,.70,.013);
  }
 };
 let labelColor=0x315d72;
 if(kind==='hospital'||kind==='clinic'){
  const hospital=kind==='hospital',white=0xe8efea,blue=0x398caa;
  const roof=building(0,-.14,.75,.22,hospital?4:1,white,blue);
  for(const side of [-1,1])building(side*.285,.015,.19,hospital?.42:.23,hospital?3:1,white,blue);
  const tower=building(0,-.27,.34,.11,hospital?6:2,white,blue);
  canopy(0,3.6,.14,.43,.085,blue);frontDoor(0,.105,.16);
  cross(0,hospital?11.8:2.2,-.025,hospital?3.2:2.2,0xd34549);
  box(0x798b93,0,.16,.34,.77,.08,.21);
  for(const side of [-1,1])car(side*.22,.34,0xf1ede0,true);
  if(hospital){
   round(0x4f707b,0,tower+.05,-.27,Math.min(w*.14,6),.18);
   box(0xf1e0a2,0,tower+.17,-.27,.07,.025,.006);
   for(const side of [-1,1])box(0xf1e0a2,side*.035,tower+.17,-.27,.010,.025,.038);
   for(const side of [-1,1])box(0x819b9b,side*.22,roof+.65,-.15,.08,1.02,.037);
  }
  labelColor=0xa73b40;
 }else if(kind==='police'||kind==='fire'){
  const fire=kind==='fire',accent=fire?0xb74935:0x315e91;
  building(0,-.14,.80,.24,2,fire?0xe3c9b2:0xe0e7e6,accent);
  building(fire?.30:-.29,-.29,.17,.13,fire?5:3,0xeadcc8,accent);
  for(const bay of [-.25,0,.25]){
   box(fire?0x913c32:0x345b75,bay,1.81,-.017,.18,3.25,.007);
   for(let stripe=0;stripe<5;stripe++)box(0xb9c5c3,bay,.65+stripe*.54,-.012,.17,.045,.003);
  }
  box(0x7e9095,0,.15,.23,.85,.08,.30);
  for(const side of [-1,1])car(side*.22,.22,fire?0xc84c35:0xe6edf0,true);
  if(fire){
   for(let rung=0;rung<6;rung++)box(0xdccfbb,.22,2.2+rung*2.6,-.222,.045,.15,.012);
  }else{
   box(0x315e91,0,5.4,-.012,.11,1.85,.010);
   cross(0,5.4,-.005,1.55,0xe1c36d);
  }
  canopy(0,3.8,.032,.39,.07,accent);
  labelColor=accent;
 }else if(kind==='school'||kind==='nursery'||kind==='university'){
  const university=kind==='university',nursery=kind==='nursery',accent=university?0x537e78:0xbc6b48;
  building(0,-.23,.80,.16,university?4:nursery?1:2,0xe6d4ad,accent);
  for(const side of [-1,1])building(side*.31,-.02,.17,.30,university?3:1,0xeee0c1,accent);
  frontDoor(0,-.143,.13);
  box(0xcdb994,0,.14,.16,.38,.08,.23);
  if(university){
   columns(-.125,.52,4.0);
   round(0x589da2,0,16,-.23,3.9,.60);
  }else{
   box(0x69a7a2,0,.22,.20,.42,.12,.20);
   for(const side of [-1,1]){
    box(0xe4aa55,side*.13,1.45,.20,.012,2.45,.010);
    box(0xc35b42,side*.13,2.75,.20,.12,.20,.045);
    box(0x5d88a7,side*.13,.70,.22,.09,.12,.035);
   }
   if(nursery)round(0xe4c26c,0,.50,.35,3.4,.22);
  }
  labelColor=accent;
 }else if(kind==='townhall'||kind==='courthouse'||kind==='museum'||kind==='library'){
  const civic=kind==='townhall',justice=kind==='courthouse',museum=kind==='museum';
  const roof=building(0,-.16,.78,.27,justice?3:museum?2:3,0xe3d9c6,0x6d8b87);
  for(const side of [-1,1])building(side*.30,-.01,.15,.19,2,0xd7c7ad,0x537d7e);
  columns(.012,.62,4.1);frontDoor(0,-.02,.12);
  if(civic){
   const top=building(0,-.23,.18,.10,6,0xe5d7ba,0x497a80);
   round(0xf3e3b9,0,top-2,-.174,1.12,.18);
   cross(0,top-2,-.168,1.12,0x45636a);
  }else if(museum){
   add('dome',0x799e9b,0,roof,-.16,w*.17,4.5,d*.09);
  }else if(!justice){
   for(const side of [-1,1])box(0x6b9b9e,side*.16,roof+.21,-.16,.20,.22,.16,true);
  }
  box(0xcbb99d,0,.19,.21,.62,.14,.20);
  
 }else if(['football','stadium','baseball','sports'].includes(kind)){
  const stadium=kind==='stadium';
  field(kind==='baseball'?'baseball':'football');
  stands(-.06,stadium);
  if(kind==='baseball'){
   box(0xc5a470,0,.37,-.06,.26,.04,.12,false,Math.PI/4);
   for(const [fx,fz] of [[0,-.13],[-.15,-.06],[.15,-.06],[0,.01]])
    box(0xf0e5bf,fx,.43,fz,.025,.05,.013);
  }
  if(stadium)for(const side of [-1,1])
   canopy(side*.405,6.0,-.06,.14,.60,0x506f8d);
  if(kind==='sports'){
   building(0,-.37,.60,.09,2,0xd3dbce,0x498e9d);
   box(0x699cab,0,.28,.31,.44,.14,.14);
  }
  labelColor=0x3f776b;
 }else if(kind==='pool'){
  building(0,-.30,.76,.14,2,0xe6e1cf,0x3a8ba6);
  box(0xe2d5bb,0,.30,.02,.70,.25,.45);
  box(0x2dacc5,0,.47,.02,.62,.12,.40,true);
  for(const lane of [-.24,-.12,0,.12,.24]){
   box(0x326481,lane,.545,.02,.008,.015,.38);
   box(0xf4e1a5,lane,.64,.245,.045,.35,.019);
  }
  for(const side of [-1,1])canopy(side*.39,2.9,.025,.10,.40,0xd7b46c);
  labelColor=0x2d8b9f;
 }else if(kind==='bus'||kind==='station'){
  const rail=kind==='station';
  building(-.28,-.17,.24,.26,2,0xded1b6,0x3b7d89);
  const platforms=rail?[-.02,.21]:[-.02,.22];
  for(const side of platforms){
   box(0xc2b7a3,side,.30,.07,.15,.38,.67);
   canopy(side,4.5,.04,.19,.56,rail?0x4d7a87:0xb08a57);
   if(rail){
    for(const edge of [-1,1])box(0x5b696d,side+edge*.032,.21,.07,.005,.09,.79);
    for(let sleeper=0;sleeper<18;sleeper++)box(0x786b59,side,.16,-.30+sleeper*.044,.09,.08,.010);
    box(0x3b8fa2,side,1.75,.10,.115,2.5,.30);
    box(0xbadce1,side,2.20,.10,.119,.70,.27,true);
   }else{
    box(0x439e9a,side,1.50,.10,.10,2.18,.15);
    box(0xadd6dd,side,2.00,.10,.105,.75,.12,true);
   }
  }
  
 }else if(kind==='water'||kind==='waterworks'||kind==='power'||kind==='recycling'){
  building(0,-.31,.62,.12,1,0xd7dfcf,0x527c86);
  if(kind==='water'){
   for(const fx of [-.23,.23]){
    for(const side of [-1,1])box(0xa3b4b3,fx+side*.057,5.6,-.02,.014,10.4,.018);
    round(0xc4d5d1,fx,11.8,-.02,4.0,3.25);
    round(0x5298ab,fx,13.52,-.02,4.18,.19);
    box(0x579aa7,fx,4.8,.045,.017,9.0,.012);
   }
  }else if(kind==='waterworks'){
   for(const fx of [-.22,.22])for(const fz of [-.08,.20]){
    round(0xa1b1ab,fx,.66,fz,5.4,1.15);
    round(0x4b91a2,fx,1.26,fz,4.9,.08);
    box(0xd2c7ab,fx,1.51,fz,.25,.12,.009);
   }
  }else if(kind==='power'){
   for(const fx of [-.23,0,.23])for(const fz of [-.06,.18]){
    box(0x81978d,fx,1.42,fz,.13,2.4,.09);
    for(const side of [-1,1])round(0xd7cfb9,fx+side*.04,3.35,fz,.33,1.8);
   }
   for(const side of [-1,1])box(0x617b81,side*.40,5.2,.06,.009,10.0,.45);
  }else{
   for(let i=0;i<5;i++){
    const fx=(i-2)*.16;
    box([0x3c83aa,0xe3bb46,0x539f62,0xc46a4c,0x7c8990][i],fx,1.15,.08,.12,1.8,.11);
    box(0xd3d7cb,fx,2.13,.08,.125,.18,.115);
   }
   canopy(0,3.8,.08,.88,.24,0x587d6f);
  }
  labelColor=0x427c72;
 }else if(kind==='gardens'||kind==='botanical'){
  box(0x719e64,0,.17,0,.92,.17,.91);
  box(0xc8b99b,0,.30,0,.075,.10,.86);
  box(0xc8b99b,0,.30,.12,.86,.10,.045);
  round(0xb4b29d,0,.45,-.15,6.2,.37);
  round(0x459eb4,0,.66,-.15,5.8,.06);
  if(kind==='botanical'){
   for(const side of [-1,1]){
    add('dome',0x72acb4,side*.25,.30,-.20,w*.16,6,d*.11);
    for(const rib of [-1,0,1])box(0xe6ded0,side*.25+rib*.065,3,-.20,.006,5.2,.19);
   }
  }else{
   for(const side of [-1,1]){
    canopy(side*.25,3.1,.24,.18,.15,0xa78553);
    box(0xd08c49,side*.25,.85,.24,.13,.13,.07);
   }
  }
  labelColor=0x4e815e;
 }else if(kind==='mall'||kind==='theatre'){
  const theatre=kind==='theatre',accent=theatre?0xa2554b:0x54889e;
  building(0,-.13,.80,.36,theatre?3:2,0xdfccb1,accent);
  box(0x5b9eaf,0,3.4,.054,.64,4.7,.007,true);
  canopy(0,3.2,.12,.82,.12,accent);
  if(theatre){
   box(0xe4bb67,0,6.7,.07,.70,.65,.035);
   for(const side of [-1,1])box(0xf1d48a,side*.38,5.0,.075,.025,5.7,.012);
  }else{
   for(const side of [-1,1])add('dome',0x74acb5,side*.20,7.65,-.13,w*.18,2.2,d*.12);
  }
  labelColor=accent;
 }else if(kind==='heliport'){
  building(-.29,-.22,.23,.20,2,0xd9dfd4,0x4e7e8f);
  round(0x657f83,0,.26,.08,Math.min(w*.39,d*.23),.34);
  round(0xa5b3a4,0,.47,.08,Math.min(w*.32,d*.20),.05);
  box(0xf1dd9a,0,.53,.08,.16,.025,.013);
  for(const side of [-1,1])box(0xf1dd9a,side*.078,.53,.08,.020,.025,.105);
  for(const side of [-1,1])for(const end of [-1,1])
   round(0xf1c66b,side*.35,.55,.08+end*.17,.20,.24);
  labelColor=0x3d778b;
 }else throw Error('Modello pubblico mancante '+kind);
 box(0xccbca1,0,.16,.37,.10,.10,.24);
 // Facility-specific furnishings, separate from the shared architectural trim.
 if(['hospital','clinic'].includes(kind)){
  for(const side of [-1,1]){
   // Ambulance bay markings and red crosses on the vehicles.
   for(let stripe=-1;stripe<=1;stripe++)box(0xf2e2a4,side*.22+stripe*.047,.215,.34,.003,.02,.19);
   cross(side*.22,1.23,.372,.64,0xc94746);
   box(0x2f5666,side*.31,1.0,.16,.035,1.6,.018);
  }
 }else if(kind==='fire'){
  for(const side of [-1,1])box(0x788985,.30+side*.028,9.1,-.217,.005,15.4,.004);
  for(let rung=0;rung<15;rung++)box(0xd2d6cd,.30,2.2+rung*.98,-.215,.060,.09,.004);
  for(const side of [-1,1])box(0xe3ce99,side*.22,2.65,.22,.035,.20,.042);
 }else if(kind==='police'){
  for(const side of [-1,1]){
   box(0x315e91,side*.22,1.18,.252,.050,.29,.003);
   box(0xe7d398,side*.22,1.20,.254,.013,.18,.002);
  }
 }else if(['school','nursery','university'].includes(kind)){
  for(const side of [-1,1]){
   box(0xeadbb9,side*.18,.33,.17,.09,.30,.06);
   box(0x6e9c65,side*.18,.55,.17,.08,.18,.05);
  }
  if(kind!=='university'){
   box(0x477f9a,.12,1.35,.25,.045,.10,.06,false,.16);
   box(0xdab75e,.12,2.15,.215,.05,.16,.03);
   for(let rung=0;rung<4;rung++)box(0xb64f42,.12,.45+rung*.41,.20,.045,.08,.005);
  }
 }else if(['library','museum','townhall','courthouse'].includes(kind)){
  for(const side of [-1,1]){
   box(0xddd1b6,side*.22,.49,.22,.065,.65,.045);
   if(kind==='museum')add('dome',side<0?0xb58b5d:0x799794,side*.22,.82,.22,.9,1.9,.9);
   else box(0x477b81,side*.22,1.6,.22,.052,1.5,.006);
  }
 }else if(['football','stadium','baseball','sports'].includes(kind)){
  if(kind!=='baseball')for(const side of [-1,1]){
   for(let wire=-4;wire<=4;wire++)box(0xdbe3d4,wire*.023,1.26,-.06+side*.254,.001,1.9,.001);
   for(let wire=0;wire<5;wire++)box(0xdbe3d4,0,.42+wire*.39,-.06+side*.254,.19,.025,.001);
   for(const post of [-1,1])box(0xe2e8dc,post*.096,2.09,-.06+side*.246,.003,.08,.020);
  }
  for(const side of [-1,1])for(let row=0;row<3;row++)for(let seat=0;seat<14;seat++)
   box(row%2?0x4c8498:0xe1bf63,side*(.36+row*.025),.78+row*.62,-.27+seat*.032,.018,.16,.022);
 }else if(kind==='pool'){
  for(const lane of [-.18,-.06,.06,.18])for(let buoy=0;buoy<16;buoy++)
   round(buoy%2?0xf1c86d:0xdce8df,lane,.59,-.15+buoy*.023,.10,.11);
  for(const side of [-1,1]){
   for(const post of [-1,1])box(0xc3d6d4,side*.27+post*.014,.95,.20,.004,1.0,.004);
   for(let rung=0;rung<3;rung++)box(0xc3d6d4,side*.27,.65+rung*.23,.20,.032,.06,.004);
  }
 }else if(kind==='station'||kind==='bus'){
  for(const fx of [-.02,.21]){
   for(let pane=0;pane<7;pane++){
    const z=kind==='station'?-.022+pane*.040:.05+pane*.016;
    for(const side of [-1,1])box(0x28566d,fx+side*.061,2.19,z,.003,.64,.003);
   }
   box(0xe5c77b,fx,1.3,kind==='station'?.254:.179,.074,.19,.003);
  }
 }else if(['water','waterworks','power','recycling'].includes(kind)){
  for(const side of [-1,1]){
   box(0x748d8a,side*.40,.96,.025,.007,1.4,.50);
   for(let rail=0;rail<12;rail++)box(0xb5c3b6,side*.40,1.65,-.20+rail*.042,.011,.18,.002);
  }
  if(kind==='recycling')for(let i=0;i<5;i++){
   const fx=(i-2)*.16;
   box(0x344f4c,fx,1.64,.137,.060,.22,.002);
   for(const side of [-1,1])add('wheel',0x354b45,fx+side*.042,.40,.12,.23,.15,.23);
  }
 }else if(kind==='botanical'||kind==='gardens'){
  for(const side of [-1,1])for(let bed=0;bed<7;bed++){
   const fx=side*.25,fz=.025+bed*.035;
   box(0x7d6345,fx,.31,fz,.15,.23,.018);
   for(const plant of [-1,0,1])add('dome',bed%2?0xbb80af:0xe6c86d,fx+plant*.035,.48,fz,.45,.48,.45);
  }
 }else if(kind==='mall'||kind==='theatre'){
  for(const side of [-1,1]){
   box(0xe7d8bc,side*.31,.80,.23,.065,1.2,.035);
   box(kind==='theatre'?0xb46d55:0x5b8d6d,side*.31,1.7,.23,.052,.62,.023);
  }
  for(const side of [-1,1])box(0xd8c094,side*.08,1.05,.12,.003,1.8,.004);
 }else if(kind==='heliport'){
  for(let light=0;light<12;light++){
   const angle=light*Math.PI/6;
   round(0xffd989,Math.cos(angle)*.34,.68,.08+Math.sin(angle)*.155,.14,.20);
  }
 }

 // Detailed seating and litter bins stay outside the central accessible path.
 for(const side of [-1,1]){
  const fx=side*.33,fz=.405;
  for(let slat=-2;slat<=2;slat++)box(0xa87648,fx,.75,fz+slat*.0025,.14,.10,.0018);
  for(const leg of [-1,1])box(0x354c48,fx+leg*.052,.43,fz,.004,.58,.014);
  for(const slat of [0,1])box(0xb78550,fx,1.05+slat*.20,fz-.011,.14,.13,.002);
  box(0x3f6d61,side*.425,.72,.425,.026,1.0,.016);
  box(0x263d3a,side*.425,1.25,.425,.028,.12,.018);
 }
 // A landscaped public forecourt is part of every service.
 for(const side of [-1,1]){
  const px=side*.43,pz=.40;
  box(0xd9c7a8,px,.35,pz,.07,.48,.035);
  add('dome',0x5c8d4c,px,.67,pz,w*.038,.65,d*.019);
  box(0x344c49,px,2.2,.32,.004,4.0,.002);
  box(0xffdc8a,px,4.25,.32,.018,.27,.011);
 }
 const transform=new THREE.Object3D(),color=new THREE.Color();
 for(const [type,items] of batches){
  const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:type==='glass'?.26:.82,metalness:type==='glass'?.13:.025});
  const mesh=new THREE.InstancedMesh(geometries[type],material,items.length);
  items.forEach((part,index)=>{
   transform.position.set(part.x,part.y,part.z);transform.rotation.set(0,part.rotation,0);
   transform.scale.set(part.sx,part.sy,part.sz);transform.updateMatrix();mesh.setMatrixAt(index,transform.matrix);
   mesh.setColorAt(index,color.setHex(part.color));
  });
  mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
  mesh.castShadow=type!=='glass';mesh.receiveShadow=true;
  mesh.userData.publicKind=kind;group.add(mesh);
 }
 // An independent street-facing sign keeps lettering clear of roofs and canopies.
 const signWidth=Math.min(w*.56,24),signHeight=signWidth/4,signBottom=4.8;
 const signZ=b.z+d*.465,signY=signBottom+signHeight/2;
 const labelMaterial=new THREE.MeshBasicMaterial({
  map:billboardTexture([zone.name.toUpperCase(),'SERVIZI PUBBLICI',zone.at+' CASE'],'#'+labelColor.toString(16).padStart(6,'0'),{wide:true}),
  side:THREE.FrontSide,toneMapped:false});
 const signData={publicKind:kind,civicSign:true,label:zone.name};
 const labelGeometry=new THREE.PlaneGeometry(signWidth,signHeight);
 for(const rear of [false,true]){
  const label=new THREE.Mesh(labelGeometry,labelMaterial);
  label.position.set(b.x,signY,signZ+(rear?-.16:.16));
  label.rotation.y=rear?Math.PI:0;Object.assign(label.userData,signData);group.add(label);
 }
 const structureMaterial=new THREE.MeshStandardMaterial({color:0x33494f,roughness:.8});
 const frame=new THREE.Mesh(new THREE.BoxGeometry(signWidth+.18,signHeight+.18,.24),structureMaterial);
 frame.position.set(b.x,signY,signZ);frame.castShadow=true;frame.receiveShadow=true;
 Object.assign(frame.userData,{publicKind:kind,civicSignFrame:true});group.add(frame);
 for(const side of [-1,1]){
  const post=new THREE.Mesh(new THREE.BoxGeometry(.22,signBottom,.22),structureMaterial);
  post.position.set(b.x+side*signWidth*.45,signBottom/2,signZ);
  post.castShadow=true;post.receiveShadow=true;
  Object.assign(post.userData,{publicKind:kind,civicSignPost:true});group.add(post);
 }
 return true;
}

function drawSpecial(zone){
  // The entire facility is built inside its four reserved CORNER lots.
  // Every part is derived from one bounded footprint, not house jitter.
  const b=facilityBounds(zone.block),x=b.x,z=b.z;
  const w=b.width,d=b.depth,kind=zone.kind;
  assertInsideParcel('Edificio pubblico '+kind,x,z,w,d,b);
  addBox(w,.10,d,x,.07,z,kind==='park'?0x86b77d:0xd0c7b7);
  if(kind==='park'){drawCitySquare(zone,b);return;}
  if(drawCivicBuilding(zone,b))return;
  if(kind==='park'){
    for(const side of [-1,1]){
      const playX=x+side*w*.30,playZ=z+d*.16;
      addBox(w*.19,.15,4.2,playX,.22,playZ,0xc4a173);
      for(const end of [-1,1])addBox(.17,2.7,.17,playX+end*w*.075,1.65,playZ,0xb8753e);
      addBox(w*.17,.19,.19,playX,3.05,playZ,0xc08b48);
      for(const end of [-1,1]){
        addBox(.06,1.65,.06,playX+end*.51,2.12,playZ,0x5c7674);
        addBox(.76,.15,.62,playX+end*.51,1.26,playZ,0xd6a555);
      }
    }

    addBox(3.8,.10,d-5,x,.16,z,0xc4a99e);
    addBox(w-5,.10,3.8,x,.16,z,0xc4a99e);
    addBox(w*.56,.13,d*.47,x,.17,z,0xc4a99e);
    for(const side of [-1,1]){
      const walkX=x+side*w*.43;
      const walkZ=z+side*d*.43;
      addBox(1.65,.10,d*.86,walkX,.16,z,0xc4a99e);
      addBox(w*.86,.10,1.65,x,.16,walkZ,0xc4a99e);
      for(const end of [-1,1]){
        const flowerX=x+end*w*.26;
        const flowerZ=z+side*d*.36;
        addBox(Math.min(6,w*.22)+.28,.16,1.63,flowerX,.17,flowerZ,0xd6c1ac);
        civicFlowerbed(flowerX,flowerZ,Math.min(6,w*.22),1.35,zone.block+side*4+end);
        const lampX=x+end*w*.40;
        addBox(.14,3.2,.14,lampX,1.72,walkZ,0x213e3c);
        addBox(.42,.29,.42,lampX,3.37,walkZ,0xffd999);
        addBox(.50,.10,.50,lampX,3.56,walkZ,0x263d38);
      }
    }
    const basin=new THREE.Mesh(new THREE.CylinderGeometry(2.7,2.85,.48,32),
      new THREE.MeshStandardMaterial({color:0xece0cb,roughness:.79}));
    const fountainZ=z-d*.24;
    basin.position.set(x,.4,fountainZ);
    basin.castShadow=true;
    basin.receiveShadow=true;
    group.add(basin);
    const water=new THREE.Mesh(new THREE.CylinderGeometry(2.46,2.46,.05,32),
      new THREE.MeshStandardMaterial({color:0x2aaccb,roughness:.19,metalness:.24}));
    water.position.set(x,.66,fountainZ);
    group.add(water);
    addBox(.28,1.05,.28,x,1.1,fountainZ,0xa8ebf5);
    addBox(5,.34,5,x,.36,z,0xc5bcb0);
    addBox(3.8,.52,3.8,x,.76,z,0xe4d9c8);
    const stone=new THREE.MeshStandardMaterial({color:0xf1e7d9,roughness:.88});
    const column=new THREE.Mesh(new THREE.CylinderGeometry(.87,1.3,6.4,4,1,false,Math.PI/4),stone);
    column.position.set(x,4.2,z);
    column.castShadow=true;
    column.receiveShadow=true;
    group.add(column);
    const spire=new THREE.Mesh(new THREE.ConeGeometry(.87,1.85,4,1,false,Math.PI/4),stone);
    spire.position.set(x,8.325,z);
    spire.castShadow=true;
    group.add(spire);
    for(const side of [-1,1]){
      for(const end of [-1,1]){
        addTree(x+side*w*.28,z+end*d*.28,zone.block*10+(side+1)*2+end+1,1.55,side===end);
        const bx=x+side*w*.21,bz=z+end*3.25;
        civicFlowerbed(bx,z+end*d*.38,Math.min(7,w*.24),2.1,zone.block*13+side*2+end);
        addBox(2.5,.16,.66,bx,.63,bz,0x9e5931);
        addBox(2.5,.54,.12,bx,.94,bz+end*.28,0xc38043);
        for(const leg of [-1,1])addBox(.13,.56,.52,bx+leg*.94,.32,bz,0x233942);
      }
    }
  }else if(kind==='monument'){
    addBox(w-4,.16,d-4,x,.18,z,0xe5d4b8);
    addBox(8,1.4,8,x,1,z,0xb9b8b3);
    addBox(3.5,11,3.5,x,7,z,0xece6d9);
    const tip=new THREE.Mesh(new THREE.ConeGeometry(2.7,4,4),new THREE.MeshLambertMaterial({color:0xc9b994}));
    tip.position.set(x,14.5,z);group.add(tip);
  }
  addBox(5,.08,2,x,.15,z+(d-3)/2,0xded5c6);
  // All decorations are inside the reserved civic parcel.
  if(kind==='park'||kind==='monument'){
    const margin=2.1;
    for(const side of [-1,1]){
      civicFlowerbed(x+side*(w/2-3.8),z,2.1,Math.max(3,d*.27),zone.block+side+5);
      civicBench(x+side*(w/2-6),z+d*.27);
    }
    if(kind==='monument'){
      for(const side of [-1,1]){
        const tx=x+side*(w/2-4.5),tz=z-d/2+5;
        if(isInsideParcel(tx,tz,4,4,b))addTree(tx,tz,zone.block+side+18);
      }
    }
  }
}
// Shop architecture varies deterministically by permanent purchase ID.
const shopStyles=[
  {name:'Caffetteria',walls:0xd9a77b,trim:0x704d39,glass:0x7ec6d9},
  {name:'Supermercato',walls:0xb5c7d1,trim:0x397e91,glass:0x94d8e9},
  {name:'Ristorante',walls:0xd9a2a5,trim:0x9e4649,glass:0x8fc0dc},
  {name:'Libreria',walls:0xbca8d9,trim:0x665494,glass:0xb1dbec},
  {name:'Farmacia',walls:0xe0e7d6,trim:0x57966a,glass:0x96d5d5},
  {name:'Negozio di moda',walls:0xd9bb91,trim:0x2f6877,glass:0x90d7e9},
  {name:'Officina',walls:0x9cafa8,trim:0x4f6860,glass:0x83b7c3},
  {name:'Panetteria',walls:0xf0c6a3,trim:0xb16a3f,glass:0xb6e0e5},
  {name:'Cinema',walls:0x7c9fb7,trim:0x394d76,glass:0x91c2de},
  {name:'Palestra',walls:0xb2c4a2,trim:0x4d785a,glass:0x96d8e2},
  {name:'Hotel',walls:0xd7c8b3,trim:0x987554,glass:0x8ab5cc},
  {name:'Mercato',walls:0xe0bca6,trim:0x9b624e,glass:0x8ed3d2}
];
function drawShops(){
  const box=new THREE.BoxGeometry(1,1,1),dummy=new THREE.Object3D(),batches=new Map();
  const disc=new THREE.CylinderGeometry(.5,.5,1,24);
  disc.rotateX(Math.PI/2);
  const dressShape=new THREE.Shape();
  dressShape.moveTo(-.26,.64);
  dressShape.lineTo(.26,.64);
  dressShape.lineTo(.18,.17);
  dressShape.lineTo(.58,-.64);
  dressShape.lineTo(-.58,-.64);
  dressShape.lineTo(-.18,.17);
  dressShape.closePath();
  const dress=new THREE.ExtrudeGeometry(dressShape,{depth:.12,bevelEnabled:false});
  dress.translate(0,0,-.06);
  const sculpt=new THREE.SphereGeometry(.5,20,12);
  const bar=new THREE.CylinderGeometry(.5,.5,1,16);
  bar.rotateZ(Math.PI/2);
  const cup=new THREE.CylinderGeometry(.5,.34,1,20);
  const handle=new THREE.TorusGeometry(.32,.10,8,18);
  const structuralKinds=new Set(['evolutionSignatureHall','evolutionSignatureHallWindow','evolutionSignatureHallSide','evolutionEntranceCanopy','evolutionEntranceColumn','evolutionUpperWindow','evolutionSideWindow','evolutionRoofTerrace','evolutionTerraceRail','evolutionTerraceSideRail','evolutionTerracePavilion','evolutionTerracePavilionPost','evolutionGrandEntrance','evolutionGrandPier','cafeCupSign','cafeHandleSign','pizzaDiscSign','pizzaSauceSign','pizzaToppingSign','tradeMark','tradeRound','tradeDress','tradeSculpt','tradeBar','shopPaving','shopUpperBody','shopUpperGlass','shopUpperCap','body','roof','hotelRoof','cinemaRoof',
      'garageRoof','superRoof','displayGlass','entryDoor','entryDoorGlass',
      'signFascia','signInset','garageGate','cinemaParapet','hotelUpperWindow']);
  function put(kind,color,shop,x,y,z,w,h,d){
    // Preserve low-cost architecture at all zoom levels. Decorative pieces
    // are spatially batched so only the visible nearby shops are detailed.
    const detailed=!structuralKinds.has(kind);
    const cx=shop?Math.floor(shop.x/90):0,cz=shop?Math.floor(shop.z/90):0;
    const geometry=kind==='cafeCupSign'?cup:kind==='cafeHandleSign'?handle:
      kind==='tradeDress'?dress:kind==='tradeSculpt'?sculpt:kind==='tradeBar'?bar:
      kind.startsWith('pizza')||kind==='tradeRound'?disc:box;
    const casts=/^(body|shopUpperBody|shopUpperCap|roof|cinemaRoof|hotelRoof|superRoof|garageRoof|evolutionSignatureHall|evolutionEntranceCanopy|evolutionEntranceColumn|evolutionRoofTerrace|evolutionTerracePavilion|evolutionGrandEntrance|evolutionGrandPier)$/.test(kind);
    const receives=casts||kind==='shopPaving';
    const key=[geometry.id,casts,receives,detailed?cx:'all',detailed?cz:'all'].join(':');
    if(!batches.has(key))batches.set(key,{geo:geometry,casts,receives,entries:[],detailed,
      chunk:{x:(cx+.5)*90,z:(cz+.5)*90}});
    let rotation=0;
    if(shop){rotation=facadeAngle(shop);
      const dx=x-shop.x,dz=z-shop.z,ca=Math.cos(rotation),sa=Math.sin(rotation);
      x=shop.x+dx*ca+dz*sa;z=shop.z-dx*sa+dz*ca;
    }
    batches.get(key).entries.push({shop,color,x,y,z,w,h,d,rotation});
  }
  for(const shop of shopPurchases){
    const style=shopStyles[shop.id%shopStyles.length];
    const seed=shop.id,district=districtStyle(shop.block);
    const shape=shop.id%shopStyles.length;
    const progress=shopProgressFor(shop);
    const stage=houseTier(progress.points);
    const growth=[0,.25,.52,.68,.79,.88,.95,1][stage];
    const width=[7.2,14.5,12.2,8.5,8.1,6.4,12.9,7.7,16.2,12.8,11.4,13.1][shape]*(.87+rnd(seed*31+8)*.16);
    const depth=[7.4,12.9,9.4,9.4,7.4,6.8,11.6,7.9,14.2,11.2,10.5,9.4][shape]*(.9+rnd(seed*37+3)*.12);
    const widthGrowth=[.76,.15,.28,.64,.42,.80,.24,.57,.12,.30,.23,.22][shape];
    const depthGrowth=[.78,.44,.62,.67,.54,.65,.51,.68,.34,.56,.38,.62][shape];
    const heightGrowth=[.27,.26,.23,.52,.29,.36,.22,.33,.32,.29,.12,.22][shape];
    const w=stage?Math.min(shape===2?14.5:17,width*(1+growth*widthGrowth)):width;
    const d=depth*(1+growth*depthGrowth);

    const baseHeight=[4.2,5.1,5.2,6.4,4.7,4.0,5.0,4.5,9.0,6.8,4.6,4.3][shape]
      *(.88+rnd(seed*41+2)*.22)*(district==='centro'?1.08:1);
    const height=shape===10?baseHeight+stage*3.35:baseHeight*(1+growth*heightGrowth)+(stage>=3?2.8:0);

    const x=shop.x,z=shop.z;
    const wallColor=progress.premium?coordinatedHouseColor(style.walls,0xffe8c5,shape===1?.68:.32):style.walls;
    const paving=progress.premium?0xc7ad8b:[0xaba99f,0xb8b5a9,0x9ba9a8][seed%3];
    put('shopPaving',paving,shop,x,.055,z,17.7,.06,17.5);
    put('body',wallColor,shop,x,height/2,z,w,height,d);
    const front=z+d/2, trim=style.trim, glass=style.glass;

    if(stage>=1){
      const canopyDepth=shape===0||shape===2||shape===7?4.15:shape===6?2.75:2.15;
      const canopyWidth=w*(shape===8?.90:.82);
      const canopyY=shape===8?3.55:3.04;
      put('evolutionEntranceCanopy',trim,shop,x,canopyY,front+canopyDepth*.43,canopyWidth,.24,canopyDepth);
      for(const side of [-1,1])
        put('evolutionEntranceColumn',wallColor,shop,x+side*canopyWidth*.48,canopyY*.50,front+canopyDepth*.80,.18,canopyY-.12,.18);
      if(shape===7){
        for(const side of [-1,1]){
          const tx=x+side*w*.29,tz=front+3.25;
          put('evolutionOutdoorTable',0xc69b68,shop,tx,1.02,tz,1.14,.14,.91);
          put('evolutionOutdoorTableLeg',trim,shop,tx,.56,tz,.22,.82,.22);
          for(const chairSide of [-1,1]){
            put('evolutionOutdoorChair',trim,shop,tx+chairSide*.78,.55,tz,.42,.12,.46);
            put('evolutionOutdoorChairBack',trim,shop,tx+chairSide*.92,.86,tz,.12,.59,.48);
          }
        }
      }else if(shape!==0&&shape!==2){
        for(const side of [-1,1])
          put('evolutionEntrancePlanter',0x66894b,shop,x+side*canopyWidth*.46,.40,front+3.05,.72,.65,.72);
      }
    }
    if(stage>=3&&shape!==10){
      const upperY=height-1.36;
      for(const side of [-1,1]){
        for(const bay of [-1,0,1]){
          put('evolutionUpperWindow',glass,shop,x+bay*w*.29,upperY,z+side*(d/2+.065),w*.21,1.51,.15);
          put('evolutionSideWindow',glass,shop,x+side*(w/2+.065),upperY,z+bay*d*.28,.15,1.51,d*.20);
        }
        put('evolutionStoreyBand',trim,shop,x,height-2.80,z+side*(d/2+.10),w+.18,.18,.24);
        put('evolutionSideStoreyBand',trim,shop,x+side*(w/2+.10),height-2.80,z,.24,.18,d+.18);
      }
    }
    if(stage>=4&&shape!==10){
      const deckY=height+.50;
      put('evolutionRoofTerrace',0xbca68b,shop,x,deckY,z,w*.94,.14,d*.94);
      for(const side of [-1,1]){
        put('evolutionTerraceRail',trim,shop,x,deckY+.94,z+side*d*.465,w*.95,.10,.10);
        put('evolutionTerraceSideRail',trim,shop,x+side*w*.465,deckY+.94,z,.10,.10,d*.95);
        for(const bay of [-.42,-.21,0,.21,.42]){
          put('evolutionTerraceBaluster',trim,shop,x+bay*w,deckY+.49,z+side*d*.465,.07,.91,.07);
          put('evolutionTerraceSideBaluster',trim,shop,x+side*w*.465,deckY+.49,z+bay*d,.07,.91,.07);
        }
        const seatX=x+side*w*.27;
        put('evolutionTerraceSeat',0xd8bb8b,shop,seatX,deckY+.49,z+d*.16,w*.19,.16,1.03);
      }
    }
    if(stage>=5&&shape!==10){
      const pavilionY=height+3.05;
      const pavilionWidth=w*(stage>=6?.82:.50);
      const pavilionDepth=d*(stage>=6?.43:.25);
      const pavilionZ=z-d*.22;
      put('evolutionTerracePavilion',trim,shop,x,pavilionY,pavilionZ,pavilionWidth,.25,pavilionDepth);
      for(const side of [-1,1])for(const face of [-1,1])
        put('evolutionTerracePavilionPost',wallColor,shop,x+side*pavilionWidth*.46,height+1.75,pavilionZ+face*pavilionDepth*.43,.18,2.48,.18);
    }
    if(stage>=6){
      const gardenZ=front+4.46;
      for(const side of [-1,1]){
        const gardenX=x+side*w*.37;
        put('evolutionGardenBox',0xdec9a6,shop,gardenX,.35,gardenZ,1.45,.55,1.15);
        put('evolutionGardenHedge',0x53804c,shop,gardenX,.91,gardenZ,1.31,.72,1.02);
        put('evolutionGardenLamp',trim,shop,gardenX,2.14,gardenZ,.15,2.08,.15);
        put('evolutionGardenLantern',0xffd798,shop,gardenX,3.22,gardenZ,.35,.38,.35);
      }
    }
    if(stage>=7){

      if(shape!==10){
        const hallZ=z-d*.22,hallWidth=w*.66,hallDepth=d*.35;
        put('evolutionSignatureHall',wallColor,shop,x,height+1.77,hallZ,hallWidth,2.40,hallDepth);
        for(const side of [-1,1]){
          put('evolutionSignatureHallWindow',glass,shop,x+side*hallWidth*.25,height+1.90,hallZ+hallDepth/2+.07,hallWidth*.32,1.22,.15);
          put('evolutionSignatureHallSide',glass,shop,x+side*(hallWidth/2+.07),height+1.90,hallZ,.15,1.22,hallDepth*.67);
        }
      }

      const portalWidth=w*.55;
      put('evolutionGrandEntrance',wallColor,shop,x,3.65,front+.35,portalWidth,.46,.72);
      for(const side of [-1,1])
        put('evolutionGrandPier',trim,shop,x+side*portalWidth*.47,1.84,front+.35,.36,3.30,.56);
    }

    if(stage>=2&&(shape===0||shape===3)){
      const library=shape===3;
      const annexWidth=w*(library?.82:.72);
      const annexDepth=2.0+growth*3.1;
      const annexHeight=height*(library?.77:.57);
      const annexZ=z-d/2-annexDepth/2+.08;
      put('body',wallColor,shop,x,annexHeight/2,annexZ,annexWidth,annexHeight,annexDepth);
      put('roof',trim,shop,x,annexHeight+.12,annexZ,annexWidth+.24,.24,annexDepth+.20);
      const back=annexZ-annexDepth/2;
      for(const bay of [-1,0,1]){
        const bx=x+bay*annexWidth*.28;
        put('displayGlass',glass,shop,bx,annexHeight*.49,back-.07,annexWidth*.20,annexHeight*.55,.16);
      }
      if(library&&progress.premium){
        for(const side of [-1,1]){
          const wingX=x+side*(annexWidth/2+.08);
          put('displayGlass',glass,shop,wingX,annexHeight*.55,annexZ,.17,annexHeight*.60,annexDepth*.74);
          for(const bay of [-.39,0,.39])
            put('body',0xe8d7ba,shop,wingX+side*.10,annexHeight*.50,annexZ+bay*annexDepth,.24,annexHeight*.92,.22);
        }
        put('roof',0xd8c8aa,shop,x,annexHeight*.23,back-.13,annexWidth+.12,.20,.31);
      }
      if(library&&stage>=2){
        const porchWidth=w*.77;
        put('roof',trim,shop,x,3.30,front+.83,porchWidth,.27,1.76);
        put('shopPaving',0xd9c7a8,shop,x,.19,front+.81,porchWidth,.20,1.91);
        for(const bay of [-.43,-.15,.15,.43])
          put('body',0xe9d9bb,shop,x+bay*porchWidth,1.74,front+1.46,.27,2.96,.27);
      }
      if(!library&&stage>=2){
        put('shopPaving',0xbc9876,shop,x,.15,back-1.4,annexWidth,.17,2.75);
        for(const side of [-1,1]){
          const tx=x+side*annexWidth*.25;
          put('shopDiningPedestal',trim,shop,tx,.60,back-1.47,.22,.84,.22);
          put('shopDiningTable',0xf4dab1,shop,tx,1.04,back-1.47,1.18,.13,.94);
          if(stage>=6){
            put('shopPergolaPost',trim,shop,tx,1.65,back-2.45,.14,2.99,.14);
            put('shopPergolaBeam',trim,shop,tx,3.13,back-1.31,.16,.18,2.50);
          }
        }
      }
    }
    if(stage>=2&&(shape===1||shape===2||shape===8)){
      const cinema=shape===8,restaurant=shape===2;
      const extensionWidth=w*(cinema?.91:restaurant?.76:.88);
      const extensionDepth=2.4+growth*4.2;
      const rear=z-d/2;
      const extensionZ=rear-extensionDepth/2+.10;
      const extensionHeight=height*(cinema?.88:restaurant?.69:.53);
      put('body',wallColor,shop,x,extensionHeight/2,extensionZ,extensionWidth,extensionHeight,extensionDepth);
      put('roof',trim,shop,x,extensionHeight+.13,extensionZ,extensionWidth+.28,.26,extensionDepth+.28);
      const back=extensionZ-extensionDepth/2;
      if(restaurant){
        for(const bay of [-1,0,1]){
          put('displayGlass',glass,shop,x+bay*extensionWidth*.27,extensionHeight*.51,back-.08,extensionWidth*.19,extensionHeight*.56,.17);
        }
        if(stage>=2){
          put('shopPaving',0xc19b76,shop,x,.16,back-1.65,extensionWidth,.20,3.25);
          for(const side of [-1,1]){
            const tx=x+side*extensionWidth*.25;
            put('shopDiningTable',0xf0ca91,shop,tx,1.08,back-1.59,1.18,.14,.95);
            put('shopDiningPedestal',trim,shop,tx,.60,back-1.59,.23,.83,.23);
          }
        }
      }else if(cinema){
        for(const side of [-1,1]){
          const edge=x+side*(extensionWidth/2+.10);
          put('body',trim,shop,edge,extensionHeight*.52,extensionZ,.24,extensionHeight*.91,extensionDepth*.68);
        }
        if(stage>=4){
          put('body',0x333c56,shop,x,extensionHeight*.57,back-.14,extensionWidth*.69,extensionHeight*.50,.30);
          put('displayGlass',0xe9be71,shop,x,extensionHeight*.57,back-.31,extensionWidth*.58,.16,.10);
        }
      }else{
        for(const bay of [-1,0,1])
          put('garageGate',0x637578,shop,x+bay*extensionWidth*.29,1.38,back-.09,extensionWidth*.24,2.65,.19);
        if(stage>=4)
          put('roof',trim,shop,x,3.04,back-.87,extensionWidth+.16,.21,1.82);
      }
    }
    if(stage>=2&&shape>=4&&shape<=7){
      const rear=z-d/2;
      const annexDepth=2.1+growth*3.7;
      const annexZ=rear-annexDepth/2+.08;
      const annexW=w*[.76,.89,.92,.75][shape-4];
      const annexH=height*[.63,.83,.73,.59][shape-4];
      put('body',wallColor,shop,x,annexH/2,annexZ,annexW,annexH,annexDepth);
      put('roof',trim,shop,x,annexH+.13,annexZ,annexW+.24,.26,annexDepth+.24);
      const back=annexZ-annexDepth/2;
      if(shape===4){
        put('entryDoorGlass',glass,shop,x,1.25,back-.12,1.63,2.44,.17);
        for(const side of [-1,1])
          put('displayGlass',glass,shop,x+side*annexW*.31,1.78,back-.08,annexW*.22,1.29,.16);
        if(stage>=4)put('roof',0xe5f0dc,shop,x,2.77,back-.63,annexW*.73,.22,1.36);
        if(progress.premium){
          for(const side of [-1,1]){
            const wingX=x+side*(annexW/2+.08);
            put('displayGlass',glass,shop,wingX,annexH*.56,annexZ,.17,annexH*.48,annexDepth*.70);
            put('body',0xe5f0dc,shop,wingX+side*.09,annexH*.27,annexZ,.24,.18,annexDepth*.77);
          }
        }
      }else if(shape===5){
        for(const side of [-1,1]){
          put('displayGlass',glass,shop,x+side*annexW*.24,annexH*.52,back-.08,annexW*.40,annexH*.62,.18);
          if(stage>=4)
            put('body',trim,shop,x+side*annexW*.44,annexH*.50,back-.20,.25,annexH,.33);
        }
      }else if(shape===6){
        for(const side of [-1,1])
          put('garageGate',0x657374,shop,x+side*annexW*.24,annexH*.43,back-.08,annexW*.40,annexH*.83,.17);
        if(stage>=4)put('roof',trim,shop,x,annexH+.10,back-.99,annexW,.24,2.01);
      }else{
        for(const side of [-1,1])
          put('displayGlass',glass,shop,x+side*annexW*.25,annexH*.56,back-.08,annexW*.29,annexH*.45,.17);
        if(stage>=4){
          const chimney=annexH*.67;
          put('body',0xb97955,shop,x+annexW*.27,annexH+chimney/2,annexZ,.60,chimney,.65);
          put('roof',0x6a5245,shop,x+annexW*.27,annexH+chimney,annexZ,.78,.16,.81);
        }
      }
    }
    if(stage>=2&&shape===9){
      const hallWidth=w*.88,hallDepth=2.7+growth*4.0;
      const hallHeight=height*.72,hallZ=z-d/2-hallDepth/2+.08;
      put('body',wallColor,shop,x,hallHeight/2,hallZ,hallWidth,hallHeight,hallDepth);
      put('roof',trim,shop,x,hallHeight+.17,hallZ,hallWidth+.22,.34,hallDepth+.23);
      for(const side of [-1,1]){
        const bx=x+side*(hallWidth/2+.06);
        put('displayGlass',glass,shop,bx,hallHeight*.53,hallZ,.15,hallHeight*.56,hallDepth*.75);
        if(stage>=4)
          put('shopUpperCap',trim,shop,bx,hallHeight*.24,hallZ,.23,.17,hallDepth*.82);
      }
    }
    if(stage>=2&&shape===11){
      const stalls=stage>=6?3:stage>=4?2:1;
      const stallWidth=w*.24,stallZ=z-d/2-2.22;
      for(let i=0;i<stalls;i++){
        const sx=x+(i-(stalls-1)/2)*w*.29;
        put('shopPaving',0xc6ac89,shop,sx,.14,stallZ,stallWidth+.34,.18,3.82);
        put('body',0xb88a62,shop,sx,.66,stallZ-.58,stallWidth,.91,.90);
        for(const side of [-1,1])
          put('shopPergolaPost',trim,shop,sx+side*stallWidth*.45,1.56,stallZ,.14,2.83,.14);
        put('roof',i%2?0xbd6954:trim,shop,sx,3.08,stallZ,stallWidth+.36,.23,3.40);
        if(progress.premium){
          for(const stripe of [-1,0,1]){
            const stripeW=(stallWidth+.36)/5;
            put('roof',0xf4d7a0,shop,sx+stripe*stripeW*1.67,3.215,stallZ,stripeW,.08,3.43);
          }
          put('displayGlass',0xffd998,shop,sx,2.82,stallZ-1.35,stallWidth*.73,.09,.09);
        }
      }
    }
    if(stage>=2&&shape===10){
      const lobbyWidth=w*.84,lobbyDepth=1.32+growth*1.40;
      const lobbyZ=front+lobbyDepth/2-.08;
      put('shopPaving',0xd2bd9d,shop,x,.17,lobbyZ,lobbyWidth+.34,.19,lobbyDepth+.25);
      put('roof',trim,shop,x,3.48,lobbyZ,lobbyWidth+.42,.24,lobbyDepth+.28);
      for(const side of [-1,1]){
        const px=x+side*lobbyWidth*.43;
        put('body',wallColor,shop,px,1.83,lobbyZ+lobbyDepth*.37,.30,3.06,.32);
        if(stage>=4)
          put('displayGlass',glass,shop,px,1.80,lobbyZ,.12,2.83,lobbyDepth*.78);
      }
    }

    if(shape===10){
      for(let floor=0;floor<=stage;floor++){
        const levelY=3.70+floor*3.35;
        if(levelY+1>height)continue;
        for(const side of [-1,1]){
          for(const bay of [-1,0,1]){
            put('hotelUpperWindow',glass,shop,x+bay*w*.29,levelY,z+side*(d/2+.07),w*.20,1.79,.15);
            put('hotelUpperWindow',glass,shop,x+side*(w/2+.07),levelY,z+bay*d*.28,.15,1.79,d*.20);
          }
          put('evolutionStoreyBand',trim,shop,x,levelY+1.23,z+side*(d/2+.09),w+.10,.16,.22);
          put('evolutionSideStoreyBand',trim,shop,x+side*(w/2+.09),levelY+1.23,z,.22,.16,d+.10);
        }
      }
    }
    if(progress.premium){
      put('shopPremiumCornice',0xf2dfbf,shop,x,height-.12,front+.14,w,.25,.34);
      put('shopPremiumRearCornice',0xf2dfbf,shop,x,height-.12,z-d/2-.12,w,.25,.31);
      for(const side of [-1,1]){
        const sideX=x+side*(w/2+.12);
        put('shopPremiumSideCornice',0xf2dfbf,shop,sideX,height-.12,z,.31,.25,d+.22);
        put('shopPremiumSidePilaster',0xf2dfbf,shop,sideX,height*.47,z-d*.40,.26,height*.89,.29);
      }
      for(const side of [-1,1]){
        const px=x+side*w*.44;
        put('shopPremiumPilaster',0xf2dfbf,shop,px,height*.47,front+.16,.29,height*.89,.28);
        put('shopPremiumLamp',0xffd887,shop,px,height*.64,front+.35,.23,.36,.18);
        put('shopPremiumPlanter',trim,shop,px,.30,front+.93,.64,.47,.52);
        put('shopPremiumPlant',0x648e40,shop,px,.65,front+.93,.48,.36,.43);
      }
    }
    if(shape===0){
      put('cafeCupSign',0xffefcd,shop,x,height+.93,front-.65,1.68,1.26,1.59);
      put('cafeHandleSign',0xffefcd,shop,x+.84,height+.94,front-.65,1.17,1.22,1.16);
    }
    if(shape===2&&shop.id%24===14){
      put('pizzaDiscSign',0xc47b30,shop,x,height+1.39,front-.39,2.85,2.85,.39);
      put('pizzaSauceSign',0xffc260,shop,x,height+1.39,front-.16,2.46,2.46,.09);
      for(let topping=0;topping<6;topping++){
        const angle=topping*Math.PI/3;
        put('pizzaToppingSign',0xc24438,shop,x+Math.cos(angle)*.73,height+1.39+Math.sin(angle)*.73,front-.09,.34,.34,.07);
      }
    }
    const pizzeria=shape===2&&shop.id%24===14;
    if(shape!==0&&!pizzeria){
      const sculptureScale=shape===8||shape===10?1.70:1.42;
      const badgeY=height+2.43,badgeZ=front+.32;
      const mark=(dx,dy,width,markHeight,color,kind='tradeMark',dz=0,depth=.38)=>{
        put(kind,color,shop,x+dx*sculptureScale,badgeY+dy*sculptureScale,
          badgeZ+dz*sculptureScale,width*sculptureScale,markHeight*sculptureScale,depth*sculptureScale);
      };
      put('tradeMark',trim,shop,x,height+1.07,badgeZ,.30,2.15,.28);
      const ivory=shape===1?0xffc45c:0xffe9c3;
      if(shape===1){ // Shopping cart
        const metal=0xffc45c;
        mark(.02,-.12,1.50,.11,metal,'tradeMark',0,.83);
        for(const side of [-1,1]){
          const dz=side*.39;
          mark(.02,.45,1.60,.10,metal,'tradeMark',dz,.10);
          for(const bar of [-.72,-.46,-.18,.10,.38,.72])
            mark(bar,.17,.085,.58,metal,'tradeMark',dz,.09);
          for(const wheel of [-.53,.55])
            mark(wheel,-.40,.33,.33,0x303d43,'tradeRound',dz,.18);
        }
        for(const end of [-1,1]){
          mark(end*.75,.45,.10,.10,metal,'tradeMark',0,.87);
          for(const bar of [-.24,0,.24])
            mark(end*.75,.17,.10,.58,metal,'tradeMark',bar,.08);
        }
        mark(-.92,.52,.13,.29,metal,'tradeMark',0,.76);
        mark(-1.06,.66,.18,.13,0x854429,'tradeMark',0,.81);
      }else if(shape===2){ // Standing cutlery
        mark(-.36,-.10,.13,1.12,ivory,'tradeMark',0,.16);
        mark(.35,-.39,.21,.64,0x814632,'tradeMark',0,.24);
        mark(.35,.28,.28,.86,ivory,'tradeSculpt',0,.19);
        for(const tine of [-.55,-.36,-.17])mark(tine,.46,.085,.44,ivory,'tradeMark',0,.13);
        mark(-.36,.24,.43,.12,ivory,'tradeMark',0,.17);
      }else if(shape===3){ // Two page blocks and a bound spine
        mark(0,-.04,1.62,1.24,0x674b8b,'tradeMark',-.13,.33);
        mark(0,.01,.13,1.17,0xc9a572,'tradeMark',.10,.34);
        for(const side of [-1,1]){
          mark(side*.42,.02,.71,1.06,ivory,'tradeMark',.10,.35);
          for(const row of [-.27,0,.27])mark(side*.42,row,.45,.07,trim,'tradeMark',.29,.045);
        }
      }else if(shape===4){ // Thick illuminated pharmacy cross
        mark(0,0,.51,1.58,0x247e56,'tradeMark',0,.80);
        mark(0,0,1.58,.51,0x247e56,'tradeMark',0,.80);
        for(const side of [-1,1]){
          mark(0,0,.32,1.37,0xa6ffb1,'tradeMark',side*.412,.045);
          mark(0,0,1.37,.32,0xa6ffb1,'tradeMark',side*.412,.045);
        }
      }else if(shape===5){ // Dress on a rounded display mannequin
        mark(0,.62,.30,.38,0xe4bb94,'tradeSculpt',0,.29);
        mark(0,0,.63,.95,0xc44f71,'tradeSculpt',0,.62);
        mark(0,-.12,1.14,1.06,0xd9547c,'tradeDress',0,4.2);
      }else if(shape===6){ // Wrench with a rounded handle and open jaws
        mark(0,-.25,.29,1.09,0xadc0c5,'tradeSculpt',0,.46);
        mark(0,.24,.84,.24,ivory,'tradeMark',0,.49);
        for(const side of [-1,1])mark(side*.31,.46,.23,.42,ivory,'tradeSculpt',0,.46);
      }else if(shape===7){ // Rounded loaf with scored crust
        mark(0,0,1.69,.95,0xe1a34c,'tradeSculpt',0,.96);
        for(const score of [-.40,0,.40])mark(score,.39,.10,.08,0xffd287,'tradeSculpt',0,.44);
      }else if(shape===8){ // Clapperboard with a projecting hinged top
        mark(0,-.19,1.42,.82,0xf2d9a9,'tradeMark',0,.52);
        for(const face of [-1,1]){
          mark(0,-.04,1.12,.13,0x38445b,'tradeMark',face*.27,.045);
          mark(0,-.31,.84,.095,0x56627a,'tradeMark',face*.27,.045);
        }
        mark(0,.37,1.48,.22,ivory,'tradeMark',0,.58);
        for(const slash of [-.45,0,.45])mark(slash,.37,.17,.24,0x343d51,'tradeMark',0,.59);
        mark(-.61,.21,.24,.22,0xc38c50,'tradeRound',0,.62);
      }else if(shape===9){ // Dumbbell with cylindrical weights
        mark(0,0,1.55,.16,0xcbd3d7,'tradeBar',0,.16);
        for(const side of [-1,1])mark(side*.61,0,.34,.83,0x30475b,'tradeBar',0,.83);
      }else if(shape===10){ // Bed with mattress and two pillows
        mark(0,-.32,1.52,.22,0x8b5737,'tradeMark',0,.95);
        mark(-.66,.02,.17,.80,0x8b5737,'tradeMark',0,.98);
        mark(.08,-.10,1.30,.22,ivory,'tradeMark',0,.90);
        mark(.28,.04,.86,.18,0x6193b8,'tradeMark',0,.87);
        for(const side of [-1,1])mark(-.40,.08,.36,.20,0xfff8df,'tradeSculpt',side*.23,.41);
      }else{ // Market stall with counter and striped canopy
        mark(0,-.33,1.47,.24,0xa96942,'tradeMark',0,.84);
        for(const side of [-1,1])for(const edge of [-1,1])
          mark(side*.62,.02,.13,.83,0x9c633d,'tradeMark',edge*.33,.13);
        for(let stripe=0;stripe<7;stripe++)
          mark((stripe-3)*.22,.41,.22,.19,stripe%2?0xffe9c3:0xd47049,'tradeMark',0,1.02);
      }
    }
    const entranceW=2.05, doorH=Math.min(2.65,height*.52);
    // A single storefront system, shared proportions but distinct identities.
    // The door is central, with two uninterrupted display windows either side.
    const wingW=(w-entranceW-1.0)/2;
    const displayH=Math.min(2.85,height*.55),displayY=1.05+displayH/2;
    for(const side of [-1,1]){
      const wx=x+side*(entranceW/2+.22+wingW/2);
      if(shape!==6)put('displayGlass',glass,shop,wx,displayY,front+.11,wingW-.28,displayH,.11);
      put('displayTop',trim,shop,wx,displayY+displayH/2+.06,front+.19,wingW,.13,.18);
      put('displaySill',trim,shop,wx,displayY-displayH/2-.05,front+.19,wingW,.12,.20);
      for(const edge of [-1,1])put('displayJamb',trim,shop,wx+edge*wingW/2,displayY,front+.19,.12,displayH+.12,.19);
      const paneZ=front+.182;
      if(shape===1){ // Produce bins under the supermarket glass.
        put('marketProduceCrate',0xa36c3c,shop,wx,displayY-.66,paneZ,wingW*.75,.36,.15);
        for(let fruit=0;fruit<5;fruit++){
          put('marketProduce',fruit%2?0x9cbb43:0xff9350,shop,wx+(fruit-2)*wingW*.13,
            displayY-.43,paneZ+.06,.20,.18,.16);
        }
      }else if(shape===4){ // Pharmacy: a clinical display with a green cross.
        put('pharmacyDisplayPanel',0xecf3e8,shop,wx,displayY-.18,paneZ,wingW*.64,.93,.07);
        put('pharmacyDisplayCross',0x2aa465,shop,wx,displayY-.18,paneZ+.06,.14,.59,.055);
        put('pharmacyDisplayCross',0x2aa465,shop,wx,displayY-.18,paneZ+.06,.59,.14,.055);
      }else if(shape===7){ // Bakery: bread on a low warm counter.
        put('bakeryWindowCounter',0xaf7244,shop,wx,displayY-.65,paneZ,wingW*.77,.38,.17);
        for(let loaf=0;loaf<3;loaf++){
          put('bakeryLoaf',loaf%2?0xb77331:0xe5a75b,shop,wx+(loaf-1)*wingW*.22,
            displayY-.39,paneZ+.08,.37,.19,.14);
        }
      }else if(shape===8){ // Cinema: full-height poster cases.
        const poster=side<0?0xa93951:0x284e8a;
        put('cinemaPosterFrame',0xd6ad68,shop,wx,displayY,paneZ,wingW*.53,displayH*.80,.10);
        put('cinemaPoster',poster,shop,wx,displayY,paneZ+.063,wingW*.45,displayH*.71,.055);
        put('cinemaPosterTitle',0xffdc93,shop,wx,displayY-displayH*.22,paneZ+.10,wingW*.35,.13,.023);
      }else if(shape===9){ // Gym: weight racks and barbell silhouettes.
        put('gymBarbell',0xb8c4c6,shop,wx,displayY-.38,paneZ,wingW*.65,.085,.10);
        for(const plate of [-1,1])
          put('gymWeightPlate',0x263238,shop,wx+plate*wingW*.25,displayY-.38,paneZ+.035,.16,.52,.13);
      }else if(shape===10){ // Hotel: reception desk and pendant lights.
        put('hotelReception',0x85553a,shop,wx,displayY-.53,paneZ,wingW*.72,.57,.19);
        put('hotelPendant',0xffdd92,shop,wx,displayY+.61,paneZ,.33,.24,.12);
      }
      if(shape===5){
        const fabric=side<0?0xd75374:0x467bb1;
        put('fashionDisplayDress',fabric,shop,wx,displayY-.16,front+.182,.48,1.27,.073);
        put('fashionDisplayHem',fabric,shop,wx,displayY-.66,front+.182,.73,.43,.073);
        put('fashionDisplaySleeve',fabric,shop,wx-.29,displayY+.32,front+.182,.19,.32,.073);
        put('fashionDisplaySleeve',fabric,shop,wx+.29,displayY+.32,front+.182,.19,.32,.073);
        put('fashionDisplayNeck',0xe5c5a2,shop,wx,displayY+.54,front+.18,.17,.16,.074);
      }
      if(shape!==6)put('displayReflection',0x9bc9df,shop,wx-wingW*.29,displayY+.12,front+.181,
        .055,displayH*.79,.012);
      // Only a single subtle central mullion on wide shop windows.
      if(wingW>2.8)put('displayDivider',0x5d7073,shop,wx,displayY,front+.19,.06,displayH,.07);
    }
    put('entryDoor',0x455d64,shop,x,doorH/2+.12,front+.17,entranceW-.14,doorH,.16);
    put('entryDoorGlass',glass,shop,x,doorH*.69+.10,front+.265,entranceW-.43,doorH*.42,.055);
    put('entryDoorFrame',trim,shop,x,doorH+.22,front+.20,entranceW+.12,.15,.20);
    for(const side of [-1,1])put('entryDoorJamb',trim,shop,x+side*entranceW/2,doorH/2+.10,front+.20,.12,doorH,.20);
    put('entryHandle',0xe6c68c,shop,x+.65,1.15,front+.30,.055,.20,.06);
    put('threshold',0xc5b9a8,shop,x,.105,front+.31,entranceW+.26,.12,.54);
    // One clean sign band and one restrained canopy, no stacked horizontal bars.
    const signY=Math.min(height-.58,displayY+displayH/2+.68);
    put('signFascia',trim,shop,x,signY,front+.15,w*.84,.57,.22);
    put('signInset',0xe6dfd2,shop,x,signY,front+.275,w*.74,.32,.06);
    const canopyY=signY-.46;
    if(![6,8,10].includes(shape)){
      put('singleCanopy',trim,shop,x,canopyY,front+.47,w*.81,.13,.76);
      if(shape!==1){
        const stripeW=w*.81/11;
        for(let stripe=0;stripe<11;stripe++){
          const stripeX=x+(stripe-5)*stripeW;
          const stripeColor=stripe%2?0xfff1dd:trim;
          put('shopAwningStripe',stripeColor,shop,stripeX,canopyY+.077,front+.49,stripeW,.033,.76);
          put('shopAwningValance',stripeColor,shop,stripeX,canopyY-.105,front+.86,stripeW,.22,.065);
        }
      }
    }
    // Rooflines and distinctive category silhouettes.
    if(shape===10){ // Hotel: taller body, upper glazing and a proper portico.
      put('hotelRoof',trim,shop,x,height+.25,z,w+.35,.46,d+.35);
      put('hotelTopBand',trim,shop,x,height-.53,front+.13,w*.86,.25,.22);
      for(const side of [-1,1]){
        put('hotelEntryTransom',glass,shop,x+side*w*.27,2.74,front+.12,1.35,.63,.12);
        put('hotelUpperSill',trim,shop,x+side*w*.27,height*.77-.83,front+.20,1.48,.12,.19);
        put('hotelColumn',0xc5b7a5,shop,x+side*1.45,1.45,front+1.05,.23,2.9,.23);
      }
      put('hotelEntranceRoof',trim,shop,x,3.03,front+.83,3.55,.18,1.75);
    }else if(shape===8){ // Cinema: bold marquee and tall front parapet.
      put('cinemaRoof',0x364b66,shop,x,height+.24,z,w+.36,.48,d+.36);
      put('cinemaParapet',trim,shop,x,height+.78,front-.13,w*.94,1.10,.38);
      put('cinemaMarquee',0xe7bc68,shop,x,signY+.04,front+.46,w*.80,.44,.70);
      for(const side of [-1,1])put('cinemaLight',0xffe3a4,shop,x+side*w*.36,signY+.04,front+.85,.13,.13,.12);
    }else if(shape===6){ // Garage: broad rolling door, industrial lintel.
      put('garageRoof',trim,shop,x,height+.25,z,w+.34,.50,d+.34);
      put('garageGate',0x6f8585,shop,x+w*.20,1.73,front+.24,w*.36,3.15,.15);
      for(let j=0;j<5;j++)put('garageSlat',0x9ab0b0,shop,x+w*.20,.54+j*.57,front+.33,w*.34,.055,.06);
    }else if(shape===1){ // Supermarket: large, simple retail canopy.
      put('superRoof',trim,shop,x,height+.27,z,w+.45,.54,d+.45);
      put('superCanopy',trim,shop,x,canopyY,front+.58,w*.91,.20,1.00);
    }else{
      put('roof',trim,shop,x,height+.23,z,w+.40,.45,d+.40);
    }
    if(shape===0&&stage>=1){ // Café terrace, counter and chalkboard.
      for(const side of [-1,1]){
        const tx=x+side*w*.34;
        put('cafeTableTop',0x426c64,shop,tx,.80,front+1.39,.78,.09,.78);
        put('cafeTableLeg',0x263a38,shop,tx,.40,front+1.39,.10,.78,.10);
        put('cafeStool',0xbf8451,shop,tx+side*.64,.44,front+1.39,.43,.10,.43);
        put('cafeCup',0xffe7c4,shop,tx,.91,front+1.39,.16,.13,.16);
      }
      put('cafeChalkboardFrame',0xa2764a,shop,x-1.48,.58,front+1.14,.59,1.06,.25);
      put('cafeChalkboard',0x293733,shop,x-1.48,.63,front+1.28,.47,.76,.035);
    }else if(shape===2&&stage>=1){ // Restaurant terrace with set tables and a timber pergola.
      const patioZ=front+1.72, canopy=0x814439;
      put('restaurantTerrace',0xc29979,shop,x,.11,patioZ,w*.94,.17,2.95);
      for(const side of [-1,1]){
        const tx=x+side*w*.34;
        put('restaurantTable',0xffe4bd,shop,tx,.82,patioZ,1.30,.15,1.08);
        put('restaurantStand',0x63473a,shop,tx,.46,patioZ,.15,.72,.15);
        for(const end of [-1,1]){
          put('restaurantPlate',0xfff6e5,shop,tx,.92,patioZ+end*.29,.28,.04,.24);
          put('restaurantChairSeat',0x7b4d32,shop,tx,.46,patioZ+end*.84,.53,.12,.50);
          put('restaurantChairBack',0x9f653e,shop,tx,.69,patioZ+end*1.05,.55,.54,.09);
        }

        put('restaurantPlanter',0xa55e42,shop,x+side*w*.43,.30,front+2.95,.74,.49,.51);
        put('restaurantPlant',0x638d39,shop,x+side*w*.43,.60,front+2.95,.61,.35,.42);
      }

    }else if(shape===3){ // Bookshop: the only storefront with book shelves.
      for(const side of [-1,1])for(let j=0;j<3;j++)
        {
        const sx=x+side*w*.28,sy=1.37+j*.55;
        put('bookShelf',0x8c654d,shop,sx,sy,front+.28,1.35,.10,.15);
        for(let volume=0;volume<5;volume++)
          put('bookSpine',[0xb4525a,0x4e7697,0xdeb16a][(j+volume)%3],shop,
            sx+(volume-2)*.19,sy+.20,front+.33,.14,.29,.11);
      }
    }else if(shape===4){ // Pharmacy: unmistakable green cross.
      put('pharmacyCrossV',0x35aa68,shop,x+w*.35,signY+.64,front+.30,.30,.88,.15);
      put('pharmacyCrossH',0x35aa68,shop,x+w*.35,signY+.64,front+.32,.85,.29,.17);
    }else if(shape===5){ // Fashion boutique: contrasting display podiums.
      for(const side of [-1,1])put('fashionPlinth',0xdbc7b0,shop,x+side*w*.29,.46,front+.32,1.24,.70,.23);
    }else if(shape===7){ // Bakery: warm awning and small window counters.
      for(const side of [-1,1])put('bakeryCounter',0xc08a58,shop,x+side*w*.31,.74,front+.32,1.54,.20,.31);
    }else if(shape===9){ // Gym: bold facade stripes.
      for(const side of [-1,1])put('gymAccent',0x4c886d,shop,x+side*w*.42,height*.60,front+.17,.19,height*.56,.16);
    }else if(shape===11){ // Market: two orderly stalls outside the side windows.
      for(const side of [-1,1]){
        put('marketCounter',0xa77e57,shop,x+side*w*.32,.65,front+1.04,1.68,.43,.66);
        put('marketRoof',trim,shop,x+side*w*.32,2.14,front+1.04,1.78,.13,.91);
        for(const edge of [-1,1])put('marketPost',0x95734f,shop,x+side*w*.32+edge*.78,1.32,front+1.04,.09,1.62,.09);
      }
    }
    // v6.4.3: category-specific BUILDING silhouettes. These are roof/side
    // structures, not extra canopies piled in front of the windows.
    // All fine details are tagged by put() for existing shop chunk LOD.
    const rooftop=height+.52;
    const roofWidth=1;
    const roofDepth=1;
    const roofCenter=z;
    const roofPut=(kind,color,shop,px,py,pz,pw,ph,pd)=>{
      put(kind,color,shop,x+(px-x)*roofWidth,py,roofCenter+(pz-z)*roofDepth,pw*roofWidth,ph,pd*roofDepth);
    };
    if(shape===0){ // Cafe: chimney and small rooftop pergola.
      roofPut('cafeChimney',0x9b6552,shop,x-w*.30,rooftop+.38,z-d*.18,.58,.78,.58);
      for(const side of [-1,1])
        roofPut('cafePergolaPost',0x7d5845,shop,x+side*w*.25,rooftop+.30,z,.12,.60,.12);
      roofPut('cafePergolaBeam',0xb88a60,shop,x,rooftop+.64,z,w*.55,.12,.20);
    }else if(shape===1){ // Supermarket: roof service units, loading dock.
      for(const side of [-1,1])
        roofPut('superRoofVent',0x809596,shop,x+side*w*.23,rooftop+.36,z,.90,.62,1.12);
      put('superLoading',0x74898a,shop,x+w/2+.09,1.60,z-d*.13,.15,2.55,2.65);
      put('superLoadingTrim',0xcbd0c8,shop,x+w/2+.20,3.00,z-d*.13,.18,.20,2.86);
    }else if(shape===2){ // Restaurant: tall extraction stack and tiled roof strip.
      roofPut('restaurantFlue',0x827f77,shop,x+w*.30,rooftop+.86,z-d*.19,.42,1.70,.42);
      roofPut('restaurantFlueCap',0x535953,shop,x+w*.30,rooftop+1.74,z-d*.19,.66,.14,.66);
      roofPut('restaurantRoofBand',0x9d654c,shop,x,rooftop-.06,z,w*.73,.14,d*.72);
    }else if(shape===3){ // Bookshop: pitched central pediment and tall shelves on side.
      roofPut('bookshopCornice',0x92765b,shop,x,rooftop+.05,front-.17,w*.70,.28,.32);
      roofPut('bookshopPediment',0xc4a784,shop,x,rooftop+.45,front-.19,w*.40,.62,.30);
      for(let i=0;i<3;i++)
        put('bookshopSideShelf',0x8d6a4c,shop,x+w/2+.15,1.05+i*.78,z,.15,.10,d*.50);
    }else if(shape===4){ // Pharmacy: rooftop cross visible from far away.
      roofPut('pharmacyRoofCrossV',0x31a869,shop,x,rooftop+.92,z,.35,1.75,.35);
      roofPut('pharmacyRoofCrossH',0x31a869,shop,x,rooftop+1.02,z,1.30,.35,.35);
      roofPut('pharmacyWhiteBase',0xe2eee5,shop,x,rooftop+.09,z,1.45,.24,1.03);
    }else if(shape===5){ // Fashion: upper display band and projecting side frame.
      roofPut('fashionCrown',0x4c465b,shop,x,rooftop+.17,z,w*.77,.43,d*.72);
      roofPut('fashionCrownInset',0xd6b3bc,shop,x,rooftop+.42,front-.12,w*.49,.22,.18);
      for(const side of [-1,1])
        put('fashionFin',0x5b5165,shop,x+side*w*.46,height*.50,z,.18,height*.96,d*.72);
    }else if(shape===6){ // Workshop: roof sawtooth vents and service flue.
      for(let i=0;i<3;i++){
        roofPut('garageVentHousing',0x71838a,shop,x+(i-1)*w*.24,rooftop+.30,z,.95,.56,1.60);
        roofPut('garageVentTop',0xb0b6ae,shop,x+(i-1)*w*.24,rooftop+.62,z,.99,.12,1.70);
      }
      roofPut('garagePipe',0x5c696c,shop,x-w*.38,rooftop+.74,z-d*.28,.27,1.38,.27);
    }else if(shape===7){ // Bakery: two brick chimneys and warm cornice.
      for(const side of [-1,1]){
        roofPut('bakeryChimney',0xb96e52,shop,x+side*w*.25,rooftop+.59,z-d*.15,.62,1.10,.60);
        roofPut('bakeryChimneyCap',0x695c52,shop,x+side*w*.25,rooftop+1.18,z-d*.15,.78,.13,.76);
      }
      roofPut('bakeryRoofTrim',0xd49b6a,shop,x,rooftop-.07,front-.15,w*.78,.18,.28);
    }else if(shape===8){ // Cinema: roof projector tower, bold marquee fins.
      roofPut('cinemaProjection',0x28384e,shop,x,rooftop+.80,z-d*.14,w*.35,1.46,d*.32);
      roofPut('cinemaProjectionCap',0x486078,shop,x,rooftop+1.59,z-d*.14,w*.39,.16,d*.35);
      for(const side of [-1,1])
        put('cinemaMarqueeFin',0xf0c876,shop,x+side*w*.43,signY+.10,front+.38,.18,1.10,.55);
    }else if(shape===9){ // Gym: rooftop skylight and facade side bands.
      for(const side of [-1,1]){
        roofPut('gymSkylight',0x83b8c0,shop,x+side*w*.24,rooftop+.17,z,1.70,.24,d*.53);
        roofPut('gymSkylightEdge',0x3f6f68,shop,x+side*w*.24,rooftop+.33,z,1.85,.08,d*.55);
      }
    }else if(shape===10){ // Hotel: unmistakable rooftop penthouse + canopy.
      roofPut('hotelPenthouse',style.walls,shop,x,rooftop+.91,z-d*.09,w*.58,1.75,d*.60);
      roofPut('hotelPenthouseRoof',trim,shop,x,rooftop+1.87,z-d*.09,w*.62,.20,d*.64);
      for(const side of [-1,1])
        roofPut('hotelPenthouseWindow',glass,shop,x+side*w*.17,rooftop+.96,front-d*.22,1.05,.92,.11);
    }else{ // Market: open stall canopy modules above the roof.
      for(const side of [-1,1]){
        roofPut('marketRoofAwning',side<0?0xd29b5b:0x6c9e83,shop,
          x+side*w*.23,rooftop+.19,z, w*.38,.29,d*.61);
        roofPut('marketRoofCap',0xe3d5ad,shop,x+side*w*.23,rooftop+.38,z,w*.40,.08,d*.64);
      }
    }
    if(seed%3===0)put('side',style.glass,shop,x+w/2+.1,height*.55,z, .2,1.6,d*.45);
    if(progress.premium&&shape===2){
      const terraceX=x+w/2+1.19,terraceZ=z-d*.17;
      put('shopDiningDeck',0xbd9a74,shop,terraceX,.15,terraceZ,2.48,.23,4.55);
      for(const end of [-1,1]){
        const postZ=terraceZ+end*2.04;
        put('shopPergolaPost',trim,shop,terraceX+1.04,1.65,postZ,.17,2.92,.17);
        put('shopPergolaBeam',trim,shop,terraceX,3.08,postZ,2.50,.19,.23);
        put('shopDiningTable',0xd0a36e,shop,terraceX,.98,terraceZ+end*1.16,1.06,.14,.84);
        put('shopDiningPedestal',0x4a483f,shop,terraceX,.55,terraceZ+end*1.16,.19,.80,.19);
      }
      for(let slat=-3;slat<=3;slat++)
        put('shopPergolaSlat',slat%2?0xe3b88b:trim,shop,terraceX+slat*.34,3.22,terraceZ,.14,.14,4.30);
    }
    if(progress.premium&&(shape===9||shape===10)){
      const hotel=shape===10;
      const rear=z-d/2;
      for(const level of hotel?[.32,.61,.82]:[.33]){
        const windowY=height*level;
        for(const bay of [-1,1]){
          const windowX=x+bay*w*.23,windowZ=z+bay*d*.23;
          put('displayGlass',glass,shop,windowX,windowY,rear-.066,w*.29,hotel?1.28:1.62,.15);
          put('shopPremiumSill',trim,shop,windowX,windowY-.85,rear-.13,w*.33,.15,.30);
          for(const side of [-1,1]){
            const sideX=x+side*(w/2+.066);
            put('displayGlass',glass,shop,sideX,windowY,windowZ,.15,hotel?1.28:1.62,d*.29);
            put('shopPremiumSill',trim,shop,sideX+side*.06,windowY-.85,windowZ,.30,.15,d*.33);
          }
        }
      }
    }

  }
  const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.77,metalness:.02});
  const instanceColor=new THREE.Color();
  for(const batch of batches.values()){
    const mesh=new THREE.InstancedMesh(batch.geo,material,batch.entries.length);
    mesh.castShadow=batch.casts;
    mesh.receiveShadow=batch.receives;
    for(let i=0;i<batch.entries.length;i++){
      const e=batch.entries[i];dummy.position.set(e.x,e.y,e.z);dummy.rotation.set(0,e.rotation,0);
      dummy.scale.set(e.w,e.h,e.d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix); mesh.setColorAt(i,instanceColor.setHex(e.color));
    }
    mesh.userData.shops=batch.entries.map(entry=>entry.shop);
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
    if(batch.detailed){
      mesh.userData.shopDetailChunk=batch.chunk;
      shopDetailMeshes.push(mesh);
    }
  }
}

// Billboard marketing in permanently reserved, currently unoccupied lots.
// The panels disappear automatically when a shop is bought or a public
// milestone unlocks. They are contained entirely within their reserved plots.
function billboardTexture(lines,background,options={}){
 const canvas=document.createElement('canvas');
 const width=1024,height=options.wide?256:512;
 canvas.width=width;canvas.height=height;
 const ctx=canvas.getContext('2d');
 ctx.fillStyle=background;ctx.fillRect(0,0,width,height);
 ctx.strokeStyle='#ffffff';ctx.lineWidth=5;ctx.strokeRect(16,16,width-32,height-32);
 ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';
 const safeWidth=width-96;
 function text(value,y,size,bold=true){
  const content=String(value||'');
  ctx.font=(bold?'bold ':'')+size+'px Arial';
  const measured=ctx.measureText(content).width;
  if(measured>safeWidth){size=Math.max(1,Math.floor(size*safeWidth/measured));ctx.font=(bold?'bold ':'')+size+'px Arial';}
  ctx.fillText(content,width/2,y);
 }
 if(options.wide){
  const words=String(lines[0]||'').split(/\s+/),rows=[''];
  ctx.font='bold 48px Arial';
  for(const word of words){const i=rows.length-1,test=(rows[i]+' '+word).trim();
   if(rows[i]&&ctx.measureText(test).width>safeWidth)rows.push(word);else rows[i]=test;
  }
  if(rows.length>2){let split=1,best=Infinity;for(let i=1;i<words.length;i++){
   const score=Math.max(ctx.measureText(words.slice(0,i).join(' ')).width,ctx.measureText(words.slice(i).join(' ')).width);
   if(score<best){best=score;split=i;}}
   rows.splice(0,rows.length,words.slice(0,split).join(' '),words.slice(split).join(' '));
  }
  if(rows.length===1)text(rows[0],88,52);else{ text(rows[0],64,48);text(rows[1],116,48); }
  text(lines[1],172,29);text(lines[2],216,26,false);
 }else{
  text(lines[0],170,80);text(lines[1],285,60);text(lines[2],395,48,false);
 }
 const texture=new THREE.CanvasTexture(canvas);
 texture.colorSpace=THREE.SRGBColorSpace;
 texture.anisotropy=Math.min(8,(typeof renderer!=='undefined'?renderer?.capabilities?.getMaxAnisotropy?.():1)||1);
 return texture;
}
function drawReservedBillboards(selected){
 const occupiedBlocks=new Set(selected.map(h=>h.blockIndex));
 for(const sh of shopPurchases)occupiedBlocks.add(sh.block);
 for(const z of publicZones())occupiedBlocks.add(z.block);
 const sold=new Set(shopPurchases.map(sh=>sh.block+':'+sh.slot));
 // Compare actual occupied world-space parcels, not only IDs: signs must
 // never survive on a lot already used by a commercial building.
 const occupiedShopBounds=shopPurchases.filter(sh=>Number.isInteger(sh.block)&&Number.isInteger(sh.slot)).map(sh=>plotBounds(sh.block,sh.slot));
 const occupiedHouseBounds=selected.map(h=>plotBounds(h.blockIndex,h.slot));
 const occupiedPublicBounds=publicZones().map(z=>facilityBounds(z.block));
 const occupiedKeys=new Set([...selected.map(h=>h.blockIndex+':'+h.slot),...shopPurchases.map(sh=>sh.block+':'+sh.slot)]);
 function isOccupied(b){
  return occupiedKeys.has(b.block+':'+b.slot);
 }
 const unlocked=new Set(publicZones().map(z=>z.block));
 const batches={shop:[],public:[]};
 // Restrict billboard count for large cities, but preserve the nearest
 // available offers throughout the currently developed city.
 for(const block of occupiedBlocks){
  for(let slot=0;slot<LOT_COLS*LOT_ROWS;slot++){
   if(slotType(block,slot)!=='shop'||sold.has(block+':'+slot))continue;
   const b=plotBounds(block,slot);
   if(b.right-b.left<9||b.bottom-b.top<12||occupiedKeys.has(block+':'+slot))continue;
   batches.shop.push({x:b.x,z:b.z,b,angle:facadeAngle(plotPosition(block,slot))});
  }
  if(block%PUBLIC_BLOCK_INTERVAL===0&&!unlocked.has(block)){
   const b=facilityBounds(block);
   if(!occupiedPublicBounds.some(other=>overlapsRect(b.x,b.z,b.right-b.left,b.bottom-b.top,other,.05)))batches.public.push({x:b.x,z:b.z,b,angle:0,block});
  }
 }
 // Cap signs to protect performance at 5,000 homes.
 batches.shop=batches.shop.slice(0,260);
 batches.public=batches.public.slice(0,45);
 const types=[
  {key:'shop',texture:billboardTexture(['IL TUO NEGOZIO','PUO ESSERE QUI','Acquista in Tienda'],'#168c83'),width:8.8,height:4.4},
  {key:'public',texture:billboardTexture(['PROSSIMA OBRA','LA CITTA CRESCE','Scopri il traguardo'],'#d48735'),width:14,height:6}
 ];
 for(const type of types){
  const items=batches[type.key];if(!items.length){type.texture.dispose();continue;}
  const geo=new THREE.PlaneGeometry(1,1);
  // Two independently oriented faces: text reads normally from either side.
  // DoubleSide alone would mirror the lettering when viewed from behind.
  const mat=new THREE.MeshBasicMaterial({map:type.texture,side:THREE.FrontSide,transparent:false,depthWrite:true,toneMapped:false});
  const mesh=new THREE.InstancedMesh(geo,mat,items.length);
  const rearMesh=new THREE.InstancedMesh(geo,mat,items.length);
  const posts=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial({color:0x6c6961}),items.length*2);
  const dummy=new THREE.Object3D();
  items.forEach((it,i)=>{
   const width=Math.min(type.width,it.b.right-it.b.left-2);
   const height=type.height;
   const ca=Math.cos(it.angle),sa=Math.sin(it.angle);
   // Placed toward the street-facing half, but always inside the lot.
   const dz=type.key==='shop'?3.4:Math.min(8,it.b.bottom-it.b.top-5);
   const px=it.x+dz*sa,pz=it.z+dz*ca;
   const y=height+2.2;
   // A sign is optional: reject invalid placement without aborting buildings.
   const footprintWidth=Math.abs(width*ca)+Math.abs(.3*sa);
   const footprintDepth=Math.abs(width*sa)+Math.abs(.3*ca);
   const blocked=[...occupiedHouseBounds,...occupiedShopBounds,...occupiedPublicBounds].some(other=>overlapsRect(px,pz,footprintWidth,footprintDepth,other,.5));
   if(blocked||!isInsideParcel(px,pz,footprintWidth,footprintDepth,it.b)) {
     dummy.position.set(0,-9999,0);dummy.scale.set(0,0,0);dummy.updateMatrix();
     mesh.setMatrixAt(i,dummy.matrix);
     rearMesh.setMatrixAt(i,dummy.matrix);
     for(let j=0;j<2;j++)posts.setMatrixAt(i*2+j,dummy.matrix);
     return;
   }
   dummy.position.set(px,y,pz);dummy.rotation.set(0,it.angle,0);
   dummy.scale.set(width,height,1);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
   // Reverse the panel geometry, not the texture: its back reads left-to-right.
   dummy.position.set(px-.035*sa,y,pz-.035*ca);
   dummy.rotation.set(0,it.angle+Math.PI,0);dummy.updateMatrix();
   rearMesh.setMatrixAt(i,dummy.matrix);
   for(const side of [-1,1]){
    dummy.position.set(px+side*width*.37*ca,(y-height/2)/2,pz-side*width*.37*sa);
    dummy.rotation.set(0,it.angle,0);
    dummy.scale.set(.22,y-height/2,.22);dummy.updateMatrix();
    posts.setMatrixAt(i*2+(side+1)/2,dummy.matrix);
   }
  });
  mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
  rearMesh.instanceMatrix.needsUpdate=true;rearMesh.computeBoundingSphere();
  posts.instanceMatrix.needsUpdate=true;posts.computeBoundingSphere();
  group.add(mesh,rearMesh,posts);
 }
}

function drawNeighborhoodDetails(selected){
  // Street furniture and greenery vary by block, not repeated around every house.
  const occupied=new Map();
  for(const h of selected)occupied.set(h.blockIndex,true);
  for(const sh of shopPurchases)occupied.set(sh.block,true);
  const batches=new Map(),geo=new THREE.BoxGeometry(1,1,1),dummy=new THREE.Object3D();
  function piece(color,x,y,z,w,h,d){
    const key=String(color);if(!batches.has(key))batches.set(key,[]);
    batches.get(key).push({x,y,z,w,h,d});
  }
  for(const block of occupied.keys()){
    if(facilitySlots(block).length)continue; // No decorative geometry over public structures
    const {col,row}=spiralCell(block),{x:bx,z:bz}=blockCenter(col,row);
    const theme=Math.floor(rnd(block*19+4)*6);
    // Small public squares, tree clusters, benches, bicycle parking, planters.
    const cornerX=bx+39,cornerZ=bz-29;
    if(theme===0||theme===3){
      piece(0xb3b5a9,cornerX,.065,cornerZ,9,.07,7);
      piece(0x4a8b53,cornerX+2,.45,cornerZ-1.8,2, .9,2);
      piece(0x6b5544,cornerX-2,.5,cornerZ+1.5,3,.35,.7);
    }else if(theme===1||theme===4){
      piece(0x8bb26c,cornerX,.07,cornerZ,8,.08,8);
      piece(0x7a6247,cornerX,.8,cornerZ,.35,1.6,.35);
      piece(0x478b59,cornerX,2.1,cornerZ,2.5,2.7,2.5);
      piece(0xb3aa91,cornerX+3,.32,cornerZ+2,2.8,.4,1);
    }else{
      piece(0xb2afa7,cornerX,.065,cornerZ,8,.07,8);
      piece(0x728e9a,cornerX-2,.3,cornerZ-2,3,.5,2.5);
      piece(0x408c5a,cornerX+2,.35,cornerZ+1.7,2.2,.7,1.6);
    }
    if(block%3===0){
      const sx=bx-41,sz=bz+28;
      piece(0x626a6d,sx,.8,sz,.18,1.6,.18);
      piece(0xf2d28b,sx,1.75,sz,.7,.4,.7);
    }
  }
  for(const [color,entries] of batches){
    const mesh=new THREE.InstancedMesh(geo,new THREE.MeshStandardMaterial({color:Number(color),roughness:.88}),entries.length);
    entries.forEach((e,i)=>{dummy.position.set(e.x,e.y,e.z);dummy.scale.set(e.w,e.h,e.d);dummy.rotation.set(0,0,0);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)});
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
  }
}
function drawRoadNetwork(selected){
  const surfaceBatches=new Map();
  function roadBox(w,h,d,x,y,z,color){
    const key=color+':'+Math.floor(x/480)+':'+Math.floor(z/480);
    if(!surfaceBatches.has(key))surfaceBatches.set(key,{color,entries:[]});
    surfaceBatches.get(key).entries.push({w,h,d,x,y,z});
  }
  // v3.0.2: Roads are constructed from the FOUR edges of each occupied
  // block. Every edge is deduplicated and its endpoints are shared with
  // intersections. This avoids the displaced segments and road gaps in v3.0.
  const occupied=new Set(selected.map(h=>`${h.col},${h.row}`));
  for(const shop of shopPurchases)occupied.add(`${shop.col},${shop.row}`);
  for(const zone of publicZones()){
    const {col,row}=spiralCell(zone.block);occupied.add(`${col},${row}`);
  }
  const cells=[...occupied].map(k=>k.split(',').map(Number));
  // Warm concrete, fine asphalt and clear curb edge (no change to roads).
  const asphalt=0x474d58,sidewalk=0xc4a99e,lane=0xfff7e9;
  const markChunks=new Map(),markSize=160;
  function mark(w,h,d,x,y,z,color){
    const cx=Math.floor(x/markSize),cz=Math.floor(z/markSize);
    const key=cx+','+cz+','+color;
    if(!markChunks.has(key))markChunks.set(key,{cx,cz,color,entries:[]});
    markChunks.get(key).entries.push({x,y,z,w,h,d});
  }
  const curbFace=0x99958c,curbTop=0xf0e8da,jointColor=0xa9a397;
  // Segment ends are determined by the crossing street width, not a
  // constant 13m gap. This lets every curb meet its intersection corner.
  function curbV(x,z0,z1,w,c,r){
    const from=z0+hWidth(r-1)/2+.12,to=z1-hWidth(r)/2-.12;
    if(to<=from)return;
    const mid=(from+to)/2,len=to-from;
    for(const side of [-1,1]){
      const cx=x+side*(w/2+.13);
      roadBox(.24,.135,len,cx,.175,mid,curbFace);
      roadBox(.32,.035,len,cx,.259,mid,curbTop);
    }
  }
  function curbH(z,x0,x1,w,c,r){
    const from=x0+vWidth(c-1)/2+.12,to=x1-vWidth(c)/2-.12;
    if(to<=from)return;
    const mid=(from+to)/2,len=to-from;
    for(const side of [-1,1]){
      const cz=z+side*(w/2+.13);
      roadBox(len,.135,.24,mid,.175,cz,curbFace);
      roadBox(len,.035,.32,mid,.259,cz,curbTop);
    }
  }
  // Four curb corners complete the L-shaped junction connections.
  function curbCorners(c,r){
    const x=streetEdgeX(c),z=streetEdgeZ(r);
    const vw=vWidth(c),hw=hWidth(r);
    for(const sx of [-1,1])for(const sz of [-1,1]){
      const cx=x+sx*(vw/2+.13),cz=z+sz*(hw/2+.13);
      roadBox(.28,.135,.28,cx,.175,cz,curbFace);
      roadBox(.36,.035,.36,cx,.259,cz,curbTop);
    }
  }
  const vWidth=c=>(c%4===0?11.5:(c%7===2?8.7:6.8));
  const hWidth=r=>(r%5===0?11.5:(r%6===3?8.7:6.8));
  const isAvenueV=c=>c%4===0,isAvenueH=r=>r%5===0;
  // Elevations are strictly ordered: sidewalk < asphalt < road markings.
  // The entire intersection is asphalt; sidewalks never cross a carriageway.
  const sy=.095,ay=.155,my=.188;
  const roadEdges=new Map(),junctions=new Set();
  for(const [c,r] of cells){
    for(const vc of [c-1,c]){
      const key=`v:${vc}:${r}`;
      roadEdges.set(key,{vertical:true,c:vc,r});
    }
    for(const hr of [r-1,r]){
      const key=`h:${c}:${hr}`;
      roadEdges.set(key,{vertical:false,c,r:hr});
    }
  }
  // Road segments span from intersection center to intersection center.
  // Their overlapping endpoints are at the SAME height/material, so there
  // are no white sidewalk seams and no missing wedges at junctions.
  for(const edge of roadEdges.values()){
    const {vertical,c,r}=edge;
    if(vertical){
      const x=streetEdgeX(c),z0=streetEdgeZ(r-1),z1=streetEdgeZ(r);
      const w=vWidth(c),len=z1-z0,z=(z0+z1)/2;
      roadBox(w+2.4,.035,len,x,sy,z,sidewalk);
      roadBox(w,.042,len,x,ay,z,asphalt);
      curbV(x,z0,z1,w,c,r);
      if(Math.abs(c)<=3&&Math.abs(r)<=4){
        for(const side of [-1,1]){
          for(let tree=1;tree<=4;tree++){
            const seed=(c+11)*179+(r+11)*31+tree*13+side;
            addTree(x+side*(w/2+1.02),z0+len*tree/5,seed,1.22,seed%8===0);
          }
        }
      }
      for(let t=z0+7;t<z1-7;t+=9){
        for(const side of [-1,1])
          mark(1.12,.012,.12,x+side*(w/2+.65),sy+.030,t,jointColor);
      }
      if(isAvenueV(c))for(let t=z0+10;t<z1-6;t+=20)
        mark(.16,.012,5,x,my,t,lane);
      junctions.add(`${c},${r-1}`);junctions.add(`${c},${r}`);
    }else{
      const z=streetEdgeZ(r),x0=streetEdgeX(c-1),x1=streetEdgeX(c);
      const w=hWidth(r),len=x1-x0,x=(x0+x1)/2;
      roadBox(len,.035,w+2.4,x,sy,z,sidewalk);
      roadBox(len,.042,w,x,ay,z,asphalt);
      curbH(z,x0,x1,w,c,r);
      if(Math.abs(c)<=3&&Math.abs(r)<=4){
        for(const side of [-1,1]){
          for(let tree=1;tree<=7;tree++){
            const tx=x0+len*tree/8;
            const tz=z+side*(w/2+1.02);
            const seed=(c+9)*163+(r+9)*29+tree*11+side;
            addTree(tx,tz,seed,1.14,seed%8===0);
          }
        }
      }
      for(let t=x0+7;t<x1-7;t+=9){
        for(const side of [-1,1])
          mark(.12,.012,1.12,t,sy+.030,z+side*(w/2+.65),jointColor);
      }
      if(isAvenueH(r))for(let t=x0+10;t<x1-6;t+=20)
        mark(5,.012,.16,t,my,z,lane);
      junctions.add(`${c-1},${r}`);junctions.add(`${c},${r}`);
    }
  }
  // Intersection surfaces are placed slightly ABOVE segments so crossings
  // are seamless. No white perimeter is drawn over an intersection.
  for(const key of junctions){
    const [c,r]=key.split(',').map(Number);
    const x=streetEdgeX(c),z=streetEdgeZ(r);
    // Correct orientation: X is the width of the vertical road; Z is
    // the width of the horizontal road. The previous version swapped them.
    const vW=vWidth(c),hW=hWidth(r);
    roadBox(vW,.044,hW,x,ay+.003,z,asphalt);
    curbCorners(c,r);
    // Crosswalks on EVERY existing approach of EVERY intersection.
    // Their footprint stays outside the crossing road, so perpendicular
    // zebras never cross or form a grid in the middle of the junction.
    const stripe=0xf3f0e8,stripeY=my+.008;
    const stopColor=0xece8dc,stopY=stripeY+.004;
    const step=.90,bar=.56,depth=1.28,edgeMargin=.72;
    const verticalCount=Math.max(2,Math.floor((vW-2*edgeMargin)/step));
    const horizontalCount=Math.max(2,Math.floor((hW-2*edgeMargin)/step));
    const north=roadEdges.has(`v:${c}:${r}`);
    const south=roadEdges.has(`v:${c}:${r+1}`);
    const west=roadEdges.has(`h:${c}:${r}`);
    const east=roadEdges.has(`h:${c+1}:${r}`);
    // Compact signals and bollards sit beyond the crosswalk ends.
    if(north&&south&&west&&east&&(isAvenueV(c)||isAvenueH(r))){
      for(const side of [-1,1]){
        const px=x+side*(vW/2+.78),pz=z+side*(hW/2+.78);
        mark(.22,3.10,.22,px,1.79,pz,0x344340);
        mark(.40,.23,.40,px,.39,pz,0x737d75);
        const sx=px-side*.29;
        mark(.36,.91,.29,sx,3.28,pz,0x2c3635);
        for(const face of [-1,1]){
          const sz=pz+face*.153;
          mark(.17,.17,.025,sx,3.57,sz,0xe94c40);
          mark(.17,.17,.025,sx,3.29,sz,0x845d31);
          mark(.17,.17,.025,sx,3.01,sz,0x325a43);
        }
      }
    }

    // Approach segments run to the intersection centre, so each zebra
    // starts just beyond the perpendicular carriageway edge.
    for(const side of [-1,1]){
      if((side<0&&north)||(side>0&&south)){
        const zz=z+side*(hW/2+depth/2+.42);
        for(let i=0;i<verticalCount;i++){
          const xx=x+(i-(verticalCount-1)/2)*step;
          mark(bar,.015,depth,xx,stripeY,zz,stripe);
        }
        // Stop line beyond the zebra, on the incoming lane. It is deliberately
        // separated from the crosswalk to prevent the striped-grid effect.
        mark(vW-1.1,.017,.18,x,stopY,
          z+side*(hW/2+depth+1.05),stopColor);
      }
      if((side<0&&west)||(side>0&&east)){
        const xx=x+side*(vW/2+depth/2+.42);
        for(let i=0;i<horizontalCount;i++){
          const zz=z+(i-(horizontalCount-1)/2)*step;
          mark(depth,.015,bar,xx,stripeY,zz,stripe);
        }
        mark(.18,.017,hW-1.1,x+side*(vW/2+depth+1.05),
          stopY,z,stopColor);
      }
    }
  }
  const surfaceGeometry=new THREE.BoxGeometry(1,1,1);
  const surfaceMaterials=new Map();
  const surfaceTransform=new THREE.Object3D();
  for(const {color,entries} of surfaceBatches.values()){
    if(!surfaceMaterials.has(color)){
      const textured=color===0x474d58||color===0xc4a99e;
      surfaceMaterials.set(color,textured?streetSurfaceMaterial(color):new THREE.MeshLambertMaterial({color}));
    }
    const surface=new THREE.InstancedMesh(surfaceGeometry,surfaceMaterials.get(color),entries.length);
    entries.forEach(({w,h,d,x,y,z},index)=>{
      surfaceTransform.position.set(x,y,z);
      surfaceTransform.scale.set(w,h,d);
      surfaceTransform.updateMatrix();
      surface.setMatrixAt(index,surfaceTransform.matrix);
    });
    surface.receiveShadow=true;
    surface.computeBoundingSphere();
    group.add(surface);
  }
  // Level of detail: markings and sidewalk joints are only rendered in
  // chunks close to the camera focus AND intersecting the view frustum.
  // Geometry is shared and GPU-instanced, not one draw call per stripe.
  const markGeo=new THREE.BoxGeometry(1,1,1),markDummy=new THREE.Object3D();
  for(const chunk of markChunks.values()){
    const mesh=new THREE.InstancedMesh(markGeo,
      new THREE.MeshLambertMaterial({color:chunk.color}),chunk.entries.length);
    chunk.entries.forEach((e,i)=>{
      markDummy.position.set(e.x,e.y,e.z);
      markDummy.rotation.set(0,0,0);
      markDummy.scale.set(e.w,e.h,e.d);
      markDummy.updateMatrix();mesh.setMatrixAt(i,markDummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate=true;
    mesh.computeBoundingSphere();
    mesh.userData.roadDetailChunk={x:(chunk.cx+.5)*markSize,z:(chunk.cz+.5)*markSize};
    mesh.visible=false;
    roadDetailMeshes.push(mesh);
    group.add(mesh);
  }
  // Each neighborhood gets a distinct street-level landmark. Intersections
  // and roadside furniture never occupy any house or shop plot.
  const details=new Map(),boxGeo=new THREE.BoxGeometry(1,1,1),dummy=new THREE.Object3D();
  function detail(color,x,y,z,w,h,d){
    // Decorative items are never permitted on carriageways.
    const col=Math.round(x/BLOCK_X),row=Math.round(z/BLOCK_Z);
    const b=blockBoundsFromCell(col,row);
    if(!decorationAllowed(x,z,w,d))return;
    if(!details.has(color))details.set(color,[]);
    details.get(color).push({x,y,z,w,h,d});
  }
  const visited=new Set();
  for(const [c,r] of cells){
    if(c===0&&r===0)continue;
    const k=c+','+r;if(visited.has(k))continue;visited.add(k);
    const {x,z}=blockCenter(c,r);
    const theme=Math.floor(rnd(c*173+r*293+800)*8);
    // Larger landmarks appear only on block margins; some districts gain
    // recognizable pedestrian terraces and rows of shade trees.
    const district=districtStyle(Math.abs(c)*117+Math.abs(r)*29+1);
    if((c*3+r*7)%7===0){
      detail(0xc3b4a1,x-37,.07,z+28,12,.08,7);
      for(let k=0;k<3;k++){
        detail(0x755d43,x-41+k*4,.8,z+28,.3,1.6,.3);
        detail(0x4a8c62,x-41+k*4,2.25,z+28,2.2,2.4,2.2);
      }
    }
    if((c*11+r*5)%11===0){
      detail(0x8b979a,x+35,.07,z+27,15,.08,9);
      for(let k=0;k<4;k++)detail(0xece6d6,x+30+k*3,.13,z+27,.12,.04,7);
    }

    // Public strips in the generous buffer between plots and outer roads.
    // Four different parklets, bike stands, flowerbeds and small paved courts.
    const sx=x+BLOCK_X/2-10,sz=z-27;
    if(theme===0||theme===5){
      detail(0xc8bba4,sx,.07,sz,8,.09,10);
      detail(0x498b55,sx+2,.38,sz+2,2.3,.7,3);
      detail(0x8b674b,sx-2,.45,sz-1,3,.32,.65);
    }else if(theme===1||theme===6){
      detail(0x86b876,sx,.07,sz,9,.08,10);
      for(let j=0;j<3;j++){
        detail(0x8a6748,sx-2+j*2,.6,sz-1,.25,1.2,.25);
        detail(0x4c9b65,sx-2+j*2,1.6,sz-1,1.2,1.5,1.2);
      }
    }else if(theme===2){
      detail(0xb9c3c3,sx,.07,sz,9,.08,9);
      detail(0x5e91ad,sx,.3,sz,4,.45,4);
      detail(0xe4d5b2,sx-3,.3,sz+3,2,.35,1.5);
    }else if(theme===3||theme===7){
      detail(0xd2c5a6,sx,.07,sz,8,.08,9);
      detail(0x4b945e,sx-2,.4,sz+1,2.5,.7,2.5);
      detail(0x4b945e,sx+2,.4,sz-2,2.5,.7,2.5);
    }else{
      detail(0x92bd83,sx,.07,sz,9,.08,10);
      detail(0x718e99,sx,.3,sz-2,4,.55,2);
    }
    // Streetlights along the avenue boundaries, on the sidewalk buffer.
    if((c+r)%3===0){
      const px=x+BLOCK_X/2-10,pz=z+BLOCK_Z/2-11;
      detail(0x67737a,px,1.7,pz,.2,3.4,.2);
      detail(0xf5d99d,px,3.45,pz,.85,.28,.85);
    }
  }
  for(const [color,entries] of details){
    const mesh=new THREE.InstancedMesh(boxGeo,new THREE.MeshLambertMaterial({color}),entries.length);
    entries.forEach((e,i)=>{dummy.position.set(e.x,e.y,e.z);dummy.scale.set(e.w,e.h,e.d);dummy.rotation.set(0,0,0);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)});
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
  }
  // Each block receives one of nine permanent, distinct courtyard designs.
  // Two road-facing building rows remain unchanged; there are NO inner houses.
  const greenBlocks=new Set(selected.map(h=>h.blockIndex));
  for(const sh of shopPurchases)greenBlocks.add(sh.block);
  const furniture=new Map(),cube=new THREE.BoxGeometry(1,1,1),fdummy=new THREE.Object3D();
  function furnish(color,x,y,z,w,h,d){
    const b=blockBoundsFromCell(Math.round(x/BLOCK_X),Math.round(z/BLOCK_Z));
    if(!decorationAllowed(x,z,w,d))return;
    if(!furniture.has(color))furniture.set(color,[]);
    furniture.get(color).push({x,y,z,w,h,d});
  }
  for(const block of greenBlocks){
    const {col,row}=spiralCell(block),{x,z}=blockCenter(col,row);
    const style=Math.floor(rnd(block*73+5)*9);
    const seed=(i)=>rnd(block*113+i*37+11);
    // Narrow landscaped strip: the large, identical green ribbon is removed.
    const greens=[0x89a978,0x9caf83,0x83aa8b,0x9aa78b];
    furnish(greens[style%4],x,.028,z,LOT_COLS*LOT_X+3,.045,3.3);
    if(style===0){ // Shaded pedestrian promenade
      furnish(0xd2c5aa,x,.065,z,LOT_COLS*LOT_X-18,.05,1.25);
      for(let j=0;j<6;j++){
        const px=x-66+j*24;
        furnish(0x735a41,px,.68,z,.25,1.35,.25);
        furnish(0x438e5b,px,1.9,z,2.6,2.4,2.6);
        furnish(0x86694f,px+8,.48,z,3,.25,.7);
      }
    }else if(style===1){ // Flowerbeds and benches
      for(let j=0;j<10;j++){
        const px=x-72+j*15;
        furnish(j%2?0xb76e82:0xd2aa60,px,.18,z,8,.25,2.5);
        if(j%3===0)furnish(0x8b6c4d,px+11,.5,z,2.6,.3,.7);
      }
    }else if(style===2){ // Stone courtyard and sculpture
      for(let j=0;j<4;j++){
        const px=x-56+j*36;
        furnish(0xbcb7a6,px,.075,z,27,.07,3);
        furnish(0x6f9b8b,px,.42,z,3,.7,2);
      }
    }else if(style===3){ // Vegetable gardens
      for(let j=0;j<11;j++){
        const px=x-72+j*14;
        furnish(0x775b45,px,.12,z,13,.18,2.8);
        furnish([0x5d9a55,0x7bb66b,0x8ab456][j%3],px,.31,z,11,.23,1.7);
      }
    }else if(style===4){ // Small trees, irregularly spaced
      for(let j=0;j<9;j++){
        const px=x-73+j*18+seed(j)*4;
        furnish(0x785b43,px,.75,z,.3,1.5,.3);
        furnish([0x4c9265,0x74a75c,0x3c8059][j%3],px,2.2,z,2.3+seed(j+20),2.5,2.5);
      }
    }else if(style===5){ // Brick walkway and seating
      furnish(0xc9a891,x,.06,z,LOT_COLS*LOT_X-12,.06,2.3);
      for(let j=0;j<7;j++){
        const px=x-64+j*21;
        furnish(0x82664c,px,.5,z,3,.3,.7);
        furnish(0x557b67,px+8,.35,z,2,.65,2);
      }
    }else if(style===6){ // Colorful flowers and decorative hedges
      for(let j=0;j<12;j++){
        const px=x-72+j*13;
        furnish(0x49835c,px,.35,z,15,.65,1.8);
        furnish([0xe7c27a,0xc87d95,0x91b7d3][j%3],px+4,.72,z,4,.18,1.5);
      }
    }else if(style===7){ // Gravel courtyard with pergolas
      furnish(0xc4bda5,x,.065,z,LOT_COLS*LOT_X-16,.06,2.9);
      for(let j=0;j<5;j++){
        const px=x-62+j*30;
        furnish(0x92734f,px,.9,z,.25,1.8,.25);
        furnish(0x92734f,px+3,.9,z,.25,1.8,.25);
        furnish(0x92734f,px+1.5,1.85,z,4,.2,2.6);
      }
    }else{ // Low-maintenance shrub islands with different sizes
      for(let j=0;j<9;j++){
        const px=x-70+j*17;
        furnish(0x8d9d78,px,.09,z,18,.1,3.0);
        furnish([0x4c895d,0x7c9b65,0x5c9472][j%3],px,.5,z,5+seed(j)*5,.8,1.9);
      }
    }
  }
  for(const [color,items] of furniture){
    const mesh=new THREE.InstancedMesh(cube,new THREE.MeshLambertMaterial({color}),items.length);
    items.forEach((e,i)=>{fdummy.position.set(e.x,e.y,e.z);fdummy.scale.set(e.w,e.h,e.d);fdummy.rotation.set(0,0,0);fdummy.updateMatrix();mesh.setMatrixAt(i,fdummy.matrix)});
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
  }
  for(const zone of publicZones()){
    const first=group.children.length;drawSpecial(zone);
    for(const mesh of group.children.slice(first))mesh.userData.publicZone=zone;
  }
  drawShops();
  try{drawReservedBillboards(selected)}catch(e){console.warn("Cartelloni ignorati:",e)}
  // Street-level variation is generated alongside the road hierarchy.
}
// Fixed visual identities make adjacent districts legible from above.
// Building ownership and plot coordinates are unaffected by these themes.
function districtStyle(block){
  const {col,row}=spiralCell(block),radius=Math.max(Math.abs(col),Math.abs(row));
  const neighborhoodX=Math.floor(col/3),neighborhoodZ=Math.floor(row/3);
  const r=rnd(neighborhoodX*71+neighborhoodZ*113+14);
  if(radius<=1)return 'centro';
  if(r<.23)return 'giardino';
  if(r<.45)return 'storico';
  if(r<.66)return 'moderno';
  if(r<.83)return 'artigianale';
  return 'residenziale';
}
function addUrbanLandscaping(selected){
  const occupied=new Map();
  for(const h of selected)occupied.set(h.blockIndex,true);
  for(const sh of shopPurchases)occupied.set(sh.block,true);
  const cube=new THREE.BoxGeometry(1,1,1),sphere=new THREE.IcosahedronGeometry(1,1),dummy=new THREE.Object3D(),batches=new Map();
  function item(geo,color,x,y,z,w,h,d,airborne=false){if(!airborne&&!decorationAllowed(x,z,w,d))return;const key=(geo===sphere?'s':'b')+color;
    if(!batches.has(key))batches.set(key,{geo,color,items:[]});batches.get(key).items.push({x,y,z,w,h,d});}
  for(const block of occupied.keys()){
    const {col,row}=spiralCell(block),{x:bx,z:bz}=blockCenter(col,row);
    const style=districtStyle(block),seed=block*101;
    // Unbuilt lot edges, trees and small community spaces differ by neighborhood.
    const corners=[[-43,-31],[43,-31],[-43,31],[43,31]];
    for(let j=0;j<corners.length;j++){
      if(rnd(seed+j*17)>.78)continue;
      const [dx,dz]=corners[j],x=bx+dx,z=bz+dz;
      const tall=style==='giardino'?5.7:style==='centro'?4.2:4.8;
      item(cube,0x77634b,x,.72,z,.32,1.45,.32);
      item(sphere,[0x497b51,0x548b60,0x6b925b,0x376e59][(block+j)%4],x,1.9+tall*.24,z,tall*.62,tall*.7,tall*.62);
      // A second offset canopy and blossom clusters create a real flowering silhouette.
      const bloom=((block*7+j*3)%6===0);
      item(sphere,bloom?0xa83be2:0x72ad36,x-.55,2.2+tall*.24,z+.25,tall*.44,tall*.49,tall*.44);
      item(sphere,bloom?0xdf82ff:0xa3c749,x+.48,2.12+tall*.25,z-.38,tall*.39,tall*.42,tall*.40);
      if(bloom)for(let k=0;k<4;k++){
        const a=k*Math.PI*.5;
        item(sphere,k%2?0xf0b5db:0xdf89c3,x+Math.cos(a)*tall*.36,2.1+tall*.33,z+Math.sin(a)*tall*.36,.55,.53,.55);
      }
    }
    const bounds=blockBounds(block);
    for(const side of [-1,1]){
      const edgeZ=side<0?bounds.top+.56:bounds.bottom-.56;
      for(let tree=0;tree<4;tree++){
        const edgeX=bounds.left+(bounds.right-bounds.left)*(tree+1)/5;
        if(!decorationAllowed(edgeX,edgeZ,.55,.55))continue;
        const flowering=(block+tree*3+side+1)%9===0;
        const green=[0x49882a,0x6da733,0x83bb36][(block+tree)%3];
        const color=flowering?0xb14bda:green;
        item(cube,0x745438,edgeX,1.32,edgeZ,.29,2.64,.29);
        for(let leaf=0;leaf<7;leaf++){
          const angle=leaf*2.39996,spread=leaf===0?0:.54;
          const size=leaf===0?1.62:.94+rnd(seed+leaf)*.21;
          item(sphere,coordinatedHouseColor(color,flowering?0xf4b8ff:0xe0ed79,(leaf%3)*.17),
            edgeX+Math.cos(angle)*spread,2.7+(leaf%3)*.45,
            edgeZ+Math.sin(angle)*spread,size,size*.94,size,true);
        }
      }
    }
    // Each neighborhood has a distinct public-space character. These are
    // located in the broad edge buffer, outside private house/shop plots.
    const quarter=Math.floor(col/3)*23+Math.floor(row/3)*47;
    const motif=Math.floor(rnd(quarter*13+99)*5);
    if(motif===0){ // tree-lined pedestrian pocket
      item(cube,0xc4b8a3,bx+39,.08,bz-28,9,.1,10);
      for(let j=0;j<3;j++){
        const xx=bx+36+j*3;
        item(cube,0x725c45,xx,.75,bz-28,.25,1.5,.25);
        item(sphere,0x4b8760,xx,2.25,bz-28,1.9,2.1,1.9);
      }
    }else if(motif===1){ // mini sports / playground court
      item(cube,0x789d8b,bx+39,.08,bz-28,9,.1,10);
      item(cube,0xdacb9d,bx+39,.16,bz-28,5,.1,6);
      item(cube,0xc36f52,bx+39,.4,bz-28,.45,.5,3);
    }else if(motif===2){ // plaza with planter and benches
      item(cube,0xbdb1a0,bx+39,.08,bz-28,9,.1,10);
      item(cube,0x6c9a66,bx+39,.32,bz-28,3,.45,3);
      item(cube,0x8b694c,bx+35,.45,bz-29,3,.35,.7);
      item(cube,0x8b694c,bx+43,.45,bz-27,3,.35,.7);
    }else if(motif===3){ // small parking bay
      item(cube,0x8a9291,bx+39,.08,bz-28,9,.1,10);
      for(let j=0;j<3;j++)item(cube,0xe8e4d6,bx+36+j*3,.15,bz-28,.12,.035,7);
    }else{ // planted courtyard
      item(cube,0x88ad78,bx+39,.08,bz-28,9,.1,10);
      for(let j=0;j<3;j++)item(cube,0x4e8d59,bx+36+j*3,.38,bz-28,1.7,.6,2.5);
    }
    if(style==='centro'||style==='storico'){
      // A continuous paved edge makes the core denser than the leafy outskirts.
      item(cube,0xb9b0a2,bx, .052,bz-36,76,.07,2.4);
      item(cube,0xb9b0a2,bx, .052,bz+36,76,.07,2.4);
    }
    if(style==='residenziale'||style==='giardino'){
      item(cube,0x739b72,bx,.045,bz-37,78,.07,2.2);
      item(cube,0x739b72,bx,.045,bz+37,78,.07,2.2);
    }
    if(style==='giardino'){
      for(let k=0;k<5;k++){
        const x=bx-35+k*16,z=bz+36;
        item(cube,0x6d8e63,x,.26,z,5,.45,1.5);
      }
    }
    if(style==='artigianale'){
      for(let k=0;k<3;k++){
        const x=bx-31+k*22,z=bz-35;
        item(cube,0x9b978a,x,.08,z,12,.12,3);
        item(cube,0xe3d9c1,x,.18,z, .12,.04,2.5);
      }
    }
    if(style==='moderno'){
      item(cube,0xa8b9ba,bx+38,.075,bz+32,9,.09,8);
      item(cube,0x608f9e,bx+38,.22,bz+32,5,.22,4);
    }
  }
  for(const batch of batches.values()){
    const mesh=new THREE.InstancedMesh(batch.geo,new THREE.MeshStandardMaterial({color:batch.color,roughness:.82,metalness:0}),batch.items.length);
    batch.items.forEach((e,i)=>{
      dummy.position.set(e.x,e.y,e.z);dummy.rotation.set(0,0,0);
      dummy.scale.set(e.w,e.h,e.d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
  }
}
// Lightweight street life: instanced geometry for thousands of blocks.
// All positions are stable, derived from occupied block coordinates.

// v6.8: Public plazas are modeled as actual 3D meshes, not background art.
// Every element uses instanced geometry; decorative geometry stays in the
// existing public-edge buffer (east side of each block, outside home plots).
function addSignaturePlazas(selected){
 const blocks=new Set(selected.map(h=>h.blockIndex));
 for(const sh of shopPurchases)blocks.add(sh.block);
 const cube=new THREE.BoxGeometry(1,1,1);
 const crown=new THREE.IcosahedronGeometry(1,1);
 const taper=new THREE.CylinderGeometry(.35,.7,1,4);
 const water=new THREE.CylinderGeometry(1,1,1,24);
 const dummy=new THREE.Object3D(),batches=new Map();
 function put(type,color,x,y,z,w,h,d,rot=0){
  if(!decorationAllowed(x,z,w,d))return;
  const key=type+':'+color;
  if(!batches.has(key))batches.set(key,{geo:type==='crown'?crown:type==='taper'?taper:type==='water'?water:cube,color,items:[]});
  batches.get(key).items.push({x,y,z,w,h,d,rot});
 }
 const citySigns=[];
 let built=0;
 for(const block of blocks){
  // A neighborhood plaza in roughly every 13 occupied blocks; capped for speed.
  if(block%13!==0 || built>=110)continue;
  built++;
  const {col,row}=spiralCell(block),{x:bx,z:bz}=blockCenter(col,row);
  const x=bx+39,z=bz-28;
  // The small existing pedestrian pocket is 9 x 10 m.
  put('box',0xe7ddcb,x,.13,z,8.6,.12,9.3);
  for(const side of [-1,1]){
   put('box',0x5b9a66,x+side*3.4,.31,z,1.05,.35,7.5);
   for(let j=0;j<4;j++){
    const zz=z-3+j*2;
    put('crown',j%2?0xf0a6cf:0xf4cc6e,x+side*3.4,.62,zz,.65,.55,.65);
   }
   put('box',0x9b7352,x+side*2.05,.55,z-3,2.1,.25,.55);
   put('box',0x725942,x+side*2.05,.92,z-3.23,2.1,.74,.15);
   put('box',0x334c53,x+side*3.95,1.65,z+3.5,.15,3.3,.15);
   put('crown',0xffedbc,x+side*3.95,3.45,z+3.5,.40,.44,.40);
  }
  if(decorationAllowed(x,z+4.15,3.4,.16))citySigns.push({x,z:z+4.15});
  // Neighborhood fountains do not duplicate milestone monuments.
   put('water',0xc7b9a1,x,.43,z,2.8,.42,2.8);
   put('water',0x62bdd6,x,.67,z,2.45,.10,2.45);
   put('water',0xe9e3d7,x,1.0,z,.32,.65,.32);
   put('crown',0xa4e6ed,x,1.62,z,.42,.62,.42);
 }
 for(const batch of batches.values()){
  const mesh=new THREE.InstancedMesh(batch.geo,new THREE.MeshStandardMaterial({color:batch.color,roughness:.75,metalness:0}),batch.items.length);
  batch.items.forEach((e,i)=>{dummy.position.set(e.x,e.y,e.z);dummy.rotation.set(0,e.rot,0);dummy.scale.set(e.w,e.h,e.d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)});
  mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
 }
 const texture=billboardTexture([currentCity.name.toUpperCase(),'PIAZZA DI QUARTIERE',''],'#234f63',{wide:true});
 if(!citySigns.length){texture.dispose();return;}
 const mat=new THREE.MeshBasicMaterial({map:texture,side:THREE.FrontSide,toneMapped:false});
 const signGeo=new THREE.PlaneGeometry(3.4,.85);
 for(const rear of [false,true]){
  const labels=new THREE.InstancedMesh(signGeo,mat,citySigns.length);
  citySigns.forEach((sign,i)=>{dummy.position.set(sign.x,2.1,sign.z+(rear?-.04:.04));dummy.rotation.set(0,rear?Math.PI:0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();labels.setMatrixAt(i,dummy.matrix);});
  labels.computeBoundingSphere();labels.userData.citySquareName=currentCity.name;group.add(labels);
 }
 const posts=new THREE.InstancedMesh(new THREE.BoxGeometry(.12,1.7,.12),new THREE.MeshStandardMaterial({color:0x344e4e}),citySigns.length*2);
 citySigns.forEach((sign,i)=>{for(const side of [-1,1]){dummy.position.set(sign.x+side*1.35,.85,sign.z);dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();posts.setMatrixAt(i*2+(side+1)/2,dummy.matrix);}});
 posts.computeBoundingSphere();posts.castShadow=true;group.add(posts);
}

function drawCityLife(selected){
  const occupied=new Map();
  for(const h of selected)occupied.set(h.blockIndex,true);
  for(const sh of shopPurchases)occupied.set(sh.block,true);
  const box=new THREE.BoxGeometry(1,1,1),sphere=new THREE.IcosahedronGeometry(1,1);
  const dummy=new THREE.Object3D(),batches=new Map();
  function add(shape,color,x,y,z,w,h,d){
    const col=Math.round(x/BLOCK_X),row=Math.round(z/BLOCK_Z);
    const bb=blockBoundsFromCell(col,row);
    if(isInsideParcel(x,z,w,d,bb)&&!decorationAllowed(x,z,w,d))return;
    const key=shape+':'+color;
    if(!batches.has(key))batches.set(key,{geo:shape==='sphere'?sphere:box,color,entries:[]});
    batches.get(key).entries.push({x,y,z,w,h,d});
  }
  for(const block of occupied.keys()){
    const {col:c,row:r}=spiralCell(block),{x:bx,z:bz}=blockCenter(c,r);
    const vx=streetEdgeX(c),hz=streetEdgeZ(r),seed=block*97;
    // Traffic lights are concentrated at major crossings, not every corner.
    if((c%4===0||r%5===0)&&rnd(seed+12)>.28){
      const x=vx+7.5,z=hz+7.0;
      add('box',0x48585a,x,2.25,z,.18,4.5,.18);
      add('box',0x26343b,x,4.15,z,.66,1.6,.52);
      add('box',0xe0473b,x,4.6,z+.28,.38,.36,.08);
      add('box',0xe6ba47,x,4.14,z+.28,.38,.36,.08);
      add('box',0x48a876,x,3.7,z+.28,.38,.36,.08);
      // Crosswalks are exclusively generated by drawRoadNetwork().
      // Traffic lights must never draw their own overlapping stripes.
    }
    // Static bus shelters, bicycle stands, mailboxes and benches.
    if(block%17===0){
      const x=bx+21,z=hz-7.2;
      add('box',0x566a72,x,1.35,z,5.5,.22,2.1);
      for(const dx of [-2.3,2.3])add('box',0x58686a,x+dx,.72,z,.15,1.4,.15);
      add('box',0x3e7285,x,2.5,z,5.8,.25,2.3);
      add('box',0x856d52,x, .5,z+.3,3,.3,.7);
      add('box',0xe6d9bd,x-3,1.6,z,.35,3.2,.35);
    }
    if(block%11===0){
      const x=bx-39,z=bz+18;
      add('box',0x4c879c,x,.6,z,1.2,1.2,1.2);
      add('box',0xd8d8c6,x,1.26,z,1.25,.15,1.25);
    }
    if(block%7===0){
      const x=bx+38,z=bz-17;
      for(let j=0;j<3;j++){
        add('box',0x6b787c,x+j*1.15,.65,z,.14,1.3,.14);
        add('box',0x6b787c,x+j*1.15,.25,z+.5,.14,.5,1.0);
      }
    }
    // Two road-facing rows: static pedestrian infrastructure on both sides.
    // All items remain fixed; no cars, pedestrians or animation.
    for(const side of [-1,1]){
      const curbZ=bz+side*(BLOCK_Z/2-6.8);
      for(let j=0;j<LOT_COLS;j+=4){
        const xx=bx+(j-(LOT_COLS-1)/2)*LOT_X;
        add('box',0x586b67,xx,2.55,curbZ,.2,5.1,.2); // lamp post
        add('box',0xeed69d,xx,5.15,curbZ,.8,.3,.8); // lantern
        if((j+block)%3===0){
          add('box',0x8a6c4e,xx+4,.46,curbZ,2.4,.25,.62); // bench
          add('box',0x8a6c4e,xx+4,.87,curbZ-side*.2,2.4,.7,.16);
          add('box',0x397d67,xx+6,.55,curbZ,.7,1.1,.7); // bin
        }
      }
    }
    // Street lamps, on the outer edge of the sidewalk; light fixture visible in daylight.
    if(block%2===0){
      for(const offset of [-1,1]){
        const lx=bx+offset*28,lz=hz-6.8;
        add('box',0x46575c,lx,2.6,lz,.22,5.2,.22);
        add('box',0x46575c,lx+1.0,5.15,lz,2.1,.15,.18);
        add('box',0xffe8a0,lx+1.9,5.02,lz,.65,.24,.48);
      }
    }
    // Waste bins, hydrants, street signs and seating near the curb.
    if(block%5===0){
      const px=bx+24,pz=hz-6.9;
      add('box',0x3d8278,px,.62,pz,1.0,1.24,.8);
      add('box',0x344c53,px,.62+0.68,pz,1.08,.14,.87);
      add('box',0xb65346,px+4,.48,pz,.55,.95,.55);
      add('box',0x6c6557,px-5,.55,pz,3,.2,.65);
      add('box',0x6c6557,px-5,.32,pz-0.2,2.5,.6,.14);
    }
    if(block%8===0){
      const sx=vx+6.7,sz=bz+19;
      add('box',0x52615c,sx,1.65,sz,.16,3.3,.16);
      add('box',0x3b849a,sx,3.3,sz,2.2,.7,.15);
    }

  }
  for(const batch of batches.values()){
    const mesh=new THREE.InstancedMesh(batch.geo,new THREE.MeshLambertMaterial({color:batch.color,flatShading:true}),batch.entries.length);
    batch.entries.forEach((e,i)=>{dummy.position.set(e.x,e.y,e.z);dummy.rotation.set(0,0,0);dummy.scale.set(e.w,e.h,e.d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)});
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
  }
}
// A proper ridge-roof mesh. Unlike cone roofs, the front/back have triangular gables.
function makeRidgeRoof(){
  // Closed six-vertex gable prism, with consistent outward-facing winding.
  // Base y=0, ridge y=1; geometry scales independently in X/Y/Z.
  const positions=[-1,0,-1, 1,0,-1, 0,1,-1, -1,0,1, 1,0,1, 0,1,1];
  const faces=[
    0,2,1,   3,4,5,       // triangular gables
    0,3,5, 0,5,2,        // left roof slope
    2,5,4, 2,4,1,        // right roof slope
    0,1,4, 0,4,3         // bottom
  ];
  let geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geo.setIndex(faces);geo=geo.toNonIndexed();geo.computeVertexNormals();
  // Roof triangles previously had no UVs: CanvasTexture could not appear.
  // Map both slopes in physical local roof coordinates so tiles show at a distance.
  const xyz=geo.getAttribute('position'),uv=[];
  for(let i=0;i<xyz.count;i++){
    const xx=xyz.getX(i),zz=xyz.getZ(i);
    uv.push((xx+1)*1.65,(zz+1)*2.8);
  }
  geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  return geo;
}
// Point-based housing progression. All dimensions are clipped to the
// permanent parcel. Points never alter the lot or the owner's coordinates.
const HOUSE_TIERS=[
 {min:0,name:'Monolocale',levels:1},
 {min:100,name:'Casa piccola',levels:2},
 {min:500,name:'Villetta',levels:3},
 {min:1500,name:'Palazzina',levels:5},
 {min:4000,name:'Condominio',levels:9},
 {min:10000,name:'Torre residenziale',levels:17},
 {min:25000,name:'Grattacielo',levels:30},
 {min:60000,name:'Grattacielo monumentale',levels:52}
];
function houseTier(points){
 let tier=0;for(let i=1;i<HOUSE_TIERS.length;i++)if(points>=HOUSE_TIERS[i].min)tier=i;
 return tier;
}
function houseFootprint(h,tier){
 const b=plotBounds(h.blockIndex,h.slot);
 const parcelW=b.right-b.left,parcelD=b.bottom-b.top;
 // The first three stages grow as residential homes, never long sheds.
 // All five apartment/tower stages use EXACTLY ONE common footprint.
 const widths=[9.6,12.6,15.2,16.0,16.0,16.0,16.0,16.0];
 const depths=[10.5,13.8,16.5,22.0,22.0,22.0,22.0,22.0];
 const width=Math.min(parcelW-2.4,widths[tier]);
 const depth=Math.min(parcelD-7.0,depths[tier]);
 const availableShift=(parcelD-depth)/2;
 // All tiers preserve a usable street-side garden and rear boundary.
 const offsetZ=Math.max(-availableShift+1.5,Math.min(0,availableShift-5.5));
 const facing=facadeAngle(h);
 const cx=h.x+Math.sin(facing)*offsetZ;
 const cz=h.z+Math.cos(facing)*offsetZ;
 assertInsideParcel('Edificio a punti '+h.id,cx,cz,width,depth,b);
 return {width,depth,offsetZ,
  frontFree:availableShift-offsetZ,rearFree:availableShift+offsetZ};
}

// Shared 512×512 procedural materials. A single texture is reused across
// thousands of instanced homes; no network assets or per-home textures.
const homeNormalTextures={};
function homeNormalPattern(kind){
 if(homeNormalTextures[kind])return homeNormalTextures[kind];
 const size=256,canvas=document.createElement('canvas');
 canvas.width=canvas.height=size;
 const ctx=canvas.getContext('2d'),img=ctx.createImageData(size,size);
 function relief(x,y){
  if(kind==='roof'){
   const row=Math.floor(y/11),xx=(x-(row%2)*8+256)%16,yy=y%11;
   const roll=Math.pow(Math.sin(xx*Math.PI/16),1.8);
   return roll*.88*(.65+yy*.035)-(yy<1?.35:0);
  }
  return Math.sin(x*.43+y*.7)*.14+Math.sin(x*.13-y*.22)*.12;
 }
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const dx=relief((x+1)%size,y)-relief((x+size-1)%size,y);
  const dy=relief(x,(y+1)%size)-relief(x,(y+size-1)%size);
  const strength=kind==='roof'?1.4:.45,nx=-dx*strength,ny=-dy*strength;
  const norm=Math.hypot(nx,ny,1),i=(y*size+x)*4;
  img.data[i]=128+127*nx/norm;img.data[i+1]=128+127*ny/norm;
  img.data[i+2]=128+127/norm;img.data[i+3]=255;
 }
 ctx.putImageData(img,0,0);
 const tex=new THREE.CanvasTexture(canvas);
 tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
 tex.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
 homeNormalTextures[kind]=tex;return tex;
}
const homeTextures={};
function homePattern(kind){
 if(homeTextures[kind])return homeTextures[kind];
 const c=document.createElement('canvas');c.width=c.height=512;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#ffffff';ctx.fillRect(0,0,512,512);

 if(kind==='grass'){
  // Fine-grain blade clusters; no 8px blocks or large green rectangles.
  ctx.fillStyle='#8fae70';ctx.fillRect(0,0,512,512);
  const img=ctx.createImageData(512,512);
  for(let y=0;y<512;y++)for(let x=0;x<512;x++){
   const n=rnd(x*1.719+y*31.79),m=rnd(x*.39+y*.81);
   // Non-periodic grain avoids diagonal bands across the repeated ground texture.
   const v=(n-.5)*24+(m-.5)*9;
   const i=(y*512+x)*4;
   img.data[i]=Math.max(0,141+v);
   img.data[i+1]=Math.max(0,171+v);
   img.data[i+2]=Math.max(0,105+v*.72);
   img.data[i+3]=255;
  }
  ctx.putImageData(img,0,0);
  for(let i=0;i<17000;i++){
   const x=rnd(i*37.13)*512,y=rnd(i*91.73)*512;
   const g=rnd(i*7.21);
   ctx.strokeStyle=g>.5?'rgba(47,106,39,.25)':'rgba(223,235,150,.28)';
   ctx.lineWidth=.65;
   ctx.beginPath();ctx.moveTo(x,y+2.2);ctx.lineTo(x+(g-.5)*2,y-1.2);ctx.stroke();
  }
 }else if(kind==='wall'){
  // Continuous stucco grain, not a tiled checkerboard.
  const img=ctx.createImageData(512,512);
  for(let y=0;y<512;y++)for(let x=0;x<512;x++){
   const grain=(rnd(x*23.11+y*79.31)-.5)*24;
   const fine=(rnd(x*.91+y*1.07)-.5)*8;
   const v=Math.round(grain+fine);
   const i=(y*512+x)*4;
   img.data[i]=Math.min(255,235+v);
   img.data[i+1]=Math.min(255,231+v);
   img.data[i+2]=Math.min(255,223+v);
   img.data[i+3]=255;
  }
  ctx.putImageData(img,0,0);
 }else{
  // Clay tiles: curved ridges, staggered joints and soft grout.
  ctx.fillStyle='#c5b9a5';ctx.fillRect(0,0,512,512);
  for(let row=0;row<24;row++){
   const y=row*22,offset=(row%2)*16;
   for(let col=-1;col<18;col++){
    const x=col*32+offset;
    const variation=rnd(row*71+col*19);
    const shade=variation>.66?'rgba(255,247,215,.10)':variation<.30?'rgba(46,35,30,.10)':'rgba(255,255,255,.02)';
    ctx.fillStyle=shade;ctx.fillRect(x+1,y+1,30,20);
    for(let q=0;q<30;q++){
      const light=Math.sin((q/29)*Math.PI);
      ctx.fillStyle='rgba(255,255,235,'+(.035+light*.09)+')';
      ctx.fillRect(x+q+1,y+2,1,17);
    }
    ctx.fillStyle='rgba(46,31,23,.22)';ctx.fillRect(x+1,y+19,30,2);
    ctx.fillStyle='rgba(255,245,220,.19)';ctx.fillRect(x+1,y+2,30,2);
    ctx.fillStyle='rgba(44,32,27,.16)';ctx.fillRect(x+30,y+1,1,20);
   }
  }
 }

 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
 tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
 if(kind==='grass')tex.repeat.set(65,65);
 if(kind==='roof')tex.repeat.set(1,1);
 tex.anisotropy=Math.min(8,renderer?.capabilities?.getMaxAnisotropy?.()||1);
 homeTextures[kind]=tex;return tex;
}

function renderAllHouses(selected){
  // Multiple architectural families, all instanced: render every house at every zoom.
  const boxGeo=new THREE.BoxGeometry(1,1,1);
  const roofGeo=makeRidgeRoof();
  const pyramidGeo=new THREE.ConeGeometry(1,1,6);
  const domeGeo=new THREE.SphereGeometry(.5,8,5);
  const poolCircleGeo=new THREE.CylinderGeometry(.5,.5,1,20);
  const dummy=new THREE.Object3D(),batches=new Map();
  function place(kind,geo,color,h,x,y,z,w,height,d,rotation=0){
    const key=kind+'_'+color;
    if(!batches.has(key))batches.set(key,{geo,color,entries:[]});
    // Every building faces the road bordering its row: north row toward -Z,
    // south row toward +Z. Rotate *all* architectural details together.
    if(h){const a=facadeAngle(h),dx=x-h.x;let dz=z-h.z;
      const ca=Math.cos(a),sa=Math.sin(a);
      dz+=(h._visualOffsetZ||0);
      x=h.x+dx*ca+dz*sa;z=h.z-dx*sa+dz*ca;
      rotation+=a;
    }
    batches.get(key).entries.push({h,x,y,z,w,height,d,rotation});
  }
  for(const h of selected){
    const tier=houseTier(h.points);
    const premium=isPremiumHouse(h);
    const {width:footW,depth:footD,offsetZ}=houseFootprint(h,tier);
    h._visualOffsetZ=offsetZ;
    if(h.garden&&h.points>0&&h.id%3!==1){
      const parcel=plotBounds(h.blockIndex,h.slot);
      const localX=(h.id%2===0?1:-1)*(parcel.right-parcel.left)*.35;
      const frontZ=footD/2+2.6;
      const localZ=frontZ+offsetZ;
      const angle=facadeAngle(h);
      const tx=h.x+localX*Math.cos(angle)+localZ*Math.sin(angle);
      const tz=h.z-localX*Math.sin(angle)+localZ*Math.cos(angle);
      if(isInsideParcel(tx,tz,2.9,2.9,parcel)){
        const tint=h.id%7===0?0xb34ddb:h.id%2===0?0x67a62e:0x438837;
        place('gardenTreeTrunk',boxGeo,0x75553a,h,h.x+localX,1.26,h.z+frontZ,.28,2.52,.28);
        for(let crown=0;crown<7;crown++){
          const phase=crown*2.39996;
          const spread=crown===0?0:.69;
          const size=crown===0?1.29:.70+rnd(h.id*17+crown)*.28;
          place('gardenTreeCrown',domeGeo,coordinatedHouseColor(tint,h.id%7===0?0xf1b5ff:0xcce58e,(crown%3)*.18),h,
            h.x+localX+Math.cos(phase)*spread,2.5+(crown%3)*.36,
            h.z+frontZ+Math.sin(phase)*spread,size,size*.91,size);
        }
      }
    }
    if(tier>=3){
      // Vertical massing; no extensions, parking or roofs leave the parcel.
      const info=HOUSE_TIERS[tier];
      // Architectural visual scale: retain the real tier and progression,
      // but keep most homes within a coherent neighborhood skyline.
      const levels=info.levels;
      const paint=housePaint(h);
      const wall=paint.wall;
      const trim=paint.roof;
      const storeyHeight=3.15;
      const height=levels*storeyHeight+1.8,x=h.x,z=h.z;
      // No parcel decorations: landscaping unlocks at one point.
      place('towerBase',boxGeo,wall,h,x,height/2,z,footW,height,footD);
      if(tier===3){
        // Small apartment blocks keep tile roofs. Towers have open roof terraces.
        place('apartmentTiledRoof',roofGeo,trim,h,x,height-.04,z,
          (footW+.42)/2,Math.max(1.35,footW*.15),(footD+.42)/2);
        place('apartmentEave',boxGeo,0xe9d9bd,h,x,height-.13,z,
          footW+.32,.12,footD+.32);
      }else{
        place('towerRoof',boxGeo,trim,h,x,height+.24,z,footW+.3,.48,footD+.3);
        for(const side of [-1,1]){
          place('terraceParapet',boxGeo,wall,h,x,height+.66,z+side*footD*.48,footW+.27,.48,.22);
          place('terraceParapet',boxGeo,wall,h,x+side*footW*.48,height+.66,z,.22,.48,footD);
          place('terraceCap',boxGeo,0xf2dec2,h,x,height+.93,z+side*footD*.48,footW+.31,.10,.31);
          place('terraceCap',boxGeo,0xf2dec2,h,x+side*footW*.48,height+.93,z,.31,.10,footD);
        }
      }
      if(tier<=5){
        const entranceZ=z+footD*.5;
        const entry=x+footW*.045;
        place('apartmentPortal',boxGeo,0xe6cfaa,h,entry,1.09,entranceZ+.09,1.72,2.18,.22);
        place('apartmentDoor',boxGeo,0x784f36,h,entry,1.00,entranceZ+.23,1.24,2,.13);
        place('apartmentStoop',boxGeo,0xb9aa97,h,entry,.13,entranceZ+.47,2.12,.25,.95);
        for(let stripe=0;stripe<7;stripe++){
          place('apartmentAwning',boxGeo,stripe%2?0xf6e9d4:trim,h,
            entry+(stripe-3)*.29,2.27,entranceZ+.41,.29,.14,.86);
        }
      }
      // Premium design only: rooftop penthouse and enhanced silhouette.
      if(premium&&tier>=5){
        place('penthouse',boxGeo,wall,h,x,height+1.45,z-footD*.27,footW*.34,2.4,footD*.26);
        place('penthouseRoof',boxGeo,trim,h,x,height+2.78,z-footD*.27,footW*.37,.25,footD*.29);
      }
      if(premium){
        // Recognizable premium crown on ALL apartment and tower tiers.
        place('premiumRoofTerrace',boxGeo,0xc3d8c4,h,x,height+.48,z,
          footW*.66,.14,footD*.64);
        for(const side of [-1,1]){
          place('premiumCrownPier',boxGeo,trim,h,x+side*footW*.37,height+1.06,
            z-footD*.27,.30,1.55,.30);
          place('premiumCrownPlanterBase',boxGeo,0xc6b6a0,h,
            x+side*footW*.35,height+.79,z-footD*.37,.94,.30,.94);
          place('premiumCrownPlant',domeGeo,0x4e9d66,h,
            x+side*footW*.35,height+1.13,z-footD*.37,.88,.68,.88);
        }
        place('premiumEntranceCanopy',boxGeo,trim,h,x,2.62,
          z+footD/2+.35,3.8,.24,.72);
        const stone=coordinatedHouseColor(wall,0xffefd4,.52);
        const baseZ=z+footD/2;
        place('premiumTowerPortal',boxGeo,stone,h,x,1.25,baseZ+.12,2.18,2.50,.24);
        place('premiumTowerDoorGlass',boxGeo,0x36728b,h,x,1.08,baseZ+.28,1.66,2.15,.11);
        place('premiumTowerEntryStep',boxGeo,stone,h,x,.12,baseZ+.52,3.46,.22,.91);
        for(const side of [-1,1]){
          const pierX=x+side*footW*.445;
          place('premiumTowerPier',boxGeo,stone,h,pierX,height*.52,baseZ+.11,.24,height*.87,.22);
          place('premiumTowerPortalLamp',boxGeo,0xffd17e,h,x+side*1.48,2.02,baseZ+.31,.24,.34,.17);
          place('premiumTowerEntryPlanter',boxGeo,trim,h,x+side*2.10,.31,baseZ+.68,.77,.48,.58);
          place('premiumTowerEntryPlant',domeGeo,0x5f8c43,h,x+side*2.10,.65,baseZ+.68,.65,.43,.51);
        }
        for(const face of [-1,1]){
          place('premiumTowerBaseBand',boxGeo,stone,h,x,2.92,z+face*(footD/2+.10),footW+.12,.18,.26);
          place('premiumTowerCrownBand',boxGeo,stone,h,x,height-.16,z+face*(footD/2+.10),footW+.12,.26,.27);
          const sideX=x+face*(footW/2+.10);
          place('premiumTowerSideBaseBand',boxGeo,stone,h,sideX,2.92,z,.26,.18,footD+.12);
          place('premiumTowerSideCrownBand',boxGeo,stone,h,sideX,height-.16,z,.27,.26,footD+.12);
        }

      }
      // Rooftop amenities are instanced just like the buildings. The four
      // choices have DIFFERENT silhouettes, not only different colors.
      if(premium&&h.points>=50){
        const v=gardenChoice(h,'bench');
        const bx=x+footW*.24,bz=z+footD*.24,by=height+.95;
        const bbqColors=[0xc69d7a,0x66747a,0xb77750,0xa5b2b5];
        const c=bbqColors[v];
        place('roofBBQPad',boxGeo,0xd9d1be,h,bx,by-.16,bz,2.55,.18,2.15);
        if(v===0){ // tall brick barbecue with extraction hood
          place('roofBBQBrick',boxGeo,c,h,bx,by+.42,bz,1.52,.96,.94);
          place('roofBBQOpening',boxGeo,0x35373a,h,bx,by+.61,bz+.49,1.03,.43,.07);
          place('roofBBQHood',pyramidGeo,0x9d6047,h,bx,by+1.22,bz,1.35,.74,1.08);
          place('roofBBQFlue',boxGeo,c,h,bx,by+1.77,bz-.22,.44,.79,.44);
        }else if(v===1){ // compact freestanding kettle grill
          place('roofBBQLegs',boxGeo,c,h,bx,by+.38,bz,.16,.75,.16);
          place('roofBBQBowl',domeGeo,0x353b3d,h,bx,by+.87,bz,1.40,.60,1.20);
          place('roofBBQLid',domeGeo,c,h,bx,by+1.26,bz,1.45,.40,1.25);
          place('roofBBQHandle',boxGeo,0xe2d2b6,h,bx,by+1.49,bz,.44,.12,.15);
        }else if(v===2){ // rustic pizza oven with chimney
          place('roofBBQOvenBase',boxGeo,c,h,bx,by+.37,bz,1.72,.72,1.42);
          place('roofBBQOvenDome',domeGeo,0xd3a17a,h,bx,by+1.05,bz,1.65,1.03,1.38);
          place('roofBBQOvenDoorLower',boxGeo,0x40312a,h,bx,by+.84,bz+.48,.70,.30,.48);
          place('roofBBQOvenDoorArch',domeGeo,0x40312a,h,bx,by+1.06,bz+.49,.70,.38,.49);
          place('roofBBQOvenFlue',boxGeo,0xa66a4d,h,bx,by+1.65,bz-.25,.36,.83,.36);
        }else{ // outdoor kitchen with side counter
          place('roofBBQKitchen',boxGeo,c,h,bx,by+.42,bz,2.25,.86,.74);
          place('roofBBQCounter',boxGeo,0xd8e0dd,h,bx,by+.90,bz,2.45,.13,.89);
          place('roofBBQHob',boxGeo,0x343a3e,h,bx+.47,by+.99,bz,.76,.07,.55);
          place('roofBBQCabinet',boxGeo,0x536c75,h,bx-.47,by+.45,bz+.39,.63,.56,.07);
        }
      }
      if(premium&&h.points>=90){
        const v=gardenChoice(h,'patio');
        const px=x-footW*.17,pz=z+footD*.17;
        const py=height+.97;
        const water=[0x42bcd4,0x4cb8d9,0x218eb7,0x59c5ba][v];
        const edge=[0xf4e4c8,0xe5ece9,0xd9c6a2,0xf1f0e7][v];
        // A single compact terrace, fully above the roof surface.
        const pw=Math.min(8.4,footW*.52),pd=Math.min(7.2,footD*.37);
        place('poolRoofDeck',boxGeo,0xded9cb,h,px,py-.21,pz,pw+.46,.20,pd+.46);
        if(v===1||v===3){
          // oval pool vs round plunge pool: two distinct proportions
          const ow=v===1?pw*.86:Math.min(pw,pd)*.91;
          const od=v===1?pd*.68:Math.min(pw,pd)*.91;
          place('poolOvalBasin',poolCircleGeo,edge,h,px,py,pz,ow,.30,od);
          place('poolOvalWater',poolCircleGeo,water,h,px,py+.17,pz,ow*.84,.06,od*.84);
          if(v===3)place('poolRoundSteps',boxGeo,0xf5f3e9,h,px,py+.22,pz+od*.28,ow*.45,.07,.20);
        }else{
          // classic rectangle vs narrow lap pool with lane and steps
          const ww=v===2?pw*.62:pw*.85;
          const dd=v===2?pd*.93:pd*.80;
          place('poolRectBasin',boxGeo,edge,h,px,py,pz,ww+.26,.31,dd+.26);
          place('poolRectWater',boxGeo,water,h,px,py+.17,pz,ww,.07,dd);
          if(v===2){
            place('poolLapLane',boxGeo,0xe9f2ec,h,px,py+.211,pz,.08,.01,dd*.83);
            place('poolLapSteps',boxGeo,0xdce5df,h,px,py+.22,pz+dd*.38,ww*.64,.05,.24);
          }
        }
        // Pool furniture deliberately placed beyond water but on deck.

      }
      // One instanced window strip per floor, visible on front and rear.
      for(let floor=0;floor<levels;floor++){
        const wy=1.6+floor*storeyHeight;
        for(const side of [-1,1]){
          const wx=x+side*footW*.26, width=footW*.24;
          for(const face of [-1,1]){
            const wz=z+face*(footD/2+.055);
            place('towerWindowFrame',boxGeo,0xf0dfc8,h,wx,wy,wz,width+.22,1.33,.12);
            place('towerWindow',boxGeo,0x39738f,h,wx,wy,wz+face*.075,width,1.15,.075);
            place('towerWindowMullion',boxGeo,0xe5d7c5,h,wx,wy,wz+face*.12,.065,1.15,.045);
            place('towerWindowSill',boxGeo,0xf0dfc8,h,wx,wy-.67,wz+face*.13,width+.37,.12,.34);
          }
        }
        if(premium&&floor>0&&floor%3===0){
          place('towerBand',boxGeo,trim,h,x,wy-.93,z,footW+.22,.13,footD+.22);
        }
      }
      // Side facades must read as buildings, not solid rectangular blocks.
      for(let floor=0;floor<levels;floor++){
        const wy=1.6+floor*storeyHeight;
        for(const side of [-1,1]){
          const xx=x+side*(footW/2+.06);
          for(const zz of [-footD*.27,0,footD*.27]){
            place('aptSideWindow',boxGeo,0x467f99,h,xx,wy,z+zz,.09,1.24,1.28);
            place('aptSideSill',boxGeo,0xece0c9,h,xx+side*.055,wy-.69,z+zz,
              .17,.12,1.55);
            place('aptSideMullion',boxGeo,0xe4ddc8,h,xx+side*.07,wy,z+zz,
              .13,1.26,.08);
          }
        }
        if(floor>0 && floor%2===0 && tier<=5){
          place('aptFloorCourse',boxGeo,0xe6d4bc,h,x,wy-1.03,z,
            footW+.12,.12,footD+.12);
        }
      }
      place('towerDoor',boxGeo,0x66564d,h,x,1.05,z+footD/2+.12,1.6,2.1,.16);
      if(premium){
        // Balconies are recessed within the parcel's free margin.
        for(let floor=1;floor<Math.min(levels,12);floor+=2){
          const by=floor*storeyHeight+.3;
          place('premiumTowerBalcony',boxGeo,0xb9c7bf,h,x,by,z+footD/2+.24,footW*.50,.18,.38);
          place('premiumTowerRail',boxGeo,0x53777d,h,x,by+.42,z+footD/2+.41,footW*.50,.66,.07);
        }
      }
      continue;
    }
    // The default architecture is shared by all homes of the same tier.
    const family=0; // One coherent gabled-house family for all 3 low-rise tiers
    const scale=1; // Identical dimensions for all homes at this tier
    const width=footW,depth=footD;
    const levels=HOUSE_TIERS[tier].levels;
    const height=1.2+levels*2.35;
    const paint=housePaint(h);
    const wall=paint.wall;
    const roof=paint.roof;
    const x=h.x,z=h.z;
    const lawn=0x84ac82;
    // v5.8.1: low-rise homes are genuinely composed from two masses.
    // The main gabled home has a shorter depth; a side wing forms an L plan.
    // Both masses stay inside the same footprint at every evolution.
    const lightTrim=coordinatedHouseColor(wall,0xffffff,.23);
    const stone=coordinatedHouseColor(wall,0xffffff,.12);
    const shadow=coordinatedHouseColor(wall,0x29231d,.22);
    const capital=coordinatedHouseColor(wall,0xffffff,.33);
    const plinth=coordinatedHouseColor(wall,0x554a3e,.18);
    const coreW=width*.76,coreD=depth*.76;
    const coreZ=depth*.12; // front wall stays at +depth/2
    const wingW=width*.31,wingD=depth*.57;
    const wingX=-width*.345,wingZ=-depth*.18;
    const wingH=height*(premium?.90:.78);
    place('homeMainBody',boxGeo,wall,h,x,height/2,z+coreZ,coreW,height,coreD);
    place('homeMainPlinth',boxGeo,plinth,h,x,.20,z+coreZ,coreW+.12,.40,coreD+.12);
    place('homeMainRoof',roofGeo,roof,h,x,height-.03,z+coreZ,
      (coreW+.45)/2,Math.max(1.3,coreW*.20),(coreD+.48)/2);
    // True raised terracotta courses follow each roof slope. Each row is
    // a thin instanced strip, kept INSIDE the roof footprint.
    const roofRise=Math.max(1.3,coreW*.20),roofHalf=(coreW+.45)/2;
    const roofBase=height-.03;
    for(let side of [-1,1]){
      for(let row=1;row<=7;row++){
        const t=row/8;
        const rx=x+side*(roofHalf*(1-t));
        const ry=roofBase+roofRise*t+.035;
        place('roofRaisedTileCourse',boxGeo,coordinatedHouseColor(roof,0x57301e,.10),
          h,rx,ry,z+coreZ,.095,.075,coreD*.93);
      }
    }
    place('homeWingBody',boxGeo,wall,h,x+wingX,wingH/2,z+wingZ,wingW,wingH,wingD);
    place('homeWingPlinth',boxGeo,plinth,h,x+wingX,.20,z+wingZ,wingW+.12,.40,wingD+.12);
    // v6.4.8: the side wing is lower than the main gable. Its previous
    // pitched roof intersected the main roof at the outer corner.
    const wingRoofY=Math.min(wingH+.06,height-.45);
    place('homeWingRoofFlat',boxGeo,roof,h,x+wingX,wingRoofY,z+wingZ,
      wingW+.14,.12,wingD+.14);
    // Do NOT add independent gutter boxes at roof corners: they created
    // the dark square end caps seen in screenshots. The roof mesh itself
    // provides a continuous clean edge.
    // A sheltered entrance with a distinct front gable and door.
    place('entryStep',boxGeo,plinth,h,x,.12,z+depth/2+.48,2.4,.24,.76);
    if(!premium){
      place('entryAwning',roofGeo,roof,h,x,2.48,z+depth/2+.32,1.42,.48,.43);
      for(const side of [-1,1])
        place('entryPost',boxGeo,stone,h,x+side*1.06,1.22,z+depth/2+.55,.13,2.28,.13);
    }
    // Premium is an architectural upgrade, not just an extra chimney:
    // a second gabled front pavilion, covered veranda, roof dormer and
    // generous upper balcony, all sharing the original footprint.
    if(premium){
      const frontage=z+depth/2;
      const bronze=0x4c3b30;
      place('premiumDoorLintel',boxGeo,capital,h,x,2.19,frontage+.13,1.62,.21,.21);
      for(const side of [-1,1]){
        const pierX=x+side*coreW*.465;
        place('premiumFacadePier',boxGeo,stone,h,pierX,height*.49,frontage+.11,.27,height*.91,.24);
        place('premiumFacadeCapital',boxGeo,capital,h,pierX,height*.955,frontage+.14,.39,.19,.31);
        place('premiumFacadePlinth',boxGeo,plinth,h,pierX,.25,frontage+.14,.41,.42,.31);
      }
      for(const side of [-1,1]){
        const sx=x+side*coreW*.28;
        place('premiumWallLanternStem',boxGeo,bronze,h,x+side*.90,1.99,frontage+.24,.12,.31,.20);
        place('premiumWallLanternGlass',boxGeo,0xffcf74,h,x+side*.90,1.85,frontage+.29,.17,.20,.17);
        place('premiumWindowBox',boxGeo,0x985639,h,sx,.99,frontage+.28,.93,.23,.34);
        place('premiumWindowPlant',domeGeo,0x588534,h,sx,1.13,frontage+.31,.81,.26,.30);
        for(const offset of [-.24,0,.24]){
          place('premiumWindowFlower',domeGeo,0xd45676,h,sx+offset,1.25,frontage+.37,.16,.15,.16);
        }
        if(levels>1){
          const railY=3.52;
          place('premiumBalconyDeck',boxGeo,stone,h,sx,3.12,frontage+.37,1.65,.17,.72);
          place('premiumBalconyRail',boxGeo,bronze,h,sx,railY+.27,frontage+.70,1.65,.07,.07);
          for(const baluster of [-.74,-.37,0,.37,.74]){
            place('premiumBalconyBaluster',boxGeo,bronze,h,sx+baluster,railY,frontage+.70,.055,.55,.055);
          }
        }
      }
      place('premiumEntryPaving',boxGeo,stone,h,x,.085,frontage+1.35,1.68,.10,1.18);
      const rear=z+coreZ-coreD/2;
      for(const side of [-1,1]){
        const rearX=x+side*coreW*.455;
        place('premiumRearPilaster',boxGeo,stone,h,rearX,height*.49,rear-.10,.25,height*.91,.21);
        place('premiumRearCapital',boxGeo,capital,h,rearX,height*.955,rear-.13,.36,.18,.29);
      }
      // Keep the front wall and roof as ONE continuous volume. The old
      // pavilion was pushed through the main facade and produced a roof
      // intersecting the house, with windows embedded in its geometry.
      // Premium distinction comes from the veranda, pilasters and dormer.
      place('premiumVerandaFloor',boxGeo,plinth,h,x,.13,z+depth/2+.62,
        Math.min(4.3,width*.42),.22,1.00);
      for(const side of [-1,1])
        place('premiumVerandaPost',boxGeo,stone,h,x+side*1.65,1.29,
          z+depth/2+.72,.16,2.3,.16);
      place('premiumVerandaRoof',roofGeo,roof,h,x,2.56,z+depth/2+.51,
        2.1,.48,.68);
      place('premiumChimney',boxGeo,0xa47765,h,x-width*.18,height+.85,
        z-depth*.12,.50,1.60,.50);
      // Do not add the former floating balcony/door assembly: it had no
      // coherent supporting facade and covered the second-floor windows.
      // Dormer is visible from above even on the first evolution.
      place('premiumDormer',boxGeo,lightTrim,h,x+coreW*.18,height+.45,
        z+coreZ+coreD*.10,1.10,.72,.85);
      place('premiumDormerTop',roofGeo,roof,h,x+coreW*.18,height+.85,
        z+coreZ+coreD*.10,.65,.30,.52);
      place('premiumDormerGlass',boxGeo,0x86c7d7,h,x+coreW*.18,height+.48,
        z+coreZ+coreD*.10+.45,.56,.45,.08);
    }
    // v6.2: Architectural geometry, not just a brighter lighting preset.
    // Every addition is instanced and attached to the original house, so
    // its footprint, garden reservations and evolution remain unchanged.
    const metal=0x53666a,glass=0x7db6c7;
    // Continuous facade string courses and a defined roof-edge fascia.
    for(const y of [Math.min(height-.48,2.43),...(levels>=2?[4.79]:[])]){
      if(y>=height-.28)continue;
      place('archFrontCourse',boxGeo,stone,h,x,y,z+depth/2+.092,coreW-.25,.095,.14);
      place('archRearCourse',boxGeo,stone,h,x,y,z+coreZ-coreD/2-.095,coreW-.25,.095,.14);
    }
    // No extra fascia bars over the pitched roof corners. Their box-shaped
    // ends were visible as detached blocks at the outer roof corners.
    // Solid entrance portal, framed door and small wall lanterns.
    place('archDoorHead',boxGeo,stone,h,x,2.15,z+depth/2+.18,1.53,.17,.22);
    for(const side of [-1,1]){
      place('archDoorJamb',boxGeo,stone,h,x+side*.68,1.10,z+depth/2+.17,.15,2.18,.20);
      place('archEntranceSconce',boxGeo,metal,h,x+side*1.03,1.83,z+depth/2+.24,.17,.31,.18);
      place('archEntranceGlow',boxGeo,0xffe3a7,h,x+side*1.03,1.87,z+depth/2+.34,.12,.18,.10);
    }
    place('archDoorHandle',boxGeo,0xe6c88e,h,x+.39,1.08,z+depth/2+.22,.065,.12,.07);
    // Recessed entrance panels: the door remains the user's existing door.
    const doorInset=coordinatedHouseColor(0x735342,0x17110e,.18);
    place('archDoorUpperPanel',boxGeo,doorInset,h,x,1.50,z+depth/2+.19,.77,.69,.035);
    place('archDoorLowerPanel',boxGeo,doorInset,h,x,.59,z+depth/2+.19,.77,.65,.035);
    place('archDoorUpperInset',boxGeo,0x866752,h,x,1.50,z+depth/2+.213,.63,.54,.018);
    place('archDoorLowerInset',boxGeo,0x866752,h,x,.59,z+depth/2+.213,.63,.50,.018);
    // Threshold lip sits entirely on the existing entrance step.
    place('archThreshold',boxGeo,capital,h,x,.255,z+depth/2+.38,1.36,.075,.36);

    // Roof ridge caps create an articulated tiled roof silhouette.
    // Ridge profile is supplied by the roof mesh itself.
    // Premium homes receive decorative front pilasters, without extending the lot.
    if(premium){
      for(const side of [-1,1]){
        place('archPremiumPier',boxGeo,stone,h,x+side*coreW*.47,height*.48,
          z+depth/2+.11,.18,height*.95,.17);
        place('archPremiumPierCapital',boxGeo,capital,h,x+side*coreW*.47,height*.94,
          z+depth/2+.14,.32,.19,.23);
      }
    }
    // Doors, windows and facade accents stay GPU-instanced at 5,000+ homes.
    const front=z+depth/2+.065;
    place('door',boxGeo,0x735342,h,x,1.02,front+.02,1.10,2.04,.14);
    const rows=levels>=3?3:levels>=2?2:1;
    for(let floor=0;floor<rows;floor++){
      const wy=1.65+floor*2.35;
      if(wy>height-.55)continue;
      for(const side of [-1,1]){
        // Unified window module for every front window (Free and Premium).
        // The premium pavilion has its own front plane, but when it is too
        // low for a floor we use the main wall. No partial/unstyled windows.
        const wx=x+side*coreW*.26;
        const wz=front;
        place('window',boxGeo,0x8dc6d8,h,wx,wy,wz,.68,.76,.12);
        place('sill',boxGeo,lightTrim,h,wx,wy-.44,wz+.05,.83,.1,.20);
        place('archWindowLintel',boxGeo,lightTrim,h,wx,wy+.45,wz+.04,.92,.12,.19);
        for(const edge of [-1,1])
          place('archWindowJamb',boxGeo,lightTrim,h,wx+edge*.40,wy,wz+.045,.105,.90,.15);
        place('archWindowMullion',boxGeo,metal,h,wx,wy,wz+.09,.045,.75,.08);
        place('archWindowCrossbar',boxGeo,metal,h,wx,wy+.04,wz+.105,.66,.042,.065);
        place('archGlassReflection',boxGeo,0xc9e9ef,h,wx-.21,wy+.18,wz+.118,.075,.28,.012);

        for(const edge of [-1,1]){
          place('archShutter',boxGeo,coordinatedHouseColor(roof,0x302e2b,.17),h,
            wx+edge*.59,wy,wz+.075,.23,.81,.10);
          for(const sy of [-.22,0,.22])
            place('archShutterSlat',boxGeo,coordinatedHouseColor(roof,0xffffff,.18),h,
              wx+edge*.59,wy+sy,wz+.135,.20,.035,.035);
        }
        place('archWindowTopShade',boxGeo,shadow,h,wx,wy+.53,wz+.025,1.04,.07,.23);
        const rearWing=side===-1&&wy+.55<wingH;
        const rearX=rearWing?x+wingX:x+side*coreW*.26;
        const rearZ=rearWing?z+wingZ-wingD/2-.075:z+coreZ-coreD/2-.075;
        place('rearWindow',boxGeo,0x8dc6d8,h,rearX,wy,rearZ,.68,.76,.12);
        place('rearSill',boxGeo,lightTrim,h,rearX,wy-.44,rearZ-.055,.85,.12,.19);
        place('archRearLintel',boxGeo,lightTrim,h,rearX,wy+.45,rearZ-.045,.90,.12,.18);
        place('archRearMullion',boxGeo,metal,h,rearX,wy,rearZ-.09,.045,.73,.08);
        place('archRearCrossbar',boxGeo,metal,h,rearX,wy+.04,rearZ-.11,.66,.042,.065);
        place('archRearGlassReflection',boxGeo,0xc9e9ef,h,rearX+.20,wy+.18,rearZ-.12,.075,.28,.012);

        for(const edge of [-1,1]){
          place('archRearJamb',boxGeo,lightTrim,h,rearX+edge*.40,wy,rearZ-.055,.105,.90,.15);
          place('archRearShutter',boxGeo,coordinatedHouseColor(roof,0x302e2b,.17),h,
            rearX+edge*.59,wy,rearZ-.075,.23,.81,.10);
          for(const sy of [-.22,0,.22])
            place('archRearShutterSlat',boxGeo,coordinatedHouseColor(roof,0xffffff,.18),h,
              rearX+edge*.59,wy+sy,rearZ-.135,.20,.035,.035);
        }
        place('archRearWindowShade',boxGeo,shadow,h,rearX,wy+.53,rearZ-.025,1.04,.07,.23);
        // Side-wall windows are critical to making the house read as a home
        // rather than a long blank storage building.
        for(const sideZ of [-1,1]){
          const wingCovered=side===-1&&sideZ===-1&&wy+.55<wingH;
          const pavilionCovered=false; // no protruding front pavilion
          const sideX=wingCovered?x+wingX-wingW/2-.105:
                      pavilionCovered?x+width*.315+width*.32/2+.105:
                      x+side*(coreW/2+.075);
          const sideFacing=wingCovered?-1:pavilionCovered?1:side;
          const sideWindowZ=wingCovered?z+wingZ-wingD*.19:
                            pavilionCovered?z+depth*.325+depth*.44*.17:
                            z+coreZ+sideZ*coreD*.27;
          place('sideWindow',boxGeo,0x8dc6d8,h,sideX,
            wy,sideWindowZ,.12,.87,.80);
          place('sideWindowSill',boxGeo,lightTrim,h,
            sideX+sideFacing*.055,wy-.48,sideWindowZ,.18,.10,.96);
          place('archSideWindowHead',boxGeo,lightTrim,h,
            sideX+sideFacing*.06,wy+.48,sideWindowZ,.19,.12,.97);
          for(const edge of [-1,1])
            place('archSideWindowJamb',boxGeo,lightTrim,h,
              sideX+sideFacing*.06,wy,sideWindowZ+edge*.45,.15,.95,.10);
          place('archSideWindowCross',boxGeo,metal,h,
            sideX+sideFacing*.13,wy+.02,sideWindowZ,.065,.04,.80);
          place('archSideWindowVertical',boxGeo,metal,h,
            sideX+sideFacing*.145,wy,sideWindowZ,.065,.74,.042);
          for(const edge of [-1,1]){
            const shutterZ=sideWindowZ+edge*.66;
            place('archSideShutter',boxGeo,coordinatedHouseColor(roof,0x302e2b,.17),h,
              sideX+sideFacing*.095,wy,shutterZ,.105,.81,.24);
            for(const sy of [-.22,0,.22])
              place('archSideShutterSlat',boxGeo,coordinatedHouseColor(roof,0xffffff,.18),h,
                sideX+sideFacing*.16,wy+sy,shutterZ,.036,.035,.20);
          }
          place('archSideWindowShade',boxGeo,shadow,h,
            sideX+sideFacing*.07,wy+.54,sideWindowZ,.24,.07,1.06);
        }
      }
    }
  }
  const renderBatches=new Map();
  const spatialBatches=selected.length>=2000;
  for(const [key,batch] of batches.entries()){
    const texture=/(roof|gable|hip|towerTop|cornice)/i.test(key)?'roof':
      /(wall|body|towerBase|wing|topSetback|penthouse|bay|longWing)/i.test(key)?'wall':'';
    const normalStrength=/(roof|gable|hip)/i.test(key)?.88:.56;
    const roughness=/(window|glass|mullion)/i.test(key)?.26:/roof/i.test(key)?.79:.87;
    const metalness=/(mullion|sconce|handle)/i.test(key)?.48:.02;
    const casts=/(gardenTree|towerBase|towerRoof|towerMain|towerMid|homeMain|homeWing|homeRoof|homeCore|homeWall|towerWall|towerBody|mainBody|wingBody|mainRoof|gable|hipRoof)/i.test(key);
    const receives=casts||/(facade|pier|window|door|balcony|pilaster)/i.test(key);
    const profile=[batch.geo.id,texture,normalStrength,roughness,metalness,casts,receives].join(':');
    for(const entry of batch.entries){
      // Dense cities cull whole neighborhoods instead of submitting every house.
      const key=spatialBatches?profile+':'+Math.floor(entry.h.x/184)+':'+Math.floor(entry.h.z/184):profile;
      if(!renderBatches.has(key))renderBatches.set(key,{
        profile,geo:batch.geo,texture,normalStrength,roughness,metalness,casts,receives,entries:[]
      });
      renderBatches.get(key).entries.push({...entry,color:batch.color});
    }
  }
  const tint=new THREE.Color();
  const materials=new Map();
  for(const batch of renderBatches.values()){
    if(!materials.has(batch.profile))materials.set(batch.profile,new THREE.MeshStandardMaterial({
      color:0xffffff,
      map:batch.texture?homePattern(batch.texture):null,
      normalMap:batch.texture?homeNormalPattern(batch.texture):null,
      normalScale:new THREE.Vector2(batch.normalStrength,batch.normalStrength),
      side:batch.geo===roofGeo?THREE.DoubleSide:THREE.FrontSide,
      roughness:batch.roughness,
      metalness:batch.metalness
    }));
    const mesh=new THREE.InstancedMesh(batch.geo,materials.get(batch.profile),batch.entries.length);
    mesh.castShadow=batch.casts;
    mesh.receiveShadow=batch.receives;
    mesh.userData.homes=batch.entries.map(e=>e.h);
    batch.entries.forEach((e,i)=>{
      dummy.position.set(e.x,e.y,e.z);dummy.rotation.set(0,e.rotation,0);
      dummy.scale.set(e.w,e.height,e.d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix); mesh.setColorAt(i,tint.setHex(e.color));
    });
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
    if(batch.entries[0].h)houseMeshes.push(mesh);
  }
  if(selected.length){
    const contactGeo=new THREE.PlaneGeometry(1,1);
    contactGeo.rotateX(-Math.PI/2);
    const contactMaterial=new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,
      vertexShader:`
        varying vec2 groundUv;
        void main(){
          groundUv=uv;
          gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);
        }`,
      fragmentShader:`
        varying vec2 groundUv;
        void main(){
          vec2 edge=abs(groundUv-.5)*2.;
          float shade=1.-smoothstep(.54,1.,max(edge.x,edge.y));
          gl_FragColor=vec4(.085,.075,.045,shade*.24);
        }`
    });
    const contacts=new THREE.InstancedMesh(contactGeo,contactMaterial,selected.length);
    selected.forEach((home,index)=>{
      const footprint=houseFootprint(home,houseTier(home.points));
      const angle=facadeAngle(home);
      dummy.position.set(home.x+Math.sin(angle)*footprint.offsetZ,.061,home.z+Math.cos(angle)*footprint.offsetZ);
      dummy.rotation.set(0,angle,0);
      dummy.scale.set(footprint.width*1.09,1,footprint.depth*1.08);
      dummy.updateMatrix();
      contacts.setMatrixAt(index,dummy.matrix);
    });
    contacts.computeBoundingSphere();
    group.add(contacts);
  }
}

// v5.2: Distance-based, progressively streamed close-up decoration.
// All houses remain in the existing instanced city meshes at every zoom.
// Extra detail is generated only around the camera's ground focus, with
// capped geometry and infrequent updates while panning.
let nearDetailGroup=null,nearDetailCenter={x:Infinity,z:Infinity},nearDetailTier=-1;
const detailGeo=new Map();
function lodTier(){
 if(distance>1250)return 0;
 if(distance>420)return 1;
 if(distance>155)return 2;
 return 3;
}
function makeCloseDetailMesh(geo,color,placements){
 if(!placements.length)return;
 const mesh=new THREE.InstancedMesh(geo,new THREE.MeshStandardMaterial({color,roughness:.91,flatShading:true}),placements.length);
 const dummy=new THREE.Object3D();
 placements.forEach((p,i)=>{
  dummy.position.set(p[0],p[1],p[2]);dummy.rotation.set(0,p[6]||0,0);
  dummy.scale.set(p[3],p[4],p[5]);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
 });
 mesh.instanceMatrix.needsUpdate=true;
 mesh.frustumCulled=false; // local set already culled by ground position
 nearDetailGroup.add(mesh);
}
function clearCloseDetails(){
 if(!nearDetailGroup)return;
 const old=nearDetailGroup;nearDetailGroup=null;
 old.parent?.remove(old);
 old.traverse(o=>{if(o.isInstancedMesh)o.dispose();if(o.material)o.material.dispose()});
 // Shared geometries are deliberately retained.
}
// Compact handcrafted procedural bushes; all four are original and use
// shared instanced box/icosahedron primitives, never image cut-outs.
function addGardenPlant(add,variant,x,z,scale=1){
 // Garden footprints unchanged: flower globe and hedge remain compact;
 // ornamental tree and three-crown tree have low, full canopies.
 const B=(color,dx,y,dz,w,h,d)=>add(color,'box',x+dx*scale,y*scale,z+dz*scale,w*scale,h*scale,d*scale);
 const S=(color,dx,y,dz,w,h,d)=>add(color,'sphere',x+dx*scale,y*scale,z+dz*scale,w*scale,h*scale,d*scale);
 const leaf=[0x347747,0x428a4b,0x5aa45c,0x6ab06a,0x7abb6d];
 if(variant===0){
  // Flowers placed on the OUTER curved surface, not inside the foliage.
  S(0x357e45,0,.46,0,1.56,.81,1.50);
  S(0x4a9850,-.24,.75,-.12,1.05,.68,1.05);
  S(0x5aa45c,.30,.67,.17,1.02,.69,1.00);
  // Two rings at different heights; flowers overlap the green shell slightly.
  for(let i=0;i<18;i++){
   const ring=i<9?0:1, j=i%9, angle=j*Math.PI*2/9+(ring?.24:0);
   const rad=ring?.59:.43, y=ring?.71:1.01;
   S(i%3===0?0xffd2eb:i%3===1?0xf6a9d6:0xffe0f0,
     Math.cos(angle)*rad,y,Math.sin(angle)*rad,.22,.19,.22);
  }
 }else if(variant===1){
  // Broad ornamental tree: foliage starts low and hides most of the trunk.
  B(0x806044,0,1.10,0,.23,2.20,.23);
  S(0x367f47,0,1.80,0,1.55,1.82,1.49);
  for(let i=0;i<8;i++){
   const a=i*Math.PI*2/8;
   S(leaf[i%5],Math.cos(a)*.48,2.27+(i%3)*.28,
     Math.sin(a)*.44,.94,1.18,.92);
  }
  S(0x75b974,0,3.35,0,1.04,1.13,1.02);
 }else if(variant===2){
  S(0x347747,0,.39,0,1.58,.66,1.35);
  for(let i=0;i<5;i++){
   const a=i*Math.PI*2/5;
   S(leaf[(i+1)%5],Math.cos(a)*.43,.52+(i%2)*.08,Math.sin(a)*.34,.60,.54,.59);
  }
 }else{
  // Three-crown tree: overlapping crowns, dense lower branches.
  B(0x805e3b,0,1.13,0,.24,2.26,.24);
  S(0x387f45,0,1.78,0,1.49,1.65,1.46);
  for(const [i,dx,dz,y] of [[0,-.48,-.11,2.52],[1,.48,.10,2.59],
                            [2,-.18,.35,3.03],[3,.20,-.32,3.14],[4,0,0,3.55]]){
   S(leaf[i],dx,y,dz,1.06,1.25,1.04);
  }
 }
}

const GARDEN_UNLOCKS=GARDEN_CATALOG.map(item=>[item.min,item.label]);
function updateProgressiveDetails(force=false){
 if(!active||!group||!camera)return;
 const tier=lodTier();
 const movement=Math.hypot(target.x-nearDetailCenter.x,target.z-nearDetailCenter.z);
 const threshold=tier>=3?32:tier===2?70:160;
 if(!force&&tier===nearDetailTier&&movement<threshold)return;
 nearDetailTier=tier;nearDetailCenter={x:target.x,z:target.z};
 clearCloseDetails();
 if(tier===0)return;
 nearDetailGroup=new THREE.Group();
 group.add(nearDetailGroup);
 const radius=tier===1?230:tier===2?180:135;
 const limit=tier===1?90:tier===2?125:170;
 const nearby=[];
 for(const h of homes){
  const d2=(h.x-target.x)**2+(h.z-target.z)**2;
  if(d2<radius*radius)nearby.push({h,d2});
 }
 nearby.sort((a,b)=>a.d2-b.d2);
 const selected=nearby.slice(0,limit);
 const placements=new Map();
 function add(color,shape,x,y,z,w,ht,d,rotation=0){
  const key=color+'_'+shape;
  if(!placements.has(key))placements.set(key,[]);
  placements.get(key).push([x,y,z,w,ht,d,rotation]);
 }
 for(const {h} of selected){
  // Small architectural additions are contained inside the parcel.
  // Colors and decorative patterns are deterministic for every resident.
  const style=h.id%5;
  const a=facadeAngle(h);
  const ca=Math.cos(a),sa=Math.sin(a);
  function local(dx,dz){
   dz+=offsetZ;
   return [h.x+dx*ca+dz*sa,h.z-dx*sa+dz*ca];
  }
  // 0 points: strictly no house landscaping. At >=1 point: one selected
  // species in 2 fixed slots (Gratis) or 4 fixed slots (Premium).
  if(h.points<1)continue;
  const houseTierNow=houseTier(h.points);
  const {width:buildingW,depth:buildingD,offsetZ,frontFree,rearFree}=houseFootprint(h,houseTierNow);
  const parcel=plotBounds(h.blockIndex,h.slot);
  const plant=housePlant(h);
  const amount=isPremiumHouse(h)?4:2;
  const halfW=buildingW/2,halfD=buildingD/2;
  const halfParcelW=(parcel.right-parcel.left)/2;
  const reservations=[]; // 2D occupancy for all garden furniture
  function available(dx,dz,w,d,door=false,groupKey=null){
   const [gx,gz]=local(dx,dz);
   const extent=Math.max(w,d),side=extent*.04;
   if(!isInsideParcel(gx,gz,w+.5+side,d+.5+side,parcel))return false;
   // The barbecue is allowed a 4 cm facade gap; all other objects keep
   // the normal 20 cm margin. This is a deliberate exception, not a
   // bypass of parcel/road or other decoration collision checks.
   const wallGap=groupKey==='barbecue'?.035:.2;
   if(Math.abs(dx)<buildingW/2+w/2+wallGap&&Math.abs(dz)<buildingD/2+d/2+wallGap)return false;
   // The central front-to-sidewalk corridor is protected even if the
   // decorative walkway itself is not unlocked yet.
   if(!door&&Math.abs(dx)<1.35+w/2&&dz>buildingD/2-.2)return false;
   for(const r of reservations){
    if(groupKey&&r.key===groupKey)continue;
    if(Math.abs(dx-r.x)<(w+r.w)/2+.35&&Math.abs(dz-r.z)<(d+r.d)/2+.35)return false;
   }
   return true;
  }
  function reserveArea(dx,dz,w,d,key,door=false){
   if(!available(dx,dz,w,d,door,key))return false;
   reservations.push({x:dx,z:dz,w,d,key});return true;
  }
  function gardenDecor(color,shape,dx,dz,y,w,ht,d,angle=0,door=false,key=null){
   if(!available(dx,dz,w,d,door,key))return false;
   const [gx,gz]=local(dx,dz);
   add(color,shape,gx,y,gz,w,ht,d,angle+a);
   if(!key)reservations.push({x:dx,z:dz,w,d,key:null});
   return true;
  }
  // The walkway is reserved from the facade to the sidewalk, regardless of
  // its visual style, so no later prop can be placed across the entrance.
  reservations.push({x:0,z:halfD+frontFree/2,w:2.45,d:frontFree,key:'access'});
  // Stable furniture zones. Composite objects share a reservation key,
  // so their own legs/flowers do not reject each other.
  const option=id=>gardenChoice(h,id);
  // Fixed independent material palettes: NEVER tied to house paint.
  const MATERIAL_PALETTES={
   path:[0xd7c7ab,0x868c87,0xc47f60,0xd5c9b0],
   fence:[0x9a704d,0x525e62,0x478a48,0xc18d73],
   lamp:[0x59675b,0x747d82,0x2f4549,0x9ba5aa],
   mailbox:[0xba5247,0x363b3b,0xe1cfac,0x929da1],
   bench:[0xc49a77,0x58646a,0xb77855,0x9aa6a9],
   patio:[0xe9dfc8,0xc9d2d3,0xe5d0ac,0xa9c9c1]
  };
  const material=id=>MATERIAL_PALETTES[id][option(id)];
  const roofColor=housePaint(h).roof;
  const tallBuilding=houseTierNow>=3;

  const front=halfD,back=-halfD;
  // Garden layout v6.0.8: fixed, non-overlapping zones.
  // Plant positions are RESERVED FIRST: neither Premium upgrades, pools,
  // flowers nor barbecue may make an existing bush disappear.
  // Position the front garden from the FENCE, not from the house wall.
  // House tiers grow, but the front flowers keep the same plot-relative
  // coordinates. The bush is behind and inboard of its corresponding flowers.
  const fenceFrontZ=front+frontFree-.19;
  const frontFlowerZ=fenceFrontZ-1.65;
  const frontBushZ=fenceFrontZ-4.55;
  const flowerX=Math.min(halfParcelW-2.20,6.30);
  const bushX=Math.min(halfParcelW-2.55,4.45);
  // Lamp positions are fixed relative to the FRONT FENCE, not the house.
  // Same parcel coordinates for every tier, including skyscrapers.
  // Reserve first so shrubs/flowers never displace a lamp.
  const lampSlots=[];
  if(h.points>=35)for(const side of [-1,1]){
   const key='lamp'+side;
   const dx=side*2.45;
   const dz=fenceFrontZ-3.05;
   if(reserveArea(dx,dz,.85,.85,key))lampSlots.push({side,dx,dz,key});
  }
  const flowerSlots=[];
  if(h.points>=20)for(const side of [-1,1]){
   const dx=side*flowerX,dz=frontFlowerZ;
   if(reserveArea(dx,dz,1.75,1.60,'flowers'+side))
    flowerSlots.push({side,dx,dz});
  }
  // Reserve all permanent shrubs before any Premium-only garden features.
  // On higher tiers the house may grow towards a shrub; try nearby positions
  // while keeping flowers nearer the fence and separated from the shrubs.
  const bushSlots=[[-bushX,frontBushZ],[bushX,frontBushZ],
                   [-Math.min(halfParcelW-2.10,6.5),back-Math.min(2.5,rearFree*.36)],
                   [Math.min(halfParcelW-2.10,6.5),back-Math.min(2.5,rearFree*.36)]];
  const activeBushes=[];
  // Apartment blocks occupy most of the central lot. Shrubs must move
  // OUTSIDE their side walls rather than silently disappear behind them.
  const sideStripX=Math.max(halfW+1.50,halfParcelW-1.48);
  for(let i=0;i<amount;i++){
   const [bx,bz]=bushSlots[i],side=i%2===0?-1:1;
   const candidates=tallBuilding?
    [[side*sideStripX,i<2?front+1.25:back-1.25],
     [side*sideStripX,i<2?front+2.0:back-2.0],
     [side*sideStripX,i<2?front+.65:back-.65],
     [side*(halfParcelW-1.43),i<2?front+2.7:back-2.7]]:
    [[bx,bz],[bx,frontBushZ-.85],
     [side*Math.min(halfParcelW-1.50,Math.abs(bx)+1.2),bz],
     [side*(halfParcelW-1.48),i<2?front+1.3:back-1.3]];
   // Try alternative positions along the same outer side strip; each
   // reserved shrub keeps its own space through every house evolution.
   for(const zShift of [0,.8,-.8,1.6,-1.6])
    candidates.push([side*(halfParcelW-1.46),
     (i<2?front+1.6:back-1.6)+zShift]);
   for(const [cx,cz] of candidates){
    if(reserveArea(cx,cz,2.1,2.1,'plant'+i)){
     activeBushes.push([cx,cz]);break;
    }
   }
  }

  // BBQ next to the REAR WALL of the house, facing the interior garden.
  // Its reservation comes after the bushes/pool but before small ornaments.
  let barbecueSlot=null;
  if(isPremiumHouse(h)&&h.points>=50&&!tallBuilding){
   // Grill rear edge almost touches the rear facade (small safety gap).
   const bz=back-1.135;
   const nearSide=Math.min(halfParcelW-2.0,Math.max(3.65,halfW*.80));
   // Try both rear-wall corners and the center. Never silently hide
   // the grill just because the pool has claimed its previous slot.
   const candidates=[[nearSide,bz],[-nearSide,bz],[0,bz],
                     [nearSide,back-1.28],[-nearSide,back-1.28],
                     [nearSide,back-1.55],[-nearSide,back-1.55]];
   for(const [bx,cz] of candidates){
    if(reserveArea(bx,cz,2.45,2.18,'barbecue')){
     barbecueSlot={x:bx,z:cz};break;
    }
   }
  }
  // Center the swimming pool behind the house, not in the bush corner.
  // The two rear bushes are kept at the outer edges of the garden.
  let poolSlot=null;
  if(isPremiumHouse(h)&&h.points>=90&&!tallBuilding){
   const candidateZ=back-Math.max(3.1,rearFree*.52);
   const candidates=[[0,candidateZ],[0,back-Math.max(3.1,rearFree*.62)],
                     [0,back-Math.max(3.1,rearFree*.42)]];
   for(const [px,pz] of candidates){
    if(reserveArea(px,pz,6.30,4.84,'pool')){
     poolSlot={x:px,z:pz};break;
    }
   }
  }

  // Entrance path reaches the sidewalk. The mailbox is placed at the gate.
  const pathLen=Math.max(0,frontFree-.20);
  if(h.points>=10&&pathLen>=1){
   const v=option('path'),cz=front+.25+pathLen/2;
   const palette=MATERIAL_PALETTES.path;
   if(v!==3){
    const [gx,gz]=local(0,cz);
    add(palette[v],'box',gx,.055,gz,1.95,.11,pathLen,a);
   }else{
    for(let k=0;k<5;k++){
     const [gx,gz]=local(0,front+.65+k*(pathLen-.5)/5);
     add(palette[v],'box',gx,.055,gz,1.95,.11,(pathLen-.5)/6,a);
    }
   }
  }
  for(const {side,dx,dz} of flowerSlots){
   const v=option('flowers'),key='flowers'+side;
   gardenDecor(0x648c50,'box',dx,dz,.12,1.05,.24,.9,0,false,key);
   const colors=[[0xe97989,0xf4b64e,0xb88ddb],[0xb63843,0xd24e53,0xed6670],[0xf6f3d6,0xf0e8b8,0xf7f4e9],[0x8568b8,0xa78bd2,0x6c559b]][v];
   for(let k=0;k<3;k++)
    gardenDecor(colors[k],'sphere',dx+(k-1)*.25,dz,.49,.27,.32,.27,0,false,key);
  }
  for(const {dx,dz,key} of lampSlots){
   const v=option('lamp');
   gardenDecor(material('lamp'),'box',dx,dz,.72,.17,1.44,.17,0,false,key);
   gardenDecor(v===1?0xffedca:0xffe2a2,v===2||v===3?'box':'sphere',dx,dz,1.55,v===1?.55:.42,v===3?.2:.46,.42,0,false,key);
  }
  if(isPremiumHouse(h)&&h.points>=50&&!tallBuilding){
   const v=option('bench'),key='barbecue';
   // Reserved beside the rear wall, with the working side towards the garden.
   const dx=barbecueSlot?.x,dz=barbecueSlot?.z;
   if(barbecueSlot){
    const c=material('bench');
    // Face the cooking surface towards the house, never towards the fence.
    // Mirror the detailed pieces as well as the body, so doors and handles
    // are not left pointing towards the street.
    const bbqDecor=(color,shape,x0,z0,y,w,ht,d,angle=0,door=false,k=key)=>
      gardenDecor(color,shape,x0,2*dz-z0,y,w,ht,d,angle+Math.PI,door,k);
    bbqDecor(0xd4c9b3,'box',dx,dz,.08,2.35,.16,2.08,0,false,key);
    if(v===0){ // masonry BBQ with a full height flue
     bbqDecor(c,'box',dx,dz,.62,1.45,1.02,.84,0,false,key);
     bbqDecor(0x363638,'box',dx,dz+.44,.74,1.05,.47,.09,0,false,key);
     bbqDecor(c,'box',dx,dz-.24,1.58,.44,1.08,.38,0,false,key);
    }else if(v===1){ // round kettle grill on legs
     bbqDecor(0x5e686b,'box',dx,dz,.49,.17,.85,.17,0,false,key);
     bbqDecor(0x31393c,'sphere',dx,dz,.96,1.30,.64,1.17,0,false,key);
     bbqDecor(c,'sphere',dx,dz,1.32,1.34,.35,1.18,0,false,key);
     bbqDecor(0xe4d7bf,'box',dx,dz,1.52,.36,.09,.12,0,false,key);
    }else if(v===2){ // domed wood-fired oven
     bbqDecor(c,'box',dx,dz,.50,1.60,.80,1.36,0,false,key);
     bbqDecor(0xd0a17b,'sphere',dx,dz,1.22,1.55,1.13,1.36,0,false,key);
     bbqDecor(0x352b26,'box',dx,dz+.50,1.01,.74,.35,.55,0,false,key);
     bbqDecor(0x352b26,'sphere',dx,dz+.52,1.19,.74,.40,.52,0,false,key);
     bbqDecor(0xc9682e,'box',dx,dz+.74,.88,.34,.06,.12,0,false,key);
     bbqDecor(c,'box',dx,dz-.28,1.94,.32,.84,.32,0,false,key);
    }else{ // wide stainless steel outdoor kitchen
     bbqDecor(c,'box',dx,dz,.56,2.12,1.06,.76,0,false,key);
     bbqDecor(0xdce1df,'box',dx,dz,1.13,2.28,.13,.89,0,false,key);
     bbqDecor(0x323c40,'box',dx+.44,dz,1.21,.73,.07,.57,0,false,key);
     bbqDecor(0x4d6671,'box',dx-.50,dz+.40,.55,.62,.62,.08,0,false,key);
    }
   }
  }
  // Premium-only garden composition: two ornamental planters and
  // a small sculpture at 35 points, all checked against occupied zones.
  if(isPremiumHouse(h)&&h.points>=1&&!tallBuilding){
   for(const side of [-1,1]){
    const dx=side*3.55,dz=front+Math.min(1.45,frontFree*.28);
    const key='premiumPlanter'+side;
    if(reserveArea(dx,dz,1.05,1.05,key)){
      gardenDecor(0xd9ad78,'box',dx,dz,.26,.82,.52,.82,0,false,key);
      gardenDecor(0x3d9861,'sphere',dx,dz,.75,.78,.74,.78,0,false,key);
      gardenDecor(0xf4c9dc,'sphere',dx,dz,1.05,.25,.24,.25,0,false,key);
    }
   }

  }
  if(h.points>=65){
   // Mailbox is OUTSIDE the front fence, inside the only entrance opening.
   // The box is narrower than the gate and never intersects the walkway.
   // Use the parcel's actual front boundary, not the old house-relative
   // position (which fell behind the fence after the lot extension).
   const dx=1.20;
   const dz=front+frontFree-.15;
   const v=option('mailbox');
   const [gx,gz]=local(dx,dz);
   // The pole and head stay inside the lot; the gate remains unobstructed.
   if(isInsideParcel(gx,gz,.55,.24,parcel)){
    add(0x6b777b,'box',gx,.62,gz,.14,1.24,.14,a);
    add(material('mailbox'),'box',gx,1.35,gz,.53,.38,.24,a);
    if(v===2)add(0xa55c43,'box',gx,1.61,gz,.55,.14,.24,a);
   }
  }

  if(h.points>=80){
   const v=option('fence');
   const rearZ=-halfD-rearFree+.42,frontZ=front+frontFree-.42;
   const sideX=Math.max(2.2,halfParcelW-.46);
   const color=material('fence');
   // Segments sit safely inside the lot; do not reject them because of
   // the overly generous 15cm pad used by the former generic fence check.
   function piece(dx,dz,w,d,y,ht,col=color){
    const [gx,gz]=local(dx,dz);
    if(!isInsideParcel(gx,gz,w+.02,d+.02,parcel,.035))return;
    add(col,'box',gx,y,gz,w,ht,d,a);
   }
   function segment(dx,dz,w,d){
    const alongZ=d>w;
    if(v===0){ // Timber: slatted panels and posts
     const n=Math.max(2,Math.ceil((alongZ?d:w)/1.25));
     for(let j=0;j<=n;j++){
      const t=j/n-.5;
      piece(dx+(alongZ?0:t*w),dz+(alongZ?t*d:0),.13,.13,.58,1.16,0x775339);
     }
     for(const y of [.37,.84])piece(dx,dz,w,d,y,.105,0xa57951);
    }else if(v===1){ // Iron: narrow bars with upper and lower rails
     for(const y of [.26,.98])piece(dx,dz,w,d,y,.09,0x424d53);
     const n=Math.max(2,Math.floor((alongZ?d:w)/.54));
     for(let j=1;j<n;j++){
      const t=j/n-.5;
      piece(dx+(alongZ?0:t*w),dz+(alongZ?t*d:0),.065,.065,.62,1.13,0x525e62);
     }
    }else if(v===2){ // HEDGE: continuous substantial green foliage
     piece(dx,dz,w,d,.65,1.30,0x367e42);
     piece(dx,dz,alongZ?.68:w,alongZ?d:.68,1.22,.27,0x61a85b);
     // Fine darker lower foliage makes the hedge visibly different from a wall.
     piece(dx,dz,alongZ?.53:w,alongZ?d:.53,.24,.33,0x296e3b);
    }else{ // MASONRY: broad stone wall, contrasting cap and base
     piece(dx,dz,w,d,.39,.78,0xc18d73);
     piece(dx,dz,alongZ?.44:w,alongZ?d:.44,.81,.105,0xe5cfb8);
     piece(dx,dz,alongZ?.36:w,alongZ?d:.36,.10,.18,0xa8745d);
     const n=Math.max(2,Math.ceil((alongZ?d:w)/2.3));
     for(let j=1;j<n;j++){
      const t=j/n-.5;
      piece(dx+(alongZ?0:t*w),dz+(alongZ?t*d:0),alongZ?.45:.12,alongZ?.12:.45,.43,.85,0xa87b65);
     }
    }
   }
   const span=frontZ-rearZ;
   if(span>2){
    for(const side of [-1,1])segment(side*sideX,(rearZ+frontZ)/2,.35,span);
    segment(0,rearZ,sideX*2,.35);
    const gateHalfWidth=1.50;
    const frontSection=sideX-gateHalfWidth;
    if(frontSection>.3)for(const side of [-1,1])
     segment(side*(sideX+gateHalfWidth)/2,frontZ,frontSection,.35);
   }
  }

  if(poolSlot){
   const v=option('patio'),key='pool',px=poolSlot.x,dz=poolSlot.z;
   const water=[0x42bcd4,0x4cb8d9,0x218eb7,0x59c5ba][v];
   const edge=[0xf4e4c8,0xe5ece9,0xd9c6a2,0xf1f0e7][v];
   gardenDecor(0xded9cb,'box',px,dz,.06,6.24,.12,4.76,0,false,key);
   if(v===1||v===3){
    const ww=v===1?5.36:4.12,dd=v===1?3.36:4.12;
    gardenDecor(edge,'sphere',px,dz,.15,ww+.16,.25,dd+.16,0,false,key);
    gardenDecor(water,'sphere',px,dz,.29,ww,.08,dd,0,false,key);
    if(v===3)gardenDecor(0xf5f3e9,'box',px,dz+dd*.27,.33,1.50,.06,.32,0,false,key);
   }else{
    const ww=v===2?3.52:5.40,dd=v===2?4.30:3.80;
    gardenDecor(edge,'box',px,dz,.18,ww+.22,.28,dd+.22,0,false,key);
    gardenDecor(water,'box',px,dz,.34,ww,.06,dd,0,false,key);
    if(v===2){
     gardenDecor(0xeaf1ed,'box',px,dz,.38,.11,.015,dd*.76,0,false,key);
     gardenDecor(0xdde7e1,'box',px,dz+dd*.34,.40,ww*.62,.05,.44,0,false,key);
    }
   }
  }
  // Render the bushes reserved before all other decorations.
  for(const [dx,dz] of activeBushes){
   const [gx,gz]=local(dx,dz);
   addGardenPlant(add,plant,gx,gz,.92);
  }
 }
 if(!detailGeo.size){
  detailGeo.set('box',new THREE.BoxGeometry(1,1,1));
  detailGeo.set('sphere',new THREE.IcosahedronGeometry(.5,1));
 }
 for(const [key,arr] of placements){
  const shape=key.endsWith('_sphere')?'sphere':'box';
  const color=Number(key.split('_')[0]);
  makeCloseDetailMesh(detailGeo.get(shape),color,arr);
 }
}

// Emergency-safe, fully instanced fallback: an exception in a detailed model
// must never leave a city made only of garden fences.
function renderFallbackHouses(selected){
 const geo=new THREE.BoxGeometry(1,1,1),dummy=new THREE.Object3D();
 const batches=new Map();
 for(const h of selected){
  const tier=houseTier(h.points),fp=houseFootprint(h,tier),paint=housePaint(h);
  const levels=HOUSE_TIERS[tier].levels,height=levels*3.15;
  const key=paint.wall;
  if(!batches.has(key))batches.set(key,[]);
  batches.get(key).push({h,fp,height});
 }
 for(const [color,items] of batches){
  const mesh=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color}),items.length);
  items.forEach(({h,fp,height},i)=>{
   const a=facadeAngle(h);
   dummy.position.set(h.x+Math.sin(a)*fp.offsetZ,height/2,h.z+Math.cos(a)*fp.offsetZ);
   dummy.rotation.set(0,a,0);dummy.scale.set(fp.width,height,fp.depth);
   dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
  mesh.userData.homes=items.map(e=>e.h);group.add(mesh);houseMeshes.push(mesh);
 }
}
function rebuild(){
 if(!threeReady)return;
 roadDetailMeshes=[];lastRoadDetailUpdate=0;
 shopDetailMeshes=[];lastShopDetailUpdate=0;
 clearCloseDetails();nearDetailTier=-1;
 const previousGroup=group,previousHouseMeshes=houseMeshes;
 clearAvatarLabels();residentBatches=null;
 group=new THREE.Group();houseMeshes=[];window.v47Marker=null;window.v49Focus=null;
 const selected=homes,errors=[];
 function safe(label,fn){try{fn()}catch(err){console.error(label,err);errors.push(label+': '+err.message)}}
 safe('Strade',()=>drawRoadNetwork(selected));
 const before=group.children.length;
 safe('Edifici',()=>renderAllHouses(selected));
 if(!houseMeshes.length){
  // Remove partial meshes from the failed pass, then use basic, safe houses.
  while(group.children.length>before){group.remove(group.children[group.children.length-1]);}
  safe('Edifici di emergenza',()=>renderFallbackHouses(selected));
 }
 safe('Paesaggio regionale',()=>buildRegionalLandscape(selected));
 safe('Paesaggio',()=>addUrbanLandscaping(selected));
 safe('Piazze artistiche',()=>addSignaturePlazas(selected));
 safe('Vita urbana',()=>drawCityLife(selected));
 safe('Strutture pubbliche',()=>renderMilestones());
 safe('Persone',()=>createV4Life(selected));
 scene.add(group);
 // Near-detail failures must not undo the entire city.
 safe('Dettagli vicini',()=>updateProgressiveDetails(true));

 const shadowBounds={minX:Infinity,maxX:-Infinity,minZ:Infinity,maxZ:-Infinity,maxY:40};
 const cover=(x,z,width,depth)=>{
  shadowBounds.minX=Math.min(shadowBounds.minX,x-width/2);
  shadowBounds.maxX=Math.max(shadowBounds.maxX,x+width/2);
  shadowBounds.minZ=Math.min(shadowBounds.minZ,z-depth/2);
  shadowBounds.maxZ=Math.max(shadowBounds.maxZ,z+depth/2);
 };
 for(const home of selected){
  cover(home.x,home.z,60,60);
  shadowBounds.maxY=Math.max(shadowBounds.maxY,HOUSE_TIERS[houseTier(home.points)].levels*3.15+7);
 }
 for(const shop of shopPurchases)cover(shop.x,shop.z,54,60);
 for(const zone of publicZones()){
  const parcel=facilityBounds(zone.block);
  cover(parcel.x,parcel.z,parcel.width+12,parcel.depth+12);
 }
 if(Number.isFinite(shadowBounds.minX))group.userData.cityShadowBounds=shadowBounds;
 group.userData.pickables=group.children.filter(mesh=>mesh.userData.shops||mesh.userData.homes||mesh.userData.home||mesh.userData.publicZone||mesh.userData.neighborCity);
 const builtGroup=group,builtHouseMeshes=houseMeshes;
 group=previousGroup;
 try{disposeGroup();scene.remove(previousGroup)}catch(err){console.error('Pulizia scena',err)}
 group=builtGroup;group.name='city-geometry';houseMeshes=builtHouseMeshes;
 $('status').textContent=errors.length
  ?'Città parzialmente recuperata: '+errors.join(' | ')
  :`${currentCity.name} · ${selected.length.toLocaleString('it-IT')} case · ${shopPurchases.length.toLocaleString('it-IT')} negozi · ${publicZones().length} strutture pubbliche`;
 if(errors.length){
  let warning=document.getElementById('cityErrorNotice');
  if(!warning){warning=document.createElement('div');warning.id='cityErrorNotice';warning.style.cssText='position:fixed;left:12px;bottom:12px;z-index:99999;background:#722;color:white;padding:12px;border-radius:8px;max-width:70vw;font:13px Arial';document.body.appendChild(warning)}
  warning.textContent='v9.2.0 · '+errors.join(' | ');
 }else{document.getElementById('cityErrorNotice')?.remove()}
}
function renderMilestones(){
  const host=$('milestones');if(!host)return;
  host.replaceChildren();
  let phase=null;
  for(const step of PUBLIC_STEPS){
    if(step.phase!==phase){
      phase=step.phase;
      const heading=document.createElement('h4');heading.textContent=phase;host.appendChild(heading);
    }
    const row=document.createElement('div');
    const unlocked=count>=step.at;
    row.className='milestone '+(unlocked?'unlocked':'locked');
    const label=document.createElement('span');
    label.textContent=(unlocked?'✓ ':'○ ')+step.name;
    const threshold=document.createElement('strong');threshold.textContent=step.at.toLocaleString('it-IT')+' case';
    row.append(label,threshold);host.appendChild(row);
  }
  const stats=$('shopStats');if(stats)stats.textContent=`${shopPurchases.length.toLocaleString('it-IT')} negozi · lotti misti`;
}
function updateDensity(){/* Houses remain visible regardless of camera zoom. */}
function resolveStructureHit(hit){
 if(!hit)return null;
 const data=hit.object.userData;
 if(data.neighborCity)return {type:'neighbor',ref:data.neighborCity,distance:hit.distance};
 if(data.publicZone)return {type:'public',ref:data.publicZone,distance:hit.distance};
 if(data.shops){const ref=data.shops[hit.instanceId];if(ref)return {type:'shop',ref,distance:hit.distance};}
 const home=data.homes?.[hit.instanceId]||data.home;
 return home?{type:'home',ref:home,distance:hit.distance}:null;
}
function pick(e){
 const r=renderer.domElement.getBoundingClientRect();
 const pointer=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
 raycaster.setFromCamera(pointer,camera);
 const candidates=group.userData.pickables||houseMeshes;
 const hits=raycaster.intersectObjects(candidates.filter(mesh=>mesh.visible),false);
 const structure=hits.map(resolveStructureHit).find(Boolean);
 const click=new THREE.Vector2(e.clientX-r.left,e.clientY-r.top);
 let closest=null,best=23;
 for(const a of life.people){
  const center=new THREE.Vector3(a.g.position.x,a.g.position.y+2.2,a.g.position.z);
  const range=center.distanceTo(camera.position);
  if(range>260||structure&&range>structure.distance+1)continue;
  const projected=center.project(camera);
  if(projected.z< -1||projected.z>1)continue;
  const d=Math.hypot((projected.x+1)*r.width/2-click.x,(1-projected.y)*r.height/2-click.y);
  if(d<best){best=d;closest=a;}
 }
 if(closest){showPersonCard(closest);return;}
 let balloon=null,balloonDistance=Infinity;
 for(const b of life.balloons){
  const hit=raycaster.intersectObject(b.g,true)[0];
  if(hit&&hit.distance<balloonDistance){balloon=b;balloonDistance=hit.distance;}
 }
 if(balloon&&(!structure||balloonDistance<structure.distance)){showBalloonCard(balloon);return;}
 if(structure?.type==='neighbor'){WorldNeighbors.focus(structure.ref.id);return;}
 if(structure?.type==='public'){openPublicWorks(structure.ref);return;}
 if(structure?.type==='shop'){showShopCard(structure.ref);return;}
 if(structure?.type==='home')showCard(structure.ref);
}
function ownerForShop(shop){
 return homes.find(h=>h.id===shop.ownerId)||homes[0]||null;
}
function ownedProperties(h){
 if(!h)return [];
 const result=[{type:'casa',name:'🏠 Casa #'+String(h.id).padStart(5,'0'),x:h.x,z:h.z,ref:h}];
 for(const sh of shopPurchases)if(sh.ownerId===h.id)
  result.push({type:'negozio',name:'🏪 '+sh.business+' #'+(sh.id+1),x:sh.x,z:sh.z,ref:sh});
 for(const b of life.balloons)if(b.ownerId===h.id)
  result.push({type:'mongolfiera',name:'🎈 Mongolfiera #'+(b.i+1),x:b.g.position.x,z:b.g.position.z,ref:b});
 return result;
}
function showOwnerCard(h,kind='casa',selected=null){
 if(!h)return;
 const props=ownedProperties(h);
 const tier=HOUSE_TIERS[houseTier(h.points)];
 const name=kind==='persona'?'🧑':kind==='negozio'?'🏪':kind==='mongolfiera'?'🎈':'🏠';
 $('username').textContent=name+' @'+h.user;
 const details=$('details');details.replaceChildren();
 const info=document.createElement('div');
 const title=kind==='negozio'?selected?.business||'Negozio':kind==='mongolfiera'?'Mongolfiera':kind==='persona'?'Personaggio':'Casa';
 if(kind==='negozio'&&selected){
  const progress=shopProgressFor(selected);
  const level=houseTier(progress.points)+1;
  info.textContent=title+' · '+currentCity.name+' · Livello '+level+'/'+HOUSE_TIERS.length+
   ' · '+progress.points.toLocaleString('it-IT')+' punti · '+(progress.premium?'Premium':'Base');
 }else info.innerHTML='<b>'+title+' · '+currentCity.name+'</b><p>⭐ '+h.points.toLocaleString('it-IT')+' punti</p><p>🌿 Giardino: '+(h.points<1?'non sbloccato':GARDEN_CATALOG[0].options[housePlant(h)]+' · '+(isPremiumHouse(h)?4:2)+' piante')+'</p><p>🎨 Colore: '+housePaint(h).name+'</p><p>🏗️ '+tier.name+' · '+tier.levels+' piani</p><p>🎨 Design: '+(isPremiumHouse(h)?'Premium (abbonamento demo)':'Gratis')+'</p><p>🏠 Casa #'+String(h.id).padStart(5,'0')+'</p>';
 details.appendChild(info);
 if(kind==='negozio'&&selected){
  const progress=shopProgressFor(selected);
  const panel=document.createElement('div');panel.className='demo-house-controls';
  const heading=document.createElement('strong');heading.textContent='Evoluzione attività';
  const stage=document.createElement('select');stage.className='citySelect';
  stage.setAttribute('aria-label','Evoluzione attività');
  HOUSE_TIERS.forEach((tier,index)=>{
   const label='Livello '+(index+1)+' · '+tier.min.toLocaleString('it-IT')+' punti';
   stage.add(new Option(label,String(tier.min)));
  });
  stage.value=String(HOUSE_TIERS[houseTier(progress.points)].min);
  const premium=document.createElement('input');premium.type='checkbox';premium.checked=progress.premium;
  const label=document.createElement('label');label.append(premium,' Design Premium (demo)');
  const apply=document.createElement('button');apply.textContent='Applica evoluzione';
  apply.onclick=()=>{
   shopProgress.set(scoreOverrideKey(currentCity.id,selected.id),{points:Number(stage.value),premium:premium.checked});
   try{localStorage.setItem('sudamerica-shop-progress',JSON.stringify([...shopProgress]));}catch{}
   if(active)rebuild();
   showShopCard(selected);
  };
  panel.append(heading,stage,label,apply);
  details.appendChild(panel);
 }
 if(kind==='casa'){
  selectedDemoHouseId=h.id;
  updateDemoHouseLabel();
  const panel=document.createElement('div');panel.className='demo-house-controls';
  const headingDemo=document.createElement('strong');headingDemo.textContent='🏗️ Evoluzione di questa casa (demo)';
  const hint=document.createElement('p');hint.textContent='Scegli i punti e il design: cambia solo questa casa, senza spostare il lotto.';
  const picker=document.createElement('select');picker.className='citySelect';
  HOUSE_TIERS.forEach(t=>{
   const option=document.createElement('option');option.value=String(t.min);
   option.textContent=t.min.toLocaleString('it-IT')+' punti · '+t.name+' ('+t.levels+' piani)';
   picker.appendChild(option);
  });
  picker.value=String(HOUSE_TIERS[houseTier(h.points)].min);
  picker.onchange=()=>applyDemoHousePoints(h.id,Number(picker.value));
  const pointsRow=document.createElement('div');pointsRow.className='demo-points-row';
  const exact=document.createElement('input');exact.type='number';exact.min='0';exact.max='1000000';exact.step='1';exact.value=String(h.points);exact.setAttribute('aria-label','Punti esatti per questa casa');
  const apply=document.createElement('button');apply.textContent='Applica punti';
  apply.onclick=()=>{if(exact.value.trim()!=='')applyDemoHousePoints(h.id,Number(exact.value))};
  pointsRow.append(exact,apply);
  const designTitle=document.createElement('strong');designTitle.textContent='🎨 Design per questa evoluzione';
  const designPicker=document.createElement('select');designPicker.className='citySelect';
  [{value:'free',label:'Gratis · Casa standard'},{value:'premium',label:'Abbonamento · Casa con balconi, camino e dettagli'}].forEach(item=>{
    const opt=document.createElement('option');opt.value=item.value;opt.textContent=item.label;designPicker.appendChild(opt);
  });
  designPicker.value=isPremiumHouse(h)?'premium':'free';
  designPicker.onchange=()=>applyDemoHouseDesign(h.id,designPicker.value==='premium');
  const colorTitle=document.createElement('strong');colorTitle.textContent='🎨 Colore della casa';
  const colorPicker=document.createElement('select');colorPicker.className='citySelect';
  HOUSE_PAINTS.forEach((paint,i)=>{
   const option=document.createElement('option');
   option.value=String(i);option.textContent=paint.name+' · pareti e tetto';
   colorPicker.appendChild(option);
  });
  colorPicker.value=String(colorOverrides.get(scoreOverrideKey(h.cityId,h.id))??0);
  colorPicker.onchange=()=>applyDemoHouseColor(h.id,Number(colorPicker.value));
  const gardenProgress=document.createElement('div');gardenProgress.className='garden-unlocks';
  const gardenTitle=document.createElement('strong');
  gardenTitle.textContent='🌿 Personalizza le decorazioni · 4 modelli per sblocco';
  gardenProgress.appendChild(gardenTitle);
  for(const item of GARDEN_CATALOG){
   const wrap=document.createElement('div');wrap.className='garden-choice';
   const heading=document.createElement('label');
   heading.textContent=(h.points>=item.min&&(!item.premium||isPremiumHouse(h))?'✓ ':'🔒 ')+item.min+' punti · '+item.label+(item.premium?' · Premium':'');
   wrap.appendChild(heading);
   const choices=document.createElement('div');choices.className='garden-variant-grid';
   const icons={
    plant:['🌸','🌿','🌳','🌲'],path:['🪨','⬛','🧱','▫️'],
    flowers:['🌼','🌹','🌻','💜'],lamp:['🏮','💡','🔆','✨'],
    bench:['🧱','🍖','🍕','♨️'],mailbox:['📮','📫','🏠','📪'],
    fence:['🪵','▥','🌳','🧱'],patio:['🏊','🥚','🏊‍♂️','⭕']
   };
   item.options.forEach((name,i)=>{
    const btn=document.createElement('button');btn.type='button';
    btn.className='garden-variant'+(gardenChoice(h,item.id)===i?' chosen':'');
    btn.disabled=h.points<item.min||(item.premium&&!isPremiumHouse(h));
    const pict=document.createElement('span');pict.className='garden-variant-icon';pict.textContent=icons[item.id][i];
    const label=document.createElement('span');label.textContent=name;
    btn.append(pict,label);
    btn.title=item.label+': '+name;
    btn.onclick=()=>applyDemoGardenChoice(h.id,item.id,i);
    choices.appendChild(btn);
   });
   wrap.appendChild(choices);
   if(item.id==='plant'){
    const info=document.createElement('small');
    info.textContent=h.points<1?'Casa senza piante a 0 punti.':
     (isPremiumHouse(h)?'4 piante con Premium':'2 piante con Gratis')+' · posizioni automatiche.';
    wrap.appendChild(info);
   }
   gardenProgress.appendChild(wrap);
  }
  const designHint=document.createElement('p');designHint.textContent='Simulazione dell’abbonamento: non viene effettuato alcun pagamento.';
  panel.append(headingDemo,hint,picker,pointsRow,designTitle,designPicker,colorTitle,colorPicker,gardenProgress,designHint);
  details.appendChild(panel);
 }
 const heading=document.createElement('strong');heading.textContent='Proprietà raggiungibili ('+props.length+')';
 details.appendChild(heading);
 const nav=document.createElement('div');nav.className='property-links';
 for(const property of props){
  const btn=document.createElement('button');
  btn.textContent=property.name;
  btn.onclick=()=>{
   if(!active)enter();
   flyToWorld({x:property.x,y:0,z:property.z},{distance:property.type==='mongolfiera'?100:65,elevation:1.12});
   if(property.type==='negozio')showOwnerCard(h,'negozio',property.ref);
   else if(property.type==='mongolfiera')showOwnerCard(h,'mongolfiera',property.ref);
   else showOwnerCard(h,'casa');
  };
  nav.appendChild(btn);
 }
 details.appendChild(nav);
 $('card').style.display='block';
}
function showShopCard(shop){showOwnerCard(ownerForShop(shop),'negozio',shop)}
function showBalloonCard(balloon){showOwnerCard(homes.find(h=>h.id===balloon.ownerId)||homes[0],'mongolfiera',balloon)}
function showPersonCard(a){showOwnerCard(a.home,'persona')}
function showCard(h){showOwnerCard(h,'casa')}
function enter(){if(!active&&window.WorldRoads){WorldRoads.sync();const p=WorldRoads.cityPlan(currentCity,worldCityCells(),WorldAtlas);azimuth=0;elevation=1.12;distance=Math.min(3500,Math.max(360,(Math.max(p.bounds.maxX-p.bounds.minX,p.bounds.maxZ-p.bounds.minZ))*.85));}if(!threeReady&&!makeScene())return;active=true;document.body.classList.add("city-view");$('threeLayer').classList.add('active');$('threeLayer').style.opacity=1;map.dragging.disable();map.scrollWheelZoom.disable();rebuild();updateCamera();resize();void ensureCitySquare(currentCity)}
function back(){clearAvatarLabels();active=false;document.body.classList.remove("city-view");$('threeLayer').style.opacity=0;$('threeLayer').classList.remove('active');$('card').style.display='none';map.dragging.enable();map.scrollWheelZoom.enable();$('status').textContent='Mappa geografica · le città sono posizionate con coordinate reali'}
function onZoom(){
 const nearest=cityAtMapCenter();
 const near=nearest&&nearest.distance<50000;
 const z=map.getZoom();
 if(z>=11&&near){
  if(!manualCityNavigation&&nearest.city.id!==currentCity.id)selectCity(nearest.city.id,false);
  if(!active){distance=115;enter()}else updateCamera();
 }else if(active)back();
}
function setCount(n){
 count=n;syncPopulationControls();cityStates.get(currentCity.id).count=n;
 homes=createHomes(n);
 $('counter').textContent=n.toLocaleString('it-IT');
 $('v4Population').textContent=n.toLocaleString('it-IT');
 updateCitySelection();
 if(selectedDemoHouseId>n)selectedDemoHouseId=1;
 updateDemoHouseLabel();
 if(active)rebuild();else renderMilestones();
}
let selectedDemoHouseId=1;
const scoreSelect=$('demoScore');
function updateDemoHouseLabel(){
 const h=homes.find(item=>item.id===selectedDemoHouseId)||homes[0];
 if(!h)return;
 selectedDemoHouseId=h.id;
 const label=$('demoHouseLabel');
 if(label)label.textContent=`🏠 Casa #${String(h.id).padStart(5,'0')} · @${h.user}`;
 if(scoreSelect)scoreSelect.value=String(HOUSE_TIERS[houseTier(h.points)].min);
}
function applyDemoGardenChoice(houseId,category,variant){
 const h=homes.find(item=>item.id===houseId);
 const entry=GARDEN_CATALOG.find(item=>item.id===category);
 if(!h||!entry||h.points<entry.min||(entry.premium&&!isPremiumHouse(h))||!Number.isInteger(variant)||variant<0||variant>=4)return;
 gardenChoices.set(scoreOverrideKey(currentCity.id,h.id)+':'+category,variant);
 selectedDemoHouseId=h.id;
 if(active){if(category==='bench'||category==='patio')rebuild();else updateProgressiveDetails(true);}
 $('status').textContent='Casa #'+h.id+' · '+entry.label+': '+entry.options[variant];
 showOwnerCard(h,'casa');
}
function applyDemoHouseColor(houseId,colorIndex){
 const h=homes.find(item=>item.id===houseId);
 if(!h||!Number.isInteger(colorIndex)||!HOUSE_PAINTS[colorIndex])return;
 colorOverrides.set(scoreOverrideKey(currentCity.id,h.id),colorIndex);
 selectedDemoHouseId=h.id;
 if(active)rebuild();
 $('status').textContent=`Casa #${h.id} · colore ${HOUSE_PAINTS[colorIndex].name}`;
 showOwnerCard(h,'casa');
}
function applyDemoHouseDesign(houseId,premium){
 const h=homes.find(item=>item.id===houseId);
 if(!h)return;
 designOverrides.set(scoreOverrideKey(currentCity.id,h.id),Boolean(premium));
 selectedDemoHouseId=h.id;
 if(active)rebuild();
 $('status').textContent=`Casa #${h.id} · ${premium?'Design Premium (demo abbonamento)':'Design Gratis'}`;
 showOwnerCard(h,'casa');
}
function applyDemoHousePoints(houseId,points){
 const h=homes.find(item=>item.id===houseId);
 if(!h||!Number.isFinite(points))return;
 const safePoints=Math.max(0,Math.floor(points));
 selectedDemoHouseId=h.id;
 scoreOverrides.set(scoreOverrideKey(currentCity.id,h.id),safePoints);
 h.points=safePoints;
 updateDemoHouseLabel();
 if(active)rebuild();
 $('status').textContent=`Demo @${h.user} · Casa #${h.id} · ${safePoints.toLocaleString('it-IT')} punti · ${HOUSE_TIERS[houseTier(safePoints)].name}`;
 showOwnerCard(h,'casa');
}
if(scoreSelect)scoreSelect.onchange=()=>applyDemoHousePoints(selectedDemoHouseId,Number(scoreSelect.value));
updateDemoHouseLabel();
function syncPopulationControls(){
 const slider=$('populationSlider'),exact=$('populationExact'),label=$('populationValue');
 if(slider)slider.value=String(count);
 if(exact)exact.value=String(count);
 if(label)label.textContent=count.toLocaleString('it-IT');
}
function validPopulation(value){
 const n=Number(value);
 return Number.isFinite(n)?Math.max(1,Math.min(5000,Math.round(n))):count;
}
$('populationSlider').addEventListener('input',()=>{
 const n=validPopulation($('populationSlider').value);
 $('populationExact').value=String(n);
 $('populationValue').textContent=n.toLocaleString('it-IT');
});
$('populationSlider').addEventListener('change',()=>setCount(validPopulation($('populationSlider').value)));
$('applyPopulation').onclick=()=>setCount(validPopulation($('populationExact').value));
$('populationExact').addEventListener('keydown',event=>{if(event.key==='Enter')$('applyPopulation').click()});
syncPopulationControls();
$('go').onclick=()=>map.flyTo([currentCity.lat,currentCity.lng],12,{duration:1.1});
$('enter').onclick=()=>{map.setView([currentCity.lat,currentCity.lng],12);enter()};
$('back').onclick=()=>{back();map.setView([currentCity.lat,currentCity.lng],9)};
$('close').onclick=()=>{$('card').style.display='none'};
$('find').onclick=()=>{
 let q=$('search').value.trim().replace(/^@/,'').toLowerCase();
 const comment=simulatedComments.find(entry=>entry.user===q);
 if(comment&&currentCity.id!==comment.cityId)selectCity(comment.cityId);
 let h=homes.find(x=>x.user.toLowerCase()===q);
 if(!h){$('status').textContent='Utente non presente in '+currentCity.name;return}
 map.setView([currentCity.lat,currentCity.lng],13);
 enter();flyToWorld(h,{distance:62,elevation:1.05});showCard(h);
};
for(const option of $('demoScore').options){
 const tier=HOUSE_TIERS.find(entry=>entry.min===Number(option.value));
 if(tier)option.textContent=tier.min.toLocaleString('it-IT')+' punti · '+tier.name+' ('+tier.levels+(tier.levels===1?' piano)':' piani)');
}
const citySelect=$('citySelect');
if(citySelect)citySelect.onchange=()=>selectCity(citySelect.value,true);
map.on('zoomend moveend',onZoom);
setCount(currentCity.pop);
updateCitySelection();
const panButton=$('panMode'),orbitButton=$('orbitMode'),overviewButton=$('overview');
function syncMode(){if(panButton)panButton.classList.toggle('selected',panMode);if(orbitButton)orbitButton.classList.toggle('selected',!panMode);}
if(panButton)panButton.onclick=()=>{panMode=true;syncMode()};
if(orbitButton)orbitButton.onclick=()=>{panMode=false;syncMode()};
if(overviewButton)overviewButton.onclick=()=>{
  flyToWorld({x:0,y:0,z:0},{distance:850,azimuth:.72,elevation:1.1});
};
syncMode();

// Demo: an unbounded number of commercial purchases, with stable plot IDs.
const demoShopButton=$('demoShop');
function buyDemoShops(amount=1){
  let last=null;
  for(let i=0;i<amount;i++){
    last=shopLot(shopPurchases.length);
    shopPurchases.push(last);
  }
  cityStates.get(currentCity.id).shops=shopPurchases.length;
  renderMilestones();
  if(active){
    rebuild();
    if(last){target.x=last.x;target.z=last.z;distance=125;updateCamera()}
  }else renderMilestones();
}
if(demoShopButton)demoShopButton.onclick=()=>buyDemoShops(1);
const bulkShopButton=$('bulkShops');if(bulkShopButton)bulkShopButton.onclick=()=>buyDemoShops(100);
const clearShopButton=$('clearShops');if(clearShopButton)clearShopButton.onclick=()=>{
  shopPurchases.length=0;
  cityStates.get(currentCity.id).shops=0;
  renderMilestones();
  if(active)rebuild();
};

// V4.0: local prototype of a social 3D city. No real payment or account backend.
const v4={skin:'#e8ae86',shirt:'#39a9a5',balloons:0,motion:true};
try{Object.assign(v4,JSON.parse(localStorage.getItem('sudamerica-v4')||'{}'))}catch(e){}
// Movement is on by default in this release, even if an older demo saved it off.
v4.motion=true;
const life={people:[],birds:[],balloons:[]};
// Seed the selected city with its own demo shops and balloons.
for(let i=0;i<cityStates.get(currentCity.id).shops;i++)shopPurchases.push(shopLot(i));
v4.balloons=cityStates.get(currentCity.id).balloons;
renderMilestones();

function saveV4(){try{localStorage.setItem('sudamerica-v4',JSON.stringify(v4))}catch(e){}}
function v4Mesh(geo,color,parent,x=0,y=0,z=0){const m=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({color}));m.position.set(x,y,z);parent.add(m);return m}
// v4.5: animation assets use deterministic city-wide ownership coordinates.
// Rebuilding never piles objects on the same house or changes their identity.
function spreadIndex(i,n,length){
  return Math.min(length-1,Math.floor((i+.5)*length/n));
}
// Thousands of residents are rendered in just four GPU draw calls.
// Each resident retains a unique selectable position and ownership record.
const RESIDENT_SCALE=.90;
let residentBatches=null;

function buildResidentBatches(people){
 const n=people.length;if(!n)return;
 const specs=[
  {name:'torso',geo:new THREE.CylinderGeometry(.43,.52,1.25,7),y:1.12},
  {name:'head',geo:new THREE.SphereGeometry(.44,9,7),y:1.95},
  {name:'hair',geo:new THREE.SphereGeometry(.39,8,5,0,Math.PI*2,0,Math.PI*.46),y:2.08},
  {name:'legs',geo:new THREE.CylinderGeometry(.11,.09,.69,6),y:.39,pair:true,lateral:.19,stride:1},
  {name:'arms',geo:new THREE.CapsuleGeometry(.082,.42,2,5),y:1.10,pair:true,lateral:.43,stride:-.74},
  {name:'shoes',geo:new THREE.BoxGeometry(.22,.14,.35),y:.095,pair:true,lateral:.19,stride:1}
 ];
 const meshes=specs.map(spec=>{
  const mesh=new THREE.InstancedMesh(spec.geo,new THREE.MeshLambertMaterial({color:0xffffff}),n*(spec.pair?2:1));
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled=false;
  group.add(mesh);
  return mesh;
 });
 const dummy=new THREE.Object3D();
 residentBatches={meshes,specs,dummy,people};
 const skin=['#e4b28e','#b47d5e','#f1c9a2','#d99a78'];
 const shirt=['#e9867c','#75b4cf','#edbf69','#9b8ac5','#75b67b'];
 const hair=[0x5e4238,0x9a704c,0x33343c];
 const legColor=new THREE.Color(0x586b82);
 for(let i=0;i<n;i++){
  meshes[0].setColorAt(i,new THREE.Color(i===0?v4.shirt:shirt[i%5]));
  meshes[1].setColorAt(i,new THREE.Color(i===0?v4.skin:skin[i%4]));
  meshes[2].setColorAt(i,new THREE.Color(hair[i%3]));
  meshes[3].setColorAt(2*i,legColor);meshes[3].setColorAt(2*i+1,legColor);
  const armColor=new THREE.Color(i===0?v4.skin:skin[i%4]);
  const shoeColor=new THREE.Color(i%2?0x39363b:0x645141);
  for(let side=0;side<2;side++){
   meshes[4].setColorAt(i*2+side,armColor);
   meshes[5].setColorAt(i*2+side,shoeColor);
  }
  updateResidentMatrix(i);
 }
 for(const mesh of meshes){mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;}
}
function updateResidentMatrix(i){
 if(!residentBatches)return;
 const {people,meshes,specs,dummy}=residentBatches;
 const a=people[i];const pos=a.g.position;
 const c=Math.cos(a.g.rotation.y),si=Math.sin(a.g.rotation.y);
 for(let j=0;j<specs.length;j++){
  const spec=specs[j],mesh=meshes[j];
  const copies=spec.pair?2:1;
  for(let k=0;k<copies;k++){
   const side=k===0?-1:1;
   const xx=spec.pair?side*spec.lateral:0;
   const swing=(a.gait||0)*side*(spec.stride||0);
   const zz=swing*.19+(spec.name==='shoes'?-.07:0);
   dummy.position.set(pos.x+(xx*c+zz*si)*RESIDENT_SCALE,
    pos.y+(spec.y+(spec.name==='shoes'?Math.max(0,swing)*.07:0))*RESIDENT_SCALE,
    pos.z+(zz*c-xx*si)*RESIDENT_SCALE);
   dummy.rotation.set(swing*.38,a.g.rotation.y,0,'YXZ');
   dummy.scale.setScalar(RESIDENT_SCALE);dummy.updateMatrix();
   mesh.setMatrixAt(i*copies+k,dummy.matrix);
  }
 }
}
// Every avatar follows the walkable ring inside its own parcel.
// The inner building footprint is a forbidden zone, at every evolution tier.
function residentWalkPoint(a,t){
 const b=a.bounds, margin=.95;
 if(!residentBatches){
   const walkwayZ=b.bottom-1.75;
   const width=Math.max(2,b.right-b.left-3.0);
   const u=(a.phase*2+t*(a.mode===0?0:.28))%width;
   const direction=Math.floor((a.phase*2+t*(a.mode===0?0:.28))/width)%2;
   return {x:direction?b.right-1.5-u:b.left+1.5+u,
           z:walkwayZ,angle:direction?-Math.PI/2:Math.PI/2};
 }
 const left=b.left+margin,right=b.right-margin;
 const top=b.top+margin,bottom=b.bottom-margin;
 const w=Math.max(.5,right-left),d=Math.max(.5,bottom-top);
 const perimeter=2*(w+d);
 const speed=a.mode===0?0:a.mode===1?.14:a.mode===2?.27:.42;
 let u=((a.phase*8+t*speed*3.5)%perimeter+perimeter)%perimeter;
 if(u<w)return {x:left+u,z:top,angle:Math.PI/2};
 u-=w;if(u<d)return {x:right,z:top+u,angle:0};
 u-=d;if(u<w)return {x:right-u,z:bottom,angle:-Math.PI/2};
 u-=w;return {x:left,z:bottom-u,angle:Math.PI};
}
function v45Avatar(h,i){
 const g=new THREE.Object3D();
 const parcel=plotBounds(h.blockIndex,h.slot);
 const mode=i%7;
 const a={g,i,home:h,mode,bounds:parcel,phase:rnd(i*13+9)*6.28};
 const pt=residentWalkPoint(a,0);
 g.position.set(pt.x,0,pt.z);g.rotation.y=pt.angle;
 a.x=pt.x;a.z=pt.z;
 return a;
}
function v45Bird(i,x,z,phase){
 const g=new THREE.Group(),feather=i%5===0?0xe3e9ef:0xfff8e9;
 const body=v4Mesh(new THREE.SphereGeometry(.56,10,8),feather,g,0,0,0);body.scale.set(.72,.52,1.45);
 v4Mesh(new THREE.SphereGeometry(.29,9,7),feather,g,0,.14,-.7);
 const beak=v4Mesh(new THREE.ConeGeometry(.13,.53,6),0xe9b350,g,0,.08,-1.09);beak.rotation.x=Math.PI/2;
 for(const xx of [-.16,.16])v4Mesh(new THREE.SphereGeometry(.045,5,4),0x273c4b,g,xx,.22,-.9);
 const tail=v4Mesh(new THREE.ConeGeometry(.32,.65,3),feather,g,0,.04,1.02);tail.rotation.x=Math.PI/2;
 const wings=[];
 for(const side of [-1,1]){
  const pivot=new THREE.Group();pivot.position.set(side*.32,.06,0);g.add(pivot);
  const wing=v4Mesh(new THREE.BoxGeometry(1.8,.10,.57),feather,pivot,side*.88,0,.03);
  wing.rotation.y=side*.16;wings.push({pivot,side});
 }
 const rx=22+rnd(i*9+4)*22,rz=18+rnd(i*5+8)*20;
 g.position.set(x,24+i%6*3,z);group.add(g);
 return {g,x,z,i,wings,phase,rx,rz};
}
function v45Balloon(i,home){
 const g=new THREE.Group();
 const palette=[0xf33751,0xffae28,0xffd15b,0x2d8bd4,0xe84fa3];
 const envelope=v4Mesh(new THREE.SphereGeometry(3.3,32,18),palette[i%palette.length],g,0,0,0);
 envelope.scale.set(1,1.27,1);
 // Vertical colored gores, a crown, burner, basket and suspension cables.
 for(let k=0;k<10;k++){
  const theta=k*Math.PI/5;
  const stripe=v4Mesh(new THREE.SphereGeometry(3.34,6,18,theta,.61,0,Math.PI),palette[(i+k+1)%palette.length],g,0,0,0);
  stripe.scale.y=1.275;
 }
 v4Mesh(new THREE.CylinderGeometry(.8,1.35,1.2,10),0xf5dca8,g,0,-4.15,0);
 v4Mesh(new THREE.BoxGeometry(1.8,1.35,1.6),0x957453,g,0,-6.2,0);
 for(const xx of [-.72,.72])for(const zz of [-.62,.62]){
  const cable=v4Mesh(new THREE.CylinderGeometry(.04,.04,2.9,4),0x66503f,g,xx,-4.9,zz);
 }
 // Distribute balloons over different city blocks, never vertically stack them.
 const offsetX=(rnd(i*37+5)-.5)*45;
 const offsetZ=(rnd(i*71+3)-.5)*40;
 const x=i===0?-23:home.x+offsetX,z=i===0?-86:home.z+offsetZ;
 if(i===0)g.scale.setScalar(1.72);
 g.position.set(x,i===0?36:48+(i%4)*6,z);group.add(g);
 return {g,i,ownerId:home.id,baseY:g.position.y,x,z};
}
const BIRD_BOB=.9, BALLOON_BOB=2, BALLOON_SWAY_X=5, BALLOON_SWAY_Z=4;
// Flight paths use a fixed safe altitude for the entire orbit.
function flightClearance(group){
 const cellSize=24, heights=new Map();
 const bounds=new THREE.Box3(), world=new THREE.Matrix4(), instance=new THREE.Matrix4();
 group.updateMatrixWorld(true);
 function record(){
  if(bounds.max.y<=12)return;
  for(let x=Math.floor(bounds.min.x/cellSize);x<=Math.floor(bounds.max.x/cellSize);x++){
   for(let z=Math.floor(bounds.min.z/cellSize);z<=Math.floor(bounds.max.z/cellSize);z++){
    const key=x+','+z;
    heights.set(key,Math.max(heights.get(key)||0,bounds.max.y));
   }
  }
 }
 group.traverse(mesh=>{
  if(!mesh.isMesh)return;
  const geometry=mesh.geometry;
  if(!geometry.boundingBox)geometry.computeBoundingBox();
  if(mesh.isInstancedMesh){
   if(!mesh.boundingBox)mesh.computeBoundingBox();
   bounds.copy(mesh.boundingBox).applyMatrix4(mesh.matrixWorld);
   if(bounds.max.y<=12)return;
   for(let i=0;i<mesh.count;i++){
    mesh.getMatrixAt(i,instance);
    world.multiplyMatrices(mesh.matrixWorld,instance);
    bounds.copy(geometry.boundingBox).applyMatrix4(world);
    record();
   }
  }else{
   bounds.copy(geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
   record();
  }
 });
 return (x,z,rx,rz)=>{
  let height=0;
  for(let i=Math.floor((x-rx)/cellSize);i<=Math.floor((x+rx)/cellSize);i++){
   for(let j=Math.floor((z-rz)/cellSize);j<=Math.floor((z+rz)/cellSize);j++){
    height=Math.max(height,heights.get(i+','+j)||0);
   }
  }
  return height;
 };
}
function createV4Life(selected){
 life.people.length=0;life.birds.length=0;life.balloons.length=0;residentBatches=null;
 if(!selected.length)return;
 const clearance=flightClearance(group);
 // A sampled owner is visible in every district; the first user's avatar
 // always exists even when there is only one house.
 const peopleCount=selected.length;
 for(let i=0;i<peopleCount;i++){
  const h=selected[spreadIndex(i,peopleCount,selected.length)];
  life.people.push(v45Avatar(h,i));
 }
 buildResidentBatches(life.people);
 // Bird populations are scattered over the FULL settled city. Small flocks
 // fly near distinct houses, not hundreds orbiting the first block.
 // One small flock per 12 occupied houses: one house -> one flock,
 // 120 houses -> ten flocks, 5,000 houses -> at most 120 flocks.
 // Cap total meshes for performance without crowding a tiny settlement.
 const flockCount=Math.min(120,Math.max(1,Math.ceil(selected.length/12)));
 for(let flock=0;flock<flockCount;flock++){
  const h=selected[spreadIndex(flock,flockCount,selected.length)];
  const birdsInFlock=3+(flock%3);
  const centerX=h.x+(rnd(flock*29+7)-.5)*35;
  const centerZ=h.z+(rnd(flock*19+11)-.5)*32;
  const phase=rnd(flock*31+4)*Math.PI*2;
  for(let j=0;j<birdsInFlock;j++){
   const i=flock*5+j;
   const bird=v45Bird(i,centerX+(j-2)*5,centerZ+(j%2?4:-4),phase+j*.09);
   bird.altitude=Math.max(22+bird.i%6*3,clearance(bird.x,bird.z,bird.rx+3,bird.rz+3)+BIRD_BOB+3.1);
   bird.g.position.y=bird.altitude;
   life.birds.push(bird);
  }
 }
 // Use evenly distributed owners, never selected[i] (which stacks them
 // over the first houses of a spiral-growing city).
 const balloonCount=Math.min(20,v4.balloons);
 for(let i=0;i<balloonCount;i++){
  const h=selected[spreadIndex(i,balloonCount,selected.length)];
  const balloon=v45Balloon(i,h);
  const scale=balloon.g.scale.x;
  balloon.baseY=Math.max(balloon.baseY,clearance(balloon.x,balloon.z,BALLOON_SWAY_X+4*scale,BALLOON_SWAY_Z+4*scale)+7*scale+BALLOON_BOB+1);
  balloon.g.position.y=balloon.baseY;
  life.balloons.push(balloon);
 }
}
// Only create name labels near the camera. Faraway residents remain visible
// but do not spawn thousands of text textures or cover the whole city.
const avatarLabels=new Map();
let lastLabelUpdate=0;
function makeAvatarLabel(name){
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=192;
 const ctx=canvas.getContext('2d');
 ctx.fillStyle='rgba(8,27,42,.96)';ctx.beginPath();ctx.roundRect(8,8,1008,176,30);ctx.fill();
 ctx.strokeStyle='#d3e8ec';ctx.lineWidth=5;ctx.stroke();
 const text='@'+name;let font=84;ctx.font='bold '+font+'px Arial';
 if(ctx.measureText(text).width>944){font=Math.floor(font*944/ctx.measureText(text).width);ctx.font='bold '+font+'px Arial';}
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ffffff';ctx.fillText(text,512,98);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const material=new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:true,depthWrite:false,toneMapped:false});
 const sprite=new THREE.Sprite(material);sprite.userData.isAvatarLabel=true;group.add(sprite);return sprite;
}
function sizeAvatarLabel(label){
 const height=renderer.domElement.clientHeight||renderer.domElement.getBoundingClientRect().height||720;
 const cameraDepth=new THREE.Vector3().copy(label.position).applyMatrix4(camera.matrixWorldInverse);
 const worldHeight=2*Math.max(.1,-cameraDepth.z)*Math.tan(THREE.MathUtils.degToRad(camera.fov)/2)*34/height;
 label.scale.set(worldHeight*1024/192,worldHeight,1);
}
function clearAvatarLabels(){
 for(const sprite of avatarLabels.values()){
  sprite.parent?.remove(sprite);sprite.material.map.dispose();sprite.material.dispose();
 }
 avatarLabels.clear();
}
function updateAvatarLabels(t){
 if(!active||!camera||t-lastLabelUpdate<.25)return;
 lastLabelUpdate=t;
 // Labels appear only when sufficiently close to street level.
 if(distance>115){clearAvatarLabels();return;}
 const frustum=new THREE.Frustum();const matrix=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
 frustum.setFromProjectionMatrix(matrix);
 const near=[];
 for(const a of life.people){
  const pos=a.g.position;
  const dist=pos.distanceTo(camera.position);
  if(dist<125&&frustum.containsPoint(new THREE.Vector3(pos.x,pos.y+3.8,pos.z)))near.push({a,dist});
 }
 near.sort((a,b)=>a.dist-b.dist);
 const labelRects=[],chosen=[],view=renderer.domElement.getBoundingClientRect();
 for(const item of near){
  const p=new THREE.Vector3(item.a.g.position.x,item.a.g.position.y+4,item.a.g.position.z).project(camera);
  const x=(p.x+1)*view.width/2,y=(1-p.y)*view.height/2;
  const rect={left:x-94,right:x+94,top:y-21,bottom:y+21};
  if(rect.left<0||rect.right>view.width||rect.top<0||rect.bottom>view.height)continue;
  if(labelRects.some(r=>rect.left<r.right&&rect.right>r.left&&rect.top<r.bottom&&rect.bottom>r.top))continue;
  labelRects.push(rect);chosen.push(item);if(chosen.length>=28)break;
 }
 const visible=new Set(chosen.map(v=>v.a.home.id));
 for(const [id,sprite] of avatarLabels)if(!visible.has(id)){
  sprite.parent?.remove(sprite);sprite.material.map.dispose();sprite.material.dispose();avatarLabels.delete(id);
 }
 for(const {a} of chosen){
  const id=a.home.id;
  let label=avatarLabels.get(id);
  if(!label){label=makeAvatarLabel(a.home.user);avatarLabels.set(id,label);}
  label.position.set(a.g.position.x,a.g.position.y+4,a.g.position.z);sizeAvatarLabel(label);
 }
}
let lastPeopleTick=0;
function animateLife(t){if(!active||!v4.motion)return;
 const walkPhase=t*7.2;
 // At 5,000 residents, update only the nearest 160 residents at ~12 FPS.
 // Everyone else remains visible and selectable in their current position.
 if(t-lastPeopleTick>.085){
  lastPeopleTick=t;
  const near=[];
  const cam=camera.position;
  for(const a of life.people){
   const dx=a.g.position.x-cam.x,dz=a.g.position.z-cam.z;
   const d2=dx*dx+dz*dz;
   if(d2<230*230)near.push({a,d2});
  }
  near.sort((a,b)=>a.d2-b.d2);
  for(const {a} of near.slice(0,160)){
   const pt=residentWalkPoint(a,t);
   a.g.position.x=pt.x;
   a.g.position.z=pt.z;
   a.g.rotation.y=pt.angle;
   a.g.position.y=a.mode===0?0:Math.abs(Math.sin(t*3+a.i))*.07;
   a.gait=a.mode===0?0:Math.sin(walkPhase+a.phase);
   updateResidentMatrix(a.i);
   const label=avatarLabels.get(a.home.id);
   if(label){label.position.set(a.g.position.x,a.g.position.y+4,a.g.position.z);sizeAvatarLabel(label);}
  }
  if(residentBatches)for(const mesh of residentBatches.meshes)mesh.instanceMatrix.needsUpdate=true;
  if(window.v49Focus){
   const {group:marker,person}=window.v49Focus;
   marker.position.set(person.g.position.x,0,person.g.position.z);
  }
 }
 for(const b of life.birds){
  const ang=t*.21+b.phase;
  const vx=Math.cos(ang)*b.rx*.21,vz=-Math.sin(ang)*b.rz*.21;
  b.g.position.x=b.x+Math.sin(ang)*b.rx;
  b.g.position.z=b.z+Math.cos(ang)*b.rz;
  b.g.position.y=b.altitude+Math.sin(t*1.6+b.i)*BIRD_BOB;
  b.g.rotation.set(0,Math.atan2(-vx,-vz),Math.sin(ang)*.08);
  for(const wing of b.wings)wing.pivot.rotation.z=wing.side*(.05+Math.sin(t*4.7+b.i)*.32);
 }
 for(const b of life.balloons){
  b.g.position.y=b.baseY+Math.sin(t*.45+b.i)*BALLOON_BOB;
  b.g.position.x=b.x+Math.sin(t*.13+b.i)*BALLOON_SWAY_X;
  b.g.position.z=b.z+Math.cos(t*.11+b.i)*BALLOON_SWAY_Z;
  b.g.rotation.y=t*.08;
 }
}
function publicStepStatus(step){return {unlocked:count>=step.at,remaining:Math.max(0,step.at-count)};}
function openSquareDetailPanel(){
 const panel=$('v4Panel'),body=$('v4Body'),profile=citySquareProfile(currentCity);panel.hidden=false;$('v4Title').textContent=profile.name;body.replaceChildren();
 const intro=document.createElement('p');intro.textContent='Ricostruzione 3D stilizzata: la planimetria e gli elementi documentati sono affiancati da arredi di integrazione.';body.append(intro);
 const features=profile.landmarks||[];
 if(!features.length){const empty=document.createElement('p');empty.textContent='Le fonti disponibili non descrivono ancora statue e fontane di questa piazza.';body.append(empty);}
 for(const feature of features){
  const row=document.createElement('div');row.className='civicObjective '+(feature.status==='needs-model'?'pending':'documented');
  const name=document.createElement('strong');name.textContent=feature.name;
  const state=document.createElement('span');state.textContent=feature.status==='needs-model'?'Presenza mappata · forma 3D da completare':feature.status==='reference-model'?'Riferimento documentato · modello 3D stilizzato':'Tipologia mappata · modello 3D da verificare nei dettagli';row.append(name,state);
  if(feature.description){const description=document.createElement('p');description.textContent=feature.description;row.append(description);}
  if(feature.evidence){const evidence=document.createElement('small');evidence.textContent='Posizione: '+(feature.evidence.position==='mapped-point'?'cartografia':feature.evidence.position)+' · orientamento e dettagli fini ancora da verificare';row.append(evidence);}
  const url=feature.reference||feature.source;
  if(url&&/^https:\/\/(www\.)?(respira\.cordoba\.gob\.ar|prensa\.municipalidadsalta\.gob\.ar|tucumanturismo\.gob\.ar|openstreetmap\.org|buenosaires\.gob\.ar|turismomardelplata\.gob\.ar|syv\.web\.unq\.edu\.ar|target2\.promperu\.gob\.pe|montevideo\.gub\.uy|quito-turismo\.gob\.ec|idpc\.gov\.co|santiagoturismo\.cl)\//.test(url)){const source=document.createElement('a');source.href=url;source.target='_blank';source.rel='noopener';source.textContent='Fonte';row.append(source);}
  body.append(row);
 }
 const back=document.createElement('button');back.textContent='Torna agli obiettivi';back.onclick=()=>openPublicWorks();body.append(back);
}
function openPublicWorks(selected=null){
 const panel=$('v4Panel'),body=$('v4Body');panel.hidden=false;$('v4Title').textContent=selected?.name||'Strutture e obiettivi';body.replaceChildren();
 const summary=document.createElement('p');summary.textContent=currentCity.name+' · '+count.toLocaleString('it-IT')+' case · '+PUBLIC_STEPS.filter(s=>publicStepStatus(s).unlocked).length+'/'+PUBLIC_STEPS.length+' obiettivi raggiunti';body.append(summary);
 if(!selected||selected.kind==='park'){
  const details=document.createElement('button');details.textContent='Statue, fontane e dettagli della piazza';details.onclick=openSquareDetailPanel;body.append(details);
 }
 const search=document.createElement('input');search.type='search';search.placeholder='Cerca una struttura…';search.setAttribute('aria-label','Cerca strutture pubbliche');body.append(search);
 const list=document.createElement('div');body.append(list);
 const render=()=>{
  list.replaceChildren();let phase='';const zones=publicZones(),query=search.value.trim().toLocaleLowerCase('it');
  for(const step of PUBLIC_STEPS){
   if(query&&!step.name.toLocaleLowerCase('it').includes(query))continue;
   if(step.phase!==phase){phase=step.phase;const h=document.createElement('h3');h.textContent=phase;list.append(h);}
   const state=publicStepStatus(step),row=document.createElement('div');row.className='civicObjective '+(state.unlocked?'achieved':'pending');
   if(selected?.kind===step.kind)row.classList.add('current');
   const title=document.createElement('strong');title.textContent=(state.unlocked?'✓ ':'🔒 ')+step.name;
   const detail=document.createElement('span');detail.textContent=step.at.toLocaleString('it-IT')+' case · '+(state.unlocked?'Raggiunto':state.remaining.toLocaleString('it-IT')+' case mancanti');
   const progress=document.createElement('progress');progress.max=Math.max(1,step.at);progress.value=step.at?Math.min(count,step.at):1;progress.setAttribute('aria-label',step.name);
   row.append(title,detail,progress);
   const available=zones.filter(z=>z.kind===step.kind);
   for(const zone of available){const button=document.createElement('button');button.textContent='📍 Trova '+zone.name;
    button.onclick=()=>{const b=facilityBounds(zone.block);flyToWorld({x:b.x,y:4,z:b.z},{distance:120,elevation:1.0});panel.hidden=true;$('status').textContent=zone.name;};row.append(button);}
   list.append(row);
  }
  if(!list.children.length){const empty=document.createElement('p');empty.textContent='Nessuna struttura trovata.';list.append(empty);}
 };
 search.oninput=render;render();
}
function openCityDirectory(){
 const panel=$('v4Panel'),body=$('v4Body');panel.hidden=false;$('v4Title').textContent='Trova nella città';body.replaceChildren();
 const search=document.createElement('input');search.type='search';search.placeholder='Nome, nickname o numero…';search.setAttribute('aria-label','Cerca edifici');
 const type=document.createElement('select');for(const [value,label] of [['all','Tutti gli edifici'],['public','Strutture pubbliche'],['shop','Attività'],['home','Case']]){const opt=document.createElement('option');opt.value=value;opt.textContent=label;type.append(opt);}
 const list=document.createElement('div'),info=document.createElement('p'),more=document.createElement('button');more.textContent='Mostra altri risultati';body.append(search,type,info,list,more);
 const records=[...publicZones().map(zone=>({type:'public',name:zone.name,ref:zone})),...shopPurchases.map(shop=>({type:'shop',name:shop.business+' #'+(shop.id+1)+' · @'+(ownerForShop(shop)?.user||''),ref:shop})),...homes.map(home=>({type:'home',name:'Casa #'+home.id+' · @'+home.user,ref:home}))];
 let limit=60;
 const render=()=>{list.replaceChildren();const q=search.value.trim().toLocaleLowerCase('it');const matching=records.filter(record=>(type.value==='all'||record.type===type.value)&&(!q||record.name.toLocaleLowerCase('it').includes(q)));
  info.textContent=matching.length+' risultati';for(const record of matching.slice(0,limit)){
   const row=document.createElement('div');row.className='civicObjective achieved';const label=document.createElement('strong');label.textContent=record.name;
   const button=document.createElement('button');button.textContent='📍 Raggiungi e apri';button.onclick=()=>{
    if(!active)enter();
    const ref=record.ref,b=record.type==='public'?facilityBounds(ref.block):ref;
    const height=record.type==='home'?HOUSE_TIERS[houseTier(ref.points)].levels*3.15:5;
    flyToWorld({x:b.x,y:Math.max(3,height*.4),z:b.z},{distance:record.type==='public'?120:Math.max(65,height*1.8),elevation:1});
    if(record.type==='public')openPublicWorks(ref);else{panel.hidden=true;if(record.type==='shop')showShopCard(ref);else showCard(ref);}
   };row.append(label,button);list.append(row);
  }
  more.hidden=matching.length<=limit;
 };
 search.oninput=type.onchange=()=>{limit=60;render();};more.onclick=()=>{limit+=60;render();};render();
}

function openV4(tab){
 if(tab==='works'){openPublicWorks();return;}
 if(tab==='directory'){openCityDirectory();return;}
 const panel=$('v4Panel'),body=$('v4Body');panel.hidden=false;
 const titles={shop:'Tienda',home:'La mia casa',avatar:'Il mio personaggio',world:'Mondo',ranking:'Ranking',works:'Obras'};
 $('v4Title').textContent=titles[tab];
 if(tab==='shop')body.innerHTML=`<p>Acquisti dimostrativi: nessun pagamento reale.</p><button id="v4Shop">🏪 Aggiungi negozio</button><button id="v4Balloon">🎈 Aggiungi mongolfiera</button><p>${v4.balloons} mongolfiere</p>`;
 if(tab==='home')body.innerHTML=`<p>Nella demo la prima casa appartiene a @${homes[0]?.user||'pioniere'}. Non è ancora presente un sistema di accesso personale.</p><button id="v4FindHome">📍 Vai alla mia casa</button><p class="v4Note">La personalizzazione della facciata sarà ampliata nelle prossime versioni.</p>`;
 if(tab==='avatar')body.innerHTML=`<p>Un personaggio gratuito per ogni casa. In questa demo puoi individuare il personaggio di @${homes[0]?.user||'pioniere'}.</p><label>Colore della pelle <input type="color" id="v4Skin" value="${v4.skin}"></label><label>Vestiti <input type="color" id="v4Shirt" value="${v4.shirt}"></label><button id="v4FindAvatar">📍 Trova il mio personaggio</button>`;
 if(tab==='world')body.innerHTML=`<p>Esplora ${currentCity.name} con la telecamera libera.</p><button id="v4Enter">🌎 Entra nel 3D</button><button id="v4Overview">🧭 Panoramica</button><label><input type="checkbox" id="v4Motion" ${v4.motion?'checked':''}> Animazioni ambientali</label>`;
 if(tab==='ranking')body.innerHTML=homes.slice(0,10).map((h,i)=>`<div class="v4Rank"><span>${i+1}. @${h.user}</span><b>${h.points} ⭐</b></div>`).join('');

 const wire=(id,fn)=>{if($(id))$(id).onclick=fn};
 // The demo has no login: its first resident is @Carlos75.
 // Use a safe elevated overview rather than placing the camera inside
 // the house, below the map, or too close to the avatar geometry.
 const focus=(avatar)=>{
  if(!active)enter();
  const h=homes[0];if(!h)return;
  const a=avatar?life.people.find(person=>person.home?.id===h.id):null;
  if(avatar&&!a){$('status').textContent='Personaggio non generato';return;}
  if(window.v49Focus){group.remove(window.v49Focus);window.v49Focus=null;}
  if(avatar){
   // Always select the real avatar object, not the home or a guessed offset.
   const anchor=a.g.position;
   const focusGroup=new THREE.Group();
   const ring=new THREE.Mesh(new THREE.RingGeometry(1.65,2.15,32),new THREE.MeshBasicMaterial({color:0xffd84e,side:THREE.DoubleSide,depthTest:false}));
   ring.rotation.x=-Math.PI/2;ring.position.y=.2;focusGroup.add(ring);
   const arrow=new THREE.Mesh(new THREE.ConeGeometry(.85,1.5,6),new THREE.MeshBasicMaterial({color:0xffd84e,depthTest:false}));
   arrow.rotation.z=Math.PI;arrow.position.y=5.8;focusGroup.add(arrow);
   group.add(focusGroup);window.v49Focus={group:focusGroup,person:a};
   focusGroup.position.set(anchor.x,0,anchor.z);
   // Stable view above the avatar; the marker and selected avatar are centered.
   flyToWorld({x:anchor.x,y:1.7,z:anchor.z},{distance:46,elevation:1.42,azimuth:.68});
   showPersonCard(a);
   $('status').textContent='@'+h.user+' · personaggio selezionato (freccia gialla)';
  }else{
   flyToWorld({x:h.x,y:1.5,z:h.z},{distance:52,elevation:.95,azimuth:.68});
   showCard(h);
   $('status').textContent='Casa demo di @'+h.user;
  }
  panel.hidden=true;
 };
 wire('v4Shop',()=>{buyDemoShops(1);openV4('shop')});
 wire('v4Balloon',()=>{v4.balloons=Math.min(20,v4.balloons+1);cityStates.get(currentCity.id).balloons=v4.balloons;saveV4();if(active)rebuild();openV4('shop')});
 wire('v4FindHome',()=>focus(false));wire('v4FindAvatar',()=>focus(true));
 wire('v4Enter',()=>{enter();panel.hidden=true});
 wire('v4Overview',()=>{if(!active)enter();flyToWorld({x:0,y:0,z:0},{distance:750,elevation:1.1});panel.hidden=true});
 for(const [id,key] of [['v4Skin','skin'],['v4Shirt','shirt']])if($(id))$(id).oninput=()=>{v4[key]=$(id).value;saveV4();if(active)rebuild()};
 if($('v4Motion'))$('v4Motion').onchange=()=>{v4.motion=$('v4Motion').checked;saveV4()};
}
document.querySelectorAll('[data-v4]').forEach(el=>el.addEventListener('click',()=>openV4(el.dataset.v4)));
$('v4Close').onclick=()=>$('v4Panel').hidden=true;
// No forced 3D entrance. The geographic map remains the initial view.

// Permanent grid audit: run once when loading, and expose results for debugging.
function validatePermanentGrid(blocks=300){
  let homes=0,shops=0,civic=0;
  for(let block=0;block<blocks;block++){
    const used=new Set();
    for(let slot=0;slot<LOT_COLS*LOT_ROWS;slot++){
      const p=plotBounds(block,slot);
      assertInsideParcel('lot '+block+'/'+slot,p.x,p.z,p.right-p.left,p.bottom-p.top,p);
      const type=slotType(block,slot);
      if(used.has(slot))throw Error('Duplicate lot '+block+'/'+slot);
      used.add(slot);
      if(type==='house')homes++;
      else if(type==='shop')shops++;
      else civic++;
    }
    if(block%PUBLIC_BLOCK_INTERVAL===0){
      const b=facilityBounds(block);
      assertInsideParcel('civic '+block,b.x,b.z,b.width,b.depth,blockBounds(block));
    }
  }
  return {blocks,houses:homes,shops,civicLots:civic,valid:true};
}
const GRID_AUDIT=validatePermanentGrid();
console.info('Sudamérica fixed-grid audit',GRID_AUDIT);

function auditCivicDecoration(){
 let tested=0;
 for(let i=0;i<240;i+=PUBLIC_BLOCK_INTERVAL){
  const b=facilityBounds(i);
  if(decorationAllowed(b.x,b.z,2,2))throw Error('Civic decoration collision: '+i);
  tested++;
 }
 return {tested,blocked:true};
}
console.info('Civic decoration exclusion',auditCivicDecoration());

// Camera controls in the map overlay.
for(const [id,action] of [
 ['earthNorth',()=>{azimuth=0;updateCamera()}],
 ['earthTilt',()=>{elevation=elevation>1.2?.48:1.48;updateCamera()}],
 ['earthPlus',()=>{zoomBy(1.5);updateCamera()}],
 ['earthMinus',()=>{zoomBy(1/1.5);updateCamera()}]
]){const el=$(id);if(el)el.addEventListener('click',action)}


// Optional wide city view. All simulation controls remain in the side panel.
const cityPanel=document.querySelector('aside');
const cityPanelToggle=document.createElement('button');
cityPanel.id='cityControls';
cityPanelToggle.type='button';
cityPanelToggle.id='cityPanelToggle';
cityPanelToggle.setAttribute('aria-controls',cityPanel.id);
cityPanelToggle.setAttribute('aria-expanded','true');
cityPanelToggle.textContent='⛶ Vista ampia';
document.getElementById('earthControls').append(cityPanelToggle);
cityPanelToggle.addEventListener('click',()=>{
 const wide=document.body.classList.toggle('wide-city');
 cityPanelToggle.setAttribute('aria-expanded',String(!wide));
 cityPanelToggle.textContent=wide?'☰ Comandi':'⛶ Vista ampia';
 resize();
 map.invalidateSize({pan:false});
});
const cityViewStyle=document.createElement('style');
cityViewStyle.textContent=`
 #cityPanelToggle{width:auto;min-width:42px;font-size:11px;white-space:nowrap;padding-inline:8px}
 body:not(.city-view) #cityPanelToggle{display:none}
 .city-view.wide-city header{display:none}
 .city-view.wide-city .layout{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr);height:100dvh}
 .city-view.wide-city #cityControls{display:none}
 .city-view.wide-city .mapwrap{height:auto}
`;
document.head.append(cityViewStyle);

// Adjacent towns keep their geographic positions when the local scene origin changes.
async function enterNeighborCity(neighbor,state){if(!active)return;const old=currentCity,geo=WorldRoads.point(old,state.target.x,state.target.z),next=neighbor.city;const layer=$('threeLayer');$('status').textContent='Entrando a '+next.name+'…';layer.style.transition='opacity 180ms';layer.style.opacity='.45';await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));WorldRoads.holdGraph();selectCity(next.id,false);enter();const p=WorldRoads.local(next,{lat:geo[0],lng:geo[1]});target.x=p.x;target.z=p.z;target.y=Math.max(2,state.target.y-neighbor.y);distance=state.distance;azimuth=state.azimuth;elevation=state.elevation;updateCamera();layer.style.opacity='1';$('status').textContent=next.name+' · città raggiunta · '+count.toLocaleString('it-IT')+' case';}
function showNeighborCities(){if(!active)enter();const panel=$('v4Panel'),body=$('v4Body');panel.hidden=false;$('v4Title').textContent='Città vicine';body.replaceChildren();const items=window.WorldNeighbors?.list()||[];if(!items.length){const p=document.createElement('p');p.textContent='Nessuna città collegata visibile in questa zona. Puoi cercare altre località nella mappa.';body.append(p);}for(const e of items){const button=document.createElement('button');button.textContent='🏙 '+e.city.name+' · '+(e.distance/1000).toLocaleString('it-IT',{maximumFractionDigits:1})+' km';button.onclick=()=>{panel.hidden=true;WorldNeighbors.focus(e.city.id);};body.append(button);}}
const neighborButton=document.createElement('button');neighborButton.id='nearbyCities';neighborButton.textContent='🏙 Città vicine';neighborButton.title='Avvicinati alle città collegate';neighborButton.onclick=showNeighborCities;neighborButton.style.cssText='width:auto;min-width:132px;padding:10px 12px;font-size:13px;white-space:nowrap';$('earthControls').style.alignItems='flex-end';$('earthControls').append(neighborButton);
document.addEventListener('pointerdown',e=>{if(e.target.closest?.('#threeLayer'))window.WorldNeighbors?.cancelFlight();},true);
document.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key))window.WorldNeighbors?.cancelFlight();},true);
