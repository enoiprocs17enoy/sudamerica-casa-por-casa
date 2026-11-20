/* Source-driven 3D square details. Models are stylised reconstructions, not scans. */
(function(){
'use strict';
const MODEL_SPECS={
 'karachi-mazar-e-quaid':{height:36,width:75,depth:75,parcelWidth:.46,minimumScale:.035},'trujillo-liberty-monument':{height:14.85,width:11.5,depth:11.5,parcelWidth:.28},'alcazar-cervantes-riders':{height:6.5,width:6.6,depth:5.1},'gravina-benedict-statue':{height:6.2,width:3.4,depth:3.4},'ceglie-clock-tower':{height:12,width:5,depth:4.7},'assisi-three-lions-fountain':{height:3.75,width:7.5,depth:7.5},'verrazzano-memorial':{height:7.2,width:4.3,depth:4.3},herterichsbrunnen:{height:5.1,width:7.7,depth:7.7,parcelWidth:.5},'iquique-naval-monument':{height:13.3,width:8.2,depth:8.2},'floral-calendar':{height:1.2,width:8},'arenales-ensemble':{height:11,width:10},'freedom-chains':{height:7,width:5},pyramid:{height:13,width:7},obelisk:{height:10,width:3},column:{height:10,width:4},'liberty-column':{height:13,width:6},equestrian:{height:8,width:7},'equestrian-fountain':{height:8,width:9},'standing-sword':{height:7,width:4},'standing-civil':{height:10,width:7},'ornate-fountain':{height:7,width:9},'liberty-fountain':{height:7,width:8},fountain:{height:3,width:6},bust:{height:4,width:3},plaque:{height:1.5,width:2},'classical-figure':{height:3,width:2}};
MODEL_SPECS['hangzhou-wulin-eight-girls']={height:6.35,width:31,depth:31,parcelWidth:.58};
MODEL_SPECS['suzhou-gate-to-the-east']={height:301.8,width:180,depth:102,parcelWidth:.50,minimumScale:.032};
MODEL_SPECS['suzhou-jinji-lake-fountain']={height:65,width:140,depth:200,parcelWidth:.38,minimumScale:.034};
MODEL_SPECS['tehran-azadi-tower']={height:45,width:70,depth:42,parcelWidth:.48};
MODEL_SPECS['tunis-clock-tower']={height:37.5,width:28,depth:28,parcelWidth:.65};
MODEL_SPECS['tunis-bourguiba-equestrian']={height:8.95,width:4.8,depth:5.4,parcelWidth:.32};
MODEL_SPECS['kinshasa-limete-tower']={height:210,width:183,depth:190,parcelWidth:.96};
MODEL_SPECS['algiers-emir-abdelkader']={height:11.4,width:12.1,depth:13.1,parcelWidth:.62};
MODEL_SPECS['casablanca-mohammed-v-fountain']={height:6,width:26.5,depth:26.5,parcelWidth:.53};
MODEL_SPECS['casablanca-palais-justice']={height:19,width:86,depth:24,parcelWidth:.62};
MODEL_SPECS['rabat-bab-el-had-gate']={height:10.8,width:36.1,depth:23,parcelWidth:.62};
MODEL_SPECS['rabat-bab-el-had-fountain']={height:2.2,width:10.6,depth:10.6,parcelWidth:.34};
MODEL_SPECS['fray-bentos-bandstand']={height:6.2,width:7.5,depth:7.5};
MODEL_SPECS['paraitinga-bandstand']={height:5.6,width:7.5,depth:7.5};
MODEL_SPECS['accademia-conegliano']={height:15,width:32,depth:18,parcelWidth:.80};
MODEL_SPECS['stone-sphinx']={height:3.15,width:3.6};
MODEL_SPECS['trogir-clock-tower']={height:13.3,width:5.2,depth:3.8};
MODEL_SPECS['condamine-market-hall']={height:9.4,width:21.4,depth:60,parcelWidth:.56};
MODEL_SPECS['hvar-pjaca-well']={height:1.05,width:2.6,depth:4.4};
MODEL_SPECS['hallstatt-trinity-column']={height:6.1,width:3.4};
MODEL_SPECS['palmanova-stendardo']={height:11.5,width:8.4};
MODEL_SPECS['arequipa-tuturutu']={height:5.5,width:10};
MODEL_SPECS['warsaw-old-town-mermaid']={height:3.43,width:2.65,depth:2.45};
MODEL_SPECS['patna-gandhi-memorial']={height:21.95,width:17.1,depth:14.4,parcelWidth:.35,minimumScale:.04};
MODEL_SPECS['pimpri-ambedkar-pavilion']={height:7.4,width:5.2,depth:5.2};
MODEL_SPECS['mumbai-flora-fountain']={height:10.1,width:12.4,depth:12.4,parcelWidth:.42};
MODEL_SPECS['mumbai-martyrs-memorial']={height:6.5,width:4.24,depth:3.54};
MODEL_SPECS['bengaluru-freedom-park-watchtower']={height:10.7,width:6.6,depth:6.6};
MODEL_SPECS['bengaluru-freedom-park-block-east']={height:5.4,width:61.065,depth:7.428,parcelWidth:.76};
MODEL_SPECS['bengaluru-freedom-park-block-southeast']={height:5.4,width:49.445,depth:7.896,parcelWidth:.76};
MODEL_SPECS['lucknow-hussainabad-clock']={height:67.3608,width:8.75,depth:8.75,parcelWidth:.35};
MODEL_SPECS['lucknow-hussainabad-tank']={height:3.36,width:104,depth:116,parcelWidth:.70};
MODEL_SPECS['pune-bajirao-equestrian']={height:7.39,width:9.63,depth:10.19,parcelWidth:.36};
MODEL_SPECS['pune-shaniwarwada-stage']={height:1.26,width:21.52,depth:11.33,parcelWidth:.62};
MODEL_SPECS['pune-dilli-darwaza']={height:13.5,width:29.45,depth:19.82,parcelWidth:.70};
MODEL_SPECS['chennai-victoria-public-hall']={height:34,width:53,depth:30,parcelWidth:.84};
MODEL_SPECS['kanpur-king-edward-hall']={height:22,width:70,depth:43,parcelWidth:.84};
MODEL_SPECS['kanpur-gandhi-pavilion']={height:7.55,width:11.2,depth:12.2,parcelWidth:.32};
Object.assign(MODEL_SPECS,{
 'xian-dayan-pagoda':{height:64.5,width:26.66,depth:26.66,parcelWidth:.58,minimumScale:.04},
 'shenzhen-civic-light-tower':{height:25,width:13.22,depth:6.06,parcelWidth:.3,minimumScale:.04},
 'osaka-central-public-hall':{height:26.63,width:56.53,depth:62.94,parcelWidth:.55,minimumScale:.04},
 'bangkok-royal-pavilion':{height:10.8,width:19.82,depth:20.26,parcelWidth:.44,minimumScale:.04},
 'bangkok-rama-iii':{height:6.35,width:8.4,depth:6.4,parcelWidth:.26,minimumScale:.04},
 'miami-pepper-fountain':{height:13.2,width:48.35,depth:48.35,parcelWidth:.62,minimumScale:.04},
 'miami-slide-mantra':{height:3.20,width:5.6,depth:5.6,parcelWidth:.25,minimumScale:.04},
 'new-orleans-jackson-equestrian':{height:6.15,width:4.6,depth:5.4,parcelWidth:.26,minimumScale:.04},
 'new-orleans-st-louis-cathedral':{height:52.4,width:30.49,depth:59.21,parcelWidth:.48,minimumScale:.04},
 'jeju-sanjicheon-gallery':{height:14.6,width:30.72,depth:15.44,parcelWidth:.45,minimumScale:.04},
 'nishinomiya-earthquake-memorial':{height:3,width:14.1,depth:9.7,parcelWidth:.40,minimumScale:.04},
 'dhaka-tower-of-light':{height:45.72,width:12.02,depth:10.51,parcelWidth:.40,minimumScale:.035},
 'hongshan-dong-biwu':{height:5.9,width:4.1,depth:3.5},
 'kindi-mosque-ensemble':{height:25,width:82.64,depth:69.49,parcelWidth:.85},
 'nelson-anzac-cenotaph':{height:4.5,width:2.8,depth:2.8},
 'orange-robertson-rotunda':{height:5.5,width:9.2,depth:9.2,parcelWidth:.4},
 'orange-whitney-fountain':{height:3.4,width:6,depth:6},
 'orange-boer-lamp':{height:5.1,width:3.3,depth:3.3},
 'chicago-picasso':{height:16,width:10.6,depth:6.7,parcelWidth:.47},
 'chicago-daley-jets':{height:2.2,width:14.2,depth:12.2,parcelWidth:.46},
 'blitar-pecut-fountain':{height:6.4,width:28,depth:28,parcelWidth:.50},
 'corona-subway-stairs':{height:3.65,width:2.25,depth:6.65},
 'corona-information-board':{height:2.16,width:1.24,depth:.23},
 'corona-wayfinding-map':{height:2.35,width:.79,depth:.24},
 'corona-cycle-stands':{height:.90,width:1.75,depth:.77},
 'corona-water-fountain':{height:1.06,width:.54,depth:.48},
 'roberto-clemente-para-roberto':{height:3.81,width:3.68,depth:3.68},
 'times-square-tkts':{height:2.45,width:7.38,depth:9},
 'times-square-duffy':{height:5.24,width:2.5,depth:2.55},
 'times-square-cohan':{height:4.35,width:2.0,depth:1.8},
 'times-square-new-year-tower':{height:77.35,width:9.55,depth:21.30},
 'stapleton-village-hall':{height:13,width:27.18,depth:14.72,parcelWidth:.66},
 'stapleton-marciante-gazebo':{height:4.7,width:7.21,depth:7.1},
 'stapleton-comfort-station':{height:6.3,width:11.23,depth:10.8,parcelWidth:.38},
 'brooklyn-borough-hall':{height:20.65,width:25.06,depth:17.95,parcelWidth:.66},
 'brooklyn-beecher':{height:5.05,width:3.34,depth:3.12},
 'brooklyn-columbus':{height:4.7,width:2.44,depth:2.44},
 'jamaica-king-manor':{height:12.7,width:21.51,depth:36.51,parcelWidth:.60},
 'jamaica-king-bandstand':{height:6.7,width:11.8,depth:11.8,parcelWidth:.40},
 'lagos-tinubu-wings':{height:5.75,width:13.2,depth:13.2,parcelWidth:.56},
 'chengdu-tianfu-west-dragon':{height:10.8,width:13.5,depth:13.5,parcelWidth:.48},
 'chengdu-tianfu-east-spiral':{height:10.8,width:8.1,depth:8.1},
 'chengdu-tianfu-sunbird':{height:1.05,width:15,depth:15,parcelWidth:.52},
 'chengdu-tianfu-mao':{height:28,width:9.2,depth:9.1,parcelWidth:.34},
 'washington-arch':{height:9.2,width:7.7,depth:2.9,parcelWidth:.38},
 'vientiane-patuxay-gate':{height:42,width:24,depth:24,parcelWidth:.50},
 'vientiane-patuxay-fountain':{height:3.25,width:34,depth:34,parcelWidth:.55},
 'washington-fountain':{height:2.25,width:7.4,depth:7.4,parcelWidth:.52},
 'washington-garibaldi':{height:6.3,width:3.05,depth:3.05},
 'holley-monument':{height:3.8,width:3.15,depth:1.2},
 'toronto-archer':{height:3.5,width:3.6,depth:2.6},
 'boston-embrace':{height:6.1,width:9.76,depth:8.0,parcelWidth:.50},
 'franklin-fountain':{height:2.5,width:6.8,depth:6.8,parcelWidth:.51},
 'freedom-arches':{height:4.8,width:9.9,depth:6.8,parcelWidth:.64},
 'liberty-carousel':{height:5.2,width:7.8,depth:7.8,parcelWidth:.25},
 'telc-marian-column':{height:11.5,width:8.7,depth:8.7},
 'telc-margaret':{height:4.2,width:6.9,depth:6.9},
 'telc-silenus':{height:3.5,width:6.9,depth:6.9},
 'se-emblema':{height:8.2,width:2.6,depth:.6},
 'se-totem':{height:5.60,width:2.2,depth:2},
 'se-dialogo':{height:4.8,width:5.3,depth:2.05},
 'santiago-cardenal-caro':{height:5.1,width:2.3,depth:2.1},
 'se-anchieta':{height:9.37,width:2.6,depth:2.05},
 'marco-zero':{height:1.15,width:5.7,depth:5.7,parcelWidth:.3},
 'dam-memorial':{height:12,width:6.9,depth:6.9,parcelWidth:.4},
 'senate-monument':{height:8.9,width:6.8,depth:6.8,parcelWidth:.42},
 'preseren-monument':{height:7.2,width:5.2,depth:5.2,parcelWidth:.39},
 'marianne-republique':{height:12,width:7.5,depth:7.5,parcelWidth:.42},
 'bundesplatz-jets':{height:4.0,width:14,depth:14,parcelWidth:.65},
 'rajiv-chowk-flagpole':{height:63.09,width:27.43,depth:2.4,parcelWidth:.40},
 'flagpole':{height:8,width:.65},
 'tiananmen-flagpole':{height:7.5,width:3.8,depth:3.4},
 'taksim-mosque':{height:64.8,width:94.14,depth:50.90,parcelWidth:.66},
 'taksim-republic-monument':{height:11,width:17,depth:17,parcelWidth:.45},
 'haizhu-liberation-monument':{height:11.5,width:10.2,depth:10.2,parcelWidth:.45},
 'pohang-homigot-lighthouse':{height:26.4,width:8.4,depth:8.4,parcelWidth:.26},
 'tianjin-century-clock':{height:40,width:19,depth:8.4,parcelWidth:.55},
 'copenhagen-dragon-fountain':{height:5.3,width:14,depth:14,parcelWidth:.42},
 'gdansk-neptune-fountain':{height:6.1,width:6.6,depth:6.6},
 'toluca-miguel-hidalgo':{height:7,width:4.35,depth:4.35},
 'peoples-heroes-memorial':{height:7.52,width:10,depth:12.2,parcelWidth:.40},
 'chairman-mao-memorial-hall':{height:4.12,width:10,depth:10,parcelWidth:.42},
 'liberty-paifang':{height:6,width:16,depth:2.15,parcelWidth:.70},
 'tijuana-millennium-arch':{height:60,width:33.5,depth:3.3,parcelWidth:.75},
 'san-gimignano-cistern':{height:1.65,width:4.5,depth:4.5},
 'nankinmachi-azumaya':{height:6.6,width:4.92,depth:4.92,parcelWidth:.45},
 'tabaco-plaza-gazebo':{height:4.8,width:6.4,depth:6.4,parcelWidth:.34},
 'bratislava-maximilian-fountain':{height:10.5,width:10.4,depth:8.6},
 'bratislava-city-guard':{height:2.68,width:.91,depth:1.42},
 'bratislava-napoleonic-soldier':{height:1.53,width:1.80,depth:1.18},
 'jicin-coronation-well':{height:7,width:7.2,depth:3.9,parcelWidth:.5},
 'jicin-marian-column':{height:11,width:5.3,depth:5.3,parcelWidth:.5},
 'nguyen-hue-ho-chi-minh':{height:7.2,width:3.4,depth:3.1,parcelWidth:.5},
 'hanoi-ly-thai-to':{height:10.1,width:5.66,depth:5.56,parcelWidth:.5},
 'hanoi-octagonal-bandstand':{height:6.9,width:12.82,depth:13.38,parcelWidth:.55},
 'tashkent-amir-temur':{height:9,width:4.85,depth:7.15,parcelWidth:.45},
 'lahore-hazuri-baradari':{height:5.23,width:21.66,depth:21.66,parcelWidth:.62},
 'islamabad-monument-petals':{height:17.7,width:68.1,depth:55.6,parcelWidth:.68},
 'registan-ulugh-beg':{height:34.7,width:58.71,depth:87.33,parcelWidth:.86},
 'lusaka-mwanawasa-mausoleum':{height:6.4,width:15.43,depth:15.92,parcelWidth:.52},
 'lusaka-sata-mausoleum':{height:9.2,width:17.16,depth:14.88,parcelWidth:.52},
 'lusaka-chiluba-mausoleum':{height:7.9,width:15.89,depth:21.07,parcelWidth:.54},
 'harare-unity-fountain':{height:4.32,width:20.9,depth:20.9,parcelWidth:.56},
 'gaborone-three-dikgosi':{height:7,width:13.6,depth:4.35,parcelWidth:.65},
 'gaborone-shelter-north-west':{height:4.6,width:8.68,depth:8.68,parcelWidth:.30},
 'gaborone-shelter-north-east':{height:3.15,width:3.80,depth:3.80},
 'gaborone-shelter-central':{height:3.05,width:3.26,depth:3.80},
 'registan-sher-dor':{height:32,width:60.23,depth:71.79,parcelWidth:.86},
 'registan-tilla-kari':{height:30,width:78.71,depth:73.87,parcelWidth:.86},
 'islamabad-unity-pillars':{height:4.7,width:17,depth:17,parcelWidth:.36},
 'jicin-amphitrite-fountain':{height:3.9,width:6.35,depth:6.1,parcelWidth:.5},
 'santo-domingo-corregidora':{height:4.85,width:11.26,depth:11.26,parcelWidth:.55},
 'andorra-casa-de-la-vall':{height:14.5,width:20.6,depth:17.2,parcelWidth:.7},
 'ordino-comunidor':{height:4.86,width:4.35,depth:4.8},
 'solsona-ca-aguilar-porch':{height:9.6,width:8.85,depth:4.4},
 'barcelona-generalitat-facade':{height:18.4,width:36.55,depth:6.4,parcelWidth:.92},
 'barcelona-city-hall-facade':{height:16.75,width:46.7,depth:6,parcelWidth:.92},
 'valladolid-conde-ansurez':{height:9.3,width:4,depth:4},
 'valladolid-casa-consistorial':{height:26,width:40.79,depth:5.8,parcelWidth:.88},
 'gijon-plaza-mayor-lantern':{height:6.6,width:2.6,depth:2.6},
 'gijon-casa-consistorial':{height:15.6,width:20.51,depth:5.7,parcelWidth:.76},
 'murcia-belluga-cathedral':{height:54,width:42.22,depth:8.4,parcelWidth:.88},
 'murcia-belluga-moneo':{height:15.6,width:15.71,depth:6,parcelWidth:.66},
 'murcia-belluga-palace':{height:14.8,width:49.46,depth:6.4,parcelWidth:.86},
 'girona-defenders-monument':{height:5.66,width:5.55,depth:8.45},
 'girona-turtle-fountain':{height:1.91,width:1.40,depth:1.47},
 'girona-independencia-newsstand':{height:2.95,width:4.30,depth:3.11},
 'reus-casa-navas-facade':{height:20,width:12.15,depth:6.3,parcelWidth:.65},
 'vic-merma':{height:1.89,width:2.31,depth:2.31},
 'pamplona-castillo-bandstand':{height:8.41,width:13.1,depth:16.2,parcelWidth:.48},
 'oviedo-escandalera-fountain':{height:3.25,width:11.3,depth:11.3,parcelWidth:.54},
 'oviedo-botero-maternity':{height:3.06,width:2.32,depth:2.13},
 'oviedo-valdes-asturcones':{height:1.57,width:6.7,depth:5.75,parcelWidth:.40},
 'vitoria-battle-memorial':{height:17,width:7.8,depth:7.8},
 'vitoria-green-topiary':{height:3,width:7,depth:1.32},
 'segovia-music-bandstand':{height:6.3,width:8.12,depth:9.5,parcelWidth:.34},
 'segovia-machado':{height:1.85,width:.82,depth:.62},
 'segovia-press-kiosk':{height:2.58,width:4.03,depth:4.03},
 'malaga-torrijos-obelisk':{height:17,width:10.11,depth:10.11,parcelWidth:.54},
 'malaga-seated-picasso':{height:1.4,width:1.95,depth:1.1},
 'valencia-city-hall-fountain':{height:4.4,width:20,depth:20,parcelWidth:.54},
 'cordoba-tendillas-captain-fountain':{height:8.29,width:19.29,depth:19.29,parcelWidth:.56},
 'cordoba-tendillas-floor-jets':{height:1.72,width:9.13,depth:9.13,parcelWidth:.45},
 'valencia-vinatea':{height:8.3,width:2.47,depth:2.47},
 'alicante-luceros-fountain':{height:15,width:20,depth:20,parcelWidth:.72},
 'cuenca-calderon-monument':{height:6.5,width:3.9,depth:3.9},
 'cuenca-calderon-glorieta':{height:4.8,width:7.2,depth:7.2},
 'budapest-millennium-column':{height:40.5,width:17,depth:17,parcelWidth:.5},
 'budapest-millennium-colonnade-north':{height:8.2,width:38,depth:14,parcelWidth:.85},
 'budapest-millennium-colonnade-east':{height:8.2,width:16,depth:38,parcelWidth:.85},
 'budapest-heroes-memorial-stone':{height:.85,width:10,depth:6,parcelWidth:.5},
 'luanda-agostinho-neto-memorial':{height:120,width:48,depth:46,parcelWidth:.8},
 'brooklyn-gaynor-memorial':{height:3.2,width:5.13,depth:1.85},
 'brooklyn-war-memorial':{height:5.6,width:15.44,depth:8.3},
 'dakar-independence-obelisk':{height:16.4,width:9.2,depth:9.2},
 'porto-novo-toffa':{height:7.1,width:3.8,depth:3.8},
 'maputo-city-hall':{height:22,width:68,depth:38,parcelWidth:.8},
 'maputo-samora-machel':{height:13.5,width:8.9,depth:8.9,parcelWidth:.6},
 'accra-independence-arch':{height:30,width:51,depth:19,parcelWidth:.8},
 'accra-black-star-gate':{height:23,width:25,depth:10,parcelWidth:.8},
 'shanghai-huangpu-light-fountain':{height:5.3,width:32.6,depth:32.6,parcelWidth:.8},
 'hong-kong-thomas-jackson':{height:6.2,width:3.65,depth:3.8},
 'kingston-manley-statue':{height:5,width:3,depth:3},
 'kingston-bustamante-statue':{height:5,width:3,depth:3},
 'waharoa':{height:7,width:10.132,depth:.62,parcelWidth:.38},
 'delhi-baradari':{height:4.8,width:8.4,depth:8.4,parcelWidth:.32},
 'delhi-entry-arcade':{height:3.6,width:12.4,depth:.9,parcelWidth:.42},
 'delhi-open-air-theatre':{height:1.3,width:15,depth:11,parcelWidth:.46},
 'birmingham-iron-man':{height:6,width:2.5,depth:1.94},
 'birmingham-guardian':{height:3.0,width:2.5,depth:5.0},
 'birmingham-the-river':{height:2.8,width:4,depth:2.5},
 'fontvieille-saint-nicolas':{height:22,width:38.5,depth:27.1,parcelWidth:.92},
 'campidoglio-nilo':{height:3.15,width:4.65,depth:2.2},
 'campidoglio-tevere':{height:3.12,width:5.05,depth:2.2},
 'delft-hugo-de-groot':{height:5.8,width:2.7,depth:2.7},
 'birmingham-queen-victoria':{height:6.6,width:3.8,depth:3.7},
 'goiania-tres-racas':{height:7,width:3.1,depth:4.7},
 'tartini-monument':{height:6,width:2.75,depth:2.75},
 'monaco-malizia':{height:4.25,width:2.2,depth:2.2},
 'tartu-countrywomen':{height:2.1,width:1.78,depth:1.10},
 'tartu-town-hall':{height:27,width:36.25,depth:19.8,parcelWidth:.75},
 'tartu-kissing-students':{height:4.4,width:10.2,depth:10.2,parcelWidth:.40},
 'vilnius-gediminas':{height:8.5,width:7.4,depth:6.8,parcelWidth:.30},
 'milano-duomo':{height:108.5,width:89.21,depth:157.06,parcelWidth:.85},
 'milano-vittorio-emanuele':{height:14.8,width:10.8,depth:15.2,parcelWidth:.35},
 'chongqing-great-hall':{height:65,width:158.6,depth:90.2,parcelWidth:.72},
 'liverpool-playhouse':{height:24,width:45.4,depth:39.6,parcelWidth:.60},
 'mactan-lapulapu':{height:10.2,width:5.25,depth:5.25,parcelWidth:.42},
 'mactan-magellan-obelisk':{height:9.20,width:5.60,depth:5.60,parcelWidth:.38},
 'vilnius-cathedral-belfry':{height:57,width:14.45,depth:14.45,parcelWidth:.50},
 'vilnius-cathedral-basilica':{height:21.5,width:44.1,depth:72,parcelWidth:.78},
 'vilnius-miracle-tile':{height:.055,width:.86,depth:.86},
 'vilnius-baltic-way-tile':{height:.055,width:.86,depth:.86},
 'kuopio-veljmies':{height:3.2,width:2.45,depth:1.45},
 'kuopio-siskotytto':{height:2.90,width:1.75,depth:1.2},
 'kuopio-market-hall':{height:15,width:52.54,depth:42,parcelWidth:.85},
 'stortorget-stone-well':{height:4.9,width:3.2,depth:3.2},
 'stortorget-stock-exchange':{height:29,width:45,depth:29,parcelWidth:.68},
 'kansalaistori-song-trees':{height:12.87,width:6.09,depth:9},
 'kansalaistori-oodi-library':{height:24,width:47,depth:151,parcelWidth:.85},
 'karhupuisto-bear':{height:2.55,width:2.4,depth:3.0},
 'kamppi-chapel':{height:11.5,width:19.6,depth:13.4,parcelWidth:.50},
 'kamppi-entrepreneurs-monument':{height:6,width:3.9,depth:3.9},
 'kasarmitori-winter-war-memorial':{height:10.6,width:3.65,depth:3.65},
 'kasarmitori-the-eye':{height:.055,width:1.8,depth:1.8},
 'teror-pilar-fountain':{height:2.36,width:3.8,depth:3.8},
 'teror-wall-fountain':{height:2.77,width:2.25,depth:1.65},
 'tremp-cross-fountain':{height:4.48,width:2.84,depth:2.84},
 'tarrega-creu-del-pati':{height:6.17,width:3.89,depth:3.89},
 'puigcerda-breto-cerda':{height:2.31,width:1.83,depth:.63},
 'arucas-sureda-monument':{height:4.9,width:4.1,depth:4.1},
 'king-sejong-seated':{height:7.0,width:5.5,depth:5.3,parcelWidth:.45},
 'joseon-armillary':{height:1.48,width:.82,depth:.82},
 'joseon-rain-gauge':{height:1.32,width:.63,depth:.63},
 'joseon-sundial':{height:1.14,width:.86,depth:.86},
 'three-rivers-fountain':{height:5.5,width:10,depth:10,parcelWidth:.35},
 'rizal-monument':{height:9.6,width:7.4,depth:7.4,parcelWidth:.42},
 'quezon-memorial-shrine':{height:66,width:52.6,depth:45.1,parcelWidth:.65},
 'cebu-legazpi-obelisk':{height:8.3,width:3.95,depth:3.95},
 'cebu-fort-san-pedro-walls':{height:6.1,width:108.11,depth:130.44,parcelWidth:.80},
 'monas':{height:19.0,width:7.1,depth:7.1,parcelWidth:.50},
 'pirulito-obelisk':{height:13.57,width:7.60,depth:7.60},
 'boa-vista-garimpeiro':{height:7.5,width:15.7,depth:7.5,parcelWidth:.38},
 'naga-fifteen-martyrs':{height:6.95,width:6.4,depth:6.4},
 'laoag-tobacco-obelisk':{height:6.3,width:3.5,depth:3.5},
 'dapitan-rizal-statue':{height:5.4,width:3.6,depth:3.6},
 'dapitan-mindanao-relief':{height:1.55,width:32,depth:28,parcelWidth:.45},
 'daet-rizal-pylon':{height:6.1,width:3.8,depth:3.8},
 'morong-claudio-statue':{height:4.3,width:2.75,depth:2.75},
 'virac-rizal-monument':{height:5.8,width:6.9,depth:5.7},
 'phayao-ngam-mueang':{height:5.25,width:4.4,depth:4.4},
 'ubon-great-candle':{height:22,width:18,depth:18,parcelWidth:.48},
 'tahrir-obelisk':{height:20.1,width:4.7,depth:4.3},
 'sydney-cenotaph':{height:3.8,width:7.7,depth:3.6,parcelWidth:.35}
});
function classify(name,tags={}){
 if(tags.amenity==='fountain'||tags.class==='fountain'||tags.subclass==='fountain')return 'fountain';
 if(tags.statue==='equestrian'||/ecuestre|equestrian|equestre|a caballo/i.test(name))return 'equestrian';
 if(tags.memorial==='bust'||/busto|bust /i.test(name))return 'bust';
 if(/pir[aá]mide|pyramid/i.test(name))return 'pyramid';if(/obelisc|obelisk/i.test(name))return 'obelisk';
 if(/columna|coluna|column /i.test(name))return 'column';if(['plaque','stone'].includes(tags.memorial))return 'plaque';return 'unclassified';
}
function enrich(profile,city){
 const data=window.SQUARE_DETAIL_DATA?.[city.id];
 return data?{...profile,landmarks:data.landmarks||[],walkwayDetails:data.walkways||[],detailProvenance:data.provenance||[],detailSchema:data.schema}:profile;
}
function prepare(profile,fit,b,city){
 const adjacent=profile.contextSurfaces?.length?profile.adjacentLandmarks||[]:[];
 const all=[...(profile.landmarks||[]),...adjacent],items=[],reservations=[];
 for(const feature of [...all].sort((a,b)=>(b.status==='reference-model')-(a.status==='reference-model'))){
  if(feature.partOf||!MODEL_SPECS[feature.model]||!Number.isFinite(feature.x)||!Number.isFinite(feature.z))continue;
  const spec=MODEL_SPECS[feature.model],p=fit.point(feature),wanted=feature.displayHeight||5;
  const angle=fit.angle+(Number(feature.bearing)||0),widthLimit=spec.parcelWidth?b.width*spec.parcelWidth:6.4;
  const mappedWidth=Number(feature.widthMeters);
  const referenceWidth=Number.isFinite(mappedWidth)&&mappedWidth>0?
   Math.max(1.55,mappedWidth*fit.scale)/spec.width:Infinity;
  let factor=Math.min(wanted/spec.height,widthLimit/spec.width,referenceWidth);
  // Use the square's projection when the model has source-based proportions.
  if(feature.scaleWithLayout)factor=Math.min(factor,fit.scale);
  if(feature.model==='fountain'&&feature.status!=='reference-model')factor=Math.min(factor,.45);
  const clearanceX=b.width/2-Math.abs(p.x)-.8,clearanceZ=b.depth/2-Math.abs(p.z)-.8;
  if(spec.depth){
   const c=Math.abs(Math.cos(angle)),s=Math.abs(Math.sin(angle));
   factor=Math.min(factor,2*clearanceX/(c*spec.width+s*spec.depth),2*clearanceZ/(s*spec.width+c*spec.depth));
  }else factor=Math.min(factor,Math.min(clearanceX,clearanceZ)/(spec.width*.57));
  // A large mapped site needs a small scale even for a clearly visible landmark.
  const visibleReference=feature.scaleWithLayout&&feature.status==='reference-model'&&
   factor*spec.height>=2.5&&factor*spec.width>=1.2;
  if(factor<(spec.minimumScale??.09)&&!visibleReference)continue;
  const radius=spec.width*factor*.74;
  // Prefer a sourced landmark over duplicate point representations of the same object.
  if(items.some(item=>Math.hypot(item.x-p.x,item.z-p.z)<Math.min(radius,item.radius)*.45))continue;
  const item={feature,x:p.x,z:p.z,scale:factor,angle,radius};items.push(item);reservations.push({x:p.x,z:p.z,radius:radius+.30});
 }
 return{profile,city,items,reservations,clear(x,z,radius=0){return !reservations.some(p=>Math.hypot(x-p.x,z-p.z)<p.radius+radius);}};
}
function render(plan,group,b){
 if(!plan?.items.length)return;
 const T=THREE,UP=new T.Vector3(0,1,0);
 const parts=[],bronze=0x526b62,stone=0xd6cbb3,marble=0xe4e0d2,gold=0xb1a06d,water=0x67c4dc;
 let owner;
 const add=(kind,material,color,x,y,z,sx,sy,sz,rotation=null)=>{if(Math.min(sx,sy,sz)<=0)return;parts.push({kind,material,color,x,y,z,sx,sy,sz,rotation,owner});};
 const box=(c,x,y,z,w,h,d,m='stone')=>add('box',m,c,x,y,z,w,h,d);
 const sphere=(c,x,y,z,rx,ry,rz,m='metal')=>add('sphere',m,c,x,y,z,rx,ry,rz);
 const cylinder=(c,x,y,z,r,h,m='stone')=>add('cylinder',m,c,x,y,z,r,h,r);
 const ring=(c,x,y,z,r,thickness,m='metal')=>add('torus',m,c,x,y,z,r,thickness/.045,r);
 const limb=(a,c,r,color=bronze,m='metal')=>{const from=new T.Vector3(...a),to=new T.Vector3(...c),delta=to.clone().sub(from);add('cylinder',m,color,(a[0]+c[0])/2,(a[1]+c[1])/2,(a[2]+c[2])/2,r,delta.length(),r,new T.Quaternion().setFromUnitVectors(UP,delta.normalize()));};
 const steps=(y,width=5,depth=width)=>{for(let i=0;i<3;i++)box(stone,0,y+.13+i*.22,0,width-i*.4,.24,depth-i*.4);};
 const plaque=(y,width=1.7,z=1.5)=>{box(bronze,0,y,z,width,.75,.09,'metal');box(gold,0,y+.35,z+.06,width-.12,.04,.025,'metal');for(const side of [-1,1])sphere(gold,side*(width/2-.12),y,z+.08,.05,.05,.025);};
 const human=(x,y,z,scale=1,pose='civil',color=bronze)=>{
  const at=(px,py,pz)=>[x+px*scale,y+py*scale,z+pz*scale],material=color===marble?'stone':pose==='civil'||pose==='violinist'?'patina':'metal';
  const ball=(px,py,pz,rx,ry,rz)=>sphere(color,...at(px,py,pz),rx*scale,ry*scale,rz*scale,material);
  const segment=(a,c,r)=>limb(at(...a),at(...c),r*scale,color,material);
  ball(0,2.30,0,.24,.30,.23);ball(0,2.28,.23,.07,.10,.10);ball(-.24,2.28,0,.045,.085,.07);ball(.24,2.28,0,.045,.085,.07);
  ball(0,1.56,0,.45,.56,.26);ball(0,1.01,0,.32,.23,.23);
  for(const side of [-1,1]){
   segment([side*.17,.97,0],[side*.17,.54,.015],.12);segment([side*.17,.54,.015],[side*.18,.12,.03],.10);ball(side*.18,.10,.13,.14,.10,.23);
  }
  if(pose==='classical'){
   segment([-.38,1.88,0],[-.56,1.55,.08],.095);segment([-.56,1.55,.08],[-.42,1.21,.24],.075);segment([.38,1.88,0],[.55,1.58,.12],.095);segment([.55,1.58,.12],[.38,1.32,.26],.075);
   add('robe',material,color,...at(0,.73,0),.52*scale,1.44*scale,.46*scale);for(let fold=-2;fold<=2;fold++)segment([fold*.08,.10,.25],[fold*.12,1.34,.20],.028);
  }else if(pose==='freedom'){
   segment([-.38,1.88,0],[-.70,2.18,.05],.10);segment([-.70,2.18,.05],[-.88,2.65,.12],.08);
   segment([.38,1.88,0],[.66,1.52,.12],.10);segment([.66,1.52,.12],[.82,1.32,.19],.08);
   add('robe',material,color,...at(0,.72,0),.56*scale,1.40*scale,.47*scale);
   for(let i=0;i<5;i++){const q=-.91+i*.04;ring(color,...at(q,2.60-i*.14,.15),.07*scale,.012*scale,material);}
   for(let i=0;i<4;i++)ring(color,...at(.85+i*.02,1.25-i*.13,.19),.07*scale,.012*scale,material);
   for(let i=0;i<3;i++)ring(color,...at(.20+i*.14,.10,.26),.06*scale,.012*scale,material);
  }else if(pose==='laurel'){
   segment([-.38,1.88,0],[-.66,2.35,.08],.11);segment([-.66,2.35,.08],[-.52,2.92,.14],.085);
   segment([.38,1.88,0],[.50,1.42,.16],.105);segment([.50,1.42,.16],[.34,1.14,.32],.080);
   add('robe',material,color,...at(0,.71,0),.55*scale,1.36*scale,.49*scale);
   box(color,...at(.33,1.21,.40),.34*scale,.55*scale,.09*scale,material);
   limb(at(-.54,2.88,.14),at(-.08,3.57,.19),.032*scale,color,material);
   for(let i=0;i<5;i++){
    const leaf=i*.08;ball(-.45+leaf,3.03+i*.115,.20,.125,.045,.045);ball(-.46+leaf,3.10+i*.115,.15,.065,.075,.042);
   }
  }else if(pose==='proclaiming'){
   segment([-.40,1.88,0],[-.53,2.38,.11],.105);
   segment([-.53,2.38,.11],[-.62,2.82,.22],.085);
   ball(-.62,2.84,.23,.095,.105,.08);
   segment([-.62,2.90,.23],[-.64,3.06,.24],.031);
   segment([.39,1.87,0],[.48,1.45,.09],.102);
   segment([.48,1.45,.09],[.44,1.04,.15],.083);
   ball(.44,1.02,.15,.084,.105,.09);
   box(color,...at(0,1.03,0),.65*scale,.43*scale,.52*scale,material);
  }else if(pose==='ansurez-banner'){
   segment([-.38,1.88,0],[-.61,2.17,.07],.107);
   segment([-.61,2.17,.07],[-.63,2.65,.17],.082);
   ball(-.63,2.65,.17,.087,.11,.086);
   segment([.39,1.86,0],[.58,1.49,.09],.104);
   segment([.58,1.49,.09],[.41,1.21,.32],.079);
   box(color,...at(.41,1.18,.34),.31*scale,.54*scale,.086*scale,material);
   add('cape',material,color,...at(.05,1.24,-.20),.95*scale,1.45*scale,.20*scale);
   add('robe',material,color,...at(0,.92,0),.53*scale,.83*scale,.44*scale);
   segment([-.72,.59,.12],[-.60,3.29,.17],.044);
   box(color,...at(-.92,2.99,.20),.57*scale,.59*scale,.076*scale,material);
   box(color,...at(-1.13,2.72,.20),.20*scale,.13*scale,.076*scale,material);
  }else if(pose==='orator'){
   segment([-.38,1.88,0],[-.53,1.47,.10],.105);
   segment([-.53,1.47,.10],[-.18,1.83,.28],.085);
   ball(-.18,1.83,.29,.11,.11,.08);
   segment([.38,1.88,0],[.63,1.73,.12],.105);
   segment([.63,1.73,.12],[.94,1.91,.22],.085);
   ball(.95,1.92,.23,.11,.085,.08);
  }else if(pose==='trumpeter'){
   segment([-.38,1.88,0],[-.51,1.50,.08],.10);segment([-.51,1.50,.08],[-.42,1.23,.24],.08);
   segment([.38,1.88,0],[.56,2.05,.26],.10);segment([.56,2.05,.26],[.23,2.26,.51],.08);
   segment([.05,2.27,.29],[.20,2.27,.80],.045);ball(.21,2.27,.84,.11,.12,.07);
  }else if(pose==='liberty'||pose==='fame'){
   segment([-.39,1.90,0],[-.62,2.33,0],.10);segment([-.62,2.33,0],[-.56,2.82,.02],.085);ball(-.56,2.85,.02,.105,.12,.10);
   segment([.39,1.90,0],[.66,1.51,.10],.10);segment([.66,1.51,.10],[.47,1.10,.24],.085);
   add('robe',material,color,...at(0,.72,0),.55*scale,1.30*scale,.50*scale);
   for(let fold=-2;fold<=2;fold++)segment([fold*.08,.10,.25],[fold*.12,1.34,.20],.035);
   if(pose==='fame'){
    segment([.42,1.90,0],[.64,2.25,.22],.09);segment([.64,2.25,.22],[.42,2.35,.61],.075);
    limb(at(.13,2.35,.28),at(.40,2.35,1.13),.027*scale,gold);
    add('cone','metal',gold,...at(.43,2.35,1.17),.14*scale,.28*scale,.14*scale,new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2));
    for(const side of [-1,1])ball(side*.48,2.10,-.19,.40,.58,.09);
   }else{
    limb(at(-.56,2.84,.02),at(-.56,3.55,.02),.025*scale,gold);
    ball(.48,1.09,.32,.23,.36,.065);ball(0,2.59,-.04,.25,.10,.23);
   }
  }else if(pose==='violinist'){
   add('cape',material,color,...at(.02,1.19,-.17),.89*scale,1.74*scale,.18*scale);
   segment([-.36,1.88,0],[-.64,1.72,.14],.095);
   segment([-.64,1.72,.14],[-.81,1.91,.28],.075);
   ball(-.81,1.91,.28,.095,.083,.075);
   limb(at(-.88,1.66,.26),at(-.62,2.73,.36),.022*scale,color,material);
   segment([.39,1.86,-.02],[.47,1.52,-.21],.095);
   segment([.47,1.52,-.21],[.25,1.42,-.38],.075);
   ball(.25,1.42,-.38,.083,.081,.075);
   ball(.25,1.08,-.39,.23,.24,.087);
   ball(.26,1.30,-.39,.16,.16,.077);
   limb(at(.26,1.28,-.39),at(.28,1.66,-.38),.035*scale,color,material);
   ball(0,2.37,-.11,.24,.22,.18);ball(0,2.04,-.26,.13,.17,.10);
  }else{
   segment([-.40,1.89,0],[-.53,1.42,.13],.105);segment([-.53,1.42,.13],[-.36,1.06,.28],.085);
   segment([.40,1.89,0],[.63,1.51,.12],.105);segment([.63,1.51,.12],[.48,1.17,.30],.085);
   if(pose==='sword'){limb(at(.49,.20,.34),at(.49,1.32,.34),.025*scale,gold);box(gold,...at(.49,1.29,.34),.30*scale,.045*scale,.065*scale,'metal');box(bronze,...at(-.40,1.03,.32),.28*scale,.40*scale,.09*scale,'metal');}
   if(pose==='civil'){
    add('cape',material,color,...at(.14,1.30,-.25),1.05*scale,1.90*scale,.20*scale);
    // Coat tails, lapels and a cane read as clothing, not a convex shield.
    segment([-.26,1.91,.21],[-.05,1.43,.30],.045);segment([.26,1.91,.21],[.08,1.43,.30],.045);
    segment([.48,1.15,.31],[.53,.10,.39],.028);ball(.53,.07,.39,.045,.04,.045);
    for(let button=0;button<4;button++)ball(.04,1.30+button*.17,.265,.028,.028,.025);
   }
  }
 };
 const horse=(y=0,gesture='reins',head=bronze)=>{
  const headMaterial=head===marble?'stone':'metal';
  sphere(bronze,0,y+1.65,0,.62,.70,1.48);sphere(bronze,0,y+1.70,.92,.48,.63,.53);
  limb([0,y+1.75,.83],[0,y+2.77,1.17],.41);sphere(bronze,0,y+2.91,1.33,.34,.40,.58);sphere(bronze,0,y+2.77,1.73,.29,.26,.37);
  for(const side of [-1,1]){
   add('cone','metal',bronze,side*.20,y+3.31,1.17,.13,.42,.14);
   for(const end of [-1,1]){const raised=end>0&&side<0;const z=end*1.01;limb([side*.39,y+1.35,z],[side*.45,y+(raised?.88:.78),z+(raised?.27:0)],.13);limb([side*.45,y+(raised?.88:.78),z+(raised?.27:0)],[side*.46,y+(raised?.72:.16),z+(raised?.55:.05)],.10);sphere(bronze,side*.46,y+(raised?.66:.12),z+(raised?.61:.15),.16,.13,.24);}
  }
  limb([0,y+1.95,-1.30],[.20,y+1.29,-1.63],.15);limb([.20,y+1.29,-1.63],[.25,y+.57,-1.69],.12);
  box(0x455b52,0,y+2.23,-.13,.92,.14,1.23,'metal');
  // Rider, breeches and reins are separate volumes rather than a box on the horse.
  sphere(bronze,0,y+3.10,-.12,.39,.56,.24);sphere(head,0,y+3.86,-.10,.23,.28,.22,headMaterial);
  const raisedArm=['pointing','flag','charter','salute'].includes(gesture);
  for(const side of [-1,1]){
   limb([side*.23,y+2.72,-.15],[side*.64,y+2.37,.32],.14);limb([side*.64,y+2.37,.32],[side*.67,y+1.64,.28],.105);
   sphere(bronze,side*.67,y+1.62,.40,.14,.12,.26);
   if((side===1&&raisedArm)||(side===-1&&gesture==='temur'))continue;
   limb([side*.35,y+3.44,-.10],[side*.46,y+3.10,.46],.10);
   limb([side*.46,y+3.10,.46],[side*.19,y+3.05,.85],.08);
   limb([side*.19,y+3.05,.85],[side*.22,y+2.60,1.56],.022,gold);
  }
  add('cape','metal',bronze,0,y+2.97,-.48,.77,1.50,.24);
  if(gesture==='pointing'){limb([.32,y+3.43,-.10],[.58,y+3.61,.50],.095);limb([.58,y+3.61,.50],[.63,y+3.69,1.22],.075);sphere(bronze,.63,y+3.69,1.26,.10,.09,.14);}
  if(gesture==='salute'){
   limb([.31,y+3.43,-.07],[.65,y+3.91,.04],.10);
   limb([.65,y+3.91,.04],[.73,y+4.57,.16],.074);
   sphere(bronze,.73,y+4.67,.17,.11,.16,.061);
  }
  if(gesture==='flag'){
   limb([.33,y+3.42,-.10],[.64,y+3.77,.12],.105);
   limb([.64,y+3.77,.12],[.72,y+4.25,.19],.077);
   limb([.73,y+2.82,.20],[.73,y+6.45,.20],.040,bronze);
   box(bronze,.26,y+5.99,.20,.94,.78,.045,'metal');
   for(const z of [.225,.176])box(0x6c8072,.23,y+5.98,z,.86,.042,.017,'patina');
  }
  if(gesture==='charter'){
   limb([.33,y+3.43,-.10],[.65,y+3.70,.24],.10);
   limb([.65,y+3.70,.24],[.84,y+3.77,.71],.079);
   limb([.80,y+3.72,.64],[.97,y+4.12,.75],.093,stone,'stone');
  }
  if(gesture==='temur'){
   limb([-.33,y+3.43,-.10],[-.65,y+3.84,.17],.109);
   limb([-.65,y+3.84,.17],[-.74,y+4.57,.65],.081);
   sphere(bronze,-.74,y+4.59,.66,.104,.15,.058);
   sphere(bronze,-.635,y+4.54,.65,.048,.084,.045);
  }
  sphere(head,0,y+4.12,-.10,.35,.11,.27,headMaterial);
 };
 const basin=(r=3.2,y=0)=>{cylinder(stone,0,y+.20,0,r,.38);ring(stone,0,y+.44,0,r,.13,'stone');cylinder(water,0,y+.40,0,r*.91,.045,'water');};
 const jet=(x,y,z,height,radius=.65)=>{
  cylinder(water,x,y+height/2,z,.05,height,'water');
  for(let stream=0;stream<5;stream++){const a=stream*Math.PI*2/5;let previous=[x,y+.04,z];for(let step=1;step<=7;step++){const t=step/7,p=[x+Math.sin(a)*radius*t,y+4*height*.60*t*(1-t),z+Math.cos(a)*radius*t];limb(previous,p,.024,water,'water');previous=p;}}
 };
 function accademia(){
  const plaster=0xe7ddc8,trim=0xf0e7d7,joint=0xafa797,recess=0x494845,door=0x625548;
  const pediment=(x,y,z,width,height,depth)=>{
   add('pediment','stone',trim,x,y,z,width,height,depth);
   box(marble,x,y-height/2,z+.06,width+.38,.22,depth+.14);
   for(const side of [-1,1])limb([x+side*width/2,y-height/2,z+depth/2],[x,y+height/2,z+depth/2],.10,marble,'stone');
  };
  box(plaster,0,5.68,-2.1,13.3,11.36,8.6);
  for(const side of [-1,1]){
   const x=side*10.65;
   box(plaster,x,4.48,-2.3,9.3,8.96,8.2);
   for(const h of [.42,2.22,5.55,8.86])box(trim,x,h,1.68,9.45,.18,.42);
   pediment(x,9.60,1.41,9.30,1.46,.72);
   for(const offset of [-2.6,0,2.6]){
    const xx=x+offset;
    box(trim,xx,4.32,1.87,1.51,2.43,.15);
    box(recess,xx,4.33,1.96,1.15,1.94,.04);
    box(joint,xx,3.37,2.0,1.55,.18,.32);
    box(trim,xx,2.93,1.9,1.41,.18,.18);
    box(trim,xx,4.32,1.99,.055,1.89,.05);
    box(trim,xx,4.59,1.99,1.12,.055,.05);
   }
   box(trim,x,1.30,1.86,2.15,2.55,.18);
   box(door,x,1.20,1.97,1.70,2.30,.05);
  }
  for(let i=0;i<8;i++){
   const front=8.9-i*.64,back=2.10,h=.23*(i+1),width=13.7-i*.075;
   box(stone,0,h/2,(front+back)/2,width,h,front-back);
   box(trim,0,h-.035,front-.07,width+.05,.08,.20);
  }
  box(stone,0,1.79,3.83,13.0,.22,3.45);
  for(const x of [-4.85,-1.62,1.62,4.85]){
   box(trim,x,1.97,4.68,1.02,.25,1.01);
   cylinder(stone,x,3.97,4.68,.34,3.90);
   cylinder(marble,x,2.18,4.68,.46,.21);
   cylinder(marble,x,5.82,4.68,.43,.24);
   box(trim,x,6.00,4.68,.96,.19,.92);
  }
  for(const x of [-3.76,0,3.76]){
   box(trim,x,3.50,2.29,2.34,3.29,.18);
   box(recess,x,3.47,2.40,1.89,2.90,.06);
   box(door,x,3.20,2.45,1.62,2.29,.10);
   box(stone,x,3.22,2.52,.06,2.24,.036);
   for(const side of [-1,1])sphere(gold,x+side*.15,3.18,2.54,.038,.038,.022,'stone');
  }
  box(trim,0,6.38,4.04,12.7,.91,2.30);
  box(joint,0,6.74,5.21,12.95,.10,.22);
  pediment(0,7.42,5.0,12.63,1.46,.52);
  box(trim,0,7.12,2.48,13.2,.32,.59);
  for(const x of [-3.55,0,3.55]){
   box(trim,x,8.98,2.28,2.09,2.68,.17);
   box(recess,x,8.98,2.39,1.72,2.31,.05);
   box(joint,x,7.91,2.60,2.22,.20,.55);
   human(x,8.00,2.66,.64,'classical',marble);
  }
  pediment(0,12.55,2.04,13.45,2.6,.83);
  const lettering={A:['010','101','111','101','101'],C:['011','100','100','100','011'],D:['110','101','101','101','110'],E:['111','100','110','100','111'],M:['10001','11011','10101','10001','10001'],I:['111','010','010','010','111']};
  const letters=[...'ACCADEMIA'],unit=.124;
  let start=-letters.reduce((sum,ch)=>sum+lettering[ch][0].length+1,0)*unit/2;
  for(const ch of letters){
   for(const [row,line] of lettering[ch].entries())for(let col=0;col<line.length;col++)if(line[col]==='1')box(recess,start+col*unit,6.60-row*unit,5.202,unit+.003,unit+.003,.044);
   start+=(lettering[ch][0].length+1)*unit;
  }
 }
 function sphinx(){
  const pale=0xc5bca9,face=0xd0c8b7,shade=0xb4a994;
  box(stone,0,.18,0,1.78,.32,3.49);
  box(pale,0,.40,0,1.58,.14,3.27);
  sphere(pale,0,.93,-.38,.55,.48,1.05,'stone');
  sphere(pale,0,1.19,.48,.49,.64,.60,'stone');
  for(const side of [-1,1]){
   sphere(shade,side*.33,.76,-.88,.31,.33,.58,'stone');
   sphere(pale,side*.31,.65,.86,.22,.19,.71,'stone');
   sphere(face,side*.31,.56,1.36,.245,.12,.29,'stone');
   for(let toe=-1;toe<=1;toe++)sphere(pale,side*.31+toe*.085,.55,1.57,.057,.065,.08,'stone');
   limb([side*.27,2.39,.35],[side*.36,1.87,.46],.10,shade,'stone');
  }
  limb([0,1.44,.54],[0,2.10,.54],.28,pale,'stone');
  sphere(shade,0,2.36,.43,.38,.46,.32,'stone');
  sphere(face,0,2.36,.61,.27,.35,.225,'stone');
  sphere(face,0,2.34,.83,.074,.09,.073,'stone');
  for(const side of [-1,1])sphere(shade,side*.12,2.44,.801,.064,.026,.019,'stone');
  sphere(shade,0,2.10,.74,.15,.050,.02,'stone');
  limb([-.37,.75,-1.18],[-.60,.63,-.94],.077,shade,'stone');
  limb([-.60,.63,-.94],[-.59,.57,-.68],.074,shade,'stone');
 }
 function sanMartin(){
  const cliffWidth=5.86,cliffDepth=5.42,cliffHeight=4.84,rockFloor=.34,rockTop=rockFloor+cliffHeight;
  const limestone=0xb5a287,carving=0xc7b89e,detail=0xa39178;
  cylinder(0xc7b8a0,0,.115,0,3.45,.23);
  cylinder(0xd5c7ac,0,.29,0,3.24,.15);
  add('cliff','stone',limestone,0,rockFloor+cliffHeight/2,0,cliffWidth,cliffHeight,cliffDepth);
  human(0,rockTop,0,1.55,'civil',0x647b6f);

  function stoneFace(angle,plane){
   const cos=Math.cos(angle),sin=Math.sin(angle),turn=new T.Quaternion().setFromAxisAngle(UP,angle);
   const at=(x,y,depth)=>[x*cos+(plane+depth)*sin,y,-x*sin+(plane+depth)*cos];
   const inlay=(x,y,width,height,color=limestone)=>add('box','stone',color,...at(x,y,.018),width,height,.146,turn);
   const carvingBall=(x,y,w,h)=>add('sphere','stone',carving,...at(x,y,.125),w,h,.077,turn);
   const carvingLine=(x1,y1,x2,y2,width,color=carving)=>limb(at(x1,y1,.102),at(x2,y2,.102),width,color,'stone');
   const scene=(width=2.70)=>{
    inlay(0,2.83,width,1.18);
    for(const side of [-1,1]){
     inlay(0,2.83+side*.55,width-.10,.054,detail);
     inlay(side*(width/2-.056),2.83,.052,1.06,detail);
    }
   };
   const figure=(x,base,size,seated=false)=>{
    carvingBall(x,base+size*.88,size*.115,size*.126);
    carvingBall(x,base+size*.59,size*.17,size*.21);
    for(const side of [-1,1]){
     carvingLine(x+side*size*.13,base+size*.64,x+side*size*.22,base+size*.43,size*.052);
     carvingLine(x+side*size*.08,base+size*.44,x+side*size*.10+(seated?size*.16:0),base+size*.12,size*.061);
    }
   };
   return {at,turn,inlay,carvingBall,carvingLine,scene,figure};
  }

  // The three scenes of Perlotti's monument are carved into the stone on separate faces.
  const meeting=stoneFace(-Math.PI/2,cliffWidth*.44);
  meeting.scene();meeting.figure(-.49,2.32,.88);meeting.figure(.42,2.32,.85);
  meeting.carvingLine(-.35,2.78,.26,2.78,.041);
  meeting.carvingLine(-1.03,2.35,-.96,3.23,.047,detail);
  meeting.carvingLine(-.99,2.99,-1.17,3.18,.043);
  meeting.carvingLine(-.97,3.00,-.78,3.19,.041);

  const garden=stoneFace(Math.PI/2,cliffWidth*.44);
  garden.scene();garden.figure(-.62,2.34,.68,true);garden.figure(-.06,2.32,.92);
  garden.figure(.47,2.31,.56);garden.figure(.89,2.31,.48);
  garden.carvingLine(-1.04,2.44,-.46,2.44,.047,detail);
  garden.carvingLine(.42,2.36,1.07,2.36,.045,detail);

  const rest=stoneFace(Math.PI,cliffDepth*.44);
  rest.scene();rest.figure(-.85,2.64,.69);rest.figure(.83,2.62,.73);
  rest.carvingBall(-.58,2.52,.14,.105);rest.carvingBall(-.06,2.48,.45,.13);
  rest.carvingLine(-.91,2.35,1.00,2.35,.054,detail);
  rest.carvingLine(.21,2.77,.65,2.97,.035);
  rest.carvingLine(-.49,3.14,-.02,3.28,.035,detail);
  rest.carvingLine(-.02,3.28,.32,3.15,.035,detail);

  const front=stoneFace(0,cliffDepth*.44);
  front.inlay(0,2.79,2.19,.80,detail);
  add('box','patina',0x61594d,...front.at(0,2.79,.062),2.04,.66,.09,front.turn);
  for(const [row,width] of [.97,1.42,.83].entries())
   add('box','patina',0x998872,...front.at(0,2.93-row*.14,.108),width,.024,.018,front.turn);
 }
 // Short rounded sections follow a spline and keep the sculpture in the shared instance batches.
 function bronzeCurve(points){
  const curve=new T.CatmullRomCurve3(points.map(([x,y,z])=>new T.Vector3(x,y,z)));
  const segments=(points.length-1)*5;
  let previous=curve.getPoint(0).toArray();
  for(let i=0;i<=segments;i++){
   const t=i/segments,position=curve.getPoint(t).toArray();
   const index=Math.min(points.length-2,Math.floor(t*(points.length-1)));
   const radius=T.MathUtils.lerp(points[index][3],points[index+1][3],t*(points.length-1)-index);
   if(i)limb(previous,position,radius,0x735548);
   sphere(0x735548,...position,radius,radius,radius);
   previous=position;
  }
 }
 function build(model){
  if(model==='accademia-conegliano'){accademia();return;}
  if(model==='stone-sphinx'){sphinx();return;}
  if(model==='hangzhou-wulin-eight-girls'){
   const porcelain=0xf0eee6,basalt=0xa6a491,waterJet=0xbadddf;
   cylinder(basalt,0,.18,0,4.7,.36);
   const dancers=[[-1.77,.71],[-.08,-1.92],[1.82,.93]];
   for(const [x,z] of dancers){
    const yaw=Math.atan2(x,z),s=Math.sin(yaw),c=Math.cos(yaw);
    const at=(dx,y,dz=0)=>[x+dx*c+dz*s,y,z-dx*s+dz*c];
    const sash=[at(-1.05,3.0,.72),at(-1.57,3.85,.57),at(-.73,5.26,.28),at(.84,6.21,0),at(1.73,6.0,-.16)];
    add('robe','stone',porcelain,...at(0,1.53),1.0,2.30,.73);
    sphere(porcelain,...at(0,2.67),.74,.82,.49,'stone');
    sphere(porcelain,...at(0,3.65,.11),.35,.43,.33,'stone');
    sphere(porcelain,...at(0,3.99,-.04),.22,.18,.22,'stone');
    limb(at(-.55,3.0),at(-.86,3.42,.3),.14,porcelain,'stone');
    limb(at(-.86,3.42,.3),sash[0],.11,porcelain,'stone');
    limb(at(.54,3.02),at(.93,3.78,.18),.13,porcelain,'stone');
    limb(at(.93,3.78,.18),at(.86,4.43,.19),.10,porcelain,'stone');
    for(let j=1;j<sash.length;j++)limb(sash[j-1],sash[j],.155,porcelain,'stone');
   }
   const musicians=[[-1.03,-12.89],[11.86,-6.19],[9.28,12.38],[-6.70,12.38],[-12.38,-2.06]];
   for(const [index,[x,z]] of musicians.entries()){
    const yaw=Math.atan2(x,z),s=Math.sin(yaw),c=Math.cos(yaw);
    const at=(dx,y,dz=0)=>[x+dx*c+dz*s,y,z-dx*s+dz*c];
    cylinder(basalt,x,.14,z,1.12,.28);
    sphere(porcelain,...at(0,.62,.15),.62,.40,.59,'stone');
    sphere(porcelain,...at(0,1.03),.45,.53,.38,'stone');
    sphere(porcelain,...at(0,1.67,.05),.24,.29,.22,'stone');
    const instrument=index%2===0?[at(-.49,1.0,.36),at(.43,1.43,.43)]:[at(-.32,1.32,.51),at(.53,1.23,.52)];
    limb(...instrument,.095,porcelain,'stone');
    for(const side of [-1,1])limb(at(side*.34,1.2),at(side*.28,1.1,.42),.10,porcelain,'stone');
   }
   for(let i=0;i<20;i++){
    const angle=i*2*Math.PI/20,s=Math.sin(angle),c=Math.cos(angle);
    limb([7.25*s,.12,7.25*c],[6.52*s,1.25+(i%2)*.56,6.52*c],.058,waterJet,'water');
   }
   return;
  }
  if(model==='suzhou-gate-to-the-east'){
   const glass=0x637f91,bright=0x7899af,frames=0xb8c2c1;
   box(0xabada6,0,2.5,0,180,5,102);
   add('suzhou-orient-portal','stone',glass,0,0,0,1,1,100);
   for(const face of [-1,1]){
    for(const side of [-1,1]){
     for(let i=0;i<12;i++){
      const y=13+i*15.5,mid=side*(64-y*.024);
      box(bright,mid,y,50.06*face,45-y*.044,.55,.13);
     }
     box(frames,side*81,78,50.3*face,1.6,143,.4);
    }
    for(const y of [238,250,262,275])box(bright,0,y,50.06*face,111,.50,.13);
   }
   for(const side of [-1,1]){
    box(glass,47*side,282.5,0,14,18,58);
    limb([47*side,288,0],[47*side,301.8,0],1.45,frames);
   }
   return;
  }
  if(model==='suzhou-jinji-lake-fountain'){
   const jet=0xc4e1e3,ripple=0x92cacc;
   for(let i=0;i<31;i++){
    const z=(i-15)*6.2,profile=Math.cos((i-15)*Math.PI/32),x=20*(1-profile);
    const h=14+38*profile;
    limb([x,.22,z],[x+4,h*.54,z*.97],.72,jet,'water');
    limb([x+4,h*.54,z*.97],[x+12,h,z*.92],.46,jet,'water');
    if(i%3===0){
     limb([x+30,.17,z*.74],[x+38,9+11*profile,z*.69],.56,ripple,'water');
     limb([x-27,.17,z*.74],[x-33,7+9*profile,z*.68],.56,ripple,'water');
    }
   }
   return;
  }
  if(model==='tehran-azadi-tower'){
   const marbleCladding=0xf0ede0,stoneShadow=0xe0daca,turquoise=0x568c8d;
   for(const side of [-1,1]){
    add(side<0?'azadi-west-arch':'azadi-east-arch','stone',marbleCladding,0,0,0,1,1,1);
    box(turquoise,0,42.08,side*8.7,20,.76,.19);
    box(stoneShadow,0,43.20,side*8.8,21,.39,.28);
    for(let i=-5;i<=5;i++)box(marbleCladding,i*1.73,42.1,side*8.82,.36,.83,.22);
   }
   box(marbleCladding,0,43.76,0,22,2.48,18);
   box(stoneShadow,0,39.9,0,20,2.4,17.8);
   return;
  }
  if(model==='tunis-clock-tower'){
   const copper=0xbf8544,dark=0x655341,frame=0xd6a054,cap=0xe4b14d,dial=0xf5edd5;
   basin(13.8);
   cylinder(0xa29a84,0,.51,0,4.0,.61);
   box(dark,0,14.25,0,4.8,27,4.8);
   box(copper,0,29.6,0,5.4,4.7,5.4);
   box(frame,0,32.08,0,5.73,.38,5.73);
   add('tunis-clock-pyramid','metal',cap,0,34.25,0,5.73,4,5.73);
   cylinder(cap,0,36.55,0,.13,.72,'metal');
   sphere(cap,0,37.08,0,.23,.37,.23);
   const localClockNormal=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   for(let face=0;face<4;face++){
    const yaw=face*Math.PI/2,c=Math.cos(yaw),s=Math.sin(yaw);
    const at=(x,y,z)=>[x*c+z*s,y,z*c-x*s];
    const faceRotation=new T.Quaternion().setFromAxisAngle(UP,yaw);
    const clockRotation=faceRotation.clone().multiply(localClockNormal);
    for(const x of [-2.44,2.44])add('box','metal',frame,...at(x,14.25,2.43),.22,27,.32,faceRotation);
    for(let cell=0;cell<11;cell++){
     const h=2.2+cell*2.34,z=2.52;
     const outline=[at(-2.18,h,z),at(0,h+1.04,z),at(2.18,h,z),at(0,h-1.04,z),at(-2.18,h,z)];
     for(let side=1;side<outline.length;side++)limb(outline[side-1],outline[side],.09,copper);
     add('box','metal',copper,...at(0,h,z),.16,1.9,.15,faceRotation);
    }
    add('cylinder','metal',dark,...at(0,29.6,2.78),1.94,.24,1.94,clockRotation);
    add('cylinder','stone',dial,...at(0,29.6,2.94),1.76,.09,1.76,clockRotation);
    for(let index=0;index<12;index++){
     const angle=index*Math.PI/6;
     limb(at(1.43*Math.sin(angle),29.6+1.43*Math.cos(angle),3.01),
          at(1.57*Math.sin(angle),29.6+1.57*Math.cos(angle),3.01),.024,dark);
    }
    limb(at(0,29.6,3.02),at(-.72,30.20,3.02),.06,dark);
    limb(at(0,29.6,3.02),at(.99,30.54,3.02),.045,dark);
   }
   for(let n=0;n<24;n++){
    const angle=n*Math.PI/12,x=Math.sin(angle),z=Math.cos(angle);
    limb([10.5*x,.42,10.5*z],[9.45*x,1.53+n%3*.26,9.45*z],.045,0xa0ced0,'water');
   }
   return;
  }
  if(model==='tunis-bourguiba-equestrian'){
   const plinth=0xd1c0ad;
   box(plinth,0,.19,0,4.8,.38,5.4);
   box(plinth,0,2.05,0,3.55,3.40,4.36);
   box(0xe1d3bf,0,3.92,0,3.75,.38,4.55);
   horse(4.10,'salute');
   return;
  }
  if(model==='algiers-emir-abdelkader'){
   const figure=0x48504a,relief=0x585146,pedestal=0xafaa9f,trim=0xc9c1b1,fountain=0x74a5ad;
   box(trim,0,.18,0,5.55,.36,6.65);
   box(pedestal,0,2.66,0,3.85,4.66,4.68);
   box(trim,0,5.11,0,4.17,.26,5.06);
   for(const side of [-1,1]){
    box(relief,side*1.94,2.88,0,.11,1.7,3.65);
    for(const z of [-1.23,0,1.23]){
     sphere(trim,side*2.012,2.74,z,.075,.22,.39,'stone');
     limb([side*2.01,2.79,z+.2],[side*2.01,3.14,z+.45],.078,trim,'stone');
     sphere(trim,side*2.01,3.29,z-.09,.06,.29,.11,'stone');
     sphere(trim,side*2.01,3.57,z-.06,.06,.12,.089,'stone');
    }
   }
   const y=5.24;
   const at=(x,rise,z)=>[x,y+rise,z];
   const cast=(a,b,width)=>limb(at(...a),at(...b),width,figure);
   cast([0,1.22,-1.01],[0,2.39,.77],.64);
   sphere(figure,...at(0,2.19,.35),.68,.72,.93);
   cast([0,2.35,.72],[0,3.17,1.31],.38);
   sphere(figure,...at(0,3.25,1.52),.32,.32,.48);
   sphere(figure,...at(0,3.08,1.90),.24,.24,.34);
   for(const side of [-1,1]){
    cast([side*.39,1.30,-1.0],[side*.46,.59,-.84],.17);
    cast([side*.46,.59,-.84],[side*.51,.10,-1.12],.12);
    cast([side*.42,2.30,.71],[side*.49,1.91,1.25],.16);
    cast([side*.49,1.91,1.25],[side*.50,1.59,1.66],.105);
    cast([side*.17,2.98,.24],[side*.55,2.24,.43],.14);
    add('cone','metal',figure,side*.15,y+3.59,1.42,.10,.44,.11);
   }
   cast([0,1.47,-1.29],[.30,.68,-1.84],.13);
   sphere(figure,...at(0,3.57,.19),.40,.67,.29);
   sphere(figure,...at(0,4.35,.20),.31,.38,.26);
   add('cape','metal',figure,0,y+3.39,-.20,1.03,1.9,.43);
   cast([-.34,3.89,.23],[-.48,3.54,.72],.11);
   cast([-.48,3.54,.72],[-.26,3.23,1.19],.081);
   cast([.34,3.88,.25],[.59,4.28,.31],.11);
   cast([.59,4.28,.31],[.66,4.72,.34],.085);
   cast([.65,4.66,.33],[.70,5.66,.51],.052);
   cast([.70,5.66,.51],[.77,6.0,.68],.036);
   // Relaid ground-level water zones flank the monument. Their nozzle spacing is schematic.
   for(const side of [-1,1]){
    box(0xaaa99d,side*4.95,.09,6.65,2.15,.18,6.2);
    box(fountain,side*4.95,.193,6.65,1.69,.035,5.75,'water');
    for(const z of [4.3,5.45,6.6,7.75,8.9]){
     limb([side*4.95,.20,z],[side*4.87,1.06,z+.08],.04,0xc0d8da,'water');
    }
   }
   return;
  }
  if(model==='casablanca-mohammed-v-fountain'){
   const rim=0xd5cbbb,cascade=0x447f89,whiteJet=0xc9e6e6;
   ring(rim,0,.10,0,12.78,.15,'stone');
   cylinder(rim,0,.19,0,8.70,.38);
   cylinder(cascade,0,.402,0,8.4,.035,'water');
   cylinder(rim,0,.62,0,4.46,.42);
   cylinder(cascade,0,.852,0,4.23,.036,'water');
   for(const [r,count,h] of [[11.10,28,1.91],[7.44,20,3.19],[3.35,12,4.61]]){
    for(let i=0;i<count;i++){
     const a=i*2*Math.PI/count,c=Math.cos(a),s=Math.sin(a);
     const level=r>10?.12:r>5?.43:.88;
     limb([r*c,level,r*s],[(r-.37)*c,level+h*.72,(r-.37)*s],.055,whiteJet,'water');
     limb([(r-.37)*c,level+h*.72,(r-.37)*s],[(r-.93)*c,level+h,(r-.93)*s],.038,whiteJet,'water');
    }
   }
   limb([0,.87,0],[0,5.87,0],.15,whiteJet,'water');
   return;
  }
  if(model==='casablanca-palais-justice'){
   const stucco=0xe4d4b6,trim=0xd2bb93,dark=0x615746,tile=0x516e53,glass=0x5f6862;
   box(trim,0,.31,0,85,.62,22);
   for(const side of [-1,1]){
    box(stucco,side*24.7,6.82,-.85,35.5,12.4,19.5);
    box(trim,side*24.7,12.84,8.96,35.6,.48,.63);
    for(const x of [9.7,14.6,19.5,24.4,29.3,34.2,39.1]){
     add('barcelona-arched-door','stone',dark,side*x,3.22,8.98,2.32,4.92,.15);
     box(glass,side*x,9.55,9.04,1.43,2.18,.15);
     box(trim,side*x,8.45,9.23,1.86,.23,.57);
    }
   }
   box(stucco,0,7.74,.21,16,14.22,21.1);
   box(trim,0,7.95,10.18,13.60,13.55,.78);
   add('barcelona-arched-door','stone',dark,0,5.55,10.65,7.42,9.0,.18);
   add('barcelona-arched-door','stone',0x986849,0,4.93,10.77,5.74,7.74,.21);
   box(tile,0,12.60,10.61,13.78,.66,.26);
   for(const side of [-1,1])box(tile,side*5.58,6.75,10.66,.71,11.45,.30);
   add('hip-roof','stone',tile,0,14.92,.25,18.1,3.66,23.1);
   box(trim,0,18.66,.25,4.25,.36,.22);
   return;
  }
  if(model==='rabat-bab-el-had-fountain'){
   const rim=0xd5c4ac,riffle=0xc9e5e1;
   ring(rim,0,.17,0,5.05,.14,'stone');
   ring(0x729f92,0,.09,0,4.72,.06,'stone');
   for(let n=0;n<12;n++){
    const angle=n*Math.PI/6,s=Math.sin(angle),c=Math.cos(angle);
    limb([3.9*s,.08,3.9*c],[3.66*s,1.26,3.66*c],.038,riffle,'water');
   }
   limb([0,.065,0],[0,2.13,0],.055,riffle,'water');
   return;
  }
  if(model==='rabat-bab-el-had-gate'){
   const ochre=0xb8794e,stonework=0xca9564,shadow=0xa56b47,bevel=0xe0b681;
   add('rabat-ogive-gate','stone',ochre,0,0,0,1,1,23);
   for(const side of [-1,1]){
    box(ochre,side*8.2,4.6,-.34,5.7,9.2,20.4);
    add('rabat-chamfered-tower','stone',stonework,side*8.3,0,4.1,5.5,9.8,13.6);
    box(shadow,side*14.55,3.75,-5.83,7.0,7.5,2.4);
    for(let i=0;i<4;i++){
     box(stonework,side*(11.45+i*1.75),7.76,-5.83,.70,.52,1.94);
    }
    for(const z of [-10.85,10.85]){
     box(bevel,side*3.30,3.10,z,.11,5.8,.28);
     for(let n=0;n<6;n++)box(stonework,side*8.29,10.12,z+(z>0?-.62:.7)+.22*n,.68,.60,.56);
    }
    for(const x of [6.54,8.24,9.94]){
     box(stonework,side*x,10.46,10.29,.68,.66,.75);
    }
   }
   for(const front of [-1,1]){
    const z=front*11.62;
    const arch=[[-2.06,0],[-2.06,1.55],[-2.29,2.29],[-1.80,3.25],[0,4.14],[1.80,3.25],[2.29,2.29],[2.06,1.55],[2.06,0]];
    for(let j=1;j<arch.length;j++)limb([arch[j-1][0],arch[j-1][1],z],[arch[j][0],arch[j][1],z],.105,bevel,'stone');
    box(bevel,0,6.0,z,6.7,.21,.21);
    for(let x=-3;x<=3;x++)box(stonework,x*1.19,9.69,z-front*.46,.68,.6,.76);
   }
   box(shadow,0,5.05,11.64,2.41,.58,.13);
   return;
  }
  if(model==='floral-calendar'){
   box(stone,0,.12,0,8,.24,4);box(0x426d38,0,.29,0,7.65,.14,3.65);
   const digits=new Intl.DateTimeFormat('en-GB',{timeZone:'America/Argentina/Buenos_Aires',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date());
   const segments=[[0,.6,.34,.075],[.22,.44,.075,.27],[.22,.15,.075,.27],[0,0,.34,.075],[-.22,.15,.075,.27],[-.22,.44,.075,.27],[0,.30,.34,.075]],codes=[63,6,91,79,102,109,125,7,127,111];
   for(let n=0;n<digits.length;n++){
    const origin=(n-(digits.length-1)/2)*.64;
    if(digits[n]==='/'){limb([origin-.13,.40,-.43],[origin+.12,.40,.43],.037,0xefddaa,'stone');continue;}
    for(let k=0;k<7;k++)if(codes[Number(digits[n])]&(1<<k)){
     const [x,z,w,d]=segments[k];box(0xefddaa,origin+x,.40,(z-.3)*1.88,w,.09,d*1.88);
    }
   }
   for(let i=0;i<42;i++){const a=i*Math.PI*2/42;sphere(i%2?0xe8c572:0xd694b1,Math.cos(a)*3.45,.47,Math.sin(a)*1.45,.12,.10,.12,'stone');}
  }else if(model==='karachi-mazar-e-quaid'){
   const marble=0xebebe2,trim=0xd6d5ca,bronzeGate=0x66564a;
   box(trim,0,1.1,0,75,2.2,75);
   box(marble,0,2.8,0,72,1.2,72);
   box(marble,0,3.7,0,35.35,.6,35.35);
   add('karachi-mausoleum-body','stone',marble,0,11.6,0,27.4,15.2,27.4);
   for(const x of [-12.5,12.5])for(const z of [-12.5,12.5]){
    box(marble,x,10.75,z,5.6,13.5,5.6);
    box(trim,x,17.35,z,5.9,.36,5.9);
   }
   const lean=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-.079);
   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2,s=Math.sin(angle),c=Math.cos(angle);
    const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    const face=rotation.clone().multiply(lean);
    add('karachi-mausoleum-portal','stone',bronzeGate,13.34*s,9.15,13.34*c,7.6,10.35,.22,face);
    for(let bar=-3;bar<=3;bar++){
     const lateral=bar*.74;
     add('box','metal',0x9c7e55,13.67*s+lateral*c,6.8,13.67*c-lateral*s,.14,5.2,.12,face);
    }
    for(let step=0;step<4;step++){
     const offset=35.9+step*.39;
     add('box','stone',trim,offset*s,3.25-step*.31,offset*c,11.6,.39,2.4,rotation);
    }
   }
   cylinder(trim,0,19.55,0,10.45,1);
   cylinder(marble,0,21.4,0,9.7,3.1);
   add('karachi-mausoleum-dome','stone',0xe3e1d7,0,22.65,0,9.7,13.35,9.7);
  }else if(model==='vientiane-patuxay-gate'){
   const main=0xb8b2a5,cap=0xd2c2a5,relief=0x9d917e;
   for(const side of [-1,1]){
    add('triumphal-arch','stone',main,0,0,side*9.38,23.2,21.2,4.42);
    add('triumphal-arch','stone',main,side*9.38,0,0,23.2,21.2,4.42,
     new T.Quaternion().setFromAxisAngle(UP,Math.PI/2));
    for(const corner of [-1,1])box(cap,side*9,1.04,corner*9,5.8,2.08,5.8);
   }
   box(main,0,24,0,21,7.1,21);
   for(const [height,size,depth] of [[20.65,24,.85],[21.72,23.2,1.45],[24.1,22.7,.65],[25.5,21.9,2.08],[27.0,22.9,.68]])
    box(cap,0,height,0,size,depth,size);
   for(const side of [-1,1])for(const i of [-4,-3,-2,-1,0,1,2,3,4]){
    box(relief,i*2.30,25.54,side*10.96,.17,1.05,.15);
    box(relief,side*10.96,25.54,i*2.30,.15,1.05,.17);
   }
   const tower=(x,z,width,height)=>{
    for(const [i,scale] of [1,.76,.53,.32].entries()){
     box(main,x,27.9+i*height*.17,z,width*scale,height*.19,width*scale);
     box(cap,x,27.9+i*height*.17+height*.10,z,width*scale*1.22,.38,width*scale*1.22);
    }
    add('pyramid','stone',cap,x,28.0+height*.74,z,width*.27,height*.42,width*.27);
   };
   tower(0,0,7.4,15);
   for(const x of [-6.6,6.6])for(const z of [-6.6,6.6])tower(x,z,3.5,8.3);
  }else if(model==='orange-robertson-rotunda'){
   const wall=0xa6957f,roof=0x444d50;
   add('bandstand-deck','stone',wall,0,.40,0,4.26,.80,4.26);
   add('bandstand-deck','stone',stone,0,.85,0,4.37,.16,4.37);
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4+Math.PI/8;
    const x=Math.sin(angle)*3.45,z=Math.cos(angle)*3.45;
    cylinder(marble,x,2.32,z,.20,2.76);
   }
   add('bandstand-deck','stone',wall,0,3.73,0,4.46,.29,4.46);
   add('bandstand-roof','stone',roof,0,4.28,0,4.48,2.35,4.48);
   sphere(roof,0,5.53,0,.13,.19,.13,'stone');
  }else if(model==='orange-whitney-fountain'){
   const edge=0xd4c7b2;
   cylinder(edge,0,.16,0,3,.32);
   cylinder(water,0,.34,0,2.8,.035,'water');
   ring(marble,0,.36,0,2.86,.09,'stone');
   for(const [y,r,h] of [[.56,.57,.40],[1.11,.28,.78],[1.51,1.28,.23],[1.98,.23,.76],[2.40,.64,.20],[2.69,.17,.48]])
    cylinder(marble,0,y,0,r,h);
   jet(0,2.92,0,.45,.20);
  }else if(model==='orange-boer-lamp'){
   const rock=0xbba587,iron=0x393e43;
   for(const [y,w,h] of [[.15,3.3,.30],[.39,2.74,.19],[.91,1.86,.88],[1.49,1.98,.28]])
    box(rock,0,y,0,w,h,w);
   cylinder(rock,0,2.37,0,.42,1.6);
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4;
    cylinder(stone,Math.sin(angle)*.40,2.37,Math.cos(angle)*.40,.042,1.54);
   }
   cylinder(rock,0,3.22,0,.56,.21);
   cylinder(iron,0,3.79,0,.07,1,'metal');
   for(const [x,z] of [[-.46,0],[.46,0],[0,-.46],[0,.46]]){
    limb([0,3.71,0],[x,4.04,z],.054,iron);
    sphere(marble,x,4.20,z,.20,.24,.20,'glass');
   }
   sphere(marble,0,4.64,0,.21,.26,.21,'glass');
  }else if(model==='xian-dayan-pagoda'){
   const brick=0xae8058, cornice=0x886044, closedDoor=0x513c2f;
   // Widths and height bands derive from the mapped building parts.
   const stories=[
    [0,7,25.66,6,8,26.66],[7,14,22.70,13,16,23.70],
    [15,22,20.48,21,24,20.74],[23,30,18.26,29,31,18.76],
    [30,37,16.04,37,39,16.79],[38,45,13.33,44,47,14.30],
    [46,53,11.10,52,59,12.80]
   ];
   for(const [base,top,width,bandBase,bandTop,bandWidth] of stories){
    box(brick,0,(base+top)/2,0,width,top-base,width);
    box(cornice,0,(bandBase+bandTop)/2,0,bandWidth,bandTop-bandBase,bandWidth);
    box(brick,0,bandTop-.50,0,bandWidth*.92,1,bandWidth*.92);
    const doorY=base+(top-base)*.32, doorHeight=(top-base)*.53, doorWidth=width*.115;
    for(const side of [-1,1]){
     box(closedDoor,0,doorY,side*width/2,doorWidth,doorHeight,.12);
     box(closedDoor,side*width/2,doorY,0,.12,doorHeight,doorWidth);
    }
   }
   box(cornice,0,60.45,0,2.4,2.9,2.4);
   box(brick,0,63.2,0,1.48,2.6,1.48);
  }else if(model==='shenzhen-civic-light-tower'){
   const frame=0x5d7d8e, glass=0x8bc3ce;
   box(0xb6b5ad,0,.28,0,13.22,.56,6.06);
   box(glass,0,10.25,0,12.74,19.40,5.58,'glass');
   for(const x of [-6.42,6.42]){
    for(const z of [-2.82,2.82]){
     limb([x,.56,z],[x,20,z],.14,frame);
     limb([x,20,z],[x*.86,24.85,0],.14,frame);
    }
   }
   limb([-5.52,24.85,0],[5.52,24.85,0],.14,frame);
   for(const y of [3.5,7.7,11.9,16.1,20]){
    for(const z of [-2.83,2.83]) box(frame,0,y,z,12.86,.14,.15,'metal');
    for(const x of [-6.42,6.42]) box(frame,x,y,0,.15,.14,5.66,'metal');
   }
  }else if(model==='osaka-central-public-hall'){
   const brick=0xa05238, trim=0xe1cbb0, copper=0x587b70, pane=0x385159;
   box(trim,0,.52,0,51,1.04,57.6);
   box(brick,0,9.52,-2.4,42.6,17,54);
   box(brick,0,9.45,25.6,48.5,16.8,8.8);
   box(trim,0,18.93,-.4,48.5,1.10,57.1);
   box(copper,0,20.18,-8.9,43,2.04,44);
   sphere(copper,0,21.25,-7.6,16.4,4.9,15.5);
   box(brick,0,20.0,28.6,21,4.65,4.8);
   box(pane,0,12.15,30.9,15,8.55,.40,'glass');
   sphere(pane,0,16.35,31,7.56,5.20,.48,'glass');
   for(let segment=0;segment<12;segment++){
    const a=segment*Math.PI/12,b=(segment+1)*Math.PI/12;
    const edge=angle=>[Math.cos(angle)*8.1,16.35+Math.sin(angle)*5.72,31];
    limb(edge(a),edge(b),.48,segment%2?trim:brick);
   }
   for(const x of [-18.7,18.7]){
    box(brick,x,11.1,23.1,9.1,20.2,11.7);
    box(trim,x,19.50,23.1,9.5,.7,12.1);
    box(copper,x,21.30,23.1,8.5,2.05,10.3);
    sphere(copper,x,22,23.1,4.25,3.96,5.1);
    cylinder(copper,x,26.20,23.1,.16,.80);
    box(pane,x,15.35,29.0,2.4,5.0,.12,'glass');
   }
   for(const x of [-5.10,0,5.10]){
    box(trim,x,3.25,30.4,3.8,4.9,.60);
    box(pane,x,3.12,30.72,2.9,4.50,.16,'glass');
    box(trim,x,13.35,31.28,.30,7.95,.18);
   }
   for(const side of [-1,1]){
    for(const z of [-24,-17,-10,-3,4,11,18]){
     box(pane,side*21.36,12.0,z,.18,6.7,3.25,'glass');
     box(trim,side*21.42,8.25,z,.30,.43,3.9);
    }
    box(trim,side*21.40,5.72,-2.4,.36,.67,53.9);
   }
  }else if(model==='bangkok-royal-pavilion'){
   const marble=0xe4dbca, roof=0xaf492c, lowerTile=0x8d3126, gilding=0xcd9c38;
   box(marble,0,.19,0,15.50,.38,8);
   box(marble,0,.19,0,8,.38,15.50);
   box(marble,0,.61,0,8,.46,8);
   for(const [x,z] of [[-3,-6.7],[3,-6.7],[-3,6.7],[3,6.7],[-6.7,-3],[-6.7,3],[6.7,-3],[6.7,3]]){
    box(marble,x,2.56,z,.64,4.24,.64);
    box(gilding,x,4.57,z,.87,.32,.87,'metal');
    box(gilding,x,.64,z,.87,.27,.87,'metal');
    box(gilding,x,5.31,z,.52,1.20,.52,'metal');
   }
   for(const side of [-1,1]){
    box(gilding,side*3,4.73,0,.43,.38,14.3,'metal');
    box(gilding,0,4.73,side*3,14.3,.38,.43,'metal');
   }
   const vertical=new T.Vector3(0,1,0),ridgeAxis=new T.Vector3(0,0,1);
   for(const turn of [0,Math.PI/2]){
    const orient=new T.Quaternion().setFromAxisAngle(vertical,turn);
    for(const [base,span,length,rise,tile] of [[4.55,10.7,18.9,3.35,lowerTile],[6.55,8.5,16.4,3.00,roof]]){
     const run=span/2,slope=Math.atan2(rise,run),panel=Math.hypot(run,rise);
     for(const side of [-1,1]){
      const x=side*run/2,y=base+rise/2;
      const rotation=new T.Quaternion().setFromAxisAngle(ridgeAxis,-side*slope).premultiply(orient);
      add('box','stone',tile,x*Math.cos(turn),y,-x*Math.sin(turn),panel,.22,length,rotation);
      for(const end of [-length/2,length/2]){
       const start=new T.Vector3(side*run,base,end).applyQuaternion(orient);
       const ridge=new T.Vector3(0,base+rise,end).applyQuaternion(orient);
       limb(start.toArray(),ridge.toArray(),.13,gilding);
      }
     }
     for(const end of [-length/2,length/2]){
      const ridge=new T.Vector3(0,base+rise,end).applyQuaternion(orient);
      const tip=new T.Vector3(0,base+rise+.95,end+Math.sign(end)*.32).applyQuaternion(orient);
      limb(ridge.toArray(),tip.toArray(),.16,gilding);
     }
    }
   }
  }else if(model==='bangkok-rama-iii'){
   const marble=0xdad0be,wood=0x937e64,casting=0x535244;
   box(marble,0,.26,0,8.4,.52,6.4);
   box(marble,0,.77,.22,5.75,.50,4.72);
   box(marble,0,1.57,.45,4.15,1.10,3.7);
   box(marble,0,2.23,.45,4.56,.23,3.90);
   box(marble,0,2.66,-2.32,5.9,4.82,.38);
   box(marble,0,5.21,-2.32,6.10,.22,.47);
   box(wood,0,3.80,-2.10,2.15,2.06,.10);
   box(0xba9c5d,0,4.38,-2.00,.42,.72,.10,'metal');
   box(casting,0,2.78,.58,1.65,.84,1.45,'metal');
   box(casting,0,3.75,.05,1.35,1.52,.28,'metal');
   sphere(casting,0,3.94,.60,.66,.75,.41,'metal');
   sphere(casting,0,4.83,.64,.27,.34,.26,'metal');
   for(const side of [-1,1]){
    limb([side*.37,3.42,.60],[side*.47,3.33,1.34],.29,casting);
    limb([side*.47,3.33,1.34],[side*.44,2.62,1.51],.21,casting);
    limb([side*.54,4.24,.54],[side*.70,3.77,.76],.17,casting);
    limb([side*.70,3.77,.76],[side*.47,3.52,1.22],.14,casting);
    box(casting,side*.44,2.53,1.66,.36,.22,.49,'metal');
   }
  }else if(model==='miami-pepper-fountain'){
   const stream=0xc3e8ec, rim=0xb6b0a5;
   ring(rim,0,.21,0,23.0,.21,'stone');
   for(const [count,rad,height,inset] of [[20,20,3.7,4.7],[14,13,7.4,5.9],[9,5.4,9.8,2.8]]){
    for(let i=0;i<count;i++){
     const angle=(i+.25)*Math.PI*2/count, x=Math.cos(angle),z=Math.sin(angle);
     let previous=[x*rad,.10,z*rad];
     for(let step=1;step<=5;step++){
      const t=step/5,r=rad-inset*t,y=.10+4*height*t*(1-t);
      const next=[x*r,y,z*r];
      limb(previous,next,.22,stream,'water');
      previous=next;
     }
    }
   }
   cylinder(stream,0,6.55,0,.35,13.10,'water');
   for(const [x,z] of [[1.28,0],[-1.28,0],[0,1.28],[0,-1.28]]){
    cylinder(stream,x,4.35,z,.20,8.70,'water');
   }
  }else if(model==='miami-slide-mantra'){
   const marble=0xe3ddd2, shade=0xc8c1b6;
   cylinder(marble,0,.18,0,1.77,.36);
   cylinder(marble,0,1.03,0,1.18,1.86);
   const yAxis=new T.Vector3(0,1,0);
   const route=(t,r)=>[Math.cos(t*Math.PI*1.66)*r,.24+2.70*t,Math.sin(t*Math.PI*1.66)*r];
   for(let i=0;i<22;i++){
    const a=i/22,b=(i+1)/22,r=2.03-.70*(a+b)/2;
    const u=route(a,r),v=route(b,r);
    const dx=v[0]-u[0],dz=v[2]-u[2],run=Math.hypot(dx,dz),rise=v[1]-u[1];
    const yaw=new T.Quaternion().setFromAxisAngle(yAxis,-Math.atan2(dz,dx));
    const slope=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),Math.atan2(rise,run)).premultiply(yaw);
    const span=Math.hypot(run,rise)+.10,y=(u[1]+v[1])/2;
    add('box','stone',marble,(u[0]+v[0])/2,y,(u[2]+v[2])/2,span,.25,1.13,slope);
    const core=route((a+b)/2,r-.28);
    add('box','stone',marble,core[0],(y-.09)/2,core[2],run+.10,y-.09,.73,yaw);
    for(const side of [-1,1]){
     const p=route(a,r+side*.57),q=route(b,r+side*.57);
     p[1]+=.14;q[1]+=.14;
     limb(p,q,.19,side===1?marble:shade,'stone');
    }
   }
   for(let step=0;step<8;step++){
    box(shade,-.45,.18+.11*step,-1.85+.17*step,.76,.23+.22*step,.25);
   }
  }else if(model==='new-orleans-jackson-equestrian'){
   const iron=0x53594b,granite=0xbdb2a0,cut=0xa49a89;
   box(granite,0,.22,0,4.6,.44,5.1);
   box(cut,0,.54,0,3.85,.22,4.38);
   box(granite,0,1.54,0,2.56,1.86,3.48);
   box(granite,0,2.59,0,2.88,.27,3.80);
   box(iron,0,2.76,0,1.54,.09,2.34,'metal');
   const pitch=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-.65);
   add('sphere','metal',iron,0,3.86,.02,.39,.47,1.02,pitch);
   sphere(iron,0,3.36,-.56,.43,.48,.48,'metal');
   limb([0,4.32,.62],[0,5.20,.98],.26,iron);
   limb([0,5.20,.98],[0,5.02,1.48],.22,iron);
   limb([0,3.55,-.87],[0,3.13,-1.27],.12,iron);
   limb([0,3.13,-1.27],[0,2.86,-1.13],.09,iron);
   for(const side of [-1,1]){
    limb([side*.26,3.61,-.56],[side*.35,3.16,-.37],.12,iron);
    limb([side*.35,3.16,-.37],[side*.38,2.84,-.87],.09,iron);
    box(iron,side*.38,2.83,-.86,.18,.13,.20,'metal');
    limb([side*.27,4.08,.62],[side*.38,4.23,1.18],.13,iron);
    limb([side*.38,4.23,1.18],[side*.38,3.87,1.43],.08,iron);
    limb([side*.15,5.18,.99],[side*.19,5.43,1.00],.057,iron);
    limb([side*.24,4.37,-.33],[side*.43,4.04,.04],.13,iron);
    limb([side*.43,4.04,.04],[side*.47,3.74,-.10],.09,iron);
   }
   limb([0,4.36,-.35],[0,5.27,-.57],.29,iron);
   sphere(iron,0,5.52,-.53,.21,.26,.20,'metal');
   limb([-.21,5.15,-.48],[-.42,4.91,-.18],.10,iron);
   limb([-.42,4.91,-.18],[-.32,4.88,.24],.082,iron);
   limb([.22,5.17,-.48],[.59,5.20,-.22],.10,iron);
   limb([.59,5.20,-.22],[.91,5.65,-.15],.086,iron);
   box(iron,.96,5.73,-.14,.53,.10,.26,'metal');
   box(iron,.96,5.90,-.14,.35,.28,.18,'metal');
  }else if(model==='new-orleans-st-louis-cathedral'){
   const cream=0xe3d9c1,trim=0xf3ebd7,slate=0x4b5457,glass=0x4d5c65;
   box(cream,0,.70,0,28.4,1.40,57.2);
   box(cream,0,9.3,-1.35,24.7,16.7,53.7);
   add('pediment','stone',slate,0,20.00,-1.7,25.65,6.95,53.45);
   box(cream,0,10.7,26.0,29.6,20.0,5.2);
   box(trim,0,20.8,26.6,30.2,1.05,5.7);
   add('pediment','stone',cream,0,24.05,27.20,16.5,6.15,3.25);
   for(const x of [-10.7,10.7]){
    box(cream,x,23.40,23.2,6.50,14.0,7.1);
    box(trim,x,30.48,23.2,7.1,.88,7.7);
    add('cone','stone',slate,x,35.44,23.2,3.63,9.03,3.63);
    box(slate,x,40.10,23.2,.24,1.30,.24,'metal');
    box(slate,x,40.43,23.2,.85,.23,.23,'metal');
    box(glass,x,24.90,26.77,1.45,4.36,.18,'glass');
   }
   box(cream,0,27.0,22.0,7.7,16,7.8);
   box(trim,0,35.25,22.0,8.30,.70,8.35);
   cylinder(cream,0,38.64,22.0,3.49,6.05);
   add('cone','stone',slate,0,46.34,22.0,3.76,9.34,3.76);
   box(slate,0,51.45,22.0,.27,1.90,.27,'metal');
   box(slate,0,51.76,22.0,1.30,.28,.28,'metal');
   const verticalFace=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('cylinder','stone',trim,0,29.6,25.96,1.61,.20,1.61,verticalFace);
   box(slate,0,29.96,26.09,.13,.83,.14,'metal');
   box(slate,.34,29.60,26.09,.69,.14,.14,'metal');
   for(const x of [-7.5,0,7.5]){
    box(glass,x,4.30,28.68,2.9,6.3,.26,'glass');
    sphere(glass,x,7.27,28.72,1.45,1.45,.20,'glass');
    box(glass,x,13.2,28.72,2.3,4.6,.20,'glass');
   }
   for(const x of [-13,-5.25,5.25,13]){
    box(trim,x,9.0,28.90,.88,15.80,.58);
   }
   for(const side of [-1,1])for(const z of [-22,-14,-6,2,10,18]){
    box(glass,side*12.39,10.30,z,.16,5.2,2.41,'glass');
    box(trim,side*12.55,7.56,z,.34,.40,2.7);
   }
  }else if(model==='jeju-sanjicheon-gallery'){
   const white=0xdbded6,rust=0x8c4f39, dark=0x394042,glass=0x668183;
   box(0xa29f95,0,.16,0,30.40,.32,15.1);
   box(white,-8.22,5.20,-.52,12.95,9.84,13.85);
   box(white,-8.22,10.17,-.52,13.25,.30,14.17);
   box(rust,7.61,5.76,.04,14.95,11.20,14.54);
   box(rust,7.61,11.44,.04,15.20,.32,14.76);
   box(dark,-.57,4.83,-.68,2.55,9.25,11.90);
   box(glass,-.57,3.7,5.37,2.15,6.64,.23,'glass');
   box(glass,7.72,2.63,7.35,12.6,4.15,.22,'glass');
   for(const x of [1.42,4.57,7.72,10.87,14.02]){
    box(dark,x,2.63,7.47,.11,4.35,.12,'metal');
   }
   for(const y of [5.46,7.22,8.98,10.75]){
    box(0x79503f,7.63,y,7.41,14.76,.045,.13,'metal');
   }
   for(const x of [-12.32,-8.17,-4.02]){
    for(const y of [3.05,6.05,8.30]){
     box(glass,x,y,6.48,1.58,1.71,.14,'glass');
    }
   }
   box(dark,-5.1,11.95,-3.52,1.06,3.65,.97);
   box(dark,-5.1,14.10,-3.52,.69,.85,.69,'metal');
  }else if(model==='nishinomiya-earthquake-memorial'){
   const granite=0xc6bca7,stone=0xa69b8a,plaque=0x444243,ceramic=0x758689;
   box(granite,0,.12,.16,10.15,.24,3.12);
   box(granite,0,1.58,0,4.42,2.84,.60);
   box(plaque,0,1.70,.31,3.74,1.82,.045);
   for(const side of [-1,1]){
    box(granite,side*3.41,1.42,.06,2.38,2.57,.60);
    box(plaque,side*3.41,1.57,.37,1.80,1.46,.045);
   }
   box(stone,0,.25,1.24,2.38,.50,.58);
   for(let index=0;index<8;index++){
    const angle=(index-3.5)*Math.PI/10;
    const x=Math.sin(angle)*7.05,z=Math.cos(angle)*4.75-1.1;
    cylinder(stone,x,.10,z,.47,.20);
    cylinder(granite,x,.78,z,.34,1.37);
    const rotation=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),angle+Math.PI);
    add('box','stone',ceramic,x-Math.sin(angle)*.34,.87,z-Math.cos(angle)*.34,.38,.46,.065,rotation);
    cylinder(stone,x,1.47,z,.35,.095);
   }
  }else if(model==='dhaka-tower-of-light'){
   const finish=[0x9ac0bc,0xa9cecb,0x83aaa9];
   box(0x949a91,0,.48,0,12.02,.96,10.51);
   box(0x7c9d9c,0,23.2,0,10.75,44.48,9.25,'metal');
   // The alternating projecting edges read as laminated glass at the plaza's scale.
   for(let level=0;level<34;level++){
    const y=1.50+level*1.30;
    box(finish[level%finish.length],0,y,0,12.00,.84,10.49,'metal');
   }
   box(0xb8d7d2,0,45.38,0,12.02,.68,10.51,'metal');
  }else if(model==='hongshan-dong-biwu'){
   const bronze=0x4f4c3b,granite=0x76716a,cap=0xa9a39a;
   box(cap,0,.13,0,4.1,.26,3.5);
   box(granite,0,.36,0,3.64,.20,2.85);
   box(granite,0,1.06,0,3.03,1.20,2.35);
   box(cap,0,1.78,0,3.10,.24,2.42);
   box(0x554e45,0,1.10,1.179,2.05,.56,.025);
   for(let line=0;line<6;line++)box(0xb3a37a,-.76+line*.305,1.10,1.20,.064,.32,.014,'metal');
   for(const side of [-1,1]){
    const x=side*.27;
    sphere(bronze,x,2.04,.15,.24,.15,.44);
    limb([x,2.10,.03],[x,3.65,-.02],.205,bronze,'patina');
   }
   sphere(bronze,0,4.18,0,.61,.86,.33,'patina');
   sphere(bronze,0,5.15,.018,.20,.24,.19,'patina');
   sphere(bronze,0,5.58,.027,.29,.32,.27,'patina');
   sphere(0x414031,0,5.70,-.03,.28,.17,.24,'patina');
   limb([-.50,4.72,.015],[-.68,4.03,-.04],.19,bronze,'patina');
   limb([-.68,4.03,-.04],[-.64,3.55,.05],.14,bronze,'patina');
   limb([.50,4.72,.015],[.66,4.08,.02],.19,bronze,'patina');
   limb([.66,4.08,.02],[.55,3.69,.21],.14,bronze,'patina');
   sphere(bronze,-.64,3.50,.06,.13,.18,.11,'patina');
   sphere(bronze,.55,3.64,.23,.13,.16,.12,'patina');
  }else if(model==='kindi-mosque-ensemble'){
   const wall=0xbc9266,cap=0xd5ae7d,shade=0x795e43,floor=0xcebaa1;
   box(floor,0,.37,0,78,.74,64);
   box(wall,0,4.6,-17,74,7.8,29);
   box(cap,0,8.56,-16,75,.78,30.5);
   for(const side of [-1,1]){
    const x=side*34.2;
    box(wall,x,2.52,13.3,7.4,3.6,31);
    box(cap,x,4.4,13.3,8,.40,32);
    box(wall,x,11.3,15.9,7.3,21.1,7.3);
    box(cap,x,22.1,15.9,8.3,.88,8.3);
    box(wall,x,23.31,15.9,5.2,1.55,5.2);
    box(cap,x,24.25,15.9,6,.46,6);
    for(const z of [12.3,19.5])for(const dx of [-3.1,0,3.1])box(cap,x+dx,22.95,z,1.25,1.05,1.25);
    for(const z of [1,7.2,13.4,19.6,25.8])box(shade,side*29.8,2.12,z,.95,2.75,1.1);
   }
   for(let i=-6;i<=6;i++){
    box(shade,i*5.35,6.12,-2.37,.70,1.25,.18);
    box(cap,i*5.35,9.1,-1.81,2.2,1.05,1.25);
   }
   for(const x of [-11,0,11])box(shade,x,2.75,-2.28,2.6,4.0,.19);
  }else if(model==='nelson-anzac-cenotaph'){
   const pale=0xc6bfae,granite=0x8a877f,panel=0x4b4a46;
   for(const [y,w,h] of [[.11,2.8,.22],[.29,2.45,.16],[.45,2.16,.16],[1.04,1.65,1.08],[1.64,1.77,.18]])
    box(pale,0,y,0,w,h,w);
   box(granite,0,2.70,0,1.01,1.98,1.01);
   add('pyramid','stone',pale,0,4.10,0,.50,.8,.50);
   box(pale,0,3.68,0,1.02,.12,1.02);
   for(const side of [-1,1]){
    box(panel,0,1.07,side*.835,1.13,.68,.035,'stone');
    box(panel,side*.835,1.07,0,.035,.68,1.13,'stone');
   }
  }else if(model==='chicago-picasso'){
   const steel=0x69422e,lightSteel=0x825039,darkSteel=0x52382d;
   box(0x928c83,0,.36,0,10.6,.72,6.7);
   add('picasso-front-plane','metal',steel,0,.72,1.5,8.8,15.24,.37);
   const folded=new T.Quaternion().setFromAxisAngle(UP,.62);
   add('picasso-side-plane','metal',darkSteel,-1.65,.72,-.8,6.9,15.24,.31,folded);
   const incline=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-.61);
   add('box','metal',lightSteel,0,2.04,1.11,2.24,3.08,.27,incline);
   for(let i=0;i<5;i++){
    const start=[.45+i*.37,10.25-i*.38,1.38];
    const tip=[3.32+i*.15,9.25-i*.53,-1.56+i*.09];
    limb(start,tip,.10,steel);
   }
  }else if(model==='chicago-daley-jets'){
   for(const x of [-4.4,-2.2,0,2.2,4.4])for(const z of [-3.5,0,3.5]){
    const height=x===0&&z===0?1.83:1.06;
    jet(x,.22,z,height,.38);
   }
  }else if(model==='blitar-pecut-fountain'){
   const rim=0xbaac97,sculpture=0x5a3927;
   cylinder(rim,0,.37,0,14,.74);
   cylinder(water,0,.765,0,13.3,.05,'water');
   ring(stone,0,.77,0,13.58,.25,'stone');
   cylinder(stone,0,.95,0,1.58,.76);
   limb([0,1.28,.1],[-.30,2.68,.12],.34,sculpture);
   sphere(sculpture,-.44,2.72,.08,.62,.54,.42);
   for(let i=0;i<4;i++){
    const x=-.84+i*.24;
    limb([x,2.84,.15],[x+.13,3.12,.35],.13,sculpture);
   }
   limb([-.09,2.49,.28],[-.49,2.97,.48],.16,sculpture);
   const whip=[[-1.43,2.72,.10],[-.48,3.03,.10],[.61,3.44,.10],[1.94,4.18,.10],[3.03,5.08,.10],[3.36,6.04,.10],[3.18,6.38,.10]];
   for(let i=1;i<whip.length;i++)limb(whip[i-1],whip[i],.20-i*.023,sculpture);
   for(let i=0;i<12;i++){
    const angle=i*Math.PI/6;
    jet(Math.sin(angle)*9.55,.80,Math.cos(angle)*9.55,1.38,1.35);
   }
  }else if(model==='vientiane-patuxay-fountain'){
   cylinder(stone,0,.32,0,17,.64);
   cylinder(water,0,.665,0,16.15,.04,'water');
   ring(marble,0,.66,0,16.35,.18,'stone');
   for(let i=0;i<12;i++){
    const angle=i*Math.PI/6;
    jet(Math.sin(angle)*11.5,.69,Math.cos(angle)*11.5,1.55,1.1);
   }
   jet(0,.69,0,2.5,1.3);
  }else if(model==='washington-arch'){
   const light=0xe5dfd3,shade=0xbcb8ac;
   add('triumphal-arch','stone',light,0,0,0,7.1,8.76,2.18);
   for(const side of [-1,1]){
    box(shade,side*2.63,.27,0,1.88,.53,2.66);
    for(const face of [-1,1]){
     box(light,side*2.58,3.31,face*1.15,.70,5.75,.31);
     box(shade,side*2.58,6.11,face*1.16,.94,.25,.36);
     box(0xddd6c6,side*2.58,6.54,face*1.13,1.21,.50,.19);
    }
   }
   for(const [h,w,d] of [[7.42,7.37,2.43],[8.04,7.53,2.58],[8.85,7.55,2.56],[9.03,7.36,2.44]])
    box(light,0,h,0,w,.18,d);
   for(const face of [-1,1])for(let i=0;i<11;i++){
    const a=i*Math.PI/10;
    add('box','stone',shade,Math.cos(a)*1.65,4.39+Math.sin(a)*1.66,face*1.1,.18,.29,.10,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),a-Math.PI/2));
   }
  }else if(model==='washington-garibaldi'){
   steps(0,3.05);
   box(0x9d8e85,0,2.04,0,1.66,2.82,1.53);
   box(0xb6a49a,0,3.47,0,1.92,.22,1.78);
   box(bronze,0,3.64,0,1.43,.14,1.24,'metal');
   human(0,3.71,0,.99,'civil',bronze);
   limb([.55,4.94,.14],[.69,3.85,.26],.035,bronze);
  }else if(model==='holley-monument'){
   box(stone,0,.14,0,3.12,.28,1.15);
   box(stone,0,1.49,0,1.12,2.46,.80);
   for(const side of [-1,1]){
    box(stone,side*1.36,1.14,0,.39,1.73,.83);
    box(stone,side*.88,.82,.04,.65,1.05,.23);
   }
   box(stone,0,2.73,0,1.20,.17,.87);
   sphere(bronze,0,3.04,0,.44,.25,.27);
   sphere(bronze,0,3.49,.03,.25,.31,.24);
   sphere(bronze,0,3.47,.25,.08,.09,.08);
  }else if(model==='toronto-archer'){
   cylinder(0x8a8b85,0,.14,0,1.28,.28);
   bronzeCurve([[-1.25,.61,.27,.29],[-.73,1.08,-.20,.47],[-.26,1.77,-.24,.49],
    [.44,2.62,-.12,.39],[1.22,2.95,.14,.17]]);
   bronzeCurve([[-.56,.61,-.57,.32],[.15,1.04,-.25,.48],[.92,1.56,.34,.42],
    [1.20,2.04,.61,.19]]);
   bronzeCurve([[-.08,1.61,.02,.46],[-.59,1.96,.40,.42],[-1.22,2.37,.64,.16]]);
  }else if(model==='boston-embrace'){
   bronzeCurve([[-3.52,.54,-1.75,.51],[-3.17,2.49,-1.73,.68],[-1.94,4.63,-1.29,.66],
    [.19,5.37,-.43,.62],[2.38,4.47,.39,.42]]);
   bronzeCurve([[3.53,.54,1.15,.53],[3.18,2.56,1.05,.72],[1.70,4.58,.76,.65],
    [-.55,5.42,.39,.52],[-2.46,4.35,-.38,.34]]);
   bronzeCurve([[-3.17,2.62,-1.52,.56],[-2.11,3.17,-.23,.56],[-.43,3.83,1.22,.52],
    [1.25,4.34,1.58,.39],[2.51,4.12,1.02,.28]]);
   bronzeCurve([[3.27,2.61,1.03,.55],[2.38,3.23,-.24,.54],[.94,3.92,-1.31,.49],
    [-1.05,4.38,-1.65,.37],[-2.40,4.03,-1.42,.27]]);
  }else if(model==='washington-fountain'||model==='franklin-fountain'){
   const washington=model==='washington-fountain',radius=washington?3.48:3.12;
   cylinder(stone,0,.14,0,radius+.15,.28);
   cylinder(water,0,.285,0,radius*.94,.025,'water');
   for(const y of [0.24,.41])ring(stone,0,y,0,radius,.115,'stone');
   if(washington)ring(0xb4ada0,0,.17,0,radius+.15,.103,'stone');
   jet(0,.31,0,washington?1.55:2.05,radius*.48);
   for(let j=0;j<8;j++){
    const a=j*Math.PI/4;
    jet(Math.sin(a)*radius*.55,.30,Math.cos(a)*radius*.55,washington?.43:.70,radius*.13);
   }
  }else if(model==='freedom-arches'){
   for(const z of [-2.23,0,2.23]){
    for(const side of [-1,1])box(marble,side*4.56,.30,z,.62,.59,.74);
    let previous=[-4.52,.40,z];
    for(let segment=1;segment<=24;segment++){
     const t=segment/24,next=[-4.52+t*9.04,.40+4.25*4*t*(1-t),z];
     limb(previous,next,.145,marble,'stone');previous=next;
    }
   }
  }else if(model==='liberty-carousel'){
   cylinder(stone,0,.21,0,3.85,.42);
   cylinder(0xa23742,0,.61,0,3.51,.31,'stone');
   cylinder(marble,0,.84,0,3.48,.16,'stone');
   for(let i=0;i<12;i++){
    const a=i*Math.PI/6,x=Math.sin(a)*2.74,z=Math.cos(a)*2.74;
    cylinder(gold,x,2.45,z,.052,3.37,'metal');
    sphere(i%2?0xd9a760:0xe7ddd6,x,1.53,z,.36,.41,.72,'stone');
    sphere(0xeee2cf,x,1.95,z+.46,.23,.32,.29,'stone');
   }
   add('cone','stone',0xb85956,0,4.55,0,3.62,1.32,3.62);
   ring(0xf0e2b9,0,3.92,0,3.62,.15,'stone');
  }else if(model==='dam-memorial'){
   const travertine=0xe6dfd2;
   for(let i=0;i<4;i++)cylinder(0xd2c9b7,0,.10+i*.20,0,3.33-i*.28,.21);
   box(travertine,0,1.30,0,3.25,1.11,3.25);
   add('tapered-column','stone',travertine,0,6.87,0,1.18,10.12,1.18);
   for(const x of [-1.39,1.39])human(x,1.855,1.04,.53,'classical',marble);
   for(const [x,y] of [[-.57,4.22],[.53,4.69],[0,5.40]]){
    sphere(marble,x,y,1.01,.15,.075,.055,'stone');
    limb([x-.28,y-.10,1.015],[x+.10,y+.13,1.06],.047,marble,'stone');
   }
  }else if(model==='senate-monument'){
   const granite=0xa77d70;
   steps(0,6.75);box(granite,0,1.28,0,4.40,1.28,4.40);
   for(const [y,w,h] of [[2.01,3.20,.24],[3.59,2.31,3.00],[5.24,2.83,.26],[5.48,2.27,.22]])box(granite,0,y,0,w,h,w);
   human(0,5.59,0,1.22,'civil');
   for(const [x,z] of [[0,1.91],[0,-1.91],[1.91,0],[-1.91,0]])human(x,1.92,z,.62,'classical');
   plaque(3.66,1.28,1.18);
  }else if(model==='preseren-monument'){
   const granite=0xaaa29a;
   steps(0,5.14);box(granite,0,1.30,0,3.41,1.34,3.82);
   box(granite,0,2.36,0,2.27,.88,2.76);box(granite,0,2.90,.07,2.56,.22,2.94);
   human(0,3.01,.63,1.0,'civil');
   box(granite,0,3.55,-.86,1.30,1.08,1.05);
   human(0,4.10,-.83,.86,'laurel',bronze);
   plaque(1.46,2.20,1.93);
  }else if(model==='marianne-republique'){
   steps(0,7.36);cylinder(stone,0,1.07,0,3.28,.75);
   cylinder(marble,0,1.70,0,2.94,.56);cylinder(stone,0,4.69,0,1.47,5.43);
   for(const [y,r,h] of [[2.53,1.82,.22],[3.01,1.63,.18],[7.46,1.70,.26],[7.69,1.52,.20]])cylinder(marble,0,y,0,r,h);
   for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    add('box','metal',bronze,Math.sin(a)*2.56,1.13,Math.cos(a)*2.56,1.25,.40,.10,new T.Quaternion().setFromAxisAngle(UP,a));
   }
   for(const [x,z] of [[0,-2.08],[1.96,.74],[-1.96,.74]])human(x,1.98,z,.73,'classical',marble);
   human(0,7.79,0,1.13,'laurel',bronze);
   // The front group shares the monument base. The bronze lion guards the urn behind it.
   const lion=0x3e5148,mane=0x35473f,pawY=1.53;
   box(stone,0,1.40,3.09,2.62,.16,1.04);
   const urnZ=2.49;
   box(bronze,0,2.005,urnZ,.86,.05,.53,'metal');
   box(bronze,0,2.28,urnZ,.72,.51,.43,'metal');
   box(bronze,0,2.56,urnZ,.84,.09,.56,'metal');
   box(mane,0,2.611,urnZ,.34,.014,.06,'metal');
   sphere(lion,.04,1.97,3.08,.74,.31,.28);
   sphere(lion,.58,1.92,3.08,.34,.33,.29);
   sphere(mane,-.51,2.18,3.08,.34,.44,.32);
   sphere(lion,-.77,2.37,3.08,.24,.25,.21);
   sphere(lion,-.98,2.27,3.08,.18,.074,.14);
   sphere(mane,-1.105,2.33,3.08,.063,.051,.092);
   for(const side of [-1,1]){
    const z=3.08+side*.17;
    limb([-.46,2.04,z],[-.51,1.60,z],.093,lion);
    sphere(lion,-.55,pawY,z,.16,.06,.095);
    limb([.60,1.95,z],[.71,1.68,z],.108,lion);
    limb([.71,1.68,z],[.65,1.60,z],.085,lion);
    sphere(lion,.60,pawY,z,.14,.06,.095);
    sphere(mane,-.69,2.54,z,.075,.084,.065);
    sphere(lion,-.99,2.32,3.08+side*.069,.139,.086,.081);
    sphere(mane,-.43,2.25,3.08+side*.238,.26,.30,.105);
    sphere(lion,-.37,2.05,3.08+side*.172,.25,.26,.13);
    sphere(0x27372f,-.89,2.41,z+side*.027,.040,.024,.020);
   }
   const tail=[[.71,1.96,3.24],[.94,1.70,3.22],[1.09,1.56,3.32],[.95,1.54,3.44],[.74,1.55,3.45]];
   for(let segment=1;segment<tail.length;segment++)limb(tail[segment-1],tail[segment],.045,lion);
   sphere(mane,...tail.at(-1),.095,.061,.06);
  }else if(model==='bundesplatz-jets'){
   let index=0;
   for(let row=0;row<5;row++){
    const columns=row===2?6:5;
    for(let column=0;column<columns;column++){
     const x=(column-(columns-1)/2)*2.58,z=(row-2)*3.22;
     const height=.65+3.1*(.5+.5*Math.sin(index++*2.28));
     cylinder(0x626b72,x,.018,z,.145,.036,'metal');
     cylinder(0x96d5ee,x,.040+height/2,z,.085,height,'water');
    }
   }
  }else if(model==='flagpole'){
   cylinder(stone,0,.14,0,.28,.28);cylinder(0xa4b5bf,0,4.08,0,.052,7.65,'metal');
   sphere(0xc4b680,0,7.94,0,.095,.095,.095);
  }else if(model==='palmanova-stendardo'){
   add('hex','stone',0xc0b7a3,0,.16,0,4.2,.32,4.2);
   add('hex','stone',0xd3c9b5,0,.49,0,3.93,.34,3.93);
   add('hex','stone',0xdcd4c3,0,.74,0,3.76,.16,3.76);
   cylinder(0xb3ab9a,0,1.06,0,.64,.48);
   cylinder(0x564d44,0,6.33,0,.105,10.06,'metal');
   sphere(0xa09164,0,11.40,0,.15,.15,.15);
  }else if(model==='rajiv-chowk-flagpole'){
   cylinder(0x777975,0,.17,0,1.20,.34);
   cylinder(0xb5b9b9,0,16.09,0,.48,31.50,'metal');
   cylinder(0xc4c8c7,0,40.84,0,.35,18,'metal');
   cylinder(0xcdd0cf,0,56.465,0,.24,13.25,'metal');
   const panelWidth=27.43,bandHeight=6.096,flagX=panelWidth/2;
   const flagY=62.65-bandHeight*1.5,navy=0x14316c,chakraRadius=2.55;
   for(const [offset,color] of [[1,0xff9933],[0,0xffffff],[-1,0x138808]]){
    box(color,flagX,flagY+offset*bandHeight,0,panelWidth,bandHeight,.04,'patina');
   }
   for(const side of [-1,1]){
    add('vertical-torus','patina',navy,flagX,flagY,side*.035,chakraRadius,chakraRadius,.22);
    sphere(navy,flagX,flagY,side*.035,.21,.21,.01,'patina');
    for(let spoke=0;spoke<24;spoke++){
     const angle=spoke*Math.PI/12,length=chakraRadius-.035;
     const rotation=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),angle);
     add('box','patina',navy,flagX+Math.cos(angle)*length/2,flagY+Math.sin(angle)*length/2,
      side*.035,length,.082,.020,rotation);
    }
   }
  }else if(model==='tiananmen-flagpole'){
   const granite=0xbfbcbc,steel=0xc3ccd0;
   box(granite,0,.13,0,3.62,.26,3.32);
   box(granite,0,.27,0,3.26,.12,2.98);
   box(stone,0,.34,0,1.46,.14,1.46);
   cylinder(steel,0,3.93,0,.060,7.08,'metal');
   sphere(gold,0,7.50,0,.083,.083,.083);
   box(0xb51521,.66,6.95,0,1.24,.82,.020,'patina');
   for(const [x,y,radius] of [[.30,7.14,.094],[.46,7.27,.032],[.54,7.19,.032],[.54,7.09,.032],[.46,7.01,.032]]){
    for(const side of [-1,1])add('flag-star','stone',0xf0c638,x,y,side*.013,radius,radius,.004);
   }
  }else if(model==='taksim-mosque'){
   const limestone=0xe0d6c9,trim=0xc7beae,zinc=0x757c82,glass=0x647471;
   add('taksim-mosque-footprint','stone',limestone,0,2.75,0,1,5.50,1);
   add('taksim-mosque-footprint','stone',trim,0,5.72,0,1,.44,1);
   // The central roof and two smaller roof forms retain their relative map positions.
   for(const [x,z,r,base,drum,cap] of [[0,0,12.25,16.2,5.9,10.9],[-29.4,-.42,6.25,10.9,4.7,4.6],[25.1,3.60,6.3,10.9,4.7,4.6]]){
    cylinder(limestone,x,base/2,z,r+.36,base);
    cylinder(limestone,x,base+drum/2,z,r,drum);
    cylinder(trim,x,base+drum-.19,z,r+.18,.36);
    add('taksim-mosque-dome','stone',zinc,x,base+drum,z,r,cap,r);
    const count=r>10?16:8;
    for(let n=0;n<count;n++){
     const angle=n*2*Math.PI/count;
     const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
     add('box','stone',glass,x+Math.sin(angle)*(r-.03),base+drum*.47,z+Math.cos(angle)*(r-.03),.88,drum*.54,.20,rotation);
    }
   }
   box(limestone,0,10.2,3.4,37,9.6,20);
   box(trim,0,14.82,3.9,37.6,.62,20.6);
   for(const x of [-14,-7,0,7,14]){
    box(glass,x,9.8,13.47,2.89,4.4,.18);
    box(trim,x,12.26,13.63,3.20,.48,.24);
   }
   for(const [x,z] of [[-31.5,12.4],[29.0,13.0]]){
    cylinder(limestone,x,7,z,2.18,14);
    cylinder(limestone,x,26.7,z,1.57,25.4);
    cylinder(limestone,x,48.65,z,1.26,18.5);
    for(const y of [36.5,46.4]){
     cylinder(trim,x,y,z,2.21,.88);
     cylinder(limestone,x,y+.74,z,1.91,.61);
    }
    add('cone','metal',zinc,x,61.35,z,1.39,6.9,1.39);
   }
  }else if(model==='taksim-republic-monument'){
   const rose=0xbe9183,cream=0xd7bfb0,green=0x62716b,cast=0x44514b;
   cylinder(0xa8aaa4,0,.13,0,8.50,.26);
   cylinder(0xb5b1a7,0,.39,0,5.95,.26);
   box(rose,0,.73,0,7.35,.42,6.8);
   box(cream,0,1.13,0,6.90,.38,6.37);
   box(green,0,1.47,0,6.60,.30,6.13);
   box(rose,0,5.24,0,4.72,7.24,3.20);
   for(const side of [-1,1]){
    // Bronze groups are recessed into opposite marble arches.
    add('masonry-arch','stone',rose,0,5.40,side*2.15,6.02,7.74,1.10);
    add('masonry-arch','stone',cream,0,5.47,side*2.74,5.83,7.65,.20);
    box(green,0,2.09,side*2.36,4.66,.94,1.66);
    for(const [x,y,z,scale] of [[-1.12,2.56,2.77,.77],[0,2.56,3.01,.94],[1.12,2.56,2.77,.77]]){
     const first=parts.length;
     human(x,y,side*z,scale,side>0?'civil':'standing',cast);
     if(side<0){
      // The north face depicts the War of Independence.
      for(let i=first;i<parts.length;i++){
       const figurePart=parts[i];
       figurePart.x=2*x-figurePart.x;
       figurePart.z=-2*z-figurePart.z;
       const rotation=new T.Quaternion().setFromAxisAngle(UP,Math.PI);
       figurePart.rotation=figurePart.rotation?rotation.multiply(figurePart.rotation):rotation;
      }
     }
    }
    box(green,side*2.40,4.70,0,.16,4.20,2.20);
    sphere(cast,side*2.52,4.57,0,.24,.96,.41,'patina');
    sphere(cast,side*2.53,5.67,0,.15,.23,.20,'patina');
    sphere(cast,side*2.53,6.78,0,.11,.39,.39,'patina');
   }
   box(rose,0,9.32,0,5.62,.55,5.60);
   box(cream,0,9.77,0,5.83,.36,5.82);
   box(rose,0,10.29,0,4.99,.68,4.82);
   box(cream,0,10.80,0,4.76,.40,4.60);
  }else if(model==='haizhu-liberation-monument'){
   const granite=0xb8b2a8,trim=0xcbc4b8,shade=0xa19b92;
   for(const [width,y,height] of [[10.2,.18,.36],[9.58,.54,.36],[8.94,.90,.36]]){
    box(shade,0,y,0,width,height,width);
   }
   box(granite,0,2.11,0,5.7,2.06,5.7);
   box(trim,0,3.36,0,5.94,.48,5.94);
   box(shade,0,2.18,2.87,4.63,1.36,.078);
   for(const y of [1.96,2.34]){
    for(let n=0;n<9;n++)box(trim,(n-4)*.39,y,2.916,.16,.17,.021);
   }
   const join=(a,b,r)=>limb(a,b,r,granite,'stone');
   for(const side of [-1,1]){
    const z=side*.36;
    box(granite,side*.57,3.84,z,1.13,.48,1.82);
    join([side*.57,4.08,z],[side*.58,5.50,z-.04],.40);
    join([side*.58,5.48,z-.04],[side*.55,7.22,-.06],.48);
   }
   sphere(granite,0,7.11,-.03,1.12,.73,.65,'stone');
   sphere(granite,.02,8.35,-.08,1.25,1.20,.70,'stone');
   join([.03,8.96,-.03],[.05,10.13,.12],.44);
   sphere(granite,.08,10.38,.23,.60,.81,.54,'stone');
   sphere(granite,.08,11.07,.19,.73,.43,.62,'stone');
   box(shade,.08,10.91,.72,1.23,.14,.49);
   join([-.95,8.86,-.03],[-1.36,7.45,.49],.37);
   join([-1.36,7.45,.49],[-1.11,7.15,.85],.28);
   join([1.00,8.91,.03],[1.47,7.91,.60],.39);
   join([1.47,7.91,.60],[.73,7.84,1.13],.28);
   sphere(shade,1.12,8.22,1.03,.69,.56,.45,'stone');
   for(const [x,y,z] of [[.81,8.62,1.16],[1.15,8.75,.99],[1.47,8.54,1.21]]){
    sphere(trim,x,y,z,.18,.20,.17,'stone');
   }
   sphere(shade,-.56,8.02,-.69,.81,1.22,.56,'stone');
  }else if(model==='pohang-homigot-lighthouse'){
   const plaster=0xe9e5db,trim=0xf2eee2,glass=0x3c4a4a,iron=0x313738;
   const octagon=(kind,color,y,radius,height,material='stone')=>add(kind,material,color,0,y,0,radius,height,radius);
   octagon('homigot-octagon',0xbdbbb3,.12,4.20,.24);
   octagon('homigot-tower',plaster,0,1,1);
   octagon('homigot-octagon',trim,20.56,3.32,.61);
   octagon('homigot-octagon',trim,21.03,3.24,.37);
   ring(iron,0,21.94,0,2.98,.055);
   for(let i=0;i<16;i++){
    const angle=i*Math.PI/8;
    cylinder(iron,Math.sin(angle)*2.98,21.55,Math.cos(angle)*2.98,.055,.78,'metal');
   }
   octagon('homigot-octagon',glass,23.13,2.09,3.79,'metal');
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4+Math.PI/8;
    cylinder(trim,Math.sin(angle)*2.12,23.13,Math.cos(angle)*2.12,.088,3.79);
   }
   octagon('homigot-octagon',iron,25.06,2.20,.22,'metal');
   add('cone','metal',iron,0,25.67,0,2.22,1.00,2.22);
   sphere(iron,0,26.27,0,.13,.13,.13);
   box(0x82776d,0,1.97,3.60,1.40,3.00,.17);
   for(const x of [-.89,.89])box(trim,x,1.97,3.66,.28,3.30,.36);
   box(trim,0,3.65,3.62,2.07,.24,.46);
   limb([-.99,3.76,3.78],[0,4.33,3.78],.11,trim,'stone');
   limb([0,4.33,3.78],[.99,3.76,3.78],.11,trim,'stone');
   for(const [x,y,z] of [[0,8.1,-3.02],[2.93,12.5,0],[-2.74,16.2,0],[0,18.7,2.63]]){
    box(glass,x,y,z,x===0?.58:.14,1.0,z===0?.58:.14,'metal');
   }
  }else if(model==='tianjin-century-clock'){
   const brass=0xc3a15e,copper=0x775f40,steel=0x636d72,ivory=0xe7dfcb,ink=0x33312b;
   const flat=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   const disk=(color,x,y,z,r,depth,material='stone')=>add('tianjin-clock-disc',material,color,x,y,z,r,depth,r,flat);
   const rim=(color,x,y,z,r)=>add('vertical-torus','stone',color,x,y,z,r,r,1);
   box(0xa8a39a,0,.28,0,9.3,.56,8);
   box(steel,0,1.52,0,8.7,1.92,7.4,'metal');
   box(copper,0,8.86,0,5.8,12.76,4.4,'patina');
   box(brass,0,14.91,0,7.6,1.37,5.8,'patina');
   box(copper,0,16.10,0,4.8,1.45,3.15,'patina');
   for(const [x,y,radius] of [[-1.91,4.26,1.52],[.92,5.15,1.81],[1.85,2.93,.83]]){
    disk(brass,x,y,2.39,radius,.24,'patina');
    for(let n=0;n<12;n++){
     const angle=n*Math.PI/6;
     const q=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),angle);
     add('box','patina',brass,x+Math.cos(angle)*radius,y+Math.sin(angle)*radius,2.39,.50,.32,.31,q);
    }
   }
   const dialY=23.75;
   disk(copper,0,dialY,0,7.3,3.0,'patina');
   for(const side of [-1,1]){
    const face=side*1.53;
    disk(ivory,0,dialY,face,4.24,.13);
    rim(brass,0,dialY,side*1.65,4.23);
    rim(brass,0,dialY,side*1.56,6.89);
    const numerals=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
    for(const [n,numeral] of numerals.entries()){
     const angle=n*Math.PI/6;
     const x=Math.sin(angle)*side,y=Math.cos(angle);
     const numeralX=x*3.34,z=side*1.65;
     const line=(ax,ay,bx,by)=>limb([numeralX+side*ax,dialY+y*3.34+ay,z],[numeralX+side*bx,dialY+y*3.34+by,z],.039,ink,'stone');
     for(const [j,glyph] of Array.from(numeral).entries()){
      const base=(j-(numeral.length-1)/2)*.20;
      if(glyph==='I')line(base,-.27,base,.27);
      else{
       line(base-.079,.27,base+(glyph==='X'?.079:0),-.27);
       line(base+.079,.27,base+(glyph==='X'?-.079:0),-.27);
      }
     }
     disk(brass,x*5.62,dialY+y*5.62,side*1.61,1.22,.31,'patina');
     rim(copper,x*5.62,dialY+y*5.62,side*1.79,1.07);
     sphere(copper,x*5.62,dialY+y*5.62,side*1.81,.42,.52,.06,'patina');
    }
    disk(ink,0,dialY,side*1.83,.29,.14);
    limb([0,dialY,side*1.80],[-1.74*side,dialY+1.1,side*1.80],.15,ink,'stone');
    limb([0,dialY,side*1.80],[2.20*side,dialY+1.86,side*1.80],.098,ink,'stone');
   }
   const pendulum=[[5.9,7.7,0],[7.7,12.6,0],[7.9,17.8,0],[6.8,22.9,0],[5.25,29.3,0],[5.4,34.4,0],[6.4,37.55,0]];
   for(let i=1;i<pendulum.length;i++)limb(pendulum[i-1],pendulum[i],.49,steel);
   disk(brass,6.4,37.55,0,1.72,.59,'patina');
   for(let n=0;n<12;n++){
    const angle=n*Math.PI/6,x=Math.cos(angle),y=Math.sin(angle);
    limb([6.4+x*1.67,37.55+y*1.67,0],[6.4+x*2.45,37.55+y*2.45,0],.12,brass,'patina');
   }
   sphere(0xa9b4b9,5.9,7.4,0,1.04,1.04,1.04,'stone');
   rim(brass,5.9,7.4,0,1.29);
  }else if(model==='copenhagen-dragon-fountain'){
   const granite=0xa99e8f,metal=0x53655d,patina=0x62786e,shadow=0x394f47;
   add('dragon-granite-basin','stone',granite,0,0,0,1,1,1);
   cylinder(water,0,.15,0,6.53,.046,'water');
   cylinder(shadow,0,.49,0,1.18,.94,'patina');
   add('dragon-bronze-bowl','patina',patina,0,.63,0,1,1,1);
   cylinder(water,0,1.70,0,2.86,.035,'water');
   cylinder(metal,0,1.90,0,1.96,.42,'patina');
   const join=(a,b,r,color=metal)=>limb(a,b,r,color,'patina');
   for(let n=0;n<3;n++){
    const angle=n*2*Math.PI/3,ca=Math.cos(angle),sa=Math.sin(angle);
    const p=(r,y,t=0)=>[r*ca-t*sa,y,r*sa+t*ca];
    sphere(patina,...p(3.09,1.77),.44,.34,.44,'patina');
    join(p(3.13,1.80),p(3.31,2.20),.21);
    sphere(shadow,...p(3.49,2.23),.21,.20,.21,'patina');
    const yaw=new T.Quaternion().setFromAxisAngle(UP,-angle);
    add('dragon-wing','patina',metal,...p(2.94,1.91,.12),.73,.60,.12,yaw);
    join(p(3.66,2.18),p(4.55,.18),.032,water);
   }
   // The lowered head and braced legs keep the bull distinct from the coiled dragon.
   sphere(metal,-.72,3.48,-.04,1.30,.74,.57,'patina');
   sphere(shadow,-.02,3.58,-.01,.72,.70,.65,'patina');
   join([-.22,3.56,0],[.70,3.25,.08],.46);
   sphere(metal,.80,3.19,.08,.54,.43,.39,'patina');
   sphere(patina,1.10,3.07,.13,.28,.23,.30,'patina');
   for(const side of [-1,1]){
    join([-.10,3.10,side*.38],[.15,2.60,side*.42],.16);
    join([.15,2.60,side*.42],[.05,2.11,side*.52],.126);
    sphere(shadow,.11,2.13,side*.52,.21,.12,.17,'patina');
    join([-1.55,3.40,side*.34],[-1.89,2.76,side*.48],.17);
    join([-1.89,2.76,side*.48],[-1.57,2.17,side*.55],.125);
    sphere(shadow,-1.55,2.15,side*.55,.20,.12,.18,'patina');
    join([.59,3.46,side*.32],[.58,3.65,side*.52],.087,patina);
    join([.58,3.65,side*.52],[.83,3.78,side*.63],.055,patina);
   }
   join([-1.84,3.64,-.04],[-2.17,3.96,.14],.092);
   join([-2.17,3.96,.14],[-2.32,3.73,.35],.066);
   // The central dragon curves up toward the bull with angular wings and a long tail.
   join([.76,2.14,.80],[1.12,2.53,.67],.30,patina);
   join([1.12,2.53,.67],[1.76,3.06,.43],.29,patina);
   join([1.76,3.06,.43],[1.64,3.72,.31],.23,patina);
   sphere(metal,1.41,3.93,.30,.39,.31,.27,'patina');
   sphere(patina,1.15,3.86,.37,.30,.18,.21,'patina');
   join([1.19,2.51,.69],[1.92,2.37,1.08],.15,patina);
   join([1.92,2.37,1.08],[2.12,2.68,1.63],.105,patina);
   join([2.12,2.68,1.63],[1.85,2.93,1.94],.068,patina);
   for(const side of [-1,1]){
    const spread=new T.Quaternion().setFromAxisAngle(UP,side*.68);
    add('dragon-wing','patina',patina,1.63,3.04,.40+side*.30,1.40,1.30,.14,spread);
   }
  }else if(model==='gdansk-neptune-fountain'){
   const stone=0xa69d92,trim=0xb8afa4,bronze=0x60736a,dark=0x3f534b,iron=0x3a3d37;
   add('gdansk-lower-basin','stone',stone,0,0,0,1,1,1);
   cylinder(water,0,.19,0,2.44,.05,'water');
   cylinder(trim,0,.43,0,1.12,.64);
   cylinder(stone,0,1.48,0,.59,1.55);
   add('gdansk-upper-bowl','stone',trim,0,2.21,0,1,1,1);
   cylinder(water,0,2.68,0,1.31,.042,'water');
   cylinder(stone,0,2.93,0,.51,.52);
   for(let quadrant=0;quadrant<4;quadrant++){
    const a=quadrant*Math.PI/2,dx=Math.sin(a),dz=Math.cos(a);
    sphere(stone,1.48*dx,2.55,1.48*dz,.18,.16,.18,'stone');
    limb([1.54*dx,2.53,1.54*dz],[1.77*dx,.23,1.77*dz],.025,water,'water');
   }
   for(let n=0;n<32;n++){
    const a=n*Math.PI/16,b=a+Math.PI/16;
    const point=(angle,y)=>[3.18*Math.sin(angle),y,3.18*Math.cos(angle)];
    limb(point(a,.05),point(a,1.37),.032,iron);
    limb(point(a,.77),point(b,.77),.034,iron);
    limb(point(a,1.26),point(b,1.26),.036,iron);
    if(n%4===0)sphere(0x9d8150,...point(a,1.39),.068,.10,.068,'metal');
   }
   const joint=(a,b,r)=>limb(a,b,r,bronze,'patina');
   sphere(dark,.13,3.31,-.23,.48,.14,.29,'patina');
   joint([-.14,4.05,.10],[-.26,3.62,.23],.103);
   joint([-.26,3.62,.23],[-.34,3.23,.30],.072);
   joint([.17,4.01,-.03],[.29,3.65,-.08],.10);
   joint([.29,3.65,-.08],[.24,3.25,-.22],.072);
   sphere(bronze,-.34,3.24,.33,.092,.060,.135,'patina');
   sphere(bronze,.24,3.24,-.17,.092,.060,.135,'patina');
   sphere(bronze,0,4.09,0,.29,.27,.17,'patina');
   sphere(bronze,-.06,4.49,-.02,.39,.37,.22,'patina');
   sphere(bronze,-.16,5.02,.06,.191,.229,.172,'patina');
   sphere(dark,-.13,4.80,.16,.143,.15,.10,'patina');
   joint([.24,4.63,0],[.53,4.60,.14],.105);
   joint([.53,4.60,.14],[.67,4.91,.28],.079);
   joint([-.36,4.62,0],[-.53,4.31,.17],.10);
   joint([-.53,4.31,.17],[-.35,4.11,.36],.073);
   const shaft=(a,b)=>limb(a,b,.035,dark,'patina');
   shaft([.81,3.28,.38],[.58,5.98,.25]);
   for(const dx of [-.15,0,.15])shaft([.59+dx,5.65,.26],[.57+dx,6.08,.25]);
   shaft([.44,5.67,.26],[.74,5.67,.26]);
  }else if(model==='toluca-miguel-hidalgo'){
   const pale=0xc6bdb0,trim=0xd6ccbd,bronze=0x57685d,relief=0x425049;
   for(const [width,y,height] of [[4.35,.17,.34],[3.90,.46,.24],[3.48,.70,.24]]){
    box(pale,0,y,0,width,height,width);
   }
   box(trim,0,1.02,0,3.06,.40,3.06);
   box(pale,0,2.13,0,2.48,1.84,2.49);
   box(trim,0,3.20,0,2.83,.32,2.83);
   box(pale,0,3.61,0,2.10,.50,2.10);
   for(const side of [-1,1]){
    box(relief,side*1.252,2.04,0,.045,1.15,1.89,'patina');
    for(const [z,y] of [[-.67,1.95],[-.34,2.10],[0,2.06],[.30,1.98],[.62,2.15]]){
     sphere(bronze,side*1.285,y,z,.036,.29,.107,'patina');
     sphere(bronze,side*1.286,y+.34,z,.033,.076,.074,'patina');
    }
   }
   box(relief,0,2.17,1.26,1.80,.52,.05,'patina');
   human(0,3.86,0,1.20,'standing',bronze);
   box(bronze,0,5.12,-.35,.74,1.59,.20,'patina');
  }else if(model==='peoples-heroes-memorial'){
   const granite=0xa5a4a0,limestone=0xe6e3d9,inset=0xb8b1a4;
   box(granite,0,.12,0,8.4,.24,10.3);
   box(limestone,0,.33,0,7.6,.18,9.3);
   box(granite,0,.51,0,6.0,.18,7.05);
   box(limestone,0,.74,0,5.58,.28,6.5);
   for(const side of [-1,1])for(let step=0;step<5;step++){
    const y=.06+step*.095;
    box(granite,0,y,side*(5.95-step*.49),2.9,2*y,.36);
    box(granite,side*(4.80-step*.40),y,0,.38,2*y,2.56);
   }
   box(limestone,0,1.28,0,3.8,.96,3.65);
   for(const side of [-1,1]){
    box(inset,0,1.30,side*1.833,3.32,.57,.07);
    box(inset,side*1.91,1.30,0,.07,.57,3.14);
    for(let panel=-1;panel<=1;panel++){
     for(let figure=0;figure<3;figure++){
      const position=panel+figure*.23-.23,height=1.24+figure%2*.04;
      box(limestone,position,height,side*1.873,.102,.24,.05);
      sphere(limestone,position,height+.16,side*1.896,.046,.052,.022,'stone');
      box(limestone,side*1.958,height,position,.05,.24,.102);
      sphere(limestone,side*1.98,height+.16,position,.022,.052,.046,'stone');
     }
    }
   }
   box(limestone,0,1.80,0,4.04,.24,3.92);
   box(granite,0,2.03,0,2.24,.26,2.04);
   box(limestone,0,2.24,0,2.42,.16,2.16);
   box(0xa69d91,0,4.67,0,1.26,4.73,1.00);
   box(0xbbb0a2,0,4.84,-.503,.99,4.11,.045);
   for(let row=0;row<8;row++)box(0xba9b56,0,3.20+row*.418,-.532,.46,.075,.026);
   for(const [y,width,depth,thickness] of [[7.02,1.42,1.17,.14],[7.155,1.62,1.33,.17],[7.31,1.72,1.37,.18],[7.45,1.46,1.20,.14]]){
    box(limestone,0,y,0,width,thickness,depth);
   }
  }else if(model==='chairman-mao-memorial-hall'){
   const granite=0xb6afa3,columns=0xe0d3b9,roof=0x8f754d;
   box(granite,0,.13,0,9.85,.26,9.85);
   box(granite,0,.35,0,9.40,.19,9.40);
   box(0xada497,0,1.59,0,6.92,2.33,6.92);
   for(const side of [-1,1]){
    for(let step=0;step<5;step++){
     const y=.045+step*.040;
     box(granite,0,y,side*(4.91-step*.17),3.25,2*y,.19);
    }
    for(let index=0;index<12;index++){
     const centre=(index-5.5)*.744;
     box(columns,centre,1.68,side*4.09,.26,2.47,.27);
     if(index>0&&index<11)box(columns,side*4.09,1.68,centre,.27,2.47,.26);
    }
    box(0x49423a,0,1.32,side*3.468,2.36,1.78,.06);
    box(columns,0,2.59,side*3.515,2.69,.23,.09);
    for(let index=0;index<6;index++)box(gold,(index-2.5)*.31,2.60,side*3.567,.14,.088,.03);
   }
   box(granite,0,2.99,0,9.30,.23,9.30);
   box(roof,0,3.19,0,9.64,.23,9.64);
   box(0x9c865b,0,3.36,0,8.64,.13,8.64);
   box(columns,0,3.58,0,7.45,.44,7.45);
   box(roof,0,3.87,0,7.79,.14,7.79);
   box(0x9c865b,0,4.01,0,7.18,.14,7.18);
  }else if(model==='hvar-pjaca-well'){
   const limestone=0xd9cbb3, iron=0x55514a;
   cylinder(limestone,0,.09,0,1.30,.18);
   cylinder(limestone,0,.47,0,1.13,.60);
   ring(limestone,0,.81,0,1.22,.08,'stone');
   cylinder(iron,0,.78,0,1.16,.055,'metal');
   for(const x of [-.8,-.4,0,.4,.8]){
    const length=2*Math.sqrt(1.06**2-x**2);
    box(iron,x,.84,0,.035,.04,length,'metal');
    box(iron,0,.84,x,length,.04,.035,'metal');
   }
   for(const z of [-1.83,1.83]){
    box(limestone,0,.09,z,.62,.18,.60);
    box(limestone,0,.29,z,.48,.24,.46);
   }
  }else if(model==='san-gimignano-cistern'){
   const travertine=0xb6a78f;
   add('cistern-stonework','stone',travertine,0,0,0,1,1,1);
   cylinder(0x4d463c,0,.59,0,.97,.10);
  }else if(model==='budapest-millennium-column'){
   const limestone=0xc7c0af,trim=0xa99e85,darkBronze=0x485346;
   for(let step=0;step<4;step++){
    const width=12.8-step*.7;
    box(limestone,0,.18+step*.34,0,width,.36,width);
   }
   box(limestone,0,2.85,0,9.8,3.1,9.8);
   box(trim,0,4.48,0,10.1,.38,10.1);
   cylinder(limestone,0,5.07,0,2.78,.78);
   cylinder(trim,0,5.59,0,2.35,.31);
   add('tapered-column','stone',limestone,0,20.0,0,1.91,28.50,1.91);
   cylinder(limestone,0,34.5,0,1.65,.66);
   cylinder(trim,0,35.07,0,2.02,.53);
   box(limestone,0,35.56,0,3.78,.46,3.78);
   sphere(trim,0,36.33,0,.82,.63,.82,'metal');
   const angel=36.85;
   human(0,angel,0,1.35,'classical',darkBronze);
   for(const side of [-1,1]){
    const wing=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),side*-.49);
    add('sphere','metal',darkBronze,side*1.02,angel+1.73,-.32,.64,1.38,.19,wing);
   }
   limb([.71,angel+1.56,.24],[.71,angel+3.57,.24],.075,darkBronze);
   for(const y of [2.76,3.22])limb([.37,angel+y,.24],[1.05,angel+y,.24],.058,darkBronze);
   // The seven mounted figures are simplified as individual bronze silhouettes.
   for(let i=0;i<7;i++){
    const angle=(i-3)*Math.PI/6,x=Math.sin(angle)*5.15,z=Math.cos(angle)*5.15;
    sphere(darkBronze,x,4.16,z,.62,.53,1.20,'metal');
    limb([x,4.07,z+.58],[x,4.84,z+1.11],.32,darkBronze);
    sphere(darkBronze,x,4.87,z+1.18,.29,.29,.44,'metal');
    for(const dx of [-.30,.30])for(const dz of [-.66,.64]){
     limb([x+dx,3.93,z+dz],[x+dx,3.16,z+dz+.11],.13,darkBronze);
    }
    human(x,4.39,z,.59,'civil',darkBronze);
   }
  }else if(model==='budapest-millennium-colonnade-north'||model==='budapest-millennium-colonnade-east'){
   const limestone=0xc7c0af,trim=0xa99e85,darkBronze=0x485346;
   const north=model==='budapest-millennium-colonnade-north';
   const axes=north
    ?[[-16.13,-1.61],[-11.7,-4.44],[-6.86,-5.24],[-1.61,-5.24],[3.23,-4.03],[8.07,-2.02],[12.50,1.61],[16.13,4.03]]
    :[[-5.24,-16.54],[-1.21,-12.10],[2.02,-7.66],[4.03,-2.82],[4.84,2.42],[4.44,7.26],[3.23,12.10],[.81,17.34]];
   for(const [x,z] of axes){
    cylinder(trim,x,1.06,z,.75,.22);
    cylinder(limestone,x,3.62,z,.49,4.93);
    cylinder(limestone,x,6.08,z,.75,.29);
   }
   for(let i=1;i<axes.length;i++){
    const [ax,az]=axes[i-1],[bx,bz]=axes[i];
    const x=(ax+bx)/2,z=(az+bz)/2,dx=bx-ax,dz=bz-az;
    const span=Math.hypot(dx,dz)+.75;
    const yaw=new T.Quaternion().setFromAxisAngle(UP,-Math.atan2(dz,dx));
    add('box','stone',limestone,x,.47,z,span,.94,3.00,yaw);
    add('box','stone',limestone,x,6.48,z,span,.76,2.34,yaw);
    add('box','stone',trim,x,6.94,z,span,.26,2.58,yaw);
    box(limestone,x,1.39,z,1.33,.91,1.27);
    human(x,1.85,z,.97,'classical',darkBronze);
   }
   for(const index of [0,axes.length-1]){
    const [x,z]=axes[index];
    human(x,7.08,z,.44,'classical',darkBronze);
   }
  }else if(model==='budapest-heroes-memorial-stone'){
   box(0xb5ad9b,0,.11,0,10,.22,6.0);
   box(0xaaa18f,0,.50,0,8.3,.56,4.0);
   box(0xc5bca7,0,.80,0,8.55,.11,4.18);
  }else if(model==='luanda-agostinho-neto-memorial'){
   const concrete=0xaeb0ad,light=0xc2c3bd,shadow=0x777d7d;
   for(let i=0;i<4;i++){
    box(concrete,0,1.15+i*1.75,0,44-i*3.4,2.3,42-i*3.3);
   }
   box(shadow,0,9.62,13.74,13.1,6.35,.36);
   box(light,0,8.99,0,34,5.20,31);
   box(shadow,0,9.65,15.58,6.2,4.80,.20);
   add('obelisk-shaft','stone',concrete,0,47.3,0,22.0,76.6,19.8);
   box(light,0,84.75,0,12,2.2,10.5);
   add('pyramid','stone',light,0,102.90,0,7.0,34.2,6.1);
   for(const side of [-1,1]){
    add('obelisk-shaft','stone',light,side*10.4,28.0,-1.55,8.8,41.2,12.65);
   }
   box(shadow,0,40.6,7.92,1.1,32.2,.50);
   box(shadow,0,27.6,10.18,1.0,6.3,.38);
  }else if(model==='brooklyn-gaynor-memorial'){
   const granite=0xc2ada6,bronze=0x434943;
   box(granite,0,.11,0,5.13,.22,1.85);
   box(granite,0,.28,0,4.89,.22,1.58);
   box(granite,0,1.48,-.40,4.64,2.21,.59);
   box(granite,0,2.55,-.40,1.44,1.28,.58);
   for(const x of [-1.52,1.52])box(bronze,x,1.65,-.08,1.43,1.13,.12);
   box(granite,0,.96,.31,.64,1.22,.56);
   add('box','stone',bronze,0,1.67,.31,.61,.27,.40);
   add('sphere','stone',bronze,0,2.10,.37,.51,.69,.47);
  }else if(model==='brooklyn-war-memorial'){
   const limestone=0xd7cfc0,trim=0xe7ddcc,entrance=0x67635c;
   box(limestone,0,2.67,0,15.44,5.34,8.20);
   box(trim,0,5.47,0,15.55,.26,8.30);
   box(trim,0,.22,-4.02,15.44,.44,.47);
   for(const x of [-4.85,4.85]){
    box(trim,x,2.18,-4.04,2.35,4.0,.24);
    human(x,.18,-4.18,.57,'classical',limestone);
   }
   box(entrance,0,1.46,-4.14,2.35,2.92,.08);
   box(trim,0,3.70,-4.15,3.06,.63,.14);
  }else if(model==='corona-subway-stairs'){
   const green=0x496254,rail=0x637a69,step=0x9b9b8e;
   for(let i=0;i<15;i++){
    const y=.18+i*.174,z=-2.8+i*.358;
    box(step,0,y,z,1.86,.19,.37);
   }
   for(const x of [-1.06,1.06]){
    limb([x,.04,-2.96],[x,2.61,2.42],.105,green);
    limb([x,1.08,-2.96],[x,3.64,2.42],.052,rail);
    for(const i of [0,3,6,9,12,15]){
     const y=.19+i*.167,z=-2.92+i*.353;
     box(green,x,y+.42,z,.085,.84,.075,'metal');
    }
   }
   box(green,0,2.61,2.86,2.20,.27,.91,'metal');
   for(const x of [-.94,.94])box(green,x,1.29,2.61,.18,2.58,.20,'metal');
   box(0x343a3c,-.77,1.15,-2.76,.65,.43,.09,'metal');
   sphere(0xae5798,-.96,1.15,-2.82,.12,.12,.03);
  }else if(model==='corona-information-board'){
   const steel=0x454b4f,paper=0xe2dfca;
   for(const x of [-.49,.49])box(steel,x,1.08,0,.065,2.16,.065,'metal');
   box(steel,0,1.64,0,1.24,.84,.12,'metal');
   box(paper,0,1.63,.067,1.13,.70,.018);
   box(0x434f60,0,1.89,.078,1.10,.13,.02);
   for(const y of [1.46,1.58,1.70])box(0x86928c,0,y,.08,.73,.025,.02);
  }else if(model==='corona-wayfinding-map'){
   const dark=0x343d4b;
   box(dark,0,1.175,0,.79,2.35,.20,'metal');
   box(0xedc366,0,2.12,.105,.69,.25,.02);
   box(0xe1dbc8,0,1.40,.106,.69,1.04,.02);
   box(0x779a77,.15,1.31,.119,.27,.38,.018);
   for(const y of [1.04,1.24,1.51,1.72])box(0xf9f4dd,0,y,.12,.64,.027,.018);
  }else if(model==='corona-cycle-stands'){
   const steel=0x485354;
   for(const x of [-.63,.63]){
    let previous=[x,0,-.34];
    for(const point of [[x,.66,-.34],[x,.85,-.22],[x,.85,.22],[x,.66,.34],[x,0,.34]]){
     limb(previous,point,.045,steel);
     previous=point;
    }
   }
  }else if(model==='corona-water-fountain'){
   const steel=0x949fa1;
   cylinder(0x686e6d,0,.44,0,.12,.88,'metal');
   box(steel,0,.883,.05,.54,.10,.48,'metal');
   box(0x535b59,0,.939,.05,.43,.028,.36,'metal');
   cylinder(steel,.15,.99,-.04,.052,.12,'metal');
  }else if(model==='roberto-clemente-para-roberto'){
   const darkBronze=0x586049,chair=0x8e683b,trim=0xc4a95e;
   cylinder(0xc3b5a1,0,.06,0,1.78,.12);
   for(let i=0;i<12;i++){
    const azimuth=i*Math.PI/6,dx=Math.cos(azimuth),dz=Math.sin(azimuth);
    let previous=[dx*1.63,.12,dz*1.63];
    for(const [radius,y] of [[1.68,.91],[1.62,1.71],[1.42,2.48],[.95,3.14],[.46,3.57],[.16,3.72]]){
     const turn=(3.72-y)*.014+(i%2)*.08;
     const point=[dx*radius+dz*turn,y-(i%3)*.04,dz*radius-dx*turn];
     limb(previous,point,.039,darkBronze);
     previous=point;
    }
   }
   for(const x of [-.33,.33]){
    for(const z of [-.32,.31])limb([x,.12,z],[x,.77,z*.85],.063,chair);
    limb([x,.77,-.31],[x,1.56,-.42],.055,chair);
   }
   box(chair,0,.79,0,.77,.12,.75,'metal');
   box(chair,0,1.31,-.39,.73,.52,.092,'metal');
   for(const x of [-.26,-.13,0,.13,.26])box(trim,x,1.31,-.34,.035,.36,.020,'metal');
  }else if(model==='times-square-tkts'){
   const red=0xc51d37,edge=0xef4052,glass=0x617477,white=0xdcd3ce;
   box(white,0,.24,-3.20,4.65,.48,2.18);
   box(glass,0,1.15,-4.25,5.95,2.30,.15,'metal');
   for(const x of [-1.60,-.80,0,.80,1.60]){
    box(white,x,.54,-4.34,.62,.43,.10);
    box(0x373738,x,.70,-4.40,.55,.30,.04);
   }
   for(let i=0;i<27;i++){
    const z=4.31-i*.317,y=(i+1)*(2.37/27);
    box(red,0,y/2,z,7.26,y,.326);
    box(edge,0,y-.022,z+.135,7.35,.048,.055);
   }
  }else if(model==='times-square-duffy'){
   const greenGranite=0x718276,patina=0x454739;
   box(greenGranite,0,.18,0,2.50,.36,2.55);
   box(greenGranite,0,.91,-.05,1.93,1.12,1.75);
   box(greenGranite,0,3.10,-.67,.44,4.28,.35);
   box(greenGranite,0,4.39,-.66,1.82,.41,.37);
   for(let i=0;i<12;i++){
    const a=i*Math.PI/6,c=(i+1)*Math.PI/6;
    limb([.63*Math.cos(a),4.39+.63*Math.sin(a),-.66],[.63*Math.cos(c),4.39+.63*Math.sin(c),-.66],.095,greenGranite,'stone');
   }
   human(0,1.47,.18,.90,'civil',patina);
   box(0x55594a,-.29,2.70,.46,.34,.24,.10,'patina');
  }else if(model==='times-square-cohan'){
   const granite=0xa5a39a,patina=0x494b3a;
   box(granite,0,.17,0,2.0,.34,1.8);
   box(granite,0,1.08,0,1.48,1.48,1.3);
   box(0x747774,0,1.22,.664,.87,.66,.023);
   human(0,1.82,0,.92,'civil',patina);
   limb([.36,1.83,.22],[.46,2.80,.32],.035,patina,'patina');
  }else if(model==='times-square-new-year-tower'){
   const frame=0x4c5358,glass=0x607681,trim=0xa49a89;
   box(trim,0,.75,0,9.55,1.50,21.30);
   box(frame,0,7.60,.20,8.35,12.2,16.30);
   box(glass,0,33.75,2.20,6.34,42.60,12.52,'metal');
   box(frame,0,54.67,2.20,6.48,1.10,12.74);
   for(const x of [-2.70,2.70])box(trim,x,31.1,-4.10,.24,39.4,.24);
   for(const [y,h,c] of [[8.2,10.0,0x584b79],[20.7,13.5,0x437f9d],[34.4,12.8,0x93766c],[47.2,10.4,0x457282]]){
    box(frame,0,y,-4.21,5.76,h+.16,.18);
    box(c,0,y,-4.34,5.50,h,.08);
    box(0xadc6c3,0,y-h*.28,-4.39,4.65,.15,.03);
   }
   cylinder(0xa7acad,.36,65.7,4.0,.24,21.2,'metal');
   sphere(0xf4e1bc,.36,76.38,4.0,.95,.95,.95,'metal');
  }else if(model==='stapleton-village-hall'){
   const brick=0x9c503d,cornice=0xad6b51,slate=0x494c4b,stoneTrim=0xbca787,glass=0x4d6158,door=0x5a3929;
   const front=6.06,windowRotation=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   function window(x,y,z,width,height,fill=glass){
    const radius=width/2;
    box(fill,x,y-radius/2,z,width,height-radius,.082);
    add('cylinder','stone',fill,x,y+height/2-radius,z,radius,.081,radius,windowRotation);
    add('masonry-arch','stone',cornice,x,y,z+.028,width+.30,height+.24,.08);
    box(stoneTrim,x,y-height/2,z+.07,width+.22,.13,.17);
   }
   box(brick,-3.89,4.29,0,20.42,8.58,12.12);
   box(brick,9.71,4.89,0,6.67,9.78,14.72);
   box(cornice,-3.89,8.60,0,20.42,.25,12.24);
   box(cornice,9.71,9.79,0,6.74,.25,14.85);
   add('hip-roof','stone',slate,-3.89,8.72,0,20.60,2.86,12.32);
   add('hip-roof','stone',slate,9.71,9.90,0,6.77,3.10,14.91);
   for(const x of [-10.65,-3.94,2.74]){
    window(x,5.93,front,2.96,3.25);
    for(const dx of [-.62,.62])box(stoneTrim,x+dx,5.75,front+.10,.065,2.15,.03);
   }
   window(-3.94,1.94,front,2.92,3.43,door);
   box(stoneTrim,-3.94,.17,front+.76,3.39,.34,1.11);
   box(cornice,-3.89,3.69,front+.057,20.34,.14,.16);
   for(const x of [-10.60,-3.90,2.65])window(x,4.46,-6.06,2.65,3.2);
   window(9.71,5.90,7.36,2.83,3.64);
  }else if(model==='stapleton-marciante-gazebo'){
   const metal=0x465953,roof=0x43505c,base=0x8f7765;
   cylinder(base,0,.18,0,3.22,.36);
   for(let i=0;i<8;i++){
    const angle=Math.PI*(i+.5)/4,x=Math.sin(angle)*2.85,z=Math.cos(angle)*2.85;
    cylinder(metal,x,1.95,z,.12,3.19,'metal');
    cylinder(metal,x,3.43,z,.24,.21,'metal');
   }
   add('bandstand-roof','metal',roof,0,3.49,0,3.58,1.09,3.58);
   sphere(metal,0,4.60,0,.11,.10,.11);
  }else if(model==='stapleton-comfort-station'){
   const brick=0x995743,tile=0x784b42,trim=0xc5a88c,shade=0x4c574f;
   box(brick,0,1.80,0,11.23,3.60,10.8);
   box(trim,0,3.64,0,11.38,.21,10.90);
   add('hip-roof','stone',tile,0,3.73,0,11.53,2.40,10.99);
   for(const x of [-3.47,0,3.47]){
    box(shade,x,1.48,5.41,1.62,1.60,.084);
    add('masonry-arch','stone',trim,x,1.88,5.46,1.96,2.36,.10);
   }
   cylinder(shade,0,6.01,0,.22,.58,'metal');
  }else if(model==='brooklyn-borough-hall'){
   const marble=0xdad3c5,trim=0xeee6d7,shadow=0x666e6d,roof=0x8c8c7e,copper=0x718478;
   const face=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   box(marble,0,.43,0,25.06,.86,15.30);
   box(marble,0,4.62,0,24.32,7.52,14.72);
   box(trim,0,1.52,0,24.50,.21,14.92);
   box(trim,0,8.52,0,24.76,.32,15.04);
   add('hip-roof','stone',roof,0,8.64,0,24.26,1.77,14.46);
   for(let i=0;i<8;i++)box(trim,0,.11+i*.12,9.45-i*.25,11.10,(i+1)*.24,.29);
   for(const x of [-5,-3,-1,1,3,5]){
    cylinder(trim,x,1.18,7.75,.39,.23);
    cylinder(marble,x,4.60,7.75,.29,6.67);
    box(trim,x,7.91,7.75,.88,.29,.67);
   }
   box(marble,0,8.34,7.46,11.69,.61,2.10);
   add('pediment','stone',trim,0,8.63,8.52,11.87,1.60,.20);
   for(const x of [-10.0,-7.69,-5.28,-2.67,0,2.67,5.28,7.69,10.0]){
    for(const y of [3.33,6.15]){
     box(trim,x,y,7.36,1.23,1.94,.11);
     box(shadow,x,y,7.43,.91,1.61,.045);
    }
   }
   box(marble,0,10.81,3.20,4.30,2.72,4.20);
   box(trim,0,12.22,3.20,4.53,.35,4.40);
   box(marble,0,13.73,3.20,3.53,2.84,3.47);
   add('cylinder','stone',trim,0,13.81,4.98,.76,.10,.76,face);
   add('cylinder','stone',shadow,0,13.81,5.04,.60,.044,.60,face);
   box(trim,0,14.05,5.08,.072,.48,.02);
   box(trim,.19,13.80,5.08,.41,.072,.020);
   cylinder(trim,0,15.27,3.20,1.99,.31);
   add('bandstand-roof','metal',copper,0,15.43,3.20,1.82,2.72,1.82);
   cylinder(trim,0,18.27,3.20,.34,.40);
   human(0,18.47,3.20,.81,'classical',0x657267);
  }else if(model==='brooklyn-beecher'){
   const granite=0x8c8b83,bronze=0x4f5b50;
   box(granite,0,.16,0,3.34,.32,3.12);
   box(granite,0,.42,0,2.97,.22,2.69);
   box(granite,0,1.65,0,2.20,2.32,2.02);
   human(0,2.81,0,.86,'civil',bronze);
   human(-1.21,.53,.31,.57,'classical',bronze);
   human(1.06,.53,.72,.39,'civil',bronze);
   human(1.29,.53,-.27,.34,'civil',bronze);
  }else if(model==='brooklyn-columbus'){
   const stone=0xa69c8b,marble=0xe9e5d8;
   cylinder(stone,0,.17,0,1.22,.34);
   cylinder(stone,0,1.30,0,.92,1.93);
   cylinder(stone,0,2.29,0,1.04,.15);
   human(0,2.37,0,.89,'classical',marble);
  }else if(model==='jamaica-king-manor'){
   const clapboard=0xe2c38c,trim=0xeee3cc,shutter=0x424d48,slate=0x444644,brick=0x995d49,glass=0x596e71;
   box(0xae9f83,-2.45,.32,5.95,21.50,.64,12.70);
   box(clapboard,-2.45,3.60,5.95,21.50,6.75,12.70);
   box(clapboard,3.99,2.99,-9.10,8.60,5.62,17.40);
   box(clapboard,5.35,1.97,-19.85,5.90,3.63,4.10);
   add('king-manor-gambrel','stone',slate,-2.45,6.99,5.95,21.71,3.81,12.81);
   add('hip-roof','stone',slate,3.99,5.80,-9.10,8.63,2.17,17.54);
   add('hip-roof','stone',slate,5.35,3.79,-19.85,6.01,1.37,4.13);
   for(const x of [-10.6,5.57]){
    box(brick,x,10.95,5.87,.88,3.32,.98);
    box(0xa9775e,x,12.62,5.87,1.12,.16,1.20);
   }
   for(const x of [-10.15,-6.57,-2.97,.75,4.53]){
    for(const y of [2.20,5.15]){
     if(Math.abs(x+2.97)<.03&&y===2.20)continue;
     box(trim,x,y,12.34,1.36,1.91,.06);
     box(glass,x,y,12.39,.98,1.53,.037);
     for(const side of [-1,1])box(shutter,x+side*.91,y,12.38,.39,1.79,.06);
     box(trim,x,y,12.42,.94,.07,.024);
    }
   }
   for(const x of [-6.54,-4.45,-2.38,-.27])cylinder(trim,x,2.34,14.30,.14,3.46);
   box(trim,-3.41,.44,13.59,7.18,.39,2.28);
   box(trim,-3.39,4.22,13.48,7.22,.31,2.43);
   add('pediment','stone',trim,-3.39,4.37,14.75,7.13,1.21,.064);
   box(shutter,-3.40,2.06,12.36,1.69,2.90,.095);
   for(let i=0;i<3;i++)box(trim,-3.40,.09+i*.076,15.05-i*.25,3.43,.16*(i+1),.38);
  }else if(model==='jamaica-king-bandstand'){
   const brick=0x925749,slate=0x495450,iron=0x343c3a,floor=0xb9a58d;
   cylinder(brick,0,.60,0,5.08,1.20);
   cylinder(floor,0,1.22,0,5.20,.15);
   for(let i=0;i<8;i++){
    const angle=Math.PI*i/4,x=4.89*Math.sin(angle),z=4.89*Math.cos(angle);
    const next=angle+Math.PI/4;
    cylinder(iron,x,2.69,z,.13,2.90,'metal');
    if(i!==0)limb([x,1.94,z],[4.89*Math.sin(next),1.94,4.89*Math.cos(next)],.061,iron);
   }
   add('bandstand-roof','metal',slate,0,4.17,0,5.90,2.42,5.90);
   sphere(iron,0,6.58,0,.10,.12,.10);
  }else if(model==='lagos-tinubu-wings'){
   const stoneBase=0xb6a879,wingFront=0x85734a,wingBack=0x9d855a,blue=0x86d6e5;
   cylinder(stoneBase,0,.29,0,1.55,.58);
   cylinder(0x9e8d65,0,.83,0,1.25,.50);
   const positions=[[-.98,1.01,-.53,3.84,4.25,-.10],[.05,.98,.04,4.15,4.77,.85],
    [.82,1.03,.38,3.72,3.34,2.55],[-.21,1.02,.95,3.39,3.30,3.98]];
   for(let index=0;index<positions.length;index++){
    const [x,y,z,width,height,angle]=positions[index];
    const spread=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('lagos-wing','metal',index%2?wingFront:wingBack,x,y,z,width,height,.16,spread);
   }
   for(let jet=0;jet<12;jet++){
    const angle=jet*Math.PI/6,dx=Math.cos(angle),dz=Math.sin(angle);
    let previous=[dx*6.38,.18,dz*6.38];
    for(let step=1;step<=10;step++){
     const t=step/10,radius=6.38-4.89*t;
     const point=[dx*radius,.18+Math.sin(t*Math.PI)*2.12,dz*radius];
     limb(previous,point,.042,blue,'water');
     previous=point;
    }
   }
  }else if(model==='chengdu-tianfu-west-dragon'||model==='chengdu-tianfu-east-spiral'){
   const west=model==='chengdu-tianfu-west-dragon';
   const gold=0xc9a04a,bronze=0x997838,stone=0xb1a795,blue=0x6db2b0;
   cylinder(stone,0,.22,0,west?2.0:3.35,.44);
   cylinder(west?blue:stone,0,4.49,0,west?1.56:1.06,8.10);
   const radius=west?1.65:1.26,turns=west?1.78:1.30;
   let previous=[radius,.40,0];
   for(let step=1;step<=40;step++){
    const t=step/40,angle=t*turns*2*Math.PI;
    const r=radius+t*(west?1.40:2.05);
    const point=[Math.cos(angle)*r,.40+t*8.35,Math.sin(angle)*r];
    limb(previous,point,west?.285:.38,gold);
    limb([previous[0],previous[1]+.22,previous[2]],[point[0],point[1]+.22,point[2]],.11,bronze);
    previous=point;
   }
   if(west){
    cylinder(gold,0,8.63,0,3.45,.24,'metal');
    cylinder(blue,0,8.90,0,3.31,.35,'metal');
    cylinder(gold,0,9.14,0,3.52,.15,'metal');
    cylinder(stone,0,9.50,0,1.95,.55);
    for(let jet=0;jet<12;jet++){
     const angle=jet*Math.PI/6,c=Math.cos(angle),d=Math.sin(angle);
     let tail=[c*6.49,.16,d*6.49];
     for(let step=1;step<=8;step++){
      const t=step/8,r=6.49-2.39*t;
      const next=[c*r,.16+1.95*Math.sin(t*Math.PI),d*r];
      limb(tail,next,.053,water,'water');
      tail=next;
     }
    }
   }else{
    const [x,y,z]=previous;
    sphere(gold,x,y+.25,z,.37,.46,.32);
   }
  }else if(model==='chengdu-tianfu-sunbird'){
   const brass=0xcb9838,inset=0x393b3e;
   cylinder(inset,0,.065,0,7.46,.13);
   ring(brass,0,.127,0,7.10,.068);
   ring(brass,0,.124,0,5.00,.074);
   cylinder(brass,0,.133,0,2.45,.031,'metal');
   for(let i=0;i<12;i++){
    const a=i*Math.PI/6,b=a+.27;
    limb([2.25*Math.cos(a),.15,2.25*Math.sin(a)],[4.07*Math.cos(b),.15,4.07*Math.sin(b)],.107,brass);
   }
   for(let i=0;i<4;i++){
    const a=i*Math.PI/2+.18;
    const position=(radius,angle)=>[Math.cos(angle)*radius,.158,Math.sin(angle)*radius];
    limb(position(5.83,a-.37),position(6.47,a),.18,brass);
    limb(position(6.47,a),position(5.86,a+.24),.14,brass);
    limb(position(6.47,a),position(6.88,a+.22),.09,brass);
    sphere(brass,...position(6.68,a+.24),.19,.038,.19);
   }
  }else if(model==='chengdu-tianfu-mao'){
   const granite=0xa66b5a,light=0xc08f76,marble=0xe6dfd3;
   box(granite,0,.41,0,9.20,.82,9.08);
   box(light,0,1.14,0,8.72,.62,8.59);
   box(granite,0,4.68,0,7.57,6.53,7.48);
   box(light,0,8.02,0,7.06,.31,6.93);
   box(granite,0,11.62,0,6.31,6.88,6.21);
   box(light,0,15.19,0,6.54,.39,6.47);
   human(0,15.39,0,4.12,'proclaiming',marble);
  }else if(model==='dakar-independence-obelisk'){
   const granite=0xe3ded0,trim=0xc3baaa,inscription=0x7f7356;
   for(let i=0;i<3;i++){
    const width=9.2-i*.76;
    box(trim,0,.16+i*.28,0,width,.30,width);
   }
   box(granite,0,1.68,0,6.05,1.62,6.05);
   box(trim,0,2.55,0,5.8,.23,5.8);
   const shaftWidth=5.15,shaftBase=2.65,shaftHeight=12.6,topRatio=.62;
   add('obelisk-shaft','stone',granite,0,shaftBase+shaftHeight/2,0,shaftWidth,shaftHeight,shaftWidth);
   add('obelisk-cap','stone',0xeee9de,0,shaftBase+shaftHeight+.58,0,shaftWidth*topRatio,1.16,shaftWidth*topRatio);
   const letters={
    M:['10001','11011','10101','10001','10001'],
    C:['011','100','100','100','011'],
    L:['100','100','100','100','111'],
    X:['101','101','010','101','101']
   };
   const unit=.108;
   let x=-1.17;
   for(const letter of 'MCMLX'){
    letters[letter].forEach((line,row)=>{
     const y=12.73-row*unit;
     const depth=shaftWidth/2*(1-(1-topRatio)*(y-shaftBase)/shaftHeight);
     for(let col=0;col<line.length;col++){
      if(line[col]==='1')box(inscription,x+col*unit,y,depth+.016,unit+.003,unit+.003,.072);
     }
    });
    x+=(letters[letter][0].length+1)*unit;
   }
  }else if(model==='porto-novo-toffa'){
   const plinth=0x486b59,edge=0x294638,robe=0x8e5b42,blue=0x435b78,bronze=0x79563b,brass=0xc19c62;
   box(0xbcb1a3,0,.27,0,3.8,.54,3.8);
   box(edge,0,.62,0,2.95,.28,2.95);
   box(plinth,0,1.52,0,2.43,1.55,2.43);
   box(edge,0,2.36,0,2.8,.29,2.8);
   add('robe','stone',robe,0,3.72,0,1.08,2.49,.64);
   sphere(robe,0,4.73,0,.88,.74,.51,'stone');
   for(const side of [-1,1]){
    sphere(bronze,side*.31,2.60,.31,.27,.15,.43,'stone');
    limb([side*.74,4.30,.20],[side*.40,2.71,.61],.058,blue,'stone');
   }
   sphere(bronze,0,5.57,.02,.37,.46,.34,'stone');
   sphere(bronze,0,5.55,.32,.13,.18,.13,'stone');
   cylinder(bronze,0,5.99,-.02,.46,.29);
   sphere(brass,0,6.18,-.04,.37,.33,.33,'stone');
   ring(brass,0,5.96,0,.43,.042,'metal');
   limb([-.71,5.03,0],[-1.17,4.83,.27],.26,robe,'stone');
   limb([-1.17,4.83,.27],[-1.48,5.05,.58],.16,bronze,'stone');
   sphere(bronze,-1.52,5.09,.61,.23,.16,.16,'stone');
   limb([.69,5.02,0],[1.07,4.54,.13],.24,robe,'stone');
   limb([1.07,4.54,.13],[1.02,4.06,.55],.16,bronze,'stone');
   limb([1.08,2.52,.58],[1.08,4.81,.58],.068,brass,'metal');
   limb([-.30,5.12,.34],[0,4.59,.49],.055,brass,'metal');
   limb([0,4.59,.49],[.30,5.12,.34],.055,brass,'metal');
  }else if(model==='maputo-city-hall'){
   const masonry=0xb1a99a,trim=0xcfc8b8,shadow=0x585855,roof=0x77766f;
   box(masonry,0,.55,0,66,1.10,36.2);
   box(masonry,0,9.65,-2.4,65.2,17.10,31.2);
   box(trim,0,18.47,-2.4,67,.72,32.5);
   box(roof,0,19.20,-2.4,64.2,.8,30.5);
   for(const side of [-1,1]){
    for(let column=0;column<4;column++){
     const x=side*(12.3+column*5.05);
     for(const y of [6.4,12.88]){
      box(trim,x,y,13.28,2.75,4.02,.29);
      box(shadow,x,y-.17,13.48,1.98,3.25,.13);
      sphere(shadow,x,y+1.42,13.5,.99,.79,.08,'stone');
     }
    }
    for(const y of [6.7,12.9])for(const z of [-13,-5,3.1,10.9]){
     box(trim,side*32.69,y,z,.26,3.66,2.67);
     box(shadow,side*32.86,y,z,.10,3.02,1.95);
    }
   }
   for(let i=0;i<4;i++)box(trim,0,.23+i*.36,16.0-i*.38,20.75-i*.45,.46,4.0);
   for(let i=0;i<6;i++){
    const x=(i-2.5)*3.16;
    cylinder(trim,x,2.18,15.58,.88,.60);
    cylinder(masonry,x,8.64,15.58,.58,12.48);
    cylinder(trim,x,15.10,15.58,.86,.59);
   }
   for(const x of [-5.90,0,5.90])box(shadow,x,5.17,13.35,2.84,6.2,.18);
   box(trim,0,16.38,15.4,23.2,1.74,4.65);
   box(trim,0,17.51,15.4,24,.55,4.98);
   box(masonry,0,18.94,15.4,21.1,2.32,4.01);
   box(trim,0,20.27,15.4,22.2,.57,4.20);
   cylinder(0x807361,0,21.28,15.4,.11,1.31,'metal');
  }else if(model==='maputo-samora-machel'){
   const marble=0xe3ded0,darkBronze=0x584b3b;
   for(let i=0;i<4;i++){
    const width=8.9-i*.93;
    box(marble,0,.17+i*.31,0,width,.36,width);
   }
   box(marble,0,2.44,0,4.08,2.28,3.70);
   box(marble,0,3.76,0,4.37,.41,3.9);
   plaque(2.42,2.48,1.87);
   human(0,3.97,0,3.10,'proclaiming',darkBronze);
  }else if(model==='accra-independence-arch'){
   const concrete=0xe0d0b3,trim=0xf0e5d3,shadow=0x9e9585;
   for(const side of [-1,1]){
    box(concrete,side*21.5,4.50,0,6.2,9,16.6);
    box(shadow,side*15.25,2.9,-.5,1.60,5.8,12.4);
    box(concrete,side*9.55,2.9,-.5,1.65,5.8,12.4);
   }
   box(concrete,0,7.98,0,49,2.2,17.3);
   box(trim,0,9.27,0,50.2,.52,18);
   box(concrete,0,6.25,8.23,28.6,.48,3.5);
   for(const side of [-1,1]){
    box(shadow,0,10.21,side*8.63,46.8,.15,.18);
    for(let i=-8;i<=8;i++)box(trim,i*2.70,9.80,side*8.63,.14,.95,.17);
   }
   // Broad ribs follow the folded, rising silhouette above the tribune.
   for(const z of [-5.8,5.8]){
    let from=new T.Vector3(-24,9.53,z);
    for(let i=1;i<=14;i++){
     const t=i/14,to=new T.Vector3(-24+48*t,9.53+19.1*Math.sin(Math.PI*t),z);
     const delta=to.clone().sub(from);
     const mid=from.clone().lerp(to,.5);
     const orientation=new T.Quaternion().setFromUnitVectors(UP,delta.clone().normalize());
     add('box','stone',trim,mid.x,mid.y,mid.z,1.72,delta.length()+.65,2.40,orientation);
     from=to;
    }
   }
   box(trim,0,28.81,0,2.02,1.15,14.0);
  }else if(model==='accra-black-star-gate'){
   const concrete=0xdfdcd1,trim=0xf1ead9,dark=0x282b2a;
   for(const side of [-1,1]){
    box(concrete,side*9.15,7.98,0,5.8,15.96,9.75);
    box(trim,side*9.15,.28,0,7.0,.56,10);
    for(const z of [-4.93,4.93]){
     box(trim,side*7.85,8,z,.45,15,.22);
     box(trim,side*10.45,8,z,.45,15,.22);
    }
   }
   box(concrete,0,17.53,0,24.6,3.06,9.6);
   box(trim,0,19.72,0,25,1.34,10);
   box(concrete,0,20.66,0,6.16,.82,4.55);
   add('flag-star','metal',dark,0,21.82,0,1.28,1.28,.52);
  }else if(model==='shanghai-huangpu-light-fountain'){
   const rim=0xbababa,granite=0x8f9193,nozzle=0x686e73,water=0x78c5d9;
   add('fountain-deck','stone',rim,0,.15,0,15.25,.30,15.25);
   add('fountain-deck','stone',granite,0,.33,0,14.5,.08,14.5);
   ring(rim,0,.40,0,11.2,.075,'stone');
   ring(rim,0,.41,0,7.2,.065,'stone');
   for(const [radius,count,height] of [[5.9,10,4.3],[10.2,16,2.5]]){
    for(let i=0;i<count;i++){
     const angle=i*Math.PI*2/count,x=radius*Math.cos(angle),z=radius*Math.sin(angle);
     cylinder(nozzle,x,.45,z,.18,.10,'metal');
     add('cone','water',water,x,.50+height/2,z,.14,height,.14);
    }
   }
   add('cone','water',water,0,2.9,0,.25,4.8,.25);
  }else if(model==='hong-kong-thomas-jackson'){
   const limestone=0xb8ad9b,bronzePatina=0x47584d;
   box(limestone,0,.20,0,3.65,.40,3.8);
   box(limestone,0,.56,0,3.25,.34,3.4);
   box(limestone,0,1.92,0,2.20,2.40,2.34);
   box(limestone,0,3.23,0,2.75,.24,2.95);
   plaque(2.06,1.30,1.20);
   human(0,3.36,0,1.10,'civil',bronzePatina);
  }else if(model==='pimpri-ambedkar-pavilion'){
   const plaster=0xeee9de,trim=0xd7d3c9,plinth=0x3f4145,figure=0xb18a48,blue=0x2d5b9f;
   add('octagonal-column','stone',trim,0,.14,0,2.60,.28,2.60);
   add('octagonal-column','stone',plaster,0,.33,0,2.49,.12,2.49);
   for(let i=0;i<8;i++){
    const angle=(i+.5)*Math.PI/4,x=2.14*Math.sin(angle),z=2.14*Math.cos(angle);
    box(trim,x,.61,z,.39,.43,.39);
    box(plaster,x,2.73,z,.24,3.93,.24);
    box(trim,x,4.67,z,.36,.22,.36);
   }
   for(const side of [-1,1]){
    const x=side*1.98;
    for(const y of [.44,1.02])box(trim,x,y,0,.055,.065,1.63);
    for(let i=0;i<4;i++){
     const z=-.80+i*.40;
     limb([x,.44,z],[x,1.02,z+.40],.022,trim,'stone');
     limb([x,1.02,z],[x,.44,z+.40],.022,trim,'stone');
    }
   }
   box(plinth,0,.51,0,1.77,.24,1.67);
   box(plinth,0,1.05,0,1.35,.84,1.25);
   box(plinth,0,1.52,0,1.52,.14,1.41);
   human(0,1.59,0,.99,'proclaiming',figure);
   add('octagonal-column','stone',trim,0,4.87,0,2.57,.24,2.57);
   add('octagonal-column','stone',plaster,0,5.06,0,2.45,.18,2.45);
   add('pimpri-pavilion-dome','stone',plaster,0,5.14,0,2.24,1.26,2.24);
   cylinder(trim,0,6.45,0,.20,.15);
   box(blue,0,6.61,0,.07,.31,.07,'metal');
   const upright=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('torus','metal',blue,0,6.94,0,.40,.40,.40,upright);
   for(let i=0;i<24;i++){
    const angle=i*Math.PI/12;
    limb([0,6.94,0],[.39*Math.cos(angle),6.94+.39*Math.sin(angle),0],.008,blue);
   }
  }else if(model==='mumbai-flora-fountain'){
   const portland=0xe7ddc8,trim=0xccc0a8,bowl=0xc0b59a;
   cylinder(trim,0,.10,0,6.05,.20);
   add('mumbai-flora-basin','stone',portland,0,0,0,1,1,1);
   cylinder(water,0,.25,0,5.70,.035,'water');
   cylinder(trim,0,.42,0,2.25,.31);
   box(portland,0,3.89,0,3.55,.29,3.55);
   box(trim,0,4.14,0,3.25,.26,3.25);
   box(portland,0,5.14,0,2.21,1.74,2.21);
   box(trim,0,6.10,0,2.65,.20,2.65);
   cylinder(portland,0,6.86,0,.85,1.38);
   cylinder(trim,0,7.58,0,1.02,.23);
   cylinder(portland,0,7.87,0,.78,.36);
   human(0,8.05,0,.78,'classical',marble);
   sphere(trim,.12,9.01,.26,.18,.11,.10,'stone');
   for(const [x,y,z] of [[.01,9.13,.29],[.10,9.20,.31],[.21,9.16,.28],[.18,9.10,.34]])
    sphere(portland,x,y,z,.058,.068,.052,'stone');
   for(let i=0;i<4;i++){
    const angle=i*Math.PI/2,dx=Math.sin(angle),dz=Math.cos(angle);
    const yaw=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('jicin-well-arch','stone',portland,dx*1.22,.70,dz*1.22,2.45,2.98,.47,yaw);
    const x=Math.sin(angle+Math.PI/4),z=Math.cos(angle+Math.PI/4);
    cylinder(trim,x*1.89,.71,z*1.89,.38,.32);
    cylinder(portland,x*1.89,1.36,z*1.89,.29,.98);
    sphere(portland,x*2.11,1.99,z*2.11,.33,.28,.33,'stone');
    sphere(portland,x*1.89,2.34,z*1.89,.31,.55,.31,'stone');
    sphere(portland,x*1.88,2.93,z*1.88,.22,.26,.22,'stone');
    limb([x*1.87+z*.15,2.49,z*1.87-x*.15],[x*2.16+z*.23,2.08,z*2.16-x*.23],.09,portland,'stone');
    limb([x*1.87-z*.15,2.47,z*1.87+x*.15],[x*2.18-z*.23,2.05,z*2.18+x*.23],.09,portland,'stone');
    limb([x*2.10+z*.12,2.00,z*2.10-x*.12],[x*2.29+z*.13,1.56,z*2.29-x*.13],.115,portland,'stone');
    limb([x*2.10-z*.12,2.00,z*2.10+x*.12],[x*2.29-z*.13,1.56,z*2.29+x*.13],.115,portland,'stone');
    add('mumbai-flora-bowl','stone',bowl,dx*1.98,4.59,dz*1.98,1,1,1,yaw);
    sphere(trim,dx*1.58,4.75,dz*1.58,.30,.57,.30,'stone');
    add('box','stone',trim,dx*1.101,5.74,dz*1.101,2.10,.10,.054,yaw);
    for(let carve=-2;carve<=2;carve++){
     sphere(trim,dx*1.126+dz*carve*.16,5.49+Math.abs(carve)*.036,dz*1.126-dx*carve*.16,.075,.10,.075,'stone');
    }
    sphere(portland,dx*.91,6.58,dz*.91,.26,.28,.26,'stone');
    const jet=[[dx*2.56,5.06,dz*2.56],[dx*2.81,4.80,dz*2.81],[dx*3.10,4.09,dz*3.10],[dx*3.36,2.80,dz*3.36],[dx*3.55,.27,dz*3.55]];
    for(let segment=1;segment<jet.length;segment++)limb(jet[segment-1],jet[segment],.026,water,'water');
   }
  }else if(model==='mumbai-martyrs-memorial'){
   const pale=0xe0d8c9,lower=0x76736b,bronzeFigures=0x485848;
   box(lower,0,.15,0,4.24,.30,3.54);
   box(pale,0,.47,0,3.84,.34,3.12);
   box(pale,0,1.79,0,2.95,2.3,2.30);
   box(pale,0,3.06,0,3.34,.24,2.56);
   box(0x80382d,0,1.85,1.155,2.03,.90,.032);
   human(0,3.18,.36,.91,'proclaiming',bronzeFigures);
   limb([-.57,5.81,.57],[-.59,6.19,.58],.048,bronzeFigures,'patina');
   sphere(bronzeFigures,-.59,6.23,.58,.105,.22,.098,'patina');
   cylinder(bronzeFigures,0,3.24,-.39,.42,.12,'patina');
   for(const side of [-1,1]){
    limb([side*.15,4.23,-.43],[side*.23,3.31,-.52],.12,bronzeFigures,'patina');
    sphere(bronzeFigures,side*.23,3.27,-.59,.15,.09,.22,'patina');
    limb([side*.31,4.85,-.41],[side*.49,4.54,-.30],.102,bronzeFigures,'patina');
    limb([side*.49,4.54,-.30],[side*.38,4.27,-.51],.079,bronzeFigures,'patina');
   }
   sphere(bronzeFigures,0,4.61,-.43,.39,.55,.235,'patina');
   sphere(bronzeFigures,0,5.26,-.47,.224,.284,.211,'patina');
   sphere(bronzeFigures,0,5.25,-.66,.08,.097,.091,'patina');
  }else if(model==='patna-gandhi-memorial'){
   const sandstone=0xb28866,trim=0xd0ab8f,panel=0x8f654a,bronzeGroup=0x81705a,fold=0x90795e;
   const stepRise=2.4384/14;
   for(let i=0;i<14;i++)box(i===13?trim:sandstone,0,(i+.5)*stepRise,0,17.1-i*.475,stepRise,14.4-i*.42);
   box(trim,0,2.68,0,11.0,.49,9.16);
   box(sandstone,0,6.10,0,9.86,6.35,8.16);
   box(trim,0,9.4976,0,10.54,.51,8.84);
   for(const side of [-1,1]){
    box(panel,0,5.88,side*4.086,7.34,2.68,.042);
    box(panel,side*4.943,5.88,0,.042,2.68,6.41);
    for(const y of [4.54,7.23]){
     box(trim,0,y,side*4.12,7.46,.16,.10);
     box(trim,side*4.98,y,0,.10,.16,6.53);
    }
   }
   const feet=9.7536;
   const stat=(x,y,z,rx,ry,rz,color=bronzeGroup)=>sphere(color,x,y,z,rx,ry,rz,'patina');
   const join=(a,b,r)=>limb(a,b,r,bronzeGroup,'patina');
   for(const side of [-1,1]){
    join([side*.96,feet+3.85,-.03],[side*.99,feet+.43,.28],.53);
    stat(side*.99,feet+.34,.65,.71,.34,.87);
   }
   add('robe','patina',bronzeGroup,0,feet+2.98,-.02,2.08,4.65,1.14);
   stat(0,feet+5.0,-.05,1.44,1.37,1.06);
   stat(0,feet+6.95,-.12,1.97,2.78,1.13);
   stat(0,feet+9.73,.05,.52,.69,.62);
   limb([-1.25,feet+8.78,.64],[1.26,feet+5.74,.92],.31,fold,'patina');
   limb([-.79,feet+8.90,.72],[1.57,feet+6.15,.82],.21,fold,'patina');
   limb([-1.43,feet+8.03,.68],[.73,feet+5.32,.87],.16,fold,'patina');
   stat(0,feet+10.98,.02,1.06,1.21,.97);
   stat(0,feet+10.80,.98,.24,.32,.38);
   for(const side of [-1,1]){
    stat(side*1.02,feet+10.83,.05,.15,.37,.29);
    const hand=[side*3.60,feet+5.67,.34];
    const shoulder=[side*1.55,feet+8.56,.02],elbow=[side*2.67,feet+7.42,.11];
    stat(...shoulder,.61,.63,.59);
    join(shoulder,elbow,.50);
    stat(...elbow,.43,.47,.43);
    join(elbow,hand,.37);
    stat(...hand,.34,.40,.35);
    const height=side<0?1:.92;
    const child=(x,y,z)=>[side*(4.29+x*height),feet+y*height,.35+z*height];
    stat(...child(0,4.22,-.06),.80*height,1.30*height,.47*height);
    stat(...child(-.08,5.58,0),.25*height,.45*height,.27*height);
    stat(...child(-.08,6.38,0),.56*height,.69*height,.51*height);
    stat(...child(-.10,6.32,.48),.12*height,.16*height,.16*height);
    for(const off of [-.38,.38]){
     join(child(off,3.38,-.01),child(off*1.05,.27,.14),.24*height);
     stat(...child(off*1.05,.18,.37),.31*height,.18*height,.48*height);
    }
    if(side>0)add('robe','patina',bronzeGroup,...child(0,2.84,0),.82,2.15,.48);
    join(child(-.65,4.97,0),child(-.88,4.45,.16),.23*height);
    stat(...child(-.88,4.45,.16),.19*height,.23*height,.19*height);
    join(child(-.88,4.45,.16),hand,.17*height);
    join(child(.66,4.97,0),child(.92,3.73,.14),.24*height);
    stat(...child(.92,3.70,.14),.17*height,.23*height,.17*height);
   }
  }else if(model==='bengaluru-freedom-park-watchtower'){
   const plaster=0xc49b59,trim=0xe1bd79,roof=0x7c433a,slit=0x644b37;
   cylinder(0xb29c7d,0,.12,0,3.30,.24);
   cylinder(trim,0,.43,0,2.41,.38);
   cylinder(plaster,0,2.99,0,2.17,4.76);
   cylinder(trim,0,5.42,0,2.37,.23);
   for(let side=0;side<8;side++){
    const angle=side*Math.PI/4,x=Math.sin(angle),z=Math.cos(angle);
    const quarter=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('masonry-arch','stone',trim,x*2.17,6.61,z*2.17,1.85,2.28,.23,quarter);
    add('box','stone',plaster,x*2.19,5.61,z*2.19,1.80,.27,.25,quarter);
    add('box','stone',slit,x*2.16,3.85,z*2.16,.18,.58,.055,quarter);
   }
   cylinder(trim,0,7.73,0,2.49,.17);
   add('bengaluru-watchtower-roof','stone',roof,0,8.96,0,2.77,2.40,2.77);
   sphere(roof,0,10.39,0,.10,.31,.10,'stone');
  }else if(model==='bengaluru-freedom-park-block-east'||model==='bengaluru-freedom-park-block-southeast'){
   const {width,depth}=MODEL_SPECS[model],plaster=0xbca678,roof=0x79534a,shade=0x655c4e;
   box(plaster,0,1.72,0,width,3.44,depth);
   add('hip-roof','stone',roof,0,3.35,0,width,2.05,depth);
   for(const side of [-1,1]){
    for(let i=-4;i<=4;i++)box(shade,i*width*.093,2.36,side*depth*.5001,.55,.76,.022);
    add('barcelona-arched-door','stone',shade,side*width*.5002,1.23,0,1.43,2.44,.043,
     new T.Quaternion().setFromAxisAngle(UP,side*Math.PI/2));
   }
  }else if(model==='pune-dilli-darwaza'){
   const basalt=0x57534e,cap=0x72665d,jointColor=0x625c55,timber=0x694739,tile=0x493931;
   const woodRecess=0x3d2e26,facade=1.10;
   for(const side of [-1,1]){
    const x=side*9.62,z=4.43;
    cylinder(basalt,x,4.68,z,5.10,9.36);
    cylinder(cap,x,9.49,z,5.11,.31);
    for(let course=0;course<8;course++)cylinder(jointColor,x,.94+course*1.02,z,5.105,.037);
    for(let i=0;i<12;i++){
     const angle=i*Math.PI/6;
     add('box','stone',basalt,x+Math.sin(angle)*4.83,9.99,z+Math.cos(angle)*4.83,1.18,.86,.93,new T.Quaternion().setFromAxisAngle(UP,angle));
    }
    box(basalt,side*3.97,4.84,facade,1.28,9.68,7.95);
    box(basalt,side*3.37,4.72,-4.02,2.42,9.44,8.58);
   }
   add('masonry-arch','stone',cap,0,4.85,facade,6.67,9.70,7.95);
   box(basalt,0,8.75,-4.0,4.68,2.52,8.62);
   box(cap,0,9.81,-1.35,11.42,.40,12.02);
   box(timber,0,10.98,-1.55,10.90,2.12,10.80);
   box(woodRecess,0,11.14,3.865,9.96,1.57,.045);
   for(let bay=-4;bay<=4;bay++){
    const x=bay*1.16;
    box(timber,x,11.14,3.92,.15,1.60,.12);
    for(const off of [-.29,0,.29])box(timber,x+off,10.54,3.94,.065,.43,.09);
   }
   box(timber,0,10.77,3.96,10.10,.115,.20);
   add('hip-roof','stone',tile,0,12.02,-1.40,12.06,1.48,11.35);
  }else if(model==='pune-shaniwarwada-stage'){
   const ballast=0x504a46,top=0x8d6859;
   add('pune-maidan-stage-plan','stone',ballast,0,.48,0,1,.96,1);
   add('pune-maidan-stage-plan','stone',top,0,1.07,0,.988,.26,.988);
   box(ballast,0,.21,5.66,12.2,.42,.33);
   box(top,0,.47,5.51,11.82,.16,.22);
  }else if(model==='pune-bajirao-equestrian'){
   const pavement=0x716258,base=0x55504c,cap=0xa69a8d,fig=0x776353,relief=0x493f36;
   box(pavement,-.283,.11,0,9.63,.22,10.19);
   box(base,0,.37,0,6.80,.30,7.73);
   box(cap,0,.62,0,5.82,.20,6.82);
   box(base,0,1.78,0,4.05,2.12,5.12);
   box(cap,0,2.98,0,4.38,.28,5.40);
   box(relief,0,1.83,2.57,3.36,.74,.042);
   const y=3.12;
   const figPart=(x,h,z,rx,ry,rz)=>sphere(fig,x,y+h,z,rx,ry,rz,'patina');
   const joint=([x,h,z],[X,H,Z],radius)=>limb([x,y+h,z],[X,y+H,Z],radius,fig,'patina');
   add('sphere','patina',fig,0,y+1.58,-.31,.59,.61,1.42,new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-.51));
   figPart(0,2.07,.65,.54,.59,.62);
   joint([0,2.09,.72],[0,3.00,1.21],.36);
   figPart(0,3.10,1.32,.31,.30,.47);
   figPart(0,2.96,1.66,.25,.21,.29);
   joint([0,1.20,-1.38],[.19,.68,-1.89],.09);
   joint([.19,.68,-1.89],[.29,.50,-1.92],.065);
   figPart(0,2.87,-.10,.33,.55,.24);
   figPart(0,3.37,-.04,.15,.24,.16);
   figPart(0,3.65,-.03,.22,.32,.21);
   figPart(0,3.91,-.06,.29,.23,.24);
   figPart(0,4.11,-.09,.088,.16,.090);
   box(relief,0,y+2.23,-.19,.86,.25,1.16,'patina');
   for(const side of [-1,1]){
    add('cone','patina',fig,side*.17,y+3.48,1.20,.10,.29,.10);
    joint([side*.34,1.48,-1.10],[side*.43,.83,-1.16],.19);
    joint([side*.43,.83,-1.16],[side*.44,.16,-1.25],.103);
    figPart(side*.44,.105,-1.19,.14,.114,.19);
    const raised=side<0?.13:0;
    joint([side*.38,2.01,.73],[side*.44,1.45+raised,1.39],.142);
    figPart(side*.44,1.45+raised,1.39,.140,.14,.15);
    joint([side*.44,1.45+raised,1.39],[side*.43,1.32+raised,1.08],.10);
    figPart(side*.43,1.29+raised,1.04,.125,.12,.16);
    joint([side*.16,2.47,-.11],[side*.48,2.17,.34],.13);
    joint([side*.48,2.17,.34],[side*.55,1.68,.35],.089);
    figPart(side*.55,1.66,.43,.12,.11,.19);
   }
   joint([-.26,3.14,-.07],[-.46,2.91,.33],.11);
   joint([-.46,2.91,.33],[-.29,2.96,.79],.076);
   joint([-.29,2.96,.79],[-.17,2.82,1.60],.023);
   joint([.24,3.12,-.05],[.58,3.31,.24],.11);
   joint([.58,3.31,.24],[.77,3.49,.57],.073);
   figPart(.77,3.49,.57,.104,.115,.105);
   joint([.79,2.36,-.75],[.75,4.13,1.40],.027);
   joint([.75,4.13,1.40],[.745,4.25,1.54],.046);
  }else if(model==='kingston-manley-statue'||model==='kingston-bustamante-statue'){
   const limestone=0xd7d3c5,darkBronze=0x494c3d,manley=model==='kingston-manley-statue';
   cylinder(limestone,0,.12,0,1.5,.24);
   box(limestone,0,.33,0,2.34,.24,2.34);
   box(limestone,0,1.48,0,1.52,2.1,1.52);
   box(limestone,0,2.59,0,1.77,.18,1.77);
   plaque(1.69,1.10,.78);
   human(0,2.69,0,.88,manley?'civil':'orator',darkBronze);
  }else if(model==='girona-defenders-monument'){
   const limestone=0xc3b59c,trim=0xd7c9ad,patina=0x4f5749;
   box(limestone,0,.085,0,5.55,.17,8.45);
   box(trim,0,.23,0,4.16,.13,6.53);
   box(limestone,0,.39,0,3.55,.20,4.64);
   box(trim,0,.59,0,2.91,.22,3.89);
   box(limestone,0,1.79,0,2.57,2.20,3.40);
   box(trim,0,2.92,0,2.81,.20,3.62);
   box(limestone,0,3.10,0,2.95,.19,3.78);
   box(0x5b5446,0,1.89,1.72,1.65,.79,.068,'stone');
   human(.25,3.19,-.40,.94,'orator',patina);
   add('cape','patina',patina,.19,4.22,-.62,.72,1.37,.16);
   // The other defenders remain low around the standing figure.
   sphere(patina,-.68,3.97,.18,.20,.22,.18,'patina');
   sphere(patina,-.73,3.58,-.01,.28,.30,.26,'patina');
   limb([-.83,3.47,-.12],[-1.12,3.38,.29],.12,patina,'patina');
   limb([-1.12,3.38,.29],[-.89,3.29,.63],.09,patina,'patina');
   limb([-.58,3.43,-.19],[-.40,3.34,.19],.105,patina,'patina');
   limb([-.84,3.74,.08],[-1.05,3.52,.47],.077,patina,'patina');
   limb([-.61,3.77,.09],[-.41,3.48,.59],.077,patina,'patina');
   sphere(patina,.74,3.41,.82,.29,.20,.67,'patina');
   sphere(patina,.75,3.38,1.48,.19,.19,.17,'patina');
   limb([.55,3.45,1.00],[.28,3.31,1.24],.085,patina,'patina');
   limb([.91,3.45,.99],[1.15,3.32,.78],.085,patina,'patina');
   limb([.64,3.40,.43],[.35,3.30,-.37],.115,patina,'patina');
   limb([.85,3.39,.42],[1.02,3.30,-.37],.105,patina,'patina');
  }else if(model==='girona-turtle-fountain'){
   const granite=0xb3b0a0,relief=0x96958a,pale=0xc5bfb0;
   box(granite,0,.08,-.12,1.05,.16,.90);
   box(granite,0,.52,-.14,.78,.73,.70);
   box(pale,0,.91,-.12,.90,.12,.78);
   box(granite,0,.48,.43,1.39,.17,.64);
   box(relief,0,.57,.67,1.41,.10,.16);
   for(const side of [-1,1])box(pale,side*.62,.57,.42,.17,.10,.51);
   box(water,0,.577,.42,1.08,.018,.37,'water');
   sphere(granite,0,1.16,.03,.40,.21,.37,'stone');
   sphere(granite,0,1.07,.41,.135,.115,.15,'stone');
   for(const side of [-1,1]){
    limb([side*.21,1.08,.13],[side*.43,1.01,.30],.065,relief,'stone');
    limb([side*.18,1.08,-.19],[side*.35,1.02,-.36],.055,granite,'stone');
    limb([side*.12,1.38,-.12],[side*.22,1.27,.17],.057,granite,'stone');
    limb([side*.13,1.59,.04],[side*.22,1.35,.21],.038,pale,'stone');
   }
   sphere(pale,0,1.53,-.02,.166,.231,.17,'stone');
   sphere(pale,0,1.77,.071,.135,.139,.131,'stone');
   limb([0,1.045,.55],[0,.59,.59],.013,water,'water');
  }else if(model==='girona-independencia-newsstand'){
   const steel=0x6a6e64,trim=0x999c92,glass=0x435756,red=0x972b2c;
   box(steel,0,1.26,0,3.88,2.52,2.92);
   box(trim,0,2.74,.09,4.30,.27,3.11);
   box(glass,0,1.64,1.49,3.55,1.33,.05,'glass');
   box(trim,0,.96,1.51,3.62,.14,.17);
   box(red,0,2.45,1.49,3.67,.24,.08);
   for(const x of [-1.21,0,1.21])box(steel,x,1.63,1.53,.05,1.26,.035);
   for(const side of [-1,1]){
    box(glass,side*1.96,1.59,.19,.04,1.10,1.84,'glass');
    box(trim,side*1.98,.98,.19,.08,.10,1.92);
   }
   for(let i=0;i<7;i++)box([0xd0b748,0xd6cbc1,0x793e4b][i%3],-1.33+i*.44,1.22,1.55,.26,.37,.05,'stone');
  }else if(model==='reus-casa-navas-facade'){
   const sandstone=0xc6b193,trim=0xe0c9a6,newStone=0xd9c29e,shade=0x5e5045,glass=0x435854,iron=0x4a4c43;
   const front=2.26,towerX=-4.94,towerZ=2.02;
   box(sandstone,0,5.65,-.45,12.15,11.30,5.42);
   for(const y of [.20,3.88,7.65,11.20])box(trim,0,y,2.23,12.15,.29,.38);
   for(const x of [-3.60,0,3.55]){
    add('masonry-arch','stone',trim,x,2.01,front+.12,2.87,4.02,.45);
    add('barcelona-arched-door','stone',glass,x,1.79,front+.35,1.90,3.58,.09);
    box(iron,x,1.56,front+.42,.04,3.03,.05,'metal');
   }
   box(trim,.79,4.37,2.57,5.40,.30,1.05);
   box(shade,.79,5.98,2.51,4.70,2.98,.18);
   for(const x of [-1.02,.20,1.42,2.64]){
    box(glass,x,5.93,2.65,.80,2.72,.057);
    add('masonry-arch','stone',trim,x,6.22,2.77,1.19,2.60,.23);
    cylinder(trim,x-.56,5.83,2.81,.080,2.70);
   }
   box(trim,.79,7.04,2.83,5.61,.21,.49);
   for(const x of [-3.41,4.65])for(const y of [5.97,9.22]){
    box(trim,x,y,front+.11,1.73,2.49,.24);
    add('barcelona-arched-door','stone',glass,x,y,front+.25,1.20,2.01,.055);
    box(iron,x,y-.77,front+.42,1.60,.52,.08,'metal');
   }
   for(const x of [-1.07,.61,2.29]){
    box(trim,x,9.28,front+.09,1.34,1.97,.24);
    add('barcelona-arched-door','stone',glass,x,9.24,front+.24,.97,1.66,.06);
   }
   for(let i=0;i<6;i++)box(newStone,1.47,11.42+i*.35,2.26,5.65-i*.79,.35,.43);
   for(const x of [-3.65,-2.44,-1.23,0,1.23,2.44,3.65,4.86])sphere(trim,x,10.91,2.45,.16,.20,.08,'stone');

   // Two stone drums, the open iron belvedere and the restored weather vane.
   add('octagonal-column','stone',sandstone,towerX,10.83,towerZ,.77,4.86,.77);
   add('octagonal-column','stone',newStone,towerX,13.27,towerZ,.84,.23,.84);
   add('octagonal-column','stone',newStone,towerX,14.56,towerZ,.66,2.40,.66);
   add('octagonal-column','stone',trim,towerX,15.89,towerZ,.79,.32,.79);
   for(let i=0;i<8;i++){
    const a=(i+.5)*Math.PI/4,s=Math.sin(a),c=Math.cos(a);
    const turn=new T.Quaternion().setFromAxisAngle(UP,a);
    add('box','stone',glass,towerX+s*.62,14.50,towerZ+c*.62,.27,1.47,.07,turn);
    sphere(trim,towerX+s*.76,13.30,towerZ+c*.76,.115,.16,.115,'stone');
    limb([towerX+s*.67,16.04,towerZ+c*.67],[towerX+s*.67,17.19,towerZ+c*.67],.043,iron);
    limb([towerX+s*.67,17.19,towerZ+c*.67],[towerX+s*.38,17.98,towerZ+c*.38],.042,iron);
    limb([towerX+s*.38,17.98,towerZ+c*.38],[towerX,18.49,towerZ],.032,iron);
   }
   ring(iron,towerX,17.14,towerZ,.66,.035);
   limb([towerX,18.44,towerZ],[towerX,19.91,towerZ],.053,iron);
   box(iron,towerX,19.30,towerZ,.69,.094,.115,'metal');
   add('pediment','metal',iron,towerX+.02,19.51,towerZ,.40,.31,.07);
  }else if(model==='vic-merma'){
   const bronzeSkin=0x5c5144,bronzeCoat=0x4a453c,bronzeDetail=0x6c5b48,stoneSeat=0xc7bca7;
   cylinder(0xb9ae9d,0,.065,0,1.155,.13);
   cylinder(stoneSeat,0,.244,0,.92,.25);
   cylinder(0xd1c4ae,0,.427,0,1.13,.17);
   cylinder(stoneSeat,0,.602,-.09,.50,.20);
   sphere(bronzeCoat,0,.77,-.04,.27,.12,.225,'patina');
   sphere(bronzeCoat,-.025,1.015,-.105,.27,.32,.215,'patina');
   for(const side of [-1,1]){
    limb([side*.15,.78,.01],[side*.195,.755,.34],.105,bronzeCoat,'patina');
    limb([side*.195,.755,.34],[side*.216,.555,.40],.073,bronzeCoat,'patina');
    sphere(bronzeCoat,side*.216,.55,.44,.095,.059,.115,'patina');
    limb([side*.225,1.125,-.06],[side*.29,.93,.09],.074,bronzeCoat,'patina');
    limb([side*.29,.93,.09],[side*.20,.80,.30],.051,bronzeCoat,'patina');
    sphere(bronzeSkin,side*.195,.801,.327,.063,.034,.075,'patina');
   }
   cylinder(bronzeCoat,-.04,1.254,-.10,.16,.16,'patina');
   sphere(bronzeSkin,-.038,1.548,-.10,.332,.342,.284,'patina');
   sphere(bronzeSkin,-.045,1.435,.054,.28,.212,.190,'patina');
   for(const side of [-1,1]){
    sphere(bronzeDetail,-.038+side*.305,1.52,-.053,.064,.103,.061,'patina');
    sphere(bronzeDetail,-.046+side*.133,1.582,.143,.101,.046,.058,'patina');
    sphere(0x302c28,-.046+side*.133,1.539,.167,.038,.022,.024,'patina');
   }
   sphere(bronzeDetail,-.046,1.497,.227,.082,.068,.100,'patina');
   sphere(bronzeDetail,-.046,1.391,.212,.161,.062,.067,'patina');
   sphere(0x2b2925,-.046,1.393,.264,.139,.027,.022,'patina');
  }else if(model==='segovia-music-bandstand'){
   const masonry=0xb8ada0,stoneEdge=0xcfc2ac,post=0x454846,roof=0x48545d,tracery=0x555652;
   add('bandstand-deck','stone',masonry,0,.51,0,3.43,1.02,3.43);
   add('bandstand-deck','stone',stoneEdge,0,1.09,0,3.49,.15,3.49);
   add('bandstand-deck','stone',masonry,0,1.188,0,3.28,.048,3.28);
   for(const side of [-1,1]){
    for(let step=0;step<6;step++){
     const rise=(step+1)*.198,z=side*(4.60-step*.30);
     box(masonry,0,rise/2,z,1.65,rise,.302);
    }
    for(const x of [-.84,.84]){
     limb([x,1.01,side*4.72],[x,1.98,side*3.03],.044,post);
     for(const step of [0,2,4])cylinder(post,x,step*.198+.61,side*(4.60-step*.30),.043,.84,'metal');
    }
   }
   for(let i=0;i<8;i++){
    const a=(i+.5)*Math.PI/4,next=a+Math.PI/4;
    const x=Math.sin(a)*3.12,z=Math.cos(a)*3.12,nextX=Math.sin(next)*3.12,nextZ=Math.cos(next)*3.12;
    cylinder(post,x,2.77,z,.098,3.09,'metal');
    cylinder(post,x,1.35,z,.169,.26,'metal');
    cylinder(post,x,4.22,z,.222,.19,'metal');
    limb([x,4.24,z],[nextX,4.24,nextZ],.075,post);
    const midX=(x+nextX)/2,midZ=(z+nextZ)/2;
    limb([x,3.67,z],[midX,4.22,midZ],.049,tracery);
    limb([nextX,3.67,nextZ],[midX,4.22,midZ],.049,tracery);
    if(i===3||i===7)continue;
    limb([x,1.96,z],[nextX,1.96,nextZ],.048,post);
    limb([x,1.32,z],[nextX,1.32,nextZ],.037,post);
    for(let bar=1;bar<9;bar++){
     const t=bar/9;
     cylinder(post,x+(nextX-x)*t,1.65,z+(nextZ-z)*t,.024,.65,'metal');
    }
   }
   add('bandstand-deck','metal',post,0,4.38,0,3.96,.16,3.96);
   add('bandstand-roof','metal',roof,0,4.43,0,4.06,1.50,4.06);
   cylinder(tracery,0,6.007,0,.09,.16,'metal');
   sphere(post,0,6.13,0,.10,.17,.10);
  }else if(model==='segovia-machado'){
   const cast=0x575043,coat=0x514b40,high=0x696050,dark=0x39382f;
   box(cast,0,.041,0,.68,.082,.52,'patina');
   for(const side of [-1,1]){
    const x=side*.114;
    limb([x,.16,side*.032],[x,.657,0],.079,cast,'patina');
    sphere(dark,x,.133,.080+side*.032,.096,.050,.147,'patina');
   }
   add('robe','patina',coat,0,.94,-.045,.46,.91,.34);
   sphere(coat,.021,1.246,-.026,.223,.239,.144,'patina');
   sphere(cast,.029,1.656,.02,.14,.18,.133,'patina');
   sphere(high,.028,1.615,.141,.048,.034,.041,'patina');
   sphere(dark,.027,1.577,.137,.071,.019,.023,'patina');
   for(const side of [-1,1])limb([side*.13,1.427,.096],[side*.048,1.16,.121],.017,high,'patina');
   limb([-.194,1.376,-.034],[-.291,1.138,.008],.065,coat,'patina');
   limb([-.291,1.138,.008],[-.331,1.005,.139],.052,coat,'patina');
   sphere(cast,-.330,.988,.171,.053,.049,.058,'patina');
   limb([-.350,.084,.235],[-.330,.993,.171],.016,dark,'patina');
   limb([.222,1.39,-.022],[.296,1.162,.019],.062,coat,'patina');
   limb([.296,1.162,.019],[.266,1.014,.143],.056,coat,'patina');
   sphere(cast,.260,1.016,.173,.051,.047,.055,'patina');
   box(high,.267,.947,.174,.047,.354,.230,'patina');
  }else if(model==='segovia-press-kiosk'){
   const shell=0x657173,closed=0x455356,roof=0x6d787a,trim=0x899291;
   box(0x939085,0,.09,0,4.03,.18,4.03);
   box(shell,0,1.14,0,3.78,1.92,3.78,'metal');
   for(const side of [-1,1]){
    box(trim,side*1.81,1.30,1.914,.14,1.88,.09,'metal');
    box(closed,side*1.918,1.26,0,.092,1.47,2.33,'metal');
   }
   box(closed,0,1.27,1.925,3.35,1.61,.09,'metal');
   for(let slat=0;slat<10;slat++)box(shell,0,.543+slat*.151,1.978,3.31,.025,.035,'metal');
   box(trim,0,2.083,0,4.03,.13,4.03,'metal');
   const roofPitch=z=>2.53-.11*z*z;
   for(let strip=0;strip<9;strip++){
    const z=-1.80+strip*.45;
    const pitch=Math.atan2(roofPitch(z-.225)-roofPitch(z+.225),.45);
    const turn=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),pitch);
    add('box','metal',roof,0,roofPitch(z),z,4.03,.10,.50,turn);
    box(shell,0,(2.10+roofPitch(z))/2,z,3.92,roofPitch(z)-2.10,.45,'metal');
   }
  }else if(model==='malaga-torrijos-obelisk'){
   const limestone=0xd4c7b3,trim=0xe5d9c5,shade=0xb7a793,iron=0x454643,patina=0x63665e;
   box(shade,0,.12,0,10.11,.24,10.11);
   box(limestone,0,.35,0,7.52,.26,7.52);
   box(trim,0,.69,0,6.40,.42,6.40);
   box(limestone,0,1.54,0,5.45,1.32,5.45);
   box(trim,0,2.28,0,5.72,.24,5.72);
   box(limestone,0,3.44,0,4.26,2.08,4.26);
   box(trim,0,4.57,0,4.59,.21,4.59);
   box(shade,0,4.91,0,3.03,.47,3.03);
   box(trim,0,5.20,0,3.20,.22,3.20);
   add('pyramid','stone',limestone,0,10.82,0,1.64,11.03,1.64,new T.Quaternion().setFromAxisAngle(UP,Math.PI/4));
   box(trim,0,16.50,0,.59,.31,.59);
   box(limestone,0,16.77,0,.43,.28,.43);
   add('cone','stone',trim,0,16.96,0,.32,.08,.32);

   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2,ca=Math.cos(angle),sa=Math.sin(angle);
    const point=(x,y,z)=>[x*ca+z*sa,y,z*ca-x*sa];
    const orientation=new T.Quaternion().setFromAxisAngle(UP,angle);
    const slab=(color,x,y,z,w,h,d,material='stone')=>add('box',material,color,...point(x,y,z),w,h,d,orientation);

    slab(iron,0,1.51,2.738,3.68,.76,.05,'metal');
    slab(iron,0,3.43,2.151,2.87,1.31,.054,'metal');
    for(let row=0;row<5;row++){
     slab(patina,0,3.84-row*.20,2.184,2.38-row*.13,.037,.018,'patina');
     if(row<4)slab(patina,0,1.78-row*.158,2.769,3.1-row*.12,.034,.016,'patina');
    }
    for(let level=0;level<6;level++){
     const y=6.43+level*1.57,r=.37-level*.035;
     const surface=h=>1.64*Math.SQRT1_2*(1-(h-5.305)/11.03*.88);
     for(const sign of [-1,1]){
      for(let leaf=0;leaf<7;leaf++){
       const a=leaf*Math.PI/6,h=y-r*.60*Math.cos(a);
       const x=sign*(r*.92+r*.57*Math.sin(a));
       const turn=orientation.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),sign*(a-Math.PI/2)));
       add('sphere','stone',trim,...point(x,h,surface(h)+.025),r*.22,r*.34,.095,turn);
      }
     }
     slab(trim,0,y-.28,surface(y-.28)+.065,.16,.13,.14);
    }

    // One corner pier per side keeps the four runs of iron railing continuous.
    slab(limestone,4.87,.71,4.87,.35,.95,.35);
    slab(trim,4.87,1.23,4.87,.43,.12,.43);
    for(const h of [.48,1.05])slab(iron,0,h,4.87,9.57,.053,.059,'metal');
    for(let bar=0;bar<26;bar++){
     const x=-4.57+bar*.365;
     slab(iron,x,.81,4.87,.037,.80,.037,'metal');
     add('cone','metal',iron,...point(x,1.27,4.87),.046,.14,.046);
    }
   }
  }else if(model==='malaga-seated-picasso'){
   const marbleSeat=0xc4c0b3,seatEdge=0xd1cbbd,bronzeBody=0x67705c,patina=0x586453,highlight=0x747d67;
   for(const x of [-.66,.67])box(marbleSeat,x,.21,0,.19,.42,.52);
   box(seatEdge,0,.445,0,1.95,.105,.64);
   sphere(bronzeBody,-.50,.59,.02,.245,.17,.22,'patina');
   sphere(bronzeBody,-.51,.90,-.085,.228,.299,.16,'patina');
   sphere(bronzeBody,-.53,1.135,-.05,.077,.095,.071,'patina');
   sphere(patina,-.55,1.254,-.034,.119,.145,.113,'patina');
   sphere(bronzeBody,-.566,1.221,.073,.029,.030,.036,'patina');
   sphere(bronzeBody,-.655,1.228,-.034,.023,.045,.020,'patina');
   sphere(bronzeBody,-.442,1.234,-.032,.023,.043,.021,'patina');
   for(const side of [-1,1]){
    limb([-.53+side*.047,1.13,.06],[-.53+side*.106,1.06,.08],.022,highlight,'patina');
    limb([-.52+side*.08,.88,.076],[-.52+side*.13,.72,.036],.015,patina,'patina');
   }
   for(const [x,delta] of [[-.67,-.05],[-.38,.10]]){
    limb([x,.63,.08],[x+delta,.535,.41],.095,bronzeBody,'patina');
    sphere(bronzeBody,x+delta,.535,.41,.094,.093,.091,'patina');
    limb([x+delta,.535,.41],[x+delta,.105,.54],.072,patina,'patina');
    sphere(bronzeBody,x+delta,.077,.633,.072,.074,.14,'patina');
    box(patina,x+delta,.039,.656,.136,.064,.221,'patina');
   }
   limb([-.70,1.055,-.05],[-.79,.78,.18],.071,patina,'patina');
   limb([-.79,.78,.18],[-.56,.722,.31],.055,bronzeBody,'patina');
   limb([-.31,1.04,-.05],[-.26,.78,.12],.071,patina,'patina');
   limb([-.26,.78,.12],[-.45,.733,.35],.050,bronzeBody,'patina');
   sphere(bronzeBody,-.79,.78,.18,.060,.062,.061,'patina');
   sphere(bronzeBody,-.26,.78,.12,.056,.061,.055,'patina');
   box(patina,-.48,.725,.30,.277,.036,.235,'patina');
   box(highlight,-.48,.747,.30,.257,.011,.218,'patina');
   limb([-.48,.754,.197],[-.48,.755,.401],.006,patina,'patina');
   limb([-.49,.747,.35],[-.38,.774,.43],.012,0x817a63,'patina');
  }else if(model==='cordoba-tendillas-captain-fountain'){
   const granite=0x9c6d5b,trim=0xc09782,foot=0xcec1b2,bronzePlaque=0x62514b,waterTint=0x6ab6c9;
   box(foot,0,.21,0,4.17,.42,5.59);
   box(granite,0,.64,0,3.94,.45,5.14);
   box(trim,0,.92,0,3.65,.19,4.82);
   box(granite,0,2.23,0,2.94,2.45,4.12);
   box(trim,0,3.53,0,3.16,.26,4.40);
   box(granite,0,3.77,0,2.58,.25,3.90);
   box(trim,0,4.005,0,2.68,.11,3.99);
   for(const side of [-1,1]){
    box(bronzePlaque,0,2.47,side*2.077,1.86,1.16,.053,'patina');
    for(let row=0;row<4;row++)box(trim,0,2.85-row*.235,side*2.107,1.50-row*.12,.055,.023);
    box(bronzePlaque,side*1.485,2.44,0,.045,.92,2.73,'patina');
    for(let row=0;row<4;row++)box(trim,side*1.514,2.76-row*.184,0,.022,.045,2.31-row*.13);
   }
   horse(4.06,'reins',marble);
   add('fountain-deck','water',waterTint,0,.205,0,4.33,.054,4.33);
   ring(foot,0,.236,0,4.38,.09,'stone');
   for(let nozzle=0;nozzle<16;nozzle++){
    const angle=nozzle*Math.PI/8,x=Math.sin(angle),z=Math.cos(angle);
    let previous=[3.62*x,.241,3.62*z];
    for(let step=1;step<=6;step++){
     const t=step/6,r=3.62+.69*t;
     const point=[x*r,.241+4.15*t*(1-t),z*r];
     limb(previous,point,.030,waterTint,'water');previous=point;
    }
   }
  }else if(model==='cordoba-tendillas-floor-jets'){
   const bronzeNozzle=0x7e827a,waterTint=0x77bacd;
   for(let row=-1;row<=1;row++)for(let col=-1;col<=1;col++){
    const x=col*2.24,z=row*2.24,height=row===0&&col===0?1.63:1.02;
    cylinder(bronzeNozzle,x,.04,z,.11,.08);
    cylinder(waterTint,x,.08+height/2,z,.049,height,'water');
    sphere(waterTint,x,.074+height,z,.045,.016,.045,'water');
   }
  }else if(model==='valencia-city-hall-fountain'){
   const lip=0xc1b8a8,basinBody=0x9f998e,bowl=0x7c9693,waterTint=0x61abc0;
   add('fountain-deck','stone',basinBody,0,.19,0,10,.38,10);
   add('fountain-deck','stone',lip,0,.43,0,9.96,.18,9.96);
   add('fountain-deck','water',waterTint,0,.52,0,9.56,.031,9.56);
   add('fountain-deck','stone',bowl,0,.61,0,4.80,.19,4.80);
   add('fountain-deck','water',waterTint,0,.715,0,4.61,.036,4.61);
   for(let position=0;position<16;position++){
    const a=position*Math.PI/8,s=Math.sin(a),c=Math.cos(a);
    let previous=[s*4.16,.74,c*4.16];
    for(let step=1;step<=7;step++){
     const t=step/7,r=4.16+3.72*t;
     const point=[s*r,.74-.19*t+6.08*t*(1-t),c*r];
     limb(previous,point,.043,waterTint,'water');previous=point;
    }
   }
   for(let position=0;position<8;position++){
    const a=(position+.5)*Math.PI/4;
    cylinder(waterTint,Math.sin(a)*1.55,1.98,Math.cos(a)*1.55,.055,2.53,'water');
   }
   cylinder(waterTint,0,2.55,0,.094,3.67,'water');
  }else if(model==='valencia-vinatea'){
   const pedestal=0xc9ba9f,lightStone=0xd9ccaf,patina=0x4b5548,ornament=0x606557;
   box(pedestal,0,.30,0,2.47,.60,2.47);
   box(lightStone,0,.70,0,2.18,.22,2.18);
   box(pedestal,0,3.30,0,1.77,5.05,1.77);
   box(lightStone,0,5.88,0,1.98,.22,1.98);
   box(ornament,0,4.56,.922,.85,.84,.051,'patina');
   add('pediment','patina',patina,0,3.94,.957,.85,.42,.074);
   for(const side of [-1,1]){
    const turn=new T.Quaternion().setFromAxisAngle(UP,side*Math.PI/2);
    add('box','stone',lightStone,side*.902,4.56,0,.74,.89,.051,turn);
    add('pediment','stone',lightStone,side*.902,4.10,0,.74,.35,.051,turn);
   }
   box(patina,0,6.023,0,1.44,.075,1.36,'patina');
   for(const x of [-.23,.25])sphere(patina,x,6.10,.12,.15,.10,.248,'patina');
   add('robe','patina',patina,0,6.83,-.06,.54,1.54,.435);
   sphere(patina,-.055,7.47,-.03,.421,.38,.248,'patina');
   for(const x of [-.28,-.11,.12,.31]){
    limb([x*.40,7.42,.21],[x,6.20,.33],.032,ornament,'patina');
   }
   cylinder(patina,-.052,7.82,.01,.15,.24,'patina');
   sphere(patina,-.047,8.00,.012,.202,.249,.20,'patina');
   sphere(ornament,-.047,7.90,.162,.151,.140,.086,'patina');
   add('octagonal-column','patina',patina,-.047,8.202,.009,.226,.194,.207);
   limb([-.387,7.62,-.029],[-.647,7.42,.155],.105,patina,'patina');
   limb([-.647,7.42,.155],[-.835,7.48,.365],.085,patina,'patina');
   sphere(ornament,-.891,7.47,.433,.139,.060,.101,'patina');
   limb([.268,7.59,-.017],[.404,7.33,.046],.113,patina,'patina');
   limb([.404,7.33,.046],[.261,7.21,.264],.073,patina,'patina');
   box(ornament,.289,7.22,.243,.21,.61,.27,'patina');
   sphere(patina,.292,7.23,.386,.11,.070,.083,'patina');
  }else if(model==='alicante-luceros-fountain'){
   const concrete=0xcfbda4,edge=0xe4d6bc,relief=0xad9272,shade=0xbda78b;
   const waterTint=0x6badbd,gildedCeramic=0xb58b4b,starRed=0xa95a48;
   const disc=(color,y,radius,height,material='stone')=>add('fountain-deck',material,color,0,y,0,radius,height,radius);
   disc(shade,.17,10,.34);
   disc(concrete,.39,9.95,.18);
   disc(waterTint,.49,9.73,.030,'water');
   ring(edge,0,.48,0,9.63,.12,'stone');
   disc(shade,.87,5.58,.74);
   disc(concrete,1.46,6.03,.52);
   ring(edge,0,1.76,0,5.93,.38,'stone');
   disc(waterTint,1.78,5.60,.036,'water');
   for(let index=0;index<16;index++){
    const a=index*Math.PI/8;
    sphere(concrete,Math.sin(a)*5.72,1.54,Math.cos(a)*5.72,.42,.24,.42,'stone');
   }
   add('octagonal-column','stone',shade,0,2.79,0,2.95,2.05,2.95);
   add('octagonal-column','stone',edge,0,3.92,0,2.71,.28,2.71);
   box(concrete,0,6.67,0,2.78,5.40,2.78);
   box(edge,0,9.41,0,3.17,.19,3.17);
   add('pyramid','stone',concrete,0,11.55,0,1.72,4.12,1.72);
   add('cone','stone',edge,0,14.12,0,.28,1.76,.28);

   for(let side=0;side<4;side++){
    const a=side*Math.PI/2,ca=Math.cos(a),sa=Math.sin(a);
    const at=(x,y,z)=>[x*ca+z*sa,y,z*ca-x*sa];
    const turn=(angle=0)=>new T.Quaternion().setFromAxisAngle(UP,a+angle);
    const block=(color,x,y,z,w,h,d)=>add('box','stone',color,...at(x,y,z),w,h,d,turn());
    const ball=(color,x,y,z,rx,ry,rz)=>add('sphere','stone',color,...at(x,y,z),rx,ry,rz,turn());
    const line=(p,q,r,color=concrete,material='stone')=>limb(at(...p),at(...q),r,color,material);
    const star=(x,y,z,size)=>{
     for(let ray=0;ray<5;ray++){
      const angle=ray*2*Math.PI/5;
      line([x,y,z],[x+size*Math.sin(angle),y+size*Math.cos(angle),z],size*.17,starRed);
     }
    };

    // Each radial group carries a horse, Pan beneath its legs and a rider on its croup.
    block(shade,0,1.94,3.51,1.88,.34,3.37);
    ball(edge,0,3.03,3.52,.60,.66,1.44);
    line([0,3.09,4.33],[0,4.42,4.93],.41,edge);
    ball(edge,0,4.53,5.11,.35,.40,.52);
    ball(edge,0,4.37,5.52,.28,.24,.35);
    line([0,3.41,2.37],[0,2.50,2.09],.21,relief);
    for(const flank of [-1,1]){
     add('cone','stone',edge,...at(flank*.19,4.98,4.97),.106,.38,.13,turn());
     line([flank*.36,2.97,2.68],[flank*.44,2.15,2.55],.14,edge);
     line([flank*.36,3.06,4.66],[flank*.47,2.57,4.89],.15,edge);
     line([flank*.47,2.57,4.89],[flank*.49,2.24,5.16],.12,edge);
     line([flank*.29,4.23,3.18],[flank*.62,3.48,3.54],.14,concrete);
    }
    ball(concrete,0,4.33,3.17,.31,.49,.26);
    ball(edge,0,4.94,3.16,.235,.29,.24);
    line([.18,4.54,3.20],[.64,4.72,3.57],.10);
    line([.64,3.68,3.57],[.64,5.64,3.57],.034,relief);
    ball(edge,.64,5.64,3.57,.09,.16,.09);
    ball(concrete,0,2.62,4.21,.32,.38,.22);
    ball(edge,0,3.13,4.24,.18,.23,.19);

    // Youth reliefs, floral motifs and the stars run upward on the square shaft.
    block(shade,0,6.91,1.40,1.22,3.72,.12);
    add('robe','stone',edge,...at(0,6.44,1.50),.47,2.18,.29,turn());
    ball(edge,0,8.01,1.63,.22,.32,.15);
    line([-.16,7.61,1.56],[-.44,7.22,1.68],.079,edge);
    line([.15,7.63,1.56],[.46,7.82,1.67],.079,edge);
    for(const flank of [-1,1]){
     for(let band=0;band<5;band++){
      const y=4.73+band*.82;
      ball(relief,flank*.95,y,1.44,.21,.24,.13);
      line([flank*.94,y-.30,1.43],[flank*.80,y+.23,1.47],.064,edge);
     }
     add('cone','stone',edge,...at(flank*.62,11.78,1.12),.27,3.94,.29,turn());
    }
    star(0,8.77,1.51,.24);
    star(0,10.16,1.22,.19);

    // The lion spouts and paired suspended bowls occupy the diagonal faces.
    const d=Math.PI/4,dc=Math.cos(d),ds=Math.sin(d);
    const diagonal=(x,y,z)=>at(x*dc+z*ds,y,z*dc-x*ds);
    for(const [height,radius,z] of [[3.12,.69,2.77],[2.55,.89,3.29]]){
     add('sphere','stone',concrete,...diagonal(0,height,z),radius,.22,radius*.83);
     add('fountain-deck','stone',edge,...diagonal(0,height+.15,z),radius,.12,radius*.83,turn(d));
     add('fountain-deck','water',waterTint,...diagonal(0,height+.218,z),radius*.82,.024,radius*.67,turn(d));
    }
    add('sphere','stone',gildedCeramic,...diagonal(0,3.75,2.37),.34,.32,.24,turn(d));
    let previous=diagonal(0,3.64,2.56);
    for(let step=1;step<=8;step++){
     const t=step/8,point=diagonal(0,3.64-3.08*t*t,2.56+4.17*t);
     limb(previous,point,.034,waterTint,'water');previous=point;
    }
   }
  }else if(model==='oviedo-escandalera-fountain'){
   const granite=0xadaba2,lip=0xcac6b8,bowl=0x938e82,waterTint=0x66b3c5;
   const disc=(color,y,radius,height,material='stone')=>add('fountain-deck',material,color,0,y,0,radius,height,radius);
   disc(granite,.16,5.65,.32);
   disc(lip,.37,5.57,.16);
   disc(waterTint,.456,5.37,.029,'water');
   disc(granite,.65,1.18,.41);
   disc(bowl,1.04,3.32,.43);
   disc(lip,1.30,3.43,.13);
   disc(waterTint,1.36,3.26,.023,'water');
   disc(granite,1.55,.89,.35);
   disc(lip,1.81,1.59,.22);
   disc(waterTint,1.929,1.45,.028,'water');
   for(let nozzle=0;nozzle<20;nozzle++){
    const a=nozzle*Math.PI/10,dx=Math.sin(a),dz=Math.cos(a);
    let previous=[dx*2.91,1.36,dz*2.91];
    for(let segment=1;segment<=6;segment++){
     const t=segment/6,r=2.91+t*1.89;
     const point=[dx*r,1.36-.89*t+4.24*t*(1-t),dz*r];
     limb(previous,point,.027,waterTint,'water');previous=point;
    }
   }
   for(let nozzle=0;nozzle<8;nozzle++){
    const a=nozzle*Math.PI/4;
    cylinder(waterTint,Math.sin(a)*1.13,2.35,Math.cos(a)*1.13,.034,.85,'water');
   }
   cylinder(waterTint,0,2.58,0,.057,1.30,'water');
  }else if(model==='oviedo-botero-maternity'){
   const baseStone=0x797370,face=0x48534b,body=0x566257,detail=0x616b5f;
   const form=(color,x,y,z,rx,ry,rz)=>sphere(color,x,y,z,rx,ry,rz,'patina');
   box(baseStone,0,.30,0,2.32,.60,2.13);
   box(detail,0,.29,1.074,.42,.15,.034,'patina');
   box(face,0,.855,-.20,1.58,.51,1.37,'patina');
   form(body,0,1.17,-.17,.83,.58,.69);
   form(body,0,1.82,-.23,.70,.69,.54);
   form(body,.025,2.41,-.20,.38,.43,.35);
   form(face,.026,2.66,-.24,.37,.29,.34);
   form(face,.07,2.54,-.51,.26,.30,.17);
   form(detail,.034,2.41,.119,.065,.090,.073);
   for(const side of [-1,1]){
    form(body,side*.405,1.18,.36,.39,.365,.70);
    form(body,side*.495,1.01,.80,.258,.39,.263);
    form(body,side*.49,.698,.82,.269,.093,.233);
    form(body,side*.59,1.98,-.14,.27,.47,.26);
   }
   form(body,-.499,1.73,.18,.50,.22,.222);
   form(body,.34,1.59,.45,.50,.223,.217);
   form(detail,-.38,1.88,.45,.251,.32,.205);
   form(detail,-.41,2.20,.45,.193,.204,.177);
   form(detail,-.526,1.64,.66,.124,.202,.121);
   form(detail,-.25,1.63,.65,.124,.202,.121);
   form(detail,-.61,1.85,.50,.119,.17,.108);
   form(detail,-.171,1.86,.51,.159,.09,.107);
  }else if(model==='oviedo-valdes-asturcones'){
   const patina=0x414d49,shoulder=0x52615b,seam=0x65746c;
   for(const [cx,cz,a,forward] of [[-1.53,.78,.12,1],[.27,1.37,-.20,.94],[1.68,-1.56,2.46,1]]){
    const ca=Math.cos(a),sa=Math.sin(a);
    const at=(x,y,z)=>[cx+x*ca+z*sa,y*forward,cz+z*ca-x*sa];
    const block=(color,x,y,z,w,h,d,pitch=0)=>{
     const rotation=new T.Quaternion().setFromAxisAngle(UP,a);
     if(pitch)rotation.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),pitch));
     add('box','patina',color,...at(x,y,z),w,h*forward,d,rotation);
    };
    // Valdés's bronze cast follows sharply joined planes with visible seams.
    block(patina,0,.98,-.07,.60,.49,1.48);
    block(shoulder,0,1.19,-.14,.58,.16,1.25,.10);
    block(shoulder,0,1.15,.69,.46,.67,.30,.36);
    block(patina,0,1.35,.93,.38,.27,.56,-.15);
    block(shoulder,0,1.24,1.14,.35,.21,.35,-.15);
    block(seam,-.295,1.04,.08,.023,.027,1.31,.04);
    block(seam,.295,1.04,.08,.023,.027,1.31,.04);
    for(const side of [-1,1]){
     block(patina,side*.131,1.51,.71,.075,.119,.087,.08);
     for(const end of [-1,1]){
      const z=end*.53+(side>0?.055:-.035);
      limb(at(side*.224,.90,z),at(side*.240,.088,z+end*.08),.090,patina,'patina');
      block(shoulder,side*.240,.071,z+end*.076,.20,.14,.267);
     }
    }
    block(patina,0,.71,-.81,.19,.66,.195,-.16);
   }
  }else if(model==='pamplona-castillo-bandstand'){
   const sandstone=0xc2af8e,trim=0xdbcbac,roof=0xa7977e,ceiling=0x446a88,alabaster=0xe4d6b9;
   const disc=(color,y,radius,height,material='stone')=>add('fountain-deck',material,color,0,y,0,radius,height,radius);
   disc(sandstone,.18,5.40,.36);
   disc(trim,.47,5.25,.24);
   disc(sandstone,1.54,5.01,1.96);
   disc(trim,2.54,5.23,.18);
   disc(0xbbaf9c,2.65,5.12,.062);

   for(const side of [-1,1]){
    for(let step=0;step<11;step++){
     const z=side*(7.48-step*.27),rise=(step+1)*.234;
     for(const flank of [-1,1]){
      const x=flank*(1.75-step*.084);
      box(sandstone,x,rise/2,z,1.26,rise,.278);
      if(step%2===0)cylinder(trim,x+flank*.65,rise+.35,z,.085,.70);
     }
    }
    for(const flank of [-1,1])limb([flank*2.40,.90,side*7.51],[flank*1.55,3.31,side*4.76],.092,trim,'stone');
    const poolZ=side*6.40;
    add('fountain-deck','stone',sandstone,0,.225,poolZ,1.51,.45,1.35);
    add('fountain-deck','stone',trim,0,.462,poolZ,1.48,.13,1.31);
    add('fountain-deck','water',water,0,.534,poolZ,1.32,.035,1.17);
    sphere(alabaster,0,.64,side*5.77,.64,.16,.43,'stone');
    sphere(sandstone,0,.79,side*5.48,.35,.27,.28,'stone');
    limb([0,.84,side*5.34],[0,1.13,side*5.19],.19,trim,'stone');
    limb([0,.82,side*5.68],[0,.57,side*6.26],.048,water,'water');
   }

   for(let i=0;i<8;i++){
    const a=(i+.5)*Math.PI/4,next=a+Math.PI/4;
    const x=Math.sin(a)*4.54,z=Math.cos(a)*4.54;
    const nx=Math.sin(next)*4.54,nz=Math.cos(next)*4.54;
    cylinder(trim,x,2.78,z,.49,.21);
    cylinder(sandstone,x,4.72,z,.30,3.75);
    cylinder(trim,x,6.61,z,.44,.25);
    for(const side of [-1,1])sphere(trim,x+Math.cos(a)*side*.43,6.70,z-Math.sin(a)*side*.43,.158,.16,.16,'stone');
    if(i===3||i===7)continue;
    limb([x,3.51,z],[nx,3.51,nz],.096,trim,'stone');
    for(let rail=1;rail<10;rail++){
     const angle=a+rail*Math.PI/40;
     cylinder(sandstone,Math.sin(angle)*4.54,3.08,Math.cos(angle)*4.54,.094,.78);
    }
   }
   disc(ceiling,6.76,4.58,.13);
   for(let spoke=0;spoke<4;spoke++){
    const turn=new T.Quaternion().setFromAxisAngle(UP,spoke*Math.PI/4);
    add('box','stone',0xbfa37c,0,6.69,0,.081,.015,6.42,turn);
   }
   disc(sandstone,6.93,5.75,.27);
   disc(trim,7.10,6.55,.13);
   disc(roof,7.21,6.39,.15);
   add('pimpri-pavilion-dome','stone',roof,0,7.23,0,6.18,1.18,6.18);
   for(let crest=0;crest<8;crest++){
    const a=(crest+.5)*Math.PI/4;
    const turn=new T.Quaternion().setFromAxisAngle(UP,a);
    add('pediment','stone',trim,Math.sin(a)*6.18,7.37,Math.cos(a)*6.18,.50,.29,.21,turn);
   }
  }else if(model==='vitoria-battle-memorial'){
   const masonry=0xc4b297,trim=0xd2c5ad,shade=0xad9980,cast=0x4e6558;
   for(let step=0;step<3;step++)box(step===2?trim:masonry,0,.15+step*.30,0,7.8-step*.69,.30,7.8-step*.69);
   add('vitoria-shaft','stone',masonry,0,3.43,0,5.71,5.06,5.71);
   box(trim,0,6.02,0,4.09,.30,3.94);
   add('vitoria-shaft','stone',masonry,0,9.67,0,3.16,7.20,3.12);
   box(trim,0,13.32,0,2.40,.25,2.37);
   box(shade,0,3.29,2.48,2.94,.28,.90);
   box(0x776e5e,0,6.68,1.57,2.27,.51,.07);
   box(trim,0,7.39,1.39,2.47,.21,.78);

   for(const side of [-1,1]){
    human(side*1.76,1.02,2.68,.89,'classical',masonry);
    human(side*1.13,7.01,.81,.87,'classical',trim);
    sphere(masonry,side*2.38,2.59,-.48,.37,.69,.38,'stone');
    sphere(masonry,side*2.52,2.74,1.11,.34,.68,.29,'stone');
   }
   human(0,7.49,1.43,1.04,'civil',trim);
   human(-.73,2.79,-2.45,.76,'classical',trim);
   sphere(shade,.70,2.37,-2.41,1.05,.40,.45,'stone');
   sphere(masonry,1.45,2.51,-2.53,.41,.37,.37,'stone');

   const horseStart=parts.length,turn=new T.Quaternion().setFromAxisAngle(UP,Math.PI/2);
   horse();
   for(const part of parts.slice(horseStart)){
    const x=part.x;
    part.x=part.z*.70;
    part.y=3.40+part.y*.70;
    part.z=2.35-x*.70;
    part.sx*=.70;part.sy*=.70;part.sz*=.70;
    part.rotation=part.rotation?turn.clone().multiply(part.rotation):turn;
   }

   const victoryY=13.37;
   add('robe','patina',cast,0,victoryY+.92,-.02,.53,1.81,.36);
   sphere(cast,0,victoryY+1.89,0,.23,.29,.21,'patina');
   limb([-.24,victoryY+1.61,0],[-.67,victoryY+2.25,.11],.099,cast,'patina');
   limb([.23,victoryY+1.62,0],[.81,victoryY+1.85,.15],.085,cast,'patina');
   limb([-.68,victoryY+.36,.11],[-.68,16.96,.11],.056,cast,'patina');
   add('cape','patina',cast,-.21,16.02,.12,.98,1.32,.20);
   limb([.78,victoryY+1.82,.16],[1.32,victoryY+2.10,.17],.043,cast,'patina');
   for(const side of [-1,1]){
    const wingBase=[side*.18,victoryY+1.22,-.18];
    for(let feather=0;feather<7;feather++){
     const spread=feather/6;
     limb(wingBase,[side*(.96+spread*.59),victoryY+1.38+spread*1.12,-.30-spread*.16],.105-spread*.042,cast,'patina');
    }
   }
  }else if(model==='vitoria-green-topiary'){
   const glyphs={
    V:[[0,1,.5,0],[.5,0,1,1]],I:[[.5,0,.5,1]],
    T:[[0,1,1,1],[.5,0,.5,1]],O:[[0,.13,0,.87],[0,.87,.15,1],[.15,1,.85,1],[.85,1,1,.87],[1,.87,1,.13],[1,.13,.85,0],[.85,0,.15,0],[.15,0,0,.13]],
    R:[[0,0,0,1],[0,1,.77,1],[.77,1,1,.80],[1,.80,.79,.56],[.79,.56,0,.56],[.48,.56,1,0]],
    A:[[0,0,.49,1],[.49,1,1,0],[.20,.36,.80,.36]],
    G:[[.89,.92,.72,1],[.72,1,.17,1],[.17,1,0,.80],[0,.80,0,.16],[0,.16,.17,0],[.17,0,.84,0],[.84,0,1,.18],[1,.18,1,.49],[1,.49,.60,.49]],
    S:[[1,1,.14,1],[.14,1,0,.73],[0,.73,.29,.50],[.29,.50,.81,.48],[.81,.48,1,.23],[1,.23,.83,0],[.83,0,0,0]],
    E:[[1,1,0,1],[0,1,0,0],[0,.51,.78,.51],[0,0,1,0]],Z:[[0,1,1,1],[1,1,0,0],[0,0,1,0]],'!':[[.5,1,.5,.29],[.5,.035,.5,0]],
   };
   const leaves=[0x496e3d,0x557c43,0x5f8645,0x5b7443],axis=new T.Vector3(0,0,1);
   box(0x675348,0,.174,0,7,.348,1.32);
   box(0x675348,0,.39,-.15,6.54,.09,.52);
   box(0x675348,0,1.64,-.17,5.87,.13,.28);
   for(const side of [-1,1])box(0x675348,side*2.81,.98,-.24,.14,1.30,.14);
   for(const [row,letters] of ['GASTEIZ!','VITORIA'].entries()){
    const advance=.82,base=.48+row*1.29,height=1.10,width=.568;
    for(let letter=0;letter<letters.length;letter++){
     const left=(letter-(letters.length-1)/2)*advance-width/2;
     const strokes=glyphs[letters[letter]];
     for(const [stroke,[ax,ay,bx,by]] of strokes.entries()){
      const dx=(bx-ax)*width,dy=(by-ay)*height;
      const turn=new T.Quaternion().setFromAxisAngle(axis,Math.atan2(dy,dx));
      const faceOffset=(stroke-(strokes.length-1)/2)*.004;
      add('box','stone',leaves[(letter+stroke)%leaves.length],left+(ax+bx)*width/2,base+(ay+by)*height/2,faceOffset,Math.hypot(dx,dy)+.16,.175,.40,turn);
     }
    }
   }
  }else if(model==='valladolid-conde-ansurez'){
   const limestone=0xbeb296,pale=0xd0c4ab,granite=0x8b8175,relief=0x435c51;
   for(const [w,y,h,c] of [[4.0,.16,.32,granite],[3.65,.44,.24,limestone],[3.33,.67,.22,pale],[3.04,1.17,.78,limestone],[2.62,2.74,2.36,limestone],[2.84,4.05,.26,pale],[2.30,4.63,.92,limestone],[2.52,5.22,.24,pale],[1.88,5.55,.42,limestone],[1.11,5.88,.24,granite]]){
    box(c,0,y,0,w,h,w);
   }
   for(const sign of [-1,1]){
    const sideAngle=sign*Math.PI/2;
    const turn=new T.Quaternion().setFromAxisAngle(UP,sideAngle);
    for(const side of [-1,1]){
     cylinder(pale,side*.99,2.76,sign*1.29,.117,1.96);
     cylinder(pale,sign*1.29,2.76,side*.99,.117,1.96);
     box(pale,side*.99,3.76,sign*1.29,.34,.18,.38);
     box(pale,sign*1.29,3.76,side*.99,.38,.18,.34);
    }
    box(relief,0,2.82,sign*1.332,1.62,1.53,.07,'patina');
    add('box','patina',relief,sign*1.332,2.82,0,1.62,1.53,.07,turn);
   }
   for(let row=0;row<4;row++)box(0x698077,0,3.17-row*.25,1.374,1.16-row*.06,.046,.020,'patina');
   human(0,6,0,1,'ansurez-banner',0x465e54);
  }else if(model==='valladolid-casa-consistorial'){
   const brick=0xa17361,light=0xd5c7ac,shadow=0x504c44,iron=0x494942,roof=0x706c60;
   box(brick,0,7.0,-.68,40.79,14.0,4.39);
   for(const [h,w,d,c] of [[.27,40.79,.92,light],[5.10,40.77,.65,light],[9.63,40.77,.36,light],[13.22,40.79,1.01,light],[14.20,40.74,.98,light]])box(c,0,h,1.61,w,.44,d);
   box(roof,0,14.57,-.48,40.58,.52,4.58);
   const arch=(x,y,z,w,h)=>{
    add('barcelona-arched-door','stone',light,x,y,z,w+.57,h+.61,.22);
    add('barcelona-arched-door','stone',shadow,x,y,z+.15,w,h,.13);
   };
   for(let bay=-3;bay<=3;bay++){
    const x=bay*4.20;
    arch(x,2.55,1.63,2.81,4.48);
    arch(x,7.46,1.63,1.97,3.28);
    box(shadow,x,11.40,1.69,1.42,1.84,.18);
    box(light,x,10.48,1.81,1.84,.18,.42);
    if(bay<3)box(light,x+2.10,2.66,1.77,.49,4.23,.64);
   }
   box(light,0,5.44,2.15,26.6,.51,1.37);
   box(iron,0,6.29,2.69,26.5,.12,.13);
   for(let rail=-13;rail<=13;rail++)box(iron,rail*.99,6.06,2.68,.07,.49,.10);
   for(const side of [-1,1]){
    const x=side*17.11;
    box(light,x,8.18,-.10,6.56,16.36,5.66);
    for(const h of [3.20,7.49,11.62,15.00])arch(x,h,2.80,1.50,h===3.20?3.20:2.15);
    for(const offset of [-2.57,2.57])box(light,x+offset,8.64,2.80,.68,15.3,.22);
    box(light,x,16.32,-.10,6.88,.45,5.77);
    add('pediment','stone',roof,x,17.45,-.10,6.36,2.08,5.45);
    box(light,x,18.67,-.10,1.46,.50,1.36);
    add('cone','stone',light,x,19.50,-.10,.47,1.19,.47);
   }
   box(light,0,16.16,-.18,8.30,5.78,5.66);
   add('pediment','stone',light,0,15.25,2.45,7.46,1.96,.71);
   const faceClock = new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('cylinder','stone',shadow,0,17.64,2.72,1.18,.18,1.18,faceClock);
   add('cylinder','stone',light,0,17.64,2.83,1.03,.08,1.03,faceClock);
   limb([0,17.64,2.90],[.67,17.64,2.90],.047,iron);
   limb([0,17.64,2.90],[-.18,18.27,2.90],.043,iron);
   box(light,0,19.37,-.18,8.68,.50,5.76);
   for(const side of [-1,1]){
    box(light,side*1.44,21.20,-.01,.47,3.24,.64);
    box(light,side*1.44,21.20,-1.11,.47,3.24,.64);
    add('cone','stone',light,side*4.06,20.06,2.06,.27,1.17,.27);
   }
   cylinder(0x9c7d53,0,21.19,-.50,.62,1.09,'metal');
   limb([0,21.72,-.50],[0,22.68,-.50],.13,iron);
   box(roof,0,22.91,-.50,3.76,.55,2.79);
   add('pediment','stone',roof,0,23.78,-.50,3.66,1.21,2.64);
   limb([0,24.19,-.50],[0,26,-.50],.085,iron);
   limb([-.45,25.62,-.50],[.45,25.62,-.50],.055,iron);
  }else if(model==='gijon-plaza-mayor-lantern'){
   const iron=0x363b36,trim=0x56605a,granite=0x9c938a,glass=0xd4cbb1;
   cylinder(granite,0,.17,0,1.13,.34);
   cylinder(granite,0,.41,0,.87,.14);
   cylinder(iron,0,.58,0,.43,.24,'metal');
   cylinder(iron,0,1.11,0,.26,.86,'metal');
   cylinder(trim,0,1.61,0,.31,.14,'metal');
   cylinder(iron,0,3.63,0,.138,3.96,'metal');
   cylinder(trim,0,4.88,0,.20,.22,'metal');
   const lantern=(x,y,z)=>{
    box(iron,x,y-.36,z,.46,.12,.46,'metal');
    box(glass,x,y-.01,z,.35,.62,.35,'glass');
    for(const side of [-1,1])for(const cross of [-1,1]){
     limb([x+side*.17,y-.31,z+cross*.17],[x+side*.25,y+.34,z+cross*.25],.025,iron);
    }
    for(const [h,w] of [[.32,.51],[.39,.47],[.50,.33],[.56,.23]])box(iron,x,y+h,z,w,.10,w,'metal');
    sphere(trim,x,y+.62,z,.06,.06,.06);
   };
   lantern(0,5.94,0);
   for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5]){
    const at=(radius,height)=>[Math.sin(a)*radius,height,Math.cos(a)*radius];
    const arm=[at(.10,4.97),at(.42,4.81),at(.70,4.82),at(.94,5.01),at(1.04,5.22)];
    for(let i=1;i<arm.length;i++)limb(arm[i-1],arm[i],.044,iron);
    lantern(...at(1.04,5.58));
   }
  }else if(model==='gijon-casa-consistorial'){
   const sand=0xc4af92,trim=0xddccaf,shadow=0x524c43,slate=0x605952,glass=0x6b7d80;
   box(sand,0,5.94,-.56,20.51,11.88,4.44);
   box(slate,0,12.10,-.44,20.48,.43,4.66);
   box(trim,0,.26,1.65,20.49,.45,.75);
   const arch=(x,y,w,h,z)=>{
    add('barcelona-arched-door','stone',trim,x,y,z,w+.68,h+.54,.27);
    add('barcelona-arched-door','stone',shadow,x,y,z+.18,w,h,.14);
   };
   for(const x of [-3.55,0,3.55])arch(x,2.30,2.51,4.24,1.65);
   for(const x of [-7.85,7.85]){
    box(trim,x,2.61,1.69,2.10,2.19,.25);
    box(shadow,x,2.59,1.85,1.61,1.77,.17);
    for(const a of [-.47,0,.47])box(trim,x+a,2.59,1.96,.05,1.74,.07);
   }
   for(const [y,w,d] of [[4.76,20.51,.63],[5.06,20.51,.55],[8.39,20.51,.36],[11.34,20.51,.53],[11.76,20.51,.84]])box(trim,0,y,1.68,w,.26,d);
   for(const y of [6.68,9.79])for(const x of [-7.85,-3.55,0,3.55,7.85]){
    const width=y>8?1.36:1.74;
    box(trim,x,y,1.63,width+.27,2.20,.24);
    box(shadow,x,y,1.81,width,1.88,.13);
    box(glass,x,y,1.89,width-.18,1.64,.08,'glass');
    box(shadow,x,y,1.95,.055,1.76,.062);
    box(trim,x,y-1.07,1.82,width+.41,.18,.64);
   }
   for(const x of [-5.43,-1.78,1.78,5.43]){
    box(trim,x,2.43,1.85,.53,4.20,.55);
    box(trim,x,4.36,1.92,.72,.16,.69);
   }
   box(trim,0,5.15,2.05,10.62,.29,1.50);
   box(trim,0,5.93,2.75,10.61,.15,.18);
   for(let i=-8;i<=8;i++)cylinder(trim,i*.61,5.58,2.74,.056,.57);
   for(const x of [-9.65,-5.81,5.81,9.65])box(trim,x,9.93,1.72,.31,3.34,.35);
   box(trim,0,12.08,1.82,8.10,.55,1.62);
   add('pediment','stone',trim,0,13.15,1.73,7.97,2.06,1.82);
   const dialTurn=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('cylinder','stone',shadow,0,12.95,2.66,.74,.16,.74,dialTurn);
   add('cylinder','stone',trim,0,12.95,2.75,.65,.09,.65,dialTurn);
   limb([0,12.95,2.80],[.37,13.12,2.80],.036,shadow);
   limb([0,12.95,2.80],[-.055,13.41,2.80],.028,shadow);
   for(const x of [-9.34,-4.12,0,4.12,9.34]){
    box(trim,x,x===0?14.20:12.01,1.90,.54,.35,.62);
    const y=x===0?14.37:12.18;
    cylinder(trim,x,y+.15,1.90,.145,.30);
    sphere(trim,x,y+.39,1.90,.265,.29,.254,'stone');
    cylinder(trim,x,y+.65,1.90,.174,.11);
    sphere(trim,x,y+.77,1.90,.125,.125,.124,'stone');
   }
  }else if(model==='murcia-belluga-cathedral'){
   const limestone=0xd0bd9f,trim=0xe3d2af,shadow=0x746b5a,door=0x494239,roof=0xa49171;
   box(limestone,0,11.25,-1.0,41.7,22.5,6.3);
   box(limestone,0,26.7,-.65,30.5,12.4,5.52);
   box(limestone,0,33.85,-.7,18.8,14.7,5.1);
   box(limestone,0,43.1,-.52,13.4,5.2,4.5);
   add('pediment','stone',trim,0,46.4,1.47,15.95,4.6,2.37);
   box(trim,0,47.0,-.5,5.25,2.3,3.6);
   add('robe','stone',limestone,0,50.35,-.22,1.22,4.44,1.07);
   sphere(trim,0,52.94,-.23,.57,.36,.50,'stone');
   for(const direction of [-1,1])limb([0,52.95,-.2],[direction*.53,53.98,-.2],.10,trim,'stone');

   const portal=(x,width,height)=>{
    add('barcelona-arched-door','stone',trim,x,height*.50+.34,2.57,width+1.1,height+.72,.42);
    add('barcelona-arched-door','stone',door,x,height*.50+.34,2.81,width,height,.18);
    box(shadow,x,height*.36,2.928,.12,height*.72,.08);
    for(const side of [-1,1])for(let panel=0;panel<3;panel++){
     box(roof,x+side*width*.238,1.60+panel*height*.184,2.93,width*.36,.12,.086);
    }
    for(const side of [-1,1])box(trim,x+side*(width/2+.53),height*.32,2.70,.55,height*.65,.64);
   };
   portal(0,7.22,12.75);
   for(const x of [-13.2,13.2])portal(x,4.84,9.90);
   for(const [y,w,z] of [[.46,42.12,2.19],[2.15,41.98,2.20],[18.22,41.94,2.53],[20.80,41.9,2.59],[23.32,35.3,2.33],[31.95,31.2,2.32],[39.1,20.3,2.12],[44.22,14.7,2.07]]){
    box(trim,0,y,z,w,y>15?.66:.49,y>15?2.22:1.22);
   }
   for(const side of [-1,1]){
    for(const [x,y,r,h] of [[5.4,10.65,.80,15.4],[9.08,12.06,.75,15.58],[17.9,10.19,.71,15.5],[18.94,12.16,.52,12.6],[4.92,30.47,.73,13.81],[8.18,32.87,.65,13.14],[13.24,29.01,.68,10.69]]){
     cylinder(limestone,side*x,y,2.52,r,h);
     box(trim,side*x,y-h/2-.21,2.52,r*2.8,.48,r*2.3);
     box(trim,side*x,y+h/2+.11,2.52,r*2.66,.61,r*2.27);
    }
    for(const [x,y,h] of [[7.6,6.46,3.3],[10.3,13.56,2.55],[18.1,22.19,3.26],[14.49,24.61,2.79],[6.94,24.77,3.83],[12.03,32.9,3.49],[7.67,38.51,3.20]]){
     add('barcelona-arched-door','stone',shadow,side*x,y+h*.61,2.04,h*.60,h*1.29,.21);
     box(trim,side*x,y-.15,2.46,h*.72,.24,1.08);
     human(side*x,y,2.43,h/2.58,'classical',marble);
    }
    const curl=[[side*13.5,33.26,2.03],[side*11.9,38.23,2.03],[side*9.9,41.9,2.03],[side*7.8,43.53,2.03]];
    for(let i=1;i<curl.length;i++)limb(curl[i-1],curl[i],.38,trim,'stone');
   }
   add('barcelona-arched-door','stone',shadow,0,27.4,2.23,5.42,8.13,.24);
   human(0,23.01,2.52,2.64,'classical',marble);
   add('pediment','stone',trim,0,33.82,2.14,9.13,3.15,1.67);
  }else if(model==='murcia-belluga-moneo'){
   const limestone=0xc5ad84,trim=0xd5bc93,shadow=0x584f42,glass=0x687d7b;
   box(limestone,0,7.80,-.65,15.71,15.60,4.69);
   box(shadow,0,7.37,1.72,14.36,13.43,.14);
   for(const [row,[base,height,posts]] of [
    [.80,2.98,[-7.18,-5.20,-4.42,-2.78,-.62,1.22,2.72,4.15,6.71,7.19]],
    [3.86,2.72,[-7.18,-6.06,-4.92,-3.46,-1.25,1.68,2.67,3.66,5.22,7.19]],
    [6.72,2.67,[-7.18,-6.39,-4.91,-3.91,-2.66,-1.63,.58,1.67,4.22,5.18,7.19]],
    [9.50,2.62,[-7.18,-5.21,-4.31,-2.88,-.37,1.46,2.53,4.92,5.81,7.19]],
    [12.27,2.58,[-7.18,-5.24,-3.90,-2.82,-1.68,.28,2.60,3.55,5.28,7.19]],
   ].entries()){
    for(const [column,x] of posts.entries()){
     box((row+column)%4===0?trim:limestone,x,base+height/2,2.40,column%4===1?.71:.43,height,1.17);
     if(column<posts.length-1&&posts[column+1]-x>1.17){
      const center=(x+posts[column+1])/2;
      box(glass,center,base+height*.49,1.91,posts[column+1]-x-.48,height*.81,.075,'glass');
     }
    }
    box(trim,0,base-.12,2.38,15.71,.25,1.10);
   }
   box(trim,0,15.29,2.17,15.71,.62,1.66);
   box(limestone,0,.37,2.52,15.71,.74,.97);
   box(shadow,4.74,6.88,2.02,4.10,2.08,.09);
   box(glass,4.74,6.91,2.11,3.91,1.87,.12,'glass');
  }else if(model==='murcia-belluga-palace'){
   const stucco=0xaa5146,shade=0x904941,trim=0xd8c0a5,roof=0x925b4f,shutter=0x536769,iron=0x413e38;
   box(stucco,0,7.10,-.56,49.46,14.2,5.2);
   for(const h of [.26,1.60,4.16,8.66,13.52,14.12])box(trim,0,h,2.12,49.46,h>13?.34:.14,.41);
   box(roof,0,14.44,-.43,49.46,.64,5.55);
   for(const x of [-24.39,-18.2,-6.0,6.0,18.2,24.39])box(shade,x,7.12,2.091,.56,14.1,.28);
   for(const x of [-18.4,-13.9,-9.0,-4.6,4.6,9.0,13.9,18.4,22.0,-22.0]){
    for(const [y,height] of [[2.58,1.58],[6.26,2.87],[10.54,2.38]]){
     if(y<3&&Math.abs(x)===18.4)continue;
     box(trim,x,y,2.11,1.87,height+.46,.27);
     box(shutter,x,y,2.27,1.54,height,.13,'wood');
     for(const side of [-1,1])box(iron,x+side*.40,y,2.36,.042,height*.97,.052,'metal');
     if(y<3)continue;
     const railY=y-height/2+.41;
     box(trim,x,railY-.48,2.63,2.22,.19,.97);
     box(iron,x,railY+.16,3.075,2.15,.065,.065,'metal');
     for(let rod=0;rod<8;rod++)box(iron,x-.95+rod*.271,railY-.10,3.076,.045,.51,.045,'metal');
    }
   }
   for(const [x,width,height] of [[0,4.43,5.73],[-18.4,2.43,3.62],[18.4,2.43,3.62]]){
    add('barcelona-arched-door','stone',trim,x,height/2+.23,2.15,width+.79,height+.55,.32);
    add('barcelona-arched-door','stone',iron,x,height/2+.21,2.34,width,height,.16);
    for(const side of [-1,1])box(trim,x+side*(width/2+.43),height*.36,2.38,.48,height*.71,.64);
   }
   box(trim,0,7.01,2.49,3.84,3.16,.79);
   box(shutter,0,7.01,2.91,2.17,2.75,.15,'wood');
   box(iron,0,6.20,3.22,3.67,.09,.055,'metal');
   for(let rod=0;rod<11;rod++)box(iron,-1.72+rod*.344,5.90,3.22,.049,.58,.048,'metal');
   add('pediment','stone',trim,0,10.23,2.46,3.03,2.01,.64);
   sphere(roof,0,10.16,2.86,.72,.82,.10,'stone');
   for(const side of [-1,1])limb([side*.51,9.59,2.92],[side*.85,10.72,2.95],.14,trim,'stone');
  }else if(model==='barcelona-generalitat-facade'||model==='barcelona-city-hall-facade'){
   const hall=model==='barcelona-city-hall-facade';
   const masonry=hall?0xc4b6a0:0xbcb09d,trim=hall?0xd4c5ab:0xcbbaa1,shadow=0x5b5247,wood=0x514635,iron=0x4b4c47;
   const width=hall?46.7:36.55,height=hall?15.2:17.25,front=2.15;
   box(masonry,0,height/2,-.4,width,height,5.10);
   for(const y of [.22,5.65,11.75,height-.23])box(trim,0,y,2.13,width,.33,.45);
   const opening=(x,y,w,h)=>{
    box(trim,x,y,front+.07,w+.38,h+.32,.23);
    box(shadow,x,y,front+.20,w,h,.055);
    box(wood,x,y,front+.24,w*.88,h*.89,.058);
    box(masonry,x,y,front+.29,.065,h*.88,.040);
    box(trim,x,y-h/2-.14,front+.23,w+.51,.19,.41);
   };
   const door=(x,w,h)=>{
    add('masonry-arch','stone',trim,x,h*.595,front+.10,w+1.10,h*1.19,.32);
    add('barcelona-arched-door','stone',wood,x,h*.50,front+.28,w,h,.075);
    box(shadow,x,h*.47,front+.33,.060,h*.89,.036);
   };
   const columns=(locations,y,h,r,color)=>{
    for(const x of locations){
     box(trim,x,y+.16,2.75,r*2.50,.32,r*2.40);
     cylinder(color,x,y+h/2,2.75,r,h-.45);
     box(trim,x,y+h-.12,2.75,r*2.46,.35,r*2.40);
    }
   };
   if(hall){
    for(const x of [-19.2,-14.6,-9.9,9.9,14.6,19.2]){
     opening(x,2.9,1.60,3.05);opening(x,8.65,1.70,3.19);opening(x,13.15,1.48,1.55);
    }
    door(0,4.0,5.0);
    for(const x of [-5.45,5.45]){
     add('masonry-arch','stone',trim,x,2.88,front+.14,2.92,4.80,.38);
     box(shadow,x,2.08,front+.18,1.76,2.82,.06);
     box(trim,x,.91,front+.40,1.55,.45,.65);
     human(x,1.11,front+.43,.93,'classical',marble);
    }
    box(trim,0,5.81,2.49,14.7,.38,.94);
    columns([-6.01,-2.03,2.03,6.01],6.00,7.65, .43, trim);
    for(const x of [-6.01,-2.03,2.03,6.01])for(const side of [-1,1])sphere(trim,x+side*.38,13.53,2.89,.14,.15,.13,'stone');
    for(const x of [-3.96,0,3.96])opening(x,8.95,1.65,3.45);
    box(trim,0,14.04,2.57,14.3,.83,.94);
    sphere(trim,0,15.81,2.30,.81,.92,.24,'stone');
    sphere(shadow,0,12.67,front+.23,.64,.64,.15,'stone');
    limb([0,12.67,front+.39],[.21,12.80,front+.39],.043,marble,'stone');
    limb([0,12.67,front+.39],[-.12,12.93,front+.39],.041,marble,'stone');
   }else{
    for(const x of [-14.65,-10.72,-6.79,6.79,10.72,14.65]){
     opening(x,3.05,1.55,2.95);opening(x,9.12,1.81,3.53);opening(x,14.53,1.52,2.62);
     add('pediment','stone',trim,x,11.17,front+.20,2.48,.57,.31);
     box(iron,x,7.69,2.43,2.24,.58,.07,'metal');
    }
    door(0,4.6,5.21);
    columns([-5.38,-3.56,3.56,5.38],.29,5.42,.34,0x8a8981);
    box(trim,0,5.83,2.55,12.78,.66,1.10);
    add('masonry-arch','stone',trim,0,9.38,2.35,4.97,5.28,.44);
    box(shadow,0,8.42,2.46,2.98,3.13,.06);
    // The shallow niche shows Sant Jordi and the horse from the square.
    sphere(marble,-.14,8.25,2.67,.88,.28,.19,'stone');
    limb([.36,8.27,2.68],[.68,8.90,2.68],.20,marble,'stone');
    sphere(marble,.75,8.90,2.67,.23,.16,.14,'stone');
    for(const x of [-.67,.36])limb([x,8.16,2.66],[x+.26,7.77,2.67],.10,marble,'stone');
    limb([-.16,8.45,2.69],[-.21,9.16,2.69],.13,marble,'stone');
    sphere(marble,-.22,9.29,2.69,.15,.19,.14,'stone');
    limb([-.24,8.86,2.72],[.96,7.76,2.74],.048,marble,'stone');
    box(trim,0,17.69,0,width,.28,5.18);
    for(let i=-14;i<=14;i++)box(trim,i*1.18,17.96,2.30,.31,.53,.33);
    box(trim,0,18.32,2.29,width,.16,.47);
   }
  }else if(model==='solsona-ca-aguilar-porch'){
   const masonry=0xb3a494,trim=0xd0bfa7,shade=0x6c6258,wood=0x665446,iron=0x454442;
   // The public front faces the square from the north side of this façade.
   box(masonry,0,1.65,1.15,8.7,3.3,1.8);
   box(masonry,0,6.23,0,8.68,6.3,4.24);
   for(const x of [-3.82,-1.27,1.27,3.82]){
    box(trim,x,.14,-1.74,.78,.28,.79);
    box(masonry,x,1.79,-1.74,.52,3.14,.56);
    box(trim,x,3.34,-1.74,.72,.23,.74);
   }
   box(wood,0,3.48,-1.73,8.85,.3,.58);
   box(trim,0,3.72,-2.12,8.85,.22,.25);
   add('masonry-arch','stone',trim,0,1.99,.2,2.1,1.27,.16);
   box(wood,0,.84,.19,1.24,1.68,.12);
   for(const y of [5.32,7.86])for(const x of [-2.68,0,2.68]){
    box(trim,x,y,-2.15,1.22,1.85,.14);
    box(shade,x,y,-2.23,.93,1.55,.08);
    if(y===5.32){
     box(trim,x,y-.94,-2.25,1.67,.17,.34);
     box(iron,x,y-.54,-2.42,1.53,.065,.052,'metal');
     for(const offset of [-.65,-.32,0,.32,.65])box(iron,x+offset,y-.75,-2.42,.04,.38,.04,'metal');
    }
   }
   box(wood,0,9.38,0,8.85,.29,4.4);
  }else if(model==='ordino-comunidor'){
   const masonry=0xa8947b,archStone=0xb3a089,slate=0x535659,iron=0x393b3a;
   const eastPier=1.66,southPier=1.88;
   box(archStone,0,.09,0,4.12,.18,4.53);
   for(const side of [-1,1]){
    for(const corner of [-1,1]){
     box(masonry,side*eastPier,.79,corner*southPier,.73,1.38,.73);
     box(archStone,side*eastPier,1.50,corner*southPier,.78,.16,.78);
    }
    add('masonry-arch','stone',masonry,0,2.19,side*southPier,4.04,1.35,.48);
    const turn=new T.Quaternion().setFromAxisAngle(UP,Math.PI/2);
    add('masonry-arch','stone',masonry,side*eastPier,2.19,0,4.48,1.35,.48,turn);
   }
   box(archStone,0,2.87,0,4.22,.15,4.65);
   add('ordino-slate-roof','stone',slate,0,2.94,0,4.35,1.33,4.80);
   box(iron,0,4.55,0,.065,.58,.065,'metal');
   box(iron,0,4.63,0,.44,.062,.065,'metal');
  }else if(model==='andorra-casa-de-la-vall'){
   const granite=0x827a6d,trim=0xa79982,slate=0x454c52,shutter=0x514435;
   box(granite,0,4.90,0,19.4,9.8,15.9);
   box(trim,0,9.82,0,19.6,.25,16.1);
   add('hip-roof','stone',slate,0,9.96,0,20.6,4.12,17.2);
   for(const y of [4.45,7.43])for(const x of [-6.5,0,6.5]){
    box(trim,x,y,8.02,1.76,1.78,.21);
    box(shutter,x,y,8.16,1.22,1.35,.08,'wood');
    box(granite,x,y,8.22,.08,1.35,.03);
   }
   for(const y of [4.45,7.43])for(const z of [-5.14,0,5.14]){
    box(trim,-9.73,y,z,.20,1.51,1.48);
    box(shutter,-9.86,y,z,.08,1.10,1.03,'wood');
   }
   box(trim,-1.07,1.13,8.04,2.33,2.25,.23);
   box(shutter,-1.07,1.10,8.19,1.62,2.20,.12,'wood');
   sphere(shutter,-1.07,2.12,8.20,.81,.52,.08,'wood');
   cylinder(granite,8.83,7.92,7.42,1.06,4.3);
   cylinder(trim,8.83,10.11,7.42,1.14,.20);
   add('cone','stone',slate,8.83,11.22,7.42,1.18,2.19,1.18);
  }else if(model==='cuenca-calderon-monument'){
   const limestone=0xb2a696,darkBronze=0x4c5245;
   box(limestone,0,.20,0,3.90,.40,3.90);
   box(limestone,0,.53,0,3.45,.26,3.45);
   box(limestone,0,.80,0,2.85,.28,2.85);
   box(limestone,0,2.03,0,1.92,2.20,1.92);
   box(limestone,0,3.22,0,2.42,.23,2.42);
   plaque(2.05,1.16,.975);
   human(0,3.34,0,1.20,'civil',darkBronze);
  }else if(model==='cuenca-calderon-glorieta'){
   const iron=0x294737,trim=0xa8945f,deck=0xb6ab96;
   add('bandstand-deck','stone',deck,0,.18,0,3.55,.36,3.55);
   add('bandstand-roof','metal',iron,0,3.32,0,3.60,1.2,3.60);
   add('bandstand-deck','metal',iron,0,3.34,0,3.53,.16,3.53);
   sphere(trim,0,4.59,0,.12,.22,.12,'metal');
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4,x=Math.cos(angle)*3.04,z=Math.sin(angle)*3.04;
    cylinder(iron,x,1.86,z,.105,2.96,'metal');
    cylinder(trim,x,3.19,z,.15,.12,'metal');
    for(const offset of [-.17,.17]){
     const a=angle+offset;
     limb([x,2.78,z],[Math.cos(a)*3.15,3.25,Math.sin(a)*3.15],.045,iron);
    }
   }
  }else if(model==='tabaco-plaza-gazebo'){
   const pale=0xe2d0b9,greenRoof=0x2f6858,redTrim=0x963e34;
   cylinder(pale,0,.13,0,2.93,.26);
   cylinder(redTrim,0,3.13,0,3.20,.27);
   add('cone','stone',greenRoof,0,3.87,0,3.13,1.32,3.13);
   cylinder(greenRoof,0,4.60,0,.18,.39);
   for(let i=0;i<6;i++){
    const angle=i*Math.PI/3,x=Math.cos(angle)*2.28,z=Math.sin(angle)*2.28;
    cylinder(pale,x,1.66,z,.17,2.80);
    cylinder(pale,x,.39,z,.27,.24);
    cylinder(pale,x,2.92,z,.23,.17);
   }
  }else if(model==='nankinmachi-azumaya'){
   const vermilion=0x9c3630,darkRed=0x702f29,brass=0xc49a4a,granite=0x9d9290;
   add('hex','stone',granite,0,.13,0,1.82,.26,1.82);
   add('hex','stone',0xc5b4a5,0,.27,0,1.70,.09,1.70);
   add('hex','patina',darkRed,0,3.04,0,1.73,.28,1.73);
   const at=(radius,y,angle)=>[Math.sin(angle)*radius,y,Math.cos(angle)*radius];
   for(let side=0;side<6;side++){
    const angle=side*Math.PI/3,next=angle+Math.PI/3;
    const [x,,z]=at(1.56,0,angle);
    cylinder(darkRed,x,.40,z,.20,.18,'patina');
    cylinder(vermilion,x,1.75,z,.13,2.62,'patina');
    cylinder(brass,x,2.97,z,.18,.15,'metal');
    limb(at(1.57,3.04,angle),at(1.57,3.04,next),.105,vermilion,'patina');
    limb(at(1.59,3.16,angle),at(1.59,3.16,next),.038,brass,'metal');
   }
   for(const [y,radius,height] of [[3.16,2.45,1.30],[4.35,1.61,.96],[5.20,1.11,1.05]]){
    add('azumaya-eaves','patina',brass,0,y,0,radius,height,radius);
    add('hex','patina',vermilion,0,y-.04,0,radius*.76,.14,radius*.76);
    for(let side=0;side<6;side++){
     const angle=side*Math.PI/3;
     limb(at(radius*.71,y+height*.34,angle),at(radius*.98,y+height*.12,angle),.044,darkRed,'patina');
     sphere(brass,...at(radius*.96,y+height*.17,angle),.072,.11,.072);
    }
   }
   cylinder(darkRed,0,6.27,0,.14,.23,'patina');
   sphere(brass,0,6.45,0,.13,.15,.13);
  }else if(model==='tijuana-millennium-arch'){
   const stainless=0xcecfcd, cable=0x858c8a, baseStone=0xa29684;
   add('tijuana-arch-tube','metal',stainless,0,0,0,1,1,1);
   for(const side of [-1,1]){
    box(baseStone,side*15.60,.25,0,2.30,.50,3.30);
    for(const [x,y,u,v] of [[4.7,57.2,3.9,29.82],[10.6,48.0,4.1,28.1],[13.2,36.8,4.1,25.36]]){
     limb([side*x,y,0],[side*u,v,0],.095,cable);
    }
   }
   box(0x858782,0,27.58,0,8.28,4.62,.65,'metal');
   for(const side of [-1,1])box(0x34434a,0,27.58,side*.34,8.0,4.37,.03,'patina');
  }else if(model==='liberty-paifang'){
   const limestone=0xe4e1d6,trim=0xc3bfb4,blue=0x284977,ridge=0x3b5980;
   const columns=[-7.44,-4.93,-2.33,2.33,4.93,7.44];
   const capitals=[2.11,2.76,3.46,3.46,2.76,2.11];
   const springs=[1.18,1.70,2.25,1.70,1.18];
   const lintels=[3.01,3.80,5.13,3.80,3.01];
   const roof=(x,y,width,depth,height)=>{
    box(trim,x,y-.08,0,width*.92,.17,depth*.84);
    add('paifang-roof','stone',blue,x,y,0,width,height,depth);
    box(ridge,x,y+height,0,width*.54,.07,.12);
   };
   for(const [i,x] of columns.entries()){
    const h=capitals[i];
    box(limestone,x,.10,0,.86,.20,1.36);
    box(trim,x,.23,0,.74,.13,1.18);
    box(limestone,x,(h+.24)/2,0,.64,h-.24,1.10);
    box(trim,x,h-.07,0,.82,.18,1.27);
    roof(x,h,.98,1.52,.27);
   }
   for(const [i,spring] of springs.entries()){
    const x=(columns[i]+columns[i+1])/2,width=columns[i+1]-columns[i];
    const top=lintels[i],central=i===2;
    add('paifang-span','stone',limestone,x,spring,0,width,top-spring,central?.89:.72);
    box(trim,x,top-.10,0,width+.17,.16,central?1.12:.94);
    roof(x,top,width+.43,central?2.08:1.58,central?.79:.48);
    for(const side of [-1,1]){
     const face=side*(central?.463:.38);
     box(central?0x9a9386:trim,x,top-(central?.39:.29),face,central?2.05:width*.53,central?.39:.25,.054);
     for(const edge of [-1,1])box(limestone,x+edge*width*.37,top-.40,face,.21,.40,.078);
    }
   }
  }else if(model==='delhi-baradari'){
   const white=0xf0ece3,plinth=0xd3c8b8,red=0xa65f4b;
   box(plinth,0,.16,0,8.3,.32,8.3);
   box(white,0,.37,0,7.7,.13,7.7);
   for(const face of [-1,1]){
    for(const offset of [-2.4,0,2.4]){
     add('park-arch','stone',white,offset,.43,face*3.53,2.44,3.32,.32);
     add('park-arch','stone',white,face*3.53,.43,offset,2.44,3.32,.32,
      new T.Quaternion().setFromAxisAngle(UP,Math.PI/2));
    }
   }
   box(red,0,3.84,0,7.8,.14,7.8);
   box(white,0,4.03,0,8.4,.25,8.4);
   box(white,0,4.28,0,7.3,.25,7.3);
   for(const axis of [-1,1]){
    box(white,axis*3.46,4.57,0,.20,.34,7.02);
    box(white,0,4.57,axis*3.46,7.02,.34,.20);
   }
  }else if(model==='condamine-market-hall'){
   const plaster=0xdfb5ac, stonework=0xecd1bc, tile=0x9e6554;
   box(plaster,1.6,3.75,0,16.7,7.5,59);
   box(stonework,-1.2,5.15,0,18.9,.40,59.5);
   box(tile,0,8.25,0,21.1,1.7,60);
   const front=new T.Quaternion().setFromAxisAngle(UP,Math.PI/2);
   for(const z of [-24.8,-14.9,-5.0,5.0,14.9,24.8])
    add('park-arch','stone',plaster,-9.8,0,z,9.9,5.05,1.2,front);
   for(const z of [-22.7,-15.1,-7.55,0,7.55,15.1,22.7]){
    box(stonework,-6.98,6.45,z,.23,1.32,2.35);
    box(0x5a5554,-7.12,6.45,z,.13,1.04,1.98);
   }
  }else if(model==='delhi-entry-arcade'){
   const sandstone=0xaa5c47,trim=0xdbaf92;
   for(const x of [-4.96,-2.48,0,2.48,4.96]){
    add('park-arch','stone',sandstone,x,0,0,2.48,3.3,.7);
   }
   box(trim,0,3.36,0,12.4,.12,.88);
   box(sandstone,0,3.51,0,12.35,.18,.9);
  }else if(model==='delhi-open-air-theatre'){
   const sandstone=0xaa6a54,tread=0xd7baa0;
   box(sandstone,0,.30,-3.8,13,.6,3.3);
   box(tread,0,.64,-3.8,12.7,.08,3.1);
   for(let tier=0;tier<3;tier++){
    const height=.31*(tier+1),z=.95+tier*1.68;
    for(const side of [-1,1]){
     box(sandstone,side*4.1,height/2,z,6.8,height,1.71);
     box(tread,side*4.1,height+.07,z,6.7,.14,1.52);
    }
   }
  }else if(model==='tartini-monument'){
   const pale=0xe3d9ca,shade=0xbfb2a1,patina=0x536c60;
   box(shade,0,.16,0,2.75,.32,2.75);
   box(pale,0,.45,0,2.44,.28,2.44);
   box(pale,0,.78,0,2.17,.40,2.17);
   box(shade,0,1.08,0,1.81,.24,1.81);
   box(pale,0,2.08,0,1.53,1.80,1.53);
   box(shade,0,2.99,0,1.73,.17,1.73);
   box(pale,0,3.17,0,2.06,.19,2.06);
   box(pale,0,3.34,0,1.83,.17,1.83);
   box(0xada18f,0,2.22,.769,1.13,.59,.029);
   human(0,3.425,0,1.02,'violinist',patina);
  }else if(model==='goiania-tres-racas'){
   const granite=0x9e8b79,trim=0xb3a18b,figure=0x526456;
   box(granite,0,.11,0,3.10,.22,4.70);
   box(trim,0,.30,0,2.94,.16,4.48);
   box(granite,0,.48,0,2.76,.20,4.25);
   box(granite,0,.90,0,2.56,.64,3.96);
   box(trim,0,1.27,0,2.65,.12,4.02);
   for(const z of [-1.99,1.99])for(const x of [-.85,0,.85])box(0x695d50,x,.91,z,.64,.32,.026);
   box(granite,0,4.16,0,.78,5.68,.92);
   box(trim,0,6.97,0,.80,.06,.94);
   // Each figure pushes the same pillar with a different stance.
   for(const [angle,reach,lean] of [[-Math.PI/2,0,.35],[Math.PI,.48,.10],[Math.PI/2,.22,.04]]){
    const c=Math.cos(angle),s=Math.sin(angle);
    const at=(x,y,z)=>[x*c+z*s,y,-x*s+z*c];
    const joint=(x,y,z,rx,ry,rz)=>sphere(figure,...at(x,y,z),rx,ry,rz,'patina');
    const beam=(from,to,r)=>limb(at(...from),at(...to),r,figure,'patina');
    joint(0,2.48,1.06,.25,.23,.20);
    beam([0,2.48,1.06],[0,3.24,1.05-lean],.24);
    joint(0,3.10,1.06-lean,.31,.39,.22);
    beam([0,3.32,1.05-lean],[0,3.57,1.02-lean],.12);
    joint(0,3.65,1.00-lean,.17,.22,.17);
    for(const side of [-1,1]){
     const knee=[side*.20,1.89,side===1?1.01:1.20];
     const foot=[side*.24,1.45,side===1?.81:1.30];
     beam([side*.13,2.53,1.06],knee,.13);
     beam(knee,foot,.105);
     joint(foot[0],1.41,foot[2]-.07,.12,.08,.22);
     const elbow=[side*.29,3.10+reach,.76];
     const hand=[side*.20,3.43+reach,.44];
     beam([side*.24,3.24,1.03-lean],elbow,.105);
     beam(elbow,hand,.082);
     joint(...hand,.08,.10,.07);
    }
   }
  }else if(model==='fontvieille-saint-nicolas'){
   const wall=0xecb39c,wing=0xd49d88,cream=0xf0d7af,roof=0xb87056,recess=0x745f57;
   add('campanin-church-outline','stone',wall,0,3.70,0,1,7.4,1);
   add('campanin-church-outline','stone',cream,0,7.58,0,1,.37,1);
   add('hip-roof','stone',roof,1.82,8.51,-.22,19.1,2.19,24.25);
   add('hip-roof','stone',roof,-12.0,8.03,-3.4,12.2,1.15,12.2);
   // The south façade addresses the paved square. Its openings are stylized.
   const front=13.12;
   box(cream,1.81,.31,front-1.68,21.40,.62,3.35);
   for(const x of [-5.5,1.8,9.1]){
    const center=x===1.8,archWidth=center?4.20:3.15;
    box(recess,x,2.42,front+.023,archWidth*.67,4.08,.053);
    add('jicin-well-arch','stone',cream,x,.62,front+.10,archWidth,5.50,.18);
    box(center?0x79574b:0x8e7760,x,1.80,front+.07,archWidth*.52,2.30,.11);
    box(cream,x,4.35,front+.21,archWidth*.70,.22,.25);
   }
   box(cream,1.81,6.90,front+.08,21.70,.26,.24);
   for(const x of [-7.82,-2.12,5.70,11.44]){
    box(wing,x,3.65,front+.04,.22,5.85,.12);
   }
   const tx=-11.28,tz=4.78;
   box(wall,tx,7.48,tz,4.35,14.96,4.43);
   box(cream,tx,14.88,tz,4.60,.38,4.64);
   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2,dx=Math.sin(angle)*2.17,dz=Math.cos(angle)*2.17;
    const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('jicin-well-arch','stone',wall,tx+dx,15.00,tz+dz,4.37,4.04,.45,rotation);
   }
   cylinder(0x66564b,tx,16.30,tz,.69,1.53,'metal');
   box(cream,tx,18.94,tz,4.69,.36,4.71);
   add('campanin-dome','stone',0x9b7857,tx,19.09,tz,2.19,2.39,2.19);
   for(let row=0;row<5;row++){
    const latitude=(row+.63)*Math.PI/11;
    const radius=2.19*Math.cos(latitude),height=19.09+2.39*Math.sin(latitude);
    for(let tile=0;tile<20;tile++){
     const angle=(tile+(row%2)*.5)*Math.PI/10;
     const colors=row%2?[0xcf9c4d,0x8caa83,0x5e889e,0xc28b53]:[0x608ca8,0xd4ad46,0xb97b5b,0x739787];
     sphere(colors[tile%4],tx+Math.sin(angle)*radius,height,tz+Math.cos(angle)*radius,.225,.125,.225,'stone');
    }
   }
   box(0x6d6453,tx,21.73,tz,.13,.70,.13,'metal');
   box(0x6d6453,tx,21.82,tz,.61,.11,.11,'metal');
  }else if(model==='campidoglio-nilo'||model==='campidoglio-tevere'){
   const nile=model==='campidoglio-nilo',side=nile?1:-1;
   const pale=nile?0xded8cd:0xd9cfbc,shade=nile?0xc8bfb0:0xc6baa4;
   const width=MODEL_SPECS[model].width;
   box(shade,0,.12,0,width,.24,2.2);
   box(0xbbae9b,0,.59,0,width-.26,.70,1.94);
   box(pale,0,1.00,0,width-.10,.16,2.07);
   const form=(x,y,z,w,h,d,color=pale)=>sphere(color,side*x,y,z,w,h,d,'stone');
   const link=(a,b,r,color=pale)=>limb([side*a[0],a[1],a[2]],[side*b[0],b[1],b[2]],r,color,'stone');
   form(0,1.15,0,width*.48,.13,.80,shade);
   form(-.43,1.48,.07,.77,.38,.53);
   link([-.20,1.49,-.02],[-.86,1.66,.31],.27,shade);
   link([-.86,1.66,.31],[-1.79,1.39,.35],.20,shade);
   link([-.35,1.49,.16],[-1.00,1.55,-.20],.24);
   link([-1.00,1.55,-.20],[-1.83,1.42,.10],.17);
   form(-1.91,1.38,.39,.25,.13,.16);
   form(-1.93,1.39,.03,.22,.12,.15);
   for(const [x,y,z] of [[-.74,1.49,.47],[-.93,1.49,.38],[-1.09,1.43,.40],[-1.25,1.43,.30]]){
    link([x+.22,y+.11,z],[x-.15,y-.11,z+.12],.076,shade);
   }
   link([-.13,1.50,.01],[.57,2.30,.02],.43);
   form(.36,1.93,.15,.52,.50,.38);
   form(.61,2.28,.06,.52,.33,.35);
   link([.70,2.38,.02],[.87,2.65,.05],.18);
   form(.94,2.83,.04,.26,.31,.23);
   form(.94,2.88,-.08,.28,.24,.20,shade);
   form(.94,2.68,.18,.20,.21,.17,shade);
   form(.95,2.80,.24,.087,.095,.095);
   link([.86,2.31,-.10],[1.28,1.82,-.04],.17);
   link([1.28,1.82,-.04],[1.47,1.71,.39],.146);
   form(1.49,1.71,.44,.16,.12,.12);
   link([.28,2.29,.18],[.03,1.91,.47],.16);
   const horn=nile?[.96,2.31,.52]:[-.48,2.12,.60];
   link([.03,1.91,.47],horn,.13);
   const tip=nile?[1.31,2.43,.52]:[-.64,2.19,.60];
   const foot=nile?[1.55,1.67,.39]:[-.30,1.42,.40];
   link(foot,horn,.14,shade);
   link(horn,tip,.22,shade);
   for(const [dx,dy,dz] of [[-.12,.12,.03],[.12,.08,.02],[.03,.05,.16]]){
    form(tip[0]+dx,tip[1]+dy,tip[2]+dz,.105,.11,.10);
   }
   if(nile){
    // The small sphinx supports the Nile's upper body.
    form(1.58,1.32,.17,.48,.25,.30,shade);
    form(1.88,1.57,.15,.21,.26,.20);
    form(1.94,1.79,.17,.17,.20,.17);
    for(const z of [.01,.29])form(1.96,1.23,z,.23,.10,.10,shade);
   }else{
    // A she-wolf and the twins distinguish the pendant on the opposite plinth.
    form(1.52,1.57,.25,.44,.21,.22,shade);
    form(1.87,1.67,.26,.22,.18,.18,shade);
    form(2.01,1.60,.26,.17,.10,.12);
    for(const x of [1.25,1.75])for(const z of [.14,.38])link([x,1.53,z],[x,1.19,z],.065,shade);
    for(const x of [1.37,1.63]){
     form(x,1.28,.45,.115,.14,.13);
     form(x,1.45,.47,.10,.103,.10);
    }
   }
  }else if(model==='delft-hugo-de-groot'){
   const granite=0x8c6c60,trim=0xaa8875,figure=0x675247;
   box(trim,0,.065,0,2.65,.13,2.65);
   box(trim,0,.19,0,2.48,.12,2.48);
   box(granite,0,.32,0,2.34,.18,2.34);
   box(trim,0,.47,0,2.10,.14,2.10);
   box(granite,0,1.48,0,1.49,1.90,1.49);
   box(trim,0,2.48,0,1.68,.16,1.68);
   box(granite,0,2.63,0,1.88,.16,1.88);
   box(trim,0,2.77,0,1.99,.12,1.99);
   const metal=(x,y,z,rx,ry,rz)=>sphere(figure,x,y,z,rx,ry,rz,'patina');
   const link=(from,to,r)=>limb(from,to,r,figure,'patina');
   box(figure,0,2.86,0,.94,.09,.76,'patina');
   add('robe','patina',figure,-.08,3.77,-.12,.67,1.76,.44);
   metal(0,4.73,-.10,.50,.68,.33);
   metal(-.13,5.29,-.06,.28,.23,.26);
   metal(-.09,5.49,.02,.23,.31,.22);
   metal(-.14,5.48,-.10,.24,.29,.17);
   metal(-.09,5.38,.17,.15,.16,.12);
   metal(-.20,2.99,.12,.17,.11,.25);
   metal(.23,2.99,.20,.16,.11,.30);
   link([-.37,4.93,-.04],[-.53,4.51,.23],.18);
   link([-.53,4.51,.23],[-.20,4.48,.49],.13);
   link([.34,4.97,-.04],[.51,4.55,.19],.18);
   link([.51,4.55,.19],[.28,4.75,.47],.125);
   add('box','patina',0x775e50,.04,4.59,.51,.66,.33,.15,new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),.32));
   metal(-.22,4.48,.53,.11,.13,.09);
   metal(.27,4.72,.51,.10,.13,.08);
  }else if(model==='birmingham-queen-victoria'){
   const granite=0x716865, face=0x93827a, bronze=0x4f6857;
   box(granite,0,.16,0,3.75,.32,3.62);
   box(face,0,.43,0,3.26,.23,3.14);
   box(granite,0,1.85,0,2.38,2.65,2.31);
   box(face,0,3.27,0,2.74,.24,2.65);
   box(granite,0,3.44,0,2.42,.10,2.33);
   box(0xa89584,0,2.17,1.17,1.36,.33,.035);
   const metal=(x,y,z,rx,ry,rz)=>sphere(bronze,x,y,z,rx,ry,rz,'patina');
   const link=(a,b,r)=>limb(a,b,r,bronze,'patina');
   add('robe','patina',bronze,0,4.49,0,.78,1.99,.66);
   metal(0,5.47,-.09,.50,.67,.37);
   metal(0,5.52,-.25,.54,.53,.27);
   metal(0,6.06,.02,.26,.35,.25);
   metal(0,5.99,-.24,.28,.34,.14);
   cylinder(bronze,0,6.37,.02,.27,.12,'patina');
   for(let i=0;i<6;i++){
    const angle=i*Math.PI/3;
    metal(Math.sin(angle)*.23,6.47,.02+Math.cos(angle)*.23,.051,.11,.051);
   }
   link([.37,5.70,.03],[.63,5.35,.28],.126);
   link([.63,5.35,.28],[.47,5.47,.57],.10);
   metal(.47,5.61,.57,.16,.17,.16);
   link([.47,5.75,.57],[.47,5.90,.57],.025);
   link([-.38,5.70,.01],[-.56,5.24,.29],.127);
   link([-.56,5.24,.29],[-.68,5.36,.54],.10);
   link([-.78,4.61,.56],[-.54,6.27,.51],.045);
   metal(-.54,6.28,.51,.081,.096,.081);
  }else if(model==='birmingham-guardian'){
   const sandstone=0xc6a473,shaded=0xb08b5e,highlight=0xd2b17f;
   const east=owner.feature.id==='node:2109265232',side=east?1:-1;
   const carved=(x,y,z,w,h,d,c=sandstone)=>sphere(c,x*side,y,z,w,h,d,'stone');
   const join=(a,b,r,c=sandstone)=>limb([a[0]*side,a[1],a[2]],[b[0]*side,b[1],b[2]],r,c,'stone');
   box(shaded,0,.10,0,2.48,.20,4.93);
   carved(0,.95,-.62,.98,.74,1.66);
   carved(-.25,1.01,-1.50,.64,.74,.73,shaded);
   carved(0,1.46,.49,.81,.80,.81);
   for(const x of [-.51,.51]){
    carved(x,.53,.92,.36,.34,.91,shaded);
    carved(x,.39,1.77,.35,.23,.60);
    carved(x,.54,-1.49,.39,.38,.62);
   }
   // Broad carved wing ridges rise along rather than above the body.
   join([-.70,1.12,-1.48],[-.83,1.82,-.24],.27,highlight);
   join([-.83,1.82,-.24],[-.74,1.66,.48],.21);
   join([.67,1.07,-1.43],[.87,1.73,-.31],.26,highlight);
   join([.87,1.73,-.31],[.72,1.57,.53],.20);
   carved(.05,2.08,.87,.59,.65,.52);
   carved(.05,2.47,1.08,.52,.48,.45,highlight);
   carved(.04,2.34,1.40,.40,.31,.31);
   carved(.03,2.48,1.65,.14,.15,.13,highlight);
   join([-.27,2.24,1.42],[.35,2.22,1.40],.063,shaded);
   join([-.44,2.78,1.02],[.45,2.81,1.02],.11,highlight);
   join([.69,.78,-1.77],[.79,.35,-.99],.12,shaded);
  }else if(model==='birmingham-the-river'){
   const bronze=0x4a6557;
   const body=(x,y,z,w,h,d)=>sphere(bronze,x,y,z,w,h,d,'patina');
   const link=(a,b,r)=>limb(a,b,r,bronze,'patina');
   body(.14,.77,.03,.74,.66,.61);
   link([.05,.93,0],[-.71,1.68,-.10],.45);
   body(-.55,1.47,-.07,.59,.65,.55);
   body(-.96,1.80,-.12,.43,.42,.46);
   link([-.94,1.79,-.11],[-1.19,2.20,-.10],.17);
   body(-1.29,2.37,-.10,.30,.39,.26);
   body(-1.29,2.46,-.23,.27,.32,.21);
   link([-.83,1.72,-.45],[-1.42,1.02,-.64],.17);
   link([-1.42,1.02,-.64],[-1.66,.43,-.25],.14);
   body(-1.69,.32,-.12,.20,.13,.25);
   link([-.80,1.72,.36],[-.35,1.37,.75],.16);
   link([-.35,1.37,.75],[.17,1.28,.88],.12);
   body(.20,1.28,.88,.17,.12,.14);
   link([.31,.82,.24],[1.02,1.01,.54],.30);
   link([1.02,1.01,.54],[1.71,.36,.70],.19);
   body(1.79,.28,.82,.22,.16,.27);
   link([.20,.73,-.28],[1.14,.75,-.64],.28);
   link([1.14,.75,-.64],[1.61,.36,-.13],.17);
   body(1.72,.28,-.03,.21,.15,.25);
   body(.52,.66,.83,.24,.37,.22);
   cylinder(bronze,.52,1.02,.83,.15,.10,'patina');
   cylinder(0x424947,0,.10,0,1.9,.20);
  }else if(model==='birmingham-iron-man'){
   add('iron-man','patina',0x774b36,0,0,0,1,1,1);
  }else if(model==='waharoa'){
   const timber=0x68472f,carving=0xaa8057,copper=0x518981,rose=0x965656;
   const across=new T.Vector3(1,0,0);
   const beam=(a,b,thickness,depth,color)=>{
    const from=new T.Vector3(...a),to=new T.Vector3(...b),direction=to.clone().sub(from);
    const length=direction.length(),position=from.add(to).multiplyScalar(.5);
    const rotation=new T.Quaternion().setFromUnitVectors(across,direction.normalize());
    add('box','patina',color,position.x,position.y,position.z,length,thickness,depth,rotation);
   };
   for(const side of [-1,1]){
    const x=side*4.31;
    box(timber,x,1.785,0,1.30,3.57,.52,'patina');
    beam([x,3.34,0],[0,5.34,0],1.02,.52,timber);
    beam([x,3.19,.263],[0,5.19,.263],.30,.045,carving);
    for(let row=0;row<5;row++){
     const y=.49+row*.49,color=row%2?copper:carving;
     beam([x-.47,y,.272],[x,y+.17,.272],.10,.04,color);
     beam([x,y+.17,.272],[x+.47,y,.272],.10,.04,color);
    }
    for(let panel=0;panel<4;panel++){
     const t=(panel+.60)/4.4,xPanel=x*(1-t),yPanel=3.30+2*t;
     sphere(panel%2?rose:copper,xPanel,yPanel+.33,.279,.25,.14,.028,'patina');
     beam([xPanel-.16,yPanel+.24,.286],[xPanel+.16,yPanel+.39,.286],.050,.025,carving);
    }
   }
   // Five crest silhouettes cite the published arrangement without reproducing the carved artwork.
   beam([-.11,5.43,0],[-.11,6.68,0],.125,.33,timber);
   sphere(copper,-.11,6.46,0,.38,.26,.23,'patina');
   for(const side of [-1,1]){
    beam([-.11,6.41,0],[side*.65,6.90,0],.15,.27,copper);
    beam([side*.13,6.29,0],[side*.44,5.76,0],.12,.24,copper);
   }
   beam([-1.91,4.66,0],[-1.91,6.01,0],.18,.31,timber);
   for(let branch=0;branch<3;branch++){
    const y=5.17+branch*.29;
    beam([-2.15,y-.13,0],[-1.39,y+.41,0],.135,.35,copper);
   }
   beam([-3.54,3.87,0],[-3.54,5.40,0],.16,.28,timber);
   let previous=[-3.26,5.61,0];
   for(let i=1;i<=10;i++){
    const theta=(.40+1.33*i/10)*Math.PI;
    const next=[-3.48+Math.cos(theta)*.40,5.24+Math.sin(theta)*.40,0];
    beam(previous,next,.116,.29,copper);
    previous=next;
   }
   beam([1.73,4.62,0],[1.73,5.93,0],.17,.30,timber);
   sphere(copper,1.88,5.83,0,.52,.19,.19,'patina');
   beam([2.22,5.82,0],[2.62,6.10,0],.18,.25,copper);
   beam([2.22,5.82,0],[2.64,5.71,0],.18,.25,copper);
   beam([3.64,3.86,0],[3.64,5.39,0],.15,.29,timber);
   sphere(copper,3.64,5.34,0,.34,.34,.20,'patina');
   for(let ray=0;ray<8;ray++){
    const angle=ray*Math.PI/4,point=r=>[3.64+Math.cos(angle)*r,5.34+Math.sin(angle)*r,0];
    beam(point(.27),point(.52),.092,.26,copper);
   }
  }else if(model==='king-sejong-seated'){
   const gilt=0x947232,fold=0xa9883d,granite=0xc5b7aa;
   steps(0,5.3);box(granite,0,1.43,0,4.65,1.52,4.65);box(marble,0,2.27,0,4.80,.20,4.80);
   box(gilt,0,2.64,-.20,3.42,.54,3.35,'metal');box(gilt,0,3.72,-1.07,3.44,2.54,.46,'metal');
   for(const side of [-1,1]){
    box(fold,side*1.49,3.76,.30,.32,.34,2.28,'metal');
    limb([side*.68,4.73,-.10],[side*1.18,3.98,.56],.26,gilt);
    limb([side*.56,3.78,.18],[side*.54,3.26,1.29],.38,gilt);
    sphere(gilt,side*.56,3.08,1.19,.37,.39,.46);
   }
   sphere(gilt,0,4.58,-.12,.95,1.03,.55);sphere(fold,0,5.68,.08,.43,.54,.42);
   box(gilt,0,6.13,-.01,.99,.33,.66,'metal');box(gilt,0,6.30,-.28,.71,.29,.50,'metal');
   limb([0,5.65,.45],[0,5.23,.48],.11,gilt);
   for(const side of [-1,1])box(0xc2a062,side*.34,3.83,1.13,.67,.10,.63,'metal');
  }else if(model==='joseon-armillary'){
   const brass=0x9b783b;
   box(stone,0,.09,0,.78,.18,.78);
   cylinder(stone,0,.42,0,.23,.48);
   ring(brass,0,1.06,0,.38,.030);
   for(const angle of [-Math.PI/4,Math.PI/4]){
    const rotation=new T.Quaternion().setFromEuler(new T.Euler(Math.PI/2,angle,0,'YXZ'));
    add('torus','metal',brass,0,1.06,0,.38,.030/.045,.38,rotation);
   }
   limb([-.29,.77,0],[.29,1.35,0],.026,brass);
  }else if(model==='joseon-rain-gauge'){
   box(stone,0,.09,0,.62,.18,.62);
   box(stone,0,.44,0,.44,.52,.44);
   box(marble,0,.73,0,.53,.09,.53);
   cylinder(bronze,0,1.02,0,.14,.49,'metal');
   cylinder(0x283536,0,1.266,0,.12,.010,'metal');
   ring(bronze,0,1.278,0,.139,.026);
  }else if(model==='joseon-sundial'){
   box(stone,0,.09,0,.79,.18,.79);
   cylinder(stone,0,.39,0,.21,.42);
   cylinder(bronze,0,.62,0,.15,.06,'metal');
   add('sundial-bowl','metal',bronze,0,.64,0,1,1,1);
   for(const [height,radius] of [[.75,.24],[.83,.33],[.92,.38]])ring(gold,0,height,0,radius,.014);
   limb([0,.67,0],[.28,1.06,0],.023,gold);
  }else if(model==='santo-domingo-corregidora'){
   const stoneBase=0x625b53, coping=0x7d7165, stoneBand=0x94806b, cast=0x393e37;
   add('corregidora-basin-wall','stone',stoneBase,0,.25,0,1,.50,1);
   add('corregidora-basin-wall','stone',coping,0,.54,0,1,.10,1);
   add('corregidora-basin-water','water',0x62968d,0,.38,0,1,1,1);
   box(stoneBase,0,.415,0,2.70,.83,2.70);
   box(coping,0,.87,0,2.45,.16,2.45);
   box(0x786759,0,1.83,0,1.86,1.84,1.81);
   box(stoneBand,0,2.83,0,2.08,.24,2.01);
   box(coping,0,3.01,0,2.22,.14,2.13);
   box(0x554b40,0,2.15,.92,1.04,.55,.07);
   // The portrait is seated, with the folds of her gown and a document at the lap.
   box(cast,0,3.35,-.15,1.05,.54,.92,'patina');
   box(cast,0,3.73,-.52,1.04,.91,.16,'patina');
   sphere(cast,0,3.46,.26,.56,.33,.63,'patina');
   sphere(cast,0,3.27,.53,.57,.20,.34,'patina');
   sphere(cast,0,3.96,-.05,.37,.45,.285,'patina');
   for(const side of [-1,1]){
    limb([side*.28,4.18,-.03],[side*.43,3.84,.22],.11,cast,'patina');
    limb([side*.43,3.84,.22],[side*.19,3.66,.50],.092,cast,'patina');
   }
   box(0x606053,.06,3.64,.49,.36,.05,.25,'patina');
   limb([0,4.28,-.015],[0,4.53,.025],.105,cast,'patina');
   sphere(cast,0,4.62,.055,.178,.23,.167,'patina');
   sphere(0x33362f,0,4.68,-.067,.159,.13,.105,'patina');
   sphere(cast,0,4.57,.204,.05,.05,.046,'patina');
  }else if(model==='three-rivers-fountain'){
   const silver=0xc7ccca,granite=0x817d75;
   add('triangular-base','stone',granite,0,.33,0,3.30,.66,3.30);
   cylinder(silver,0,2.27,0,.63,3.92,'metal');
   add('fountain-crown','metal',silver,0,4.24,0,1.19,.49,1.19);
   ring(silver,0,4.50,0,1.18,.085);
   jet(0,4.50,0,.96,.43);
   for(let i=0;i<3;i++){
    const angle=i*2*Math.PI/3;
    const at=(x,y,z)=>[x*Math.cos(angle)+z*Math.sin(angle),y,z*Math.cos(angle)-x*Math.sin(angle)];
    const pedestalRotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('box','stone',granite,...at(0,.73,2.10),1.69,.48,1.42,pedestalRotation);
    add('sphere','metal',silver,...at(0,2.02,1.95),.43,.92,.30,pedestalRotation);
    sphere(silver,...at(0,3.12,1.96),.23,.32,.25);
    limb(at(0,2.98,1.96),at(0,2.69,1.96),.14,silver);
    for(const side of [-1,1]){
     limb(at(side*.23,1.34,2.04),at(side*.31,1.53,2.70),.18,silver);
     limb(at(side*.31,1.53,2.70),at(side*.26,.96,2.84),.14,silver);
     limb(at(side*.34,2.58,1.95),at(side*.49,2.07,2.24),.12,silver);
     limb(at(side*.49,2.07,2.24),at(side*.20,2.04,2.65),.095,silver);
    }
    // The three birds share a body, with distinct neck and bill silhouettes.
    const neckZ=[2.78,2.59,2.75][i],neckY=[2.77,2.91,2.77][i];
    const headZ=[3.02,2.83,2.98][i],headY=[2.69,2.93,2.83][i];
    const billZ=[3.53,3.13,3.54][i],billY=[2.51,2.86,2.82][i];
    add('sphere','metal',silver,...at(0,2.04,2.78),.25,.25,.43,pedestalRotation);
    limb(at(0,2.12,2.92),at(0,neckY,neckZ),i===1?.085:.065,silver);
    limb(at(0,neckY,neckZ),at(0,headY,headZ),.064,silver);
    sphere(silver,...at(0,headY,headZ),.11,.105,.14);
    limb(at(0,headY,headZ),at(0,billY,billZ),.038,silver);
    limb(at(0,billY,billZ),at(0,.62,4.55),.033,water,'water');
    limb(at(0,4.50,.76),at(0,.62,4.36),.035,water,'water');
   }
  }else if(model==='teror-pilar-fountain'){
   const sandstone=0xb39867,agedStone=0xc0a77a;
   cylinder(sandstone,0,.09,0,1.9,.18);
   cylinder(agedStone,0,.25,0,1.74,.14);
   cylinder(sandstone,0,.39,0,1.59,.14);
   cylinder(water,0,.47,0,1.44,.04,'water');
   ring(agedStone,0,.49,0,1.49,.09);
   cylinder(agedStone,0,.63,0,.53,.31);
   cylinder(sandstone,0,1.29,0,.33,1.10);
   for(const y of [.82,1.67,1.89])ring(agedStone,0,y,0,.36,.055);
   cylinder(agedStone,0,1.92,0,.40,.14);
   sphere(sandstone,0,2.12,0,.22,.24,.22,'stone');
  }else if(model==='teror-wall-fountain'){
   const frame=0x60594a,panel=0xa78e60;
   box(frame,0,1.16,-.63,1.82,2.32,.29);
   box(panel,0,1.39,-.47,1.49,1.73,.10);
   box(frame,0,2.32,-.62,2.06,.22,.42);
   box(frame,0,2.58,-.62,.14,.38,.17);
   box(frame,0,2.59,-.62,.45,.13,.17);
   box(frame,0,.14,.17,2.25,.28,1.23);
   for(const side of [-1,1]){
    box(frame,side*1.05,.36,.17,.15,.24,1.23);
    box(frame,0,.36,.17+side*.54,1.97,.24,.15);
   }
   box(water,0,.31,.17,1.92,.025,.90,'water');
   box(panel,0,1.91,-.39,.29,.26,.07);
   box(panel,0,1.24,-.38,.093,.63,.07);
   sphere(frame,0,1.57,-.36,.26,.19,.09,'stone');
   cylinder(frame,0,.89,-.39,.052,.11);
  }else if(model==='arucas-sureda-monument'){
   const volcanicStone=0xa29c91,lightStone=0xbbb1a1,iron=0x55594f;
   for(const [y,radius,height] of [[.10,2.05,.20],[.28,1.92,.16],[.43,1.80,.14]]){
    cylinder(volcanicStone,0,y,0,radius,height);
   }
   cylinder(lightStone,0,1.25,0,.34,1.5);
   cylinder(volcanicStone,0,2.05,0,.44,.18);
   sphere(bronze,0,2.23,0,.40,.24,.25,'metal');
   sphere(bronze,0,2.54,.02,.21,.30,.20,'metal');
   ring(lightStone,0,3.56,0,1.77,.14,'stone');
   for(let bay=0;bay<8;bay++){
    const angle=bay*Math.PI/4,at=(radius,y)=>[radius*Math.sin(angle),y,radius*Math.cos(angle)];
    cylinder(volcanicStone,...at(1.61,.57),.19,.14);
    cylinder(lightStone,...at(1.61,2.02),.12,2.76);
    cylinder(volcanicStone,...at(1.61,3.43),.19,.19);
    for(const [from,to] of [[[1.72,3.65],[1.54,4.03]],[[1.54,4.03],[1.10,4.38]],[[1.10,4.38],[.53,4.59]],[[.53,4.59],[0,4.68]]]){
     limb(at(...from),at(...to),.032,iron,'metal');
    }
   }
   for(const [y,radius] of [[3.65,1.72],[4.03,1.54],[4.38,1.10],[4.59,.53]])ring(iron,0,y,0,radius,.023);
   sphere(iron,0,4.73,0,.08,.14,.08,'metal');
  }else if(model==='kamppi-chapel'){
   const spruce=0xbd7840;
   add('kamppi-chapel-shell','stone',spruce,0,0,0,9.8,11.5,6.7);
   for(const [y,ratio] of [[.58,.61],[2.30,.70],[4.83,.83],[7.82,.94],[10.24,1],[11.49,.99]]){
    add('kamppi-chapel-seam','stone',0x9e6036,0,y,0,9.8*ratio,1,6.7*ratio);
   }
  }else if(model==='kamppi-entrepreneurs-monument'){
   const aluminium=0xb8b392;
   box(0x474844,0,.66,0,.70,1.30,.70);
   const frames=[[-.92,.87,0,1.46,.22],[.40,.78,.87,1.38,-.4],[.72,1.57,-.62,1.55,.43],
    [-.36,2.05,.22,1.92,.56],[-.89,2.64,-.46,1.48,-.32],[.82,2.66,.49,1.56,.24],
    [0,3.16,-.22,2.02,-.43],[-.78,3.75,.37,1.21,.41],[.73,3.81,-.46,1.40,.17],
    [0,4.26,.55,1.50,.59],[.46,4.79,-.32,1.39,-.32],[-.54,4.97,-.28,1.24,.19],[.05,5.44,.16,1.12,.44]];
   for(const [x,y,z,size,bearing] of frames){
    const sine=Math.sin(bearing),cosine=Math.cos(bearing),half=size/2;
    const corner=(u,v,w)=>[x+(u*cosine+w*sine)*half,y+v*half,z+(-u*sine+w*cosine)*half];
    for(const a of [-1,1])for(const c of [-1,1]){
     limb(corner(-1,a,c),corner(1,a,c),.027,aluminium,'metal');
     limb(corner(a,-1,c),corner(a,1,c),.027,aluminium,'metal');
     limb(corner(a,c,-1),corner(a,c,1),.027,aluminium,'metal');
    }
   }
  }else if(model==='kasarmitori-winter-war-memorial'){
   const steel=0xc7d1d5,glass=0x6c7a7b;
   sphere(steel,0,1.8,0,1.8,1.8,1.8,'metal');
   for(const latitude of [-.55,-.24,.09,.42])for(let window=0;window<12;window++){
    const bearing=(window+(latitude>0?.50:0))*Math.PI/6;
    const radius=Math.cos(latitude);
    const direction=new T.Vector3(Math.sin(bearing)*radius,Math.sin(latitude),Math.cos(bearing)*radius);
    const face=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),direction);
    add('sphere','metal',glass,1.8*direction.x,1.8+1.8*direction.y,1.8*direction.z,.072,.072,.023,face);
   }
   add('kasarmitori-perforated-figure','metal',steel,0,3.54,0,1,7.06/7,1);
  }else if(model==='kasarmitori-the-eye'){
   cylinder(0x737c7e,0,.019,0,.90,.038,'metal');
   cylinder(0xa9b0b1,0,.037,0,.59,.036,'metal');
  }else if(model==='karhupuisto-bear'){
   const granite=0x90665d,pedestal=0x806f68;
   box(pedestal,0,.14,0,2.31,.28,2.81);
   box(pedestal,0,.50,0,2.11,.46,2.64);
   sphere(granite,0,.84,.38,.82,.19,.88,'stone');
   sphere(granite,0,1.85,-.41,.64,.66,.74,'stone');
   sphere(granite,0,1.88,.24,.63,.57,.79,'stone');
   sphere(granite,0,1.63,.76,.45,.43,.53,'stone');
   sphere(granite,0,1.40,1.08,.26,.25,.35,'stone');
   sphere(granite,0,1.27,1.30,.19,.13,.18,'stone');
   for(const x of [-1,1]){
    sphere(granite,x*.26,1.80,.89,.13,.14,.079,'stone');
    sphere(granite,x*.43,1.41,-.68,.28,.44,.36,'stone');
    sphere(granite,x*.45,1.01,-.64,.21,.24,.27,'stone');
    sphere(granite,x*.44,.88,-.50,.24,.14,.30,'stone');
    const forward=x>0?.83:.61;
    limb([x*.48,1.64,.41],[x*.43,1.11,forward],.18,granite,'stone');
    sphere(granite,x*.43,1.00,forward+.07,.21,.14,.29,'stone');
   }
  }else if(model==='tartu-countrywomen'){
   const patina=0x5c6557;
   box(0x9a9284,0,.075,0,1.76,.15,.92);
   box(patina,.38,.47,-.19,.52,.66,.48,'patina');
   sphere(patina,.39,.98,-.12,.31,.39,.22,'patina');
   sphere(patina,.44,1.42,-.04,.14,.179,.135,'patina');
   add('robe','patina',patina,.42,.69,.04,.37,.58,.33);
   for(const x of [.27,.57]){
    limb([x,.78,.19],[x,.21,.32],.066,patina,'patina');
    sphere(patina,x,.17,.40,.092,.034,.16,'patina');
   }
   limb([.61,1.18,-.03],[.68,.96,.22],.068,patina,'patina');
   limb([.68,.96,.22],[.44,.82,.25],.052,patina,'patina');
   sphere(patina,-.39,1.39,-.10,.22,.38,.16,'patina');
   sphere(patina,-.38,1.91,-.07,.13,.176,.132,'patina');
   for(const x of [-.51,-.27]){
    limb([x,1.13,-.10],[x,.24,-.06],.073,patina,'patina');
    box(patina,x,.19,.04,.18,.08,.29,'patina');
   }
   limb([-.21,1.62,-.07],[.06,1.43,-.18],.057,patina,'patina');
   limb([.06,1.43,-.18],[.30,1.24,-.10],.049,patina,'patina');
   limb([-.58,1.61,-.10],[-.63,1.14,-.02],.056,patina,'patina');
  }else if(model==='tartu-town-hall'){
   const pale=0xe2a7a1,cream=0xf0ded2,roof=0x986057,spire=0x54645c,glass=0x5c5550;
   box(0xb0a098,0,.53,0,36.1,1.06,19.7);
   box(pale,0,7.36,0,35.5,13.6,19.1);
   for(const y of [4.88,9.25,14.14])box(cream,0,y,0,36.1,.42,19.8);
   for(const side of [-1,1]){
    for(let col=-4;col<=4;col++)for(const y of [2.89,7.13,11.28]){
     const windowX=col*3.65;
     const frontZ=side*9.61;
     if(col===0&&y<3){
      box(0x6a514a,windowX,2.45,frontZ,2.11,3.42,.12,'metal');
     }else{
      box(cream,windowX,y,frontZ,1.77,2.68,.14);
      box(glass,windowX,y,frontZ+side*.10,1.41,2.29,.08,'metal');
      box(cream,windowX,y,frontZ+side*.153,.07,2.29,.03);
     }
    }
   }
   for(const x of [-6.62,-3.26,3.26,6.62])box(cream,x,9.48,9.77,.43,8.45,.26);
   add('hip-roof','stone',roof,0,14.27,0,35.95,5.90,19.62);
   for(let course=0;course<7;course++)box(cream,0,14.24+course*.40,9.33,15.7-course*2.12,.43,.69);
   sphere(0xd6bb9b,0,15.88,9.72,.78,.70,.09,'stone');
   box(cream,0,20.38,0,4.25,2.15,4.25);
   box(spire,0,22.17,0,3.22,2.15,3.22,'metal');
   sphere(0xcfb36f,0,22.27,1.66,.79,.79,.065,'metal');
   sphere(0x4a443f,0,22.27,1.71,.62,.62,.06,'metal');
   box(0xddc88d,0,22.44,1.79,.07,.38,.065,'metal');
   box(0xddc88d,.15,22.26,1.79,.31,.075,.065,'metal');
   add('bandstand-roof','metal',spire,0,23.25,0,1.97,2.65,1.97);
   limb([0,25.90,0],[0,26.97,0],.047,spire);
  }else if(model==='tartu-kissing-students'){
   const granite=0xaca393,patina=0x576b60;
   cylinder(granite,0,.21,0,5.07,.42);
   cylinder(0x7e9ca2,0,.452,0,4.85,.065,'metal');
   ring(0xd5c8b7,0,.49,0,4.93,.118,'stone');
   cylinder(granite,0,.65,0,.92,.38);
   cylinder(0x8c8576,0,1.30,0,.51,.96);
   cylinder(granite,0,1.81,0,.72,.16);
   for(const side of [-1,1]){
    limb([side*.34,1.91,.12],[side*.34,2.67,.02],.088,patina,'patina');
    limb([side*.36,2.66,0],[side*.22,3.31,.06],.135,patina,'patina');
    sphere(patina,side*.127,3.50,.10,.133,.178,.134,'patina');
    limb([side*.29,3.18,.10],[-side*.17,2.95,.20],.072,patina,'patina');
   }
   limb([.36,2.49,.03],[.57,2.05,-.38],.077,patina,'patina');
   limb([-.27,3.30,-.03],[-.58,3.52,-.07],.072,patina,'patina');
   limb([-.54,3.08,-.09],[-.54,4.03,-.14],.035,patina,'patina');
   add('bandstand-roof','patina',patina,-.54,3.98,-.14,1.02,.38,1.02);
  }else if(model==='vilnius-gediminas'){
   const granite=0x7f716b,patina=0x576658;
   box(granite,0,.30,0,7.4,.60,6.8);
   box(granite,0,.79,0,6.35,.39,5.72);
   box(0x6a5f59,0,2.63,0,5.03,3.30,4.55);
   box(granite,0,4.36,0,5.16,.45,4.82);
   human(-.79,4.60,.30,1.22,'freedom',patina);
   limb([.23,6.04,.50],[.77,5.03,1.52],.065,patina,'patina');
   const horseStart=parts.length;
   horse();
   for(const part of parts.slice(horseStart)){
    part.x=1.05+part.x*.72;
    part.y=4.6+part.y*.72;
    part.z=-.51+part.z*.72;
    part.sx*=.72;part.sy*=.72;part.sz*=.72;
   }
  }else if(model==='chennai-victoria-public-hall'){
   const brick=0xb75c43,trim=0xc87652,stoneBand=0xd4ad87,roof=0x874e3a,shadow=0x493b36;
   add('chennai-public-hall-footprint','stone',stoneBand,0,.32,0,1,.64,1);
   add('chennai-public-hall-footprint','stone',brick,0,6.4,0,1,12,1);
   for(const {side,start,z} of [{side:1,start:-17.7,z:12.61},{side:-1,start:-7.5,z:-13.84}]){
    for(let bay=0;bay<6;bay++){
     const x=start+4.75*bay;
     for(const y of [3.6,9.12]){
      box(shadow,x,y-.22,z+side*.055,3.22,4.16,.16);
      add('masonry-arch','stone',trim,x,y,z+side*.2,4.36,4.5,.33);
      box(stoneBand,x,y-2.12,z+side*.31,3.62,.16,.37);
     }
    }
    for(const y of [1.13,6.18,11.88])box(stoneBand,start+11.875,y,z+side*.27,28,.23,.51);
   }
   const endArch=new T.Quaternion().setFromAxisAngle(UP,Math.PI/2);
   for(const side of [-1,1]){
    const x=side*26.02;
    for(const z of [-4.6,0,4.6]){
     box(shadow,x+side*.10,2.75,z,.31,4.65,2.45);
     add('masonry-arch','stone',stoneBand,x+side*.30,3.48,z,3.55,5.65,.48,endArch);
     box(shadow,x+side*.08,9.50,z,.30,2.88,2.12);
     add('masonry-arch','stone',trim,x+side*.25,9.60,z,3.12,3.5,.37,endArch);
    }
    box(stoneBand,x+side*.22,6.44,0,.50,.34,14.25);
   }
   add('hip-roof','stone',roof,-.1,12.37,.33,50,6.63,24.5);
   const towerX=17.6,towerZ=8.6;
   box(brick,towerX,19.37,towerZ,10.29,14.06,11.6);
   for(const y of [13.05,20.94,25.77,26.55])box(trim,towerX,y,towerZ,10.75,.36,11.95);
   box(stoneBand,towerX,27.05,towerZ,11.2,.4,12.45);
   for(const side of [-1,1]){
    const faceZ=towerZ+side*5.82,faceX=towerX+side*5.16;
    for(const offset of [-2.22,0,2.22]){
     box(shadow,towerX+offset,23.53,faceZ,1.39,3.15,.13);
     add('masonry-arch','stone',trim,towerX+offset,23.63,faceZ+side*.1,2.12,3.55,.2);
     box(shadow,faceX,23.53,towerZ+offset,.13,3.15,1.39);
     add('masonry-arch','stone',trim,faceX+side*.1,23.63,towerZ+offset,2.12,3.55,.2,
      endArch);
    }
   }
   add('pyramid','stone',roof,towerX,30.05,towerZ,7.85,5.63,8.67,
    new T.Quaternion().setFromAxisAngle(UP,Math.PI/4));
   cylinder(0x674237,towerX,33.29,towerZ,.17,1.14);
   sphere(stoneBand,towerX,33.91,towerZ,.09,.09,.09,'stone');
  }else if(model==='liverpool-playhouse'){
   const stucco=0xc6baa9,trim=0xdcd2c3,slate=0x51535b,glass=0x547084,shadow=0x4b433e;
   add('liverpool-playhouse-mass','stone',stucco,0,10.8,0,1,21.6,1);
   box(slate,0,21.75,-.21,20.05,.65,30.7);
   add('liverpool-playhouse-foyer','glass',glass,0,11.5,0,1,13,1);
   for(const [x,z] of [[-20.3,11.9],[-18.0,16.5],[-14.3,15.1]]){
    cylinder(0xa2a5a6,x,2.5,z,.25,5,'metal');
   }
   add('liverpool-playhouse-foyer','metal',0x797f84,0,5.12,0,1,.26,1);
   add('liverpool-playhouse-foyer','metal',0x797f84,0,17.92,0,1,.24,1);
   for(const [x,z] of [[-12.3,13.8],[-14.0,17.6],[-16.9,18.71],[-19.4,18.0],[-21.4,16.9],[-22.38,14.1]]){
    cylinder(0x81919b,x,11.51,z,.11,12.76,'metal');
   }
   box(stucco,-10.99,11.4,11.9,2.70,12.85,6.6);
   box(trim,0,12.18,15.83,20.68,.26,.48);
   box(trim,0,17.50,15.83,20.68,.31,.54);
   box(trim,0,21.15,15.83,20.80,.58,.79);
   box(stucco,0,14.90,15.94,8.86,11.6,.56);
   for(let i=-3;i<=3;i++){
    const x=i*2.62,front=Math.abs(i)<2?16.29:15.72;
    box(trim,x,14.78,front,1.63,3.36,.17);
    box(shadow,x,14.8,front+.1,1.22,2.87,.10);
    box(glass,x,14.84,front+.16,1.10,2.62,.034,'glass');
    box(trim,x,14.76,front+.19,1.24,.08,.05);
    add('vertical-torus','stone',trim,x,19.06,front+.14,.61,.61,1.3);
    add('cylinder','glass',glass,x,19.06,front+.13,.582,.10,.582,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2));
   }
   for(let i=-1;i<=1;i++){
    const x=i*2.52;
    box(trim,x,3.45,16.14,2.12,5.45,.25);
    box(shadow,x,3.22,16.29,1.74,4.62,.19);
    box(glass,x,3.23,16.41,1.49,4.33,.04,'glass');
    box(trim,x,3.22,16.44,.069,4.38,.056);
   }
   for(const side of [-1,1]){
    box(trim,side*4.50,15.20,16.21,.41,11.4,.36);
    box(trim,side*2.8,22.16,16.10,4.68,.34,.46);
    const rake=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-side*.37);
    add('box','stone',trim,side*2.63,22.63,16.12,4.27,.29,.43,rake);
    const towerX=side*9.49;
    cylinder(stucco,towerX,21.25,15.2,1.29,2.9);
    add('pimpri-pavilion-dome','stone',slate,towerX,22.68,15.2,1.39,1.27,1.39);
   }
   box(0x8c8075,0,.36,17.03,10.31,.66,2.34);
  }else if(model==='kanpur-gandhi-pavilion'){
   const cream=0xe9e2cd,pale=0xdad5cb,sand=0xb79f86,letter=0x4a4640,metal=0x585547;
   for(let i=0;i<6;i++)box(pale,0,.13+.232*i,.91-.20*i,11.2-.56*i,.255,10.12-.49*i);
   box(cream,0,1.48,0,7.97,.19,7.67);
   for(const side of [-1,1])for(const front of [-1,1]){
    const x=side*3.13,z=front*3.04;
    box(sand,x,1.73,z,.63,.31,.63);
    cylinder(cream,x,3.70,z,.217,3.74);
    box(cream,x,5.58,z,.52,.25,.52);
   }
   box(cream,0,5.84,0,7.8,.48,7.74);
   box(pale,0,6.11,0,7.55,.19,7.46);
   cylinder(cream,0,6.28,0,3.36,.16);
   add('pimpri-pavilion-dome','stone',cream,0,6.35,0,3.35,1.12,3.35);
   sphere(sand,0,7.44,0,.11,.11,.11,'stone');
   box(sand,0,1.87,.18,2.49,.63,1.98);
   box(cream,0,2.24,.18,2.66,.16,2.17);
   box(letter,0,1.89,1.183,1.81,.33,.025);
   const feet=2.32;
   for(const side of [-1,1])sphere(metal,.20*side,feet+.04,.19,.12,.061,.23,'patina');
   add('robe','patina',metal,0,feet+.52,.16,.39,.96,.26);
   sphere(metal,0,feet+1.22,.14,.36,.52,.24,'patina');
   limb([-.27,feet+1.51,.32],[.26,feet+1.04,.39],.079,0x6f6555,'patina');
   sphere(metal,.02,feet+1.82,.17,.14,.20,.144,'patina');
   for(const side of [-1,1]){
    box(sand,side*4.32,.54,4.18,1.47,.91,1.06);
    box(letter,side*4.32,.77,4.73,1.33,.40,.12);
   }
  }else if(model==='kanpur-king-edward-hall'){
   const plaster=0xe5dfcd,trim=0xf3eadd,base=0xb9ad98,dark=0x55514b,roof=0xa68d7e;
   add('kanpur-king-edward-footprint','stone',base,0,.43,0,1,.86,1);
   add('kanpur-king-edward-footprint','stone',plaster,0,5.54,0,1,9.5,1);
   add('kanpur-king-edward-footprint','stone',trim,0,10.40,0,1,.60,1);
   for(const {positions,z} of [
    {positions:[-31,-26,23,27],z:6.38},{positions:[-15.4,-11.5,-7.6,7.3,10.55,13.4],z:12.75}
   ])for(const x of positions){
    for(const y of [3.02,7.36]){
     box(dark,x,y-.22,z,2.26,3.74,.24);
     add('masonry-arch','stone',trim,x,y,z+.12,3.49,4.02,.32);
     box(base,x,y-1.73,z+.20,2.85,.18,.47);
    }
   }
   for(const x of [-19.78,16.65]){
    const width=x<0?5.45:6.50,z=15.72,face=x<0?18.63:18.43;
    box(dark,x,7.37,face,1.81,3.10,.24);
    add('masonry-arch','stone',trim,x,7.65,face+.12,3.08,3.63,.29);
    box(plaster,x,10.6,z,width,1.42,5.9);
    box(trim,x,11.31,z,width+.35,.43,6.15);
    cylinder(trim,x,11.83,z,2.44,.62);
    sphere(trim,x,12.08,z,2.44,2.36,2.44,'stone');
    cylinder(base,x,14.34,z,.13,.72);
    sphere(base,x,14.63,z,.27,.31,.27,'stone');
   }
   const towerZ=15.82;
   box(plaster,0,11.73,towerZ,10.50,4.8,8.08);
   box(trim,0,14.14,towerZ,10.85,.36,8.34);
   box(plaster,0,16.64,towerZ,6.47,4.91,6.4);
   box(trim,0,19.23,towerZ,7.01,.36,6.96);
   box(dark,0,3.1,20.55,4.36,4.15,.27);
   add('masonry-arch','stone',trim,0,3.86,20.63,6.63,5.99,.42);
   for(const side of [-1,1]){
    const x=side*3.24,z=towerZ+side*3.21;
    sphere(dark,0,17.22,z,1.13,1.13,.10,'stone');
    sphere(trim,0,17.22,z+side*.071,.92,.92,.061,'stone');
    box(dark,.11,17.44,z+side*.132,.11,.55,.047);
    box(dark,.18,17.24,z+side*.135,.48,.10,.043);
    sphere(dark,x,17.22,towerZ,.10,1.13,1.13,'stone');
    sphere(trim,x+side*.071,17.22,towerZ,.061,.92,.92,'stone');
    box(dark,x+side*.132,17.44,towerZ+.11,.047,.55,.11);
    box(dark,x+side*.135,17.24,towerZ+.18,.043,.10,.48);
   }
   add('pyramid','stone',roof,0,20.49,towerZ,4.87,2.25,4.87,
    new T.Quaternion().setFromAxisAngle(UP,Math.PI/4));
   cylinder(trim,0,21.58,towerZ,.12,.57);
   sphere(trim,0,21.77,towerZ,.25,.23,.25,'stone');
  }else if(model==='mactan-lapulapu'){
   const stonework=0xc0b4a0,moulding=0xd5c7ab,bronze=0x8d663a,darkBronze=0x684a31,detail=0xa88553;
   box(stonework,0,.28,0,5.25,.56,5.25);
   box(moulding,0,.71,0,4.80,.36,4.80);
   box(stonework,0,2.32,0,3.86,2.88,3.86);
   box(moulding,0,3.89,0,4.16,.31,4.16);
   box(stonework,0,4.12,0,3.66,.24,3.71);
   box(0x777269,0,2.47,1.946,1.22,.65,.071);
   const casting=(a,b,r)=>limb(a,b,r,bronze,'patina');
   sphere(bronze,0,7.47,.04,.75,1.19,.46,'patina');
   sphere(bronze,0,8.18,.02,.94,.51,.46,'patina');
   add('robe','patina',darkBronze,0,6.58,.03,.68,.84,.51);
   for(const s of [-1,1]){
    const ankle=[s*.54,4.47,s*.11],knee=[s*.42,5.43,s*.02],hip=[s*.26,6.55,.012];
    casting(ankle,knee,.28);casting(knee,hip,.36);
    sphere(bronze,s*.55,4.41,.19+s*.11,.34,.17,.55,'patina');
    sphere(detail,s*.33,8.12,.34,.45,.31,.17,'patina');
   }
   casting([0,8.38,.07],[.01,9.14,.095],.26);
   sphere(bronze,.018,9.48,.14,.40,.48,.36,'patina');
   sphere(bronze,.018,9.45,.46,.09,.15,.077,'patina');
   sphere(darkBronze,-.008,9.83,.005,.43,.29,.42,'patina');
   add('robe','patina',darkBronze,0,9.04,-.23,.41,1.07,.20);
   casting([-.79,8.15,.03],[-1.00,7.34,.055],.27);
   casting([-1.00,7.34,.055],[-.70,6.68,.54],.22);
   casting([.79,8.15,.05],[1.04,7.68,.18],.28);
   casting([1.04,7.68,.18],[1.12,7.10,.52],.23);
   sphere(bronze,-.71,6.63,.56,.25,.22,.25,'patina');
   sphere(bronze,1.10,7.09,.55,.22,.21,.25,'patina');
   const shieldPlane=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('cylinder','patina',darkBronze,1.05,6.52,.66,.89,.16,1.16,shieldPlane);
   add('cylinder','patina',bronze,1.05,6.52,.76,.78,.09,1.04,shieldPlane);
   sphere(detail,1.05,6.52,.85,.21,.24,.12,'patina');
   const blade=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-.27);
   add('box','patina',detail,-.87,5.72,.57,.23,2.12,.095,blade);
   box(darkBronze,-.70,6.55,.57,.56,.13,.14,'patina');
  }else if(model==='mactan-magellan-obelisk'){
   const stonework=0xc3b7a5,trim=0xe1d4be,shade=0xa9937b,plaque=0x6b5b4d;
   box(stonework,0,.20,0,5.6,.40,5.60);
   box(trim,0,.49,0,5.09,.21,5.09);
   box(stonework,0,1.34,0,3.72,1.58,3.72);
   box(trim,0,2.18,0,3.89,.26,3.89);
   box(stonework,0,3.14,0,2.75,1.77,2.75);
   for(const side of [-1,1]){
    box(shade,side*1.05,3.20,1.43,.15,1.51,.12);
    box(trim,side*1.26,3.20,1.45,.21,1.64,.23);
   }
   box(plaque,0,3.17,1.40,1.20,.79,.064);
   box(trim,0,4.16,0,3.04,.32,3.04);
   box(stonework,0,4.55,0,2.44,.46,2.44);
   add('mactan-obelisk-shaft','stone',stonework,0,6.79,0,1.66,4.04,1.66);
   add('pyramid','stone',trim,0,8.95,0,.92,.50,.92);
  }else if(model==='lucknow-hussainabad-clock'){
   const brick=0x995943,rose=0xb97154,pale=0xd5b99d,dark=0x56443c,clock=0xf2e4c8,copper=0xb2a083;
   box(pale,0,.39,0,8.12,.78,8.12);
   box(rose,0,1.70,0,7.16,1.90,7.16);
   box(brick,0,22.48,0,6.096,39.70,6.096);
   for(const x of [-2.94,2.94])for(const z of [-2.94,2.94])box(rose,x,23.1,z,.24,39.1,.24);
   for(const y of [3.2,12.4,24.65,36.5,41.97])box(pale,0,y,0,6.41,.51,6.41);
   box(rose,0,42.52,0,7.19,.68,7.19);
   box(pale,0,43.06,0,7.75,.50,7.75);
   box(brick,0,47.23,0,6.90,8.02,6.90);
   box(pale,0,51.30,0,7.81,.52,7.81);
   box(rose,0,52.12,0,7.21,1.18,7.21);
   box(brick,0,55.44,0,6.10,5.52,6.10);
   box(pale,0,58.19,0,6.64,.55,6.64);
   for(let quadrant=0;quadrant<4;quadrant++){
    const yaw=quadrant*Math.PI/2,ca=Math.cos(yaw),sa=Math.sin(yaw);
    const place=(x,y,z)=>[x*ca+z*sa,y,-x*sa+z*ca];
    const orientation=new T.Quaternion().setFromAxisAngle(UP,yaw);
    for(const y of [9.15,19.66,31.85]){
     add('box','stone',dark,...place(0,y,3.043),.91,2.7,.087,orientation);
     add('masonry-arch','stone',rose,...place(0,y+.34,3.10),1.55,3.15,.24,orientation);
    }
    const face=3.46;
    add('sphere','stone',pale,...place(0,47.25,face),2.41,2.41,.13,orientation);
    for(let petal=0;petal<12;petal++){
     const angle=petal*Math.PI/6;
     add('sphere','stone',pale,...place(2.28*Math.sin(angle),47.25+2.28*Math.cos(angle),face+.02),.337,.337,.12,orientation);
     add('sphere','metal',dark,...place(1.66*Math.sin(angle),47.25+1.66*Math.cos(angle),face+.19),.105,.105,.075,orientation);
    }
    add('sphere','stone',clock,...place(0,47.25,face+.10),1.95,1.95,.125,orientation);
    limb(place(0,47.25,face+.25),place(0,48.65,face+.25),.073,dark,'stone');
    limb(place(0,47.25,face+.25),place(.66,46.87,face+.25),.093,dark,'stone');
    add('box','stone',dark,...place(0,55.33,3.047),1.26,2.81,.12,orientation);
    add('masonry-arch','stone',pale,...place(0,55.59,3.13),2.18,3.34,.23,orientation);
   }
   for(const x of [-2.90,2.90])for(const z of [-2.90,2.90]){
    box(rose,x,58.95,z,.93,1.45,.93);
    add('pyramid','stone',copper,x,60.13,z,.78,1.06,.78);
   }
   box(rose,0,59.08,0,4.4,1.60,4.4);
   add('pyramid','stone',copper,0,61.38,0,3.13,3.12,3.13,
    new T.Quaternion().setFromAxisAngle(UP,Math.PI/4));
   cylinder(copper,0,63.17,0,.47,1.36);
   cylinder(copper,0,65.13,0,.16,3.72);
   sphere(copper,0,67.0404,0,.24,.3204,.24,'stone');
  }else if(model==='lucknow-hussainabad-tank'){
   const walls=[0xb27859,0xbf876a,0xbe8665,0xc49070];
   for(const [i] of owner.feature.terraceRims.entries()){
    const height=.83*(i+1);
    add('lucknow-tank-terrace-'+i,'stone',walls[i],0,height/2,0,1,height,1);
   }
  }else if(model==='chongqing-great-hall'){
   const marbleTrim=0xdbd2be,wall=0xb89f83,red=0x952e2f,shadow=0x413632;
   const green=0x326a68,teal=0x4a8180,burnished=0xbe9a55;
   add('chongqing-hall-footprint','stone',wall,0,3.8,0,1,7.6,1);
   add('chongqing-hall-footprint','stone',marbleTrim,0,7.1,0,1,1.02,1);
   for(let i=0;i<15;i++){
    const rise=.52*(i+1);
    box(marbleTrim,0,rise/2,62-.79*i,39.5-.28*i,rise,1.16);
   }
   box(marbleTrim,0,7.49,39.1,40,.38,29);
   box(wall,0,10.1,33.8,32,5,28);
   box(wall,0,10.95,48.7,33.5,6.7,7.4);
   box(shadow,0,11.15,52.45,27,5.8,.12);
   box(red,0,14.52,49.9,34,.7,6.5);
   box(green,0,15.23,48.68,37,1.28,9.2);
   box(teal,0,16.06,48.68,33,.42,7.1);
   for(let i=-3;i<=3;i++){
    cylinder(red,4.72*i,11.07,52.8,.58,6.45);
    box(marbleTrim,4.72*i,7.92,52.8,1.6,.36,1.55);
   }
   cylinder(wall,0,17.8,0,21.6,20.4);
   cylinder(red,0,28.15,0,23.1,2.4);
   cylinder(shadow,0,36.9,0,17.1,9.4);
   cylinder(red,0,46.4,0,10.9,8.4);
   for(let i=0;i<24;i++){
    const a=i*Math.PI/12;
    cylinder(red,22.5*Math.sin(a),18.55,22.5*Math.cos(a),.59,21.9);
    cylinder(marbleTrim,22.5*Math.sin(a),7.97,22.5*Math.cos(a),.87,.65);
    cylinder(teal,17.5*Math.sin(a),38.8,17.5*Math.cos(a),.35,5.4);
   }
   const tier=(y,r,h)=>{
    add('chongqing-eaves','stone',green,0,y,0,r,h,r);
    add('fountain-deck','stone',teal,0,y+.24,0,r*.983,.62,r*.983);
    add('fountain-deck','stone',burnished,0,y-.20,0,r*.950,.26,r*.950);
   };
   tier(29.2,27.5,10.2);
   tier(40.0,21.6,9.5);
   tier(49.8,15.0,10.8);
   cylinder(burnished,0,60.7,0,1.13,1.05,'metal');
   sphere(burnished,0,62.3,0,1.67,1.57,1.67);
   add('cone','metal',burnished,0,64.05,0,.72,1.9,.72);
   for(const sign of [-1,1]){
    box(wall,sign*23.0,10.61,49.6,12.6,6.1,7.4);
    box(red,sign*23.0,13.9,51.0,12.8,.6,7.8);
    box(green,sign*23.0,14.55,50.3,13.8,.75,8.8);
    const wing=sign*48.2;
    box(wall,wing,11.1,50.1,42.5,7.15,8.4);
    box(shadow,wing,11.5,54.42,39.4,4.4,.11);
    for(let post=0;post<10;post++){
     const x=wing+(post-4.5)*4.2;
     cylinder(red,x,11.68,54.75,.47,6.24);
     box(marbleTrim,x,8.65,54.82,1.24,.42,1.26);
    }
    box(red,wing,14.92,51.9,42.8,.94,9.0);
    box(green,wing,15.83,51.5,45.0,.87,10.9);
    box(teal,wing,16.48,50.5,42.3,.52,8.7);
    const tower=sign*67.0;
    box(wall,tower,16.8,49.5,15.5,18.4,13.5);
    box(red,tower,23.5,56.31,12.3,4.9,.15);
    add('chongqing-eaves','stone',green,tower,25.45,49.5,11.0,4.8,9.6);
    box(burnished,tower,30.15,49.5,1.4,.82,1.3);
   }
  }else if(model==='milano-duomo'){
   const pale=0xe4ded4,marble=0xece5db,trim=0xd2ccc3,glazing=0x626060;
   add('milano-duomo-footprint','stone',pale,0,10,0,1,20,1);
   const pinnacle=(x,z,y,height,radius)=>{
    box(trim,x,y+height*.24,z,radius*1.6,height*.48,radius*1.6);
    add('cone','stone',marble,x,y+height*.74,z,radius,height*.52,radius);
   };
   box(pale,0,31,4,53,22,144);
   box(trim,0,46,-2,22,9,137);
   box(pale,0,32,-20,79,24,30);
   box(marble,0,23,75,65,46,3.9);
   add('pediment','stone',marble,0,52,75,44,13,4);
   for(const x of [-30,-21,-12,12,21,30]){
    const h=44+(30-Math.abs(x))*.28;
    box(trim,x,h*.5,76.7,2.45,h,2.6);
    pinnacle(x,76.7,h,13,1.4);
   }
   pinnacle(0,75,58.2,10.7,1.6);
   for(const x of [-25,-16,0,16,25]){
    const middle=x===0,width=middle?7.1:5.4,height=middle?15:10.8;
    add('milano-duomo-portal','stone',glazing,x,0,77,width,height,1);
    add('milano-duomo-portal','stone',trim,x,22,77,width*.86,height*.83,1);
    box(pale,x,26,77.55,.44,7.6,.32);
   }
   for(const side of [-1,1]){
    for(const z of [57,45,34,23,12,1,-10,-25,-38,-51,-62]){
     pinnacle(side*27,z,41,12,1.36);
    }
    for(const z of [-38,-20,-9])pinnacle(side*38,z,42,13,1.55);
   }
   const spireX=.215,spireZ=-22.41;
   cylinder(pale,spireX,57.5,spireZ,9.6,19);
   for(let n=0;n<8;n++){
    const angle=n*Math.PI/4;
    pinnacle(spireX+9.1*Math.sin(angle),spireZ+9.1*Math.cos(angle),63,15,1.65);
   }
   cylinder(trim,spireX,72,spireZ,3.7,16);
   add('cone','stone',pale,spireX,92.17,spireZ,3.9,24.34,3.9);
   cylinder(trim,spireX,104.14,spireZ,.48,1.15);
   sphere(gold,spireX,106.42,spireZ,.96,2.08,.96,'metal');
  }else if(model==='milano-vittorio-emanuele'){
   const granite=0x9b7466,carrara=0xe6dfd1,cast=0x655650;
   box(granite,0,.36,0,10.8,.72,15.2);
   box(granite,0,.97,0,10.1,.50,14.5);
   box(carrara,0,1.43,0,8.7,.42,13.2);
   box(granite,0,4.79,0,4.35,6.30,8.40);
   box(carrara,0,8.26,0,5.00,.64,9.05);
   box(granite,0,8.93,0,4.48,.70,8.40);
   for(const side of [-1,1]){
    box(cast,side*2.20,4.83,0,.14,2.60,7.63,'patina');
    for(const z of [-2.86,-1.93,-1.05,.03,.99,1.86,2.83]){
     sphere(0x887266,side*2.30,4.64,z,.14,.72,.28,'patina');
    }
    sphere(carrara,0,2.27,side*5.40,.86,.62,1.15,'stone');
    sphere(0xc6bdb0,0,2.78,side*6.12,.61,.55,.65,'stone');
    sphere(carrara,0,2.67,side*6.50,.47,.35,.40,'stone');
    for(const x of [-.43,.43])sphere(carrara,x,1.89,side*6.28,.32,.22,.55,'stone');
   }
   const start=parts.length;
   horse();
   for(let index=start;index<parts.length;index++){
    const part=parts[index],scale=1.33;
    part.x*=scale;part.y=9.11+part.y*scale;part.z*=scale;
    part.sx*=scale;part.sy*=scale;part.sz*=scale;
   }
  }else if(model==='vilnius-cathedral-belfry'){
   const stone=0xe0ddd1,trim=0xbdb9aa,copper=0x52685d,shadow=0x5a5a54;
   cylinder(trim,0,.40,0,7.19,.80);
   cylinder(stone,0,8.7,0,6.82,16.6);
   cylinder(trim,0,17.2,0,7.03,.65);
   for(const [base,top,radius] of [[17.45,28.8,6.08],[29.20,39.0,5.46],[39.42,45.7,4.67]]){
    const height=top-base;
    add('octagonal-column','stone',stone,0,(base+top)/2,0,radius,height,radius);
    add('octagonal-column','stone',trim,0,top,0,radius+.16,.48,radius+.16);
    for(let side=0;side<8;side++){
     const a=(side+.5)*Math.PI/4,out=radius*Math.cos(Math.PI/8)+.03;
     const frame=new T.Quaternion().setFromAxisAngle(UP,a);
     add('box','stone',shadow,out*Math.sin(a),base+height*.55,out*Math.cos(a),radius*.37,height*.42,.10,frame);
    }
   }
   add('bandstand-roof','metal',copper,0,45.95,0,4.64,5.55,4.64);
   sphere(copper,0,51.9,0,.66,.44,.66,'metal');
   limb([0,52,0],[0,57,0],.076,copper);
   limb([-1.36,55,0],[1.36,55,0],.06,copper);
  }else if(model==='vilnius-cathedral-basilica'){
   const plaster=0xe7e4d8,trim=0xf3efe3,roof=0x626761,glass=0x555957;
   box(0xbdb9ab,0,.45,0,43.4,.90,68.2);
   box(plaster,0,7.03,-3.2,39.2,12.8,61.9);
   box(plaster,0,9.46,-6.1,24.2,15.9,55.2);
   for(const side of [-1,1]){
    add('box','metal',roof,side*6.40,18.36,-6.1,14.1,.31,55.6,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),side*-.34));
    for(const z of [-24,-15,-6,3,12,21])box(glass,side*19.62,7.36,z,.16,4.72,1.93,'metal');
   }
   box(plaster,0,6.72,28.3,30.4,12.4,5.6);
   for(const x of [-12.6,-7.55,-2.51,2.51,7.55,12.6]){
    cylinder(trim,x,6.48,31.6,.64,10.48);
    box(trim,x,11.9,31.6,1.65,.48,1.65);
   }
   box(trim,0,12.63,31.4,30.6,1.38,5.9);
   for(let layer=0;layer<11;layer++)box(trim,0,13.49+layer*.52,31.34,29.0-layer*2.55,.53,5.47);
   for(let step=0;step<3;step++)box(trim,0,.12+step*.20,33.84-step*.56,31.3-step*.45,.24,3.38);
   box(plaster,14.3,8.64,-28.8,10.4,16.36,10.7);
   add('bandstand-roof','metal',roof,14.3,16.9,-28.8,5.20,4.25,5.20);
  }else if(model==='vilnius-miracle-tile'){
   box(0xab726e,0,.037,0,.78,.022,.78);
   for(let ray=0;ray<8;ray++){
    const angle=ray*Math.PI/4;
    limb([0,.051,0],[.21*Math.sin(angle),.051,.21*Math.cos(angle)],.010,0xac8660);
   }
  }else if(model==='vilnius-baltic-way-tile'){
   box(0x8d8880,0,.037,0,.78,.022,.78);
   for(const side of [-1,1]){
    sphere(0x725945,side*.135,.052,side*.047,.065,.004,.136,'metal');
    sphere(0x725945,side*.141,.052,side*.047+.123,.060,.004,.050,'metal');
   }
  }else if(model==='kuopio-veljmies'){
   const patina=0x536957,granite=0x9c978a;
   box(granite,0,.56,0,1.45,1.12,1.15);
   sphere(patina,0,2.42,.02,.25,.46,.15,'patina');
   sphere(patina,-.03,2.98,.05,.155,.208,.156,'patina');
   for(const side of [-1,1]){
    limb([side*.13,2.08,0],[side*.20,1.22,.05],.075,patina,'patina');
    sphere(patina,side*.20,1.16,.12,.10,.045,.18,'patina');
    limb([side*.20,2.66,.02],[side*.45,2.40,.10],.067,patina,'patina');
    limb([side*.45,2.40,.10],[side*.63,2.53,.14],.057,patina,'patina');
    sphere(patina,side*.71,2.25,.14,.11,.27,.07,'patina');
    add('cone','patina',patina,side*.71,2.51,.14,.095,.12,.04);
   }
  }else if(model==='kuopio-siskotytto'){
   const patina=0x536756;
   box(0x999388,0,.20,0,1.22,.40,1.07);
   add('robe','patina',patina,0,1.08,0,.45,1.26,.28);
   sphere(patina,0,1.13,0,.34,.55,.21,'patina');
   sphere(patina,0,1.92,0,.29,.47,.20,'patina');
   sphere(patina,-.03,2.60,.04,.19,.24,.17,'patina');
   limb([-.24,2.10,.03],[-.47,1.76,.20],.072,patina,'patina');
   limb([-.47,1.76,.20],[-.12,1.71,.35],.060,patina,'patina');
   limb([.24,2.08,.03],[.43,1.80,.19],.072,patina,'patina');
   limb([.43,1.80,.19],[.56,1.89,.29],.057,patina,'patina');
   limb([.56,1.89,.29],[.56,1.61,.29],.022,patina,'patina');
   box(patina,.56,1.60,.29,.43,.032,.03,'metal');
   for(const side of [-1,1]){
    const x=.56+side*.18;
    limb([x,1.61,.29],[x,1.39,.33],.013,patina,'patina');
    cylinder(patina,x,1.37,.33,.092,.035,'patina');
   }
  }else if(model==='kuopio-market-hall'){
   const butter=0xe1b877,trim=0xf0d7a4,roof=0x43554e,glass=0x597e87;
   const hallZ=5.3;
   box(0x7c6f5d,0,.59,hallZ,52.5,1.18,17.6);
   box(butter,0,4.3,hallZ,51.65,6.5,17.1);
   box(trim,0,7.65,hallZ,52.2,.62,17.7);
   for(const side of [-1,1]){
    add('box','metal',roof,0,9.55,hallZ+side*4.27,51.4,.46,10.1,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),side*.38));
    box(butter,side*22.7,6.05,hallZ,5.5,11.5,7.6);
    box(trim,side*22.7,11.78,hallZ,5.87,.58,7.87);
    add('bandstand-roof','metal',roof,side*22.7,12.06,hallZ,2.94,2.77,3.73);
    sphere(roof,side*22.7,14.77,hallZ,.15,.19,.15,'metal');
    box(0x655647,side*25.47,2.77,hallZ,.16,4.70,2.76,'metal');
    for(const x of [-19.3,-14.8,-10.3,-5.8,5.8,10.3,14.8,19.3]){
     const z=hallZ+side*8.56;
     box(trim,x,4.19,z,2.65,4.22,.18);
     box(glass,x,4.12,z+side*.135,2.13,3.46,.12,'metal');
     box(trim,x,4.21,z+side*.22,2.05,.12,.08);
    }
   }
   const pavilionZ=-13.0;
   cylinder(glass,-1.5,2.16,pavilionZ,9.7,4.32,'metal');
   cylinder(roof,-1.5,4.41,pavilionZ,9.88,.32,'metal');
   for(let panel=0;panel<12;panel++){
    const angle=panel*Math.PI/6;
    cylinder(trim,-1.5+9.73*Math.cos(angle),2.14,pavilionZ+9.73*Math.sin(angle),.074,4.3,'metal');
   }
  }else if(model==='stortorget-stone-well'){
   const sandstone=0xb9a987,trim=0xc7b79a,iron=0x383631;
   box(sandstone,0,.16,0,3.16,.32,3.16);
   box(trim,0,.42,0,2.96,.24,2.96);
   box(sandstone,0,1.56,0,2.19,2.19,2.19);
   box(trim,0,2.73,0,2.49,.25,2.49);
   box(sandstone,0,3.01,0,2.64,.31,2.64);
   add('bandstand-roof','stone',trim,0,3.14,0,1.54,.93,1.54);
   cylinder(sandstone,0,4.12,0,.42,.52);
   sphere(iron,0,4.65,0,.23,.23,.23);
   for(const side of [-1,1]){
    box(trim,side*.97,1.68,0,.25,1.98,2.24);
    for(const x of [-1,1])box(trim,side*.99,1.68,x*.97,.26,1.98,.26);
    sphere(iron,side*1.13,1.62,0,.10,.18,.17);
    sphere(iron,0,1.62,side*1.13,.17,.18,.10);
    limb([side*1.12,1.65,.42],[side*1.16,2.25,.42],.038,iron);
    limb([.42,1.65,side*1.12],[.42,2.25,side*1.16],.038,iron);
   }
  }else if(model==='stortorget-stock-exchange'){
   const plaster=0xcfba9c,trim=0xe7d9c4,roof=0x485250,glass=0x3a423f;
   box(0xab9f90,0,.55,0,44.2,1.1,28.4);
   box(plaster,0,9.0,0,44.2,16.9,28.4);
   box(trim,0,6.1,0,44.8,.54,29);
   box(trim,0,17.65,0,45,.68,29);
   box(roof,0,19.85,0,42.4,3.56,26.5,'metal');
   for(const side of [-1,1]){
    add('box','metal',roof,0,23.0,side*6.65,42.0,.28,15.2,
     new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),side*.42));
   }
   box(plaster,0,10.15,14.21,12.5,16.6,1.26);
   box(trim,0,18.8,14.79,12.9,.67,1.3);
   box(trim,0,24.3,0,2.3,3.4,2.2);
   add('pyramid','metal',roof,0,27.24,0,1.55,2.68,1.55);
   for(const x of [-17.9,-13.6,-9.35,-4.95,0,4.95,9.35,13.6,17.9]){
    const front=Math.abs(x)<5?14.90:14.23;
    box(trim,x,11.68,front,2.52,5.25,.31);
    box(glass,x,11.66,front+.171,1.85,4.68,.055,'metal');
    box(trim,x,11.44,front+.203,1.88,.17,.064);
    box(trim,x,11.66,front+.203,.14,4.68,.064);
    if(Math.abs(x)>5)box(glass,x,3.8,14.28,1.48,2.45,.06,'metal');
   }
   for(const x of [-4.56,0,4.56]){
    box(trim,x,3.2,14.94,2.82,4.87,.38);
    box(0x50473e,x,2.94,15.16,2.1,4.15,.08,'metal');
   }
  }else if(model==='kansalaistori-song-trees'){
   const steel=0x505c60;
   add('kansalaistori-pike','metal',steel,0,0,0,1,1,1);
   sphere(0x343f43,.31,11.37,.49,.15,.15,.10,'metal');
   for(const direction of [-1,1]){
    const x=direction*1.27,z=direction*2.37,height=direction>0?10.6:11.2;
    box(steel,x,height*.48,z,.52,height*.96,.59,'metal');
    for(let tier=0;tier<5;tier++){
     const y=1.27+tier*height*.165;
     for(let row=0;row<3;row++)box(0x5b6769,x,y+row*.23,z+(row-1)*.39,1.92,.17,1.36,'metal');
     add('box','metal',0x394749,x,y+.78,z,2.36,.165,2.34,
      new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),direction*.18));
    }
   }
  }else if(model==='kansalaistori-oodi-library'){
   const glass=0x536f7b,spruce=0xba8453,roof=0xebe9de;
   box(glass,0,3.65,0,37.5,7.3,142.6);
   add('oodi-spruce-wave','stone',spruce,0,0,0,46.4,16.9,150.5);
   box(0xcba274,2.8,15.5,0,35.2,1.45,148.5);
   box(glass,2.2,19.2,0,38.9,6.3,143.8);
   box(roof,1.0,23,0,44.9,2,151);
   for(let panel=-6;panel<=6;panel++)box(0xd2d5cd,-17.3,19.2,panel*10.6,.18,6.3,.16);
  }else if(model==='verrazzano-memorial'){
   const travertine=0xb9ae96;
   steps(0,4.3);
   box(travertine,0,1.11,0,3.16,.94,3.16);
   box(travertine,0,2.33,0,2.26,1.62,2.16);
   box(marble,0,3.21,0,2.54,.24,2.45);
   plaque(2.15,1.38,1.1);
   human(0,3.33,0,1.45,'civil',0x38534a);
  }else if(model==='alcazar-cervantes-riders'){
   const limestone=0xb7a991;
   box(limestone,-1.64,.27,.30,2.38,.54,4.24);
   box(limestone,1.57,.27,-.30,2.12,.54,3.63);
   for(const [x,z,size,knight] of [[-1.64,.30,1,true],[1.57,-.30,.79,false]]){
    const first=parts.length;
    horse();
    if(knight){
     limb([.45,.65,.40],[.45,6.10,.60],.043,bronze);
     add('cone','metal',bronze,.45,6.19,.60,.087,.31,.087);
     sphere(bronze,-.70,3.15,.27,.16,.65,.44);
    }else{
     for(const side of [-1,1])limb([side*.19,3.13,1.28],[side*.26,3.75,1.20],.085);
    }
    for(const part of parts.slice(first)){
     part.x=x+part.x*size;part.y=.54+part.y*size;part.z=z+part.z*size;
     part.sx*=size;part.sy*=size;part.sz*=size;
    }
   }
  }else if(model==='fray-bentos-bandstand'||model==='paraitinga-bandstand'){
   const paraitinga=model==='paraitinga-bandstand';
   const post=paraitinga?0x3c608e:0xe5debd,accent=paraitinga?0xd78339:0xc5b68f;
   const platform=paraitinga?0x8f8781:0xb4a791,roof=paraitinga?0x9e573b:0xd2bd91;
   add('bandstand-deck','stone',platform,0,.29,0,3.45,.58,3.45);
   add('bandstand-deck','stone',platform,0,.63,0,3.04,.14,3.04);
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4,next=angle+Math.PI/4;
    const x=Math.sin(angle)*2.74,z=Math.cos(angle)*2.74;
    cylinder(post,x,2.31,z,.105,3.22,'metal');
    cylinder(accent,x,1.04,z,.16,.48,'metal');
    cylinder(accent,x,3.77,z,.17,.23,'metal');
    limb([x,3.63,z],[Math.sin(next)*2.74,3.63,Math.cos(next)*2.74],.073,accent);
   }
   add('bandstand-roof','stone',roof,0,3.87,0,3.38,paraitinga?1.25:1.92,3.38);
   sphere(accent,0,paraitinga?5.24:5.94,0,.14,.20,.14,'metal');
  }else if(model==='gravina-benedict-statue'){
   const limestone=0xc1ae93,patina=0x50544a;
   box(limestone,0,.22,0,3.34,.44,3.34);
   box(limestone,0,1.19,0,2.31,1.50,2.26);
   box(marble,0,2.03,0,2.57,.25,2.50);
   plaque(1.35,1.44,1.15);
   human(0,2.15,0,1.50,'classical',patina);
   sphere(patina,0,5.92,0,.31,.37,.31,'metal');
  }else if(model==='trogir-clock-tower'){
   const limestone=0xdccdb5,moulding=0xede0c9,tile=0xa55a43,dial=0x779caa,brass=0xd3b06e;
   box(limestone,0,4.64,0,4.70,9.28,3.35);
   box(moulding,0,9.24,0,5.1,.45,3.69);
   box(limestone,0,9.80,0,4.42,.72,3.29);
   add('trogir-clock-dome','stone',tile,0,10.15,0,1,1,1);
   cylinder(brass,0,12.65,0,.081,.72,'metal');
   box(brass,0,12.85,0,.42,.065,.065,'metal');
   const vertical=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('cylinder','stone',moulding,0,7.60,-1.69,1.53,.12,1.53,vertical);
   add('cylinder','metal',dial,0,7.60,-1.76,1.37,.08,1.37,vertical);
   limb([0,7.60,-1.82],[.70,7.87,-1.82],.052,brass);
   limb([0,7.60,-1.82],[-.22,8.54,-1.82],.040,brass);
   for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    sphere(brass,Math.sin(a)*1.13,7.60+Math.cos(a)*1.13,-1.82,.045,.062,.028);
   }
   box(0x625148,0,1.35,-1.69,1.31,2.7,.070,'metal');
   box(moulding,0,3.06,-1.71,1.77,.22,.18);
   add('cylinder','stone',0x8d8071,0,4.76,-1.69,.31,.08,.31,vertical);
  }else if(model==='trujillo-liberty-monument'){
   const granite=0xb3a392,cloudedMarble=0xe7dcc6,patina=0x42584b;
   cylinder(granite,0,.23,0,5.75,.46);
   cylinder(granite,0,.66,0,5.19,.42);
   cylinder(granite,0,1.00,0,4.68,.32);
   cylinder(water,0,1.22,0,4.29,.076,'water');
   ring(granite,0,1.34,0,4.55,.15,'stone');
   cylinder(cloudedMarble,0,1.72,0,3.52,1.03);
   cylinder(cloudedMarble,0,2.35,0,3.75,.29);
   box(cloudedMarble,0,3.09,0,4.45,1.35,4.45);
   box(cloudedMarble,0,5.10,0,2.60,2.73,2.60);
   box(cloudedMarble,0,8.34,0,1.46,3.98,1.46);
   box(cloudedMarble,0,10.49,0,1.88,.32,1.88);
   sphere(patina,0,11.03,0,.61,.54,.61);
   for(const [x,z] of [[0,2.43],[-2.45,-.92],[2.45,-.92]])human(x,2.47,z,1.04,'classical',marble);
   human(0,11.52,0,1.03,'freedom',patina);
   limb([-.91,14.14,.10],[-1.00,14.65,.11],.079,patina);
   add('cone','metal',patina,-1.00,14.72,.11,.14,.25,.14);
  }else if(model==='ceglie-clock-tower'){
   const limestone=0xd9cbb2,trim=0xeee0c5,face=0xf4e8ce,iron=0x383632;
   box(trim,0,.20,0,5,.40,4.7);
   box(limestone,0,2.81,0,4.15,4.84,3.77);
   box(0x703c2b,0,1.60,1.9,1.28,2.5,.10,'metal');
   box(trim,0,5.26,0,4.47,.28,4.10);
   box(trim,0,5.57,.26,4.8,.29,4.52);
   box(limestone,0,7.32,0,2.86,3.22,2.80);
   box(trim,0,8.96,0,3.10,.40,3.04);
   const vertical=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2);
   add('cylinder','stone',face,0,7.70,1.43,.80,.10,.80,vertical);
   limb([0,7.7,1.5],[0,8.16,1.5],.048,iron);
   limb([0,7.7,1.5],[.34,7.55,1.5],.051,iron);
   box(limestone,0,9.56,0,1.95,.95,1.91);
   add('pyramid','stone',trim,0,10.61,0,2.22,1.20,2.20);
   cylinder(iron,0,11.62,0,.055,.56,'metal');
  }else if(model==='bratislava-napoleonic-soldier'){
   const cast=0x4c594b, highlighted=0x67735e, iron=0x424641, wood=0x665842;
   for(let slat=0;slat<4;slat++)box(wood,0,.452,.53+slat*.101,1.69,.043,.089);
   for(let slat=0;slat<3;slat++)box(wood,0,.721+slat*.143,.474-slat*.009,1.69,.088,.045);
   for(const side of [-1,1]){
    const x=side*.836;
    limb([x,.022,.489],[x,.443,.517],.031,iron);
    limb([x,.022,.865],[x,.438,.822],.031,iron);
    limb([x,.435,.51],[x,1.046,.443],.025,iron);
    limb([x,.455,.522],[x,.455,.825],.035,iron);
    limb([x,.671,.529],[x,.691,.679],.024,iron);
    limb([x,.691,.679],[x,.660,.817],.024,iron);
    limb([x,.660,.817],[x,.541,.840],.024,iron);
    limb([x,.541,.840],[x,.478,.766],.024,iron);
   }

   for(const side of [-1,1]){
    const x=side*.089,z=side<0?-.035:-.097;
    sphere(cast,x,.058,z+.042,.062,.058,.130,'patina');
    limb([x,.086,z],[x,.356,z-.008],.054,cast,'patina');
    limb([x,.356,z-.008],[side*.085,.655,.027],.061,cast,'patina');
   }
   const forwardLean=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.48);
   add('robe','patina',cast,0,.65,.045,.181,.59,.109,forwardLean);
   add('sphere','patina',cast,0,.962,.159,.177,.267,.118,forwardLean);
   for(const side of [-1,1]){
    limb([side*.142,1.153,.208],[side*.209,1.091,.458],.054,cast,'patina');
    sphere(highlighted,side*.142,1.154,.21,.062,.043,.056,'patina');
   }
   limb([-.210,1.093,.459],[.123,1.102,.473],.049,cast,'patina');
   limb([.212,1.096,.459],[-.120,1.131,.511],.046,cast,'patina');
   sphere(highlighted,.122,1.109,.477,.064,.037,.043,'patina');
   sphere(highlighted,-.12,1.135,.511,.062,.036,.042,'patina');
   limb([0,1.158,.224],[0,1.258,.280],.069,cast,'patina');
   sphere(cast,0,1.315,.310,.104,.116,.091,'patina');
   sphere(highlighted,0,1.308,.390,.029,.041,.025,'patina');
   const hatTilt=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.13);
   add('bratislava-bicorne','patina',cast,0,1.405,.318,.46,.228,.223,hatTilt);
  }else if(model==='bratislava-city-guard'){
   const sandstone=0xd2c6a9, trim=0xded1b5, polished=0x353834, cast=0x496352, relief=0x62745f;
   // The mapped point is the figure at the front of the two-sided stone booth.
   box(trim,0,.06,-.16,.91,.12,.90);
   for(const side of [-1,1])box(sandstone,side*.355,1.195,-.16,.20,2.19,.90);
   box(sandstone,0,2.32,-.16,.91,.13,.90);
   add('pediment','stone',trim,0,2.5325,-.16,.91,.295,.90);
   box(sandstone,0,1.215,-.16,.54,2.22,.13);
   for(const side of [-1,1])box(polished,0,1.225,-.16+side*.078,.51,2.09,.029);
   box(0x746759,.461,1.19,-.16,.019,.53,.36,'patina');
   box(relief,.474,1.34,-.16,.012,.19,.27,'patina');

   for(const side of [-1,1]){
    sphere(cast,side*.093,.175,.115,.068,.058,.127,'patina');
    limb([side*.091,.21,.044],[side*.097,.82,.002],.065,cast,'patina');
    sphere(relief,side*.143,1.408,.033,.075,.074,.079,'patina');
   }
   add('robe','patina',cast,0,.867,.022,.175,.45,.119);
   sphere(cast,0,1.222,.037,.164,.282,.113,'patina');
   box(0x364e42,0,1.054,.062,.278,.055,.181,'patina');
   for(const side of [-1,1])for(let row=0;row<4;row++){
    sphere(relief,side*.045,1.18+row*.063,.145,.012,.012,.009,'patina');
   }
   cylinder(cast,0,1.516,.033,.079,.10,'patina');
   sphere(cast,0,1.646,.056,.106,.145,.102,'patina');
   sphere(relief,0,1.645,.152,.029,.034,.022,'patina');
   cylinder(cast,0,1.954,.045,.116,.352,'patina');
   box(relief,0,1.791,.105,.218,.028,.168,'patina');
   limb([-.155,1.387,.04],[-.201,1.153,.06],.050,cast,'patina');
   limb([-.201,1.153,.06],[-.204,1.059,.134],.044,cast,'patina');
   limb([.151,1.390,.025],[.195,1.073,.031],.050,cast,'patina');
   limb([.195,1.073,.031],[.180,.926,.112],.041,cast,'patina');
   box(0x34483d,-.216,.240,.134,.061,.237,.047,'patina');
   limb([-.216,.345,.135],[-.218,1.535,.135],.022,cast,'patina');

   // The pentagonal fountain protrudes from the rear niche and has a brass rosette.
   add('pentagonal-pedestal','stone',sandstone,0,.405,-.745,.209,.81,.209);
   cylinder(trim,0,.815,-.745,.246,.099);
   cylinder(0x9e9278,0,.858,-.745,.232,.021);
   ring(trim,0,.9,-.745,.245,.030,'stone');
   for(let petal=0;petal<5;petal++){
    const angle=petal*Math.PI*2/5;
    sphere(gold,Math.sin(angle)*.028,.887,-.745+Math.cos(angle)*.028,.022,.013,.022);
   }
  }else if(model==='tarrega-creu-del-pati'){
   const limestone=0xcfb89a,cutStone=0xe0c8a7,relief=0xb39b80;
   const octagon=(color,height,radius,thickness)=>add('octagonal-stone','stone',color,0,height,0,radius,thickness,radius);
   octagon(limestone,.11,1.945,.22);
   octagon(cutStone,.30,1.69,.16);
   octagon(limestone,.49,1.46,.23);
   octagon(cutStone,.665,1.26,.12);
   octagon(limestone,.93,.78,.42);
   octagon(cutStone,1.20,.83,.13);
   octagon(limestone,1.40,.63,.28);
   octagon(cutStone,1.59,.49,.12);
   octagon(limestone,2.84,.28,2.42);
   octagon(cutStone,4.085,.37,.13);
   octagon(relief,4.405,.39,.51);
   for(let i=0;i<8;i++){
    const angle=(i+.5)*Math.PI/4,x=Math.sin(angle)*.38,z=Math.cos(angle)*.38;
    limb([x,4.18,z],[x,4.455,z],.065,cutStone,'stone');
    sphere(cutStone,x,4.487,z,.043,.054,.043,'stone');
    sphere(limestone,x,4.63,z,.066,.084,.066,'stone');
   }
   octagon(cutStone,4.706,.40,.115);
   box(limestone,0,5.28,0,.17,1.15,.15);
   box(limestone,0,5.43,0,1.20,.127,.14);
   // Four pointed arches form the square outline around the carved cross.
   for(const sx of [-1,1])for(const sy of [-1,1]){
    const points=[[0,5.43+sy*.67,0],[sx*.24,5.43+sy*.48,0],[sx*.43,5.43+sy*.46,0],[sx*.47,5.43+sy*.25,0],[sx*.66,5.43,0]];
    for(let i=1;i<points.length;i++)limb(points[i-1],points[i],.046,cutStone,'stone');
    sphere(limestone,sx*.43,5.43+sy*.46,0,.078,.082,.067,'stone');
   }
   sphere(cutStone,0,6.094,0,.068,.076,.072,'stone');
   for(const side of [-1,1]){
    sphere(relief,0,5.56,side*.098,.049,.062,.023,'stone');
    sphere(relief,0,5.37,side*.109,.068,.157,.031,'stone');
   }
   limb([-.21,5.488,.10],[.21,5.488,.10],.033,relief,'stone');
  }else if(model==='puigcerda-breto-cerda'){
   const weatheredSteel=0x74513c,baseSteel=0x5d4537;
   box(baseSteel,0,.065,0,1.05,.13,.63,'patina');
   box(baseSteel,0,.45,0,.62,.64,.38,'patina');
   add('puigcerda-cutout','patina',weatheredSteel,0,1.54,0,1.83,1.54,.074);
  }else if(model==='tremp-cross-fountain'){
   const limestone=0xb7a48b,trim=0xc6b59b,relief=0xa08d72,spout=0x625b48;
   // The 1922 stone base carries a pair of drinking taps below the Gothic shaft.
   cylinder(limestone,0,.075,0,1.42,.15);
   cylinder(trim,0,.22,0,1.32,.14);
   cylinder(limestone,0,.395,0,.92,.35);
   cylinder(trim,0,.64,0,.81,.16);
   add('hexagonal-stone','stone',limestone,0,1.015,0,.52,.62,.52);
   add('hexagonal-stone','stone',trim,0,1.36,0,.39,.13,.39);
   add('hexagonal-stone','stone',limestone,0,2.31,0,.226,1.81,.226);
   for(const side of [-1,1]){
    box(relief,side*.26,.86,.434,.21,.24,.045);
    limb([side*.26,.92,.453],[side*.26,.92,.61],.028,spout,'metal');
    limb([side*.26,.92,.61],[side*.26,.85,.61],.026,spout,'metal');
    box(relief,side*.26,.51,.70,.24,.026,.16);
   }
   add('hexagonal-stone','stone',trim,0,3.26,0,.31,.15,.31);
   add('hexagonal-stone','stone',relief,0,3.48,0,.35,.30,.35);
   add('hexagonal-stone','stone',trim,0,3.66,0,.38,.14,.38);
   box(limestone,0,3.859,0,.235,.282,.205);
   box(trim,0,4.186,0,.212,.588,.158);
   box(trim,-.225,4.128,0,.33,.155,.157);
   box(trim,.151,4.128,0,.105,.143,.15);
   sphere(limestone,-.39,4.13,0,.09,.119,.090,'stone');
   sphere(limestone,0,4.413,0,.096,.066,.088,'stone');
   // Only the principal relief masses are reconstructed.
   sphere(relief,0,4.259,.088,.050,.052,.024,'stone');
   sphere(relief,0,4.104,.093,.065,.123,.029,'stone');
   limb([-.179,4.147,.091],[0,4.158,.09],.027,relief,'stone');
   sphere(relief,0,4.25,-.087,.05,.063,.027,'stone');
   sphere(relief,0,4.095,-.089,.075,.128,.032,'stone');
   sphere(limestone,.062,4.166,-.116,.053,.070,.025,'stone');
  }else if(model==='jicin-amphitrite-fountain'){
   const sandstone=0xb69e80, trim=0xc4b096, shadedStone=0xa18e76, figure=0xcab49a, waterTint=0x659da3;
   // A near-square basin has clipped corners, two surrounding steps and a profiled coping.
   add('jicin-fountain-slab','stone',shadedStone,0,.08,0,6.35,.16,6.10);
   add('jicin-fountain-slab','stone',sandstone,0,.23,0,6.10,.14,5.86);
   add('jicin-fountain-wall','stone',sandstone,0,.54,0,5.72,.50,5.48);
   add('jicin-fountain-wall','stone',shadedStone,0,.33,0,5.84,.10,5.60);
   add('jicin-fountain-coping','stone',trim,0,.80,0,5.92,.16,5.68);
   add('jicin-fountain-slab','water',waterTint,0,.65,0,5.10,.025,4.90);

   add('octagonal-column','stone',shadedStone,0,.77,0,.98,.45,.98);
   add('octagonal-column','stone',trim,0,1.02,0,.94,.12,.94);
   add('octagonal-column','stone',sandstone,0,1.53,0,.72,.95,.72);
   add('octagonal-column','stone',trim,0,2.00,0,.87,.14,.87);
   box(figure,0,2.12,0,.92,.13,.82);
   for(let face=0;face<4;face++){
    const angle=face*Math.PI/2,sin=Math.sin(angle),cos=Math.cos(angle);
    const turn=new T.Quaternion().setFromAxisAngle(UP,angle);
    const at=(x,y,z)=>[x*cos+z*sin,y,z*cos-x*sin];
    const faceDepth=face%2===0?2.75:2.87;
    add('sphere','stone',shadedStone,...at(0,.56,faceDepth),.44,.182,.055,turn);
    add('sphere','stone',trim,...at(0,.57,faceDepth+.045),.36,.136,.031,turn);
    add('sphere','stone',figure,...at(0,1.53,.71),.14,.15,.234,turn);
    add('sphere','stone',trim,...at(0,1.49,.894),.11,.084,.08,turn);
    for(const side of [-1,1])sphere(shadedStone,...at(side*.102,1.56,.797),.031,.026,.025,'stone');
    const stream=[[1.49,.963],[1.412,1.20],[1.20,1.43],[.93,1.60],[.66,1.72]];
    for(let step=1;step<stream.length;step++){
     limb(at(0,...stream[step-1]),at(0,...stream[step]),.016,waterTint,'water');
    }
   }
   // Amphitrite stands on a group of fish with an oar in her right hand.
   for(const side of [-1,1]){
    sphere(shadedStone,side*.25,2.28,-side*.06,.30,.135,.18,'stone');
    sphere(figure,side*.37,2.29,.12,.145,.11,.11,'stone');
   }
   const lean=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),.11);
   add('robe','stone',figure,.02,2.82,0,.31,1.015,.218,lean);
   add('sphere','stone',figure,-.038,3.34,-.006,.239,.278,.148,lean);
   limb([-.068,3.48,.005],[-.091,3.61,.008],.08,figure,'stone');
   sphere(figure,-.097,3.69,.015,.131,.178,.125,'stone');
   sphere(sandstone,-.113,3.71,-.068,.140,.159,.086,'stone');
   sphere(sandstone,-.12,3.79,-.11,.067,.069,.053,'stone');
   limb([-.220,3.47,.01],[-.361,3.25,.106],.070,figure,'stone');
   limb([-.361,3.25,.106],[-.385,3.12,.219],.058,figure,'stone');
   limb([.143,3.48,.014],[.271,3.24,.087],.070,figure,'stone');
   limb([.271,3.24,.087],[.142,3.10,.164],.054,figure,'stone');
   limb([-.47,2.46,.245],[-.348,3.38,.20],.029,shadedStone,'stone');
   add('sphere','stone',sandstone,-.482,2.40,.249,.107,.196,.033,lean);
   for(const offset of [-.12,.07,.19]){
    limb([offset,2.38,.155],[offset*.6-.06,3.03,.200],.029,trim,'stone');
   }
  }else if(model==='jicin-marian-column'){
   const sandstone=0xb7aa92, trim=0xd0c2aa, darkStone=0x948870, iron=0x474640;
   const gilded=0xccac69, halo=0xd4b469;
   // The restoration account gives three steps, an octagonal base and a six-metre column.
   for(const [step,radius] of [2.53,2.30,2.07].entries()){
    add('octagonal-column','stone',sandstone,0,.105+step*.21,0,radius,.21,radius);
   }
   add('octagonal-column','stone',darkStone,0,.73,0,1.71,.21,1.71);
   box(sandstone,0,1.83,0,1.52,2.12,1.52);
   box(trim,0,.91,0,1.75,.18,1.75);
   box(trim,0,2.83,0,1.73,.17,1.73);

   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2;
    const cos=Math.cos(angle),sin=Math.sin(angle);
    const turn=new T.Quaternion().setFromAxisAngle(UP,angle);
    const at=(x,y,z)=>[x*cos+z*sin,y,z*cos-x*sin];
    add('box','stone',darkStone,...at(0,1.82,.771),.87,1.33,.036,turn);
    add('box','stone',sandstone,...at(0,1.82,.81),.57,.57,.068,
     turn.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),Math.PI/4)));
   }
   for(let corner=0;corner<4;corner++){
    const angle=(corner+.5)*Math.PI/2;
    const cos=Math.cos(angle),sin=Math.sin(angle);
    const turn=new T.Quaternion().setFromAxisAngle(UP,angle);
    const at=(x,y,z)=>[x*cos+(z+1.32)*sin,y,(z+1.32)*cos-x*sin];
    add('box','stone',sandstone,...at(0,1.04,0),.88,.56,.90,turn);
    add('box','stone',trim,...at(0,1.34,0),.92,.13,.93,turn);
    add('robe','stone',sandstone,...at(0,1.83,0),.29,.88,.19,turn);
    sphere(sandstone,...at(0,2.28,0),.22,.29,.16,'stone');
    sphere(trim,...at(0,2.61,.02),.135,.164,.129,'stone');
    for(const side of [-1,1]){
     limb(at(side*.16,2.40,0),at(side*.247,2.14,.10),.063,trim,'stone');
     limb(at(side*.247,2.14,.10),at(side*.091,2.03,.198),.054,trim,'stone');
     const wing=turn.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-side*.36));
     add('sphere','stone',trim,...at(side*.29,2.37,-.133),.16,.39,.099,wing);
    }
   }

   cylinder(trim,0,3.01,0,.58,.21);
   cylinder(sandstone,0,5.82,0,.397,5.50);
   for(const y of [3.18,3.40])cylinder(iron,0,y,0,.418,.067,'metal');
   cylinder(trim,0,8.61,0,.52,.26);
   for(let leaf=0;leaf<8;leaf++){
    const angle=leaf*Math.PI/4;
    sphere(trim,Math.sin(angle)*.435,8.65,Math.cos(angle)*.435,.11,.17,.11,'stone');
   }
   box(trim,0,8.86,0,1.12,.20,1.12);
   sphere(gilded,0,9.13,0,.325,.24,.315,'patina');
   add('torus','patina',0xb29952,0,9.13,0,.341,.48,.341,
    new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.24));
   add('robe','patina',gilded,0,9.73,0,.32,1.11,.23);
   sphere(gilded,0,10.15,.015,.245,.318,.16,'patina');
   sphere(gilded,0,10.59,.008,.143,.185,.151,'patina');
   for(const side of [-1,1]){
    limb([side*.174,10.34,.016],[side*.165,10.14,.103],.071,gilded,'patina');
    limb([side*.165,10.14,.103],[side*.024,10.30,.192],.048,gilded,'patina');
    limb([side*.175,9.23,.089],[side*.089,10.02,.158],.035,0xb49659,'patina');
   }
   for(let star=0;star<12;star++){
    const angle=star*Math.PI/6;
    sphere(halo,Math.sin(angle)*.295,10.61+Math.cos(angle)*.295,-.123,.032,.032,.021,'metal');
   }

   const posts=Array.from({length:8},(_,i)=>[Math.sin(i*Math.PI/4)*2.57,Math.cos(i*Math.PI/4)*2.57]);
   for(let side=0;side<posts.length;side++){
    const [ax,az]=posts[side],[bx,bz]=posts[(side+1)%posts.length];
    limb([ax,.01,az],[ax,1.15,az],.052,iron,'metal');
    limb([ax,.41,az],[bx,.41,bz],.023,iron,'metal');
    limb([ax,1.04,az],[bx,1.04,bz],.025,iron,'metal');
    for(const mix of [.2,.4,.6,.8]){
     const railX=ax+mix*(bx-ax),railZ=az+mix*(bz-az);
     limb([railX,.42,railZ],[railX,1.10,railZ],.022,iron,'metal');
    }
   }
  }else if(model==='jicin-coronation-well'){
   const sandstone=0xbba47f, moulding=0xd2bc98, shadowedStone=0x9a8260, roof=0x535c55, iron=0x3c423d;
   const westWing=new T.Quaternion().setFromAxisAngle(UP,Math.PI);
   box(sandstone,0,.14,0,4.22,.28,3.82);
   box(moulding,0,.31,0,4.28,.10,3.85);
   // The north and south arches leave the pavilion open around the 1936 weather pillar.
   for(const side of [-1,1]){
    const face=side*1.60;
    add('jicin-well-arch','stone',sandstone,0,.35,face,4.18,4.35,.39);
    box(moulding,0,3.78,face+side*.215,.30,.40,.12);
    for(const x of [-1.84,1.84]){
     box(moulding,x,.48,face+side*.125,.59,.23,.33);
     box(sandstone,x,2.42,face+side*.135,.43,3.72,.30);
     box(moulding,x,4.39,face+side*.135,.58,.23,.35);
    }
   }
   box(shadowedStone,0,4.72,0,4.21,.20,3.70);
   box(sandstone,0,4.95,0,4.24,.26,3.78);
   box(moulding,0,5.14,0,4.35,.16,3.88);
   add('jicin-well-roof','patina',roof,0,5.22,0,2.10,1.59,1.86);
   sphere(roof,0,6.85,0,.073,.145,.073,'patina');
   box(shadowedStone,0,.56,0,1.10,.40,.91);
   box(sandstone,0,1.15,0,.77,.81,.67);
   box(sandstone,0,2.15,0,.73,1.24,.66);
   box(moulding,0,2.82,0,.90,.14,.83);
   for(const side of [-1,1])box(iron,0,2.22,side*.348,.52,.88,.045,'metal');

   for(const side of [-1,1]){
    const x=side*2.02,turn=side<0?westWing:null;
    box(sandstone,x,4.37,0,.35,.68,3.43);
    add('jicin-well-portico','stone',sandstone,x,.14,0,1.55,.28,1.83,turn);
    add('jicin-well-portico','stone',moulding,x,3.81,0,1.57,.29,1.83,turn);
    add('jicin-well-wing-roof','patina',roof,x,4.16,0,1.57,.45,1.83,turn);
    // Three columns and two engaged end columns support each half-round wing.
    const posts=[0,Math.PI/4,Math.PI/2,Math.PI*3/4,Math.PI].map(angle=>[
     x+side*Math.sin(angle)*1.36,Math.cos(angle)*1.62
    ]);
    for(const [postX,postZ] of posts){
     cylinder(moulding,postX,.44,postZ,.217,.25);
     cylinder(sandstone,postX,2.06,postZ,.148,3.00);
     cylinder(moulding,postX,3.60,postZ,.215,.15);
    }
    for(let i=1;i<posts.length;i++){
     const [ax,az]=posts[i-1],[bx,bz]=posts[i];
     limb([ax,.68,az],[bx,.68,bz],.032,iron,'metal');
     limb([ax,2.06,az],[bx,2.06,bz],.032,iron,'metal');
     limb([ax,.75,az],[bx,1.97,bz],.019,iron,'metal');
     limb([ax,1.97,az],[bx,.75,bz],.019,iron,'metal');
     for(const mix of [.25,.5,.75]){
      const railX=ax+(bx-ax)*mix,railZ=az+(bz-az)*mix;
      limb([railX,.70,railZ],[railX,2.13,railZ],.024,iron,'metal');
     }
    }
   }
  }else if(model==='bratislava-maximilian-fountain'){
   const sandstone=0xb7a88c, trim=0xd2c5a8, shadedStone=0x96896f, waterTint=0x61a5af;
   add('bratislava-basin','stone',sandstone,0,0,0,1,1,1);
   // The mapped ring is the stone footprint. The water sits inside the modeled wall.
   add('bratislava-waterline','water',waterTint,0,.68,0,3.80,1,3.80);
   const stepAngle=Number(owner.feature.bearing)||0;
   const eastX=Math.cos(stepAngle),eastZ=-Math.sin(stepAngle);
   const stepsFacingEast=new T.Quaternion().setFromAxisAngle(UP,stepAngle);
   for(const direction of [-1,1])for(let step=0;step<3;step++){
    const reach=4.97-step*.36,height=.29*(step+1);
    add('box','stone',trim,direction*reach*eastX,height/2,direction*reach*eastZ,.48,height,1.43,stepsFacingEast);
   }

   box(trim,0,.87,0,2.16,.41,2.16);
   box(sandstone,0,1.49,0,1.54,.89,1.54);
   box(trim,0,2.01,0,1.75,.18,1.75);
   cylinder(sandstone,0,2.48,0,.58,.76);
   add('bratislava-upper-bowl','stone',sandstone,0,2.78,0,1,1,1);
   cylinder(waterTint,0,3.18,0,1.27,.026,'water');
   cylinder(sandstone,0,3.73,0,.52,1.14);
   for(let index=0;index<4;index++){
    const angle=index*Math.PI/2;
    const x=Math.sin(angle),z=Math.cos(angle);
    sphere(trim,x*.61,3.77,z*.61,.20,.33,.20,'stone');
    sphere(trim,x*.64,4.12,z*.64,.15,.17,.15,'stone');
    limb([x*.76,3.64,z*.76],[x*1.13,3.43,z*1.13],.024,waterTint,'water');
    limb([x*1.13,3.43,z*1.13],[x*1.23,3.20,z*1.23],.024,waterTint,'water');
   }
   cylinder(trim,0,4.39,0,.72,.25);
   box(sandstone,0,5.61,0,1.08,2.20,1.08);
   box(shadedStone,0,5.65,.55,.68,1.54,.05);
   box(trim,0,6.75,0,1.43,.20,1.43);
   box(sandstone,0,7.28,0,1.19,.91,1.19);
   box(trim,0,7.82,0,1.50,.23,1.50);
   box(sandstone,0,8.05,0,1.14,.26,1.14);

   // The current statue is the stone replica, with armour and a heraldic shield.
   const figure=0xc1b59b;
   for(const side of [-1,1]){
    sphere(figure,side*.18,8.28,.14,.16,.11,.25,'stone');
    limb([side*.17,8.33,.01],[side*.20,9.10,0],.145,figure,'stone');
    sphere(trim,side*.20,8.76,.09,.151,.17,.12,'stone');
    sphere(figure,side*.36,9.48,.01,.17,.19,.17,'stone');
   }
   sphere(figure,0,9.46,0,.35,.44,.23,'stone');
   sphere(shadedStone,0,9.08,0,.32,.18,.24,'stone');
   sphere(figure,0,10.12,.02,.24,.27,.23,'stone');
   box(trim,0,10.14,.19,.34,.07,.15);
   limb([-.34,9.53,0],[-.50,9.17,.12],.11,figure,'stone');
   limb([-.50,9.17,.12],[-.40,8.94,.33],.09,figure,'stone');
   sphere(trim,-.41,8.98,.38,.24,.39,.10,'stone');
   box(shadedStone,-.41,9,.474,.19,.20,.025);
   limb([.34,9.53,0],[.48,9.13,.18],.11,figure,'stone');
   limb([.48,9.13,.18],[.49,9.01,.26],.09,figure,'stone');
   limb([.50,9.03,.30],[.47,8.24,.33],.038,figure,'stone');
   box(trim,.50,9.035,.30,.24,.055,.09);
  }else if(model==='assisi-three-lions-fountain'){
   const limestone=0xcebd9f;
   add('assisi-fountain-basin','stone',limestone,0,0,0,1,1,1);
   cylinder(water,0,.55,0,2.94,.06,'water');
   cylinder(limestone,0,.80,0,.61,.70);
   sphere(limestone,0,1.38,0,.51,.49,.51,'stone');
   cylinder(limestone,0,1.85,0,.32,.67);
   cylinder(limestone,0,2.25,0,1.23,.28);
   ring(limestone,0,2.43,0,1.16,.105,'stone');
   cylinder(water,0,2.38,0,1.10,.05,'water');
   sphere(limestone,0,2.72,0,.29,.35,.29,'stone');
   cylinder(limestone,0,3.08,0,.17,.32);
   sphere(limestone,0,3.46,0,.25,.27,.25,'stone');
   for(let i=0;i<3;i++){
    const angle=i*2*Math.PI/3,side=Math.sin(angle),front=Math.cos(angle);
    const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('sphere','stone',limestone,side*3.19,.85,front*3.19,.26,.28,.42,rotation);
    sphere(limestone,side*3.35,1.14,front*3.35,.27,.28,.26,'stone');
    sphere(limestone,side*3.56,1.10,front*3.56,.14,.12,.16,'stone');
   }
  }else if(model==='herterichsbrunnen'){
   const sandstone=0xbdac8b;
   add('herterich-basin','stone',sandstone,0,0,0,1,1,1);
   cylinder(water,0,.67,0,3.22,.09,'water');
   cylinder(sandstone,0,1.06,0,.89,.88);
   cylinder(sandstone,0,2.27,0,.36,2.25);
   cylinder(sandstone,0,3.38,0,.63,.27);
   human(0,3.51,0,.60,'sword',sandstone);
  }else if(model==='iquique-naval-monument'){
   const granite=0xada59d,trim=0xc1b8a9,patina=0x48675d;
   steps(0,8.2);
   box(granite,0,.93,0,6.75,.70,6.75);
   box(trim,0,1.41,0,6.53,.26,6.53);
   box(granite,0,2.37,0,4.8,1.64,4.8);
   box(trim,0,3.28,0,4.93,.24,4.93);
   box(granite,0,5.56,0,3.35,4.32,3.35);
   box(trim,0,7.80,0,3.85,.28,3.85);
   box(granite,0,8.42,0,2.58,.96,2.58);
   box(trim,0,9.02,0,2.75,.24,2.75);
   human(0,9.14,0,1.58,'civil',patina);
   for(const x of [-2,2])for(const z of [-1.94,1.94]){
    box(granite,x,3.57,z,1.24,.36,1.20);
    human(x,3.75,z,.84,'civil',patina);
   }
   plaque(4.71,1.66,1.70);
  }else if(model==='rizal-monument'){
   const granite=0xa79f91;
   steps(0,7.25);box(granite,0,1.32,0,5.85,1.34,5.48);
   box(granite,0,2.65,-.65,3.62,1.45,3.72);box(marble,0,3.43,-.65,3.71,.20,3.82);
   box(granite,0,5.98,-.97,1.42,5.04,1.45);
   add('pyramid','stone',granite,0,8.95,-.97,1.00,1.00,1.00);
   box(granite,0,2.85,1.48,1.84,1.75,1.43);human(0,3.73,1.40,.89,'civil');
   plaque(1.53,1.89,2.754);
  }else if(model==='quezon-memorial-shrine'){
   const concrete=0xd8d7ce, limestone=0xe5e3d9, trim=0xa6a396, gilt=0xc3a269;
   // The mapped mausoleum base and the three 66 m crowns set the model proportions.
   add('triangular-base','stone',trim,0,.24,0,30.35,.48,30.35);
   add('triangular-base','stone',limestone,0,.77,0,29.5,.58,29.5);
   add('triangular-base','stone',concrete,0,3.41,0,28.35,4.70,28.35);
   add('triangular-base','stone',limestone,0,5.89,0,28.62,.27,28.62);
   add('triangular-base','stone',concrete,0,55.8,0,10.65,1.4,10.65);
   add('triangular-base','stone',limestone,0,57.0,0,11.15,1.0,11.15);
   add('triangular-base','stone',concrete,0,58.07,0,9.85,1.14,9.85);
   for(let i=0;i<3;i++){
    const angle=i*2*Math.PI/3;
    const at=(x,y,z)=>[x*Math.cos(angle)+z*Math.sin(angle),y,z*Math.cos(angle)-x*Math.sin(angle)];
    const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('box','stone',concrete,...at(0,31.95,8.25),4.57,52.1,5.35,rotation);
    add('box','stone',limestone,...at(0,31.47,10.97),2.74,51.3,.44,rotation);
    for(const x of [-1.82,1.82])add('box','stone',0xc7c5ba,...at(x,30.45,10.97),.27,49.1,.29,rotation);
    add('box','stone',limestone,...at(0,58.45,8.25),5.03,1.4,5.68,rotation);
    add('box','stone',trim,...at(0,59.46,8.30),3.06,.66,3.66,rotation);
    limb(at(0,59.76,8.66),at(0,64.60,8.46),.99,gilt);
    sphere(gilt,...at(0,65.28,8.49),.67,.72,.66);
    for(const side of [-1,1]){
     limb(at(side*.63,63.70,8.60),at(side*.73,62.42,9.35),.29,gilt);
     limb(at(side*.73,62.42,9.35),at(side*.40,62.05,9.61),.23,gilt);
     limb(at(side*.53,61.85,7.96),at(side*1.54,65.20,7.79),.48,gilt);
     limb(at(side*.37,61.11,7.82),at(side*1.18,64.31,7.57),.36,gilt);
    }
    add('torus','metal',gilt,...at(0,61.7,9.79),.55,1.64,.55,rotation);
   }
  }else if(model==='cebu-legazpi-obelisk'){
   const footing=0xaca99d, limestone=0xe5e0d2, trim=0xc8bcac;
   for(const [width,y,height] of [[3.95,.12,.24],[3.50,.35,.22],[3.06,.59,.26],[2.70,.83,.22]]){
    box(footing,0,y,0,width,height,width);
   }
   box(limestone,0,1.50,0,2.20,1.12,2.20);
   box(trim,0,2.03,0,2.40,.18,2.40);
   box(limestone,0,2.22,0,2.17,.22,2.17);
   box(trim,0,2.42,0,1.63,.18,1.63);
   add('obelisk-shaft','stone',limestone,0,5.10,0,1.37,5.19,1.37);
   for(let i=0;i<4;i++){
    const angle=i*Math.PI/2,rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('box','stone',trim,1.105*Math.sin(angle),1.52,1.105*Math.cos(angle),.84,.64,.04,rotation);
   }
   box(limestone,0,7.77,0,.91,.17,.91);
   add('obelisk-cap','stone',limestone,0,8.06,0,.90,.48,.90);
  }else if(model==='cebu-fort-san-pedro-walls'){
   add('cebu-fort-walls','stone',0x83786a,0,3.05,0,1,6.10,1);
  }else if(model==='monas'){
   const shell=0xe0dbcc;
   steps(0,7.05);box(shell,0,1.09,0,5.15,.92,5.15);
   add('monas-base','stone',shell,0,2.00,0,3.32,.94,3.32);
   box(marble,0,2.55,0,6.65,.30,6.65);
   box(shell,0,9.66,0,1.57,13.95,1.57);
   box(0xb6b6b0,0,16.65,0,2.53,.29,2.53);box(marble,0,16.96,0,2.59,.29,2.59);
   sphere(0xc79733,0,17.44,0,.69,.43,.60);
   for(const [x,y,w,h] of [[-.25,17.88,.37,1.11],[.29,18.02,.43,1.37],[0,18.42,.34,1.14]]){
    add('cone','metal',0xc9962d,x,y,0,w,h,w,new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-.28));
   }
  }else if(model==='sydney-cenotaph'){
   const granite=0x9d9b91;
   steps(0,7.65,3.6);box(granite,0,1.23,0,4.21,1.23,2.12);box(marble,0,1.92,0,4.42,.23,2.26);
   for(const x of [-2.8,2.8]){
    box(granite,x,.89,0,1.03,.58,1.21);human(x,1.18,0,.85,'sword');
   }
   plaque(1.51,2.01,1.079);
  }else if(model==='telc-marian-column'){
   const granite=0xaaa49a,stone=0xd2c9b7,shadow=0xb9ad9a,iron=0x53544e,gilded=0xb49a59;
   box(granite,0,.11,0,8.62,.22,8.62);
   box(stone,0,.25,0,8.22,.09,8.22);
   box(granite,0,.35,0,4.38,.14,4.38);
   box(stone,0,.51,0,3.88,.18,3.88);
   box(shadow,0,1.12,0,3.39,1.04,3.39);
   box(stone,0,1.69,0,3.79,.17,3.79);
   box(shadow,0,2.27,0,2.80,.99,2.80);
   box(stone,0,2.88,0,3.20,.25,3.20);
   box(0x83796a,0,1.12,1.704,1.02,.65,.018);
   sphere(0x83796a,0,1.45,1.70,.51,.25,.016,'stone');
   sphere(stone,.02,1.05,1.73,.40,.11,.06,'stone');
   sphere(stone,-.31,1.15,1.75,.13,.11,.07,'stone');

   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2,ca=Math.cos(angle),sa=Math.sin(angle);
    const rotation=new T.Quaternion().setFromAxisAngle(UP,-angle);
    const railBox=(c,x,y,z,w,h,d,m='stone')=>add('box',m,c,x*ca-z*sa,y,x*sa+z*ca,w,h,d,rotation);
    const panelZ=4.02;
    for(const x of [-3.94,3.94])railBox(granite,x,.70,panelZ,.31,.95,.30);
    for(const [x,width] of side===0?[[-2.38,3.15],[2.38,3.15]]:[[0,7.86]]){
     railBox(granite,x,.35,panelZ,width,.17,.29);
     railBox(stone,x,1.07,panelZ,width,.10,.32);
     const bars=Math.round(width/.46);
     for(let i=0;i<bars;i++){
      railBox(iron,x+(i+.5-bars/2)*width/bars,.71,panelZ,.027,.62,.038,'metal');
     }
    }
    for(const x of [-2.22,2.22]){
     railBox(stone,x,.72,panelZ,.27,.88,.28);
     const dx=x*ca-panelZ*sa,dz=x*sa+panelZ*ca;
     sphere(stone,dx,1.33,dz,.125,.19,.125,'stone');
     sphere(stone,dx,1.53,dz,.080,.09,.08,'stone');
     railBox(shadow,x,1.37,panelZ-.09,.34,.19,.085);
    }
   }

   const saint=(x,y,z,size,frontX,frontZ)=>{
    add('robe','stone',stone,x,y+size*.33,z,size*.24,size*.67,size*.18);
    sphere(stone,x,y+size*.65,z,size*.19,size*.26,size*.14,'stone');
    sphere(stone,x,y+size*.89,z,size*.12,size*.13,size*.11,'stone');
    sphere(shadow,x+frontX*size*.13,y+size*.63,z+frontZ*size*.13,size*.13,size*.12,size*.115,'stone');
   };
   for(const [x,z,y] of [[-1.36,1.30,1.75],[0,1.49,2.79],[1.36,1.30,1.75],[-1.36,-1.30,1.75],[0,-1.49,2.79],[1.36,-1.30,1.75]]){
    saint(x,y,z,1.44,0,Math.sign(z));
   }
   cylinder(shadow,0,5.88,0,.65,5.85);
   for(let i=0;i<11;i++){
    const angle=i*2.4,height=3.64+i*.49;
    const x=Math.sin(angle)*.52,z=Math.cos(angle)*.52;
    sphere(i%2?stone:shadow,x,height,z,.35,.29,.35,'stone');
    sphere(stone,x*1.28,height+.13,z*1.28,.23,.27,.22,'stone');
    if(i%2===0)sphere(stone,x*1.40,height+.31,z*1.40,.124,.142,.12,'stone');
   }
   sphere(shadow,0,9.05,0,.58,.59,.57,'stone');
   saint(.06,9.47,0,1.68,0,1);
   for(let i=0;i<9;i++){
    const a=i*Math.PI*2/9;
    sphere(gilded,.06+Math.sin(a)*.44,11.10+Math.cos(a)*.45,.04,.052,.062,.044,'metal');
   }
  }else if(model==='telc-silenus'||model==='telc-margaret'){
   const rim=0xa9a59a,trim=0xbdb8aa,pedestal=0xcac3b0,figure=0xddd7c8;
   add('hex','stone',rim,0,.14,0,3.36,.28,3.36);
   add('hex','water',0x579b9e,0,.31,0,3.06,.044,3.06);
   for(let side=0;side<6;side++){
    const angle=(side+.5)*Math.PI/3,sin=Math.sin(angle),cos=Math.cos(angle);
    const turn=new T.Quaternion().setFromAxisAngle(UP,angle);
    const apothem=3.18*Math.cos(Math.PI/6);
    add('box','stone',rim,sin*apothem,.33,cos*apothem,3.24,.42,.25,turn);
    add('box','stone',trim,sin*apothem,.55,cos*apothem,3.34,.11,.36,turn);
   }
   const form=(x,y,z,w,h,d,c=figure)=>sphere(c,x,y,z,w,h,d,'stone');
   const join=(a,b,r,c=figure)=>limb(a,b,r,c,'stone');
   if(model==='telc-margaret'){
    box(rim,0,.43,0,1.47,.44,1.46);
    box(pedestal,0,.68,0,1.29,.12,1.29);
    box(pedestal,0,1.25,0,.88,1.05,.88);
    box(trim,0,1.83,0,1.15,.15,1.15);
    box(figure,0,1.98,0,1.06,.15,1.06);
    // The low crouching dragon sits below the folds of the saint's robe.
    form(-.09,2.13,.06,.37,.14,.24,pedestal);
    form(.31,2.21,.16,.18,.17,.17,pedestal);
    form(.40,2.21,.24,.13,.080,.096,pedestal);
    join([-.31,2.12,.06],[-.47,2.19,.13],.064,pedestal);
    join([-.47,2.19,.13],[-.52,2.29,.05],.049,pedestal);
    add('robe','stone',figure,-.04,2.67,-.02,.36,1.08,.25);
    join([-.22,2.20,.15],[-.24,3.10,-.01],.102,pedestal);
    join([.20,2.19,.14],[.15,3.11,-.02],.097,pedestal);
    form(-.04,3.25,-.04,.25,.34,.18);
    form(-.01,3.68,.01,.15,.20,.13);
    form(-.04,3.71,-.08,.17,.18,.12,pedestal);
    join([-.20,3.40,.02],[-.32,3.53,.16],.087);
    join([-.32,3.53,.16],[-.38,3.69,.20],.065);
    form(-.38,3.70,.20,.074,.077,.064);
    join([.18,3.38,.01],[.28,3.18,.14],.088);
    join([.28,3.18,.14],[.19,3.03,.10],.069);
    limb([-.41,3.37,.19],[-.35,4.18,.21],.028,0x827155);
    limb([-.49,3.99,.20],[-.23,3.99,.21],.025,0x827155);
   }else{
    box(pedestal,0,.37,0,1.40,.34,1.40);
    box(figure,0,.60,0,1.28,.13,1.28);
    box(pedestal,0,1.15,0,.84,1.0,.88);
    box(figure,0,1.69,0,1.01,.16,.99);
    form(-.20,1.96,-.17,.31,.31,.29,pedestal);
    join([-.17,1.79,.17],[-.19,2.22,.03],.13);
    join([-.19,2.22,.03],[-.12,2.58,-.02],.16);
    join([.21,1.79,.05],[.17,2.21,.13],.13);
    join([.17,2.21,.13],[.02,2.58,-.03],.16);
    form(-.05,2.48,-.02,.27,.23,.20);
    form(-.08,2.79,-.06,.28,.33,.19);
    form(-.15,3.19,-.05,.17,.21,.15);
    form(-.15,3.11,.07,.13,.13,.12,pedestal);
    join([-.28,2.95,-.07],[-.37,2.75,.12],.102);
    join([-.37,2.75,.12],[.01,2.70,.27],.084);
    join([.09,2.93,-.05],[.24,2.78,.09],.103);
    join([.24,2.78,.09],[.24,2.94,.22],.077);
    // The child is cradled across Silenus's chest and forearms.
    join([-.08,2.75,.19],[.26,3.04,.22],.105);
    form(.32,3.12,.22,.115,.125,.10);
    join([.01,2.80,.22],[-.13,2.68,.28],.055);
   }
  }else if(model==='se-dialogo'){
   box(0xa09d92,0,.115,0,5.30,.23,2.05);
   add('se-dialogo-steel','metal',0xb52527,0,.23,0,1,1,1);
  }else if(model==='kinshasa-limete-tower'){
   const concrete=0xc8bca4,podium=0xb0a694,baseTrim=0xe0d6c2,recess=0x515854,bronzeTint=0xad9260;
   cylinder(podium,0,1.62,0,37.7,3.24);
   cylinder(concrete,0,4.22,0,35.3,2.00);
   cylinder(baseTrim,0,5.32,0,35.65,.34);
   // The wings use the four ends and shoulders of the mapped podium.
   for(const [fromX,fromZ,toX,toZ,width] of [
    [-89.91,-13.40,-36.32,-6.55,15.08],[10.12,-93.78,3.27,-39.00,14.41],
    [89.02,6.85,35.73,.30,14.90],[-10.42,86.63,-5.95,32.45,16.09]
   ]){
    const start=new T.Vector3(fromX,.46,fromZ),end=new T.Vector3(toX,4.96,toZ);
    const span=end.clone().sub(start),mid=start.clone().lerp(end,.5);
    // Pitch around the ramp's horizontal cross-axis so the wide deck never rolls.
    const rotation=new T.Quaternion().setFromAxisAngle(UP,Math.atan2(span.x,span.z));
    const pitch=-Math.atan2(span.y,Math.hypot(span.x,span.z));
    rotation.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),pitch));
    add('box','stone',concrete,mid.x,mid.y,mid.z,width,.86,span.length(),rotation);
    for(const portion of [.37,.73]){
     const support=start.clone().lerp(end,portion),height=support.y;
     cylinder(podium,support.x,height*.5,support.z,width*.19,height);
    }
   }
   // Four reinforced-concrete shafts remain visibly separated above the podium.
   for(const x of [-5.45,5.45])for(const z of [-5.45,5.45]){
    cylinder(concrete,x,94.4,z,4.45,178.2);
    cylinder(podium,x,93.5,z+3.83,.62,171);
    cylinder(baseTrim,x,18.4,z,5.55,26.6);
   }
   for(const y of [58,111,154])box(podium,0,y,0,12.0,3.4,12.0);
   cylinder(podium,0,171,0,16.7,5.4);
   cylinder(recess,0,174.6,0,15.8,2.6,'metal');
   cylinder(baseTrim,0,176.8,0,17.45,1.3);
   for(const x of [-8.65,8.65])for(const z of [-8.65,8.65]){
    cylinder(concrete,x,183.36,z,7.10,13.45);
    cylinder(recess,x,185.58,z,7.18,1.75,'metal');
    cylinder(baseTrim,x,190.43,z,7.28,.90);
    cylinder(bronzeTint,x,191.24,z,6.30,.72);
   }
   cylinder(podium,0,193.7,0,7.8,12.9);
   cylinder(baseTrim,0,201.15,0,6.13,2.5);
   cylinder(recess,0,206.20,0,.56,7.60,'metal');
  }else if(model==='harare-unity-fountain'){
   const paving=0xc2b39f,rim=0xbeb6aa,basinBlue=0x5ca4b9;
   add('harare-basin','stone',paving,0,.15,0,10.45,.30,10.45);
   add('harare-basin','water',basinBlue,0,.333,0,9.92,.032,9.92);
   ring(rim,0,.42,0,9.98,.19,'stone');
   cylinder(0x657d82,0,.48,0,.55,.27,'metal');
   jet(0,.52,0,3.80,3.8);
  }else if(model==='lusaka-mwanawasa-mausoleum'){
   const concrete=0xd5d1c5,trim=0xe2ddd0,glazing=0x52676a;
   add('lusaka-podium','stone',concrete,0,.15,0,7.715,.30,7.96);
   add('lusaka-podium','stone',trim,0,.48,0,7.35,.36,7.62);
   for(const [i,depth] of [1.64,1.35,1.11].entries()){
    const y=(i+1)*.16;
    box(trim,0,y/2,7.87-depth/2-i*.31,4.08,y,depth);
   }
   for(let i=0;i<12;i++){
    const axis=i*Math.PI/6,x=5.42*Math.sin(axis),z=5.66*Math.cos(axis);
    if(i!==0){
     const rotation=new T.Quaternion().setFromAxisAngle(UP,axis);
     add('box','metal',glazing,x,2.11,z,2.81,2.94,.13,rotation);
    }
    const post=axis+Math.PI/12,dx=Math.sin(post),dz=Math.cos(post);
    limb([5.61*dx,.66,5.83*dz],[6.14*dx,5.09,6.36*dz],.33,concrete,'stone');
   }
   add('lusaka-stool-roof','stone',trim,0,4.94,0,7.43,1.46,7.66);
  }else if(model==='lusaka-sata-mausoleum'){
   const surface=0xc7beb2,trim=0xe3dad0,foundation=0x9e9588,glazing=0x465d62;
   box(foundation,0,.16,0,17.16,.32,14.88);
   box(surface,0,4.34,-2.08,16.61,8.04,10.23);
   box(trim,0,4.11,-1.95,16.84,.25,10.73);
   box(trim,0,8.79,-2.03,16.93,.82,10.47);
   for(const side of [-1,1]){
    for(let i=0;i<9;i++){
     const h=.43*(i+1),z=7.02-i*.45;
     box(trim,side*3.07,h/2,z,2.46,h,.68);
    }
    for(const x of [side*4.31,side*1.84]){
     limb([x,1.33,7.15],[x,4.77,3.55],.054,0x55534c);
     for(const i of [0,4,8]){
      const h=.43*(i+1),z=7.15-i*.45;
      limb([x,h-.04,z],[x,h+.90,z],.050,0x55534c);
     }
    }
    for(const x of [4.83,6.67]){
     box(glazing,side*x,2.23,3.083,1.32,2.36,.18,'metal');
     box(glazing,side*x,6.34,3.083,1.38,2.51,.18,'metal');
    }
   }
   box(glazing,0,2.05,3.085,2.85,3.10,.18,'metal');
   box(glazing,0,6.03,3.085,4.15,3.38,.18,'metal');
   for(const x of [-2.08,0,2.08])box(trim,x,6.02,3.20,.12,3.44,.15);
  }else if(model==='lusaka-chiluba-mausoleum'){
   const plaster=0xd9d3c7,trim=0xefebe0,roof=0xc4bfb3,glazing=0x53646c;
   add('lusaka-podium','stone',plaster,0,.18,0,7.945,.36,10.535);
   add('lusaka-podium','stone',trim,0,.43,-.88,6.87,.16,7.54);
   add('lusaka-podium','stone',plaster,0,2.22,-.88,5.47,3.41,6.49);
   for(let i=0;i<10;i++){
    const axis=i*Math.PI/5,x=Math.sin(axis)*5.44,z=Math.cos(axis)*6.46-.88,turn=new T.Quaternion().setFromAxisAngle(UP,axis);
    if(i===0)add('box','metal',glazing,x,1.91,z,2.65,2.94,.15,turn);
    else{
     const window=new T.Vector3(0,0,.085).applyQuaternion(turn);
     add('registan-arch','stone',trim,x+window.x,1.27,z+window.z,2.42,2.44,.35,turn);
     add('box','metal',glazing,x+window.x*.68,2.22,z+window.z*.68,1.28,1.77,.14,turn);
    }
    const post=axis+Math.PI/10;
    cylinder(0xb0aaa0,6.12*Math.sin(post),2.37,-.88+7.15*Math.cos(post),.26,3.76);
   }
   add('lusaka-chapel-roof','stone',roof,0,4.05,-.88,6.77,2.39,7.68);
   box(trim,0,7.09,-.88,.21,1.62,.21);
   box(trim,0,7.35,-.88,1.09,.21,.24);
  }else if(model==='gaborone-three-dikgosi'){
   const base=0xd1c9b9,granite=0xb8ad98,trim=0xe0d9ca,casting=0x605143,patina=0x796651;
   box(base,0,.14,0,13.6,.28,4.35);
   box(trim,0,.39,0,13.35,.22,4.10);
   box(granite,0,.99,0,13.12,.98,3.88);
   box(base,0,1.54,0,13.31,.12,4.00);
   for(const [x,lean,forward,gesture] of [[-4.28,-.04,.10,0],[0,.03,.05,1],[4.28,.02,.09,2]]){
    const at=(dx,y,z)=>[x+dx,1.60+y,z];
    const cast=(dx,y,z,rx,ry,rz,color=casting)=>sphere(color,...at(dx,y,z),rx,ry,rz,'patina');
    const join=(a,b,r,color=casting)=>limb(at(...a),at(...b),r,color,'patina');
    for(const side of [-1,1]){
     const step=side*forward;
     cast(side*.53,.16,step+.12,.30,.17,.56);
     join([side*.51,.22,step],[side*.48,1.07,step-.08],.24);
     join([side*.48,1.07,step-.08],[side*.38,2.31,-.05],.31);
     cast(side*.48,1.07,step-.08,.25,.25,.27);
    }
    add('robe','patina',casting,...at(0,2.72,-.08),.92,1.47,.51);
    cast(lean,3.62,-.03,.91,.78,.48);
    join([-.35,3.93,.32],[-.08,3.12,.40],.074,patina);
    join([.35,3.93,.32],[.11,3.14,.41],.073,patina);
    cast(lean,4.23,0,.22,.23,.22);
    cast(lean,4.86,.01,.47,.54,.40);
    cast(lean,4.82,.40,.13,.16,.10,patina);
    cast(lean,4.57,.27,.28,.24,.16);
    cast(lean,5.08,-.05,.45,.30,.37);
    for(const side of [-1,1]){
     const isRaised=gesture===1&&side===-1||gesture===0&&side===1;
     const elbow=[side*(isRaised?.96:.91),isRaised?3.22:3.02,isRaised?.31:.07];
     const hand=[side*(isRaised?.55:.91),isRaised?3.53:2.37,isRaised?.69:.21];
     join([side*.68,3.87,-.02],elbow,.223);
     cast(...elbow,.184,.23,.199);
     join(elbow,hand,.147);
     cast(...hand,.155,.226,.137,patina);
    }
    if(gesture===2)cast(.92,2.15,.24,.37,.15,.33);
   }
  }else if(model.startsWith('gaborone-shelter-')){
   const {width,depth,height}=MODEL_SPECS[model],large=model==='gaborone-shelter-north-west';
   const posts=large?6:4,eave=large?2.45:2.07,thatch=0x957743,wood=0x654a33;
   for(let i=0;i<posts;i++){
    const angle=2*Math.PI*i/posts;
    const x=Math.cos(angle)*width*.35,z=Math.sin(angle)*depth*.35;
    cylinder(wood,x,(eave+.04)/2,z,large?.145:.095,eave+.04);
   }
   add('gaborone-thatch','stone',thatch,0,eave,0,width/2,height-eave,depth/2);
   if(large){
    box(0x8c6743,0,.78,0,2.10,.08,.77);
    for(const x of [-.72,.72]){
     box(wood,x,.38,0,.11,.76,.52);
     box(wood,x,.42,0,.13,.12,1.63);
    }
    for(const z of [-.69,.69])box(0x8c6743,0,.47,z,2.10,.09,.26);
   }
  }else if(['registan-ulugh-beg','registan-sher-dor','registan-tilla-kari'].includes(model)){
   const {width,depth}=MODEL_SPECS[model],front=depth/2,back=-front;
   const west=model==='registan-ulugh-beg',north=model==='registan-tilla-kari';
   const shape=west?{court:[-17.16,17.18,-13.04,18.95],wall:13,portal:[28,34.7,7.8]}:
    north?{court:[-21.60,25.59,-26.61,20.01],wall:10.2,portal:[21.8,20.6,6.8]}:
     {court:[-19.67,19.64,-23.80,14.58],wall:12,portal:[26,30.4,7.8]};
   const [left,right,rearEdge,frontEdge]=shape.court,[portalWidth,portalHeight,portalDepth]=shape.portal;
   const wall=shape.wall,half=width/2,opening=portalWidth*.27;
   const brick=west?0xbfa180:north?0xc0a488:0xbb9476;
   const glaze=west?0x347e9f:north?0x287da2:0x426d9a,azure=0x55a6ba,dark=0x283d51,border=0xb7a17d;
   const wallSection=(a,b,c,d)=>{
    box(brick,(a+b)/2,wall/2,(c+d)/2,b-a,wall,d-c);
    box(border,(a+b)/2,wall-.07,(c+d)/2,b-a+.1,.22,d-c+.1);
   };
   wallSection(-half,left,back,frontEdge);
   wallSection(right,half,back,frontEdge);
   wallSection(left,right,back,rearEdge);
   wallSection(-half,-opening,frontEdge,front-.84);
   wallSection(opening,half,frontEdge,front-.84);
   box(brick,0,wall-.45,(frontEdge+front)/2,opening*2,.90,front-frontEdge);
   // The deep pointed portal faces the central square.
   add('registan-arch','stone',brick,0,0,front-portalDepth/2,portalWidth,portalHeight,portalDepth);
   add('registan-arch','stone',glaze,0,.25,front-.10,portalWidth-.92,portalHeight-.66,.42);
   add('registan-arch','stone',azure,0,.36,front+.13,portalWidth-2.24,portalHeight-2.08,.14);
   const recess=front-portalDepth+.62,throat=wall*.67,recessHeight=portalHeight*.89;
   add('registan-arch','stone',dark,0,0,recess,opening*2+.4,throat,1.22);
   box(brick,0,(throat+recessHeight)/2,recess,opening*2+.4,recessHeight-throat,1.18);
   box(border,0,portalHeight-.20,front-portalDepth/2,portalWidth+.26,.40,portalDepth+.25);
   const bays=north?5:3,bayZone=half-portalWidth/2-2.4;
   for(const side of [-1,1])for(let i=0;i<bays;i++){
    const x=side*(portalWidth/2+1.1+(i+.5)*bayZone/bays),w=bayZone/bays*.83;
    for(const base of [.80,wall*.52]){
     const nicheHeight=wall*.38;
     add('box','stone',dark,x,base+nicheHeight*.44,front-.47,w*.67,nicheHeight*.87,.19);
     add('registan-arch','stone',glaze,x,base,front-.32,w,nicheHeight,.63);
    }
   }
   const tower=(x,z,height,radius)=>{
    add('registan-taper','stone',brick,x,height*.47,z,radius,height*.94,radius);
    for(const [fraction,thickness] of [[.16,.24],[.47,.19],[.71,.19],[.90,.35]]){
     const r=radius*(1-.20*fraction)+.03;
     add('registan-taper','stone',glaze,x,height*fraction,z,r,thickness,r);
    }
    cylinder(border,x,height*.944,z,radius*.85,.42);
    if(north)add('registan-dome','stone',azure,x,height*.958,z,radius*.78,height*.042,radius*.78);
    else cylinder(glaze,x,height*.97,z,radius*.80,height*.06);
   };
   const dome=(x,z,radius,drum,cap)=>{
    cylinder(glaze,x,wall+drum/2,z,radius*.86,drum);
    cylinder(border,x,wall+drum*.23,z,radius*.88,.35);
    cylinder(glaze,x,wall+drum-.30,z,radius*.91,.60);
    add('registan-dome','stone',azure,x,wall+drum,z,radius,cap,radius);
   };
   if(north){
    tower(-36.2,front-2.1,13.9,2.48);tower(36.5,front-2.1,13.9,2.48);
    dome(-29.41,-3.13,8.35,10.2,9.6);
   }else if(west){
    for(const [x,z,h] of [[27.63,41.19,32],[-28.54,40.91,32],[28.09,-42.13,20],[-27.18,-42.22,20]])tower(x,z,h,1.86);
   }else{
    tower(-28.51,32.81,32,1.87);tower(29.83,33.08,32,1.87);
    tower(-28.9,-35.04,11.4,1.41);tower(29.39,-34.55,11.4,1.41);
    dome(-20.97,28.00,6.14,6.0,7.3);dome(22.58,28.34,6.14,6.0,7.3);
   }
  }else if(model==='islamabad-monument-petals'){
   const limestone=0xd7c2ad, granite=0xbfa089, waterStone=0x839b9e;
   const centerX=12.42,centerZ=1.99;
   const platformHeight=.33;
   for(const [radius,y,depth] of [[27.8,.055,.11],[26.8,.165,.11],[25.8,.275,.11]]){
    add('islamabad-platform','stone',limestone,8.65,y,2.49,radius,depth,radius);
   }
   add('islamabad-platform','stone',0x937d70,centerX,.36,centerZ,11.35,.06,11.35);
   add('islamabad-platform','water',waterStone,centerX,.398,centerZ,11.18,.01,11.18);
   add('islamabad-star','stone',0x383730,centerX,.418,centerZ,8.1,1,8.1);
   // The principal granite shells align with the four separate map footprints.
   const petals=[
    [-6.71,13.41,-.539,8.0,17.37,20.37],
    [-8.94,0,.093,8.7,17.37,17.14],
    [-1.49,-10.68,.739,7.0,17.37,17.11],
    [14.41,-9.44,1.743,8.2,17.37,14.56],
    [-10.1,7.0,-.244,5.2,9.0,13.0],
    [-6.3,-6.2,.403,5.1,9.0,12.0],
    [6.2,-12.7,1.170,5.7,9.0,12.8],
   ];
   for(const [x,z,angle,width,height,depth] of petals){
    const rotation=new T.Quaternion().setFromAxisAngle(UP,Math.PI/2-angle);
    add('islamabad-petal','stone',granite,x,platformHeight,z,width,height,depth,rotation);
   }
  }else if(model==='islamabad-unity-pillars'){
   const granite=0xb4a18d, cap=0xcbb7a0;
   for(const [x,z,bearing] of [[-6.96,.50,-.322],[-.50,-6.96,-.322],[7.45,-.99,.322],[.75,6.71,0]]){
    const rotation=new T.Quaternion().setFromAxisAngle(UP,bearing);
    add('box','stone',cap,x,.12,z,2.15,.24,2.15,rotation);
    add('box','stone',granite,x,2.445,z,1.69,4.41,1.69,rotation);
    add('box','stone',cap,x,4.655,z,1.74,.09,1.74,rotation);
   }
  }else if(model==='tashkent-amir-temur'){
   const granite=0x775149, darkBronze=0x625344, relief=0x735e48;
   box(granite,0,.14,0,4.85,.28,7.15);
   box(0x865d50,0,1.08,0,4.40,1.60,6.60);
   box(granite,0,1.92,0,4.55,.16,6.75);
   const first=parts.length;
   horse(0,'temur');
   for(const [x,z,radius] of [[.55,-.45,.31],[-.58,-.43,.27]]){
    sphere(relief,x,2.49,z,.10,radius,.28,'patina');
   }
   for(const [y,width,z] of [[3.16,.52,.083],[3.34,.48,.072],[3.52,.37,.035]]){
    box(relief,0,y,z,width,.046,.045,'patina');
   }
   sphere(relief,0,4.06,-.09,.29,.26,.22,'patina');
   const castScale=7/4.74;
   for(const part of parts.slice(first)){
    if(part.kind==='cape'){part.z+=.16;part.y-=.20;}
    part.x*=castScale;part.z*=castScale;part.y=2+part.y*castScale;
    part.sx*=castScale;part.sy*=castScale;part.sz*=castScale;
    part.color=part.color===relief||part.color===gold?relief:darkBronze;
    part.material='patina';
   }
  }else if(model==='hanoi-octagonal-bandstand'){
   const concrete=0xa49881, plinth=0xc2b59f, wood=0x704d38, timberTrim=0x9e7250, tiles=0x97503a;
   add('octagonal-stone','stone',concrete,0,.16,0,5.06,.32,5.22);
   add('octagonal-stone','stone',plinth,0,.65,0,4.89,.66,5.06);
   add('octagonal-stone','stone',concrete,0,1.015,0,4.93,.07,5.10);
   const stairAngle=Math.PI/8,stairsRotation=new T.Quaternion().setFromAxisAngle(UP,stairAngle);
   for(const [i,z] of [5.52,5.22,4.92,4.62].entries()){
    const height=.21*(i+1);
    add('box','stone',plinth,z*Math.sin(stairAngle),height/2,z*Math.cos(stairAngle),3.15,height,.77,stairsRotation);
   }
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4,x=4.38*Math.sin(angle),z=4.52*Math.cos(angle);
    box(concrete,x,1.14,z,.58,.18,.58);
    box(wood,x,2.76,z,.34,3.16,.34);
    box(timberTrim,x,4.27,z,.70,.25,.70);
   }
   add('octagonal-stone','stone',wood,0,4.315,0,6.13,.14,6.40);
   add('hanoi-bandstand-roof','stone',tiles,0,4.38,0,6.41,1,6.69);
   cylinder(tiles,0,6.76,0,.19,.28);
  }else if(model==='lahore-hazuri-baradari'){
   const cream=0xe5dfd4, marble=0xcbbfb1, grey=0xbcb0a2;
   box(grey,0,.11,0,19.81,.22,19.81);
   box(marble,0,.53,0,19.62,.62,19.62);
   box(cream,0,.877,0,19.81,.074,19.81);
   box(marble,0,4.34,0,13.55,.18,13.55);
   box(cream,0,4.50,0,13.77,.16,13.77);
   box(marble,0,4.655,0,13.58,.15,13.58);
   for(let side=0;side<4;side++){
    const angle=side*Math.PI/2,cos=Math.cos(angle),sin=Math.sin(angle);
    const at=(x,y,z)=>[x*cos+z*sin,y,z*cos-x*sin];
    const yaw=new T.Quaternion().setFromAxisAngle(UP,angle);
    for(const [i,z] of [10.57,10.28,9.99,9.70].entries()){
     const height=(i+1)*.225;
     add('box','stone',marble,...at(0,height/2,z),4.15,height,.52,yaw);
    }
    for(const x of [-4.466,0,4.466])add('hazuri-cusped-arch','stone',cream,...at(x,.915,6.48),1,1,1,yaw);
    for(const x of [-2.52,0,2.52]){
     cylinder(marble,...at(x,2.59,2.91),.18,3.35);
     box(cream,...at(x,4.12,2.91),.48,.27,.48);
    }
    add('box','stone',cream,...at(0,4.95,6.68),13.49,.46,.25,yaw);
    add('box','stone',marble,...at(0,5.195,6.68),13.55,.07,.33,yaw);
   }
  }else if(model==='hanoi-ly-thai-to'){
   const granite=0x55514b, polished=0x493e36, cast=0x554433, relief=0x655142;
   box(granite,0,.10,0,5.66,.20,5.56);
   for(const [y,radius,height] of [[.33,2.66,.26],[.57,2.43,.22],[.81,2.25,.26],[2.02,2.05,2.16],[3.20,2.12,.20]]){
    add('octagonal-stone','stone',y>=2?polished:granite,0,y,0,radius,height,radius);
   }
   // The 6.8 m bronze figure stands on its 3.3 m octagonal plinth.
   box(cast,0,3.36,0,1.68,.12,1.45,'patina');
   add('robe','patina',cast,0,5.58,.03,.88,4.40,.59);
   sphere(cast,0,7.66,0,.76,1.07,.45,'patina');
   box(relief,0,7.23,.41,1.13,.19,.19,'patina');
   limb([-.63,8.05,.07],[-1.04,6.89,.19],.235,cast,'patina');
   limb([-1.04,6.89,.19],[-.77,7.03,.64],.178,cast,'patina');
   limb([-.79,6.68,.70],[-.67,7.48,.60],.091,relief,'patina');
   limb([.62,8.08,.09],[1.03,7.10,.17],.23,cast,'patina');
   limb([1.03,7.10,.17],[1.39,6.29,.38],.171,cast,'patina');
   limb([1.39,6.32,.38],[1.57,5.96,.46],.085,cast,'patina');
   limb([0,8.52,.00],[0,9.00,.025],.20,cast,'patina');
   sphere(cast,0,9.21,.036,.34,.48,.30,'patina');
   sphere(relief,0,9.17,.31,.093,.087,.082,'patina');
   sphere(cast,0,8.95,.225,.16,.22,.125,'patina');
   box(cast,0,9.67,.009,.66,.31,.65,'patina');
   box(relief,0,9.96,.012,1.09,.28,.88,'patina');
  }else if(model==='nguyen-hue-ho-chi-minh'){
   const granite=0x333331, polished=0x45443f, cast=0x5e4e3b, edge=0x6a5944;
   box(granite,0,.22,0,3.40,.44,3.10);
   box(polished,0,.51,0,3.12,.14,2.82);
   box(granite,0,1.59,0,2.83,2.02,2.57);
   box(polished,0,2.64,0,2.95,.12,2.72);
   // The 4.5 m bronze stands on a 2.7 m pedestal and greets the boulevard with its right hand.
   for(const [x,z] of [[-.35,.03],[.31,.14]]){
    sphere(cast,x,2.86,z+.12,.235,.16,.38,'patina');
    limb([x,2.94,z-.07],[x*.96,3.92,z-.10],.203,cast,'patina');
    limb([x*.96,3.77,z-.10],[x*.54,4.72,0],.218,cast,'patina');
   }
   add('robe','patina',cast,0,4.74,0,.46,.95,.28);
   sphere(cast,0,5.42,0,.52,.70,.32,'patina');
   limb([.035,4.77,.25],[.035,5.89,.27],.039,edge,'patina');
   for(const y of [5.10,5.32,5.54,5.76]){
    sphere(edge,-.035,y,.287,.034,.034,.022,'patina');
   }
   for(const x of [-.243,.243]){
    box(cast,x,5.57,.274,.215,.214,.073,'patina');
    box(edge,x,5.673,.309,.217,.044,.027,'patina');
   }
   limb([0,5.93,0],[0,6.28,0],.161,cast,'patina');
   sphere(cast,0,6.55,.024,.265,.324,.235,'patina');
   sphere(edge,0,6.48,.226,.072,.062,.061,'patina');
   sphere(cast,0,6.21,.188,.124,.18,.092,'patina');
   for(const x of [-.261,.261])sphere(cast,x,6.53,.022,.050,.080,.050,'patina');
   limb([-.42,5.79,.018],[-.75,5.45,.146],.163,cast,'patina');
   limb([-.75,5.45,.146],[-.91,6.55,.256],.138,cast,'patina');
   sphere(cast,-.92,6.70,.265,.143,.22,.076,'patina');
   for(const [x,tip] of [[-1.025,7.02],[-.955,7.19],[-.887,7.12],[-.824,7.02]]){
    limb([x,6.80,.271],[x-.012,tip,.272],.025,edge,'patina');
   }
   limb([-.82,6.59,.272],[-.74,6.79,.290],.043,cast,'patina');
   limb([.43,5.78,.018],[.58,5.14,.037],.151,cast,'patina');
   limb([.58,5.14,.037],[.55,4.57,.13],.117,cast,'patina');
   sphere(cast,.55,4.42,.14,.091,.166,.083,'patina');
  }else if(model==='santiago-cardenal-caro'){
   const granite=0x9e9b91,trim=0xb7b1a3,bronze=0x56554a,dark=0x46473c;
   box(granite,0,.13,0,2.28,.26,2.09);
   box(trim,0,.32,0,2.08,.16,1.92);
   box(granite,0,1.40,0,1.69,2.04,1.60);
   box(trim,0,2.48,0,1.96,.13,1.82);
   box(dark,0,1.84,.806,1.18,.40,.026,'metal');
   box(bronze,0,2.61,0,1.17,.13,.84,'patina');
   const form=(x,y,z,w,h,d,c=bronze)=>sphere(c,x,y,z,w,h,d,'patina');
   const join=(a,b,r,c=bronze)=>limb(a,b,r,c,'patina');
   add('robe','patina',bronze,0,3.51,-.10,.59,1.68,.41);
   form(.02,4.02,-.11,.48,.53,.33);
   form(.02,4.22,-.20,.48,.29,.34);
   form(.015,4.75,.045,.22,.28,.20);
   form(.035,4.73,.218,.073,.085,.064);
   box(dark,.015,5.00,.015,.38,.14,.34,'patina');
   box(bronze,.015,5.078,.025,.21,.08,.23,'patina');
   for(const x of [-.24,-.07,.10,.28])join([x,2.69,.20],[x*.63,3.93,.19],.041,dark);
   join([-.33,4.20,-.04],[-.58,4.19,.19],.16);
   join([-.58,4.19,.19],[-.64,4.69,.38],.115);
   form(-.64,4.74,.39,.126,.155,.085);
   for(const x of [-.68,-.62])join([x,4.80,.40],[x-.01,4.98,.39],.026);
   join([.34,4.19,-.04],[.47,3.82,.10],.135);
   join([.47,3.82,.10],[.40,3.57,.34],.093);
   form(.38,3.57,.39,.12,.10,.08);
   form(.40,3.49,.41,.17,.065,.14,dark);
  }else if(model==='se-emblema'){
   const concrete=0xaaa8a0;
   box(concrete,0,.11,0,2.6,.22,.60);
   for(const angle of [0,Math.PI]){
    add('se-emblema-half','stone',concrete,0,0,0,1,1,.60,new T.Quaternion().setFromAxisAngle(UP,angle));
   }
  }else if(model==='se-totem'){
   const granite=0x9a9891,light=0xa7a59e,shade=0x85837d;
   box(0x87867d,0,.20,0,1.10,.40,1.05);
   // The granite courses widen and narrow around a vertical core.
   for(const [x,y,z,width,height,depth,color,angle] of [
    [-.05,.88,0,.97,.96,1.00,granite,.06],
    [-.20,1.66,.04,1.35,.68,1.23,light,-.09],
    [.16,2.25,-.06,1.39,.60,1.44,granite,.08],
    [-.17,2.87,.07,1.60,.70,1.40,shade,-.11],
    [.09,3.53,-.06,1.52,.66,1.54,granite,.06],
    [-.11,4.13,0,1.48,.58,1.66,light,-.07]
   ]){
    const rotation=new T.Quaternion().setFromAxisAngle(UP,angle);
    add('box','stone',color,x,y,z,width,height,depth,rotation);
   }
   // The upper course frames the deep front recess.
   box(granite,0,4.80,-.61,2.05,.80,.78);
   box(granite,-.79,4.80,.35,.49,.80,1.30);
   box(shade,.77,4.82,.31,.53,.84,1.38);
   box(light,-.03,5.40,0,2.2,.40,2.00);
  }else if(model==='se-anchieta'){
   const granite=0x96958f,trim=0xaaa7a0,metal=0x505954,dark=0x424c46;
   box(trim,0,.17,0,1.96,.34,2.05);
   box(granite,0,2.28,0,1.80,3.88,1.89);
   box(trim,0,4.36,0,1.92,.28,2.02);
   box(0x777771,0,2.87,.96,1.39,.74,.027);
   for(const side of [-1,1]){
    box(metal,side*.915,1.97,0,.035,1.34,1.30,'patina');
    // Reliefs read as incised bronze panels at plaza scale.
    for(const [y,z,h] of [[1.78,-.34,.42],[1.91,.04,.68],[1.81,.34,.48]]){
     sphere(0x657067,side*.938,y,z,.022,h*.56,.10,'patina');
     sphere(0x657067,side*.941,y+h*.52,z,.024,.079,.077,'patina');
    }
   }
   const fig=(x,y,z,rx,ry,rz,c=metal)=>sphere(c,x,y,z,rx,ry,rz,'patina');
   const join=(a,b,r,c=metal)=>limb(a,b,r,c,'patina');
   add('robe','patina',metal,.09,5.61,-.15,.79,2.22,.42);
   join([-.14,4.66,.28],[-.31,5.91,.06],.27);
   join([.48,4.67,-.03],[.27,5.90,-.08],.28);
   fig(-.19,4.63,.33,.21,.12,.26,dark);
   fig(.43,4.64,.12,.24,.14,.28,dark);
   for(const [x,z] of [[-.53,.06],[-.21,.32],[.12,.39],[.52,.26],[.66,-.28]]){
    join([x,4.68,z],[x*.56+.06,6.17,z*.34-.06],.105,dark);
   }
   fig(.03,6.73,-.01,.53,.75,.37);
   fig(.43,6.80,-.22,.40,.57,.28);
   join([.02,7.18,.03],[-.09,7.48,.08],.17);
   fig(-.11,7.63,.14,.26,.31,.25);
   fig(-.11,7.71,.03,.28,.26,.23,dark);
   fig(-.14,7.55,.34,.092,.10,.097);
   join([-.36,7.11,.04],[-.70,7.53,.16],.22);
   join([-.70,7.53,.16],[-.93,8.31,.21],.13);
   fig(-.93,8.34,.21,.145,.15,.115);
   join([-.95,8.19,.23],[-1.17,9.35,.26],.044,dark);
   join([-1.26,8.86,.25],[-.83,8.94,.26],.043,dark);
   join([.37,7.04,.05],[.65,6.74,.18],.20);
   join([.65,6.74,.18],[.51,7.16,.46],.144);
   add('box','patina',dark,.49,7.20,.47,.37,.51,.18,new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-.83));
   fig(.61,7.18,.53,.12,.14,.11);
  }else if(model==='marco-zero'){
   cylinder(stone,0,.061,0,2.72,.122);
   ring(0x8b897f,0,.13,0,2.42,.052,'stone');
   for(let ray=0;ray<8;ray++){
    const a=ray*Math.PI/4;
    limb([Math.sin(a)*.65,.144,Math.cos(a)*.65],[Math.sin(a)*2.13,.144,Math.cos(a)*2.13],.037,0x706d61,'stone');
   }
   add('hex','stone',marble,0,.63,0,.51,1.02,.51);
   add('hex','metal',0x978759,0,1.16,0,.52,.08,.52);
  }else if(model==='arenales-ensemble'){
   steps(0,9.4);cylinder(stone,0,1.05,0,4.1,.75);cylinder(stone,0,1.55,0,3.65,.32);
   box(stone,0,3.85,0,3.5,4.3,3.9);box(marble,0,6.14,0,4.1,.32,4.5);plaque(4.3,1.9,2.02);horse(6.32,'pointing');
   for(let i=0;i<15;i++){const angle=i*Math.PI*2/15,x=Math.sin(angle)*3.15,z=Math.cos(angle)*3.15;cylinder(stone,x,1.80,z,.38,.26);human(x,1.93,z,.53,'classical',marble);}
  }else if(model==='freedom-chains'){
   steps(0,4.6);box(marble,0,1.45,0,2.8,1.6,2.8);box(marble,0,2.365,0,3.15,.24,3.15);
   human(0,2.485,0,1.38,'freedom',marble);plaque(1.5,1.6,1.41);
  }else if(model==='pyramid'){
   steps(0,6.8);box(marble,0,1.16,0,4.7,1.05,4.7);box(marble,0,2.10,0,3.9,.85,3.9);box(marble,0,2.70,0,4.15,.30,4.15);
   add('pyramid','stone',marble,0,6.50,0,1.75,7.3,1.75);box(marble,0,10.30,0,.75,.33,.75);human(0,10.47,0,.70,'liberty',marble);
   for(const side of [-1,1])for(const end of [-1,1]){box(marble,side*2.35,1.0,end*2.35,.90,.60,.90);human(side*2.35,1.3,end*2.35,.55,'classical',marble);}
   plaque(1.5,2.2,2.39);
  }else if(['equestrian','equestrian-fountain'].includes(model)){
   if(model==='equestrian-fountain')basin(4.2);steps(model==='equestrian-fountain'?.45:0,5.3,6.1);box(stone,0,2.05,0,3.9,2.85,4.7);box(0xe4d8c3,0,3.61,0,4.2,.31,5.0);plaque(2.1,2.2,2.39);horse(3.78,owner.feature.riderPose||'reins');
   if(model==='equestrian-fountain')for(const side of [-1,1])jet(side*2.7,.52,0,.85,.60);
  }else if(model==='standing-civil'){
   sanMartin();
  }else if(model==='standing-sword'){
   steps(0,4.0);box(stone,0,1.8,0,2.7,2.15,2.7);box(marble,0,3.0,0,3.0,.27,3.0);plaque(1.9,1.6,1.39);human(0,3.135,0,1.45,'sword');
  }else if(model==='warsaw-old-town-mermaid'){
   const sandstone=0xc8b799,trim=0xaa987b,dark=0x594b36,patina=0x65533d;
   for(const [height,radius,thickness] of [[.10,1.08,.20],[.54,.89,.68],[.94,.99,.12]]){
    add('hex','stone',height===.54?sandstone:trim,0,height,0,radius,thickness,radius);
   }
   for(let i=0;i<6;i++){
    const a=i*Math.PI/3;
    sphere(i%2?patina:dark,Math.cos(a)*.47,1.04+i%3*.075,Math.sin(a)*.47,.31,.19,.28,'patina');
   }
   const tail=[[-.07,1.63,0],[-.38,1.39,-.23],[-.48,1.22,-.57],[-.10,1.19,-.77],[.35,1.36,-.66],[.54,1.67,-.36]];
   for(let i=1;i<tail.length;i++){
    const radius=.25-i*.032;
    limb(tail[i-1],tail[i],radius,patina,'patina');
    sphere(patina,...tail[i],radius,radius,radius,'patina');
   }
   for(const side of [-1,1])limb(tail.at(-1),[.67+side*.13,1.93,-.27+side*.10],.052,dark,'patina');
   sphere(patina,-.08,1.89,.02,.27,.41,.20,'patina');
   sphere(patina,-.15,2.18,.06,.32,.24,.19,'patina');
   limb([-.17,2.23,.05],[-.21,2.43,.09],.086,patina,'patina');
   sphere(patina,-.23,2.54,.10,.145,.18,.133,'patina');
   sphere(dark,-.23,2.59,.025,.151,.127,.122,'patina');
   limb([-.22,2.53,-.03],[-.15,2.35,-.16],.071,dark,'patina');
   limb([-.36,2.17,.07],[-.63,2.46,.05],.073,patina,'patina');
   limb([-.63,2.46,.05],[-.50,2.86,.02],.061,patina,'patina');
   sphere(patina,-.50,2.87,.02,.079,.083,.071,'patina');
   limb([-.57,2.83,.02],[-.41,2.96,.02],.044,dark,'metal');
   limb([-.53,2.98,-.03],[-.31,2.91,.05],.024,dark,'metal');
   limb([-.41,2.95,.02],[.17,3.42,.02],.023,patina,'metal');
   limb([.10,2.17,.06],[.36,1.95,.21],.071,patina,'patina');
   limb([.36,1.95,.21],[.55,2.15,.35],.060,patina,'patina');
   sphere(dark,.60,2.16,.38,.39,.46,.081,'patina');
   add('torus','patina',patina,.60,2.16,.435,.375,.442,.48);
   sphere(patina,.60,2.16,.47,.105,.10,.045,'patina');
  }else if(model==='pirulito-obelisk'){
   // Belotur records the dimensions of the granite courses and pyramid.
   const granite=0xa39d93,polished=0x807d77,molding=0xb7afa3;
   box(granite,0,.35,0,7.60,.70,7.60);
   box(granite,0,.96,0,4.88,.52,4.88);
   box(granite,0,1.82,0,2.40,1.20,2.40);
   box(molding,0,2.60,0,2.52,.36,2.52);
   box(polished,0,3.92,0,1.85,2.28,1.85);
   box(molding,0,5.25,0,2.02,.38,2.02);
   add('obelisk-cap','stone',granite,0,9.505,0,1.20,8.13,1.20);
   for(const side of [-1,1]){
    box(0x69523d,0,3.95,side*.939,1.05,.65,.028,'patina');
    box(0x69523d,side*.939,3.95,0,.028,.65,1.05,'patina');
   }
  }else if(model==='ubon-great-candle'){
   const candle=0xc8983d,accent=0xebbb5e,shade=0x956424;
   cylinder(stone,0,.23,0,9,.46);
   box(shade,0,.69,0,6.3,.62,11.0);
   sphere(candle,0,1.86,0,3.25,1.52,7.05,'stone');
   box(accent,0,2.84,0,4.70,.30,9.7);
   for(const side of [-1,1]){
    limb([0,2.28,side*4.65],[0,4.8,side*7.35],.52,candle,'stone');
    sphere(accent,0,4.85,side*7.34,.65,.52,.69,'stone');
    for(let i=-3;i<=3;i++){
     const z=i*1.39;
     sphere(accent,side*2.30,2.47,z,.48,.47,.63,'stone');
    }
   }
   cylinder(shade,0,3.69,0,1.67,1.44);
   cylinder(candle,0,11.72,0,.70,14.60);
   for(const y of [4.15,5.75,8.37,11.03,13.69,16.36,18.88])cylinder(accent,0,y,0,.78,.21);
   add('cone','stone',accent,0,20.50,0,.73,3.0,.73);
  }else if(model==='phayao-ngam-mueang'){
   const marbleBase=0xd4cbb5,fig=0x645b48,ceremonial=0x847655;
   box(marbleBase,0,.23,0,4.4,.46,4.4);
   box(marbleBase,0,.60,0,3.94,.28,3.94);
   box(marbleBase,0,1.45,0,2.58,1.42,2.58);
   box(marble,0,2.24,0,2.86,.20,2.86);
   box(0x4f463a,0,1.55,1.30,1.38,.63,.045);
   human(0,2.34,0,.99,'standing',fig);
   add('robe','patina',fig,0,3.05,0,.44,1.11,.30);
   cylinder(ceremonial,0,4.80,0,.245,.13,'patina');
   add('cone','patina',fig,0,5.04,0,.22,.42,.22);
   limb([.49,2.64,.34],[.49,3.60,.33],.035,fig,'patina');
  }else if(model==='virac-rizal-monument'){
   const concrete=0xbbb3a4,trim=0xd9cec0,figure=0x69584a;
   box(concrete,0,.32,0,6.40,.64,5.28);
   for(let i=0;i<3;i++)box(trim,0,.10+i*.18,2.55-i*.30,3.25,.20,.60);
   cylinder(concrete,0,.84,-.37,2.01,.40);
   cylinder(trim,0,1.12,-.38,1.69,.19);
   box(concrete,0,2.02,-.38,1.62,1.60,1.48);
   box(trim,0,2.88,-.38,1.82,.21,1.68);
   box(0x5d5750,0,1.99,.37,.79,.73,.045,'metal');
   human(0,2.98,-.35,1.07,'standing',figure);
  }else if(model==='morong-claudio-statue'){
   const plinth=0x9e9687,uniform=0x777357;
   box(plinth,0,.18,0,2.75,.36,2.75);
   box(stone,0,.48,0,2.43,.24,2.43);
   box(plinth,0,1.23,0,1.72,1.27,1.68);
   box(stone,0,1.93,0,2.04,.18,2.02);
   box(0x302d28,0,1.30,.86,1.24,.84,.05,'metal');
   human(0,2.01,0,.84,'standing',uniform);
   cylinder(uniform,0,4.07,.02,.255,.07,'patina');
   sphere(uniform,0,4.11,-.03,.21,.15,.21,'patina');
   limb([.32,2.28,.31],[.46,3.36,.32],.047,uniform,'patina');
  }else if(model==='daet-rizal-pylon'){
   const white=0xece5d9,shade=0xc8c3b7,emblem=0xc29b45;
   box(shade,0,.19,0,3.8,.38,3.8);
   box(white,0,1.10,0,2.60,1.44,2.60);
   box(white,0,1.86,0,2.82,.16,2.82);
   add('triangular-base','stone',white,0,2.69,0,1.22,1.50,1.22);
   add('triangular-obelisk','stone',white,0,4.77,0,1.22,2.66,1.22,
    new T.Quaternion().setFromAxisAngle(UP,Math.PI));
   for(const angle of [Math.PI/3,Math.PI,5*Math.PI/3]){
    add('flag-star','stone',emblem,Math.sin(angle)*.62,2.87,Math.cos(angle)*.62,.38,.38,.05,
     new T.Quaternion().setFromAxisAngle(UP,angle));
   }
  }else if(model==='dapitan-rizal-statue'){
   const white=0xe6e1d3,grey=0xc5bead,stone=0xd6d0c2;
   box(grey,0,.12,0,3.55,.24,3.55);
   box(white,0,.31,0,3.23,.14,3.23);
   box(stone,0,.50,0,2.91,.24,2.91);
   box(grey,0,.69,0,2.55,.14,2.55);
   box(white,0,.92,0,2.40,.32,2.40);
   box(stone,0,1.73,0,1.95,1.32,1.95);
   box(white,0,2.45,0,2.28,.17,2.28);
   box(grey,0,2.58,0,1.68,.12,1.68);
   box(white,0,2.72,0,1.27,.17,1.27);
   box(0x746f63,0,1.85,.982,1.04,.47,.022);
   box(0xc1b9a7,0,1.89,.996,.90,.035,.01);
   const fig=(x,y,z,rx,ry,rz,c=white)=>sphere(c,x,y,z,rx,ry,rz,'stone');
   const join=(a,b,r,c=white)=>limb(a,b,r,c,'stone');
   fig(-.19,2.89,.11,.14,.10,.23);
   fig(.17,2.88,.07,.14,.10,.21);
   join([-.19,2.91,0],[-.19,3.54,.01],.109);
   join([.17,2.91,-.02],[.18,3.54,-.03],.11);
   add('robe','stone',white,0,3.76,-.04,.46,.84,.29);
   fig(0,4.32,-.04,.40,.57,.29);
   join([0,4.65,-.05],[0,4.89,-.025],.13);
   fig(.02,5.03,.01,.21,.29,.19);
   fig(-.022,5.12,-.075,.19,.21,.15,grey);
   fig(.035,5.04,.185,.062,.076,.064);
   join([-.34,4.62,-.04],[-.45,4.18,.11],.103);
   join([-.45,4.18,.11],[-.15,4.38,.25],.081);
   fig(-.12,4.39,.26,.085,.075,.072);
   join([.34,4.61,-.04],[.46,4.18,.02],.103);
   join([.46,4.18,.02],[.49,3.88,.16],.077);
   box(grey,.46,3.96,.20,.37,.40,.10);
   fig(.48,3.89,.25,.085,.079,.068);
  }else if(model==='dapitan-mindanao-relief'){
   const redWall=0xa74a40,whiteCap=0xe8ddce,reliefGround=0x5c8a50,blueSea=0x63a1af;
   box(stone,0,.15,0,32,.30,28);
   box(blueSea,0,.32,0,31,.08,27,'water');
   add('mindanao-land','stone',reliefGround,0,.62,0,25.2,.54,20.8);
   for(const [x,z,rx,rz] of [[-2.5,1.5,3.4,2.2],[2.1,-1.4,4.5,2.8],[5.9,-3.6,2.9,3.4],[4.1,4.3,2.6,4.2]]){
    sphere(0x6b955b,x,.72,z,rx,.48,rz,'stone');
   }
   for(const side of [-1,1]){
    box(redWall,0,.59,side*13.56,32,.61,.60);
    box(redWall,side*15.70,.59,0,.60,.61,27);
    for(let i=-6;i<=6;i++)box(whiteCap,i*2.42,1.03,side*13.56,.94,.27,.65);
    for(let i=-5;i<=5;i++)box(whiteCap,side*15.70,1.03,i*2.42,.65,.27,.94);
   }
  }else if(model==='laoag-tobacco-obelisk'){
   const brick=0x995d46,darkBrick=0x734a3d,cap=0xb17b63;
   box(brick,0,.29,0,3.5,.58,3.5);
   box(darkBrick,0,.71,0,2.85,.28,2.85);
   box(brick,0,1.63,0,2.47,1.60,2.47);
   box(cap,0,2.53,0,2.74,.21,2.74);
   box(brick,0,3.86,0,1.78,2.46,1.78);
   box(darkBrick,0,5.15,0,2.04,.15,2.04);
   box(brick,0,5.48,0,1.53,.56,1.53);
   box(cap,0,5.81,0,1.81,.16,1.81);
   box(darkBrick,0,6.08,0,1.42,.39,1.42);
   for(const side of [-1,1]){
    box(darkBrick,0,1.56,side*1.244,.83,.68,.03);
    box(darkBrick,side*1.244,1.56,0,.03,.68,.83);
   }
  }else if(model==='naga-fifteen-martyrs'){
   const pale=0xf2e9d9,paintedGold=0xc69a3b,pedestalRed=0x90382d;
   cylinder(0xb37b62,0,.11,0,3.20,.22);
   cylinder(pale,0,.40,0,2.34,.36);
   cylinder(pale,0,1.02,0,1.82,.88);
   cylinder(pedestalRed,0,1.48,0,1.86,.12);
   cylinder(pale,0,2.29,0,1.67,1.50);
   cylinder(pale,0,3.11,0,1.84,.26);
   cylinder(pedestalRed,0,3.29,0,1.63,.12);
   cylinder(pale,0,4.02,0,.88,1.36);
   cylinder(paintedGold,0,4.76,0,1.02,.18);
   for(let i=0;i<15;i++){
    const angle=i*Math.PI*2/15,x=Math.sin(angle),z=Math.cos(angle);
    sphere(paintedGold,x*1.67,2.40,z*1.67,.15,.19,.15,'stone');
    sphere(paintedGold,x*1.67,2.06,z*1.67,.10,.045,.10,'stone');
   }
   for(const x of [-1.12,1.12])human(x,1.53,1.25,.66,'classical',paintedGold);
   human(0,4.85,0,.80,'freedom',paintedGold);
  }else if(model==='boa-vista-garimpeiro'){
   const figure=0xc6a064,shade=0x9d7644,plinth=0xb5a48e;
   // A shallow reflecting pool surrounds the masonry support.
   box(plinth,0,.12,0,15.7,.24,7.5);
   box(water,0,.255,0,15.18,.035,6.98,'water');
   for(const side of [-1,1]){
    box(stone,side*7.72,.30,0,.26,.22,7.5);
    box(stone,0,.30,side*3.62,15.18,.22,.26);
   }
   box(plinth,0,.74,-.18,4.18,1.0,3.36);
   box(stone,0,1.30,-.18,4.30,.16,3.48);
   // Bent knees and forward shoulders carry the head and the two-handed bateia.
   for(const side of [-1,1]){
    const hip=[side*.59,4.44,-.83],knee=[side*.99,2.92,-.04],ankle=[side*1.03,1.63,-.55];
    limb(hip,knee,.42,figure,'stone');
    sphere(figure,...knee,.41,.40,.40,'stone');
    limb(knee,ankle,.29,figure,'stone');
    sphere(figure,ankle[0],1.55,-.21,.36,.17,.68,'stone');
    const shoulder=[side*.78,5.70,.57],elbow=[side*1.20,4.77,1.29],hand=[side*1.20,4.03,2.64];
    sphere(figure,...shoulder,.44,.52,.45,'stone');
    limb(shoulder,elbow,.28,figure,'stone');
    sphere(figure,...elbow,.25,.26,.25,'stone');
    limb(elbow,hand,.21,figure,'stone');
    sphere(figure,...hand,.26,.24,.27,'stone');
   }
   sphere(shade,0,4.43,-.80,.92,.62,.54,'stone');
   limb([0,4.45,-.65],[0,5.71,.49],.72,figure,'stone');
   sphere(figure,0,5.75,.45,1.0,.58,.69,'stone');
   limb([0,5.82,.85],[0,6.30,1.04],.34,figure,'stone');
   sphere(figure,0,6.43,1.20,.53,.58,.50,'stone');
   sphere(figure,0,6.30,1.62,.20,.19,.21,'stone');
   cylinder(shade,0,6.85,1.18,.85,.12);
   cylinder(figure,0,7.06,1.18,.48,.36);
   add('bateia','stone',shade,0,3.78,2.41,1,1,1,new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.22));
  }else if(model==='monaco-malizia'){
   const cloak=0x573e30,dark=0x382a22,fold=0x6e5340;
   cylinder(0xaaa091,0,.36,0,1.10,.72);
   cylinder(0xbfb5a5,0,.78,0,1.04,.12);
   // The bronze figure wears a long friar's habit and reaches for the sword beneath it.
   add('robe','patina',cloak,.07,1.92,-.02,.87,2.13,.53);
   sphere(cloak,0,2.94,-.08,.56,.75,.39,'patina');
   sphere(dark,-.04,3.70,-.04,.39,.49,.34,'patina');
   sphere(fold,-.04,3.66,.21,.22,.28,.17,'patina');
   sphere(dark,-.04,3.51,.29,.19,.14,.13,'patina');
   limb([-.45,2.99,.03],[-.60,2.48,.23],.19,cloak,'patina');
   limb([-.60,2.48,.23],[-.16,2.42,.50],.14,cloak,'patina');
   limb([.43,2.99,.02],[.52,2.61,.24],.20,cloak,'patina');
   limb([.52,2.61,.24],[.34,2.37,.45],.15,cloak,'patina');
   for(const x of [-.16,.34])sphere(fold,x,2.40,.49,.12,.13,.10,'patina');
   limb([.67,2.65,.38],[.21,2.34,.48],.045,dark,'metal');
   for(const x of [-.60,-.32,.22,.57])limb([x,1.00,.36],[x*.56,2.41,.28],.040,fold,'patina');
  }else if(model==='tahrir-obelisk'){
   // Pink granite shaft and pyramidion, with the relief indicated schematically.
   const granite=0xb98370,engraving=0x955f51,shaftWidth=2.4,shaftDepth=2.1,topRatio=.62;
   box(0x96908a,0,.20,0,4.7,.40,4.3);
   box(0xc6b3a6,0,.75,0,3.55,.70,3.21);
   add('obelisk-shaft','stone',granite,0,9.875,0,shaftWidth,17.55,shaftDepth);
   add('obelisk-cap','stone',0xc79680,0,19.375,0,shaftWidth*topRatio,1.45,shaftDepth*topRatio);
   for(let row=0;row<19;row++){
    const y=2.05+row*.79;
    const taper=1-(1-topRatio)*(y-1.1)/17.55;
    for(const side of [-1,1]){
     const dx=side*(shaftWidth*taper/2+.008),dz=side*(shaftDepth*taper/2+.008);
     const w=row%3===1?.28:.49;
     box(engraving,0,y,dz,w,.11,.035);
     box(engraving,dx,y,0,.035,.11,w);
    }
   }
  }else if(model==='hallstatt-trinity-column'){
   const limestone=0xcebca5, paleStone=0xe0d3bd;
   add('triangular-base','stone',limestone,0,.14,0,1.85,.28,1.85);
   add('triangular-base','stone',paleStone,0,.43,0,1.62,.30,1.62);
   add('triangular-base','stone',limestone,0,.92,0,1.15,.72,1.15);
   add('triangular-obelisk','stone',paleStone,0,3.38,0,.83,4.25,.83);
   for(const angle of [0,2*Math.PI/3,4*Math.PI/3])sphere(limestone,Math.sin(angle)*.92,1.12,Math.cos(angle)*.92,.22,.32,.22,'stone');
   human(0,1.28,.61,.44,'classical',paleStone);
   sphere(paleStone,0,3.25,.45,.18,.38,.19,'stone');
   sphere(paleStone,0,5.47,.16,.37,.25,.27,'stone');
   human(-.17,5.53,.26,.20,'classical',paleStone);
   human(.17,5.53,.26,.20,'classical',paleStone);
  }else if(model==='liberty-column'||model==='column'||model==='obelisk'){
   steps(0,5.3);box(stone,0,1.5,0,3.5,1.65,3.5);plaque(1.5,1.7,1.79);
   if(model==='obelisk')add('pyramid','stone',marble,0,6.15,0,1.1,7.6,1.1);
   else{cylinder(marble,0,5.8,0,.74,7.0);for(const y of [2.35,2.65,8.90,9.20])cylinder(stone,0,y,0,1.0,.24);if(model==='liberty-column'){human(0,9.32,0,.9,'liberty');for(const side of [-1,1]){sphere(bronze,side*1.85,1.0,1.8,.45,.45,.85);sphere(bronze,side*1.85,1.40,2.22,.35,.37,.34);}}}
  }else if(model==='arequipa-tuturutu'){
   basin(5);
   cylinder(bronze,0,2.32,0,.43,4.0,'metal');
   for(const [y,r] of [[1.72,2.40],[2.92,1.60],[4.24,1.02]]){
    cylinder(bronze,0,y,0,r,.19,'metal');ring(bronze,0,y+.1,0,r,.11);
    cylinder(water,0,y+.10,0,r-.10,.025,'water');
   }
   human(0,4.28,0,.47,'trumpeter');
  }else if(['ornate-fountain','liberty-fountain','fountain'].includes(model)){
   basin(model==='fountain'?2.65:3.8);
   if(model==='fountain'){cylinder(stone,0,.82,0,.44,.75);jet(0,1.23,0,1.25,1.55);}
   else if(model==='liberty-fountain'){
    cylinder(marble,0,1.0,0,1.2,1.1);human(0,1.55,0,1.47,'liberty',marble);
    for(const side of [-1,1]){cylinder(stone,side*1.45,.48,0,.39,.14);human(side*1.45,.55,0,.55,'civil',marble);jet(side*2.4,.49,0,1.1,.72);}
   }
   else{
    cylinder(bronze,0,1.52,0,.68,2.65,'metal');for(const y of [.77,1.1,1.97])ring(gold,0,y,0,.71,.075);
    cylinder(bronze,0,2.77,0,2.15,.16,'metal');ring(gold,0,2.87,0,2.15,.11);cylinder(water,0,2.90,0,2.02,.035,'water');
    cylinder(bronze,0,3.64,0,.38,1.5,'metal');cylinder(bronze,0,4.42,0,1.16,.14,'metal');ring(gold,0,4.52,0,1.16,.08);cylinder(water,0,4.54,0,1.04,.03,'water');cylinder(bronze,0,4.62,0,.24,.18,'metal');human(0,4.70,0,.72,'fame');
    for(let angle=0;angle<4;angle++){const a=angle*Math.PI/2;jet(Math.sin(a)*2.48,.48,Math.cos(a)*2.48,1.4,.73);sphere(bronze,Math.sin(a)*.84,1.57,Math.cos(a)*.84,.35,.49,.26);}
   }
  }else if(model==='bust'){steps(0,2.7);box(stone,0,1.45,0,1.8,1.7,1.8);cylinder(bronze,0,2.36,0,.38,.14,'metal');sphere(bronze,0,2.95,0,.65,.55,.35);sphere(bronze,0,3.65,0,.30,.36,.30);plaque(1.6,1.1,.94);}
  else if(model==='plaque'){box(stone,0,.63,0,1.8,1.1,.8);plaque(.75,1.5,.44);}
  else if(model==='classical-figure')human(0,0,0,1,'classical',marble);
 }
 const localModels=[];
 for(const item of plan.items){owner=item;const first=parts.length;build(item.feature.model);localModels.push({item,first,end:parts.length});}
 const geos={box:new T.BoxGeometry(1,1,1),sphere:new T.SphereGeometry(1,12,8),cylinder:new T.CylinderGeometry(1,1,1,12),cone:new T.ConeGeometry(1,1,12),torus:new T.TorusGeometry(1,.045,6,20),pyramid:new T.CylinderGeometry(.12,1,1,4),robe:new T.CylinderGeometry(.55,1,1,10),cape:new T.PlaneGeometry(1,1,10,12)};
 if(parts.some(part=>part.kind==='lusaka-podium')){
  geos['lusaka-podium']=new T.CylinderGeometry(1,1,1,24);
  const stool=[[.86,0],[.97,.13],[1,.37],[.96,.63],[.81,.88],[.58,.985],[0,1]];
  geos['lusaka-stool-roof']=new T.LatheGeometry(stool.map(([r,y])=>new T.Vector2(r,y)),36);
  const chapel=[[1,0],[.96,.26],[.83,.49],[.67,.66],[.37,.88],[.06,1],[0,1]];
  geos['lusaka-chapel-roof']=new T.LatheGeometry(chapel.map(([r,y])=>new T.Vector2(r,y)),32);
 }
 if(parts.some(part=>part.kind==='harare-basin'))geos['harare-basin']=new T.CylinderGeometry(1,1,1,48);
 if(parts.some(part=>part.kind==='registan-arch')){
  const arch=new T.Shape();
  arch.moveTo(-.5,0);arch.lineTo(-.5,1);arch.lineTo(.5,1);arch.lineTo(.5,0);
  arch.lineTo(.27,0);arch.lineTo(.27,.52);arch.quadraticCurveTo(.26,.68,0,.87);
  arch.quadraticCurveTo(-.26,.68,-.27,.52);arch.lineTo(-.27,0);arch.closePath();
  geos['registan-arch']=new T.ExtrudeGeometry(arch,{depth:1,bevelEnabled:false,curveSegments:12}).translate(0,0,-.5);
  geos['registan-taper']=new T.CylinderGeometry(.80,1,1,18);
  const profile=[[.76,0],[.86,.08],[.96,.22],[1,.37],[.94,.56],[.80,.73],[.56,.87],[.29,.96],[.03,1],[0,1]];
  geos['registan-dome']=new T.LatheGeometry(profile.map(([radius,height])=>new T.Vector2(radius,height)),36);
 }
 if(parts.some(part=>part.kind==='islamabad-petal')){
  geos['islamabad-platform']=new T.CylinderGeometry(1,1,1,48);
  const star=Array.from({length:10},(_,i)=>{
   const angle=i*Math.PI/5, radius=i%2?.54:1;
   return new T.Vector2(Math.cos(angle)*radius,Math.sin(angle)*radius);
  });
  geos['islamabad-star']=new T.ShapeGeometry(new T.Shape(star)).rotateX(-Math.PI/2);
  // The cupped masonry shells lean inward and narrow along the cantilever.
  const sections=[
   [0,-.26,.30,.073],[.12,-.36,.40,.095],[.28,-.39,.49,.090],
   [.44,-.32,.50,.077],[.60,-.16,.44,.058],[.76,.03,.32,.042],
   [.90,.21,.18,.026],[.97,.35,.07,.015],[1,.42,.012,.006],
  ];
  const positions=[],indices=[],segments=16;
  for(const [height,forward,width,thickness] of sections){
   for(let i=0;i<segments;i++){
    const angle=2*Math.PI*i/segments,u=Math.cos(angle);
    const scoop=.043*u*u*Math.sin(height*Math.PI);
    positions.push(width*u,height,forward+scoop+thickness*Math.sin(angle));
   }
  }
  for(let row=0;row<sections.length-1;row++){
   for(let i=0;i<segments;i++){
    const a=row*segments+i, next=row*segments+(i+1)%segments;
    indices.push(a,a+segments,next,next,a+segments,next+segments);
   }
  }
  const firstCap=positions.length/3,lastRow=(sections.length-1)*segments;
  positions.push(0,0,sections[0][1],0,1,sections.at(-1)[1]);
  for(let i=0;i<segments;i++){
   const next=(i+1)%segments;
   indices.push(firstCap,i,next,firstCap+1,lastRow+next,lastRow+i);
  }
  const shell=new T.BufferGeometry();
  shell.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  shell.setIndex(indices);shell.computeVertexNormals();
  geos['islamabad-petal']=shell;
 }
 if(parts.some(part=>part.kind==='pune-maidan-stage-plan')){
  const outline=[[0,-5.662],[5.662,-3.964],[8.494,-1.132],[10.192,2.265],[10.758,5.662],[-10.758,5.662],[-9.626,0],[-6.795,-2.831],[-3.397,-4.530]];
  const shape=new T.Shape(outline.map(([x,z])=>new T.Vector2(x,-z)));
  geos['pune-maidan-stage-plan']=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
 }
 if(parts.some(part=>part.kind==='se-emblema-half')){
  // Mirror this concrete profile to preserve the open vertical slot and forked crown.
  const half=new T.Shape();
  half.moveTo(.16,.22);
  half.lineTo(1.30,.22);
  half.lineTo(1.03,1.25);
  half.lineTo(.67,1.68);
  half.lineTo(1.16,2.20);
  half.lineTo(.73,2.91);
  half.quadraticCurveTo(1.37,3.48,.90,3.99);
  half.lineTo(.52,4.29);
  half.lineTo(1.03,4.77);
  half.lineTo(.76,5.50);
  half.lineTo(.56,5.50);
  half.lineTo(.56,6.14);
  half.quadraticCurveTo(1.16,6.51,1.26,7.12);
  half.lineTo(1.26,8.2);
  half.lineTo(.90,8.2);
  half.quadraticCurveTo(.92,7.42,.62,7.26);
  half.quadraticCurveTo(.33,7.39,.33,7.98);
  half.lineTo(.16,7.98);
  half.closePath();
  geos['se-emblema-half']=new T.ExtrudeGeometry(half,{depth:1,bevelEnabled:false,curveSegments:8}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='se-dialogo-steel')){
  // Two thin folded silhouettes keep the open space between the steel plates.
  const plates=[
   [[-2.56,0],[-1.97,3.17],[-.19,4.43],[-.72,2.82],[-1.29,1.27],[-.15,.38],[-.71,0]],
   [[.56,0],[.09,1.35],[.73,3.85],[2.43,4.04],[2.56,2.80],[1.31,2.64],[1.72,1.11],[2.34,0]],
  ];
  const inputs=[];
  for(const [index,plate] of plates.entries()){
   const polygon=new T.Shape();
   for(const [vertex,[x,y]] of plate.entries()){
    if(vertex===0)polygon.moveTo(x,y);
    else polygon.lineTo(x,y);
   }
   polygon.closePath();
   const sheet=new T.ExtrudeGeometry(polygon,{depth:.055,bevelEnabled:false});
   const points=sheet.getAttribute('position');
   for(let vertex=0;vertex<points.count;vertex++){
    const x=points.getX(vertex),y=points.getY(vertex),z=points.getZ(vertex);
    const offset=(index===0?-1:1)*(.73-.22*Math.abs(x-.2)-.04*y);
    points.setZ(vertex,z+offset);
   }
   inputs.push(...points.array);
   sheet.dispose();
  }
  const steel=new T.BufferGeometry();
  steel.setAttribute('position',new T.Float32BufferAttribute(inputs,3));
  steel.computeVertexNormals();
  geos['se-dialogo-steel']=steel;
 }
 if(parts.some(part=>part.kind==='mindanao-land')){
  // Generalised island silhouette for the painted exhibit.
  const outline=[[-.50,-.02],[-.40,-.11],[-.32,-.04],[-.26,-.16],[-.16,-.19],[-.15,-.30],
   [-.06,-.37],[.02,-.30],[.12,-.36],[.18,-.29],[.31,-.29],[.34,-.46],[.39,-.41],
   [.42,-.24],[.50,-.11],[.47,.06],[.41,.13],[.40,.30],[.30,.48],[.22,.45],
   [.24,.34],[.14,.32],[.14,.45],[.05,.43],[.02,.32],[-.13,.26],[-.24,.17],
   [-.30,.07],[-.38,.08],[-.45,.05]];
  const shape=new T.Shape();
  outline.forEach(([x,z],i)=>i===0?shape.moveTo(x,-z):shape.lineTo(x,-z));
  shape.closePath();
  geos['mindanao-land']=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).translate(0,0,-.5).rotateX(-Math.PI/2);
 }
 if(parts.some(part=>part.kind==='iron-man')){
  // Approximate the cast-iron silhouette, with the feet below the paving.
  const section=[[0,.37,.31],[.65,.45,.38],[2.15,.64,.46],[3.06,.74,.54],
   [4.12,.82,.56],[4.82,.92,.46],[5.10,.51,.37],[5.20,.29,.28],
   [5.36,.35,.34],[5.78,.31,.30],[5.99,.17,.19],[6,0,0]];
  const vertices=[],indices=[],segments=12;
  for(const [height,width,depth] of section){
   for(let i=0;i<segments;i++){
    const angle=i*2*Math.PI/segments;
    vertices.push(Math.sin(angle)*width-height*Math.tan(5*Math.PI/180),height,
     Math.cos(angle)*depth-height*Math.tan(7.5*Math.PI/180));
   }
  }
  for(let row=1;row<section.length;row++){
   for(let i=0;i<segments;i++){
    const a=(row-1)*segments+i,b=(row-1)*segments+(i+1)%segments;
    indices.push(a,b,a+segments,b,b+segments,a+segments);
   }
  }
  const shape=new T.BufferGeometry();
  shape.setAttribute('position',new T.Float32BufferAttribute(vertices,3));shape.setIndex(indices);
  shape.computeVertexNormals();geos['iron-man']=shape;
 }
 if(parts.some(part=>part.kind==='fountain-deck'))geos['fountain-deck']=new T.CylinderGeometry(1,1,1,32);
 if(parts.some(part=>part.kind==='vitoria-shaft'))geos['vitoria-shaft']=new T.CylinderGeometry(.70,1,1,4).rotateY(Math.PI/4).scale(Math.SQRT1_2,1,Math.SQRT1_2);
 if(parts.some(part=>part.kind==='jicin-fountain-wall')){
  const outline=[[-.50,-.33],[-.33,-.50],[.33,-.50],[.50,-.33],[.50,.33],[.33,.50],[-.33,.50],[-.50,.33]];
  const path=(geometry,points)=>{
   geometry.moveTo(...points[0]);
   for(const point of points.slice(1))geometry.lineTo(...point);
   geometry.closePath();
   return geometry;
  };
  const basin=innerScale=>{
   const shape=path(new T.Shape(),outline);
   if(innerScale)shape.holes.push(path(new T.Path(),outline.map(([x,z])=>[x*innerScale,z*innerScale]).reverse()));
   return new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  };
  geos['jicin-fountain-slab']=basin(0);
  geos['jicin-fountain-wall']=basin(.88);
  geos['jicin-fountain-coping']=basin(.81);
 }
 if(parts.some(part=>part.kind==='hex'))geos.hex=new T.CylinderGeometry(1,1,1,6);
 if(parts.some(part=>part.kind==='pentagonal-pedestal'))geos['pentagonal-pedestal']=new T.CylinderGeometry(1,1,1,5);
 if(parts.some(part=>part.kind==='hexagonal-stone'))geos['hexagonal-stone']=new T.CylinderGeometry(1,1,1,6);
 if(parts.some(part=>part.kind==='octagonal-stone'))geos['octagonal-stone']=new T.CylinderGeometry(1,1,1,8);
 if(parts.some(part=>part.kind==='puigcerda-cutout')){
  const plate=new T.Shape();
  plate.moveTo(-.50,-.50);plate.lineTo(.50,-.50);plate.lineTo(.50,.50);plate.lineTo(-.50,.50);plate.closePath();
  const horseHead=new T.Path();
  horseHead.moveTo(-.37,-.36);
  horseHead.quadraticCurveTo(-.24,-.09,-.19,.12);
  horseHead.lineTo(-.22,.34);horseHead.lineTo(-.08,.22);horseHead.lineTo(.02,.37);horseHead.lineTo(.07,.18);
  horseHead.quadraticCurveTo(.22,.16,.25,.04);
  horseHead.lineTo(.39,-.13);horseHead.quadraticCurveTo(.41,-.23,.28,-.27);
  horseHead.quadraticCurveTo(.14,-.26,.04,-.14);
  horseHead.quadraticCurveTo(-.04,-.28,-.01,-.36);horseHead.closePath();
  plate.holes.push(horseHead);
  geos['puigcerda-cutout']=new T.ExtrudeGeometry(plate,{depth:1,steps:1,bevelEnabled:false,curveSegments:5}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='bratislava-bicorne')){
  const outline=new T.Shape();
  outline.moveTo(-.5,-.05);
  outline.quadraticCurveTo(-.37,-.37,0,-.36);
  outline.quadraticCurveTo(.36,-.37,.5,-.04);
  outline.quadraticCurveTo(.33,-.12,.26,.18);
  outline.quadraticCurveTo(.20,.49,0,.48);
  outline.quadraticCurveTo(-.22,.49,-.28,.16);
  outline.quadraticCurveTo(-.34,-.12,-.5,-.05);
  outline.closePath();
  geos['bratislava-bicorne']=new T.ExtrudeGeometry(outline,{depth:1,bevelEnabled:false,curveSegments:5}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='bateia')){
  const profile=[[0,0],[.70,0],[1.24,.35],[1.30,.40],[1.23,.41],[.62,.10],[0,.10]];
  geos.bateia=new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r,y)),24);
 }
 if(parts.some(part=>part.kind==='sundial-bowl')){
  const profile=[[0,0],[.13,0],[.27,.08],[.38,.22],[.42,.36],[.38,.36],[.34,.23],[.24,.11],[.11,.05],[0,.05]];
  geos['sundial-bowl']=new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r,y)),20);
 }
 if(parts.some(part=>part.kind==='triangular-base'))geos['triangular-base']=new T.CylinderGeometry(1,1,1,3);
 if(parts.some(part=>part.kind==='gaborone-thatch')){
  const pitch=[[0,0],[.92,0],[1,.05],[1,.16],[.83,.27],[.66,.43],[.48,.61],[.30,.78],[.12,.94],[.018,1],[0,1]];
  const segments=36,roof=new T.LatheGeometry(pitch.map(([radius,y])=>new T.Vector2(radius,y)),segments);
  const strands=[];
  for(let i=0;i<=segments;i++){
   const tone=.79+.21*(((i%segments)*37)%13)/12;
   for(const [,y] of pitch){
    const shade=y<=.05?tone*.79:tone;
    strands.push(shade,shade,shade);
   }
  }
  roof.setAttribute('color',new T.Float32BufferAttribute(strands,3));
  geos['gaborone-thatch']=roof;
 }
 if(parts.some(part=>part.kind==='hanoi-bandstand-roof')){
  const pitch=[[0,0],[1,0],[1,.11],[.91,.21],[.73,.64],[.51,1.28],[.30,1.82],[.12,2.17],[.025,2.31],[0,2.33]];
  geos['hanoi-bandstand-roof']=new T.LatheGeometry(pitch.map(([radius,y])=>new T.Vector2(radius,y)),8);
 }
 if(parts.some(part=>part.kind==='hazuri-cusped-arch')){
  const arch=new T.Shape();
  arch.moveTo(-2.233,0);arch.lineTo(-2.233,3.34);arch.lineTo(2.233,3.34);
  arch.lineTo(2.233,0);arch.lineTo(1.52,0);arch.lineTo(1.52,1.19);
  for(let i=1;i<=16;i++){
   const angle=i*Math.PI/16;
   const lobe=i%2===0?0:.12;
   arch.lineTo(1.52*Math.cos(angle),1.19+1.28*Math.sin(angle)-lobe);
  }
  arch.lineTo(-1.52,0);arch.closePath();
  geos['hazuri-cusped-arch']=new T.ExtrudeGeometry(arch,{depth:.44,bevelEnabled:false}).translate(0,0,-.22);
 }
 if(parts.some(part=>part.kind==='corregidora-basin-wall')&&plan.profile.holes?.[0]?.length>=4){
  const {feature}=plan.items.find(item=>item.feature.model==='santo-domingo-corregidora');
  const angle=Number(feature.bearing)||0,cos=Math.cos(angle),sin=Math.sin(angle);
  const outline=plan.profile.holes[0].slice(0,-1).map(point=>{
   const x=point.x-feature.x,z=point.z-feature.z;
   return new T.Vector2(x*cos+z*sin,x*sin-z*cos);
  });
  const inner=outline.map(point=>point.clone().multiplyScalar(.89));
  const rim=new T.Shape(outline);
  rim.holes.push(new T.Path(inner));
  geos['corregidora-basin-wall']=new T.ExtrudeGeometry(rim,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  geos['corregidora-basin-water']=new T.ShapeGeometry(new T.Shape(inner.map(point=>point.clone().multiplyScalar(1.004)))).rotateX(-Math.PI/2);
 }
 if(parts.some(part=>part.kind==='cebu-fort-walls')){
  // Outer and courtyard rings from OSM relation 4674040, relative to the mapped bounds midpoint.
  const outer=[[25.26,-32.90],[37.02,37.60],[44.07,35.84],[48.77,48.18],[54.05,65.22],[24.68,56.41],[27.03,47],[-28.79,34.67],[-30.55,39.37],[-52.88,35.84],[-54.05,34.67],[-53.47,33.49],[-34.67,14.69],[-31.14,18.21],[4.70,-26.44],[.59,-29.97],[23.50,-63.46],[25.26,-65.22],[27.62,-64.04],[28.20,-62.28],[29.97,-33.49]];
  const courtyard=[[22.91,-26.44],[14.69,-25.85],[-3.53,-4.11],[-1.18,-1.76],[-1.76,-1.18],[1.18,1.18],[.59,2.35],[2.35,3.53],[-9.99,17.63],[-17.04,11.75],[-19.39,14.69],[-10.58,19.39],[-16.45,29.97],[-27.03,23.50],[-31.73,29.38],[34.08,44.65]];
  const shape=new T.Shape(outer.map(([x,z])=>new T.Vector2(x,-z)));
  shape.holes.push(new T.Path(courtyard.map(([x,z])=>new T.Vector2(x,-z))));
  geos['cebu-fort-walls']=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
 }
 if(parts.some(part=>part.kind==='tijuana-arch-tube')){
  const half=[[-15.62,.40],[-15.48,13.5],[-14.74,25],[-13.20,37],[-10.6,48],[-6.1,55.8],[-3.15,58.44]];
  const contour=[...half,[0,59.23],...half.slice().reverse().map(([x,y])=>[-x,y])];
  geos['tijuana-arch-tube']=new T.TubeGeometry(new T.CatmullRomCurve3(contour.map(([x,y])=>new T.Vector3(x,y,0))),48,.77,10,false);
 }
 if(parts.some(part=>part.kind==='triangular-obelisk'))geos['triangular-obelisk']=new T.CylinderGeometry(.14,1,1,3).rotateY(Math.PI);
 if(parts.some(part=>part.kind==='fountain-crown'))geos['fountain-crown']=new T.CylinderGeometry(1,.53,1,12);
 if(parts.some(part=>part.kind==='tapered-column'))geos['tapered-column']=new T.CylinderGeometry(.56,1,1,16);
 if(parts.some(part=>part.kind==='obelisk-shaft'))geos['obelisk-shaft']=new T.CylinderGeometry(.62*Math.SQRT1_2,Math.SQRT1_2,1,4).rotateY(Math.PI/4);
 if(parts.some(part=>part.kind==='obelisk-cap'))geos['obelisk-cap']=new T.ConeGeometry(Math.SQRT1_2,1,4).rotateY(Math.PI/4);
 if(parts.some(part=>part.kind==='monas-base'))geos['monas-base']=new T.CylinderGeometry(1,.76,1,4).rotateY(Math.PI/4);
 if(parts.some(part=>part.kind==='trogir-clock-dome')){
  const profile=[[2.06,0],[1.95,.29],[1.70,.67],[1.34,1.10],[.92,1.58],[.50,1.96],[.15,2.23],[0,2.27]];
  geos['trogir-clock-dome']=new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r,y)),16).scale(1,1,.80);
 }
 if(parts.some(part=>part.kind==='park-arch')){
  const opening=new T.Shape();
  opening.moveTo(-.5,0);opening.lineTo(-.38,0);opening.lineTo(-.38,.62);
  opening.quadraticCurveTo(-.38,.77,-.20,.82);
  opening.quadraticCurveTo(-.09,.84,0,.91);
  opening.quadraticCurveTo(.09,.84,.20,.82);
  opening.quadraticCurveTo(.38,.77,.38,.62);
  opening.lineTo(.38,0);opening.lineTo(.5,0);opening.lineTo(.5,1);opening.lineTo(-.5,1);opening.closePath();
  geos['park-arch']=new T.ExtrudeGeometry(opening,{depth:1,bevelEnabled:false,curveSegments:4}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='jicin-well-arch')){
  const face=new T.Shape();
  face.moveTo(-.5,0);face.lineTo(-.5,1);face.lineTo(.5,1);face.lineTo(.5,0);
  face.lineTo(.28,0);face.lineTo(.28,.49);
  for(let step=1;step<=16;step++){
   const angle=Math.PI*step/16;
   face.lineTo(Math.cos(angle)*.28,.49+Math.sin(angle)*.28);
  }
  face.lineTo(-.28,0);face.closePath();
  geos['jicin-well-arch']=new T.ExtrudeGeometry(face,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
  const roof=[[1,0],[.98,.15],[.94,.40],[.83,.63],[.65,.80],[.38,.93],[0,1]];
  geos['jicin-well-roof']=new T.LatheGeometry(roof.map(([radius,y])=>new T.Vector2(radius,y)),20);
  geos['jicin-well-portico']=new T.CylinderGeometry(1,1,1,16,1,false,0,Math.PI);
  geos['jicin-well-wing-roof']=new T.CylinderGeometry(.20,1,1,16,1,false,0,Math.PI);
 }
 if(parts.some(part=>part.kind==='triumphal-arch')){
  const outline=new T.Shape();
  outline.moveTo(-.5,0);outline.lineTo(-.5,1);outline.lineTo(.5,1);outline.lineTo(.5,0);
  outline.lineTo(.206,0);outline.lineTo(.206,.50);
  for(let step=1;step<=18;step++){
   const a=step*Math.PI/18;
   outline.lineTo(Math.cos(a)*.206,.50+Math.sin(a)*.177);
  }
  outline.lineTo(-.206,0);outline.closePath();
  geos['triumphal-arch']=new T.ExtrudeGeometry(outline,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='flag-star')){
  const outline=new T.Shape();
  for(let index=0;index<10;index++){
   const angle=Math.PI/2+index*Math.PI/5,radius=index%2?.382:1;
   const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius;
   if(index===0)outline.moveTo(x,y);else outline.lineTo(x,y);
  }
  outline.closePath();
  geos['flag-star']=new T.ExtrudeGeometry(outline,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='assisi-fountain-basin')){
  const basin=[[0,0],[3.47,0],[3.47,.13],[3.35,.17],[3.30,.67],[3.41,.71],
   [3.41,.87],[3.01,.87],[3.01,.43],[0,.43]];
  geos['assisi-fountain-basin']=new T.LatheGeometry(basin.map(([radius,y])=>new T.Vector2(radius,y)),9);
 }
 if(parts.some(part=>part.kind==='bratislava-basin')){
  const basin=[[0,0],[4.22,0],[4.22,.13],[4.06,.20],[4.02,.87],[4.17,.93],[4.17,1.08],[3.78,1.08],[3.78,.36],[0,.36]];
  const bowl=[[0,0],[.64,0],[1.10,.15],[1.44,.31],[1.44,.50],[1.27,.50],[1.22,.37],[0,.37]];
  geos['bratislava-basin']=new T.LatheGeometry(basin.map(([r,y])=>new T.Vector2(r,y)),28);
  geos['bratislava-upper-bowl']=new T.LatheGeometry(bowl.map(([r,y])=>new T.Vector2(r,y)),24);
  geos['bratislava-waterline']=new T.CircleGeometry(1,28).rotateX(-Math.PI/2);
 }
 if(parts.some(part=>part.kind==='kamppi-chapel-shell')){
  const section=[[0,0],[.62,0],[.61,.05],[.70,.20],[.83,.42],[.94,.68],[1,.89],[.99,1],[0,1]];
  geos['kamppi-chapel-shell']=new T.LatheGeometry(section.map(([radius,y])=>new T.Vector2(radius,y)),32);
  geos['kamppi-chapel-seam']=new T.TorusGeometry(1,.006,4,40).rotateX(Math.PI/2);
 }
 if(parts.some(part=>part.kind==='kasarmitori-perforated-figure')){
  const figure=new T.Shape();
  const contour=[[-.92,0],[-.87,.82],[-.61,1.9],[-.63,3.53],[-.99,3.38],[-1.23,3.76],[-1.18,4.60],
   [-.76,5.33],[-.44,5.63],[-.44,6.39],[-.12,6.92],[.25,7],[.61,6.60],[.61,6.09],[.37,5.67],
   [.71,5.38],[1.08,4.83],[1.14,4.23],[.88,3.82],[.64,3.87],[.54,2.49],[.65,.83],[.84,.23],[.80,0],
   [.30,0],[.13,.42],[.10,1.95],[-.10,2.17],[-.22,.89],[-.46,0]];
  figure.moveTo(...contour[0]);for(const point of contour.slice(1))figure.lineTo(...point);figure.closePath();
  for(const [x,y,radius] of [[.09,6.48,.14],[-.33,5.04,.15],[.22,5.21,.18],[.01,4.65,.19],[.47,4.61,.14],
   [-.38,4.31,.14],[.19,4.13,.15],[-.21,3.74,.17],[.24,3.43,.15],[-.20,3.18,.13],[-.41,2.46,.09],
   [.34,2.45,.10],[-.40,1.63,.09],[.34,1.60,.10],[-.56,.82,.09],[.44,.74,.08]]){
   const opening=new T.Path();opening.absarc(x,y,radius,0,Math.PI*2,true);figure.holes.push(opening);
  }
  geos['kasarmitori-perforated-figure']=new T.ExtrudeGeometry(figure,{depth:.32,bevelEnabled:false,curveSegments:7}).translate(0,0,-.16);
 }
 if(parts.some(part=>part.kind==='kansalaistori-pike')){
  const profile=new T.Shape();
  profile.moveTo(-.82,0);profile.lineTo(-.42,1.21);profile.quadraticCurveTo(-1.02,4.7,-.30,8.5);
  profile.quadraticCurveTo(-.24,10.9,.20,12.87);profile.lineTo(.54,12.72);profile.lineTo(.44,11.77);
  profile.lineTo(.79,12.18);profile.lineTo(1.03,11.79);profile.quadraticCurveTo(1.10,10.42,.54,8.1);
  profile.quadraticCurveTo(.46,4.05,.24,1.23);profile.lineTo(.71,0);profile.closePath();
  geos['kansalaistori-pike']=new T.ExtrudeGeometry(profile,{depth:.92,bevelEnabled:true,bevelSize:.09,bevelThickness:.08,bevelSegments:2}).translate(0,0,-.46);
 }
 if(parts.some(part=>part.kind==='oodi-spruce-wave')){
  const profile=new T.Shape();
  profile.moveTo(-.5,.18);profile.bezierCurveTo(-.31,.16,-.20,.75,-.04,.72);
  profile.bezierCurveTo(.17,.71,.30,.25,.5,.22);profile.lineTo(.5,.83);
  profile.bezierCurveTo(.22,.95,-.27,1,-.5,.83);profile.closePath();
  geos['oodi-spruce-wave']=new T.ExtrudeGeometry(profile,{depth:1,bevelEnabled:false,curveSegments:18}).rotateY(Math.PI/2).translate(-.5,0,0);
 }
 if(parts.some(part=>part.kind==='herterich-basin')){
  const basin=[[0,0],[3.85,0],[3.85,.18],[3.68,.25],[3.59,.99],[3.73,1.05],
   [3.73,1.23],[3.26,1.23],[3.26,.44],[0,.44]];
  geos['herterich-basin']=new T.LatheGeometry(basin.map(([radius,y])=>new T.Vector2(radius,y)),12);
 }
 if(parts.some(part=>part.kind==='octagonal-column'))geos['octagonal-column']=new T.CylinderGeometry(1,1,1,8);
 if(parts.some(part=>part.kind==='pimpri-pavilion-dome'))geos['pimpri-pavilion-dome']=new T.SphereGeometry(1,24,8,0,2*Math.PI,0,Math.PI/2);
 for(const [kind,model] of [['chennai-public-hall-footprint','chennai-victoria-public-hall'],['kanpur-king-edward-footprint','kanpur-king-edward-hall']]){
  if(!parts.some(part=>part.kind===kind))continue;
  const {feature}=plan.items.find(item=>item.feature.model===model);
  const ring=plan.profile.contextSurfaces.find(surface=>surface.source===feature.source).rings[0];
  const cos=Math.cos(feature.bearing),sin=Math.sin(feature.bearing);
  const footprint=new T.Shape(ring.map(({x,z})=>new T.Vector2(
   (x-feature.x)*cos+(z-feature.z)*sin,(x-feature.x)*sin-(z-feature.z)*cos)));
  geos[kind]=new T.ExtrudeGeometry(footprint,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
 }
 if(parts.some(part=>part.kind==='liverpool-playhouse-mass')){
  const {feature}=plan.items.find(item=>item.feature.model==='liverpool-playhouse');
  const cos=Math.cos(feature.bearing),sin=Math.sin(feature.bearing);
  const components=[
   ['liverpool-playhouse-mass',feature.source],
   ['liverpool-playhouse-foyer','https://www.openstreetmap.org/way/204483471'],
  ];
  for(const [kind,source] of components){
   const ring=plan.profile.contextSurfaces.find(surface=>surface.source===source).rings[0];
   const contour=new T.Shape(ring.map(({x,z})=>new T.Vector2(
    (x-feature.x)*cos+(z-feature.z)*sin,(x-feature.x)*sin-(z-feature.z)*cos)));
   geos[kind]=new T.ExtrudeGeometry(contour,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  }
 }
 if(parts.some(part=>part.kind==='mactan-obelisk-shaft')){
  geos['mactan-obelisk-shaft']=new T.CylinderGeometry(.30*Math.SQRT2,.50*Math.SQRT2,1,4,1,false,Math.PI/4);
 }
 const lucknowTank=plan.items.find(item=>item.feature.model==='lucknow-hussainabad-tank');
 if(lucknowTank){
  const {feature}=lucknowTank;
  const waterline=plan.profile.surfaces.find(surface=>surface.source===feature.source).rings[0];
  const local=ring=>ring.map(({x,z})=>new T.Vector2(x-feature.x,feature.z-z));
  for(const [i,rim] of feature.terraceRims.entries()){
   const shape=new T.Shape(local(rim));
   shape.holes.push(new T.Path(local(i===0?waterline:feature.terraceRims[i-1])));
   geos['lucknow-tank-terrace-'+i]=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  }
 }
 if(parts.some(part=>part.kind==='chongqing-hall-footprint')){
  const {feature}=plan.items.find(item=>item.feature.model==='chongqing-great-hall');
  const ring=plan.profile.contextSurfaces.find(surface=>surface.source===feature.source).rings[0];
  const cos=Math.cos(feature.bearing),sin=Math.sin(feature.bearing);
  const footprint=new T.Shape(ring.map(({x,z})=>new T.Vector2(
   (x-feature.x)*cos+(z-feature.z)*sin,(x-feature.x)*sin-(z-feature.z)*cos)));
  geos['chongqing-hall-footprint']=new T.ExtrudeGeometry(footprint,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  const roof=[[0,0],[.97,0],[1,.11],[.92,.055],[.78,.12],[.60,.25],[.41,.47],[.22,.76],[0,1]];
  geos['chongqing-eaves']=new T.LatheGeometry(roof.map(([radius,height])=>new T.Vector2(radius,height)),28);
 }
 if(parts.some(part=>part.kind==='milano-duomo-footprint')){
  const {feature}=plan.items.find(item=>item.feature.model==='milano-duomo');
  const ring=plan.profile.holes[0];
  const points=ring.map(({x,z})=>new T.Vector2(z-feature.z,x-feature.x));
  const footprint=new T.Shape(points);
  geos['milano-duomo-footprint']=new T.ExtrudeGeometry(footprint,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  const portal=new T.Shape();
  portal.moveTo(-.5,0);portal.lineTo(.5,0);portal.lineTo(.5,.65);
  portal.quadraticCurveTo(.39,.88,0,1);portal.quadraticCurveTo(-.39,.88,-.5,.65);portal.closePath();
  geos['milano-duomo-portal']=new T.ExtrudeGeometry(portal,{depth:.28,bevelEnabled:false,curveSegments:6});
 }
 if(parts.some(part=>part.kind==='taksim-mosque-footprint')){
  const {feature}=plan.items.find(item=>item.feature.model==='taksim-mosque');
  const ring=plan.profile.contextSurfaces.find(surface=>surface.source===feature.source).rings[0];
  const footprint=new T.Shape(ring.map(({x,z})=>new T.Vector2(feature.z-z,feature.x-x)));
  geos['taksim-mosque-footprint']=new T.ExtrudeGeometry(footprint,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  geos['taksim-mosque-dome']=new T.SphereGeometry(1,24,10,0,2*Math.PI,0,Math.PI/2);
 }
 if(parts.some(part=>part.kind==='campanin-church-outline')){
  const {feature}=plan.items.find(item=>item.feature.model==='fontvieille-saint-nicolas');
  const ring=plan.profile.contextSurfaces.find(surface=>surface.source===feature.source).rings[0];
  const cos=Math.cos(feature.bearing),sin=Math.sin(feature.bearing),shape=new T.Shape();
  for(const [index,point] of ring.entries()){
   const x=point.x-feature.x,z=point.z-feature.z;
   const localX=x*cos+z*sin,localY=x*sin-z*cos;
   if(index===0)shape.moveTo(localX,localY);
   else shape.lineTo(localX,localY);
  }
  shape.closePath();
  geos['campanin-church-outline']=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2).translate(0,-.5,0);
  const profile=[[1,0],[.98,.17],[.91,.40],[.79,.62],[.61,.81],[.37,.94],[0,1]];
  geos['campanin-dome']=new T.LatheGeometry(profile.map(([radius,height])=>new T.Vector2(radius,height)),24);
 }
 if(parts.some(part=>part.kind==='mumbai-flora-basin')){
  const section=[[5.72,.18],[6.17,.18],[6.17,.44],[6.07,.54],[5.73,.54],[5.62,.44],[5.66,.18],[5.72,.18]];
  geos['mumbai-flora-basin']=new T.LatheGeometry(section.map(([radius,y])=>new T.Vector2(radius,y)),48);
  const bowl=[[.20,0],[.39,.17],[.70,.38],[.74,.48],[.62,.50],[.53,.40],[.35,.25],[.20,.21],[.20,0]];
  geos['mumbai-flora-bowl']=new T.LatheGeometry(bowl.map(([radius,y])=>new T.Vector2(radius,y)),5).rotateY(Math.PI/5);
 }
 if(parts.some(part=>part.kind==='king-manor-gambrel')){
  const section=new T.Shape();
  section.moveTo(-.5,0);section.lineTo(-.30,.69);section.lineTo(0,1);
  section.lineTo(.30,.69);section.lineTo(.5,0);section.closePath();
  geos['king-manor-gambrel']=new T.ExtrudeGeometry(section,{depth:1,bevelEnabled:false}).translate(0,0,-.5).rotateY(Math.PI/2);
 }
 if(parts.some(part=>part.kind==='lagos-wing')){
  const feather=new T.Shape();
  feather.moveTo(0,0);
  feather.quadraticCurveTo(-.08,.60,.61,1);
  feather.quadraticCurveTo(.48,.80,.39,.70);
  for(const [x,y] of [[.49,.71],[.34,.56],[.42,.55],[.25,.42],[.32,.40],[.14,.30]]){
   feather.lineTo(x,y);
  }
  feather.quadraticCurveTo(.12,.16,0,0);feather.closePath();
  geos['lagos-wing']=new T.ExtrudeGeometry(feather,{depth:1,bevelEnabled:false,curveSegments:8}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='hip-roof')){
  const roof=new T.BufferGeometry();
  roof.setAttribute('position',new T.Float32BufferAttribute([-.5,0,-.5,.5,0,-.5,.5,0,.5,-.5,0,.5,-.32,1,0,.32,1,0],3));
  roof.setIndex([0,4,5,0,5,1,1,5,2,2,5,4,2,4,3,3,4,0]);
  geos['hip-roof']=roof.toNonIndexed();geos['hip-roof'].computeVertexNormals();
 }
 if(parts.some(part=>part.kind==='bengaluru-watchtower-roof'))geos['bengaluru-watchtower-roof']=new T.CylinderGeometry(.039,1,1,8).rotateY(Math.PI/8);
 if(parts.some(part=>part.kind==='picasso-front-plane')){
  const plates={
   'picasso-front-plane':[[-.39,0],[-.41,.19],[-.20,.54],[-.24,.72],[-.44,.86],[-.42,.97],[-.21,1],[.07,.95],[.14,.82],[.27,.78],[.29,.66],[.43,.63],[.38,.56],[.17,.54],[.10,.43],[.22,.21],[.41,0],[.10,0],[-.10,.27],[-.25,0]],
   'picasso-side-plane':[[-.43,0],[-.45,.17],[-.24,.46],[-.19,.70],[-.44,.86],[-.39,.99],[-.12,.96],[.13,.88],[.34,.79],[.41,.69],[.26,.62],[.00,.70],[.02,.47],[.22,.23],[.42,0],[.14,0],[-.07,.20],[-.20,0]],
  };
  for(const [kind,points] of Object.entries(plates)){
   const polygon=new T.Shape(points.map(([x,y])=>new T.Vector2(x,y)));
   geos[kind]=new T.ExtrudeGeometry(polygon,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
  }
 }
 if(parts.some(part=>part.kind==='karachi-mausoleum-body')){
  geos['karachi-mausoleum-body']=new T.CylinderGeometry(.456*Math.SQRT2,.5*Math.SQRT2,1,4,1,false,Math.PI/4);
  geos['karachi-mausoleum-dome']=new T.SphereGeometry(1,24,12,0,2*Math.PI,0,Math.PI/2);
  const portal=new T.Shape();
  portal.moveTo(-.5,-.5);portal.lineTo(-.5,-.12);
  portal.quadraticCurveTo(-.51,.235,0,.5);
  portal.quadraticCurveTo(.51,.235,.5,-.12);
  portal.lineTo(.5,-.5);portal.closePath();
  geos['karachi-mausoleum-portal']=new T.ExtrudeGeometry(portal,{depth:1,bevelEnabled:false,curveSegments:8}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='homigot-tower')){
  geos['homigot-octagon']=new T.CylinderGeometry(1,1,1,8,1,false,Math.PI/8);
  const taper=[[0,.24],[3.92,.24],[3.86,1.4],[3.52,3.6],[3.21,7],[3.01,11],[2.88,15],[2.78,18],[2.73,20.3],[0,20.3]];
  geos['homigot-tower']=new T.LatheGeometry(taper.map(([r,y])=>new T.Vector2(r,y)),8,Math.PI/8);
 }
 if(parts.some(part=>part.kind==='tianjin-clock-disc'))geos['tianjin-clock-disc']=new T.CylinderGeometry(1,1,1,40);
 if(parts.some(part=>part.kind==='vertical-torus'))geos['vertical-torus']=new T.TorusGeometry(1,.024,6,48);
 if(parts.some(part=>part.kind==='suzhou-orient-portal')){
  const contour=new T.Shape();
  contour.moveTo(-89,0);contour.lineTo(-88,143);
  contour.bezierCurveTo(-88,212,-83,259,-67,278);
  contour.bezierCurveTo(-53,291,53,291,67,278);
  contour.bezierCurveTo(83,259,88,212,88,143);
  contour.lineTo(89,0);contour.lineTo(34,0);contour.lineTo(27,158);
  contour.bezierCurveTo(26,221,-26,221,-27,158);
  contour.lineTo(-34,0);contour.closePath();
  geos['suzhou-orient-portal']=new T.ExtrudeGeometry(contour,{depth:1,bevelEnabled:false,curveSegments:12}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='dragon-granite-basin')){
  const lathe=section=>new T.LatheGeometry(section.map(([radius,height])=>new T.Vector2(radius,height)),48);
  geos['dragon-granite-basin']=lathe([[6.31,0],[7,0],[7,.25],[6.88,.55],[6.69,.62],[6.48,.54],[6.40,.19],[6.31,0]]);
  geos['dragon-bronze-bowl']=lathe([[1.01,0],[1.37,.13],[2.28,.53],[3.05,1.06],[3.20,1.17],[3.08,1.27],[2.89,1.12],[2.68,.91],[1.10,.20],[1.01,0]]);
  const wing=new T.Shape([new T.Vector2(-.18,0),new T.Vector2(.22,.92),new T.Vector2(.69,.59),new T.Vector2(.37,.42),new T.Vector2(.58,.23),new T.Vector2(.04,-.04)]);
  geos['dragon-wing']=new T.ExtrudeGeometry(wing,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='azadi-west-arch')){
  const arch=new T.Shape();
  arch.moveTo(-35,0);arch.bezierCurveTo(-20,18,-12,29,-11,42);
  arch.lineTo(11,42);arch.bezierCurveTo(12,29,20,18,35,0);
  arch.lineTo(26,0);arch.bezierCurveTo(16,10,13,20,0,28.7);
  arch.bezierCurveTo(-13,20,-16,10,-26,0);arch.closePath();
  for(const [side,kind] of [[-1,'azadi-west-arch'],[1,'azadi-east-arch']]){
   const geometry=new T.ExtrudeGeometry(arch,{depth:1,bevelEnabled:false,curveSegments:18});
   const points=geometry.attributes.position;
   for(let i=0;i<points.count;i++){
    const rise=points.getY(i)/42;
    points.setZ(i,side*(16.1-7.6*rise)+(points.getZ(i)-.5)*(9.8-3.6*rise));
   }
   geometry.computeVertexNormals();geos[kind]=geometry;
  }
 }
 if(parts.some(part=>part.kind==='tunis-clock-pyramid')){
  geos['tunis-clock-pyramid']=new T.CylinderGeometry(0,Math.SQRT2/2,1,4,1,false,Math.PI/4);
 }
 if(parts.some(part=>part.kind==='gdansk-lower-basin')){
  const lathe=section=>new T.LatheGeometry(section.map(([r,y])=>new T.Vector2(r,y)),40);
  geos['gdansk-lower-basin']=lathe([[2.40,0],[2.67,0],[2.70,.15],[2.67,.37],[2.53,.42],[2.40,.35],[2.39,.11],[2.40,0]]);
  geos['gdansk-upper-bowl']=lathe([[.43,0],[.62,.10],[1.35,.30],[1.51,.42],[1.52,.53],[1.36,.54],[1.27,.40],[.52,.12],[.43,0]]);
 }
 if(parts.some(part=>part.kind==='rabat-ogive-gate')){
  const doorway=new T.Shape();
  doorway.moveTo(-5.7,0);doorway.lineTo(-1.59,0);doorway.lineTo(-1.59,1.55);
  doorway.bezierCurveTo(-2.43,2.63,-1.39,3.13,0,3.69);
  doorway.bezierCurveTo(1.39,3.13,2.43,2.63,1.59,1.55);
  doorway.lineTo(1.59,0);doorway.lineTo(5.7,0);doorway.lineTo(5.7,9.4);doorway.lineTo(-5.7,9.4);doorway.closePath();
  geos['rabat-ogive-gate']=new T.ExtrudeGeometry(doorway,{depth:1,curveSegments:14,bevelEnabled:false}).translate(0,0,-.5);
  const edge=[[-.5,-.5],[.5,-.5],[.5,.32],[.29,.5],[-.29,.5],[-.5,.32]]
   .map(([x,z])=>new T.Vector2(x,-z));
  geos['rabat-chamfered-tower']=new T.ExtrudeGeometry(new T.Shape(edge),{depth:1,bevelEnabled:false}).rotateX(-Math.PI/2);
 }
 if(parts.some(part=>part.kind==='masonry-arch')){
  const arch=new T.Shape();
  arch.moveTo(-.5,-.5);
  arch.lineTo(-.32,-.5);
  arch.bezierCurveTo(-.32,-.13,-.177,.16,0,.16);
  arch.bezierCurveTo(.177,.16,.32,-.13,.32,-.5);
  arch.lineTo(.5,-.5);
  arch.lineTo(.5,.5);
  arch.lineTo(-.5,.5);
  arch.closePath();
  geos['masonry-arch']=new T.ExtrudeGeometry(arch,{depth:1,bevelEnabled:false,curveSegments:8});
  geos['masonry-arch'].translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='barcelona-arched-door')){
  const door=new T.Shape();
  door.moveTo(-.5,-.5);door.lineTo(-.5,.02);
  door.bezierCurveTo(-.5,.285,-.276,.5,0,.5);
  door.bezierCurveTo(.276,.5,.5,.285,.5,.02);
  door.lineTo(.5,-.5);door.closePath();
  geos['barcelona-arched-door']=new T.ExtrudeGeometry(door,{depth:1,bevelEnabled:false,curveSegments:8}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='ordino-slate-roof')){
  const roof=new T.BufferGeometry();
  roof.setAttribute('position',new T.Float32BufferAttribute([-.5,0,-.5,.5,0,-.5,.5,0,.5,-.5,0,.5,0,1,0],3));
  roof.setIndex([0,4,1,1,4,2,2,4,3,3,4,0]);
  geos['ordino-slate-roof']=roof.toNonIndexed();
  geos['ordino-slate-roof'].computeVertexNormals();
 }
 if(parts.some(part=>part.kind==='veer-soudha-hip'))geos['veer-soudha-hip']=new T.CylinderGeometry(.24,1,1,4,1,false,Math.PI/4);
 if(parts.some(part=>part.kind==='bandstand-roof')){
  const roof=[[0,0],[.95,0],[1,.08],[.82,.24],[.56,.54],[.28,.83],[0,1]];
  geos['bandstand-roof']=new T.LatheGeometry(roof.map(([radius,y])=>new T.Vector2(radius,y)),8);
  geos['bandstand-deck']=new T.CylinderGeometry(1,1,1,8);
 }
 if(parts.some(part=>part.kind==='cistern-stonework')){
  const profile=[[0,0],[2.25,0],[2.25,.14],[1.98,.14],[1.98,.28],[1.70,.28],[1.70,.44],
   [1.48,.44],[1.48,.54],[1.25,.57],[1.25,1.46],[1.43,1.48],[1.43,1.65],[1.01,1.65],[1.01,.58],[0,.58]];
  geos['cistern-stonework']=new T.LatheGeometry(profile.map(([radius,y])=>new T.Vector2(radius,y)),8);
 }
 if(parts.some(part=>part.kind==='azumaya-eaves')){
  const tiles=[[0,0],[.72,0],[1,.12],[.79,.23],[.57,.52],[.23,.84],[0,1]];
  geos['azumaya-eaves']=new T.LatheGeometry(tiles.map(([radius,y])=>new T.Vector2(radius,y)),6);
 }
 if(parts.some(part=>part.kind==='paifang-span')){
  const outline=new T.Shape();
  outline.moveTo(-.5,0);outline.lineTo(-.5,1);outline.lineTo(.5,1);outline.lineTo(.5,0);
  for(let step=1;step<=18;step++){
   const angle=Math.PI*step/18;
   outline.lineTo(.5*Math.cos(angle),.76*Math.sin(angle));
  }
  outline.closePath();
  geos['paifang-span']=new T.ExtrudeGeometry(outline,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 if(parts.some(part=>part.kind==='paifang-roof')){
  const rows=[[-.5,0,.50],[-.32,.28,.45],[0,1,.27],[.32,.28,.45],[.5,0,.50]];
  const vertices=[],indices=[],columns=11;
  for(const [z,y,width] of rows)for(let i=0;i<columns;i++){
   const u=2*i/(columns-1)-1;
   vertices.push(u*width,y+(1-y)*.17*Math.abs(u)**6,z);
  }
  const lower=rows.length*columns;
  for(let i=0;i<lower;i++)vertices.push(vertices[3*i],0,vertices[3*i+2]);
  for(let row=0;row<rows.length-1;row++)for(let column=0;column<columns-1;column++){
   const a=row*columns+column,b=a+columns;
   indices.push(a,b,a+1,a+1,b,b+1);
   indices.push(a+lower,a+1+lower,b+lower,a+1+lower,b+1+lower,b+lower);
  }
  // Close the hips and the raised eave tips to give the tiles a visible underside.
  const edge=(a,b)=>indices.push(a,b,a+lower,b,b+lower,a+lower);
  for(let row=0;row<rows.length-1;row++){
   const left=row*columns,right=left+columns-1;
   edge(left+columns,left);
   edge(right,right+columns);
  }
  for(let column=0;column<columns-1;column++){
   edge(column,column+1);
   const rear=(rows.length-1)*columns+column;
   edge(rear+1,rear);
  }
  const roof=new T.BufferGeometry();
  roof.setAttribute('position',new T.Float32BufferAttribute(vertices,3));
  roof.setIndex(indices);roof.computeVertexNormals();
  geos['paifang-roof']=roof;
 }
 if(parts.some(part=>part.kind==='pediment')){
  const shape=new T.Shape();shape.moveTo(-.5,-.5);shape.lineTo(.5,-.5);shape.lineTo(0,.5);shape.closePath();
  geos.pediment=new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false}).translate(0,0,-.5);
 }
 // A thin folded cloth sheet replaces the former ellipsoid that looked like a shield.
 const cloth=geos.cape.attributes.position;for(let i=0;i<cloth.count;i++){const u=cloth.getX(i),v=cloth.getY(i),drop=.5-v;cloth.setXYZ(i,u*(.48+drop*.60)+drop*drop*.24,v,Math.sin(u*22+drop*2)*(.025+drop*.045)-drop*drop*.55);}geos.cape.computeVertexNormals();
 geos.pyramid.rotateY(Math.PI/4);geos.torus.rotateX(Math.PI/2);
 if(parts.some(part=>part.kind==='cliff')){
  // One closed stone volume with flat carving faces and uneven ledges above and below.
  const profiles=[[-.5,.49,.49,.12,0,0],[-.40,.50,.50,.13,0,0],[-.30,.47,.47,.14,0,0],[-.14,.44,.44,.14,0,0],[.16,.44,.44,.14,0,0],[.27,.43,.40,.14,.01,.012],[.38,.37,.37,.12,.015,.005],[.5,.32,.33,.10,.012,.009]];
  const vertices=[],indices=[],sides=12;
  for(const [y,x,z,edge,ox,oz] of profiles){
   const ring=[[x,-z+edge],[x,-z*.17],[x,z-edge],[x-edge,z],[x*.14,z],[-x+edge,z],[-x,z-edge],[-x,z*.17],[-x,-z+edge],[-x+edge,-z],[-x*.12,-z],[x-edge,-z]];
   for(const [px,pz] of ring)vertices.push(px+ox,y,pz+oz);
  }
  for(let row=0;row<profiles.length-1;row++)for(let i=0;i<sides;i++){
   const a=row*sides+i,b=row*sides+(i+1)%sides,c=a+sides,d=b+sides;
   indices.push(a,c,b,b,c,d);
  }
  const bottom=vertices.length/3,top=bottom+1,last=(profiles.length-1)*sides;
  vertices.push(0,profiles[0][0],0,profiles.at(-1)[4],profiles.at(-1)[0],profiles.at(-1)[5]);
  for(let i=0;i<sides;i++){
   const next=(i+1)%sides;
   indices.push(bottom,i,next,top,last+next,last+i);
  }
  const indexed=new T.BufferGeometry();indexed.setAttribute('position',new T.Float32BufferAttribute(vertices,3));indexed.setIndex(indices);
  geos.cliff=indexed.toNonIndexed();indexed.dispose();geos.cliff.computeVertexNormals();
 }
 const batches=new Map(),dummy=new T.Object3D(),yaw=new T.Quaternion();
 for(const part of parts){const key=part.kind+':'+part.material;if(!batches.has(key))batches.set(key,{kind:part.kind,material:part.material,parts:[]});batches.get(key).parts.push(part);}
 const usedGeometries=new Set([...batches.values()].map(batch=>batch.kind));for(const [kind,geometry]of Object.entries(geos))if(!usedGeometries.has(kind))geometry.dispose();
 // Source polygons are already rendered. Seat each model on the actual solid surface instead of a universal height.
 const surfaces=group.children.filter(mesh=>mesh.userData.citySquare&&mesh.userData.citySquare.name===plan.profile?.name&&mesh.material?.color?.getHex()!==0x319bb5);
 for(const surface of surfaces)surface.updateWorldMatrix(true,false);
 const down=new T.Vector3(0,-1,0),origin=new T.Vector3(),probe=new T.Raycaster(),partBounds=new T.Box3(),itemBase=new Map();
 for(const {item,first,end} of localModels){
  let lowest=Infinity;
  for(let i=first;i<end;i++){
   const part=parts[i],geometry=geos[part.kind];
   if(!geometry.boundingBox)geometry.computeBoundingBox();
   dummy.position.set(part.x,part.y,part.z);dummy.quaternion.identity();
   if(part.rotation)dummy.quaternion.copy(part.rotation);
   dummy.scale.set(part.sx,part.sy,part.sz);dummy.updateMatrix();
   lowest=Math.min(lowest,partBounds.copy(geometry.boundingBox).applyMatrix4(dummy.matrix).min.y);
  }
  if(!Number.isFinite(lowest))continue;
  origin.set(b.x+item.x,8,b.z+item.z);probe.set(origin,down);
  let ground=probe.intersectObjects(surfaces,false)[0]?.point.y??.33;
  if(item.feature.model==='birmingham-guardian'){
   // The existing mapped platform can meet both the paving and a raised bed.
   // Keep the sculpture above both and extend only the bottom of its plinth.
   const plinth=parts[first],ca=Math.cos(item.angle),sa=Math.sin(item.angle);
   let low=ground;
   for(const x of [-plinth.sx*.49,0,plinth.sx*.49])for(const z of [-plinth.sz*.49,0,plinth.sz*.49]){
    origin.set(b.x+item.x+(x*ca-z*sa)*item.scale,8,b.z+item.z+(x*sa+z*ca)*item.scale);
    probe.set(origin,down);
    const support=probe.intersectObjects(surfaces,false)[0]?.point.y??.33;
    ground=Math.max(ground,support);low=Math.min(low,support);
   }
   const drop=(ground-low)/item.scale;
   plinth.y-=drop/2;plinth.sy+=drop;
  }
  itemBase.set(item,ground-lowest*item.scale);
 }
 for(const batch of batches.values()){
  const waterMaterial=batch.material==='water',patina=batch.material==='patina';
  const material=new T.MeshStandardMaterial({side:batch.kind==='cape'?T.DoubleSide:T.FrontSide,vertexColors:batch.kind==='gaborone-thatch',color:0xffffff,roughness:waterMaterial?.18:patina?.58:batch.material==='metal'?.43:.83,metalness:waterMaterial?.18:patina?.24:batch.material==='metal'?.58:.02});
  const mesh=new T.InstancedMesh(geos[batch.kind],material,batch.parts.length),tint=new T.Color();
  batch.parts.forEach((p,i)=>{const item=p.owner,ca=Math.cos(item.angle),sa=Math.sin(item.angle);dummy.position.set(b.x+item.x+(p.x*ca-p.z*sa)*item.scale,itemBase.get(item)+p.y*item.scale,b.z+item.z+(p.x*sa+p.z*ca)*item.scale);yaw.setFromAxisAngle(UP,-item.angle);dummy.quaternion.copy(yaw);if(p.rotation)dummy.quaternion.multiply(p.rotation);dummy.scale.set(p.sx*item.scale,p.sy*item.scale,p.sz*item.scale);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,tint.setHex(p.color));});
  mesh.computeBoundingSphere();mesh.castShadow=!waterMaterial;mesh.receiveShadow=true;mesh.userData.squareLandmark=true;mesh.userData.sculpturePart=batch.kind;mesh.userData.squareModels=[...new Set(batch.parts.map(p=>p.owner.feature.model))];mesh.userData.squareFeatureIDs=batch.parts.map(p=>p.owner.feature.id);group.add(mesh);
 }
}
window.SquareDetails={enrich,prepare,render,classify,modelSpecs:MODEL_SPECS};
})();
