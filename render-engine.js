/* Sudamérica Casa por Casa · Visual Engine 8.4
   Native-resolution physically based rendering, dynamically centered sun shadows,
   no blur, downsampling or dark screen-space filters. */
(function(){
 'use strict';
 const target=new THREE.Vector3(),direction=new THREE.Vector3(),offset=new THREE.Vector3(-155,156,115);
 const shadowCenter=new THREE.Vector3(Infinity,0,Infinity);
 let sun=null,lastShadow=-Infinity;
 let shadowDirty=true,previousCity=null;
 const shadowInterval=1000/12;
 const frameTimes=new Float32Array(240);
 let frames=0,metrics=null;
 let maxRatio=1,lastFrame=0,averageFrame=16.7,slowFrames=0,fastFrames=0;
 function setup(scene,camera,renderer){
  renderer.useLegacyLights=false;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.autoUpdate=false;
  maxRatio=Math.min(renderer.getPixelRatio(),1.5);
  renderer.setPixelRatio(maxRatio);
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.04;
  scene.traverse(function(o){
   if(o.isDirectionalLight&&!sun){
    sun=o;sun.castShadow=true;
    const shadowResolution=Math.min(4096,renderer.capabilities?.maxTextureSize||4096);
    sun.shadow.mapSize.set(shadowResolution,shadowResolution);
    const c=sun.shadow.camera;
    c.left=-114;c.right=114;c.top=210;c.bottom=-114;c.near=1;c.far=750;
    c.updateProjectionMatrix();
    sun.shadow.bias=-0.00014;sun.shadow.normalBias=.022;
    sun.shadow.radius=3;
   }
  });
 }

 function fitCityShadows(bounds){
  target.set((bounds.minX+bounds.maxX)/2,0,(bounds.minZ+bounds.maxZ)/2);
  const length=Math.hypot(offset.x,offset.y,offset.z),horizontal=Math.hypot(offset.x,offset.z);
  const bx=offset.x/length,by=offset.y/length,bz=offset.z/length;
  const rx=offset.z/horizontal,rz=-offset.x/horizontal;
  const ux=-by*offset.x/horizontal,uy=horizontal/length,uz=-by*offset.z/horizontal;
  let left=Infinity,right=-Infinity,bottom=Infinity,top=-Infinity,minDepth=Infinity,maxDepth=-Infinity;
  for(const x of [bounds.minX,bounds.maxX])for(const y of [0,bounds.maxY])for(const z of [bounds.minZ,bounds.maxZ]){
   const dx=x-target.x,dz=z-target.z;
   const u=dx*rx+dz*rz,v=dx*ux+y*uy+dz*uz,depth=dx*bx+y*by+dz*bz;
   left=Math.min(left,u);right=Math.max(right,u);bottom=Math.min(bottom,v);top=Math.max(top,v);
   minDepth=Math.min(minDepth,depth);maxDepth=Math.max(maxDepth,depth);
  }
  const distance=Math.max(400,maxDepth+100);
  sun.target.position.copy(target);
  sun.position.set(target.x+bx*distance,by*distance,target.z+bz*distance);
  const c=sun.shadow.camera;
  c.left=left-22;c.right=right+22;c.bottom=bottom-22;c.top=top+22;
  c.near=Math.max(1,distance-maxDepth-50);c.far=distance-minDepth+70;
  const texel=Math.max((c.right-c.left)/sun.shadow.mapSize.x,(c.top-c.bottom)/sun.shadow.mapSize.y);
  sun.shadow.normalBias=Math.min(.65,Math.max(.035,texel*.65));
  sun.shadow.bias=-Math.max(.00014,texel*.35/Math.max(1,c.far-c.near));
  c.updateProjectionMatrix();sun.target.updateMatrixWorld();
 }
 function render(scene,camera,renderer,frameInterval=16){
  const city=scene.children.find(child=>child.name==='city-geometry');
  if(city!==previousCity){shadowDirty=true;previousCity=city;}
  const now=performance.now();
  const elapsed=lastFrame?now-lastFrame:0;
  lastFrame=now;
  if(document.hidden||elapsed>=1000){
   slowFrames=0;
   fastFrames=0;
  }else if(elapsed>0){
   frameTimes[frames++%frameTimes.length]=elapsed;
   const sample=Math.min(elapsed,180)*16/Math.max(16,frameInterval);
   averageFrame+=(sample-averageFrame)*.06;
   slowFrames=sample>27?slowFrames+1:0;
   fastFrames=sample<24?fastFrames+1:0;
   const ratio=renderer.getPixelRatio();
   if(slowFrames>=30&&averageFrame>27){
    const next=Math.max(Math.min(.78,maxRatio),ratio-.15);
    if(next!==ratio)renderer.setPixelRatio(next);
    slowFrames=0;
   }else if(fastFrames>=90&&averageFrame<18){
    const next=Math.min(maxRatio,ratio+.10);
    if(next!==ratio)renderer.setPixelRatio(next);
    fastFrames=0;
   }
  }

  const cityBounds=city?.userData?.cityShadowBounds;
  if(sun&&cityBounds&&shadowDirty){
   fitCityShadows(cityBounds);
   renderer.shadowMap.needsUpdate=true;
   shadowDirty=false;lastShadow=now;
  }
  if(sun&&!cityBounds&&(shadowDirty||now-lastShadow>=shadowInterval)){

   camera.getWorldDirection(direction);
   const depth=Math.min(350,camera.position.y/Math.max(.15,-direction.y));
   target.copy(camera.position).addScaledVector(direction,depth);
   target.y=0;
   if(shadowDirty||shadowCenter.distanceToSquared(target)>=4||(!city&&now-lastShadow>=500)){
    shadowCenter.copy(target);
    sun.target.position.copy(target);
    sun.position.copy(target).add(offset);
    sun.target.updateMatrixWorld();
    renderer.shadowMap.needsUpdate=true;
    lastShadow=now;
    shadowDirty=false;
   }
  }
  renderer.setRenderTarget(null);
  renderer.render(scene,camera);
  const {calls,triangles}=renderer.info.render;
  metrics={calls,triangles,pixelRatio:renderer.getPixelRatio()};
 }
 function performanceSnapshot(){
  const samples=Math.min(frames,frameTimes.length);
  if(!samples||!metrics)return null;
  const values=frameTimes.slice(0,samples).sort();
  return {...metrics,samples,medianFrameMs:values[Math.floor((samples-1)*.5)],
   p95FrameMs:values[Math.ceil(samples*.95)-1]};
 }
 window.SudamericaRender8={setup,render,resize:function(){},performanceSnapshot};
})();
