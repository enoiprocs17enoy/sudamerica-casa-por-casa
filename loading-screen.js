/* Loading transactions: paint before synchronous work, retain the cover through the next rendered frame. */
(function(){'use strict';
 const overlay=document.getElementById('cityLoading'),title=document.getElementById('loadingTitle'),detail=document.getElementById('loadingDetail'),place=document.getElementById('loadingPlace');
 const tickets=new Map(),locked=new Map();let serial=0,generation=0,activeTicket=null,tail=Promise.resolve(),savedFocus=null;
 const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
 const paint=async()=>{await frame();await frame();};
 const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 function lock(){for(const el of document.body.children){if(el===overlay||el.tagName==='SCRIPT'||el.tagName==='STYLE'||locked.has(el))continue;locked.set(el,el.inert);el.inert=true;}document.body.setAttribute('aria-busy','true');}
 function present(){const current=tickets.get(activeTicket)||[...tickets.values()].sort((a,b)=>b.priority-a.priority||b.id-a.id)[0];if(!current)return;title.textContent=current.title;detail.textContent=current.detail;place.textContent=current.place||'Sudamérica · Casa por Casa';overlay.dataset.phase=current.phase||'preparing';document.getElementById('loadingProgress').setAttribute('aria-valuetext',current.detail);}
 function begin(options={}){const id=++serial;generation++;tickets.set(id,{id,priority:10,title:'La tua città prende forma.',detail:'Prepariamo edifici, strade e paesaggio.',...options});if(overlay.hidden){savedFocus=document.activeElement;overlay.hidden=false;overlay.focus({preventScroll:true});}overlay.classList.remove('is-leaving');document.documentElement.dataset.loadingState='visible';lock();present();return id;}
 async function end(id){if(!tickets.delete(id))return;if(activeTicket===id)activeTicket=null;if(tickets.size){present();return;}const expected=++generation;await paint();if(tickets.size||generation!==expected)return;overlay.classList.add('is-leaving');await delay(180);if(tickets.size||generation!==expected)return;overlay.hidden=true;overlay.classList.remove('is-leaving');document.documentElement.dataset.loadingState='hidden';for(const [el,previous]of locked)el.inert=previous;locked.clear();document.body.removeAttribute('aria-busy');if(savedFocus?.isConnected&&!savedFocus.inert)savedFocus.focus({preventScroll:true});savedFocus=null;}
 function run(task,options={}){const id=begin(options);const job=tail.catch(()=>{}).then(async()=>{activeTicket=id;present();lock();await paint();try{return await task();}finally{await paint();await end(id);}});tail=job.catch(()=>{});return job;}
 document.addEventListener('keydown',event=>{if(!tickets.size)return;if(event.key==='Tab'){event.preventDefault();overlay.focus({preventScroll:true});}if(!event.ctrlKey&&!event.metaKey&&!event.altKey)event.stopImmediatePropagation();},true);
 window.CityLoading={begin,end,run,isBusy:()=>tickets.size>0};
 const boot=begin({phase:'boot',priority:1,title:'Benvenuto, esploratore.',detail:'Carichiamo il mondo e le sue città.'});
 window.addEventListener('load',()=>{void end(boot);},{once:true});
})();
