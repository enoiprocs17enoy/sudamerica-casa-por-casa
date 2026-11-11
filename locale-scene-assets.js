/* Download and parse 3D-only geography only when a visitor enters a city. */
(function(){'use strict';
 const version='9.6.0-static1',loaded=new Map();
 const legacyCache=new Set(["world-biomes-data-0.js","world-biomes-data-1.js","world-biomes-data-2.js","world-biomes-data-3.js","world-biomes-data-4.js","world-biomes-data-5.js","world-biomes-data-6.js","world-biomes-data-7.js","world-biomes-data-8.js","world-biomes.js","world-geography.js"]);
 const files=[...Array.from({length:9},(_,i)=>'world-biomes-data-'+i+'.js'),'world-biomes.js','world-geography.js','releases/9.6.0/world-terrain.js','releases/9.6.0/world-forest.js','releases/9.6.0/world-neighbors.js'];
 function script(file){if(loaded.has(file))return loaded.get(file);const promise=new Promise((resolve,reject)=>{const tag=document.createElement('script');tag.async=false;tag.src=file+'?v='+(legacyCache.has(file)?'9.3.1':version);tag.onload=resolve;tag.onerror=()=>{loaded.delete(file);tag.remove();reject(new Error('Risorsa 3D non disponibile: '+file));};document.head.append(tag);});loaded.set(file,promise);return promise;}
 window.SceneAssets={load:()=>Promise.all(files.map(script))};
})();
