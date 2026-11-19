/* A player-facing hub, backed by the existing city and property flows. */
(function(){'use strict';
 if(!window.WorldAtlas||typeof currentCity==='undefined')return;
 const $=id=>document.getElementById(id),aside=document.querySelector('.layout>aside'),stage=document.querySelector('.mapwrap');
 const codes=['en','es','fr','pt-BR','de','ar','ja','zh-Hans','id'];
 const translations={
 'Come funziona?':['How does it work?','¿Cómo funciona?','Comment ça marche ?','Como funciona?','Wie funktioniert es?','كيف تعمل؟','遊び方','怎么玩？','Bagaimana cara bermain?'],
 'Trova la tua casa':['Find your home','Encuentra tu casa','Trouve ta maison','Encontre sua casa','Finde dein Haus','اعثر على منزلك','自分の家を探そう','寻找你的家','Temukan rumahmu'],
 '@nomeutente, città o paese':['@username, city or country','@usuario, ciudad o país','@pseudo, ville ou pays','@usuário, cidade ou país','@Benutzername, Stadt oder Land','@اسم المستخدم، مدينة أو بلد','@ユーザー名、都市、国','@用户名、城市或国家','@pengguna, kota, atau negara'],
 'Impostazioni':['Settings','Ajustes','Paramètres','Configurações','Einstellungen','الإعدادات','設定','设置','Pengaturan'],
 'Apri una città':['Open a city','Abre una ciudad','Ouvre une ville','Abra uma cidade','Stadt öffnen','افتح مدينة','街を開く','打开城市','Buka kota'],
 'Condividi':['Share','Compartir','Partager','Compartilhar','Teilen','مشاركة','共有','分享','Bagikan'],
 'Esplora e impostazioni':['Explore and settings','Explorar y ajustes','Explorer et réglages','Explorar e configurações','Entdecken und Einstellungen','الاستكشاف والإعدادات','探索と設定','探索与设置','Jelajahi dan pengaturan'],
 'La città in un colpo d’occhio':['Your city at a glance','Tu ciudad de un vistazo','Ta ville en un coup d’œil','Sua cidade em um olhar','Deine Stadt auf einen Blick','مدينتك في لمحة','街の様子をひと目で','城市一览','Sekilas kotamu'],
 'Invita gli amici':['Invite friends','Invita a tus amigos','Invite tes amis','Convide seus amigos','Freunde einladen','ادعُ أصدقاءك','友達を招待','邀请好友','Undang teman'],
 'Link copiato!':['Link copied!','¡Enlace copiado!','Lien copié !','Link copiado!','Link kopiert!','تم نسخ الرابط!','リンクをコピーしました！','链接已复制！','Tautan disalin!'],
 'Una casa alla volta.':['One home at a time.','Una casa a la vez.','Une maison à la fois.','Uma casa de cada vez.','Ein Haus nach dem anderen.','منزلًا بعد منزل.','一軒ずつ、街を育てよう。','一栋一栋，建起城市。','Satu rumah demi satu rumah.'],
 'Città in anteprima: dati di gioco dimostrativi.':['Preview city: demonstration game data.','Ciudad de prueba: datos de juego demostrativos.','Ville en aperçu : données de démonstration.','Cidade em prévia: dados demonstrativos.','Vorschaustadt: Spieldaten zur Demonstration.','مدينة تجريبية: بيانات اللعبة توضيحية.','プレビューの街：ゲームデータはデモ用です。','城市预览：游戏数据为演示数据。','Pratinjau kota: data permainan demonstrasi.'],
 'Nessun risultato. Cambia nome o paese dal menu.':['No results. Try another name or country in the menu.','Sin resultados. Cambia el nombre o el país en el menú.','Aucun résultat. Change de nom ou de pays dans le menu.','Sem resultados. Mude o nome ou o país no menu.','Keine Ergebnisse. Ändere Name oder Land im Menü.','لا نتائج. غيّر الاسم أو البلد من القائمة.','結果がありません。名前や国をメニューで変更してください。','没有结果。请在菜单中更改名称或国家。','Tidak ada hasil. Ganti nama atau negara di menu.'],
 'Condividi questa città':['Share this city','Comparte esta ciudad','Partage cette ville','Compartilhe esta cidade','Diese Stadt teilen','شارك هذه المدينة','この街をシェア','分享这座城市','Bagikan kota ini']
 };
 function tr(text){const i=codes.indexOf(window.GameI18n?.locale||'it');return translations[text]?(i<0?text:translations[text][i]):window.GameI18n?.t(text)||text;}
 function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
 function label(node,text){node.dataset.hubText=text;node.textContent=tr(text);return node;}
 function button(text,action,cls=''){const n=label(el('button',cls),text);n.type='button';n.onclick=action;return n;}
 const shell=el('section','hub-shell');shell.dataset.i18nSkip='true';shell.setAttribute('aria-label','MundoCity');
 const brand=el('button','hub-brand'),name=el('span','hub-brand-name','MundoCity');brand.type='button';brand.onclick=goHome;brand.append(el('span','hub-brand-mark','⌂'),name);shell.append(brand);
 const searchArea=el('div','hub-search-area'),form=el('form','hub-search-form'),input=el('input');input.type='search';input.autocomplete='off';input.maxLength=80;input.id='hubSearch';input.setAttribute('aria-controls','hubSearchResults');input.setAttribute('aria-expanded','false');form.setAttribute('role','search');
 const search=button('Cerca',()=>{}),searchIcon=el('span','hub-search-icon','');searchIcon.setAttribute('aria-hidden','true');search.type='submit';form.append(searchIcon,input,search);const results=el('div','hub-results');results.id='hubSearchResults';results.hidden=true;searchArea.append(label(el('h1','hub-visually-hidden'),'Trova la tua casa'),form,results);shell.append(searchArea);
 const tools=el('div','hub-tools'),help=button('?',showHelp,'hub-round'),menu=button('☰',openDrawer,'hub-round hub-menu-trigger');tools.append(help,menu);shell.append(tools);
 const strip=el('div','hub-city-strip'),cityButton=button('',showCity,'hub-city-pill'),cityName=el('strong'),cityCount=el('small'),nextButton=button('',()=>openPublicWorks(),'hub-city-pill hub-next'),nextText=el('span');cityButton.append(el('span','','📍'),cityName,cityCount,el('span','','⌄'));nextButton.append(el('span','','🏛'),nextText);strip.append(cityButton,nextButton);shell.append(strip);
 const launch=el('div','hub-launch'),enterButton=button('Entra nel 3D',activateMainAction),shareButton=button('Condividi',shareCity);launch.append(enterButton,shareButton);shell.append(launch);stage.append(shell);
 function privacyAnchor(className){const link=el('a',className);link.dataset.i18nSkip='true';const update=()=>{const url=new URL('privacy.html',location.href);url.searchParams.set('lang',GameI18n.locale);link.href=url.href;link.textContent=SitePrivacy.ui('title');};update();window.GameI18n?.onChange(update);return link;}
 shell.append(privacyAnchor('hub-privacy-link'));
 const dialog=el('dialog','hub-dialog');dialog.dataset.i18nSkip='true';document.body.append(dialog);let returnFocus=null,currentDialog=null;
 const backdrop=el('button','hub-drawer-backdrop');backdrop.hidden=true;backdrop.type='button';backdrop.tabIndex=-1;backdrop.onclick=closeDrawer;document.body.append(backdrop);
 const isLaboratory=location.pathname.endsWith('/laboratorio.html');
 const closeDrawerButton=button('✕',closeDrawer,'hub-drawer-close'),languageSlot=el('div','hub-language-slot'),drawerTitle=label(el('h2','hub-drawer-title'),'Impostazioni'),languageLabel=label(el('label','hub-language-label'),'Lingua');
 aside.id='hubDrawer';drawerTitle.id='hubDrawerTitle';menu.setAttribute('aria-controls',aside.id);menu.setAttribute('aria-expanded','false');languageLabel.htmlFor='languagePicker';languageSlot.append(languageLabel);
 const drawerLinks=el('div','hub-drawer-links'),exploreLink=button('',showExplore);drawerLinks.append(exploreLink,privacyAnchor('hub-drawer-privacy'));
 aside.prepend(closeDrawerButton,drawerTitle,languageSlot,drawerLinks);aside.inert=true;
 let citySelectLabel,showSelectedCity;
 if(!isLaboratory){
  const publicSelectors=new Set(['worldDirectory','citySelect']);
  for(const child of aside.children){if([closeDrawerButton,drawerTitle,languageSlot,drawerLinks].includes(child)||publicSelectors.has(child.id)||child.htmlFor==='citySelect')continue;child.classList.add('hub-legacy-field');}
  const citySelect=$('citySelect');
  if(citySelect){
   citySelectLabel=label(el('label','hub-city-label'),'Scegli una città');citySelectLabel.htmlFor=citySelect.id;
   showSelectedCity=button('Vai alla città selezionata',()=>{if(!citySelect.value)return;closeDrawer();selectCity(citySelect.value,true);},'hub-show-selected-city');
   citySelect.before(citySelectLabel);citySelect.after(showSelectedCity);
   citySelect.addEventListener('change',()=>closeDrawer());
  }
 }
 function attachSettings(){const language=$('languageSwitcher');if(language&&language.parentNode!==languageSlot)languageSlot.append(language);const owner=$('ownerAccessButton');if(isLaboratory&&owner&&owner.parentNode!==aside)aside.append(owner);}
 function closeResults(){searchRequest++;clearTimeout(timer);results.hidden=true;results.removeAttribute('aria-busy');input.setAttribute('aria-expanded','false');searchStatus.textContent='';}
 function closeDialog(){if(dialog.open)dialog.close();}
 dialog.addEventListener('close',()=>{if(!dialog.open){currentDialog=null;if(returnFocus?.isConnected&&!aside.contains(returnFocus)&&!stage.inert)returnFocus.focus();}});dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();});
 function openDialog(kind,heading){closeDrawer();closeResults();if(!dialog.open)returnFocus=document.activeElement;dialog.replaceChildren();const close=button('✕',closeDialog,'hub-close');close.setAttribute('aria-label',tr('Chiudi'));dialog.append(close,el('h2','',heading));dialog.setAttribute('aria-label',heading);if(!dialog.open)dialog.showModal();currentDialog=kind;}
 let drawerFocus=null,previousStageInert=false;
 function openDrawer(focusCity=false){closeDialog();closeResults();attachSettings();if(!document.body.classList.contains('hub-drawer-open')){drawerFocus=document.activeElement;previousStageInert=stage.inert;}document.body.classList.add('hub-drawer-open');stage.inert=true;aside.inert=false;aside.setAttribute('role','dialog');aside.setAttribute('aria-modal','true');aside.setAttribute('aria-labelledby',drawerTitle.id);backdrop.hidden=false;menu.setAttribute('aria-expanded','true');(focusCity===true?$('citySelect'):closeDrawerButton)?.focus();}
 function closeDrawer(){if(!document.body.classList.contains('hub-drawer-open'))return;document.body.classList.remove('hub-drawer-open');aside.inert=true;stage.inert=previousStageInert;aside.removeAttribute('role');aside.removeAttribute('aria-modal');backdrop.hidden=true;menu.setAttribute('aria-expanded','false');if(!stage.inert)(stage.contains(drawerFocus)?drawerFocus:menu).focus();requestAnimationFrame(()=>map.invalidateSize());}
 function showWelcome(){openDialog('home',ShowcaseUI.t('home_title'));dialog.append(el('p','',ShowcaseUI.t('welcome')),el('p','showcase-home-note',ShowcaseUI.t('preview')+' · '+ShowcaseUI.t('no_accounts')));const actions=el('div','showcase-home-actions');actions.append(button(ShowcaseUI.t('find'),()=>{showFind();},'showcase-primary'),button(ShowcaseUI.t('explore'),showExplore,'showcase-secondary'));const more=el('div','showcase-home-more');more.append(button(ShowcaseUI.t('request'),()=>{closeDialog();ShowcaseUI.openRequest();}),button(ShowcaseUI.t('information'),()=>{closeDialog();ShowcaseUI.openInfo();}));dialog.append(actions,more);}
 function showFind(){returnFocus=input;closeDialog();input.focus();input.select();}
 function showExplore(){openDialog('explore',ShowcaseUI.t('explore'));dialog.append(el('p','',SitePrivacy.ui('explore_help')));const field=el('input','start-country-filter');field.type='search';field.placeholder=SitePrivacy.ui('country_search');field.setAttribute('aria-label',SitePrivacy.ui('country_search'));const list=el('div','start-country-list');list.setAttribute('aria-label',SitePrivacy.ui('country_search'));function render(){const q=WorldSearch.normalize(field.value),matches=q?new Set(WorldSearch.searchCountries(field.value,300).map(c=>c.code)):null,countries=[...WorldAtlas.countries.values()].filter(c=>!matches||matches.has(c.code)).sort((a,b)=>GameI18n.country(a.code,a.name).localeCompare(GameI18n.country(b.code,b.name),GameI18n.locale));list.replaceChildren();for(const c of countries){const b=button(GameI18n.country(c.code,c.name),async()=>{b.disabled=true;try{await WorldSearch.showCountry(c.code);returnFocus=cityButton;closeDialog();openDrawer();}catch{b.disabled=false;notice.textContent=WorldSearch.t('error');}});list.append(b);}if(!countries.length)list.append(el('p','',WorldSearch.t('empty')));}const notice=el('p','showcase-status');notice.setAttribute('role','status');field.oninput=render;dialog.append(field,list,notice);render();field.focus();}
 function goHome(){closeDrawer();closeDialog();closeResults();input.value='';$('v4Panel').hidden=true;$('card').style.display='none';if(active)back();WorldSearch.clearCountry();manualCityNavigation=true;suppressMapEntry=true;try{map.setView([18,0],2);}finally{manualCityNavigation=false;suppressMapEntry=false;}const url=new URL(location.href);url.searchParams.delete('city');url.searchParams.delete('country');history.replaceState(null,'',url);setActiveTab('world');sync();}
 function hasCityContext(){return active||(!WorldSearch.getSelectedCountry()&&map.getZoom()>=8&&map.getBounds().contains([currentCity.lat,currentCity.lng]));}
 function activateMainAction(){if(!hasCityContext()){if(WorldSearch.getSelectedCountry())openDrawer(true);else showExplore();return;}$('v4Panel').hidden=true;closeResults();$(active?'back':'enter').click();}
 function showCity(){openDialog('city',currentCity.name);dialog.append(label(el('p'),'La città in un colpo d’occhio'));const stats=el('div','hub-dashboard-stats');for(const [value,text]of [[homes.length,'Case'],[shopPurchases.length,'Attività'],[PUBLIC_STEPS.filter(s=>count>=s.at).length,'Opere']]){const box=el('div');box.append(el('strong','',value.toLocaleString(window.GameI18n?.locale||'it')),label(el('small'),text));stats.append(box);}dialog.append(stats);
  const next=PUBLIC_STEPS.find(s=>s.at>count),progress=el('div','hub-progress');progress.append(el('strong','',tr(next?.name||'Strutture e obiettivi')));if(next){progress.append(el('p','',count.toLocaleString()+' / '+next.at.toLocaleString()+' '+tr('Case')));const bar=el('progress');bar.max=next.at;bar.value=count;bar.setAttribute('aria-label',tr(next.name));progress.append(bar);}dialog.append(progress);
  const cards=el('div','hub-action-grid');for(const [icon,text,sub,action]of [['🏡','La mia casa','Nome utente',()=>openV4('home')],['🛍️','Attività','Esplora le attività',()=>openCityDirectory('shop')],['🏛️','Opere','Strutture e obiettivi',()=>openPublicWorks()],['🏆','Classifica','Classifica',()=>openV4('ranking')],['🧑','Il mio personaggio','Nome utente',()=>openV4('avatar')],['🌎','Scegli una città','Esplora il mondo',openDrawer]]){const b=el('button');b.type='button';b.append(el('span','',icon),label(el('strong'),text),label(el('small'),sub));b.onclick=()=>{closeDialog();action();};cards.append(b);}dialog.append(cards,label(el('p','hub-guide-note'),'Città in anteprima: dati di gioco dimostrativi.'));
 }
 function showHelp(){showWelcome();}
 let timer,searchRequest=0;
 const searchStatus=el('span','hub-visually-hidden');searchStatus.setAttribute('role','status');searchArea.append(searchStatus);
 results.setAttribute('role','region');
 function showSearchMessage(key){const message=WorldSearch.t(key);results.replaceChildren(el('p','',message));searchStatus.textContent=message;results.hidden=false;input.setAttribute('aria-expanded','true');}
 async function runSearchAction(action){const fromResults=results.contains(document.activeElement);closeResults();try{await action();if(fromResults&&document.activeElement===document.body)(hasCityContext()?cityButton:enterButton).focus({preventScroll:true});}catch(e){console.warn('Ricerca',e);showSearchMessage('error');if(fromResults)input.focus();}}
 async function renderSearch(){
  const request=++searchRequest,raw=input.value.trim(),q=raw.replace(/^@/,'');
  if(!q){closeResults();return;}
  showSearchMessage('loading');results.setAttribute('aria-busy','true');
  try{
   const onlyPeople=raw.startsWith('@'),people=WorldSearch.searchResidents(q);
   const countries=onlyPeople?[]:WorldSearch.searchCountries(q,3);
   const cities=onlyPeople||[...q].length<2?[]:await WorldSearch.searchCities(q,6);
   if(request!==searchRequest||input.value.trim()!==raw)return;
   const items=[
    ...people.map(h=>['🏡','@'+h.user,h.cityName,()=>WorldSearch.openResident(h)]),
    ...countries.map(c=>['🌍',GameI18n.country(c.code,c.name),WorldSearch.t('country'),()=>WorldSearch.showCountry(c.code)]),
    ...cities.map(c=>['📍',c.name,GameI18n.country(c.countryCode,WorldAtlas.countries.get(c.countryCode)?.name||c.countryCode),()=>WorldSearch.openCity(c)])
   ];
   results.replaceChildren();results.removeAttribute('aria-busy');
   searchStatus.textContent='';
   for(const [icon,title,subtitle,action] of items){
    const row=el('button'),glyph=el('span','',icon),text=el('span');
    row.type='button';glyph.setAttribute('aria-hidden','true');text.dir='auto';
    text.append(el('strong','',title),el('small','',subtitle));
    row.append(glyph,text);row.onclick=()=>void runSearchAction(action);results.append(row);
   }
   if(!items.length)showSearchMessage([...q].length<2&&!onlyPeople?'hint':'empty');
  }catch{
   if(request===searchRequest){results.removeAttribute('aria-busy');showSearchMessage('error');}
  }
 }
 input.addEventListener('input',()=>{searchRequest++;clearTimeout(timer);timer=setTimeout(()=>void renderSearch(),160);});input.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&!results.hidden&&results.querySelector('button')){e.preventDefault();results.querySelector('button').focus();}if(e.key==='Escape')closeResults();});
 results.addEventListener('keydown',e=>{const buttons=[...results.querySelectorAll('button')],index=buttons.indexOf(document.activeElement);if(e.key==='Escape'){e.stopPropagation();closeResults();input.focus();}if(e.key==='ArrowDown'&&buttons.length){e.preventDefault();buttons[(index+1)%buttons.length]?.focus();}if(e.key==='ArrowUp'){e.preventDefault();if(index===0)input.focus();else buttons[index-1]?.focus();}});
 form.addEventListener('submit',async e=>{e.preventDefault();clearTimeout(timer);const raw=input.value.trim(),q=raw.replace(/^@/,'');if(!q){input.focus();return;}const resident=WorldSearch.searchResidents(q).find(h=>h.user.toLowerCase()===q.toLowerCase());if(resident){void runSearchAction(()=>WorldSearch.openResident(resident));return;}if(!raw.startsWith('@')){const country=WorldSearch.searchCountries(q).find(c=>WorldSearch.countryExact(c,q));if(country){void runSearchAction(()=>WorldSearch.showCountry(country.code));return;}const request=++searchRequest;showSearchMessage('loading');try{const city=(await WorldSearch.searchCities(q)).find(c=>[c.name,c.asciiName].some(n=>WorldSearch.normalize(n)===WorldSearch.normalize(q)));if(request!==searchRequest||input.value.trim()!==raw)return;if(city){void runSearchAction(()=>WorldSearch.openCity(city));return;}}catch{if(request===searchRequest)showSearchMessage('error');return;}}void renderSearch();});
 document.addEventListener('pointerdown',e=>{if(!searchArea.contains(e.target))closeResults();});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeResults();closeDrawer();}if(e.key==='Tab'&&document.body.classList.contains('hub-drawer-open')){const nodes=[...aside.querySelectorAll('button,input,select,a[href]')].filter(n=>!n.disabled&&n.getClientRects().length),first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
 const nav=document.querySelector('.v4Nav'),tabs=[...nav.querySelectorAll('[data-v4]')];nav.setAttribute('role','navigation');
 function setActiveTab(tab){for(const node of tabs){const selected=node.dataset.v4===tab;node.classList.toggle('hub-selected',selected);node.setAttribute('aria-pressed',String(selected));}}
 for(const tab of ['world','home','shop','works','ranking','avatar','directory']){const node=tabs.find(n=>n.dataset.v4===tab);if(node)nav.append(node);}
 for(const node of tabs){const tab=node.dataset.v4;if(!isLaboratory&&tab==='directory')node.hidden=true;node.addEventListener('click',event=>{
  closeDialog();closeDrawer();closeResults();setActiveTab(tab);
  if(tab==='world'){event.stopImmediatePropagation();goHome();}
  else if(!isLaboratory&&(tab==='home'||(!hasCityContext()&&tab==='avatar'))){event.stopImmediatePropagation();$('v4Panel').hidden=true;showFind();}
  else if(!isLaboratory&&!hasCityContext()){event.stopImmediatePropagation();activateMainAction();}
  else if(!isLaboratory&&tab==='shop'){event.stopImmediatePropagation();openCityDirectory('shop');}
 },true);}
 setActiveTab('world');
 let copiedTimer;
 async function shareCity(){const url=new URL('./',location.href);url.searchParams.set('city',currentCity.id);url.searchParams.set('country',currentCity.countryCode||'AR');url.searchParams.set('lang',window.GameI18n?.locale||'it');if(navigator.share){try{await navigator.share({title:currentCity.name+' · MundoCity',url:url.href});return;}catch(error){if(error.name==='AbortError')return;}}try{await navigator.clipboard.writeText(url.href);clearTimeout(copiedTimer);shareButton.textContent=tr('Link copiato!');searchStatus.textContent=tr('Link copiato!');copiedTimer=setTimeout(()=>{shareButton.textContent=tr('Condividi');searchStatus.textContent='';},2400);}catch{openDialog('share',tr('Condividi questa città'));const field=el('input');field.readOnly=true;field.value=url.href;field.setAttribute('aria-label',tr('Condividi questa città'));dialog.append(field);field.focus();field.select();}}
 function sync(){const locale=GameI18n.locale,format=n=>n.toLocaleString(locale),cityContext=hasCityContext();strip.hidden=!cityContext;shareButton.hidden=!cityContext;cityName.textContent=currentCity.name;cityName.dir='auto';cityCount.textContent=format(homes.length)+' '+tr('Case');const next=PUBLIC_STEPS.find(s=>s.at>count);nextText.textContent=next?tr(next.name)+' · '+format(count)+'/'+format(next.at):tr('Strutture e obiettivi');enterButton.textContent=active?tr('Torna alla mappa'):cityContext?tr('Entra nel 3D'):WorldSearch.getSelectedCountry()?tr('Scegli una città'):ShowcaseUI.t('explore');attachSettings();}
 function refresh(){for(const n of [...shell.querySelectorAll('[data-hub-text]'),drawerTitle,languageLabel,citySelectLabel,showSelectedCity])if(n&&n!==cityButton&&n!==nextButton&&n!==help&&n!==menu)n.textContent=tr(n.dataset.hubText);input.placeholder=tr('@nomeutente, città o paese');input.setAttribute('aria-label',input.placeholder);results.setAttribute('aria-label',tr('Cerca'));help.setAttribute('aria-label',tr('Come funziona?'));help.title=tr('Come funziona?');menu.setAttribute('aria-label',tr('Impostazioni'));menu.title=tr('Impostazioni');closeDrawerButton.setAttribute('aria-label',tr('Chiudi'));backdrop.setAttribute('aria-label',tr('Chiudi'));exploreLink.textContent=ShowcaseUI.t('explore');nav.setAttribute('aria-label',tr('Mondo'));sync();brand.setAttribute('aria-label',ShowcaseUI.t('home_label'));brand.title=ShowcaseUI.t('home_label');if(currentDialog==='home')showWelcome();else if(currentDialog==='explore')showExplore();else if(currentDialog==='city')showCity();if(input.value.trim()&&!results.hidden)void renderSearch();}
 const observer=new MutationObserver(sync);for(const id of ['counter','currentCityName'])observer.observe($(id),{childList:true,subtree:true,characterData:true});new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});window.GameI18n?.onChange(refresh);
 map.on('moveend zoomend',sync);document.body.classList.add('game-hub');refresh();requestAnimationFrame(()=>map.invalidateSize());
 const params=new URL(location.href).searchParams,cityId=params.get('city'),country=params.get('country');if(!isLaboratory&&!cityId&&!country)requestAnimationFrame(goHome);if(cityId&&country&&WorldAtlas.countries.has(country))void WorldAtlas.loadCountry(country).then(()=>{if(WorldAtlas.byId.has(cityId))selectCity(cityId,true);}).catch(()=>{});else if(country&&WorldAtlas.countries.has(country))void WorldSearch.showCountry(country).catch(()=>{});
 window.CityLoading?.markReady();
})();
