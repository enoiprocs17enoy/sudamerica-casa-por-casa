# Sudamérica Casa por Casa — v9.2.2

Schermata di caricamento per l’avvio, l’ingresso nel 3D, i cambi di città, i cataloghi geografici e gli aggiornamenti della scena. Mostra il luogo e il tipo di preparazione con un indicatore animato, senza percentuali simulate.

Le operazioni pesanti attendono che la schermata sia stata disegnata. Il pannello rimane visibile fino al completamento del lavoro e al rendering successivo; più operazioni consecutive condividono la stessa attesa. I comandi vengono temporaneamente protetti e ripristinati anche in caso di errore. Supportate preferenze di movimento ridotto e schermi piccoli.

I file caricati dalla pagina sono nella cartella releases/9.2.2. Le copie alla radice sono i sorgenti di lavoro. Per avviare il progetto serve un server HTTP e Internet per Leaflet e Three.js.

---

# Sudamérica Casa por Casa — v9.2.1

Vegetazione continua verso l’orizzonte: alberi 3D vicini e gruppi leggeri in lontananza, con sovrapposizione progressiva e disposizione ancorata alle coordinate geografiche. Il dominio di 52 km termina dentro la nebbia atmosferica: non è un mondo infinito.

I biomi hanno transizioni graduali di terreno e densità vegetale. Le strade regionali condividono il grafo della mappa: niente anelli inventati sulle isole. Tutte le località nel raggio regionale di 46 km hanno anteprime 3D alle coordinate relative reali, anche se non appartengono al ramo stradale della città caricata; avvicinandosi si carica la città completa, mantenendo orientamento e posizione geografica della visuale. Il pulsante Città vicine consente di raggiungerle. I nomi sono etichette nitide a schermo, con controllo delle sovrapposizioni e delle montagne interposte. Gli edifici delle anteprime sono raccolti in due gruppi condivisi per mantenere la fluidità. Il catalogo regionale carica anche i paesi confinanti quando necessari.

Le anteprime sono rappresentazioni leggere della località, non repliche degli edifici reali. Coste e substrati restano approssimazioni regionali: vedere GEOGRAPHY_SOURCES.md. Piazze, evoluzioni, negozi e servizi delle versioni precedenti sono conservati.

Aprire tramite server HTTP; Leaflet e Three.js richiedono Internet.

---

Sudamérica Casa por Casa — v7.0.0

Nuovo pacchetto di direzione artistica 3D. Aggiunti realmente a Three.js: facciate di torri su quattro lati con cornici e balconi, parapetti e giardini sui tetti; camini, lucernari e fioriere sulle case; un sistema di arredo urbano istanziato con alberi multilivello, alberi in fiore, lampioni, panchine e aiuole. Conservate le funzioni di simulazione. Non è una replica esatta della concept art.

# Sudamérica Casa por Casa v6.0.7 — revisione geografica prudente

La versione 6.0.5 aveva aggiunto 456 città con coordinate **sintetiche**; nella v6.0.6 erano state semplicemente spostate verso terra. Questo non equivale a geocodifica.

- **Bertioga**: coordinate corrette nella sua zona geografica reale (-23.85, -46.14), leggermente all'interno della costa per evitare il mare nella geometria locale.
- I 228 centri iniziali sono conservati, con un controllo automatico rispetto alla sagoma del continente.
- Le città aggiunte con coordinate sintetiche rimangono nel catalogo dati ma **non vengono mostrate sulla mappa né offerte come selezionabili** finché non sono verificate con un gazetteer affidabile.
- Le città verificate continuano ad apparire progressivamente in base a zoom, abitanti e punti.
- 5 milioni di abitanti virtuali nel catalogo, con la simulazione 3D invariata.

Questa versione privilegia l'accuratezza dei punti mostrati rispetto al numero di marcatori. Non affermiamo di aver geocodificato tutte le 684 città. È necessaria una fonte geografica attendibile per ripristinare le località nascoste.


v6.0.8: giardino a zone prenotate. Cespugli Gratis preservati in Premium e con piscina; piscina centrata dietro casa; barbecue presso il muro posteriore; fiori nella fascia anteriore tra cespugli e recinzione.


v6.0.9: fiori ancorati alla recinzione anteriore e prenotati prima dei cespugli, che vengono collocati più indietro e verso l'interno. Posizioni stabili anche al cambio di livello; fallback per cespugli nelle ville. Barbecue avvicinato al muro posteriore della casa (con spazio di sicurezza).


