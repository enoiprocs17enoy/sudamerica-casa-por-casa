/* Source-driven 3D square details. Models are stylised reconstructions, not scans. */
(function(){
'use strict';
const MODEL_SPECS={'alcazar-cervantes-riders':{height:6.5,width:6.6,depth:5.1},'gravina-benedict-statue':{height:6.2,width:3.4,depth:3.4},'ceglie-clock-tower':{height:12,width:5,depth:4.7},'assisi-three-lions-fountain':{height:3.75,width:7.5,depth:7.5},'verrazzano-memorial':{height:7.2,width:4.3,depth:4.3},herterichsbrunnen:{height:5.1,width:7.7,depth:7.7,parcelWidth:.5},'iquique-naval-monument':{height:13.3,width:8.2,depth:8.2},'floral-calendar':{height:1.2,width:8},'arenales-ensemble':{height:11,width:10},'freedom-chains':{height:7,width:5},pyramid:{height:13,width:7},obelisk:{height:10,width:3},column:{height:10,width:4},'liberty-column':{height:13,width:6},equestrian:{height:8,width:7},'equestrian-fountain':{height:8,width:9},'standing-sword':{height:7,width:4},'standing-civil':{height:10,width:7},'ornate-fountain':{height:7,width:9},'liberty-fountain':{height:7,width:8},fountain:{height:3,width:6},bust:{height:4,width:3},plaque:{height:1.5,width:2},'classical-figure':{height:3,width:2}};
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
Object.assign(MODEL_SPECS,{
 'washington-arch':{height:9.2,width:7.7,depth:2.9,parcelWidth:.38},
 'washington-fountain':{height:2.25,width:7.4,depth:7.4,parcelWidth:.52},
 'washington-garibaldi':{height:6.3,width:3.05,depth:3.05},
 'holley-monument':{height:3.8,width:3.15,depth:1.2},
 'toronto-archer':{height:3.5,width:3.6,depth:2.6},
 'boston-embrace':{height:6.1,width:9.76,depth:8.0,parcelWidth:.50},
 'franklin-fountain':{height:2.5,width:6.8,depth:6.8,parcelWidth:.51},
 'freedom-arches':{height:4.8,width:9.9,depth:6.8,parcelWidth:.64},
 'liberty-carousel':{height:5.2,width:7.8,depth:7.8,parcelWidth:.25},
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
 'waharoa':{height:7,width:10.132,depth:.62,parcelWidth:.38},
 'delhi-baradari':{height:4.8,width:8.4,depth:8.4,parcelWidth:.32},
 'delhi-entry-arcade':{height:3.6,width:12.4,depth:.9,parcelWidth:.42},
 'delhi-open-air-theatre':{height:1.3,width:15,depth:11,parcelWidth:.46},
 'birmingham-iron-man':{height:6,width:2.5,depth:1.94},
 'birmingham-the-river':{height:2.8,width:4,depth:2.5},
 'goiania-tres-racas':{height:7,width:3.1,depth:4.7},
 'tartini-monument':{height:6,width:2.75,depth:2.75},
 'monaco-malizia':{height:4.25,width:2.2,depth:2.2},
 'karhupuisto-bear':{height:2.55,width:2.4,depth:3.0},
 'kamppi-chapel':{height:11.5,width:19.6,depth:13.4,parcelWidth:.50},
 'kamppi-entrepreneurs-monument':{height:6,width:3.9,depth:3.9},
 'kasarmitori-winter-war-memorial':{height:10.6,width:3.65,depth:3.65},
 'kasarmitori-the-eye':{height:.055,width:1.8,depth:1.8},
 'teror-pilar-fountain':{height:2.36,width:3.8,depth:3.8},
 'teror-wall-fountain':{height:2.77,width:2.25,depth:1.65},
 'arucas-sureda-monument':{height:4.9,width:4.1,depth:4.1},
 'king-sejong-seated':{height:7.0,width:5.5,depth:5.3,parcelWidth:.45},
 'joseon-armillary':{height:1.48,width:.82,depth:.82},
 'joseon-rain-gauge':{height:1.32,width:.63,depth:.63},
 'joseon-sundial':{height:1.14,width:.86,depth:.86},
 'three-rivers-fountain':{height:5.5,width:10,depth:10,parcelWidth:.35},
 'rizal-monument':{height:9.6,width:7.4,depth:7.4,parcelWidth:.42},
 'monas':{height:19.0,width:7.1,depth:7.1,parcelWidth:.50},
 'pirulito-obelisk':{height:13.57,width:7.60,depth:7.60},
 'boa-vista-garimpeiro':{height:7.5,width:15.7,depth:7.5,parcelWidth:.38},
 'naga-fifteen-martyrs':{height:6.95,width:6.4,depth:6.4},
 'laoag-tobacco-obelisk':{height:6.3,width:3.5,depth:3.5},
 'dapitan-mindanao-relief':{height:1.55,width:32,depth:28,parcelWidth:.45},
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
  if(feature.model==='fountain'&&feature.status!=='reference-model')factor=Math.min(factor,.45);
  const clearanceX=b.width/2-Math.abs(p.x)-.8,clearanceZ=b.depth/2-Math.abs(p.z)-.8;
  if(spec.depth){
   const c=Math.abs(Math.cos(angle)),s=Math.abs(Math.sin(angle));
   factor=Math.min(factor,2*clearanceX/(c*spec.width+s*spec.depth),2*clearanceZ/(s*spec.width+c*spec.depth));
  }else factor=Math.min(factor,Math.min(clearanceX,clearanceZ)/(spec.width*.57));
  if(factor<.09)continue;
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
 if(parts.some(part=>part.kind==='hex'))geos.hex=new T.CylinderGeometry(1,1,1,6);
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
 if(parts.some(part=>part.kind==='herterich-basin')){
  const basin=[[0,0],[3.85,0],[3.85,.18],[3.68,.25],[3.59,.99],[3.73,1.05],
   [3.73,1.23],[3.26,1.23],[3.26,.44],[0,.44]];
  geos['herterich-basin']=new T.LatheGeometry(basin.map(([radius,y])=>new T.Vector2(radius,y)),12);
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
  const ground=probe.intersectObjects(surfaces,false)[0]?.point.y??.33;
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
