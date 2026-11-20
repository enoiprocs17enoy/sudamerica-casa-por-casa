/* Source-driven 3D square details. Models are stylised reconstructions, not scans. */
(function(){
'use strict';
const MODEL_SPECS={'trujillo-liberty-monument':{height:14.85,width:11.5,depth:11.5,parcelWidth:.28},'alcazar-cervantes-riders':{height:6.5,width:6.6,depth:5.1},'gravina-benedict-statue':{height:6.2,width:3.4,depth:3.4},'ceglie-clock-tower':{height:12,width:5,depth:4.7},'assisi-three-lions-fountain':{height:3.75,width:7.5,depth:7.5},'verrazzano-memorial':{height:7.2,width:4.3,depth:4.3},herterichsbrunnen:{height:5.1,width:7.7,depth:7.7,parcelWidth:.5},'iquique-naval-monument':{height:13.3,width:8.2,depth:8.2},'floral-calendar':{height:1.2,width:8},'arenales-ensemble':{height:11,width:10},'freedom-chains':{height:7,width:5},pyramid:{height:13,width:7},obelisk:{height:10,width:3},column:{height:10,width:4},'liberty-column':{height:13,width:6},equestrian:{height:8,width:7},'equestrian-fountain':{height:8,width:9},'standing-sword':{height:7,width:4},'standing-civil':{height:10,width:7},'ornate-fountain':{height:7,width:9},'liberty-fountain':{height:7,width:8},fountain:{height:3,width:6},bust:{height:4,width:3},plaque:{height:1.5,width:2},'classical-figure':{height:3,width:2}};
MODEL_SPECS['fray-bentos-bandstand']={height:6.2,width:7.5,depth:7.5};
MODEL_SPECS['paraitinga-bandstand']={height:5.6,width:7.5,depth:7.5};
MODEL_SPECS['accademia-conegliano']={height:15,width:32,depth:18,parcelWidth:.80};
MODEL_SPECS['stone-sphinx']={height:3.15,width:3.6};
MODEL_SPECS['trogir-clock-tower']={height:13.3,width:5.2,depth:3.8};
MODEL_SPECS['condamine-market-hall']={height:9.4,width:21.4,depth:60,parcelWidth:.56};
MODEL_SPECS['hvar-pjaca-well']={height:1.05,width:2.6,depth:4.4};
MODEL_SPECS['hallstatt-trinity-column']={height:6.1,width:3.4};
MODEL_SPECS['palmanova-stendardo']={height:11.5,width:8.4};
MODEL_SPECS['arequipa-tuturutu']={height:5.5,width:10};
MODEL_SPECS['warsaw-old-town-mermaid']={height:3.43,width:2.65,depth:2.45};
MODEL_SPECS['pimpri-ambedkar-pavilion']={height:7.4,width:5.2,depth:5.2};
MODEL_SPECS['mumbai-flora-fountain']={height:10.1,width:12.4,depth:12.4,parcelWidth:.42};
MODEL_SPECS['mumbai-martyrs-memorial']={height:6.5,width:4.24,depth:3.54};
Object.assign(MODEL_SPECS,{
 'orange-robertson-rotunda':{height:5.5,width:9.2,depth:9.2,parcelWidth:.4},
 'orange-whitney-fountain':{height:3.4,width:6,depth:6},
 'orange-boer-lamp':{height:5.1,width:3.3,depth:3.3},
 'blitar-pecut-fountain':{height:6.4,width:28,depth:28,parcelWidth:.50},
 'corona-subway-stairs':{height:3.65,width:2.25,depth:6.65},
 'corona-information-board':{height:2.16,width:1.24,depth:.23},
 'corona-wayfinding-map':{height:2.35,width:.79,depth:.24},
 'corona-cycle-stands':{height:.90,width:1.75,depth:.77},
 'corona-water-fountain':{height:1.06,width:.54,depth:.48},
 'roberto-clemente-para-roberto':{height:3.81,width:3.68,depth:3.68},
 'washington-arch':{height:9.2,width:7.7,depth:2.9,parcelWidth:.38},
 'vientiane-patuxay-gate':{height:42,width:24,depth:24,parcelWidth:.50},
 'vientiane-patuxay-fountain':{height:3.25,width:34,depth:34,parcelWidth:.55},
 'washington-fountain':{height:2.25,width:7.4,depth:7.4,parcelWidth:.52},
 'washington-garibaldi':{height:6.3,width:3.05,depth:3.05},
 'holley-monument':{height:3.8,width:3.15,depth:1.2},
 'toronto-archer':{height:3.5,width:3.6,depth:2.6},
 'boston-embrace':{height:6.1,width:9.76,depth:8.0,parcelWidth:.50},
 'franklin-fountain':{height:2.5,width:6.8,depth:6.8,parcelWidth:.51},
 'freedom-arches':{height:4.8,width:9.9,depth:6.8,parcelWidth:.64},
 'liberty-carousel':{height:5.2,width:7.8,depth:7.8,parcelWidth:.25},
 'telc-marian-column':{height:11.5,width:8.7,depth:8.7},
 'telc-margaret':{height:4.2,width:6.9,depth:6.9},
 'telc-silenus':{height:3.5,width:6.9,depth:6.9},
 'se-dialogo':{height:4.8,width:5.3,depth:2.05},
 'santiago-cardenal-caro':{height:5.1,width:2.3,depth:2.1},
 'se-anchieta':{height:9.37,width:2.6,depth:2.05},
 'marco-zero':{height:1.15,width:5.7,depth:5.7,parcelWidth:.3},
 'dam-memorial':{height:12,width:6.9,depth:6.9,parcelWidth:.4},
 'senate-monument':{height:8.9,width:6.8,depth:6.8,parcelWidth:.42},
 'preseren-monument':{height:7.2,width:5.2,depth:5.2,parcelWidth:.39},
 'marianne-republique':{height:12,width:7.5,depth:7.5,parcelWidth:.42},
 'bundesplatz-jets':{height:4.0,width:14,depth:14,parcelWidth:.65},
 'flagpole':{height:8,width:.65},
 'tiananmen-flagpole':{height:7.5,width:3.8,depth:3.4},
 'peoples-heroes-memorial':{height:7.52,width:10,depth:12.2,parcelWidth:.40},
 'chairman-mao-memorial-hall':{height:4.12,width:10,depth:10,parcelWidth:.42},
 'liberty-paifang':{height:6,width:16,depth:2.15,parcelWidth:.70},
 'san-gimignano-cistern':{height:1.65,width:4.5,depth:4.5},
 'nankinmachi-azumaya':{height:6.6,width:4.92,depth:4.92,parcelWidth:.45},
 'tabaco-plaza-gazebo':{height:4.8,width:6.4,depth:6.4,parcelWidth:.34},
 'bratislava-maximilian-fountain':{height:10.5,width:10.4,depth:8.6},
 'bratislava-city-guard':{height:2.68,width:.91,depth:1.42},
 'bratislava-napoleonic-soldier':{height:1.53,width:1.80,depth:1.18},
 'jicin-coronation-well':{height:7,width:7.2,depth:3.9,parcelWidth:.5},
 'jicin-marian-column':{height:11,width:5.3,depth:5.3,parcelWidth:.5},
 'nguyen-hue-ho-chi-minh':{height:7.2,width:3.4,depth:3.1,parcelWidth:.5},
 'jicin-amphitrite-fountain':{height:3.9,width:6.35,depth:6.1,parcelWidth:.5},
 'andorra-casa-de-la-vall':{height:14.5,width:20.6,depth:17.2,parcelWidth:.7},
 'ordino-comunidor':{height:4.86,width:4.35,depth:4.8},
 'solsona-ca-aguilar-porch':{height:9.6,width:8.85,depth:4.4},
 'barcelona-generalitat-facade':{height:18.4,width:36.55,depth:6.4,parcelWidth:.92},
 'barcelona-city-hall-facade':{height:16.75,width:46.7,depth:6,parcelWidth:.92},
 'girona-defenders-monument':{height:5.66,width:5.55,depth:8.45},
 'girona-turtle-fountain':{height:1.91,width:1.40,depth:1.47},
 'girona-independencia-newsstand':{height:2.95,width:4.30,depth:3.11},
 'cuenca-calderon-monument':{height:6.5,width:3.9,depth:3.9},
 'cuenca-calderon-glorieta':{height:4.8,width:7.2,depth:7.2},
 'budapest-millennium-column':{height:40.5,width:17,depth:17,parcelWidth:.5},
 'budapest-millennium-colonnade-north':{height:8.2,width:38,depth:14,parcelWidth:.85},
 'budapest-millennium-colonnade-east':{height:8.2,width:16,depth:38,parcelWidth:.85},
 'budapest-heroes-memorial-stone':{height:.85,width:10,depth:6,parcelWidth:.5},
 'luanda-agostinho-neto-memorial':{height:120,width:48,depth:46,parcelWidth:.8},
 'brooklyn-gaynor-memorial':{height:3.2,width:5.13,depth:1.85},
 'brooklyn-war-memorial':{height:5.6,width:15.44,depth:8.3},
 'dakar-independence-obelisk':{height:16.4,width:9.2,depth:9.2},
 'porto-novo-toffa':{height:7.1,width:3.8,depth:3.8},
 'maputo-city-hall':{height:22,width:68,depth:38,parcelWidth:.8},
 'maputo-samora-machel':{height:13.5,width:8.9,depth:8.9,parcelWidth:.6},
 'accra-independence-arch':{height:30,width:51,depth:19,parcelWidth:.8},
 'accra-black-star-gate':{height:23,width:25,depth:10,parcelWidth:.8},
 'shanghai-huangpu-light-fountain':{height:5.3,width:32.6,depth:32.6,parcelWidth:.8},
 'hong-kong-thomas-jackson':{height:6.2,width:3.65,depth:3.8},
 'kingston-manley-statue':{height:5,width:3,depth:3},
 'kingston-bustamante-statue':{height:5,width:3,depth:3},
 'waharoa':{height:7,width:10.132,depth:.62,parcelWidth:.38},
 'delhi-baradari':{height:4.8,width:8.4,depth:8.4,parcelWidth:.32},
 'delhi-entry-arcade':{height:3.6,width:12.4,depth:.9,parcelWidth:.42},
 'delhi-open-air-theatre':{height:1.3,width:15,depth:11,parcelWidth:.46},
 'birmingham-iron-man':{height:6,width:2.5,depth:1.94},
 'birmingham-guardian':{height:3.0,width:2.5,depth:5.0},
 'birmingham-the-river':{height:2.8,width:4,depth:2.5},
 'fontvieille-saint-nicolas':{height:22,width:38.5,depth:27.1,parcelWidth:.92},
 'campidoglio-nilo':{height:3.15,width:4.65,depth:2.2},
 'campidoglio-tevere':{height:3.12,width:5.05,depth:2.2},
 'delft-hugo-de-groot':{height:5.8,width:2.7,depth:2.7},
 'birmingham-queen-victoria':{height:6.6,width:3.8,depth:3.7},
 'goiania-tres-racas':{height:7,width:3.1,depth:4.7},
 'tartini-monument':{height:6,width:2.75,depth:2.75},
 'monaco-malizia':{height:4.25,width:2.2,depth:2.2},
 'tartu-countrywomen':{height:2.1,width:1.78,depth:1.10},
 'tartu-town-hall':{height:27,width:36.25,depth:19.8,parcelWidth:.75},
 'tartu-kissing-students':{height:4.4,width:10.2,depth:10.2,parcelWidth:.40},
 'vilnius-gediminas':{height:8.5,width:7.4,depth:6.8,parcelWidth:.30},
 'vilnius-cathedral-belfry':{height:57,width:14.45,depth:14.45,parcelWidth:.50},
 'vilnius-cathedral-basilica':{height:21.5,width:44.1,depth:72,parcelWidth:.78},
 'vilnius-miracle-tile':{height:.055,width:.86,depth:.86},
 'vilnius-baltic-way-tile':{height:.055,width:.86,depth:.86},
 'kuopio-veljmies':{height:3.2,width:2.45,depth:1.45},
 'kuopio-siskotytto':{height:2.90,width:1.75,depth:1.2},
 'kuopio-market-hall':{height:15,width:52.54,depth:42,parcelWidth:.85},
 'stortorget-stone-well':{height:4.9,width:3.2,depth:3.2},
 'stortorget-stock-exchange':{height:29,width:45,depth:29,parcelWidth:.68},
 'kansalaistori-song-trees':{height:12.87,width:6.09,depth:9},
 'kansalaistori-oodi-library':{height:24,width:47,depth:151,parcelWidth:.85},
 'karhupuisto-bear':{height:2.55,width:2.4,depth:3.0},
 'kamppi-chapel':{height:11.5,width:19.6,depth:13.4,parcelWidth:.50},
 'kamppi-entrepreneurs-monument':{height:6,width:3.9,depth:3.9},
 'kasarmitori-winter-war-memorial':{height:10.6,width:3.65,depth:3.65},
 'kasarmitori-the-eye':{height:.055,width:1.8,depth:1.8},
 'teror-pilar-fountain':{height:2.36,width:3.8,depth:3.8},
 'teror-wall-fountain':{height:2.77,width:2.25,depth:1.65},
 'tremp-cross-fountain':{height:4.48,width:2.84,depth:2.84},
 'tarrega-creu-del-pati':{height:6.17,width:3.89,depth:3.89},
 'puigcerda-breto-cerda':{height:2.31,width:1.83,depth:.63},
 'arucas-sureda-monument':{height:4.9,width:4.1,depth:4.1},
 'king-sejong-seated':{height:7.0,width:5.5,depth:5.3,parcelWidth:.45},
 'joseon-armillary':{height:1.48,width:.82,depth:.82},
 'joseon-rain-gauge':{height:1.32,width:.63,depth:.63},
 'joseon-sundial':{height:1.14,width:.86,depth:.86},
 'three-rivers-fountain':{height:5.5,width:10,depth:10,parcelWidth:.35},
 'rizal-monument':{height:9.6,width:7.4,depth:7.4,parcelWidth:.42},
 'quezon-memorial-shrine':{height:66,width:52.6,depth:45.1,parcelWidth:.65},
 'monas':{height:19.0,width:7.1,depth:7.1,parcelWidth:.50},
 'pirulito-obelisk':{height:13.57,width:7.60,depth:7.60},
 'boa-vista-garimpeiro':{height:7.5,width:15.7,depth:7.5,parcelWidth:.38},
 'naga-fifteen-martyrs':{height:6.95,width:6.4,depth:6.4},
 'laoag-tobacco-obelisk':{height:6.3,width:3.5,depth:3.5},
 'dapitan-rizal-statue':{height:5.4,width:3.6,depth:3.6},
 'dapitan-mindanao-relief':{height:1.55,width:32,depth:28,parcelWidth:.45},
 'daet-rizal-pylon':{height:6.1,width:3.8,depth:3.8},
 'morong-claudio-statue':{height:4.3,width:2.75,depth:2.75},
 'virac-rizal-monument':{height:5.8,width:6.9,depth:5.7},
 'phayao-ngam-mueang':{height:5.25,width:4.4,depth:4.4},
 'ubon-great-candle':{height:22,width:18,depth:18,parcelWidth:.48},
 'tahrir-obelisk':{height:20.1,width:4.7,depth:4.3},
 'sydney-cenotaph':{height:3.8,width:7.7,depth:3.6,parcelWidth:.35}
});
function classify(name,tags={}){
 if(tags.amenity==='fountain'||tags.class==='fountain'||tags.subclass==='fountain')return 'fountain';
 if(tags.statue==='equestrian'||/ecuestre|equestrian|equestre|a caballo/i.test(name))return 'equestrian';
 if(tags.memorial==='bust'||/busto|bust /i.test(name))return 'bust';
 if(/pir[aá]mide|pyramid/i.test(name))return 'pyramid';if(/obelisc|obelisk/i.test(name))return 'obelisk';
 if(/columna|coluna|column /i.test(name))return 'column';if(['plaque','stone'].includes(tags.memorial))return 'plaque';return 'unclassified';
}
function enrich(profile,city){
 const data=window.SQUARE_DETAIL_DATA?.[city.id];
 return data?{...profile,landmarks:data.landmarks||[],walkwayDetails:data.walkways||[],detailProvenance:data.provenance||[],detailSchema:data.schema}:profile;
}
function prepare(profile,fit,b,city){
 const adjacent=profile.contextSurfaces?.length?profile.adjacentLandmarks||[]:[];
 const all=[...(profile.landmarks||[]),...adjacent],items=[],reservations=[];
 for(const feature of [...all].sort((a,b)=>(b.status==='reference-model')-(a.status==='reference-model'))){
  if(feature.partOf||!MODEL_SPECS[feature.model]||!Number.isFinite(feature.x)||!Number.isFinite(feature.z))continue;
  const spec=MODEL_SPECS[feature.model],p=fit.point(feature),wanted=feature.displayHeight||5;
  const angle=fit.angle+(Number(feature.bearing)||0),widthLimit=spec.parcelWidth?b.width*spec.parcelWidth:6.4;
  const mappedWidth=Number(feature.widthMeters);
  const referenceWidth=Number.isFinite(mappedWidth)&&mappedWidth>0?
   Math.max(1.55,mappedWidth*fit.scale)/spec.width:Infinity;
  let factor=Math.min(wanted/spec.height,widthLimit/spec.width,referenceWidth);
  // Use the square's projection when the model has source-based proportions.
  if(feature.scaleWithLayout)factor=Math.min(factor,fit.scale);
  if(feature.model==='fountain'&&feature.status!=='reference-model')factor=Math.min(factor,.45);
  const clearanceX=b.width/2-Math.abs(p.x)-.8,clearanceZ=b.depth/2-Math.abs(p.z)-.8;
  if(spec.depth){
   const c=Math.abs(Math.cos(angle)),s=Math.abs(Math.sin(angle));
   factor=Math.min(factor,2*clearanceX/(c*spec.width+s*spec.depth),2*clearanceZ/(s*spec.width+c*spec.depth));
  }else factor=Math.min(factor,Math.min(clearanceX,clearanceZ)/(spec.width*.57));
  // A large mapped site needs a small scale even for a clearly visible landmark.
  const visibleReference=feature.scaleWithLayout&&feature.status==='reference-model'&&
   factor*spec.height>=2.5&&factor*spec.width>=1.2;
  if(factor<.09&&!visibleReference)continue;
  const radius=spec.width*factor*.74;
  // Prefer a sourced landmark over duplicate point representations of the same object.
  if(items.some(item=>Math.hypot(item.x-p.x,item.z-p.z)<Math.min(radius,item.radius)*.45))continue;
  const item={feature,x:p.x,z:p.z,scale:factor,angle,radius};items.push(item);reservations.push({x:p.x,z:p.z,radius:radius+.30});
 }
 return{profile,city,items,reservations,clear(x,z,radius=0){return !reservations.some(p=>Math.hypot(x-p.x,z-p.z)<p.radius+radius);}};
}
function render(plan,group,b){
 if(!plan?.items.length)return;
 const T=THREE,UP=new T.Vector3(0,1,0);
 const parts=[],bronze=0x526b62,stone=0xd6cbb3,marble=0xe4e0d2,gold=0xb1a06d,water=0x67c4dc;
 let owner;
 const add=(kind,material,color,x,y,z,sx,sy,sz,rotation=null)=>{if(Math.min(sx,sy,sz)<=0)return;parts.push({kind,material,color,x,y,z,sx,sy,sz,rotation,owner});};
 const box=(c,x,y,z,w,h,d,m='stone')=>add('box',m,c,x,y,z,w,h,d);
 const sphere=(c,x,y,z,rx,ry,rz,m='metal')=>add('sphere',m,c,x,y,z,rx,ry,rz);
 const cylinder=(c,x,y,z,r,h,m='stone')=>add('cylinder',m,c,x,y,z,r,h,r);
 const ring=(c,x,y,z,r,thickness,m='metal')=>add('torus',m,c,x,y,z,r,thickness/.045,r);
 const limb=(a,c,r,color=bronze,m='metal')=>{const from=new T.Vector3(...a),to=new T.Vector3(...c),delta=to.clone().sub(from);add('cylinder',m,color,(a[0]+c[0])/2,(a[1]+c[1])/2,(a[2]+c[2])/2,r,delta.length(),r,new T.Quaternion().setFromUnitVectors(UP,delta.normalize()));};
 const steps=(y,width=5,depth=width)=>{for(let i=0;i<3;i++)box(stone,0,y+.13+i*.22,0,width-i*.4,.24,depth-i*.4);};
 const plaque=(y,width=1.7,z=1.5)=>{box(bronze,0,y,z,width,.75,.09,'metal');box(gold,0,y+.35,z+.06,width-.12,.04,.025,'metal');for(const side of [-1,1])sphere(gold,side*(width/2-.12),y,z+.08,.05,.05,.025);};
 const human=(x,y,z,scale=1,pose='civil',color=bronze)=>{
  const at=(px,py,pz)=>[x+px*scale,y+py*scale,z+pz*scale],material=color===marble?'stone':pose==='civil'||pose==='violinist'?'patina':'metal';
  const ball=(px,py,pz,rx,ry,rz)=>sphere(color,...at(px,py,pz),rx*scale,ry*scale,rz*scale,material);
  const segment=(a,c,r)=>limb(at(...a),at(...c),r*scale,color,material);
  ball(0,2.30,0,.24,.30,.23);ball(0,2.28,.23,.07,.10,.10);ball(-.24,2.28,0,.045,.085,.07);ball(.24,2.28,0,.045,.085,.07);
  ball(0,1.56,0,.45,.56,.26);ball(0,1.01,0,.32,.23,.23);
  for(const side of [-1,1]){
   segment([side*.17,.97,0],[side*.17,.54,.015],.12);segment([side*.17,.54,.015],[side*.18,.12,.03],.10);ball(side*.18,.10,.13,.14,.10,.23);
  }
  if(pose==='classical'){
   segment([-.38,1.88,0],[-.56,1.55,.08],.095);segment([-.56,1.55,.08],[-.42,1.21,.24],.075);segment([.38,1.88,0],[.55,1.58,.12],.095);segment([.55,1.58,.12],[.38,1.32,.26],.075);
   add('robe',material,color,...at(0,.73,0),.52*scale,1.44*scale,.46*scale);for(let fold=-2;fold<=2;fold++)segment([fold*.08,.10,.25],[fold*.12,1.34,.20],.028);
  }else if(pose==='freedom'){
   segment([-.38,1.88,0],[-.70,2.18,.05],.10);segment([-.70,2.18,.05],[-.88,2.65,.12],.08);
   segment([.38,1.88,0],[.66,1.52,.12],.10);segment([.66,1.52,.12],[.82,1.32,.19],.08);
   add('robe',material,color,...at(0,.72,0),.56*scale,1.40*scale,.47*scale);
   for(let i=0;i<5;i++){const q=-.91+i*.04;ring(color,...at(q,2.60-i*.14,.15),.07*scale,.012*scale,material);}
   for(let i=0;i<4;i++)ring(color,...at(.85+i*.02,1.25-i*.13,.19),.07*scale,.012*scale,material);
   for(let i=0;i<3;i++)ring(color,...at(.20+i*.14,.10,.26),.06*scale,.012*scale,material);
  }else if(pose==='laurel'){
   segment([-.38,1.88,0],[-.66,2.35,.08],.11);segment([-.66,2.35,.08],[-.52,2.92,.14],.085);
   segment([.38,1.88,0],[.50,1.42,.16],.105);segment([.50,1.42,.16],[.34,1.14,.32],.080);
   add('robe',material,color,...at(0,.71,0),.55*scale,1.36*scale,.49*scale);
   box(color,...at(.33,1.21,.40),.34*scale,.55*scale,.09*scale,material);
   limb(at(-.54,2.88,.14),at(-.08,3.57,.19),.032*scale,color,material);
   for(let i=0;i<5;i++){
    const leaf=i*.08;ball(-.45+leaf,3.03+i*.115,.20,.125,.045,.045);ball(-.46+leaf,3.10+i*.115,.15,.065,.075,.042);
   }
  }else if(pose==='proclaiming'){
   segment([-.40,1.88,0],[-.53,2.38,.11],.105);
   segment([-.53,2.38,.11],[-.62,2.82,.22],.085);
   ball(-.62,2.84,.23,.095,.105,.08);
   segment([-.62,2.90,.23],[-.64,3.06,.24],.031);
   segment([.39,1.87,0],[.48,1.45,.09],.102);
   segment([.48,1.45,.09],[.44,1.04,.15],.083);
   ball(.44,1.02,.15,.084,.105,.09);
   box(color,...at(0,1.03,0),.65*scale,.43*scale,.52*scale,material);
  }else if(pose==='orator'){
   segment([-.38,1.88,0],[-.53,1.47,.10],.105);
   segment([-.53,1.47,.10],[-.18,1.83,.28],.085);
   ball(-.18,1.83,.29,.11,.11,.08);
   segment([.38,1.88,0],[.63,1.73,.12],.105);
   segment([.63,1.73,.12],[.94,1.91,.22],.085);
   ball(.95,1.92,.23,.11,.085,.08);
  }else if(pose==='trumpeter'){
   segment([-.38,1.88,0],[-.51,1.50,.08],.10);segment([-.51,1.50,.08],[-.42,1.23,.24],.08);
   segment([.38,1.88,0],[.56,2.05,.26],.10);segment([.56,2.05,.26],[.23,2.26,.51],.08);
   segment([.05,2.27,.29],[.20,2.27,.80],.045);ball(.21,2.27,.84,.11,.12,.07);
  }else if(pose==='liberty'||pose==='fame'){
   segment([-.39,1.90,0],[-.62,2.33,0],.10);segment([-.62,2.33,0],[-.56,2.82,.02],.085);ball(-.56,2.85,.02,.105,.12,.10);
   segment([.39,1.90,0],[.66,1.51,.10],.10);segment([.66,1.51,.10],[.47,1.10,.24],.085);
   add('robe',material,color,...at(0,.72,0),.55*scale,1.30*scale,.50*scale);
   for(let fold=-2;fold<=2;fold++)segment([fold*.08,.10,.25],[fold*.12,1.34,.20],.035);
   if(pose==='fame'){
    segment([.42,1.90,0],[.64,2.25,.22],.09);segment([.64,2.25,.22],[.42,2.35,.61],.075);
    limb(at(.13,2.35,.28),at(.40,2.35,1.13),.027*scale,gold);
    add('cone','metal',gold,...at(.43,2.35,1.17),.14*scale,.28*scale,.14*scale,new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2));
    for(const side of [-1,1])ball(side*.48,2.10,-.19,.40,.58,.09);
   }else{
    limb(at(-.56,2.84,.02),at(-.56,3.55,.02),.025*scale,gold);
    ball(.48,1.09,.32,.23,.36,.065);ball(0,2.59,-.04,.25,.10,.23);
   }
  }else if(pose==='violinist'){
   add('cape',material,color,...at(.02,1.19,-.17),.89*scale,1.74*scale,.18*scale);
   segment([-.36,1.88,0],[-.64,1.72,.14],.095);
   segment([-.64,1.72,.14],[-.81,1.91,.28],.075);
   ball(-.81,1.91,.28,.095,.083,.075);
   limb(at(-.88,1.66,.26),at(-.62,2.73,.36),.022*scale,color,material);
   segment([.39,1.86,-.02],[.47,1.52,-.21],.095);
   segment([.47,1.52,-.21],[.25,1.42,-.38],.075);
   ball(.25,1.42,-.38,.083,.081,.075);
   ball(.25,1.08,-.39,.23,.24,.087);
   ball(.26,1.30,-.39,.16,.16,.077);
   limb(at(.26,1.28,-.39),at(.28,1.66,-.38),.035*scale,color,material);
   ball(0,2.37,-.11,.24,.22,.18);ball(0,2.04,-.26,.13,.17,.10);
  }else{
   segment([-.40,1.89,0],[-.53,1.42,.13],.105);segment([-.53,1.42,.13],[-.36,1.06,.28],.085);
   segment([.40,1.89,0],[.63,1.51,.12],.105);segment([.63,1.51,.12],[.48,1.17,.30],.085);
   if(pose==='sword'){limb(at(.49,.20,.34),at(.49,1.32,.34),.025*scale,gold);box(gold,...at(.49,1.29,.34),.30*scale,.045*scale,.065*scale,'metal');box(bronze,...at(-.40,1.03,.32),.28*scale,.40*scale,.09*scale,'metal');}
   if(pose==='civil'){
    add('cape',material,color,...at(.14,1.30,-.25),1.05*scale,1.90*scale,.20*scale);
    // Coat tails, lapels and a cane read as clothing, not a convex shield.
    segment([-.26,1.91,.21],[-.05,1.43,.30],.045);segment([.26,1.91,.21],[.08,1.43,.30],.045);
    segment([.48,1.15,.31],[.53,.10,.39],.028);ball(.53,.07,.39,.045,.04,.045);
    for(let button=0;button<4;button++)ball(.04,1.30+button*.17,.265,.028,.028,.025);
   }
  }
 };
 const horse=(y=0,gesture='reins')=>{
  sphere(bronze,0,y+1.65,0,.62,.70,1.48);sphere(bronze,0,y+1.70,.92,.48,.63,.53);
  limb([0,y+1.75,.83],[0,y+2.77,1.17],.41);sphere(bronze,0,y+2.91,1.33,.34,.40,.58);sphere(bronze,0,y+2.77,1.73,.29,.26,.37);
  for(const side of [-1,1]){
   add('cone','metal',bronze,side*.20,y+3.31,1.17,.13,.42,.14);
   for(const end of [-1,1]){const raised=end>0&&side<0;const z=end*1.01;limb([side*.39,y+1.35,z],[side*.45,y+(raised?.88:.78),z+(raised?.27:0)],.13);limb([side*.45,y+(raised?.88:.78),z+(raised?.27:0)],[side*.46,y+(raised?.72:.16),z+(raised?.55:.05)],.10);sphere(bronze,side*.46,y+(raised?.66:.12),z+(raised?.61:.15),.16,.13,.24);}
  }
  limb([0,y+1.95,-1.30],[.20,y+1.29,-1.63],.15);limb([.20,y+1.29,-1.63],[.25,y+.57,-1.69],.12);
  box(0x455b52,0,y+2.23,-.13,.92,.14,1.23,'metal');
  // Rider, breeches and reins are separate volumes rather than a box on the horse.
  sphere(bronze,0,y+3.10,-.12,.39,.56,.24);sphere(bronze,0,y+3.86,-.10,.23,.28,.22);
  const raisedArm=['pointing','flag','charter'].includes(gesture);
  for(const side of [-1,1]){
   limb([side*.23,y+2.72,-.15],[side*.64,y+2.37,.32],.14);limb([side*.64,y+2.37,.32],[side*.67,y+1.64,.28],.105);
   sphere(bronze,side*.67,y+1.62,.40,.14,.12,.26);
   if(side===1&&raisedArm)continue;
   limb([side*.35,y+3.44,-.10],[side*.46,y+3.10,.46],.10);
   limb([side*.46,y+3.10,.46],[side*.19,y+3.05,.85],.08);
   limb([side*.19,y+3.05,.85],[side*.22,y+2.60,1.56],.022,gold);
  }
  add('cape','metal',bronze,0,y+2.97,-.48,.77,1.50,.24);
  if(gesture==='pointing'){limb([.32,y+3.43,-.10],[.58,y+3.61,.50],.095);limb([.58,y+3.61,.50],[.63,y+3.69,1.22],.075);sphere(bronze,.63,y+3.69,1.26,.10,.09,.14);}
  if(gesture==='flag'){
   limb([.33,y+3.42,-.10],[.64,y+3.77,.12],.105);
   limb([.64,y+3.77,.12],[.72,y+4.25,.19],.077);
   limb([.73,y+2.82,.20],[.73,y+6.45,.20],.040,bronze);
   box(bronze,.26,y+5.99,.20,.94,.78,.045,'metal');
   for(const z of [.225,.176])box(0x6c8072,.23,y+5.98,z,.86,.042,.017,'patina');
  }
  if(gesture==='charter'){
   limb([.33,y+3.43,-.10],[.65,y+3.70,.24],.10);
   limb([.65,y+3.70,.24],[.84,y+3.77,.71],.079);
   limb([.80,y+3.72,.64],[.97,y+4.12,.75],.093,stone,'stone');
  }
  sphere(bronze,0,y+4.12,-.10,.35,.11,.27);
 };
 const basin=(r=3.2,y=0)=>{cylinder(stone,0,y+.20,0,r,.38);ring(stone,0,y+.44,0,r,.13,'stone');cylinder(water,0,y+.40,0,r*.91,.045,'water');};
 const jet=(x,y,z,height,radius=.65)=>{
  cylinder(water,x,y+height/2,z,.05,height,'water');
  for(let stream=0;stream<5;stream++){const a=stream*Math.PI*2/5;let previous=[x,y+.04,z];for(let step=1;step<=7;step++){const t=step/7,p=[x+Math.sin(a)*radius*t,y+4*height*.60*t*(1-t),z+Math.cos(a)*radius*t];limb(previous,p,.024,water,'water');previous=p;}}
 };
 function accademia(){
  const plaster=0xe7ddc8,trim=0xf0e7d7,joint=0xafa797,recess=0x494845,door=0x625548;
  const pediment=(x,y,z,width,height,depth)=>{
   add('pediment','stone',trim,x,y,z,width,height,depth);
   box(marble,x,y-height/2,z+.06,width+.38,.22,depth+.14);
   for(const side of [-1,1])limb([x+side*width/2,y-height/2,z+depth/2],[x,y+height/2,z+depth/2],.10,marble,'stone');
  };
  box(plaster,0,5.68,-2.1,13.3,11.36,8.6);
  for(const side of [-1,1]){
   const x=side*10.65;
   box(plaster,x,4.48,-2.3,9.3,8.96,8.2);
   for(const h of [.42,2.22,5.55,8.86])box(trim,x,h,1.68,9.45,.18,.42);
   pediment(x,9.60,1.41,9.30,1.46,.72);
   for(const offset of [-2.6,0,2.6]){
    const xx=x+offset;
    box(trim,xx,4.32,1.87,1.51,2.43,.15);
    box(recess,xx,4.33,1.96,1.15,1.94,.04);
    box(joint,xx,3.37,2.0,1.55,.18,.32);
    box(trim,xx,2.93,1.9,1.41,.18,.18);
    box(trim,xx,4.32,1.99,.055,1.89,.05);
    box(trim,xx,4.59,1.99,1.12,.055,.05);
   }
   box(trim,x,1.30,1.86,2.15,2.55,.18);
   box(door,x,1.20,1.97,1.70,2.30,.05);
  }
  for(let i=0;i<8;i++){
   const front=8.9-i*.64,back=2.10,h=.23*(i+1),width=13.7-i*.075;
   box(stone,0,h/2,(front+back)/2,width,h,front-back);
   box(trim,0,h-.035,front-.07,width+.05,.08,.20);
  }
  box(stone,0,1.79,3.83,13.0,.22,3.45);
  for(const x of [-4.85,-1.62,1.62,4.85]){
   box(trim,x,1.97,4.68,1.02,.25,1.01);
   cylinder(stone,x,3.97,4.68,.34,3.90);
   cylinder(marble,x,2.18,4.68,.46,.21);
   cylinder(marble,x,5.82,4.68,.43,.24);
   box(trim,x,6.00,4.68,.96,.19,.92);
  }
  for(const x of [-3.76,0,3.76]){
   box(trim,x,3.50,2.29,2.34,3.29,.18);
   box(recess,x,3.47,2.40,1.89,2.90,.06);
   box(door,x,3.20,2.45,1.62,2.29,.10);
   box(stone,x,3.22,2.52,.06,2.24,.036);
   for(const side of [-1,1])sphere(gold,x+side*.15,3.18,2.54,.038,.038,.022,'stone');
  }
  box(trim,0,6.38,4.04,12.7,.91,2.30);
  box(joint,0,6.74,5.21,12.95,.10,.22);
  pediment(0,7.42,5.0,12.63,1.46,.52);
  box(trim,0,7.12,2.48,13.2,.32,.59);
  for(const x of [-3.55,0,3.55]){
   box(trim,x,8.98,2.28,2.09,2.68,.17);
   box(recess,x,8.98,2.39,1.72,2.31,.05);
   box(joint,x,7.91,2.60,2.22,.20,.55);
   human(x,8.00,2.66,.64,'classical',marble);
  }
  pediment(0,12.55,2.04,13.45,2.6,.83);
  const lettering={A:['010','101','111','101','101'],C:['011','100','100','100','011'],D:['110','101','101','101','110'],E:['111','100','110','100','111'],M:['10001','11011','10101','10001','10001'],I:['111','010','010','010','111']};
  const letters=[...'ACCADEMIA'],unit=.124;
  let start=-letters.reduce((sum,ch)=>sum+lettering[ch][0].length+1,0)*unit/2;
  for(const ch of letters){
   for(const [row,line] of lettering[ch].entries())for(let col=0;col<line.length;col++)if(line[col]==='1')box(recess,start+col*unit,6.60-row*unit,5.202,unit+.003,unit+.003,.044);
   start+=(lettering[ch][0].length+1)*unit;
  }
 }
 function sphinx(){
  const pale=0xc5bca9,face=0xd0c8b7,shade=0xb4a994;
  box(stone,0,.18,0,1.78,.32,3.49);
  box(pale,0,.40,0,1.58,.14,3.27);
  sphere(pale,0,.93,-.38,.55,.48,1.05,'stone');
  sphere(pale,0,1.19,.48,.49,.64,.60,'stone');
  for(const side of [-1,1]){
   sphere(shade,side*.33,.76,-.88,.31,.33,.58,'stone');
   sphere(pale,side*.31,.65,.86,.22,.19,.71,'stone');
   sphere(face,side*.31,.56,1.36,.245,.12,.29,'stone');
   for(let toe=-1;toe<=1;toe++)sphere(pale,side*.31+toe*.085,.55,1.57,.057,.065,.08,'stone');
   limb([side*.27,2.39,.35],[side*.36,1.87,.46],.10,shade,'stone');
  }
  limb([0,1.44,.54],[0,2.10,.54],.28,pale,'stone');
  sphere(shade,0,2.36,.43,.38,.46,.32,'stone');
  sphere(face,0,2.36,.61,.27,.35,.225,'stone');
  sphere(face,0,2.34,.83,.074,.09,.073,'stone');
  for(const side of [-1,1])sphere(shade,side*.12,2.44,.801,.064,.026,.019,'stone');
  sphere(shade,0,2.10,.74,.15,.050,.02,'stone');
  limb([-.37,.75,-1.18],[-.60,.63,-.94],.077,shade,'stone');
  limb([-.60,.63,-.94],[-.59,.57,-.68],.074,shade,'stone');
 }
 function sanMartin(){
  const cliffWidth=5.86,cliffDepth=5.42,cliffHeight=4.84,rockFloor=.34,rockTop=rockFloor+cliffHeight;
  const limestone=0xb5a287,carving=0xc7b89e,detail=0xa39178;
  cylinder(0xc7b8a0,0,.115,0,3.45,.23);
  cylinder(0xd5c7ac,0,.29,0,3.24,.15);
  add('cliff','stone',limestone,0,rockFloor+cliffHeight/2,0,cliffWidth,cliffHeight,cliffDepth);
  human(0,rockTop,0,1.55,'civil',0x647b6f);

  function stoneFace(angle,plane){
   const cos=Math.cos(angle),sin=Math.sin(angle),turn=new T.Quaternion().setFromAxisAngle(UP,angle);
   const at=(x,y,depth)=>[x*cos+(plane+depth)*sin,y,-x*sin+(plane+depth)*cos];
   const inlay=(x,y,width,height,color=limestone)=>add('box','stone',color,...at(x,y,.018),width,height,.146,turn);
   const carvingBall=(x,y,w,h)=>add('sphere','stone',carving,...at(x,y,.125),w,h,.077,turn);
   const carvingLine=(x1,y1,x2,y2,width,color=carving)=>limb(at(x1,y1,.102),at(x2,y2,.102),width,color,'stone');
   const scene=(width=2.70)=>{
    inlay(0,2.83,width,1.18);
    for(const side of [-1,1]){
     inlay(0,2.83+side*.55,width-.10,.054,detail);
     inlay(side*(width/2-.056),2.83,.052,1.06,detail);
    }
   };
   const figure=(x,base,size,seated=false)=>{
    carvingBall(x,base+size*.88,size*.115,size*.126);
    carvingBall(x,base+size*.59,size*.17,size*.21);
    for(const side of [-1,1]){
     carvingLine(x+side*size*.13,base+size*.64,x+side*size*.22,base+size*.43,size*.052);
     carvingLine(x+side*size*.08,base+size*.44,x+side*size*.10+(seated?size*.16:0),base+size*.12,size*.061);
    }
   };
   return {at,turn,inlay,carvingBall,carvingLine,scene,figure};
  }

  // The three scenes of Perlotti's monument are carved into the stone on separate faces.
  const meeting=stoneFace(-Math.PI/2,cliffWidth*.44);
  meeting.scene();meeting.figure(-.49,2.32,.88);meeting.figure(.42,2.32,.85);
  meeting.carvingLine(-.35,2.78,.26,2.78,.041);
  meeting.carvingLine(-1.03,2.35,-.96,3.23,.047,detail);
  meeting.carvingLine(-.99,2.99,-1.17,3.18,.043);
  meeting.carvingLine(-.97,3.00,-.78,3.19,.041);

  const garden=stoneFace(Math.PI/2,cliffWidth*.44);
  garden.scene();garden.figure(-.62,2.34,.68,true);garden.figure(-.06,2.32,.92);
  garden.figure(.47,2.31,.56);garden.figure(.89,2.31,.48);
  garden.carvingLine(-1.04,2.44,-.46,2.44,.047,detail);
  garden.carvingLine(.42,2.36,1.07,2.36,.045,detail);

  const rest=stoneFace(Math.PI,cliffDepth*.44);
  rest.scene();rest.figure(-.85,2.64,.69);rest.figure(.83,2.62,.73);
  rest.carvingBall(-.58,2.52,.14,.105);rest.carvingBall(-.06,2.48,.45,.13);
  rest.carvingLine(-.91,2.35,1.00,2.35,.054,detail);
  rest.carvingLine(.21,2.77,.65,2.97,.035);
  rest.carvingLine(-.49,3.14,-.02,3.28,.035,detail);
  rest.carvingLine(-.02,3.28,.32,3.15,.035,detail);

  const front=stoneFace(0,cliffDepth*.44);
  front.inlay(0,2.79,2.19,.80,detail);
  add('box','patina',0x61594d,...front.at(0,2.79,.062),2.04,.66,.09,front.turn);
  for(const [row,width] of [.97,1.42,.83].entries())
   add('box','patina',0x998872,...front.at(0,2.93-row*.14,.108),width,.024,.018,front.turn);
 }
 // Short rounded sections follow a spline and keep the sculpture in the shared instance batches.
 function bronzeCurve(points){
  const curve=new T.CatmullRomCurve3(points.map(([x,y,z])=>new T.Vector3(x,y,z)));
  const segments=(points.length-1)*5;
  let previous=curve.getPoint(0).toArray();
  for(let i=0;i<=segments;i++){
   const t=i/segments,position=curve.getPoint(t).toArray();
   const index=Math.min(points.length-2,Math.floor(t*(points.length-1)));
   const radius=T.MathUtils.lerp(points[index][3],points[index+1][3],t*(points.length-1)-index);
   if(i)limb(previous,position,radius,0x735548);
   sphere(0x735548,...position,radius,radius,radius);
   previous=position;
  }
 }
 function build(model){
  if(model==='accademia-conegliano'){accademia();return;}
  if(model==='stone-sphinx'){sphinx();return;}
  if(model==='floral-calendar'){
   box(stone,0,.12,0,8,.24,4);box(0x426d38,0,.29,0,7.65,.14,3.65);
   const digits=new Intl.DateTimeFormat('en-GB',{timeZone:'America/Argentina/Buenos_Aires',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date());
   const segments=[[0,.6,.34,.075],[.22,.44,.075,.27],[.22,.15,.075,.27],[0,0,.34,.075],[-.22,.15,.075,.27],[-.22,.44,.075,.27],[0,.30,.34,.075]],codes=[63,6,91,79,102,109,125,7,127,111];
   for(let n=0;n<digits.length;n++){
    const origin=(n-(digits.length-1)/2)*.64;
    if(digits[n]==='/'){limb([origin-.13,.40,-.43],[origin+.12,.40,.43],.037,0xefddaa,'stone');continue;}
    for(let k=0;k<7;k++)if(codes[Number(digits[n])]&(1<<k)){
     const [x,z,w,d]=segments[k];box(0xefddaa,origin+x,.40,(z-.3)*1.88,w,.09,d*1.88);
    }
   }
   for(let i=0;i<42;i++){const a=i*Math.PI*2/42;sphere(i%2?0xe8c572:0xd694b1,Math.cos(a)*3.45,.47,Math.sin(a)*1.45,.12,.10,.12,'stone');}
  }else if(model==='vientiane-patuxay-gate'){
   const main=0xb8b2a5,cap=0xd2c2a5,relief=0x9d917e;
   for(const side of [-1,1]){
    add('triumphal-arch','stone',main,0,0,side*9.38,23.2,21.2,4.42);
    add('triumphal-arch','stone',main,side*9.38,0,0,23.2,21.2,4.42,
     new T.Quaternion().setFromAxisAngle(UP,Math.PI/2));
    for(const corner of [-1,1])box(cap,side*9,1.04,corner*9,5.8,2.08,5.8);
   }
   box(main,0,24,0,21,7.1,21);
   for(const [height,size,depth] of [[20.65,24,.85],[21.72,23.2,1.45],[24.1,22.7,.65],[25.5,21.9,2.08],[27.0,22.9,.68]])
    box(cap,0,height,0,size,depth,size);
   for(const side of [-1,1])for(const i of [-4,-3,-2,-1,0,1,2,3,4]){
    box(relief,i*2.30,25.54,side*10.96,.17,1.05,.15);
    box(relief,side*10.96,25.54,i*2.30,.15,1.05,.17);
   }
   const tower=(x,z,width,height)=>{
    for(const [i,scale] of [1,.76,.53,.32].entries()){
     box(main,x,27.9+i*height*.17,z,width*scale,height*.19,width*scale);
     box(cap,x,27.9+i*height*.17+height*.10,z,width*scale*1.22,.38,width*scale*1.22);
    }
    add('pyramid','stone',cap,x,28.0+height*.74,z,width*.27,height*.42,width*.27);
   };
   tower(0,0,7.4,15);
   for(const x of [-6.6,6.6])for(const z of [-6.6,6.6])tower(x,z,3.5,8.3);
  }else if(model==='orange-robertson-rotunda'){
   const wall=0xa6957f,roof=0x444d50;
   add('bandstand-deck','stone',wall,0,.40,0,4.26,.80,4.26);
   add('bandstand-deck','stone',stone,0,.85,0,4.37,.16,4.37);
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4+Math.PI/8;
    const x=Math.sin(angle)*3.45,z=Math.cos(angle)*3.45;
    cylinder(marble,x,2.32,z,.20,2.76);
   }
   add('bandstand-deck','stone',wall,0,3.73,0,4.46,.29,4.46);
   add('bandstand-roof','stone',roof,0,4.28,0,4.48,2.35,4.48);
   sphere(roof,0,5.53,0,.13,.19,.13,'stone');
  }else if(model==='orange-whitney-fountain'){
   const edge=0xd4c7b2;
   cylinder(edge,0,.16,0,3,.32);
   cylinder(water,0,.34,0,2.8,.035,'water');
   ring(marble,0,.36,0,2.86,.09,'stone');
   for(const [y,r,h] of [[.56,.57,.40],[1.11,.28,.78],[1.51,1.28,.23],[1.98,.23,.76],[2.40,.64,.20],[2.69,.17,.48]])
    cylinder(marble,0,y,0,r,h);
   jet(0,2.92,0,.45,.20);
  }else if(model==='orange-boer-lamp'){
   const rock=0xbba587,iron=0x393e43;
   for(const [y,w,h] of [[.15,3.3,.30],[.39,2.74,.19],[.91,1.86,.88],[1.49,1.98,.28]])
    box(rock,0,y,0,w,h,w);
   cylinder(rock,0,2.37,0,.42,1.6);
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4;
    cylinder(stone,Math.sin(angle)*.40,2.37,Math.cos(angle)*.40,.042,1.54);
   }
   cylinder(rock,0,3.22,0,.56,.21);
   cylinder(iron,0,3.79,0,.07,1,'metal');
   for(const [x,z] of [[-.46,0],[.46,0],[0,-.46],[0,.46]]){
    limb([0,3.71,0],[x,4.04,z],.054,iron);
    sphere(marble,x,4.20,z,.20,.24,.20,'glass');
   }
   sphere(marble,0,4.64,0,.21,.26,.21,'glass');
  }else if(model==='blitar-pecut-fountain'){
   const rim=0xbaac97,sculpture=0x5a3927;
   cylinder(rim,0,.37,0,14,.74);
   cylinder(water,0,.765,0,13.3,.05,'water');
   ring(stone,0,.77,0,13.58,.25,'stone');
   cylinder(stone,0,.95,0,1.58,.76);
   limb([0,1.28,.1],[-.30,2.68,.12],.34,sculpture);
   sphere(sculpture,-.44,2.72,.08,.62,.54,.42);
   for(let i=0;i<4;i++){
    const x=-.84+i*.24;
    limb([x,2.84,.15],[x+.13,3.12,.35],.13,sculpture);
   }
   limb([-.09,2.49,.28],[-.49,2.97,.48],.16,sculpture);
   const whip=[[-1.43,2.72,.10],[-.48,3.03,.10],[.61,3.44,.10],[1.94,4.18,.10],[3.03,5.08,.10],[3.36,6.04,.10],[3.18,6.38,.10]];
   for(let i=1;i<whip.length;i++)limb(whip[i-1],whip[i],.20-i*.023,sculpture);
   for(let i=0;i<12;i++){
    const angle=i*Math.PI/6;
    jet(Math.sin(angle)*9.55,.80,Math.cos(angle)*9.55,1.38,1.35);
   }
  }else if(model==='vientiane-patuxay-fountain'){
   cylinder(stone,0,.32,0,17,.64);
   cylinder(water,0,.665,0,16.15,.04,'water');
   ring(marble,0,.66,0,16.35,.18,'stone');
   for(let i=0;i<12;i++){
    const angle=i*Math.PI/6;
    jet(Math.sin(angle)*11.5,.69,Math.cos(angle)*11.5,1.55,1.1);
   }
   jet(0,.69,0,2.5,1.3);
  }else if(model==='washington-arch'){
   const light=0xe5dfd3,shade=0xbcb8ac;
   add('triumphal-arch','stone',light,0,0,0,7.1,8.76,2.18);
   for(const side of [-1,1]){
    box(shade,side*2.63,.27,0,1.88,.53,2.66);
    for(const face of [-1,1]){
     box(light,side*2.58,3.31,face*1.15,.70,5.75,.31);
     box(shade,side*2.58,6.11,face*1.16,.94,.25,.36);
     box(0xddd6c6,side*2.58,6.54,face*1.13,1.21,.50,.19);
    }
   }
   for(const [h,w,d] of [[7.42,7.37,2.43],[8.04,7.53,2.58],[8.85,7.55,2.56],[9.03,7.36,2.44]])
    box(light,0,h,0,w,.18,d);
   for(const face of [-1,1])for(let i=0;i<11;i++){
    const a=i*Math.PI/10;
    add('box','stone',shade,Math.cos(a)*1.65,4.39+Math.sin(a)*1.66,face*1.1,.18,.29,.10,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),a-Math.PI/2));
   }
  }else if(model==='washington-garibaldi'){
   steps(0,3.05);
   box(0x9d8e85,0,2.04,0,1.66,2.82,1.53);
   box(0xb6a49a,0,3.47,0,1.92,.22,1.78);
   box(bronze,0,3.64,0,1.43,.14,1.24,'metal');
   human(0,3.71,0,.99,'civil',bronze);
   limb([.55,4.94,.14],[.69,3.85,.26],.035,bronze);
  }else if(model==='holley-monument'){
   box(stone,0,.14,0,3.12,.28,1.15);
   box(stone,0,1.49,0,1.12,2.46,.80);
   for(const side of [-1,1]){
    box(stone,side*1.36,1.14,0,.39,1.73,.83);
    box(stone,side*.88,.82,.04,.65,1.05,.23);
   }
   box(stone,0,2.73,0,1.20,.17,.87);
   sphere(bronze,0,3.04,0,.44,.25,.27);
   sphere(bronze,0,3.49,.03,.25,.31,.24);
   sphere(bronze,0,3.47,.25,.08,.09,.08);
  }else if(model==='toronto-archer'){
   cylinder(0x8a8b85,0,.14,0,1.28,.28);
   bronzeCurve([[-1.25,.61,.27,.29],[-.73,1.08,-.20,.47],[-.26,1.77,-.24,.49],
    [.44,2.62,-.12,.39],[1.22,2.95,.14,.17]]);
   bronzeCurve([[-.56,.61,-.57,.32],[.15,1.04,-.25,.48],[.92,1.56,.34,.42],
    [1.20,2.04,.61,.19]]);
   bronzeCurve([[-.08,1.61,.02,.46],[-.59,1.96,.40,.42],[-1.22,2.37,.64,.16]]);
  }else if(model==='boston-embrace'){
   bronzeCurve([[-3.52,.54,-1.75,.51],[-3.17,2.49,-1.73,.68],[-1.94,4.63,-1.29,.66],
    [.19,5.37,-.43,.62],[2.38,4.47,.39,.42]]);
   bronzeCurve([[3.53,.54,1.15,.53],[3.18,2.56,1.05,.72],[1.70,4.58,.76,.65],
    [-.55,5.42,.39,.52],[-2.46,4.35,-.38,.34]]);
   bronzeCurve([[-3.17,2.62,-1.52,.56],[-2.11,3.17,-.23,.56],[-.43,3.83,1.22,.52],
    [1.25,4.34,1.58,.39],[2.51,4.12,1.02,.28]]);
   bronzeCurve([[3.27,2.61,1.03,.55],[2.38,3.23,-.24,.54],[.94,3.92,-1.31,.49],
    [-1.05,4.38,-1.65,.37],[-2.40,4.03,-1.42,.27]]);
  }else if(model==='washington-fountain'||model==='franklin-fountain'){
   const washington=model==='washington-fountain',radius=washington?3.48:3.12;
   cylinder(stone,0,.14,0,radius+.15,.28);
   cylinder(water,0,.285,0,radius*.94,.025,'water');
   for(const y of [0.24,.41])ring(stone,0,y,0,radius,.115,'stone');
   if(washington)ring(0xb4ada0,0,.17,0,radius+.15,.103,'stone');
   jet(0,.31,0,washington?1.55:2.05,radius*.48);
   for(let j=0;j<8;j++){
    const a=j*Math.PI/4;
    jet(Math.sin(a)*radius*.55,.30,Math.cos(a)*radius*.55,washington?.43:.70,radius*.13);
   }
  }else if(model==='freedom-arches'){
   for(const z of [-2.23,0,2.23]){
    for(const side of [-1,1])box(marble,side*4.56,.30,z,.62,.59,.74);
    let previous=[-4.52,.40,z];
    for(let segment=1;segment<=24;segment++){
     const t=segment/24,next=[-4.52+t*9.04,.40+4.25*4*t*(1-t),z];
     limb(previous,next,.145,marble,'stone');previous=next;
    }
   }
  }else if(model==='liberty-carousel'){
   cylinder(stone,0,.21,0,3.85,.42);
   cylinder(0xa23742,0,.61,0,3.51,.31,'stone');
   cylinder(marble,0,.84,0,3.48,.16,'stone');
   for(let i=0;i<12;i++){
    const a=i*Math.PI/6,x=Math.sin(a)*2.74,z=Math.cos(a)*2.74;
    cylinder(gold,x,2.45,z,.052,3.37,'metal');
    sphere(i%2?0xd9a760:0xe7ddd6,x,1.53,z,.36,.41,.72,'stone');
    sphere(0xeee2cf,x,1.95,z+.46,.23,.32,.29,'stone');
   }
   add('cone','stone',0xb85956,0,4.55,0,3.62,1.32,3.62);
   ring(0xf0e2b9,0,3.92,0,3.62,.15,'stone');
  }else if(model==='dam-memorial'){
   const travertine=0xe6dfd2;
   for(let i=0;i<4;i++)cylinder(0xd2c9b7,0,.10+i*.20,0,3.33-i*.28,.21);
   box(travertine,0,1.30,0,3.25,1.11,3.25);
   add('tapered-column','stone',travertine,0,6.87,0,1.18,10.12,1.18);
   for(const x of [-1.39,1.39])human(x,1.855,1.04,.53,'classical',marble);
   for(const [x,y] of [[-.57,4.22],[.53,4.69],[0,5.40]]){
    sphere(marble,x,y,1.01,.15,.075,.055,'stone');
    limb([x-.28,y-.10,1.015],[x+.10,y+.13,1.06],.047,marble,'stone');
   }
  }else if(model==='senate-monument'){
   const granite=0xa77d70;
   steps(0,6.75);box(granite,0,1.28,0,4.40,1.28,4.40);
   for(const [y,w,h] of [[2.01,3.20,.24],[3.59,2.31,3.00],[5.24,2.83,.26],[5.48,2.27,.22]])box(granite,0,y,0,w,h,w);
   human(0,5.59,0,1.22,'civil');
   for(const [x,z] of [[0,1.91],[0,-1.91],[1.91,0],[-1.91,0]])human(x,1.92,z,.62,'classical');
   plaque(3.66,1.28,1.18);
  }else if(model==='preseren-monument'){
   const granite=0xaaa29a;
   steps(0,5.14);box(granite,0,1.30,0,3.41,1.34,3.82);
   box(granite,0,2.36,0,2.27,.88,2.76);box(granite,0,2.90,.07,2.56,.22,2.94);
   human(0,3.01,.63,1.0,'civil');
   box(granite,0,3.55,-.86,1.30,1.08,1.05);
   human(0,4.10,-.83,.86,'laurel',bronze);
   plaque(1.46,2.20,1.93);
  }else if(model==='marianne-republique'){
   steps(0,7.36);cylinder(stone,0,1.07,0,3.28,.75);
   cylinder(marble,0,1.70,0,2.94,.56);cylinder(stone,0,4.69,0,1.47,5.43);
   for(const [y,r,h] of [[2.53,1.82,.22],[3.01,1.63,.18],[7.46,1.70,.26],[7.69,1.52,.20]])cylinder(marble,0,y,0,r,h);
   for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    add('box','metal',bronze,Math.sin(a)*2.56,1.13,Math.cos(a)*2.56,1.25,.40,.10,new T.Quaternion().setFromAxisAngle(UP,a));
   }
   for(const [x,z] of [[0,-2.08],[1.96,.74],[-1.96,.74]])human(x,1.98,z,.73,'classical',marble);
   human(0,7.79,0,1.13,'laurel',bronze);
   // The front group shares the monument base. The bronze lion guards the urn behind it.
   const lion=0x3e5148,mane=0x35473f,pawY=1.53;
   box(stone,0,1.40,3.09,2.62,.16,1.04);
   const urnZ=2.49;
   box(bronze,0,2.005,urnZ,.86,.05,.53,'metal');
   box(bronze,0,2.28,urnZ,.72,.51,.43,'metal');
   box(bronze,0,2.56,urnZ,.84,.09,.56,'metal');
   box(mane,0,2.611,urnZ,.34,.014,.06,'metal');
   sphere(lion,.04,1.97,3.08,.74,.31,.28);
   sphere(lion,.58,1.92,3.08,.34,.33,.29);
   sphere(mane,-.51,2.18,3.08,.34,.44,.32);
   sphere(lion,-.77,2.37,3.08,.24,.25,.21);
   sphere(lion,-.98,2.27,3.08,.18,.074,.14);
   sphere(mane,-1.105,2.33,3.08,.063,.051,.092);
   for(const side of [-1,1]){
    const z=3.08+side*.17;
    limb([-.46,2.04,z],[-.51,1.60,z],.093,lion);
    sphere(lion,-.55,pawY,z,.16,.06,.095);
    limb([.60,1.95,z],[.71,1.68,z],.108,lion);
    limb([.71,1.68,z],[.65,1.60,z],.085,lion);
    sphere(lion,.60,pawY,z,.14,.06,.095);
    sphere(mane,-.69,2.54,z,.075,.084,.065);
    sphere(lion,-.99,2.32,3.08+side*.069,.139,.086,.081);
    sphere(mane,-.43,2.25,3.08+side*.238,.26,.30,.105);
    sphere(lion,-.37,2.05,3.08+side*.172,.25,.26,.13);
    sphere(0x27372f,-.89,2.41,z+side*.027,.040,.024,.020);
   }
   const tail=[[.71,1.96,3.24],[.94,1.70,3.22],[1.09,1.56,3.32],[.95,1.54,3.44],[.74,1.55,3.45]];
   for(let segment=1;segment<tail.length;segment++)limb(tail[segment-1],tail[segment],.045,lion);
   sphere(mane,...tail.at(-1),.095,.061,.06);
  }else if(model==='bundesplatz-jets'){
   let index=0;
   for(let row=0;row<5;row++){
    const columns=row===2?6:5;
    for(let column=0;column<columns;column++){
     const x=(column-(columns-1)/2)*2.58,z=(row-2)*3.22;
     const height=.65+3.1*(.5+.5*Math.sin(index++*2.28));
     cylinder(0x626b72,x,.018,z,.145,.036,'metal');
     cylinder(0x96d5ee,x,.040+height/2,z,.085,height,'water');
    }
   }
  }else if(model==='flagpole'){
   cylinder(stone,0,.14,0,.28,.28);cylinder(0xa4b5bf,0,4.08,0,.052,7.65,'metal');
   sphere(0xc4b680,0,7.94,0,.095,.095,.095);
  }else if(model==='palmanova-stendardo'){
   add('hex','stone',0xc0b7a3,0,.16,0,4.2,.32,4.2);
   add('hex','stone',0xd3c9b5,0,.49,0,3.93,.34,3.93);
   add('hex','stone',0xdcd4c3,0,.74,0,3.76,.16,3.76);
   cylinder(0xb3ab9a,0,1.06,0,.64,.48);
   cylinder(0x564d44,0,6.33,0,.105,10.06,'metal');
   sphere(0xa09164,0,11.40,0,.15,.15,.15);
  }else if(model==='tiananmen-flagpole'){
   const granite=0xbfbcbc,steel=0xc3ccd0;
   box(granite,0,.13,0,3.62,.26,3.32);
   box(granite,0,.27,0,3.26,.12,2.98);
   box(stone,0,.34,0,1.46,.14,1.46);
   cylinder(steel,0,3.93,0,.060,7.08,'metal');
   sphere(gold,0,7.50,0,.083,.083,.083);
   box(0xb51521,.66,6.95,0,1.24,.82,.020,'patina');
   for(const [x,y,radius] of [[.30,7.14,.094],[.46,7.27,.032],[.54,7.19,.032],[.54,7.09,.032],[.46,7.01,.032]]){
    for(const side of [-1,1])add('flag-star','stone',0xf0c638,x,y,side*.013,radius,radius,.004);
   }
  }else if(model==='peoples-heroes-memorial'){
   const granite=0xa5a4a0,limestone=0xe6e3d9,inset=0xb8b1a4;
   box(granite,0,.12,0,8.4,.24,10.3);
   box(limestone,0,.33,0,7.6,.18,9.3);
   box(granite,0,.51,0,6.0,.18,7.05);
   box(limestone,0,.74,0,5.58,.28,6.5);
   for(const side of [-1,1])for(let step=0;step<5;step++){
    const y=.06+step*.095;
    box(granite,0,y,side*(5.95-step*.49),2.9,2*y,.36);
    box(granite,side*(4.80-step*.40),y,0,.38,2*y,2.56);
   }
   box(limestone,0,1.28,0,3.8,.96,3.65);
   for(const side of [-1,1]){
    box(inset,0,1.30,side*1.833,3.32,.57,.07);
    box(inset,side*1.91,1.30,0,.07,.57,3.14);
    for(let panel=-1;panel<=1;panel++){
     for(let figure=0;figure<3;figure++){
      const position=panel+figure*.23-.23,height=1.24+figure%2*.04;
      box(limestone,position,height,side*1.873,.102,.24,.05);
      sphere(limestone,position,height+.16,side*1.896,.046,.052,.022,'stone');
      box(limestone,side*1.958,height,position,.05,.24,.102);
      sphere(limestone,side*1.98,height+.16,position,.022,.052,.046,'stone');
     }
    }
   }
   box(limestone,0,1.80,0,4.04,.24,3.92);
   box(granite,0,2.03,0,2.24,.26,2.04);
   box(limestone,0,2.24,0,2.42,.16,2.16);
   box(0xa69d91,0,4.67,0,1.26,4.73,1.00);
   box(0xbbb0a2,0,4.84,-.503,.99,4.11,.045);
   for(let row=0;row<8;row++)box(0xba9b56,0,3.20+row*.418,-.532,.46,.075,.026);
   for(const [y,width,depth,thickness] of [[7.02,1.42,1.17,.14],[7.155,1.62,1.33,.17],[7.31,1.72,1.37,.18],[7.45,1.46,1.20,.14]]){
    box(limestone,0,y,0,width,thickness,depth);
   }
  }else if(model==='chairman-mao-memorial-hall'){
   const granite=0xb6afa3,columns=0xe0d3b9,roof=0x8f754d;
   box(granite,0,.13,0,9.85,.26,9.85);
   box(granite,0,.35,0,9.40,.19,9.40);
   box(0xada497,0,1.59,0,6.92,2.33,6.92);
   for(const side of [-1,1]){
    for(let step=0;step<5;step++){
     const y=.045+step*.040;
     box(granite,0,y,side*(4.91-step*.17),3.25,2*y,.19);
    }
    for(let index=0;index<12;index++){
     const centre=(index-5.5)*.744;
     box(columns,centre,1.68,side*4.09,.26,2.47,.27);
     if(index>0&&index<11)box(columns,side*4.09,1.68,centre,.27,2.47,.26);
    }
    box(0x49423a,0,1.32,side*3.468,2.36,1.78,.06);
    box(columns,0,2.59,side*3.515,2.69,.23,.09);
    for(let index=0;index<6;index++)box(gold,(index-2.5)*.31,2.60,side*3.567,.14,.088,.03);
   }
   box(granite,0,2.99,0,9.30,.23,9.30);
   box(roof,0,3.19,0,9.64,.23,9.64);
   box(0x9c865b,0,3.36,0,8.64,.13,8.64);
   box(columns,0,3.58,0,7.45,.44,7.45);
   box(roof,0,3.87,0,7.79,.14,7.79);
   box(0x9c865b,0,4.01,0,7.18,.14,7.18);
  }else if(model==='hvar-pjaca-well'){
   const limestone=0xd9cbb3, iron=0x55514a;
   cylinder(limestone,0,.09,0,1.30,.18);
   cylinder(limestone,0,.47,0,1.13,.60);
   ring(limestone,0,.81,0,1.22,.08,'stone');
   cylinder(iron,0,.78,0,1.16,.055,'metal');
   for(const x of [-.8,-.4,0,.4,.8]){
    const length=2*Math.sqrt(1.06**2-x**2);
    box(iron,x,.84,0,.035,.04,length,'metal');
    box(iron,0,.84,x,length,.04,.035,'metal');
   }
   for(const z of [-1.83,1.83]){
    box(limestone,0,.09,z,.62,.18,.60);
    box(limestone,0,.29,z,.48,.24,.46);
   }
  }else if(model==='san-gimignano-cistern'){
   const travertine=0xb6a78f;
   add('cistern-stonework','stone',travertine,0,0,0,1,1,1);
   cylinder(0x4d463c,0,.59,0,.97,.10);
  }else if(model==='budapest-millennium-column'){
   const limestone=0xc7c0af,trim=0xa99e85,darkBronze=0x485346;
   for(let step=0;step<4;step++){
    const width=12.8-step*.7;
    box(limestone,0,.18+step*.34,0,width,.36,width);
   }
   box(limestone,0,2.85,0,9.8,3.1,9.8);
   box(trim,0,4.48,0,10.1,.38,10.1);
   cylinder(limestone,0,5.07,0,2.78,.78);
   cylinder(trim,0,5.59,0,2.35,.31);
   add('tapered-column','stone',limestone,0,20.0,0,1.91,28.50,1.91);
   cylinder(limestone,0,34.5,0,1.65,.66);
   cylinder(trim,0,35.07,0,2.02,.53);
   box(limestone,0,35.56,0,3.78,.46,3.78);
   sphere(trim,0,36.33,0,.82,.63,.82,'metal');
   const angel=36.85;
   human(0,angel,0,1.35,'classical',darkBronze);
   for(const side of [-1,1]){
    const wing=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),side*-.49);
    add('sphere','metal',darkBronze,side*1.02,angel+1.73,-.32,.64,1.38,.19,wing);
   }
   limb([.71,angel+1.56,.24],[.71,angel+3.57,.24],.075,darkBronze);
   for(const y of [2.76,3.22])limb([.37,angel+y,.24],[1.05,angel+y,.24],.058,darkBronze);
   // The seven mounted figures are simplified as individual bronze silhouettes.
   for(let i=0;i<7;i++){
    const angle=(i-3)*Math.PI/6,x=Math.sin(angle)*5.15,z=Math.cos(angle)*5.15;
    sphere(darkBronze,x,4.16,z,.62,.53,1.20,'metal');
    limb([x,4.07,z+.58],[x,4.84,z+1.11],.32,darkBronze);
    sphere(darkBronze,x,4.87,z+1.18,.29,.29,.44,'metal');
    for(const dx of [-.30,.30])for(const dz of [-.66,.64]){
     limb([x+dx,3.93,z+dz],[x+dx,3.16,z+dz+.11],.13,darkBronze);
    }
    human(x,4.39,z,.59,'civil',darkBronze);
   }
  }else if(model==='budapest-millennium-colonnade-north'||model==='budapest-millennium-colonnade-east'){
   const limestone=0xc7c0af,trim=0xa99e85,darkBronze=0x485346;
   const north=model==='budapest-millennium-colonnade-north';
   const axes=north
    ?[[-16.13,-1.61],[-11.7,-4.44],[-6.86,-5.24],[-1.61,-5.24],[3.23,-4.03],[8.07,-2.02],[12.50,1.61],[16.13,4.03]]
    :[[-5.24,-16.54],[-1.21,-12.10],[2.02,-7.66],[4.03,-2.82],[4.84,2.42],[4.44,7.26],[3.23,12.10],[.81,17.34]];
   for(const [x,z] of axes){
    cylinder(trim,x,1.06,z,.75,.22);
    cylinder(limestone,x,3.62,z,.49,4.93);
    cylinder(limestone,x,6.08,z,.75,.29);
   }
   for(let i=1;i<axes.length;i++){
    const [ax,az]=axes[i-1],[bx,bz]=axes[i];
    const x=(ax+bx)/2,z=(az+bz)/2,dx=bx-ax,dz=bz-az;
    const span=Math.hypot(dx,dz)+.75;
    const yaw=new T.Quaternion().setFromAxisAngle(UP,-Math.atan2(dz,dx));
    add('box','stone',limestone,x,.47,z,span,.94,3.00,yaw);
    add('box','stone',limestone,x,6.48,z,span,.76,2.34,yaw);
    add('box','stone',trim,x,6.94,z,span,.26,2.58,yaw);
    box(limestone,x,1.39,z,1.33,.91,1.27);
    human(x,1.85,z,.97,'classical',darkBronze);
   }
   for(const index of [0,axes.length-1]){
    const [x,z]=axes[index];
    human(x,7.08,z,.44,'classical',darkBronze);
   }
  }else if(model==='budapest-heroes-memorial-stone'){
   box(0xb5ad9b,0,.11,0,10,.22,6.0);
   box(0xaaa18f,0,.50,0,8.3,.56,4.0);
   box(0xc5bca7,0,.80,0,8.55,.11,4.18);
  }else if(model==='luanda-agostinho-neto-memorial'){
   const concrete=0xaeb0ad,light=0xc2c3bd,shadow=0x777d7d;
   for(let i=0;i<4;i++){
    box(concrete,0,1.15+i*1.75,0,44-i*3.4,2.3,42-i*3.3);
   }
   box(shadow,0,9.62,13.74,13.1,6.35,.36);
   box(light,0,8.99,0,34,5.20,31);
   box(shadow,0,9.65,15.58,6.2,4.80,.20);
   add('obelisk-shaft','stone',concrete,0,47.3,0,22.0,76.6,19.8);
   box(light,0,84.75,0,12,2.2,10.5);
   add('pyramid','stone',light,0,102.90,0,7.0,34.2,6.1);
   for(const side of [-1,1]){
    add('obelisk-shaft','stone',light,side*10.4,28.0,-1.55,8.8,41.2,12.65);
   }
   box(shadow,0,40.6,7.92,1.1,32.2,.50);
   box(shadow,0,27.6,10.18,1.0,6.3,.38);
  }else if(model==='brooklyn-gaynor-memorial'){
   const granite=0xc2ada6,bronze=0x434943;
   box(granite,0,.11,0,5.13,.22,1.85);
   box(granite,0,.28,0,4.89,.22,1.58);
   box(granite,0,1.48,-.40,4.64,2.21,.59);
   box(granite,0,2.55,-.40,1.44,1.28,.58);
   for(const x of [-1.52,1.52])box(bronze,x,1.65,-.08,1.43,1.13,.12);
   box(granite,0,.96,.31,.64,1.22,.56);
   add('box','stone',bronze,0,1.67,.31,.61,.27,.40);
   add('sphere','stone',bronze,0,2.10,.37,.51,.69,.47);
  }else if(model==='brooklyn-war-memorial'){
   const limestone=0xd7cfc0,trim=0xe7ddcc,entrance=0x67635c;
   box(limestone,0,2.67,0,15.44,5.34,8.20);
   box(trim,0,5.47,0,15.55,.26,8.30);
   box(trim,0,.22,-4.02,15.44,.44,.47);
   for(const x of [-4.85,4.85]){
    box(trim,x,2.18,-4.04,2.35,4.0,.24);
    human(x,.18,-4.18,.57,'classical',limestone);
   }
   box(entrance,0,1.46,-4.14,2.35,2.92,.08);
   box(trim,0,3.70,-4.15,3.06,.63,.14);
  }else if(model==='corona-subway-stairs'){
   const green=0x496254,rail=0x637a69,step=0x9b9b8e;
   for(let i=0;i<15;i++){
    const y=.18+i*.174,z=-2.8+i*.358;
    box(step,0,y,z,1.86,.19,.37);
   }
   for(const x of [-1.06,1.06]){
    limb([x,.04,-2.96],[x,2.61,2.42],.105,green);
    limb([x,1.08,-2.96],[x,3.64,2.42],.052,rail);
    for(const i of [0,3,6,9,12,15]){
     const y=.19+i*.167,z=-2.92+i*.353;
     box(green,x,y+.42,z,.085,.84,.075,'metal');
    }
   }
   box(green,0,2.61,2.86,2.20,.27,.91,'metal');
   for(const x of [-.94,.94])box(green,x,1.29,2.61,.18,2.58,.20,'metal');
   box(0x343a3c,-.77,1.15,-2.76,.65,.43,.09,'metal');
   sphere(0xae5798,-.96,1.15,-2.82,.12,.12,.03);
  }else if(model==='corona-information-board'){
   const steel=0x454b4f,paper=0xe2dfca;
   for(const x of [-.49,.49])box(steel,x,1.08,0,.065,2.16,.065,'metal');
   box(steel,0,1.64,0,1.24,.84,.12,'metal');
   box(paper,0,1.63,.067,1.13,.70,.018);
   box(0x434f60,0,1.89,.078,1.10,.13,.02);
   for(const y of [1.46,1.58,1.70])box(0x86928c,0,y,.08,.73,.025,.02);
  }else if(model==='corona-wayfinding-map'){
   const dark=0x343d4b;
   box(dark,0,1.175,0,.79,2.35,.20,'metal');
   box(0xedc366,0,2.12,.105,.69,.25,.02);
   box(0xe1dbc8,0,1.40,.106,.69,1.04,.02);
   box(0x779a77,.15,1.31,.119,.27,.38,.018);
   for(const y of [1.04,1.24,1.51,1.72])box(0xf9f4dd,0,y,.12,.64,.027,.018);
  }else if(model==='corona-cycle-stands'){
   const steel=0x485354;
   for(const x of [-.63,.63]){
    let previous=[x,0,-.34];
    for(const point of [[x,.66,-.34],[x,.85,-.22],[x,.85,.22],[x,.66,.34],[x,0,.34]]){
     limb(previous,point,.045,steel);
     previous=point;
    }
   }
  }else if(model==='corona-water-fountain'){
   const steel=0x949fa1;
   cylinder(0x686e6d,0,.44,0,.12,.88,'metal');
   box(steel,0,.883,.05,.54,.10,.48,'metal');
   box(0x535b59,0,.939,.05,.43,.028,.36,'metal');
   cylinder(steel,.15,.99,-.04,.052,.12,'metal');
  }else if(model==='roberto-clemente-para-roberto'){
   const darkBronze=0x586049,chair=0x8e683b,trim=0xc4a95e;
   cylinder(0xc3b5a1,0,.06,0,1.78,.12);
   for(let i=0;i<12;i++){
    const azimuth=i*Math.PI/6,dx=Math.cos(azimuth),dz=Math.sin(azimuth);
    let previous=[dx*1.63,.12,dz*1.63];
    for(const [radius,y] of [[1.68,.91],[1.62,1.71],[1.42,2.48],[.95,3.14],[.46,3.57],[.16,3.72]]){
     const turn=(3.72-y)*.014+(i%2)*.08;
     const point=[dx*radius+dz*turn,y-(i%3)*.04,dz*radius-dx*turn];
     limb(previous,point,.039,darkBronze);
     previous=point;
    }
   }
   for(const x of [-.33,.33]){
    for(const z of [-.32,.31])limb([x,.12,z],[x,.77,z*.85],.063,chair);
    limb([x,.77,-.31],[x,1.56,-.42],.055,chair);
   }
   box(chair,0,.79,0,.77,.12,.75,'metal');
   box(chair,0,1.31,-.39,.73,.52,.092,'metal');
   for(const x of [-.26,-.13,0,.13,.26])box(trim,x,1.31,-.34,.035,.36,.020,'metal');
  }else if(model==='dakar-independence-obelisk'){
   const granite=0xe3ded0,trim=0xc3baaa,inscription=0x7f7356;
   for(let i=0;i<3;i++){
    const width=9.2-i*.76;
    box(trim,0,.16+i*.28,0,width,.30,width);
   }
   box(granite,0,1.68,0,6.05,1.62,6.05);
   box(trim,0,2.55,0,5.8,.23,5.8);
   const shaftWidth=5.15,shaftBase=2.65,shaftHeight=12.6,topRatio=.62;
   add('obelisk-shaft','stone',granite,0,shaftBase+shaftHeight/2,0,shaftWidth,shaftHeight,shaftWidth);
   add('obelisk-cap','stone',0xeee9de,0,shaftBase+shaftHeight+.58,0,shaftWidth*topRatio,1.16,shaftWidth*topRatio);
   const letters={
    M:['10001','11011','10101','10001','10001'],
    C:['011','100','100','100','011'],
    L:['100','100','100','100','111'],
    X:['101','101','010','101','101']
   };
   const unit=.108;
   let x=-1.17;
   for(const letter of 'MCMLX'){
    letters[letter].forEach((line,row)=>{
     const y=12.73-row*unit;
     const depth=shaftWidth/2*(1-(1-topRatio)*(y-shaftBase)/shaftHeight);
     for(let col=0;col<line.length;col++){
      if(line[col]==='1')box(inscription,x+col*unit,y,depth+.016,unit+.003,unit+.003,.072);
     }
    });
    x+=(letters[letter][0].length+1)*unit;
   }
  }else if(model==='porto-novo-toffa'){
   const plinth=0x486b59,edge=0x294638,robe=0x8e5b42,blue=0x435b78,bronze=0x79563b,brass=0xc19c62;
   box(0xbcb1a3,0,.27,0,3.8,.54,3.8);
   box(edge,0,.62,0,2.95,.28,2.95);
   box(plinth,0,1.52,0,2.43,1.55,2.43);
   box(edge,0,2.36,0,2.8,.29,2.8);
   add('robe','stone',robe,0,3.72,0,1.08,2.49,.64);
   sphere(robe,0,4.73,0,.88,.74,.51,'stone');
   for(const side of [-1,1]){
    sphere(bronze,side*.31,2.60,.31,.27,.15,.43,'stone');
    limb([side*.74,4.30,.20],[side*.40,2.71,.61],.058,blue,'stone');
   }
   sphere(bronze,0,5.57,.02,.37,.46,.34,'stone');
   sphere(bronze,0,5.55,.32,.13,.18,.13,'stone');
   cylinder(bronze,0,5.99,-.02,.46,.29);
   sphere(brass,0,6.18,-.04,.37,.33,.33,'stone');
   ring(brass,0,5.96,0,.43,.042,'metal');
   limb([-.71,5.03,0],[-1.17,4.83,.27],.26,robe,'stone');
   limb([-1.17,4.83,.27],[-1.48,5.05,.58],.16,bronze,'stone');
   sphere(bronze,-1.52,5.09,.61,.23,.16,.16,'stone');
   limb([.69,5.02,0],[1.07,4.54,.13],.24,robe,'stone');
   limb([1.07,4.54,.13],[1.02,4.06,.55],.16,bronze,'stone');
   limb([1.08,2.52,.58],[1.08,4.81,.58],.068,brass,'metal');
   limb([-.30,5.12,.34],[0,4.59,.49],.055,brass,'metal');
   limb([0,4.59,.49],[.30,5.12,.34],.055,brass,'metal');
  }else if(model==='maputo-city-hall'){
   const masonry=0xb1a99a,trim=0xcfc8b8,shadow=0x585855,roof=0x77766f;
   box(masonry,0,.55,0,66,1.10,36.2);
   box(masonry,0,9.65,-2.4,65.2,17.10,31.2);
   box(trim,0,18.47,-2.4,67,.72,32.5);
   box(roof,0,19.20,-2.4,64.2,.8,30.5);
   for(const side of [-1,1]){
    for(let column=0;column<4;column++){
     const x=side*(12.3+column*5.05);
     for(const y of [6.4,12.88]){
      box(trim,x,y,13.28,2.75,4.02,.29);
      box(shadow,x,y-.17,13.48,1.98,3.25,.13);
      sphere(shadow,x,y+1.42,13.5,.99,.79,.08,'stone');
     }
    }
    for(const y of [6.7,12.9])for(const z of [-13,-5,3.1,10.9]){
     box(trim,side*32.69,y,z,.26,3.66,2.67);
     box(shadow,side*32.86,y,z,.10,3.02,1.95);
    }
   }
   for(let i=0;i<4;i++)box(trim,0,.23+i*.36,16.0-i*.38,20.75-i*.45,.46,4.0);
   for(let i=0;i<6;i++){
    const x=(i-2.5)*3.16;
    cylinder(trim,x,2.18,15.58,.88,.60);
    cylinder(masonry,x,8.64,15.58,.58,12.48);
    cylinder(trim,x,15.10,15.58,.86,.59);
   }
   for(const x of [-5.90,0,5.90])box(shadow,x,5.17,13.35,2.84,6.2,.18);
   box(trim,0,16.38,15.4,23.2,1.74,4.65);
   box(trim,0,17.51,15.4,24,.55,4.98);
   box(masonry,0,18.94,15.4,21.1,2.32,4.01);
   box(trim,0,20.27,15.4,22.2,.57,4.20);
   cylinder(0x807361,0,21.28,15.4,.11,1.31,'metal');
  }else if(model==='maputo-samora-machel'){
   const marble=0xe3ded0,darkBronze=0x584b3b;
   for(let i=0;i<4;i++){
    const width=8.9-i*.93;
    box(marble,0,.17+i*.31,0,width,.36,width);
   }
   box(marble,0,2.44,0,4.08,2.28,3.70);
   box(marble,0,3.76,0,4.37,.41,3.9);
   plaque(2.42,2.48,1.87);
   human(0,3.97,0,3.10,'proclaiming',darkBronze);
  }else if(model==='accra-independence-arch'){
   const concrete=0xe0d0b3,trim=0xf0e5d3,shadow=0x9e9585;
   for(const side of [-1,1]){
    box(concrete,side*21.5,4.50,0,6.2,9,16.6);
    box(shadow,side*15.25,2.9,-.5,1.60,5.8,12.4);
    box(concrete,side*9.55,2.9,-.5,1.65,5.8,12.4);
   }
   box(concrete,0,7.98,0,49,2.2,17.3);
   box(trim,0,9.27,0,50.2,.52,18);
   box(concrete,0,6.25,8.23,28.6,.48,3.5);
   for(const side of [-1,1]){
    box(shadow,0,10.21,side*8.63,46.8,.15,.18);
    for(let i=-8;i<=8;i++)box(trim,i*2.70,9.80,side*8.63,.14,.95,.17);
   }
   // Broad ribs follow the folded, rising silhouette above the tribune.
   for(const z of [-5.8,5.8]){
    let from=new T.Vector3(-24,9.53,z);
    for(let i=1;i<=14;i++){
     const t=i/14,to=new T.Vector3(-24+48*t,9.53+19.1*Math.sin(Math.PI*t),z);
     const delta=to.clone().sub(from);
     const mid=from.clone().lerp(to,.5);
     const orientation=new T.Quaternion().setFromUnitVectors(UP,delta.clone().normalize());
     add('box','stone',trim,mid.x,mid.y,mid.z,1.72,delta.length()+.65,2.40,orientation);
     from=to;
    }
   }
   box(trim,0,28.81,0,2.02,1.15,14.0);
  }else if(model==='accra-black-star-gate'){
   const concrete=0xdfdcd1,trim=0xf1ead9,dark=0x282b2a;
   for(const side of [-1,1]){
    box(concrete,side*9.15,7.98,0,5.8,15.96,9.75);
    box(trim,side*9.15,.28,0,7.0,.56,10);
    for(const z of [-4.93,4.93]){
     box(trim,side*7.85,8,z,.45,15,.22);
     box(trim,side*10.45,8,z,.45,15,.22);
    }
   }
   box(concrete,0,17.53,0,24.6,3.06,9.6);
   box(trim,0,19.72,0,25,1.34,10);
   box(concrete,0,20.66,0,6.16,.82,4.55);
   add('flag-star','metal',dark,0,21.82,0,1.28,1.28,.52);
  }else if(model==='shanghai-huangpu-light-fountain'){
   const rim=0xbababa,granite=0x8f9193,nozzle=0x686e73,water=0x78c5d9;
   add('fountain-deck','stone',rim,0,.15,0,15.25,.30,15.25);
   add('fountain-deck','stone',granite,0,.33,0,14.5,.08,14.5);
   ring(rim,0,.40,0,11.2,.075,'stone');
   ring(rim,0,.41,0,7.2,.065,'stone');
   for(const [radius,count,height] of [[5.9,10,4.3],[10.2,16,2.5]]){
    for(let i=0;i<count;i++){
     const angle=i*Math.PI*2/count,x=radius*Math.cos(angle),z=radius*Math.sin(angle);
     cylinder(nozzle,x,.45,z,.18,.10,'metal');
     add('cone','water',water,x,.50+height/2,z,.14,height,.14);
    }
   }
   add('cone','water',water,0,2.9,0,.25,4.8,.25);
  }else if(model==='hong-kong-thomas-jackson'){
   const limestone=0xb8ad9b,bronzePatina=0x47584d;
   box(limestone,0,.20,0,3.65,.40,3.8);
   box(limestone,0,.56,0,3.25,.34,3.4);
   box(limestone,0,1.92,0,2.20,2.40,2.34);
   box(limestone,0,3.23,0,2.75,.24,2.95);
   plaque(2.06,1.30,1.20);
   human(0,3.36,0,1.10,'civil',bronzePatina);
  }else if(model==='pimpri-ambedkar-pavilion'){
   const plaster=0xeee9de,trim=0xd7d3c9,plinth=0x3f4145,figure=0xb18a48,blue=0x2d5b9f;
   add('octagonal-column','stone',trim,0,.14,0,2.60,.28,2.60);
   add('octagonal-column','stone',plaster,0,.33,0,2.49,.12,2.49);
   for(let i=0;i<8;i++){
    const angle=(i+.5)*Math.PI/4,x=2.14*Math.sin(angle),z=2.14*Math.cos(angle);
    box(trim,x,.61,z,.39,.43,.39);
    box(plaster,x,2.73,z,.24,3.93,.24);
    box(trim,x,4.67,z,.36,.22,.36);
   }
   for(const side of [-1,1]){
    const x=side*1.98;
    for(const y of [.44,1.02])box(trim,x,y,0,.055,.065,1.63);
    for(let i=0;i<4;i++){
     const z=-.80+i*.40;
     limb([x,.44,z],[x,1.02,z+.40],.022,trim,'stone');
     limb([x,1.02,z],[x,.44,z+.40],.022,trim,'stone');
    }
   }
   box(plinth,0,.51,0,1.77,.24,1.67);
   box(plinth,0,1.05,0,1.35,.84,1.25);
   box(plinth,0,1.52,0,1.52,.14,1.41);
   human(0,1.59,0,.99,'proclaiming',figure);
   add('octagonal-column','stone',trim,0,4.87,0,2.57,.24,2.57);
   add('octagonal-column','stone',plaster,0,5.06,0,2.45,.18,2.45);
   add('pimpri-pavilion-dome','stone',plaster,0,5.14,0,2.24,1.26,2.24);
   cylinder(trim,0,6.45,0,.20,.15);
   box(blue,0,6.61,0,.07,.31,.07,'metal');
   const upright=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('torus','metal',blue,0,6.94,0,.40,.40,.40,upright);
   for(let i=0;i<24;i++){
    const angle=i*Math.PI/12;
    limb([0,6.94,0],[.39*Math.cos(angle),6.94+.39*Math.sin(angle),0],.008,blue);
   }
  }else if(model==='mumbai-flora-fountain'){
   const portland=0xe7ddc8,trim=0xccc0a8,bowl=0xc0b59a;
   cylinder(trim,0,.10,0,6.05,.20);
   add('mumbai-flora-basin','stone',portland,0,0,0,1,1,1);
   cylinder(water,0,.25,0,5.70,.035,'water');
   cylinder(trim,0,.42,0,2.25,.31);
   box(portland,0,3.89,0,3.55,.29,3.55);
   box(trim,0,4.14,0,3.25,.26,3.25);
   box(portland,0,5.14,0,2.21,1.74,2.21);
   box(trim,0,6.10,0,2.65,.20,2.65);
   cylinder(portland,0,6.86,0,.85,1.38);
   cylinder(trim,0,7.58,0,1.02,.23);
   cylinder(portland,0,7.87,0,.78,.36);
   human(0,8.05,0,.78,'classical',marble);
   sphere(trim,.12,9.01,.26,.18,.11,.10,'stone');
   for(const [x,y,z] of [[.01,9.13,.29],[.10,9.20,.31],[.21,9.16,.28],[.18,9.10,.34]])
    sphere(portland,x,y,z,.058,.068,.052,'stone');
   for(let i=0;i<4;i++){
    const angle=i*Math.PI/2,dx=Math.sin(angle),dz=Math.cos(angle);
    const yaw=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('jicin-well-arch','stone',portland,dx*1.22,.70,dz*1.22,2.45,2.98,.47,yaw);
    const x=Math.sin(angle+Math.PI/4),z=Math.cos(angle+Math.PI/4);
    cylinder(trim,x*1.89,.71,z*1.89,.38,.32);
    cylinder(portland,x*1.89,1.36,z*1.89,.29,.98);
    sphere(portland,x*2.11,1.99,z*2.11,.33,.28,.33,'stone');
    sphere(portland,x*1.89,2.34,z*1.89,.31,.55,.31,'stone');
    sphere(portland,x*1.88,2.93,z*1.88,.22,.26,.22,'stone');
    limb([x*1.87+z*.15,2.49,z*1.87-x*.15],[x*2.16+z*.23,2.08,z*2.16-x*.23],.09,portland,'stone');
    limb([x*1.87-z*.15,2.47,z*1.87+x*.15],[x*2.18-z*.23,2.05,z*2.18+x*.23],.09,portland,'stone');
    limb([x*2.10+z*.12,2.00,z*2.10-x*.12],[x*2.29+z*.13,1.56,z*2.29-x*.13],.115,portland,'stone');
    limb([x*2.10-z*.12,2.00,z*2.10+x*.12],[x*2.29-z*.13,1.56,z*2.29+x*.13],.115,portland,'stone');
    add('mumbai-flora-bowl','stone',bowl,dx*1.98,4.59,dz*1.98,1,1,1,yaw);
    sphere(trim,dx*1.58,4.75,dz*1.58,.30,.57,.30,'stone');
    add('box','stone',trim,dx*1.101,5.74,dz*1.101,2.10,.10,.054,yaw);
    for(let carve=-2;carve<=2;carve++){
     sphere(trim,dx*1.126+dz*carve*.16,5.49+Math.abs(carve)*.036,dz*1.126-dx*carve*.16,.075,.10,.075,'stone');
    }
    sphere(portland,dx*.91,6.58,dz*.91,.26,.28,.26,'stone');
    const jet=[[dx*2.56,5.06,dz*2.56],[dx*2.81,4.80,dz*2.81],[dx*3.10,4.09,dz*3.10],[dx*3.36,2.80,dz*3.36],[dx*3.55,.27,dz*3.55]];
    for(let segment=1;segment<jet.length;segment++)limb(jet[segment-1],jet[segment],.026,water,'water');
   }
  }else if(model==='mumbai-martyrs-memorial'){
   const pale=0xe0d8c9,lower=0x76736b,bronzeFigures=0x485848;
   box(lower,0,.15,0,4.24,.30,3.54);
   box(pale,0,.47,0,3.84,.34,3.12);
   box(pale,0,1.79,0,2.95,2.3,2.30);
   box(pale,0,3.06,0,3.34,.24,2.56);
   box(0x80382d,0,1.85,1.155,2.03,.90,.032);
   human(0,3.18,.36,.91,'proclaiming',bronzeFigures);
   limb([-.57,5.81,.57],[-.59,6.19,.58],.048,bronzeFigures,'patina');
   sphere(bronzeFigures,-.59,6.23,.58,.105,.22,.098,'patina');
   cylinder(bronzeFigures,0,3.24,-.39,.42,.12,'patina');
   for(const side of [-1,1]){
    limb([side*.15,4.23,-.43],[side*.23,3.31,-.52],.12,bronzeFigures,'patina');
    sphere(bronzeFigures,side*.23,3.27,-.59,.15,.09,.22,'patina');
    limb([side*.31,4.85,-.41],[side*.49,4.54,-.30],.102,bronzeFigures,'patina');
    limb([side*.49,4.54,-.30],[side*.38,4.27,-.51],.079,bronzeFigures,'patina');
   }
   sphere(bronzeFigures,0,4.61,-.43,.39,.55,.235,'patina');
   sphere(bronzeFigures,0,5.26,-.47,.224,.284,.211,'patina');
   sphere(bronzeFigures,0,5.25,-.66,.08,.097,.091,'patina');
  }else if(model==='kingston-manley-statue'||model==='kingston-bustamante-statue'){
   const limestone=0xd7d3c5,darkBronze=0x494c3d,manley=model==='kingston-manley-statue';
   cylinder(limestone,0,.12,0,1.5,.24);
   box(limestone,0,.33,0,2.34,.24,2.34);
   box(limestone,0,1.48,0,1.52,2.1,1.52);
   box(limestone,0,2.59,0,1.77,.18,1.77);
   plaque(1.69,1.10,.78);
   human(0,2.69,0,.88,manley?'civil':'orator',darkBronze);
  }else if(model==='girona-defenders-monument'){
   const limestone=0xc3b59c,trim=0xd7c9ad,patina=0x4f5749;
   box(limestone,0,.085,0,5.55,.17,8.45);
   box(trim,0,.23,0,4.16,.13,6.53);
   box(limestone,0,.39,0,3.55,.20,4.64);
   box(trim,0,.59,0,2.91,.22,3.89);
   box(limestone,0,1.79,0,2.57,2.20,3.40);
   box(trim,0,2.92,0,2.81,.20,3.62);
   box(limestone,0,3.10,0,2.95,.19,3.78);
   box(0x5b5446,0,1.89,1.72,1.65,.79,.068,'stone');
   human(.25,3.19,-.40,.94,'orator',patina);
   add('cape','patina',patina,.19,4.22,-.62,.72,1.37,.16);
   // The other defenders remain low around the standing figure.
   sphere(patina,-.68,3.97,.18,.20,.22,.18,'patina');
   sphere(patina,-.73,3.58,-.01,.28,.30,.26,'patina');
   limb([-.83,3.47,-.12],[-1.12,3.38,.29],.12,patina,'patina');
   limb([-1.12,3.38,.29],[-.89,3.29,.63],.09,patina,'patina');
   limb([-.58,3.43,-.19],[-.40,3.34,.19],.105,patina,'patina');
   limb([-.84,3.74,.08],[-1.05,3.52,.47],.077,patina,'patina');
   limb([-.61,3.77,.09],[-.41,3.48,.59],.077,patina,'patina');
   sphere(patina,.74,3.41,.82,.29,.20,.67,'patina');
   sphere(patina,.75,3.38,1.48,.19,.19,.17,'patina');
   limb([.55,3.45,1.00],[.28,3.31,1.24],.085,patina,'patina');
   limb([.91,3.45,.99],[1.15,3.32,.78],.085,patina,'patina');
   limb([.64,3.40,.43],[.35,3.30,-.37],.115,patina,'patina');
   limb([.85,3.39,.42],[1.02,3.30,-.37],.105,patina,'patina');
  }else if(model==='girona-turtle-fountain'){
   const granite=0xb3b0a0,relief=0x96958a,pale=0xc5bfb0;
   box(granite,0,.08,-.12,1.05,.16,.90);
   box(granite,0,.52,-.14,.78,.73,.70);
   box(pale,0,.91,-.12,.90,.12,.78);
   box(granite,0,.48,.43,1.39,.17,.64);
   box(relief,0,.57,.67,1.41,.10,.16);
   for(const side of [-1,1])box(pale,side*.62,.57,.42,.17,.10,.51);
   box(water,0,.577,.42,1.08,.018,.37,'water');
   sphere(granite,0,1.16,.03,.40,.21,.37,'stone');
   sphere(granite,0,1.07,.41,.135,.115,.15,'stone');
   for(const side of [-1,1]){
    limb([side*.21,1.08,.13],[side*.43,1.01,.30],.065,relief,'stone');
    limb([side*.18,1.08,-.19],[side*.35,1.02,-.36],.055,granite,'stone');
    limb([side*.12,1.38,-.12],[side*.22,1.27,.17],.057,granite,'stone');
    limb([side*.13,1.59,.04],[side*.22,1.35,.21],.038,pale,'stone');
   }
   sphere(pale,0,1.53,-.02,.166,.231,.17,'stone');
   sphere(pale,0,1.77,.071,.135,.139,.131,'stone');
   limb([0,1.045,.55],[0,.59,.59],.013,water,'water');
  }else if(model==='girona-independencia-newsstand'){
   const steel=0x6a6e64,trim=0x999c92,glass=0x435756,red=0x972b2c;
   box(steel,0,1.26,0,3.88,2.52,2.92);
   box(trim,0,2.74,.09,4.30,.27,3.11);
   box(glass,0,1.64,1.49,3.55,1.33,.05,'glass');
   box(trim,0,.96,1.51,3.62,.14,.17);
   box(red,0,2.45,1.49,3.67,.24,.08);
   for(const x of [-1.21,0,1.21])box(steel,x,1.63,1.53,.05,1.26,.035);
   for(const side of [-1,1]){
    box(glass,side*1.96,1.59,.19,.04,1.10,1.84,'glass');
    box(trim,side*1.98,.98,.19,.08,.10,1.92);
   }
   for(let i=0;i<7;i++)box([0xd0b748,0xd6cbc1,0x793e4b][i%3],-1.33+i*.44,1.22,1.55,.26,.37,.05,'stone');
  }else if(model==='barcelona-generalitat-facade'||model==='barcelona-city-hall-facade'){
   const hall=model==='barcelona-city-hall-facade';
   const masonry=hall?0xc4b6a0:0xbcb09d,trim=hall?0xd4c5ab:0xcbbaa1,shadow=0x5b5247,wood=0x514635,iron=0x4b4c47;
   const width=hall?46.7:36.55,height=hall?15.2:17.25,front=2.15;
   box(masonry,0,height/2,-.4,width,height,5.10);
   for(const y of [.22,5.65,11.75,height-.23])box(trim,0,y,2.13,width,.33,.45);
   const opening=(x,y,w,h)=>{
    box(trim,x,y,front+.07,w+.38,h+.32,.23);
    box(shadow,x,y,front+.20,w,h,.055);
    box(wood,x,y,front+.24,w*.88,h*.89,.058);
    box(masonry,x,y,front+.29,.065,h*.88,.040);
    box(trim,x,y-h/2-.14,front+.23,w+.51,.19,.41);
   };
   const door=(x,w,h)=>{
    add('masonry-arch','stone',trim,x,h*.595,front+.10,w+1.10,h*1.19,.32);
    add('barcelona-arched-door','stone',wood,x,h*.50,front+.28,w,h,.075);
    box(shadow,x,h*.47,front+.33,.060,h*.89,.036);
   };
   const columns=(locations,y,h,r,color)=>{
    for(const x of locations){
     box(trim,x,y+.16,2.75,r*2.50,.32,r*2.40);
     cylinder(color,x,y+h/2,2.75,r,h-.45);
     box(trim,x,y+h-.12,2.75,r*2.46,.35,r*2.40);
    }
   };
   if(hall){
    for(const x of [-19.2,-14.6,-9.9,9.9,14.6,19.2]){
     opening(x,2.9,1.60,3.05);opening(x,8.65,1.70,3.19);opening(x,13.15,1.48,1.55);
    }
    door(0,4.0,5.0);
    for(const x of [-5.45,5.45]){
     add('masonry-arch','stone',trim,x,2.88,front+.14,2.92,4.80,.38);
     box(shadow,x,2.08,front+.18,1.76,2.82,.06);
     box(trim,x,.91,front+.40,1.55,.45,.65);
     human(x,1.11,front+.43,.93,'classical',marble);
    }
    box(trim,0,5.81,2.49,14.7,.38,.94);
    columns([-6.01,-2.03,2.03,6.01],6.00,7.65, .43, trim);
    for(const x of [-6.01,-2.03,2.03,6.01])for(const side of [-1,1])sphere(trim,x+side*.38,13.53,2.89,.14,.15,.13,'stone');
    for(const x of [-3.96,0,3.96])opening(x,8.95,1.65,3.45);
    box(trim,0,14.04,2.57,14.3,.83,.94);
    sphere(trim,0,15.81,2.30,.81,.92,.24,'stone');
    sphere(shadow,0,12.67,front+.23,.64,.64,.15,'stone');
    limb([0,12.67,front+.39],[.21,12.80,front+.39],.043,marble,'stone');
    limb([0,12.67,front+.39],[-.12,12.93,front+.39],.041,marble,'stone');
   }else{
    for(const x of [-14.65,-10.72,-6.79,6.79,10.72,14.65]){
     opening(x,3.05,1.55,2.95);opening(x,9.12,1.81,3.53);opening(x,14.53,1.52,2.62);
     add('pediment','stone',trim,x,11.17,front+.20,2.48,.57,.31);
     box(iron,x,7.69,2.43,2.24,.58,.07,'metal');
    }
    door(0,4.6,5.21);
    columns([-5.38,-3.56,3.56,5.38],.29,5.42,.34,0x8a8981);
    box(trim,0,5.83,2.55,12.78,.66,1.10);
    add('masonry-arch','stone',trim,0,9.38,2.35,4.97,5.28,.44);
    box(shadow,0,8.42,2.46,2.98,3.13,.06);
    // The shallow niche shows Sant Jordi and the horse from the square.
    sphere(marble,-.14,8.25,2.67,.88,.28,.19,'stone');
    limb([.36,8.27,2.68],[.68,8.90,2.68],.20,marble,'stone');
    sphere(marble,.75,8.90,2.67,.23,.16,.14,'stone');
    for(const x of [-.67,.36])limb([x,8.16,2.66],[x+.26,7.77,2.67],.10,marble,'stone');
    limb([-.16,8.45,2.69],[-.21,9.16,2.69],.13,marble,'stone');
    sphere(marble,-.22,9.29,2.69,.15,.19,.14,'stone');
    limb([-.24,8.86,2.72],[.96,7.76,2.74],.048,marble,'stone');
    box(trim,0,17.69,0,width,.28,5.18);
    for(let i=-14;i<=14;i++)box(trim,i*1.18,17.96,2.30,.31,.53,.33);
    box(trim,0,18.32,2.29,width,.16,.47);
   }
  }else if(model==='solsona-ca-aguilar-porch'){
   const masonry=0xb3a494,trim=0xd0bfa7,shade=0x6c6258,wood=0x665446,iron=0x454442;
   // The public front faces the square from the north side of this façade.
   box(masonry,0,1.65,1.15,8.7,3.3,1.8);
   box(masonry,0,6.23,0,8.68,6.3,4.24);
   for(const x of [-3.82,-1.27,1.27,3.82]){
    box(trim,x,.14,-1.74,.78,.28,.79);
    box(masonry,x,1.79,-1.74,.52,3.14,.56);
    box(trim,x,3.34,-1.74,.72,.23,.74);
   }
   box(wood,0,3.48,-1.73,8.85,.3,.58);
   box(trim,0,3.72,-2.12,8.85,.22,.25);
   add('masonry-arch','stone',trim,0,1.99,.2,2.1,1.27,.16);
   box(wood,0,.84,.19,1.24,1.68,.12);
   for(const y of [5.32,7.86])for(const x of [-2.68,0,2.68]){
    box(trim,x,y,-2.15,1.22,1.85,.14);
    box(shade,x,y,-2.23,.93,1.55,.08);
    if(y===5.32){
     box(trim,x,y-.94,-2.25,1.67,.17,.34);
     box(iron,x,y-.54,-2.42,1.53,.065,.052,'metal');
     for(const offset of [-.65,-.32,0,.32,.65])box(iron,x+offset,y-.75,-2.42,.04,.38,.04,'metal');
    }
   }
   box(wood,0,9.38,0,8.85,.29,4.4);
  }else if(model==='ordino-comunidor'){
   const masonry=0xa8947b,archStone=0xb3a089,slate=0x535659,iron=0x393b3a;
   const eastPier=1.66,southPier=1.88;
   box(archStone,0,.09,0,4.12,.18,4.53);
   for(const side of [-1,1]){
    for(const corner of [-1,1]){
     box(masonry,side*eastPier,.79,corner*southPier,.73,1.38,.73);
     box(archStone,side*eastPier,1.50,corner*southPier,.78,.16,.78);
    }
    add('masonry-arch','stone',masonry,0,2.19,side*southPier,4.04,1.35,.48);
    const turn=new T.Quaternion().setFromAxisAngle(UP,Math.PI/2);
    add('masonry-arch','stone',masonry,side*eastPier,2.19,0,4.48,1.35,.48,turn);
   }
   box(archStone,0,2.87,0,4.22,.15,4.65);
   add('ordino-slate-roof','stone',slate,0,2.94,0,4.35,1.33,4.80);
   box(iron,0,4.55,0,.065,.58,.065,'metal');
   box(iron,0,4.63,0,.44,.062,.065,'metal');
  }else if(model==='andorra-casa-de-la-vall'){
   const granite=0x827a6d,trim=0xa79982,slate=0x454c52,shutter=0x514435;
   box(granite,0,4.90,0,19.4,9.8,15.9);
   box(trim,0,9.82,0,19.6,.25,16.1);
   add('hip-roof','stone',slate,0,9.96,0,20.6,4.12,17.2);
   for(const y of [4.45,7.43])for(const x of [-6.5,0,6.5]){
    box(trim,x,y,8.02,1.76,1.78,.21);
    box(shutter,x,y,8.16,1.22,1.35,.08,'wood');
    box(granite,x,y,8.22,.08,1.35,.03);
   }
   for(const y of [4.45,7.43])for(const z of [-5.14,0,5.14]){
    box(trim,-9.73,y,z,.20,1.51,1.48);
    box(shutter,-9.86,y,z,.08,1.10,1.03,'wood');
   }
   box(trim,-1.07,1.13,8.04,2.33,2.25,.23);
   box(shutter,-1.07,1.10,8.19,1.62,2.20,.12,'wood');
   sphere(shutter,-1.07,2.12,8.20,.81,.52,.08,'wood');
   cylinder(granite,8.83,7.92,7.42,1.06,4.3);
   cylinder(trim,8.83,10.11,7.42,1.14,.20);
   add('cone','stone',slate,8.83,11.22,7.42,1.18,2.19,1.18);
  }else if(model==='cuenca-calderon-monument'){
   const limestone=0xb2a696,darkBronze=0x4c5245;
   box(limestone,0,.20,0,3.90,.40,3.90);
   box(limestone,0,.53,0,3.45,.26,3.45);
   box(limestone,0,.80,0,2.85,.28,2.85);
   box(limestone,0,2.03,0,1.92,2.20,1.92);
   box(limestone,0,3.22,0,2.42,.23,2.42);
   plaque(2.05,1.16,.975);
   human(0,3.34,0,1.20,'civil',darkBronze);
  }else if(model==='cuenca-calderon-glorieta'){
   const iron=0x294737,trim=0xa8945f,deck=0xb6ab96;
   add('bandstand-deck','stone',deck,0,.18,0,3.55,.36,3.55);
   add('bandstand-roof','metal',iron,0,3.32,0,3.60,1.2,3.60);
   add('bandstand-deck','metal',iron,0,3.34,0,3.53,.16,3.53);
   sphere(trim,0,4.59,0,.12,.22,.12,'metal');
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4,x=Math.cos(angle)*3.04,z=Math.sin(angle)*3.04;
    cylinder(iron,x,1.86,z,.105,2.96,'metal');
    cylinder(trim,x,3.19,z,.15,.12,'metal');
    for(const offset of [-.17,.17]){
     const a=angle+offset;
     limb([x,2.78,z],[Math.cos(a)*3.15,3.25,Math.sin(a)*3.15],.045,iron);
    }
   }
  }else if(model==='tabaco-plaza-gazebo'){
   const pale=0xe2d0b9,greenRoof=0x2f6858,redTrim=0x963e34;
   cylinder(pale,0,.13,0,2.93,.26);
   cylinder(redTrim,0,3.13,0,3.20,.27);
   add('cone','stone',greenRoof,0,3.87,0,3.13,1.32,3.13);
   cylinder(greenRoof,0,4.60,0,.18,.39);
   for(let i=0;i<6;i++){
    const angle=i*Math.PI/3,x=Math.cos(angle)*2.28,z=Math.sin(angle)*2.28;
    cylinder(pale,x,1.66,z,.17,2.80);
    cylinder(pale,x,.39,z,.27,.24);
    cylinder(pale,x,2.92,z,.23,.17);
   }
  }else if(model==='nankinmachi-azumaya'){
   const vermilion=0x9c3630,darkRed=0x702f29,brass=0xc49a4a,granite=0x9d9290;
   add('hex','stone',granite,0,.13,0,1.82,.26,1.82);
   add('hex','stone',0xc5b4a5,0,.27,0,1.70,.09,1.70);
   add('hex','patina',darkRed,0,3.04,0,1.73,.28,1.73);
   const at=(radius,y,angle)=>[Math.sin(angle)*radius,y,Math.cos(angle)*radius];
   for(let side=0;side<6;side++){
    const angle=side*Math.PI/3,next=angle+Math.PI/3;
    const [x,,z]=at(1.56,0,angle);
    cylinder(darkRed,x,.40,z,.20,.18,'patina');
    cylinder(vermilion,x,1.75,z,.13,2.62,'patina');
    cylinder(brass,x,2.97,z,.18,.15,'metal');
    limb(at(1.57,3.04,angle),at(1.57,3.04,next),.105,vermilion,'patina');
    limb(at(1.59,3.16,angle),at(1.59,3.16,next),.038,brass,'metal');
   }
   for(const [y,radius,height] of [[3.16,2.45,1.30],[4.35,1.61,.96],[5.20,1.11,1.05]]){
    add('azumaya-eaves','patina',brass,0,y,0,radius,height,radius);
    add('hex','patina',vermilion,0,y-.04,0,radius*.76,.14,radius*.76);
    for(let side=0;side<6;side++){
     const angle=side*Math.PI/3;
     limb(at(radius*.71,y+height*.34,angle),at(radius*.98,y+height*.12,angle),.044,darkRed,'patina');
     sphere(brass,...at(radius*.96,y+height*.17,angle),.072,.11,.072);
    }
   }
   cylinder(darkRed,0,6.27,0,.14,.23,'patina');
   sphere(brass,0,6.45,0,.13,.15,.13);
  }else if(model==='liberty-paifang'){
   const limestone=0xe4e1d6,trim=0xc3bfb4,blue=0x284977,ridge=0x3b5980;
   const columns=[-7.44,-4.93,-2.33,2.33,4.93,7.44];
   const capitals=[2.11,2.76,3.46,3.46,2.76,2.11];
   const springs=[1.18,1.70,2.25,1.70,1.18];
   const lintels=[3.01,3.80,5.13,3.80,3.01];
   const roof=(x,y,width,depth,height)=>{
    box(trim,x,y-.08,0,width*.92,.17,depth*.84);
    add('paifang-roof','stone',blue,x,y,0,width,height,depth);
    box(ridge,x,y+height,0,width*.54,.07,.12);
   };
   for(const [i,x] of columns.entries()){
    const h=capitals[i];
    box(limestone,x,.10,0,.86,.20,1.36);
    box(trim,x,.23,0,.74,.13,1.18);
    box(limestone,x,(h+.24)/2,0,.64,h-.24,1.10);
    box(trim,x,h-.07,0,.82,.18,1.27);
    roof(x,h,.98,1.52,.27);
   }
   for(const [i,spring] of springs.entries()){
    const x=(columns[i]+columns[i+1])/2,width=columns[i+1]-columns[i];
    const top=lintels[i],central=i===2;
    add('paifang-span','stone',limestone,x,spring,0,width,top-spring,central?.89:.72);
    box(trim,x,top-.10,0,width+.17,.16,central?1.12:.94);
    roof(x,top,width+.43,central?2.08:1.58,central?.79:.48);
    for(const side of [-1,1]){
     const face=side*(central?.463:.38);
     box(central?0x9a9386:trim,x,top-(central?.39:.29),face,central?2.05:width*.53,central?.39:.25,.054);
     for(const edge of [-1,1])box(limestone,x+edge*width*.37,top-.40,face,.21,.40,.078);
    }
   }
  }else if(model==='delhi-baradari'){
   const white=0xf0ece3,plinth=0xd3c8b8,red=0xa65f4b;
   box(plinth,0,.16,0,8.3,.32,8.3);
   box(white,0,.37,0,7.7,.13,7.7);
   for(const face of [-1,1]){
    for(const offset of [-2.4,0,2.4]){
     add('park-arch','stone',white,offset,.43,face*3.53,2.44,3.32,.32);
     add('park-arch','stone',white,face*3.53,.43,offset,2.44,3.32,.32,
      new T.Quaternion().setFromAxisAngle(UP,Math.PI/2));
    }
   }
   box(red,0,3.84,0,7.8,.14,7.8);
   box(white,0,4.03,0,8.4,.25,8.4);
   box(white,0,4.28,0,7.3,.25,7.3);
   for(const axis of [-1,1]){
    box(white,axis*3.46,4.57,0,.20,.34,7.02);
    box(white,0,4.57,axis*3.46,7.02,.34,.20);
   }
  }else if(model==='condamine-market-hall'){
   const plaster=0xdfb5ac, stonework=0xecd1bc, tile=0x9e6554;
   box(plaster,1.6,3.75,0,16.7,7.5,59);
   box(stonework,-1.2,5.15,0,18.9,.40,59.5);
   box(tile,0,8.25,0,21.1,1.7,60);
   const front=new T.Quaternion().setFromAxisAngle(UP,Math.PI/2);
   for(const z of [-24.8,-14.9,-5.0,5.0,14.9,24.8])
    add('park-arch','stone',plaster,-9.8,0,z,9.9,5.05,1.2,front);
   for(const z of [-22.7,-15.1,-7.55,0,7.55,15.1,22.7]){
    box(stonework,-6.98,6.45,z,.23,1.32,2.35);
    box(0x5a5554,-7.12,6.45,z,.13,1.04,1.98);
   }
  }else if(model==='delhi-entry-arcade'){
   const sandstone=0xaa5c47,trim=0xdbaf92;
   for(const x of [-4.96,-2.48,0,2.48,4.96]){
    add('park-arch','stone',sandstone,x,0,0,2.48,3.3,.7);
   }
   box(trim,0,3.36,0,12.4,.12,.88);
   box(sandstone,0,3.51,0,12.35,.18,.9);
  }else if(model==='delhi-open-air-theatre'){
   const sandstone=0xaa6a54,tread=0xd7baa0;
   box(sandstone,0,.30,-3.8,13,.6,3.3);
   box(tread,0,.64,-3.8,12.7,.08,3.1);
   for(let tier=0;tier<3;tier++){
    const height=.31*(tier+1),z=.95+tier*1.68;
    for(const side of [-1,1]){
     box(sandstone,side*4.1,height/2,z,6.8,height,1.71);
     box(tread,side*4.1,height+.07,z,6.7,.14,1.52);
    }
   }
  }else if(model==='tartini-monument'){
   const pale=0xe3d9ca,shade=0xbfb2a1,patina=0x536c60;
   box(shade,0,.16,0,2.75,.32,2.75);
   box(pale,0,.45,0,2.44,.28,2.44);
   box(pale,0,.78,0,2.17,.40,2.17);
   box(shade,0,1.08,0,1.81,.24,1.81);
   box(pale,0,2.08,0,1.53,1.80,1.53);
   box(shade,0,2.99,0,1.73,.17,1.73);
   box(pale,0,3.17,0,2.06,.19,2.06);
   box(pale,0,3.34,0,1.83,.17,1.83);
   box(0xada18f,0,2.22,.769,1.13,.59,.029);
   human(0,3.425,0,1.02,'violinist',patina);
  }else if(model==='goiania-tres-racas'){
   const granite=0x9e8b79,trim=0xb3a18b,figure=0x526456;
   box(granite,0,.11,0,3.10,.22,4.70);
   box(trim,0,.30,0,2.94,.16,4.48);
   box(granite,0,.48,0,2.76,.20,4.25);
   box(granite,0,.90,0,2.56,.64,3.96);
   box(trim,0,1.27,0,2.65,.12,4.02);
   for(const z of [-1.99,1.99])for(const x of [-.85,0,.85])box(0x695d50,x,.91,z,.64,.32,.026);
   box(granite,0,4.16,0,.78,5.68,.92);
   box(trim,0,6.97,0,.80,.06,.94);
   // Each figure pushes the same pillar with a different stance.
   for(const [angle,reach,lean] of [[-Math.PI/2,0,.35],[Math.PI,.48,.10],[Math.PI/2,.22,.04]]){
    const c=Math.cos(angle),s=Math.sin(angle);
    const at=(x,y,z)=>[x*c+z*s,y,-x*s+z*c];
    const joint=(x,y,z,rx,ry,rz)=>sphere(figure,...at(x,y,z),rx,ry,rz,'patina');
    const beam=(from,to,r)=>limb(at(...from),at(...to),r,figure,'patina');
    joint(0,2.48,1.06,.25,.23,.20);
    beam([0,2.48,1.06],[0,3.24,1.05-lean],.24);
    joint(0,3.10,1.06-lean,.31,.39,.22);
    beam([0,3.32,1.05-lean],[0,3.57,1.02-lean],.12);
    joint(0,3.65,1.00-lean,.17,.22,.17);
    for(const side of [-1,1]){
     const knee=[side*.20,1.89,side===1?1.01:1.20];
     const foot=[side*.24,1.45,side===1?.81:1.30];
     beam([side*.13,2.53,1.06],knee,.13);
     beam(knee,foot,.105);
     joint(foot[0],1.41,foot[2]-.07,.12,.08,.22);
     const elbow=[side*.29,3.10+reach,.76];
     const hand=[side*.20,3.43+reach,.44];
     beam([side*.24,3.24,1.03-lean],elbow,.105);
     beam(elbow,hand,.082);
     joint(...hand,.08,.10,.07);
    }
   }
  }else if(model==='fontvieille-saint-nicolas'){
   const wall=0xecb39c,wing=0xd49d88,cream=0xf0d7af,roof=0xb87056,recess=0x745f57;
   add('campanin-church-outline','stone',wall,0,3.70,0,1,7.4,1);
   add('campanin-church-outline','stone',cream,0,7.58,0,1,.37,1);
   add('hip-roof','stone',roof,1.82,8.51,-.22,19.1,2.19,24.25);
   add('hip-roof','stone',roof,-12.0,8.03,-3.4,12.2,1.15,12.2);
   // The south façade addresses the paved square. Its openings are stylized.
   const front=13.12;
   box(cream,1.81,.31,front-1.68,21.40,.62,3.35);
   for(const x of [-5.5,1.8,9.1]){
    const center=x===1.8,archWidth=center?4.20:3.15;
    box(recess,x,2.42,front+.023,archWidth*.67,4.08,.053);
    add('jicin-well-arch','stone',cream,x,.62,front+.10,archWidth,5.50,.18);
    box(center?0x79574b:0x8e7760,x,1.80,front+.07,archWidth*.52,2.30,.11);
    box(cream,x,4.35,front+.21,archWidth*.70,.22,.25);
   }
   box(cream,1.81,6.90,front+.08,21.70,.26,.24);
   for(const x of [-7.82,-2.12,5.70,11.44]){
    box(wing,x,3.65,front+.04,.22,5.85,.12);
   }
   const tx=-11.28,tz=4.78;
   box(wall,tx,7.48,tz,4.35,14.96,4.43);
   box(cream,tx,14.88,tz,4.60,.38,4.64);
   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2,dx=Math.sin(angle)*2.17,dz=Math.cos(angle)*2.17;
    const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('jicin-well-arch','stone',wall,tx+dx,15.00,tz+dz,4.37,4.04,.45,rotation);
   }
   cylinder(0x66564b,tx,16.30,tz,.69,1.53,'metal');
   box(cream,tx,18.94,tz,4.69,.36,4.71);
   add('campanin-dome','stone',0x9b7857,tx,19.09,tz,2.19,2.39,2.19);
   for(let row=0;row<5;row++){
    const latitude=(row+.63)*Math.PI/11;
    const radius=2.19*Math.cos(latitude),height=19.09+2.39*Math.sin(latitude);
    for(let tile=0;tile<20;tile++){
     const angle=(tile+(row%2)*.5)*Math.PI/10;
     const colors=row%2?[0xcf9c4d,0x8caa83,0x5e889e,0xc28b53]:[0x608ca8,0xd4ad46,0xb97b5b,0x739787];
     sphere(colors[tile%4],tx+Math.sin(angle)*radius,height,tz+Math.cos(angle)*radius,.225,.125,.225,'stone');
    }
   }
   box(0x6d6453,tx,21.73,tz,.13,.70,.13,'metal');
   box(0x6d6453,tx,21.82,tz,.61,.11,.11,'metal');
  }else if(model==='campidoglio-nilo'||model==='campidoglio-tevere'){
   const nile=model==='campidoglio-nilo',side=nile?1:-1;
   const pale=nile?0xded8cd:0xd9cfbc,shade=nile?0xc8bfb0:0xc6baa4;
   const width=MODEL_SPECS[model].width;
   box(shade,0,.12,0,width,.24,2.2);
   box(0xbbae9b,0,.59,0,width-.26,.70,1.94);
   box(pale,0,1.00,0,width-.10,.16,2.07);
   const form=(x,y,z,w,h,d,color=pale)=>sphere(color,side*x,y,z,w,h,d,'stone');
   const link=(a,b,r,color=pale)=>limb([side*a[0],a[1],a[2]],[side*b[0],b[1],b[2]],r,color,'stone');
   form(0,1.15,0,width*.48,.13,.80,shade);
   form(-.43,1.48,.07,.77,.38,.53);
   link([-.20,1.49,-.02],[-.86,1.66,.31],.27,shade);
   link([-.86,1.66,.31],[-1.79,1.39,.35],.20,shade);
   link([-.35,1.49,.16],[-1.00,1.55,-.20],.24);
   link([-1.00,1.55,-.20],[-1.83,1.42,.10],.17);
   form(-1.91,1.38,.39,.25,.13,.16);
   form(-1.93,1.39,.03,.22,.12,.15);
   for(const [x,y,z] of [[-.74,1.49,.47],[-.93,1.49,.38],[-1.09,1.43,.40],[-1.25,1.43,.30]]){
    link([x+.22,y+.11,z],[x-.15,y-.11,z+.12],.076,shade);
   }
   link([-.13,1.50,.01],[.57,2.30,.02],.43);
   form(.36,1.93,.15,.52,.50,.38);
   form(.61,2.28,.06,.52,.33,.35);
   link([.70,2.38,.02],[.87,2.65,.05],.18);
   form(.94,2.83,.04,.26,.31,.23);
   form(.94,2.88,-.08,.28,.24,.20,shade);
   form(.94,2.68,.18,.20,.21,.17,shade);
   form(.95,2.80,.24,.087,.095,.095);
   link([.86,2.31,-.10],[1.28,1.82,-.04],.17);
   link([1.28,1.82,-.04],[1.47,1.71,.39],.146);
   form(1.49,1.71,.44,.16,.12,.12);
   link([.28,2.29,.18],[.03,1.91,.47],.16);
   const horn=nile?[.96,2.31,.52]:[-.48,2.12,.60];
   link([.03,1.91,.47],horn,.13);
   const tip=nile?[1.31,2.43,.52]:[-.64,2.19,.60];
   const foot=nile?[1.55,1.67,.39]:[-.30,1.42,.40];
   link(foot,horn,.14,shade);
   link(horn,tip,.22,shade);
   for(const [dx,dy,dz] of [[-.12,.12,.03],[.12,.08,.02],[.03,.05,.16]]){
    form(tip[0]+dx,tip[1]+dy,tip[2]+dz,.105,.11,.10);
   }
   if(nile){
    // The small sphinx supports the Nile's upper body.
    form(1.58,1.32,.17,.48,.25,.30,shade);
    form(1.88,1.57,.15,.21,.26,.20);
    form(1.94,1.79,.17,.17,.20,.17);
    for(const z of [.01,.29])form(1.96,1.23,z,.23,.10,.10,shade);
   }else{
    // A she-wolf and the twins distinguish the pendant on the opposite plinth.
    form(1.52,1.57,.25,.44,.21,.22,shade);
    form(1.87,1.67,.26,.22,.18,.18,shade);
    form(2.01,1.60,.26,.17,.10,.12);
    for(const x of [1.25,1.75])for(const z of [.14,.38])link([x,1.53,z],[x,1.19,z],.065,shade);
    for(const x of [1.37,1.63]){
     form(x,1.28,.45,.115,.14,.13);
     form(x,1.45,.47,.10,.103,.10);
    }
   }
  }else if(model==='delft-hugo-de-groot'){
   const granite=0x8c6c60,trim=0xaa8875,figure=0x675247;
   box(trim,0,.065,0,2.65,.13,2.65);
   box(trim,0,.19,0,2.48,.12,2.48);
   box(granite,0,.32,0,2.34,.18,2.34);
   box(trim,0,.47,0,2.10,.14,2.10);
   box(granite,0,1.48,0,1.49,1.90,1.49);
   box(trim,0,2.48,0,1.68,.16,1.68);
   box(granite,0,2.63,0,1.88,.16,1.88);
   box(trim,0,2.77,0,1.99,.12,1.99);
   const metal=(x,y,z,rx,ry,rz)=>sphere(figure,x,y,z,rx,ry,rz,'patina');
   const link=(from,to,r)=>limb(from,to,r,figure,'patina');
   box(figure,0,2.86,0,.94,.09,.76,'patina');
   add('robe','patina',figure,-.08,3.77,-.12,.67,1.76,.44);
   metal(0,4.73,-.10,.50,.68,.33);
   metal(-.13,5.29,-.06,.28,.23,.26);
   metal(-.09,5.49,.02,.23,.31,.22);
   metal(-.14,5.48,-.10,.24,.29,.17);
   metal(-.09,5.38,.17,.15,.16,.12);
   metal(-.20,2.99,.12,.17,.11,.25);
   metal(.23,2.99,.20,.16,.11,.30);
   link([-.37,4.93,-.04],[-.53,4.51,.23],.18);
   link([-.53,4.51,.23],[-.20,4.48,.49],.13);
   link([.34,4.97,-.04],[.51,4.55,.19],.18);
   link([.51,4.55,.19],[.28,4.75,.47],.125);
   add('box','patina',0x775e50,.04,4.59,.51,.66,.33,.15,new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),.32));
   metal(-.22,4.48,.53,.11,.13,.09);
   metal(.27,4.72,.51,.10,.13,.08);
  }else if(model==='birmingham-queen-victoria'){
   const granite=0x716865, face=0x93827a, bronze=0x4f6857;
   box(granite,0,.16,0,3.75,.32,3.62);
   box(face,0,.43,0,3.26,.23,3.14);
   box(granite,0,1.85,0,2.38,2.65,2.31);
   box(face,0,3.27,0,2.74,.24,2.65);
   box(granite,0,3.44,0,2.42,.10,2.33);
   box(0xa89584,0,2.17,1.17,1.36,.33,.035);
   const metal=(x,y,z,rx,ry,rz)=>sphere(bronze,x,y,z,rx,ry,rz,'patina');
   const link=(a,b,r)=>limb(a,b,r,bronze,'patina');
   add('robe','patina',bronze,0,4.49,0,.78,1.99,.66);
   metal(0,5.47,-.09,.50,.67,.37);
   metal(0,5.52,-.25,.54,.53,.27);
   metal(0,6.06,.02,.26,.35,.25);
   metal(0,5.99,-.24,.28,.34,.14);
   cylinder(bronze,0,6.37,.02,.27,.12,'patina');
   for(let i=0;i<6;i++){
    const angle=i*Math.PI/3;
    metal(Math.sin(angle)*.23,6.47,.02+Math.cos(angle)*.23,.051,.11,.051);
   }
   link([.37,5.70,.03],[.63,5.35,.28],.126);
   link([.63,5.35,.28],[.47,5.47,.57],.10);
   metal(.47,5.61,.57,.16,.17,.16);
   link([.47,5.75,.57],[.47,5.90,.57],.025);
   link([-.38,5.70,.01],[-.56,5.24,.29],.127);
   link([-.56,5.24,.29],[-.68,5.36,.54],.10);
   link([-.78,4.61,.56],[-.54,6.27,.51],.045);
   metal(-.54,6.28,.51,.081,.096,.081);
  }else if(model==='birmingham-guardian'){
   const sandstone=0xc6a473,shaded=0xb08b5e,highlight=0xd2b17f;
   const east=owner.feature.id==='node:2109265232',side=east?1:-1;
   const carved=(x,y,z,w,h,d,c=sandstone)=>sphere(c,x*side,y,z,w,h,d,'stone');
   const join=(a,b,r,c=sandstone)=>limb([a[0]*side,a[1],a[2]],[b[0]*side,b[1],b[2]],r,c,'stone');
   box(shaded,0,.10,0,2.48,.20,4.93);
   carved(0,.95,-.62,.98,.74,1.66);
   carved(-.25,1.01,-1.50,.64,.74,.73,shaded);
   carved(0,1.46,.49,.81,.80,.81);
   for(const x of [-.51,.51]){
    carved(x,.53,.92,.36,.34,.91,shaded);
    carved(x,.39,1.77,.35,.23,.60);
    carved(x,.54,-1.49,.39,.38,.62);
   }
   // Broad carved wing ridges rise along rather than above the body.
   join([-.70,1.12,-1.48],[-.83,1.82,-.24],.27,highlight);
   join([-.83,1.82,-.24],[-.74,1.66,.48],.21);
   join([.67,1.07,-1.43],[.87,1.73,-.31],.26,highlight);
   join([.87,1.73,-.31],[.72,1.57,.53],.20);
   carved(.05,2.08,.87,.59,.65,.52);
   carved(.05,2.47,1.08,.52,.48,.45,highlight);
   carved(.04,2.34,1.40,.40,.31,.31);
   carved(.03,2.48,1.65,.14,.15,.13,highlight);
   join([-.27,2.24,1.42],[.35,2.22,1.40],.063,shaded);
   join([-.44,2.78,1.02],[.45,2.81,1.02],.11,highlight);
   join([.69,.78,-1.77],[.79,.35,-.99],.12,shaded);
  }else if(model==='birmingham-the-river'){
   const bronze=0x4a6557;
   const body=(x,y,z,w,h,d)=>sphere(bronze,x,y,z,w,h,d,'patina');
   const link=(a,b,r)=>limb(a,b,r,bronze,'patina');
   body(.14,.77,.03,.74,.66,.61);
   link([.05,.93,0],[-.71,1.68,-.10],.45);
   body(-.55,1.47,-.07,.59,.65,.55);
   body(-.96,1.80,-.12,.43,.42,.46);
   link([-.94,1.79,-.11],[-1.19,2.20,-.10],.17);
   body(-1.29,2.37,-.10,.30,.39,.26);
   body(-1.29,2.46,-.23,.27,.32,.21);
   link([-.83,1.72,-.45],[-1.42,1.02,-.64],.17);
   link([-1.42,1.02,-.64],[-1.66,.43,-.25],.14);
   body(-1.69,.32,-.12,.20,.13,.25);
   link([-.80,1.72,.36],[-.35,1.37,.75],.16);
   link([-.35,1.37,.75],[.17,1.28,.88],.12);
   body(.20,1.28,.88,.17,.12,.14);
   link([.31,.82,.24],[1.02,1.01,.54],.30);
   link([1.02,1.01,.54],[1.71,.36,.70],.19);
   body(1.79,.28,.82,.22,.16,.27);
   link([.20,.73,-.28],[1.14,.75,-.64],.28);
   link([1.14,.75,-.64],[1.61,.36,-.13],.17);
   body(1.72,.28,-.03,.21,.15,.25);
   body(.52,.66,.83,.24,.37,.22);
   cylinder(bronze,.52,1.02,.83,.15,.10,'patina');
   cylinder(0x424947,0,.10,0,1.9,.20);
  }else if(model==='birmingham-iron-man'){
   add('iron-man','patina',0x774b36,0,0,0,1,1,1);
  }else if(model==='waharoa'){
   const timber=0x68472f,carving=0xaa8057,copper=0x518981,rose=0x965656;
   const across=new T.Vector3(1,0,0);
   const beam=(a,b,thickness,depth,color)=>{
    const from=new T.Vector3(...a),to=new T.Vector3(...b),direction=to.clone().sub(from);
    const length=direction.length(),position=from.add(to).multiplyScalar(.5);
    const rotation=new T.Quaternion().setFromUnitVectors(across,direction.normalize());
    add('box','patina',color,position.x,position.y,position.z,length,thickness,depth,rotation);
   };
   for(const side of [-1,1]){
    const x=side*4.31;
    box(timber,x,1.785,0,1.30,3.57,.52,'patina');
    beam([x,3.34,0],[0,5.34,0],1.02,.52,timber);
    beam([x,3.19,.263],[0,5.19,.263],.30,.045,carving);
    for(let row=0;row<5;row++){
     const y=.49+row*.49,color=row%2?copper:carving;
     beam([x-.47,y,.272],[x,y+.17,.272],.10,.04,color);
     beam([x,y+.17,.272],[x+.47,y,.272],.10,.04,color);
    }
    for(let panel=0;panel<4;panel++){
     const t=(panel+.60)/4.4,xPanel=x*(1-t),yPanel=3.30+2*t;
     sphere(panel%2?rose:copper,xPanel,yPanel+.33,.279,.25,.14,.028,'patina');
     beam([xPanel-.16,yPanel+.24,.286],[xPanel+.16,yPanel+.39,.286],.050,.025,carving);
    }
   }
   // Five crest silhouettes cite the published arrangement without reproducing the carved artwork.
   beam([-.11,5.43,0],[-.11,6.68,0],.125,.33,timber);
   sphere(copper,-.11,6.46,0,.38,.26,.23,'patina');
   for(const side of [-1,1]){
    beam([-.11,6.41,0],[side*.65,6.90,0],.15,.27,copper);
    beam([side*.13,6.29,0],[side*.44,5.76,0],.12,.24,copper);
   }
   beam([-1.91,4.66,0],[-1.91,6.01,0],.18,.31,timber);
   for(let branch=0;branch<3;branch++){
    const y=5.17+branch*.29;
    beam([-2.15,y-.13,0],[-1.39,y+.41,0],.135,.35,copper);
   }
   beam([-3.54,3.87,0],[-3.54,5.40,0],.16,.28,timber);
   let previous=[-3.26,5.61,0];
   for(let i=1;i<=10;i++){
    const theta=(.40+1.33*i/10)*Math.PI;
    const next=[-3.48+Math.cos(theta)*.40,5.24+Math.sin(theta)*.40,0];
    beam(previous,next,.116,.29,copper);
    previous=next;
   }
   beam([1.73,4.62,0],[1.73,5.93,0],.17,.30,timber);
   sphere(copper,1.88,5.83,0,.52,.19,.19,'patina');
   beam([2.22,5.82,0],[2.62,6.10,0],.18,.25,copper);
   beam([2.22,5.82,0],[2.64,5.71,0],.18,.25,copper);
   beam([3.64,3.86,0],[3.64,5.39,0],.15,.29,timber);
   sphere(copper,3.64,5.34,0,.34,.34,.20,'patina');
   for(let ray=0;ray<8;ray++){
    const angle=ray*Math.PI/4,point=r=>[3.64+Math.cos(angle)*r,5.34+Math.sin(angle)*r,0];
    beam(point(.27),point(.52),.092,.26,copper);
   }
  }else if(model==='king-sejong-seated'){
   const gilt=0x947232,fold=0xa9883d,granite=0xc5b7aa;
   steps(0,5.3);box(granite,0,1.43,0,4.65,1.52,4.65);box(marble,0,2.27,0,4.80,.20,4.80);
   box(gilt,0,2.64,-.20,3.42,.54,3.35,'metal');box(gilt,0,3.72,-1.07,3.44,2.54,.46,'metal');
   for(const side of [-1,1]){
    box(fold,side*1.49,3.76,.30,.32,.34,2.28,'metal');
    limb([side*.68,4.73,-.10],[side*1.18,3.98,.56],.26,gilt);
    limb([side*.56,3.78,.18],[side*.54,3.26,1.29],.38,gilt);
    sphere(gilt,side*.56,3.08,1.19,.37,.39,.46);
   }
   sphere(gilt,0,4.58,-.12,.95,1.03,.55);sphere(fold,0,5.68,.08,.43,.54,.42);
   box(gilt,0,6.13,-.01,.99,.33,.66,'metal');box(gilt,0,6.30,-.28,.71,.29,.50,'metal');
   limb([0,5.65,.45],[0,5.23,.48],.11,gilt);
   for(const side of [-1,1])box(0xc2a062,side*.34,3.83,1.13,.67,.10,.63,'metal');
  }else if(model==='joseon-armillary'){
   const brass=0x9b783b;
   box(stone,0,.09,0,.78,.18,.78);
   cylinder(stone,0,.42,0,.23,.48);
   ring(brass,0,1.06,0,.38,.030);
   for(const angle of [-Math.PI/4,Math.PI/4]){
    const rotation=new T.Quaternion().setFromEuler(new T.Euler(Math.PI/2,angle,0,'YXZ'));
    add('torus','metal',brass,0,1.06,0,.38,.030/.045,.38,rotation);
   }
   limb([-.29,.77,0],[.29,1.35,0],.026,brass);
  }else if(model==='joseon-rain-gauge'){
   box(stone,0,.09,0,.62,.18,.62);
   box(stone,0,.44,0,.44,.52,.44);
   box(marble,0,.73,0,.53,.09,.53);
   cylinder(bronze,0,1.02,0,.14,.49,'metal');
   cylinder(0x283536,0,1.266,0,.12,.010,'metal');
   ring(bronze,0,1.278,0,.139,.026);
  }else if(model==='joseon-sundial'){
   box(stone,0,.09,0,.79,.18,.79);
   cylinder(stone,0,.39,0,.21,.42);
   cylinder(bronze,0,.62,0,.15,.06,'metal');
   add('sundial-bowl','metal',bronze,0,.64,0,1,1,1);
   for(const [height,radius] of [[.75,.24],[.83,.33],[.92,.38]])ring(gold,0,height,0,radius,.014);
   limb([0,.67,0],[.28,1.06,0],.023,gold);
  }else if(model==='three-rivers-fountain'){
   const silver=0xc7ccca,granite=0x817d75;
   add('triangular-base','stone',granite,0,.33,0,3.30,.66,3.30);
   cylinder(silver,0,2.27,0,.63,3.92,'metal');
   add('fountain-crown','metal',silver,0,4.24,0,1.19,.49,1.19);
   ring(silver,0,4.50,0,1.18,.085);
   jet(0,4.50,0,.96,.43);
   for(let i=0;i<3;i++){
    const angle=i*2*Math.PI/3;
    const at=(x,y,z)=>[x*Math.cos(angle)+z*Math.sin(angle),y,z*Math.cos(angle)-x*Math.sin(angle)];
    const pedestalRotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('box','stone',granite,...at(0,.73,2.10),1.69,.48,1.42,pedestalRotation);
    add('sphere','metal',silver,...at(0,2.02,1.95),.43,.92,.30,pedestalRotation);
    sphere(silver,...at(0,3.12,1.96),.23,.32,.25);
    limb(at(0,2.98,1.96),at(0,2.69,1.96),.14,silver);
    for(const side of [-1,1]){
     limb(at(side*.23,1.34,2.04),at(side*.31,1.53,2.70),.18,silver);
     limb(at(side*.31,1.53,2.70),at(side*.26,.96,2.84),.14,silver);
     limb(at(side*.34,2.58,1.95),at(side*.49,2.07,2.24),.12,silver);
     limb(at(side*.49,2.07,2.24),at(side*.20,2.04,2.65),.095,silver);
    }
    // The three birds share a body, with distinct neck and bill silhouettes.
    const neckZ=[2.78,2.59,2.75][i],neckY=[2.77,2.91,2.77][i];
    const headZ=[3.02,2.83,2.98][i],headY=[2.69,2.93,2.83][i];
    const billZ=[3.53,3.13,3.54][i],billY=[2.51,2.86,2.82][i];
    add('sphere','metal',silver,...at(0,2.04,2.78),.25,.25,.43,pedestalRotation);
    limb(at(0,2.12,2.92),at(0,neckY,neckZ),i===1?.085:.065,silver);
    limb(at(0,neckY,neckZ),at(0,headY,headZ),.064,silver);
    sphere(silver,...at(0,headY,headZ),.11,.105,.14);
    limb(at(0,headY,headZ),at(0,billY,billZ),.038,silver);
    limb(at(0,billY,billZ),at(0,.62,4.55),.033,water,'water');
    limb(at(0,4.50,.76),at(0,.62,4.36),.035,water,'water');
   }
  }else if(model==='teror-pilar-fountain'){
   const sandstone=0xb39867,agedStone=0xc0a77a;
   cylinder(sandstone,0,.09,0,1.9,.18);
   cylinder(agedStone,0,.25,0,1.74,.14);
   cylinder(sandstone,0,.39,0,1.59,.14);
   cylinder(water,0,.47,0,1.44,.04,'water');
   ring(agedStone,0,.49,0,1.49,.09);
   cylinder(agedStone,0,.63,0,.53,.31);
   cylinder(sandstone,0,1.29,0,.33,1.10);
   for(const y of [.82,1.67,1.89])ring(agedStone,0,y,0,.36,.055);
   cylinder(agedStone,0,1.92,0,.40,.14);
   sphere(sandstone,0,2.12,0,.22,.24,.22,'stone');
  }else if(model==='teror-wall-fountain'){
   const frame=0x60594a,panel=0xa78e60;
   box(frame,0,1.16,-.63,1.82,2.32,.29);
   box(panel,0,1.39,-.47,1.49,1.73,.10);
   box(frame,0,2.32,-.62,2.06,.22,.42);
   box(frame,0,2.58,-.62,.14,.38,.17);
   box(frame,0,2.59,-.62,.45,.13,.17);
   box(frame,0,.14,.17,2.25,.28,1.23);
   for(const side of [-1,1]){
    box(frame,side*1.05,.36,.17,.15,.24,1.23);
    box(frame,0,.36,.17+side*.54,1.97,.24,.15);
   }
   box(water,0,.31,.17,1.92,.025,.90,'water');
   box(panel,0,1.91,-.39,.29,.26,.07);
   box(panel,0,1.24,-.38,.093,.63,.07);
   sphere(frame,0,1.57,-.36,.26,.19,.09,'stone');
   cylinder(frame,0,.89,-.39,.052,.11);
  }else if(model==='arucas-sureda-monument'){
   const volcanicStone=0xa29c91,lightStone=0xbbb1a1,iron=0x55594f;
   for(const [y,radius,height] of [[.10,2.05,.20],[.28,1.92,.16],[.43,1.80,.14]]){
    cylinder(volcanicStone,0,y,0,radius,height);
   }
   cylinder(lightStone,0,1.25,0,.34,1.5);
   cylinder(volcanicStone,0,2.05,0,.44,.18);
   sphere(bronze,0,2.23,0,.40,.24,.25,'metal');
   sphere(bronze,0,2.54,.02,.21,.30,.20,'metal');
   ring(lightStone,0,3.56,0,1.77,.14,'stone');
   for(let bay=0;bay<8;bay++){
    const angle=bay*Math.PI/4,at=(radius,y)=>[radius*Math.sin(angle),y,radius*Math.cos(angle)];
    cylinder(volcanicStone,...at(1.61,.57),.19,.14);
    cylinder(lightStone,...at(1.61,2.02),.12,2.76);
    cylinder(volcanicStone,...at(1.61,3.43),.19,.19);
    for(const [from,to] of [[[1.72,3.65],[1.54,4.03]],[[1.54,4.03],[1.10,4.38]],[[1.10,4.38],[.53,4.59]],[[.53,4.59],[0,4.68]]]){
     limb(at(...from),at(...to),.032,iron,'metal');
    }
   }
   for(const [y,radius] of [[3.65,1.72],[4.03,1.54],[4.38,1.10],[4.59,.53]])ring(iron,0,y,0,radius,.023);
   sphere(iron,0,4.73,0,.08,.14,.08,'metal');
  }else if(model==='kamppi-chapel'){
   const spruce=0xbd7840;
   add('kamppi-chapel-shell','stone',spruce,0,0,0,9.8,11.5,6.7);
   for(const [y,ratio] of [[.58,.61],[2.30,.70],[4.83,.83],[7.82,.94],[10.24,1],[11.49,.99]]){
    add('kamppi-chapel-seam','stone',0x9e6036,0,y,0,9.8*ratio,1,6.7*ratio);
   }
  }else if(model==='kamppi-entrepreneurs-monument'){
   const aluminium=0xb8b392;
   box(0x474844,0,.66,0,.70,1.30,.70);
   const frames=[[-.92,.87,0,1.46,.22],[.40,.78,.87,1.38,-.4],[.72,1.57,-.62,1.55,.43],
    [-.36,2.05,.22,1.92,.56],[-.89,2.64,-.46,1.48,-.32],[.82,2.66,.49,1.56,.24],
    [0,3.16,-.22,2.02,-.43],[-.78,3.75,.37,1.21,.41],[.73,3.81,-.46,1.40,.17],
    [0,4.26,.55,1.50,.59],[.46,4.79,-.32,1.39,-.32],[-.54,4.97,-.28,1.24,.19],[.05,5.44,.16,1.12,.44]];
   for(const [x,y,z,size,bearing] of frames){
    const sine=Math.sin(bearing),cosine=Math.cos(bearing),half=size/2;
    const corner=(u,v,w)=>[x+(u*cosine+w*sine)*half,y+v*half,z+(-u*sine+w*cosine)*half];
    for(const a of [-1,1])for(const c of [-1,1]){
     limb(corner(-1,a,c),corner(1,a,c),.027,aluminium,'metal');
     limb(corner(a,-1,c),corner(a,1,c),.027,aluminium,'metal');
     limb(corner(a,c,-1),corner(a,c,1),.027,aluminium,'metal');
    }
   }
  }else if(model==='kasarmitori-winter-war-memorial'){
   const steel=0xc7d1d5,glass=0x6c7a7b;
   sphere(steel,0,1.8,0,1.8,1.8,1.8,'metal');
   for(const latitude of [-.55,-.24,.09,.42])for(let window=0;window<12;window++){
    const bearing=(window+(latitude>0?.50:0))*Math.PI/6;
    const radius=Math.cos(latitude);
    const direction=new T.Vector3(Math.sin(bearing)*radius,Math.sin(latitude),Math.cos(bearing)*radius);
    const face=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),direction);
    add('sphere','metal',glass,1.8*direction.x,1.8+1.8*direction.y,1.8*direction.z,.072,.072,.023,face);
   }
   add('kasarmitori-perforated-figure','metal',steel,0,3.54,0,1,7.06/7,1);
  }else if(model==='kasarmitori-the-eye'){
   cylinder(0x737c7e,0,.019,0,.90,.038,'metal');
   cylinder(0xa9b0b1,0,.037,0,.59,.036,'metal');
  }else if(model==='karhupuisto-bear'){
   const granite=0x90665d,pedestal=0x806f68;
   box(pedestal,0,.14,0,2.31,.28,2.81);
   box(pedestal,0,.50,0,2.11,.46,2.64);
   sphere(granite,0,.84,.38,.82,.19,.88,'stone');
   sphere(granite,0,1.85,-.41,.64,.66,.74,'stone');
   sphere(granite,0,1.88,.24,.63,.57,.79,'stone');
   sphere(granite,0,1.63,.76,.45,.43,.53,'stone');
   sphere(granite,0,1.40,1.08,.26,.25,.35,'stone');
   sphere(granite,0,1.27,1.30,.19,.13,.18,'stone');
   for(const x of [-1,1]){
    sphere(granite,x*.26,1.80,.89,.13,.14,.079,'stone');
    sphere(granite,x*.43,1.41,-.68,.28,.44,.36,'stone');
    sphere(granite,x*.45,1.01,-.64,.21,.24,.27,'stone');
    sphere(granite,x*.44,.88,-.50,.24,.14,.30,'stone');
    const forward=x>0?.83:.61;
    limb([x*.48,1.64,.41],[x*.43,1.11,forward],.18,granite,'stone');
    sphere(granite,x*.43,1.00,forward+.07,.21,.14,.29,'stone');
   }
  }else if(model==='tartu-countrywomen'){
   const patina=0x5c6557;
   box(0x9a9284,0,.075,0,1.76,.15,.92);
   box(patina,.38,.47,-.19,.52,.66,.48,'patina');
   sphere(patina,.39,.98,-.12,.31,.39,.22,'patina');
   sphere(patina,.44,1.42,-.04,.14,.179,.135,'patina');
   add('robe','patina',patina,.42,.69,.04,.37,.58,.33);
   for(const x of [.27,.57]){
    limb([x,.78,.19],[x,.21,.32],.066,patina,'patina');
    sphere(patina,x,.17,.40,.092,.034,.16,'patina');
   }
   limb([.61,1.18,-.03],[.68,.96,.22],.068,patina,'patina');
   limb([.68,.96,.22],[.44,.82,.25],.052,patina,'patina');
   sphere(patina,-.39,1.39,-.10,.22,.38,.16,'patina');
   sphere(patina,-.38,1.91,-.07,.13,.176,.132,'patina');
   for(const x of [-.51,-.27]){
    limb([x,1.13,-.10],[x,.24,-.06],.073,patina,'patina');
    box(patina,x,.19,.04,.18,.08,.29,'patina');
   }
   limb([-.21,1.62,-.07],[.06,1.43,-.18],.057,patina,'patina');
   limb([.06,1.43,-.18],[.30,1.24,-.10],.049,patina,'patina');
   limb([-.58,1.61,-.10],[-.63,1.14,-.02],.056,patina,'patina');
  }else if(model==='tartu-town-hall'){
   const pale=0xe2a7a1,cream=0xf0ded2,roof=0x986057,spire=0x54645c,glass=0x5c5550;
   box(0xb0a098,0,.53,0,36.1,1.06,19.7);
   box(pale,0,7.36,0,35.5,13.6,19.1);
   for(const y of [4.88,9.25,14.14])box(cream,0,y,0,36.1,.42,19.8);
   for(const side of [-1,1]){
    for(let col=-4;col<=4;col++)for(const y of [2.89,7.13,11.28]){
     const windowX=col*3.65;
     const frontZ=side*9.61;
     if(col===0&&y<3){
      box(0x6a514a,windowX,2.45,frontZ,2.11,3.42,.12,'metal');
     }else{
      box(cream,windowX,y,frontZ,1.77,2.68,.14);
      box(glass,windowX,y,frontZ+side*.10,1.41,2.29,.08,'metal');
      box(cream,windowX,y,frontZ+side*.153,.07,2.29,.03);
     }
    }
   }
   for(const x of [-6.62,-3.26,3.26,6.62])box(cream,x,9.48,9.77,.43,8.45,.26);
   add('hip-roof','stone',roof,0,14.27,0,35.95,5.90,19.62);
   for(let course=0;course<7;course++)box(cream,0,14.24+course*.40,9.33,15.7-course*2.12,.43,.69);
   sphere(0xd6bb9b,0,15.88,9.72,.78,.70,.09,'stone');
   box(cream,0,20.38,0,4.25,2.15,4.25);
   box(spire,0,22.17,0,3.22,2.15,3.22,'metal');
   sphere(0xcfb36f,0,22.27,1.66,.79,.79,.065,'metal');
   sphere(0x4a443f,0,22.27,1.71,.62,.62,.06,'metal');
   box(0xddc88d,0,22.44,1.79,.07,.38,.065,'metal');
   box(0xddc88d,.15,22.26,1.79,.31,.075,.065,'metal');
   add('bandstand-roof','metal',spire,0,23.25,0,1.97,2.65,1.97);
   limb([0,25.90,0],[0,26.97,0],.047,spire);
  }else if(model==='tartu-kissing-students'){
   const granite=0xaca393,patina=0x576b60;
   cylinder(granite,0,.21,0,5.07,.42);
   cylinder(0x7e9ca2,0,.452,0,4.85,.065,'metal');
   ring(0xd5c8b7,0,.49,0,4.93,.118,'stone');
   cylinder(granite,0,.65,0,.92,.38);
   cylinder(0x8c8576,0,1.30,0,.51,.96);
   cylinder(granite,0,1.81,0,.72,.16);
   for(const side of [-1,1]){
    limb([side*.34,1.91,.12],[side*.34,2.67,.02],.088,patina,'patina');
    limb([side*.36,2.66,0],[side*.22,3.31,.06],.135,patina,'patina');
    sphere(patina,side*.127,3.50,.10,.133,.178,.134,'patina');
    limb([side*.29,3.18,.10],[-side*.17,2.95,.20],.072,patina,'patina');
   }
   limb([.36,2.49,.03],[.57,2.05,-.38],.077,patina,'patina');
   limb([-.27,3.30,-.03],[-.58,3.52,-.07],.072,patina,'patina');
   limb([-.54,3.08,-.09],[-.54,4.03,-.14],.035,patina,'patina');
   add('bandstand-roof','patina',patina,-.54,3.98,-.14,1.02,.38,1.02);
  }else if(model==='vilnius-gediminas'){
   const granite=0x7f716b,patina=0x576658;
   box(granite,0,.30,0,7.4,.60,6.8);
   box(granite,0,.79,0,6.35,.39,5.72);
   box(0x6a5f59,0,2.63,0,5.03,3.30,4.55);
   box(granite,0,4.36,0,5.16,.45,4.82);
   human(-.79,4.60,.30,1.22,'freedom',patina);
   limb([.23,6.04,.50],[.77,5.03,1.52],.065,patina,'patina');
   const horseStart=parts.length;
   horse();
   for(const part of parts.slice(horseStart)){
    part.x=1.05+part.x*.72;
    part.y=4.6+part.y*.72;
    part.z=-.51+part.z*.72;
    part.sx*=.72;part.sy*=.72;part.sz*=.72;
   }
  }else if(model==='vilnius-cathedral-belfry'){
   const stone=0xe0ddd1,trim=0xbdb9aa,copper=0x52685d,shadow=0x5a5a54;
   cylinder(trim,0,.40,0,7.19,.80);
   cylinder(stone,0,8.7,0,6.82,16.6);
   cylinder(trim,0,17.2,0,7.03,.65);
   for(const [base,top,radius] of [[17.45,28.8,6.08],[29.20,39.0,5.46],[39.42,45.7,4.67]]){
    const height=top-base;
    add('octagonal-column','stone',stone,0,(base+top)/2,0,radius,height,radius);
    add('octagonal-column','stone',trim,0,top,0,radius+.16,.48,radius+.16);
    for(let side=0;side<8;side++){
     const a=(side+.5)*Math.PI/4,out=radius*Math.cos(Math.PI/8)+.03;
     const frame=new T.Quaternion().setFromAxisAngle(UP,a);
     add('box','stone',shadow,out*Math.sin(a),base+height*.55,out*Math.cos(a),radius*.37,height*.42,.10,frame);
    }
   }
   add('bandstand-roof','metal',copper,0,45.95,0,4.64,5.55,4.64);
   sphere(copper,0,51.9,0,.66,.44,.66,'metal');
   limb([0,52,0],[0,57,0],.076,copper);
   limb([-1.36,55,0],[1.36,55,0],.06,copper);
  }else if(model==='vilnius-cathedral-basilica'){
   const plaster=0xe7e4d8,trim=0xf3efe3,roof=0x626761,glass=0x555957;
   box(0xbdb9ab,0,.45,0,43.4,.90,68.2);
   box(plaster,0,7.03,-3.2,39.2,12.8,61.9);
   box(plaster,0,9.46,-6.1,24.2,15.9,55.2);
   for(const side of [-1,1]){
    add('box','metal',roof,side*6.40,18.36,-6.1,14.1,.31,55.6,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),side*-.34));
    for(const z of [-24,-15,-6,3,12,21])box(glass,side*19.62,7.36,z,.16,4.72,1.93,'metal');
   }
   box(plaster,0,6.72,28.3,30.4,12.4,5.6);
   for(const x of [-12.6,-7.55,-2.51,2.51,7.55,12.6]){
    cylinder(trim,x,6.48,31.6,.64,10.48);
    box(trim,x,11.9,31.6,1.65,.48,1.65);
   }
   box(trim,0,12.63,31.4,30.6,1.38,5.9);
   for(let layer=0;layer<11;layer++)box(trim,0,13.49+layer*.52,31.34,29.0-layer*2.55,.53,5.47);
   for(let step=0;step<3;step++)box(trim,0,.12+step*.20,33.84-step*.56,31.3-step*.45,.24,3.38);
   box(plaster,14.3,8.64,-28.8,10.4,16.36,10.7);
   add('bandstand-roof','metal',roof,14.3,16.9,-28.8,5.20,4.25,5.20);
  }else if(model==='vilnius-miracle-tile'){
   box(0xab726e,0,.037,0,.78,.022,.78);
   for(let ray=0;ray<8;ray++){
    const angle=ray*Math.PI/4;
    limb([0,.051,0],[.21*Math.sin(angle),.051,.21*Math.cos(angle)],.010,0xac8660);
   }
  }else if(model==='vilnius-baltic-way-tile'){
   box(0x8d8880,0,.037,0,.78,.022,.78);
   for(const side of [-1,1]){
    sphere(0x725945,side*.135,.052,side*.047,.065,.004,.136,'metal');
    sphere(0x725945,side*.141,.052,side*.047+.123,.060,.004,.050,'metal');
   }
  }else if(model==='kuopio-veljmies'){
   const patina=0x536957,granite=0x9c978a;
   box(granite,0,.56,0,1.45,1.12,1.15);
   sphere(patina,0,2.42,.02,.25,.46,.15,'patina');
   sphere(patina,-.03,2.98,.05,.155,.208,.156,'patina');
   for(const side of [-1,1]){
    limb([side*.13,2.08,0],[side*.20,1.22,.05],.075,patina,'patina');
    sphere(patina,side*.20,1.16,.12,.10,.045,.18,'patina');
    limb([side*.20,2.66,.02],[side*.45,2.40,.10],.067,patina,'patina');
    limb([side*.45,2.40,.10],[side*.63,2.53,.14],.057,patina,'patina');
    sphere(patina,side*.71,2.25,.14,.11,.27,.07,'patina');
    add('cone','patina',patina,side*.71,2.51,.14,.095,.12,.04);
   }
  }else if(model==='kuopio-siskotytto'){
   const patina=0x536756;
   box(0x999388,0,.20,0,1.22,.40,1.07);
   add('robe','patina',patina,0,1.08,0,.45,1.26,.28);
   sphere(patina,0,1.13,0,.34,.55,.21,'patina');
   sphere(patina,0,1.92,0,.29,.47,.20,'patina');
   sphere(patina,-.03,2.60,.04,.19,.24,.17,'patina');
   limb([-.24,2.10,.03],[-.47,1.76,.20],.072,patina,'patina');
   limb([-.47,1.76,.20],[-.12,1.71,.35],.060,patina,'patina');
   limb([.24,2.08,.03],[.43,1.80,.19],.072,patina,'patina');
   limb([.43,1.80,.19],[.56,1.89,.29],.057,patina,'patina');
   limb([.56,1.89,.29],[.56,1.61,.29],.022,patina,'patina');
   box(patina,.56,1.60,.29,.43,.032,.03,'metal');
   for(const side of [-1,1]){
    const x=.56+side*.18;
    limb([x,1.61,.29],[x,1.39,.33],.013,patina,'patina');
    cylinder(patina,x,1.37,.33,.092,.035,'patina');
   }
  }else if(model==='kuopio-market-hall'){
   const butter=0xe1b877,trim=0xf0d7a4,roof=0x43554e,glass=0x597e87;
   const hallZ=5.3;
   box(0x7c6f5d,0,.59,hallZ,52.5,1.18,17.6);
   box(butter,0,4.3,hallZ,51.65,6.5,17.1);
   box(trim,0,7.65,hallZ,52.2,.62,17.7);
   for(const side of [-1,1]){
    add('box','metal',roof,0,9.55,hallZ+side*4.27,51.4,.46,10.1,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),side*.38));
    box(butter,side*22.7,6.05,hallZ,5.5,11.5,7.6);
    box(trim,side*22.7,11.78,hallZ,5.87,.58,7.87);
    add('bandstand-roof','metal',roof,side*22.7,12.06,hallZ,2.94,2.77,3.73);
    sphere(roof,side*22.7,14.77,hallZ,.15,.19,.15,'metal');
    box(0x655647,side*25.47,2.77,hallZ,.16,4.70,2.76,'metal');
    for(const x of [-19.3,-14.8,-10.3,-5.8,5.8,10.3,14.8,19.3]){
     const z=hallZ+side*8.56;
     box(trim,x,4.19,z,2.65,4.22,.18);
     box(glass,x,4.12,z+side*.135,2.13,3.46,.12,'metal');
     box(trim,x,4.21,z+side*.22,2.05,.12,.08);
    }
   }
   const pavilionZ=-13.0;
   cylinder(glass,-1.5,2.16,pavilionZ,9.7,4.32,'metal');
   cylinder(roof,-1.5,4.41,pavilionZ,9.88,.32,'metal');
   for(let panel=0;panel<12;panel++){
    const angle=panel*Math.PI/6;
    cylinder(trim,-1.5+9.73*Math.cos(angle),2.14,pavilionZ+9.73*Math.sin(angle),.074,4.3,'metal');
   }
  }else if(model==='stortorget-stone-well'){
   const sandstone=0xb9a987,trim=0xc7b79a,iron=0x383631;
   box(sandstone,0,.16,0,3.16,.32,3.16);
   box(trim,0,.42,0,2.96,.24,2.96);
   box(sandstone,0,1.56,0,2.19,2.19,2.19);
   box(trim,0,2.73,0,2.49,.25,2.49);
   box(sandstone,0,3.01,0,2.64,.31,2.64);
   add('bandstand-roof','stone',trim,0,3.14,0,1.54,.93,1.54);
   cylinder(sandstone,0,4.12,0,.42,.52);
   sphere(iron,0,4.65,0,.23,.23,.23);
   for(const side of [-1,1]){
    box(trim,side*.97,1.68,0,.25,1.98,2.24);
    for(const x of [-1,1])box(trim,side*.99,1.68,x*.97,.26,1.98,.26);
    sphere(iron,side*1.13,1.62,0,.10,.18,.17);
    sphere(iron,0,1.62,side*1.13,.17,.18,.10);
    limb([side*1.12,1.65,.42],[side*1.16,2.25,.42],.038,iron);
    limb([.42,1.65,side*1.12],[.42,2.25,side*1.16],.038,iron);
   }
  }else if(model==='stortorget-stock-exchange'){
   const plaster=0xcfba9c,trim=0xe7d9c4,roof=0x485250,glass=0x3a423f;
   box(0xab9f90,0,.55,0,44.2,1.1,28.4);
   box(plaster,0,9.0,0,44.2,16.9,28.4);
   box(trim,0,6.1,0,44.8,.54,29);
   box(trim,0,17.65,0,45,.68,29);
   box(roof,0,19.85,0,42.4,3.56,26.5,'metal');
   for(const side of [-1,1]){
    add('box','metal',roof,0,23.0,side*6.65,42.0,.28,15.2,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),side*.42));
   }
   box(plaster,0,10.15,14.21,12.5,16.6,1.26);
   box(trim,0,18.8,14.79,12.9,.67,1.3);
   box(trim,0,24.3,0,2.3,3.4,2.2);
   add('pyramid','metal',roof,0,27.24,0,1.55,2.68,1.55);
   for(const x of [-17.9,-13.6,-9.35,-4.95,0,4.95,9.35,13.6,17.9]){
    const front=Math.abs(x)<5?14.90:14.23;
    box(trim,x,11.68,front,2.52,5.25,.31);
    box(glass,x,11.66,front+.171,1.85,4.68,.055,'metal');
    box(trim,x,11.44,front+.203,1.88,.17,.064);
    box(trim,x,11.66,front+.203,.14,4.68,.064);
    if(Math.abs(x)>5)box(glass,x,3.8,14.28,1.48,2.45,.06,'metal');
   }
   for(const x of [-4.56,0,4.56]){
    box(trim,x,3.2,14.94,2.82,4.87,.38);
    box(0x50473e,x,2.94,15.16,2.1,4.15,.08,'metal');
   }
  }else if(model==='kansalaistori-song-trees'){
   const steel=0x505c60;
   add('kansalaistori-pike','metal',steel,0,0,0,1,1,1);
   sphere(0x343f43,.31,11.37,.49,.15,.15,.10,'metal');
   for(const direction of [-1,1]){
    const x=direction*1.27,z=direction*2.37,height=direction>0?10.6:11.2;
    box(steel,x,height*.48,z,.52,height*.96,.59,'metal');
    for(let tier=0;tier<5;tier++){
     const y=1.27+tier*height*.165;
     for(let row=0;row<3;row++)box(0x5b6769,x,y+row*.23,z+(row-1)*.39,1.92,.17,1.36,'metal');
     add('box','metal',0x394749,x,y+.78,z,2.36,.165,2.34,
      new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),direction*.18));
    }
   }
  }else if(model==='kansalaistori-oodi-library'){
   const glass=0x536f7b,spruce=0xba8453,roof=0xebe9de;
   box(glass,0,3.65,0,37.5,7.3,142.6);
   add('oodi-spruce-wave','stone',spruce,0,0,0,46.4,16.9,150.5);
   box(0xcba274,2.8,15.5,0,35.2,1.45,148.5);
   box(glass,2.2,19.2,0,38.9,6.3,143.8);
   box(roof,1.0,23,0,44.9,2,151);
   for(let panel=-6;panel<=6;panel++)box(0xd2d5cd,-17.3,19.2,panel*10.6,.18,6.3,.16);
  }else if(model==='verrazzano-memorial'){
   const travertine=0xb9ae96;
   steps(0,4.3);
   box(travertine,0,1.11,0,3.16,.94,3.16);
   box(travertine,0,2.33,0,2.26,1.62,2.16);
   box(marble,0,3.21,0,2.54,.24,2.45);
   plaque(2.15,1.38,1.1);
   human(0,3.33,0,1.45,'civil',0x38534a);
  }else if(model==='alcazar-cervantes-riders'){
   const limestone=0xb7a991;
   box(limestone,-1.64,.27,.30,2.38,.54,4.24);
   box(limestone,1.57,.27,-.30,2.12,.54,3.63);
   for(const [x,z,size,knight] of [[-1.64,.30,1,true],[1.57,-.30,.79,false]]){
    const first=parts.length;
    horse();
    if(knight){
     limb([.45,.65,.40],[.45,6.10,.60],.043,bronze);
     add('cone','metal',bronze,.45,6.19,.60,.087,.31,.087);
     sphere(bronze,-.70,3.15,.27,.16,.65,.44);
    }else{
     for(const side of [-1,1])limb([side*.19,3.13,1.28],[side*.26,3.75,1.20],.085);
    }
    for(const part of parts.slice(first)){
     part.x=x+part.x*size;part.y=.54+part.y*size;part.z=z+part.z*size;
     part.sx*=size;part.sy*=size;part.sz*=size;
    }
   }
  }else if(model==='fray-bentos-bandstand'||model==='paraitinga-bandstand'){
   const paraitinga=model==='paraitinga-bandstand';
   const post=paraitinga?0x3c608e:0xe5debd,accent=paraitinga?0xd78339:0xc5b68f;
   const platform=paraitinga?0x8f8781:0xb4a791,roof=paraitinga?0x9e573b:0xd2bd91;
   add('bandstand-deck','stone',platform,0,.29,0,3.45,.58,3.45);
   add('bandstand-deck','stone',platform,0,.63,0,3.04,.14,3.04);
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4,next=angle+Math.PI/4;
    const x=Math.sin(angle)*2.74,z=Math.cos(angle)*2.74;
    cylinder(post,x,2.31,z,.105,3.22,'metal');
    cylinder(accent,x,1.04,z,.16,.48,'metal');
    cylinder(accent,x,3.77,z,.17,.23,'metal');
    limb([x,3.63,z],[Math.sin(next)*2.74,3.63,Math.cos(next)*2.74],.073,accent);
   }
   add('bandstand-roof','stone',roof,0,3.87,0,3.38,paraitinga?1.25:1.92,3.38);
   sphere(accent,0,paraitinga?5.24:5.94,0,.14,.20,.14,'metal');
  }else if(model==='gravina-benedict-statue'){
   const limestone=0xc1ae93,patina=0x50544a;
   box(limestone,0,.22,0,3.34,.44,3.34);
   box(limestone,0,1.19,0,2.31,1.50,2.26);
   box(marble,0,2.03,0,2.57,.25,2.50);
   plaque(1.35,1.44,1.15);
   human(0,2.15,0,1.50,'classical',patina);
   sphere(patina,0,5.92,0,.31,.37,.31,'metal');
  }else if(model==='trogir-clock-tower'){
   const limestone=0xdccdb5,moulding=0xede0c9,tile=0xa55a43,dial=0x779caa,brass=0xd3b06e;
   box(limestone,0,4.64,0,4.70,9.28,3.35);
   box(moulding,0,9.24,0,5.1,.45,3.69);
   box(limestone,0,9.80,0,4.42,.72,3.29);
   add('trogir-clock-dome','stone',tile,0,10.15,0,1,1,1);
   cylinder(brass,0,12.65,0,.081,.72,'metal');
   box(brass,0,12.85,0,.42,.065,.065,'metal');
   const vertical=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('cylinder','stone',moulding,0,7.60,-1.69,1.53,.12,1.53,vertical);
   add('cylinder','metal',dial,0,7.60,-1.76,1.37,.08,1.37,vertical);
   limb([0,7.60,-1.82],[.70,7.87,-1.82],.052,brass);
   limb([0,7.60,-1.82],[-.22,8.54,-1.82],.040,brass);
   for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    sphere(brass,Math.sin(a)*1.13,7.60+Math.cos(a)*1.13,-1.82,.045,.062,.028);
   }
   box(0x625148,0,1.35,-1.69,1.31,2.7,.070,'metal');
   box(moulding,0,3.06,-1.71,1.77,.22,.18);
   add('cylinder','stone',0x8d8071,0,4.76,-1.69,.31,.08,.31,vertical);
  }else if(model==='trujillo-liberty-monument'){
   const granite=0xb3a392,cloudedMarble=0xe7dcc6,patina=0x42584b;
   cylinder(granite,0,.23,0,5.75,.46);
   cylinder(granite,0,.66,0,5.19,.42);
   cylinder(granite,0,1.00,0,4.68,.32);
   cylinder(water,0,1.22,0,4.29,.076,'water');
   ring(granite,0,1.34,0,4.55,.15,'stone');
   cylinder(cloudedMarble,0,1.72,0,3.52,1.03);
   cylinder(cloudedMarble,0,2.35,0,3.75,.29);
   box(cloudedMarble,0,3.09,0,4.45,1.35,4.45);
   box(cloudedMarble,0,5.10,0,2.60,2.73,2.60);
   box(cloudedMarble,0,8.34,0,1.46,3.98,1.46);
   box(cloudedMarble,0,10.49,0,1.88,.32,1.88);
   sphere(patina,0,11.03,0,.61,.54,.61);
   for(const [x,z] of [[0,2.43],[-2.45,-.92],[2.45,-.92]])human(x,2.47,z,1.04,'classical',marble);
   human(0,11.52,0,1.03,'freedom',patina);
   limb([-.91,14.14,.10],[-1.00,14.65,.11],.079,patina);
   add('cone','metal',patina,-1.00,14.72,.11,.14,.25,.14);
  }else if(model==='ceglie-clock-tower'){
   const limestone=0xd9cbb2,trim=0xeee0c5,face=0xf4e8ce,iron=0x383632;
   box(trim,0,.20,0,5,.40,4.7);
   box(limestone,0,2.81,0,4.15,4.84,3.77);
   box(0x703c2b,0,1.60,1.9,1.28,2.5,.10,'metal');
   box(trim,0,5.26,0,4.47,.28,4.10);
   box(trim,0,5.57,.26,4.8,.29,4.52);
   box(limestone,0,7.32,0,2.86,3.22,2.80);
   box(trim,0,8.96,0,3.10,.40,3.04);
   const vertical=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('cylinder','stone',face,0,7.70,1.43,.80,.10,.80,vertical);
   limb([0,7.7,1.5],[0,8.16,1.5],.048,iron);
   limb([0,7.7,1.5],[.34,7.55,1.5],.051,iron);
   box(limestone,0,9.56,0,1.95,.95,1.91);
   add('pyramid','stone',trim,0,10.61,0,2.22,1.20,2.20);
   cylinder(iron,0,11.62,0,.055,.56,'metal');
  }else if(model==='bratislava-napoleonic-soldier'){
   const cast=0x4c594b, highlighted=0x67735e, iron=0x424641, wood=0x665842;
   for(let slat=0;slat<4;slat++)box(wood,0,.452,.53+slat*.101,1.69,.043,.089);
   for(let slat=0;slat<3;slat++)box(wood,0,.721+slat*.143,.474-slat*.009,1.69,.088,.045);
   for(const side of [-1,1]){
    const x=side*.836;
    limb([x,.022,.489],[x,.443,.517],.031,iron);
    limb([x,.022,.865],[x,.438,.822],.031,iron);
    limb([x,.435,.51],[x,1.046,.443],.025,iron);
    limb([x,.455,.522],[x,.455,.825],.035,iron);
    limb([x,.671,.529],[x,.691,.679],.024,iron);
    limb([x,.691,.679],[x,.660,.817],.024,iron);
    limb([x,.660,.817],[x,.541,.840],.024,iron);
    limb([x,.541,.840],[x,.478,.766],.024,iron);
   }

   for(const side of [-1,1]){
    const x=side*.089,z=side<0?-.035:-.097;
    sphere(cast,x,.058,z+.042,.062,.058,.130,'patina');
    limb([x,.086,z],[x,.356,z-.008],.054,cast,'patina');
    limb([x,.356,z-.008],[side*.085,.655,.027],.061,cast,'patina');
   }
   const forwardLean=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.48);
   add('robe','patina',cast,0,.65,.045,.181,.59,.109,forwardLean);
   add('sphere','patina',cast,0,.962,.159,.177,.267,.118,forwardLean);
   for(const side of [-1,1]){
    limb([side*.142,1.153,.208],[side*.209,1.091,.458],.054,cast,'patina');
    sphere(highlighted,side*.142,1.154,.21,.062,.043,.056,'patina');
   }
   limb([-.210,1.093,.459],[.123,1.102,.473],.049,cast,'patina');
   limb([.212,1.096,.459],[-.120,1.131,.511],.046,cast,'patina');
   sphere(highlighted,.122,1.109,.477,.064,.037,.043,'patina');
   sphere(highlighted,-.12,1.135,.511,.062,.036,.042,'patina');
   limb([0,1.158,.224],[0,1.258,.280],.069,cast,'patina');
   sphere(cast,0,1.315,.310,.104,.116,.091,'patina');
   sphere(highlighted,0,1.308,.390,.029,.041,.025,'patina');
   const hatTilt=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.13);
   add('bratislava-bicorne','patina',cast,0,1.405,.318,.46,.228,.223,hatTilt);
  }else if(model==='bratislava-city-guard'){
   const sandstone=0xd2c6a9, trim=0xded1b5, polished=0x353834, cast=0x496352, relief=0x62745f;
   // The mapped point is the figure at the front of the two-sided stone booth.
   box(trim,0,.06,-.16,.91,.12,.90);
   for(const side of [-1,1])box(sandstone,side*.355,1.195,-.16,.20,2.19,.90);
   box(sandstone,0,2.32,-.16,.91,.13,.90);
   add('pediment','stone',trim,0,2.5325,-.16,.91,.295,.90);
   box(sandstone,0,1.215,-.16,.54,2.22,.13);
   for(const side of [-1,1])box(polished,0,1.225,-.16+side*.078,.51,2.09,.029);
   box(0x746759,.461,1.19,-.16,.019,.53,.36,'patina');
   box(relief,.474,1.34,-.16,.012,.19,.27,'patina');

   for(const side of [-1,1]){
    sphere(cast,side*.093,.175,.115,.068,.058,.127,'patina');
    limb([side*.091,.21,.044],[side*.097,.82,.002],.065,cast,'patina');
    sphere(relief,side*.143,1.408,.033,.075,.074,.079,'patina');
   }
   add('robe','patina',cast,0,.867,.022,.175,.45,.119);
   sphere(cast,0,1.222,.037,.164,.282,.113,'patina');
   box(0x364e42,0,1.054,.062,.278,.055,.181,'patina');
   for(const side of [-1,1])for(let row=0;row<4;row++){
    sphere(relief,side*.045,1.18+row*.063,.145,.012,.012,.009,'patina');
   }
   cylinder(cast,0,1.516,.033,.079,.10,'patina');
   sphere(cast,0,1.646,.056,.106,.145,.102,'patina');
   sphere(relief,0,1.645,.152,.029,.034,.022,'patina');
   cylinder(cast,0,1.954,.045,.116,.352,'patina');
   box(relief,0,1.791,.105,.218,.028,.168,'patina');
   limb([-.155,1.387,.04],[-.201,1.153,.06],.050,cast,'patina');
   limb([-.201,1.153,.06],[-.204,1.059,.134],.044,cast,'patina');
   limb([.151,1.390,.025],[.195,1.073,.031],.050,cast,'patina');
   limb([.195,1.073,.031],[.180,.926,.112],.041,cast,'patina');
   box(0x34483d,-.216,.240,.134,.061,.237,.047,'patina');
   limb([-.216,.345,.135],[-.218,1.535,.135],.022,cast,'patina');

   // The pentagonal fountain protrudes from the rear niche and has a brass rosette.
   add('pentagonal-pedestal','stone',sandstone,0,.405,-.745,.209,.81,.209);
   cylinder(trim,0,.815,-.745,.246,.099);
   cylinder(0x9e9278,0,.858,-.745,.232,.021);
   ring(trim,0,.9,-.745,.245,.030,'stone');
   for(let petal=0;petal<5;petal++){
    const angle=petal*Math.PI*2/5;
    sphere(gold,Math.sin(angle)*.028,.887,-.745+Math.cos(angle)*.028,.022,.013,.022);
   }
  }else if(model==='tarrega-creu-del-pati'){
   const limestone=0xcfb89a,cutStone=0xe0c8a7,relief=0xb39b80;
   const octagon=(color,height,radius,thickness)=>add('octagonal-stone','stone',color,0,height,0,radius,thickness,radius);
   octagon(limestone,.11,1.945,.22);
   octagon(cutStone,.30,1.69,.16);
   octagon(limestone,.49,1.46,.23);
   octagon(cutStone,.665,1.26,.12);
   octagon(limestone,.93,.78,.42);
   octagon(cutStone,1.20,.83,.13);
   octagon(limestone,1.40,.63,.28);
   octagon(cutStone,1.59,.49,.12);
   octagon(limestone,2.84,.28,2.42);
   octagon(cutStone,4.085,.37,.13);
   octagon(relief,4.405,.39,.51);
   for(let i=0;i<8;i++){
    const angle=(i+.5)*Math.PI/4,x=Math.sin(angle)*.38,z=Math.cos(angle)*.38;
    limb([x,4.18,z],[x,4.455,z],.065,cutStone,'stone');
    sphere(cutStone,x,4.487,z,.043,.054,.043,'stone');
    sphere(limestone,x,4.63,z,.066,.084,.066,'stone');
   }
   octagon(cutStone,4.706,.40,.115);
   box(limestone,0,5.28,0,.17,1.15,.15);
   box(limestone,0,5.43,0,1.20,.127,.14);
   // Four pointed arches form the square outline around the carved cross.
   for(const sx of [-1,1])for(const sy of [-1,1]){
    const points=[[0,5.43+sy*.67,0],[sx*.24,5.43+sy*.48,0],[sx*.43,5.43+sy*.46,0],[sx*.47,5.43+sy*.25,0],[sx*.66,5.43,0]];
    for(let i=1;i<points.length;i++)limb(points[i-1],points[i],.046,cutStone,'stone');
    sphere(limestone,sx*.43,5.43+sy*.46,0,.078,.082,.067,'stone');
   }
   sphere(cutStone,0,6.094,0,.068,.076,.072,'stone');
   for(const side of [-1,1]){
    sphere(relief,0,5.56,side*.098,.049,.062,.023,'stone');
    sphere(relief,0,5.37,side*.109,.068,.157,.031,'stone');
   }
   limb([-.21,5.488,.10],[.21,5.488,.10],.033,relief,'stone');
  }else if(model==='puigcerda-breto-cerda'){
   const weatheredSteel=0x74513c,baseSteel=0x5d4537;
   box(baseSteel,0,.065,0,1.05,.13,.63,'patina');
   box(baseSteel,0,.45,0,.62,.64,.38,'patina');
   add('puigcerda-cutout','patina',weatheredSteel,0,1.54,0,1.83,1.54,.074);
  }else if(model==='tremp-cross-fountain'){
   const limestone=0xb7a48b,trim=0xc6b59b,relief=0xa08d72,spout=0x625b48;
   // The 1922 stone base carries a pair of drinking taps below the Gothic shaft.
   cylinder(limestone,0,.075,0,1.42,.15);
   cylinder(trim,0,.22,0,1.32,.14);
   cylinder(limestone,0,.395,0,.92,.35);
   cylinder(trim,0,.64,0,.81,.16);
   add('hexagonal-stone','stone',limestone,0,1.015,0,.52,.62,.52);
   add('hexagonal-stone','stone',trim,0,1.36,0,.39,.13,.39);
   add('hexagonal-stone','stone',limestone,0,2.31,0,.226,1.81,.226);
   for(const side of [-1,1]){
    box(relief,side*.26,.86,.434,.21,.24,.045);
    limb([side*.26,.92,.453],[side*.26,.92,.61],.028,spout,'metal');
    limb([side*.26,.92,.61],[side*.26,.85,.61],.026,spout,'metal');
    box(relief,side*.26,.51,.70,.24,.026,.16);
   }
   add('hexagonal-stone','stone',trim,0,3.26,0,.31,.15,.31);
   add('hexagonal-stone','stone',relief,0,3.48,0,.35,.30,.35);
   add('hexagonal-stone','stone',trim,0,3.66,0,.38,.14,.38);
   box(limestone,0,3.859,0,.235,.282,.205);
   box(trim,0,4.186,0,.212,.588,.158);
   box(trim,-.225,4.128,0,.33,.155,.157);
   box(trim,.151,4.128,0,.105,.143,.15);
   sphere(limestone,-.39,4.13,0,.09,.119,.090,'stone');
   sphere(limestone,0,4.413,0,.096,.066,.088,'stone');
   // Only the principal relief masses are reconstructed.
   sphere(relief,0,4.259,.088,.050,.052,.024,'stone');
   sphere(relief,0,4.104,.093,.065,.123,.029,'stone');
   limb([-.179,4.147,.091],[0,4.158,.09],.027,relief,'stone');
   sphere(relief,0,4.25,-.087,.05,.063,.027,'stone');
   sphere(relief,0,4.095,-.089,.075,.128,.032,'stone');
   sphere(limestone,.062,4.166,-.116,.053,.070,.025,'stone');
  }else if(model==='jicin-amphitrite-fountain'){
   const sandstone=0xb69e80, trim=0xc4b096, shadedStone=0xa18e76, figure=0xcab49a, waterTint=0x659da3;
   // A near-square basin has clipped corners, two surrounding steps and a profiled coping.
   add('jicin-fountain-slab','stone',shadedStone,0,.08,0,6.35,.16,6.10);
   add('jicin-fountain-slab','stone',sandstone,0,.23,0,6.10,.14,5.86);
   add('jicin-fountain-wall','stone',sandstone,0,.54,0,5.72,.50,5.48);
   add('jicin-fountain-wall','stone',shadedStone,0,.33,0,5.84,.10,5.60);
   add('jicin-fountain-coping','stone',trim,0,.80,0,5.92,.16,5.68);
   add('jicin-fountain-slab','water',waterTint,0,.65,0,5.10,.025,4.90);

   add('octagonal-column','stone',shadedStone,0,.77,0,.98,.45,.98);
   add('octagonal-column','stone',trim,0,1.02,0,.94,.12,.94);
   add('octagonal-column','stone',sandstone,0,1.53,0,.72,.95,.72);
   add('octagonal-column','stone',trim,0,2.00,0,.87,.14,.87);
   box(figure,0,2.12,0,.92,.13,.82);
   for(let face=0;face<4;face++){
    const angle=face*Math.PI/2,sin=Math.sin(angle),cos=Math.cos(angle);
    const turn=new T.Quaternion().setFromAxisAngle(UP,angle);
    const at=(x,y,z)=>[x*cos+z*sin,y,z*cos-x*sin];
    const faceDepth=face%2===0?2.75:2.87;
    add('sphere','stone',shadedStone,...at(0,.56,faceDepth),.44,.182,.055,turn);
    add('sphere','stone',trim,...at(0,.57,faceDepth+.045),.36,.136,.031,turn);
    add('sphere','stone',figure,...at(0,1.53,.71),.14,.15,.234,turn);
    add('sphere','stone',trim,...at(0,1.49,.894),.11,.084,.08,turn);
    for(const side of [-1,1])sphere(shadedStone,...at(side*.102,1.56,.797),.031,.026,.025,'stone');
    const stream=[[1.49,.963],[1.412,1.20],[1.20,1.43],[.93,1.60],[.66,1.72]];
    for(let step=1;step<stream.length;step++){
     limb(at(0,...stream[step-1]),at(0,...stream[step]),.016,waterTint,'water');
    }
   }
   // Amphitrite stands on a group of fish with an oar in her right hand.
   for(const side of [-1,1]){
    sphere(shadedStone,side*.25,2.28,-side*.06,.30,.135,.18,'stone');
    sphere(figure,side*.37,2.29,.12,.145,.11,.11,'stone');
   }
   const lean=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),.11);
   add('robe','stone',figure,.02,2.82,0,.31,1.015,.218,lean);
   add('sphere','stone',figure,-.038,3.34,-.006,.239,.278,.148,lean);
   limb([-.068,3.48,.005],[-.091,3.61,.008],.08,figure,'stone');
   sphere(figure,-.097,3.69,.015,.131,.178,.125,'stone');
   sphere(sandstone,-.113,3.71,-.068,.140,.159,.086,'stone');
   sphere(sandstone,-.12,3.79,-.11,.067,.069,.053,'stone');
   limb([-.220,3.47,.01],[-.361,3.25,.106],.070,figure,'stone');
   limb([-.361,3.25,.106],[-.385,3.12,.219],.058,figure,'stone');
   limb([.143,3.48,.014],[.271,3.24,.087],.070,figure,'stone');
   limb([.271,3.24,.087],[.142,3.10,.164],.054,figure,'stone');
   limb([-.47,2.46,.245],[-.348,3.38,.20],.029,shadedStone,'stone');
   add('sphere','stone',sandstone,-.482,2.40,.249,.107,.196,.033,lean);
   for(const offset of [-.12,.07,.19]){
    limb([offset,2.38,.155],[offset*.6-.06,3.03,.200],.029,trim,'stone');
   }
  }else if(model==='jicin-marian-column'){
   const sandstone=0xb7aa92, trim=0xd0c2aa, darkStone=0x948870, iron=0x474640;
   const gilded=0xccac69, halo=0xd4b469;
   // The restoration account gives three steps, an octagonal base and a six-metre column.
   for(const [step,radius] of [2.53,2.30,2.07].entries()){
    add('octagonal-column','stone',sandstone,0,.105+step*.21,0,radius,.21,radius);
   }
   add('octagonal-column','stone',darkStone,0,.73,0,1.71,.21,1.71);
   box(sandstone,0,1.83,0,1.52,2.12,1.52);
   box(trim,0,.91,0,1.75,.18,1.75);
   box(trim,0,2.83,0,1.73,.17,1.73);

   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2;
    const cos=Math.cos(angle),sin=Math.sin(angle);
    const turn=new T.Quaternion().setFromAxisAngle(UP,angle);
    const at=(x,y,z)=>[x*cos+z*sin,y,z*cos-x*sin];
    add('box','stone',darkStone,...at(0,1.82,.771),.87,1.33,.036,turn);
    add('box','stone',sandstone,...at(0,1.82,.81),.57,.57,.068,
     turn.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),Math.PI/4)));
   }
   for(let corner=0;corner<4;corner++){
    const angle=(corner+.5)*Math.PI/2;
    const cos=Math.cos(angle),sin=Math.sin(angle);
    const turn=new T.Quaternion().setFromAxisAngle(UP,angle);
    const at=(x,y,z)=>[x*cos+(z+1.32)*sin,y,(z+1.32)*cos-x*sin];
    add('box','stone',sandstone,...at(0,1.04,0),.88,.56,.90,turn);
    add('box','stone',trim,...at(0,1.34,0),.92,.13,.93,turn);
    add('robe','stone',sandstone,...at(0,1.83,0),.29,.88,.19,turn);
    sphere(sandstone,...at(0,2.28,0),.22,.29,.16,'stone');
    sphere(trim,...at(0,2.61,.02),.135,.164,.129,'stone');
    for(const side of [-1,1]){
     limb(at(side*.16,2.40,0),at(side*.247,2.14,.10),.063,trim,'stone');
     limb(at(side*.247,2.14,.10),at(side*.091,2.03,.198),.054,trim,'stone');
     const wing=turn.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-side*.36));
     add('sphere','stone',trim,...at(side*.29,2.37,-.133),.16,.39,.099,wing);
    }
   }

   cylinder(trim,0,3.01,0,.58,.21);
   cylinder(sandstone,0,5.82,0,.397,5.50);
   for(const y of [3.18,3.40])cylinder(iron,0,y,0,.418,.067,'metal');
   cylinder(trim,0,8.61,0,.52,.26);
   for(let leaf=0;leaf<8;leaf++){
    const angle=leaf*Math.PI/4;
    sphere(trim,Math.sin(angle)*.435,8.65,Math.cos(angle)*.435,.11,.17,.11,'stone');
   }
   box(trim,0,8.86,0,1.12,.20,1.12);
   sphere(gilded,0,9.13,0,.325,.24,.315,'patina');
   add('torus','patina',0xb29952,0,9.13,0,.341,.48,.341,
    new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.24));
   add('robe','patina',gilded,0,9.73,0,.32,1.11,.23);
   sphere(gilded,0,10.15,.015,.245,.318,.16,'patina');
   sphere(gilded,0,10.59,.008,.143,.185,.151,'patina');
   for(const side of [-1,1]){
    limb([side*.174,10.34,.016],[side*.165,10.14,.103],.071,gilded,'patina');
    limb([side*.165,10.14,.103],[side*.024,10.30,.192],.048,gilded,'patina');
    limb([side*.175,9.23,.089],[side*.089,10.02,.158],.035,0xb49659,'patina');
   }
   for(let star=0;star<12;star++){
    const angle=star*Math.PI/6;
    sphere(halo,Math.sin(angle)*.295,10.61+Math.cos(angle)*.295,-.123,.032,.032,.021,'metal');
   }

   const posts=Array.from({length:8},(_,i)=>[Math.sin(i*Math.PI/4)*2.57,Math.cos(i*Math.PI/4)*2.57]);
   for(let side=0;side<posts.length;side++){
    const [ax,az]=posts[side],[bx,bz]=posts[(side+1)%posts.length];
    limb([ax,.01,az],[ax,1.15,az],.052,iron,'metal');
    limb([ax,.41,az],[bx,.41,bz],.023,iron,'metal');
    limb([ax,1.04,az],[bx,1.04,bz],.025,iron,'metal');
    for(const mix of [.2,.4,.6,.8]){
     const railX=ax+mix*(bx-ax),railZ=az+mix*(bz-az);
     limb([railX,.42,railZ],[railX,1.10,railZ],.022,iron,'metal');
    }
   }
  }else if(model==='jicin-coronation-well'){
   const sandstone=0xbba47f, moulding=0xd2bc98, shadowedStone=0x9a8260, roof=0x535c55, iron=0x3c423d;
   const westWing=new T.Quaternion().setFromAxisAngle(UP,Math.PI);
   box(sandstone,0,.14,0,4.22,.28,3.82);
   box(moulding,0,.31,0,4.28,.10,3.85);
   // The north and south arches leave the pavilion open around the 1936 weather pillar.
   for(const side of [-1,1]){
    const face=side*1.60;
    add('jicin-well-arch','stone',sandstone,0,.35,face,4.18,4.35,.39);
    box(moulding,0,3.78,face+side*.215,.30,.40,.12);
    for(const x of [-1.84,1.84]){
     box(moulding,x,.48,face+side*.125,.59,.23,.33);
     box(sandstone,x,2.42,face+side*.135,.43,3.72,.30);
     box(moulding,x,4.39,face+side*.135,.58,.23,.35);
    }
   }
   box(shadowedStone,0,4.72,0,4.21,.20,3.70);
   box(sandstone,0,4.95,0,4.24,.26,3.78);
   box(moulding,0,5.14,0,4.35,.16,3.88);
   add('jicin-well-roof','patina',roof,0,5.22,0,2.10,1.59,1.86);
   sphere(roof,0,6.85,0,.073,.145,.073,'patina');
   box(shadowedStone,0,.56,0,1.10,.40,.91);
   box(sandstone,0,1.15,0,.77,.81,.67);
   box(sandstone,0,2.15,0,.73,1.24,.66);
   box(moulding,0,2.82,0,.90,.14,.83);
   for(const side of [-1,1])box(iron,0,2.22,side*.348,.52,.88,.045,'metal');

   for(const side of [-1,1]){
    const x=side*2.02,turn=side<0?westWing:null;
    box(sandstone,x,4.37,0,.35,.68,3.43);
    add('jicin-well-portico','stone',sandstone,x,.14,0,1.55,.28,1.83,turn);
    add('jicin-well-portico','stone',moulding,x,3.81,0,1.57,.29,1.83,turn);
    add('jicin-well-wing-roof','patina',roof,x,4.16,0,1.57,.45,1.83,turn);
    // Three columns and two engaged end columns support each half-round wing.
    const posts=[0,Math.PI/4,Math.PI/2,Math.PI*3/4,Math.PI].map(angle=>[
     x+side*Math.sin(angle)*1.36,Math.cos(angle)*1.62
    ]);
    for(const [postX,postZ] of posts){
     cylinder(moulding,postX,.44,postZ,.217,.25);
     cylinder(sandstone,postX,2.06,postZ,.148,3.00);
     cylinder(moulding,postX,3.60,postZ,.215,.15);
    }
    for(let i=1;i<posts.length;i++){
     const [ax,az]=posts[i-1],[bx,bz]=posts[i];
     limb([ax,.68,az],[bx,.68,bz],.032,iron,'metal');
     limb([ax,2.06,az],[bx,2.06,bz],.032,iron,'metal');
     limb([ax,.75,az],[bx,1.97,bz],.019,iron,'metal');
     limb([ax,1.97,az],[bx,.75,bz],.019,iron,'metal');
     for(const mix of [.25,.5,.75]){
      const railX=ax+(bx-ax)*mix,railZ=az+(bz-az)*mix;
      limb([railX,.70,railZ],[railX,2.13,railZ],.024,iron,'metal');
     }
    }
   }
  }else if(model==='bratislava-maximilian-fountain'){
   const sandstone=0xb7a88c, trim=0xd2c5a8, shadedStone=0x96896f, waterTint=0x61a5af;
   add('bratislava-basin','stone',sandstone,0,0,0,1,1,1);
   // The mapped ring is the stone footprint. The water sits inside the modeled wall.
   add('bratislava-waterline','water',waterTint,0,.68,0,3.80,1,3.80);
   const stepAngle=Number(owner.feature.bearing)||0;
   const eastX=Math.cos(stepAngle),eastZ=-Math.sin(stepAngle);
   const stepsFacingEast=new T.Quaternion().setFromAxisAngle(UP,stepAngle);
   for(const direction of [-1,1])for(let step=0;step<3;step++){
    const reach=4.97-step*.36,height=.29*(step+1);
    add('box','stone',trim,direction*reach*eastX,height/2,direction*reach*eastZ,.48,height,1.43,stepsFacingEast);
   }

   box(trim,0,.87,0,2.16,.41,2.16);
   box(sandstone,0,1.49,0,1.54,.89,1.54);
   box(trim,0,2.01,0,1.75,.18,1.75);
   cylinder(sandstone,0,2.48,0,.58,.76);
   add('bratislava-upper-bowl','stone',sandstone,0,2.78,0,1,1,1);
   cylinder(waterTint,0,3.18,0,1.27,.026,'water');
   cylinder(sandstone,0,3.73,0,.52,1.14);
   for(let index=0;index<4;index++){
    const angle=index*Math.PI/2;
    const x=Math.sin(angle),z=Math.cos(angle);
    sphere(trim,x*.61,3.77,z*.61,.20,.33,.20,'stone');
    sphere(trim,x*.64,4.12,z*.64,.15,.17,.15,'stone');
    limb([x*.76,3.64,z*.76],[x*1.13,3.43,z*1.13],.024,waterTint,'water');
    limb([x*1.13,3.43,z*1.13],[x*1.23,3.20,z*1.23],.024,waterTint,'water');
   }
   cylinder(trim,0,4.39,0,.72,.25);
   box(sandstone,0,5.61,0,1.08,2.20,1.08);
   box(shadedStone,0,5.65,.55,.68,1.54,.05);
   box(trim,0,6.75,0,1.43,.20,1.43);
   box(sandstone,0,7.28,0,1.19,.91,1.19);
   box(trim,0,7.82,0,1.50,.23,1.50);
   box(sandstone,0,8.05,0,1.14,.26,1.14);

   // The current statue is the stone replica, with armour and a heraldic shield.
   const figure=0xc1b59b;
   for(const side of [-1,1]){
    sphere(figure,side*.18,8.28,.14,.16,.11,.25,'stone');
    limb([side*.17,8.33,.01],[side*.20,9.10,0],.145,figure,'stone');
    sphere(trim,side*.20,8.76,.09,.151,.17,.12,'stone');
    sphere(figure,side*.36,9.48,.01,.17,.19,.17,'stone');
   }
   sphere(figure,0,9.46,0,.35,.44,.23,'stone');
   sphere(shadedStone,0,9.08,0,.32,.18,.24,'stone');
   sphere(figure,0,10.12,.02,.24,.27,.23,'stone');
   box(trim,0,10.14,.19,.34,.07,.15);
   limb([-.34,9.53,0],[-.50,9.17,.12],.11,figure,'stone');
   limb([-.50,9.17,.12],[-.40,8.94,.33],.09,figure,'stone');
   sphere(trim,-.41,8.98,.38,.24,.39,.10,'stone');
   box(shadedStone,-.41,9,.474,.19,.20,.025);
   limb([.34,9.53,0],[.48,9.13,.18],.11,figure,'stone');
   limb([.48,9.13,.18],[.49,9.01,.26],.09,figure,'stone');
   limb([.50,9.03,.30],[.47,8.24,.33],.038,figure,'stone');
   box(trim,.50,9.035,.30,.24,.055,.09);
  }else if(model==='assisi-three-lions-fountain'){
   const limestone=0xcebd9f;
   add('assisi-fountain-basin','stone',limestone,0,0,0,1,1,1);
   cylinder(water,0,.55,0,2.94,.06,'water');
   cylinder(limestone,0,.80,0,.61,.70);
   sphere(limestone,0,1.38,0,.51,.49,.51,'stone');
   cylinder(limestone,0,1.85,0,.32,.67);
   cylinder(limestone,0,2.25,0,1.23,.28);
   ring(limestone,0,2.43,0,1.16,.105,'stone');
   cylinder(water,0,2.38,0,1.10,.05,'water');
   sphere(limestone,0,2.72,0,.29,.35,.29,'stone');
   cylinder(limestone,0,3.08,0,.17,.32);
   sphere(limestone,0,3.46,0,.25,.27,.25,'stone');
   for(let i=0;i<3;i++){
    const angle=i*2*Math.PI/3,side=Math.sin(angle),front=Math.cos(angle);
    const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('sphere','stone',limestone,side*3.19,.85,front*3.19,.26,.28,.42,rotation);
    sphere(limestone,side*3.35,1.14,front*3.35,.27,.28,.26,'stone');
    sphere(limestone,side*3.56,1.10,front*3.56,.14,.12,.16,'stone');
   }
  }else if(model==='herterichsbrunnen'){
   const sandstone=0xbdac8b;
   add('herterich-basin','stone',sandstone,0,0,0,1,1,1);
   cylinder(water,0,.67,0,3.22,.09,'water');
   cylinder(sandstone,0,1.06,0,.89,.88);
   cylinder(sandstone,0,2.27,0,.36,2.25);
   cylinder(sandstone,0,3.38,0,.63,.27);
   human(0,3.51,0,.60,'sword',sandstone);
  }else if(model==='iquique-naval-monument'){
   const granite=0xada59d,trim=0xc1b8a9,patina=0x48675d;
   steps(0,8.2);
   box(granite,0,.93,0,6.75,.70,6.75);
   box(trim,0,1.41,0,6.53,.26,6.53);
   box(granite,0,2.37,0,4.8,1.64,4.8);
   box(trim,0,3.28,0,4.93,.24,4.93);
   box(granite,0,5.56,0,3.35,4.32,3.35);
   box(trim,0,7.80,0,3.85,.28,3.85);
   box(granite,0,8.42,0,2.58,.96,2.58);
   box(trim,0,9.02,0,2.75,.24,2.75);
   human(0,9.14,0,1.58,'civil',patina);
   for(const x of [-2,2])for(const z of [-1.94,1.94]){
    box(granite,x,3.57,z,1.24,.36,1.20);
    human(x,3.75,z,.84,'civil',patina);
   }
   plaque(4.71,1.66,1.70);
  }else if(model==='rizal-monument'){
   const granite=0xa79f91;
   steps(0,7.25);box(granite,0,1.32,0,5.85,1.34,5.48);
   box(granite,0,2.65,-.65,3.62,1.45,3.72);box(marble,0,3.43,-.65,3.71,.20,3.82);
   box(granite,0,5.98,-.97,1.42,5.04,1.45);
   add('pyramid','stone',granite,0,8.95,-.97,1.00,1.00,1.00);
   box(granite,0,2.85,1.48,1.84,1.75,1.43);human(0,3.73,1.40,.89,'civil');
   plaque(1.53,1.89,2.754);
  }else if(model==='quezon-memorial-shrine'){
   const concrete=0xd8d7ce, limestone=0xe5e3d9, trim=0xa6a396, gilt=0xc3a269;
   // The mapped mausoleum base and the three 66 m crowns set the model proportions.
   add('triangular-base','stone',trim,0,.24,0,30.35,.48,30.35);
   add('triangular-base','stone',limestone,0,.77,0,29.5,.58,29.5);
   add('triangular-base','stone',concrete,0,3.41,0,28.35,4.70,28.35);
   add('triangular-base','stone',limestone,0,5.89,0,28.62,.27,28.62);
   add('triangular-base','stone',concrete,0,55.8,0,10.65,1.4,10.65);
   add('triangular-base','stone',limestone,0,57.0,0,11.15,1.0,11.15);
   add('triangular-base','stone',concrete,0,58.07,0,9.85,1.14,9.85);
   for(let i=0;i<3;i++){
    const angle=i*2*Math.PI/3;
    const at=(x,y,z)=>[x*Math.cos(angle)+z*Math.sin(angle),y,z*Math.cos(angle)-x*Math.sin(angle)];
    const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('box','stone',concrete,...at(0,31.95,8.25),4.57,52.1,5.35,rotation);
    add('box','stone',limestone,...at(0,31.47,10.97),2.74,51.3,.44,rotation);
    for(const x of [-1.82,1.82])add('box','stone',0xc7c5ba,...at(x,30.45,10.97),.27,49.1,.29,rotation);
    add('box','stone',limestone,...at(0,58.45,8.25),5.03,1.4,5.68,rotation);
    add('box','stone',trim,...at(0,59.46,8.30),3.06,.66,3.66,rotation);
    limb(at(0,59.76,8.66),at(0,64.60,8.46),.99,gilt);
    sphere(gilt,...at(0,65.28,8.49),.67,.72,.66);
    for(const side of [-1,1]){
     limb(at(side*.63,63.70,8.60),at(side*.73,62.42,9.35),.29,gilt);
     limb(at(side*.73,62.42,9.35),at(side*.40,62.05,9.61),.23,gilt);
     limb(at(side*.53,61.85,7.96),at(side*1.54,65.20,7.79),.48,gilt);
     limb(at(side*.37,61.11,7.82),at(side*1.18,64.31,7.57),.36,gilt);
    }
    add('torus','metal',gilt,...at(0,61.7,9.79),.55,1.64,.55,rotation);
   }
  }else if(model==='monas'){
   const shell=0xe0dbcc;
   steps(0,7.05);box(shell,0,1.09,0,5.15,.92,5.15);
   add('monas-base','stone',shell,0,2.00,0,3.32,.94,3.32);
   box(marble,0,2.55,0,6.65,.30,6.65);
   box(shell,0,9.66,0,1.57,13.95,1.57);
   box(0xb6b6b0,0,16.65,0,2.53,.29,2.53);box(marble,0,16.96,0,2.59,.29,2.59);
   sphere(0xc79733,0,17.44,0,.69,.43,.60);
   for(const [x,y,w,h] of [[-.25,17.88,.37,1.11],[.29,18.02,.43,1.37],[0,18.42,.34,1.14]]){
    add('cone','metal',0xc9962d,x,y,0,w,h,w,new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-.28));
   }
  }else if(model==='sydney-cenotaph'){
   const granite=0x9d9b91;
   steps(0,7.65,3.6);box(granite,0,1.23,0,4.21,1.23,2.12);box(marble,0,1.92,0,4.42,.23,2.26);
   for(const x of [-2.8,2.8]){
    box(granite,x,.89,0,1.03,.58,1.21);human(x,1.18,0,.85,'sword');
   }
   plaque(1.51,2.01,1.079);
  }else if(model==='telc-marian-column'){
   const granite=0xaaa49a,stone=0xd2c9b7,shadow=0xb9ad9a,iron=0x53544e,gilded=0xb49a59;
   box(granite,0,.11,0,8.62,.22,8.62);
   box(stone,0,.25,0,8.22,.09,8.22);
   box(granite,0,.35,0,4.38,.14,4.38);
   box(stone,0,.51,0,3.88,.18,3.88);
   box(shadow,0,1.12,0,3.39,1.04,3.39);
   box(stone,0,1.69,0,3.79,.17,3.79);
   box(shadow,0,2.27,0,2.80,.99,2.80);
   box(stone,0,2.88,0,3.20,.25,3.20);
   box(0x83796a,0,1.12,1.704,1.02,.65,.018);
   sphere(0x83796a,0,1.45,1.70,.51,.25,.016,'stone');
   sphere(stone,.02,1.05,1.73,.40,.11,.06,'stone');
   sphere(stone,-.31,1.15,1.75,.13,.11,.07,'stone');

   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2,ca=Math.cos(angle),sa=Math.sin(angle);
    const rotation=new T.Quaternion().setFromAxisAngle(UP,-angle);
    const railBox=(c,x,y,z,w,h,d,m='stone')=>add('box',m,c,x*ca-z*sa,y,x*sa+z*ca,w,h,d,rotation);
    const panelZ=4.02;
    for(const x of [-3.94,3.94])railBox(granite,x,.70,panelZ,.31,.95,.30);
    for(const [x,width] of side===0?[[-2.38,3.15],[2.38,3.15]]:[[0,7.86]]){
     railBox(granite,x,.35,panelZ,width,.17,.29);
     railBox(stone,x,1.07,panelZ,width,.10,.32);
     const bars=Math.round(width/.46);
     for(let i=0;i<bars;i++){
      railBox(iron,x+(i+.5-bars/2)*width/bars,.71,panelZ,.027,.62,.038,'metal');
     }
    }
    for(const x of [-2.22,2.22]){
     railBox(stone,x,.72,panelZ,.27,.88,.28);
     const dx=x*ca-panelZ*sa,dz=x*sa+panelZ*ca;
     sphere(stone,dx,1.33,dz,.125,.19,.125,'stone');
     sphere(stone,dx,1.53,dz,.080,.09,.08,'stone');
     railBox(shadow,x,1.37,panelZ-.09,.34,.19,.085);
    }
   }

   const saint=(x,y,z,size,frontX,frontZ)=>{
    add('robe','stone',stone,x,y+size*.33,z,size*.24,size*.67,size*.18);
    sphere(stone,x,y+size*.65,z,size*.19,size*.26,size*.14,'stone');
    sphere(stone,x,y+size*.89,z,size*.12,size*.13,size*.11,'stone');
    sphere(shadow,x+frontX*size*.13,y+size*.63,z+frontZ*size*.13,size*.13,size*.12,size*.115,'stone');
   };
   for(const [x,z,y] of [[-1.36,1.30,1.75],[0,1.49,2.79],[1.36,1.30,1.75],[-1.36,-1.30,1.75],[0,-1.49,2.79],[1.36,-1.30,1.75]]){
    saint(x,y,z,1.44,0,Math.sign(z));
   }
   cylinder(shadow,0,5.88,0,.65,5.85);
   for(let i=0;i<11;i++){
    const angle=i*2.4,height=3.64+i*.49;
    const x=Math.sin(angle)*.52,z=Math.cos(angle)*.52;
    sphere(i%2?stone:shadow,x,height,z,.35,.29,.35,'stone');
    sphere(stone,x*1.28,height+.13,z*1.28,.23,.27,.22,'stone');
    if(i%2===0)sphere(stone,x*1.40,height+.31,z*1.40,.124,.142,.12,'stone');
   }
   sphere(shadow,0,9.05,0,.58,.59,.57,'stone');
   saint(.06,9.47,0,1.68,0,1);
   for(let i=0;i<9;i++){
    const a=i*Math.PI*2/9;
    sphere(gilded,.06+Math.sin(a)*.44,11.10+Math.cos(a)*.45,.04,.052,.062,.044,'metal');
   }
  }else if(model==='telc-silenus'||model==='telc-margaret'){
   const rim=0xa9a59a,trim=0xbdb8aa,pedestal=0xcac3b0,figure=0xddd7c8;
   add('hex','stone',rim,0,.14,0,3.36,.28,3.36);
   add('hex','water',0x579b9e,0,.31,0,3.06,.044,3.06);
   for(let side=0;side<6;side++){
    const angle=(side+.5)*Math.PI/3,sin=Math.sin(angle),cos=Math.cos(angle);
    const turn=new T.Quaternion().setFromAxisAngle(UP,angle);
    const apothem=3.18*Math.cos(Math.PI/6);
    add('box','stone',rim,sin*apothem,.33,cos*apothem,3.24,.42,.25,turn);
    add('box','stone',trim,sin*apothem,.55,cos*apothem,3.34,.11,.36,turn);
   }
   const form=(x,y,z,w,h,d,c=figure)=>sphere(c,x,y,z,w,h,d,'stone');
   const join=(a,b,r,c=figure)=>limb(a,b,r,c,'stone');
   if(model==='telc-margaret'){
    box(rim,0,.43,0,1.47,.44,1.46);
    box(pedestal,0,.68,0,1.29,.12,1.29);
    box(pedestal,0,1.25,0,.88,1.05,.88);
    box(trim,0,1.83,0,1.15,.15,1.15);
    box(figure,0,1.98,0,1.06,.15,1.06);
    // The low crouching dragon sits below the folds of the saint's robe.
    form(-.09,2.13,.06,.37,.14,.24,pedestal);
    form(.31,2.21,.16,.18,.17,.17,pedestal);
    form(.40,2.21,.24,.13,.080,.096,pedestal);
    join([-.31,2.12,.06],[-.47,2.19,.13],.064,pedestal);
    join([-.47,2.19,.13],[-.52,2.29,.05],.049,pedestal);
    add('robe','stone',figure,-.04,2.67,-.02,.36,1.08,.25);
    join([-.22,2.20,.15],[-.24,3.10,-.01],.102,pedestal);
    join([.20,2.19,.14],[.15,3.11,-.02],.097,pedestal);
    form(-.04,3.25,-.04,.25,.34,.18);
    form(-.01,3.68,.01,.15,.20,.13);
    form(-.04,3.71,-.08,.17,.18,.12,pedestal);
    join([-.20,3.40,.02],[-.32,3.53,.16],.087);
    join([-.32,3.53,.16],[-.38,3.69,.20],.065);
    form(-.38,3.70,.20,.074,.077,.064);
    join([.18,3.38,.01],[.28,3.18,.14],.088);
    join([.28,3.18,.14],[.19,3.03,.10],.069);
    limb([-.41,3.37,.19],[-.35,4.18,.21],.028,0x827155);
    limb([-.49,3.99,.20],[-.23,3.99,.21],.025,0x827155);
   }else{
    box(pedestal,0,.37,0,1.40,.34,1.40);
    box(figure,0,.60,0,1.28,.13,1.28);
    box(pedestal,0,1.15,0,.84,1.0,.88);
    box(figure,0,1.69,0,1.01,.16,.99);
    form(-.20,1.96,-.17,.31,.31,.29,pedestal);
    join([-.17,1.79,.17],[-.19,2.22,.03],.13);
    join([-.19,2.22,.03],[-.12,2.58,-.02],.16);
    join([.21,1.79,.05],[.17,2.21,.13],.13);
    join([.17,2.21,.13],[.02,2.58,-.03],.16);
    form(-.05,2.48,-.02,.27,.23,.20);
    form(-.08,2.79,-.06,.28,.33,.19);
    form(-.15,3.19,-.05,.17,.21,.15);
    form(-.15,3.11,.07,.13,.13,.12,pedestal);
    join([-.28,2.95,-.07],[-.37,2.75,.12],.102);
    join([-.37,2.75,.12],[.01,2.70,.27],.084);
    join([.09,2.93,-.05],[.24,2.78,.09],.103);
    join([.24,2.78,.09],[.24,2.94,.22],.077);
    // The child is cradled across Silenus's chest and forearms.
    join([-.08,2.75,.19],[.26,3.04,.22],.105);
    form(.32,3.12,.22,.115,.125,.10);
    join([.01,2.80,.22],[-.13,2.68,.28],.055);
   }
  }else if(model==='se-dialogo'){
   box(0xa09d92,0,.115,0,5.30,.23,2.05);
   add('se-dialogo-steel','metal',0xb52527,0,.23,0,1,1,1);
  }else if(model==='nguyen-hue-ho-chi-minh'){
   const granite=0x333331, polished=0x45443f, cast=0x5e4e3b, edge=0x6a5944;
   box(granite,0,.22,0,3.40,.44,3.10);
   box(polished,0,.51,0,3.12,.14,2.82);
   box(granite,0,1.59,0,2.83,2.02,2.57);
   box(polished,0,2.64,0,2.95,.12,2.72);
   // The 4.5 m bronze stands on a 2.7 m pedestal and greets the boulevard with its right hand.
   for(const [x,z] of [[-.35,.03],[.31,.14]]){
    sphere(cast,x,2.86,z+.12,.235,.16,.38,'patina');
    limb([x,2.94,z-.07],[x*.96,3.92,z-.10],.203,cast,'patina');
    limb([x*.96,3.77,z-.10],[x*.54,4.72,0],.218,cast,'patina');
   }
   add('robe','patina',cast,0,4.74,0,.46,.95,.28);
   sphere(cast,0,5.42,0,.52,.70,.32,'patina');
   limb([.035,4.77,.25],[.035,5.89,.27],.039,edge,'patina');
   for(const y of [5.10,5.32,5.54,5.76]){
    sphere(edge,-.035,y,.287,.034,.034,.022,'patina');
   }
   for(const x of [-.243,.243]){
    box(cast,x,5.57,.274,.215,.214,.073,'patina');
    box(edge,x,5.673,.309,.217,.044,.027,'patina');
   }
   limb([0,5.93,0],[0,6.28,0],.161,cast,'patina');
   sphere(cast,0,6.55,.024,.265,.324,.235,'patina');
   sphere(edge,0,6.48,.226,.072,.062,.061,'patina');
   sphere(cast,0,6.21,.188,.124,.18,.092,'patina');
   for(const x of [-.261,.261])sphere(cast,x,6.53,.022,.050,.080,.050,'patina');
   limb([-.42,5.79,.018],[-.75,5.45,.146],.163,cast,'patina');
   limb([-.75,5.45,.146],[-.91,6.55,.256],.138,cast,'patina');
   sphere(cast,-.92,6.70,.265,.143,.22,.076,'patina');
   for(const [x,tip] of [[-1.025,7.02],[-.955,7.19],[-.887,7.12],[-.824,7.02]]){
    limb([x,6.80,.271],[x-.012,tip,.272],.025,edge,'patina');
   }
   limb([-.82,6.59,.272],[-.74,6.79,.290],.043,cast,'patina');
   limb([.43,5.78,.018],[.58,5.14,.037],.151,cast,'patina');
   limb([.58,5.14,.037],[.55,4.57,.13],.117,cast,'patina');
   sphere(cast,.55,4.42,.14,.091,.166,.083,'patina');
  }else if(model==='santiago-cardenal-caro'){
   const granite=0x9e9b91,trim=0xb7b1a3,bronze=0x56554a,dark=0x46473c;
   box(granite,0,.13,0,2.28,.26,2.09);
   box(trim,0,.32,0,2.08,.16,1.92);
   box(granite,0,1.40,0,1.69,2.04,1.60);
   box(trim,0,2.48,0,1.96,.13,1.82);
   box(dark,0,1.84,.806,1.18,.40,.026,'metal');
   box(bronze,0,2.61,0,1.17,.13,.84,'patina');
   const form=(x,y,z,w,h,d,c=bronze)=>sphere(c,x,y,z,w,h,d,'patina');
   const join=(a,b,r,c=bronze)=>limb(a,b,r,c,'patina');
   add('robe','patina',bronze,0,3.51,-.10,.59,1.68,.41);
   form(.02,4.02,-.11,.48,.53,.33);
   form(.02,4.22,-.20,.48,.29,.34);
   form(.015,4.75,.045,.22,.28,.20);
   form(.035,4.73,.218,.073,.085,.064);
   box(dark,.015,5.00,.015,.38,.14,.34,'patina');
   box(bronze,.015,5.078,.025,.21,.08,.23,'patina');
   for(const x of [-.24,-.07,.10,.28])join([x,2.69,.20],[x*.63,3.93,.19],.041,dark);
   join([-.33,4.20,-.04],[-.58,4.19,.19],.16);
   join([-.58,4.19,.19],[-.64,4.69,.38],.115);
   form(-.64,4.74,.39,.126,.155,.085);
   for(const x of [-.68,-.62])join([x,4.80,.40],[x-.01,4.98,.39],.026);
   join([.34,4.19,-.04],[.47,3.82,.10],.135);
   join([.47,3.82,.10],[.40,3.57,.34],.093);
   form(.38,3.57,.39,.12,.10,.08);
   form(.40,3.49,.41,.17,.065,.14,dark);
  }else if(model==='se-anchieta'){
   const granite=0x96958f,trim=0xaaa7a0,metal=0x505954,dark=0x424c46;
   box(trim,0,.17,0,1.96,.34,2.05);
   box(granite,0,2.28,0,1.80,3.88,1.89);
   box(trim,0,4.36,0,1.92,.28,2.02);
   box(0x777771,0,2.87,.96,1.39,.74,.027);
   for(const side of [-1,1]){
    box(metal,side*.915,1.97,0,.035,1.34,1.30,'patina');
    // Reliefs read as incised bronze panels at plaza scale.
    for(const [y,z,h] of [[1.78,-.34,.42],[1.91,.04,.68],[1.81,.34,.48]]){
     sphere(0x657067,side*.938,y,z,.022,h*.56,.10,'patina');
     sphere(0x657067,side*.941,y+h*.52,z,.024,.079,.077,'patina');
    }
   }
   const fig=(x,y,z,rx,ry,rz,c=metal)=>sphere(c,x,y,z,rx,ry,rz,'patina');
   const join=(a,b,r,c=metal)=>limb(a,b,r,c,'patina');
   add('robe','patina',metal,.09,5.61,-.15,.79,2.22,.42);
   join([-.14,4.66,.28],[-.31,5.91,.06],.27);
   join([.48,4.67,-.03],[.27,5.90,-.08],.28);
   fig(-.19,4.63,.33,.21,.12,.26,dark);
   fig(.43,4.64,.12,.24,.14,.28,dark);
   for(const [x,z] of [[-.53,.06],[-.21,.32],[.12,.39],[.52,.26],[.66,-.28]]){
    join([x,4.68,z],[x*.56+.06,6.17,z*.34-.06],.105,dark);
   }
   fig(.03,6.73,-.01,.53,.75,.37);
   fig(.43,6.80,-.22,.40,.57,.28);
   join([.02,7.18,.03],[-.09,7.48,.08],.17);
   fig(-.11,7.63,.14,.26,.31,.25);
   fig(-.11,7.71,.03,.28,.26,.23,dark);
   fig(-.14,7.55,.34,.092,.10,.097);
   join([-.36,7.11,.04],[-.70,7.53,.16],.22);
   join([-.70,7.53,.16],[-.93,8.31,.21],.13);
   fig(-.93,8.34,.21,.145,.15,.115);
   join([-.95,8.19,.23],[-1.17,9.35,.26],.044,dark);
   join([-1.26,8.86,.25],[-.83,8.94,.26],.043,dark);
   join([.37,7.04,.05],[.65,6.74,.18],.20);
   join([.65,6.74,.18],[.51,7.16,.46],.144);
   add('box','patina',dark,.49,7.20,.47,.37,.51,.18,new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-.83));
   fig(.61,7.18,.53,.12,.14,.11);
  }else if(model==='marco-zero'){
   cylinder(stone,0,.061,0,2.72,.122);
   ring(0x8b897f,0,.13,0,2.42,.052,'stone');
   for(let ray=0;ray<8;ray++){
    const a=ray*Math.PI/4;
    limb([Math.sin(a)*.65,.144,Math.cos(a)*.65],[Math.sin(a)*2.13,.144,Math.cos(a)*2.13],.037,0x706d61,'stone');
   }
   add('hex','stone',marble,0,.63,0,.51,1.02,.51);
   add('hex','metal',0x978759,0,1.16,0,.52,.08,.52);
  }else if(model==='arenales-ensemble'){
   steps(0,9.4);cylinder(stone,0,1.05,0,4.1,.75);cylinder(stone,0,1.55,0,3.65,.32);
   box(stone,0,3.85,0,3.5,4.3,3.9);box(marble,0,6.14,0,4.1,.32,4.5);plaque(4.3,1.9,2.02);horse(6.32,'pointing');
   for(let i=0;i<15;i++){const angle=i*Math.PI*2/15,x=Math.sin(angle)*3.15,z=Math.cos(angle)*3.15;cylinder(stone,x,1.80,z,.38,.26);human(x,1.93,z,.53,'classical',marble);}
  }else if(model==='freedom-chains'){
   steps(0,4.6);box(marble,0,1.45,0,2.8,1.6,2.8);box(marble,0,2.365,0,3.15,.24,3.15);
   human(0,2.485,0,1.38,'freedom',marble);plaque(1.5,1.6,1.41);
  }else if(model==='pyramid'){
   steps(0,6.8);box(marble,0,1.16,0,4.7,1.05,4.7);box(marble,0,2.10,0,3.9,.85,3.9);box(marble,0,2.70,0,4.15,.30,4.15);
   add('pyramid','stone',marble,0,6.50,0,1.75,7.3,1.75);box(marble,0,10.30,0,.75,.33,.75);human(0,10.47,0,.70,'liberty',marble);
   for(const side of [-1,1])for(const end of [-1,1]){box(marble,side*2.35,1.0,end*2.35,.90,.60,.90);human(side*2.35,1.3,end*2.35,.55,'classical',marble);}
   plaque(1.5,2.2,2.39);
  }else if(['equestrian','equestrian-fountain'].includes(model)){
   if(model==='equestrian-fountain')basin(4.2);steps(model==='equestrian-fountain'?.45:0,5.3,6.1);box(stone,0,2.05,0,3.9,2.85,4.7);box(0xe4d8c3,0,3.61,0,4.2,.31,5.0);plaque(2.1,2.2,2.39);horse(3.78,owner.feature.riderPose||'reins');
   if(model==='equestrian-fountain')for(const side of [-1,1])jet(side*2.7,.52,0,.85,.60);
  }else if(model==='standing-civil'){
   sanMartin();
  }else if(model==='standing-sword'){
   steps(0,4.0);box(stone,0,1.8,0,2.7,2.15,2.7);box(marble,0,3.0,0,3.0,.27,3.0);plaque(1.9,1.6,1.39);human(0,3.135,0,1.45,'sword');
  }else if(model==='warsaw-old-town-mermaid'){
   const sandstone=0xc8b799,trim=0xaa987b,dark=0x594b36,patina=0x65533d;
   for(const [height,radius,thickness] of [[.10,1.08,.20],[.54,.89,.68],[.94,.99,.12]]){
    add('hex','stone',height===.54?sandstone:trim,0,height,0,radius,thickness,radius);
   }
   for(let i=0;i<6;i++){
    const a=i*Math.PI/3;
    sphere(i%2?patina:dark,Math.cos(a)*.47,1.04+i%3*.075,Math.sin(a)*.47,.31,.19,.28,'patina');
   }
   const tail=[[-.07,1.63,0],[-.38,1.39,-.23],[-.48,1.22,-.57],[-.10,1.19,-.77],[.35,1.36,-.66],[.54,1.67,-.36]];
   for(let i=1;i<tail.length;i++){
    const radius=.25-i*.032;
    limb(tail[i-1],tail[i],radius,patina,'patina');
    sphere(patina,...tail[i],radius,radius,radius,'patina');
   }
   for(const side of [-1,1])limb(tail.at(-1),[.67+side*.13,1.93,-.27+side*.10],.052,dark,'patina');
   sphere(patina,-.08,1.89,.02,.27,.41,.20,'patina');
   sphere(patina,-.15,2.18,.06,.32,.24,.19,'patina');
   limb([-.17,2.23,.05],[-.21,2.43,.09],.086,patina,'patina');
   sphere(patina,-.23,2.54,.10,.145,.18,.133,'patina');
   sphere(dark,-.23,2.59,.025,.151,.127,.122,'patina');
   limb([-.22,2.53,-.03],[-.15,2.35,-.16],.071,dark,'patina');
   limb([-.36,2.17,.07],[-.63,2.46,.05],.073,patina,'patina');
   limb([-.63,2.46,.05],[-.50,2.86,.02],.061,patina,'patina');
   sphere(patina,-.50,2.87,.02,.079,.083,.071,'patina');
   limb([-.57,2.83,.02],[-.41,2.96,.02],.044,dark,'metal');
   limb([-.53,2.98,-.03],[-.31,2.91,.05],.024,dark,'metal');
   limb([-.41,2.95,.02],[.17,3.42,.02],.023,patina,'metal');
   limb([.10,2.17,.06],[.36,1.95,.21],.071,patina,'patina');
   limb([.36,1.95,.21],[.55,2.15,.35],.060,patina,'patina');
   sphere(dark,.60,2.16,.38,.39,.46,.081,'patina');
   add('torus','patina',patina,.60,2.16,.435,.375,.442,.48);
   sphere(patina,.60,2.16,.47,.105,.10,.045,'patina');
  }else if(model==='pirulito-obelisk'){
   // Belotur records the dimensions of the granite courses and pyramid.
   const granite=0xa39d93,polished=0x807d77,molding=0xb7afa3;
   box(granite,0,.35,0,7.60,.70,7.60);
   box(granite,0,.96,0,4.88,.52,4.88);
   box(granite,0,1.82,0,2.40,1.20,2.40);
   box(molding,0,2.60,0,2.52,.36,2.52);
   box(polished,0,3.92,0,1.85,2.28,1.85);
   box(molding,0,5.25,0,2.02,.38,2.02);
   add('obelisk-cap','stone',granite,0,9.505,0,1.20,8.13,1.20);
   for(const side of [-1,1]){
    box(0x69523d,0,3.95,side*.939,1.05,.65,.028,'patina');
    box(0x69523d,side*.939,3.95,0,.028,.65,1.05,'patina');
   }
  }else if(model==='ubon-great-candle'){
   const candle=0xc8983d,accent=0xebbb5e,shade=0x956424;
   cylinder(stone,0,.23,0,9,.46);
   box(shade,0,.69,0,6.3,.62,11.0);
   sphere(candle,0,1.86,0,3.25,1.52,7.05,'stone');
   box(accent,0,2.84,0,4.70,.30,9.7);
   for(const side of [-1,1]){
    limb([0,2.28,side*4.65],[0,4.8,side*7.35],.52,candle,'stone');
    sphere(accent,0,4.85,side*7.34,.65,.52,.69,'stone');
    for(let i=-3;i<=3;i++){
     const z=i*1.39;
     sphere(accent,side*2.30,2.47,z,.48,.47,.63,'stone');
    }
   }
   cylinder(shade,0,3.69,0,1.67,1.44);
   cylinder(candle,0,11.72,0,.70,14.60);
   for(const y of [4.15,5.75,8.37,11.03,13.69,16.36,18.88])cylinder(accent,0,y,0,.78,.21);
   add('cone','stone',accent,0,20.50,0,.73,3.0,.73);
  }else if(model==='phayao-ngam-mueang'){
   const marbleBase=0xd4cbb5,fig=0x645b48,ceremonial=0x847655;
   box(marbleBase,0,.23,0,4.4,.46,4.4);
   box(marbleBase,0,.60,0,3.94,.28,3.94);
   box(marbleBase,0,1.45,0,2.58,1.42,2.58);
   box(marble,0,2.24,0,2.86,.20,2.86);
   box(0x4f463a,0,1.55,1.30,1.38,.63,.045);
   human(0,2.34,0,.99,'standing',fig);
   add('robe','patina',fig,0,3.05,0,.44,1.11,.30);
   cylinder(ceremonial,0,4.80,0,.245,.13,'patina');
   add('cone','patina',fig,0,5.04,0,.22,.42,.22);
   limb([.49,2.64,.34],[.49,3.60,.33],.035,fig,'patina');
  }else if(model==='virac-rizal-monument'){
   const concrete=0xbbb3a4,trim=0xd9cec0,figure=0x69584a;
   box(concrete,0,.32,0,6.40,.64,5.28);
   for(let i=0;i<3;i++)box(trim,0,.10+i*.18,2.55-i*.30,3.25,.20,.60);
   cylinder(concrete,0,.84,-.37,2.01,.40);
   cylinder(trim,0,1.12,-.38,1.69,.19);
   box(concrete,0,2.02,-.38,1.62,1.60,1.48);
   box(trim,0,2.88,-.38,1.82,.21,1.68);
   box(0x5d5750,0,1.99,.37,.79,.73,.045,'metal');
   human(0,2.98,-.35,1.07,'standing',figure);
  }else if(model==='morong-claudio-statue'){
   const plinth=0x9e9687,uniform=0x777357;
   box(plinth,0,.18,0,2.75,.36,2.75);
   box(stone,0,.48,0,2.43,.24,2.43);
   box(plinth,0,1.23,0,1.72,1.27,1.68);
   box(stone,0,1.93,0,2.04,.18,2.02);
   box(0x302d28,0,1.30,.86,1.24,.84,.05,'metal');
   human(0,2.01,0,.84,'standing',uniform);
   cylinder(uniform,0,4.07,.02,.255,.07,'patina');
   sphere(uniform,0,4.11,-.03,.21,.15,.21,'patina');
   limb([.32,2.28,.31],[.46,3.36,.32],.047,uniform,'patina');
  }else if(model==='daet-rizal-pylon'){
   const white=0xece5d9,shade=0xc8c3b7,emblem=0xc29b45;
   box(shade,0,.19,0,3.8,.38,3.8);
   box(white,0,1.10,0,2.60,1.44,2.60);
   box(white,0,1.86,0,2.82,.16,2.82);
   add('triangular-base','stone',white,0,2.69,0,1.22,1.50,1.22);
   add('triangular-obelisk','stone',white,0,4.77,0,1.22,2.66,1.22,
    new T.Quaternion().setFromAxisAngle(UP,Math.PI));
   for(const angle of [Math.PI/3,Math.PI,5*Math.PI/3]){
    add('flag-star','stone',emblem,Math.sin(angle)*.62,2.87,Math.cos(angle)*.62,.38,.38,.05,
     new T.Quaternion().setFromAxisAngle(UP,angle));
   }
  }else if(model==='dapitan-rizal-statue'){
   const white=0xe6e1d3,grey=0xc5bead,stone=0xd6d0c2;
   box(grey,0,.12,0,3.55,.24,3.55);
   box(white,0,.31,0,3.23,.14,3.23);
   box(stone,0,.50,0,2.91,.24,2.91);
   box(grey,0,.69,0,2.55,.14,2.55);
   box(white,0,.92,0,2.40,.32,2.40);
   box(stone,0,1.73,0,1.95,1.32,1.95);
   box(white,0,2.45,0,2.28,.17,2.28);
   box(grey,0,2.58,0,1.68,.12,1.68);
   box(white,0,2.72,0,1.27,.17,1.27);
   box(0x746f63,0,1.85,.982,1.04,.47,.022);
   box(0xc1b9a7,0,1.89,.996,.90,.035,.01);
   const fig=(x,y,z,rx,ry,rz,c=white)=>sphere(c,x,y,z,rx,ry,rz,'stone');
   const join=(a,b,r,c=white)=>limb(a,b,r,c,'stone');
   fig(-.19,2.89,.11,.14,.10,.23);
   fig(.17,2.88,.07,.14,.10,.21);
   join([-.19,2.91,0],[-.19,3.54,.01],.109);
   join([.17,2.91,-.02],[.18,3.54,-.03],.11);
   add('robe','stone',white,0,3.76,-.04,.46,.84,.29);
   fig(0,4.32,-.04,.40,.57,.29);
   join([0,4.65,-.05],[0,4.89,-.025],.13);
   fig(.02,5.03,.01,.21,.29,.19);
   fig(-.022,5.12,-.075,.19,.21,.15,grey);
   fig(.035,5.04,.185,.062,.076,.064);
   join([-.34,4.62,-.04],[-.45,4.18,.11],.103);
   join([-.45,4.18,.11],[-.15,4.38,.25],.081);
   fig(-.12,4.39,.26,.085,.075,.072);
   join([.34,4.61,-.04],[.46,4.18,.02],.103);
   join([.46,4.18,.02],[.49,3.88,.16],.077);
   box(grey,.46,3.96,.20,.37,.40,.10);
   fig(.48,3.89,.25,.085,.079,.068);
  }else if(model==='dapitan-mindanao-relief'){
   const redWall=0xa74a40,whiteCap=0xe8ddce,reliefGround=0x5c8a50,blueSea=0x63a1af;
   box(stone,0,.15,0,32,.30,28);
   box(blueSea,0,.32,0,31,.08,27,'water');
   add('mindanao-land','stone',reliefGround,0,.62,0,25.2,.54,20.8);
   for(const [x,z,rx,rz] of [[-2.5,1.5,3.4,2.2],[2.1,-1.4,4.5,2.8],[5.9,-3.6,2.9,3.4],[4.1,4.3,2.6,4.2]]){
    sphere(0x6b955b,x,.72,z,rx,.48,rz,'stone');
   }
   for(const side of [-1,1]){
    box(redWall,0,.59,side*13.56,32,.61,.60);
    box(redWall,side*15.70,.59,0,.60,.61,27);
    for(let i=-6;i<=6;i++)box(whiteCap,i*2.42,1.03,side*13.56,.94,.27,.65);
    for(let i=-5;i<=5;i++)box(whiteCap,side*15.70,1.03,i*2.42,.65,.27,.94);
   }
  }else if(model==='laoag-tobacco-obelisk'){
   const brick=0x995d46,darkBrick=0x734a3d,cap=0xb17b63;
   box(brick,0,.29,0,3.5,.58,3.5);
   box(darkBrick,0,.71,0,2.85,.28,2.85);
   box(brick,0,1.63,0,2.47,1.60,2.47);
   box(cap,0,2.53,0,2.74,.21,2.74);
   box(brick,0,3.86,0,1.78,2.46,1.78);
   box(darkBrick,0,5.15,0,2.04,.15,2.04);
   box(brick,0,5.48,0,1.53,.56,1.53);
   box(cap,0,5.81,0,1.81,.16,1.81);
   box(darkBrick,0,6.08,0,1.42,.39,1.42);
   for(const side of [-1,1]){
    box(darkBrick,0,1.56,side*1.244,.83,.68,.03);
    box(darkBrick,side*1.244,1.56,0,.03,.68,.83);
   }
  }else if(model==='naga-fifteen-martyrs'){
   const pale=0xf2e9d9,paintedGold=0xc69a3b,pedestalRed=0x90382d;
   cylinder(0xb37b62,0,.11,0,3.20,.22);
   cylinder(pale,0,.40,0,2.34,.36);
   cylinder(pale,0,1.02,0,1.82,.88);
   cylinder(pedestalRed,0,1.48,0,1.86,.12);
   cylinder(pale,0,2.29,0,1.67,1.50);
   cylinder(pale,0,3.11,0,1.84,.26);
   cylinder(pedestalRed,0,3.29,0,1.63,.12);
   cylinder(pale,0,4.02,0,.88,1.36);
   cylinder(paintedGold,0,4.76,0,1.02,.18);
   for(let i=0;i<15;i++){
    const angle=i*Math.PI*2/15,x=Math.sin(angle),z=Math.cos(angle);
    sphere(paintedGold,x*1.67,2.40,z*1.67,.15,.19,.15,'stone');
    sphere(paintedGold,x*1.67,2.06,z*1.67,.10,.045,.10,'stone');
   }
   for(const x of [-1.12,1.12])human(x,1.53,1.25,.66,'classical',paintedGold);
   human(0,4.85,0,.80,'freedom',paintedGold);
  }else if(model==='boa-vista-garimpeiro'){
   const figure=0xc6a064,shade=0x9d7644,plinth=0xb5a48e;
   // A shallow reflecting pool surrounds the masonry support.
   box(plinth,0,.12,0,15.7,.24,7.5);
   box(water,0,.255,0,15.18,.035,6.98,'water');
   for(const side of [-1,1]){
    box(stone,side*7.72,.30,0,.26,.22,7.5);
    box(stone,0,.30,side*3.62,15.18,.22,.26);
   }
   box(plinth,0,.74,-.18,4.18,1.0,3.36);
   box(stone,0,1.30,-.18,4.30,.16,3.48);
   // Bent knees and forward shoulders carry the head and the two-handed bateia.
   for(const side of [-1,1]){
    const hip=[side*.59,4.44,-.83],knee=[side*.99,2.92,-.04],ankle=[side*1.03,1.63,-.55];
    limb(hip,knee,.42,figure,'stone');
    sphere(figure,...knee,.41,.40,.40,'stone');
    limb(knee,ankle,.29,figure,'stone');
    sphere(figure,ankle[0],1.55,-.21,.36,.17,.68,'stone');
    const shoulder=[side*.78,5.70,.57],elbow=[side*1.20,4.77,1.29],hand=[side*1.20,4.03,2.64];
    sphere(figure,...shoulder,.44,.52,.45,'stone');
    limb(shoulder,elbow,.28,figure,'stone');
    sphere(figure,...elbow,.25,.26,.25,'stone');
    limb(elbow,hand,.21,figure,'stone');
    sphere(figure,...hand,.26,.24,.27,'stone');
   }
   sphere(shade,0,4.43,-.80,.92,.62,.54,'stone');
   limb([0,4.45,-.65],[0,5.71,.49],.72,figure,'stone');
   sphere(figure,0,5.75,.45,1.0,.58,.69,'stone');
   limb([0,5.82,.85],[0,6.30,1.04],.34,figure,'stone');
   sphere(figure,0,6.43,1.20,.53,.58,.50,'stone');
   sphere(figure,0,6.30,1.62,.20,.19,.21,'stone');
   cylinder(shade,0,6.85,1.18,.85,.12);
   cylinder(figure,0,7.06,1.18,.48,.36);
   add('bateia','stone',shade,0,3.78,2.41,1,1,1,new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.22));
  }else if(model==='monaco-malizia'){
   const cloak=0x573e30,dark=0x382a22,fold=0x6e5340;
   cylinder(0xaaa091,0,.36,0,1.10,.72);
   cylinder(0xbfb5a5,0,.78,0,1.04,.12);
   // The bronze figure wears a long friar's habit and reaches for the sword beneath it.
   add('robe','patina',cloak,.07,1.92,-.02,.87,2.13,.53);
   sphere(cloak,0,2.94,-.08,.56,.75,.39,'patina');
   sphere(dark,-.04,3.70,-.04,.39,.49,.34,'patina');
   sphere(fold,-.04,3.66,.21,.22,.28,.17,'patina');
   sphere(dark,-.04,3.51,.29,.19,.14,.13,'patina');
   limb([-.45,2.99,.03],[-.60,2.48,.23],.19,cloak,'patina');
   limb([-.60,2.48,.23],[-.16,2.42,.50],.14,cloak,'patina');
   limb([.43,2.99,.02],[.52,2.61,.24],.20,cloak,'patina');
   limb([.52,2.61,.24],[.34,2.37,.45],.15,cloak,'patina');
   for(const x of [-.16,.34])sphere(fold,x,2.40,.49,.12,.13,.10,'patina');
   limb([.67,2.65,.38],[.21,2.34,.48],.045,dark,'metal');
   for(const x of [-.60,-.32,.22,.57])limb([x,1.00,.36],[x*.56,2.41,.28],.040,fold,'patina');
  }else if(model==='tahrir-obelisk'){
   // Pink granite shaft and pyramidion, with the relief indicated schematically.
   const granite=0xb98370,engraving=0x955f51,shaftWidth=2.4,shaftDepth=2.1,topRatio=.62;
   box(0x96908a,0,.20,0,4.7,.40,4.3);
   box(0xc6b3a6,0,.75,0,3.55,.70,3.21);
   add('obelisk-shaft','stone',granite,0,9.875,0,shaftWidth,17.55,shaftDepth);
   add('obelisk-cap','stone',0xc79680,0,19.375,0,shaftWidth*topRatio,1.45,shaftDepth*topRatio);
   for(let row=0;row<19;row++){
    const y=2.05+row*.79;
    const taper=1-(1-topRatio)*(y-1.1)/17.55;
    for(const side of [-1,1]){
     const dx=side*(shaftWidth*taper/2+.008),dz=side*(shaftDepth*taper/2+.008);
     const w=row%3===1?.28:.49;
     box(engraving,0,y,dz,w,.11,.035);
     box(engraving,dx,y,0,.035,.11,w);
    }
   }
  }else if(model==='hallstatt-trinity-column'){
   const limestone=0xcebca5, paleStone=0xe0d3bd;
   add('triangular-base','stone',limestone,0,.14,0,1.85,.28,1.85);
   add('triangular-base','stone',paleStone,0,.43,0,1.62,.30,1.62);
   add('triangular-base','stone',limestone,0,.92,0,1.15,.72,1.15);
   add('triangular-obelisk','stone',paleStone,0,3.38,0,.83,4.25,.83);
   for(const angle of [0,2*Math.PI/3,4*Math.PI/3])sphere(limestone,Math.sin(angle)*.92,1.12,Math.cos(angle)*.92,.22,.32,.22,'stone');
   human(0,1.28,.61,.44,'classical',paleStone);
   sphere(paleStone,0,3.25,.45,.18,.38,.19,'stone');
   sphere(paleStone,0,5.47,.16,.37,.25,.27,'stone');
   human(-.17,5.53,.26,.20,'classical',paleStone);
   human(.17,5.53,.26,.20,'classical',paleStone);
  }else if(model==='liberty-column'||model==='column'||model==='obelisk'){
   steps(0,5.3);box(stone,0,1.5,0,3.5,1.65,3.5);plaque(1.5,1.7,1.79);
   if(model==='obelisk')add('pyramid','stone',marble,0,6.15,0,1.1,7.6,1.1);
   else{cylinder(marble,0,5.8,0,.74,7.0);for(const y of [2.35,2.65,8.90,9.20])cylinder(stone,0,y,0,1.0,.24);if(model==='liberty-column'){human(0,9.32,0,.9,'liberty');for(const side of [-1,1]){sphere(bronze,side*1.85,1.0,1.8,.45,.45,.85);sphere(bronze,side*1.85,1.40,2.22,.35,.37,.34);}}}
  }else if(model==='arequipa-tuturutu'){
   basin(5);
   cylinder(bronze,0,2.32,0,.43,4.0,'metal');
   for(const [y,r] of [[1.72,2.40],[2.92,1.60],[4.24,1.02]]){
    cylinder(bronze,0,y,0,r,.19,'metal');ring(bronze,0,y+.1,0,r,.11);
    cylinder(water,0,y+.10,0,r-.10,.025,'water');
   }
   human(0,4.28,0,.47,'trumpeter');
  }else if(['ornate-fountain','liberty-fountain','fountain'].includes(model)){
   basin(model==='fountain'?2.65:3.8);
   if(model==='fountain'){cylinder(stone,0,.82,0,.44,.75);jet(0,1.23,0,1.25,1.55);}
   else if(model==='liberty-fountain'){
    cylinder(marble,0,1.0,0,1.2,1.1);human(0,1.55,0,1.47,'liberty',marble);
    for(const side of [-1,1]){cylinder(stone,side*1.45,.48,0,.39,.14);human(side*1.45,.55,0,.55,'civil',marble);jet(side*2.4,.49,0,1.1,.72);}
   }
   else{
    cylinder(bronze,0,1.52,0,.68,2.65,'metal');for(const y of [.77,1.1,1.97])ring(gold,0,y,0,.71,.075);
    cylinder(bronze,0,2.77,0,2.15,.16,'metal');ring(gold,0,2.87,0,2.15,.11);cylinder(water,0,2.90,0,2.02,.035,'water');
    cylinder(bronze,0,3.64,0,.38,1.5,'metal');cylinder(bronze,0,4.42,0,1.16,.14,'metal');ring(gold,0,4.52,0,1.16,.08);cylinder(water,0,4.54,0,1.04,.03,'water');cylinder(bronze,0,4.62,0,.24,.18,'metal');human(0,4.70,0,.72,'fame');
    for(let angle=0;angle<4;angle++){const a=angle*Math.PI/2;jet(Math.sin(a)*2.48,.48,Math.cos(a)*2.48,1.4,.73);sphere(bronze,Math.sin(a)*.84,1.57,Math.cos(a)*.84,.35,.49,.26);}
   }
  }else if(model==='bust'){steps(0,2.7);box(stone,0,1.45,0,1.8,1.7,1.8);cylinder(bronze,0,2.36,0,.38,.14,'metal');sphere(bronze,0,2.95,0,.65,.55,.35);sphere(bronze,0,3.65,0,.30,.36,.30);plaque(1.6,1.1,.94);}
  else if(model==='plaque'){box(stone,0,.63,0,1.8,1.1,.8);plaque(.75,1.5,.44);}
  else if(model==='classical-figure')human(0,0,0,1,'classical',marble);
 }
 const localModels=[];
 for(const item of plan.items){owner=item;const first=parts.length;build(item.feature.model);localModels.push({item,first,end:parts.length});}
 const geos={box:new T.BoxGeometry(1,1,1),sphere:new T.SphereGeometry(1,12,8),cylinder:new T.CylinderGeometry(1,1,1,12),cone:new T.ConeGeometry(1,1,12),torus:new T.TorusGeometry(1,.045,6,20),pyramid:new T.CylinderGeometry(.12,1,1,4),robe:new T.CylinderGeometry(.55,1,1,10),cape:new T.PlaneGeometry(1,1,10,12)};
 if(parts.some(part=>part.kind==='se-dialogo-steel')){
  // Two thin folded silhouettes keep the open space between the steel plates.
  const plates=[
   [[-2.56,0],[-1.97,3.17],[-.19,4.43],[-.72,2.82],[-1.29,1.27],[-.15,.38],[-.71,0]],
   [[.56,0],[.09,1.35],[.73,3.85],[2.43,4.04],[2.56,2.80],[1.31,2.64],[1.72,1.11],[2.34,0]],
  ];
  const inputs=[];
  for(const [index,plate] of plates.entries()){
   const polygon=new T.Shape();
   for(const [vertex,[x,y]] of plate.entries()){
    if(vertex===0)polygon.moveTo(x,y);
    else polygon.lineTo(x,y);
   }
   polygon.closePath();
   const sheet=new T.ExtrudeGeometry(polygon,{depth:.055,bevelEnabled:false});
   const points=sheet.getAttribute('position');
   for(let vertex=0;vertex<points.count;vertex++){
    const x=points.getX(vertex),y=points.getY(vertex),z=points.getZ(vertex);
    const offset=(index===0?-1:1)*(.73-.22*Math.abs(x-.2)-.04*y);
    points.setZ(vertex,z+offset);
   }
   inputs.push(...points.array);
   sheet.dispose();
  }
  const steel=new T.BufferGeometry();
  steel.setAttribute('position',new T.Float32BufferAttribute(inputs,3));
  steel.computeVertexNormals();
  geos['se-dialogo-steel']=steel;
 }
 if(parts.some(part=>part.kind==='mindanao-land')){
  // Generalised island silhouette for the painted exhibit.
  const outline=[[-.50,-.02],[-.40,-.11],[-.32,-.04],[-.26,-.16],[-.16,-.19],[-.15,-.30],
   [-.06,-.37],[.02,-.30],[.12,-.36],[.18,-.29],[.31,-.29],[.34,-.46],[.39,-.41],
   [.42,-.24],[.50,-.11],[.47,.06],[.41,.13],[.40,.30],[.30,.48],[.22,.45],
   [.24,.34],[.14,.32],[.14,.45],[.05,.43],[.02,.32],[-.13,.26],[-.24,.17],
   [-.30,.07],[-.38,.08],[-.45,.05]];
  const shape=new T.Shape();
  outline.forEach(([x,z],i)=>i===0?shape.moveTo(x,-z):shape.lineTo(x,-z));
  shape.closePath();
  geos['mindanao-land']=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).translate(0,0,-.5).rotateX(-Math.PI/2);
 }
 if(parts.some(part=>part.kind==='iron-man')){
  // Approximate the cast-iron silhouette, with the feet below the paving.
  const section=[[0,.37,.31],[.65,.45,.38],[2.15,.64,.46],[3.06,.74,.54],
   [4.12,.82,.56],[4.82,.92,.46],[5.10,.51,.37],[5.20,.29,.28],
   [5.36,.35,.34],[5.78,.31,.30],[5.99,.17,.19],[6,0,0]];
  const vertices=[],indices=[],segments=12;
  for(const [height,width,depth] of section){
   for(let i=0;i<segments;i++){
    const angle=i*2*Math.PI/segments;
    vertices.push(Math.sin(angle)*width-height*Math.tan(5*Math.PI/180),height,
     Math.cos(angle)*depth-height*Math.tan(7.5*Math.PI/180));
   }
  }
  for(let row=1;row<section.length;row++){
   for(let i=0;i<segments;i++){
    const a=(row-1)*segments+i,b=(row-1)*segments+(i+1)%segments;
    indices.push(a,b,a+segments,b,b+segments,a+segments);
   }
  }
  const shape=new T.BufferGeometry();
  shape.setAttribute('position',new T.Float32BufferAttribute(vertices,3));shape.setIndex(indices);
  shape.computeVertexNormals();geos['iron-man']=shape;
 }
 if(parts.some(part=>part.kind==='fountain-deck'))geos['fountain-deck']=new T.CylinderGeometry(1,1,1,32);
 if(parts.some(part=>part.kind==='jicin-fountain-wall')){
  const outline=[[-.50,-.33],[-.33,-.50],[.33,-.50],[.50,-.33],[.50,.33],[.33,.50],[-.33,.50],[-.50,.33]];
  const path=(geometry,points)=>{
   geometry.moveTo(...points[0]);
   for(const point of points.slice(1))geometry.lineTo(...point);
   geometry.closePath();
   return geometry;
  };
  const basin=innerScale=>{
   const shape=path(new T.Shape(),outline);
   if(innerScale)shape.holes.push(path(new T.Path(),outline.map(([x,z])=>[x*innerScale,z*innerScale]).reverse()));
   return new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  };
  geos['jicin-fountain-slab']=basin(0);
  geos['jicin-fountain-wall']=basin(.88);
  geos['jicin-fountain-coping']=basin(.81);
 }
 if(parts.some(part=>part.kind==='hex'))geos.hex=new T.CylinderGeometry(1,1,1,6);
 if(parts.some(part=>part.kind==='pentagonal-pedestal'))geos['pentagonal-pedestal']=new T.CylinderGeometry(1,1,1,5);
 if(parts.some(part=>part.kind==='hexagonal-stone'))geos['hexagonal-stone']=new T.CylinderGeometry(1,1,1,6);
 if(parts.some(part=>part.kind==='octagonal-stone'))geos['octagonal-stone']=new T.CylinderGeometry(1,1,1,8);
 if(parts.some(part=>part.kind==='puigcerda-cutout')){
  const plate=new T.Shape();
  plate.moveTo(-.50,-.50);plate.lineTo(.50,-.50);plate.lineTo(.50,.50);plate.lineTo(-.50,.50);plate.closePath();
  const horseHead=new T.Path();
  horseHead.moveTo(-.37,-.36);
  horseHead.quadraticCurveTo(-.24,-.09,-.19,.12);
  horseHead.lineTo(-.22,.34);horseHead.lineTo(-.08,.22);horseHead.lineTo(.02,.37);horseHead.lineTo(.07,.18);
  horseHead.quadraticCurveTo(.22,.16,.25,.04);
  horseHead.lineTo(.39,-.13);horseHead.quadraticCurveTo(.41,-.23,.28,-.27);
  horseHead.quadraticCurveTo(.14,-.26,.04,-.14);
  horseHead.quadraticCurveTo(-.04,-.28,-.01,-.36);horseHead.closePath();
  plate.holes.push(horseHead);
  geos['puigcerda-cutout']=new T.ExtrudeGeometry(plate,{depth:1,steps:1,bevelEnabled:false,curveSegments:5}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='bratislava-bicorne')){
  const outline=new T.Shape();
  outline.moveTo(-.5,-.05);
  outline.quadraticCurveTo(-.37,-.37,0,-.36);
  outline.quadraticCurveTo(.36,-.37,.5,-.04);
  outline.quadraticCurveTo(.33,-.12,.26,.18);
  outline.quadraticCurveTo(.20,.49,0,.48);
  outline.quadraticCurveTo(-.22,.49,-.28,.16);
  outline.quadraticCurveTo(-.34,-.12,-.5,-.05);
  outline.closePath();
  geos['bratislava-bicorne']=new T.ExtrudeGeometry(outline,{depth:1,bevelEnabled:false,curveSegments:5}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='bateia')){
  const profile=[[0,0],[.70,0],[1.24,.35],[1.30,.40],[1.23,.41],[.62,.10],[0,.10]];
  geos.bateia=new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r,y)),24);
 }
 if(parts.some(part=>part.kind==='sundial-bowl')){
  const profile=[[0,0],[.13,0],[.27,.08],[.38,.22],[.42,.36],[.38,.36],[.34,.23],[.24,.11],[.11,.05],[0,.05]];
  geos['sundial-bowl']=new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r,y)),20);
 }
 if(parts.some(part=>part.kind==='triangular-base'))geos['triangular-base']=new T.CylinderGeometry(1,1,1,3);
 if(parts.some(part=>part.kind==='triangular-obelisk'))geos['triangular-obelisk']=new T.CylinderGeometry(.14,1,1,3).rotateY(Math.PI);
 if(parts.some(part=>part.kind==='fountain-crown'))geos['fountain-crown']=new T.CylinderGeometry(1,.53,1,12);
 if(parts.some(part=>part.kind==='tapered-column'))geos['tapered-column']=new T.CylinderGeometry(.56,1,1,16);
 if(parts.some(part=>part.kind==='obelisk-shaft'))geos['obelisk-shaft']=new T.CylinderGeometry(.62*Math.SQRT1_2,Math.SQRT1_2,1,4).rotateY(Math.PI/4);
 if(parts.some(part=>part.kind==='obelisk-cap'))geos['obelisk-cap']=new T.ConeGeometry(Math.SQRT1_2,1,4).rotateY(Math.PI/4);
 if(parts.some(part=>part.kind==='monas-base'))geos['monas-base']=new T.CylinderGeometry(1,.76,1,4).rotateY(Math.PI/4);
 if(parts.some(part=>part.kind==='trogir-clock-dome')){
  const profile=[[2.06,0],[1.95,.29],[1.70,.67],[1.34,1.10],[.92,1.58],[.50,1.96],[.15,2.23],[0,2.27]];
  geos['trogir-clock-dome']=new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r,y)),16).scale(1,1,.80);
 }
 if(parts.some(part=>part.kind==='park-arch')){
  const opening=new T.Shape();
  opening.moveTo(-.5,0);opening.lineTo(-.38,0);opening.lineTo(-.38,.62);
  opening.quadraticCurveTo(-.38,.77,-.20,.82);
  opening.quadraticCurveTo(-.09,.84,0,.91);
  opening.quadraticCurveTo(.09,.84,.20,.82);
  opening.quadraticCurveTo(.38,.77,.38,.62);
  opening.lineTo(.38,0);opening.lineTo(.5,0);opening.lineTo(.5,1);opening.lineTo(-.5,1);opening.closePath();
  geos['park-arch']=new T.ExtrudeGeometry(opening,{depth:1,bevelEnabled:false,curveSegments:4}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='jicin-well-arch')){
  const face=new T.Shape();
  face.moveTo(-.5,0);face.lineTo(-.5,1);face.lineTo(.5,1);face.lineTo(.5,0);
  face.lineTo(.28,0);face.lineTo(.28,.49);
  for(let step=1;step<=16;step++){
   const angle=Math.PI*step/16;
   face.lineTo(Math.cos(angle)*.28,.49+Math.sin(angle)*.28);
  }
  face.lineTo(-.28,0);face.closePath();
  geos['jicin-well-arch']=new T.ExtrudeGeometry(face,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
  const roof=[[1,0],[.98,.15],[.94,.40],[.83,.63],[.65,.80],[.38,.93],[0,1]];
  geos['jicin-well-roof']=new T.LatheGeometry(roof.map(([radius,y])=>new T.Vector2(radius,y)),20);
  geos['jicin-well-portico']=new T.CylinderGeometry(1,1,1,16,1,false,0,Math.PI);
  geos['jicin-well-wing-roof']=new T.CylinderGeometry(.20,1,1,16,1,false,0,Math.PI);
 }
 if(parts.some(part=>part.kind==='triumphal-arch')){
  const outline=new T.Shape();
  outline.moveTo(-.5,0);outline.lineTo(-.5,1);outline.lineTo(.5,1);outline.lineTo(.5,0);
  outline.lineTo(.206,0);outline.lineTo(.206,.50);
  for(let step=1;step<=18;step++){
   const a=step*Math.PI/18;
   outline.lineTo(Math.cos(a)*.206,.50+Math.sin(a)*.177);
  }
  outline.lineTo(-.206,0);outline.closePath();
  geos['triumphal-arch']=new T.ExtrudeGeometry(outline,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='flag-star')){
  const outline=new T.Shape();
  for(let index=0;index<10;index++){
   const angle=Math.PI/2+index*Math.PI/5,radius=index%2?.382:1;
   const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius;
   if(index===0)outline.moveTo(x,y);else outline.lineTo(x,y);
  }
  outline.closePath();
  geos['flag-star']=new T.ExtrudeGeometry(outline,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='assisi-fountain-basin')){
  const basin=[[0,0],[3.47,0],[3.47,.13],[3.35,.17],[3.30,.67],[3.41,.71],
   [3.41,.87],[3.01,.87],[3.01,.43],[0,.43]];
  geos['assisi-fountain-basin']=new T.LatheGeometry(basin.map(([radius,y])=>new T.Vector2(radius,y)),9);
 }
 if(parts.some(part=>part.kind==='bratislava-basin')){
  const basin=[[0,0],[4.22,0],[4.22,.13],[4.06,.20],[4.02,.87],[4.17,.93],[4.17,1.08],[3.78,1.08],[3.78,.36],[0,.36]];
  const bowl=[[0,0],[.64,0],[1.10,.15],[1.44,.31],[1.44,.50],[1.27,.50],[1.22,.37],[0,.37]];
  geos['bratislava-basin']=new T.LatheGeometry(basin.map(([r,y])=>new T.Vector2(r,y)),28);
  geos['bratislava-upper-bowl']=new T.LatheGeometry(bowl.map(([r,y])=>new T.Vector2(r,y)),24);
  geos['bratislava-waterline']=new T.CircleGeometry(1,28).rotateX(-Math.PI/2);
 }
 if(parts.some(part=>part.kind==='kamppi-chapel-shell')){
  const section=[[0,0],[.62,0],[.61,.05],[.70,.20],[.83,.42],[.94,.68],[1,.89],[.99,1],[0,1]];
  geos['kamppi-chapel-shell']=new T.LatheGeometry(section.map(([radius,y])=>new T.Vector2(radius,y)),32);
  geos['kamppi-chapel-seam']=new T.TorusGeometry(1,.006,4,40).rotateX(Math.PI/2);
 }
 if(parts.some(part=>part.kind==='kasarmitori-perforated-figure')){
  const figure=new T.Shape();
  const contour=[[-.92,0],[-.87,.82],[-.61,1.9],[-.63,3.53],[-.99,3.38],[-1.23,3.76],[-1.18,4.60],
   [-.76,5.33],[-.44,5.63],[-.44,6.39],[-.12,6.92],[.25,7],[.61,6.60],[.61,6.09],[.37,5.67],
   [.71,5.38],[1.08,4.83],[1.14,4.23],[.88,3.82],[.64,3.87],[.54,2.49],[.65,.83],[.84,.23],[.80,0],
   [.30,0],[.13,.42],[.10,1.95],[-.10,2.17],[-.22,.89],[-.46,0]];
  figure.moveTo(...contour[0]);for(const point of contour.slice(1))figure.lineTo(...point);figure.closePath();
  for(const [x,y,radius] of [[.09,6.48,.14],[-.33,5.04,.15],[.22,5.21,.18],[.01,4.65,.19],[.47,4.61,.14],
   [-.38,4.31,.14],[.19,4.13,.15],[-.21,3.74,.17],[.24,3.43,.15],[-.20,3.18,.13],[-.41,2.46,.09],
   [.34,2.45,.10],[-.40,1.63,.09],[.34,1.60,.10],[-.56,.82,.09],[.44,.74,.08]]){
   const opening=new T.Path();opening.absarc(x,y,radius,0,Math.PI*2,true);figure.holes.push(opening);
  }
  geos['kasarmitori-perforated-figure']=new T.ExtrudeGeometry(figure,{depth:.32,bevelEnabled:false,curveSegments:7}).translate(0,0,-.16);
 }
 if(parts.some(part=>part.kind==='kansalaistori-pike')){
  const profile=new T.Shape();
  profile.moveTo(-.82,0);profile.lineTo(-.42,1.21);profile.quadraticCurveTo(-1.02,4.7,-.30,8.5);
  profile.quadraticCurveTo(-.24,10.9,.20,12.87);profile.lineTo(.54,12.72);profile.lineTo(.44,11.77);
  profile.lineTo(.79,12.18);profile.lineTo(1.03,11.79);profile.quadraticCurveTo(1.10,10.42,.54,8.1);
  profile.quadraticCurveTo(.46,4.05,.24,1.23);profile.lineTo(.71,0);profile.closePath();
  geos['kansalaistori-pike']=new T.ExtrudeGeometry(profile,{depth:.92,bevelEnabled:true,bevelSize:.09,bevelThickness:.08,bevelSegments:2}).translate(0,0,-.46);
 }
 if(parts.some(part=>part.kind==='oodi-spruce-wave')){
  const profile=new T.Shape();
  profile.moveTo(-.5,.18);profile.bezierCurveTo(-.31,.16,-.20,.75,-.04,.72);
  profile.bezierCurveTo(.17,.71,.30,.25,.5,.22);profile.lineTo(.5,.83);
  profile.bezierCurveTo(.22,.95,-.27,1,-.5,.83);profile.closePath();
  geos['oodi-spruce-wave']=new T.ExtrudeGeometry(profile,{depth:1,bevelEnabled:false,curveSegments:18}).rotateY(Math.PI/2).translate(-.5,0,0);
 }
 if(parts.some(part=>part.kind==='herterich-basin')){
  const basin=[[0,0],[3.85,0],[3.85,.18],[3.68,.25],[3.59,.99],[3.73,1.05],
   [3.73,1.23],[3.26,1.23],[3.26,.44],[0,.44]];
  geos['herterich-basin']=new T.LatheGeometry(basin.map(([radius,y])=>new T.Vector2(radius,y)),12);
 }
 if(parts.some(part=>part.kind==='octagonal-column'))geos['octagonal-column']=new T.CylinderGeometry(1,1,1,8);
 if(parts.some(part=>part.kind==='pimpri-pavilion-dome'))geos['pimpri-pavilion-dome']=new T.SphereGeometry(1,24,8,0,2*Math.PI,0,Math.PI/2);
 if(parts.some(part=>part.kind==='campanin-church-outline')){
  const {feature}=plan.items.find(item=>item.feature.model==='fontvieille-saint-nicolas');
  const ring=plan.profile.contextSurfaces.find(surface=>surface.source===feature.source).rings[0];
  const cos=Math.cos(feature.bearing),sin=Math.sin(feature.bearing),shape=new T.Shape();
  for(const [index,point] of ring.entries()){
   const x=point.x-feature.x,z=point.z-feature.z;
   const localX=x*cos+z*sin,localY=x*sin-z*cos;
   if(index===0)shape.moveTo(localX,localY);
   else shape.lineTo(localX,localY);
  }
  shape.closePath();
  geos['campanin-church-outline']=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  const profile=[[1,0],[.98,.17],[.91,.40],[.79,.62],[.61,.81],[.37,.94],[0,1]];
  geos['campanin-dome']=new T.LatheGeometry(profile.map(([radius,height])=>new T.Vector2(radius,height)),24);
 }
 if(parts.some(part=>part.kind==='mumbai-flora-basin')){
  const section=[[5.72,.18],[6.17,.18],[6.17,.44],[6.07,.54],[5.73,.54],[5.62,.44],[5.66,.18],[5.72,.18]];
  geos['mumbai-flora-basin']=new T.LatheGeometry(section.map(([radius,y])=>new T.Vector2(radius,y)),48);
  const bowl=[[.20,0],[.39,.17],[.70,.38],[.74,.48],[.62,.50],[.53,.40],[.35,.25],[.20,.21],[.20,0]];
  geos['mumbai-flora-bowl']=new T.LatheGeometry(bowl.map(([radius,y])=>new T.Vector2(radius,y)),5).rotateY(Math.PI/5);
 }
 if(parts.some(part=>part.kind==='hip-roof')){
  const roof=new T.BufferGeometry();
  roof.setAttribute('position',new T.Float32BufferAttribute([-.5,0,-.5,.5,0,-.5,.5,0,.5,-.5,0,.5,-.32,1,0,.32,1,0],3));
  roof.setIndex([0,4,5,0,5,1,1,5,2,2,5,4,2,4,3,3,4,0]);
  geos['hip-roof']=roof.toNonIndexed();geos['hip-roof'].computeVertexNormals();
 }
 if(parts.some(part=>part.kind==='masonry-arch')){
  const arch=new T.Shape();
  arch.moveTo(-.5,-.5);
  arch.lineTo(-.32,-.5);
  arch.bezierCurveTo(-.32,-.13,-.177,.16,0,.16);
  arch.bezierCurveTo(.177,.16,.32,-.13,.32,-.5);
  arch.lineTo(.5,-.5);
  arch.lineTo(.5,.5);
  arch.lineTo(-.5,.5);
  arch.closePath();
  geos['masonry-arch']=new T.ExtrudeGeometry(arch,{depth:1,bevelEnabled:false,curveSegments:8});
  geos['masonry-arch'].translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='barcelona-arched-door')){
  const door=new T.Shape();
  door.moveTo(-.5,-.5);door.lineTo(-.5,.02);
  door.bezierCurveTo(-.5,.285,-.276,.5,0,.5);
  door.bezierCurveTo(.276,.5,.5,.285,.5,.02);
  door.lineTo(.5,-.5);door.closePath();
  geos['barcelona-arched-door']=new T.ExtrudeGeometry(door,{depth:1,bevelEnabled:false,curveSegments:8}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='ordino-slate-roof')){
  const roof=new T.BufferGeometry();
  roof.setAttribute('position',new T.Float32BufferAttribute([-.5,0,-.5,.5,0,-.5,.5,0,.5,-.5,0,.5,0,1,0],3));
  roof.setIndex([0,4,1,1,4,2,2,4,3,3,4,0]);
  geos['ordino-slate-roof']=roof.toNonIndexed();
  geos['ordino-slate-roof'].computeVertexNormals();
 }
 if(parts.some(part=>part.kind==='bandstand-roof')){
  const roof=[[0,0],[.95,0],[1,.08],[.82,.24],[.56,.54],[.28,.83],[0,1]];
  geos['bandstand-roof']=new T.LatheGeometry(roof.map(([radius,y])=>new T.Vector2(radius,y)),8);
  geos['bandstand-deck']=new T.CylinderGeometry(1,1,1,8);
 }
 if(parts.some(part=>part.kind==='cistern-stonework')){
  const profile=[[0,0],[2.25,0],[2.25,.14],[1.98,.14],[1.98,.28],[1.70,.28],[1.70,.44],
   [1.48,.44],[1.48,.54],[1.25,.57],[1.25,1.46],[1.43,1.48],[1.43,1.65],[1.01,1.65],[1.01,.58],[0,.58]];
  geos['cistern-stonework']=new T.LatheGeometry(profile.map(([radius,y])=>new T.Vector2(radius,y)),8);
 }
 if(parts.some(part=>part.kind==='azumaya-eaves')){
  const tiles=[[0,0],[.72,0],[1,.12],[.79,.23],[.57,.52],[.23,.84],[0,1]];
  geos['azumaya-eaves']=new T.LatheGeometry(tiles.map(([radius,y])=>new T.Vector2(radius,y)),6);
 }
 if(parts.some(part=>part.kind==='paifang-span')){
  const outline=new T.Shape();
  outline.moveTo(-.5,0);outline.lineTo(-.5,1);outline.lineTo(.5,1);outline.lineTo(.5,0);
  for(let step=1;step<=18;step++){
   const angle=Math.PI*step/18;
   outline.lineTo(.5*Math.cos(angle),.76*Math.sin(angle));
  }
  outline.closePath();
  geos['paifang-span']=new T.ExtrudeGeometry(outline,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='paifang-roof')){
  const rows=[[-.5,0,.50],[-.32,.28,.45],[0,1,.27],[.32,.28,.45],[.5,0,.50]];
  const vertices=[],indices=[],columns=11;
  for(const [z,y,width] of rows)for(let i=0;i<columns;i++){
   const u=2*i/(columns-1)-1;
   vertices.push(u*width,y+(1-y)*.17*Math.abs(u)**6,z);
  }
  const lower=rows.length*columns;
  for(let i=0;i<lower;i++)vertices.push(vertices[3*i],0,vertices[3*i+2]);
  for(let row=0;row<rows.length-1;row++)for(let column=0;column<columns-1;column++){
   const a=row*columns+column,b=a+columns;
   indices.push(a,b,a+1,a+1,b,b+1);
   indices.push(a+lower,a+1+lower,b+lower,a+1+lower,b+1+lower,b+lower);
  }
  // Close the hips and the raised eave tips to give the tiles a visible underside.
  const edge=(a,b)=>indices.push(a,b,a+lower,b,b+lower,a+lower);
  for(let row=0;row<rows.length-1;row++){
   const left=row*columns,right=left+columns-1;
   edge(left+columns,left);
   edge(right,right+columns);
  }
  for(let column=0;column<columns-1;column++){
   edge(column,column+1);
   const rear=(rows.length-1)*columns+column;
   edge(rear+1,rear);
  }
  const roof=new T.BufferGeometry();
  roof.setAttribute('position',new T.Float32BufferAttribute(vertices,3));
  roof.setIndex(indices);roof.computeVertexNormals();
  geos['paifang-roof']=roof;
 }
 if(parts.some(part=>part.kind==='pediment')){
  const shape=new T.Shape();shape.moveTo(-.5,-.5);shape.lineTo(.5,-.5);shape.lineTo(0,.5);shape.closePath();
  geos.pediment=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 // A thin folded cloth sheet replaces the former ellipsoid that looked like a shield.
 const cloth=geos.cape.attributes.position;for(let i=0;i<cloth.count;i++){const u=cloth.getX(i),v=cloth.getY(i),drop=.5-v;cloth.setXYZ(i,u*(.48+drop*.60)+drop*drop*.24,v,Math.sin(u*22+drop*2)*(.025+drop*.045)-drop*drop*.55);}geos.cape.computeVertexNormals();
 geos.pyramid.rotateY(Math.PI/4);geos.torus.rotateX(Math.PI/2);
 if(parts.some(part=>part.kind==='cliff')){
  // One closed stone volume with flat carving faces and uneven ledges above and below.
  const profiles=[[-.5,.49,.49,.12,0,0],[-.40,.50,.50,.13,0,0],[-.30,.47,.47,.14,0,0],[-.14,.44,.44,.14,0,0],[.16,.44,.44,.14,0,0],[.27,.43,.40,.14,.01,.012],[.38,.37,.37,.12,.015,.005],[.5,.32,.33,.10,.012,.009]];
  const vertices=[],indices=[],sides=12;
  for(const [y,x,z,edge,ox,oz] of profiles){
   const ring=[[x,-z+edge],[x,-z*.17],[x,z-edge],[x-edge,z],[x*.14,z],[-x+edge,z],[-x,z-edge],[-x,z*.17],[-x,-z+edge],[-x+edge,-z],[-x*.12,-z],[x-edge,-z]];
   for(const [px,pz] of ring)vertices.push(px+ox,y,pz+oz);
  }
  for(let row=0;row<profiles.length-1;row++)for(let i=0;i<sides;i++){
   const a=row*sides+i,b=row*sides+(i+1)%sides,c=a+sides,d=b+sides;
   indices.push(a,c,b,b,c,d);
  }
  const bottom=vertices.length/3,top=bottom+1,last=(profiles.length-1)*sides;
  vertices.push(0,profiles[0][0],0,profiles.at(-1)[4],profiles.at(-1)[0],profiles.at(-1)[5]);
  for(let i=0;i<sides;i++){
   const next=(i+1)%sides;
   indices.push(bottom,i,next,top,last+next,last+i);
  }
  const indexed=new T.BufferGeometry();indexed.setAttribute('position',new T.Float32BufferAttribute(vertices,3));indexed.setIndex(indices);
  geos.cliff=indexed.toNonIndexed();indexed.dispose();geos.cliff.computeVertexNormals();
 }
 const batches=new Map(),dummy=new T.Object3D(),yaw=new T.Quaternion();
 for(const part of parts){const key=part.kind+':'+part.material;if(!batches.has(key))batches.set(key,{kind:part.kind,material:part.material,parts:[]});batches.get(key).parts.push(part);}
 const usedGeometries=new Set([...batches.values()].map(batch=>batch.kind));for(const [kind,geometry]of Object.entries(geos))if(!usedGeometries.has(kind))geometry.dispose();
 // Source polygons are already rendered. Seat each model on the actual solid surface instead of a universal height.
 const surfaces=group.children.filter(mesh=>mesh.userData.citySquare&&mesh.userData.citySquare.name===plan.profile?.name&&mesh.material?.color?.getHex()!==0x319bb5);
 for(const surface of surfaces)surface.updateWorldMatrix(true,false);
 const down=new T.Vector3(0,-1,0),origin=new T.Vector3(),probe=new T.Raycaster(),partBounds=new T.Box3(),itemBase=new Map();
 for(const {item,first,end} of localModels){
  let lowest=Infinity;
  for(let i=first;i<end;i++){
   const part=parts[i],geometry=geos[part.kind];
   if(!geometry.boundingBox)geometry.computeBoundingBox();
   dummy.position.set(part.x,part.y,part.z);dummy.quaternion.identity();
   if(part.rotation)dummy.quaternion.copy(part.rotation);
   dummy.scale.set(part.sx,part.sy,part.sz);dummy.updateMatrix();
   lowest=Math.min(lowest,partBounds.copy(geometry.boundingBox).applyMatrix4(dummy.matrix).min.y);
  }
  if(!Number.isFinite(lowest))continue;
  origin.set(b.x+item.x,8,b.z+item.z);probe.set(origin,down);
  let ground=probe.intersectObjects(surfaces,false)[0]?.point.y??.33;
  if(item.feature.model==='birmingham-guardian'){
   // The existing mapped platform can meet both the paving and a raised bed.
   // Keep the sculpture above both and extend only the bottom of its plinth.
   const plinth=parts[first],ca=Math.cos(item.angle),sa=Math.sin(item.angle);
   let low=ground;
   for(const x of [-plinth.sx*.49,0,plinth.sx*.49])for(const z of [-plinth.sz*.49,0,plinth.sz*.49]){
    origin.set(b.x+item.x+(x*ca-z*sa)*item.scale,8,b.z+item.z+(x*sa+z*ca)*item.scale);
    probe.set(origin,down);
    const support=probe.intersectObjects(surfaces,false)[0]?.point.y??.33;
    ground=Math.max(ground,support);low=Math.min(low,support);
   }
   const drop=(ground-low)/item.scale;
   plinth.y-=drop/2;plinth.sy+=drop;
  }
  itemBase.set(item,ground-lowest*item.scale);
 }
 for(const batch of batches.values()){
  const waterMaterial=batch.material==='water',patina=batch.material==='patina';
  const material=new T.MeshStandardMaterial({side:batch.kind==='cape'?T.DoubleSide:T.FrontSide,color:0xffffff,roughness:waterMaterial?.18:patina?.58:batch.material==='metal'?.43:.83,metalness:waterMaterial?.18:patina?.24:batch.material==='metal'?.58:.02});
  const mesh=new T.InstancedMesh(geos[batch.kind],material,batch.parts.length),tint=new T.Color();
  batch.parts.forEach((p,i)=>{const item=p.owner,ca=Math.cos(item.angle),sa=Math.sin(item.angle);dummy.position.set(b.x+item.x+(p.x*ca-p.z*sa)*item.scale,itemBase.get(item)+p.y*item.scale,b.z+item.z+(p.x*sa+p.z*ca)*item.scale);yaw.setFromAxisAngle(UP,-item.angle);dummy.quaternion.copy(yaw);if(p.rotation)dummy.quaternion.multiply(p.rotation);dummy.scale.set(p.sx*item.scale,p.sy*item.scale,p.sz*item.scale);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,tint.setHex(p.color));});
  mesh.computeBoundingSphere();mesh.castShadow=!waterMaterial;mesh.receiveShadow=true;mesh.userData.squareLandmark=true;mesh.userData.sculpturePart=batch.kind;mesh.userData.squareModels=[...new Set(batch.parts.map(p=>p.owner.feature.model))];mesh.userData.squareFeatureIDs=batch.parts.map(p=>p.owner.feature.id);group.add(mesh);
 }
}
window.SquareDetails={enrich,prepare,render,classify,modelSpecs:MODEL_SPECS};
})();