v6.1.0: lotti ampliati fino quasi al marciapiede. Margine stradale protetto, recinzioni avvicinate al bordo, ingresso e cassetta postale riallineati. Nessuna modifica alle strade o al catalogo città.


v6.1.1: lotto esteso sino a 0,10 m dal bordo del marciapiede (senza invaderlo); recinzione avvicinata al limite del lotto; griglia posteriore avvicinata a circa 23 cm dalla parete, rispettando il controllo anti-sovrapposizione.


v6.1.2: barbecue Premium delle case basse a 4-5 cm dal muro posteriore, con prenotazione prima della piscina e posizioni alternative; terreno a circa 5.5 cm dal bordo del marciapiede nel caso di strade larghe; recinzioni al nuovo limite interno, rispettando il marciapiede.


v6.1.4: lampioncini a 35 punti con coordinate fisse rispetto alla recinzione anteriore, identiche per tutte le evoluzioni; prenotazione prioritaria per evitare sovrapposizioni; rimossa la scultura Premium (sfera azzurra su piedistallo) che compariva a 35 punti.
\n\nv6.2.0: vero primo aggiornamento geometrico delle case e ville: cornici delle finestre, traversini, fasce di facciata, gronde, colmi dei tetti, portale d'ingresso, maniglia, applique e pilastri premium. Oggetti istanziati per prestazioni. Mantiene disposizione, colori, lampioncini, recinzioni e progressioni precedenti. Questa fase riguarda case/ville; non equivale ancora a un rendering fotorealistico.\n

v6.2.1: colori architettonici coordinati alla scelta utente. Colonne/pilastri, capitelli, cornici, fasce di facciata, gronde, zoccoli e davanzali derivano ora dal colore delle pareti con toni complementari più chiari o scuri. Mantiene geometria e funzioni precedenti.


v6.2.2: nuova fase del rifacimento grafico. Persiane abbinate al tetto scelto, listelli, traversini e ombreggiature delle finestre, dettagli sulle finestre laterali e texture procedurale del prato. Tutti i nuovi elementi usano instancing; la scelta colori v6.2.1 resta attiva. Non è ancora fotorealismo e non cambia geometria dei terreni.


v6.2.3: finestre uniformate in tutte le evoluzioni e modalità. Un unico modulo completo (vetro, cornice, traversini, persiane, listelli, davanzale) sostituisce la vecchia variante parziale delle finestre ai piani alti. Le finestre Premium vengono collocate sulla facciata effettivamente esterna del padiglione, oppure sulla parete principale quando il padiglione non raggiunge quel piano. Migliorati anche orientamento delle cornici laterali e controllo dell'altezza sulle ali. Colori coordinati invariati.


v6.2.4: correzione delle finestre sulla facciata Premium. Il padiglione frontale era arretrato dietro la parete principale: spostato in avanti con vetri e cornici sulla vera facciata esterna. Aggiunte persiane, listelli e traversini anche alle finestre laterali e posteriori, con colori abbinati al tetto. Conservate tutte le personalizzazioni e decorazioni precedenti.


v6.2.5: riparazione della geometria Premium vista nelle schermate: rimosso il padiglione che attraversava la facciata e creava un tetto sovrapposto, eliminato il balcone sospeso con porta che copriva le finestre; parete frontale continua con finestre uguali in Gratis/Premium. Restano veranda, comignolo, abbaino e pilastri Premium. Rimosse le barre del colmo che non seguivano il profilo del tetto. Non modificati giardini, lampioncini o scelta colori.


v6.2.6 — Ulteriore evoluzione grafica delle case: texture tegole sfalsate con rilievo visivo (senza geometria aggiuntiva), pannelli della porta e soglia, riflessi discreti dei vetri anteriori e posteriori. Conserva la struttura Premium corretta v6.2.5, i colori coordinati, le finestre, le posizioni di recinzioni e lampioni.


v6.2.7: tetti delle prime tre evoluzioni con coordinate UV reali (la texture delle tegole prima non era visibile), 7 file di rilievi geometrici per falda, colmo e grondaie, colori derivati dal tetto scelto. Nessuna modifica alla struttura Premium o alle proprietà.


v6.2.8: rimosse le strisce 3D sporgenti dalle falde dei tetti. Restano tegole sfalsate tramite texture, con fughe meno marcate e grondaie sottili; conservate forme, colori e finestre.


