/* Keep the map independent of the 3D engine and load each scene resource once. */
(function(){
 'use strict';
 const version='9.36.1-world1';
 const engineUrl='https://cdnjs.cloudflare.com/ajax/libs/three.js/0.152.2/three.min.js';
 const pending=new Map();
 const sceneModules=[
  ['world-place-kinds.js','CityPlaceKinds'],
  ['world-biomes.js','WorldBiomes'],
  ['world-geography.js','WorldGeography'],
  ['world-terrain.js','WorldTerrain'],
  ['world-forest.js','WorldForest']
 ];
 let scenePromise;

 function script(source,globalName){
  if(window[globalName])return Promise.resolve();
  if(pending.has(source))return pending.get(source);
  const tag=document.createElement('script');
  tag.async=false;
  tag.src=source;
  const request=new Promise((resolve,reject)=>{
   function failed(){
    pending.delete(source);tag.remove();reject(new Error('Risorsa 3D non disponibile: '+source));
   }
   tag.onload=()=>{if(window[globalName])resolve();else failed();};
   tag.onerror=failed;
  });
  pending.set(source,request);
  document.head.append(tag);
  return request;
 }

 function releaseScript(file,globalName){
  return script('releases/9.36.1/'+file+'?v='+version,globalName);
 }

 function load(){
  if(scenePromise)return scenePromise;
  const three=script(engineUrl,'THREE');
  const geography=sceneModules.map(([file,globalName])=>releaseScript(file,globalName));
  const engine=three.then(()=>script('render-engine.js?v=9.23.0','SudamericaRender8'));
  scenePromise=Promise.all([engine,...geography])
   .then(()=>releaseScript('world-neighbors.js','WorldNeighbors'))
   .catch(error=>{scenePromise=null;throw error;});
  return scenePromise;
 }

 window.SceneAssets=Object.freeze({load});
})();
