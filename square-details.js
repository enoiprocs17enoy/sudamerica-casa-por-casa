/* Source-driven 3D square details. Models are stylised reconstructions, not scans. */
(function(){
'use strict';
const T=THREE,UP=new T.Vector3(0,1,0);
const MODEL_SPECS={'floral-calendar':{height:1.2,width:8},'arenales-ensemble':{height:11,width:10},'freedom-chains':{height:7,width:5},pyramid:{height:13,width:7},obelisk:{height:10,width:3},column:{height:10,width:4},'liberty-column':{height:13,width:6},equestrian:{height:8,width:7},'equestrian-fountain':{height:8,width:9},'standing-sword':{height:7,width:4},'standing-civil':{height:10,width:7},'ornate-fountain':{height:7,width:9},'liberty-fountain':{height:7,width:8},fountain:{height:3,width:6},bust:{height:4,width:3},plaque:{height:1.5,width:2},'classical-figure':{height:3,width:2}};
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
 const all=profile.landmarks||[],items=[],reservations=[];
 for(const feature of [...all].sort((a,b)=>(b.status==='reference-model')-(a.status==='reference-model'))){
  if(feature.partOf||!MODEL_SPECS[feature.model]||!Number.isFinite(feature.x)||!Number.isFinite(feature.z))continue;
  const spec=MODEL_SPECS[feature.model],p=fit.point(feature),wanted=feature.displayHeight||5;
  let factor=Math.min(wanted/spec.height,6.4/spec.width);
  if(feature.model==='fountain'&&feature.status!=='reference-model')factor=Math.min(factor,.45);
  const clearance=Math.min(b.width/2-Math.abs(p.x)-.8,b.depth/2-Math.abs(p.z)-.8);
  factor=Math.min(factor,clearance/(spec.width*.57));if(factor<.09)continue;
  const radius=spec.width*factor*.74;
  // Prefer a sourced landmark over duplicate point representations of the same object.
  if(items.some(item=>Math.hypot(item.x-p.x,item.z-p.z)<Math.min(radius,item.radius)*.45))continue;
  const item={feature,x:p.x,z:p.z,scale:factor,angle:fit.angle+(Number(feature.bearing)||0),radius};items.push(item);reservations.push({x:p.x,z:p.z,radius:radius+.30});
 }
 return{profile,city,items,reservations,clear(x,z,radius=0){return !reservations.some(p=>Math.hypot(x-p.x,z-p.z)<p.radius+radius);}};
}
function render(plan,group,b){
 if(!plan?.items.length)return;
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
  const at=(px,py,pz)=>[x+px*scale,y+py*scale,z+pz*scale],material=color===marble?'stone':'metal';
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
  for(const side of [-1,1]){limb([side*.23,y+2.72,-.15],[side*.64,y+2.37,.32],.14);limb([side*.64,y+2.37,.32],[side*.67,y+1.64,.28],.105);sphere(bronze,side*.67,y+1.62,.40,.14,.12,.26);limb([side*.35,y+3.44,-.10],[side*.46,y+3.10,.46],.10);limb([side*.46,y+3.10,.46],[side*.19,y+3.05,.85],.08);limb([side*.19,y+3.05,.85],[side*.22,y+2.60,1.56],.022,gold);}
  add('cape','metal',bronze,0,y+2.97,-.48,.77,1.50,.24);
  if(gesture==='pointing'){limb([.32,y+3.43,-.10],[.58,y+3.61,.50],.095);limb([.58,y+3.61,.50],[.63,y+3.69,1.22],.075);sphere(bronze,.63,y+3.69,1.26,.10,.09,.14);}
  sphere(bronze,0,y+4.12,-.10,.35,.11,.27);
 };
 const basin=(r=3.2,y=0)=>{cylinder(stone,0,y+.20,0,r,.38);ring(stone,0,y+.44,0,r,.13,'stone');cylinder(water,0,y+.40,0,r*.91,.045,'water');};
 const jet=(x,y,z,height,radius=.65)=>{
  cylinder(water,x,y+height/2,z,.05,height,'water');
  for(let stream=0;stream<5;stream++){const a=stream*Math.PI*2/5;let previous=[x,y+.04,z];for(let step=1;step<=7;step++){const t=step/7,p=[x+Math.sin(a)*radius*t,y+4*height*.60*t*(1-t),z+Math.cos(a)*radius*t];limb(previous,p,.024,water,'water');previous=p;}}
 };
 function build(model){
  if(model==='floral-calendar'){
   box(stone,0,.12,0,8,.24,4);box(0x426d38,0,.29,0,7.65,.14,3.65);
   const date=new Date(),digits=String(date.getFullYear()),segments=[[0,.6,0,.34,.075],[.22,.44,0,.075,.27],[.22,.15,0,.075,.27],[0,0,0,.34,.075],[-.22,.15,0,.075,.27],[-.22,.44,0,.075,.27],[0,.30,0,.34,.075]],codes=[63,6,91,79,102,109,125,7,127,111];
   for(let n=0;n<digits.length;n++)for(let k=0;k<7;k++)if(codes[Number(digits[n])]&(1<<k)){const [x,z,_,w,d]=segments[k];box(0xefddaa,(n-1.5)*1.10+x,.40,(z-.3)*2,w,.12,d*2);}
   for(let i=0;i<42;i++){const a=i*Math.PI*2/42;sphere(i%2?0xe8c572:0xd694b1,Math.cos(a)*3.45,.47,Math.sin(a)*1.45,.12,.10,.12,'stone');}
  }else if(model==='arenales-ensemble'){
   steps(0,9.4);cylinder(stone,0,1.05,0,4.1,.75);cylinder(stone,0,1.55,0,3.65,.32);
   box(stone,0,3.85,0,3.5,4.3,3.9);box(marble,0,6.14,0,4.1,.32,4.5);plaque(4.3,1.9,2.02);horse(6.32,'pointing');
   for(let i=0;i<15;i++){const angle=i*Math.PI*2/15,x=Math.sin(angle)*3.15,z=Math.cos(angle)*3.15;cylinder(stone,x,1.80,z,.38,.26);human(x,1.93,z,.53,'classical',marble);}
  }else if(model==='freedom-chains'){
   steps(0,4.6);box(marble,0,1.45,0,2.8,1.6,2.8);box(marble,0,2.38,0,3.15,.24,3.15);
   human(0,2.52,0,1.38,'freedom',marble);plaque(1.5,1.6,1.45);
  }else if(model==='pyramid'){
   steps(0,6.8);box(marble,0,1.16,0,4.7,1.05,4.7);box(marble,0,2.10,0,3.9,.85,3.9);box(marble,0,2.70,0,4.15,.30,4.15);
   add('pyramid','stone',marble,0,6.50,0,1.75,7.3,1.75);box(marble,0,10.30,0,.75,.33,.75);human(0,10.47,0,.70,'liberty',marble);
   for(const side of [-1,1])for(const end of [-1,1]){box(marble,side*2.35,1.0,end*2.35,.90,.60,.90);human(side*2.35,1.3,end*2.35,.55,'classical',marble);}
   plaque(1.5,2.2,2.39);
  }else if(['equestrian','equestrian-fountain'].includes(model)){
   if(model==='equestrian-fountain')basin(4.2);steps(model==='equestrian-fountain'?.45:0,5.3,6.1);box(stone,0,2.05,0,3.9,2.85,4.7);box(0xe4d8c3,0,3.61,0,4.2,.31,5.0);plaque(2.1,2.2,2.39);horse(3.78,owner.feature.riderPose||'reins');
   if(model==='equestrian-fountain')for(const side of [-1,1])jet(side*2.7,.52,0,.85,.60);
  }else if(model==='standing-civil'){
   steps(0,6.8,6.0);add('cliff','stone',0xb7ab95,0,2.78,0,5.4,4.6,4.9);for(const side of [-1,1])add('cliff','stone',side<0?0xa79a84:0xc3b69c,side*1.95,1.32,side*.28,1.5,1.6,3.7);
   for(const side of [-1,1]){box(0x8e897d,side*2.25,2.4,0,.16,1.4,2.8);for(let relief=0;relief<4;relief++)sphere(0xaba18d,side*2.36,2.35+relief%2*.30,(relief-1.5)*.45,.09,.26,.18,'stone');}
   add('cliff','stone',0xc3b69c,0,4.96,0,3.2,.65,2.9);plaque(2.0,2.3,2.47);human(0,5.25,0,1.55,'civil');
   // Third relief belongs on the rear rock face, not a second generic plaque.
   box(0x8e897d,0,2.55,-2.44,2.8,1.5,.12);for(let i=0;i<3;i++){sphere(0xaba18d,(i-1)*.60,2.70,-2.53,.18,.31,.09,'stone');limb([(i-1)*.60,2.45,-2.53],[(i-1)*.60+.15,2.08,-2.53],.09,0xaba18d,'stone');}
  }else if(model==='standing-sword'){
   steps(0,4.0);box(stone,0,1.8,0,2.7,2.15,2.7);box(marble,0,3.0,0,3.0,.27,3.0);plaque(1.9,1.6,1.39);human(0,3.15,0,1.45,'sword');
  }else if(model==='liberty-column'||model==='column'||model==='obelisk'){
   steps(0,5.3);box(stone,0,1.5,0,3.5,1.65,3.5);plaque(1.5,1.7,1.79);
   if(model==='obelisk')add('pyramid','stone',marble,0,6.15,0,1.1,7.6,1.1);
   else{cylinder(marble,0,5.8,0,.74,7.0);for(const y of [2.35,2.65,8.90,9.20])cylinder(stone,0,y,0,1.0,.24);if(model==='liberty-column'){human(0,9.38,0,.9,'liberty');for(const side of [-1,1]){sphere(bronze,side*1.85,1.0,1.8,.45,.45,.85);sphere(bronze,side*1.85,1.40,2.22,.35,.37,.34);}}}
  }else if(['ornate-fountain','liberty-fountain','fountain'].includes(model)){
   basin(model==='fountain'?2.65:3.8);
   if(model==='fountain'){cylinder(stone,0,.82,0,.44,.75);jet(0,1.23,0,1.25,1.55);}
   else if(model==='liberty-fountain'){cylinder(marble,0,1.0,0,1.2,1.1);human(0,1.60,0,1.47,'liberty',marble);for(const side of [-1,1])human(side*1.45,.55,0,.55,'civil',marble);for(const side of [-1,1])jet(side*2.4,.49,0,1.1,.72);}
   else{
    cylinder(bronze,0,1.52,0,.68,2.65,'metal');for(const y of [.77,1.1,1.97])ring(gold,0,y,0,.71,.075);
    cylinder(bronze,0,2.77,0,2.15,.16,'metal');ring(gold,0,2.87,0,2.15,.11);cylinder(water,0,2.90,0,2.02,.035,'water');
    cylinder(bronze,0,3.64,0,.38,1.5,'metal');cylinder(bronze,0,4.42,0,1.16,.14,'metal');ring(gold,0,4.52,0,1.16,.08);cylinder(water,0,4.54,0,1.04,.03,'water');cylinder(bronze,0,4.62,0,.24,.18,'metal');human(0,4.70,0,.72,'fame');
    for(let angle=0;angle<4;angle++){const a=angle*Math.PI/2;jet(Math.sin(a)*2.48,.48,Math.cos(a)*2.48,1.4,.73);sphere(bronze,Math.sin(a)*.84,1.57,Math.cos(a)*.84,.35,.49,.26);}
   }
  }else if(model==='bust'){steps(0,2.7);box(stone,0,1.45,0,1.8,1.7,1.8);sphere(bronze,0,2.95,0,.65,.55,.35);sphere(bronze,0,3.65,0,.30,.36,.30);plaque(1.6,1.1,.94);}
  else if(model==='plaque'){box(stone,0,.63,0,1.8,1.1,.8);plaque(.75,1.5,.44);}
  else if(model==='classical-figure')human(0,0,0,1,'classical',marble);
 }
 const localModels=[];
 for(const item of plan.items){owner=item;const first=parts.length;build(item.feature.model);localModels.push({item,first,end:parts.length});}
 const geos={box:new T.BoxGeometry(1,1,1),sphere:new T.SphereGeometry(1,12,8),cylinder:new T.CylinderGeometry(1,1,1,12),cone:new T.ConeGeometry(1,1,12),torus:new T.TorusGeometry(1,.045,6,20),pyramid:new T.CylinderGeometry(.12,1,1,4),robe:new T.CylinderGeometry(.55,1,1,10),cape:new T.PlaneGeometry(1,1,10,12)};
 // A thin folded cloth sheet replaces the former ellipsoid that looked like a shield.
 const cloth=geos.cape.attributes.position;for(let i=0;i<cloth.count;i++){const u=cloth.getX(i),v=cloth.getY(i),drop=.5-v;cloth.setXYZ(i,u*(.48+drop*.60)+drop*drop*.24,v,Math.sin(u*22+drop*2)*(.025+drop*.045)-drop*drop*.55);}geos.cape.computeVertexNormals();
 geos.pyramid.rotateY(Math.PI/4);geos.torus.rotateX(Math.PI/2);
 // Broken radial ledges give the plinth a rock profile instead of a tapered building.
 const rockPositions=[],rockIndex=[],sides=14,levels=[-.5,-.24,.12,.5];
 for(let j=0;j<levels.length;j++)for(let i=0;i<sides;i++){const a=i*Math.PI*2/sides,r=(.51-j*.055)*(1+Math.sin(i*2.71+j*.9)*.16);rockPositions.push(Math.cos(a)*r,levels[j]+Math.sin(i*3.1)*.025,Math.sin(a)*r);}
 for(let j=0;j<levels.length-1;j++)for(let i=0;i<sides;i++){const a=j*sides+i,b=j*sides+(i+1)%sides,c=a+sides,d=b+sides;rockIndex.push(a,c,b,b,c,d);}
 for(let i=1;i<sides-1;i++){rockIndex.push(0,i+1,i);const top=(levels.length-1)*sides;rockIndex.push(top,top+i,top+i+1);}
 geos.cliff=new T.BufferGeometry();geos.cliff.setAttribute('position',new T.Float32BufferAttribute(rockPositions,3));geos.cliff.setIndex(rockIndex);const indexedRock=geos.cliff;geos.cliff=indexedRock.toNonIndexed();indexedRock.dispose();geos.cliff.computeVertexNormals();
 const batches=new Map(),dummy=new T.Object3D(),yaw=new T.Quaternion();
 for(const part of parts){const key=part.kind+':'+part.material;if(!batches.has(key))batches.set(key,{kind:part.kind,material:part.material,parts:[]});batches.get(key).parts.push(part);}
 const usedGeometries=new Set([...batches.values()].map(batch=>batch.kind));for(const [kind,geometry]of Object.entries(geos))if(!usedGeometries.has(kind))geometry.dispose();
 for(const batch of batches.values()){
  const waterMaterial=batch.material==='water';const material=new T.MeshStandardMaterial({side:batch.kind==='cape'?T.DoubleSide:T.FrontSide,color:0xffffff,roughness:waterMaterial?.18:batch.material==='metal'?.43:.83,metalness:waterMaterial?.18:batch.material==='metal'?.58:.02});
  const mesh=new T.InstancedMesh(geos[batch.kind],material,batch.parts.length),tint=new T.Color();
  batch.parts.forEach((p,i)=>{const item=p.owner,ca=Math.cos(item.angle),sa=Math.sin(item.angle);dummy.position.set(b.x+item.x+(p.x*ca-p.z*sa)*item.scale,.59+p.y*item.scale,b.z+item.z+(p.x*sa+p.z*ca)*item.scale);yaw.setFromAxisAngle(UP,-item.angle);dummy.quaternion.copy(yaw);if(p.rotation)dummy.quaternion.multiply(p.rotation);dummy.scale.set(p.sx*item.scale,p.sy*item.scale,p.sz*item.scale);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,tint.setHex(p.color));});
  mesh.computeBoundingSphere();mesh.castShadow=!waterMaterial;mesh.receiveShadow=true;mesh.userData.squareLandmark=true;mesh.userData.sculpturePart=batch.kind;mesh.userData.squareModels=[...new Set(batch.parts.map(p=>p.owner.feature.model))];mesh.userData.squareFeatureIDs=batch.parts.map(p=>p.owner.feature.id);group.add(mesh);
 }
}
window.SquareDetails={enrich,prepare,render,classify,modelSpecs:MODEL_SPECS};
})();
