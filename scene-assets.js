/* Download and parse 3D-only geography only when a visitor enters a city. */
(function(){'use strict';
 const version='9.2.3',loaded=new Map();
 const files=[...Array.from({length:9},(_,i)=>'world-biomes-data-'+i+'.js'),'world-biomes.js','world-geography.js','releases/9.2.3/world-terrain.js','releases/9.2.3/world-forest.js','releases/9.2.3/world-neighbors.js'];
 function script(file){if(loaded.has(file))return loaded.get(file);const promise=new Promise((resolve,reject)=>{const tag=document.createElement('script');tag.async=false;tag.src=file+'?v='+version;tag.onload=resolve;tag.onerror=()=>{loaded.delete(file);tag.remove();reject(new Error('Risorsa 3D non disponibile: '+file));};document.head.append(tag);});loaded.set(file,promise);return promise;}
 window.SceneAssets={load:()=>Promise.all(files.map(script))};
})();
