/* Loading transactions: paint before synchronous work, retain the cover through the next rendered frame. */
(function(){'use strict';
 const overlay=document.getElementById('cityLoading'),title=document.getElementById('loadingTitle'),detail=document.getElementById('loadingDetail'),place=document.getElementById('loadingPlace'),progress=document.getElementById('loadingProgress');
 const requiresHub=Object.hasOwn(document.documentElement.dataset,'requiresHub');
 const failureCopy={
  it:['Impossibile caricare MundoCity','Controlla la connessione e ricarica la pagina.','Ricarica la pagina'],
  ar:['تعذّر تحميل MundoCity','تحقّق من اتصالك بالإنترنت وأعد تحميل الصفحة.','إعادة تحميل الصفحة'],
  de:['MundoCity konnte nicht geladen werden','Prüfe deine Internetverbindung und lade die Seite neu.','Seite neu laden'],
  en:['MundoCity couldn’t load','Check your internet connection and reload the page.','Reload page'],
  es:['No se pudo cargar MundoCity','Comprueba tu conexión a internet y recarga la página.','Recargar página'],
  fr:['Impossible de charger MundoCity','Vérifie ta connexion Internet et recharge la page.','Recharger la page'],
  id:['MundoCity gagal dimuat','Periksa koneksi internet, lalu muat ulang halaman.','Muat ulang halaman'],
  ja:['MundoCityを読み込めませんでした','インターネット接続を確認して、ページを再読み込みしてください。','ページを再読み込み'],
  'pt-BR':['Não foi possível carregar MundoCity','Verifique sua conexão com a internet e recarregue a página.','Recarregar página'],
  'zh-Hans':['无法加载 MundoCity','请检查网络连接，然后重新加载页面。','重新加载页面']
 };
 const tickets=new Map(),locked=new Map();let serial=0,generation=0,activeTicket=null,tail=Promise.resolve(),savedFocus=null;
 let hubReady=false,retryButton=null;
 const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
 const paint=async()=>{await frame();await frame();};
 const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 function lock(){for(const el of document.body.children){if(el===overlay||el.tagName==='SCRIPT'||el.tagName==='STYLE'||locked.has(el))continue;locked.set(el,el.inert);el.inert=true;}}
 function present(){if(retryButton)return;const current=tickets.get(activeTicket)||[...tickets.values()].sort((a,b)=>b.priority-a.priority||b.id-a.id)[0];if(!current)return;title.textContent=current.title;detail.textContent=current.detail;place.textContent=current.place||'MundoCity';overlay.dataset.phase=current.phase||'preparing';progress.setAttribute('aria-valuetext',current.detail);}
 function begin(options={}){const id=++serial;generation++;tickets.set(id,{id,priority:10,title:'La tua città prende forma.',detail:'Prepariamo edifici, strade e paesaggio.',...options});if(overlay.hidden){savedFocus=document.activeElement;overlay.hidden=false;overlay.focus({preventScroll:true});}overlay.classList.remove('is-leaving');document.documentElement.dataset.loadingState='visible';lock();present();return id;}
 async function end(id){if(!tickets.delete(id))return;if(activeTicket===id)activeTicket=null;if(tickets.size){present();return;}const expected=++generation;await paint();if(tickets.size||generation!==expected)return;overlay.classList.add('is-leaving');await delay(180);if(tickets.size||generation!==expected)return;overlay.hidden=true;overlay.classList.remove('is-leaving');document.documentElement.dataset.loadingState='hidden';for(const [el,previous]of locked)el.inert=previous;locked.clear();if(savedFocus?.isConnected&&!savedFocus.inert)savedFocus.focus({preventScroll:true});savedFocus=null;}
 function run(task,options={}){const id=begin(options);const job=tail.catch(()=>{}).then(async()=>{activeTicket=id;present();lock();await paint();try{return await task();}finally{await paint();await end(id);}});tail=job.catch(()=>{});return job;}
 function failureLocale(){
  const requested=new URLSearchParams(window.location.search).get('lang');
  let stored=null;
  try{stored=window.localStorage.getItem('casa-language-v1');}catch{}
  const browserLocales=window.navigator.languages||[window.navigator.language];
  const codes=Object.keys(failureCopy);
  for(const value of [requested,stored,...browserLocales]){
   if(!value)continue;
   const normalized=value.toLowerCase();
   const match=codes.find(code=>code.toLowerCase()===normalized)
    ||codes.find(code=>code.split('-')[0]===normalized.split('-')[0]);
   if(match)return match;
  }
  return 'it';
 }
 function showBootFailure(){
  const locale=failureLocale();
  const [heading,message,retry]=failureCopy[locale];
  overlay.lang=locale;
  overlay.dir=locale==='ar'?'rtl':'ltr';
  overlay.dataset.phase='error';
  overlay.dataset.i18nSkip='true';
  document.documentElement.dataset.loadingState='error';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-labelledby',title.id);
  overlay.setAttribute('aria-describedby',detail.id);
  overlay.removeAttribute('aria-live');
  overlay.removeAttribute('aria-atomic');
  title.textContent=heading;
  detail.textContent=message;
  place.textContent='MundoCity';
  progress.hidden=true;
  retryButton=document.createElement('button');
  retryButton.id='loadingRetry';
  retryButton.type='button';
  retryButton.textContent=retry;
  retryButton.addEventListener('click',()=>window.location.reload());
  progress.after(retryButton);
  for(const dialog of document.querySelectorAll('dialog[open]'))dialog.close();
  lock();
  retryButton.focus();
 }
 document.addEventListener('keydown',event=>{
  if(!tickets.size)return;
  if(event.key==='Tab'){
   event.preventDefault();
   (retryButton||overlay).focus({preventScroll:true});
  }
  if(!event.ctrlKey&&!event.metaKey&&!event.altKey)event.stopImmediatePropagation();
 },true);
 window.CityLoading={begin,end,run,isBusy:()=>tickets.size>0,markReady(){hubReady=true;}};
 const boot=begin({phase:'boot',priority:1,title:'Benvenuto, esploratore.',detail:'Carichiamo il mondo e le sue città.'});
 window.addEventListener('load',()=>{
  if(requiresHub&&!hubReady)showBootFailure();
  else void end(boot);
 },{once:true});
})();
