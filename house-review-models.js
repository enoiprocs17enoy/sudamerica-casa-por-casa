(function(){'use strict';let group,houseMeshes=[],selectedPaint=0,selectedPremium=false;
const rnd=n=>{const x=Math.sin(n*127.13+19.1)*43758.5453;return x-Math.floor(x)};
const facadeAngle=()=>0,gardenChoice=()=>0,isInsideParcel=()=>true;
const plotBounds=()=>({left:-10.225,right:10.225,top:-22.475,bottom:22.475});
function assertInsideParcel(name,x,z,w,d,b){if(x-w/2<b.left-.001||x+w/2>b.right+.001||z-d/2<b.top-.001||z+d/2>b.bottom+.001)throw Error(name+' outside plot');}
const housePaint=()=>HOUSE_PAINTS[selectedPaint],isPremiumHouse=()=>selectedPremium;

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
function coordinatedHouseColor(wall,other,amount){
 return new THREE.Color(wall).lerp(new THREE.Color(other),amount).getHex();
}

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

function renderAllHouses(selected){const steps=renderHouseStages(selected);while(!steps.next().done){}}
function* renderHouseStages(selected){
  // Multiple architectural families, all instanced: render every house at every zoom.
  const boxGeo=new THREE.BoxGeometry(1,1,1);
  const roofGeo=makeRidgeRoof();
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
  let houseBudget=0;
  for(const h of selected){
    if(houseBudget++===32){houseBudget=1;yield;}
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
        const balconyDoor=premium&&floor>0&&floor%2===1;
        const openingY=balconyDoor?floor*storeyHeight+1.50:wy;
        const openingHeight=balconyDoor?2.20:1.15;
        for(const side of [-1,1]){
          const wx=x+side*footW*.26, width=footW*.24;
          for(const face of [-1,1]){
            const wz=z+face*(footD/2+.055);
            place('towerWindowFrame',boxGeo,0xf0dfc8,h,wx,openingY,wz,width+.22,openingHeight+.18,.12);
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
      place('towerDoor',boxGeo,0x66564d,h,x,1.05,z+footD/2+.12,1.6,2.1,.16);
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
    const casts=/(premiumTowerBalconySlab|gardenTree|towerBase|towerRoof|towerMain|towerMid|homeMain|homeWing|homeRoof|homeCore|homeWall|towerWall|towerBody|mainBody|wingBody|mainRoof|gable|hipRoof)/i.test(key);
    const receives=casts||/(facade|pier|window|door|balcony|pilaster)/i.test(key);
    const profile=[batch.geo.id,texture,normalStrength,roughness,metalness,casts,receives].join(':');
    for(const entry of batch.entries){
      // Dense cities cull whole neighborhoods instead of submitting every house.
      const key=spatialBatches?profile+':'+Math.floor(entry.h.x/368)+':'+Math.floor(entry.h.z/368):profile;
      if(!renderBatches.has(key))renderBatches.set(key,{
        profile,geo:batch.geo,texture,normalStrength,roughness,metalness,casts,receives,entries:[]
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
    for(let i=0;i<batch.entries.length;i++){
      if(i>0&&i%2048===0)yield;
      const e=batch.entries[i];dummy.position.set(e.x,e.y,e.z);
      let rotation=placementRotations.get(e.rotation);
      if(!rotation){rotation=new THREE.Quaternion().setFromEuler(placementEuler.set(0,e.rotation,0));placementRotations.set(e.rotation,rotation);}
      dummy.scale.set(e.w,e.height,e.d);dummy.matrix.compose(dummy.position,rotation,dummy.scale);mesh.setMatrixAt(i,dummy.matrix); mesh.setColorAt(i,tint.setHex(e.color));
    }
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


const picker=document.querySelector('#business'),mode=document.querySelector('#finish'),angle=document.querySelector('#angle'),scale=document.querySelector('#scale');
HOUSE_PAINTS.forEach((paint,id)=>{const option=document.createElement('option');option.value=id;option.textContent=paint.name;picker.append(option);});
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.autoClear=false;document.querySelector('#models').append(renderer.domElement);
let fixtures=[];
function dispose(){const geometries=new Set(),materials=new Set();for(const item of fixtures)item.scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);if(o.isLight&&o.shadow?.map)o.shadow.map.dispose();});for(const g of geometries)g.dispose();for(const m of materials)m.dispose();fixtures=[];}
function build(){dispose();const id=Number(picker.value),premium=mode.value==='premium';
 for(let stage=0;stage<8;stage++){
  group=new THREE.Group();houseMeshes=[];selectedPaint=id;selectedPremium=premium;renderAllHouses([{id:1,points:HOUSE_TIERS[stage].min,x:0,z:0,cityId:'review',blockIndex:0,slot:0,garden:false}]);group.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(group),scene=new THREE.Scene();scene.background=new THREE.Color(0xd7e7eb);scene.add(group);
  scene.add(new THREE.HemisphereLight(0xe4f4ff,0x696a48,1.25));const sun=new THREE.DirectionalLight(0xffedcd,2.0);sun.position.set(-180,500,300);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-220;sun.shadow.camera.right=220;sun.shadow.camera.top=220;sun.shadow.camera.bottom=-220;sun.shadow.camera.near=1;sun.shadow.camera.far=1000;sun.shadow.normalBias=.035;scene.add(sun);
  const lot=new THREE.Mesh(new THREE.PlaneGeometry(20.45,44.95),new THREE.MeshStandardMaterial({color:0xd4d2bc,roughness:.95}));lot.rotation.x=-Math.PI/2;lot.position.y=.01;lot.receiveShadow=true;scene.add(lot);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(600,600),new THREE.MeshStandardMaterial({color:0xa9bf91,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-.015;ground.receiveShadow=true;scene.add(ground);
  const line=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(20.45,.02,44.95)),new THREE.LineBasicMaterial({color:0x547775}));line.position.y=.03;scene.add(line);
  fixtures.push({scene,box,camera:new THREE.PerspectiveCamera(38,1,.1,700)});
 }
 render();
}
function render(){if(!fixtures.length)return;const root=document.querySelector('#models'),width=root.clientWidth,height=root.clientHeight;renderer.setSize(width,height);renderer.setScissorTest(true);const cellW=width/4,cellH=height/2,common=new THREE.Box3();for(const item of fixtures)common.union(item.box);
 fixtures.forEach((item,index)=>{const box=scale.value==='common'?common:item.box,center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3()),az=angle.value==='back'?Math.PI*7/6:angle.value==='side'?Math.PI*2/3:Math.PI/6,elev=angle.value==='top'?1.35:.58;const span=Math.max(size.y,size.x,size.z*.82,14),distance=size.length()*.5/Math.sin(38*Math.PI/360)*1.16;
  item.camera.aspect=cellW/cellH;item.camera.position.set(center.x+Math.sin(az)*Math.cos(elev)*distance,center.y+Math.sin(elev)*distance,center.z+Math.cos(az)*Math.cos(elev)*distance);item.camera.lookAt(center);item.camera.updateProjectionMatrix();const col=index%4,row=Math.floor(index/4);renderer.setViewport(col*cellW,height-(row+1)*cellH,cellW,cellH);renderer.setScissor(col*cellW,height-(row+1)*cellH,cellW,cellH);renderer.clear();renderer.render(item.scene,item.camera);document.querySelector('#level'+index).textContent='Livello '+(index+1)+' · '+item.box.max.y.toFixed(1)+' m';
 });document.querySelector('#status').textContent=picker.selectedOptions[0].textContent+' · '+mode.selectedOptions[0].textContent+' · 8 modelli di verifica senza modificare la città';
}
picker.onchange=mode.onchange=build;angle.onchange=scale.onchange=render;window.addEventListener('resize',render);build();
})();