v6.2.9: prima fase di miglioramento della vegetazione. Cespugli, siepi e arbusti con volumi stratificati, sfumature di fogliame e fiori più piccoli; alberi urbani con chiome meno geometriche e tonalità alternate. Le piante rimangono nelle aree già prenotate, senza cambiare posizioni o sblocchi. Mantiene il tetto senza strisce della v6.2.8, la personalizzazione colori e la struttura Premium corretta.


v6.3.0: recinzioni differenziate in legno (pali/listelli), ferro (sbarre), siepe (folta e verde), muretto (pietra con copertina); collocate entro i confini con controllo più preciso. Fiori delle sfere fiorite abbassati sul fogliame. Arbusto e tre chiome ora alberelli alti circa 4 metri, con tronco e chioma elevata, mentre sfera fiorita e siepe compatta mantengono le dimensioni precedenti. Geometrie instanziate, progressioni e colori delle case invariati.


v6.3.1: sfera fiorita con 18 fiori visibili in due corone, sulla superficie esterna della chioma; arbusto e tre chiome con fogliame fitto fino in basso, chiome sovrapposte e tronco meno esposto. Dimensioni e posizioni della sfera fiorita e della siepe compatta invariate; mantenute le quattro recinzioni della v6.3.0.


v6.3.2: miglioramento visivo delle strade e marciapiedi: asfalto grigio più naturale, cemento caldo, cordoli 3D a doppia tonalità e giunti dei marciapiedi. Cordoli interrotti presso gli incroci per non attraversare le carreggiate. Conservate tutte le decorazioni, le recinzioni e le piante approvate nella v6.3.1. Non modificati gli edifici o la disposizione delle proprietà.


v6.3.3: cordoli rialzati e con contrasto più evidente, estremità calcolate usando la larghezza effettiva della strada trasversale e raccordi d'angolo agli incroci; giunture dei marciapiedi più larghe e scure. Conservati edifici, giardini, recinzioni e personalizzazioni.


v6.3.4: aggiunti attraversamenti pedonali a strisce agli incroci delle arterie principali, senza alterare carreggiate, cordoli, giunti o proprietà. Le strisce sono sopra l'asfalto, lontane dagli angoli dei marciapiedi. Si tratta di un miglioramento visivo, non di nuove meccaniche. Conservate le correzioni v6.3.3.


v6.3.5: attraversamenti pedonali su tutti gli incroci presenti e su ciascun accesso stradale realmente esistente. Corretto l'orientamento X/Z delle superfici agli incroci; strisce spostate appena fuori dall'area centrale, così non si incrociano e non creano griglie. Larghezza e numero di strisce adattati alle dimensioni delle carreggiate. Restano inalterate case, proprietà, giardini e personalizzazioni.


v6.3.6: nuova fase ambiente urbano: linee di arresto ben separate dalle zebre su tutti gli approcci degli incroci e contrasto migliorato per asfalto e segnaletica. Invariati dimensioni stradali, cordoli, proprietà, edifici e giardini.


v6.3.7: eliminata la seconda generazione delle strisce pedonali presso i semafori, causa delle sovrapposizioni a scacchiera. Tutti gli attraversamenti restano generati una sola volta dalla rete stradale. Nuovo LOD per strisce pedonali, linee di arresto, linee stradali e giunti dei marciapiedi: mesh GPU-instanced in blocchi da 160m, visibili solo vicino al punto osservato e nel campo della telecamera; nascosti da molto lontano. Le case avevano già un sistema separato di dettagli progressivi. Conservati tutti gli altri elementi e sblocchi.


v6.3.8: aggiunta pavimentazione tattile agli angoli degli attraversamenti, con rilievi sulle arterie principali. Le piastrelle sono inserite nello stesso sistema LOD a chunk già usato per strisce e giunture: vengono nascoste da lontano e fuori inquadratura. Aggiornamenti LOD meno frequenti a zoom lontano. Non modificati attraversamenti, semafori, edifici, proprietà e decorazioni.


v6.3.9: miglioramento delle facciate dei negozi acquistabili: cornici delle vetrine, montanti, traversini, insegne con bordo, piccole pensiline, soglie e maniglie. Materiali dei negozi riutilizzati per colore e geometrie istanziate. Non cambia la posizione delle proprietà, gli sblocchi, la segnaletica stradale o le personalizzazioni delle case. Nota: il LOD stradale esistente resta attivo; questa versione non introduce ancora il LOD per le vetrine.


