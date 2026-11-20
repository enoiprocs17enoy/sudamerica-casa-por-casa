
const ownerDetachedControls=new Map(),ownerControlTags={populationSlider:'input',populationExact:'input',populationValue:'strong',applyPopulation:'button',demoHouseLabel:'p',demoScore:'select',demoShop:'button',bulkShops:'button',clearShops:'button'};
const $=id=>{const live=document.getElementById(id);if(live)return live;if(!ownerControlTags[id])return null;if(!ownerDetachedControls.has(id)){const node=document.createElement(ownerControlTags[id]);node.id=id;ownerDetachedControls.set(id,node);}return ownerDetachedControls.get(id);},MDP=[-38.0055,-57.5426],BA=[-34.6037,-58.3816],CORD=[-31.4201,-64.1888];
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

// Stable simulated tastes: independent channels, unaffected by catalogue order or growth.
const simulatedChoices=new WeakMap();
function simulatedRandom(city,id,kind,channel){let x=2166136261;for(const c of String(city)+'|'+kind+'|'+id+'|'+channel)x=Math.imul(x^c.charCodeAt(0),16777619);x^=x>>>16;x=Math.imul(x,0x7feb352d);x^=x>>>15;x=Math.imul(x,0x846ca68b);x^=x>>>16;return(x>>>0)/4294967296;}
function simulatedChoice(owner,kind,channel,total){let choices=simulatedChoices.get(owner);if(!choices){choices=new Map();simulatedChoices.set(owner,choices);}const key=kind+':'+channel+':'+total;if(!choices.has(key))choices.set(key,Math.floor(simulatedRandom(owner.cityId||currentCity.id,owner.id,kind,channel)*total));return choices.get(key);}
function housePaintIndex(h){return colorOverrides.get(scoreOverrideKey(h.cityId,h.id))??window.HouseShowcase?.styleFor(h)?.paint??simulatedChoice(h,'house','paint',HOUSE_PAINTS.length);}
function houseLawnColor(h){return [0x84ac82,0x72a56b,0x91ad70,0x65936b][window.HouseShowcase?.styleFor(h)?.lawn??simulatedChoice(h,'house','lawn',4)];}
const simulatedShopProgressCache=new WeakMap();
function simulatedShopProgress(shop){if(simulatedShopProgressCache.has(shop))return simulatedShopProgressCache.get(shop);const city=shop.cityId||currentCity.id,r=simulatedRandom(city,shop.id,'shop','evolution'),limits=[.18,.38,.56,.72,.84,.92,.97,1];let tier=limits.findIndex(x=>r<x);if(tier<0)tier=7;const min=HOUSE_TIERS[tier].min,max=HOUSE_TIERS[tier+1]?.min??110000,progress={points:min+Math.floor(simulatedRandom(city,shop.id,'shop','points')*(max-min)),premium:simulatedRandom(city,shop.id,'shop','premium')<.30,paintIndex:simulatedChoice(shop,'shop','paint',HOUSE_PAINTS.length),pavingIndex:simulatedChoice(shop,'shop','paving',3)};simulatedShopProgressCache.set(shop,progress);return progress;}

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
 const explicit=gardenChoices.get(scoreOverrideKey(h.cityId,h.id)+':'+category);
 const total=GARDEN_CATALOG.find(item=>item.id===category)?.options.length||4;
 return explicit??window.HouseShowcase?.styleFor(h)?.garden?.[category]??simulatedChoice(h,'house','garden:'+category,total);
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
 const index=housePaintIndex(h);
 return HOUSE_PAINTS[index]||HOUSE_PAINTS[0];
}
function isPremiumHouse(h){return designOverrides.get(scoreOverrideKey(h.cityId,h.id))??window.HouseShowcase?.styleFor(h)?.premium??(simulatedChoice(h,'house','premium',100)<35);}

function scoreOverrideKey(city,id){return city+':'+id;}
let manualCityNavigation=false,suppressMapEntry=false;
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
   const tooltip=document.createElement('span');tooltip.textContent=city.name+' · '+city.residents.toLocaleString(window.GameI18n?.locale||'it-IT')+' abitanti virtuali';
   marker=L.marker([city.lat,city.lng],{icon:cityPinIcon,zIndexOffset:1000,
    title:city.name+' · '+(window.GameI18n?.country(city.countryCode,city.country)||city.country)}).bindTooltip(
     tooltip,{direction:'top'});
   marker.on('click',()=>selectCity(city.id,true));
   cityMarkers.set(city.id,marker);
  }
  const markerLocale=window.GameI18n?.locale||'it';
  if(marker.casaLocale!==markerLocale){const tooltip=document.createElement('span');tooltip.textContent=city.name+' · '+city.residents.toLocaleString(markerLocale)+' abitanti virtuali';marker.setTooltipContent(tooltip);marker.options.title=city.name+' · '+(window.GameI18n?.country(city.countryCode,city.country)||city.country);marker.casaLocale=markerLocale;}
  if(!cities.hasLayer(marker))cities.addLayer(marker);
  const el=marker.getElement();
  if(el){
   el.dataset.i18nSkip='true';el.title=marker.options.title;
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
 const label=$('cityLabel');if(label)label.textContent=currentCity.name+' · '+(window.GameI18n?.country(currentCity.countryCode,currentCity.country)||currentCity.country);
 const name=$('currentCityName');if(name)name.textContent=currentCity.name;
 const overview=$('cityOverview');
 if(overview)overview.textContent=window.OwnerAccess?.testMode()?`${(window.WorldAtlas?.meta.total||CITY_CATALOG.length).toLocaleString(window.GameI18n?.locale||'it-IT')} località nel catalogo · ${window.WorldAtlas?.countries.size||13} paesi e territori · simulazione · ${currentCity.residents.toLocaleString(window.GameI18n?.locale||'it-IT')} in ${currentCity.name} · ${currentCity.points.toLocaleString(window.GameI18n?.locale||'it-IT')} punti città · ${count.toLocaleString(window.GameI18n?.locale||'it-IT')} case 3D caricate`:currentCity.name+' · '+count.toLocaleString(window.GameI18n?.locale||'it-IT')+' case · '+(cityStates.get(currentCity.id)?.shops??shopPurchases.length).toLocaleString(window.GameI18n?.locale||'it-IT')+' attività';
 refreshCityMarkers();window.WorldRoads?.refresh();
}
function selectCity(id,fly=false){
 const next=window.WorldAtlas?.byId.get(id)||CITY_CATALOG.find(c=>c.id===id);
 if(!next||next.geoVerified===false)return;
 window.WorldSearch?.clearCountry();
 if(next.id!==currentCity.id){$('v4Panel').hidden=true;localizedPanelRoute=null;$('cityLoadRetryNotice')?.remove();}
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
 window.WorldSearch?.rememberResidents(currentCity,homes);
 $('counter').textContent=count.toLocaleString(window.GameI18n?.locale||'it-IT');
 $('v4Population').textContent=count.toLocaleString(window.GameI18n?.locale||'it-IT');
 syncPopulationControls();
 $('card').style.display='none';
 $('search').value=homes[0]?.user||'';
 target={x:-17,y:0,z:16};distance=115;azimuth=.72;elevation=.29;
 updateCitySelection();renderMilestones();
 if(fly){manualCityNavigation=true;map.flyTo([next.lat,next.lng],12,{duration:1.1});map.once('moveend',()=>{manualCityNavigation=false;});}
 else {suppressMapEntry=true;try{map.setView([next.lat,next.lng],12);}finally{suppressMapEntry=false;}}
 $('status').textContent=`${next.name} · ${count} case · scegli Entra nel 3D`;
}
function cityAtMapCenter(){
 const center=map.getCenter();
 return (window.WorldAtlas?WorldAtlas.visible(map.getBounds().pad(.5)):CITY_CATALOG).filter(c=>c.geoVerified!==false).reduce((best,c)=>{
  const d=map.distance(center,[c.lat,c.lng]);
  return !best||d<best.distance?{city:c,distance:d}:best;
 },null);
}
let cityEntryPromise=null,pendingRebuildPromise=null,regionalLoad=null;
let localizedOwnerCard=null,localizedPanelRoute=null;
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
  // The lattice and reserved parcels never change between cities or evolutions.
  // Keep these private to collision checks; callers cannot mutate cached bounds.
  const cache=decorationAllowed.parcels||(decorationAllowed.parcels=new Map());
  let reserved=cache.get(block);
  if(!reserved){
   reserved=Array.from({length:LOT_COLS*LOT_ROWS},(_,slot)=>plotBounds(block,slot));
   if(block%PUBLIC_BLOCK_INTERVAL===0)reserved.push(facilityBounds(block));
   if(cache.size>=1024)cache.delete(cache.keys().next().value);
   cache.set(block,reserved);
  }
  // No landscaping/parking/playgrounds may overlap ANY permanently reserved lot.
  // This also protects lots which have not yet been purchased or occupied.
  for(const parcel of reserved)if(overlapsRect(x,z,w,d,parcel,.12))return false;
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
function roadQuadOverlapsDevelopedBlocks(a,b,cells){
 const points=[...a,...b],left=Math.min(...points.map(p=>p.x)),right=Math.max(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.z)),bottom=Math.max(...points.map(p=>p.z));
 for(let col=Math.round(left/BLOCK_X);col<=Math.round(right/BLOCK_X);col++)for(let row=Math.round(top/BLOCK_Z);row<=Math.round(bottom/BLOCK_Z);row++){
  if(!cells.has(col+':'+row))continue;const parcel=blockBoundsFromCell(col,row);
  if(left<parcel.right+.25&&right>parcel.left-.25&&top<parcel.bottom+.25&&bottom>parcel.top-.25)return true;
 }
 return false;
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
  return {block,slot,col,row,...plotBounds(block,slot)};
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
function shopProgressFor(shop){
 const defaults=simulatedShopProgress(shop),manual=shopProgress.get(scoreOverrideKey(shop.cityId||currentCity.id,shop.id));
 return manual?{...defaults,...manual}:defaults;
}
function facadeAngle(plot){return plot.lz===0?Math.PI:0}
function shopLot(id){
  const {block,slot}=ensurePlots('shop',id);
  const pos=plotPosition(block,slot);
  assertInsideParcel('Negozio '+id,pos.x,pos.z,17,18,pos);
  return {id,cityId:currentCity.id,...pos,
    ownerId:Math.max(1,Math.min(count,1+Math.floor(rnd(id*127+(currentCity.catalogOrdinal??CITY_CATALOG.indexOf(currentCity))*19)*Math.max(1,count)))),
    owner:'',
    business:id%24===14?'Pizzeria':shopStyles[id%shopStyles.length]?.name||'Negozio'};
}
const worldImportedSquares=Object.create(null);
const worldSquareCatalogRequests=new Map();
function worldSquareCatalogPart(id){
 let hash=0;
 for(const code of id)hash=(Math.imul(hash,31)+code.charCodeAt(0))|0;
 return (hash>>>0)%16;
}
function loadWorldSquareCatalog(city){
 if(typeof DecompressionStream!=='function')return;
 const part=worldSquareCatalogPart(city.id);
 if(!worldSquareCatalogRequests.has(part)){
  const pending=fetch('world-square-catalog-20261120-'+part+'.json.gz'+'?v=13',{signal:AbortSignal.timeout(15000)})
   .then(response=>{
    if(!response.ok||!response.body)throw Error('Catalogo piazze non disponibile');
    return new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json();
   })
   .then(records=>Object.assign(worldImportedSquares,records))
   .catch(()=>{worldSquareCatalogRequests.delete(part);});
  worldSquareCatalogRequests.set(part,pending);
 }
 return worldSquareCatalogRequests.get(part);
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
 if(!city||city.geoVerified===false||typeof window==='undefined')return;
 const records=citySquareRecords(),old=records[city.id];
 if(worldImportedSquares[city.id])return;
 const pending=ensureCitySquare.pending||(ensureCitySquare.pending=new Map());if(pending.has(city.id))return pending.get(city.id);
 const job=async()=>{
  const resolver=window.PlazaMapResolver;
  const retained=resolver?.eligibleCandidate?.(old?.square)?old.square:null;
  try{
   await loadWorldSquareCatalog(city);
   let square=worldImportedSquares?.[city.id];
   if(!square){
    if(window.CITY_SQUARE_DATA?.[city.id]||!resolver||old?.version===4&&old.retryAfter>Date.now())return;
    square=await resolver.resolve(city);
    records[city.id]={version:4,square:square||retained,retryAfter:Date.now()+(square?90:7)*86400000};
   }
   if(square&&square!==old?.square&&currentCity.id===city.id&&active){rebuild();renderMilestones();}
  }catch{records[city.id]={version:4,square:retained,retryAfter:Date.now()+86400000};}
  finally{
   pending.delete(city.id);
   try{
    const recent=Object.entries(records).sort((a,b)=>b[1].retryAfter-a[1].retryAfter).slice(0,140);
    localStorage.setItem('sudamerica-city-squares-v2',JSON.stringify(Object.fromEntries(recent)));
   }catch{}
  }
 };
 const task=(ensureCitySquare.queue||Promise.resolve()).then(job);ensureCitySquare.queue=task.catch(()=>{});pending.set(city.id,task);return task;
}
function citySquareProfile(city){
 const scope=typeof window==='undefined'?null:window;
 const bundled=scope?.CITY_SQUARE_DATA?.[city.id];
 const imported=typeof worldImportedSquares==='undefined'?null:worldImportedSquares?.[city.id];
 const reviewed=imported?.reviewed===true?imported:null;
 const cached=citySquareRecords()[city.id]?.square;
 const fromMap=scope?.PlazaMapResolver?.eligibleCandidate?.(cached)&&
  /^https:\/\/www\.openstreetmap\.org\/(?:node|way|relation)\/\d+$/.test(cached.source);
 for(const data of [reviewed,bundled,imported,fromMap?cached:null]){
  const outline=data?.outline;
  if(typeof data?.name!=='string'||!data.name.trim()||!Array.isArray(outline)||outline.length<4||outline.length>1200)continue;
  if(!outline.every(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.z)))continue;
  const area=Math.abs(outline.reduce((sum,p,i)=>{const q=outline[(i+1)%outline.length];return sum+p.x*q.z-q.x*p.z;},0))/2;
  if(area<1)continue;
  const profile={layout:'mapped',stone:0xc9bda7,green:0x638d4c,palm:false,...data,documented:true,realGeometry:true};
  return data!==reviewed&&scope?.SquareDetails?scope.SquareDetails.enrich(profile,city):profile;
 }
 const seed=Array.from(String(city.id||city.name)).reduce((n,c)=>(Math.imul(n,31)+c.codePointAt(0))>>>0,17);
 return {name:'Piazza civica di '+city.name,layout:['garden','promenade','groves','terraces'][seed%4],
  stone:[0xd0c1a7,0xc9c5b7,0xd9c8ae,0xd6c7bc][(seed>>>5)%4],green:[0x698c50,0x618a56,0x739650][(seed>>>8)%3],
  palm:Math.abs(city.lat)<23,seed,documented:false,realGeometry:false,localDesign:true};
}
function addCitySquareNameSign(profile,b){
 const w=b.width,d=b.depth;
 const signWidth=Math.min(w*.23,9.5),signHeight=signWidth/4,signZ=b.z+d*.466,signX=b.x-w*.26;
 const signBottom=1.60,signY=signBottom+signHeight/2;
 const source=profile.realGeometry?profile.geometrySource||'OpenStreetMap':'';
 const material=new THREE.MeshBasicMaterial({map:billboardTexture([currentCity.name.toUpperCase(),profile.documented?profile.name:'PIAZZA CIVICA',source],'#234f63',{wide:true}),side:THREE.FrontSide,toneMapped:false});
 const geo=new THREE.PlaneGeometry(signWidth,signHeight);
 for(const rear of [false,true]){
  const label=new THREE.Mesh(geo,material);label.position.set(signX,signY,signZ+(rear?-.102:.102));label.rotation.y=rear?Math.PI:0;
  label.userData.citySquareName=currentCity.name;group.add(label);
 }
 const poleMaterial=new THREE.MeshStandardMaterial({color:0x344e4e,roughness:.8});
 const frame=new THREE.Mesh(new THREE.BoxGeometry(signWidth+.16,signHeight+.16,.20),poleMaterial);
 frame.position.set(signX,signY,signZ);frame.castShadow=true;frame.receiveShadow=true;group.add(frame);
 for(const side of [-1,1]){
  const post=new THREE.Mesh(new THREE.BoxGeometry(.17,signBottom,.17),poleMaterial);
  post.position.set(signX+side*signWidth*.42,signBottom/2,signZ);post.castShadow=true;group.add(post);
 }

}
function fitSquareToParcel(profile,b){
 const rings=[profile.outline,...(profile.contextSurfaces||[]).flatMap(surface=>surface.rings)];
 const root=rings.flat(),angles=[0,Math.PI/2];
 for(const ring of rings)for(let i=1;i<ring.length;i++){
  const a=ring[i-1],c=ring[i];
  if(Math.hypot(c.x-a.x,c.z-a.z)>.1){const angle=Math.atan2(c.z-a.z,c.x-a.x);angles.push(-angle,Math.PI/2-angle);}
 }
 let best;
 for(const angle of angles){const ca=Math.cos(angle),sa=Math.sin(angle),points=root.map(p=>({x:p.x*ca-p.z*sa,z:p.x*sa+p.z*ca}));
 const minX=Math.min(...points.map(p=>p.x)),maxX=Math.max(...points.map(p=>p.x)),minZ=Math.min(...points.map(p=>p.z)),maxZ=Math.max(...points.map(p=>p.z));
 const scale=Math.min((b.width-10)/Math.max(.1,maxX-minX),(b.depth-14)/Math.max(.1,maxZ-minZ));
 if(!best||scale>best.scale)best={angle,ca,sa,scale,cx:(minX+maxX)/2,cz:(minZ+maxZ)/2,width:(maxX-minX)*scale,depth:(maxZ-minZ)*scale};}
 best.point=p=>({x:(p.x*best.ca-p.z*best.sa-best.cx)*best.scale,z:(p.x*best.sa+p.z*best.ca-best.cz)*best.scale});return best;
}
function drawSurveyedCitySquare(profile,b){
 const fit=fitSquareToParcel(profile,b),root=profile.outline,scale=fit.scale;
 const capitol=profile.source==='https://www.openstreetmap.org/way/23055100'&&
  profile.landmarks?.find(landmark=>landmark.id==='way:429078984');
 const detailPlan=typeof window!=='undefined'&&window.SquareDetails?window.SquareDetails.prepare(profile,fit,b,currentCity):null;
 const plazaTop=.33;
 const clearDetail=(x,z,r=0)=>!detailPlan||detailPlan.clear(x,z,r);
 const project=p=>{const q=fit.point(p);return new THREE.Vector2(q.x,-q.z);};
 const surfaceBatches=new Map(),batches=new Map(),dummy=new THREE.Object3D(),geometries={box:new THREE.BoxGeometry(1,1,1),round:new THREE.CylinderGeometry(.5,.5,1,12),leaf:new THREE.IcosahedronGeometry(1,1),ring:new THREE.TorusGeometry(.35,.045,6,16)};
 const put=(type,color,x,y,z,w,h,d,angle=0,casts=true)=>{
  const cos=Math.abs(Math.cos(angle)),sin=Math.abs(Math.sin(angle));
  const hx=(cos*w+sin*d)/2,hz=(sin*w+cos*d)/2;
  if(Math.abs(x)+hx>b.width/2-.15||Math.abs(z)+hz>b.depth/2-.15)return;
  const key=type+':'+color+':'+casts;if(!batches.has(key))batches.set(key,{type,color,casts,parts:[]});batches.get(key).parts.push({x,y,z,w,h,d,angle});
 };
 const box=(color,x,y,z,w,h,d,angle=0,casts=true)=>put('box',color,x,y,z,w,h,d,angle,casts);
 const segment=(a,c,color,width,height,y)=>{
  const dx=c.x-a.x,dz=c.z-a.z,length=Math.hypot(dx,dz);if(length<.02)return;
  put('box',color,(a.x+c.x)/2,y,(a.z+c.z)/2,width,height,length,Math.atan2(dx,dz),false);
 };
 const border=(ring,color,width,height,y)=>{for(let i=1;i<ring.length;i++)segment(fit.point(ring[i-1]),fit.point(ring[i]),color,width,height,y);};
 const polygon=(rings,color,y,raised=false,explicitHoles=false,kind='stone')=>{
  if(!rings?.length)return;const shapes=[];let shape;
  const firstSign=Math.sign(THREE.ShapeUtils.area(rings[0].map(project)));
  for(const ring of rings){if(ring.length<4)continue;const points=ring.map(project),sign=Math.sign(THREE.ShapeUtils.area(points));if(!shape||(!explicitHoles&&sign===firstSign)){shape=new THREE.Shape(points);shapes.push(shape);}else shape.holes.push(new THREE.Path(points));}
  if(!shapes.length)return;
  const key=kind+':'+color+':'+y;if(!surfaceBatches.has(key))surfaceBatches.set(key,{color,y,kind,geometries:[]});surfaceBatches.get(key).geometries.push(new THREE.ShapeGeometry(shapes));
  if(raised)for(const ring of rings)border(ring,0xd9cebb,.145,.12,y-.020);
 };
 // The paving bed supports both the mapped footprint and the surrounding promenade.
 box(profile.stone||0xc8bcaa,0,.22,0,b.width-.50,.22,b.depth-.50,0,false);
 for(const side of [-1,1]){
  box(0xe8deca,side*(b.width/2-.42),.39,0,.28,.30,b.depth-.70,0,false);
  box(0xe8deca,0,.39,side*(b.depth/2-.42),b.width-.70,.30,.28,0,false);
  box(0xa9947a,side*(b.width/2-4.1),.345,0,.18,.025,b.depth-2.2,0,false);
 }
 for(let z=-b.depth/2+4;z<b.depth/2-2;z+=4.5)for(const side of [-1,1])box(0xb1a18b,side*(b.width/2-2.35),.345,z,3.3,.02,.05,0,false);
 const paving=profile.continuousPaving?profile.stone:0xd7c9b3;
 const baseKind=['lawn','sand','gravel'].includes(profile.base)?profile.base:'stone';
 const baseColor=baseKind==='lawn'?profile.green||0x76965c:baseKind==='sand'?0xd8b477:baseKind==='gravel'?0xcbbda7:paving;
 polygon([root,...(profile.holes||[])],capitol?0x697070:baseColor,.42,false,true,baseKind);
 border(root,0xe2d6bf,.26,.15,.43);
 // Context surfaces preserve separately mapped ground outside the plaza outline.
 for(const surface of profile.contextSurfaces||[]){
  const lawn=surface.kind==='lawn',water=surface.kind==='water';
  polygon(surface.rings,lawn?(profile.green||0x63894c):water?0x319bb5:paving,.42,false,true,lawn?'lawn':water?'water':'stone');
 }
 for(const surface of profile.surfaces||[]){
  const lawn=surface.kind==='lawn',water=surface.kind==='water';
  polygon(surface.rings,lawn?(profile.green||0x63894c):water?0x319bb5:0xddd0b8,lawn?.57:water?.53:.49,lawn||water,false,lawn?'lawn':water?'water':'stone');
 }
 // Distribute the flower budget around each bed rather than filling only the first edge.
 const lawns=(profile.surfaces||[]).filter(surface=>!profile.realGeometry&&surface.kind==='lawn'&&surface.rings?.[0]?.length>3);
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
 const routeWidth=route=>Math.max(profile.reviewed?.24:.66,Math.min(2.35,(Number(route.widthMeters)||3)*scale));
 // Network centerlines across a continuous paving surface are not visible stripes.
 const validRoutes=capitol||profile.continuousPaving?[]:routes.filter(route=>route.points?.length>1&&route.points.every(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.z)));
 if((capitol||validRoutes.length)&&typeof document!=='undefined'){
  const canvas=document.createElement('canvas');
  canvas.width=b.width>27?512:256;canvas.height=b.depth>58?1024:512;
  const paint=canvas.getContext('2d');
  if(paint){
   paint.setTransform(canvas.width/b.width,0,0,canvas.height/b.depth,canvas.width/2,canvas.height/2);
   const trace=points=>{
    const start=fit.point(points[0]);paint.moveTo(start.x,start.z);
    for(let i=1;i<points.length;i++){const p=fit.point(points[i]);paint.lineTo(p.x,p.z);}
   };
   paint.beginPath();
   for(const ring of [root,...(profile.holes||[])])if(ring.length>=4){trace(ring);paint.closePath();}
   paint.clip('evenodd');paint.lineCap='round';paint.lineJoin='round';
   for(const edge of [true,false])for(const route of validRoutes){
    const width=routeWidth(route);
    const stone=/asphalt/i.test(route.surface||'')?'#a09f92':/concrete/i.test(route.surface||'')?'#d0c8b6':route.surface==='sandstone'?'#ad6954':'#dbc8a6';
    paint.strokeStyle=edge?'#b9a78e':stone;paint.lineWidth=width+(edge?.15:0);
    paint.beginPath();trace(route.points);paint.stroke();
   }
   if(capitol){
    // The Roman piazza's inlaid paving is centered on the mapped equestrian monument.
    const {x,z}=fit.point(capitol);
    const rx=Math.min(10.8,fit.width*.36),rz=Math.min(13.2,fit.depth*.31);
    const point=(scale,angle)=>[x+rx*scale*Math.cos(angle),z+rz*scale*Math.sin(angle)];
    paint.strokeStyle='#e0d4b9';paint.lineWidth=.18;
    for(const ring of [1,.93]){
     paint.beginPath();paint.ellipse(x,z,rx*ring,rz*ring,0,0,Math.PI*2);paint.stroke();
    }
    paint.beginPath();
    for(let arm=0;arm<12;arm++){
     const angle=arm*Math.PI/6;
     const tip=point(.92,angle),end=point(.29,angle+Math.PI/12);
     if(!arm)paint.moveTo(...point(.29,angle-Math.PI/12));
     paint.quadraticCurveTo(...point(.46,angle-Math.PI/17),...tip);
     paint.quadraticCurveTo(...point(.46,angle+Math.PI/17),...end);
    }
    paint.closePath();paint.stroke();
    paint.beginPath();paint.ellipse(x,z,rx*.27,rz*.27,0,0,Math.PI*2);paint.stroke();
   }
   paint.globalCompositeOperation='destination-out';
   for(const surface of profile.surfaces||[])if(surface.kind==='water'){
    paint.beginPath();for(const ring of surface.rings||[])if(ring.length>=4){trace(ring);paint.closePath();}
    paint.fill('evenodd');
   }
   if(capitol||validRoutes.length){
    // All paths meet in a single alpha-tested surface, including at crossings.
    const texture=new THREE.CanvasTexture(canvas);
    texture.colorSpace=THREE.SRGBColorSpace;texture.minFilter=THREE.LinearMipmapLinearFilter;
    texture.anisotropy=Math.min(8,typeof renderer!=='undefined'?renderer?.capabilities?.getMaxAnisotropy?.()||1:1);
    const material=new THREE.MeshStandardMaterial({map:texture,alphaTest:.45,roughness:.88});
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(b.width,b.depth).rotateX(-Math.PI/2),material);
    mesh.position.set(b.x,capitol?.448:.605,b.z);mesh.receiveShadow=true;mesh.userData.squareWalkways=validRoutes.length;group.add(mesh);
   }
  }
 }

 const benchRadius=1.12,placedBenches=[];
 const bench=(x,z,angle=0,size=1,ground=.28,reserve=1.45)=>{
  const radius=benchRadius*size;
  if(!clearDetail(x,z,reserve)||placedBenches.some(p=>Math.hypot(p.x-x,p.z-z)<p.radius+radius))return false;
  placedBenches.push({x,z,radius});
  const ca=Math.cos(angle),sa=Math.sin(angle);
  const part=(color,dx,y,dz,w,h,d)=>box(color,x+(dx*ca+dz*sa)*size,ground+(y-.28)*size,z+(-dx*sa+dz*ca)*size,w*size,h*size,d*size,angle);
  for(let slat=-2;slat<=2;slat++)part(0xad7950,0,.88,slat*.115,2.1,.10,.087);
  for(let slat=0;slat<3;slat++)part(0xb88a57,0,1.14+slat*.14,-.30,2.1,.10,.08);
  for(const side of [-1,1]){part(0x344d48,side*.78,.59,0,.12,.62,.55);part(0x344d48,side*1.02,1.07,.02,.08,.14,.58);part(0x344d48,side*1.02,.98,-.22,.08,.50,.08);}
  return true;
 };
 let mappedSurfaces;
 const mappedGround=(x,z)=>{
  mappedSurfaces??=(profile.surfaces||[]).map(surface=>({
   kind:surface.kind,rings:(surface.rings||[]).map(ring=>ring.map(fit.point))
  }));
  let ground=.42;
  for(const surface of mappedSurfaces){
   let inside=false;
   for(const ring of surface.rings)for(let i=0,j=ring.length-1;i<ring.length;j=i++){
    const a=ring[j],b=ring[i];
    if((a.z>z)!==(b.z>z)&&x<a.x+(b.x-a.x)*(z-a.z)/(b.z-a.z))inside=!inside;
   }
   if(!inside)continue;
   if(surface.kind==='water')return null;
   ground=Math.max(ground,surface.kind==='lawn'?.57:.49);
  }
  return ground;
 };
 const mappedSeats=[];
 const seats=(profile.benches||[]).filter(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.z));
 if(profile.realGeometry&&seats.length){
  // Keep mapped centers in place. Furniture and distances must use the same scale.
  const positions=seats.map(seat=>({...fit.point(seat),bearing:seat.bearing}));
  const segments=validRoutes.flatMap(route=>{
   const points=route.points.map(fit.point),radius=(routeWidth(route)+.15)/2;
   return points.slice(1).map((b,i)=>({a:points[i],b,radius}));
  });
  for(const seat of positions){
   const {x,z}=seat;
   let nearest=null,distance=Infinity;
   for(const p of positions){
    if(p===seat)continue;
    const d=Math.hypot(x-p.x,z-p.z);
    if(d>0&&d<distance){nearest=p;distance=d;}
   }
   const size=Math.min(1,scale,distance/(2.18*benchRadius));
   // Unrecorded bearings follow nearby rows of mapped seats.
   const angle=Number.isFinite(seat.bearing)?seat.bearing-fit.angle:
    nearest&&distance<=5*scale?Math.atan2(z-nearest.z,nearest.x-x):-fit.angle;
   const ca=Math.cos(angle),sa=Math.sin(angle);
   const onRoute=segments.some(({a,b,radius})=>{
    // Clip each centerline against the bench footprint padded by the painted path radius.
    const ax=(a.x-x)*ca-(a.z-z)*sa,az=(a.x-x)*sa+(a.z-z)*ca;
    const dx=(b.x-a.x)*ca-(b.z-a.z)*sa,dz=(b.x-a.x)*sa+(b.z-a.z)*ca;
    let start=0,end=1;
    for(const [origin,delta,extent] of [[ax,dx,1.06*size+radius],[az,dz,.34*size+radius]]){
     if(Math.abs(delta)<1e-9){if(Math.abs(origin)>extent)return false;continue;}
     const first=(-extent-origin)/delta,last=(extent-origin)/delta;
     start=Math.max(start,Math.min(first,last));
     end=Math.min(end,Math.max(first,last));
     if(start>end)return false;
    }
    return true;
   });
   if(onRoute)continue;
   const ground=mappedGround(x,z);
   if(ground!==null&&bench(x,z,angle,size,ground,1.45*size)){
    mappedSeats.push({...placedBenches.at(-1),size});
   }
  }
 }else{
  for(const seat of seats){
   const {x,z}=fit.point(seat);
   bench(x,z,fit.angle+(Number(seat.bearing)||0));
  }
 }
 group.userData.squareMappedSeats=mappedSeats;
 const lamp=(x,z)=>{
  if(!clearDetail(x,z,.35))return;
  put('round',0x314b48,x,(4.38+plazaTop)/2,z,.13,4.38-plazaTop,.13);
  put('round',0x425b51,x,plazaTop+.15,z,.34,.30,.34);
  box(0x314b48,x,4.53,z,.52,.10,.52);box(0xffdda0,x,4.32,z,.32,.34,.32);box(0x314b48,x,4.08,z,.45,.09,.45);
  for(const side of [-1,1])box(0x314b48,x+side*.17,4.31,z,.045,.42,.045);
 };
 const planter=(x,z,seed)=>{
  if(!clearDetail(x,z,1.55))return;
  box(0xd8c5a5,x,(.75+plazaTop)/2,z,1.40,.75-plazaTop,2.6,0,false);box(0x675a3d,x,.79,z,1.15,.09,2.34,0,false);
  for(let k=0;k<7;k++){
   const dx=Math.sin(k*9+seed)*.39,dz=(k-3)*.31;put('leaf',0x577e3e,x+dx,.99,z+dz,.28,.29,.28);
   const color=[0xd99ac4,0xf2cc72,0xf5d9d4][(k+seed)%3];for(let petal=0;petal<4;petal++){const a=petal*Math.PI/2;put('leaf',color,x+dx+Math.sin(a)*.095,1.20,z+dz+Math.cos(a)*.095,.10,.065,.10);}
  }
 };
 // Furnish generated plazas while keeping mapped footprints source-driven.
 if(!profile.realGeometry)for(const side of [-1,1])for(let i=0;i<7;i++){
  const z=-b.depth*.36+i*b.depth*.12,x=side*(b.width/2-2.1);
  if(profile.openStoneSquare){if(i%3===1)lamp(x,z);}
  else if(i%2===0)lamp(x,z);
  else{planter(x,z,i);bench(side*(b.width/2-4.1),z,side*Math.PI/2);}
 }
 // Mapped planting is retained; sparse sources receive complementary planting in the promenade.
 const palmCity=profile.palm||['uy-montevideo','pe-lima','cl-santiago','ec-quito','br-manaus','br-brasilia'].includes(currentCity.id);
 const treePositions=[];
 for(const p of profile.trees||[]){
  const q=fit.point(p);
  if(Math.abs(q.x)<b.width/2-2&&Math.abs(q.z)<b.depth/2-3)treePositions.push({...q,leafType:p.leafType,mapped:profile.realGeometry});
 }
 if(!treePositions.length&&!profile.realGeometry&&!profile.openStoneSquare)for(const side of [-1,1])for(let i=0;i<5;i++)treePositions.push({x:side*(b.width/2-3.5),z:-b.depth*.32+i*b.depth*.16});
 const maxTrees=Math.min(72,treePositions.length),mappedTrees=[];
 for(let i=0;i<maxTrees;i++){
  const p=treePositions[Math.floor(i*treePositions.length/maxTrees)],x=p.x,z=p.z;
  const treeScale=p.mapped?Math.min(1,scale):1;
  const ground=p.mapped?mappedGround(x,z):plazaTop;
  if(ground===null||!clearDetail(x,z,1.65*treeScale))continue;
  const size=(.79+rnd(x*43+z*31+17)*.46)*treeScale;
  if(p.mapped)mappedTrees.push({x,z,size});
  const crownY=height=>ground+(height-plazaTop)*size;
  const tree=(type,color,dx,height,dz,w,h,d,angle=0)=>put(type,color,x+dx*size,crownY(height),z+dz*size,w*size,h*size,d*size,angle);
  if(palmCity&&p.leafType!=='broadleaved'&&p.leafType!=='needleleaved'){
   tree('round',0x88704e,0,(5.15+plazaTop)/2,0,.22,5.15-plazaTop,.22);
   for(let leaf=0;leaf<9;leaf++){
    const a=leaf*Math.PI*2/9;
    tree('leaf',leaf%2?0x547f43:0x6c9048,Math.sin(a)*.64,5.21+Math.sin(a*2)*.12,Math.cos(a)*.64,.24,.13,1.2,a);
   }
  }else{
   tree('round',0x75583d,0,(3.525+plazaTop)/2,0,.25,3.525-plazaTop,.25);
   for(let lobe=0;lobe<6;lobe++){
    const a=lobe*Math.PI*.8;
    tree('leaf',[0x517b3e,0x67894a,0x789952][(lobe+i)%3],Math.sin(a)*.56,3.75+(lobe%3)*.36,Math.cos(a)*.48,.76,.85,.73,a);
   }
  }
 }
 group.userData.squareMappedTrees=mappedTrees;
 // Furnish terraces in the free space around generated outlines.
 const gap=(b.depth-fit.depth)/2;
 if(gap>12&&!profile.realGeometry&&!profile.openStoneSquare)for(const side of [-1,1]){
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
 if(profile.localDesign&&profile.fountain){
  const fountain=fit.point(profile.fountain),radius=Math.min(3.2,profile.fountain.radius*scale);
  if(radius>1.25&&clearDetail(fountain.x,fountain.z,radius)){
   const {x,z}=fountain;
   put('round',0xd9cebb,x,.63,z,radius*2,.42,radius*2);
   put('round',0x319bb5,x,.85,z,radius*1.82,.035,radius*1.82,0,false);
   put('round',0xd9cebb,x,1.02,z,.76,.37,.76);
   put('round',0x74cedb,x,1.35,z,.12,.34,.12,0,false);
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4;
    put('round',0x74cedb,x+Math.sin(angle)*radius*.57,.98,z+Math.cos(angle)*radius*.57,.055,.24,.055,0,false);
   }
  }
 }
 if(!profile.realGeometry)for(const side of [-1,1]){
  const x=side*(b.width/2-2.1),z=b.depth*.405;
  put('round',0x42796a,x,(1.45+plazaTop)/2,z,.56,1.45-plazaTop,.56);put('round',0x2e5149,x,1.50,z,.63,.12,.63);
 }
 // Merge equal-height surfaces so a detailed plan does not create dozens of draw calls.
 for(const surface of surfaceBatches.values()){
  const positions=[];
  for(const source of surface.geometries){const expanded=source.index?source.toNonIndexed():source;for(const value of expanded.attributes.position.array)positions.push(value);if(expanded!==source)expanded.dispose();source.dispose();}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.computeVertexNormals();
  const material=new THREE.MeshStandardMaterial({color:surface.color,roughness:surface.kind==='water'?.27:.88,metalness:surface.kind==='water'?.12:0,side:THREE.DoubleSide});
  if(surface.kind==='stone'&&typeof applyStreetTexture==='function')applyStreetTexture(material,false);
  const mesh=new THREE.Mesh(geometry,material);mesh.rotation.x=-Math.PI/2;mesh.position.set(b.x,surface.y,b.z);mesh.receiveShadow=true;mesh.castShadow=false;
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
 const roundedRect=(x,z,width,depth,radius)=>{
  const ring=[],r=Math.min(radius,width*.39,depth*.39),ax=width/2-r,az=depth/2-r;
  for(const [dx,dz,start] of [[1,1,0],[-1,1,Math.PI/2],[-1,-1,Math.PI],[1,-1,Math.PI*1.5]]){
   for(let i=0;i<=4;i++){
    const a=start+i*Math.PI/8;ring.push({x:x+dx*ax+Math.cos(a)*r,z:z+dz*az+Math.sin(a)*r});
   }
  }
  ring.push(ring[0]);return ring;
 };
 const circle=(x,z,radius)=>Array.from({length:21},(_,i)=>{
  const a=(i%20)*Math.PI/10;return {x:x+Math.cos(a)*radius,z:z+Math.sin(a)*radius};
 });
 const fountain={x:0,z:0,radius:Math.min(2.85,w*.115)};
 const outline=roundedRect(0,0,w,d,1.9),surfaces=[],trees=[],benches=[];
 const footRoutes=[
  {points:roundedRect(0,0,w-2.8,d-2.8,1.7),widthMeters:1.18},
  {points:circle(0,0,fountain.radius+1.55),widthMeters:1.45},
  ...[-1,1].map(side=>({points:[{x:0,z:side*d*.48},{x:0,z:side*(fountain.radius+1.55)}],widthMeters:1.65}))
 ];
 if(profile.layout!=='promenade'){
  for(const side of [-1,1])footRoutes.push({points:[{x:side*w*.45,z:0},{x:side*(fountain.radius+1.55),z:0}],widthMeters:1.44});
 }
 const schemes={
  garden:[[-.255,.326],[.255,.326]],
  promenade:[[0,.80]],
  groves:[[-.335,.18],[-.145,.157],[.145,.157],[.335,.18]],
  terraces:[[-.31,.225],[-.154,.071],[.154,.071],[.31,.225]]
 };
 for(const side of [-1,1])for(const [offset,length] of schemes[profile.layout]){
  const band=profile.layout==='promenade'?w*.218:profile.layout==='terraces'?w*(side*offset>0?.249:.211):w*.229;
  const x=side*w*.286,z=d*offset,depth=d*length;
  surfaces.push({kind:'lawn',rings:[roundedRect(x,z,band,depth,profile.layout==='groves'?2.3:1.35)]});
  const treeOffsets=depth>40?[-.36,-.12,.12,.36]:depth>14?[-.27,.24]:[0];
  for(const leaf of treeOffsets)trees.push({x:x+side*.45,z:z+depth*leaf});
  if(profile.layout==='promenade'){
   for(const end of [-1,1])benches.push({x:side*w*.15,z:end*d*.25,bearing:side*Math.PI/2});
  }else if(Math.abs(z)>d*.17)benches.push({x:side*w*.147,z,bearing:side*Math.PI/2});
 }
 return drawSurveyedCitySquare({...profile,outline,surfaces,walkwayDetails:footRoutes,trees,benches,fountain,base:'paving'},b);
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
      points:scoreOverrides.get(scoreOverrideKey(currentCity.id,i+1))??window.HouseShowcase?.styleFor({cityId:currentCity.id,id:i+1})?.points??demoResidentPoints(i,currentCity.id),
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
const REGIONAL_GROUND_Y=-.12;
const TERRAIN_TEXTURE_METERS=184;

function regionalTerrainMaterial(relief=false){
 const material=new THREE.MeshStandardMaterial({
  color:relief?0xffffff:0xc8d5ae,vertexColors:relief,roughness:1,map:homePattern('grass'),
  polygonOffset:relief,polygonOffsetFactor:-1,polygonOffsetUnits:-1
 });
 material.onBeforeCompile=shader=>{
  if(relief){
   shader.vertexShader='varying float terrainHeight;\n'+shader.vertexShader.replace('#include <begin_vertex>',
    '#include <begin_vertex>\nterrainHeight=position.y;');
   shader.fragmentShader='varying float terrainHeight;\n'+shader.fragmentShader;
  }
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`
   #ifdef USE_MAP
   vec2 terrainUV=vMapUv+.21*vec2(sin(vMapUv.y*.74+vMapUv.x*.24),sin(vMapUv.x*.63-vMapUv.y*.19));
   vec4 terrainSample=texture2D(map,terrainUV);
   diffuseColor*=${relief?'mix(terrainSample,vec4(1.),smoothstep(90.,270.,terrainHeight))':'terrainSample'};
   #endif
  `);
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`
   #include <color_fragment>
   ${relief?`if(terrainHeight<${(REGIONAL_GROUND_Y+.025).toFixed(3)})discard;`:''}
   #ifdef USE_MAP
   float terrainGrain=(terrainSample.g-.407)*${relief?'(1.-smoothstep(90.,270.,terrainHeight))':'1.'};
   diffuseColor.rgb*=1.+.30*terrainGrain;
   #endif
  `);
 };
 material.customProgramCacheKey=()=>relief?'continuous-relief-texture':'continuous-ground-texture';
 return material;
}

function regionalWaterMaterial(clock){
 const material=new THREE.MeshStandardMaterial({color:0x238ba6,roughness:.45,metalness:.015});
 material.onBeforeCompile=shader=>{
  shader.uniforms.waterTime=clock;
  shader.vertexShader='varying vec2 waveXZ;\n'+shader.vertexShader.replace('#include <begin_vertex>',
   '#include <begin_vertex>\nwaveXZ=(modelMatrix*vec4(position,1.)).xz;');
  shader.fragmentShader='uniform float waterTime; varying vec2 waveXZ;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',
   '#include <map_fragment>\nfloat waterPixel=max(length(dFdx(waveXZ)),length(dFdy(waveXZ)));');
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`
   #include <color_fragment>
   vec2 swellDirection=vec2(.86,.51),crossDirection=vec2(-.33,.94),rippleDirection=vec2(.97,-.24);
   float swellPhase=dot(waveXZ,swellDirection)*.115-waterTime*.89
     +.92*sin(dot(waveXZ,crossDirection)*.029+waterTime*.17);
   float crossPhase=dot(waveXZ,crossDirection)*.277-waterTime*1.38
     +.76*sin(dot(waveXZ,swellDirection)*.063-waterTime*.18);
   float ripplePhase=dot(waveXZ,rippleDirection)*1.16-waterTime*2.42+.66*sin(swellPhase);
   float visibleSwell=1.-smoothstep(.54,2.,waterPixel*.115);
   float visibleCross=1.-smoothstep(.54,2.,waterPixel*.277);
   float visibleRipples=1.-smoothstep(.54,2.,waterPixel*1.16);
   float shimmer=sin(swellPhase)*visibleSwell*.028+sin(crossPhase)*visibleCross*.014
     +sin(ripplePhase)*visibleRipples*.006;
   float waterDepth=max(0.,-regionDistance);
   vec3 shallowWater=vec3(.125,.445,.50);
   diffuseColor.rgb=mix(shallowWater,diffuseColor.rgb,smoothstep(0.,135.,waterDepth))*(1.+shimmer);
   float surfPhase=waterDepth*.225+waterTime*1.10
     +.49*sin(dot(waveXZ,swellDirection)*.16)+.33*cos(dot(waveXZ,crossDirection)*.08);
   float surfBand=smoothstep(.83,.99,sin(surfPhase))*(1.-smoothstep(2.,23.,waterDepth));
   float visibleSurf=1.-smoothstep(.45,2.3,waterPixel*.225);
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.79,.90,.93),surfBand*visibleSurf*.25);
  `);
  shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`
   #include <normal_fragment_maps>
   vec2 chop=swellDirection*cos(swellPhase)*visibleSwell*.027
     +crossDirection*cos(crossPhase)*visibleCross*.014
     +rippleDirection*cos(ripplePhase)*visibleRipples*.006;
   normal=normalize((viewMatrix*vec4(-chop.x,1.,-chop.y,0.)).xyz);
  `);
 };
 return material;
}

// East is +X and north is -Z, matching the city compass.
// Exact bounds of the permanent lot template, including future civic milestones.
const cityGrowthBoundsCache=new Map();
function cityGrowthBounds(population,shopCount){
 const n=Math.max(1,Math.floor(Number(population)||1)),shops=Math.max(1,Math.floor(shopCount??Math.round(n/28))),key=n+':'+shops;
 if(cityGrowthBoundsCache.has(key))return {...cityGrowthBoundsCache.get(key)};
 let houses=0,stores=0,block=0,minX=Infinity,maxX=-Infinity,minZ=Infinity,maxZ=-Infinity;
 function include(index){const p=spiralCell(index),x=p.col*BLOCK_X,z=p.row*BLOCK_Z;minX=Math.min(minX,x-BLOCK_X/2);maxX=Math.max(maxX,x+BLOCK_X/2);minZ=Math.min(minZ,z-BLOCK_Z/2);maxZ=Math.max(maxZ,z+BLOCK_Z/2);}
 while(houses<n||stores<shops){for(let slot=0;slot<LOT_COLS*LOT_ROWS;slot++){const type=slotType(block,slot);if(type==='house')houses++;else if(type==='shop')stores++;}include(block++);}
 for(let i=0;i<PUBLIC_STEPS.length;i++)if(n>=PUBLIC_STEPS[i].at)include(facilityBlock(i));
 for(let i=PUBLIC_STEPS.length;n>=6000+(i-PUBLIC_STEPS.length)*1000;i++)include(facilityBlock(i));
 const result={minX,maxX,minZ,maxZ};if(cityGrowthBoundsCache.size>=256)cityGrowthBoundsCache.delete(cityGrowthBoundsCache.keys().next().value);cityGrowthBoundsCache.set(key,result);return {...result};
}
function cityPreviewLots(population,limit){const n=Math.max(1,Math.floor(population)),m=Math.min(n,Math.max(1,Math.floor(limit))),wanted=new Set(Array.from({length:m},(_,i)=>Math.round(i*(n-1)/Math.max(1,m-1)))),out=[];let index=0,block=0;while(index<n){const cell=spiralCell(block);for(let slot=0;slot<LOT_COLS*LOT_ROWS&&index<n;slot++)if(slotType(block,slot)==='house'){if(wanted.has(index))out.push({x:cell.col*BLOCK_X+(slot%LOT_COLS-(LOT_COLS-1)/2)*LOT_X,z:cell.row*BLOCK_Z+(Math.floor(slot/LOT_COLS)-(LOT_ROWS-1)/2)*LOT_Z,index});index++;}block++;}return out;}
function worldCityCells(selected=homes){
 const cells=new Map();for(const h of selected){const p=spiralCell(h.blockIndex);cells.set(p.col+':'+p.row,p);}for(const shop of shopPurchases){const p=spiralCell(shop.block);cells.set(p.col+':'+p.row,p);}for(const zone of publicZones()){const p=spiralCell(zone.block);cells.set(p.col+':'+p.row,p);}return [...cells.values()];
}
function buildRegionalLandscape(houses){const steps=buildRegionalStages(houses);while(!steps.next().done){}}
function* buildRegionalStages(houses){
 let regionalMark=window.ReviewPerformance?performance.now():null;
 const markRegion=label=>{if(regionalMark===null)return;const now=performance.now();window.ReviewPerformance.recordStage(label,now-regionalMark);regionalMark=now;};
 const city=currentCity;
 const roadPlan=typeof window!=='undefined'&&window.WorldRoads&&window.WorldAtlas?window.WorldRoads.cityPlan(city,worldCityCells(houses),window.WorldAtlas,{footprintFor:cityGrowthBounds,states:cityStates}):null;
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
 const region=window.WorldGeography?WorldGeography.makeRegion(city,{minX,maxX,minZ,maxZ,neighbors:roadPlan?.neighbors||[],spaceScale:roadPlan?.spaceScale||1}):null;
 markRegion('Geografia e costa');
 yield;
 if(region){group.userData.geography=region;for(const ground of scene.children.filter(m=>m.userData.regionalGround))WorldGeography.clipMaterial(ground.material,region);}
 const coastFrame=coast&&typeof window!=='undefined'&&window.WorldTerrain?window.WorldTerrain.coastFrame(coast,{minX,maxX,minZ,maxZ}):null;
 shore=coastFrame?coastFrame.shore:shore+85+(coast?.[1]||0)*1000;
 if(region?.hasWater){
  regionalWaterUniform={value:0};
  const material=regionalWaterMaterial(regionalWaterUniform);
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
   const y=dry?REGIONAL_GROUND_Y-.07:REGIONAL_GROUND_Y+peak-.02;
   position.setXYZ(index,x,y,z);
   uv.setXY(index,x/TERRAIN_TEXTURE_METERS,-z/TERRAIN_TEXTURE_METERS);
   
   const rock=Math.max(0,Math.min(1,(peak-110)/360));
   groundTint.copy(meadow).lerp(foothillGreen,Math.min(1,peak/170)).lerp(stone,rock);
   if(peak>620)groundTint.lerp(snow,Math.min(.92,(peak-620)/430));

   colors.push(groundTint.r,groundTint.g,groundTint.b);
  }
  terrain.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  terrain.computeVertexNormals();
  if(region)terrainHeight=WorldGeography.heightSampler(terrain,axisX,axisZ,edge);

  const mountainMaterial=regionalTerrainMaterial(true);
  if(region)WorldGeography.clipMaterial(mountainMaterial,region,'mountain');
  const foothills=new THREE.Mesh(terrain,mountainMaterial);
  foothills.receiveShadow=true;
  foothills.userData.regionalMountain=true;
  group.add(foothills);
 }



 markRegion('Rilievi e materiali');
 yield;
 if(roadPlan&&window.WorldTerrain)window.WorldTerrain.prepare(roadPlan,terrainHeight,region||coastFrame);
 if(roadPlan)group.userData.roadPlan=roadPlan;
 group.userData.terrainHeight=terrainHeight;
 // The urban street grid owns developed blocks. Regional routes must never
 // lay a second diagonal carriageway across their public and private parcels.
 if(roadPlan){
  const firstRoadMesh=group.children.length;
  window.WorldRoads.draw3D(roadPlan,group,terrainHeight,(x,z)=>region?region.landDistance(x,z)>15:!coast||x*east+z*south<shore-20,(a,b)=>roadQuadOverlapsDevelopedBlocks(a,b,cleared));
  for(let i=firstRoadMesh;i<group.children.length;i++){
   const roadMesh=group.children[i];
   if(roadMesh.userData.intercityRoad&&roadMesh.material.color?.getHex()===0x474d58)applyStreetTexture(roadMesh.material,true);
  }
 }
 markRegion('Strade esterne');
 yield;
 const candidates=[],spacing=48,horizon=6500;
 for(let col=Math.floor(-horizon/spacing);col<=Math.ceil(horizon/spacing);col++){
  for(let row=Math.floor(-horizon/spacing);row<=Math.ceil(horizon/spacing);row++){
   const i=col*73856093^row*19349663;
   const x=(col+rnd(i+city.lng))*spacing,z=(row+rnd(i+city.lat+37))*spacing;
   const radial=Math.hypot(x,z),nearKeep=1-Math.max(0,Math.min(1,(radial-4700)/1900));
   if(radial>6500||rnd(i+1927)>nearKeep)continue;
   if(window.WorldRoads?.nearSettlement(x,z,roadPlan,40))continue;
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
   const vegetation=region?.vegetation?region.vegetation(x,z):(1-aridity*.987)*(1-coldness*.97);
   if(rnd(i*79)>density*grove*vegetation)continue;
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

 markRegion('Alberi vicini');
 yield;
 if(region&&window.WorldForest){const options={group,region,plan:roadPlan,height:terrainHeight,city,bounds:{minX,maxX,minZ,maxZ}};if(WorldForest.buildSteps)yield* WorldForest.buildSteps(options);else WorldForest.build(options);}
 markRegion('Bosco lontano');
 yield;
 if(roadPlan&&window.WorldNeighbors)WorldNeighbors.build({group,city,footprintFor:cityGrowthBounds,previewLots:cityPreviewLots,camera,container:$('threeLayer'),plan:roadPlan,height:terrainHeight,states:cityStates,getCamera:()=>({target:{...target},distance,azimuth,elevation}),setCamera:state=>{Object.assign(target,state.target);distance=state.distance;azimuth=state.azimuth;elevation=state.elevation;updateCamera();},onEnter:enterNeighborCity});
 markRegion('Anteprime città vicine');
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
   vec3 horizon=vec3(.69,.82,.89);
   vec3 color=mix(horizon,vec3(.035,.54,.92),smoothstep(-.015,.31,height));
   vec2 cloudPlane=ray.xz/max(height+.10,.09);
   float cloudBase=noise(cloudPlane*3.),cloudDetail=noise(cloudPlane*7.+vec2(9.7,-3.1));
   float cloud=.63*cloudBase+.26*cloudDetail+.11*noise(cloudPlane*15.+vec2(-2.4,11.8));
   color=mix(color,mix(vec3(.69,.79,.87),vec3(1.,.99,.95),smoothstep(.56,.77,cloud)),
             smoothstep(.55,.70,cloud)*smoothstep(.025,.14,height)*.95);
   if(ridgeStrength>.01){
     float influence=smoothstep(-.22,.76,dot(normalize(ray.xz+vec2(.00001)),ridgeDirection))*ridgeStrength;
     float haze=smoothstep(-.02,.018,height);
     for(int layer=0;layer<3;layer++){
       float l=float(layer);
       vec2 ridge=ray.xz*(4.+l*2.)+vec2(l*17.,0.);
       float summit=(.007+(.106-l*.017)*pow(noise(ridge),1.7)+.009*noise(ridge*5.))*influence;
       float lightSide=noise(ridge*5.+vec2(height*95.,height*65.));
       vec3 rock=mix(vec3(.36,.55,.67),vec3(.21,.41,.56),l*.35);
       rock*=.90+lightSide*.22;
       float snow=smoothstep(.054,.089,height+lightSide*.022)*smoothstep(.064,.088,summit);
       vec3 slope=mix(rock,vec3(.89,.94,.97),snow);
       float skyline=1.-smoothstep(summit-.0015,summit+.0015,height);
       color=mix(color,slope,haze*smoothstep(.015,.10,influence)*skyline);
     }
   }
   gl_FragColor=vec4(color,1.);
 }`});
 releaseSky=new THREE.Mesh(new THREE.SphereGeometry(3000,32,20),mat);releaseSky.frustumCulled=false;releaseSky.renderOrder=-1000;scene.add(releaseSky);
}
function makeScene(){if(!window.THREE){$('status').textContent='Motore 3D non caricato. Verifica Internet e ricarica.';return false}scene=new THREE.Scene();scene.background=new THREE.Color(0x9bc9e7);scene.fog=new THREE.FogExp2(0xb4d1e2,.000048);installReleaseSky();camera=new THREE.PerspectiveCamera(53,1,2,8000);renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=false;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=0.98;$('threeLayer').appendChild(renderer.domElement);scene.add(new THREE.HemisphereLight(0xc2dbff,0xaaa08f,.82));let sun=new THREE.DirectionalLight(0xffecd4,3.45);sun.position.set(130,240,90);scene.add(sun);if(window.SudamericaRender8)SudamericaRender8.setup(scene,camera,renderer);
const groundGeometry=new THREE.PlaneGeometry(100000,100000).rotateX(-Math.PI/2);
const groundPositions=groundGeometry.attributes.position,groundUV=groundGeometry.attributes.uv;
for(let i=0;i<groundPositions.count;i++)groundUV.setXY(i,groundPositions.getX(i)/TERRAIN_TEXTURE_METERS,-groundPositions.getZ(i)/TERRAIN_TEXTURE_METERS);
const ground=new THREE.Mesh(groundGeometry,regionalTerrainMaterial());
ground.position.y=REGIONAL_GROUND_Y;ground.receiveShadow=true;ground.userData.regionalGround=true;scene.add(ground);group=new THREE.Group();scene.add(group);raycaster=new THREE.Raycaster();let canvas=renderer.domElement;
// Earth-style navigation: left drag pans the ground, right drag or Shift
// rotates/tilts, wheel zooms toward the cursor, two fingers pan/pinch/rotate.
canvas.style.touchAction='none';
canvas.addEventListener('contextmenu',e=>e.preventDefault());
const pointerStart=new Map();
let navigationFrame=0,multiTouch=false,zoomAnchor=null;
const scheduleNavigation=()=>{
 if(navigationFrame)return;
 navigationFrame=requestAnimationFrame(()=>{
  navigationFrame=0;
  const anchor=zoomAnchor;zoomAnchor=null;
  if(!active)return;
  updateCamera();
  if(!anchor)return;
  const ground=anchor.ground&&screenToGround(anchor.x,anchor.y);
  if(ground){
   target.x+=anchor.ground.x-ground.x;
   target.z+=anchor.ground.z-ground.z;
  }else if(anchor.x!==anchor.fromX||anchor.y!==anchor.fromY){
   panPixels(anchor.x-anchor.fromX,anchor.y-anchor.fromY);
  }else return;
  updateCamera();
 });
};
function anchorNavigation(fromX,fromY,x,y){
 if(!zoomAnchor)zoomAnchor={ground:screenToGround(fromX,fromY),fromX,fromY,x,y};
 zoomAnchor.x=x;zoomAnchor.y=y;
 scheduleNavigation();
}
canvas.addEventListener('pointerdown',e=>{
 pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
 pointerStart.set(e.pointerId,{x:e.clientX,y:e.clientY});
 dragging=true;if(pointers.size===1){moved=false;multiTouch=false;}else{multiTouch=true;moved=true;}
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
  if(before>12&&after>12)zoomBy(after/before);
  const beforeAng=Math.atan2(prev[1].y-prev[0].y,prev[1].x-prev[0].x);
  const afterAng=Math.atan2(pts[1].y-pts[0].y,pts[1].x-pts[0].x);
  azimuth-=Math.atan2(Math.sin(afterAng-beforeAng),Math.cos(afterAng-beforeAng));
  anchorNavigation(
   (prev[0].x+prev[1].x)/2,(prev[0].y+prev[1].y)/2,
   (pts[0].x+pts[1].x)/2,(pts[0].y+pts[1].y)/2
  );
  moved=true;return;
 }
 const origin=pointerStart.get(e.pointerId);
 if(origin&&Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>4)moved=true;
 if(gesture==='pan')panPixels(dx,dy);
 else{azimuth-=dx*.006;elevation=clamp(elevation+dy*.004,.22,1.55);}
 scheduleNavigation();
});
function releaseNavigationPointer(e,allowPick){
 if(!pointers.has(e.pointerId))return;
 const start=pointerStart.get(e.pointerId);
 pointers.delete(e.pointerId);pointerStart.delete(e.pointerId);
 if(!pointers.size){dragging=false;gesture=null;
  if(allowPick&&!moved&&!multiTouch&&start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)<5&&e.button===0)pick(e);
 }else{
  gesture=pointers.size>1?'pinch':(panMode?'pan':'orbit');
  for(const [id,p]of pointers)pointerStart.set(id,p);
 }
}
canvas.addEventListener('pointerup',e=>releaseNavigationPointer(e,true));
canvas.addEventListener('pointercancel',e=>releaseNavigationPointer(e,false));
canvas.addEventListener('lostpointercapture',e=>releaseNavigationPointer(e,false));
canvas.addEventListener('wheel',e=>{
 e.preventDefault();
 const wheelDelta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?canvas.clientHeight:1);
 zoomBy(Math.exp(-clamp(wheelDelta,-200,200)*.0012));
 anchorNavigation(e.clientX,e.clientY,e.clientX,e.clientY);
},{passive:false});
 resize();
 window.addEventListener('keydown',e=>{
 if(!active||document.activeElement?.closest('#v4Panel')||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
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
window.addEventListener('resize',resize);threeReady=true;animate();return true}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function zoomBy(factor){distance=clamp(distance/Math.max(.01,factor),12,24000);}
function panPixels(dx,dy){
 // Pixel-to-ground projection using the camera's actual right and up vectors.
 // This stays consistent at every tilt angle.
 const scale=2*distance*Math.tan(camera.fov*Math.PI/360)/Math.max(1,renderer.domElement.clientHeight);
 const axes=camera.matrixWorld.elements;
 const flatY=Math.max(.22,Math.sin(elevation));
 target.x+=(-dx*axes[0]+dy*axes[4]/flatY)*scale;
 target.z+=(-dx*axes[2]+dy*axes[6]/flatY)*scale;
}
function screenToGround(clientX,clientY){
 if(!camera||!renderer)return null;
 const r=renderer.domElement.getBoundingClientRect();
 if(r.width<1||r.height<1)return null;
 const ndc=new THREE.Vector2((clientX-r.left)/r.width*2-1,-(clientY-r.top)/r.height*2+1);
 const ray=new THREE.Raycaster();ray.setFromCamera(ndc,camera);
 if(ray.ray.direction.y>=-.0001)return null;
 const t=-ray.ray.origin.y/ray.ray.direction.y;
 if(t<0||t>100000)return null;
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
 distance=clamp(Number.isFinite(distance)?distance:180,12,24000);
 if(scene?.fog?.isFogExp2)scene.fog.density=.000048*Math.min(1,5200/distance);
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
 // Preserve depth precision for garden surfaces against the continental terrain.
 camera.near=Math.max(.65,Math.min(100,distance*.032));
 camera.far=Math.max(48000,distance*5);
 camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
}
function flyToWorld(point,opts={}){
 if(!active)return enter().then(ok=>ok?flyToWorld(point,opts):null);
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
let roadDetailFrustum,roadDetailMatrix,roadDetailSphere;
function updateRoadDetailLOD(now){
 if(!roadDetailMeshes.length||now-lastRoadDetailUpdate<160)return;
 lastRoadDetailUpdate=now;
 const maxRange=distance>1050?0:distance>480?260:distance>220?340:410;
 if(!maxRange){for(const mesh of roadDetailMeshes)mesh.visible=false;return;}
 if(!roadDetailFrustum){
  roadDetailFrustum=new THREE.Frustum();
  roadDetailMatrix=new THREE.Matrix4();
  roadDetailSphere=new THREE.Sphere(new THREE.Vector3(),125);
 }
 roadDetailMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
 roadDetailFrustum.setFromProjectionMatrix(roadDetailMatrix);
 for(const mesh of roadDetailMeshes){
  const c=mesh.userData.roadDetailChunk;
  const radius=c.radius||125,max2=(maxRange+radius)**2;
  if((c.x-target.x)**2+(c.z-target.z)**2>max2){mesh.visible=false;continue;}
  roadDetailSphere.radius=radius;
  roadDetailSphere.center.set(c.x,0,c.z);
  mesh.visible=roadDetailFrustum.intersectsSphere(roadDetailSphere);
 }
}
// Commercial LOD: each 90m chunk has independently culled decorative
// meshes. The shop silhouette, roof, windows and entrance stay visible.
let shopDetailMeshes=[],lastShopDetailUpdate=0;
let shopDetailFrustum,shopDetailMatrix,shopDetailSphere;
function updateShopDetailLOD(now){
 if(!shopDetailMeshes.length||now-lastShopDetailUpdate<180)return;
 lastShopDetailUpdate=now;
 const range=distance>850?0:distance>450?125:distance>220?195:275;
 if(!range){for(const mesh of shopDetailMeshes)mesh.visible=false;return;}
 if(!shopDetailFrustum){
  shopDetailFrustum=new THREE.Frustum();
  shopDetailMatrix=new THREE.Matrix4();
  shopDetailSphere=new THREE.Sphere();
 }
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
function reviewSceneWorkload(){
 const categories={},residents=new Set(residentBatches?.meshes||[]);
 group.traverse(mesh=>{
  if(!mesh.isMesh)return;
  for(let parent=mesh;parent;parent=parent.parent)if(!parent.visible)return;
  const data=mesh.userData;
  const category=data.birdInstances?'birds':data.urbanTreeTrunk||data.urbanTreeCanopy||data.urbanTreeCanopyBatch||data.urbanTreeTrunkBatch?'urbanTrees':residents.has(mesh)?'residents':data.homes||data.home?'houses':data.shops?'shops':data.regionalForest||data.farForest||data.farForestCanopies?'forest':data.regionalWater?'water':'other';
  const value=categories[category]||(categories[category]={meshes:0,instances:0,triangles:0});
  const instances=mesh.isInstancedMesh?mesh.count:1;
  value.meshes++;value.instances+=instances;value.triangles+=(mesh.geometry.index?.count||mesh.geometry.attributes.position.count)/3*instances;
 });
 return {scope:'Scene totals before frustum culling',categories};
}
let lastRenderedFrame=0,measuredRenderGroup=null;
function renderFrameDue(now,minInterval){
  const elapsed=now-lastRenderedFrame;
  // Browser timestamps can be rounded to tenths of a millisecond.
  if(elapsed+.75<minInterval)return false;
  lastRenderedFrame+=Math.max(1,Math.floor(elapsed/minInterval))*minInterval;
  lastRenderedFrame=Math.min(now,lastRenderedFrame);
  return true;
}
function animate(now=0){
  if(!renderer)return;
  requestAnimationFrame(animate);
  if(!active||document.hidden||cityBuildDepth>0)return;
  // Keep a stable60FPS ceiling without skipping frames due to timestamp rounding.
  const minInterval=1000/60;
  if(!renderFrameDue(now,minInterval))return;
  const t=now*.001;
  if(window.WorldNeighbors)WorldNeighbors.update(now);
  if(regionalWaterUniform)regionalWaterUniform.value=t;
  updateProgressiveDetails();
  updateRoadDetailLOD(now);
  updateShopDetailLOD(now);
  animateLife(t);
  updateAvatarLabels(t);
  if(releaseSky)releaseSky.position.copy(camera.position);
  try{drawCityFrame(minInterval);}catch(error){recoverCityEntry(error,currentCity.id);}
}
function drawCityFrame(minInterval=1000/60){
  if(renderer.getContext().isContextLost())throw Error('WebGL context lost');
  const measureFirst=window.ReviewPerformance&&measuredRenderGroup!==group;
  const drawStarted=measureFirst?performance.now():0;
  if(window.SudamericaRender8)SudamericaRender8.render(scene,camera,renderer,minInterval);
  else renderer.render(scene,camera);
  if(measureFirst){measuredRenderGroup=group;window.ReviewPerformance.recordStage('Primo disegno della città',performance.now()-drawStarted);window.ReviewPerformance.recordFirstDraw?.({calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,programs:renderer.info.programs?.length||0,scene:reviewSceneWorkload()});}
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
 applyStreetTexture(material,asphalt);
 streetSurfaceMaterials.set(color,material);
 return material;
}
function applyStreetTexture(material,asphalt){
 material.onBeforeCompile=shader=>{
   shader.vertexShader='varying vec2 citySurface;\n'+shader.vertexShader.replace(
     '#include <begin_vertex>',
     '#include <begin_vertex>\nvec4 surfacePosition=vec4(position,1.);\n#ifdef USE_INSTANCING\nsurfacePosition=instanceMatrix*surfacePosition;\n#endif\ncitySurface=(modelMatrix*surfacePosition).xz;');
   shader.fragmentShader='varying vec2 citySurface;\n'+shader.fragmentShader.replace(
     '#include <color_fragment>',
     '#include <color_fragment>\n'+(asphalt?
       `
        float streetPixel=max(length(dFdx(citySurface)),length(dFdy(citySurface)));
        vec2 grit=floor(citySurface*28.);
        float stone=fract(sin(dot(grit,vec2(27.1,61.7)))*43758.5)-.5;
        float gritDetail=1.-smoothstep(.012,.059,streetPixel);
        float surfaceTone=sin(dot(citySurface,vec2(.263,-.191))+sin(dot(citySurface,vec2(.149,.412))));
        float broadDetail=1.-smoothstep(.9,5.,streetPixel);
        diffuseColor.rgb*=1.+stone*.13*gritDetail+surfaceTone*.029*broadDetail;
       `:`
        float streetPixel=max(length(dFdx(citySurface)),length(dFdy(citySurface)));
        vec2 slab=citySurface*vec2(2.65,1.85);
        slab.x+=mod(floor(slab.y),2.)*.5;
        vec2 tile=fract(slab),edge=min(tile,1.-tile);
        float softWidth=clamp(streetPixel*1.65,.018,.16);
        float grout=1.-smoothstep(.028,.028+softWidth,min(edge.x,edge.y));
        float tileTone=fract(sin(dot(floor(slab),vec2(51.7,9.3)))*43758.5)-.5;
        float detail=1.-smoothstep(.065,.24,streetPixel);
        diffuseColor.rgb*=1.+(tileTone*.055-grout*.23)*detail;
       `));
 };
 material.customProgramCacheKey=()=>asphalt?'city-asphalt-aggregate':'city-pavers-soft-joints';
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
 trunk.castShadow=true;trunk.userData.urbanTreeTrunk=true;
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
 canopy.castShadow=true;canopy.userData.urbanTreeCanopy=true;
 canopy.receiveShadow=true;
 canopy.computeBoundingSphere();
 group.add(canopy);
}

function civicFlowerbed(x,z,w,d,seed,elevation=0){
  addBox(w,.18,d,x,.18+elevation,z,0x4e9a63);
  const palette=[0xe989a6,0xf4d86b,0x9d80d2,0xfff4e1,0xf1856c];
  for(let j=0;j<7;j++){
    const xx=x+(rnd(seed*71+j)-.5)*(w-.6),zz=z+(rnd(seed*41+j+10)-.5)*(d-.5);
    const blossom=new THREE.Mesh(new THREE.IcosahedronGeometry(.24,0),new THREE.MeshLambertMaterial({color:palette[(seed+j)%palette.length]}));
    blossom.position.set(xx,.48+elevation,zz);group.add(blossom);
  }
}
function civicBench(x,z){
  urbanBench((color,x,y,z,w,h,d)=>addBox(w,h,d,x,y,z,color),x,z,.26,-1);
}
function makeHouse(h) {
  const height = [2.4,3,3.8,5.6,7.3,2.8,4.4][h.type];
  const width = [2.7,3.5,3,4.1,4.3,3.3,3.7][h.type];
  const depth = [2.7,3.2,3.4,3.6,3.8,3.5,3.2][h.type];
  if (h.garden) addBox(12.7,.035,11.8,h.x,.015,h.z,houseLawnColor(h));
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
 const w=b.width,d=b.depth,batches=new Map(),pavingTop=.12;
 const geometries={box:new THREE.BoxGeometry(1,1,1),glass:new THREE.BoxGeometry(1,1,1),
  cylinder:new THREE.CylinderGeometry(1,1,1,20),dome:new THREE.SphereGeometry(1,20,12,0,Math.PI*2,0,Math.PI/2),
  wheel:new THREE.CylinderGeometry(1,1,1,10),
  fieldRing:new THREE.RingGeometry(.975,1,48).rotateX(-Math.PI/2)};
 geometries.wheel.rotateZ(Math.PI/2);
 const add=(geometry,color,fx,y,fz,sx,sy,sz,rotation=0,pitch=0)=>{
  if(![fx,y,fz,sx,sy,sz].every(Number.isFinite)||Math.min(sx,sy,sz)<=0)throw Error('Geometria pubblica '+kind);
  if(!batches.has(geometry))batches.set(geometry,[]);
  batches.get(geometry).push({color,x:b.x+fx*w,y,z:b.z+fz*d,sx,sy,sz,rotation,pitch});
 };
 const box=(color,fx,y,fz,fw,h,fd,glass=false,rotation=0)=>add(glass?'glass':'box',color,fx,y,fz,fw*w,h,fd*d,rotation);
 const round=(color,fx,y,fz,r,h)=>add('cylinder',color,fx,y,fz,r,h,r);
 const tyre=(fx,y,fz,radius,thickness,color=0x303c42)=>add('wheel',color,fx,y,fz,thickness,radius,radius);
 const building=(fx,fz,fw,fd,floors,wall,trim,entranceWidth=0)=>{
  const height=floors*3.5;
  box(wall,fx,height/2+.18,fz,fw,height,fd);
  box(trim,fx,height+.34,fz,fw+.018,.40,fd+.012);
  box(0xe5dcc9,fx,(.57+pavingTop)/2,fz,fw+.014,.57-pavingTop,fd+.008);
  const frontWindowAllowed=(face,level,offset,width)=>face!==1||level!==0||!entranceWidth||Math.abs(offset)>entranceWidth/2+width/2+.025;
  for(let level=0;level<floors;level++){
   const y=1.92+level*3.5;
   const columns=Math.max(2,Math.floor(fw*w/4.3));
   for(const face of [-1,1]){
    for(let column=0;column<columns;column++){
     const wx=fx+((column+.5)/columns-.5)*fw;
     const windowWidth=fw*.66/columns;
     if(!frontWindowAllowed(face,level,wx-fx,windowWidth))continue;
     box(0x42869e,wx,y,fz+face*(fd/2+.0018),windowWidth,1.64,.003,true);
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
    if(!frontWindowAllowed(face,level,wx-fx,ww))continue;
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
  const depth=size*.09,arm=size*.27,remaining=(size-arm)/2;
  add('box',color,fx,y,fz,size,arm,depth);
  for(const side of [-1,1])add('box',color,fx,y+side*(size+arm)/4,fz,arm,remaining,depth);
 };
 const medicalEmblem=(fx,y,wallZ,size)=>{
  add('box',0xf0eee5,fx,y,wallZ+.06/d,size*1.27,size*1.27,.16);
  cross(fx,y,wallZ+(.132+size*.045)/d,size,0xc23740);
 };
 const ambulance=(fx,fz)=>{
  const body=0xefeee5,glass=0x385e70,red=0xc73842,bumper=0x56676e;
  box(body,fx,1.02,fz,.062,1.22,.062);
  box(body,fx,1.75,fz-.012,.062,1.62,.037);
  box(body,fx,1.76,fz+.011,.058,1.25,.034);
  box(glass,fx,1.91,fz+.029,.049,.53,.004,true);
  box(bumper,fx,.71,fz+.032,.063,.20,.006);
  cross(fx,1.35,fz+.031+.020/d,.50,red);
  for(const side of [-1,1]){
   for(const end of [-1,1])tyre(fx+side*.032,.67,fz+end*.020,.47,.23);
   box(red,fx+side*.031,1.31,fz-.009,.003,.12,.041);
   box(glass,fx+side*.030,1.86,fz+.017,.003,.49,.018,true);
   box(glass,fx+side*.031,2.02,fz-.015,.003,.39,.019,true);
   box(0xf8e5ad,fx+side*.022,1.16,fz+.033,.009,.19,.004);
   box(red,fx+side*.021,1.15,fz-.032,.009,.20,.004);
  }
  box(0x384c54,fx,2.60,fz-.001,.035,.13,.009);
  for(const side of [-1,1])box(0x51aad8,fx+side*.010,2.71,fz-.001,.014,.17,.008);
 };
 const car=(fx,fz,color,emergency=false)=>{
  box(color,fx,1.05,fz,.058,1.22,.060);
  box(0x315d75,fx,1.95,fz-.007,.046,.68,.033,true);
  for(const side of [-1,1])for(const end of [-1,1])tyre(fx+side*.031,.66,fz+end*.020,.47,.23);
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
  const doorFront=fz+.13/d,metal=0xc9d6d0;
  box(0x263e4a,fx,1.45,fz+.052/d,width+.012,2.66,.135/d);
  for(const side of [-1,1]){
   box(0x477b90,fx+side*width*.254,1.53,doorFront,width*.466,2.34,.055/d,true);
   box(metal,fx+side*(width/2+.002),1.48,doorFront,.006,2.76,.11/d);
   box(0xe9d7aa,fx+side*.013,1.35,doorFront+.045/d,.003,.35,.055/d);
  }
  box(metal,fx,1.48,doorFront,.003,2.76,.12/d);
  box(0xe8dfcc,fx,2.87,doorFront,width+.018,.18,.22/d);
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
  if(type==='football'){
   const circle=Math.min(w,d)*.102;
   add('fieldRing',line,0,.352,fz,circle,1,circle);
   round(line,0,.341,fz,.12,.025);
   for(const side of [-1,1]){
    const touchLine=fz+side*.237,goalBack=fz+side*.263;
    const goal=0xe6e5d9,net=0xb7c2b6;
    for(const [width,depth] of [[.378,.117],[.229,.049]]){
     const outer=fz+side*(.24-depth);
     for(const edge of [-1,1])box(line,edge*width/2,.344,fz+side*(.24-depth/2),.004,.024,depth);
     box(line,0,.344,outer,width-.004,.024,.002);
    }
    round(line,0,.341,fz+side*.143,.12,.023);
    box(goal,0,2.13,touchLine,.20,.10,.003);
    const rise=1.75,run=(goalBack-touchLine)*d;
    for(const post of [-1,1]){
     box(goal,post*.095,1.21,touchLine,.004,1.82,.003);
     add('box',goal,post*.095,.35+rise/2,(touchLine+goalBack)/2,.058,Math.hypot(rise,run),.058,0,-Math.atan2(run,rise));
    }
    for(let strand=1;strand<=6;strand++){
     const t=strand/7;
     add('box',net,0,.35+t*rise,goalBack+(touchLine-goalBack)*t,.19*w,.029,.027);
    }
   }
  }
 };
 const stands=(fz=-.06,large=false)=>{
  const steps=large?5:3;
  for(const side of [-1,1])for(let step=0;step<steps;step++){
   const x=side*(.36+step*.020),height=.72+step*.57;
   box(0xc6c0a9,x,(height+pavingTop)/2,fz,.020,height-pavingTop,.55);
   box(step%2?0xe6ba65:0x5a7f9a,x,height+.04,fz,.020,.08,.55);
  }
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
  const lobbyZ=hospital?.083:.045,lobbyDepth=hospital?.25:.17,lobbyFront=lobbyZ+lobbyDepth/2;
  building(0,lobbyZ,.38,lobbyDepth,1,white,blue,.14);
  canopy(0,3.53,lobbyFront+.026,.30,.085,blue);
  frontDoor(0,lobbyFront,.14);
  medicalEmblem(0,4.12,lobbyFront+.0685,1.30);
  if(hospital)medicalEmblem(0,10.66,-.03,2.34);
  box(0x798b93,0,.16,.34,.77,.08,.21);
  for(const side of [-1,1])ambulance(side*.22,.34);
  if(hospital){
   round(0x4f707b,0,tower+.05,-.27,Math.min(w*.14,6),.18);
   box(0xf1e0a2,0,tower+.17,-.27,.07,.025,.006);
   for(const side of [-1,1])box(0xf1e0a2,side*.035,tower+.17,-.27,.010,.025,.038);
   for(const side of [-1,1])box(0x819b9b,side*.22,roof+.50,-.15,.08,1.02,.037);
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
  building(0,-.23,.80,.16,university?4:nursery?1:2,0xe6d4ad,accent,.13);
  for(const side of [-1,1])building(side*.31,-.02,.17,.30,university?3:1,0xeee0c1,accent);
  frontDoor(0,-.15,.13);
  box(0xcdb994,0,.14,.16,.38,.08,.23);
  if(university){
   columns(-.125,.52,4.0);
   round(0x589da2,0,14.82,-.23,3.9,.60);
   add('dome',0x6b9f9f,0,15.12,-.23,3.80,1.65,3.80);
  }else{
   box(0x69a7a2,0,.22,.20,.42,.12,.20);
   for(const side of [-1,1]){
    box(0xe4aa55,side*.13,1.45,.20,.012,2.45,.010);
    box(0xc35b42,side*.13,2.75,.20,.12,.20,.045);
    box(0x5d88a7,side*.13,.70,.22,.09,.12,.035);
   }
   if(nursery){round(0x485f62,0,.255,.35,.38,.27);round(0xe4c26c,0,.50,.35,3.4,.22);}
  }
  labelColor=accent;
 }else if(kind==='townhall'||kind==='courthouse'||kind==='museum'||kind==='library'){
  const civic=kind==='townhall',justice=kind==='courthouse',museum=kind==='museum';
  const roof=building(0,-.16,.78,.27,justice?3:museum?2:3,0xe3d9c6,0x6d8b87,.12);
  for(const side of [-1,1])building(side*.30,-.01,.15,.19,2,0xd7c7ad,0x537d7e);
  columns(.012,.62,4.1);frontDoor(0,-.025,.12);
  if(civic){
   const top=building(0,-.23,.18,.10,6,0xe5d7ba,0x497a80);
   round(0xf3e3b9,0,top-2,-.174,1.12,.18);
   cross(0,top-2,-.168,1.12,0x45636a);
  }else if(museum){
   add('dome',0x799e9b,0,roof,-.16,w*.17,4.5,d*.09);
  }else if(!justice){
   for(const side of [-1,1])box(0x6b9b9e,side*.16,roof+.105,-.16,.20,.22,.16,true);
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
  box(0xe2d5bb,0,(.425+pavingTop)/2,.02,.70,.425-pavingTop,.45);
  box(0x2dacc5,0,.475,.02,.62,.12,.40,true);
  for(const lane of [-.24,-.12,0,.12,.24]){
   box(0x326481,lane,.545,.02,.008,.015,.38);
   box(0xf4e1a5,lane,.60,.245,.045,.35,.019);
  }
  for(const side of [-1,1])canopy(side*.39,2.9,.025,.10,.40,0xd7b46c);
  labelColor=0x2d8b9f;
 }else if(kind==='bus'||kind==='station'){
  const rail=kind==='station';
  building(-.28,-.17,.24,.26,2,0xded1b6,0x3b7d89);
  if(rail){
   // The island platform is between the tracks. Rails and sleepers remain visible on both sides.
   box(0xc2b7a3,.095,.37,.07,.108,.50,.66);
   for(const side of [-1,1])box(0xe7d38f,.095+side*.050,.635,.07,.005,.026,.65);
   canopy(.095,4.5,.04,.135,.56,0x4d7a87);
  }
  for(const fx of [-.02,.21]){
   if(rail){
    box(0x87897e,fx,.155,.07,.083,.07,.79);
    for(let sleeper=0;sleeper<18;sleeper++)box(0x786b59,fx,.205,-.30+sleeper*.044,.077,.06,.010);
    for(const side of [-1,1]){
     box(0x5b696d,fx+side*.026,.269,.07,.0045,.10,.79);
     for(const end of [-1,1])tyre(fx+side*.026,.669,.10+end*.10,.35,.31,0x37454b);
    }
    box(0x3b8fa2,fx,1.70,.10,.079,2.28,.30);
    box(0xbadce1,fx,2.20,.10,.081,.70,.27,true);
    box(0xc4d1c7,fx,2.88,.10,.081,.15,.28);
   }else{
    box(0xc2b7a3,fx+.10,.28,.07,.09,.32,.67);
    canopy(fx+.10,4.05,.04,.10,.50,0xb08a57);
    box(0x7e8f8f,fx,.157,.09,.084,.075,.58);
    for(const side of [-1,1])for(const end of [-1,1])tyre(fx+side*.036,.61,.10+end*.048,.42,.24,0x37454b);
    box(0x439e9a,fx,1.54,.10,.077,2.18,.15);
    box(0xadd6dd,fx,2.00,.10,.079,.75,.12,true);
   }
  }
  
 }else if(kind==='water'||kind==='waterworks'||kind==='power'||kind==='recycling'){
  building(0,-.31,.62,.12,1,0xd7dfcf,0x527c86);
  if(kind==='water'){
   for(const fx of [-.23,.23]){
    for(const side of [-1,1]){
     box(0xd0c5af,fx+side*.057,.21,-.02,.034,.18,.028);
     box(0xa3b4b3,fx+side*.057,5.525,-.02,.014,10.55,.018);
    }
    round(0xc4d5d1,fx,11.8,-.02,4.0,3.25);
    round(0x5298ab,fx,13.52,-.02,4.18,.19);
    box(0x579aa7,fx,5.31,.025,.017,10.38,.012);
   }
  }else if(kind==='waterworks'){
   for(const fx of [-.22,.22])for(const fz of [-.08,.20]){
    round(0xa1b1ab,fx,.66,fz,5.4,1.15);
    round(0x4b91a2,fx,1.26,fz,4.9,.08);
    box(0xd2c7ab,fx,1.36,fz,.25,.15,.017);
    for(const side of [-1,1])box(0x617874,fx+side*.105,1.78,fz,.004,.75,.005);
    box(0x617874,fx,2.18,fz,.216,.07,.005);
   }
  }else if(kind==='power'){
   for(const fx of [-.23,0,.23])for(const fz of [-.06,.18]){
    box(0x81978d,fx,1.42,fz,.13,2.4,.09);
    box(0xc1b99f,fx,.18,fz,.15,.12,.10);
    for(const side of [-1,1])round(0xd7cfb9,fx+side*.04,3.35,fz,.33,1.8);
   }
   for(const side of [-1,1])box(0x617b81,side*.40,5.12,.06,.009,10.0,.45);
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
    for(const end of [-1,1])box(0x685546,side*.25+end*.046,.46,.24,.005,.68,.030);
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
   for(const side of [-1,1])add('dome',0x74acb5,side*.20,7.54,-.13,w*.18,2.2,d*.12);
  }
  labelColor=accent;
 }else if(kind==='heliport'){
  building(-.29,-.22,.23,.20,2,0xd9dfd4,0x4e7e8f);
  round(0x657f83,0,.26,.08,Math.min(w*.39,d*.23),.34);
  round(0xa5b3a4,0,.455,.08,Math.min(w*.32,d*.20),.05);
  box(0xf1dd9a,0,.491,.08,.16,.024,.013);
  for(const side of [-1,1])box(0xf1dd9a,side*.078,.491,.08,.020,.024,.105);
  labelColor=0x3d778b;
 }else throw Error('Modello pubblico mancante '+kind);
 box(0xccbca1,0,.16,.37,.10,.10,.24);
 // Facility-specific furnishings, separate from the shared architectural trim.
 if(['hospital','clinic'].includes(kind)){
  for(const side of [-1,1]){
   // Keep the emergency bay markings on the paving, below the vehicles.
   for(let stripe=-1;stripe<=1;stripe++)box(0xf2e2a4,side*.22+stripe*.047,.215,.34,.003,.02,.19);
   box(0x2f5666,side*.31,.92,.16,.035,1.6,.018);
  }
 }else if(kind==='fire'){
  for(const side of [-1,1])box(0x788985,.30+side*.028,9.1,-.217,.005,15.4,.004);
  for(let rung=0;rung<15;rung++)box(0xd2d6cd,.30,2.2+rung*.98,-.215,.060,.09,.004);
  for(const side of [-1,1])box(0xe3ce99,side*.22,2.37,.209,.035,.20,.035);
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
   add('box',0x477f9a,.12,1.35,.25,.045*w,.10,.06*d,0,.34);
   box(0x586870,.12,.37,.277,.042,.50,.011);
   box(0xdab75e,.12,2.15,.215,.05,.16,.03);
   for(const side of [-1,1])box(0x586870,.12+side*.020,1.104,.20,.005,1.968,.005);
   for(let rung=0;rung<4;rung++)box(0xb64f42,.12,.45+rung*.41,.20,.045,.08,.005);
  }
 }else if(['library','museum','townhall','courthouse'].includes(kind)){
  for(const side of [-1,1]){
   box(0xddd1b6,side*.22,.49,.22,.065,.65,.045);
   if(kind==='museum')add('dome',side<0?0xb58b5d:0x799794,side*.22,.82,.22,.9,1.9,.9);
   else box(0x477b81,side*.22,1.56,.22,.052,1.5,.006);
  }
 }else if(['football','stadium','baseball','sports'].includes(kind)){
  if(kind!=='baseball')for(const side of [-1,1]){
   for(let wire=-4;wire<=4;wire++)box(0xdbe3d4,wire*.023,1.26,-.06+side*.254,.001,1.9,.001);
   for(let wire=0;wire<5;wire++)box(0xdbe3d4,0,.42+wire*.39,-.06+side*.254,.19,.025,.001);
   for(const post of [-1,1])box(0xe2e8dc,post*.096,2.09,-.06+side*.246,.003,.08,.020);
  }
  for(const side of [-1,1])for(let row=0;row<3;row++)for(let seat=0;seat<14;seat++){
   const fx=side*(.36+row*.020),fz=-.27+seat*.032,base=.80+row*.57,tint=row%2?0x4c8498:0xe1bf63;
   box(tint,fx,base+.09,fz,.018,.18,.022);
   box(tint,fx+side*.006,base+.23,fz,.004,.20,.022);
  }
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
    for(const side of [-1,1])box(0x28566d,fx+side*(kind==='station'?.041:.040),2.19,z,.003,.64,.003);
   }
   box(0xe5c77b,fx,1.3,kind==='station'?.254:.179,.074,.19,.003);
  }
 }else if(['water','waterworks','power','recycling'].includes(kind)){
  for(const side of [-1,1]){
   box(0x748d8a,side*.40,.96,.025,.007,1.4,.50);
   for(const z of [-.205,-.067,.087,.25])box(0x5e7775,side*.40,.75,z,.011,1.26,.008);
   for(let rail=0;rail<12;rail++)box(0xb5c3b6,side*.40,1.65,-.20+rail*.042,.011,.18,.002);
  }
  if(kind==='recycling')for(let i=0;i<5;i++){
   const fx=(i-2)*.16;
   box(0x344f4c,fx,1.64,.137,.060,.22,.002);
   for(const side of [-1,1])tyre(fx+side*.042,.35,.12,.23,.15,0x354b45);
  }
 }else if(kind==='botanical'||kind==='gardens'){
  for(const side of [-1,1])for(let bed=0;bed<7;bed++){
   const fx=side*.25,fz=.025+bed*.035;
   box(0x7d6345,fx,.31,fz,.15,.23,.018);
   for(const plant of [-1,0,1])add('dome',bed%2?0xbb80af:0xe6c86d,fx+plant*.035,.416,fz,.45,.48,.45);
  }
 }else if(kind==='mall'||kind==='theatre'){
  for(const side of [-1,1]){
   box(0xe7d8bc,side*.31,.72,.23,.065,1.2,.035);
   box(kind==='theatre'?0xb46d55:0x5b8d6d,side*.31,1.60,.23,.052,.62,.023);
  }
  for(const side of [-1,1])box(0xd8c094,side*.08,1.05,.12,.003,1.8,.004);
 }else if(kind==='heliport'){
  const radius=Math.min(w*.39,d*.23)-.55;
  for(let light=0;light<12;light++){
   const angle=light*Math.PI/6,fx=Math.cos(angle)*radius/w,fz=.08+Math.sin(angle)*radius/d;
   round(0x515f60,fx,.486,fz,.20,.115);
   round(0xffd989,fx,.581,fz,.15,.095);
  }
 }

 // Detailed seating and litter bins stay outside the central accessible path.
 const benchPiece=(color,x,y,z,width,height,depth)=>add('box',color,(x-b.x)/w,y,(z-b.z)/d,width,height,depth);
 for(const side of [-1,1]){
  urbanBench(benchPiece,b.x+side*.33*w,b.z+.405*d,pavingTop,-1);
  box(0x3f6d61,side*.425,.62,.425,.026,1.0,.016);
  box(0x263d3a,side*.425,1.15,.425,.028,.12,.018);
 }
 // A landscaped public forecourt is part of every service.
 for(const side of [-1,1]){
  const px=side*.43,pz=.40;
  box(0xd9c7a8,px,.35,pz,.07,.48,.035);
  add('dome',0x5c8d4c,px,.67,pz,w*.038,.65,d*.019);
  box(0x344c49,px,2.16,.32,.004,4.08,.002);
  box(0xffdc8a,px,4.25,.32,.018,.27,.011);
 }
 const transform=new THREE.Object3D(),color=new THREE.Color();
 for(const [type,items] of batches){
  const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:type==='glass'?.26:.82,metalness:type==='glass'?.13:.025});
  const mesh=new THREE.InstancedMesh(geometries[type],material,items.length);
  items.forEach((part,index)=>{
   transform.position.set(part.x,part.y,part.z);transform.rotation.set(part.pitch,part.rotation,0);
   transform.scale.set(part.sx,part.sy,part.sz);transform.updateMatrix();mesh.setMatrixAt(index,transform.matrix);
   mesh.setColorAt(index,color.setHex(part.color));
  });
  mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
  mesh.castShadow=type!=='glass';mesh.receiveShadow=true;
  mesh.userData.publicKind=kind;group.add(mesh);
 }
 addCivicEntranceSign(zone,b,labelColor);
 return true;
}

function addCivicEntranceSign(zone,b,labelColor=0x315d72){
 // Keep the center of the entrance open and the street-facing name readable from both sides.
 const signWidth=Math.min(b.width*.47,20),signHeight=signWidth/4,signBottom=3.55;
 const signX=b.x-b.width*.17,signZ=b.z+b.depth*.465,signY=signBottom+signHeight/2;
 const labelMaterial=new THREE.MeshBasicMaterial({
  map:billboardTexture([zone.name.toUpperCase(),'SERVIZI PUBBLICI',zone.at+' CASE'],'#'+labelColor.toString(16).padStart(6,'0'),{wide:true}),
  side:THREE.FrontSide,toneMapped:false});
 const signData={publicKind:zone.kind,civicSign:true,label:zone.name};
 const labelGeometry=new THREE.PlaneGeometry(signWidth,signHeight);
 for(const rear of [false,true]){
  const label=new THREE.Mesh(labelGeometry,labelMaterial);
  label.position.set(signX,signY,signZ+(rear?-.122:.122));
  label.rotation.y=rear?Math.PI:0;Object.assign(label.userData,signData);group.add(label);
 }
 const structureMaterial=new THREE.MeshStandardMaterial({color:0x33494f,roughness:.8});
 const frame=new THREE.Mesh(new THREE.BoxGeometry(signWidth+.18,signHeight+.18,.24),structureMaterial);
 frame.position.set(signX,signY,signZ);frame.castShadow=true;frame.receiveShadow=true;
 Object.assign(frame.userData,{publicKind:zone.kind,civicSignFrame:true});group.add(frame);
 for(const side of [-1,1]){
  const post=new THREE.Mesh(new THREE.BoxGeometry(.22,signBottom,.22),structureMaterial);
  post.position.set(signX+side*signWidth*.45,signBottom/2,signZ);
  post.castShadow=true;post.receiveShadow=true;
  Object.assign(post.userData,{publicKind:zone.kind,civicSignPost:true});group.add(post);
 }
}

function drawSpecial(zone){
  const b=facilityBounds(zone.block),{x,z,width:w,depth:d}=b,kind=zone.kind;
  assertInsideParcel('Edificio pubblico '+kind,x,z,w,d,b);
  const pavingTop=.12,ground=REGIONAL_GROUND_Y;
  addBox(w,pavingTop-ground,d,x,(pavingTop+ground)/2,z,kind==='park'?0x86b77d:0xd0c7b7);
  if(kind==='park'){drawCitySquare(zone,b);return;}
  if(drawCivicBuilding(zone,b))return;

  addBox(w-4,.16,d-4,x,.18,z,0xe5d4b8);
  const mosaicW=w-8,mosaicD=d-8;
  for(const side of [-1,1]){
    addBox(.22,.043,mosaicD,x+side*mosaicW/2,.271,z,0xa49b89);
    addBox(mosaicW-.22,.043,.22,x,.271,z+side*mosaicD/2,0xa49b89);
    for(const corner of [-1,1]){
      const bedX=x+side*(w/2-5.2),bedZ=z+corner*d*.30;
      addBox(3.05,.31,3.6,bedX,.406,bedZ,0xb8a486);
      civicFlowerbed(bedX,bedZ,2.65,3.11,zone.block*11+side*3+corner,.281);
    }
  }
  for(const side of [-1,1]){
    const length=d*.305;
    addBox(6.4,.04,length,x,.275,z+side*(4.35+length/2),0xd5c6ab);
    for(const edge of [-1,1])
      addBox(.13,.034,length,x+edge*3.28,.273,z+side*(4.35+length/2),0xada392);
  }
  addBox(8.4,.42,8.4,x,.47,z,0xc5b9a6);
  addBox(7.0,.48,7.0,x,.92,z,0xd8ccb5);
  addBox(4.4,.44,4.4,x,1.38,z,0xe5d8c3);
  const stone=new THREE.MeshStandardMaterial({color:0xece2d1,roughness:.85});
  const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.79,1.63,10.8,4,1,false,Math.PI/4),stone);
  shaft.position.set(x,7,z);shaft.castShadow=true;shaft.receiveShadow=true;group.add(shaft);
  const cap=new THREE.Mesh(new THREE.ConeGeometry(.79,2.3,4,1,false,Math.PI/4),stone);
  cap.position.set(x,13.55,z);cap.castShadow=true;cap.receiveShadow=true;group.add(cap);
  addBox(1.56,.44,.15,x,.92,z+3.49,0x695946);
  addBox(4.4,.10,2.7,x,.31,z+d*.45,0xded5c6);
  for(const side of [-1,1]){
    civicFlowerbed(x+side*(w/2-3.8),z,2.1,Math.max(3,d*.27),zone.block+side+5);
    civicBench(x+side*(w/2-6),z+d*.27);
    const tx=x+side*(w/2-4.5),tz=z-d/2+5;
    if(isInsideParcel(tx,tz,4,4,b))addTree(tx,tz,zone.block+side+18);
  }
  addCivicEntranceSign(zone,b);
}
// Shop architecture varies deterministically by permanent purchase ID.
const LOT_FOUNDATION_Y=REGIONAL_GROUND_Y-.01;
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
  const groundBases=[];
  const pavingKinds=new Set(['shopPaving','restaurantTerrace','shopDiningDeck','libraryGardenDeck','gymPoolDeck']);
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
  const furnitureRound=new THREE.CylinderGeometry(.5,.5,1,12);
  const libraryDome=new THREE.SphereGeometry(.5,16,8,0,Math.PI*2,0,Math.PI/2);
  const pizzaRoofShape=new THREE.Shape();
  pizzaRoofShape.moveTo(-.5,-.5);pizzaRoofShape.lineTo(.5,-.5);pizzaRoofShape.lineTo(0,.5);pizzaRoofShape.closePath();
  const pizzaGable=new THREE.ExtrudeGeometry(pizzaRoofShape,{depth:1,bevelEnabled:false});pizzaGable.translate(0,0,-.5);
  // Keep the exact triangle order while using the indexed instancing path.
  pizzaGable.setIndex(Array.from({length:pizzaGable.attributes.position.count},(_,index)=>index));
  const readingRafterShape=new THREE.Shape();
  readingRafterShape.moveTo(-.5,-.5);readingRafterShape.lineTo(0,.5);readingRafterShape.lineTo(.5,-.5);
  readingRafterShape.lineTo(.48,-.5);readingRafterShape.lineTo(0,.42);readingRafterShape.lineTo(-.48,-.5);readingRafterShape.closePath();
  const readingRafter=new THREE.ExtrudeGeometry(readingRafterShape,{depth:1,bevelEnabled:false});readingRafter.translate(0,0,-.5);
  readingRafter.setIndex(Array.from({length:readingRafter.attributes.position.count},(_,index)=>index));
  const furnitureSoft=new THREE.SphereGeometry(.5,8,6);
  // Backmost extent of each sculpted mark, relative to its own scale.
  const businessMarkRearReach=[0,.49,.13,.30,.44,.32,.25,.49,.32,.43,.50,.52];
  const structuralKinds=new Set(['evolutionSignatureHall','evolutionSignatureHallWindow','evolutionSignatureHallSide','evolutionEntranceCanopy','evolutionEntranceColumn','evolutionUpperWindow','evolutionSideWindow','evolutionRoofTerrace','evolutionTerraceRail','evolutionTerraceSideRail','evolutionTerracePavilion','evolutionTerracePavilionPost','evolutionGrandEntrance','evolutionGrandPier','cafeCupSign','cafeHandleSign','pizzaDiscSign','pizzaSauceSign','pizzaToppingSign','tradeMark','tradeRound','tradeDress','tradeSculpt','tradeBar','shopPaving','shopUpperBody','shopUpperGlass','shopUpperCap','body','roof','hotelRoof','cinemaRoof',
      'garageRoof','superRoof','displayGlass','entryDoor','entryDoorGlass',
      'signFascia','signInset','garageGate','cinemaParapet','hotelUpperWindow']);
  for(const kind of ['shopTradeCanopy','shopTradePost','shopDisplayStand','shopFixtureFoot'])structuralKinds.add(kind);
  structuralKinds.add('tradeBracket');
  for(const kind of ['libraryGardenRafter','libraryGardenDeck','libraryGardenRoof','libraryGardenGlass','libraryGardenBeam','libraryGardenPost','libraryGardenRidge','gymTrainingPost','gymTrainingBeam','gymTrainingSlat','gymPoolDeck','gymPoolBasin','gymPoolWater','gymTreadmillBase','cinemaPremiereCanopy','cinemaPremiereColumn','cinemaPremiereFascia','cinemaPosterCase','cinemaPosterArtwork','cinemaTicketBooth','cinemaTicketGlass','hotelBalcony','hotelBalconyGlass','hotelBalconyRail','hotelBalconySideRail','hotelPoolBase','hotelPoolWater','hotelRoofGuard','hotelRoofGuardCap','marketServiceDoor','marketGable','marketHallPost','bakeryGable','workshopDaylightRoof','pharmacyWingRoof','fashionTerraceDeck','fashionBalustrade','superClerestory','libraryDome','libraryDrum','gymVault','pizzaGable','diningTerraceDeck','diningBalustrade','diningTerraceAwning'])structuralKinds.add(kind);
  function put(kind,color,shop,x,y,z,w,h,d){
    // Preserve low-cost architecture at all zoom levels. Decorative pieces
    // are spatially batched so only the visible nearby shops are detailed.
    const detailed=!structuralKinds.has(kind);
    const cx=shop?Math.floor(shop.x/90):0,cz=shop?Math.floor(shop.z/90):0;
    const geometry=kind==='libraryGardenRafter'?readingRafter:kind==='libraryGardenRoof'?pizzaGable:kind==='cinemaPosterMoon'?disc:kind==='cinemaSidePosterMoon'?bar:kind==='pizzaGable'||kind==='bakeryGable'||kind==='marketGable'?pizzaGable:kind==='libraryDome'||kind==='gymVault'?libraryDome:kind==='libraryDrum'?furnitureRound:kind==='cafeCupSign'?cup:kind==='cafeHandleSign'?handle:
      kind==='shopRoundFurniture'?furnitureRound:(kind==='shopSoftFurniture'||kind==='shopUmbrellaCanopy'||kind==='bakeryLoaf')?furnitureSoft:
      kind==='tradeDress'||kind==='fashionShowroomDress'?dress:kind==='tradeSculpt'?sculpt:kind==='tradeBar'?bar:
      kind.startsWith('pizza')||kind==='tradeRound'?disc:box;
    const casts=/^(shopTradeCanopy|shopTradePost|shopDisplayStand|shopFixtureFoot|libraryGardenRafter|libraryGardenDeck|libraryGardenRoof|libraryGardenBeam|libraryGardenPost|libraryReadingDesk|gymTrainingPost|gymTrainingBeam|gymTrainingSlat|gymPoolDeck|gymTreadmillBase|cinemaPremiereCanopy|cinemaPremiereColumn|cinemaTicketBooth|hotelBalcony|hotelPoolBase|hotelSunbedFrame|marketServiceDoor|marketGable|marketHallPost|bakeryGable|workshopDaylightRoof|pharmacyWingRoof|fashionTerraceDeck|fashionBalustrade|superClerestory|body|libraryDome|libraryDrum|gymVault|pizzaGable|diningTerraceDeck|diningBalustrade|diningTerraceAwning|shopUpperBody|shopUpperCap|roof|cinemaRoof|hotelRoof|superRoof|garageRoof|evolutionSignatureHall|evolutionEntranceCanopy|evolutionEntranceColumn|evolutionRoofTerrace|evolutionTerracePavilion|evolutionTerracePavilionPost|evolutionGrandEntrance|evolutionGrandPier|shopForecourtDetail|shopRoundFurniture|shopUmbrellaCanopy)$/.test(kind)&&kind!=='libraryGardenRoof';
    const receives=casts||kind==='shopPaving';
    const glow=kind==='cinemaPremiumBulb',clearGlass=kind==='libraryGardenGlass'||kind==='libraryGardenRoof';
    const key=[geometry.id,casts,receives,detailed?cx:'all',detailed?cz:'all',glow,clearGlass].join(':');
    if(!batches.has(key))batches.set(key,{geo:geometry,casts,receives,glow,clearGlass,entries:[],detailed,
      chunk:{x:(cx+.5)*90,z:(cz+.5)*90}});
    let rotation=0;
    if(shop){rotation=facadeAngle(shop);
      const dx=x-shop.x,dz=z-shop.z,ca=Math.cos(rotation),sa=Math.sin(rotation);
      x=shop.x+dx*ca+dz*sa;z=shop.z-dx*sa+dz*ca;
    }
    const entry={shop,color,x,y,z,w,h,d,rotation};
    batches.get(key).entries.push(entry);
    if(geometry===box&&(pavingKinds.has(kind)||y-h/2<=.075))groundBases.push(entry);
  }
  function seatSupports(shop,x,z,floor,seatBottom,halfWidth,halfDepth,color){
    const height=seatBottom-floor+.035,y=floor+height/2-.015;
    for(const side of [-1,1])for(const end of [-1,1])
      put('shopForecourtDetail',color,shop,x+side*halfWidth,y,z+end*halfDepth,.066,height,.066);
  }
  function furnishBusiness(shop,shape,stage,premium,w,d,height,trim,glass,serviceRear){
    const x=shop.x,front=shop.z+d/2,cream=0xf3e4c9,wood=0xb98350,metal=0x374b53;
    const part=(kind,color,dx,y,dz,a,b,c)=>put(kind,color,shop,x+dx,y,front+dz,a,b,c);
    const box=(color,dx,y,dz,a,b,c)=>part('shopForecourtDetail',color,dx,y,dz,a,b,c);
    const round=(color,dx,y,dz,a,b,c)=>part('shopRoundFurniture',color,dx,y,dz,a,b,c);
    const soft=(color,dx,y,dz,a,b,c)=>part('shopSoftFurniture',color,dx,y,dz,a,b,c);
    const forecourt=.14;
    function pad(color,dx,dz,width,depth,top=forecourt){
      part('shopPaving',color,dx,top/2,dz,width,top,depth);
    }
    function fixture(kind,color,dx,dz,width,depth,top,bottom=forecourt){
      part(kind,color,dx,(top+bottom-.025)/2,dz,width,top-bottom+.025,depth);
    }
    function shelter(dx,dz,width,depth,roofY,color){
      part('shopTradeCanopy',color,dx,roofY,dz,width,.18,depth);
      for(const side of [-1,1])for(const end of [-1,1])
        fixture('shopTradePost',trim,dx+side*(width/2-.13),dz+end*(depth/2-.13),.11,.11,roofY-.06);
    }
    function chair(dx,dz,side,color=wood,y=0){
      box(color,dx,y+.55,dz,.53,.13,.58);
      box(color,dx,y+.88,dz+side*.26,.53,.62,.10);
      for(const a of [-1,1])for(const b of [-1,1])box(metal,dx+a*.20,y+.25,dz+b*.21,.055,.515,.055);
    }
    function table(dx,dz,dining,y=0){
      if(dining){box(cream,dx,y+1.04,dz,1.34,.12,1.12);box(trim,dx,y+.77,dz,1.37,.43,1.15);}
      else round(wood,dx,y+1.04,dz,1.12,.12,1.12);
      round(metal,dx,y+.54,dz,.13,1.00,.13);round(metal,dx,y+.047,dz,.58,.10,.58);
      chair(dx,dz-.87,-1,dining?0x88534b:wood,y);chair(dx,dz+.87,1,dining?0x88534b:wood,y);
      if(dining){
        const plateOffset=pizzeria?.39:.30,plateWidth=pizzeria?.27:.37;
        for(const side of [-1,1]){
          round(0xfffbef,dx,y+1.13,dz+side*plateOffset,plateWidth,.035,plateWidth);
          box(metal,dx+.25,y+1.14,dz+side*plateOffset,.04,.025,pizzeria?.22:.28);
        }
        if(!pizzeria){round(0x8a6950,dx,y+1.20,dz,.14,.25,.14);soft(0x6c974a,dx,y+1.39,dz,.27,.22,.27);}
      }else{round(cream,dx,y+1.17,dz,.16,.21,.16);round(0x563b2d,dx,y+1.28,dz,.13,.018,.13);}
    }
    function car(dx,dz,color){
      pad(0x6e7b80,dx,dz,1.90,2.89,.064);
      box(metal,dx,.30,dz,1.25,.35,2.35);box(color,dx,.66,dz,1.30,.48,2.42);
      box(glass,dx,.99,dz-.10,1.06,.44,1.22);box(color,dx,1.23,dz-.10,1.12,.10,1.30);
      for(const side of [-1,1])for(const end of [-1,1])soft(0x273039,dx+side*.66,.36,dz+end*.76,.22,.61,.61);
      for(const side of [-1,1])box(0xffedbc,dx+side*.39,.66,dz+1.23,.22,.15,.035);
    }
    // Early buildings also have a working rear facade. Later stages already
    // have category-specific rear annexes, loading bays and glazed halls.
    if(stage<2||shape===8){
      const rear=shape===8?serviceRear-front:-d;
      if(shape===1||shape===6){
        part('garageGate',0x63787c,0,1.38,rear-.10,w*.29,2.65,.16);
        for(let rib=0;rib<6;rib++)box(0xabc0c1,0,.40+rib*.40,rear-.20,w*.28,.045,.04);
        for(const side of [-1,1])part('displayGlass',glass,side*w*.32,3.16,rear-.08,w*.20,.61,.12);
      }else{
        const exits=shape===8?[-.62,.62]:[0];
        for(const dx of exits){
          part('entryDoor',trim,dx,1.14,rear-.09,1.22,2.14,.14);
          part('entryDoorGlass',shape===8?0x485463:glass,dx,1.35,rear-.19,.99,1.54,.06);
          box(metal,dx+(shape===8?0:.40),1.08,rear-.25,shape===8?.76:.045,shape===8?.065:.27,.06);
        }
        if(shape!==8&&shape!==9&&!(premium&&shape===10))for(const side of [-1,1]){
          part('displayGlass',glass,side*w*.29,2.08,rear-.08,w*.20,1.18,.13);
          box(cream,side*w*.29,1.45,rear-.16,w*.22,.12,.24);
        }
        if([0,2,7].includes(shape)){
          box(0x9faeab,0,2.75,rear-.23,.95,.37,.42);
          for(const slat of [-.30,0,.30])box(metal,slat,2.76,rear-.46,.035,.23,.03);
        }
      }
    }
    // These forecourts stay inside the fixed20.5m x45m parcel. Each trade
    // uses recognisable equipment rather than the same display rectangles.
    const dining=shape===2,pizzeria=dining&&shop.id%24===14;
    if(shape===0||dining){
      if(stage>=1){
        const rows=Math.min(dining?4:3,stage),pitch=2.7,patioFloor=.18;
        part('shopPaving',dining?0xd1b19c:0xc3a580,0,.12,7.5,Math.min(17.8,w+1),.12,12);
        for(let row=0;row<rows;row++)for(const side of [-1,1]){
          const dx=side*Math.min(3.35,w*.26),dz=3.9+row*pitch;table(dx,dz,dining,patioFloor);
          if(pizzeria){round(0xc38b48,dx,patioFloor+1.135,dz,.46,.035,.46);round(0xd15c36,dx,patioFloor+1.16,dz,.38,.02,.38);}
          if(premium&&row%2===1){round(metal,dx+.78,1.73,dz,.055,3.12,.055);box(metal,dx+.39,3.08,dz,.83,.06,.06);part('shopUmbrellaCanopy',trim,dx,3.23,dz,2.15,.28,2.15);}
        }
      }
      if(stage>=4)for(const side of [-1,1])table(side*w*.25,-d*.14,dining,5.40);
      if(premium&&!dining){
        const cartX=-w/2-.95,cartZ=-d*.36;
        pad(0xc8af8d,cartX,cartZ,1.83,3.30);
        fixture('shopDisplayStand',wood,cartX,cartZ,1.02,2.46,.99);
        box(cream,cartX,1.035,cartZ,1.16,.11,2.62);
        box(0x61797b,cartX,1.28,cartZ-.62,.48,.41,.66);
        box(0xc4d4cb,cartX-.28,1.36,cartZ-.62,.13,.29,.61);
        for(const cup of [-.12,.15,.42])round(cream,cartX-.25,1.16,cartZ+cup,.18,.15,.18);
        shelter(cartX,cartZ,1.78,3.24,2.53,trim);
      }
    }else if(shape===1){
      // Produce islands and a dedicated cart corral, not restaurant tables.
      const islands=Math.min(4,stage+1);
      for(let rack=0;rack<islands;rack++){
        const dx=(rack%2?1:-1)*w*.28,dz=4.6+Math.floor(rack/2)*2.5;
        if(!premium)pad(0xa3a293,dx,dz,1.79,1.44);
        fixture('shopDisplayStand',wood,dx,dz,1.48,1.10,1.10);
        for(let row=0;row<2;row++)for(let col=0;col<4;col++)soft(row?0xe6ae43:0x779e43,dx+(col-1.5)*.29,1.17,dz+(row-.5)*.42,.27,.29,.31);
      }
      if(premium){
        pad(0xb9cdc5,0,5.9,w*.81,4.36);
        shelter(0,5.9,w*.79,4.30,3.05,trim);
      }
      if(stage>=1){
        const corralX=-w*.28,corralZ=9.42;
        pad(0x8b999e,corralX,corralZ,1.84,2.15);
        for(let cart=0;cart<Math.min(4,stage+1);cart++){
          const dx=corralX+(cart%2-.5)*.79,dz=corralZ+(Math.floor(cart/2)-.5)*1.01;
          box(metal,dx,.38,dz,.68,.08,.92);
          for(const side of [-1,1]){box(trim,dx+side*.32,.76,dz,.055,.68,.83);box(trim,dx,.98,dz+side*.40,.68,.07,.055);}
          for(const side of [-1,1])for(const end of [-1,1])soft(metal,dx+side*.27,.25,dz+end*.33,.16,.23,.23);
        }
      }
    }else if(shape===3){
      // Reading garden: book spines belong here, and nowhere else.
      for(let bay=0;bay<Math.min(3,stage+1);bay++){
        const dx=(bay-1)*w*.27,dz=5.6;
        pad(0xc3b397,dx,dz,1.58,1.02);
        box(wood,dx,.55,dz,1.15,.14,.56);box(trim,dx,.88,dz-.24,1.15,.62,.10);
        for(const side of [-1,1])fixture('shopFixtureFoot',metal,dx+side*.43,dz,.08,.40,.51);
        if(stage>=2){
          pad(0xc3b397,dx,dz+2,1.52,.79);
          fixture('shopDisplayStand',wood,dx,dz+1.82,1.16,.09,2.17);
          for(const edge of [-1,1])fixture('shopFixtureFoot',trim,dx+edge*.55,dz+2,.075,.44,2.17);
          box(cream,dx,2.15,dz+2,1.16,.075,.48);
          for(let shelf=0;shelf<Math.min(3,stage);shelf++){
          box(cream,dx,.54+shelf*.57,dz+2,1.17,.07,.48);
          for(let book=0;book<5;book++)box([0x638a91,0xc17358,0xc1a761][book%3],dx+(book-2)*.19,.80+shelf*.57,dz+2.13,.14,.42,.17);
        }}
      }
      if(stage>=4)for(const side of [-1,1])table(side*w*.25,-d*.18,false,height+.455);
      if(premium){
        const rear=serviceRear-front,roomZ=rear-2.55,roomW=w*.82;
        part('libraryGardenDeck',0xd9c9aa,0,.14,roomZ,roomW+.70,.32,5.30);
        part('libraryGardenRoof',0x93c4c8,0,3.40,roomZ,roomW+.24,.80,4.94);
        part('libraryGardenRidge',trim,0,3.83,roomZ,.14,.12,5.02);
        for(const bay of [-1,0,1])part('libraryGardenRafter',trim,0,3.40,roomZ+bay*2.35,roomW+.24,.80,.14);
        for(const side of [-1,1]){
          const edge=side*roomW/2;
          part('libraryGardenGlass',glass,edge,1.68,roomZ,.10,2.46,4.70);
          part('libraryGardenBase',trim,edge,.39,roomZ,.14,.18,4.70);
          part('libraryGardenBeam',trim,edge,3.01,roomZ,.16,.18,4.94);
          for(const end of [-1,0,1])part('libraryGardenPost',trim,edge,1.65,roomZ+end*2.32,.14,2.70,.14);
          for(const end of [-1,1]){
            const px=side*roomW*.28,pz=roomZ+end*1.10;
            part('libraryReadingDesk',wood,px,1.08,pz,roomW*.30,.14,.78);
            for(const leg of [-1,1])part('libraryReadingLeg',metal,px+leg*roomW*.10,.675,pz,.09,.78,.55);
            part('libraryReadingBook',cream,px,1.18,pz,.52,.06,.36);
            part('libraryReadingSpine',trim,px,1.215,pz,.035,.015,.36);
            part('libraryReadingChair',trim,px,.63,pz+end*.70,.58,.15,.55);
            part('libraryReadingChairBack',trim,px,.99,pz+end*.94,.58,.70,.10);
            for(const leg of [-1,1])part('libraryReadingLeg',metal,px+leg*.21,.43,pz+end*.70,.07,.30,.43);
          }
          const sx=side*(roomW/2-.29);
          for(const end of [-1,1])part('libraryShelfPost',wood,sx,1.43,roomZ+end*1.75,.25,2.20,.12);
          for(let shelf=0;shelf<3;shelf++){
            part('libraryShelfBoard',wood,sx,.65+shelf*.65,roomZ,.35,.09,3.60);
            for(let book=0;book<10;book++)part('libraryShelfBook',[0x7a657f,0x618c83,0xb98458,0xbea462][book%4],sx,.92+shelf*.65,roomZ+(book-4.5)*.33,.26,.43,.23);
          }
        }
        for(const end of [-1,1])for(const side of [-1,1]){
          part('libraryGardenGlass',glass,side*(roomW*.25+.42),1.68,roomZ+end*2.35,roomW/2-.88,2.46,.10);
          part('libraryGardenBase',trim,side*(roomW*.25+.42),.39,roomZ+end*2.35,roomW/2-.88,.18,.14);
          part('libraryGardenPost',trim,side*.82,1.65,roomZ+end*2.35,.13,2.70,.13);
        }
        if(stage>=2){
          part('libraryGardenDoorFrame',trim,0,1.51,rear-.10,1.58,2.54,.18);
          part('libraryGardenDoorGlass',glass,0,1.51,rear-.22,1.36,2.32,.05);
        }
      }
    }else if(shape===4){
      // Accessible approach, illuminated medicine collection lockers.
      box(0xd4ddd7,0,.16,3.3,2.35,.25,4.2);
      for(const side of [-1,1]){box(metal,side*1.10,.72,3.3,.07,.07,4.0);for(const dz of [1.5,3.3,5.1])box(metal,side*1.10,.41,dz,.06,.59,.06);}
      if(stage>=1||premium)for(const side of [-1,1]){
        const dx=side*w*.32,dz=7.0,columns=stage>=4?3:2,lockerWidth=columns*.43+.16;
        pad(premium?0xc7dbcf:0xabbcb2,dx,dz,premium?lockerWidth+.73:lockerWidth+.24,premium?1.82:1.08);
        fixture('shopDisplayStand',cream,dx,dz,lockerWidth,.53,2.14);
        for(let row=0;row<3;row++)for(let col=0;col<columns;col++)
          box(trim,dx+(col-(columns-1)/2)*.43,.50+row*.55,dz+.28,.37,.46,.05);
        if(premium){
          shelter(dx,dz,lockerWidth+.65,1.74,2.74,0x267c60);
          box(0xc7f4cf,dx,2.35,dz+.31,lockerWidth*.81,.12,.11);
        }
      }
    }else if(shape===5){
      // Mannequins and clothes rails outside the boutique.
      const racks=Math.min(3,stage+1);
      for(let rack=0;rack<racks;rack++){
        const dx=(rack%2?1:-1)*Math.max(1.72,w*.29),dz=5.15+Math.floor(rack/2)*1.18;
        pad(0xb9a9a4,dx,dz,1.54,.87);
        for(const side of [-1,1])fixture('shopFixtureFoot',metal,dx+side*.65,dz,.08,.08,2.14);
        box(metal,dx,2.13,dz,1.39,.08,.08);
        for(let garment=0;garment<3;garment++){
          const gx=dx+(garment-1)*.42;
          box(metal,gx,2.055,dz,.055,.12,.065);
          part('fashionShowroomDress',[0xd57888,0x78a4b2,0xd8bc68][garment],gx,1.61,dz,.34,.65,.30);
        }
      }
      if(stage>=2||premium){
        if(premium){
          pad(0xc8b9b1,0,8.0,Math.max(3.40,w*.88),2.35);
          shelter(0,8.0,Math.max(3.30,w*.86),2.24,2.80,trim);
          box(0xc58f87,0,.165,8.0,.84,.055,2.1);
        }
        for(const side of [-1,1]){
          const dx=side*w*.31;
          if(!premium)pad(0xc8b9b1,dx,8.0,1.08,1.06);
          round(cream,dx,.19,8.0,.82,.12,.82);
          fixture('shopFixtureFoot',metal,dx,8,.075,.075,1.01,.24);
          part('fashionShowroomDress',side<0?0xb36082:0x597790,dx,1.29,8.0,.49,.54,.75);
          box(cream,dx,1.66,8,.12,.13,.12);
          soft(cream,dx,1.83,8.0,.30,.36,.30);
        }
      }
    }else if(shape===6){
      // Service bays with cars, tool cabinets and marked parking.
      const bays=stage>=4?3:stage>=2?2:1;
      for(let bay=0;bay<bays;bay++){
        const dx=(bay-(bays-1)/2)*Math.max(3.18,w*.27),dz=5.5;
        pad(0x78898d,dx,dz,3.12,4.2,.057);
        car(dx,dz,[0xb85e55,0xd8bb63,0x7b9bac][bay]);
        if(stage>=2){fixture('shopDisplayStand',0xc47843,dx-1.1,dz-.8,.43,.58,1.85,.057);for(let drawer=0;drawer<4;drawer++)box(metal,dx-1.1,.5+drawer*.3,dz-.49,.32,.035,.04);}
        if((premium&&(stage>=5||bay===0))||(!premium&&stage>=5&&bay===0)){
          for(const side of [-1,1])fixture('shopTradePost',trim,dx+side*1.27,dz,.16,.24,3.34,.057);
          part('shopTradeCanopy',0xe4b56e,dx,3.32,dz,2.70,.17,.24);
          for(const side of [-1,1])box(0xe4b56e,dx+side*.31,3.02,dz,.065,.60,.065);
        }
      }
    }else if(shape===7){
      // Bread is rounded and golden; displays cannot be mistaken for books.
      const stalls=Math.min(3,stage+1),offset=Math.max(1.96,w*.28);
      for(let stall=0;stall<stalls;stall++){
        const dx=(stall%2===0?-1:1)*offset,dz=5.45+Math.floor(stall/2)*2.05;
        pad(premium?0xd5b08a:0xbca98d,dx,dz,premium?1.94:1.72,premium?1.66:1.30);
        fixture('shopDisplayStand',wood,dx,dz,1.46,.98,1.32);
        box(cream,dx,1.32,dz,1.54,.10,1.03);
        box(trim,dx,1.07,dz+.50,1.28,.22,.05);
        for(let loaf=0;loaf<5;loaf++)soft(loaf%2?0xc5863e:0xe4b769,dx+(loaf-2)*.23,1.46,dz,.22,.23,.74);
        if(premium){
          shelter(dx,dz,1.89,1.61,2.69,0xad6943);
          box(cream,dx,2.66,dz+.84,1.73,.16,.08);
          for(let stripe=0;stripe<5;stripe++)box(stripe%2?wood:cream,dx+(stripe-2)*.35,2.81,dz,.32,.075,1.60);
        }else if(stage>=3){
          part('shopTradeCanopy',trim,dx,2.45,dz,1.74,.15,1.32);
          for(const side of [-1,1])fixture('shopTradePost',wood,dx+side*.77,dz,.08,.08,2.42);
        }
      }
    }else if(shape===8){
      // Red-carpet approach, ticket booths and velvet-rope queues.
      part('shopPaving',0x9a3e49,0,.13,6.7,w*.55,.12,7.5);
      for(const side of [-1,1]){
        for(let post=0;post<2+Math.min(stage,4);post++){
          const dx=side*w*.25,dz=3.4+post*1.2;
          round(0x8b7449,dx,.209,dz,.25,.07,.25);
          round(0xc8ad72,dx,.81,dz,.075,1.23,.075);
          soft(0xd8bb78,dx,1.46,dz,.19,.19,.19);
          if(post)box(0x9a3e49,dx,1.27,dz-.60,.07,.07,1.2);
        }
        if(premium||stage>=1)pad(0xc2a888,side*w*.36,6.0,premium?1.92:1.67,premium?2.12:1.69);
        if(premium){
          const boothX=side*w*.36,boothZ=6.0;
          fixture('cinemaTicketBooth',trim,boothX,boothZ,1.52,1.35,2.73);
          box(0xe7bc68,boothX,2.84,boothZ,1.75,.22,1.56);
          part('cinemaTicketGlass',glass,boothX,1.83,boothZ+.73,1.27,1.06,.08);
          box(cream,boothX,1.22,boothZ+.82,1.40,.13,.32);
          box(0x273b50,boothX,1.40,boothZ+.91,.32,.20,.10);
          box(0xffe8b4,boothX,1.41,boothZ+.975,.24,.11,.03);
          part('cinemaPremiumBulb',0xffda83,boothX,2.55,boothZ+.74,1.10,.13,.06);
          for(const edge of [-1,1])box(0xe7bc68,boothX+edge*.65,1.54,boothZ+.74,.08,2.12,.10);
        }else if(stage>=1){fixture('shopDisplayStand',trim,side*w*.36,6.0,1.26,1.12,2.42);box(glass,side*w*.36,1.64,6.585,.96,.60,.08);box(cream,side*w*.36,2.49,6.0,1.48,.20,1.36);}
      }
    }else if(shape===9){
      // Outdoor workout stations: weights and pull-up bars.
      const stations=Math.min(3,stage+1);
      for(let station=0;station<stations;station++){
        const dx=(station-(stations-1)/2)*Math.max(2.32,w*.28),dz=5.6;
        pad(0x577d78,dx,dz,2.14,3.3);
        box(metal,dx,1.10,dz,1.5,.10,.10);
        for(const side of [-1,1]){
          fixture('shopFixtureFoot',trim,dx+side*.62,dz,.13,.32,1.11);
          part('tradeBar',0x34434b,dx+side*.61,1.1,dz,.15,.55,.55);
        }
        box(0x5b6676,dx,.49,dz-.54,.64,.16,1.08);
        for(const end of [-1,1])fixture('shopFixtureFoot',trim,dx,dz-.54+end*.34,.13,.12,.43);
        if(stage>=2){for(const side of [-1,1])fixture('shopFixtureFoot',trim,dx+side*.87,dz+1.18,.13,.13,3.24);box(metal,dx,3.20,dz+1.18,1.88,.13,.13);}
      }
      if(premium){
        // A covered training court, with real cardio machines and an independent pool garden.
        const shadeW=w*.92;
        pad(0x9fafa2,0,7.4,shadeW+.24,7.32,.15);
        for(const side of [-1,1])for(const end of [4.0,10.8]){
          part('gymTrainingPost',trim,side*w*.43,1.92,end,.18,3.60,.18);
          part('gymTrainingFoot',0xe2d6b8,side*w*.43,.17,end,.38,.20,.38);
        }
        for(const side of [-1,1])part('gymTrainingBeam',trim,side*w*.43,3.80,7.4,.23,.22,7.20);
        for(let slat=0;slat<10;slat++)part('gymTrainingSlat',slat%2?0x9fb88d:trim,0,3.96,4.0+slat*6.8/9,shadeW,.16,.40);
        for(const side of [-1,1]){
          const tx=side*w*.21,tz=9.0;
          part('gymTreadmillBase',metal,tx,.32,tz,1.32,.35,2.35);
          part('gymTreadmillBelt',0x202f35,tx,.515,tz,1.04,.04,1.98);
          for(const edge of [-1,1]){
            part('gymTreadmillUpright',trim,tx+edge*.54,1.11,tz-.80,.09,1.45,.12);
            part('gymTreadmillHandle',metal,tx+edge*.54,1.65,tz-.37,.09,.10,.95);
          }
          part('gymTreadmillConsole',metal,tx,1.76,tz-.80,1.19,.42,.18);
          part('gymTreadmillDisplay',0x79c7cf,tx,1.80,tz-.69,.70,.23,.04);
          for(const edge of [-1,1])part('gymTreadmillButton',edge<0?0x91be63:0xd96a55,tx+edge*.47,1.72,tz-.68,.09,.09,.05);
        }
        const poolZ=serviceRear-front-3.15,deckW=w*.86,poolW=w*.66;
        if(stage>=2){
          const rear=serviceRear-front;
          part('gymPoolDoorFrame',trim,0,1.50,rear-.10,1.82,2.68,.18);
          part('gymPoolDoorGlass',glass,0,1.50,rear-.22,1.58,2.40,.05);
          part('gymPoolDoorHandle',metal,.58,1.40,rear-.27,.08,.32,.04);
          part('gymPoolThreshold',0xd8ccb1,0,.19,rear-.30,1.94,.18,.60);
        }
        part('gymPoolDeck',0xd8ccb1,0,.14,poolZ,deckW,.32,5.80);
        part('gymPoolBasin',0x699ba0,0,.34,poolZ,poolW-.06,.20,3.59);
        part('gymPoolWater',0x48afc0,0,.455,poolZ,poolW-.16,.03,3.47);
        for(const side of [-1,1]){
          part('gymPoolRim',0xf0e4ca,side*(poolW/2-.045),.49,poolZ,.09,.18,3.65);
          part('gymPoolRim',0xf0e4ca,0,.49,poolZ+side*1.78,poolW,.18,.09);
          const seatZ=poolZ+side*2.38;
          for(const bay of [-1,1]){
            const benchX=bay*w*.27;
            part('gymPoolBench',trim,benchX,.65,seatZ,w*.22,.16,.55);
            for(const leg of [-1,1])part('gymPoolBenchLeg',metal,benchX+leg*w*.075,.47,seatZ,.10,.36,.40);
          }
        }
        for(const lane of [-1,1])part('gymPoolLane',0xe8ead5,lane*poolW/6,.477,poolZ,.035,.012,3.30);
        for(const side of [-1,1])part('gymPoolLadder',0xc5d6cf,poolW*.29+side*.22,.87,poolZ+1.55,.055,1.08,.055);
        for(const rung of [.57,.80,1.03])part('gymPoolLadder',0xc5d6cf,poolW*.29,rung,poolZ+1.55,.49,.055,.055);
      }
    }else if(shape===10){
      // A hotel arrival court with luggage trolleys and valet cars.
      for(const side of [-1,1]){
        const planterX=side*w*.34;
        pad(0xc6b6a2,planterX,4.8,1.43,1.40);
        round(0x416d51,planterX,.65,4.8,1.12,1.05,1.12);soft(0x719249,planterX,1.34,4.8,1.30,1.10,1.30);
        if(stage>=1){
          const dx=side*1.25,dz=5.7;
          pad(0xc6b6a2,dx,dz,1.03,1.42,.13);
          box(0xc9ac68,dx,.30,dz,.70,.10,1.06);
          for(const edge of [-1,1])for(const end of [-1,1])soft(0x303941,dx+edge*.25,.19,dz+end*.38,.18,.16,.19);
          for(const post of [-1,1])box(0xc9ac68,dx+post*.32,1.08,dz,.055,1.52,.06);
          box(0xb07a4d,dx,.63,dz,.59,.58,.60);
        }
        if(stage>=3)car(side*w*.31,9.0,premium?0x3e4d61:0x9c7c67);
      }
    }else if(shape===11){
      // Separate striped market stalls with fruit, rather than an empty hall.
      for(let stall=0;stall<Math.min(4,stage+1);stall++){
        const dx=(stall%2?1:-1)*w*.26,dz=4.7+Math.floor(stall/2)*3.4;
        const width=premium?2.95:2.72,depth=premium?2.48:2.12;
        pad(premium?0xc5ab80:0xb6a18b,dx,dz,width+.11,depth+.16);
        fixture('shopDisplayStand',wood,dx,dz,2.42,1.40,1.19);
        box(premium?cream:trim,dx,1.19,dz,2.54,.10,1.48);
        shelter(dx,dz,width,depth,2.86,premium?0x467752:trim);
        const stripes=premium?8:6,stripeWidth=width/stripes;
        for(let stripe=0;stripe<stripes;stripe++)box(stripe%2?cream:premium?0x58875a:trim,dx+(stripe-(stripes-1)/2)*stripeWidth,2.977,dz,stripeWidth-.018,.055,depth+.035);
        for(let item=0;item<7;item++)soft(item%2?0xdca848:0x719a48,dx+(item-3)*.30,1.38,dz,.29,.30,.48);
        if(premium){
          box(0x694a37,dx,1.97,dz-.90,2.12,.105,.40);
          for(const edge of [-1,1])fixture('shopFixtureFoot',trim,dx+edge*.99,dz-.90,.09,.19,1.97);
          for(let item=0;item<5;item++)soft(item%2?0xd68148:0x8c9c50,dx+(item-2)*.37,2.10,dz-.90,.30,.21,.31);
        }
      }
    }
  }
  for(const shop of shopPurchases){
    const progress=shopProgressFor(shop);
    const originalStyle=shopStyles[shop.id%shopStyles.length];
    const style=progress.paintIndex===undefined?originalStyle:{...originalStyle,walls:HOUSE_PAINTS[progress.paintIndex].wall};
    const seed=shop.id,district=districtStyle(shop.block);
    const shape=shop.id%shopStyles.length;
    const isPizzeria=shape===2&&shop.id%24===14;
    const stage=houseTier(progress.points);
    const growth=[0,.25,.52,.68,.79,.88,.95,1][stage];
    const width=[7.2,14.5,12.2,8.5,8.1,6.4,12.9,7.7,16.2,12.8,11.4,13.1][shape]*(.87+rnd(seed*31+8)*.16)*(isPizzeria?.88:1);
    const depth=[7.4,12.9,9.4,9.4,7.4,6.8,11.6,7.9,14.2,11.2,10.5,9.4][shape]*(.9+rnd(seed*37+3)*.12)*(isPizzeria?.94:1);
    const widthGrowth=[.76,.15,.28,.64,.42,.80,.24,.57,.12,.30,.23,.22][shape];
    const depthGrowth=[.78,.44,.62,.67,.54,.65,.51,.68,.34,.56,.38,.62][shape];
    const heightGrowth=[.27,.26,.23,.52,.29,.36,.22,.33,.32,.29,.12,.22][shape];
    const w=shape===11?Math.min(17,width*[.58,.72,.86,1,1.12,1.23,1.33,1.44][stage]):shape===7?Math.min(16,width*[.72,.84,.98,1.12,1.28,1.42,1.58,1.75][stage]):shape===6?Math.min(17,width*[.68,.77,.88,1,1.08,1.16,1.23,1.31][stage]):shape===1?Math.min(17,width*[.65,.76,.88,.98,1.06,1.12,1.20,1.27][stage]):stage?Math.min(shape===2?14.5:17,width*(1+growth*widthGrowth)):width;
    const d=shape===11?depth*[.70,.86,1.03,1.22,1.42,1.63,1.85,2.08][stage]:shape===7?depth*[.80,.94,1.08,1.24,1.40,1.56,1.73,1.92][stage]:shape===6?depth*[.76,.87,1,1.10,1.21,1.33,1.45,1.57][stage]:shape===1?depth*[.75,.88,1,1.10,1.20,1.30,1.40,1.50][stage]:depth*(1+growth*depthGrowth);

    const baseHeight=[4.2,5.1,5.2,6.4,4.7,4.0,5.0,4.5,9.0,6.8,4.6,4.3][shape]
      *(.88+rnd(seed*41+2)*.22)*(district==='centro'?1.08:1)*(isPizzeria?.90:1);
    const diningProfiles={0:[4.2,4.6,5.2,7.4,8.7,10.1,11.8,13.8],2:[5.2,5.8,6.8,8.8,10.8,13,15.8,19]};
    const height=shape===11?[4.3,4.6,5,5.5,6.1,6.8,7.6,8.6][stage]*(baseHeight/4.3):shape===7?[4.5,5,5.8,6.8,7.9,9.2,10.7,12.5][stage]*(baseHeight/4.5):shape===6?[5,5.3,5.8,6.4,7.1,8,9.1,10.4][stage]*(baseHeight/5):shape===4?[4.7,5.1,5.8,7.5,9.1,11.1,13.6,16.7][stage]*(baseHeight/4.7):shape===5?[4,4.5,5.3,8.5,10.6,13,16,20][stage]*(baseHeight/4):shape===1?[4.6,4.9,5.3,5.7,6.2,6.8,7.5,8.4][stage]*(baseHeight/5.1):diningProfiles[shape]?diningProfiles[shape][stage]*(baseHeight/diningProfiles[shape][0]):shape===10?[4.6,7.8,12,18,27,40,58,82][stage]*(baseHeight/4.6)*(progress.premium?1.18:1):shape===8?[9,9.8,11.2,12.8,14.6,16.8,19.4,23][stage]*(baseHeight/9):shape===3?[6.4,7.0,8.3,10.5,12.9,15.8,19.2,23][stage]*(baseHeight/6.4):shape===9?[6.8,7.2,8.0,9.1,10.5,12.2,14.3,17][stage]*(baseHeight/6.8):baseHeight*(1+growth*heightGrowth)+(stage>=3?2.8:0);

    const fashionAnnexHeight=Math.min(height*.83,stage>=5?7.3:5.1);
    const x=shop.x,z=shop.z;
    // Premium enriches finishes without changing the activity's base colour.
    const wallColor=style.walls;
    const paving=progress.premium?0xc7ad8b:[0xaba99f,0xb8b5a9,0x9ba9a8][progress.pavingIndex??seed%3];
    const front=z+d/2, trim=style.trim, glass=style.glass;
    const diningUpper=(shape===0||shape===2)&&stage>=3;
    const marketHall=shape===11&&stage>=2;
    const bakerySplit=shape===7&&stage>=3;
    const industrialSplit=shape===6&&stage>=3;
    const fashionUpper=shape===5&&stage>=3,steppedPharmacy=shape===4&&stage>=3;
    const recessedUpper=diningUpper||fashionUpper||bakerySplit;
    const upperWidth=w*(bakerySplit?1:shape===5?.90:shape===0?(stage>=7?.86:stage>=5?.80:.72):(stage>=7?.93:stage>=5?.89:.83));
    const upperDepth=d*(bakerySplit?.60:fashionUpper?.70:.68),upperZ=z-(d-upperDepth)/2,upperFront=upperZ+upperDepth/2;
    // The cup bracket starts .46m above this reference, on the5.40m terrace surface.
    const signRoof=marketHall?height+.30:bakerySplit?5.2:industrialSplit?height*.78:diningUpper?5.40-.46:fashionUpper?5.09-.46:height;
    put('shopPaving',paving,shop,x,.055,z,17.7,.06,17.5);
    if(marketHall){
      // Covered market with two rows of shops and an unobstructed central aisle.
      const pavilionHeight=height*(stage>=4?.76:.66),pavilionFront=z+d*.42;
      for(const side of [-1,1]){
        const sx=x+side*w*.36;
        put('body',wallColor,shop,sx,pavilionHeight/2,z-d*.04,w*.28,pavilionHeight,d*.92);
        put('roof',trim,shop,sx,pavilionHeight+.13,z-d*.04,w*.28+.12,.26,d*.92+.12);
        put('displayGlass',glass,shop,sx,1.80,pavilionFront+.08,w*.20,2.30,.16);
        put('shopForecourtDetail',0x9d7048,shop,sx,.78,pavilionFront+.24,w*.20,.85,.18);
        for(let fruit=0;fruit<5;fruit++)put('shopSoftFurniture',fruit%2?0xdab750:0x8fbd52,shop,sx+(fruit-2)*w*.035,1.27,pavilionFront+.36,.25,.23,.25);
        for(const bay of [-.43,0,.43])put('marketHallPost',trim,shop,x+side*w*.47,height/2,z+bay*d,.20,height,.20);
        if(stage>=4)for(const bay of [-.28,0,.28])put('displayGlass',glass,shop,x+side*(w/2+.08),pavilionHeight-.70,z+bay*d,.16,.80,d*.19);
      }
      put('body',wallColor,shop,x,height*.35,z-d*.42,w,height*.70,d*.16);
      put('roof',trim,shop,x,height*.70+.13,z-d*.42,w+.16,.26,d*.16+.16);
      put('marketServiceDoor',trim,shop,x,1.35,z-d/2-.09,1.90,2.60,.18);
      put('displayGlass',glass,shop,x,1.70,z-d/2-.20,1.45,1.30,.06);
      for(let level=2.10;level+.70<height*.70;level+=2.60)for(const side of [-1,1])
        put('displayGlass',glass,shop,x+side*w*.31,level,z-d/2-.08,w*.20,1.30,.16);
    }else if(bakerySplit){
      // A low shop and cafe frontage joins the taller baking and preparation hall.
      put('body',wallColor,shop,x,2.60,z+d*.30,w,5.20,d*.40);
      put('body',wallColor,shop,x,height/2,upperZ,w,height,upperDepth);
      for(const side of [-1,1]){
        put('displayGlass',glass,shop,x+side*(w/2+.08),2.45,z+d*.30,.16,1.75,d*.23);
        for(let level=6.45;level+.80<height;level+=3.10){
          for(const bay of [-.25,.25])put('displayGlass',glass,shop,x+side*(w/2+.08),level,upperZ+bay*upperDepth,.16,1.55,upperDepth*.31);
          for(const bay of [-1,0,1]){
            if(side<0&&level-.775<=height*.59+.30)continue;
            put('displayGlass',glass,shop,x+bay*w*.29,level,upperZ+side*(upperDepth/2+.08),w*.21,1.55,.16);
          }
        }
      }
    }else if(industrialSplit){
      put('body',wallColor,shop,x,height*.39,z,w*.22,height*.78,d);
      put('garageRoof',trim,shop,x,height*.78+.25,z,w*.22+.16,.50,d+.26);
      for(const side of [-1,1]){
        const hallHeight=height*(side<0?.90:1),hallX=x+side*w*.305;
        put('body',wallColor,shop,hallX,hallHeight/2,z,w*.39,hallHeight,d);
        put('garageRoof',trim,shop,hallX,hallHeight+.25,z,w*.39+.16,.50,d+.26);
        if(stage>=4){
          put('workshopDaylightRoof',glass,shop,hallX,hallHeight+.99,z-d*.05,w*.23,.98,d*.62);
          put('garageRoof',trim,shop,hallX,hallHeight+1.54,z-d*.05,w*.25,.12,d*.64);
        }
        if(stage>=5)for(const bay of [-.30,0,.30])put('displayGlass',glass,shop,x+side*(w/2+.08),hallHeight-.95,z+bay*d,.16,1.05,d*.21);
        if(hallHeight>6.4)put('displayGlass',glass,shop,hallX,hallHeight-1,front+.08,w*.27,.95,.16);
      }
      if(height*.78>6.3)put('displayGlass',glass,shop,x,height*.78-.85,front+.08,w*.15,.85,.16);
    }else if(steppedPharmacy){
      // Health and consultation wings share the original pharmacy, growing as complete rooms.
      put('body',wallColor,shop,x,height/2,z,w*.58,height,d);
      for(const side of [-1,1]){
        const wingHeight=Math.max(5.30,height*(side<0?(stage>=5?.84:.72):(stage>=6?.91:.65)));
        put('body',wallColor,shop,x+side*w*.395,wingHeight/2,z,w*.21,wingHeight,d);
        put('pharmacyWingRoof',trim,shop,x+side*w*.395,wingHeight+.23,z,w*.21+.16,.46,d+.26);
        for(let level=6.45;level+.80<wingHeight;level+=3.10){
          for(const bay of [-.30,0,.30])put('displayGlass',glass,shop,x+side*(w/2+.08),level,z+bay*d,.16,1.55,d*.20);
          for(const face of [-1,1])if(face>0||level-.775>height*.63+.30)put('displayGlass',glass,shop,x+side*w*.395,level,z+face*(d/2+.08),w*.14,1.55,.16);
        }
      }
      for(let level=6.45;level+.80<height;level+=3.10)for(const face of [-1,1])for(const bay of [-1,0,1]){
        if(face<0&&level-.775<=height*.63+.30)continue;
        put('displayGlass',glass,shop,x+bay*w*.17,level,z+face*(d/2+.08),w*.125,1.55,.16);
        put('body',0xe4eee0,shop,x+bay*w*.17,level-.86,z+face*(d/2+.15),w*.145,.13,.22);
      }
    }else if(fashionUpper){
      put('body',wallColor,shop,x,2.45,z,w,4.90,d);
      put('body',wallColor,shop,x,(height+4.90)/2,upperZ,upperWidth,height-4.90,upperDepth);
      put('fashionTerraceDeck',0xd1bda5,shop,x,4.99,front-d*.15,w+.12,.20,d*.30);
      if(stage>=4){
        put('fashionBalustrade',trim,shop,x,5.99,front-.12,w*.96,.10,.10);
        for(const side of [-1,1]){
        put('fashionBalustrade',trim,shop,x+side*w*.48,5.99,front-d*.15,.10,.10,d*.30);
        for(const bay of [-.42,-.21,0,.21,.42])put('fashionBalustrade',trim,shop,x+bay*w,5.54,front-.12,.06,.85,.06);
        for(const bay of [.05,.15,.25])put('fashionBalustrade',trim,shop,x+side*w*.48,5.54,front-d*bay,.06,.85,.06);
        }
      }
      for(let level=6.65;level+1.05<height;level+=3.60){
        for(const face of [-1,1])for(const bay of [-1,0,1]){
          if(face<0&&level-1.025<=fashionAnnexHeight+.30)continue;
          put('displayGlass',glass,shop,x+bay*upperWidth*.29,level,upperZ+face*(upperDepth/2+.08),upperWidth*.24,2.05,.16);
          put('body',trim,shop,x+bay*upperWidth*.29,level-1.10,upperZ+face*(upperDepth/2+.15),upperWidth*.26,.14,.24);
          if(face>0){
            const mannequinX=x+bay*upperWidth*.29,windowZ=upperFront+.24;
            put('fashionShowroomDress',bay===0?0xc54e79:0x447da3,shop,mannequinX,level-.10,windowZ,.62,1.36,.55);
            put('shopSoftFurniture',0xe4c5a8,shop,mannequinX,level+.86,windowZ+.04,.18,.22,.18);
            put('shopForecourtDetail',0x52606b,shop,mannequinX,level-.87,windowZ,.09,.24,.09);
            put('shopForecourtDetail',0x52606b,shop,mannequinX,level-.98,windowZ,.45,.10,.12);
          }
        }
        for(const side of [-1,1])for(const bay of [-1,1])put('displayGlass',glass,shop,x+side*(upperWidth/2+.08),level,upperZ+bay*upperDepth*.25,.16,2.05,upperDepth*.37);
      }
      for(const side of [-1,1])put('displayGlass',glass,shop,x+side*(w/2+.08),2.45,z,.16,1.75,d*.48);
    }else if(shape===8&&stage>=2){
      // A multiplex grows as complete auditoriums beside its central hall.
      put('body',wallColor,shop,x,height/2,z,w*.48,height,d);
      for(const side of [-1,1]){
        const wingHeight=height*(side<0?(stage>=4?.87:.70):(stage>=6?.94:.77));
        const wingDepth=d*(stage>=3?.96:.84),wingZ=z-(d-wingDepth)/2;
        put('body',side<0?wallColor:style.walls,shop,x+side*w*.37,wingHeight/2,wingZ,w*.26,wingHeight,wingDepth);
        put('cinemaRoof',trim,shop,x+side*w*.37,wingHeight+.24,wingZ,w*.26+.12,.48,wingDepth+.20);
        // Glazed lobby connects the recessed halls to the street frontage.
        put('body',wallColor,shop,x+side*w*.37,2.30,z+d*.43,w*.26,4.60,d*.14);
        put('cinemaRoof',trim,shop,x+side*w*.37,4.74,z+d*.43,w*.26+.12,.28,d*.14+.18);
      }
    }else if(diningUpper){
      put('body',wallColor,shop,x,2.60,z,w,5.20,d);
      put('body',wallColor,shop,x,(height+5.20)/2,upperZ,upperWidth,height-5.20,upperDepth);
      for(const side of [-1,1]){
        put('displayGlass',glass,shop,x+side*(w/2+.08),2.45,z,.16,1.75,d*.48);
        put('body',trim,shop,x+side*(w/2+.17),1.50,z,.26,.14,d*.51);
      }
      put('diningTerraceDeck',0xc7aa88,shop,x,5.30,front-d*.16,w+.14,.20,d*.32);
      if(stage>=4){
        put('diningBalustrade',trim,shop,x,6.26,front-.12,w*.97,.12,.12);
        for(const side of [-1,1]){
          put('diningBalustrade',trim,shop,x+side*w*.48,6.26,front-d*.16,.12,.12,d*.32);
          for(const bay of [-.42,-.21,0,.21,.42])put('diningBalustrade',trim,shop,x+bay*w,5.83,front-.12,.07,.85,.07);
          for(const bay of [.06,.17,.28])put('diningBalustrade',trim,shop,x+side*w*.48,5.83,front-d*bay,.07,.85,.07);
        }
      }
      if(stage>=5){
        put('diningTerraceAwning',trim,shop,x,8.20,front-d*.16,w*.94,.18,d*.32);
        for(const side of [-1,1])put('diningBalustrade',trim,shop,x+side*w*.45,6.75,front-.22,.13,2.70,.13);
      }
      for(let level=6.45;level+.75<height;level+=2.95){
        for(const side of [-1,1])for(const bay of [-1,0,1]){
          const low=side<0?Math.max(level-.675,height*(shape===0?.57:.69)+.30):level-.675;
          const paneHeight=level+.675-low;
          if(paneHeight>.45)put('displayGlass',glass,shop,x+bay*upperWidth*.29,low+paneHeight/2,upperZ+side*(upperDepth/2+.08),upperWidth*.22,paneHeight,.16);
          put('displayGlass',glass,shop,x+side*(upperWidth/2+.08),level,upperZ+bay*upperDepth*.28,.16,1.35,upperDepth*.20);
        }
      }
    }else put('body',wallColor,shop,x,height/2,z,w,height,d);
    let serviceRear=z-d/2;

    if(stage>=1&&!(shape===8&&progress.premium)){
      const canopyDepth=shape===0||shape===2||shape===7?4.15:shape===6?1.45:2.15;
      const canopyWidth=w*(shape===8?.90:.82);
      const canopyY=shape===8||shape===6?3.55:3.04;
      put('evolutionEntranceCanopy',trim,shop,x,canopyY,front+canopyDepth*.43,canopyWidth,.24,canopyDepth);
      for(const side of [-1,1])
        put('evolutionEntranceColumn',wallColor,shop,x+side*canopyWidth*.48,canopyY*.50,front+canopyDepth*.80,.18,canopyY-.12,.18);
      if(shape===7){
        for(const side of [-1,1]){
          const tx=x+side*w*.29,tz=front+3.25;
          put('shopPaving',paving,shop,tx,.08,tz,2.26,.10,1.40);
          put('evolutionOutdoorTable',0xc69b68,shop,tx,1.02,tz,1.14,.14,.91);
          put('evolutionOutdoorTableLeg',trim,shop,tx,.53,tz,.22,.83,.22);
          for(const chairSide of [-1,1]){
            const chairX=tx+chairSide*.78;
            put('evolutionOutdoorChair',trim,shop,chairX,.55,tz,.42,.12,.46);
            put('evolutionOutdoorChairBack',trim,shop,tx+chairSide*.92,.86,tz,.12,.59,.48);
            seatSupports(shop,chairX,tz,.13,.49,.15,.17,trim);
          }
        }
      }else if(shape!==0&&shape!==2){
        for(const side of [-1,1])
          put('evolutionEntrancePlanter',0x66894b,shop,x+side*canopyWidth*.46,.40,front+3.05,.72,.65,.72);
      }
    }
    if(stage>=6){
      const gardenZ=front+2.35;
      const gardenEdge=Math.min(9.25,w/2+1,(shop.right??x+10.225)-x-.85,x-(shop.left??x-10.225)-.85);
      for(const side of [-1,1]){
        const gardenX=x+side*gardenEdge;
        put('evolutionGardenBox',0xdec9a6,shop,gardenX,.35,gardenZ,1.45,.55,1.15);
        put('evolutionGardenHedge',0x53804c,shop,gardenX,.91,gardenZ,1.31,.72,1.02);
        put('evolutionGardenLamp',trim,shop,gardenX,2.14,gardenZ,.15,2.08,.15);
        put('evolutionGardenLantern',0xffd798,shop,gardenX,3.22,gardenZ,.35,.38,.35);
      }
    }
    if(stage>=7){

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
      if(library)serviceRear=back;
      for(const bay of [-1,0,1]){
        const bx=x+bay*annexWidth*.28;
        if(!library&&bay===0){
          put('entryDoor',trim,shop,bx,1.26,back-.12,1.31,2.48,.19);
          put('entryDoorGlass',glass,shop,bx,1.38,back-.24,1.07,1.95,.07);
        }else if(!(library&&progress.premium&&bay===0))put('displayGlass',glass,shop,bx,annexHeight*.49,back-.07,annexWidth*.20,annexHeight*.55,.16);
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
        const porchHeight=stage>=3?5.2:3.3;
        put('roof',trim,shop,x,porchHeight,front+.83,porchWidth,.27,1.76);
        put('shopPaving',0xd9c7a8,shop,x,.19,front+.81,porchWidth,.20,1.91);
        for(const bay of [-.43,-.15,.15,.43])
          put('body',0xe9d9bb,shop,x+bay*porchWidth,porchHeight/2+.05,front+1.46,stage>=3?.40:.27,porchHeight-.15,stage>=3?.40:.27);
        if(stage>=3){
          put('body',0xe9d9bb,shop,x,porchHeight+.38,front+.83,porchWidth+.30,.47,1.89);
          for(const bay of [-.43,-.15,.15,.43])put('body',0xf0dfbd,shop,x+bay*porchWidth,porchHeight-.15,front+1.46,.62,.25,.62);
        }
      }
      if(!library&&stage>=2){
        put('shopPaving',0xbc9876,shop,x,.15,back-1.4,annexWidth,.17,2.75);
        for(const side of [-1,1]){
          const tx=x+side*annexWidth*.25;
          put('shopDiningPedestal',trim,shop,tx,.60,back-1.47,.22,.84,.22);
          put('shopDiningTable',0xf4dab1,shop,tx,1.04,back-1.47,1.18,.13,.94);
          for(const end of [-1,1]){
            put('shopForecourtDetail',0xb98350,shop,tx,.55,back-1.47+end*.85,.53,.13,.56);
            put('shopForecourtDetail',0xb98350,shop,tx,.87,back-1.47+end*1.10,.53,.62,.10);
            for(const sideLeg of [-1,1])put('shopForecourtDetail',trim,shop,tx+sideLeg*.19,.29,back-1.47+end*.85,.06,.48,.42);
          }
          if(stage>=6){
            put('shopPergolaPost',trim,shop,tx+side*.70,1.65,back-2.45,.14,2.99,.14);
            put('shopPergolaBeam',trim,shop,tx+side*.70,3.13,back-1.31,.16,.18,2.50);
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
      serviceRear=back;
      if(restaurant){
        for(const bay of [-1,0,1]){
          if(bay===0){
            put('entryDoor',trim,shop,x,1.26,back-.13,1.42,2.48,.19);
            put('entryDoorGlass',glass,shop,x,1.38,back-.25,1.17,1.95,.07);
          }else put('displayGlass',glass,shop,x+bay*extensionWidth*.27,extensionHeight*.51,back-.08,extensionWidth*.19,extensionHeight*.56,.17);
        }
        if(stage>=2){
          put('shopPaving',0xc19b76,shop,x,.16,back-1.65,extensionWidth,.20,3.25);
          for(const side of [-1,1]){
            const tx=x+side*extensionWidth*.25;
            put('shopDiningTable',0xf0ca91,shop,tx,1.08,back-1.59,1.18,.14,.95);
            put('shopDiningPedestal',trim,shop,tx,.60,back-1.59,.23,.83,.23);
            for(const end of [-1,1]){
              put('shopForecourtDetail',0x88534b,shop,tx,.55,back-1.59+end*.88,.57,.13,.58);
              put('shopForecourtDetail',0x88534b,shop,tx,.87,back-1.59+end*1.14,.57,.62,.10);
              for(const sideLeg of [-1,1])put('shopForecourtDetail',trim,shop,tx+sideLeg*.21,.29,back-1.59+end*.88,.06,.48,.44);
            }
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
      const annexH=shape===5?fashionAnnexHeight:height*[.63,.83,.73,.59][shape-4];
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
      serviceRear=hallZ-hallDepth/2;
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
        for(let fruit=0;fruit<5;fruit++)put('shopSoftFurniture',fruit%2?0xe5b456:0x93b950,shop,sx+(fruit-2)*stallWidth*.15,1.22,stallZ-.58,.25,.22,.25);
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

    if(shape===3&&stage>=2){
      const stone=0xe9d9bb;
      for(const side of [-1,1])put('displayGlass',glass,shop,x+side*(w/2+.08),2.4,z,.16,1.6,d*.50);
      for(let level=5.5;level+1<height;level+=3.2){
        for(const side of [-1,1]){
          for(const bay of [-1,0,1]){
            const bx=x+bay*w*.29,bz=z+bay*d*.28;
            put('displayGlass',glass,shop,bx,level,z+side*(d/2+.08),w*.21,1.85,.16);
            put('displayGlass',glass,shop,x+side*(w/2+.08),level,bz,.16,1.85,d*.20);
            put('body',stone,shop,bx,level-.99,z+side*(d/2+.16),w*.25,.15,.26);
            put('body',stone,shop,x+side*(w/2+.16),level-.99,bz,.26,.15,d*.24);
            if(progress.premium){
              put('body',stone,shop,bx,level,z+side*(d/2+.18),.09,1.85,.11);
              put('body',stone,shop,x+side*(w/2+.18),level,bz,.11,1.85,.09);
            }
          }
        }
      }
      if(stage>=4){
        for(const side of [-1,1])for(const bay of [-.45,-.15,.15,.45]){
          put('body',stone,shop,x+bay*w,height*.48,z+side*(d/2+.16),.24,height*.94,.31);
          put('body',stone,shop,x+side*(w/2+.16),height*.48,z+bay*d,.31,height*.94,.24);
        }
      }
    }
    if(shape===9){
      for(let level=2.4;level+1<height;level+=3.6){
        for(const side of [-1,1])for(const bay of [-1,1]){
          const wx=x+bay*w*.24,wz=z+bay*d*.24;
          if(side<0)put('displayGlass',glass,shop,wx,level,z-d/2-.08,w*.36,1.8,.16);
          if(side>0&&level>=6)put('displayGlass',glass,shop,wx,level,front+.08,w*.36,1.8,.16);
          put('displayGlass',glass,shop,x+side*(w/2+.08),level,wz,.16,1.8,d*.36);
          if(progress.premium){
            if(side<0)put('body',0xdde7cd,shop,wx,level,z-d/2-.19,.10,1.8,.10);
            if(side>0&&level>=6)put('body',0xdde7cd,shop,wx,level,front+.19,.10,1.8,.10);
            put('body',0xdde7cd,shop,x+side*(w/2+.19),level,wz,.10,1.8,.10);
          }
        }
      }
    }
    if(shape===10){
      for(let floor=0;floor<Math.ceil(height/3.35);floor++){
        const levelY=3.70+floor*3.35;
        if(levelY+1>height)continue;
        for(const side of [-1,1]){
          // Leave the entrance portico free; every accessible guest floor has a balcony.
          const balcony=progress.premium&&(side<0||floor>=1)&&levelY+1.30<height;
          for(const bay of [-1,0,1]){
            put('hotelUpperWindow',glass,shop,x+bay*w*.29,levelY+(balcony?.035:0),z+side*(d/2+.07),w*.20,balcony?2.25:1.79,.15);
            put('hotelUpperWindow',glass,shop,x+side*(w/2+.07),levelY,z+bay*d*.28,.15,1.79,d*.20);
            if(progress.premium){
              if(!balcony)put('shopPremiumSill',0xf2dfbf,shop,x+bay*w*.29,levelY-.98,z+side*(d/2+.16),w*.24,.14,.30);
              put('shopPremiumSill',0xf2dfbf,shop,x+side*(w/2+.16),levelY-.98,z+bay*d*.28,.30,.14,d*.24);
              put('shopPremiumMullion',0xf2dfbf,shop,x+bay*w*.29,levelY+(balcony?.035:0),z+side*(d/2+.17),.07,balcony?2.25:1.79,.10);
              put('shopPremiumMullion',0xf2dfbf,shop,x+side*(w/2+.17),levelY,z+bay*d*.28,.10,1.79,.07);
            }
          }
          if(balcony){
            const deckY=levelY-1.19,edge=z+side*(d/2+1.23),balconyW=w*.88;
            put('hotelBalcony',0xf2dfbf,shop,x,deckY,z+side*(d/2+.59),balconyW,.16,1.30);
            put('hotelBalconyGlass',glass,shop,x,deckY+.61,edge,balconyW,.88,.065);
            put('hotelBalconyRail',trim,shop,x,deckY+1.18,edge,balconyW+.08,.09,.10);
            for(const end of [-1,1]){
              put('hotelBalconyGlass',glass,shop,x+end*balconyW/2,deckY+.61,z+side*(d/2+.59),.065,.88,1.30);
              put('hotelBalconyPost',trim,shop,x+end*balconyW/2,deckY+.67,edge,.07,1.02,.07);
              put('hotelBalconySideRail',trim,shop,x+end*balconyW/2,deckY+1.18,z+side*(d/2+.59),.10,.09,1.30);
            }
          }
          put('evolutionStoreyBand',trim,shop,x,levelY+1.23,z+side*(d/2+.09),w+.10,.16,.22);
          put('evolutionSideStoreyBand',trim,shop,x+side*(w/2+.09),levelY+1.23,z,.22,.16,d+.10);
        }
      }
    }
    if(progress.premium){
      const crownHeight=industrialSplit?height*.78:height;
      const crownWidth=industrialSplit?w*.22:recessedUpper?upperWidth:steppedPharmacy?w*.58:shape===8&&stage>=2?w*.48:w;
      put('shopPremiumCornice',0xf2dfbf,shop,x,crownHeight-.12,(recessedUpper?upperFront:front)+.14,crownWidth,.25,.34);
      put('shopPremiumRearCornice',0xf2dfbf,shop,x,crownHeight-.12,z-d/2-.12,crownWidth,.25,.31);
      for(const side of [-1,1]){
        const sideX=x+side*((recessedUpper?upperWidth:w)/2+.12);
        const sideHeight=industrialSplit?height*(side<0?.90:1):steppedPharmacy?Math.max(5.30,height*(side<0?(stage>=5?.84:.72):(stage>=6?.91:.65))):shape===8&&stage>=2?height*(side<0?(stage>=4?.87:.70):(stage>=6?.94:.77)):height;
        const sideDepth=recessedUpper?upperDepth:shape===8&&stage>=2?d*(stage>=3?.96:.84):d;
        const sideZ=z-(d-sideDepth)/2;
        put('shopPremiumSideCornice',0xf2dfbf,shop,sideX,sideHeight-.12,sideZ,.31,.25,sideDepth+.22);
        put('shopPremiumSidePilaster',0xf2dfbf,shop,sideX,sideHeight*.47,z-d*.40,.26,sideHeight*.89,.29);
      }
      for(const side of [-1,1]){
        const px=x+side*w*.44;
        const entranceHeight=bakerySplit?5.2:industrialSplit?height*(side<0?.90:1):diningUpper?5.2:fashionUpper?4.9:steppedPharmacy?Math.max(5.30,height*(side<0?(stage>=5?.84:.72):(stage>=6?.91:.65))):shape===8&&stage>=2?4.6:height;
        put('shopPremiumPilaster',0xf2dfbf,shop,px,entranceHeight*.47,front+.16,.29,entranceHeight*.89,.28);
        put('shopPremiumLamp',0xffd887,shop,px,entranceHeight*.64,front+.35,.23,.36,.18);
        put('shopPremiumPlanter',trim,shop,px,.30,front+.93,.64,.47,.52);
        put('shopPremiumPlant',0x648e40,shop,px,.65,front+.93,.48,.36,.43);
      }
    }
    if(shape===0){
      put('tradeBracket',trim,shop,x,signRoof+.40,front+.245,.18,.13,1.0);
      put('tradeBracket',trim,shop,x,signRoof+.58,front+.67,.15,.36,.15);
      put('cafeCupSign',0xffefcd,shop,x,signRoof+1.35,front+1.10,1.68,1.26,1.59);
      put('cafeHandleSign',0xffefcd,shop,x+.84,signRoof+1.36,front+1.10,1.17,1.22,1.16);
    }
    if(shape===2&&shop.id%24===14){
      put('tradeMark',trim,shop,x,signRoof+.25,front+.30,.16,.10,.65);
      put('tradeMark',trim,shop,x,signRoof+.93,front+.55,.16,1.70,.10);
      put('pizzaDiscSign',0xc47b30,shop,x,signRoof+2.13,front+.60,2.85,2.85,.39);
      put('pizzaSauceSign',0xffc260,shop,x,signRoof+2.13,front+.83,2.46,2.46,.09);
      for(let topping=0;topping<6;topping++){
        const angle=topping*Math.PI/3;
        put('pizzaToppingSign',0xc24438,shop,x+Math.cos(angle)*.73,signRoof+2.13+Math.sin(angle)*.73,front+.90,.34,.34,.07);
      }
    }
    const pizzeria=shape===2&&shop.id%24===14;
    if(shape!==0&&!pizzeria){
      const baseScale=shape===6?2.00:shape===8||shape===10?1.70:1.42;
      const sculptureScale=baseScale*(1+stage*.025);
      const badgeY=signRoof+2.43+stage*.045;
      // Keep the sculpture itself ahead of roof overhangs and railings.
      // Its slim support is the only part allowed to attach to the fascia.
      const badgeZ=front+.36+businessMarkRearReach[shape]*sculptureScale;
      const mark=(dx,dy,width,markHeight,color,kind='tradeMark',dz=0,depth=.38)=>{
        put(kind,color,shop,x+dx*sculptureScale,badgeY+dy*sculptureScale,
          badgeZ+dz*sculptureScale,width*sculptureScale,markHeight*sculptureScale,depth*sculptureScale);
      };
      const bracketY=signRoof+.065,attachmentZ=front-.24;
      const poleTop=shape===2?badgeY-.60*sculptureScale:badgeY;
      put('tradeBracket',trim,shop,x,(poleTop+bracketY)/2,badgeZ,.17,poleTop-bracketY,.15);
      put('tradeBracket',trim,shop,x,bracketY,(attachmentZ+badgeZ)/2,.24,.17,badgeZ-attachmentZ+.15);
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
        mark(0,-.60,.89,.08,trim,'tradeBracket',0,.13);
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
        for(const side of [-1,1])mark(side*.5225,0,.535,.51,0x247e56,'tradeMark',0,.80);
        for(const side of [-1,1]){
          mark(0,0,.32,1.37,0xa6ffb1,'tradeMark',side*.412,.045);
          mark(0,0,1.37,.32,0xa6ffb1,'tradeMark',side*.412,.045);
        }
      }else if(shape===5){ // Dress on a rounded display mannequin
        mark(0,.62,.30,.38,0xe4bb94,'tradeSculpt',0,.29);
        mark(0,0,.63,.95,0xc44f71,'tradeSculpt',0,.62);
        mark(0,-.12,1.14,1.06,0xd9547c,'tradeDress',0,4.2);
      }else if(shape===6){ // Wrench with a rounded handle and open jaws
        mark(0,-.25,.29,1.09,0x465f76,'tradeSculpt',0,.46);
        mark(0,.24,.84,.24,0x6f91ab,'tradeMark',0,.49);
        for(const side of [-1,1])mark(side*.31,.46,.23,.42,0x6f91ab,'tradeSculpt',0,.46);
      }else if(shape===7){ // Rounded loaf with scored crust
        mark(0,0,1.69,.95,0xe1a34c,'tradeSculpt',0,.96);
        for(const score of [-.40,0,.40])for(const dz of [-.28,-.14,0,.14,.28]){
          const surface=.475*Math.sqrt(Math.max(0,1-(score/.845)**2-(dz/.48)**2));
          mark(score,surface+.012,.10,.045,0xb8793a,'tradeSculpt',dz,.16);
        }
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
    for(const side of shape===6||marketHall?[]:[-1,1]){
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
        const loafSpacing=wingW*.24,loafWidth=Math.min(.38,loafSpacing*.87);
        for(let loaf=0;loaf<3;loaf++){
          put('bakeryLoaf',loaf%2?0xb77331:0xe5a75b,shop,wx+(loaf-1)*loafSpacing,
            displayY-.39,paneZ+.07,loafWidth,.16,.19);
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
        const dressY=displayY-.17;
        put('fashionShowroomDress',fabric,shop,wx,dressY,front+.198,.64,.96,.70);
        put('fashionDisplayNeck',0xe5c5a2,shop,wx,dressY+.68,front+.195,.17,.16,.074);
      }
      if(shape!==6)put('displayReflection',0x9bc9df,shop,wx-wingW*.29,displayY+.12,front+.181,
        .055,displayH*.79,.012);
      // Only a single subtle central mullion on wide shop windows.
      if(wingW>2.8)put('displayDivider',0x5d7073,shop,wx,displayY,front+.19,.06,displayH,.07);
    }
    if(!marketHall){
    put('entryDoor',0x455d64,shop,x,doorH/2+.12,front+.17,entranceW-.14,doorH,.16);
    put('entryDoorGlass',glass,shop,x,doorH*.69+.10,front+.265,entranceW-.43,doorH*.42,.055);
    put('entryDoorFrame',trim,shop,x,doorH+.22,front+.20,entranceW+.12,.15,.20);
    for(const side of [-1,1])put('entryDoorJamb',trim,shop,x+side*entranceW/2,doorH/2+.10,front+.20,.12,doorH,.20);
    put('entryHandle',0xe6c68c,shop,x+.65,1.15,front+.30,.055,.20,.06);
    put('threshold',0xc5b9a8,shop,x,.105,front+.31,entranceW+.26,.12,.54);
    }
    // One clean sign band and one restrained canopy, no stacked horizontal bars.
    const signY=Math.min(height-.58,displayY+displayH/2+.68);
    if(!marketHall){
    put('signFascia',trim,shop,x,signY,front+.15,w*.84,.57,.22);
    put('signInset',0xe6dfd2,shop,x,signY,front+.275,w*.74,.32,.06);
    }
    const canopyY=signY-.46;
    if(![6,8,10].includes(shape)&&!marketHall){
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
      put('cinemaRoof',0x364b66,shop,x,height+.24,z,w*(stage>=2?.48:1)+.36,.48,d+.36);
      put('cinemaParapet',trim,shop,x,height+.78,front-.13,w*(stage>=2?.46:.94),1.10,.38);
      put(progress.premium?'cinemaPremiereCanopy':'cinemaMarquee',0xe7bc68,shop,x,progress.premium?3.55:signY+.04,front+(progress.premium?1.90:.46),w*(progress.premium?.94:.80),.44,progress.premium?4.0:.70);
      if(progress.premium){
        const canopyW=w*.94;
        for(const side of [-1,1]){
          put('cinemaPremiereColumn',trim,shop,x+side*canopyW*.46,1.78,front+3.68,.26,3.30,.26);
          put('cinemaPremiereCapital',0xe7bc68,shop,x+side*canopyW*.46,3.24,front+3.68,.46,.18,.46);
          put('cinemaPremiereSideTrim',trim,shop,x+side*canopyW*.495,3.55,front+1.90,.10,.31,3.94);
          for(let row=0;row<6;row++)put('cinemaPremiumBulb',0xffda83,shop,x+side*canopyW*.43,3.28,front+.24+row*.66,.14,.14,.14);
        }
        put('cinemaPremiereFascia',trim,shop,x,3.55,front+3.94,canopyW,.29,.12);
        for(let lamp=0;lamp<Math.max(8,Math.round(w/.65));lamp++){
          const count=Math.max(8,Math.round(w/.65)),px=x+((lamp/(count-1))-.5)*canopyW*.91;
          put('cinemaPremiumBulb',0xffda83,shop,px,3.55,front+4.025,.12,.12,.12);
        }
        if(stage<3){
          const panelY=Math.max(6.4,height*.72),panelH=Math.min(2.6,height*.24),panelW=w*.43;
          put('cinemaPosterCase',0xe7bc68,shop,x,panelY,front+.16,panelW,panelH,.20);
          put('cinemaPosterArtwork',0x1d405c,shop,x,panelY,front+.30,panelW-.22,panelH-.20,.05);
          put('cinemaPosterMoon',0xffd58c,shop,x-panelW*.26,panelY+panelH*.18,front+.35,.58,.58,.04);
          for(let tower=0;tower<5;tower++){
            const rise=.35+(tower%3)*.18;
            put('cinemaPosterSkyline',0x72a6b0,shop,x+(tower-2)*panelW*.13,panelY-panelH*.28+rise/2,front+.35,panelW*.10,rise,.04);
          }
        }
        const posterY=2.20,posterH=2.65;
        for(const side of [-1,1])for(const bay of [-1,1]){
          const posterZ=z+bay*d*.22,posterDepth=d*.25;
          put('cinemaPosterCase',0xe7bc68,shop,x+side*(w/2+.105),posterY,posterZ,.17,posterH,posterDepth);
          put('cinemaPosterArtwork',bay<0?0x872d4d:0x24547f,shop,x+side*(w/2+.21),posterY,posterZ,.06,posterH-.22,posterDepth-.22);
          put('cinemaSidePosterMoon',0xffd58c,shop,x+side*(w/2+.25),posterY+.50,posterZ-posterDepth*.18,.04,.42,posterDepth*.23);
          put('cinemaPosterTitle',0xf8deb6,shop,x+side*(w/2+.25),posterY-.77,posterZ,.04,.12,posterDepth*.65);
        }
        for(const bay of [-1,0,1]){
          const px=x+bay*w*.29,pw=w*.23,back=serviceRear-(stage>=4?.35:0),rearPosterY=4.55;
          if(stage>=4)for(const side of [-1,1])put('cinemaPosterMount',trim,shop,px+side*pw*.39,rearPosterY,serviceRear-.22,.12,.20,.45);
          put('cinemaPosterCase',0xe7bc68,shop,px,rearPosterY,back-.105,pw,posterH,.17);
          put('cinemaPosterArtwork',[0x872d4d,0x24547f,0x356b5a][bay+1],shop,px,rearPosterY,back-.21,pw-.22,posterH-.22,.06);
          put('cinemaPosterMoon',0xffd58c,shop,px-pw*.18,rearPosterY+.50,back-.25,pw*.23,.42,.04);
          put('cinemaPosterTitle',0xf8deb6,shop,px,rearPosterY-.77,back-.25,pw*.65,.12,.04);
        }
      }
      for(const side of [-1,1])put('cinemaLight',0xffe3a4,shop,x+side*w*.36,signY+.04,front+(progress.premium?.36:.85),.13,.13,.12);
      if(stage>=2){
        for(const side of [-1,1]){
          const pierX=x+side*w*.225;
          put('body',trim,shop,pierX,height*.47,front+.08,.25,height*.92,.36);
          put('displayGlass',0xe9be71,shop,pierX,height*.52,front+.29,.10,height*.72,.10);
        }
      }
      if(stage>=3){
        // A tall, framed screen replaces the generic upper-storey windows.
        put('body',trim,shop,x,height*.67,front+.11,w*.40,height*.34,.27);
        put('displayGlass',0x182a45,shop,x,height*.67,front+.27,w*.36,height*.29,.10);
        for(const side of [-1,1])put('displayGlass',0xd8ae62,shop,x+side*w*.16,height*.67,front+.34,.09,height*.25,.07);
      }
      if(stage>=4){
        for(const side of [-1,1]){
          const towerX=x+side*w*.43;
          const towerHeight=height*(stage>=6?.91:.71);
          put('body',trim,shop,towerX,towerHeight/2,front-.25,w*.095,towerHeight,.75);
          put('cinemaRoof',0xe7bc68,shop,towerX,towerHeight+.16,front-.25,w*.11,.25,.91);
          for(let light=0;light<stage-1;light++)put('cinemaLight',0xffe3a4,shop,towerX,1.1+light*(towerHeight-1.6)/(stage-2),front+.17,.17,.27,.09);
        }
      }
    }else if(shape===6){ // Garage: broad rolling door, industrial lintel.
      if(!industrialSplit)put('garageRoof',trim,shop,x,height+.25,z,w+.34,.50,d+.34);
      for(const side of industrialSplit?[-1,1]:[1]){
        const gateX=x+side*w*.305,gateWidth=w*(industrialSplit?.29:.25);
        put('garageGate',0x6f8585,shop,gateX,1.73,front+.24,gateWidth,3.15,.15);
        for(let j=0;j<5;j++)put('garageSlat',0x9ab0b0,shop,gateX,.54+j*.57,front+.33,gateWidth*.95,.055,.06);
      }
      if(!industrialSplit)put('displayGlass',glass,shop,x-w*.30,2.1,front+.10,w*.25,1.65,.16);
    }else if(shape===1){ // A retail hall grows in volume, with daylight roofs instead of rooftop storeys.
      put('superRoof',trim,shop,x,height+.27,z,w+.45,.54,d+.45);
      if(stage>=3){
        const lanterns=stage>=7?2:1;
        const lanternWidth=w*(lanterns===2?.26:.46);
        for(let i=0;i<lanterns;i++){
          const lx=x+(i-(lanterns-1)/2)*w*.43;
          const rise=stage>=5?1.65:1.05;
          put('superClerestory',wallColor,shop,lx,height+.54+rise/2,z-d*.08,lanternWidth,rise,d*.70);
          put('superRoof',trim,shop,lx,height+.54+rise+.12,z-d*.08,lanternWidth+.26,.24,d*.70+.26);
          for(const side of [-1,1]){
            put('displayGlass',glass,shop,lx,height+.54+rise*.54,z-d*.08+side*(d*.35+.08),lanternWidth*.85,rise*.60,.16);
            put('displayGlass',glass,shop,lx+side*(lanternWidth/2+.08),height+.54+rise*.54,z-d*.08,.16,rise*.60,d*.60);
          }
        }
      }
      if(stage>=4){
        for(const side of [-1,1])for(const bay of [-.30,0,.30]){
          put('displayGlass',glass,shop,x+side*(w/2+.08),height*.66,z+bay*d,.16,height*.30,d*.22);
          if(progress.premium)put('body',0xf2dfbf,shop,x+side*(w/2+.18),height*.66,z+bay*d,.12,height*.30,.10);
        }
      }
      if(stage>=6){
        put('evolutionEntranceCanopy',trim,shop,x,3.75,front+1.05,w*.98,.24,1.70);
        for(const side of [-1,1])put('evolutionEntranceColumn',wallColor,shop,x+side*w*.46,1.80,front+1.70,.20,3.60,.20);
      }
      put('superCanopy',trim,shop,x,canopyY,front+.58,w*.91,.20,1.00);
    }else if(marketHall){
      put('roof',trim,shop,x,height+.23,z,w+.40,.45,d+.40);
      put('marketGable',stage>=5?0x6b9277:0xb47d49,shop,x,height+1.255,z,w+.40,1.60,d+.40);
    }else if(bakerySplit){
      put('roof',trim,shop,x,5.43,z+d*.30,w+.40,.45,d*.40+.20);
      put('roof',trim,shop,x,height+.23,upperZ,w+.40,.45,upperDepth+.40);
      put('bakeryGable',0xb87446,shop,x,height+1.255,upperZ,w+.40,1.60,upperDepth+.40);
    }else if(recessedUpper){
      put('roof',trim,shop,x,height+.23,upperZ,upperWidth+.40,.45,upperDepth+.40);
    }else{
      put('roof',trim,shop,x,height+.23,z,(steppedPharmacy?w*.58:w)+.40,.45,d+.40);
    }
    if(isPizzeria)put('pizzaGable',0xb95838,shop,x,height+1.355,diningUpper?upperZ:z,(diningUpper?upperWidth:w)+.40,1.80,(diningUpper?upperDepth:d)+.40);
    if(shape===0&&stage>=1){ // Café terrace, counter and chalkboard.
      for(const side of [-1,1]){
        const tx=x+side*w*.34;
        put('cafeTableTop',0x426c64,shop,tx,.80,front+1.39,.78,.09,.78);
        put('cafeTableLeg',0x263a38,shop,tx,.40,front+1.39,.10,.78,.10);
        const stoolX=tx+side*.64;
        put('cafeStool',0xbf8451,shop,stoolX,.44,front+1.39,.43,.10,.43);
        seatSupports(shop,stoolX,front+1.39,.055,.39,.15,.15,0x263a38);
        put('cafeCup',0xffe7c4,shop,tx,.91,front+1.39,.16,.13,.16);
      }
      put('cafeChalkboardFrame',0xa2764a,shop,x-1.48,.58,front+1.14,.59,1.06,.25);
      put('cafeChalkboard',0x293733,shop,x-1.48,.63,front+1.28,.47,.76,.035);
    }else if(shape===2&&stage>=1){ // Restaurant terrace with set tables and a timber pergola.
      const patioZ=front+1.72;
      put('restaurantTerrace',0xc29979,shop,x,.11,patioZ,w*.94,.17,2.95);
      for(const side of [-1,1]){
        const tx=x+side*w*.34;
        put('restaurantTable',0xffe4bd,shop,tx,.82,patioZ,1.30,.15,1.08);
        put('restaurantStand',0x63473a,shop,tx,.46,patioZ,.15,.72,.15);
        for(const end of [-1,1]){
          put('restaurantPlate',0xfff6e5,shop,tx,.92,patioZ+end*.29,.28,.04,.24);
          const chairZ=patioZ+end*.84;
          put('restaurantChairSeat',0x7b4d32,shop,tx,.46,chairZ,.53,.12,.50);
          put('restaurantChairBack',0x9f653e,shop,tx,.69,patioZ+end*1.05,.55,.54,.09);
          seatSupports(shop,tx,chairZ,.195,.40,.19,.17,0x63473a);
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
      for(const side of [-1,1])put('fashionPlinth',0xdbc7b0,shop,x+side*w*.29,.43,front+.32,1.24,.76,.23);
    }else if(shape===7){ // Bakery: warm awning and small window counters.
      for(const side of [-1,1]){
        const counterX=x+side*w*.31;
        put('bakeryCounter',0xc08a58,shop,counterX,.74,front+.32,1.54,.20,.31);
        for(const edge of [-1,1])put('shopFixtureFoot',trim,shop,counterX+edge*.60,.34,front+.32,.10,.64,.25);
      }
    }else if(shape===9){ // Gym: bold facade stripes.
      for(const side of [-1,1])put('gymAccent',0x4c886d,shop,x+side*w*.42,height*.60,front+.17,.19,height*.56,.16);
    }else if(shape===11){ // Market: two orderly stalls outside the side windows.
      for(const side of [-1,1]){
        const counterX=x+side*w*.32;
        put('shopPaving',0xbda991,shop,counterX,.06,front+1.04,1.92,.12,1.14);
        put('marketCounter',0xa77e57,shop,counterX,.65,front+1.04,1.68,.43,.66);
        put('marketRoof',trim,shop,counterX,2.14,front+1.04,1.78,.13,.91);
        for(const edge of [-1,1]){
          put('shopFixtureFoot',0x95734f,shop,counterX+edge*.61,.277,front+1.04,.12,.33,.49);
          put('shopTradePost',0x95734f,shop,counterX+edge*.78,1.11,front+1.04,.09,2.01,.09);
        }
      }
    }
    // v6.4.3: category-specific BUILDING silhouettes. These are roof/side
    // structures, not extra canopies piled in front of the windows.
    // All fine details are tagged by put() for existing shop chunk LOD.
    const rooftop=height+.52;
    const roofWidth=recessedUpper?upperWidth/w:1;
    const roofDepth=recessedUpper?upperDepth/d:1;
    const roofCenter=recessedUpper?upperZ:z;
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
        roofPut('superRoofVent',0x809596,shop,x+side*w*.38,rooftop+.36,z+d*.36,.90,.62,1.12);
      put('superLoading',0x74898a,shop,x+w/2+.09,1.60,z-d*.13,.15,2.55,2.65);
      put('superLoadingTrim',0xcbd0c8,shop,x+w/2+.20,3.00,z-d*.13,.18,.20,2.86);
    }else if(shape===2){ // Restaurant: tall extraction stack and tiled roof strip.
      roofPut('restaurantFlue',0x827f77,shop,x+w*.30,rooftop+.86,z-d*.19,.42,1.70,.42);
      roofPut('restaurantFlueCap',0x535953,shop,x+w*.30,rooftop+1.74,z-d*.19,.66,.14,.66);
      if(!isPizzeria)roofPut('restaurantRoofBand',0x9d654c,shop,x,rooftop-.06,z,w*.73,.14,d*.72);
    }else if(shape===3){ // Bookshop: pitched central pediment and tall shelves on side.
      roofPut('bookshopCornice',0x92765b,shop,x,rooftop+.05,front-.17,w*.70,.28,.32);
      roofPut('bookshopPediment',0xc4a784,shop,x,rooftop+.45,front-.19,w*.40,.62,.30);
      if(stage<2)for(let i=0;i<3;i++)
        put('bookshopSideShelf',0x8d6a4c,shop,x+w/2+.15,1.05+i*.78,z,.15,.10,d*.50);
      if(stage>=4){
        for(const side of [-1,1]){
          roofPut('body',0xe9d9bb,shop,x+side*w*.47,height+.88,z,.22,.85,d*.96);
          roofPut('roof',trim,shop,x+side*w*.47,height+1.34,z,.29,.12,d*.98);
          roofPut('body',0xe9d9bb,shop,x,height+.88,z+side*d*.47,w*.96,.85,.22);
          roofPut('roof',trim,shop,x,height+1.34,z+side*d*.47,w*.98,.12,.29);
        }
      }
      if(stage>=5){
        const domeWidth=w*(stage>=7?.70:stage>=6?.64:.56),domeRise=2+stage*.36,domeZ=z-d*.14;
        put('libraryDrum',0xe9d9bb,shop,x,height+.95,domeZ,domeWidth,1.0,domeWidth);
        put('libraryDome',0x508887,shop,x,height+1.45,domeZ,domeWidth,domeRise*2,domeWidth);
        roofPut('roof',0xc5a75e,shop,x,height+1.45+domeRise+.20,domeZ,.25,.40,.25);
      }
    }else if(shape===4){ // Pharmacy: rooftop cross visible from far away.
      roofPut('pharmacyRoofCrossV',0x31a869,shop,x,rooftop+.92,z,.35,1.75,.35);
      roofPut('pharmacyRoofCrossH',0x31a869,shop,x,rooftop+1.02,z,1.30,.35,.35);
      roofPut('pharmacyWhiteBase',0xe2eee5,shop,x,rooftop+.09,z,1.45,.24,1.03);
    }else if(shape===5){ // Fashion: upper display band and projecting side frame.
      roofPut('fashionCrown',0x4c465b,shop,x,rooftop+.17,z,w*.77,.43,d*.72);
      roofPut('fashionCrownInset',0xd6b3bc,shop,x,rooftop+.42,front-.12,w*.49,.22,.18);
      for(const side of [-1,1])
        put('fashionFin',0x5b5165,shop,x+side*w*.46,(fashionUpper?4.9:height)*.50,z,.18,(fashionUpper?4.9:height)*.96,d*.72);
    }else if(shape===6){ // Workshop: roof sawtooth vents and service flue.
      for(const side of industrialSplit?[-1,1]:[-1,0,1]){
        const ventRoof=industrialSplit?height*(side<0?.90:1)+.52:rooftop;
        const ventX=x+side*w*(industrialSplit?.305:.24),ventZ=industrialSplit?z+d*.42:z;
        put('garageVentHousing',0x71838a,shop,ventX,ventRoof+.30,ventZ,.95,.56,1.60);
        put('garageVentTop',0xb0b6ae,shop,ventX,ventRoof+.62,ventZ,.99,.12,1.70);
      }
      put('garagePipe',0x5c696c,shop,x-w*.43,(industrialSplit?height*.90:height)+1.26,z-d*.28,.27,1.38,.27);
    }else if(shape===7){ // Bakery: two brick chimneys and warm cornice.
      for(const side of [-1,1]){
        roofPut('bakeryChimney',0xb96e52,shop,x+side*w*.25,rooftop+(bakerySplit?1.19:.49),z-d*.15,.62,1.10,.60);
        roofPut('bakeryChimneyCap',0x695c52,shop,x+side*w*.25,rooftop+(bakerySplit?1.78:1.08),z-d*.15,.78,.13,.76);
      }
      if(!bakerySplit)roofPut('bakeryRoofTrim',0xd49b6a,shop,x,rooftop-.07,front-.15,w*.78,.18,.28);
    }else if(shape===8){ // Cinema: roof projector tower, bold marquee fins.
      roofPut('cinemaProjection',0x28384e,shop,x,rooftop+.80,z-d*.14,w*(stage>=2?.28:.35),1.46,d*.32);
      roofPut('cinemaProjectionCap',0x486078,shop,x,rooftop+1.59,z-d*.14,w*(stage>=2?.32:.39),.16,d*.35);
      for(const side of [-1,1])
        put('cinemaMarqueeFin',0xf0c876,shop,x+side*w*.43,signY+.10,front+.38,.18,1.10,.55);
    }else if(shape===9){ // Sports hall: a rising vaulted roof, not extra floors above a shop.
      const rise=[.7,.9,1.2,1.5,1.9,2.4,3.0,3.8][stage];
      put('gymVault',0x527f72,shop,x,height+.47,z,w+.25,rise*2,d+.25);
      if(stage>=3)for(const side of [-1,1]){
        for(const bay of [-.40,0,.40])put('body',trim,shop,x+side*(w/2+.15),height*.49,z+bay*d,.26,height*.95,.23);
      }
    }else if(shape===10){ // Hotel: unmistakable rooftop penthouse + canopy.
      roofPut('hotelPenthouse',style.walls,shop,x,rooftop+.91,z-d*.09,w*.58,1.75,d*.60);
      roofPut('hotelPenthouseRoof',trim,shop,x,rooftop+1.87,z-d*.09,w*.62,.20,d*.64);
      for(const side of [-1,1])
        roofPut('hotelPenthouseWindow',glass,shop,x+side*w*.17,rooftop+.96,progress.premium?z+d*.21+.08:front-d*.22,1.05,.92,.11);
      if(progress.premium){
        // Pool and loungers flank the penthouse; its doorway and the bed emblem stay clear.
        const surface=height+.49,poolX=x+w*.405,poolW=w*.18,poolD=d*.64,poolZ=z-d*.04;
        put('hotelTerraceDoorFrame',trim,shop,x,surface+.80,z+d*.21+.07,1.24,1.60,.13);
        put('hotelTerraceDoorGlass',glass,shop,x,surface+.80,z+d*.21+.15,1.04,1.40,.05);
        put('hotelTerraceThreshold',0xf1dfbb,shop,x,surface+.05,z+d*.21+.23,1.35,.10,.46);
        for(const side of [-1,1])put('hotelPoolLadder',0xbac9c4,shop,poolX+side*.25,surface+.70,poolZ+poolD/2-.24,.055,.90,.055);
        for(const rung of [.40,.65,.90])put('hotelPoolLadder',0xbac9c4,shop,poolX,surface+rung,poolZ+poolD/2-.24,.55,.055,.055);
        put('hotelPoolBase',0xf1dfbb,shop,poolX,surface+.10,poolZ,poolW-.05,.20,poolD-.05);
        put('hotelPoolWater',0x4bbccc,shop,poolX,surface+.215,poolZ,poolW-.18,.03,poolD-.22);
        for(const side of [-1,1]){
          put('hotelPoolRim',0xffedcc,shop,poolX+side*(poolW/2-.045),surface+.25,poolZ,.09,.16,poolD);
          put('hotelPoolRim',0xffedcc,shop,poolX,surface+.25,poolZ+side*(poolD/2-.045),poolW,.16,.09);
        }
        for(const end of [-1,1]){
          const chairX=x-w*.405,chairZ=z+end*d*.24;
          put('hotelSunbedFrame',trim,shop,chairX,surface+.15,chairZ,w*.15,.22,d*.23);
          put('hotelSunbedCushion',0xf5ead3,shop,chairX,surface+.30,chairZ,w*.13,.12,d*.21);
          put('hotelSunbedPillow',0xe2c287,shop,chairX,surface+.40,chairZ-d*.065,w*.12,.12,d*.065);
        }
        for(const side of [-1,1]){
          put('hotelRoofGuard',glass,shop,x+side*w*.495,surface+.61,z,.07,1.08,d*.98);
          put('hotelRoofGuardCap',trim,shop,x+side*w*.495,surface+1.18,z,.10,.08,d*.99);
          put('hotelRoofGuard',glass,shop,x,surface+.61,z+side*d*.495,w*.98,1.08,.07);
          put('hotelRoofGuardCap',trim,shop,x,surface+1.18,z+side*d*.495,w*.99,.08,.10);
        }
      }
    }else if(!marketHall){ // Small market kiosks keep their low canopy modules.
      for(const side of [-1,1]){
        roofPut('marketRoofAwning',side<0?0xd29b5b:0x6c9e83,shop,
          x+side*w*.23,rooftop+.19,z, w*.38,.29,d*.61);
        roofPut('marketRoofCap',0xe3d5ad,shop,x+side*w*.23,rooftop+.38,z,w*.40,.08,d*.64);
      }
    }
    if(seed%3===0&&shape!==6&&shape!==7&&shape!==11&&shape!==9&&!(shape===3&&stage>=2)&&!diningUpper)put('side',style.glass,shop,x+w/2+.1,height*.55,z, .2,1.6,d*.45);
    if(progress.premium&&shape===2){
      const terraceX=x+w/2+1.19,terraceZ=z-d*.17;
      put('shopDiningDeck',0xbd9a74,shop,terraceX,.15,terraceZ,2.48,.23,4.55);
      for(const end of [-1,1]){
        const postZ=terraceZ+end*2.04;
        put('shopPergolaPost',trim,shop,terraceX+1.04,1.65,postZ,.17,2.92,.17);
        put('shopPergolaBeam',trim,shop,terraceX,3.08,postZ,2.50,.19,.23);
        const tableZ=terraceZ+end*1.16;
        if(isPizzeria&&end<0){
          put('shopDisplayStand',0xae7659,shop,terraceX,.67,tableZ,1.42,.85,.90);
          put('shopForecourtDetail',0xe7c794,shop,terraceX,1.11,tableZ,1.58,.12,.99);
          put('shopSoftFurniture',0xc57748,shop,terraceX,1.37,tableZ,1.35,.75,.93);
          put('shopSoftFurniture',0x493834,shop,terraceX,1.32,tableZ+.42,.61,.34,.15);
          put('shopForecourtDetail',0xa66843,shop,terraceX+.33,1.79,tableZ-.21,.24,.64,.25);
          continue;
        }
        put('shopDiningTable',0xd0a36e,shop,terraceX,1.05,tableZ,1.06,.14,.84);
        put('shopDiningPedestal',0x4a483f,shop,terraceX,.63,tableZ,.19,.75,.19);
        for(const side of [-1,1]){
          const chairX=terraceX+side*.76;
          put('restaurantChairSeat',0x7b4d32,shop,chairX,.72,tableZ,.44,.12,.52);
          put('restaurantChairBack',0x9f653e,shop,chairX+side*.19,.97,tableZ,.09,.54,.52);
          seatSupports(shop,chairX,tableZ,.265,.66,.15,.18,0x63473a);
        }
      }
      for(let slat=-3;slat<=3;slat++)
        put('shopPergolaSlat',slat%2?0xe3b88b:trim,shop,terraceX+slat*.34,3.22,terraceZ,.14,.14,4.30);
    }

    furnishBusiness(shop,shape,stage,progress.premium,w,d,height,trim,glass,serviceRear);
  }
  // Validate the complete architecture, including furniture, roofs and 3D signs.
  // The road setbacks leave33.04m here, not the nominal45m row spacing.
  const envelopes=new Map();
  for(const batch of batches.values()){
   if(!batch.geo.boundingBox)batch.geo.computeBoundingBox();
   const g=batch.geo.boundingBox;
   for(const e of batch.entries){
    const shop=e.shop;if(!shop)continue;
    if(!envelopes.has(shop))envelopes.set(shop,{left:Infinity,right:-Infinity,top:Infinity,bottom:-Infinity,entries:[]});
    const b=envelopes.get(shop),ca=Math.cos(e.rotation),sa=Math.sin(e.rotation),xx=ca*e.w,xz=sa*e.d,zx=-sa*e.w,zz=ca*e.d;
    b.left=Math.min(b.left,e.x+Math.min(xx*g.min.x,xx*g.max.x)+Math.min(xz*g.min.z,xz*g.max.z));
    b.right=Math.max(b.right,e.x+Math.max(xx*g.min.x,xx*g.max.x)+Math.max(xz*g.min.z,xz*g.max.z));
    b.top=Math.min(b.top,e.z+Math.min(zx*g.min.x,zx*g.max.x)+Math.min(zz*g.min.z,zz*g.max.z));
    b.bottom=Math.max(b.bottom,e.z+Math.max(zx*g.min.x,zx*g.max.x)+Math.max(zz*g.min.z,zz*g.max.z));b.entries.push(e);
   }
  }
  const fits=[];
  for(const [shop,b]of envelopes){
   if(![shop.left,shop.right,shop.top,shop.bottom].every(Number.isFinite))continue;
   const margin=.16,scale=Math.min(1,(shop.right-shop.left-margin*2)/(b.right-b.left),(shop.bottom-shop.top-margin*2)/(b.bottom-b.top));
   const left=shop.x+(b.left-shop.x)*scale,right=shop.x+(b.right-shop.x)*scale,top=shop.z+(b.top-shop.z)*scale,bottom=shop.z+(b.bottom-shop.z)*scale;
   const dx=Math.max(shop.left+margin-left,Math.min(0,shop.right-margin-right)),dz=Math.max(shop.top+margin-top,Math.min(0,shop.bottom-margin-bottom));
   if(scale<1||Math.abs(dx)+Math.abs(dz)>1e-8){
    for(const e of b.entries){e.x=shop.x+(e.x-shop.x)*scale+dx;e.z=shop.z+(e.z-shop.z)*scale+dz;e.y*=scale;e.w*=scale;e.h*=scale;e.d*=scale;}
    fits.push({id:shop.id,scale,dx,dz});
   }
  }
  group.userData.shopParcelFits=fits;
  // Apply terrain contact after parcel scaling, while retaining the fitted surface level.
  for(const entry of groundBases){
    const top=entry.y+entry.h/2;
    if(entry.y-entry.h/2<=LOT_FOUNDATION_Y)continue;
    entry.y=(top+LOT_FOUNDATION_Y)/2;
    entry.h=top-LOT_FOUNDATION_Y;
  }
  const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.77,metalness:.02});
  const glowMaterial=[...batches.values()].some(batch=>batch.glow)?new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffcf7a,emissiveIntensity:.75,roughness:.40}):material;
  const gardenGlassMaterial=[...batches.values()].some(batch=>batch.clearGlass)?new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.24,depthWrite:false,roughness:.28,metalness:.04}):material;
  const instanceColor=new THREE.Color();
  for(const batch of batches.values()){
    const mesh=new THREE.InstancedMesh(batch.geo,batch.clearGlass?gardenGlassMaterial:batch.glow?glowMaterial:material,batch.entries.length);
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
 const originalLines=lines.map(value=>String(value||''));
 lines=originalLines.map((value,index)=>index===0&&value===currentCity.name.toUpperCase()?value:(window.GameI18n?.t(value)||value));
 const canvas=document.createElement('canvas');
 const width=1024,height=options.wide?256:512;
 canvas.width=width;canvas.height=height;
 const ctx=canvas.getContext('2d');ctx.direction=window.GameI18n?.dir||'ltr';
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
 texture.userData.i18nBillboard={lines:originalLines,rendered:lines.slice(),locale:window.GameI18n?.locale||'it',background,options:{...options}};
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
  {key:'shop',texture:billboardTexture(['IL TUO NEGOZIO','PUÒ ESSERE QUI','Scopri le attività'],'#168c83'),width:8.8,height:4.4},
  {key:'public',texture:billboardTexture(['PROSSIMA OPERA','LA CITTÀ CRESCE','Scopri il traguardo'],'#d48735'),width:14,height:6}
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


function urbanBench(add,x,z,base,back){
  const wood=0x976343,metal=0x435351;
  for(const side of [-1,1])for(const depth of [-1,1])
    add(metal,x+side*.75,base+.21,z+depth*.2,.10,.44,.10);
  for(const side of [-1,1])
    add(metal,x+side*.75,base+.40,z,.105,.075,.52);
  for(const strip of [-1,0,1])
    add(wood,x,base+.47,z+strip*.18,2.0,.09,.16);
  for(const side of [-1,1])
    add(metal,x+side*.75,base+.65,z+back*.24,.10,.49,.11);
  for(const height of [.67,.84])
    add(wood,x,base+height,z+back*.25,2.0,.13,.09);
}

const CITY_SIDEWALK_TOP=.235,CITY_STREET_TOP=.176,CITY_WALK_LANE=.47;
function streetWalkWidth(streetWidth){return STREET/2+1.2-streetWidth/2;}
function markUrbanFixtureChunk(mesh,col,row){
  const {x,z}=blockCenter(Math.floor(col/2)*2+.5,Math.floor(row/2)*2+.5);
  mesh.userData.roadDetailChunk={x,z,radius:220};
  mesh.visible=false;
  roadDetailMeshes.push(mesh);
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
  const walkTop=CITY_SIDEWALK_TOP,streetTop=CITY_STREET_TOP;
  const walkDepth=walkTop-REGIONAL_GROUND_Y+.01;
  const markChunks=new Map(),markSize=160;
  function mark(w,h,d,x,y,z,color){
    const cx=Math.floor(x/markSize),cz=Math.floor(z/markSize);
    const key=cx+','+cz+','+color;
    if(!markChunks.has(key))markChunks.set(key,{cx,cz,color,entries:[]});
    markChunks.get(key).entries.push({x,y,z,w,h,d});
  }
  const curbFace=0x99958c,curbTop=0xf0e8da;
  // The sidewalk reaches the parcel edge and stops at the junction's paving.
  function curbV(x,z0,z1,w){
    const walkWidth=streetWalkWidth(w),edge=STREET/2+1.2;
    const from=z0+edge,to=z1-edge;
    if(to<=from)return;
    const mid=(from+to)/2,len=to-from;
    for(const side of [-1,1]){
      const cx=x+side*(w/2+.12);
      roadBox(walkWidth,walkDepth,len,x+side*(w/2+walkWidth/2),walkTop-walkDepth/2,mid,sidewalk);
      roadBox(.22,.103,len,cx,.192,mid,curbFace);
      roadBox(.24,.023,len,cx,.252,mid,curbTop);
    }
  }
  function curbH(z,x0,x1,w){
    const walkWidth=streetWalkWidth(w),edge=STREET/2+1.2;
    const from=x0+edge,to=x1-edge;
    if(to<=from)return;
    const mid=(from+to)/2,len=to-from;
    for(const side of [-1,1]){
      const cz=z+side*(w/2+.12);
      roadBox(len,walkDepth,walkWidth,mid,walkTop-walkDepth/2,z+side*(w/2+walkWidth/2),sidewalk);
      roadBox(len,.103,.22,mid,.192,cz,curbFace);
      roadBox(len,.023,.24,mid,.252,cz,curbTop);
    }
  }
  function curbCorners(c,r){
    const x=streetEdgeX(c),z=streetEdgeZ(r);
    const vw=vWidth(c),hw=hWidth(r);
    const walkX=streetWalkWidth(vw),walkZ=streetWalkWidth(hw);
    for(const sx of [-1,1])for(const sz of [-1,1]){
      const cx=x+sx*(vw/2+.12),cz=z+sz*(hw/2+.12);
      // Adjacent slabs end at the corner's boundary and share no top faces.
      roadBox(walkX,walkDepth,walkZ,x+sx*(vw+walkX)/2,walkTop-walkDepth/2,z+sz*(hw+walkZ)/2,sidewalk);
      roadBox(.24,.103,.24,cx,.192,cz,curbFace);
      roadBox(.24,.023,.24,cx,.252,cz,curbTop);
      const rx=cx+sx*walkX/2,rz=cz+sz*walkZ/2;
      roadBox(.24,.103,walkZ-.24,cx,.192,rz,curbFace);
      roadBox(.24,.023,walkZ-.24,cx,.252,rz,curbTop);
      roadBox(walkX-.24,.103,.24,rx,.192,cz,curbFace);
      roadBox(walkX-.24,.023,.24,rx,.252,cz,curbTop);
    }
  }
  const vWidth=c=>(c%4===0?11.5:(c%7===2?8.7:6.8));
  const hWidth=r=>(r%5===0?11.5:(r%6===3?8.7:6.8));
  const isAvenueV=c=>c%4===0,isAvenueH=r=>r%5===0;
  const asphaltDepth=streetTop-REGIONAL_GROUND_Y+.01,ay=streetTop-asphaltDepth/2;
  const laneThickness=.007,stripeThickness=.011,stopThickness=.008;
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
  // Road segments meet the solid asphalt junction at shared endpoints.
  for(const edge of roadEdges.values()){
    const {vertical,c,r}=edge;
    if(vertical){
      const x=streetEdgeX(c),z0=streetEdgeZ(r-1),z1=streetEdgeZ(r);
      const w=vWidth(c),len=z1-z0,z=(z0+z1)/2;
      roadBox(w,asphaltDepth,len,x,ay,z,asphalt);
      curbV(x,z0,z1,w);
      if(streetWalkWidth(w)>2&&Math.abs(c)<=3&&Math.abs(r)<=4){
        for(const side of [-1,1]){
          for(let tree=1;tree<=4;tree++){
            const seed=(c+11)*179+(r+11)*31+tree*13+side;
            addTree(x+side*(w/2+streetWalkWidth(w)-.43),z0+len*tree/5,seed,1.22,seed%8===0);
          }
        }
      }
      if(isAvenueV(c))for(let t=z0+hWidth(r-1)/2+6;t<z1-hWidth(r)/2-5;t+=20)
        mark(.16,laneThickness,5,x,streetTop-.002+laneThickness/2,t,lane);
      junctions.add(`${c},${r-1}`);junctions.add(`${c},${r}`);
    }else{
      const z=streetEdgeZ(r),x0=streetEdgeX(c-1),x1=streetEdgeX(c);
      const w=hWidth(r),len=x1-x0,x=(x0+x1)/2;
      roadBox(len,asphaltDepth,w,x,ay,z,asphalt);
      curbH(z,x0,x1,w);
      if(streetWalkWidth(w)>2&&Math.abs(c)<=3&&Math.abs(r)<=4){
        for(const side of [-1,1]){
          for(let tree=1;tree<=7;tree++){
            const tx=x0+len*tree/8;
            const tz=z+side*(w/2+streetWalkWidth(w)-.43);
            const seed=(c+9)*163+(r+9)*29+tree*11+side;
            addTree(tx,tz,seed,1.14,seed%8===0);
          }
        }
      }
      if(isAvenueH(r))for(let t=x0+vWidth(c-1)/2+6;t<x1-vWidth(c)/2-5;t+=20)
        mark(5,laneThickness,.16,t,streetTop-.002+laneThickness/2,z,lane);
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
    roadBox(vW,asphaltDepth+.003,hW,x,ay+.002,z,asphalt);
    curbCorners(c,r);
    // Crosswalks on EVERY existing approach of EVERY intersection.
    // Their footprint stays outside the crossing road, so perpendicular
    // zebras never cross or form a grid in the middle of the junction.
    const stripe=0xf3f0e8,stripeY=streetTop-.002+stripeThickness/2;
    const stopColor=0xece8dc,stopY=streetTop-.002+stopThickness/2;
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
        const px=x+side*(vW/2+streetWalkWidth(vW)-.22),pz=z+side*(hW/2+streetWalkWidth(hW)-.22);
        mark(.22,3.10,.22,px,walkTop+1.55,pz,0x344340);
        mark(.40,.23,.40,px,walkTop+.115,pz,0x737d75);
        const sx=px-side*.25;
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
          mark(bar,stripeThickness,depth,xx,stripeY,zz,stripe);
        }
        // Stop line beyond the zebra, on the incoming lane. It is deliberately
        // separated from the crosswalk to prevent the striped-grid effect.
        mark(vW/2-.62,stopThickness,.18,x+side*vW/4,stopY,
          z+side*(hW/2+depth+1.05),stopColor);
      }
      if((side<0&&west)||(side>0&&east)){
        const xx=x+side*(vW/2+depth/2+.42);
        for(let i=0;i<horizontalCount;i++){
          const zz=z+(i-(horizontalCount-1)/2)*step;
          mark(depth,stripeThickness,bar,xx,stripeY,zz,stripe);
        }
        mark(.18,stopThickness,hW/2-.62,x+side*(vW/2+depth+1.05),
          stopY,z-side*hW/4,stopColor);
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

  // Landscaped courts use the space between the two rows of parcels.
  const greenBlocks=new Set(selected.map(h=>h.blockIndex));
  for(const sh of shopPurchases)greenBlocks.add(sh.block);
  const furniture=new Map();
  const cube=new THREE.BoxGeometry(1,1,1),foliage=new THREE.IcosahedronGeometry(.5,1);
  const basin=new THREE.CylinderGeometry(.5,.5,1,28),transform=new THREE.Object3D();
  for(const block of greenBlocks){
    const {col,row}=spiralCell(block),{x,z}=blockCenter(col,row);
    const theme=Math.floor(rnd(block*73+5)*4);
    const square=block%13===0;
    const top=.11;
    const width=square?51:132,depth=square?7.2:3.4;
    if(!decorationAllowed(x,z,width,depth))continue;
    const add=(color,px,y,pz,w,h,d,geometry=cube)=>{
      const paving=y<top,section=paving?'paving':Math.floor(col/2)+':'+Math.floor(row/2);
      const key=geometry.id+':'+section;
      if(!furniture.has(key))furniture.set(key,{geometry,parts:[],paving,col,row});
      furniture.get(key).parts.push({color,x:px,y,z:pz,w,h,d});
    };
    const stone=[0xc5b5a5,0xc9a891,0xbdb7a9,0xc6bb9e][theme];
    const pavingDepth=top-REGIONAL_GROUND_Y+.01;
    add(stone,x,top-pavingDepth/2,z,width,pavingDepth,depth);
    if(square){
      add(0xa39987,x,top+.19,z,3.6,.40,3.6,basin);
      add(0x409bac,x,top+.397,z,3.25,.04,3.25,basin);
      add(0xc5bba6,x,top+.66,z,.42,.53,.42,basin);
      add(0x74c5ce,x,top+.98,z,.84,.17,.84,basin);
      for(const side of [-1,1]){
        urbanBench(add,x+side*4.25,z+1.42,top,1);
        urbanBench(add,x+side*4.25,z-1.42,top,-1);
        for(const offset of [9,17,22]){
          const px=x+side*offset;
          add(0x817865,px,top+.08,z,2.2,.17,2.2);
          add(0x785239,px,top+.96,z,.25,1.64,.25);
          add(offset===17?0xac57af:0x5a914d,px,top+2.35,z,2.22,1.88,2.22,foliage);
        }
      }
    }else{
      for(const offset of [-48,-24,0,24,48]){
        const px=x+offset;
        urbanBench(add,px,z+.78,top,1);
        if(theme===0||theme===2){
          const plantX=px+4.2,plantZ=z-.35;
          add(0x92816e,plantX,top+.16,plantZ,1.55,.33,1.55);
          add(0x79533f,plantX,top+1.16,plantZ,.22,1.72,.22);
          add(theme===0?0x669750:0x9e68ab,plantX,top+2.45,plantZ,1.86,1.9,1.86,foliage);
        }else{
          const plantX=px+4.2,plantZ=z-.43;
          add(0x978d77,plantX,top+.14,plantZ,4.3,.29,1.3);
          for(let flower=-2;flower<=2;flower++){
            const color=theme===1?[0xc46b98,0xefbf68,0xe1a9be][(flower+2)%3]:0x5b8d59;
            add(color,plantX+flower*.74,top+.43,plantZ,.68,.52,.86,foliage);
          }
        }
      }
    }
  }
  const furnitureMaterial=new THREE.MeshLambertMaterial(),furnitureColor=new THREE.Color();
  for(const {geometry,parts,paving,col,row} of furniture.values()){
    const mesh=new THREE.InstancedMesh(geometry,furnitureMaterial,parts.length);
    parts.forEach(({color,x,y,z,w,h,d},i)=>{
      transform.position.set(x,y,z);
      transform.scale.set(w,h,d);
      transform.updateMatrix();
      mesh.setMatrixAt(i,transform.matrix);
      mesh.setColorAt(i,furnitureColor.setHex(color));
    });
    mesh.computeBoundingSphere();
    mesh.receiveShadow=true;
    mesh.castShadow=!paving;
    if(!paving)markUrbanFixtureChunk(mesh,col,row);
    group.add(mesh);
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
function drawCityLife(selected){
  const blocks=new Set(selected.map(h=>h.blockIndex));
  for(const shop of shopPurchases)blocks.add(shop.block);
  const geometry=new THREE.BoxGeometry(1,1,1),transform=new THREE.Object3D();
  const batches=new Map(),walkTop=CITY_SIDEWALK_TOP;
  for(const block of blocks){
    const {col,row}=spiralCell(block);
    const section=Math.floor(col/2)+':'+Math.floor(row/2);
    function add(color,x,y,z,w,h,d){
      if(!batches.has(section))batches.set(section,{col,row,parts:[]});
      batches.get(section).parts.push({color,x,y,z,w,h,d});
    }
    const x=blockAxis(col,'x'),south=streetEdgeZ(row),north=streetEdgeZ(row-1);
    for(const side of [-1,1]){
      const index=side<0?row-1:row;
      const streetWidth=pedestrianWidth('z',index);
      const sidewalkWidth=streetWalkWidth(streetWidth);
      const z=(side<0?north:south)-side*(streetWidth/2+sidewalkWidth-.27);
      for(const offset of [-57.5,-11.5,34.5]){
        const px=x+offset,metal=0x405454;
        add(metal,px,walkTop+.075,z,.32,.15,.32);
        add(metal,px,walkTop+1.82,z,.16,3.64,.16);
        add(metal,px,walkTop+3.63,z,.64,.11,.36);
        add(0xf1d99c,px,walkTop+3.72,z,.58,.16,.31);
        add(metal,px,walkTop+3.82,z,.69,.065,.40);
      }
      if(sidewalkWidth>2){
        const seat=x-34.5,bin=x-32.65,seatZ=z+side*.12;
        urbanBench(add,seat,seatZ,walkTop,-side);
        add(0x326f60,bin,walkTop+.34,seatZ,.47,.68,.48);
        add(0x344e49,bin,walkTop+.716,seatZ,.51,.082,.52);
      }
    }
    const width=pedestrianWidth('z',row);
    const sidewalkWidth=streetWalkWidth(width);
    const z=south-width/2-sidewalkWidth+.56;
    if(block%17===0&&sidewalkWidth>2){
      const px=x+57.5,metal=0x496268;
      for(const dx of [-2.35,2.35]){
        add(metal,px+dx,walkTop+1.25,z-.36,.13,2.51,.13);
        add(metal,px+dx,walkTop+1.25,z+.36,.13,2.51,.13);
      }
      add(0x78a6ad,px,walkTop+1.34,z-.36,4.68,1.38,.048);
      add(metal,px,walkTop+2.57,z,5.0,.15,.94);
      urbanBench(add,px,z,walkTop,-1);
    }else if(block%8===0){
      const px=x+57.5;
      add(0x52615c,px,walkTop+1.33,z,.13,2.67,.13);
      add(0x3b849a,px,walkTop+2.63,z,1.65,.36,.12);
    }
    if(block%5===0&&sidewalkWidth>2){
      const px=x+11.5;
      add(0xaa503f,px,walkTop+.34,z,.37,.68,.37);
      add(0xc36a4c,px,walkTop+.717,z,.46,.09,.46);
      add(0xb55642,px,walkTop+.48,z,.60,.22,.22);
    }
  }
  const material=new THREE.MeshLambertMaterial(),fixtureColor=new THREE.Color();
  for(const {parts,col,row} of batches.values()){
    const mesh=new THREE.InstancedMesh(geometry,material,parts.length);
    parts.forEach(({color,x,y,z,w,h,d},i)=>{
      transform.position.set(x,y,z);
      transform.scale.set(w,h,d);
      transform.updateMatrix();
      mesh.setMatrixAt(i,transform.matrix);
      mesh.setColorAt(i,fixtureColor.setHex(color));
    });
    mesh.computeBoundingSphere();
    mesh.receiveShadow=true;
    mesh.castShadow=true;
    markUrbanFixtureChunk(mesh,col,row);
    group.add(mesh);
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
function makeHippedRoof(){
 const corners=[[-1,0,-1],[1,0,-1],[1,0,1],[-1,0,1],[0,1,-.42],[0,1,.42]];
 const triangles=[[0,4,1],[0,5,4],[0,3,5],[1,5,2],[1,4,5],[3,2,5],[0,2,3],[0,1,2]];
 const vertices=[],uv=[];
 for(const triangle of triangles){
  for(const index of triangle){
   const [x,y,z]=corners[index];
   vertices.push(x,y,z);uv.push((x+1)*1.65,(z+1)*2.8);
  }
 }
 const roof=new THREE.BufferGeometry();
 roof.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
 roof.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
 roof.computeVertexNormals();
 return roof;
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

// Albedo and normal maps use the same complete, repeating roof tile grid.
const ROOF_TILE_COLUMNS=16;
const ROOF_TILE_ROWS=32;
const HOME_LAWN_TOP=.064;
const HOME_CONTACT_SHADOW_Y=HOME_LAWN_TOP+.026;
const HOME_PORCH_WIDTH=[2.4,3.72,6.46];
const HOME_PORCH_DEPTH=[.84,1.38,1.95];
const HOME_VERANDA_DEPTH=[2.85,3.27,3.72];
const HOME_CROWN_HEIGHT=[0,0,0,5,7,10,14,22];
const homeNormalTextures={};

function surfaceNoise(x,y,seed){
 let n=Math.imul(x+1129,0x65ca9ad3)^Math.imul(y+197,0x1b873593)^seed;
 n=Math.imul(n^(n>>>16),0x45d9f3b);
 return ((n^(n>>>16))>>>0)/4294967296;
}

function surfaceCloud(x,y,cell,grid,seed){
 const ix=Math.floor(x/cell),iy=Math.floor(y/cell);
 const tx=x/cell-ix,ty=y/cell-iy;
 const sx=tx*tx*(3-2*tx),sy=ty*ty*(3-2*ty);
 const top=surfaceNoise(ix%grid,iy%grid,seed)*(1-sx)+surfaceNoise((ix+1)%grid,iy%grid,seed)*sx;
 const bottom=surfaceNoise(ix%grid,(iy+1)%grid,seed)*(1-sx)+surfaceNoise((ix+1)%grid,(iy+1)%grid,seed)*sx;
 return top*(1-sy)+bottom*sy;
}

function roofTileRelief(u,v){
 const roofRow=v*ROOF_TILE_ROWS,row=Math.floor(roofRow),roofCol=u*ROOF_TILE_COLUMNS-(row%2)*.5;
 const x=roofCol-Math.floor(roofCol),y=roofRow-row;
 return Math.pow(Math.sin(x*Math.PI),1.55)*(.68+y*.29)-(y<.14?.26:0);
}

function repeatingSurfaceTexture(canvas,colorSpace){
 const texture=new THREE.CanvasTexture(canvas);
 texture.colorSpace=colorSpace;
 texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
 texture.minFilter=THREE.LinearMipmapLinearFilter;
 texture.magFilter=THREE.LinearFilter;
 texture.anisotropy=Math.min(8,renderer?.capabilities?.getMaxAnisotropy?.()||1);
 return texture;
}

function homeNormalPattern(kind){
 if(homeNormalTextures[kind])return homeNormalTextures[kind];
 const size=256,canvas=document.createElement('canvas');
 canvas.width=canvas.height=size;
 const ctx=canvas.getContext('2d'),img=ctx.createImageData(size,size);
 function relief(x,y){
  if(kind==='roof')return roofTileRelief(x/size,y/size);
  return surfaceCloud(x,y,4,size/4,29)*.24+surfaceNoise(x,y,13)*.20;
 }
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const dx=relief((x+1)%size,y)-relief((x+size-1)%size,y);
  const dy=relief(x,(y+1)%size)-relief(x,(y+size-1)%size);
  // The canvas Y axis is opposite to the texture's tangent V axis.
  const strength=kind==='roof'?.92:.38,nx=-dx*strength,ny=dy*strength;
  const norm=Math.hypot(nx,ny,1),i=(y*size+x)*4;
  img.data[i]=128+127*nx/norm;img.data[i+1]=128+127*ny/norm;
  img.data[i+2]=128+127/norm;img.data[i+3]=255;
 }
 ctx.putImageData(img,0,0);
 const tex=repeatingSurfaceTexture(canvas,THREE.NoColorSpace);
 homeNormalTextures[kind]=tex;return tex;
}
const homeTextures={};
function homePattern(kind){
 if(homeTextures[kind])return homeTextures[kind];
 if(kind==='lawn'){const tex=homePattern('grass').clone();tex.repeat.set(3,4);tex.needsUpdate=true;homeTextures[kind]=tex;return tex;}
 const size=512,canvas=document.createElement('canvas');
 canvas.width=canvas.height=size;
 const ctx=canvas.getContext('2d'),img=ctx.createImageData(size,size);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const i=(y*size+x)*4;
  if(kind==='grass'){
   const grain=surfaceNoise(x,y,37)-.5;
   const patch=surfaceCloud(x,y,16,size/16,81)-.5;
   const speck=surfaceCloud(x,y,4,size/4,57)-.5;
   const shade=grain*16+patch*24+speck*18;
   img.data[i]=143+shade;
   img.data[i+1]=171+shade*.87;
   img.data[i+2]=107+shade*.88;
  }else if(kind==='wall'){
   const grit=surfaceNoise(x,y,13)-.5;
   const patch=surfaceCloud(x,y,8,size/8,29)-.5;
   const shade=grit*13+patch*10;
   img.data[i]=237+shade;
   img.data[i+1]=234+shade;
   img.data[i+2]=227+shade;
  }else{
   const roofY=(y+.5)/size*ROOF_TILE_ROWS,row=Math.floor(roofY);
   const roofX=(x+.5)/size*ROOF_TILE_COLUMNS-(row%2)*.5,col=Math.floor(roofX);
   const u=roofX-col,v=roofY-row;
   const batch=(surfaceNoise((col+ROOF_TILE_COLUMNS)%ROOF_TILE_COLUMNS,row,143)-.5)*16;
   const curve=Math.sin(u*Math.PI)*17;
   const joint=(u<.045||u>.965?-14:0)+(v<.11?-27:v<.19?12:0);
   const shade=batch+curve+joint+(surfaceNoise(x,y,39)-.5)*5;
   img.data[i]=197+shade;
   img.data[i+1]=185+shade;
   img.data[i+2]=165+shade*.93;
  }
  img.data[i+3]=255;
 }
 ctx.putImageData(img,0,0);
 const tex=repeatingSurfaceTexture(canvas,THREE.SRGBColorSpace);
 homeTextures[kind]=tex;return tex;
}

function useStuccoScale(material){
 material.onBeforeCompile=shader=>{
  shader.vertexShader=shader.vertexShader.replace('#include <uv_vertex>',`
   #include <uv_vertex>
   #ifdef USE_INSTANCING
   vec3 wallAxis=abs(normal);
   vec3 wallExtent=vec3(length(instanceMatrix[0].xyz),abs(instanceMatrix[1].y),length(instanceMatrix[2].xyz));
   float wallWidth=wallAxis.x*wallExtent.z+(wallAxis.y+wallAxis.z)*wallExtent.x;
   float wallHeight=wallAxis.y*wallExtent.z+(wallAxis.x+wallAxis.z)*wallExtent.y;
   vec2 stuccoUV=uv*max(vec2(wallWidth,wallHeight),vec2(.35))/5.5;
   #ifdef USE_MAP
   vMapUv=stuccoUV;
   #endif
   #ifdef USE_NORMALMAP
   vNormalMapUv=stuccoUV;
   #endif
   #endif
  `);
 };
 material.customProgramCacheKey=()=> 'physical-stucco-scale';
 return material;
}

function renderAllHouses(selected){const steps=renderHouseStages(selected);while(!steps.next().done){}}
function* renderHouseStages(selected){
  // Multiple architectural families, all instanced: render every house at every zoom.
  const boxGeo=new THREE.BoxGeometry(1,1,1);
  const roofGeo=makeRidgeRoof();
  const villaRoofGeo=makeHippedRoof();
  const pyramidGeo=new THREE.ConeGeometry(1,1,6);
  const domeGeo=new THREE.SphereGeometry(.5,8,5);
  const poolCircleGeo=new THREE.CylinderGeometry(.5,.5,1,20);
  const dummy=new THREE.Object3D(),batches=new Map();
  let facingHouse=null,facingAngle=0,facingCos=1,facingSin=0;
  function place(kind,geo,color,h,x,y,z,w,height,d,rotation=0){
    const key=kind+'_'+color;
    if(!batches.has(key))batches.set(key,{geo,color,entries:[]});
    // Every building faces the road bordering its row: north row toward -Z,
    // south row toward +Z. Rotate *all* architectural details together.
    if(h){
      if(facingHouse!==h){facingHouse=h;facingAngle=facadeAngle(h);facingCos=Math.cos(facingAngle);facingSin=Math.sin(facingAngle);}
      const a=facingAngle,dx=x-h.x;let dz=z-h.z;
      const ca=facingCos,sa=facingSin;
      dz+=(h._visualOffsetZ||0);
      x=h.x+dx*ca+dz*sa;z=h.z-dx*sa+dz*ca;
      rotation+=a;
    }
    batches.get(key).entries.push({h,x,y,z,w,height,d,rotation,color});
  }
  function foundation(kind,color,h,x,top,z,w,d){
    place(kind,boxGeo,color,h,x,(top+LOT_FOUNDATION_Y)/2,z,w,top-LOT_FOUNDATION_Y,d);
  }
  let houseBudget=0;
  for(const h of selected){
    if(houseBudget++===32){houseBudget=1;yield;}
    const tier=houseTier(h.points);
    const premium=isPremiumHouse(h);
    const {width:footW,depth:footD,offsetZ}=houseFootprint(h,tier);
    h._visualOffsetZ=offsetZ;
    if(h.garden&&h.points>=1){
      const parcel=plotBounds(h.blockIndex,h.slot);
      foundation('homeGardenLawn',houseLawnColor(h),h,h.x,HOME_LAWN_TOP,h.z-offsetZ,
        parcel.right-parcel.left-.30,parcel.bottom-parcel.top-.30);
    }
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
        foundation('gardenTreeTrunk',0x75553a,h,h.x+localX,2.52,h.z+frontZ,.28,.28);
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
      foundation('towerBase',wall,h,x,height,z,footW,footD);
      if(tier===3&&!premium){
        const depth=.93,w=footW*.74;
        for(const floor of [1,3]){
          const level=floor*storeyHeight+.30;
          for(const face of [-1,1]){
            const balconyZ=z+face*(footD/2+depth/2-.035);
            place('apartmentGalleryBalcony',boxGeo,trim,h,x,level,balconyZ,w,.19,depth);
            place('apartmentGalleryCap',boxGeo,0xe8d6b5,h,x,level+.82,balconyZ+face*.445,w,.12,.10);
            for(const position of [-.47,-.24,0,.24,.47]){
              place('apartmentGalleryPost',boxGeo,trim,h,x+position*w,level+.43,balconyZ+face*.443,.10,.78,.11);
            }
          }
        }
      }
      if(tier===3&&!premium){
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
      if(tier>=4){
        const pearl=coordinatedHouseColor(wall,0xf7e7c7,.36);
        const reflection=coordinatedHouseColor(trim,0x285e74,.83);
        const towerBase=height+.47;
        const crownHeight=HOME_CROWN_HEIGHT[tier]*(premium?.60:.34);
        const crownW=footW*(premium?(tier===7?.67:.49):.38),crownD=footD*(premium?.306:.265);
        const crownZ=z-footD*.25;
        if(!premium){
          place('towerCrownBase',boxGeo,wall,h,x,towerBase+crownHeight/2,crownZ,crownW,crownHeight,crownD);
          place('towerCrownCornice',boxGeo,trim,h,x,towerBase+crownHeight+.13,crownZ,crownW+.37,.27,crownD+.39);
          for(const face of [-1,1]){
            place('towerCrownWindow',boxGeo,reflection,h,x,towerBase+crownHeight*.60,crownZ+face*(crownD/2+.04),crownW*.68,crownHeight*.52,.12);
          }
        }
        if(tier>=5){
          const featureW=footW*(tier===5?.125:tier===6?.251:.167);
          const start=premium?3.15:2.65,facadeH=height-start+.33;
          for(const face of [-1,1]){
            const faceZ=z+face*(footD/2+.095);
            if(tier>5)place('towerCentralGlass',boxGeo,reflection,h,x,start+facadeH/2,faceZ,featureW,facadeH,.19);
            for(const side of [-1,1]){
              place('towerVerticalFacadePier',boxGeo,pearl,h,x+side*featureW/2,start+facadeH/2,faceZ,
                tier===5?.38:.26,facadeH,.28);
            }
          }
        }
        if(tier>=6){
          for(const side of [-1,1]){
            const edgeX=x+side*(footW*.50+.045);
            for(const position of [-.412,.412]){
              place('towerCornerStoneFin',boxGeo,pearl,h,edgeX,height*.51,z+position*footD,.22,height*.966,.40);
            }
            if(premium){
              for(const floor of [Math.floor(levels*.42),Math.floor(levels*.66)]){
                const level=floor*storeyHeight+.26;
                place('premiumSkyDeckEdge',boxGeo,trim,h,edgeX,level,z,.39,.42,footD*.91);
                place('premiumSkyDeckGlassWall',boxGeo,reflection,h,edgeX+side*.12,level+.93,z,.14,1.58,footD*.88);
              }
            }
          }
        }
        if(tier>=6){
          const crownTop=premium?towerBase+crownHeight+.25:towerBase+crownHeight+.255;
          const crownAccent=premium?pearl:trim;
          const lanternW=crownW*(tier===7?.66:.62),lanternD=crownD*.73;
          place('towerCrownLantern',boxGeo,reflection,h,x,crownTop+1.23,crownZ,lanternW,2.46,lanternD);
          place('towerCrownLanternCap',boxGeo,crownAccent,h,x,crownTop+2.52,crownZ,lanternW+.28,.23,lanternD+.25);
          if(tier===7){
            const pavilionH=premium?4.25:2.35;
            place('towerCrownSetback',boxGeo,crownAccent,h,x,crownTop+2.60+pavilionH/2,crownZ,lanternW*.71,pavilionH,lanternD*.68);
            place('towerCrownRoof',pyramidGeo,trim,h,x,crownTop+2.57+pavilionH+1.15,crownZ,lanternW*.40,2.33,lanternD*.40);
          }
        }
      }
      if(tier<=5&&!premium){
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
      if(premium){
        place('premiumRoofTerrace',boxGeo,0xc3d8c4,h,x,height+.48,z,
          footW*.66,.14,footD*.64);
        const stone=coordinatedHouseColor(wall,0xffefd4,.52);
        const terraceRear=z-footD*.25;
        // Keep the street-side pool and grill clear; the sheltered area is behind them.
        if(tier>=4){
          const pavilionH=HOME_CROWN_HEIGHT[tier]*.60;
          const pavilionW=footW*(tier===7?.67:.49),pavilionD=footD*.306;
          place('penthouse',boxGeo,wall,h,x,height+.47+pavilionH/2,terraceRear,pavilionW,pavilionH,pavilionD);
          place('penthouseRoof',boxGeo,trim,h,x,height+.59+pavilionH,terraceRear,pavilionW+.35,.25,pavilionD+.34);
          for(const side of [-1,1]){
            place('premiumTerraceWindow',boxGeo,0x5992a6,h,x,height+.54+pavilionH*.52,
              terraceRear+side*(pavilionD/2+.055),pavilionW*.76,pavilionH*.64,.14);
            place('premiumTerraceWindow',boxGeo,0x5992a6,h,x+side*(pavilionW/2+.055),height+.54+pavilionH*.52,
              terraceRear,.14,pavilionH*.64,pavilionD*.73);
          }
        }else{
          place('premiumTerraceShade',boxGeo,trim,h,x,height+2.67,terraceRear,footW*.46,.20,3.40);
          for(const side of [-1,1])for(const face of [-1,1]){
            place('premiumTerracePier',boxGeo,stone,h,x+side*footW*.205,height+1.58,
              terraceRear+face*1.32,.20,2.06,.20);
          }
        }
        for(const side of [-1,1]){
          place('premiumCrownPier',boxGeo,trim,h,x+side*footW*.37,height+1.06,
            z-footD*.27,.30,1.55,.30);
          place('premiumCrownPlanterBase',boxGeo,0xc6b6a0,h,
            x+side*footW*.35,height+.79,z-footD*.37,.94,.30,.94);
          place('premiumCrownPlant',domeGeo,0x4e9d66,h,
            x+side*footW*.35,height+1.13,z-footD*.37,.88,.68,.88);
        }
        const baseZ=z+footD/2;
        place('premiumEntranceCanopy',boxGeo,trim,h,x,2.74,baseZ+.90,4.68,.25,1.94);
        place('premiumEntranceFascia',boxGeo,stone,h,x,2.62,baseZ+1.82,4.56,.20,.13);
        place('premiumTowerPortal',boxGeo,stone,h,x,1.30,baseZ+.12,2.42,2.58,.24);
        place('premiumTowerDoorGlass',boxGeo,0x36728b,h,x,1.23,baseZ+.28,2.04,2.32,.11);
        place('premiumTowerDoorMullion',boxGeo,trim,h,x,1.20,baseZ+.34,.055,2.25,.05);
        place('premiumTowerEntryStep',boxGeo,stone,h,x,.12,baseZ+.91,4.65,.22,1.92);
        for(const side of [-1,1]){
          place('premiumEntrancePier',boxGeo,stone,h,x+side*2.10,1.42,baseZ+1.62,.29,2.42,.29);
          place('premiumTowerPortalLamp',boxGeo,0xffd17e,h,x+side*1.48,2.02,baseZ+.31,.24,.34,.17);
          place('premiumTowerEntryPlanter',boxGeo,trim,h,x+side*2.77,.24,baseZ+.71,.80,.48,.92);
          place('premiumTowerEntryPlant',domeGeo,0x5f8c43,h,x+side*2.77,.55,baseZ+.71,.72,.48,.82);
        }
        for(const face of [-1,1]){
          const faceZ=z+face*(footD/2+.14),sideX=x+face*(footW/2+.14);
          const pierHeight=height-3.08,pierY=(height+2.84)/2;
          for(const side of [-1,1]){
            place('premiumTowerPier',boxGeo,stone,h,x+side*footW*.466,pierY,faceZ,.51,pierHeight,.36);
            place('premiumTowerPier',boxGeo,stone,h,sideX,pierY,z+side*footD*.461,.36,pierHeight,.51);
          }
          place('premiumTowerPierBand',boxGeo,stone,h,x,2.92,faceZ,footW+.28,.22,.32);
          place('premiumTowerPierBand',boxGeo,stone,h,x,height-.16,faceZ,footW+.28,.28,.32);
          place('premiumTowerPierBand',boxGeo,stone,h,sideX,2.92,z,.32,.22,footD+.28);
          place('premiumTowerPierBand',boxGeo,stone,h,sideX,height-.16,z,.32,.28,footD+.28);
        }

      }
      if(tier===4){
        const frame=coordinatedHouseColor(wall,0x564a41,.22);
        for(const face of [-1,1])for(const side of [-1,1]){
          const faceZ=z+face*(footD/2+.025),bayX=x+side*footW*.375;
          place('condominiumMasonryRibbon',boxGeo,frame,h,bayX,height*.51,faceZ,.48,height*.97,.09);
        }
      }
      // Rooftop amenities are instanced just like the buildings. The four
      // choices have DIFFERENT silhouettes, not only different colors.
      if(premium&&h.points>=50){
        const v=gardenChoice(h,'bench');
        const bx=x+footW*.24,bz=z+footD*.24,by=height+.95;
        const bbqColors=[0xc69d7a,0x66747a,0xb77750,0xa5b2b5];
        const c=bbqColors[v];
        place('roofBBQPad',boxGeo,0xd9d1be,h,bx,by-.26,bz,2.55,.40,2.15);
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
        place('poolRoofDeck',boxGeo,0xded9cb,h,px,py-.29,pz,pw+.46,.38,pd+.46);
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
        const balconyDoor=premium&&floor>0&&floor%2===1;
        const openingY=balconyDoor?floor*storeyHeight+1.50:wy;
        const openingHeight=balconyDoor?2.20:1.15;
        for(const side of [-1,1]){
          const wx=x+side*footW*.26, width=footW*.24;
          for(const face of [-1,1]){
            const wz=z+face*(footD/2+.055);
            place('towerWindowFrame',boxGeo,0xf0dfc8,h,wx,openingY,wz,width+.22,balconyDoor?2.38:1.33,.12);
            place('towerWindow',boxGeo,0x39738f,h,wx,openingY,wz+face*.075,width,openingHeight,.075);
            place('towerWindowMullion',boxGeo,0xe5d7c5,h,wx,openingY,wz+face*.12,.065,openingHeight,.045);
            place('towerWindowSill',boxGeo,0xf0dfc8,h,wx,balconyDoor?floor*storeyHeight+.42:wy-.67,wz+face*.13,width+.37,.12,.34);
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
      if(!premium&&tier>5)place('towerDoor',boxGeo,0x66564d,h,x,1.05,z+footD/2+.12,1.6,2.1,.16);
      if(premium){
        // Usable balconies articulate both elevations, through the full tower height.
        const balconyStone=coordinatedHouseColor(wall,0xffefd4,.32);
        for(let floor=1;floor<levels;floor+=2){
          const by=floor*storeyHeight+.30,balconyWidth=footW*.80;
          for(const face of [-1,1]){
            const facade=z+face*footD/2,edge=facade+face*1.29;
            place('premiumTowerBalconySlab',boxGeo,balconyStone,h,x,by,facade+face*.64,balconyWidth,.18,1.35);
            place('premiumTowerBalconyGlass',boxGeo,0x679bad,h,x,by+.62,edge,balconyWidth,.84,.07);
            place('premiumTowerBalconyCap',boxGeo,trim,h,x,by+1.12,edge,balconyWidth+.08,.08,.12);
            place('premiumTowerBalconyBottom',boxGeo,trim,h,x,by+.16,edge,balconyWidth,.12,.11);
            for(const side of [-1,1]){
              const bx=x+side*balconyWidth/2;
              place('premiumTowerBalconySideGlass',boxGeo,0x679bad,h,bx,by+.62,facade+face*.64,.07,.84,1.27);
              place('premiumTowerBalconySideCap',boxGeo,trim,h,bx,by+1.12,facade+face*.64,.12,.08,1.35);
            }
            for(const bay of [-.5,0,.5])place('premiumTowerBalconyPost',boxGeo,trim,h,x+bay*balconyWidth,by+.59,edge,.09,1.00,.12);
          }
        }
      }
      continue;
    }
    // The default architecture is shared by all homes of the same tier.
    const width=footW,depth=footD;
    const levels=HOUSE_TIERS[tier].levels;
    const height=1.2+levels*2.35;
    const paint=housePaint(h);
    const wall=paint.wall;
    const roof=paint.roof;
    const x=h.x,z=h.z;
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
    const wingH=height*.78;
    const hasWing=tier>0||premium;
    place('homeMainBody',boxGeo,wall,h,x,height/2,z+coreZ,coreW,height,coreD);
    foundation('homeMainPlinth',plinth,h,x,.40,z+coreZ,coreW+.12,coreD+.12);
    place('homeMainRoof',tier===2?villaRoofGeo:roofGeo,roof,h,x,height-.03,z+coreZ,
      (coreW+.45)/2,Math.max(1.3,coreW*.20),(coreD+.48)/2);
    // True raised terracotta courses follow each roof slope. Each row is
    // a thin instanced strip, kept INSIDE the roof footprint.
    const roofRise=Math.max(1.3,coreW*.20),roofHalf=(coreW+.45)/2;
    const roofBase=height-.03;
    for(const side of tier===2?[]:[-1,1]){
      for(let row=1;row<=7;row++){
        const t=row/8;
        const rx=x+side*(roofHalf*(1-t));
        const ry=roofBase+roofRise*t+.035;
        place('roofRaisedTileCourse',boxGeo,coordinatedHouseColor(roof,0x57301e,.10),
          h,rx,ry,z+coreZ,.095,.075,coreD*.93);
      }
    }
    if(hasWing){
      place('homeWingBody',boxGeo,wall,h,x+wingX,wingH/2,z+wingZ,wingW,wingH,wingD);
      foundation('homeWingPlinth',plinth,h,x+wingX,.40,z+wingZ,wingW+.12,wingD+.12);
      const wingRoofY=Math.min(wingH+.06,height-.45);
      place('homeWingRoofFlat',boxGeo,roof,h,x+wingX,wingRoofY,z+wingZ,
        wingW+.14,.12,wingD+.14);
      if(tier===2){
        const wingEdge=x+wingX-wingW/2;
        place('homeWingTerrace',boxGeo,lightTrim,h,x+wingX,wingRoofY+.14,z+wingZ,wingW-.13,.18,wingD-.22);
        place('homeVillaTerraceRail',boxGeo,plinth,h,wingEdge+.12,wingRoofY+.65,z+wingZ,.16,.92,wingD-.24);
        for(const side of [-1,1])
          place('homeVillaTerraceRail',boxGeo,plinth,h,x+wingX+.10,wingRoofY+.65,z+wingZ+side*(wingD/2-.02),wingW-.20,.92,.15);
        const eastX=x+width*.337,eastH=height*.57,eastD=depth*.55,eastZ=z+depth*.105;
        foundation('homeVillaEastPlinth',plinth,h,eastX,.35,eastZ,wingW+.14,eastD+.15);
        place('homeVillaEastBody',boxGeo,wall,h,eastX,eastH/2,eastZ,wingW,eastH,eastD);
        place('homeVillaEastRoof',villaRoofGeo,roof,h,eastX,eastH-.03,eastZ,(wingW+.34)/2,1.05,(eastD+.32)/2);
        for(const side of [-1,1]){
          const frontZ=eastZ+side*(eastD*.5+.061);
          place('villaWingWindowFrame',boxGeo,stone,h,eastX,eastH*.55,frontZ,wingW*.66,1.48,.14);
          place('villaWingWindow',boxGeo,0x78b8cd,h,eastX,eastH*.55,frontZ+side*.08,wingW*.59,1.20,.07);
          place('villaWingSill',boxGeo,lightTrim,h,eastX,eastH*.55-.79,frontZ+side*.08,wingW*.68,.14,.25);
        }
      }else{
        const wingRoofDepth=(wingD+.18)/2;
        place('homeWingCrossRoof',roofGeo,roof,h,x+wingX,wingRoofY+.055,z+wingZ,
          wingRoofDepth,.86,(wingW+.18)/2,Math.PI/2);
      }
    }
    // Do NOT add independent gutter boxes at roof corners: they created
    // the dark square end caps seen in screenshots. The roof mesh itself
    // provides a continuous clean edge.
    // A sheltered entrance with a distinct front gable and door.
    if(!premium){
      const frontage=z+depth/2;
      const porchW=HOME_PORCH_WIDTH[tier],porchD=HOME_PORCH_DEPTH[tier];
      const porchHeight=tier===2?2.91:2.46;
      foundation('entryStep',plinth,h,x,.24,frontage+porchD/2,porchW,porchD);
      place('entryAwning',roofGeo,roof,h,x,porchHeight,frontage+porchD/2-.02,porchW*.53,.49,porchD*.53);
      for(const side of [-1,1]){
        const postW=tier===2?.29:.165;
        place('entryPost',boxGeo,stone,h,x+side*porchW*.433,(porchHeight+.22)/2,frontage+porchD-.18,
          postW,porchHeight-.22,postW);
      }
      if(tier===2){
        place('villaUpperLoggia',boxGeo,0x497f90,h,x,4.35,frontage+.065,2.72,1.48,.15);
        place('villaUpperLoggiaParapet',boxGeo,lightTrim,h,x,4.06,frontage+.142,2.84,.56,.13);
        for(const side of [-1,0,1])
          place('villaUpperLoggiaMullion',boxGeo,stone,h,x+side*1.29,4.46,frontage+.166,.11,1.43,.16);
      }
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
      const verandaDepth=HOME_VERANDA_DEPTH[tier];
      foundation('premiumEntryPaving',stone,h,x,.143,frontage+verandaDepth+.36,2.04,.82);
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
      const verandaWidth=coreW*.94;
      const verandaRoofY=2.66+tier*.18,postZ=frontage+verandaDepth-.18;
      foundation('premiumVerandaFloor',stone,h,x,.24,frontage+verandaDepth/2,verandaWidth,verandaDepth);
      place('premiumVerandaBeam',boxGeo,capital,h,x,verandaRoofY-.10,postZ,verandaWidth,.27,.24);
      place('premiumVerandaRoof',roofGeo,roof,h,x,verandaRoofY,frontage+verandaDepth/2,verandaWidth*.53,.67,verandaDepth*.53);
      for(const side of [-1,1]){
        const postX=x+side*verandaWidth*.445;
        const postW=.31+tier*.035;
        place('premiumVerandaPost',boxGeo,stone,h,postX,(verandaRoofY+.24)/2,postZ,postW,verandaRoofY-.24,postW);
        place('premiumVerandaCapital',boxGeo,capital,h,postX,verandaRoofY-.29,postZ,postW+.18,.25,postW+.18);
        place('premiumVerandaPlinth',boxGeo,plinth,h,postX,.36,postZ,postW+.16,.26,postW+.17);
        place('premiumVerandaRail',boxGeo,bronze,h,postX,1.09,frontage+verandaDepth/2,.12,.10,verandaDepth-.37);
        place('premiumVerandaGlass',boxGeo,0x75a1a2,h,postX,.66,frontage+verandaDepth/2,.066,.84,verandaDepth-.38);
      }
      place('premiumChimney',boxGeo,0xa47765,h,x-width*.18,height+.85,
        z-depth*.12,.50,1.60,.50);
      // Do not add the former floating balcony/door assembly: it had no
      // coherent supporting facade and covered the second-floor windows.
      // Dormer is visible from above even on the first evolution.
      const dormerX=coreW*.19;
      const dormerSurface=roofBase+roofRise*(1-dormerX/roofHalf);
      for(const side of tier===2?[-1,1]:[1]){
        const dormerZ=z+coreZ+side*coreD*.14;
        place('premiumDormer',boxGeo,lightTrim,h,x+side*dormerX,dormerSurface+.32,dormerZ,1.22,.78,1.26);
        place('premiumDormerTop',roofGeo,roof,h,x+side*dormerX,dormerSurface+.69,dormerZ,.73,.42,.68,Math.PI/2);
        place('premiumDormerGlass',boxGeo,0x86c7d7,h,x+side*(dormerX+.64),dormerSurface+.32,dormerZ,.09,.55,.83);
      }

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
      if(!premium){
        place('archEntranceSconce',boxGeo,metal,h,x+side*1.03,1.83,z+depth/2+.24,.17,.31,.18);
        place('archEntranceGlow',boxGeo,0xffe3a7,h,x+side*1.03,1.87,z+depth/2+.34,.12,.18,.10);
      }
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
        const rearWing=hasWing&&side===-1&&wy+.55<wingH;
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
          const wingCovered=hasWing&&side===-1&&sideZ===-1&&wy+.55<wingH;
          if(tier===2&&side===1&&wy<height*.57+.57)continue;
          const sideX=wingCovered?x+wingX-wingW/2-.105:x+side*(coreW/2+.075);
          const sideFacing=side;
          const sideWindowZ=wingCovered?z+wingZ-wingD*.19:z+coreZ+sideZ*coreD*.27;
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
    const texture=/homeGardenLawn/i.test(key)?'lawn':/(roof|gable|hip|towerTop|cornice)/i.test(key)?'roof':
      /(wall|body|towerBase|wing|topSetback|penthouse|bay|longWing)/i.test(key)?'wall':'';
    const normalStrength=/(roof|gable|hip)/i.test(key)?.88:.56;
    const roughness=/(window|glass|mullion)/i.test(key)?.26:/roof/i.test(key)?.79:.87;
    const metalness=/(mullion|sconce|handle)/i.test(key)?.48:.02;
    const casts=/(premiumVerandaRoof|premiumEntranceCanopy|premiumTerraceShade|premiumDormerTop|premiumChimney|premiumTowerBalconySlab|gardenTree|towerBase|towerRoof|towerMain|towerMid|homeMain|homeWing|homeRoof|homeCore|homeWall|towerWall|towerBody|mainBody|wingBody|mainRoof|gable|hipRoof)/i.test(key);
    const receives=casts||/(homeGardenLawn|veranda|facade|pier|window|door|balcony|pilaster)/i.test(key);
    const premiumDetail=/^premiumTowerBalcony(Post|Bottom|SideCap)_/.test(key);
    const facadeDetail=spatialBatches&&/^arch[^_]*(ShutterSlat|WindowCross|WindowVertical)_/.test(key);
    const distantDetail=premiumDetail||facadeDetail;
    const profile=[batch.geo.id,texture,normalStrength,roughness,metalness,casts,receives].join(':')+(distantDetail?':distantDetail':'');
    for(const entry of batch.entries){
      // Dense cities cull whole neighborhoods instead of submitting every house.
      const span=distantDetail?120:368;
      const key=spatialBatches||distantDetail?profile+':'+Math.floor(entry.h.x/span)+':'+Math.floor(entry.h.z/span):profile;
      if(!renderBatches.has(key))renderBatches.set(key,{
        profile,geo:batch.geo,texture,normalStrength,roughness,metalness,casts,receives,distantDetail,
        originX:distantDetail?(Math.floor(entry.h.x/span)+.5)*span:0,
        originZ:distantDetail?(Math.floor(entry.h.z/span)+.5)*span:0,entries:[]
      });
      // Placements are already complete. Reuse them rather than cloning every
      // window, roof tile and trim piece into a second temporary object graph.
      renderBatches.get(key).entries.push(entry);
    }
  }
  const tint=new THREE.Color();
  const materials=new Map(),placementRotations=new Map();
  const placementEuler=new THREE.Euler();
  for(const batch of renderBatches.values()){
    if(!materials.has(batch.profile)){
      const material=new THREE.MeshStandardMaterial({
        color:0xffffff,
        map:batch.texture?homePattern(batch.texture):null,
        normalMap:batch.texture&&batch.texture!=='lawn'?homeNormalPattern(batch.texture):null,
        normalScale:new THREE.Vector2(batch.normalStrength,batch.normalStrength),
        side:batch.geo===roofGeo||batch.geo===villaRoofGeo?THREE.DoubleSide:THREE.FrontSide,
        polygonOffset:batch.texture==='lawn',
        polygonOffsetFactor:-.7,
        polygonOffsetUnits:-1,
        roughness:batch.roughness,
        metalness:batch.metalness
      });
      if(batch.texture==='wall')useStuccoScale(material);
      materials.set(batch.profile,material);
    }
    const mesh=new THREE.InstancedMesh(batch.geo,materials.get(batch.profile),batch.entries.length);
    mesh.castShadow=batch.casts;
    mesh.receiveShadow=batch.receives;
    mesh.userData.homes=batch.entries.map(e=>e.h);
    for(let i=0;i<batch.entries.length;i++){
      if(i>0&&i%2048===0)yield;
      const e=batch.entries[i];dummy.position.set(e.x-batch.originX,e.y,e.z-batch.originZ);
      let rotation=placementRotations.get(e.rotation);
      if(!rotation){rotation=new THREE.Quaternion().setFromEuler(placementEuler.set(0,e.rotation,0));placementRotations.set(e.rotation,rotation);}
      dummy.scale.set(e.w,e.height,e.d);dummy.matrix.compose(dummy.position,rotation,dummy.scale);mesh.setMatrixAt(i,dummy.matrix); mesh.setColorAt(i,tint.setHex(e.color));
    }
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
    if(batch.distantDetail){
      // Slats, mullions and rails are subpixel at panorama distance. The
      // walls, window panes, shutters and balcony structure stay visible.
      const lod=new THREE.LOD();lod.name='fine-house-detail';
      lod.position.set(batch.originX,0,batch.originZ);
      lod.addLevel(mesh,0);lod.addLevel(new THREE.Group(),480,.12);group.add(lod);
    }else group.add(mesh);
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
      dummy.position.set(home.x+Math.sin(angle)*footprint.offsetZ,HOME_CONTACT_SHADOW_Y,home.z+Math.cos(angle)*footprint.offsetZ);
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
let nearDetailGroup=null,nearDetailCenter={x:Infinity,z:Infinity},nearDetailTier=-1,nearDetailBuild=null,nearDetailMaterial=null;
const detailGeo=new Map();
function lodTier(){
 if(distance>1250)return 0;
 if(distance>420)return 1;
 if(distance>155)return 2;
 return 3;
}
function* makeCloseDetailMeshStages(geo,placements,destination){
 if(!placements.length)return;
 nearDetailMaterial=nearDetailMaterial||new THREE.MeshStandardMaterial({color:0xffffff,roughness:.91,flatShading:true});
 const mesh=new THREE.InstancedMesh(geo,nearDetailMaterial,placements.length);
 // The destination is detached until complete; cancellation can dispose even a partial mesh.
 destination.add(mesh);
 const dummy=new THREE.Object3D(),tint=new THREE.Color();
 for(let i=0;i<placements.length;i++){
  const p=placements[i];dummy.position.set(p[0],p[1],p[2]);dummy.rotation.set(0,p[6]||0,0);
  dummy.scale.set(p[3],p[4],p[5]);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,tint.setHex(p[7]));
  if((i+1)%256===0)yield;
 }
 mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;mesh.frustumCulled=false;
}
function disposeCloseDetailGroup(old){
 if(!old)return;old.parent?.remove(old);
 old.traverse(o=>{if(o.isInstancedMesh)o.dispose();if(o.material&&o.material!==nearDetailMaterial)o.material.dispose()});
 // Shared geometries are deliberately retained.
}
function cancelCloseDetailBuild(){
 const job=nearDetailBuild;if(!job)return;nearDetailBuild=null;
 try{job.iterator.return();}finally{disposeCloseDetailGroup(job.output);}
}
function clearCloseDetails(){
 cancelCloseDetailBuild();const old=nearDetailGroup;nearDetailGroup=null;disposeCloseDetailGroup(old);
}
// Compact handcrafted procedural bushes; all four are original and use
// shared instanced box/icosahedron primitives, never image cut-outs.
function addGardenPlant(add,variant,x,z,scale=1){
 // Garden footprints unchanged: flower globe and hedge remain compact;
 // ornamental tree and three-crown tree have low, full canopies.
 const B=(color,dx,y,dz,w,h,d)=>add(color,'box',x+dx*scale,y*scale,z+dz*scale,w*scale,h*scale,d*scale);
 const S=(color,dx,y,dz,w,h,d)=>add(color,'sphere',x+dx*scale,y*scale,z+dz*scale,w*scale,h*scale,d*scale);
 const rootedShrub=(color,y,w,h,d)=>add(color,'sphere',x,y*scale,z,w*scale,h*scale,d*scale,0,true);
 const leaf=[0x347747,0x428a4b,0x5aa45c,0x6ab06a,0x7abb6d];
 if(variant===0){
  // Flowers placed on the OUTER curved surface, not inside the foliage.
  rootedShrub(0x357e45,.46,1.56,.81,1.50);
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
  rootedShrub(0x347747,.39,1.58,.66,1.35);
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
 if(nearDetailBuild&&nearDetailBuild.owner!==group){cancelCloseDetailBuild();nearDetailTier=-1;}
 const tier=lodTier(),movement=Math.hypot(target.x-nearDetailCenter.x,target.z-nearDetailCenter.z);
 const threshold=tier>=3?32:tier===2?70:160;
 if(force||tier!==nearDetailTier||movement>=threshold){
  cancelCloseDetailBuild();nearDetailTier=tier;nearDetailCenter={x:target.x,z:target.z};
  if(tier===0){const old=nearDetailGroup;nearDetailGroup=null;disposeCloseDetailGroup(old);return;}
  const output=new THREE.Group(),focus={...nearDetailCenter};
  nearDetailBuild={owner:group,output,iterator:progressiveDetailStages(tier,focus,output),started:performance.now(),cpuMs:0,maxSliceMs:0,slices:0};
 }
 const job=nearDetailBuild;if(!job)return;
 const started=performance.now();let done=false;
 try{
  do{done=job.iterator.next().done;}while(!done&&performance.now()-started<2);
  if(done){
   const old=nearDetailGroup;nearDetailGroup=job.output;job.owner.add(job.output);nearDetailBuild=null;
   disposeCloseDetailGroup(old);
  }
 }catch(error){cancelCloseDetailBuild();console.error('Dettagli vicini',error);return;}
 const spent=performance.now()-started;job.cpuMs+=spent;job.maxSliceMs=Math.max(job.maxSliceMs,spent);job.slices++;
 if(done)window.ReviewPerformance?.recordDetailBuild?.({cpuMs:job.cpuMs,maxSliceMs:job.maxSliceMs,slices:job.slices,wallMs:performance.now()-job.started});
}
function* progressiveDetailStages(tier,focus,output){
 const radius=tier===1?230:tier===2?180:135;
 const limit=tier===1?90:tier===2?125:170;
 const nearby=[];
 for(const h of homes){
  const d2=(h.x-focus.x)**2+(h.z-focus.z)**2;
  if(d2<radius*radius)nearby.push({h,d2});
 }
 nearby.sort((a,b)=>a.d2-b.d2);
 const selected=nearby.slice(0,limit);
 const placements=new Map();
 function add(color,shape,x,y,z,w,ht,d,rotation=0,rooted=false){
  if(rooted||(shape==='box'&&y-ht/2<=.06)){
   const top=y+ht/2;
   y=(top+LOT_FOUNDATION_Y)/2;
   ht=top-LOT_FOUNDATION_Y;
  }
  const key=color+'_'+shape;
  if(!placements.has(key))placements.set(key,[]);
  placements.get(key).push([x,y,z,w,ht,d,rotation]);
 }
 for(const {h} of selected){
  yield;
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
  const premiumHouse=isPremiumHouse(h);
  const doorstep=houseTierNow<3?
    (premiumHouse?HOME_VERANDA_DEPTH[houseTierNow]+.74:HOME_PORCH_DEPTH[houseTierNow]):
    (premiumHouse?1.88:1.02);
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
  if(houseTierNow<3){
   const porchD=premiumHouse?HOME_VERANDA_DEPTH[houseTierNow]:doorstep;
   const porchW=premiumHouse?buildingW*.76*.94:HOME_PORCH_WIDTH[houseTierNow];
   reservations.push({x:0,z:halfD+porchD/2,w:porchW,d:porchD,key:'porch'});
  }
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
  const pathLen=Math.max(0,frontFree-doorstep-.10);
  if(h.points>=10&&pathLen>=1){
   const v=option('path'),cz=front+doorstep+pathLen/2;
   const palette=MATERIAL_PALETTES.path;
   if(v!==3){
    const [gx,gz]=local(0,cz);
    add(palette[v],'box',gx,.055,gz,1.95,.11,pathLen,a);
   }else{
    for(let k=0;k<5;k++){
     const [gx,gz]=local(0,front+doorstep+pathLen*(k+.5)/5);
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
 const shapes=new Map();let packed=0;
 for(const [key,arr] of placements){
  const shape=key.endsWith('_sphere')?'sphere':'box',color=Number(key.split('_')[0]);
  if(!shapes.has(shape))shapes.set(shape,[]);
  for(const p of arr){p.push(color);shapes.get(shape).push(p);if(++packed%512===0)yield;}
 }
 for(const [shape,arr]of shapes){yield* makeCloseDetailMeshStages(detailGeo.get(shape),arr,output);yield;}
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
   dummy.position.set(h.x+Math.sin(a)*fp.offsetZ,(height+LOT_FOUNDATION_Y)/2,h.z+Math.cos(a)*fp.offsetZ);
   dummy.rotation.set(0,a,0);dummy.scale.set(fp.width,height-LOT_FOUNDATION_Y,fp.depth);
   dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();
  mesh.userData.homes=items.map(e=>e.h);group.add(mesh);houseMeshes.push(mesh);
 }
}
function* staticTreeStages(){
 const batches=new Map(),part=new THREE.Matrix4(),matrix=new THREE.Matrix4(),color=new THREE.Color();
 for(const source of group.children.slice()){
  if(!source.userData.urbanTreeCanopy||!source.visible||!source.isInstancedMesh||source.geometry.parameters?.radius!==1||source.geometry.parameters?.detail!==1)continue;
  const key=Math.floor(source.position.x/368)+':'+Math.floor(source.position.z/368);
  if(!batches.has(key))batches.set(key,[]);batches.get(key).push(source);
 }
 let merged=0,distantGeometry=null;
 for(const sources of batches.values()){
  if(sources.length<2)continue;
  const first=sources[0],count=sources.reduce((n,s)=>n+s.count,0),mesh=new THREE.InstancedMesh(first.geometry,first.material.clone(),count);
  mesh.castShadow=first.castShadow;mesh.receiveShadow=first.receiveShadow;mesh.userData.urbanTreeCanopyBatch=true;
  let at=0;
  for(const source of sources){
   if(source.matrixAutoUpdate)source.updateMatrix();
   for(let i=0;i<source.count;i++){
    source.getMatrixAt(i,part);matrix.multiplyMatrices(source.matrix,part);mesh.setMatrixAt(at,matrix);
    source.getColorAt(i,color);mesh.setColorAt(at++,color);
   }
  }
  mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;mesh.computeBoundingSphere();
  // Keep every crown and its exact near geometry. Only distant facet density changes.
  distantGeometry=distantGeometry||new THREE.IcosahedronGeometry(1,0);
  const distant=new THREE.InstancedMesh(distantGeometry,mesh.material,count);
  distant.instanceMatrix=mesh.instanceMatrix;distant.instanceColor=mesh.instanceColor;
  distant.castShadow=mesh.castShadow;distant.receiveShadow=mesh.receiveShadow;
  distant.userData={urbanTreeCanopyBatch:true,urbanTreeCanopyFar:true};distant.computeBoundingSphere();
  const center=mesh.boundingSphere.center.clone(),lod=new THREE.LOD();
  lod.name='urban-tree-crown-detail';lod.userData.fullDetailShadow=true;lod.position.copy(center);
  mesh.position.copy(center).multiplyScalar(-1);distant.position.copy(mesh.position);
  lod.addLevel(mesh,0);lod.addLevel(distant,900,.14);group.add(lod);
  for(const source of sources){source.visible=false;source.userData.staticTreeProxy=true;}
  merged+=sources.length;yield;
 }
 group.userData.batchedUrbanTrees=merged;
}
function* staticTrunkStages(){
 const batches=new Map(),stretch=new THREE.Matrix4(),matrix=new THREE.Matrix4();
 for(const source of group.children.slice()){
  if(!source.userData.urbanTreeTrunk||!source.visible||source.isInstancedMesh)continue;
  const p=source.geometry.parameters;
  if(source.geometry.type!=='CylinderGeometry'||p?.radiusTop!==.12||p.radiusBottom!==.27||p.radialSegments!==7||p.heightSegments!==1||p.openEnded)continue;
  const key=Math.floor(source.position.x/368)+':'+Math.floor(source.position.z/368);
  if(!batches.has(key))batches.set(key,[]);batches.get(key).push(source);
 }
 let geometry=null,merged=0;
 for(const sources of batches.values()){
  if(sources.length<2)continue;
  geometry=geometry||new THREE.CylinderGeometry(.12,.27,1,7);
  const first=sources[0],mesh=new THREE.InstancedMesh(geometry,first.material.clone(),sources.length);
  mesh.castShadow=first.castShadow;mesh.receiveShadow=first.receiveShadow;mesh.userData.urbanTreeTrunkBatch=true;
  for(let i=0;i<sources.length;i++){
   const source=sources[i];if(source.matrixAutoUpdate)source.updateMatrix();
   stretch.makeScale(1,source.geometry.parameters.height,1);matrix.multiplyMatrices(source.matrix,stretch);mesh.setMatrixAt(i,matrix);
  }
  mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
  for(const source of sources){source.visible=false;source.userData.staticTreeProxy=true;}
  merged+=sources.length;yield;
 }
 group.userData.batchedUrbanTrunks=merged;
}
function batchStaticBoxes(){const steps=staticBoxStages();while(!steps.next().done){}}
function* staticBoxStages(){
 const batches=new Map(),geometryKeys=new WeakMap(),materialKeys=new WeakMap();
 const excluded=new Set([...roadDetailMeshes,...shopDetailMeshes]);
 const materialTypes=new Set(['MeshBasicMaterial','MeshLambertMaterial','MeshPhongMaterial','MeshStandardMaterial']);
 const textures=['map','normalMap','roughnessMap','metalnessMap','emissiveMap','alphaMap','bumpMap','aoMap','lightMap','displacementMap','specularMap','envMap'];
 let scanned=0;
 for(const source of group.children.slice()){
  if(scanned++%128===127)yield;
  if(!source.isMesh||source.isInstancedMesh||!source.visible||excluded.has(source)||source.geometry.type!=='BoxGeometry')continue;
  if(source.isSkinnedMesh||source.customDepthMaterial||source.customDistanceMaterial||source.matrixWorldAutoUpdate===false)continue;
  if(source.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender||source.onAfterRender!==THREE.Object3D.prototype.onAfterRender)continue;
  const data=source.userData,material=source.material,geometry=source.geometry;
  if(data.homes||data.home||data.shops||data.neighborCity||data.neighborCities)continue;
  if(Array.isArray(material)||!materialTypes.has(material.type)||material.transparent||material.opacity!==1||!material.depthWrite||!material.depthTest||!material.colorWrite||material.blending!==THREE.NormalBlending||material.alphaTest||material.vertexColors||textures.some(key=>material[key]))continue;
  if(material.onBeforeCompile!==THREE.Material.prototype.onBeforeCompile||Object.keys(material.userData).length)continue;
  if(Object.keys(geometry.morphAttributes).length||geometry.isInstancedBufferGeometry||geometry.drawRange.start!==0||geometry.drawRange.count!==Infinity)continue;
  let geometryKey=geometryKeys.get(geometry);
  if(!geometryKey){geometryKey=JSON.stringify({attributes:Object.entries(geometry.attributes).sort(([a],[b])=>a.localeCompare(b)).map(([name,a])=>[name,a.itemSize,a.normalized,a.array.constructor.name,Array.from(a.array)]),index:geometry.index?Array.from(geometry.index.array):null});geometryKeys.set(geometry,geometryKey);}
  let materialKey=materialKeys.get(material);
  if(!materialKey){const description=material.toJSON();delete description.uuid;delete description.metadata;delete description.name;delete description.color;description.linearColors=[material.emissive?.toArray()||null,material.specular?.toArray()||null];materialKey=JSON.stringify(description);materialKeys.set(material,materialKey);}
  const key=geometryKey+'|'+materialKey+'|'+source.castShadow+'|'+source.receiveShadow+'|'+source.renderOrder+'|'+source.layers.mask;
  if(!batches.has(key))batches.set(key,[]);batches.get(key).push(source);
 }
 const color=new THREE.Color();let merged=0;
 for(const sources of batches.values()){
  if(sources.length<3)continue;
  const first=sources[0],material=first.material.clone();material.color.setHex(0xffffff);
  const mesh=new THREE.InstancedMesh(first.geometry,material,sources.length);
  mesh.castShadow=first.castShadow;mesh.receiveShadow=first.receiveShadow;mesh.renderOrder=first.renderOrder;mesh.layers.mask=first.layers.mask;
  mesh.userData.staticBoxInstances=true;
  for(let i=0;i<sources.length;i++){
   const source=sources[i];if(source.matrixAutoUpdate)source.updateMatrix();
   mesh.setMatrixAt(i,source.matrix);mesh.setColorAt(i,color.copy(source.material.color));
  }
  mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
  // Keep original geometry/metadata as exact selection proxies; Three.js
  // raycasting in the pinned engine is independent of render visibility.
  for(const source of sources){source.visible=false;source.userData.staticBoxProxy=true;}
  merged+=sources.length;yield;
 }
 group.userData.staticBoxSources=merged;
}

let cityBuildDepth=0;
function* rebuildStages(){
 if(!threeReady)return;
 roadDetailMeshes=[];lastRoadDetailUpdate=0;
 shopDetailMeshes=[];lastShopDetailUpdate=0;
 clearCloseDetails();nearDetailTier=-1;
 const previousGroup=group,previousHouseMeshes=houseMeshes;
 clearAvatarLabels();residentBatches=null;
 group=new THREE.Group();houseMeshes=[];window.v47Marker=null;window.v49Focus=null;
 const selected=homes,errors=[];
 function safe(label,fn){const started=window.ReviewPerformance?performance.now():null;try{fn()}catch(err){console.error(label,err);errors.push(label+': '+err.message)}finally{if(started!==null)window.ReviewPerformance.recordStage(label,performance.now()-started);}}
 safe('Strade',()=>drawRoadNetwork(selected));
 yield;
 const before=group.children.length;
 const buildingsStarted=window.ReviewPerformance?performance.now():null;
 try{yield* renderHouseStages(selected);}catch(err){console.error('Edifici',err);errors.push('Edifici: '+err.message);}
 finally{if(buildingsStarted!==null)window.ReviewPerformance.recordStage('Edifici',performance.now()-buildingsStarted);}
 yield;
 if(!houseMeshes.length){
  // Remove partial meshes from the failed pass, then use basic, safe houses.
  while(group.children.length>before){group.remove(group.children[group.children.length-1]);}
  safe('Edifici di emergenza',()=>renderFallbackHouses(selected));
 }
 const regionalStarted=window.ReviewPerformance?performance.now():null;
 try{yield* buildRegionalStages(selected);}catch(err){console.error('Paesaggio regionale',err);errors.push('Paesaggio regionale: '+err.message);}
 finally{if(regionalStarted!==null)window.ReviewPerformance.recordStage('Paesaggio regionale',performance.now()-regionalStarted);}
 yield;
 safe('Vita urbana',()=>drawCityLife(selected));
 yield;
 safe('Strutture pubbliche',()=>renderMilestones());
 yield;
 const peopleStarted=window.ReviewPerformance?performance.now():null;
 try{yield* createLifeStages(selected);}catch(err){console.error('Persone',err);errors.push('Persone: '+err.message);}
 finally{if(peopleStarted!==null)window.ReviewPerformance.recordStage('Persone',performance.now()-peopleStarted);}
 yield;
 const staticStarted=window.ReviewPerformance?performance.now():null;
 try{yield* staticBoxStages();yield* staticTreeStages();yield* staticTrunkStages();}catch(err){console.error('Modelli statici',err);errors.push('Modelli statici: '+err.message);}
 finally{if(staticStarted!==null)window.ReviewPerformance.recordStage('Modelli statici',performance.now()-staticStarted);}
 yield;
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
  const tier=houseTier(home.points);
  shadowBounds.maxY=Math.max(shadowBounds.maxY,HOUSE_TIERS[tier].levels*3.15+HOME_CROWN_HEIGHT[tier]+7);
 }
 for(const shop of shopPurchases)cover(shop.x,shop.z,54,60);
 for(const zone of publicZones()){
  const parcel=facilityBounds(zone.block);
  cover(parcel.x,parcel.z,parcel.width+12,parcel.depth+12);
 }
 if(Number.isFinite(shadowBounds.minX))group.userData.cityShadowBounds=shadowBounds;
 group.userData.pickables=group.children.filter(mesh=>mesh.userData.shops||mesh.userData.homes||mesh.userData.home||mesh.userData.publicZone||mesh.userData.neighborCity||mesh.userData.neighborCities);
 const builtGroup=group,builtHouseMeshes=houseMeshes;
 group=previousGroup;
 try{disposeGroup();scene.remove(previousGroup)}catch(err){console.error('Pulizia scena',err)}
 group=builtGroup;group.name='city-geometry';houseMeshes=builtHouseMeshes;
 $('status').textContent=errors.length
  ?"Alcuni elementi della città non sono stati caricati. Puoi riprovare."
  :`${currentCity.name} · ${selected.length.toLocaleString(window.GameI18n?.locale||'it-IT')} case · ${shopPurchases.length.toLocaleString(window.GameI18n?.locale||'it-IT')} negozi · ${publicZones().length} strutture pubbliche`;
 if(errors.length){
  let warning=document.getElementById('cityErrorNotice');
  if(!warning){warning=document.createElement('div');warning.id='cityErrorNotice';warning.style.cssText='position:fixed;left:12px;bottom:12px;z-index:99999;background:#722;color:white;padding:12px;border-radius:8px;max-width:70vw;font:13px Arial';document.body.appendChild(warning)}
  warning.textContent="Alcuni elementi della città non sono stati caricati. Puoi riprovare.";
 }else{document.getElementById('cityErrorNotice')?.remove()}
}
function rebuildNow(){const stages=rebuildStages();while(!stages.next().done){}}
async function rebuildResponsive(){
 if(!threeReady)return;
 cityBuildDepth++;
 // Posted tasks release the main thread without the nested-timer delay.
 const channel=typeof MessageChannel==='function'?new MessageChannel():null;
 let resume;
 if(channel)channel.port1.onmessage=()=>resume();
 const pause=channel?()=>new Promise(resolve=>{resume=resolve;channel.port2.postMessage(0);}):()=>new Promise(resolve=>setTimeout(resolve,0));
 try{const stages=rebuildStages();while(!stages.next().done){await pause();}}
 finally{channel?.port1.close();channel?.port2.close();cityBuildDepth--;}
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
    const threshold=document.createElement('strong');threshold.textContent=step.at.toLocaleString(window.GameI18n?.locale||'it-IT')+' case';
    row.append(label,threshold);host.appendChild(row);
  }
  const stats=$('shopStats');if(stats)stats.textContent=`${shopPurchases.length.toLocaleString(window.GameI18n?.locale||'it-IT')} negozi · lotti misti`;
}
function updateDensity(){/* Houses remain visible regardless of camera zoom. */}
function resolveStructureHit(hit){
 if(!hit)return null;
 const data=hit.object.userData;
 if(data.neighborCities?.[hit.instanceId])return {type:'neighbor',ref:data.neighborCities[hit.instanceId],distance:hit.distance};
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
 const hits=raycaster.intersectObjects(candidates.filter(mesh=>mesh.visible||mesh.userData.staticBoxProxy||mesh.userData.staticTreeProxy),false);
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
function shopLevelDetails(shop){
 const progress=shopProgressFor(shop),tier=houseTier(progress.points);
 const format=value=>value.toLocaleString(window.GameI18n?.locale||'it-IT');
 const level='Livello '+format(tier+1)+'/'+format(HOUSE_TIERS.length);
 const design=progress.premium?'Premium':'Base';
 const details=document.createElement('div');
 details.className='shop-level-details';
 for(const [text,className] of [[level,'shop-level'],[format(progress.points)+' punti','shop-points'],[design,progress.premium?'shop-design premium':'shop-design']]){
  const label=document.createElement('span');
  label.className=className;
  label.textContent=text;
  details.append(label);
 }
 return {progress,tier,details};
}
function showOwnerCard(h,kind='casa',selected=null){
 if(!h)return;localizedOwnerCard={h,kind,selected};
 if(kind!=='persona')clearResidentFocus();
 const props=ownedProperties(h);
 const name=kind==='persona'?'🧑':kind==='negozio'?'🏪':kind==='mongolfiera'?'🎈':'🏠';
 $('username').textContent=name+' @'+h.user;
 const details=$('details');details.replaceChildren();
 const info=document.createElement('div');
 const title=document.createElement('strong');
 title.textContent=kind==='negozio'?selected?.business||'Negozio':kind==='mongolfiera'?'Mongolfiera':kind==='persona'?'Personaggio':'Casa';
 const city=document.createElement('bdi');city.dataset.i18nSkip='true';city.textContent=currentCity.name;
 info.append(title,' · ',city);
 const locale=window.GameI18n?.locale||'it-IT';
 const format=value=>value.toLocaleString(locale);
 const addFact=text=>{const line=document.createElement('p');line.textContent=text;info.append(line);};
 if(kind==='negozio'&&selected){
  const {progress,tier,details}=shopLevelDetails(selected);
  info.append(details);
  const next=HOUSE_TIERS[tier+1];
  if(next){
   const current=HOUSE_TIERS[tier].min;
   const levelProgress=document.createElement('progress');
   levelProgress.className='shop-level-progress';
   levelProgress.max=next.min-current;
   levelProgress.value=progress.points-current;
   levelProgress.setAttribute('aria-label','Livello '+format(tier+2)+' · '+format(next.min)+' punti');
   info.append(levelProgress);
   addFact(levelProgress.getAttribute('aria-label'));
  }
  addFact('🎨 Colore: '+HOUSE_PAINTS[progress.paintIndex].name);
 }else if(kind==='persona'){
  addFact('⭐ '+format(h.points)+' punti');
 }else{
  const tier=HOUSE_TIERS[houseTier(h.points)];
  const premium=isPremiumHouse(h);
  addFact('⭐ '+format(h.points)+' punti');
  addFact('🌿 Giardino: '+(h.points<1?'non sbloccato':GARDEN_CATALOG[0].options[housePlant(h)]+' · '+(premium?4:2)+' piante'));
  addFact('🎨 Colore: '+housePaint(h).name);
  addFact('🏗️ '+tier.name+' · '+tier.levels+' piani');
  addFact('🎨 Design: '+(premium?'Premium':'Gratis'));
  addFact('🏠 Casa #'+String(h.id).padStart(5,'0'));
 }
 details.appendChild(info);window.HouseShowcase?.mountCard(h,kind,details);
 if(kind==='negozio'&&selected&&window.OwnerAccess?.testMode()){
  const progress=shopProgressFor(selected);
  const panel=document.createElement('div');panel.className='demo-house-controls';
  const heading=document.createElement('strong');heading.textContent='Evoluzione attività';
  const stage=document.createElement('select');stage.className='citySelect';
  stage.setAttribute('aria-label','Evoluzione attività');
  HOUSE_TIERS.forEach((tier,index)=>{
   const label='Livello '+(index+1)+' · '+tier.min.toLocaleString(window.GameI18n?.locale||'it-IT')+' punti';
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
 if(kind==='casa'&&window.OwnerAccess?.testMode()){
  selectedDemoHouseId=h.id;
  updateDemoHouseLabel();
  const panel=document.createElement('div');panel.className='demo-house-controls';
  const headingDemo=document.createElement('strong');headingDemo.textContent='🏗️ Evoluzione di questa casa (demo)';
  const hint=document.createElement('p');hint.textContent='Scegli i punti e il design: cambia solo questa casa, senza spostare il lotto.';
  const picker=document.createElement('select');picker.className='citySelect';
  HOUSE_TIERS.forEach(t=>{
   const option=document.createElement('option');option.value=String(t.min);
   option.textContent=t.min.toLocaleString(window.GameI18n?.locale||'it-IT')+' punti · '+t.name+' ('+t.levels+' piani)';
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
  colorPicker.value=String(housePaintIndex(h));
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
function clearResidentFocus(){
 const marker=window.v49Focus?.group;
 if(!marker)return;
 marker.removeFromParent();
 for(const part of marker.children){part.geometry.dispose();part.material.dispose();}
 window.v49Focus=null;
}
function showPersonCard(person){
 if(window.v49Focus?.person!==person){
  clearResidentFocus();
  const marker=new THREE.Group();
  const material=()=>new THREE.MeshBasicMaterial({color:0xffd84e,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.25,1.62,28),material());
  ring.rotation.x=-Math.PI/2;ring.position.y=.16;ring.renderOrder=6;
  const arrow=new THREE.Mesh(new THREE.ConeGeometry(.45,.82,8),material());
  arrow.rotation.z=Math.PI;arrow.position.y=3.55;arrow.renderOrder=6;
  marker.position.copy(person.g.position);marker.add(ring,arrow);
  group.add(marker);window.v49Focus={group:marker,person};
 }
 showOwnerCard(person.home,'persona');
}
function showCard(h){showOwnerCard(h,'casa')}
function enterNow(build=rebuildNow){if(!active&&window.WorldRoads){WorldRoads.sync();const p=WorldRoads.cityPlan(currentCity,worldCityCells(),WorldAtlas);azimuth=0;elevation=1.12;distance=Math.min(3500,Math.max(360,(Math.max(p.bounds.maxX-p.bounds.minX,p.bounds.maxZ-p.bounds.minZ))*.85));}if(!threeReady&&!makeScene())throw Error('3D engine unavailable');active=true;document.body.classList.add("city-view");if(window.matchMedia('(max-width:720px), (max-height:480px)').matches){document.body.classList.add('wide-city');const toggle=$('cityPanelToggle');if(toggle){toggle.textContent='☰ Comandi';toggle.setAttribute('aria-expanded','false');}}$('threeLayer').classList.add('active');$('threeLayer').style.opacity=1;map.dragging.disable();map.scrollWheelZoom.disable();const built=build();const finish=()=>{updateCamera();resize();drawCityFrame();void ensureCitySquare(currentCity);void ensureRegionalCatalog(currentCity);return true;};return built?.then?built.then(finish):finish();}
function back(){clearAvatarLabels();clearResidentFocus();active=false;document.body.classList.remove("city-view");$('threeLayer').style.opacity=0;$('threeLayer').classList.remove('active');$('card').style.display='none';$('cityErrorNotice')?.remove();map.dragging.enable();map.scrollWheelZoom.enable();$('status').textContent='Mappa geografica · le città sono posizionate con coordinate reali'}
function onZoom(){
 if(active||suppressMapEntry||cityEntryPromise||window.WorldSearch?.getSelectedCountry())return;
 const nearest=cityAtMapCenter();
 const near=nearest&&nearest.distance<50000;
 const z=map.getZoom();
 if(z>=11&&near){
  if(!manualCityNavigation&&nearest.city.id!==currentCity.id)selectCity(nearest.city.id,false);
  if(!active){distance=115;enter()}else updateCamera();
 }else if(active)back();
}
function setCountNow(n,build=rebuildNow){
 count=n;syncPopulationControls();cityStates.get(currentCity.id).count=n;
 homes=createHomes(n);
 $('counter').textContent=n.toLocaleString(window.GameI18n?.locale||'it-IT');
 $('v4Population').textContent=n.toLocaleString(window.GameI18n?.locale||'it-IT');
 updateCitySelection();
 if(selectedDemoHouseId>n)selectedDemoHouseId=1;
 updateDemoHouseLabel();
 if(active)build();else renderMilestones();
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
 if(!window.OwnerAccess?.testMode())return;
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
 if(!window.OwnerAccess?.testMode())return;
 const h=homes.find(item=>item.id===houseId);
 if(!h||!Number.isInteger(colorIndex)||!HOUSE_PAINTS[colorIndex])return;
 colorOverrides.set(scoreOverrideKey(currentCity.id,h.id),colorIndex);
 selectedDemoHouseId=h.id;
 if(active)rebuild();
 $('status').textContent=`Casa #${h.id} · colore ${HOUSE_PAINTS[colorIndex].name}`;
 showOwnerCard(h,'casa');
}
function applyDemoHouseDesign(houseId,premium){
 if(!window.OwnerAccess?.testMode())return;
 const h=homes.find(item=>item.id===houseId);
 if(!h)return;
 designOverrides.set(scoreOverrideKey(currentCity.id,h.id),Boolean(premium));
 selectedDemoHouseId=h.id;
 if(active)rebuild();
 $('status').textContent=`Casa #${h.id} · ${premium?'Design Premium (demo abbonamento)':'Design Gratis'}`;
 showOwnerCard(h,'casa');
}
function applyDemoHousePoints(houseId,points){
 if(!window.OwnerAccess?.testMode())return;
 const h=homes.find(item=>item.id===houseId);
 if(!h||!Number.isFinite(points))return;
 const safePoints=Math.max(0,Math.floor(points));
 selectedDemoHouseId=h.id;
 scoreOverrides.set(scoreOverrideKey(currentCity.id,h.id),safePoints);
 h.points=safePoints;
 updateDemoHouseLabel();
 if(active)rebuild();
 $('status').textContent=`Demo @${h.user} · Casa #${h.id} · ${safePoints.toLocaleString(window.GameI18n?.locale||'it-IT')} punti · ${HOUSE_TIERS[houseTier(safePoints)].name}`;
 showOwnerCard(h,'casa');
}
if(scoreSelect)scoreSelect.onchange=()=>applyDemoHousePoints(selectedDemoHouseId,Number(scoreSelect.value));
updateDemoHouseLabel();
function syncPopulationControls(){
 const slider=$('populationSlider'),exact=$('populationExact'),label=$('populationValue');
 if(slider)slider.value=String(count);
 if(exact)exact.value=String(count);
 if(label)label.textContent=count.toLocaleString(window.GameI18n?.locale||'it-IT');
}
function validPopulation(value){
 const n=Number(value);
 return Number.isFinite(n)?Math.max(1,Math.min(5000,Math.round(n))):count;
}
$('populationSlider').addEventListener('input',()=>{
 const n=validPopulation($('populationSlider').value);
 $('populationExact').value=String(n);
 $('populationValue').textContent=n.toLocaleString(window.GameI18n?.locale||'it-IT');
});
$('populationSlider').addEventListener('change',()=>setCount(validPopulation($('populationSlider').value)));
$('applyPopulation').onclick=()=>setCount(validPopulation($('populationExact').value));
$('populationExact').addEventListener('keydown',event=>{if(event.key==='Enter')$('applyPopulation').click()});
syncPopulationControls();
$('go').onclick=()=>map.flyTo([currentCity.lat,currentCity.lng],12,{duration:1.1});
$('enter').onclick=()=>{map.setView([currentCity.lat,currentCity.lng],12);enter()};
$('back').onclick=()=>{back();map.setView([currentCity.lat,currentCity.lng],9)};
$('close').setAttribute('aria-label','Chiudi');
$('close').onclick=()=>{$('card').style.display='none';localizedOwnerCard=null;clearResidentFocus();};
async function findResident(query,kind='casa',report=message=>{$('status').textContent=message;}){
 const q=query.trim().replace(/^@+/,'').trim().toLowerCase();
 const comment=simulatedComments.find(entry=>entry.user===q);
 if(comment&&currentCity.id!==comment.cityId)selectCity(comment.cityId);
 const cityId=currentCity.id;
 const h=homes.find(x=>x.user.toLowerCase()===q);
 if(!h){report('Utente non presente in '+currentCity.name);return false;}
 if(!active){map.setView([currentCity.lat,currentCity.lng],13);if(!await enter())return false;}
 else if(cityEntryPromise&&!await cityEntryPromise)return false;
 if(currentCity.id!==cityId)return false;
 if(kind==='persona'){
  const person=life.people.find(a=>a.home.id===h.id);
  if(!person){report('Personaggio non generato');return false;}
  flyToWorld(person.g.position,{distance:32,elevation:1.05});showPersonCard(person);return true;
 }
 flyToWorld(h,{distance:62,elevation:1.05});showCard(h);return true;
}
$('find').onclick=()=>findResident($('search').value);

for(const option of $('demoScore').options){
 const tier=HOUSE_TIERS.find(entry=>entry.min===Number(option.value));
 if(tier)option.textContent=tier.min.toLocaleString(window.GameI18n?.locale||'it-IT')+' punti · '+tier.name+' ('+tier.levels+(tier.levels===1?' piano)':' piani)');
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
 if(!window.OwnerAccess?.testMode())return;
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
try{const saved=JSON.parse(localStorage.getItem('sudamerica-v4')||'{}');if(typeof saved.motion==='boolean')v4.motion=saved.motion;}catch(e){}
// Movement is on by default in this release, even if an older demo saved it off.
v4.motion=true;
const life={people:[],birds:[],balloons:[]};
// Seed the selected city with its own demo shops and balloons.
for(let i=0;i<cityStates.get(currentCity.id).shops;i++)shopPurchases.push(shopLot(i));
v4.balloons=cityStates.get(currentCity.id).balloons;
renderMilestones();

function saveV4(){try{localStorage.setItem('sudamerica-v4',JSON.stringify(v4))}catch(e){}}
function v4Mesh(geo,color,parent,x=0,y=0,z=0){const m=new THREE.Mesh(geo,color?.isMaterial?color:new THREE.MeshLambertMaterial({color}));m.position.set(x,y,z);parent.add(m);return m}
// v4.5: animation assets use deterministic city-wide ownership coordinates.
// Rebuilding never piles objects on the same house or changes their identity.
function spreadIndex(i,n,length){
  return Math.min(length-1,Math.floor((i+.5)*length/n));
}
// Residents share twelve low-poly, instanced render batches, including faces and clothing.
// Each resident retains a unique selectable position and ownership record.
const RESIDENT_SCALE=.90;
const RESIDENT_HIP=.78;
const RESIDENT_SHOE={height:.14,depth:.34,center:.10,forward:.07};
let residentBatches=null;

function buildResidentBatches(people){
 const n=people.length;if(!n)return;
 const specs=[
  {name:'torso',geo:new THREE.CylinderGeometry(.37,.43,1.02,8),y:1.12,color:'shirt'},
  {name:'head',geo:new THREE.SphereGeometry(.38,10,8),y:1.91,color:'skin',face:true},
  {name:'hair',geo:new THREE.SphereGeometry(.39,9,6,0,Math.PI*2,0,Math.PI*.49),y:2.00,color:'hair',face:true},
  {name:'legs',geo:new THREE.CylinderGeometry(.105,.085,.71,7),y:.40,pair:true,lateral:.17,joint:'hip',color:'trousers'},
  {name:'arms',geo:new THREE.CapsuleGeometry(.075,.43,2,6),y:1.12,pair:true,lateral:.40,joint:'shoulder',color:'skin'},
  {name:'shoes',geo:new THREE.BoxGeometry(.21,RESIDENT_SHOE.height,RESIDENT_SHOE.depth),y:RESIDENT_SHOE.center,pair:true,lateral:.17,joint:'hip',forward:RESIDENT_SHOE.forward,color:'shoes'},
  {name:'neck',geo:new THREE.CylinderGeometry(.12,.14,.19,7),y:1.64,color:'skin'},
  {name:'sleeves',geo:new THREE.CapsuleGeometry(.11,.17,2,6),y:1.37,pair:true,lateral:.40,joint:'shoulder',color:'sleeves'},
  {name:'hands',geo:new THREE.SphereGeometry(.09,7,5),y:.83,pair:true,lateral:.40,joint:'shoulder',color:'skin'},
  {name:'eyes',geo:new THREE.SphereGeometry(.043,7,5),y:1.96,pair:true,lateral:.135,forward:.34,color:'eyes',face:true},
  {name:'nose',geo:new THREE.SphereGeometry(.077,7,5),y:1.86,forward:.37,color:'skin',face:true},
  {name:'ears',geo:new THREE.SphereGeometry(.085,7,5),y:1.89,pair:true,lateral:.37,color:'skin',face:true}
 ];
 const detailCapacity=Math.min(n,120);
 const meshes=specs.map((spec,index)=>{
  const mesh=new THREE.InstancedMesh(spec.geo,new THREE.MeshLambertMaterial({color:0xffffff}),(index<6?n:detailCapacity)*(spec.pair?2:1));
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled=false;mesh.castShadow=true;mesh.receiveShadow=true;
  group.add(mesh);
  return mesh;
 });
 const dummy=new THREE.Object3D();
 const detailOwners=[];
 const detailActors=people.slice(0,detailCapacity);
 residentBatches={meshes,specs,dummy,people,detailOwners,detailActors};
 const skin=['#e4b28e','#b47d5e','#f1c9a2','#d99a78','#85513c','#bd805b','#f4d3b2'];
 const shirt=['#e9867c','#75b4cf','#edbf69','#9b8ac5','#75b67b','#d98049','#4c8294'];
 const hair=[0x5e4238,0x9a704c,0x33343c];
 const trousers=[0x425b75,0x4a454e,0x78624b,0x304c55,0x746c83],shoes=[0x39363b,0x655141,0xf2eadb];
 for(let i=0;i<n;i++){
  const a=people[i],id=a.home?.id??i+1;
  a.bodyScale=.94+((id*17)%13)/100;
  const top=i===0?v4.shirt:shirt[id%shirt.length];
  const sleeves=i!==0&&id%4===0?new THREE.Color(top).lerp(new THREE.Color(0x22313b),.46):top;
  const colors={skin:i===0?v4.skin:skin[Math.floor(id*11/7)%skin.length],shirt:top,sleeves,hair:hair[id%hair.length],trousers:trousers[id%trousers.length],shoes:shoes[id%shoes.length],eyes:0x222b31};
  a.residentColors=colors;a.detailIndex=i<detailCapacity?i:-1;
  if(a.detailIndex>=0)detailOwners[a.detailIndex]=id;
  for(let j=0;j<specs.length;j++){if(j>=6&&a.detailIndex<0)continue;const color=new THREE.Color(colors[specs[j].color]);for(let side=0;side<(specs[j].pair?2:1);side++)meshes[j].setColorAt((j<6?i:a.detailIndex)*(specs[j].pair?2:1)+side,color);}
  updateResidentMatrix(i);
 }
 for(const mesh of meshes){mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;}
}
function updateResidentMatrix(i){
 if(!residentBatches)return;
 const {people,meshes,specs,dummy}=residentBatches;
 const a=people[i];const pos=a.g.position;
 const scale=RESIDENT_SCALE*(a.bodyScale||1);
 const bodyYaw=a.g.rotation.y,faceYaw=bodyYaw+(a.gaze||0);
 const bodyCos=Math.cos(bodyYaw),bodySin=Math.sin(bodyYaw),faceCos=Math.cos(faceYaw),faceSin=Math.sin(faceYaw);
 for(let j=0;j<specs.length;j++){
  if(j>=6&&a.detailIndex<0)continue;
  const spec=specs[j],mesh=meshes[j],copies=spec.pair?2:1;
  const yaw=spec.face?faceYaw:bodyYaw,c=spec.face?faceCos:bodyCos,si=spec.face?faceSin:bodySin;
  for(let k=0;k<copies;k++){
   const side=k===0?-1:1,xx=spec.pair?side*spec.lateral:0;
   let zz=spec.forward||0,y=spec.y,pitch=0;
   if(spec.joint){
    const leg=spec.joint==='hip',pivot=leg?RESIDENT_HIP:1.49;
    pitch=(a.gait||0)*side*(leg?-.42:.30)-(leg||side<0?0:a.gesture||0);
    const down=pivot-y,sp=Math.sin(pitch),cp=Math.cos(pitch);
    y=pivot-down*cp-zz*sp+(leg?Math.max(0,side*(a.stepLift||0))*(spec.name==='shoes'?.05:.02):0);
    zz=zz*cp-down*sp;
    if(spec.name==='shoes')pitch*=.40;
   }
   dummy.position.set(pos.x+(xx*c+zz*si)*scale,pos.y+y*scale,pos.z+(zz*c-xx*si)*scale);
   dummy.rotation.set(pitch,yaw,0,'YXZ');dummy.scale.set(scale,scale*(spec.name==='hair'?(a.i%3===0?1.18:.88):1),scale);dummy.updateMatrix();mesh.setMatrixAt((j<6?i:a.detailIndex)*copies+k,dummy.matrix);
  }
 }
}
function assignResidentDetails(chosen){
 if(!residentBatches)return;
 const {meshes,specs,detailOwners,detailActors}=residentBatches;
 // Only actors that previously owned a slot need to be cleared.
 for(const actor of detailActors)actor.detailIndex=-1;
 detailActors.length=0;
 for(let j=6;j<meshes.length;j++)meshes[j].count=chosen.length*(specs[j].pair?2:1);
 for(let slot=0;slot<chosen.length;slot++){
  const actor=chosen[slot].a;
  actor.detailIndex=slot;
  detailActors.push(actor);
  if(detailOwners[slot]===actor.home.id)continue;
  detailOwners[slot]=actor.home.id;
  for(let j=6;j<meshes.length;j++){
   const copies=specs[j].pair?2:1;
   const color=new THREE.Color(actor.residentColors[specs[j].color]);
   for(let k=0;k<copies;k++)meshes[j].setColorAt(slot*copies+k,color);
   meshes[j].instanceColor.needsUpdate=true;
  }
 }
}
function commitResidentMatrices(chosen){
 if(!residentBatches||!chosen.length)return;
 let first=Infinity,last=-1;for(const {a}of chosen){first=Math.min(first,a.i);last=Math.max(last,a.i);}
 const {meshes,specs}=residentBatches;for(let j=0;j<meshes.length;j++){const copies=specs[j].pair?2:1;meshes[j].instanceMatrix.updateRange.offset=(j<6?first:0)*copies*16;meshes[j].instanceMatrix.updateRange.count=(j<6?last-first+1:chosen.length)*copies*16;meshes[j].instanceMatrix.needsUpdate=true;}
}
// A shared sidewalk graph replaces private-lawn perimeter loops.
let residentNavigation=null;
function pedestrianWidth(axis,index){return axis==='x'?(index%4===0?11.5:index%7===2?8.7:6.8):(index%5===0?11.5:index%6===3?8.7:6.8);}
function buildResidentNavigation(selected){
 const nodes=[],byKey=new Map(),blocks=new Map(),cells=worldCityCells(selected);
 function node(x,z,kind='walk'){const key=x.toFixed(3)+':'+z.toFixed(3);if(byKey.has(key))return byKey.get(key);const id=nodes.length;nodes.push({id,x,z,kind,links:[]});byKey.set(key,id);return id;}
 function link(a,b,crossing=false){if(a===b||nodes[a].links.some(e=>e.to===b))return;const length=Math.hypot(nodes[a].x-nodes[b].x,nodes[a].z-nodes[b].z);nodes[a].links.push({to:b,length,crossing});nodes[b].links.push({to:a,length,crossing});}
 for(const {col,row}of cells){
  const left=streetEdgeX(col-1)+pedestrianWidth('x',col-1)/2+CITY_WALK_LANE,right=streetEdgeX(col)-pedestrianWidth('x',col)/2-CITY_WALK_LANE,top=streetEdgeZ(row-1)+pedestrianWidth('z',row-1)/2+CITY_WALK_LANE,bottom=streetEdgeZ(row)-pedestrianWidth('z',row)/2-CITY_WALK_LANE;
  const north=[node(left,top)],south=[node(left,bottom)];
  for(let i=0;i<LOT_COLS;i++){const x=blockAxis(col,'x')+(i-(LOT_COLS-1)/2)*LOT_X;north.push(node(x,top,'home'));south.push(node(x,bottom,'home'));}
  north.push(node(right,top));south.push(node(right,bottom));
  for(const side of [north,south])for(let i=1;i<side.length;i++)link(side[i-1],side[i]);
  const west=node(left,(top+bottom)/2),east=node(right,(top+bottom)/2);link(north[0],west);link(west,south[0]);link(north.at(-1),east);link(east,south.at(-1));
  blocks.set(col+':'+row,{north,south,west,east,col,row});
 }
 for(const b of blocks.values()){
  const right=blocks.get((b.col+1)+':'+b.row),below=blocks.get(b.col+':'+(b.row+1));
  if(right){link(b.north.at(-1),right.north[0],true);link(b.south.at(-1),right.south[0],true);}
  if(below){link(b.south[0],below.north[0],true);link(b.south.at(-1),below.north.at(-1),true);}
 }
 function frontage(block,slot){const c=spiralCell(block),b=blocks.get(c.col+':'+c.row);return b?(slot<LOT_COLS?b.north:b.south)[slot%LOT_COLS+1]:0;}
 for(const shop of shopPurchases){const id=frontage(shop.block,shop.slot);if(nodes[id]){nodes[id].kind='shop';nodes[id].entryYaw=shop.slot<LOT_COLS?0:Math.PI;}}
 for(const zone of publicZones()){const c=spiralCell(zone.block),b=blocks.get(c.col+':'+c.row);if(b){const entrance=nodes[b.north[4]];entrance.kind='public';entrance.entryYaw=0;}}
 return{nodes,blocks,frontage};
}
function residentRandom(a){a.randomState=(Math.imul(a.randomState,1664525)+1013904223)>>>0;return a.randomState/4294967296;}
function planResidentTrip(a){
 const graph=residentNavigation.nodes,start=a.node,parent=new Map([[start,null]]),depth=new Map([[start,0]]),queue=[start],maxDepth=3+Math.floor(residentRandom(a)*7);
 for(let i=0;i<queue.length&&queue.length<160;i++){const at=queue[i];if(depth.get(at)>=maxDepth)continue;for(const edge of graph[at].links)if(!parent.has(edge.to)){parent.set(edge.to,at);depth.set(edge.to,depth.get(at)+1);queue.push(edge.to);}}
 const choices=queue.filter(id=>depth.get(id)>=2&&!a.recent.includes(id));const fallback=queue.filter(id=>id!==start),pool=choices.length?choices:fallback;
 if(!pool.length){a.pause=2;a.pauseKind='rest';return;}
 const destinations=pool.filter(id=>graph[id].kind==='shop'||graph[id].kind==='public'),options=destinations.length&&residentRandom(a)<.55?destinations:pool,target=options[Math.floor(residentRandom(a)*options.length)],route=[];
 for(let n=target;n!==start&&n!==null;n=parent.get(n))route.push(n);a.route=route.reverse();a.goal=target;a.activity=graph[target].kind;a.recent.push(target);if(a.recent.length>5)a.recent.shift();a.crossed=null;
}
function residentWalkPoint(a,t){
 if(!residentNavigation||!a.route)return{x:a.g.position.x,z:a.g.position.z,angle:a.g.rotation.y,moving:false};
 const dt=a.lastWalkTime===undefined?0:Math.min(.12,Math.max(0,t-a.lastWalkTime));a.lastWalkTime=t;let budget=dt*a.speed,moving=false;
 if(a.pause>0){a.pause=Math.max(0,a.pause-dt);budget=0;}
 if(a.pause>0&&a.pauseYaw!==undefined){
  const delta=a.pauseYaw-a.g.rotation.y;
  const turn=Math.atan2(Math.sin(delta),Math.cos(delta));
  a.g.rotation.y+=Math.max(-dt*2.8,Math.min(dt*2.8,turn));
 }
 if(a.pause<=0){a.pauseKind='';a.pauseYaw=undefined;}
 if(!a.route.length&&a.pause<=0)planResidentTrip(a);
 if(a.route.length){
  const next=a.route[0],edge=residentNavigation.nodes[a.node].links.find(e=>e.to===next);
  const dest=residentNavigation.nodes[next],dx=dest.x-a.g.position.x,dz=dest.z-a.g.position.z,length=Math.hypot(dx,dz);
  if(edge?.crossing&&a.crossed!==next){a.crossed=next;a.pause=.9+residentRandom(a)*1.8;a.pauseKind='crossing';a.pauseYaw=Math.atan2(dx,dz);budget=0;}
  if(budget>0&&length>.001){const yaw=Math.atan2(dx,dz),turn=Math.atan2(Math.sin(yaw-a.g.rotation.y),Math.cos(yaw-a.g.rotation.y));a.g.rotation.y+=Math.max(-dt*4,Math.min(dt*4,turn));if(Math.abs(turn)<.75){const travel=Math.min(budget,length),u=travel/length;a.g.position.x+=dx*u;a.g.position.z+=dz*u;a.walkDistance+=travel;moving=true;}else budget=0;}
  if(length<=budget+.002){
   a.g.position.x=dest.x;a.g.position.z=dest.z;a.node=next;a.route.shift();
   if(!a.route.length){a.pause=(a.activity==='public'?4:a.activity==='shop'?5:1.2)+residentRandom(a)*6;a.crossed=null;a.pauseKind=a.activity;a.pauseYaw=dest.entryYaw;}
  }
 }
 return{x:a.g.position.x,z:a.g.position.z,angle:a.g.rotation.y,moving};
}
function residentWalkSurface(a){
 const here=residentNavigation?.nodes[a.node];
 const next=a.route[0],there=residentNavigation?.nodes[next];
 if(!there||!here?.links.some(edge=>edge.to===next&&edge.crossing))return CITY_SIDEWALK_TOP;
 const p=a.g.position;
 const curbDistance=Math.min(Math.hypot(p.x-here.x,p.z-here.z),Math.hypot(p.x-there.x,p.z-there.z));
 const step=clamp((curbDistance-CITY_WALK_LANE+.16)/.32,0,1);
 return CITY_SIDEWALK_TOP+(CITY_STREET_TOP-CITY_SIDEWALK_TOP)*step*step*(3-2*step);
}

function residentSoleHeight(a){
 const {height,depth,center,forward}=RESIDENT_SHOE;
 let sole=Infinity;
 for(const side of [-1,1]){
  const pitch=-(a.gait||0)*side*.42,shoePitch=pitch*.40;
  const lift=Math.max(0,side*(a.stepLift||0))*.05;
  const y=RESIDENT_HIP-(RESIDENT_HIP-center)*Math.cos(pitch)-forward*Math.sin(pitch)+lift;
  sole=Math.min(sole,y-height/2*Math.cos(shoePitch)-depth/2*Math.abs(Math.sin(shoePitch)));
 }
 return sole*RESIDENT_SCALE*(a.bodyScale||1);
}

function v45Avatar(h,i){
 const g=new THREE.Object3D(),node=residentNavigation.frontage(h.blockIndex,h.slot),at=residentNavigation.nodes[node];
 let seed=2166136261;for(const ch of (h.cityId||'')+':'+h.id)seed=Math.imul(seed^ch.charCodeAt(0),16777619);
 const a={g,i,home:h,bounds:plotBounds(h.blockIndex,h.slot),phase:rnd(i*13+9)*6.28,node,route:[],recent:[],randomState:seed>>>0,walkDistance:0,pause:i===0?0:rnd(i*31+6)*7,walkBlend:0};
 a.speed=.95+residentRandom(a)*.65;
 a.stepLength=.51+(a.speed-.95)*.18;
 g.position.set(at.x,CITY_SIDEWALK_TOP-residentSoleHeight(a),at.z);planResidentTrip(a);
 const next=residentNavigation.nodes[a.route[0]];
 g.rotation.y=next?Math.atan2(next.x-at.x,next.z-at.z):0;
 a.x=at.x;a.z=at.z;return a;
}

function updateResidentPose(a,t,dt,moving){
 const ease=1-Math.exp(-dt*11),stride=a.walkDistance*Math.PI/a.stepLength+a.phase;
 a.walkBlend+=((moving?1:0)-a.walkBlend)*ease;
 a.gait=Math.sin(stride)*a.walkBlend;
 a.stepLift=Math.cos(stride)*a.walkBlend;
 a.g.position.y=residentWalkSurface(a)-residentSoleHeight(a);
 const idle=t*1.45+a.phase;
 const scan=a.pauseKind==='crossing'?Math.sin(idle*1.65)*.58:Math.sin(idle*.64)*.23;
 a.gaze=((a.gaze||0)*(1-ease))+(moving?0:scan)*ease;
 const wave=!moving&&a.pauseKind==='public'&&a.i%4===0?Math.max(0,Math.sin(idle))*.50:0;
 a.gesture=(a.gesture||0)+(wave-(a.gesture||0))*ease;
}

function v45Bird(i,x,z,phase){
 const assets=v45Bird.assets||(v45Bird.assets={geometry:{
  body:new THREE.SphereGeometry(.56,10,8),head:new THREE.SphereGeometry(.29,9,7),
  beak:new THREE.ConeGeometry(.13,.53,6),eye:new THREE.SphereGeometry(.045,5,4),
  tail:new THREE.ConeGeometry(.32,.65,3),wing:new THREE.BoxGeometry(1.8,.10,.57)
 },materials:new Map()});
 function part(shape,color,parent,x=0,y=0,z=0){
  if(!assets.materials.has(color))assets.materials.set(color,new THREE.MeshLambertMaterial({color}));
  const mesh=new THREE.Mesh(assets.geometry[shape],assets.materials.get(color));
  mesh.position.set(x,y,z);parent.add(mesh);return mesh;
 }
 const g=new THREE.Group(),feather=i%5===0?0xe3e9ef:0xfff8e9;
 const body=part('body',feather,g);body.scale.set(.72,.52,1.45);
 part('head',feather,g,0,.14,-.7);
 const beak=part('beak',0xe9b350,g,0,.08,-1.09);beak.rotation.x=Math.PI/2;
 for(const xx of [-.16,.16])part('eye',0x273c4b,g,xx,.22,-.9);
 const tail=part('tail',feather,g,0,.04,1.02);tail.rotation.x=Math.PI/2;
 const wings=[];
 for(const side of [-1,1]){
  const pivot=new THREE.Group();pivot.position.set(side*.32,.06,0);g.add(pivot);
  const wing=part('wing',feather,pivot,side*.88,0,.03);
  wing.rotation.y=side*.16;wings.push({pivot,side});
 }
 const rx=22+rnd(i*9+4)*22,rz=18+rnd(i*5+8)*20;
 g.position.set(x,24+i%6*3,z);group.add(g);
 return {g,x,z,i,wings,phase,rx,rz};
}
let birdBatches=null,balloonBatches=null;
function buildFlightBatches(actors,marker){
 const batches=new Map();
 for(const actor of actors)actor.g.traverse(part=>{
  if(!part.isMesh)return;
  const key=part.geometry.id+':'+part.material.id;
  if(!batches.has(key))batches.set(key,{geometry:part.geometry,material:part.material,castShadow:part.castShadow,receiveShadow:part.receiveShadow,parts:[]});
  batches.get(key).parts.push(part);
 });
 const meshes=[];
 for(const batch of batches.values()){
  const mesh=new THREE.InstancedMesh(batch.geometry,batch.material,batch.parts.length);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;
  mesh.castShadow=batch.castShadow;mesh.receiveShadow=batch.receiveShadow;
  mesh.userData[marker]=true;group.add(mesh);
  // Keep original parts as selection proxies with a fixed local pose.
  for(const part of batch.parts){part.updateMatrix();part.matrixAutoUpdate=false;part.visible=false;}
  meshes.push({mesh,parts:batch.parts});
 }
 return {actors,meshes,inverse:new THREE.Matrix4(),matrix:new THREE.Matrix4()};
}
function updateFlightBatches(batches){
 if(!batches)return;
 const {actors,meshes,inverse,matrix}=batches;
 group.updateWorldMatrix(true,false);inverse.copy(group.matrixWorld).invert();
 // The city and its ancestors were updated above; update each animated root once.
 for(const actor of actors)actor.g.updateWorldMatrix(false,true);
 for(const {mesh,parts}of meshes){
  for(let i=0;i<parts.length;i++){matrix.multiplyMatrices(inverse,parts[i].matrixWorld);mesh.setMatrixAt(i,matrix);}
  mesh.instanceMatrix.needsUpdate=true;
 }
}
function buildBirdBatches(birds){
 birdBatches=buildFlightBatches(birds,'birdInstances');
 updateBirdBatches();
}
function updateBirdBatches(){updateFlightBatches(birdBatches);}

function v45Balloon(i,home){
 const g=new THREE.Group();
 const palette=[0xf33751,0xffae28,0xffd15b,0x2d8bd4,0xe84fa3];
 const assets=v45Balloon.assets||(v45Balloon.assets={
  geometry:{
   envelope:new THREE.SphereGeometry(3.3,32,18),
   stripe:new THREE.SphereGeometry(3.34,6,18,0,.61,0,Math.PI),
   burner:new THREE.CylinderGeometry(.8,1.35,1.2,10),
   basket:new THREE.BoxGeometry(1.8,1.35,1.6),
   cable:new THREE.CylinderGeometry(.04,.04,2.9,4)
  },
  materials:new Map()
 });
 function part(shape,color,x=0,y=0,z=0){
  if(!assets.materials.has(color))assets.materials.set(color,new THREE.MeshLambertMaterial({color}));
  return v4Mesh(assets.geometry[shape],assets.materials.get(color),g,x,y,z);
 }
 const envelope=part('envelope',palette[i%palette.length]);
 envelope.scale.set(1,1.27,1);
 // Vertical colored gores, a crown, burner, basket and suspension cables.
 for(let k=0;k<10;k++){
  const stripe=part('stripe',palette[(i+k+1)%palette.length]);
  stripe.rotation.y=k*Math.PI/5;
  stripe.scale.y=1.275;
 }
 part('burner',0xf5dca8,0,-4.15,0);
 part('basket',0x957453,0,-6.2,0);
 for(const xx of [-.72,.72])for(const zz of [-.62,.62]){
  part('cable',0x66503f,xx,-4.9,zz);
 }
 // Distribute balloons over different blocks before checking their flight lanes.
 const offsetX=(rnd(i*37+5)-.5)*45;
 const offsetZ=(rnd(i*71+3)-.5)*40;
 const x=i===0?-23:home.x+offsetX,z=i===0?-86:home.z+offsetZ;
 if(i===0)g.scale.setScalar(1.72);
 g.position.set(x,i===0?36:48+(i%4)*6,z);group.add(g);
 return {g,i,ownerId:home.id,baseY:g.position.y,x,z};
}
const BIRD_BOB=.9, BALLOON_BOB=2, BALLOON_SWAY_X=5, BALLOON_SWAY_Z=4;
const BIRD_HORIZONTAL_MARGIN=3,BIRD_VERTICAL_MARGIN=3.1,AIR_LANE_GAP=2;
function balloonFlightLane(balloon,clearance,airspace){
 const scale=balloon.g.scale.x;
 const {x,z}=balloon;
 const rx=BALLOON_SWAY_X+4*scale,rz=BALLOON_SWAY_Z+4*scale;
 const below=7*scale+BALLOON_BOB,above=4.35*scale+BALLOON_BOB;
 let altitude=Math.max(balloon.baseY,clearance(x,z,rx,rz)+below+1);
 // Sort overlapping flight envelopes by their bottom so escaping one cannot enter another.
 const nearby=airspace.filter(lane=>Math.abs(x-lane.x)<=rx+lane.rx&&Math.abs(z-lane.z)<=rz+lane.rz);
 nearby.sort((a,b)=>a.bottom-b.bottom);
 for(const lane of nearby){
  if(altitude+above+AIR_LANE_GAP<=lane.bottom)break;
  if(altitude-below<lane.top+AIR_LANE_GAP)altitude=lane.top+AIR_LANE_GAP+below;
 }
 airspace.push({x,z,rx,rz,bottom:altitude-below,top:altitude+above});
 return altitude;
}
// Flight paths use a fixed safe altitude for the entire orbit.
function flightEnvelope(selected){
 let minX=0,maxX=0,minZ=0,maxZ=0;for(const h of selected){minX=Math.min(minX,h.x);maxX=Math.max(maxX,h.x);minZ=Math.min(minZ,h.z);maxZ=Math.max(maxZ,h.z);}
 // Bird centers + formation + full orbit and balloon sway fit inside 120m.
 // Include origin for the first balloon's fixed (-23,-86) anchor.
 return {minX:minX-120,maxX:maxX+120,minZ:minZ-120,maxZ:maxZ+120};
}
function flightClearance(group){const steps=flightClearanceStages(group);let result;do{result=steps.next();}while(!result.done);return result.value;}
function* flightClearanceStages(group,envelope=null){
 const cellSize=24, heights=new Map();
 const minCellX=envelope?Math.floor(envelope.minX/cellSize):-Infinity,maxCellX=envelope?Math.floor(envelope.maxX/cellSize):Infinity,minCellZ=envelope?Math.floor(envelope.minZ/cellSize):-Infinity,maxCellZ=envelope?Math.floor(envelope.maxZ/cellSize):Infinity;
 const bounds=new THREE.Box3(), world=new THREE.Matrix4(), instance=new THREE.Matrix4();
 group.updateMatrixWorld(true);
 function record(){
  if(bounds.max.y<=12)return;
  for(let x=Math.max(minCellX,Math.floor(bounds.min.x/cellSize));x<=Math.min(maxCellX,Math.floor(bounds.max.x/cellSize));x++){
   for(let z=Math.max(minCellZ,Math.floor(bounds.min.z/cellSize));z<=Math.min(maxCellZ,Math.floor(bounds.max.z/cellSize));z++){
    const key=x+','+z;
    if((heights.get(key)||0)<bounds.max.y)heights.set(key,bounds.max.y);
   }
  }
 }
 function recordGeometry(box,matrix){
  const e=matrix.elements,a=box.min,b=box.max;
  // Object transforms are affine. Select the same extremal corners as Box3's
  // eight-corner pass, retaining its multiplication and addition order exactly.
  if(e[3]!==0||e[7]!==0||e[11]!==0||e[15]!==1){bounds.copy(box).applyMatrix4(matrix);record();return;}
  const highY=e[1]*(e[1]<0?a.x:b.x)+e[5]*(e[5]<0?a.y:b.y)+e[9]*(e[9]<0?a.z:b.z)+e[13];
  if(highY<=12)return;
  bounds.max.y=highY;
  bounds.min.x=e[0]*(e[0]<0?b.x:a.x)+e[4]*(e[4]<0?b.y:a.y)+e[8]*(e[8]<0?b.z:a.z)+e[12];
  bounds.max.x=e[0]*(e[0]<0?a.x:b.x)+e[4]*(e[4]<0?a.y:b.y)+e[8]*(e[8]<0?a.z:b.z)+e[12];
  bounds.min.z=e[2]*(e[2]<0?b.x:a.x)+e[6]*(e[6]<0?b.y:a.y)+e[10]*(e[10]<0?b.z:a.z)+e[14];
  bounds.max.z=e[2]*(e[2]<0?a.x:b.x)+e[6]*(e[6]<0?a.y:b.y)+e[10]*(e[10]<0?a.z:b.z)+e[14];
  record();
 }
 const meshes=[];group.traverse(mesh=>{if(mesh.isMesh)meshes.push(mesh);});
 let meshBudget=0;
 for(const mesh of meshes){
  if(meshBudget++===64){meshBudget=1;yield;}
  const geometry=mesh.geometry;
  if(!geometry.boundingBox)geometry.computeBoundingBox();
  if(envelope&&mesh.userData.regionalMountain){
   // Index nearby terrain triangles, never a mountain range's giant AABB.
   const positions=geometry.attributes.position,indices=geometry.index,count=indices?indices.count:positions.count;
   const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
   for(let i=0;i<count;i+=3){if(i>0&&i%3072===0)yield;
    a.fromBufferAttribute(positions,indices?indices.getX(i):i).applyMatrix4(mesh.matrixWorld);
    b.fromBufferAttribute(positions,indices?indices.getX(i+1):i+1).applyMatrix4(mesh.matrixWorld);
    c.fromBufferAttribute(positions,indices?indices.getX(i+2):i+2).applyMatrix4(mesh.matrixWorld);
    bounds.makeEmpty().expandByPoint(a).expandByPoint(b).expandByPoint(c);record();
   }continue;
  }
  if(mesh.isInstancedMesh){
   // Reuse a pre-existing coarse bound, but do not construct it here:
   // that would transform every instance once before the exact pass below.
   if(mesh.boundingBox){
    bounds.copy(mesh.boundingBox).applyMatrix4(mesh.matrixWorld);
    if(bounds.max.y<=12)continue;
   }
   for(let i=0;i<mesh.count;i++){
    if(i>0&&i%1024===0)yield;
    mesh.getMatrixAt(i,instance);
    world.multiplyMatrices(mesh.matrixWorld,instance);
    recordGeometry(geometry.boundingBox,world);
   }
  }else{
   recordGeometry(geometry.boundingBox,mesh.matrixWorld);
  }
 }
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
function createV4Life(selected){const steps=createLifeStages(selected);while(!steps.next().done){}}
function* createLifeStages(selected){
 life.people.length=0;life.birds.length=0;life.balloons.length=0;residentBatches=null;birdBatches=null;balloonBatches=null;
 // Scene cleanup owns these resources; do not retain a previous city's pool.
 v45Bird.assets=null;
 v45Balloon.assets=null;
 if(!selected.length)return;
 const clearance=yield* flightClearanceStages(group,flightEnvelope(selected));
 // A sampled owner is visible in every district; the first user's avatar
 // always exists even when there is only one house.
 residentNavigation=buildResidentNavigation(selected);lastPeopleTick=0;
 const peopleCount=selected.length;
 for(let i=0;i<peopleCount;i++){
  if(i>0&&i%64===0)yield;
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
  if(flock>0&&flock%8===0)yield;
  const h=selected[spreadIndex(flock,flockCount,selected.length)];
  const birdsInFlock=3+(flock%3);
  const centerX=h.x+(rnd(flock*29+7)-.5)*35;
  const centerZ=h.z+(rnd(flock*19+11)-.5)*32;
  const phase=rnd(flock*31+4)*Math.PI*2;
  for(let j=0;j<birdsInFlock;j++){
   const i=flock*5+j;
   const bird=v45Bird(i,centerX+(j-2)*5,centerZ+(j%2?4:-4),phase+j*.09);
   bird.altitude=Math.max(22+bird.i%6*3,clearance(bird.x,bird.z,bird.rx+BIRD_HORIZONTAL_MARGIN,bird.rz+BIRD_HORIZONTAL_MARGIN)+BIRD_BOB+BIRD_VERTICAL_MARGIN);
   bird.g.position.y=bird.altitude;
   life.birds.push(bird);
  }
 }
 buildBirdBatches(life.birds);
 const airspace=life.birds.map(bird=>({
  x:bird.x,z:bird.z,rx:bird.rx+BIRD_HORIZONTAL_MARGIN,rz:bird.rz+BIRD_HORIZONTAL_MARGIN,
  bottom:bird.altitude-BIRD_BOB-BIRD_VERTICAL_MARGIN,top:bird.altitude+BIRD_BOB+BIRD_VERTICAL_MARGIN
 }));
 // Use evenly distributed owners, never selected[i] (which stacks them
 // over the first houses of a spiral-growing city).
 const balloonCount=Math.min(20,v4.balloons);
 for(let i=0;i<balloonCount;i++){
  const h=selected[spreadIndex(i,balloonCount,selected.length)];
  const balloon=v45Balloon(i,h);
  balloon.baseY=balloonFlightLane(balloon,clearance,airspace);
  balloon.g.position.y=balloon.baseY;
  life.balloons.push(balloon);
 }
 if(life.balloons.length){
  balloonBatches=buildFlightBatches(life.balloons,'balloonInstances');
  updateFlightBatches(balloonBatches);
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
 // Nearby people animate at 30 Hz; distant ownership records remain lightweight.
 // Everyone else remains visible and selectable in their current position.
 if(t-lastPeopleTick>1/30){
  const poseDt=Math.min(.12,t-lastPeopleTick);
  lastPeopleTick=t;
  const near=[];
  const cam=camera.position;
  for(const a of life.people){
   const dx=a.g.position.x-cam.x,dz=a.g.position.z-cam.z;
   const d2=dx*dx+dz*dz;
   if(d2<230*230)near.push({a,d2});
  }
  near.sort((a,b)=>a.d2-b.d2);
  const chosenPeople=near.slice(0,120);assignResidentDetails(chosenPeople);
  for(const {a} of chosenPeople){
   const pt=residentWalkPoint(a,t);
   a.g.position.x=pt.x;
   a.g.position.z=pt.z;
   a.g.rotation.y=pt.angle;
   updateResidentPose(a,t,poseDt,pt.moving);
   updateResidentMatrix(a.i);
   const label=avatarLabels.get(a.home.id);
   if(label){label.position.set(a.g.position.x,a.g.position.y+4,a.g.position.z);sizeAvatarLabel(label);}
  }
  commitResidentMatrices(chosenPeople);
  if(window.v49Focus){
   const {group:marker,person}=window.v49Focus;
   marker.position.copy(person.g.position);
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
 updateBirdBatches();
 for(const b of life.balloons){
  b.g.position.y=b.baseY+Math.sin(t*.45+b.i)*BALLOON_BOB;
  b.g.position.x=b.x+Math.sin(t*.13+b.i)*BALLOON_SWAY_X;
  b.g.position.z=b.z+Math.cos(t*.11+b.i)*BALLOON_SWAY_Z;
  b.g.rotation.y=t*.08;
 }
 updateFlightBatches(balloonBatches);
}
function publicStepStatus(step){return {unlocked:count>=step.at,remaining:Math.max(0,step.at-count)};}
function cityPanelSearchText(...parts){
 const value=parts.join(' ');
 return window.WorldSearch?.normalize(value)??value.trim().toLocaleLowerCase();
}
let civicPanelOpener=null;
function revealCivicPanel(focusHeading){
 const panel=$('v4Panel');
 const focused=document.activeElement;
 if(focusHeading&&!panel.contains(focused)){
  civicPanelOpener=focused?.matches('button,a[href],input,select,textarea,[tabindex]')?focused:null;
 }
 panel.hidden=false;
 return panel;
}
function focusCivicTitle(panel){
 panel.scrollTop=0;
 const heading=$('v4Title');
 heading.tabIndex=-1;
 heading.focus({preventScroll:true});
}
function closeCivicPanel(){
 $('v4Panel').hidden=true;
 const opener=civicPanelOpener?.isConnected?civicPanelOpener:document.querySelector('[data-v4="works"]');
 civicPanelOpener=null;
 opener?.focus({preventScroll:true});
}
function openSquareDetailPanel(focusHeading=true){
 localizedPanelRoute={type:'square'};
 const panel=revealCivicPanel(focusHeading),body=$('v4Body'),profile=citySquareProfile(currentCity);$('v4Title').textContent=profile.name;if(profile.name.startsWith('Piazza civica di '))delete $('v4Title').dataset.i18nSkip;else $('v4Title').dataset.i18nSkip='true';body.replaceChildren();
 const intro=document.createElement('p');
 const chosenWithReference=['curated-central-square','named-reference'].includes(profile.selection);
 intro.textContent=profile.layoutEvidence==='schematic-from-design'?'Perimetro da OpenStreetMap. Disposizione interna schematica basata sul progetto, con posizioni indicative.':
  profile.reviewed?'Piazza verificata singolarmente. La ricostruzione segue la cartografia e i riferimenti disponibili.':
  profile.realGeometry?(chosenWithReference?'Piazza scelta con riferimenti locali. I dettagli della ricostruzione sono da verificare.':
   'Candidato trovato sulla mappa. La scelta della piazza e i dettagli della scena sono da verificare.'):
  'Piazza di gioco generata in attesa di una planimetria reale.';
 body.append(intro);
 function sourceLink(parent,address,label){
  if(typeof address!=='string')return;
  let url;
  try{url=new URL(address);}catch{return;}
  if(url.protocol!=='https:'||url.username||url.password)return;
  const link=document.createElement('a');
  link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent=label;
  parent.append(link);
 }
 const references=document.createElement('div');references.className='civic-objective-actions';
 const geometryLabel=profile.geometryAttribution?'Planimetria ufficiale':
  /^https:\/\/www\.openstreetmap\.org\//.test(profile.source||'')?'Planimetria OpenStreetMap':'Fonte della planimetria';
 sourceLink(references,profile.source,geometryLabel);
 if(profile.geometryAttribution)sourceLink(references,profile.geometryTerms,profile.geometryAttribution);
 if(profile.reference!==profile.source)sourceLink(references,profile.reference,profile.layoutEvidence==='schematic-from-design'?'Relazione del progettista':'Fonte della piazza');
 if(references.childElementCount)body.append(references);
 const adjacent=profile.contextSurfaces?.length?profile.adjacentLandmarks||[]:[];
 const features=[...(profile.landmarks||[]),...adjacent];
 if(!features.length){const empty=document.createElement('p');empty.textContent='Le fonti disponibili non descrivono ancora statue e fontane di questa piazza.';body.append(empty);}
 for(const feature of features){
  const row=document.createElement('div');row.className='civicObjective '+(feature.status==='needs-model'?'pending':'documented');
  const name=document.createElement('strong');name.textContent=feature.name;if(!['Opera mappata','Fontana mappata'].includes(feature.name))name.dataset.i18nSkip='true';
  const state=document.createElement('span');state.textContent=feature.model==='mapped-water-surface'||feature.evidence?.shape==='mapped-surface'?'Vasca riprodotta dal perimetro cartografico':feature.status==='needs-model'?'Presenza mappata · forma 3D da completare':feature.status==='reference-model'?'Riferimento documentato · modello 3D stilizzato':'Tipologia mappata · modello 3D da verificare nei dettagli';row.append(name,state);
  if(feature.description){const description=document.createElement('p');description.textContent=feature.description;row.append(description);}
  if(feature.evidence?.position){
   const evidence=document.createElement('small');
   if(['mapped-footprint','mapped-monument-footprint','mapped-basin-centroid','mapped-plinth','centre-of-mapped-fountain'].includes(feature.evidence.position))evidence.textContent='Posizione ricavata dal perimetro cartografico dell’opera.';
   else if(feature.evidence.position==='mapped-point')evidence.textContent='Posizione ricavata dal punto cartografico.';
   else if(feature.evidence.position==='schematic-from-design')evidence.textContent='Posizione indicativa basata sulla sequenza descritta nel progetto.';
   else if(feature.evidence.position==='reference-estimate')evidence.textContent='Posizione approssimativa in base alle fonti disponibili.';
   if(evidence.textContent)row.append(evidence);
  }
  const links=document.createElement('div');links.className='civic-objective-actions';
  sourceLink(links,feature.source,feature.evidence?.position==='reference-estimate'?'Coordinate indicative':'Mappa dell’opera');
  if(feature.reference!==feature.source)sourceLink(links,feature.reference,'Fonte');
  if(links.childElementCount)row.append(links);
  body.append(row);
 }
 const back=document.createElement('button');back.type='button';back.textContent='Torna agli obiettivi';back.onclick=()=>openPublicWorks();body.append(back);
 if(focusHeading)focusCivicTitle(panel);
}
function openPublicWorks(selected=null,focusHeading=true,phaseStates=new Map()){
 localizedPanelRoute={type:'works',selected,phaseStates};
 const panel=revealCivicPanel(focusHeading),body=$('v4Body'),heading=$('v4Title');
 heading.textContent=selected?.name||'Strutture e obiettivi';
 delete heading.dataset.i18nSkip;
 if(selected?.kind==='park'&&selected.block===0&&!selected.name.startsWith('Piazza civica di '))heading.dataset.i18nSkip='true';
 body.replaceChildren();
 const cityId=currentCity.id;
 const locale=window.GameI18n?.locale||'it-IT';
 const number=value=>value.toLocaleString(locale);
 const reached=PUBLIC_STEPS.filter(step=>publicStepStatus(step).unlocked).length;
 const next=PUBLIC_STEPS.find(step=>!publicStepStatus(step).unlocked);
 const selectedPhase=PUBLIC_STEPS.find(step=>step.kind===selected?.kind)?.phase;
 const defaultPhase=selectedPhase||next?.phase||PUBLIC_STEPS.at(-1)?.phase;
 const zonesByKind=new Map();
 for(const zone of publicZones()){
  if(!zonesByKind.has(zone.kind))zonesByKind.set(zone.kind,[]);
  zonesByKind.get(zone.kind).push(zone);
 }
 const stages=new Map();
 for(const step of PUBLIC_STEPS){
  if(!stages.has(step.phase))stages.set(step.phase,[]);
  stages.get(step.phase).push(step);
 }
 const overview=document.createElement('section');
 overview.className='civic-overview';
 const summary=document.createElement('p');
 summary.textContent=currentCity.name+' · '+number(count)+' case · '+number(reached)+'/'+number(PUBLIC_STEPS.length)+' obiettivi raggiunti';
 const progress=document.createElement('progress');
 progress.max=PUBLIC_STEPS.length;
 progress.value=reached;
 progress.setAttribute('aria-label','Strutture e obiettivi');
 overview.append(summary,progress);
 if(next){
  const preview=document.createElement('div');
  preview.className='civic-next';
  const label=document.createElement('small');
  label.textContent='PROSSIMA OPERA';
  const name=document.createElement('strong');
  name.textContent=next.name;
  const remaining=document.createElement('span');
  remaining.textContent=number(publicStepStatus(next).remaining)+' case mancanti';
  preview.append(label,name,remaining);
  overview.append(preview);
 }
 body.append(overview);
 const shortcuts=document.createElement('div');
 shortcuts.className='civic-quick-actions';
 const plazaDetails=document.createElement('button');
 plazaDetails.type='button';
 plazaDetails.textContent=citySquareProfile(currentCity).name;
 if(!plazaDetails.textContent.startsWith('Piazza civica di '))plazaDetails.dataset.i18nSkip='true';
 plazaDetails.onclick=()=>openSquareDetailPanel();
 const publicDirectory=document.createElement('button');
 publicDirectory.type='button';
 publicDirectory.textContent='Strutture pubbliche';
 publicDirectory.onclick=()=>openCityDirectory('public');
 shortcuts.append(publicDirectory,plazaDetails);
 body.append(shortcuts);
 const search=document.createElement('input');
 search.className='civic-works-search';
 search.type='search';
 search.placeholder='Cerca una struttura…';
 search.setAttribute('aria-label','Cerca strutture pubbliche');
 search.setAttribute('aria-controls','civicWorksList');
 const list=document.createElement('div');
 list.id='civicWorksList';
 list.className='civic-phases';
 body.append(search,list);

 const makeRow=step=>{
  const state=publicStepStatus(step),available=zonesByKind.get(step.kind)||[];
  const row=document.createElement('div');
  row.className='civicObjective '+(state.unlocked?'achieved':'pending');
  if(selected?.kind===step.kind){
   row.classList.add('current');
   row.setAttribute('aria-current','true');
  }
  const name=document.createElement('strong');
  const plaza=step.kind==='park'&&available.find(zone=>zone.block===0);
  name.textContent=plaza?.name||step.name;
  if(plaza&&!plaza.name.startsWith('Piazza civica di '))name.dataset.i18nSkip='true';
  const status=document.createElement('span');
  status.textContent=state.unlocked?'Raggiunto':number(step.at)+' case · '+number(state.remaining)+' case mancanti';
  row.append(name,status);
  if(available.length){
   const actions=document.createElement('div');
   actions.className='civic-objective-actions';
   for(const zone of available){
    const button=document.createElement('button');
    button.type='button';
    button.textContent='📍 Trova '+zone.name;
    button.onclick=async()=>{
     if(!active&&!await enter())return;
     if(currentCity.id!==cityId||panel.hidden||!button.isConnected)return;
     const bounds=facilityBounds(zone.block);
     closeCivicPanel();
     flyToWorld({x:bounds.x,y:4,z:bounds.z},{distance:120,elevation:1.0});
     $('status').textContent=zone.name;
    };
    actions.append(button);
   }
   row.append(actions);
  }
  return row;
 };
 const render=()=>{
  list.replaceChildren();
  const query=cityPanelSearchText(search.value);
  for(const [phase,steps] of stages){
   const matching=query?steps.filter(step=>{
    const names=[step.name,phase,...(zonesByKind.get(step.kind)||[]).map(zone=>zone.name)];
    return names.some(name=>cityPanelSearchText(name,window.GameI18n?.t(name)||name).includes(query));
   }):steps;
   if(!matching.length)continue;
   const group=document.createElement('details');
   group.className='civic-phase';
   group.open=!!query||(phaseStates.get(phase)??phase===defaultPhase);
   if(!query)group.addEventListener('toggle',()=>{
    if(group.isConnected)phaseStates.set(phase,group.open);
   });
   const toggle=document.createElement('summary');
   const phaseName=document.createElement('span');
   phaseName.textContent=phase;
   const tally=document.createElement('span');
   tally.className='civic-phase-count';
   tally.textContent=number(steps.filter(step=>publicStepStatus(step).unlocked).length)+'/'+number(steps.length);
   toggle.append(phaseName,tally);
   const rows=document.createElement('div');
   rows.className='civic-phase-rows';
   for(const step of matching)rows.append(makeRow(step));
   group.append(toggle,rows);
   list.append(group);
  }
  if(!list.children.length){const empty=document.createElement('p');empty.setAttribute('role','status');empty.textContent='Nessuna struttura trovata.';list.append(empty);}
 };
 search.oninput=render;render();
 if(focusHeading)focusCivicTitle(panel);
}
function openCityDirectory(defaultType='all',focusHeading=true){
 localizedPanelRoute={type:'directory',defaultType};
 const panel=revealCivicPanel(focusHeading),body=$('v4Body');$('v4Title').textContent='Trova nella città';delete $('v4Title').dataset.i18nSkip;body.replaceChildren();
 const cityId=currentCity.id;
 const search=document.createElement('input');search.type='search';search.placeholder='Nome, nickname o numero…';search.setAttribute('aria-label','Cerca edifici');
 const type=document.createElement('select');for(const [value,label] of [['all','Tutti gli edifici'],['public','Strutture pubbliche'],['shop','Attività'],['home','Case']]){const opt=document.createElement('option');opt.value=value;opt.textContent=label;type.append(opt);}type.value=defaultType;
 const list=document.createElement('div'),info=document.createElement('p'),more=document.createElement('button');info.setAttribute('role','status');more.textContent='Mostra altri risultati';body.append(search,type,info,list,more);
 const tr=text=>window.GameI18n?.t(text)||text;
 const homeLabel=tr('Casa');
 const records=[
  ...publicZones().map(zone=>({type:'public',name:zone.name,searchText:cityPanelSearchText(zone.name,tr(zone.name)),ref:zone})),
  ...shopPurchases.map(shop=>{
   const name=shop.business+' #'+(shop.id+1)+' · @'+(ownerForShop(shop)?.user||'');
   const progress=shopProgressFor(shop),design=progress.premium?'Premium':'Base';
   const level='Livello '+(houseTier(progress.points)+1)+'/'+HOUSE_TIERS.length;
   return {type:'shop',name,searchText:cityPanelSearchText(name,tr(shop.business),design,tr(design),level,tr(level)),ref:shop};
  }),
  ...homes.map(home=>{
   const name='Casa #'+home.id+' · @'+home.user;
   return {type:'home',name,searchText:cityPanelSearchText(name,homeLabel,String(home.id).padStart(5,'0')),ref:home};
  })
 ];
 let limit=60;
 const render=()=>{list.replaceChildren();const q=cityPanelSearchText(search.value);const matching=records.filter(record=>(type.value==='all'||record.type===type.value)&&record.searchText.includes(q));
  info.textContent=matching.length?matching.length.toLocaleString(window.GameI18n?.locale||'it-IT')+' risultati':'Nessuna struttura trovata.';for(const record of matching.slice(0,limit)){
   const row=document.createElement('div');row.className='civicObjective achieved';const label=document.createElement('strong');label.textContent=record.name;
   const button=document.createElement('button');button.textContent='📍 Raggiungi e apri';button.onclick=async()=>{
    if(!active&&!await enter())return;
    if(currentCity.id!==cityId||panel.hidden||!button.isConnected)return;
    const ref=record.ref,b=record.type==='public'?facilityBounds(ref.block):ref;
    const height=record.type==='home'?HOUSE_TIERS[houseTier(ref.points)].levels*3.15:5;
    flyToWorld({x:b.x,y:Math.max(3,height*.4),z:b.z},{distance:record.type==='public'?120:Math.max(65,height*1.8),elevation:1});
    if(record.type==='public')openPublicWorks(ref);else{panel.hidden=true;if(record.type==='shop')showShopCard(ref);else showCard(ref);}
   };
   row.append(label);
   if(record.type==='shop')row.append(shopLevelDetails(record.ref).details);
   row.append(button);
   list.append(row);
  }
  more.hidden=matching.length<=limit;
 };
 search.oninput=type.onchange=()=>{limit=60;render();};more.onclick=()=>{limit+=60;render();};render();
 if(focusHeading)focusCivicTitle(panel);
}

function leaderboardEntries(residents,limit=10){
 return [...residents].sort((a,b)=>b.points-a.points||a.id-b.id).slice(0,limit);
}
function mountPublicResidentSearch(body,panel,kind){
 const context=document.createElement('p'),city=document.createElement('bdi');
 city.dataset.i18nSkip='true';city.textContent=currentCity.name;context.append(city);
 const form=document.createElement('form');form.className='city-resident-search';
 const label=document.createElement('label');label.htmlFor='publicResidentSearch';label.textContent='Nome utente';
 const search=document.createElement('input');search.id=label.htmlFor;search.type='search';search.required=true;search.autocomplete='off';search.placeholder='@nomeutente';
 const submit=document.createElement('button');submit.type='submit';submit.textContent='Trova nella città';
 const info=document.createElement('p');info.id='publicResidentSearchFeedback';info.setAttribute('role','status');search.setAttribute('aria-describedby',info.id);
 const report=message=>{info.textContent=message;};
 form.onsubmit=async event=>{
  event.preventDefault();
  if(submit.disabled)return;
  const query=search.value.trim().replace(/^@+/,'').trim();
  if(!query){search.value='';search.reportValidity();return;}
  submit.disabled=true;report('');$('search').value=search.value.trim();
  try{
   const found=await findResident(query,kind,report);
   if(found){if(form.isConnected)panel.hidden=true;$('close').focus({preventScroll:true});}
  }finally{submit.disabled=false;}
 };
 search.addEventListener('input',()=>report(''));
 form.append(label,search,submit,info);body.replaceChildren(context,form);
}
function openV4(tab,focusHeading=true){
 localizedPanelRoute={type:'menu',tab};
 if(tab==='works'){openPublicWorks(null,focusHeading);return;}
 if(tab==='directory'){openCityDirectory('all',focusHeading);return;}
 const panel=$('v4Panel'),body=$('v4Body');panel.hidden=false;
 const titles={shop:'Attività',home:'La mia casa',avatar:'Il mio personaggio',world:'Mondo',ranking:'Classifica',works:'Opere'};
 $('v4Title').textContent=titles[tab];delete $('v4Title').dataset.i18nSkip;
 if(tab==='shop'&&window.OwnerAccess?.testMode())body.innerHTML=`<p>Acquisti dimostrativi: nessun pagamento reale.</p><button id="v4Shop">🏪 Aggiungi negozio</button><button id="v4Balloon">🎈 Aggiungi mongolfiera</button><p>${v4.balloons} mongolfiere</p>`;
 if(tab==='home'&&window.OwnerAccess?.testMode())body.innerHTML=`<p>Nella demo la prima casa appartiene a @${homes[0]?.user||'pioniere'}. Non è ancora presente un sistema di accesso personale.</p><button id="v4FindHome">📍 Vai alla mia casa</button><p class="v4Note">La personalizzazione della facciata sarà ampliata nelle prossime versioni.</p>`;
 if(tab==='avatar'&&window.OwnerAccess?.testMode())body.innerHTML=`<p>Un personaggio gratuito per ogni casa. In questa demo puoi individuare il personaggio di @${homes[0]?.user||'pioniere'}.</p><label>Colore della pelle <input type="color" id="v4Skin" value="${v4.skin}"></label><label>Vestiti <input type="color" id="v4Shirt" value="${v4.shirt}"></label><button id="v4FindAvatar">📍 Trova il mio personaggio</button>`;

 if(!window.OwnerAccess?.testMode()){
  if(tab==='shop')body.innerHTML='<p>Scopri le attività della città e le loro evoluzioni.</p><button id="publicBrowseShops">🏪 Esplora le attività</button>';
  if(tab==='home'||tab==='avatar')mountPublicResidentSearch(body,panel,tab==='avatar'?'persona':'casa');
 }
 if(tab==='world')body.innerHTML=`<p>Esplora ${currentCity.name} con la telecamera libera.</p><button id="v4Enter">🌎 Entra nel 3D</button><button id="v4Overview">🧭 Panoramica</button><label><input type="checkbox" id="v4Motion" ${v4.motion?'checked':''}> Animazioni ambientali</label>`;
 if(tab==='ranking'){
  const locale=window.GameI18n?.locale||'it-IT';
  const context=document.createElement('p'),city=document.createElement('bdi');city.dataset.i18nSkip='true';city.textContent=currentCity.name;
  context.append(city,' · ','👥 Abitanti simulati: ',homes.length.toLocaleString(locale));
  const list=document.createElement('ol');list.className='city-rank-list';list.setAttribute('role','list');
  leaderboardEntries(homes).forEach((h,i)=>{
   const row=document.createElement('li');row.className='v4Rank';
   const name=document.createElement('bdi');name.dataset.i18nSkip='true';name.textContent='@'+h.user;
   const rank=document.createElement('span');rank.textContent=(i+1).toLocaleString(locale)+'. ';rank.setAttribute('aria-hidden','true');
   const resident=document.createElement('button');resident.type='button';resident.className='city-rank-resident';resident.title='🏠 Casa #'+String(h.id).padStart(5,'0')+' · @'+h.user;resident.append(rank,name);
   resident.onclick=async()=>{
    resident.disabled=true;
    try{if(await findResident(h.user)&&resident.isConnected){panel.hidden=true;$('close').focus({preventScroll:true});}}
    finally{resident.disabled=false;}
   };
   const points=document.createElement('b');points.textContent='⭐ '+h.points.toLocaleString(locale)+' punti';
   row.append(resident,points);list.append(row);
  });
  body.replaceChildren(context,list);
 }
 if(focusHeading&&['home','avatar','ranking'].includes(tab)){$('v4Title').tabIndex=-1;$('v4Title').focus({preventScroll:true});}

 const wire=(id,fn)=>{if($(id))$(id).onclick=fn};
 wire('publicBrowseShops',()=>openCityDirectory('shop'));
 if(tab==='home'&&!window.OwnerAccess?.testMode()&&window.ShowcaseUI){const note=document.createElement('p');note.textContent=ShowcaseUI.t('request_intro');const request=document.createElement('button');request.type='button';request.textContent=ShowcaseUI.t('request');request.onclick=()=>ShowcaseUI.openRequest();body.append(note,request);}
 // The demo has no login: its first resident is @Carlos75.
 // Use a safe elevated overview rather than placing the camera inside
 // the house, below the map, or too close to the avatar geometry.
 const focus=async(avatar)=>{
  if(!active&&!await enter())return;
  const h=homes[0];if(!h)return;
  const a=avatar?life.people.find(person=>person.home?.id===h.id):null;
  if(avatar&&!a){$('status').textContent='Personaggio non generato';return;}
  if(avatar){
   // Always select the real avatar object, not the home or a guessed offset.
   const anchor=a.g.position;
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
const civicPanelIsOpen=()=>!$('v4Panel').hidden&&['works','square','directory'].includes(localizedPanelRoute?.type);
$('v4Panel').setAttribute('role','region');
$('v4Panel').setAttribute('aria-labelledby','v4Title');
$('v4Close').onclick=()=>{
 if(civicPanelIsOpen())closeCivicPanel();
 else $('v4Panel').hidden=true;
};
$('v4Panel').addEventListener('keydown',event=>{
 if(event.key!=='Escape'||!civicPanelIsOpen())return;
 event.preventDefault();
 event.stopPropagation();
 closeCivicPanel();
});
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
function enterNeighborCity(neighbor,state){if(!active)return;const oldScale=group.userData.roadPlan?.spaceScale||1,offset={x:(state.target.x-neighbor.x)/oldScale,z:(state.target.z-neighbor.z)/oldScale},next=neighbor.city;return CityLoading.run(async()=>{selectCity(next.id,false);WorldRoads.sync(true);await Promise.all([window.WorldBiomes?.load(next),loadWorldSquareCatalog(next)]);if(!await enterNow(rebuildResponsive))return false;const newScale=group.userData.roadPlan?.spaceScale||1;target.x=offset.x*newScale;target.z=offset.z*newScale;target.y=Math.max(2,state.target.y-neighbor.y);distance=state.distance;azimuth=state.azimuth;elevation=state.elevation;updateCamera();$('status').textContent=next.name+' · città raggiunta · '+count.toLocaleString(window.GameI18n?.locale||'it-IT')+' case';return true;},{phase:'travel',priority:30,title:'Prossima fermata: '+next.name+'.',place:next.name,detail:'Prepariamo la città e i suoi dintorni.'}).catch(error=>recoverCityEntry(error,next.id));}
function showNeighborCities(){
 localizedPanelRoute={type:'neighbors'};if(!active)return enter().then(ok=>ok?showNeighborCities():null);const panel=$('v4Panel'),body=$('v4Body');panel.hidden=false;$('v4Title').textContent='Città vicine';delete $('v4Title').dataset.i18nSkip;body.replaceChildren();const items=window.WorldNeighbors?.list()||[];
 if(!items.length){const p=document.createElement('p');p.textContent='Nessuna città collegata visibile in questa zona. Puoi cercare altre località nella mappa.';body.append(p);return;}
 const text=key=>WorldNeighbors.text(key);
 const integrated=[],external=items;const explanation=document.createElement('p');explanation.dataset.i18nSkip='';explanation.textContent=text('explanation');body.append(explanation);
 if(integrated.length){const p=document.createElement('p');p.dataset.i18nSkip='';p.textContent=text('explanation');body.append(p);}
 for(const section of [{key:'within',items:integrated},{key:'outside',items:external}]){if(!section.items.length)continue;const heading=document.createElement('h3');heading.dataset.i18nSkip='';heading.textContent=text(section.key)+' · '+section.items.length;body.append(heading);
 for(const e of section.items){const button=document.createElement('button');button.dataset.i18nSkip='';button.textContent=(e.placeKind==='district'?'🏘 '+text('district')+' · ':'🏙 ')+e.city.name+' · '+(e.distance/1000).toLocaleString(window.GameI18n?.locale||'it-IT',{maximumFractionDigits:1})+' km';if(e.groupSize>1)button.title=text('shared')+' · '+e.groupName;button.onclick=()=>{panel.hidden=true;WorldNeighbors.focus(e.city.id);};body.append(button);}}
}
const neighborButton=document.createElement('button');neighborButton.id='nearbyCities';neighborButton.textContent='🏙 Città vicine';neighborButton.title='Avvicinati alle città collegate';neighborButton.onclick=showNeighborCities;neighborButton.style.cssText='width:auto;min-width:132px;padding:10px 12px;font-size:13px;white-space:nowrap';$('earthControls').style.alignItems='flex-end';$('earthControls').append(neighborButton);
document.addEventListener('pointerdown',e=>{if(e.target.closest?.('#threeLayer'))window.WorldNeighbors?.cancelFlight();},true);
document.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key))window.WorldNeighbors?.cancelFlight();},true);

function ensureRegionalCatalog(city){const atlas=window.WorldAtlas;if(!atlas||atlas.regionReady(city))return Promise.resolve();if(regionalLoad?.id===city.id)return regionalLoad.promise;const promise=CityLoading.run(async()=>{await atlas.loadRegion(city);if(!active||currentCity.id!==city.id)return;WorldRoads.sync(true);await rebuildResponsive();updateCamera();},{phase:'region',priority:25,title:'Il mondo continua, intorno a te.',place:city.name,detail:'Prepariamo le città vicine, le strade e il paesaggio.'}).catch(e=>{console.warn('Catalogo dei dintorni non disponibile',e);});const record={id:city.id,promise};regionalLoad=record;void promise.finally(()=>{if(regionalLoad===record)regionalLoad=null;});return promise;}
const cityLoadingMessage='Non è stato possibile completare il caricamento. Puoi riprovare.';
function cityLoadingError(error){console.error('Caricamento città',error);$('status').textContent=cityLoadingMessage;return false;}
function recoverCityEntry(error,id){
 if(id!==currentCity.id)return false;
 if(renderer&&!threeReady){
  renderer.domElement.remove();
  try{renderer.dispose();}catch(disposalError){console.warn('Pulizia del motore 3D',disposalError);}
  renderer=undefined;
 }
 back();
 const wasSuppressed=suppressMapEntry;
 suppressMapEntry=true;
 try{map.invalidateSize({pan:false});}finally{suppressMapEntry=wasSuppressed;}
 cityLoadingError(error);
 $('cityLoadRetryNotice')?.remove();
 const notice=document.createElement('div');notice.id='cityLoadRetryNotice';notice.className='city-load-retry';
 const message=document.createElement('p');message.setAttribute('role','alert');message.textContent=cityLoadingMessage;
 const retry=document.createElement('button');retry.type='button';retry.textContent='🌎 Entra nel 3D';
 retry.onclick=async()=>{if(!await enter())$('cityLoadRetryNotice')?.querySelector('button')?.focus({preventScroll:true});};
 notice.append(message,retry);$('status').after(notice);
 return false;
}
function enter(){
 if(cityEntryPromise)return cityEntryPromise;
 $('cityLoadRetryNotice')?.remove();
 const city=currentCity,{id,name}=city;
 cityEntryPromise=CityLoading.run(async()=>{
  if(currentCity.id!==id)return false;
  const atlas=window.WorldAtlas;
  const assets=window.SceneAssets?.load();
  const region=atlas&&!atlas.regionReady(city)?atlas.loadRegion(city).then(
   ()=>true,error=>{console.warn('Catalogo regionale non disponibile',error);return false;}
  ):false;
  const [,,updatedRegion]=await Promise.all([assets,window.HouseShowcase?.loadCity(city),region,loadWorldSquareCatalog(city)]);
  if(currentCity.id!==id)return false;
  if(updatedRegion)WorldRoads.sync(true);
  await window.WorldBiomes?.load(city);
  if(currentCity.id!==id)return false;
  return enterNow(rebuildResponsive);
 },{phase:'city',priority:30,title:'La tua città prende forma.',place:name,detail:'Prepariamo edifici, strade e paesaggio.'}).then(async result=>{
  if(regionalLoad?.id===id)await regionalLoad.promise;
  return result;
 }).catch(error=>recoverCityEntry(error,id)).finally(()=>{cityEntryPromise=null;});
 return cityEntryPromise;
}
function rebuild(){if(!threeReady||!active)return Promise.resolve(false);if(pendingRebuildPromise)return pendingRebuildPromise;const id=currentCity.id;pendingRebuildPromise=CityLoading.run(async()=>{if(!active||currentCity.id!==id)return false;await rebuildResponsive();updateCamera();return true;},{phase:'update',priority:20,title:'La città si rinnova.',place:currentCity.name,detail:'Aggiorniamo edifici, dettagli e abitanti.'}).catch(cityLoadingError).finally(()=>{pendingRebuildPromise=null;});return pendingRebuildPromise;}
function setCount(n){if(!active)return setCountNow(n);return CityLoading.run(async()=>{const result=setCountNow(n,()=>{});if(active)await rebuildResponsive();return result;},{phase:'population',priority:25,title:'Una città sempre più viva.',place:currentCity.name,detail:'Prepariamo le case e i servizi per i suoi abitanti.'}).catch(cityLoadingError);}

// Touch users can switch between moving and orbiting without reopening the sidebar.
const touchModeButton=document.createElement('button');touchModeButton.id='touchCameraMode';touchModeButton.type='button';touchModeButton.textContent='↻';touchModeButton.title='Ruota e inclina la visuale';touchModeButton.setAttribute('aria-label',touchModeButton.title);touchModeButton.setAttribute('aria-pressed','false');touchModeButton.onclick=()=>{panMode=!panMode;touchModeButton.textContent=panMode?'↻':'✥';touchModeButton.title=panMode?'Ruota e inclina la visuale':'Sposta la visuale';touchModeButton.setAttribute('aria-label',touchModeButton.title);touchModeButton.setAttribute('aria-pressed',String(!panMode));$('panMode').classList.toggle('selected',panMode);$('orbitMode').classList.toggle('selected',!panMode);};$('earthControls').append(touchModeButton);

// The visitor never receives the simulation markup until the server authorizes it.
let ownerSimulationSnapshot=null;
window.OwnerBridge=Object.freeze({
 async enableTools(payload){
  if(!window.OwnerAccess?.testMode())throw Error('Accesso proprietario richiesto');
  if(document.getElementById('ownerSimulationControls'))return;
  const maps=[cityStates,scoreOverrides,designOverrides,colorOverrides,gardenChoices,shopProgress];
  ownerSimulationSnapshot={maps:maps.map(map=>structuredClone([...map])),v4:{...v4}};
  const template=document.createElement('template');template.innerHTML=payload.html;
  for(const [id,node]of ownerDetachedControls){const placeholder=template.content.querySelector('#'+id);if(!placeholder)continue;const value=node.value;for(const attr of placeholder.attributes)node.setAttribute(attr.name,attr.value);if(!node.childNodes.length)node.replaceChildren(...placeholder.childNodes);if(value)node.value=value;placeholder.replaceWith(node);}
  document.getElementById('cityControls').prepend(template.content);
  syncPopulationControls();syncLocalizedTierOptions();updateDemoHouseLabel();document.body.classList.add('owner-test-mode');
  document.body.classList.remove('wide-city');$('cityPanelToggle').textContent='⛶ Vista ampia';$('cityPanelToggle').setAttribute('aria-expanded','true');
  $('card').style.display='none';$('v4Panel').hidden=true;resize();map.invalidateSize({pan:false});
 },
 async disableTools(){
  document.getElementById('ownerSimulationControls')?.remove();document.body.classList.remove('owner-test-mode');
  if(!ownerSimulationSnapshot)return;
  const maps=[cityStates,scoreOverrides,designOverrides,colorOverrides,gardenChoices,shopProgress];maps.forEach((map,i)=>{map.clear();for(const [key,value]of ownerSimulationSnapshot.maps[i])map.set(key,value);});Object.assign(v4,ownerSimulationSnapshot.v4);ownerSimulationSnapshot=null;
  if(!cityStates.has(currentCity.id))cityStates.set(currentCity.id,{count:currentCity.pop,shops:Math.max(1,Math.round(currentCity.pop/28)),balloons:Math.min(8,Math.max(1,Math.floor(currentCity.pop/380)))});
  const state=cityStates.get(currentCity.id);count=state.count;v4.balloons=state.balloons;homes=createHomes(count);shopPurchases.length=0;for(let i=0;i<state.shops;i++)shopPurchases.push(shopLot(i));
  syncPopulationControls();updateCitySelection();renderMilestones();$('counter').textContent=count.toLocaleString(window.GameI18n?.locale||'it-IT');$('v4Population').textContent=count.toLocaleString(window.GameI18n?.locale||'it-IT');$('card').style.display='none';$('v4Panel').hidden=true;$('v4Body').replaceChildren();$('details').replaceChildren();
  if(active)await rebuild();
 }
});


// Language changes repaint sign textures, preserving geometry, shadows and camera state.
function syncLocalizedTierOptions(){for(const option of $('demoScore').options){const tier=HOUSE_TIERS.find(entry=>entry.min===Number(option.value));if(tier)option.textContent=tier.min.toLocaleString(window.GameI18n?.locale||'it-IT')+' punti · '+tier.name+' ('+tier.levels+(tier.levels===1?' piano)':' piani)');}}
function refreshLocalizedSceneText(){
 if(!group)return 0;const textures=new Set();group.traverse(object=>{for(const material of Array.isArray(object.material)?object.material:[object.material]){const texture=material?.map;if(texture?.userData?.i18nBillboard)textures.add(texture);}});
 for(const texture of textures){const meta=texture.userData.i18nBillboard,replacement=billboardTexture(meta.lines,meta.background,meta.options);texture.image=replacement.image;texture.userData.i18nBillboard=replacement.userData.i18nBillboard;texture.needsUpdate=true;replacement.dispose();}
 window.WorldNeighbors?.refreshLabels?.();return textures.size;
}
function captureLocalizedForm(root){return [...root.querySelectorAll('input,select')].map(node=>({tag:node.tagName,type:node.type,value:node.value,checked:node.checked}));}
function restoreLocalizedForm(root,fields){const nodes=[...root.querySelectorAll('input,select')];fields.forEach((field,i)=>{const node=nodes[i];if(!node||node.tagName!==field.tag||node.type!==field.type)return;node.value=field.value;if(node.type==='checkbox')node.checked=field.checked;});for(const node of nodes)if(node.type==='search'&&node.oninput)node.oninput();}
window.GameI18n?.onChange(async()=>{
 const cardOpen=$('card').style.display!=='none',panelOpen=!$('v4Panel').hidden,cardFields=cardOpen?captureLocalizedForm($('details')):[],panelFields=panelOpen?captureLocalizedForm($('v4Body')):[],draftPopulation=$('populationExact').value;
 syncLocalizedTierOptions();syncPopulationControls();if(window.OwnerAccess?.testMode()&&draftPopulation!==String(count))$('populationExact').value=draftPopulation;
 updateCitySelection();renderMilestones();$('counter').textContent=count.toLocaleString(GameI18n.locale);$('v4Population').textContent=count.toLocaleString(GameI18n.locale);
 if(active)refreshLocalizedSceneText();
 if(cardOpen&&localizedOwnerCard){showOwnerCard(localizedOwnerCard.h,localizedOwnerCard.kind,localizedOwnerCard.selected);restoreLocalizedForm($('details'),cardFields);}
 if(panelOpen&&localizedPanelRoute){const route=localizedPanelRoute;if(route.type==='square')openSquareDetailPanel(false);else if(route.type==='works')openPublicWorks(route.selected,false,route.phaseStates);else if(route.type==='directory')openCityDirectory(route.defaultType,false);else if(route.type==='neighbors')showNeighborCities();else openV4(route.tab,false);restoreLocalizedForm($('v4Body'),panelFields);}
});
window.GameI18n?.registerAudit(()=>{const textures=new Set();group?.traverse(object=>{for(const material of Array.isArray(object.material)?object.material:[object.material])if(material?.map?.userData?.i18nBillboard)textures.add(material.map);});return [...textures].map(texture=>({source:texture.userData.i18nBillboard.lines,rendered:texture.userData.i18nBillboard.rendered,locale:texture.userData.i18nBillboard.locale,width:texture.image.width,height:texture.image.height}));});

