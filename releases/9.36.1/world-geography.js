/* Shared geographic land mask. Natural Earth coastlines; local axes east +X, north -Z. */
(function(){'use strict';
const N=1024,REGION_EXTENT=50000,DETAIL_EXTENT=6500,DETAIL_START=5900,DETAIL_END=6300,cache=new Map();
function makeRegion(city,bounds,extent=REGION_EXTENT,detail=true){
 const neighbors=(bounds.neighbors||[]).map(n=>[n.city.id,n.x,n.z,n.radius]).sort();
 const key=JSON.stringify([city.id,city.lat,city.lng,extent,detail,bounds.spaceScale,bounds.minX,bounds.maxX,bounds.minZ,bounds.maxZ,neighbors]);
 const result=cache.get(key)||buildRegion(city,bounds,extent,detail);
 cache.delete(key);
 cache.set(key,result);
 while(cache.size>2){
  const [oldKey,old]=cache.entries().next().value;
  old.dispose();
  cache.delete(oldKey);
 }
 return result;
}
function fillGeographicLand(land,city,extent,step,xScale,zScale){
 const longitudeSpan=extent/xScale,latitudeSpan=extent/zScale;
 for(const polygon of WorldRoads.landPolygons){
  if(polygon.maxY<city.lat-latitudeSpan||polygon.minY>city.lat+latitudeSpan)continue;
  let {minX,maxX}=polygon;
  if(!Number.isFinite(minX)||!Number.isFinite(maxX)){
   minX=Infinity;
   maxX=-Infinity;
   for(const [lng] of polygon.rings[0]){minX=Math.min(minX,lng);maxX=Math.max(maxX,lng);}
  }
  // Shift whole rings together. Wrapping individual vertices can close a
  // distant coastline across the current viewport at the antimeridian.
  const firstCopy=Math.ceil((city.lng-longitudeSpan-maxX)/360);
  const lastCopy=Math.floor((city.lng+longitudeSpan-minX)/360);
  for(let copy=firstCopy;copy<=lastCopy;copy++){
   const origin=city.lng-copy*360;
   for(let ri=0;ri<polygon.rings.length;ri++){
    const ring=polygon.rings[ri],rows=new Array(N);
    let [lng,lat]=ring.at(-1),ax=(lng-origin)*xScale,az=(city.lat-lat)*zScale;
    // Visit only the scanlines each coastline edge actually crosses.
    for(const [lng,lat] of ring){
     const bx=(lng-origin)*xScale,bz=(city.lat-lat)*zScale;
     const first=Math.max(0,Math.ceil((Math.min(az,bz)+extent)/step-.5));
     const last=Math.min(N,Math.ceil((Math.max(az,bz)+extent)/step-.5));
     for(let row=first;row<last;row++){
      const z=-extent+(row+.5)*step;
      (rows[row]??=[]).push(ax+(z-az)*(bx-ax)/(bz-az));
     }
     ax=bx;
     az=bz;
    }
    for(let row=0;row<N;row++){
     const hits=rows[row];
     if(!hits)continue;
     hits.sort((a,b)=>a-b);
     for(let i=0;i+1<hits.length;i+=2){
      const start=Math.max(0,Math.ceil((hits[i]+extent)/step-.5));
      const end=Math.min(N-1,Math.floor((hits[i+1]+extent)/step-.5));
      if(end>=start)land.fill(ri?0:1,row*N+start,row*N+end+1);
     }
    }
   }
  }
 }
}
function detailBlend(x,z){
 const amount=Math.max(0,Math.min(1,(Math.max(Math.abs(x),Math.abs(z))-DETAIL_START)/(DETAIL_END-DETAIL_START)));
 return amount*amount*(3-2*amount);
}
function textureDistance(value){return Math.max(-2048,Math.min(2048,value));}
function buildRegion(city,bounds,extent,detail){
const EXTENT=extent,STEP=2*EXTENT/N,spaceScale=bounds.spaceScale||1;
const land=new Uint8Array(N*N),cos=Math.max(.02,Math.cos(city.lat*Math.PI/180));
fillGeographicLand(land,city,EXTENT,STEP,111320*cos*spaceScale,111320*spaceScale);
// The compact simulated city needs a dry apron; preserve geography outside that parcel.
for(let row=Math.max(0,Math.floor((bounds.minZ-260+EXTENT)/STEP));row<Math.min(N,Math.ceil((bounds.maxZ+260+EXTENT)/STEP));row++){const z=-EXTENT+(row+.5)*STEP;for(let col=Math.max(0,Math.floor((bounds.minX-260+EXTENT)/STEP));col<Math.min(N,Math.ceil((bounds.maxX+260+EXTENT)/STEP));col++){const x=-EXTENT+(col+.5)*STEP,dx=Math.max(bounds.minX-x,0,x-bounds.maxX),dz=Math.max(bounds.minZ-z,0,z-bounds.maxZ);if(Math.hypot(dx,dz)<180)land[row*N+col]=1;}}
for(const neighbor of bounds.neighbors||[]){const radius=neighbor.radius||220;for(let row=Math.max(0,Math.floor((neighbor.z-radius+EXTENT)/STEP));row<Math.min(N,Math.ceil((neighbor.z+radius+EXTENT)/STEP));row++)for(let col=Math.max(0,Math.floor((neighbor.x-radius+EXTENT)/STEP));col<Math.min(N,Math.ceil((neighbor.x+radius+EXTENT)/STEP));col++){const x=-EXTENT+(col+.5)*STEP,z=-EXTENT+(row+.5)*STEP;if(Math.hypot(x-neighbor.x,z-neighbor.z)<radius)land[row*N+col]=1;}}
function transform(value){const d=new Float32Array(N*N);for(let i=0;i<d.length;i++)d[i]=land[i]===value?30000:0;for(let z=0;z<N;z++)for(let x=0;x<N;x++){const i=z*N+x;let v=d[i];if(x)v=Math.min(v,d[i-1]+1);if(z){v=Math.min(v,d[i-N]+1);if(x)v=Math.min(v,d[i-N-1]+1.414214);if(x<N-1)v=Math.min(v,d[i-N+1]+1.414214);}d[i]=v;}for(let z=N-1;z>=0;z--)for(let x=N-1;x>=0;x--){const i=z*N+x;let v=d[i];if(x<N-1)v=Math.min(v,d[i+1]+1);if(z<N-1){v=Math.min(v,d[i+N]+1);if(x)v=Math.min(v,d[i+N-1]+1.414214);if(x<N-1)v=Math.min(v,d[i+N+1]+1.414214);}d[i]=v;}return d;}
const biome=window.WorldBiomes?WorldBiomes.raster(city,N,EXTENT/spaceScale):{arid:new Uint8Array(1),cold:new Uint8Array(1),size:1};
const signed=new Float32Array(N*N),bytes=new Uint8Array(N*N*4);
const water=land.reduce((count,cell)=>count+1-cell,0);
if(water===0||water===land.length)signed.fill(water===0?30000:-30000);
else{
 const inside=transform(1),outside=transform(0);
 for(let i=0;i<signed.length;i++)signed[i]=(land[i]?inside[i]-.5:.5-outside[i])*STEP;
}
for(let i=0;i<signed.length;i++){
 const value=Math.round((.5+textureDistance(signed[i])/4096)*65535);
 bytes[i*4]=value>>8;
 bytes[i*4+1]=value&255;
 bytes[i*4+3]=255;
}
const biomeTexture=new THREE.DataTexture(biome.tint||new Uint8Array(N*N*4),biome.size||N,biome.size||N,THREE.RGBAFormat);biomeTexture.minFilter=biomeTexture.magFilter=THREE.LinearFilter;biomeTexture.wrapS=biomeTexture.wrapT=THREE.ClampToEdgeWrapping;biomeTexture.generateMipmaps=false;biomeTexture.needsUpdate=true;
let nearRegion=null;
function distance(x,z){
 const blend=nearRegion?detailBlend(x,z):1;
 if(blend===0)return nearRegion.landDistance(x,z);
 const px=(x+EXTENT)/STEP-.5,pz=(z+EXTENT)/STEP-.5;
 if(px<0||pz<0||px>N-1||pz>N-1)return WorldRoads.onLand(city.lat-z/(111320*spaceScale),city.lng+x/(111320*cos*spaceScale))?1000:-1000;
 const ix=Math.floor(px),iz=Math.floor(pz),fx=px-ix,fz=pz-iz,x1=Math.min(N-1,ix+1),z1=Math.min(N-1,iz+1);
 const d=textureDistance(signed[iz*N+ix])*(1-fx)*(1-fz)+textureDistance(signed[iz*N+x1])*fx*(1-fz)+textureDistance(signed[z1*N+ix])*(1-fx)*fz+textureDistance(signed[z1*N+x1])*fx*fz;
 if(blend===1)return d;
 return nearRegion.landDistance(x,z)*(1-blend)+d*blend;
}
const texture=new THREE.DataTexture(bytes,N,N,THREE.RGBAFormat);texture.minFilter=texture.magFilter=THREE.LinearFilter;texture.wrapS=texture.wrapT=THREE.ClampToEdgeWrapping;texture.generateMipmaps=false;texture.needsUpdate=true;
let reachable=null,edgeReached=false;function flood(){if(reachable)return;reachable=new Uint8Array(N*N);if(!water){reachable.fill(1);edgeReached=true;return;}const queue=new Int32Array(N*N);let first=0,last=0;const sx=Math.max(0,Math.min(N-1,Math.floor(((bounds.minX+bounds.maxX)/2+EXTENT)/STEP))),sz=Math.max(0,Math.min(N-1,Math.floor(((bounds.minZ+bounds.maxZ)/2+EXTENT)/STEP))),start=sz*N+sx;queue[last++]=start;reachable[start]=1;while(first<last){const id=queue[first++],x=id%N,z=Math.floor(id/N);if(x===0||z===0||x===N-1||z===N-1)edgeReached=true;for(let direction=0;direction<4;direction++){const next=id+(direction===0?-1:direction===1?1:direction===2?-N:N);if(next<0||next>=N*N||Math.abs(next%N-x)>1||reachable[next]||signed[next]<45)continue;reachable[next]=1;queue[last++]=next;}}}
function goal(start,end){flood();const dx=end.x-start.x,dz=end.z-start.z,len=Math.hypot(dx,dz)||1;let best=null,score=-Infinity;for(let z=2;z<N-2;z+=4)for(let x=2;x<N-2;x+=4){const id=z*N+x;if(!reachable[id]||signed[id]<130)continue;const px=-EXTENT+(x+.5)*STEP,pz=-EXTENT+(z+.5)*STEP,d=Math.hypot(px-start.x,pz-start.z);if(d<500||d>44000)continue;const along=((px-start.x)*dx+(pz-start.z)*dz)/len,side=Math.abs((px-start.x)*dz-(pz-start.z)*dx)/len,s=along-side*.28+d*.12;if(s>score){score=s;best={x:px,z:pz};}}return best||start;}
function islandTargets(){flood();if(edgeReached)return null;const result=[];for(let k=0;k<8;k++){const a=k*Math.PI/4,start={x:(bounds.minX+bounds.maxX)/2,z:(bounds.minZ+bounds.maxZ)/2};result.push(goal(start,{x:start.x+Math.sin(a)*44000,z:start.z+Math.cos(a)*44000}));}return result;}
function biomeValue(field,x,z){
 const blend=nearRegion?detailBlend(x,z):1;
 if(blend===0)return nearRegion.sampleBiome(field,x,z);
 const data=biome[field];if(!data)return field==='vegetation'?1:0;
 const size=biome.size||N,px=Math.max(0,Math.min(size-1,(x+EXTENT)/(EXTENT*2)*size-.5)),pz=Math.max(0,Math.min(size-1,(z+EXTENT)/(EXTENT*2)*size-.5)),ix=Math.floor(px),iz=Math.floor(pz),fx=px-ix,fz=pz-iz,x1=Math.min(size-1,ix+1),z1=Math.min(size-1,iz+1);
 const value=(data[iz*size+ix]*(1-fx)*(1-fz)+data[iz*size+x1]*fx*(1-fz)+data[z1*size+ix]*(1-fx)*fz+data[z1*size+x1]*fx*fz)/255;
 return blend===1?value:nearRegion.sampleBiome(field,x,z)*(1-blend)+value*blend;
}
if(detail&&EXTENT>DETAIL_EXTENT)nearRegion=buildRegion(city,bounds,DETAIL_EXTENT,false);
return {city,bounds,texture,biomeTexture,nearBiomeTexture:nearRegion?.biomeTexture,nearTexture:nearRegion?.texture,nearExtent:nearRegion?.extent,biome,sampleBiome:biomeValue,vegetation:(x,z)=>biomeValue('vegetation',x,z),aridity:(x,z)=>biomeValue('arid',x,z),coldness:(x,z)=>biomeValue('cold',x,z),signed,land,extent:EXTENT,size:N,step:STEP,landDistance:distance,goal,islandTargets,hasWater:water>0||!!nearRegion?.hasWater,
 dispose(){texture.dispose();biomeTexture.dispose();nearRegion?.dispose();}};
}
function clipMaterial(material,region,mode='ground',sand=0xd4bd88){
 const uniforms=material.userData.regionUniforms;
 if(uniforms){
  uniforms.regionLand.value=region.texture;
  uniforms.regionNearLand.value=region.nearTexture||region.texture;
  uniforms.regionBiome.value=region.biomeTexture;
  uniforms.regionNearBiome.value=region.nearBiomeTexture||region.biomeTexture;
  uniforms.regionExtent.value=region.extent;
  uniforms.regionNearExtent.value=region.nearExtent||region.extent;
  uniforms.regionSand.value.setHex(sand);
 }
 const prior=material.userData.regionOriginalCompile||material.onBeforeCompile;material.userData.regionOriginalCompile=prior;
 material.onBeforeCompile=(shader,renderer)=>{
 if(prior)prior.call(material,shader,renderer);
 shader.uniforms.regionLand={value:region.texture};
 shader.uniforms.regionNearLand={value:region.nearTexture||region.texture};
 shader.uniforms.regionBiome={value:region.biomeTexture};
 shader.uniforms.regionNearBiome={value:region.nearBiomeTexture||region.biomeTexture};
 shader.uniforms.regionExtent={value:region.extent};
 shader.uniforms.regionNearExtent={value:region.nearExtent||region.extent};
 shader.uniforms.regionSand={value:new THREE.Color(sand)};
 material.userData.regionUniforms=shader.uniforms;
 shader.vertexShader='varying vec3 regionPosition;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nregionPosition=(modelMatrix*vec4(position,1.)).xyz;');
 shader.fragmentShader='uniform sampler2D regionLand; uniform sampler2D regionNearLand; uniform sampler2D regionBiome; uniform sampler2D regionNearBiome; uniform float regionExtent; uniform float regionNearExtent; uniform vec3 regionSand; varying vec3 regionPosition;\n'+shader.fragmentShader;
 const altitude=mode==='mountain'?'1.-smoothstep(25.,420.,regionPosition.y)':'1.';
 const code=mode==='water'?'if(regionDistance>0.)discard;':
  'if(regionDistance<0.)discard; float grain=.95+.05*sin(regionXZ.x*.037+sin(regionXZ.y*.029)); vec4 terrainTint=mix(texture2D(regionNearBiome,regionNearUV),texture2D(regionBiome,regionUV),regionBlend); vec3 linearTint=pow(terrainTint.rgb,vec3(2.2)); float biomeInfluence='+altitude+'; diffuseColor.rgb=mix(diffuseColor.rgb,linearTint*grain,terrainTint.a*biomeInfluence); float shallowEdge=(1.-smoothstep(1.,25.,regionDistance))*biomeInfluence; diffuseColor.rgb=mix(diffuseColor.rgb,regionSand,shallowEdge);';
 const coordinates='vec2 regionXZ=regionPosition.xz; float regionBlend=regionNearExtent<regionExtent?smoothstep('+DETAIL_START+'.0,'+DETAIL_END+'.0,max(abs(regionXZ.x),abs(regionXZ.y))):1.; vec2 regionNearUV=.5+regionXZ/(2.*regionNearExtent); vec2 regionUV=.5+regionXZ/(2.*regionExtent);';
 const coastline='vec2 encodedDistance=mix(texture2D(regionNearLand,regionNearUV).rg,texture2D(regionLand,regionUV).rg,regionBlend); float regionDistance=(dot(encodedDistance,vec2(256.,1.))/257.-.5)*4096.;';
 shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n'+coordinates+' '+coastline+' '+code);
 };material.customProgramCacheKey=()=> 'complete-biomes-v3-'+mode;material.needsUpdate=true;
}
function heightSampler(terrain,ax,az,edge){const a=terrain.attributes.position,nx=240,nz=112;return(x,z)=>{const u=az*x-ax*z,inland=ax*x+az*z-edge-160;if(Math.abs(u)>50000||inland<0||inland>48000)return 0;const au=Math.abs(u),oldU=au<=9600?u:Math.sign(u)*(9600+(au-9600)/40400*2400),t=inland<=8400?inland/8400*.7:.7+(inland-8400)/39600*.3,px=(oldU/24000+.5)*nx,pz=t*nz,ix=Math.min(nx-1,Math.max(0,Math.floor(px))),iz=Math.min(nz-1,Math.max(0,Math.floor(pz))),fx=px-ix,fz=pz-iz,id=iz*(nx+1)+ix,A=a.getY(id),B=a.getY(id+nx+1),C=a.getY(id+nx+2),D=a.getY(id+1);return Math.max(0,fx+fz<=1?A+fx*(D-A)+fz*(B-A):C+(1-fx)*(B-C)+(1-fz)*(D-C));};}
window.WorldGeography={makeRegion,clipMaterial,heightSampler};
})();
