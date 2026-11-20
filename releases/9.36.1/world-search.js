/* Global, lazy search and country boundaries. Data sources are documented in GEOGRAPHY_SOURCES.md. */
(function(){'use strict';
const atlas=window.WorldAtlas,DATA='releases/9.31.0/search-data/',cache=new Map(),residentCities=new Map(),locales=['it','en','es','fr','pt-BR','de','ar','ja','zh-Hans','id'];
const norm=s=>String(s).normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim(),handle=s=>String(s).trim().replace(/^@+/,'').toLowerCase();
const text={loading:['Cerco nel mondo…','Searching worldwide…','Buscando en el mundo…','Recherche mondiale…','Buscando no mundo…','Weltweite Suche…','جارٍ البحث عالميًا…','世界中を検索中…','正在全球搜索…','Mencari di seluruh dunia…'],empty:['Nessun risultato. Prova un altro nome.','No results. Try another name.','Sin resultados. Prueba otro nombre.','Aucun résultat. Essaie un autre nom.','Nenhum resultado. Tente outro nome.','Keine Ergebnisse. Versuche einen anderen Namen.','لا نتائج. جرّب اسمًا آخر.','見つかりません。別の名前をお試しください。','没有结果，请尝试其他名称。','Tidak ada hasil. Coba nama lain.'],error:['Ricerca non disponibile. Riprova.','Search unavailable. Please try again.','Búsqueda no disponible. Inténtalo de nuevo.','Recherche indisponible. Réessaie.','Pesquisa indisponível. Tente novamente.','Suche nicht verfügbar. Bitte erneut versuchen.','البحث غير متاح. حاول مجددًا.','検索できません。もう一度お試しください。','搜索暂不可用，请重试。','Pencarian tidak tersedia. Coba lagi.'],hint:['Scrivi almeno due lettere per cercare una città.','Type at least two letters to find a city.','Escribe al menos dos letras para buscar una ciudad.','Saisis au moins deux lettres pour chercher une ville.','Digite pelo menos duas letras para buscar uma cidade.','Gib mindestens zwei Buchstaben ein, um eine Stadt zu suchen.','اكتب حرفين على الأقل للبحث عن مدينة.','都市の検索には2文字以上入力してください。','请输入至少两个字符搜索城市。','Ketik minimal dua huruf untuk mencari kota.'],country:['Paese o territorio','Country or territory','País o territorio','Pays ou territoire','País ou território','Land oder Gebiet','دولة أو إقليم','国・地域','国家或地区','Negara atau wilayah']};
function t(key){return text[key]?.[Math.max(0,locales.indexOf(window.GameI18n?.locale||'it'))]||key;}
function countryName(c){return window.GameI18n?.country(c.code,c.name)||c.name;}
const countryAliases=new Map();for(const c of atlas.countries.values()){const names=[c.code,c.name,c.originalName];for(const locale of locales)try{names.push(new Intl.DisplayNames([locale],{type:'region'}).of(c.code));}catch{}countryAliases.set(c.code,[...new Set(names.filter(Boolean).map(norm))]);}
function searchCountries(query,limit=4){const q=norm(query);if(!q)return[];return [...atlas.countries.values()].map(c=>({c,names:countryAliases.get(c.code)})).filter(e=>e.names.some(n=>n.includes(q))).sort((a,b)=>Number(b.names.includes(q))-Number(a.names.includes(q))||countryName(a.c).localeCompare(countryName(b.c))).slice(0,limit).map(e=>e.c);}
function bucket(query){let h=0;for(const ch of [...norm(query)].slice(0,2))h=(h*31+ch.codePointAt(0))>>>0;return h%128;}
async function unpack(path){const r=await fetch(DATA+path);if(!r.ok)throw Error('Search data '+r.status);const p=await r.json();if(p.encoding!=='gzip-base64')throw Error('Invalid search data');const bytes=Uint8Array.from(atob(p.data),c=>c.charCodeAt(0));return JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text());}
// The compact world buckets do not carry every GeoNames alias loaded by the atlas.
// YesMilano also uses the simplified Chinese name 米兰 for Milan.
// Vitoria-Gasteiz uses the joined name in its municipal tourism directory.
const extraCityAliases=new Map([
 [3173435,['米兰']],
 [3104499,['Vitoria-Gasteiz','Vitoria']],
 [3164603,['Venezia']],
]);
// GeoNames gives the municipality and Madrid's district the same primary name.
const placeSearchHints=new Map([
 [3111108,{region:'Castilla y León',aliases:['Salamanca Castilla y León']}],
 [6544491,{region:'Madrid',aliases:['Salamanca Madrid'],municipality:'gn-3111108'}],
]);
const cityNames=city=>[city.name,city.asciiName,...(city.aliases||[])].filter(Boolean);
const atlasAliases=id=>[...(atlas.meta.aliases?.[id]||[]),...(extraCityAliases.get(id)||[]),...(placeSearchHints.get(id)?.aliases||[])];
const bootstrapCities=[...new Set(atlas.byId.values())].filter(city=>city.geoVerified!==false&&atlas.countries.has(city.countryCode)).map(city=>{
 const aliases=[...new Set([...(city.aliases||[]),...atlasAliases(city.geonameId)])];
 return {id:city.id,countryCode:city.countryCode,name:city.name,asciiName:city.asciiName,aliases,population:city.realPopulation||city.rankWeight||0,hint:placeSearchHints.get(city.geonameId)};
});
function cityExact(city,query){const q=norm(query);return !!q&&cityNames(city).some(name=>norm(name)===q);}
async function searchCities(query,limit=6){
 const q=norm(query);
 if(!q)return [];
 const single=[...q].length===1,matches=new Map();
 function add(city){
  const names=cityNames(city).map(name=>({name,normalized:norm(name)}));
  const exact=names.find(({normalized})=>normalized===q);
  const exactPrimary=[city.name,city.asciiName].some(name=>name&&norm(name)===q);
  const rank=exactPrimary?0:exact?1:single?Infinity:names.some(({normalized})=>normalized.startsWith(q))?2:names.some(({normalized})=>normalized.includes(q))?3:Infinity;
  if(!Number.isFinite(rank))return;
  const previous=matches.get(city.id);
  if(!previous||rank<previous.rank)matches.set(city.id,{city,rank,matchedName:exact?.name});
 }
 for(const city of bootstrapCities)add(city);
 const key=bucket(q);
 if(!cache.has(key)){
  const pending=unpack(key+'.json').catch(error=>{cache.delete(key);throw error;});
  cache.set(key,pending);
  while(cache.size>16)cache.delete(cache.keys().next().value);
 }
 try{
  const rows=await cache.get(key);
  for(const [id,countryCode,name,asciiName,population,aliases] of rows){
   const place=atlas.byId.get('gn-'+id);
   add({id:place?.id||'gn-'+id,countryCode,name:place?.name||name,asciiName:place?.asciiName||asciiName,population,hint:placeSearchHints.get(id),aliases:[name,asciiName,...(aliases||[]),...atlasAliases(id)]});
  }
 }catch(error){if(![...matches.values()].some(match=>match.rank<=1))throw error;}
 function rankPopulation({city,rank}){
  const municipality=matches.get(city.hint?.municipality);
  return municipality?.rank===rank?Math.min(city.population,municipality.city.population-.5):city.population;
 }
 const ranked=[...matches.values()].sort((a,b)=>a.rank-b.rank||rankPopulation(b)-rankPopulation(a)||a.city.id.localeCompare(b.city.id));
 const hasExactPrimary=ranked[0]?.rank===0;
 return ranked.slice(0,limit).map(({city,rank,matchedName})=>({
  id:city.id,countryCode:city.countryCode,name:city.name,asciiName:city.asciiName,aliases:city.aliases,region:city.hint?.region,
  matchedName:rank===1&&hasExactPrimary?undefined:matchedName,
 }));
}
function rememberResidents(city,rows){residentCities.delete(city.id);residentCities.set(city.id,rows.map(h=>({user:h.user,cityId:city.id,cityName:city.name,residentId:h.id})));while(residentCities.size>12)residentCities.delete(residentCities.keys().next().value);}
function searchResidents(query,limit=4){const q=handle(query);if(!q)return[];const records=new Map();for(const rows of residentCities.values())for(const h of rows)if(handle(h.user).includes(q))records.set(h.cityId+':'+handle(h.user),h);for(const h of simulatedComments){if(!handle(h.user).includes(q))continue;const city=atlas.byId.get(h.cityId);records.set(h.cityId+':'+handle(h.user),{...h,cityName:city?.name||h.cityId});}return [...records.values()].sort((a,b)=>Number(handle(b.user)===q)-Number(handle(a.user)===q)||Number(b.cityId===currentCity.id)-Number(a.cityId===currentCity.id)||a.cityName.localeCompare(b.cityName)).slice(0,limit);}
async function openCity(c){await (window.WorldDirectory?.selectCountry(c.countryCode)||atlas.loadCountry(c.countryCode));const city=atlas.byId.get(c.id);if(!city)throw Error('City not available');clearCountry();selectCity(city.id,true);return city;}
async function openResident(h){clearCountry();const city=atlas.byId.get(h.cityId);if(city&&document.getElementById('worldCountry')?.value!==city.countryCode)await(window.WorldDirectory?.selectCountry(city.countryCode)||atlas.loadCountry(city.countryCode));if(city&&city.id!==currentCity.id)selectCity(city.id,false);const found=await findResident(h.user);if(!found)throw Error('Resident not found');return found;}
let borderPromise,borderData,borderLayer,focusLayer,selectedCountry=null;
function loadBorders(){if(borderPromise)return borderPromise;borderPromise=unpack('countries.json').then(data=>{borderData=data;for(const f of data.features){const a=countryAliases.get(f.properties.code);if(a)for(const name of f.properties.aliases||[])if(!a.includes(norm(name)))a.push(norm(name));}for(const [name,z]of [['countryBorders',450],['countryFocus',451]])if(!map.getPane(name)){const p=map.createPane(name);p.style.zIndex=z;p.style.pointerEvents='none';}borderLayer=L.geoJSON(data,{pane:'countryBorders',interactive:false,style:{color:'#587b6b',weight:1,opacity:.82,fill:false,smoothFactor:1.3}}).addTo(map);map.attributionControl?.addAttribution('Confini: <a href="https://www.naturalearthdata.com/">Natural Earth</a>');return data;}).catch(e=>{borderPromise=null;throw e;});return borderPromise;}
function clearCountry(){if(focusLayer)map.removeLayer(focusLayer);focusLayer=null;selectedCountry=null;document.body.classList.remove('country-focus');}
function countryFeature(code){return borderData?.features.find(f=>f.properties.code===code);}
function frameFor(feature,country){const lng=country.center[1],unwrap=x=>x+360*Math.round((lng-x)/360),polys=feature.geometry.coordinates.map(poly=>poly.map(r=>r.map(p=>[unwrap(p[0]),p[1]]))),boxes=polys.map(p=>{const r=p[0];return{w:Math.min(...r.map(p=>p[0])),e:Math.max(...r.map(p=>p[0])),s:Math.min(...r.map(p=>p[1])),n:Math.max(...r.map(p=>p[1]))};}),distance=b=>Math.hypot(Math.max(b.w-lng,0,lng-b.e),Math.max(b.s-country.center[0],0,country.center[0]-b.n)),main=[...boxes].sort((a,b)=>distance(a)-distance(b)||(b.e-b.w)*(b.n-b.s)-(a.e-a.w)*(a.n-a.s))[0],local=boxes.filter(b=>b.e>=main.w-30&&b.w<=main.e+30&&b.n>=main.s-25&&b.s<=main.n+25);return{feature:{...feature,geometry:{type:'MultiPolygon',coordinates:polys}},bounds:[[Math.max(-85,Math.min(...local.map(b=>b.s))),Math.min(...local.map(b=>b.w))],[Math.min(85,Math.max(...local.map(b=>b.n))),Math.max(...local.map(b=>b.e))]]};}
async function showCountry(code){const country=atlas.countries.get(code);if(!country)return;await Promise.all([loadBorders(),window.WorldDirectory?.selectCountry(code)||atlas.loadCountry(code)]);const feature=countryFeature(code);if(!feature)throw Error('Country boundary not available');if(active)back();clearCountry();selectedCountry=code;document.body.classList.add('country-focus');const frame=frameFor(feature,country);focusLayer=L.geoJSON(frame.feature,{pane:'countryFocus',interactive:false,style:{color:'#a36a08',weight:2.5,opacity:1,fillColor:'#ffd357',fillOpacity:.27}}).addTo(map);focusLayer.bindTooltip(countryName(country),{permanent:true,direction:'center',className:'world-country-label'}).openTooltip([(frame.bounds[0][0]+frame.bounds[1][0])/2,(frame.bounds[0][1]+frame.bounds[1][1])/2]);manualCityNavigation=true;suppressMapEntry=true;try{map.fitBounds(frame.bounds,{paddingTopLeft:[22,225],paddingBottomRight:[22,145],maxZoom:16});}finally{manualCityNavigation=false;suppressMapEntry=false;}document.getElementById('status').textContent=countryName(country);return country;}
window.WorldSearch={normalize:norm,bucket,t,countryExact:(c,q)=>countryAliases.get(c.code)?.includes(norm(q)),cityExact,searchCountries,searchCities,searchResidents,rememberResidents,openCity,openResident,showCountry,clearCountry,loadBorders,frameFor,getSelectedCountry:()=>selectedCountry};rememberResidents(currentCity,homes);window.GameI18n?.onChange(()=>{if(selectedCountry&&focusLayer)focusLayer.setTooltipContent(countryName(atlas.countries.get(selectedCountry)));});void loadBorders().catch(()=>{});
})();
