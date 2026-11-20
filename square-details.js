/* Source-driven 3D square details. Models are stylised reconstructions, not scans. */
(function(){
'use strict';
const MODEL_SPECS={'floral-calendar':{height:1.2,width:8},'arenales-ensemble':{height:11,width:10},'freedom-chains':{height:7,width:5},pyramid:{height:13,width:7},obelisk:{height:10,width:3},column:{height:10,width:4},'liberty-column':{height:13,width:6},equestrian:{height:8,width:7},'equestrian-fountain':{height:8,width:9},'standing-sword':{height:7,width:4},'standing-civil':{height:10,width:7},'ornate-fountain':{height:7,width:9},'liberty-fountain':{height:7,width:8},fountain:{height:3,width:6},bust:{height:4,width:3},plaque:{height:1.5,width:2},'classical-figure':{height:3,width:2}};
MODEL_SPECS['accademia-conegliano']={height:15,width:32,depth:18,parcelWidth:.80};
MODEL_SPECS['stone-sphinx']={height:3.15,width:3.6};
Object.assign(MODEL_SPECS,{
 'washington-arch':{height:9.2,width:7.7,depth:2.9,parcelWidth:.38},
 'washington-fountain':{height:2.25,width:7.4,depth:7.4,parcelWidth:.52},
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
 'king-sejong-seated':{height:7.0,width:5.5,depth:5.3,parcelWidth:.45},
 'rizal-monument':{height:9.6,width:7.4,depth:7.4,parcelWidth:.42},
 'monas':{height:19.0,width:7.1,depth:7.1,parcelWidth:.50},
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
 const all=profile.landmarks||[],items=[],reservations=[];
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
  const at=(px,py,pz)=>[x+px*scale,y+py*scale,z+pz*scale],material=color===marble?'stone':pose==='civil'?'patina':'metal';
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
  }else if(model==='liberty-column'||model==='column'||model==='obelisk'){
   steps(0,5.3);box(stone,0,1.5,0,3.5,1.65,3.5);plaque(1.5,1.7,1.79);
   if(model==='obelisk')add('pyramid','stone',marble,0,6.15,0,1.1,7.6,1.1);
   else{cylinder(marble,0,5.8,0,.74,7.0);for(const y of [2.35,2.65,8.90,9.20])cylinder(stone,0,y,0,1.0,.24);if(model==='liberty-column'){human(0,9.32,0,.9,'liberty');for(const side of [-1,1]){sphere(bronze,side*1.85,1.0,1.8,.45,.45,.85);sphere(bronze,side*1.85,1.40,2.22,.35,.37,.34);}}}
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
 if(parts.some(part=>part.kind==='hex'))geos.hex=new T.CylinderGeometry(1,1,1,6);
 if(parts.some(part=>part.kind==='tapered-column'))geos['tapered-column']=new T.CylinderGeometry(.56,1,1,16);
 if(parts.some(part=>part.kind==='monas-base'))geos['monas-base']=new T.CylinderGeometry(1,.76,1,4).rotateY(Math.PI/4);
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