v6.4.0: riprogettazione delle facciate commerciali. Eliminati i vecchi strati di pensiline, insegne e banchi che si sovrapponevano. Vetrine simmetriche ai lati di un ingresso centrale, insegna unica, pensilina singola dove appropriato. Architetture riconoscibili per caffetteria, supermercato, ristorante, libreria, farmacia, moda, officina, panetteria, cinema, palestra, hotel e mercato. Geometrie instanziate, posizione dei lotti invariata. Non ancora introdotto un LOD dedicato alle vetrine.


v6.4.1: identità architettoniche per tutte le 12 categorie commerciali, non soltanto palette diverse. Bar con tende a righe e tazzina; supermercato con carrelli e fascia; ristorante con colonne e tavoli; libreria con libri e pilastri; farmacia con croce; moda con manichini; officina con portone, aerazione e paracolpi; panetteria con camino e pani; cinema con locandine, biglietteria e insegna; palestra con finestre alte e accenti sportivi; hotel con finestre dei piani e portico; mercato con bancarelle e prodotti. Geometrie istanziate, nessuna modifica ai lotti o alla logica di acquisto. Il LOD dedicato ai negozi rimane da implementare.


v6.4.2 — Ottimizzazione negozi: introdotto LOD commerciale a gruppi spaziali di 180 metri. Le strutture principali (sagoma, tetto, porta, vetrine, insegna) restano visibili da lontano; i dettagli specifici di ogni categoria (tavolini, bancarelle, cornici, colonne, luci, ecc.) compaiono vicino alla telecamera e solo nei gruppi nell'inquadratura. Controllo limitato a circa 5 volte al secondo. Conservate le 12 categorie e tutte le modifiche precedenti.


v6.4.3: differenziazione architettonica dei 12 tipi di attività anche nella silhouette (camini, ventilazione, attici, croce della farmacia, volumi sul tetto, elementi laterali, ecc.). Evitate ulteriori pensiline sovrapposte alle vetrine. Dettagli nuovi gestiti dal sistema LOD commerciale esistente, senza modificare le proprietà acquistabili. Rendering da verificare in Brave.


v6.4.4: LOD commerciale più selettivo: decorazioni divise in settori da 90 m anziché 180 m; culling della zona osservata con raggio più stretto; distanze di attivazione ridotte; elenco delle parti strutturali riutilizzato invece di ricrearlo per ogni oggetto. Restano visibili sagome, porte e vetrine a distanza. Nessuna modifica a case, negozi acquistabili, colori, strade o geometrie.


v6.4.5: dettagli architettonici delle abitazioni nella vista 3D (cornici, soglie, porticati, balconi, parapetti, fasce di piano), differenziati per tipologia. Non modifica acquisti, colori, negozi o viabilità. Rendering da verificare in Brave.


v6.4.6: correzione sovrapposizioni geometriche negli angoli delle abitazioni 3D: tetto dell'ala laterale ora basso e piano sotto la gronda principale; una sola copertura d'ingresso (veranda Premium o portico Free); fasce e gronde accorciate per evitare sporgenze e compenetrazioni. Verificare resa in Brave.


v6.4.7: correzione nel generatore effettivo delle case con tetto a due falde: eliminato il secondo tetto inclinato dell'ala che intersecava quello principale; gronde accorciate prima degli spigoli; eliminata la doppia copertura d'ingresso Premium; fasce e cornicioni rientrati dagli angoli. Verifica visiva in Brave ancora necessaria.


v6.4.8: rimosse le grondaie 3D a scatola e i cornicioni sovrapposti agli angoli del tetto; ala laterale con tetto basso piano; una sola copertura dell'ingresso Premium; fasce di facciata accorciate. Controllare gli angoli in Brave.


v6.4.9: ripristinato il dettaglio della gronda come fascia continua INTEGRATA nella mesh del tetto a due falde, senza cubetti/cappucci agli angoli. Aggiunte due sottili fasce alte di facciata, accorciate entro gli spigoli. Rimangono finestre, persiane, portici, texture e altre decorazioni. Verificare visivamente in Brave.


v6.5.0: ripristinati dettagli di copertura non sovrapposti: colmo continuo e due sottili fasce di gronda con estremità arretrate, evitando blocchi agli angoli. Mantenuti modelli di case e negozi. Verificare visivamente in Brave.


