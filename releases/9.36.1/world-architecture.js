/* Country-aware architectural language for homes, businesses and civic buildings. */
(function(){'use strict';
const profile=(id,name,roof,detail,homeWalls,homeRoofs,shop,civic)=>Object.freeze({id,name,roof,detail,homeWalls,homeRoofs,shop,civic});
const profiles={
 mediterranean:profile('mediterranean','Mediterraneo','terracotta','shutters',[0xe9c992,0xf1dfbd,0xd8a77f,0xf4ead0],[0xa84f36,0xb8643e,0x8d4935],{wall:0xd9bd91,trim:0x795444},{wall:0xe4d5b8,trim:0x9a714e}),
 italy:profile('italy','Italia urbana e borghi','terracotta','loggia',[0xefd6a4,0xe5b789,0xf3e4c8,0xd79b78],[0xa34832,0xb95e39,0x8f3f31],{wall:0xe4c18f,trim:0x7d4d3a},{wall:0xe8d8bd,trim:0x9f7950}),
 iberian:profile('iberian','Iberico','terracotta','arcade',[0xf0d3a1,0xe7b883,0xf4e2c2,0xd99570],[0xa74c35,0xb7603e,0x874334],{wall:0xe0b984,trim:0x78513d},{wall:0xe7d2af,trim:0xa0794f}),
 maghreb:profile('maghreb','Maghreb e medina','flat','mashrabiya',[0xd9ad76,0xe7c48f,0xc98e60,0xead7ae],[0x9b6a48,0xb17a50,0x76513c],{wall:0xd2a16c,trim:0x477d78},{wall:0xddc19a,trim:0x8b6043}),
 argentina:profile('argentina','Argentina rioplatense','terrace','cornice',[0xe6d0b1,0xd9a98d,0xf0dfc5,0xc98c79],[0x8c5a49,0xa66a50,0x6f4b43],{wall:0xd8b59c,trim:0x596e72},{wall:0xe1d2bd,trim:0x7d6b5c}),
 brazil:profile('brazil','Brasile tropicale','hip','veranda',[0xe4a177,0xe8c66f,0x8fc5ae,0xd8898b],[0xa44e3e,0xc06a42,0x5d7458],{wall:0xd69b71,trim:0x3f786d},{wall:0xdacbb0,trim:0x557c70}),
 andean:profile('andean','Andino','terrace','stonebase',[0xd7b38b,0xc89472,0xe2c9a4,0xb58d73],[0x8b5843,0x6c5145,0xa46c49],{wall:0xcba47f,trim:0x66584d},{wall:0xd8c6a8,trim:0x786653}),
 british:profile('british','Gran Bretagna','steep','bay',[0xb56e5e,0xc18a72,0xd6b59a,0x9f6258],[0x4c5260,0x59616c,0x39424d],{wall:0xb9846f,trim:0x3f4a55},{wall:0xd0c7b8,trim:0x535a62}),
 french:profile('french','Francia','mansard','balcony',[0xe4d5bd,0xd2c0a7,0xeadfcd,0xc7af95],[0x565d65,0x646b72,0x454b53],{wall:0xd8c6aa,trim:0x59636a},{wall:0xe2d9c9,trim:0x77736b}),
 central:profile('central','Europa centrale','steep','timber',[0xe2c9a8,0xd9b78d,0xcfa27d,0xe9dcc5],[0x875341,0x6b4a3f,0x4e555a],{wall:0xd0b08b,trim:0x5a5149},{wall:0xded1ba,trim:0x686256}),
 nordic:profile('nordic','Nordico','steep','wood',[0xb85e52,0xd2a65c,0x8da8a3,0xd7d0bd],[0x3f4650,0x515b62,0x343b44],{wall:0xb99372,trim:0x40565a},{wall:0xd3d2ca,trim:0x58666a}),
 northamerican:profile('northamerican','Nordamericano','gable','porch',[0xd3c5ad,0xb5c6c2,0xd8b49c,0xc6b58d],[0x565e67,0x76564b,0x3f4a52],{wall:0xb9aa91,trim:0x3e5965},{wall:0xd3d0c5,trim:0x59646b}),
 mexican:profile('mexican','Messico','flat','courtyard',[0xdf9c63,0xd46e58,0xe9c26d,0xb86f62],[0x9b543e,0xb16d43,0x71483d],{wall:0xd18a5d,trim:0x4d7d77},{wall:0xd8bd91,trim:0x80604b}),
 chinese:profile('chinese','Cina','tiered','redframe',[0xd9c39c,0xcbb28a,0xe2d2b0,0xb99e7b],[0x3d4d4b,0x465955,0x6d4038],{wall:0xcbb28e,trim:0x8f3130},{wall:0xd6c7aa,trim:0x883c34}),
 japanese:profile('japanese','Giappone','layered','screens',[0xcdbfa8,0xb9ad99,0xd8cdbb,0xa99e8c],[0x3d4547,0x4d5352,0x30383b],{wall:0xc6bba6,trim:0x4e4037},{wall:0xd2cabb,trim:0x55514b}),
 korean:profile('korean','Corea','layered','screens',[0xd8ccba,0xc2b4a0,0xe4d9c8,0xb7aa97],[0x4d5554,0x59635d,0x394342],{wall:0xcec2ae,trim:0x425d61},{wall:0xdad2c3,trim:0x5c6261}),
 southeastasian:profile('southeastasian','Sud-est asiatico','widehip','screen',[0xd1a875,0xe0c38e,0xb58d65,0xd8b78b],[0x684b3d,0x7a5942,0x4e453d],{wall:0xc9a578,trim:0x456c64},{wall:0xd3c2a5,trim:0x65705e}),
 indian:profile('indian','Subcontinente indiano','terrace','jali',[0xe0aa72,0xe7c587,0xce8465,0xdbc09a],[0x9e5e46,0xb1724b,0x6f4d42],{wall:0xd3a06c,trim:0x79506a},{wall:0xdcc6a2,trim:0x8a604b}),
 gulf:profile('gulf','Golfo','flat','screen',[0xe2c79d,0xead8b5,0xd4b184,0xf0e3c8],[0x9b8063,0xb59a77,0x756354],{wall:0xd9c19a,trim:0x3f6d72},{wall:0xe4d8c0,trim:0x756b5b}),
 african:profile('african','Africa urbana','widehip','screen',[0xd3a06e,0xc48463,0xe0b97f,0xb6785c],[0x8a543e,0x725044,0xa26943],{wall:0xc69769,trim:0x47685b},{wall:0xd4c0a0,trim:0x6a624f}),
 southernafrican:profile('southernafrican','Africa australe','hip','veranda',[0xd5b28b,0xc89570,0xe0ccb0,0xb77e62],[0x875441,0x63524b,0x9a694a],{wall:0xcba27d,trim:0x50675e},{wall:0xd8cbb7,trim:0x66665d}),
 eastern:profile('eastern','Europa orientale','steep','cornice',[0xd0b69d,0xc39379,0xdac8b2,0xaa806f],[0x694b45,0x4f5960,0x7a5144],{wall:0xc4a58c,trim:0x565d61},{wall:0xd5ccbd,trim:0x696661}),
 oceanic:profile('oceanic','Oceania','widehip','veranda',[0xd5bd96,0xc99a72,0xe0d2b8,0xaebbb2],[0x5d5d58,0x765343,0x47535a],{wall:0xc4aa86,trim:0x49636a},{wall:0xd4d0c3,trim:0x606b6c})
};
const direct={IT:'italy',MA:'maghreb',DZ:'maghreb',TN:'maghreb',AR:'argentina',UY:'argentina',BR:'brazil',GB:'british',IE:'british',CN:'chinese',HK:'chinese',MO:'chinese',TW:'chinese',JP:'japanese',KR:'korean',KP:'korean',US:'northamerican',CA:'northamerican',MX:'mexican',IN:'indian',PK:'indian',BD:'indian',LK:'indian',NP:'indian',FR:'french',DE:'central',AT:'central',CH:'central',CZ:'central',SK:'central',HU:'central',PL:'central',ES:'iberian',PT:'iberian',ID:'southeastasian',MY:'southeastasian',SG:'southeastasian',TH:'southeastasian',VN:'southeastasian',KH:'southeastasian',LA:'southeastasian',PH:'southeastasian',TR:'mediterranean',GR:'mediterranean',CY:'mediterranean',EG:'maghreb',SA:'gulf',AE:'gulf',QA:'gulf',KW:'gulf',BH:'gulf',OM:'gulf',IL:'mediterranean',JO:'gulf',LB:'mediterranean',IR:'gulf',IQ:'gulf',NG:'african',GH:'african',KE:'african',ET:'african',TZ:'african',UG:'african',ZA:'southernafrican',NA:'southernafrican',BW:'southernafrican',ZW:'southernafrican',RU:'eastern',UA:'eastern',BY:'eastern',RO:'eastern',BG:'eastern',RS:'eastern',AU:'oceanic',NZ:'oceanic',CL:'andean',PE:'andean',BO:'andean',EC:'andean',CO:'andean',VE:'andean',PY:'argentina',NO:'nordic',SE:'nordic',FI:'nordic',DK:'nordic',IS:'nordic',NL:'central',BE:'french'};
const inherited={AD:'ES',MC:'FR',SM:'IT',VA:'IT',LI:'CH',LU:'BE',MT:'IT',GI:'GB',IM:'GB',JE:'GB',GG:'GB',FO:'DK',AX:'FI',GL:'DK',PR:'US',VI:'US',GU:'US',AS:'US',MP:'US',BM:'GB',KY:'GB',TC:'GB',VG:'GB',AI:'GB',MS:'GB',BL:'FR',MF:'FR',GP:'FR',MQ:'FR',GF:'FR',RE:'FR',YT:'FR',PM:'FR',AW:'NL',CW:'NL',SX:'NL',BQ:'NL',CC:'AU',CX:'AU',NF:'AU',CK:'NZ',NU:'NZ',TK:'NZ',PN:'GB',FK:'GB'};
const continentFallback={EU:'central',AS:'southeastasian',AF:'african',NA:'northamerican',SA:'andean',OC:'oceanic',AN:'oceanic'};
function resolve(code,continent){
 code=(code||'').toUpperCase();const source=inherited[code]||code;
 const id=direct[source]||continentFallback[continent]||'mediterranean';
 return Object.freeze({...profiles[id],countryCode:code,inheritedFrom:inherited[code]||null,documented:!!direct[code]});
}
function forCity(city){return resolve(city?.countryCode,city?.continent);}
window.WorldArchitecture=Object.freeze({profiles,direct:Object.freeze(direct),inherited:Object.freeze(inherited),resolve,forCity});
})();
