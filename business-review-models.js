(function(){'use strict';
const shopPurchases=[];let group,shopDetailMeshes=[],progress;
const rnd=n=>{const x=Math.sin(n*127.13+19.1)*43758.5453;return x-Math.floor(x)};
const houseTier=p=>p,shopProgressFor=()=>progress,districtStyle=()=> 'centro',facadeAngle=()=>0;

function coordinatedHouseColor(wall,other,amount){
 return new THREE.Color(wall).lerp(new THREE.Color(other),amount).getHex();
}

const shopStyles=[
  {name:'Caffetteria',walls:0xd9a77b,trim:0x704d39,glass:0x7ec6d9},
  {name:'Supermercato',walls:0xb5c7d1,trim:0x397e91,glass:0x94d8e9},
  {name:'Ristorante',walls:0xd9a2a5,trim:0x9e4649,glass:0x8fc0dc},
  {name:'Libreria',walls:0xbca8d9,trim:0x665494,glass:0xb1dbec},
  {name:'Farmacia',walls:0xe0e7d6,trim:0x57966a,glass:0x96d5d5},
  {name:'Negozio di moda',walls:0xd9bb91,trim:0x2f6877,glass:0x90d7e9},
  {name:'Officina',walls:0x9cafa8,trim:0x4f6860,glass:0x83b7c3},
  {name:'Panetteria',walls:0xf0c6a3,trim:0xb16a3f,glass:0xb6e0e5},
  {name:'Cinema',walls:0x7c9fb7,trim:0x394d76,glass:0x91c2de},
  {name:'Palestra',walls:0xb2c4a2,trim:0x4d785a,glass:0x96d8e2},
  {name:'Hotel',walls:0xd7c8b3,trim:0x987554,glass:0x8ab5cc},
  {name:'Mercato',walls:0xe0bca6,trim:0x9b624e,glass:0x8ed3d2}
];
function drawShops(){
  const box=new THREE.BoxGeometry(1,1,1),dummy=new THREE.Object3D(),batches=new Map();
  const disc=new THREE.CylinderGeometry(.5,.5,1,24);
  disc.rotateX(Math.PI/2);
  const dressShape=new THREE.Shape();
  dressShape.moveTo(-.26,.64);
  dressShape.lineTo(.26,.64);
  dressShape.lineTo(.18,.17);
  dressShape.lineTo(.58,-.64);
  dressShape.lineTo(-.58,-.64);
  dressShape.lineTo(-.18,.17);
  dressShape.closePath();
  const dress=new THREE.ExtrudeGeometry(dressShape,{depth:.12,bevelEnabled:false});
  dress.translate(0,0,-.06);
  const sculpt=new THREE.SphereGeometry(.5,20,12);
  const bar=new THREE.CylinderGeometry(.5,.5,1,16);
  bar.rotateZ(Math.PI/2);
  const cup=new THREE.CylinderGeometry(.5,.34,1,20);
  const handle=new THREE.TorusGeometry(.32,.10,8,18);
  const furnitureRound=new THREE.CylinderGeometry(.5,.5,1,12);
  const libraryDome=new THREE.SphereGeometry(.5,16,8,0,Math.PI*2,0,Math.PI/2);
  const pizzaRoofShape=new THREE.Shape();
  pizzaRoofShape.moveTo(-.5,-.5);pizzaRoofShape.lineTo(.5,-.5);pizzaRoofShape.lineTo(0,.5);pizzaRoofShape.closePath();
  const pizzaGable=new THREE.ExtrudeGeometry(pizzaRoofShape,{depth:1,bevelEnabled:false});pizzaGable.translate(0,0,-.5);
  // Keep the exact triangle order while using the indexed instancing path.
  pizzaGable.setIndex(Array.from({length:pizzaGable.attributes.position.count},(_,index)=>index));
  const furnitureSoft=new THREE.SphereGeometry(.5,8,6);
  const structuralKinds=new Set(['evolutionSignatureHall','evolutionSignatureHallWindow','evolutionSignatureHallSide','evolutionEntranceCanopy','evolutionEntranceColumn','evolutionUpperWindow','evolutionSideWindow','evolutionRoofTerrace','evolutionTerraceRail','evolutionTerraceSideRail','evolutionTerracePavilion','evolutionTerracePavilionPost','evolutionGrandEntrance','evolutionGrandPier','cafeCupSign','cafeHandleSign','pizzaDiscSign','pizzaSauceSign','pizzaToppingSign','tradeMark','tradeRound','tradeDress','tradeSculpt','tradeBar','shopPaving','shopUpperBody','shopUpperGlass','shopUpperCap','body','roof','hotelRoof','cinemaRoof',
      'garageRoof','superRoof','displayGlass','entryDoor','entryDoorGlass',
      'signFascia','signInset','garageGate','cinemaParapet','hotelUpperWindow']);
  for(const kind of ['cinemaPremiereCanopy','cinemaPremiereColumn','cinemaPremiereFascia','cinemaPosterCase','cinemaPosterArtwork','cinemaTicketBooth','cinemaTicketGlass','hotelBalcony','hotelBalconyGlass','hotelBalconyRail','hotelBalconySideRail','hotelPoolBase','hotelPoolWater','hotelRoofGuard','hotelRoofGuardCap','marketServiceDoor','marketGable','marketHallPost','bakeryGable','workshopDaylightRoof','pharmacyWingRoof','fashionTerraceDeck','fashionBalustrade','superClerestory','libraryDome','libraryDrum','gymVault','pizzaGable','diningTerraceDeck','diningBalustrade','diningTerraceAwning'])structuralKinds.add(kind);
  function put(kind,color,shop,x,y,z,w,h,d){
    // Preserve low-cost architecture at all zoom levels. Decorative pieces
    // are spatially batched so only the visible nearby shops are detailed.
    const detailed=!structuralKinds.has(kind);
    const cx=shop?Math.floor(shop.x/90):0,cz=shop?Math.floor(shop.z/90):0;
    const geometry=kind==='pizzaGable'||kind==='bakeryGable'||kind==='marketGable'?pizzaGable:kind==='libraryDome'||kind==='gymVault'?libraryDome:kind==='libraryDrum'?furnitureRound:kind==='cafeCupSign'?cup:kind==='cafeHandleSign'?handle:
      kind==='shopRoundFurniture'?furnitureRound:(kind==='shopSoftFurniture'||kind==='shopUmbrellaCanopy')?furnitureSoft:
      kind==='tradeDress'||kind==='fashionShowroomDress'?dress:kind==='tradeSculpt'?sculpt:kind==='tradeBar'?bar:
      kind.startsWith('pizza')||kind==='tradeRound'?disc:box;
    const casts=/^(cinemaPremiereCanopy|cinemaPremiereColumn|cinemaTicketBooth|hotelBalcony|hotelPoolBase|hotelSunbedFrame|marketServiceDoor|marketGable|marketHallPost|bakeryGable|workshopDaylightRoof|pharmacyWingRoof|fashionTerraceDeck|fashionBalustrade|superClerestory|body|libraryDome|libraryDrum|gymVault|pizzaGable|diningTerraceDeck|diningBalustrade|diningTerraceAwning|shopUpperBody|shopUpperCap|roof|cinemaRoof|hotelRoof|superRoof|garageRoof|evolutionSignatureHall|evolutionEntranceCanopy|evolutionEntranceColumn|evolutionRoofTerrace|evolutionTerracePavilion|evolutionGrandEntrance|evolutionGrandPier|shopForecourtDetail|shopRoundFurniture|shopUmbrellaCanopy)$/.test(kind);
    const receives=casts||kind==='shopPaving';
    const glow=kind==='cinemaPremiumBulb';
    const key=[geometry.id,casts,receives,detailed?cx:'all',detailed?cz:'all',glow].join(':');
    if(!batches.has(key))batches.set(key,{geo:geometry,casts,receives,glow,entries:[],detailed,
      chunk:{x:(cx+.5)*90,z:(cz+.5)*90}});
    let rotation=0;
    if(shop){rotation=facadeAngle(shop);
      const dx=x-shop.x,dz=z-shop.z,ca=Math.cos(rotation),sa=Math.sin(rotation);
      x=shop.x+dx*ca+dz*sa;z=shop.z-dx*sa+dz*ca;
    }
    batches.get(key).entries.push({shop,color,x,y,z,w,h,d,rotation});
  }
  function furnishBusiness(shop,shape,stage,premium,w,d,height,trim,glass,serviceRear){
    const x=shop.x,front=shop.z+d/2,cream=0xf3e4c9,wood=0xb98350,metal=0x374b53;
    const part=(kind,color,dx,y,dz,a,b,c)=>put(kind,color,shop,x+dx,y,front+dz,a,b,c);
    const box=(color,dx,y,dz,a,b,c)=>part('shopForecourtDetail',color,dx,y,dz,a,b,c);
    const round=(color,dx,y,dz,a,b,c)=>part('shopRoundFurniture',color,dx,y,dz,a,b,c);
    const soft=(color,dx,y,dz,a,b,c)=>part('shopSoftFurniture',color,dx,y,dz,a,b,c);
    function chair(dx,dz,side,color=wood,y=0){
      box(color,dx,y+.55,dz,.53,.13,.58);
      box(color,dx,y+.88,dz+side*.26,.53,.62,.10);
      for(const a of [-1,1])for(const b of [-1,1])box(metal,dx+a*.20,y+.28,dz+b*.21,.055,.50,.055);
    }
    function table(dx,dz,dining,y=0){
      if(dining){box(cream,dx,y+1.04,dz,1.34,.12,1.12);box(trim,dx,y+.77,dz,1.37,.43,1.15);}
      else round(wood,dx,y+1.04,dz,1.12,.12,1.12);
      round(metal,dx,y+.57,dz,.13,.86,.13);round(metal,dx,y+.17,dz,.58,.08,.58);
      chair(dx,dz-.87,-1,dining?0x88534b:wood,y);chair(dx,dz+.87,1,dining?0x88534b:wood,y);
      if(dining){
        for(const side of [-1,1]){round(0xfffbef,dx,y+1.13,dz+side*.30,.37,.035,.37);box(metal,dx+.25,y+1.14,dz+side*.30,.04,.025,.28);}
        round(0x8a6950,dx,y+1.20,dz,.14,.25,.14);soft(0x6c974a,dx,y+1.39,dz,.27,.22,.27);
      }else{round(cream,dx,y+1.17,dz,.16,.21,.16);round(0x563b2d,dx,y+1.28,dz,.13,.018,.13);}
    }
    function car(dx,dz,color){
      box(metal,dx,.30,dz,1.25,.35,2.35);box(color,dx,.66,dz,1.30,.48,2.42);
      box(glass,dx,.99,dz-.10,1.06,.44,1.22);box(color,dx,1.23,dz-.10,1.12,.10,1.30);
      for(const side of [-1,1])for(const end of [-1,1])soft(0x273039,dx+side*.66,.36,dz+end*.76,.22,.61,.61);
      for(const side of [-1,1])box(0xffedbc,dx+side*.39,.66,dz+1.23,.22,.15,.035);
    }
    // Early buildings also have a working rear facade. Later stages already
    // have category-specific rear annexes, loading bays and glazed halls.
    if(stage<2||shape===8){
      const rear=shape===8?serviceRear-front:-d;
      if(shape===1||shape===6){
        part('garageGate',0x63787c,0,1.38,rear-.10,w*.29,2.65,.16);
        for(let rib=0;rib<6;rib++)box(0xabc0c1,0,.40+rib*.40,rear-.20,w*.28,.045,.04);
        for(const side of [-1,1])part('displayGlass',glass,side*w*.32,3.16,rear-.08,w*.20,.61,.12);
      }else{
        const exits=shape===8?[-.62,.62]:[0];
        for(const dx of exits){
          part('entryDoor',trim,dx,1.14,rear-.09,1.22,2.14,.14);
          part('entryDoorGlass',shape===8?0x485463:glass,dx,1.35,rear-.19,.99,1.54,.06);
          box(metal,dx+(shape===8?0:.40),1.08,rear-.25,shape===8?.76:.045,shape===8?.065:.27,.06);
        }
        if(shape!==8&&shape!==9&&!(premium&&shape===10))for(const side of [-1,1]){
          part('displayGlass',glass,side*w*.29,2.08,rear-.08,w*.20,1.18,.13);
          box(cream,side*w*.29,1.45,rear-.16,w*.22,.12,.24);
        }
        if([0,2,7].includes(shape)){
          box(0x9faeab,0,2.75,rear-.23,.95,.37,.42);
          for(const slat of [-.30,0,.30])box(metal,slat,2.76,rear-.46,.035,.23,.03);
        }
      }
    }
    // These forecourts stay inside the fixed20.5m x45m parcel. Each trade
    // uses recognisable equipment rather than the same display rectangles.
    const dining=shape===2,pizzeria=dining&&shop.id%24===14;
    if(shape===0||dining){
      if(stage>=1){
        const rows=Math.min(dining?4:3,1+Math.floor(stage/2)),pitch=2.7;
        part('shopPaving',dining?0xd1b19c:0xc3a580,0,.12,7.5,Math.min(17.8,w+1),.12,12);
        for(let row=0;row<rows;row++)for(const side of [-1,1]){
          const dx=side*Math.min(3.35,w*.26),dz=3.9+row*pitch;table(dx,dz,dining);
          if(pizzeria){round(0xc38b48,dx,1.135,dz,.54,.035,.54);round(0xd15c36,dx,1.16,dz,.43,.02,.43);}
          if(premium&&row%2===1){round(metal,dx+.78,1.78,dz,.055,3.02,.055);box(metal,dx+.39,3.08,dz,.83,.06,.06);part('shopUmbrellaCanopy',trim,dx,3.23,dz,2.15,.28,2.15);}
        }
      }
      if(stage>=4)for(const side of [-1,1])table(side*w*.25,-d*.14,dining,5.22);
    }else if(shape===1){
      // Produce islands and a dedicated cart corral, not restaurant tables.
      for(let rack=0;rack<Math.min(4,1+Math.floor(stage/2));rack++){
        const dx=(rack%2?1:-1)*w*.28,dz=4.6+Math.floor(rack/2)*2.5;
        box(wood,dx,.58,dz,1.48,1.05,1.10);
        for(let row=0;row<2;row++)for(let col=0;col<4;col++)soft(row?0xe6ae43:0x779e43,dx+(col-1.5)*.29,1.17,dz+(row-.5)*.42,.30,.29,.31);
      }
      if(stage>=1)for(let cart=0;cart<Math.min(4,stage+1);cart++){
        const dx=-w*.31+cart*.52,dz=8.4;box(metal,dx,.38,dz,.68,.08,.92);
        for(const side of [-1,1]){box(trim,dx+side*.32,.84,dz,.055,.68,.83);box(trim,dx,.98,dz+side*.40,.68,.07,.055);}
        for(const side of [-1,1])for(const end of [-1,1])soft(metal,dx+side*.27,.25,dz+end*.33,.16,.23,.23);
      }
    }else if(shape===3){
      // Reading garden: book spines belong here, and nowhere else.
      for(let bay=0;bay<Math.min(3,1+Math.floor(stage/2));bay++){
        const dx=(bay-1)*w*.27,dz=5.6;
        box(wood,dx,.55,dz,1.15,.14,.56);box(trim,dx,.88,dz-.24,1.15,.62,.10);
        for(const side of [-1,1])box(metal,dx+side*.43,.29,dz,.08,.52,.40);
        if(stage>=2){box(wood,dx,1.15,dz+2.0,1.16,2.05,.45);for(let shelf=0;shelf<3;shelf++){
          box(cream,dx,.54+shelf*.57,dz+2,1.17,.07,.48);
          for(let book=0;book<5;book++)box([0x638a91,0xc17358,0xc1a761][book%3],dx+(book-2)*.19,.80+shelf*.57,dz+2.13,.14,.42,.17);
        }}
      }
      if(stage>=4)for(const side of [-1,1])table(side*w*.25,-d*.26,false,height+.275);
    }else if(shape===4){
      // Accessible approach, illuminated medicine collection lockers.
      box(0xd4ddd7,0,.16,3.3,2.35,.25,4.2);
      for(const side of [-1,1]){box(metal,side*1.10,.72,3.3,.07,.07,4.0);for(const dz of [1.5,3.3,5.1])box(metal,side*1.10,.41,dz,.06,.59,.06);}
      if(stage>=1)for(const side of [-1,1]){box(cream,side*w*.32,1.13,7.0,1.05,2.05,.53);for(let row=0;row<3;row++)for(let col=0;col<2;col++)box(trim,side*w*.32+(col-.5)*.45,.50+row*.55,7.29,.40,.48,.04);}
    }else if(shape===5){
      // Mannequins and clothes rails outside the boutique.
      for(let rack=0;rack<Math.min(3,1+Math.floor(stage/2));rack++){
        const dx=(rack-1)*w*.28,dz=5.2;
        for(const side of [-1,1])box(metal,dx+side*.65,1.12,dz,.07,2.05,.07);
        box(metal,dx,2.13,dz,1.39,.08,.08);
        for(let garment=0;garment<3;garment++)part('tradeDress',[0xd57888,0x78a4b2,0xd8bc68][garment],dx+(garment-1)*.38,1.56,dz,.43,.69,.30);
      }
      if(stage>=2)for(const side of [-1,1]){round(cream,side*w*.31,.15,8.0,.82,.12,.82);soft(cream,side*w*.31,1.83,8.0,.30,.36,.30);box(trim,side*w*.31,1.30,8.0,.42,.65,.22);}
    }else if(shape===6){
      // Service bays with cars, tool cabinets and marked parking.
      for(let bay=0;bay<Math.min(3,1+Math.floor(stage/3));bay++){
        const dx=(bay-1)*w*.27,dz=5.5;part('shopPaving',0x6e7b80,dx,.11,dz,3.15,.10,4.2);car(dx,dz,[0xb85e55,0xd8bb63,0x7b9bac][bay]);
        if(stage>=2){box(0xc47843,dx-1.1,1.0,dz-.8,.43,1.7,.58);for(let drawer=0;drawer<4;drawer++)box(metal,dx-1.1,.5+drawer*.3,dz-.49,.32,.035,.04);}
      }
    }else if(shape===7){
      // Bread is rounded and golden; displays cannot be mistaken for books.
      for(let stall=0;stall<Math.min(3,1+Math.floor(stage/2));stall++){
        const dx=(stall-1)*w*.28,dz=5.3;box(wood,dx,.70,dz,1.48,1.24,1.0);
        for(let loaf=0;loaf<5;loaf++)soft(loaf%2?0xc5863e:0xe4b769,dx+(loaf-2)*.23,1.43,dz,.22,.23,.74);
        if(stage>=2){box(trim,dx,2.45,dz,1.72,.15,1.3);for(const side of [-1,1])box(wood,dx+side*.72,1.68,dz,.08,1.47,.08);}
      }
    }else if(shape===8){
      // Red-carpet approach, ticket booths and velvet-rope queues.
      part('shopPaving',0x9a3e49,0,.13,6.7,w*.46,.12,7.5);
      for(const side of [-1,1]){
        for(let post=0;post<2+Math.min(stage,3);post++){const dz=3.4+post*1.2;round(0xc8ad72,side*w*.25,.77,dz,.075,1.28,.075);soft(0xd8bb78,side*w*.25,1.46,dz,.19,.19,.19);if(post)box(0x9a3e49,side*w*.25,1.27,dz-.60,.07,.07,1.2);}
        if(premium){
          const boothX=side*w*.36,boothZ=6.0;
          part('cinemaTicketBooth',trim,boothX,1.43,boothZ,1.52,2.60,1.35);
          box(0xe7bc68,boothX,2.84,boothZ,1.75,.22,1.56);
          part('cinemaTicketGlass',glass,boothX,1.83,boothZ+.73,1.27,1.06,.08);
          box(cream,boothX,1.22,boothZ+.82,1.40,.13,.32);
          box(0x273b50,boothX,1.40,boothZ+.91,.32,.20,.10);
          box(0xffe8b4,boothX,1.41,boothZ+.975,.24,.11,.03);
          part('cinemaPremiumBulb',0xffda83,boothX,2.55,boothZ+.74,1.10,.13,.06);
          for(const edge of [-1,1])box(0xe7bc68,boothX+edge*.65,1.54,boothZ+.74,.08,2.12,.10);
        }else if(stage>=1){box(trim,side*w*.36,1.28,6.0,1.26,2.2,1.12);box(glass,side*w*.36,1.64,6.58,.96,.60,.06);box(cream,side*w*.36,2.49,6.0,1.48,.20,1.36);}
      }
    }else if(shape===9){
      // Outdoor workout stations: weights and pull-up bars.
      for(let station=0;station<Math.min(3,1+Math.floor(stage/2));station++){
        const dx=(station-1)*w*.28,dz=5.6;box(0x577d78,dx,.12,dz,2.12,.10,3.3);
        box(metal,dx,1.10,dz,1.5,.10,.10);for(const side of [-1,1])part('tradeBar',0x34434b,dx+side*.61,1.1,dz,.15,.55,.55);
        if(stage>=2){for(const side of [-1,1])box(trim,dx+side*.87,1.66,dz+1.18,.13,3.05,.13);box(metal,dx,3.20,dz+1.18,1.88,.13,.13);}
      }
    }else if(shape===10){
      // A hotel arrival court with luggage trolleys and valet cars.
      for(const side of [-1,1]){
        round(0x416d51,side*w*.34,.65,4.8,1.12,1.05,1.12);soft(0x719249,side*w*.34,1.34,4.8,1.30,1.10,1.30);
        if(stage>=1){box(0xc9ac68,side*1.25,.30,5.7,.70,.10,1.06);for(const post of [-1,1])box(0xc9ac68,side*1.25+post*.32,1.08,5.7,.055,1.52,.06);box(0xb07a4d,side*1.25,.68,5.7,.59,.58,.60);}
        if(stage>=3)car(side*w*.31,9.0,premium?0x3e4d61:0x9c7c67);
      }
    }else if(shape===11){
      // Separate striped market stalls with fruit, rather than an empty hall.
      for(let stall=0;stall<Math.min(4,1+Math.floor(stage/2));stall++){
        const dx=(stall%2?1:-1)*w*.26,dz=4.7+Math.floor(stall/2)*3.4;
        box(wood,dx,.63,dz,2.55,1.12,1.40);
        for(const side of [-1,1])box(wood,dx+side*1.17,1.55,dz,.10,2.80,.10);
        for(let stripe=0;stripe<6;stripe++)box(stripe%2?cream:trim,dx+(stripe-2.5)*.47,2.93,dz,.47,.17,2.08);
        for(let item=0;item<7;item++)soft(item%2?0xdca848:0x719a48,dx+(item-3)*.30,1.34,dz,.37,.32,.48);
      }
    }
  }
  for(const shop of shopPurchases){
    const style=shopStyles[shop.id%shopStyles.length];
    const seed=shop.id,district=districtStyle(shop.block);
    const shape=shop.id%shopStyles.length;
    const isPizzeria=shape===2&&shop.id%24===14;
    const progress=shopProgressFor(shop);
    const stage=houseTier(progress.points);
    const growth=[0,.25,.52,.68,.79,.88,.95,1][stage];
    const width=[7.2,14.5,12.2,8.5,8.1,6.4,12.9,7.7,16.2,12.8,11.4,13.1][shape]*(.87+rnd(seed*31+8)*.16)*(isPizzeria?.88:1);
    const depth=[7.4,12.9,9.4,9.4,7.4,6.8,11.6,7.9,14.2,11.2,10.5,9.4][shape]*(.9+rnd(seed*37+3)*.12)*(isPizzeria?.94:1);
    const widthGrowth=[.76,.15,.28,.64,.42,.80,.24,.57,.12,.30,.23,.22][shape];
    const depthGrowth=[.78,.44,.62,.67,.54,.65,.51,.68,.34,.56,.38,.62][shape];
    const heightGrowth=[.27,.26,.23,.52,.29,.36,.22,.33,.32,.29,.12,.22][shape];
    const w=shape===11?Math.min(17,width*[.58,.72,.86,1,1.12,1.23,1.33,1.44][stage]):shape===7?Math.min(16,width*[.72,.84,.98,1.12,1.28,1.42,1.58,1.75][stage]):shape===6?Math.min(17,width*[.68,.77,.88,1,1.08,1.16,1.23,1.31][stage]):shape===1?Math.min(17,width*[.65,.76,.88,.98,1.06,1.12,1.20,1.27][stage]):stage?Math.min(shape===2?14.5:17,width*(1+growth*widthGrowth)):width;
    const d=shape===11?depth*[.70,.86,1.03,1.22,1.42,1.63,1.85,2.08][stage]:shape===7?depth*[.80,.94,1.08,1.24,1.40,1.56,1.73,1.92][stage]:shape===6?depth*[.76,.87,1,1.10,1.21,1.33,1.45,1.57][stage]:shape===1?depth*[.75,.88,1,1.10,1.20,1.30,1.40,1.50][stage]:depth*(1+growth*depthGrowth);

    const baseHeight=[4.2,5.1,5.2,6.4,4.7,4.0,5.0,4.5,9.0,6.8,4.6,4.3][shape]
      *(.88+rnd(seed*41+2)*.22)*(district==='centro'?1.08:1)*(isPizzeria?.90:1);
    const diningProfiles={0:[4.2,4.6,5.2,7.4,8.7,10.1,11.8,13.8],2:[5.2,5.8,6.8,8.8,10.8,13,15.8,19]};
    const height=shape===11?[4.3,4.6,5,5.5,6.1,6.8,7.6,8.6][stage]*(baseHeight/4.3):shape===7?[4.5,5,5.8,6.8,7.9,9.2,10.7,12.5][stage]*(baseHeight/4.5):shape===6?[5,5.3,5.8,6.4,7.1,8,9.1,10.4][stage]*(baseHeight/5):shape===4?[4.7,5.1,5.8,7.5,9.1,11.1,13.6,16.7][stage]*(baseHeight/4.7):shape===5?[4,4.5,5.3,8.5,10.6,13,16,20][stage]*(baseHeight/4):shape===1?[4.6,4.9,5.3,5.7,6.2,6.8,7.5,8.4][stage]*(baseHeight/5.1):diningProfiles[shape]?diningProfiles[shape][stage]*(baseHeight/diningProfiles[shape][0]):shape===10?[4.6,7.8,12,18,27,40,58,82][stage]*(baseHeight/4.6)*(progress.premium?1.18:1):shape===8?[9,9.8,11.2,12.8,14.6,16.8,19.4,23][stage]*(baseHeight/9):shape===3?[6.4,7.0,8.3,10.5,12.9,15.8,19.2,23][stage]*(baseHeight/6.4):shape===9?[6.8,7.2,8.0,9.1,10.5,12.2,14.3,17][stage]*(baseHeight/6.8):baseHeight*(1+growth*heightGrowth)+(stage>=3?2.8:0);

    const fashionAnnexHeight=Math.min(height*.83,stage>=5?7.3:5.1);
    const x=shop.x,z=shop.z;
    // Premium enriches finishes without changing the activity's base colour.
    const wallColor=style.walls;
    const paving=progress.premium?0xc7ad8b:[0xaba99f,0xb8b5a9,0x9ba9a8][seed%3];
    const front=z+d/2, trim=style.trim, glass=style.glass;
    const diningUpper=(shape===0||shape===2)&&stage>=3;
    const marketHall=shape===11&&stage>=2;
    const bakerySplit=shape===7&&stage>=3;
    const industrialSplit=shape===6&&stage>=3;
    const fashionUpper=shape===5&&stage>=3,steppedPharmacy=shape===4&&stage>=3;
    const recessedUpper=diningUpper||fashionUpper||bakerySplit;
    const upperWidth=w*(bakerySplit?1:shape===5?.90:shape===0?(stage>=7?.86:stage>=5?.80:.72):(stage>=7?.93:stage>=5?.89:.83));
    const upperDepth=d*(bakerySplit?.60:fashionUpper?.70:.68),upperZ=z-(d-upperDepth)/2,upperFront=upperZ+upperDepth/2;
    // The cup bracket starts .46m above this reference, on the5.40m terrace surface.
    const signRoof=marketHall?height+.30:bakerySplit?5.2:industrialSplit?height*.78:diningUpper?5.40-.46:fashionUpper?5.09-.46:height;
    put('shopPaving',paving,shop,x,.055,z,17.7,.06,17.5);
    if(marketHall){
      // Covered market with two rows of shops and an unobstructed central aisle.
      const pavilionHeight=height*(stage>=4?.76:.66),pavilionFront=z+d*.42;
      for(const side of [-1,1]){
        const sx=x+side*w*.36;
        put('body',wallColor,shop,sx,pavilionHeight/2,z-d*.04,w*.28,pavilionHeight,d*.92);
        put('roof',trim,shop,sx,pavilionHeight+.13,z-d*.04,w*.28+.12,.26,d*.92+.12);
        put('displayGlass',glass,shop,sx,1.80,pavilionFront+.08,w*.20,2.30,.16);
        put('shopForecourtDetail',0x9d7048,shop,sx,.78,pavilionFront+.24,w*.20,.85,.18);
        for(let fruit=0;fruit<5;fruit++)put('shopSoftFurniture',fruit%2?0xdab750:0x8fbd52,shop,sx+(fruit-2)*w*.035,1.27,pavilionFront+.36,.25,.23,.25);
        for(const bay of [-.43,0,.43])put('marketHallPost',trim,shop,x+side*w*.47,height/2,z+bay*d,.20,height,.20);
        if(stage>=4)for(const bay of [-.28,0,.28])put('displayGlass',glass,shop,x+side*(w/2+.08),pavilionHeight-.70,z+bay*d,.16,.80,d*.19);
      }
      put('body',wallColor,shop,x,height*.35,z-d*.42,w,height*.70,d*.16);
      put('roof',trim,shop,x,height*.70+.13,z-d*.42,w+.16,.26,d*.16+.16);
      put('marketServiceDoor',trim,shop,x,1.35,z-d/2-.09,1.90,2.60,.18);
      put('displayGlass',glass,shop,x,1.70,z-d/2-.20,1.45,1.30,.06);
      for(let level=2.10;level+.70<height*.70;level+=2.60)for(const side of [-1,1])
        put('displayGlass',glass,shop,x+side*w*.31,level,z-d/2-.08,w*.20,1.30,.16);
    }else if(bakerySplit){
      // A low shop and cafe frontage joins the taller baking and preparation hall.
      put('body',wallColor,shop,x,2.60,z+d*.30,w,5.20,d*.40);
      put('body',wallColor,shop,x,height/2,upperZ,w,height,upperDepth);
      for(const side of [-1,1]){
        put('displayGlass',glass,shop,x+side*(w/2+.08),2.45,z+d*.30,.16,1.75,d*.23);
        for(let level=6.45;level+.80<height;level+=3.10){
          for(const bay of [-.25,.25])put('displayGlass',glass,shop,x+side*(w/2+.08),level,upperZ+bay*upperDepth,.16,1.55,upperDepth*.31);
          for(const bay of [-1,0,1]){
            if(side<0&&level-.775<=height*.59+.30)continue;
            put('displayGlass',glass,shop,x+bay*w*.29,level,upperZ+side*(upperDepth/2+.08),w*.21,1.55,.16);
          }
        }
      }
    }else if(industrialSplit){
      put('body',wallColor,shop,x,height*.39,z,w*.22,height*.78,d);
      put('garageRoof',trim,shop,x,height*.78+.25,z,w*.22+.16,.50,d+.26);
      for(const side of [-1,1]){
        const hallHeight=height*(side<0?.90:1),hallX=x+side*w*.305;
        put('body',wallColor,shop,hallX,hallHeight/2,z,w*.39,hallHeight,d);
        put('garageRoof',trim,shop,hallX,hallHeight+.25,z,w*.39+.16,.50,d+.26);
        if(stage>=4){
          put('workshopDaylightRoof',glass,shop,hallX,hallHeight+.99,z-d*.05,w*.23,.98,d*.62);
          put('garageRoof',trim,shop,hallX,hallHeight+1.54,z-d*.05,w*.25,.12,d*.64);
        }
        if(stage>=5)for(const bay of [-.30,0,.30])put('displayGlass',glass,shop,x+side*(w/2+.08),hallHeight-.95,z+bay*d,.16,1.05,d*.21);
        if(hallHeight>6.4)put('displayGlass',glass,shop,hallX,hallHeight-1,front+.08,w*.27,.95,.16);
      }
      if(height*.78>6.3)put('displayGlass',glass,shop,x,height*.78-.85,front+.08,w*.15,.85,.16);
    }else if(steppedPharmacy){
      // Health and consultation wings share the original pharmacy, growing as complete rooms.
      put('body',wallColor,shop,x,height/2,z,w*.58,height,d);
      for(const side of [-1,1]){
        const wingHeight=Math.max(5.30,height*(side<0?(stage>=5?.84:.72):(stage>=6?.91:.65)));
        put('body',wallColor,shop,x+side*w*.395,wingHeight/2,z,w*.21,wingHeight,d);
        put('pharmacyWingRoof',trim,shop,x+side*w*.395,wingHeight+.23,z,w*.21+.16,.46,d+.26);
        for(let level=6.45;level+.80<wingHeight;level+=3.10){
          for(const bay of [-.30,0,.30])put('displayGlass',glass,shop,x+side*(w/2+.08),level,z+bay*d,.16,1.55,d*.20);
          for(const face of [-1,1])if(face>0||level-.775>height*.63+.30)put('displayGlass',glass,shop,x+side*w*.395,level,z+face*(d/2+.08),w*.14,1.55,.16);
        }
      }
      for(let level=6.45;level+.80<height;level+=3.10)for(const face of [-1,1])for(const bay of [-1,0,1]){
        if(face<0&&level-.775<=height*.63+.30)continue;
        put('displayGlass',glass,shop,x+bay*w*.17,level,z+face*(d/2+.08),w*.125,1.55,.16);
        put('body',0xe4eee0,shop,x+bay*w*.17,level-.86,z+face*(d/2+.15),w*.145,.13,.22);
      }
    }else if(fashionUpper){
      put('body',wallColor,shop,x,2.45,z,w,4.90,d);
      put('body',wallColor,shop,x,(height+4.90)/2,upperZ,upperWidth,height-4.90,upperDepth);
      put('fashionTerraceDeck',0xd1bda5,shop,x,4.99,front-d*.15,w+.12,.20,d*.30);
      if(stage>=4){
        put('fashionBalustrade',trim,shop,x,5.99,front-.12,w*.96,.10,.10);
        for(const side of [-1,1]){
        put('fashionBalustrade',trim,shop,x+side*w*.48,5.99,front-d*.15,.10,.10,d*.30);
        for(const bay of [-.42,-.21,0,.21,.42])put('fashionBalustrade',trim,shop,x+bay*w,5.54,front-.12,.06,.85,.06);
        for(const bay of [.05,.15,.25])put('fashionBalustrade',trim,shop,x+side*w*.48,5.54,front-d*bay,.06,.85,.06);
        }
      }
      for(let level=6.65;level+1.05<height;level+=3.60){
        for(const face of [-1,1])for(const bay of [-1,0,1]){
          if(face<0&&level-1.025<=fashionAnnexHeight+.30)continue;
          put('displayGlass',glass,shop,x+bay*upperWidth*.29,level,upperZ+face*(upperDepth/2+.08),upperWidth*.24,2.05,.16);
          put('body',trim,shop,x+bay*upperWidth*.29,level-1.10,upperZ+face*(upperDepth/2+.15),upperWidth*.26,.14,.24);
          if(face>0){
            const mannequinX=x+bay*upperWidth*.29,windowZ=upperFront+.24;
            put('fashionShowroomDress',bay===0?0xc54e79:0x447da3,shop,mannequinX,level-.10,windowZ,.62,1.36,.55);
            put('shopSoftFurniture',0xe4c5a8,shop,mannequinX,level+.86,windowZ+.04,.18,.22,.18);
            put('shopForecourtDetail',0x52606b,shop,mannequinX,level-.87,windowZ,.09,.24,.09);
            put('shopForecourtDetail',0x52606b,shop,mannequinX,level-.98,windowZ,.45,.10,.12);
          }
        }
        for(const side of [-1,1])for(const bay of [-1,1])put('displayGlass',glass,shop,x+side*(upperWidth/2+.08),level,upperZ+bay*upperDepth*.25,.16,2.05,upperDepth*.37);
      }
      for(const side of [-1,1])put('displayGlass',glass,shop,x+side*(w/2+.08),2.45,z,.16,1.75,d*.48);
    }else if(shape===8&&stage>=2){
      // A multiplex grows as complete auditoriums beside its central hall.
      put('body',wallColor,shop,x,height/2,z,w*.48,height,d);
      for(const side of [-1,1]){
        const wingHeight=height*(side<0?(stage>=4?.87:.70):(stage>=6?.94:.77));
        const wingDepth=d*(stage>=3?.96:.84),wingZ=z-(d-wingDepth)/2;
        put('body',side<0?wallColor:style.walls,shop,x+side*w*.37,wingHeight/2,wingZ,w*.26,wingHeight,wingDepth);
        put('cinemaRoof',trim,shop,x+side*w*.37,wingHeight+.24,wingZ,w*.26+.12,.48,wingDepth+.20);
        // Glazed lobby connects the recessed halls to the street frontage.
        put('body',wallColor,shop,x+side*w*.37,2.30,z+d*.43,w*.26,4.60,d*.14);
        put('cinemaRoof',trim,shop,x+side*w*.37,4.74,z+d*.43,w*.26+.12,.28,d*.14+.18);
      }
    }else if(diningUpper){
      put('body',wallColor,shop,x,2.60,z,w,5.20,d);
      put('body',wallColor,shop,x,(height+5.20)/2,upperZ,upperWidth,height-5.20,upperDepth);
      for(const side of [-1,1]){
        put('displayGlass',glass,shop,x+side*(w/2+.08),2.45,z,.16,1.75,d*.48);
        put('body',trim,shop,x+side*(w/2+.17),1.50,z,.26,.14,d*.51);
      }
      put('diningTerraceDeck',0xc7aa88,shop,x,5.30,front-d*.16,w+.14,.20,d*.32);
      if(stage>=4){
        put('diningBalustrade',trim,shop,x,6.26,front-.12,w*.97,.12,.12);
        for(const side of [-1,1]){
          put('diningBalustrade',trim,shop,x+side*w*.48,6.26,front-d*.16,.12,.12,d*.32);
          for(const bay of [-.42,-.21,0,.21,.42])put('diningBalustrade',trim,shop,x+bay*w,5.83,front-.12,.07,.85,.07);
          for(const bay of [.06,.17,.28])put('diningBalustrade',trim,shop,x+side*w*.48,5.83,front-d*bay,.07,.85,.07);
        }
      }
      if(stage>=5){
        put('diningTerraceAwning',trim,shop,x,8.20,front-d*.16,w*.94,.18,d*.32);
        for(const side of [-1,1])put('diningBalustrade',trim,shop,x+side*w*.45,6.75,front-.22,.13,2.70,.13);
      }
      for(let level=6.45;level+.75<height;level+=2.95){
        for(const side of [-1,1])for(const bay of [-1,0,1]){
          const low=side<0?Math.max(level-.675,height*(shape===0?.57:.69)+.30):level-.675;
          const paneHeight=level+.675-low;
          if(paneHeight>.45)put('displayGlass',glass,shop,x+bay*upperWidth*.29,low+paneHeight/2,upperZ+side*(upperDepth/2+.08),upperWidth*.22,paneHeight,.16);
          put('displayGlass',glass,shop,x+side*(upperWidth/2+.08),level,upperZ+bay*upperDepth*.28,.16,1.35,upperDepth*.20);
        }
      }
    }else put('body',wallColor,shop,x,height/2,z,w,height,d);
    let serviceRear=z-d/2;

    if(stage>=1&&!(shape===8&&progress.premium)){
      const canopyDepth=shape===0||shape===2||shape===7?4.15:shape===6?1.45:2.15;
      const canopyWidth=w*(shape===8?.90:.82);
      const canopyY=shape===8||shape===6?3.55:3.04;
      put('evolutionEntranceCanopy',trim,shop,x,canopyY,front+canopyDepth*.43,canopyWidth,.24,canopyDepth);
      for(const side of [-1,1])
        put('evolutionEntranceColumn',wallColor,shop,x+side*canopyWidth*.48,canopyY*.50,front+canopyDepth*.80,.18,canopyY-.12,.18);
      if(shape===7){
        for(const side of [-1,1]){
          const tx=x+side*w*.29,tz=front+3.25;
          put('evolutionOutdoorTable',0xc69b68,shop,tx,1.02,tz,1.14,.14,.91);
          put('evolutionOutdoorTableLeg',trim,shop,tx,.56,tz,.22,.82,.22);
          for(const chairSide of [-1,1]){
            put('evolutionOutdoorChair',trim,shop,tx+chairSide*.78,.55,tz,.42,.12,.46);
            put('evolutionOutdoorChairBack',trim,shop,tx+chairSide*.92,.86,tz,.12,.59,.48);
          }
        }
      }else if(shape!==0&&shape!==2){
        for(const side of [-1,1])
          put('evolutionEntrancePlanter',0x66894b,shop,x+side*canopyWidth*.46,.40,front+3.05,.72,.65,.72);
      }
    }
    if(stage>=6){
      const gardenZ=front+2.35;
      const gardenEdge=Math.min(9.25,w/2+1,(shop.right??x+10.225)-x-.85,x-(shop.left??x-10.225)-.85);
      for(const side of [-1,1]){
        const gardenX=x+side*gardenEdge;
        put('evolutionGardenBox',0xdec9a6,shop,gardenX,.35,gardenZ,1.45,.55,1.15);
        put('evolutionGardenHedge',0x53804c,shop,gardenX,.91,gardenZ,1.31,.72,1.02);
        put('evolutionGardenLamp',trim,shop,gardenX,2.14,gardenZ,.15,2.08,.15);
        put('evolutionGardenLantern',0xffd798,shop,gardenX,3.22,gardenZ,.35,.38,.35);
      }
    }
    if(stage>=7){

      const portalWidth=w*.55;
      put('evolutionGrandEntrance',wallColor,shop,x,3.65,front+.35,portalWidth,.46,.72);
      for(const side of [-1,1])
        put('evolutionGrandPier',trim,shop,x+side*portalWidth*.47,1.84,front+.35,.36,3.30,.56);
    }

    if(stage>=2&&(shape===0||shape===3)){
      const library=shape===3;
      const annexWidth=w*(library?.82:.72);
      const annexDepth=2.0+growth*3.1;
      const annexHeight=height*(library?.77:.57);
      const annexZ=z-d/2-annexDepth/2+.08;
      put('body',wallColor,shop,x,annexHeight/2,annexZ,annexWidth,annexHeight,annexDepth);
      put('roof',trim,shop,x,annexHeight+.12,annexZ,annexWidth+.24,.24,annexDepth+.20);
      const back=annexZ-annexDepth/2;
      for(const bay of [-1,0,1]){
        const bx=x+bay*annexWidth*.28;
        if(!library&&bay===0){
          put('entryDoor',trim,shop,bx,1.26,back-.12,1.31,2.48,.19);
          put('entryDoorGlass',glass,shop,bx,1.38,back-.24,1.07,1.95,.07);
        }else put('displayGlass',glass,shop,bx,annexHeight*.49,back-.07,annexWidth*.20,annexHeight*.55,.16);
      }
      if(library&&progress.premium){
        for(const side of [-1,1]){
          const wingX=x+side*(annexWidth/2+.08);
          put('displayGlass',glass,shop,wingX,annexHeight*.55,annexZ,.17,annexHeight*.60,annexDepth*.74);
          for(const bay of [-.39,0,.39])
            put('body',0xe8d7ba,shop,wingX+side*.10,annexHeight*.50,annexZ+bay*annexDepth,.24,annexHeight*.92,.22);
        }
        put('roof',0xd8c8aa,shop,x,annexHeight*.23,back-.13,annexWidth+.12,.20,.31);
      }
      if(library&&stage>=2){
        const porchWidth=w*.77;
        const porchHeight=stage>=3?5.2:3.3;
        put('roof',trim,shop,x,porchHeight,front+.83,porchWidth,.27,1.76);
        put('shopPaving',0xd9c7a8,shop,x,.19,front+.81,porchWidth,.20,1.91);
        for(const bay of [-.43,-.15,.15,.43])
          put('body',0xe9d9bb,shop,x+bay*porchWidth,porchHeight/2+.05,front+1.46,stage>=3?.40:.27,porchHeight-.15,stage>=3?.40:.27);
        if(stage>=3){
          put('body',0xe9d9bb,shop,x,porchHeight+.38,front+.83,porchWidth+.30,.47,1.89);
          for(const bay of [-.43,-.15,.15,.43])put('body',0xf0dfbd,shop,x+bay*porchWidth,porchHeight-.15,front+1.46,.62,.25,.62);
        }
      }
      if(!library&&stage>=2){
        put('shopPaving',0xbc9876,shop,x,.15,back-1.4,annexWidth,.17,2.75);
        for(const side of [-1,1]){
          const tx=x+side*annexWidth*.25;
          put('shopDiningPedestal',trim,shop,tx,.60,back-1.47,.22,.84,.22);
          put('shopDiningTable',0xf4dab1,shop,tx,1.04,back-1.47,1.18,.13,.94);
          for(const end of [-1,1]){
            put('shopForecourtDetail',0xb98350,shop,tx,.55,back-1.47+end*.85,.53,.13,.56);
            put('shopForecourtDetail',0xb98350,shop,tx,.87,back-1.47+end*1.10,.53,.62,.10);
            for(const sideLeg of [-1,1])put('shopForecourtDetail',trim,shop,tx+sideLeg*.19,.29,back-1.47+end*.85,.06,.48,.42);
          }
          if(stage>=6){
            put('shopPergolaPost',trim,shop,tx+side*.70,1.65,back-2.45,.14,2.99,.14);
            put('shopPergolaBeam',trim,shop,tx+side*.70,3.13,back-1.31,.16,.18,2.50);
          }
        }
      }
    }
    if(stage>=2&&(shape===1||shape===2||shape===8)){
      const cinema=shape===8,restaurant=shape===2;
      const extensionWidth=w*(cinema?.91:restaurant?.76:.88);
      const extensionDepth=2.4+growth*4.2;
      const rear=z-d/2;
      const extensionZ=rear-extensionDepth/2+.10;
      const extensionHeight=height*(cinema?.88:restaurant?.69:.53);
      put('body',wallColor,shop,x,extensionHeight/2,extensionZ,extensionWidth,extensionHeight,extensionDepth);
      put('roof',trim,shop,x,extensionHeight+.13,extensionZ,extensionWidth+.28,.26,extensionDepth+.28);
      const back=extensionZ-extensionDepth/2;
      serviceRear=back;
      if(restaurant){
        for(const bay of [-1,0,1]){
          if(bay===0){
            put('entryDoor',trim,shop,x,1.26,back-.13,1.42,2.48,.19);
            put('entryDoorGlass',glass,shop,x,1.38,back-.25,1.17,1.95,.07);
          }else put('displayGlass',glass,shop,x+bay*extensionWidth*.27,extensionHeight*.51,back-.08,extensionWidth*.19,extensionHeight*.56,.17);
        }
        if(stage>=2){
          put('shopPaving',0xc19b76,shop,x,.16,back-1.65,extensionWidth,.20,3.25);
          for(const side of [-1,1]){
            const tx=x+side*extensionWidth*.25;
            put('shopDiningTable',0xf0ca91,shop,tx,1.08,back-1.59,1.18,.14,.95);
            put('shopDiningPedestal',trim,shop,tx,.60,back-1.59,.23,.83,.23);
            for(const end of [-1,1]){
              put('shopForecourtDetail',0x88534b,shop,tx,.55,back-1.59+end*.88,.57,.13,.58);
              put('shopForecourtDetail',0x88534b,shop,tx,.87,back-1.59+end*1.14,.57,.62,.10);
              for(const sideLeg of [-1,1])put('shopForecourtDetail',trim,shop,tx+sideLeg*.21,.29,back-1.59+end*.88,.06,.48,.44);
            }
          }
        }
      }else if(cinema){
        for(const side of [-1,1]){
          const edge=x+side*(extensionWidth/2+.10);
          put('body',trim,shop,edge,extensionHeight*.52,extensionZ,.24,extensionHeight*.91,extensionDepth*.68);
        }
        if(stage>=4){
          put('body',0x333c56,shop,x,extensionHeight*.57,back-.14,extensionWidth*.69,extensionHeight*.50,.30);
          put('displayGlass',0xe9be71,shop,x,extensionHeight*.57,back-.31,extensionWidth*.58,.16,.10);
        }
      }else{
        for(const bay of [-1,0,1])
          put('garageGate',0x637578,shop,x+bay*extensionWidth*.29,1.38,back-.09,extensionWidth*.24,2.65,.19);
        if(stage>=4)
          put('roof',trim,shop,x,3.04,back-.87,extensionWidth+.16,.21,1.82);
      }
    }
    if(stage>=2&&shape>=4&&shape<=7){
      const rear=z-d/2;
      const annexDepth=2.1+growth*3.7;
      const annexZ=rear-annexDepth/2+.08;
      const annexW=w*[.76,.89,.92,.75][shape-4];
      const annexH=shape===5?fashionAnnexHeight:height*[.63,.83,.73,.59][shape-4];
      put('body',wallColor,shop,x,annexH/2,annexZ,annexW,annexH,annexDepth);
      put('roof',trim,shop,x,annexH+.13,annexZ,annexW+.24,.26,annexDepth+.24);
      const back=annexZ-annexDepth/2;
      if(shape===4){
        put('entryDoorGlass',glass,shop,x,1.25,back-.12,1.63,2.44,.17);
        for(const side of [-1,1])
          put('displayGlass',glass,shop,x+side*annexW*.31,1.78,back-.08,annexW*.22,1.29,.16);
        if(stage>=4)put('roof',0xe5f0dc,shop,x,2.77,back-.63,annexW*.73,.22,1.36);
        if(progress.premium){
          for(const side of [-1,1]){
            const wingX=x+side*(annexW/2+.08);
            put('displayGlass',glass,shop,wingX,annexH*.56,annexZ,.17,annexH*.48,annexDepth*.70);
            put('body',0xe5f0dc,shop,wingX+side*.09,annexH*.27,annexZ,.24,.18,annexDepth*.77);
          }
        }
      }else if(shape===5){
        for(const side of [-1,1]){
          put('displayGlass',glass,shop,x+side*annexW*.24,annexH*.52,back-.08,annexW*.40,annexH*.62,.18);
          if(stage>=4)
            put('body',trim,shop,x+side*annexW*.44,annexH*.50,back-.20,.25,annexH,.33);
        }
      }else if(shape===6){
        for(const side of [-1,1])
          put('garageGate',0x657374,shop,x+side*annexW*.24,annexH*.43,back-.08,annexW*.40,annexH*.83,.17);
        if(stage>=4)put('roof',trim,shop,x,annexH+.10,back-.99,annexW,.24,2.01);
      }else{
        for(const side of [-1,1])
          put('displayGlass',glass,shop,x+side*annexW*.25,annexH*.56,back-.08,annexW*.29,annexH*.45,.17);
        if(stage>=4){
          const chimney=annexH*.67;
          put('body',0xb97955,shop,x+annexW*.27,annexH+chimney/2,annexZ,.60,chimney,.65);
          put('roof',0x6a5245,shop,x+annexW*.27,annexH+chimney,annexZ,.78,.16,.81);
        }
      }
    }
    if(stage>=2&&shape===9){
      const hallWidth=w*.88,hallDepth=2.7+growth*4.0;
      const hallHeight=height*.72,hallZ=z-d/2-hallDepth/2+.08;
      put('body',wallColor,shop,x,hallHeight/2,hallZ,hallWidth,hallHeight,hallDepth);
      put('roof',trim,shop,x,hallHeight+.17,hallZ,hallWidth+.22,.34,hallDepth+.23);
      for(const side of [-1,1]){
        const bx=x+side*(hallWidth/2+.06);
        put('displayGlass',glass,shop,bx,hallHeight*.53,hallZ,.15,hallHeight*.56,hallDepth*.75);
        if(stage>=4)
          put('shopUpperCap',trim,shop,bx,hallHeight*.24,hallZ,.23,.17,hallDepth*.82);
      }
    }
    if(stage>=2&&shape===11){
      const stalls=stage>=6?3:stage>=4?2:1;
      const stallWidth=w*.24,stallZ=z-d/2-2.22;
      for(let i=0;i<stalls;i++){
        const sx=x+(i-(stalls-1)/2)*w*.29;
        put('shopPaving',0xc6ac89,shop,sx,.14,stallZ,stallWidth+.34,.18,3.82);
        put('body',0xb88a62,shop,sx,.66,stallZ-.58,stallWidth,.91,.90);
        for(let fruit=0;fruit<5;fruit++)put('shopSoftFurniture',fruit%2?0xe5b456:0x93b950,shop,sx+(fruit-2)*stallWidth*.15,1.22,stallZ-.58,.25,.22,.25);
        for(const side of [-1,1])
          put('shopPergolaPost',trim,shop,sx+side*stallWidth*.45,1.56,stallZ,.14,2.83,.14);
        put('roof',i%2?0xbd6954:trim,shop,sx,3.08,stallZ,stallWidth+.36,.23,3.40);
        if(progress.premium){
          for(const stripe of [-1,0,1]){
            const stripeW=(stallWidth+.36)/5;
            put('roof',0xf4d7a0,shop,sx+stripe*stripeW*1.67,3.215,stallZ,stripeW,.08,3.43);
          }
          put('displayGlass',0xffd998,shop,sx,2.82,stallZ-1.35,stallWidth*.73,.09,.09);
        }
      }
    }
    if(stage>=2&&shape===10){
      const lobbyWidth=w*.84,lobbyDepth=1.32+growth*1.40;
      const lobbyZ=front+lobbyDepth/2-.08;
      put('shopPaving',0xd2bd9d,shop,x,.17,lobbyZ,lobbyWidth+.34,.19,lobbyDepth+.25);
      put('roof',trim,shop,x,3.48,lobbyZ,lobbyWidth+.42,.24,lobbyDepth+.28);
      for(const side of [-1,1]){
        const px=x+side*lobbyWidth*.43;
        put('body',wallColor,shop,px,1.83,lobbyZ+lobbyDepth*.37,.30,3.06,.32);
        if(stage>=4)
          put('displayGlass',glass,shop,px,1.80,lobbyZ,.12,2.83,lobbyDepth*.78);
      }
    }

    if(shape===3&&stage>=2){
      const stone=0xe9d9bb;
      for(const side of [-1,1])put('displayGlass',glass,shop,x+side*(w/2+.08),2.4,z,.16,1.6,d*.50);
      for(let level=5.5;level+1<height;level+=3.2){
        for(const side of [-1,1]){
          for(const bay of [-1,0,1]){
            const bx=x+bay*w*.29,bz=z+bay*d*.28;
            put('displayGlass',glass,shop,bx,level,z+side*(d/2+.08),w*.21,1.85,.16);
            put('displayGlass',glass,shop,x+side*(w/2+.08),level,bz,.16,1.85,d*.20);
            put('body',stone,shop,bx,level-.99,z+side*(d/2+.16),w*.25,.15,.26);
            put('body',stone,shop,x+side*(w/2+.16),level-.99,bz,.26,.15,d*.24);
            if(progress.premium){
              put('body',stone,shop,bx,level,z+side*(d/2+.18),.09,1.85,.11);
              put('body',stone,shop,x+side*(w/2+.18),level,bz,.11,1.85,.09);
            }
          }
        }
      }
      if(stage>=4){
        for(const side of [-1,1])for(const bay of [-.45,-.15,.15,.45]){
          put('body',stone,shop,x+bay*w,height*.48,z+side*(d/2+.16),.24,height*.94,.31);
          put('body',stone,shop,x+side*(w/2+.16),height*.48,z+bay*d,.31,height*.94,.24);
        }
      }
    }
    if(shape===9){
      for(let level=2.4;level+1<height;level+=3.6){
        for(const side of [-1,1])for(const bay of [-1,1]){
          const wx=x+bay*w*.24,wz=z+bay*d*.24;
          if(side<0)put('displayGlass',glass,shop,wx,level,z-d/2-.08,w*.36,1.8,.16);
          if(side>0&&level>=6)put('displayGlass',glass,shop,wx,level,front+.08,w*.36,1.8,.16);
          put('displayGlass',glass,shop,x+side*(w/2+.08),level,wz,.16,1.8,d*.36);
          if(progress.premium){
            if(side<0)put('body',0xdde7cd,shop,wx,level,z-d/2-.19,.10,1.8,.10);
            if(side>0&&level>=6)put('body',0xdde7cd,shop,wx,level,front+.19,.10,1.8,.10);
            put('body',0xdde7cd,shop,x+side*(w/2+.19),level,wz,.10,1.8,.10);
          }
        }
      }
    }
    if(shape===10){
      for(let floor=0;floor<Math.ceil(height/3.35);floor++){
        const levelY=3.70+floor*3.35;
        if(levelY+1>height)continue;
        for(const side of [-1,1]){
          // Leave the entrance portico free; every accessible guest floor has a balcony.
          const balcony=progress.premium&&(side<0||floor>=1)&&levelY+1.30<height;
          for(const bay of [-1,0,1]){
            put('hotelUpperWindow',glass,shop,x+bay*w*.29,levelY+(balcony?.035:0),z+side*(d/2+.07),w*.20,balcony?2.25:1.79,.15);
            put('hotelUpperWindow',glass,shop,x+side*(w/2+.07),levelY,z+bay*d*.28,.15,1.79,d*.20);
            if(progress.premium){
              if(!balcony)put('shopPremiumSill',0xf2dfbf,shop,x+bay*w*.29,levelY-.98,z+side*(d/2+.16),w*.24,.14,.30);
              put('shopPremiumSill',0xf2dfbf,shop,x+side*(w/2+.16),levelY-.98,z+bay*d*.28,.30,.14,d*.24);
              put('shopPremiumMullion',0xf2dfbf,shop,x+bay*w*.29,levelY+(balcony?.035:0),z+side*(d/2+.17),.07,balcony?2.25:1.79,.10);
              put('shopPremiumMullion',0xf2dfbf,shop,x+side*(w/2+.17),levelY,z+bay*d*.28,.10,1.79,.07);
            }
          }
          if(balcony){
            const deckY=levelY-1.19,edge=z+side*(d/2+1.23),balconyW=w*.88;
            put('hotelBalcony',0xf2dfbf,shop,x,deckY,z+side*(d/2+.59),balconyW,.16,1.30);
            put('hotelBalconyGlass',glass,shop,x,deckY+.61,edge,balconyW,.88,.065);
            put('hotelBalconyRail',trim,shop,x,deckY+1.18,edge,balconyW+.08,.09,.10);
            for(const end of [-1,1]){
              put('hotelBalconyGlass',glass,shop,x+end*balconyW/2,deckY+.61,z+side*(d/2+.59),.065,.88,1.30);
              put('hotelBalconyPost',trim,shop,x+end*balconyW/2,deckY+.67,edge,.07,1.02,.07);
              put('hotelBalconySideRail',trim,shop,x+end*balconyW/2,deckY+1.18,z+side*(d/2+.59),.10,.09,1.30);
            }
          }
          put('evolutionStoreyBand',trim,shop,x,levelY+1.23,z+side*(d/2+.09),w+.10,.16,.22);
          put('evolutionSideStoreyBand',trim,shop,x+side*(w/2+.09),levelY+1.23,z,.22,.16,d+.10);
        }
      }
    }
    if(progress.premium){
      const crownHeight=industrialSplit?height*.78:height;
      const crownWidth=industrialSplit?w*.22:recessedUpper?upperWidth:steppedPharmacy?w*.58:shape===8&&stage>=2?w*.48:w;
      put('shopPremiumCornice',0xf2dfbf,shop,x,crownHeight-.12,(recessedUpper?upperFront:front)+.14,crownWidth,.25,.34);
      put('shopPremiumRearCornice',0xf2dfbf,shop,x,crownHeight-.12,z-d/2-.12,crownWidth,.25,.31);
      for(const side of [-1,1]){
        const sideX=x+side*((recessedUpper?upperWidth:w)/2+.12);
        const sideHeight=industrialSplit?height*(side<0?.90:1):steppedPharmacy?Math.max(5.30,height*(side<0?(stage>=5?.84:.72):(stage>=6?.91:.65))):shape===8&&stage>=2?height*(side<0?(stage>=4?.87:.70):(stage>=6?.94:.77)):height;
        const sideDepth=recessedUpper?upperDepth:shape===8&&stage>=2?d*(stage>=3?.96:.84):d;
        const sideZ=z-(d-sideDepth)/2;
        put('shopPremiumSideCornice',0xf2dfbf,shop,sideX,sideHeight-.12,sideZ,.31,.25,sideDepth+.22);
        put('shopPremiumSidePilaster',0xf2dfbf,shop,sideX,sideHeight*.47,z-d*.40,.26,sideHeight*.89,.29);
      }
      for(const side of [-1,1]){
        const px=x+side*w*.44;
        const entranceHeight=bakerySplit?5.2:industrialSplit?height*(side<0?.90:1):diningUpper?5.2:fashionUpper?4.9:steppedPharmacy?Math.max(5.30,height*(side<0?(stage>=5?.84:.72):(stage>=6?.91:.65))):shape===8&&stage>=2?4.6:height;
        put('shopPremiumPilaster',0xf2dfbf,shop,px,entranceHeight*.47,front+.16,.29,entranceHeight*.89,.28);
        put('shopPremiumLamp',0xffd887,shop,px,entranceHeight*.64,front+.35,.23,.36,.18);
        put('shopPremiumPlanter',trim,shop,px,.30,front+.93,.64,.47,.52);
        put('shopPremiumPlant',0x648e40,shop,px,.65,front+.93,.48,.36,.43);
      }
    }
    if(shape===0){
      put('tradeMark',trim,shop,x,signRoof+.63,front+.18,.14,.34,.22);
      put('tradeMark',trim,shop,x,signRoof+.73,front+.64,.14,.12,1.20);
      put('cafeCupSign',0xffefcd,shop,x,signRoof+1.35,front+1.10,1.68,1.26,1.59);
      put('cafeHandleSign',0xffefcd,shop,x+.84,signRoof+1.36,front+1.10,1.17,1.22,1.16);
    }
    if(shape===2&&shop.id%24===14){
      put('tradeMark',trim,shop,x,signRoof+.25,front+.30,.16,.10,.65);
      put('tradeMark',trim,shop,x,signRoof+.93,front+.55,.16,1.70,.10);
      put('pizzaDiscSign',0xc47b30,shop,x,signRoof+2.13,front+.60,2.85,2.85,.39);
      put('pizzaSauceSign',0xffc260,shop,x,signRoof+2.13,front+.83,2.46,2.46,.09);
      for(let topping=0;topping<6;topping++){
        const angle=topping*Math.PI/3;
        put('pizzaToppingSign',0xc24438,shop,x+Math.cos(angle)*.73,signRoof+2.13+Math.sin(angle)*.73,front+.90,.34,.34,.07);
      }
    }
    const pizzeria=shape===2&&shop.id%24===14;
    if(shape!==0&&!pizzeria){
      const sculptureScale=shape===6?2.00:shape===8||shape===10?1.70:1.42;
      const badgeY=signRoof+2.43,badgeZ=front+.32;
      const mark=(dx,dy,width,markHeight,color,kind='tradeMark',dz=0,depth=.38)=>{
        put(kind,color,shop,x+dx*sculptureScale,badgeY+dy*sculptureScale,
          badgeZ+dz*sculptureScale,width*sculptureScale,markHeight*sculptureScale,depth*sculptureScale);
      };
      put('tradeMark',trim,shop,x,signRoof+1.07,badgeZ,.30,2.15,.28);
      const ivory=shape===1?0xffc45c:0xffe9c3;
      if(shape===1){ // Shopping cart
        const metal=0xffc45c;
        mark(.02,-.12,1.50,.11,metal,'tradeMark',0,.83);
        for(const side of [-1,1]){
          const dz=side*.39;
          mark(.02,.45,1.60,.10,metal,'tradeMark',dz,.10);
          for(const bar of [-.72,-.46,-.18,.10,.38,.72])
            mark(bar,.17,.085,.58,metal,'tradeMark',dz,.09);
          for(const wheel of [-.53,.55])
            mark(wheel,-.40,.33,.33,0x303d43,'tradeRound',dz,.18);
        }
        for(const end of [-1,1]){
          mark(end*.75,.45,.10,.10,metal,'tradeMark',0,.87);
          for(const bar of [-.24,0,.24])
            mark(end*.75,.17,.10,.58,metal,'tradeMark',bar,.08);
        }
        mark(-.92,.52,.13,.29,metal,'tradeMark',0,.76);
        mark(-1.06,.66,.18,.13,0x854429,'tradeMark',0,.81);
      }else if(shape===2){ // Standing cutlery
        mark(-.36,-.10,.13,1.12,ivory,'tradeMark',0,.16);
        mark(.35,-.39,.21,.64,0x814632,'tradeMark',0,.24);
        mark(.35,.28,.28,.86,ivory,'tradeSculpt',0,.19);
        for(const tine of [-.55,-.36,-.17])mark(tine,.46,.085,.44,ivory,'tradeMark',0,.13);
        mark(-.36,.24,.43,.12,ivory,'tradeMark',0,.17);
      }else if(shape===3){ // Two page blocks and a bound spine
        mark(0,-.04,1.62,1.24,0x674b8b,'tradeMark',-.13,.33);
        mark(0,.01,.13,1.17,0xc9a572,'tradeMark',.10,.34);
        for(const side of [-1,1]){
          mark(side*.42,.02,.71,1.06,ivory,'tradeMark',.10,.35);
          for(const row of [-.27,0,.27])mark(side*.42,row,.45,.07,trim,'tradeMark',.29,.045);
        }
      }else if(shape===4){ // Thick illuminated pharmacy cross
        mark(0,0,.51,1.58,0x247e56,'tradeMark',0,.80);
        mark(0,0,1.58,.51,0x247e56,'tradeMark',0,.80);
        for(const side of [-1,1]){
          mark(0,0,.32,1.37,0xa6ffb1,'tradeMark',side*.412,.045);
          mark(0,0,1.37,.32,0xa6ffb1,'tradeMark',side*.412,.045);
        }
      }else if(shape===5){ // Dress on a rounded display mannequin
        mark(0,.62,.30,.38,0xe4bb94,'tradeSculpt',0,.29);
        mark(0,0,.63,.95,0xc44f71,'tradeSculpt',0,.62);
        mark(0,-.12,1.14,1.06,0xd9547c,'tradeDress',0,4.2);
      }else if(shape===6){ // Wrench with a rounded handle and open jaws
        mark(0,-.25,.29,1.09,0x465f76,'tradeSculpt',0,.46);
        mark(0,.24,.84,.24,0x6f91ab,'tradeMark',0,.49);
        for(const side of [-1,1])mark(side*.31,.46,.23,.42,0x6f91ab,'tradeSculpt',0,.46);
      }else if(shape===7){ // Rounded loaf with scored crust
        mark(0,0,1.69,.95,0xe1a34c,'tradeSculpt',0,.96);
        for(const score of [-.40,0,.40])for(const dz of [-.28,-.14,0,.14,.28]){
          const surface=.475*Math.sqrt(Math.max(0,1-(score/.845)**2-(dz/.48)**2));
          mark(score,surface+.012,.10,.045,0xb8793a,'tradeSculpt',dz,.16);
        }
      }else if(shape===8){ // Clapperboard with a projecting hinged top
        mark(0,-.19,1.42,.82,0xf2d9a9,'tradeMark',0,.52);
        for(const face of [-1,1]){
          mark(0,-.04,1.12,.13,0x38445b,'tradeMark',face*.27,.045);
          mark(0,-.31,.84,.095,0x56627a,'tradeMark',face*.27,.045);
        }
        mark(0,.37,1.48,.22,ivory,'tradeMark',0,.58);
        for(const slash of [-.45,0,.45])mark(slash,.37,.17,.24,0x343d51,'tradeMark',0,.59);
        mark(-.61,.21,.24,.22,0xc38c50,'tradeRound',0,.62);
      }else if(shape===9){ // Dumbbell with cylindrical weights
        mark(0,0,1.55,.16,0xcbd3d7,'tradeBar',0,.16);
        for(const side of [-1,1])mark(side*.61,0,.34,.83,0x30475b,'tradeBar',0,.83);
      }else if(shape===10){ // Bed with mattress and two pillows
        mark(0,-.32,1.52,.22,0x8b5737,'tradeMark',0,.95);
        mark(-.66,.02,.17,.80,0x8b5737,'tradeMark',0,.98);
        mark(.08,-.10,1.30,.22,ivory,'tradeMark',0,.90);
        mark(.28,.04,.86,.18,0x6193b8,'tradeMark',0,.87);
        for(const side of [-1,1])mark(-.40,.08,.36,.20,0xfff8df,'tradeSculpt',side*.23,.41);
      }else{ // Market stall with counter and striped canopy
        mark(0,-.33,1.47,.24,0xa96942,'tradeMark',0,.84);
        for(const side of [-1,1])for(const edge of [-1,1])
          mark(side*.62,.02,.13,.83,0x9c633d,'tradeMark',edge*.33,.13);
        for(let stripe=0;stripe<7;stripe++)
          mark((stripe-3)*.22,.41,.22,.19,stripe%2?0xffe9c3:0xd47049,'tradeMark',0,1.02);
      }
    }
    const entranceW=2.05, doorH=Math.min(2.65,height*.52);
    // A single storefront system, shared proportions but distinct identities.
    // The door is central, with two uninterrupted display windows either side.
    const wingW=(w-entranceW-1.0)/2;
    const displayH=Math.min(2.85,height*.55),displayY=1.05+displayH/2;
    for(const side of shape===6||marketHall?[]:[-1,1]){
      const wx=x+side*(entranceW/2+.22+wingW/2);
      if(shape!==6)put('displayGlass',glass,shop,wx,displayY,front+.11,wingW-.28,displayH,.11);
      put('displayTop',trim,shop,wx,displayY+displayH/2+.06,front+.19,wingW,.13,.18);
      put('displaySill',trim,shop,wx,displayY-displayH/2-.05,front+.19,wingW,.12,.20);
      for(const edge of [-1,1])put('displayJamb',trim,shop,wx+edge*wingW/2,displayY,front+.19,.12,displayH+.12,.19);
      const paneZ=front+.182;
      if(shape===1){ // Produce bins under the supermarket glass.
        put('marketProduceCrate',0xa36c3c,shop,wx,displayY-.66,paneZ,wingW*.75,.36,.15);
        for(let fruit=0;fruit<5;fruit++){
          put('marketProduce',fruit%2?0x9cbb43:0xff9350,shop,wx+(fruit-2)*wingW*.13,
            displayY-.43,paneZ+.06,.20,.18,.16);
        }
      }else if(shape===4){ // Pharmacy: a clinical display with a green cross.
        put('pharmacyDisplayPanel',0xecf3e8,shop,wx,displayY-.18,paneZ,wingW*.64,.93,.07);
        put('pharmacyDisplayCross',0x2aa465,shop,wx,displayY-.18,paneZ+.06,.14,.59,.055);
        put('pharmacyDisplayCross',0x2aa465,shop,wx,displayY-.18,paneZ+.06,.59,.14,.055);
      }else if(shape===7){ // Bakery: bread on a low warm counter.
        put('bakeryWindowCounter',0xaf7244,shop,wx,displayY-.65,paneZ,wingW*.77,.38,.17);
        for(let loaf=0;loaf<3;loaf++){
          put('bakeryLoaf',loaf%2?0xb77331:0xe5a75b,shop,wx+(loaf-1)*wingW*.22,
            displayY-.39,paneZ+.08,.37,.19,.14);
        }
      }else if(shape===8){ // Cinema: full-height poster cases.
        const poster=side<0?0xa93951:0x284e8a;
        put('cinemaPosterFrame',0xd6ad68,shop,wx,displayY,paneZ,wingW*.53,displayH*.80,.10);
        put('cinemaPoster',poster,shop,wx,displayY,paneZ+.063,wingW*.45,displayH*.71,.055);
        put('cinemaPosterTitle',0xffdc93,shop,wx,displayY-displayH*.22,paneZ+.10,wingW*.35,.13,.023);
      }else if(shape===9){ // Gym: weight racks and barbell silhouettes.
        put('gymBarbell',0xb8c4c6,shop,wx,displayY-.38,paneZ,wingW*.65,.085,.10);
        for(const plate of [-1,1])
          put('gymWeightPlate',0x263238,shop,wx+plate*wingW*.25,displayY-.38,paneZ+.035,.16,.52,.13);
      }else if(shape===10){ // Hotel: reception desk and pendant lights.
        put('hotelReception',0x85553a,shop,wx,displayY-.53,paneZ,wingW*.72,.57,.19);
        put('hotelPendant',0xffdd92,shop,wx,displayY+.61,paneZ,.33,.24,.12);
      }
      if(shape===5){
        const fabric=side<0?0xd75374:0x467bb1;
        put('fashionDisplayDress',fabric,shop,wx,displayY-.16,front+.182,.48,1.27,.073);
        put('fashionDisplayHem',fabric,shop,wx,displayY-.66,front+.182,.73,.43,.073);
        put('fashionDisplaySleeve',fabric,shop,wx-.29,displayY+.32,front+.182,.19,.32,.073);
        put('fashionDisplaySleeve',fabric,shop,wx+.29,displayY+.32,front+.182,.19,.32,.073);
        put('fashionDisplayNeck',0xe5c5a2,shop,wx,displayY+.54,front+.18,.17,.16,.074);
      }
      if(shape!==6)put('displayReflection',0x9bc9df,shop,wx-wingW*.29,displayY+.12,front+.181,
        .055,displayH*.79,.012);
      // Only a single subtle central mullion on wide shop windows.
      if(wingW>2.8)put('displayDivider',0x5d7073,shop,wx,displayY,front+.19,.06,displayH,.07);
    }
    if(!marketHall){
    put('entryDoor',0x455d64,shop,x,doorH/2+.12,front+.17,entranceW-.14,doorH,.16);
    put('entryDoorGlass',glass,shop,x,doorH*.69+.10,front+.265,entranceW-.43,doorH*.42,.055);
    put('entryDoorFrame',trim,shop,x,doorH+.22,front+.20,entranceW+.12,.15,.20);
    for(const side of [-1,1])put('entryDoorJamb',trim,shop,x+side*entranceW/2,doorH/2+.10,front+.20,.12,doorH,.20);
    put('entryHandle',0xe6c68c,shop,x+.65,1.15,front+.30,.055,.20,.06);
    put('threshold',0xc5b9a8,shop,x,.105,front+.31,entranceW+.26,.12,.54);
    }
    // One clean sign band and one restrained canopy, no stacked horizontal bars.
    const signY=Math.min(height-.58,displayY+displayH/2+.68);
    if(!marketHall){
    put('signFascia',trim,shop,x,signY,front+.15,w*.84,.57,.22);
    put('signInset',0xe6dfd2,shop,x,signY,front+.275,w*.74,.32,.06);
    }
    const canopyY=signY-.46;
    if(![6,8,10].includes(shape)&&!marketHall){
      put('singleCanopy',trim,shop,x,canopyY,front+.47,w*.81,.13,.76);
      if(shape!==1){
        const stripeW=w*.81/11;
        for(let stripe=0;stripe<11;stripe++){
          const stripeX=x+(stripe-5)*stripeW;
          const stripeColor=stripe%2?0xfff1dd:trim;
          put('shopAwningStripe',stripeColor,shop,stripeX,canopyY+.077,front+.49,stripeW,.033,.76);
          put('shopAwningValance',stripeColor,shop,stripeX,canopyY-.105,front+.86,stripeW,.22,.065);
        }
      }
    }
    // Rooflines and distinctive category silhouettes.
    if(shape===10){ // Hotel: taller body, upper glazing and a proper portico.
      put('hotelRoof',trim,shop,x,height+.25,z,w+.35,.46,d+.35);
      put('hotelTopBand',trim,shop,x,height-.53,front+.13,w*.86,.25,.22);
      for(const side of [-1,1]){
        put('hotelEntryTransom',glass,shop,x+side*w*.27,2.74,front+.12,1.35,.63,.12);
        put('hotelUpperSill',trim,shop,x+side*w*.27,height*.77-.83,front+.20,1.48,.12,.19);
        put('hotelColumn',0xc5b7a5,shop,x+side*1.45,1.45,front+1.05,.23,2.9,.23);
      }
      put('hotelEntranceRoof',trim,shop,x,3.03,front+.83,3.55,.18,1.75);
    }else if(shape===8){ // Cinema: bold marquee and tall front parapet.
      put('cinemaRoof',0x364b66,shop,x,height+.24,z,w*(stage>=2?.48:1)+.36,.48,d+.36);
      put('cinemaParapet',trim,shop,x,height+.78,front-.13,w*(stage>=2?.46:.94),1.10,.38);
      put(progress.premium?'cinemaPremiereCanopy':'cinemaMarquee',0xe7bc68,shop,x,progress.premium?3.55:signY+.04,front+(progress.premium?1.90:.46),w*(progress.premium?.94:.80),.44,progress.premium?4.0:.70);
      if(progress.premium){
        const canopyW=w*.94;
        for(const side of [-1,1]){
          put('cinemaPremiereColumn',trim,shop,x+side*canopyW*.46,1.78,front+3.68,.26,3.30,.26);
          put('cinemaPremiereCapital',0xe7bc68,shop,x+side*canopyW*.46,3.24,front+3.68,.46,.18,.46);
          put('cinemaPremiereSideTrim',trim,shop,x+side*canopyW*.495,3.55,front+1.90,.10,.31,3.94);
          for(let row=0;row<6;row++)put('cinemaPremiumBulb',0xffda83,shop,x+side*canopyW*.43,3.28,front+.24+row*.66,.14,.14,.14);
        }
        put('cinemaPremiereFascia',trim,shop,x,3.55,front+3.94,canopyW,.29,.12);
        for(let lamp=0;lamp<Math.max(8,Math.round(w/.65));lamp++){
          const count=Math.max(8,Math.round(w/.65)),px=x+((lamp/(count-1))-.5)*canopyW*.91;
          put('cinemaPremiumBulb',0xffda83,shop,px,3.55,front+4.025,.12,.12,.12);
        }
        const posterY=2.20,posterH=2.65;
        for(const side of [-1,1])for(const bay of [-1,1]){
          const posterZ=z+bay*d*.22,posterDepth=d*.25;
          put('cinemaPosterCase',0xe7bc68,shop,x+side*(w/2+.105),posterY,posterZ,.17,posterH,posterDepth);
          put('cinemaPosterArtwork',bay<0?0x872d4d:0x24547f,shop,x+side*(w/2+.21),posterY,posterZ,.06,posterH-.22,posterDepth-.22);
          put('cinemaPosterMoon',0xffd58c,shop,x+side*(w/2+.25),posterY+.50,posterZ-posterDepth*.18,.04,.42,posterDepth*.23);
          put('cinemaPosterTitle',0xf8deb6,shop,x+side*(w/2+.25),posterY-.77,posterZ,.04,.12,posterDepth*.65);
        }
        for(const bay of [-1,0,1]){
          const px=x+bay*w*.29,pw=w*.23,back=serviceRear-(stage>=4?.35:0),rearPosterY=4.55;
          if(stage>=4)for(const side of [-1,1])put('cinemaPosterMount',trim,shop,px+side*pw*.39,rearPosterY,serviceRear-.22,.12,.20,.45);
          put('cinemaPosterCase',0xe7bc68,shop,px,rearPosterY,back-.105,pw,posterH,.17);
          put('cinemaPosterArtwork',[0x872d4d,0x24547f,0x356b5a][bay+1],shop,px,rearPosterY,back-.21,pw-.22,posterH-.22,.06);
          put('cinemaPosterMoon',0xffd58c,shop,px-pw*.18,rearPosterY+.50,back-.25,pw*.23,.42,.04);
          put('cinemaPosterTitle',0xf8deb6,shop,px,rearPosterY-.77,back-.25,pw*.65,.12,.04);
        }
      }
      for(const side of [-1,1])put('cinemaLight',0xffe3a4,shop,x+side*w*.36,signY+.04,front+(progress.premium?.36:.85),.13,.13,.12);
      if(stage>=2){
        for(const side of [-1,1]){
          const pierX=x+side*w*.225;
          put('body',trim,shop,pierX,height*.47,front+.08,.25,height*.92,.36);
          put('displayGlass',0xe9be71,shop,pierX,height*.52,front+.29,.10,height*.72,.10);
        }
      }
      if(stage>=3){
        // A tall, framed screen replaces the generic upper-storey windows.
        put('body',trim,shop,x,height*.67,front+.11,w*.40,height*.34,.27);
        put('displayGlass',0x182a45,shop,x,height*.67,front+.27,w*.36,height*.29,.10);
        for(const side of [-1,1])put('displayGlass',0xd8ae62,shop,x+side*w*.16,height*.67,front+.34,.09,height*.25,.07);
      }
      if(stage>=4){
        for(const side of [-1,1]){
          const towerX=x+side*w*.43;
          const towerHeight=height*(stage>=6?.91:.71);
          put('body',trim,shop,towerX,towerHeight/2,front-.25,w*.095,towerHeight,.75);
          put('cinemaRoof',0xe7bc68,shop,towerX,towerHeight+.16,front-.25,w*.11,.25,.91);
          for(let light=0;light<stage-1;light++)put('cinemaLight',0xffe3a4,shop,towerX,1.1+light*(towerHeight-1.6)/(stage-2),front+.17,.17,.27,.09);
        }
      }
    }else if(shape===6){ // Garage: broad rolling door, industrial lintel.
      if(!industrialSplit)put('garageRoof',trim,shop,x,height+.25,z,w+.34,.50,d+.34);
      for(const side of industrialSplit?[-1,1]:[1]){
        const gateX=x+side*w*.305,gateWidth=w*(industrialSplit?.29:.25);
        put('garageGate',0x6f8585,shop,gateX,1.73,front+.24,gateWidth,3.15,.15);
        for(let j=0;j<5;j++)put('garageSlat',0x9ab0b0,shop,gateX,.54+j*.57,front+.33,gateWidth*.95,.055,.06);
      }
      if(!industrialSplit)put('displayGlass',glass,shop,x-w*.30,2.1,front+.10,w*.25,1.65,.16);
    }else if(shape===1){ // A retail hall grows in volume, with daylight roofs instead of rooftop storeys.
      put('superRoof',trim,shop,x,height+.27,z,w+.45,.54,d+.45);
      if(stage>=3){
        const lanterns=stage>=7?2:1;
        const lanternWidth=w*(lanterns===2?.26:.46);
        for(let i=0;i<lanterns;i++){
          const lx=x+(i-(lanterns-1)/2)*w*.43;
          const rise=stage>=5?1.65:1.05;
          put('superClerestory',wallColor,shop,lx,height+.54+rise/2,z-d*.08,lanternWidth,rise,d*.70);
          put('superRoof',trim,shop,lx,height+.54+rise+.12,z-d*.08,lanternWidth+.26,.24,d*.70+.26);
          for(const side of [-1,1]){
            put('displayGlass',glass,shop,lx,height+.54+rise*.54,z-d*.08+side*(d*.35+.08),lanternWidth*.85,rise*.60,.16);
            put('displayGlass',glass,shop,lx+side*(lanternWidth/2+.08),height+.54+rise*.54,z-d*.08,.16,rise*.60,d*.60);
          }
        }
      }
      if(stage>=4){
        for(const side of [-1,1])for(const bay of [-.30,0,.30]){
          put('displayGlass',glass,shop,x+side*(w/2+.08),height*.66,z+bay*d,.16,height*.30,d*.22);
          if(progress.premium)put('body',0xf2dfbf,shop,x+side*(w/2+.18),height*.66,z+bay*d,.12,height*.30,.10);
        }
      }
      if(stage>=6){
        put('evolutionEntranceCanopy',trim,shop,x,3.75,front+1.05,w*.98,.24,1.70);
        for(const side of [-1,1])put('evolutionEntranceColumn',wallColor,shop,x+side*w*.46,1.80,front+1.70,.20,3.60,.20);
      }
      put('superCanopy',trim,shop,x,canopyY,front+.58,w*.91,.20,1.00);
    }else if(marketHall){
      put('roof',trim,shop,x,height+.23,z,w+.40,.45,d+.40);
      put('marketGable',stage>=5?0x6b9277:0xb47d49,shop,x,height+1.255,z,w+.40,1.60,d+.40);
    }else if(bakerySplit){
      put('roof',trim,shop,x,5.43,z+d*.30,w+.40,.45,d*.40+.20);
      put('roof',trim,shop,x,height+.23,upperZ,w+.40,.45,upperDepth+.40);
      put('bakeryGable',0xb87446,shop,x,height+1.255,upperZ,w+.40,1.60,upperDepth+.40);
    }else if(recessedUpper){
      put('roof',trim,shop,x,height+.23,upperZ,upperWidth+.40,.45,upperDepth+.40);
    }else{
      put('roof',trim,shop,x,height+.23,z,(steppedPharmacy?w*.58:w)+.40,.45,d+.40);
    }
    if(isPizzeria)put('pizzaGable',0xb95838,shop,x,height+1.355,diningUpper?upperZ:z,(diningUpper?upperWidth:w)+.40,1.80,(diningUpper?upperDepth:d)+.40);
    if(shape===0&&stage>=1){ // Café terrace, counter and chalkboard.
      for(const side of [-1,1]){
        const tx=x+side*w*.34;
        put('cafeTableTop',0x426c64,shop,tx,.80,front+1.39,.78,.09,.78);
        put('cafeTableLeg',0x263a38,shop,tx,.40,front+1.39,.10,.78,.10);
        put('cafeStool',0xbf8451,shop,tx+side*.64,.44,front+1.39,.43,.10,.43);
        put('cafeCup',0xffe7c4,shop,tx,.91,front+1.39,.16,.13,.16);
      }
      put('cafeChalkboardFrame',0xa2764a,shop,x-1.48,.58,front+1.14,.59,1.06,.25);
      put('cafeChalkboard',0x293733,shop,x-1.48,.63,front+1.28,.47,.76,.035);
    }else if(shape===2&&stage>=1){ // Restaurant terrace with set tables and a timber pergola.
      const patioZ=front+1.72, canopy=0x814439;
      put('restaurantTerrace',0xc29979,shop,x,.11,patioZ,w*.94,.17,2.95);
      for(const side of [-1,1]){
        const tx=x+side*w*.34;
        put('restaurantTable',0xffe4bd,shop,tx,.82,patioZ,1.30,.15,1.08);
        put('restaurantStand',0x63473a,shop,tx,.46,patioZ,.15,.72,.15);
        for(const end of [-1,1]){
          put('restaurantPlate',0xfff6e5,shop,tx,.92,patioZ+end*.29,.28,.04,.24);
          put('restaurantChairSeat',0x7b4d32,shop,tx,.46,patioZ+end*.84,.53,.12,.50);
          put('restaurantChairBack',0x9f653e,shop,tx,.69,patioZ+end*1.05,.55,.54,.09);
        }

        put('restaurantPlanter',0xa55e42,shop,x+side*w*.43,.30,front+2.95,.74,.49,.51);
        put('restaurantPlant',0x638d39,shop,x+side*w*.43,.60,front+2.95,.61,.35,.42);
      }

    }else if(shape===3){ // Bookshop: the only storefront with book shelves.
      for(const side of [-1,1])for(let j=0;j<3;j++)
        {
        const sx=x+side*w*.28,sy=1.37+j*.55;
        put('bookShelf',0x8c654d,shop,sx,sy,front+.28,1.35,.10,.15);
        for(let volume=0;volume<5;volume++)
          put('bookSpine',[0xb4525a,0x4e7697,0xdeb16a][(j+volume)%3],shop,
            sx+(volume-2)*.19,sy+.20,front+.33,.14,.29,.11);
      }
    }else if(shape===4){ // Pharmacy: unmistakable green cross.
      put('pharmacyCrossV',0x35aa68,shop,x+w*.35,signY+.64,front+.30,.30,.88,.15);
      put('pharmacyCrossH',0x35aa68,shop,x+w*.35,signY+.64,front+.32,.85,.29,.17);
    }else if(shape===5){ // Fashion boutique: contrasting display podiums.
      for(const side of [-1,1])put('fashionPlinth',0xdbc7b0,shop,x+side*w*.29,.46,front+.32,1.24,.70,.23);
    }else if(shape===7){ // Bakery: warm awning and small window counters.
      for(const side of [-1,1])put('bakeryCounter',0xc08a58,shop,x+side*w*.31,.74,front+.32,1.54,.20,.31);
    }else if(shape===9){ // Gym: bold facade stripes.
      for(const side of [-1,1])put('gymAccent',0x4c886d,shop,x+side*w*.42,height*.60,front+.17,.19,height*.56,.16);
    }else if(shape===11){ // Market: two orderly stalls outside the side windows.
      for(const side of [-1,1]){
        put('marketCounter',0xa77e57,shop,x+side*w*.32,.65,front+1.04,1.68,.43,.66);
        put('marketRoof',trim,shop,x+side*w*.32,2.14,front+1.04,1.78,.13,.91);
        for(const edge of [-1,1])put('marketPost',0x95734f,shop,x+side*w*.32+edge*.78,1.32,front+1.04,.09,1.62,.09);
      }
    }
    // v6.4.3: category-specific BUILDING silhouettes. These are roof/side
    // structures, not extra canopies piled in front of the windows.
    // All fine details are tagged by put() for existing shop chunk LOD.
    const rooftop=height+.52;
    const roofWidth=recessedUpper?upperWidth/w:1;
    const roofDepth=recessedUpper?upperDepth/d:1;
    const roofCenter=recessedUpper?upperZ:z;
    const roofPut=(kind,color,shop,px,py,pz,pw,ph,pd)=>{
      put(kind,color,shop,x+(px-x)*roofWidth,py,roofCenter+(pz-z)*roofDepth,pw*roofWidth,ph,pd*roofDepth);
    };
    if(shape===0){ // Cafe: chimney and small rooftop pergola.
      roofPut('cafeChimney',0x9b6552,shop,x-w*.30,rooftop+.38,z-d*.18,.58,.78,.58);
      for(const side of [-1,1])
        roofPut('cafePergolaPost',0x7d5845,shop,x+side*w*.25,rooftop+.30,z,.12,.60,.12);
      roofPut('cafePergolaBeam',0xb88a60,shop,x,rooftop+.64,z,w*.55,.12,.20);
    }else if(shape===1){ // Supermarket: roof service units, loading dock.
      for(const side of [-1,1])
        roofPut('superRoofVent',0x809596,shop,x+side*w*.38,rooftop+.36,z+d*.36,.90,.62,1.12);
      put('superLoading',0x74898a,shop,x+w/2+.09,1.60,z-d*.13,.15,2.55,2.65);
      put('superLoadingTrim',0xcbd0c8,shop,x+w/2+.20,3.00,z-d*.13,.18,.20,2.86);
    }else if(shape===2){ // Restaurant: tall extraction stack and tiled roof strip.
      roofPut('restaurantFlue',0x827f77,shop,x+w*.30,rooftop+.86,z-d*.19,.42,1.70,.42);
      roofPut('restaurantFlueCap',0x535953,shop,x+w*.30,rooftop+1.74,z-d*.19,.66,.14,.66);
      if(!isPizzeria)roofPut('restaurantRoofBand',0x9d654c,shop,x,rooftop-.06,z,w*.73,.14,d*.72);
    }else if(shape===3){ // Bookshop: pitched central pediment and tall shelves on side.
      roofPut('bookshopCornice',0x92765b,shop,x,rooftop+.05,front-.17,w*.70,.28,.32);
      roofPut('bookshopPediment',0xc4a784,shop,x,rooftop+.45,front-.19,w*.40,.62,.30);
      for(let i=0;i<3;i++)
        put('bookshopSideShelf',0x8d6a4c,shop,x+w/2+.15,1.05+i*.78,z,.15,.10,d*.50);
      if(stage>=4){
        for(const side of [-1,1]){
          roofPut('body',0xe9d9bb,shop,x+side*w*.47,height+.88,z,.22,.85,d*.96);
          roofPut('roof',trim,shop,x+side*w*.47,height+1.34,z,.29,.12,d*.98);
          roofPut('body',0xe9d9bb,shop,x,height+.88,z+side*d*.47,w*.96,.85,.22);
          roofPut('roof',trim,shop,x,height+1.34,z+side*d*.47,w*.98,.12,.29);
        }
      }
      if(stage>=5){
        const domeWidth=w*(stage>=7?.70:stage>=6?.64:.56),domeRise=2+stage*.36,domeZ=z-d*.14;
        put('libraryDrum',0xe9d9bb,shop,x,height+.95,domeZ,domeWidth,1.0,domeWidth);
        put('libraryDome',0x508887,shop,x,height+1.45,domeZ,domeWidth,domeRise*2,domeWidth);
        roofPut('roof',0xc5a75e,shop,x,height+1.45+domeRise+.20,domeZ,.25,.40,.25);
      }
    }else if(shape===4){ // Pharmacy: rooftop cross visible from far away.
      roofPut('pharmacyRoofCrossV',0x31a869,shop,x,rooftop+.92,z,.35,1.75,.35);
      roofPut('pharmacyRoofCrossH',0x31a869,shop,x,rooftop+1.02,z,1.30,.35,.35);
      roofPut('pharmacyWhiteBase',0xe2eee5,shop,x,rooftop+.09,z,1.45,.24,1.03);
    }else if(shape===5){ // Fashion: upper display band and projecting side frame.
      roofPut('fashionCrown',0x4c465b,shop,x,rooftop+.17,z,w*.77,.43,d*.72);
      roofPut('fashionCrownInset',0xd6b3bc,shop,x,rooftop+.42,front-.12,w*.49,.22,.18);
      for(const side of [-1,1])
        put('fashionFin',0x5b5165,shop,x+side*w*.46,(fashionUpper?4.9:height)*.50,z,.18,(fashionUpper?4.9:height)*.96,d*.72);
    }else if(shape===6){ // Workshop: roof sawtooth vents and service flue.
      for(const side of industrialSplit?[-1,1]:[-1,0,1]){
        const ventRoof=industrialSplit?height*(side<0?.90:1)+.52:rooftop;
        const ventX=x+side*w*(industrialSplit?.305:.24),ventZ=industrialSplit?z+d*.42:z;
        put('garageVentHousing',0x71838a,shop,ventX,ventRoof+.30,ventZ,.95,.56,1.60);
        put('garageVentTop',0xb0b6ae,shop,ventX,ventRoof+.62,ventZ,.99,.12,1.70);
      }
      put('garagePipe',0x5c696c,shop,x-w*.43,(industrialSplit?height*.90:height)+1.26,z-d*.28,.27,1.38,.27);
    }else if(shape===7){ // Bakery: two brick chimneys and warm cornice.
      for(const side of [-1,1]){
        roofPut('bakeryChimney',0xb96e52,shop,x+side*w*.25,rooftop+(bakerySplit?1.19:.49),z-d*.15,.62,1.10,.60);
        roofPut('bakeryChimneyCap',0x695c52,shop,x+side*w*.25,rooftop+(bakerySplit?1.78:1.08),z-d*.15,.78,.13,.76);
      }
      if(!bakerySplit)roofPut('bakeryRoofTrim',0xd49b6a,shop,x,rooftop-.07,front-.15,w*.78,.18,.28);
    }else if(shape===8){ // Cinema: roof projector tower, bold marquee fins.
      roofPut('cinemaProjection',0x28384e,shop,x,rooftop+.80,z-d*.14,w*(stage>=2?.28:.35),1.46,d*.32);
      roofPut('cinemaProjectionCap',0x486078,shop,x,rooftop+1.59,z-d*.14,w*(stage>=2?.32:.39),.16,d*.35);
      for(const side of [-1,1])
        put('cinemaMarqueeFin',0xf0c876,shop,x+side*w*.43,signY+.10,front+.38,.18,1.10,.55);
    }else if(shape===9){ // Sports hall: a rising vaulted roof, not extra floors above a shop.
      const rise=[.7,.9,1.2,1.5,1.9,2.4,3.0,3.8][stage];
      put('gymVault',0x527f72,shop,x,height+.47,z,w+.25,rise*2,d+.25);
      if(stage>=3)for(const side of [-1,1]){
        for(const bay of [-.40,0,.40])put('body',trim,shop,x+side*(w/2+.15),height*.49,z+bay*d,.26,height*.95,.23);
      }
    }else if(shape===10){ // Hotel: unmistakable rooftop penthouse + canopy.
      roofPut('hotelPenthouse',style.walls,shop,x,rooftop+.91,z-d*.09,w*.58,1.75,d*.60);
      roofPut('hotelPenthouseRoof',trim,shop,x,rooftop+1.87,z-d*.09,w*.62,.20,d*.64);
      for(const side of [-1,1])
        roofPut('hotelPenthouseWindow',glass,shop,x+side*w*.17,rooftop+.96,progress.premium?z+d*.21+.08:front-d*.22,1.05,.92,.11);
      if(progress.premium){
        // Pool and loungers flank the penthouse; its doorway and the bed emblem stay clear.
        const surface=height+.49,poolX=x+w*.405,poolW=w*.18,poolD=d*.64,poolZ=z-d*.04;
        put('hotelTerraceDoorFrame',trim,shop,x,surface+.80,z+d*.21+.07,1.24,1.60,.13);
        put('hotelTerraceDoorGlass',glass,shop,x,surface+.80,z+d*.21+.15,1.04,1.40,.05);
        put('hotelTerraceThreshold',0xf1dfbb,shop,x,surface+.05,z+d*.21+.23,1.35,.10,.46);
        for(const side of [-1,1])put('hotelPoolLadder',0xbac9c4,shop,poolX+side*.25,surface+.70,poolZ+poolD/2-.24,.055,.90,.055);
        for(const rung of [.40,.65,.90])put('hotelPoolLadder',0xbac9c4,shop,poolX,surface+rung,poolZ+poolD/2-.24,.55,.055,.055);
        put('hotelPoolBase',0xf1dfbb,shop,poolX,surface+.10,poolZ,poolW,.20,poolD);
        put('hotelPoolWater',0x4bbccc,shop,poolX,surface+.215,poolZ,poolW-.18,.03,poolD-.22);
        for(const side of [-1,1]){
          put('hotelPoolRim',0xffedcc,shop,poolX+side*(poolW/2-.045),surface+.25,poolZ,.09,.16,poolD);
          put('hotelPoolRim',0xffedcc,shop,poolX,surface+.25,poolZ+side*(poolD/2-.045),poolW,.16,.09);
        }
        for(const end of [-1,1]){
          const chairX=x-w*.405,chairZ=z+end*d*.24;
          put('hotelSunbedFrame',trim,shop,chairX,surface+.15,chairZ,w*.15,.22,d*.23);
          put('hotelSunbedCushion',0xf5ead3,shop,chairX,surface+.30,chairZ,w*.13,.12,d*.21);
          put('hotelSunbedPillow',0xe2c287,shop,chairX,surface+.40,chairZ-d*.065,w*.12,.12,d*.065);
        }
        for(const side of [-1,1]){
          put('hotelRoofGuard',glass,shop,x+side*w*.495,surface+.61,z,.07,1.08,d*.98);
          put('hotelRoofGuardCap',trim,shop,x+side*w*.495,surface+1.18,z,.10,.08,d*.99);
          put('hotelRoofGuard',glass,shop,x,surface+.61,z+side*d*.495,w*.98,1.08,.07);
          put('hotelRoofGuardCap',trim,shop,x,surface+1.18,z+side*d*.495,w*.99,.08,.10);
        }
      }
    }else if(!marketHall){ // Small market kiosks keep their low canopy modules.
      for(const side of [-1,1]){
        roofPut('marketRoofAwning',side<0?0xd29b5b:0x6c9e83,shop,
          x+side*w*.23,rooftop+.19,z, w*.38,.29,d*.61);
        roofPut('marketRoofCap',0xe3d5ad,shop,x+side*w*.23,rooftop+.38,z,w*.40,.08,d*.64);
      }
    }
    if(seed%3===0&&shape!==6&&shape!==7&&shape!==11&&shape!==9&&!(shape===3&&stage>=2)&&!diningUpper)put('side',style.glass,shop,x+w/2+.1,height*.55,z, .2,1.6,d*.45);
    if(progress.premium&&shape===2){
      const terraceX=x+w/2+1.19,terraceZ=z-d*.17;
      put('shopDiningDeck',0xbd9a74,shop,terraceX,.15,terraceZ,2.48,.23,4.55);
      for(const end of [-1,1]){
        const postZ=terraceZ+end*2.04;
        put('shopPergolaPost',trim,shop,terraceX+1.04,1.65,postZ,.17,2.92,.17);
        put('shopPergolaBeam',trim,shop,terraceX,3.08,postZ,2.50,.19,.23);
        put('shopDiningTable',0xd0a36e,shop,terraceX,.98,terraceZ+end*1.16,1.06,.14,.84);
        put('shopDiningPedestal',0x4a483f,shop,terraceX,.55,terraceZ+end*1.16,.19,.80,.19);
      }
      for(let slat=-3;slat<=3;slat++)
        put('shopPergolaSlat',slat%2?0xe3b88b:trim,shop,terraceX+slat*.34,3.22,terraceZ,.14,.14,4.30);
    }

    furnishBusiness(shop,shape,stage,progress.premium,w,d,height,trim,glass,serviceRear);
  }
  const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.77,metalness:.02});
  const glowMaterial=[...batches.values()].some(batch=>batch.glow)?new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffcf7a,emissiveIntensity:.75,roughness:.40}):material;
  const instanceColor=new THREE.Color();
  for(const batch of batches.values()){
    const mesh=new THREE.InstancedMesh(batch.geo,batch.glow?glowMaterial:material,batch.entries.length);
    mesh.castShadow=batch.casts;
    mesh.receiveShadow=batch.receives;
    for(let i=0;i<batch.entries.length;i++){
      const e=batch.entries[i];dummy.position.set(e.x,e.y,e.z);dummy.rotation.set(0,e.rotation,0);
      dummy.scale.set(e.w,e.h,e.d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix); mesh.setColorAt(i,instanceColor.setHex(e.color));
    }
    mesh.userData.shops=batch.entries.map(entry=>entry.shop);
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
    if(batch.detailed){
      mesh.userData.shopDetailChunk=batch.chunk;
      shopDetailMeshes.push(mesh);
    }
  }
}