v6.6.0 — prima fase del rinnovamento grafico: cielo atmosferico 3D procedurale (gradiente, leggere velature di nuvole), illuminazione diurna più equilibrata, foschia più leggera e terreno erboso più ricco. Nessuna nuova funzionalità o edificio. Cielo con una sola mesh shader, centrata sulla camera; nessuna ombra dinamica costosa aggiunta. Le immagini di riferimento sono un obiettivo estetico, non una promessa di identica resa. Da verificare visivamente in Brave.


EDIZIONE GRAFICA (2026): intervento coordinato su scena 3D: cielo atmosferico shader con nuvole e alone solare, luce più calda, colori e texture di prato/intonaco/tetto rivisti, ombre morbide di contatto sotto gli edifici con una sola mesh istanziata, UI più coerente. Nessun cambio a città, acquisti, proprietà o negozi. Si tratta di un upgrade funzionante del renderer esistente, NON di una riproduzione identica dell'illustrazione di riferimento: quella richiederebbe modelli artistici, animazioni, asset e direzione artistica ulteriori. Non verificato in Brave.


EDIZIONE GRAFICA COMPLETA — pacchetto unico del rendering esistente:
- nuovo cielo atmosferico shader con gradiente, velature nuvolose e luce del sole;
- illuminazione calda, esposizione e foschia calibrate insieme;
- ombre morbide sotto gli edifici con una mesh istanziata;
- texture procedurali di intonaco, prato e coperture ribilanciate;
- palette degli alberi e piccoli ritocchi all'interfaccia.
Non aggiunge nuovi negozi o funzionalità e conserva la simulazione.
ATTENZIONE: la grafica della foto di riferimento è un'illustrazione molto più complessa.
Questo è un miglioramento globale reale, ma non una riproduzione fedele
né una garanzia di prestazioni su ogni dispositivo. Non testato visivamente in Brave.


RIDISEGNO VISIVO — aggiornamento visibilmente architettonico:
* ogni casa bassa ha camino con comignolo rifinito; le case più grandi hanno anche lucernari;
* fioriere in terracotta, fogliame e fiori sotto le finestre del pianterreno;
* pilastrini e capitelli lungo l'ingresso dei giardini;
* alberi stradali con chiome a due livelli e geometria meno spigolosa;
* prato più vario, texture di intonaco più fine, illuminazione ricalibrata.
Tutti i nuovi dettagli ripetuti usano geometrie istanziate (nessun modello
scaricato). È un salto visivo sostanziale rispetto alla precedente versione,
ma NON equivale a replicare fedelmente la complessa illustrazione di
riferimento. Test di sintassi e ZIP effettuati; rendering Brave da verificare.


VERSIONE EFFETTIVA 6.7.0: etichetta visibile aggiornata in index.html; cielo shader atmosferico, esposizione, luce e foschia modificate in app.js. Non è ancora una riproduzione della grafica di riferimento.


VERSIONE 6.8.0 — RIMODELLAZIONE VISIVA REALE
Nuove piazze 3D con fontane, obelischi, aiuole fiorite, panchine e lampioni; alberi
con chiome più articolate e fioriture rosa; materiali PBR nei gruppi istanziati;
palette strade e marciapiedi aggiornata. Nessuna immagine usata come falso sfondo
del mondo 3D. Tutte le nuove forme sono geometrie THREE e ruotano con la camera.
Limite: non è una copia esatta della reference illustrata; non è stato effettuato
un test visivo in Brave.


v7.1.0 — RIMODELLAZIONE VISIVA DELLA CITTÀ
Intervento sostanziale: le torri hanno ora una facciata completa su quattro
lati, vetrate scandite da montanti, davanzali, fasce di piano, balconi con
fioriere, parapetti e giardini pensili. Le abitazioni basse ricevono dettagli
sui tetti, gli alberi hanno chiome più dense e le piazze hanno nuove fioriture,
pavimentazioni e sedute. Tutti i dettagli ripetuti sono disegnati come
InstancedMesh per non generare un oggetto separato per ogni elemento.
La foto di riferimento rimane un target artistico: questo aggiornamento
NON è una conversione 1:1 della foto in asset 3D.


v7.2.0 — INTERVENTO SUL MOTORE GRAFICO, NON SULLA MODELLAZIONE
Questa versione non aggiunge case, alberi, panchine o altri oggetti.
Aggiunge un vero secondo passaggio GPU (WebGL RenderTarget + DepthTexture)
con shader fullscreen: ambient occlusion approssimata basata sulla profondità,
contorni di profondità, grading cromatico, contrasto e vignettatura lieve.
Il renderer principale viene ora compositato nel passaggio finale.
La risoluzione del passaggio è adattiva per ridurre il carico.
In caso di GPU/browser incompatibile il motore torna al rendering originale.
Texture esistenti: più contrasto nelle fughe delle tegole e intonaco.
È un aggiornamento sostanziale della pipeline, NON la garanzia di fedeltà
all'illustrazione; non verificato visivamente su Brave.


