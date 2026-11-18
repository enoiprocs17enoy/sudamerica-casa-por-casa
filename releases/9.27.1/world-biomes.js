/* Geographic substrate, independent of city names and country borders. */
(function(){'use strict';
function soften(input,n,step){let count=0;for(let i=0;i<input.length;i++)count+=input[i];if(count===0||count===255*input.length)return input;let a=Float32Array.from(input),b=new Float32Array(a.length);const radius=Math.max(1,Math.ceil(250/step)),width=radius*2+1;for(let pass=0;pass<3;pass++){for(let z=0;z<n;z++){const off=z*n;let sum=0;for(let x=-radius;x<=radius;x++)sum+=a[off+Math.max(0,Math.min(n-1,x))];for(let x=0;x<n;x++){b[off+x]=sum/width;sum+=a[off+Math.min(n-1,x+radius+1)]-a[off+Math.max(0,x-radius)];}}for(let x=0;x<n;x++){let sum=0;for(let z=-radius;z<=radius;z++)sum+=b[Math.max(0,Math.min(n-1,z))*n+x];for(let z=0;z<n;z++){a[z*n+x]=sum/width;sum+=b[Math.min(n-1,z+radius+1)*n+x]-b[Math.max(0,z-radius)*n+x];}}}return Uint8Array.from(a,x=>Math.round(x));}
// Unwrap each ring continuously BEFORE shifting the whole polygon near the
// observer. Wrapping vertices separately stretched antipodal polygons across
// the observer's city (e.g. Australia's Central Ranges across São Paulo).
let indexedSource=null,index=[];
function regions(){const source=window.WORLD_PHYSICAL_REGIONS||[];if(source===indexedSource)return index;indexedSource=source;index=[];
 for(const region of source){if(region.type!=='Desert'&&region.type!=='Tundra')continue;
  for(const polygon of region.polygons){if(!polygon.length||polygon[0].length<3)continue;let outerCenter;
   const rings=polygon.map((ring,ri)=>{let previous=ring[0][0];const points=ring.map(([lng,lat],i)=>{if(i)lng+=360*Math.round((previous-lng)/360);previous=lng;return [lng,lat];});let min=Math.min(...points.map(p=>p[0])),max=Math.max(...points.map(p=>p[0]));const center=(min+max)/2;if(ri===0)outerCenter=center;else{const shift=360*Math.round((outerCenter-center)/360);for(const p of points)p[0]+=shift;}return points;});
   const outer=rings[0];index.push({type:region.type,rings,minLng:Math.min(...outer.map(p=>p[0])),maxLng:Math.max(...outer.map(p=>p[0])),minLat:Math.min(...outer.map(p=>p[1])),maxLat:Math.max(...outer.map(p=>p[1]))});
  }
 }return index;
}
function raster(city,n,extent){const arid=new Uint8Array(n*n),cold=new Uint8Array(n*n),step=extent*2/n,cos=Math.max(.02,Math.cos(city.lat*Math.PI/180)),longitudeScale=111320*cos,dy=extent/111320;
 for(const polygon of regions()){
  if(polygon.minLat>city.lat+dy||polygon.maxLat<city.lat-dy)continue;
  const center=(polygon.minLng+polygon.maxLng)/2,shift=360*Math.round((city.lng-center)/360);
  if((polygon.minLng+shift-city.lng)*longitudeScale>extent||(polygon.maxLng+shift-city.lng)*longitudeScale< -extent)continue;
  // Hole subtraction is local to this polygon; it must never erase an
  // overlapping, independent ecoregion already added to the output.
  const fill=new Uint8Array(n*n),array=polygon.type==='Tundra'?cold:arid;
  for(let ri=0;ri<polygon.rings.length;ri++){
   const r=polygon.rings[ri].map(([lng,lat])=>({x:(lng+shift-city.lng)*longitudeScale,z:-(lat-city.lat)*111320}));
   const minZ=Math.min(...r.map(p=>p.z)),maxZ=Math.max(...r.map(p=>p.z));
   for(let row=Math.max(0,Math.floor((minZ+extent)/step));row<Math.min(n,Math.ceil((maxZ+extent)/step));row++){
    const z=-extent+(row+.5)*step,hits=[];for(let i=0,j=r.length-1;i<r.length;j=i++){const a=r[j],b=r[i];if((a.z>z)!==(b.z>z))hits.push(a.x+(z-a.z)*(b.x-a.x)/(b.z-a.z));}
    hits.sort((a,b)=>a-b);for(let i=0;i+1<hits.length;i+=2){const a=Math.max(0,Math.ceil((hits[i]+extent)/step-.5)),b=Math.min(n-1,Math.floor((hits[i+1]+extent)/step-.5));if(b>=a)fill.fill(ri?0:255,row*n+a,row*n+b+1);}
   }
  }
  for(let i=0;i<fill.length;i++)if(fill[i])array[i]=255;
 }
 return{arid:soften(arid,n,step),cold:soften(cold,n,step)};
}
window.WorldBiomes={raster};
})();