// Billboard marketing in permanently reserved, currently unoccupied lots.
// The panels disappear automatically when a shop is bought or a public
// milestone unlocks. They are contained entirely within their reserved plots.


const picker=document.querySelector('#business'),mode=document.querySelector('#finish'),angle=document.querySelector('#angle'),scale=document.querySelector('#scale'),focus=document.querySelector('#focus');
for(const id of [...Array(12).keys(),14]){const option=document.createElement('option');option.value=id;option.textContent=id===14?'Pizzeria':shopStyles[id].name;picker.append(option);}
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.autoClear=false;document.querySelector('#models').append(renderer.domElement);
let fixtures=[];
function dispose(){const geometries=new Set(),materials=new Set();for(const item of fixtures)item.scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);if(o.isLight&&o.shadow?.map)o.shadow.map.dispose();});for(const g of geometries)g.dispose();for(const m of materials)m.dispose();fixtures=[];}
function build(){dispose();const id=Number(picker.value),premium=mode.value==='premium';
 for(let stage=0;stage<8;stage++){
  group=new THREE.Group();shopDetailMeshes=[];progress={points:stage,premium};shopPurchases.splice(0,shopPurchases.length,{id,block:0,x:0,z:0});drawShops();group.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(group),scene=new THREE.Scene();scene.background=new THREE.Color(0xd7e7eb);scene.add(group);
  scene.add(new THREE.HemisphereLight(0xe4f4ff,0x696a48,1.25));const sun=new THREE.DirectionalLight(0xffedcd,2.0);sun.position.set(-45,120,75);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-55;sun.shadow.camera.right=55;sun.shadow.camera.top=110;sun.shadow.camera.bottom=-55;sun.shadow.camera.near=1;sun.shadow.camera.far=250;sun.shadow.normalBias=.035;scene.add(sun);
  const lot=new THREE.Mesh(new THREE.PlaneGeometry(20.45,44.95),new THREE.MeshStandardMaterial({color:0xd4d2bc,roughness:.95}));lot.rotation.x=-Math.PI/2;lot.position.y=.01;lot.receiveShadow=true;scene.add(lot);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(150,150),new THREE.MeshStandardMaterial({color:0xa9bf91,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-.015;ground.receiveShadow=true;scene.add(ground);
  const line=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(20.45,.02,44.95)),new THREE.LineBasicMaterial({color:0x547775}));line.position.y=.03;scene.add(line);
  fixtures.push({scene,box,camera:new THREE.PerspectiveCamera(38,1,.1,700)});
 }
 render();
}
function render(){if(!fixtures.length)return;const root=document.querySelector('#models'),width=root.clientWidth,height=root.clientHeight;renderer.setSize(width,height);renderer.setScissorTest(true);const focused=focus.value!=='all',cellW=width/(focused?1:4),cellH=height/(focused?1:2),common=new THREE.Box3();for(const item of fixtures)common.union(item.box);
 fixtures.forEach((item,index)=>{document.querySelector('#level'+index).style.gridArea=focused?'1 / 1':'auto';document.querySelector('#level'+index).hidden=focused&&index!==Number(focus.value);if(focused&&index!==Number(focus.value))return;const box=scale.value==='common'?common:item.box,center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3()),az=angle.value==='back'?Math.PI*7/6:angle.value==='side'?Math.PI*2/3:Math.PI/6,elev=angle.value==='top'?1.35:.58;const span=Math.max(size.y,size.x,size.z*.82,14),distance=span*2.05;
  item.camera.aspect=cellW/cellH;item.camera.position.set(center.x+Math.sin(az)*Math.cos(elev)*distance,center.y+Math.sin(elev)*distance,center.z+Math.cos(az)*Math.cos(elev)*distance);item.camera.lookAt(center);item.camera.updateProjectionMatrix();const col=focused?0:index%4,row=focused?0:Math.floor(index/4);renderer.setViewport(col*cellW,height-(row+1)*cellH,cellW,cellH);renderer.setScissor(col*cellW,height-(row+1)*cellH,cellW,cellH);renderer.clear();renderer.render(item.scene,item.camera);document.querySelector('#level'+index).textContent='Livello '+(index+1)+' · '+item.box.max.y.toFixed(1)+' m';
 });document.querySelector('#status').textContent=picker.selectedOptions[0].textContent+' · '+mode.selectedOptions[0].textContent+' · 8 modelli di verifica senza modificare la città';
}
picker.onchange=mode.onchange=build;angle.onchange=scale.onchange=focus.onchange=render;window.addEventListener('resize',render);build();
})();