v8.0.0 — NUOVO MOTORE DI RENDERING (render-engine.js)
Non sono stati aggiunti edifici, alberi o oggetti decorativi.
Nuovo modulo WebGL dedicato: shadow map dinamiche PCF Soft Shadows,
sole e shadow camera che seguono il quartiere, render target a colori
con depth texture, shader di occlusione di profondità a 12 direzioni
e composizione GPU, risoluzione adattiva, fallback automatico.
Questo cambia realmente l'architettura del rendering, non soltanto la
saturazione. Non garantisce da solo la fedeltà 1:1 alla reference
illustrata: quella richiede anche asset 3D e texture di qualità artistica.
Non è stato effettuato un test visivo completo in Brave.


v8.2.0 — CORREZIONE NITIDEZZA E LUMINOSITÀ
Risolto il problema della scena scura e sgranata:
- render diretto a piena risoluzione del canvas, senza passaggio di
  postproduzione a 68-86% della risoluzione nativa;
- eliminato lo shader di occlusione che scuriva gli edifici;
- pixel ratio massimo aumentato da 1.5 a 2 per schermi HiDPI;
- maggiore illuminazione emisferica e esposizione controllata;
- tolto il filtro CSS saturazione/contrasto dal canvas;
- ombre PCF con shadow map 1024, area ridotta per prestazioni.
Il ciclo di animazione usa ora il modulo render-engine.js.
Nessun nuovo edificio o arredo aggiunto.


v8.4.0 — MOTORE GRAFICO E MATERIALI (BASE v8.2.0)
- Motore di rendering WebGL semplificato e a piena risoluzione, senza
  postprocessing che offusca e scurisce l'immagine.
- Ombre PCF dinamiche 2048², con frustum che segue la telecamera.
- Materiali PBR sulle case: normal map procedurali di tegole e intonaco
  condivise fra le istanze (nessuna richiesta di texture esterne).
- Ombre abilitate solo per le geometrie principali degli edifici.
- Texture filtrate fino a 8x anisotropico.
- Nessuna modifica alle regole di gioco o alle decorazioni.
Non è una riproduzione esatta dell'illustrazione. Browser non verificato.


v8.5.0 — RIPARAZIONE VISIVA SU SCREENSHOT UTENTE
Problema confermato: illuminazione eccessiva, facciate bruciate,
prato biancastro, perdita di profondità.
Modifiche: illuminazione emisferica da 2.05 a .72, sole direzionale
2.45 per ombre leggibili, esposizione ACES da 1.24 a .98.
Prato procedurale riprogettato con base verde naturale e microstruttura
di erba contrastata, texture di tegole e intonaco più leggibili,
foschia ridotta. Rendering nativo senza blur o postprocessing scuro.
Le regole di gioco restano quelle della v8.2.0.
IMPORTANTE: la correzione affronta la sovraesposizione visibile nello
screenshot; non equivale ancora alla grafica artistica di riferimento.


v8.6.0 — MATERIALI E SUPERFICI REWORK
Correzione mirata ai problemi dello screenshot 8.5.0:
intonaco continuo a grana fine (rimossi i quadrettoni 8x8),
erba a trama minuta con fili sottili (rimossi i blocchi verdi),
tegole con fughe sfalsate e profilo di luce curvo, meno contrasto
nelle ombre (sole ridotto, luce diffusa aumentata, bias e radius
delle ombre modificati), negozi con facce senza flat shading.
Materiali condivisi e texture procedurali, senza asset remoti.
Non è un render identico all'illustrazione. 


v8.7.0 — ARCHITETTURA 3D, NON SOLTANTO COLORI
Rimodellata la scala VISIVA dei condomini: i livelli e punti di
progressione restano identici, ma gli edifici di livello 3–7
appaiono come 3–13 piani anziché dominare con torri da 48 piani.
Condomini bassi con veri tetti a falda; facciate laterali con
finestre, montanti e davanzali su entrambi i lati; fasce di piano.
Case basse con corsi di tegole in geometria 3D sui due spioventi.
Erba meno fluorescente, prospettiva meno deformata.
Non è una copia fedele dell'immagine: richiede test visivo.
