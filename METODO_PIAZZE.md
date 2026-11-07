# Metodo delle piazze — v8.8.9

Ogni piazza combina tre livelli distinti: geometria cartografica, elementi storici documentati e arredo integrativo. I primi due conservano provenienza e identificatori; il terzo migliora l'adattamento al lotto virtuale, senza essere presentato come rilievo reale.

## Geometria

Contorno, aiuole, specchi d'acqua e percorsi vengono importati da OpenStreetMap. L'intero disegno viene ruotato e scalato uniformemente per entrare nel lotto: conserva le proporzioni, non l'orientamento geografico o le dimensioni assolute. Per i percorsi sono utilizzati larghezza e materiale registrati, quando disponibili. In assenza di larghezza viene usata una stima grafica. I cordoli hanno spessore tridimensionale. Il modello non ricostruisce ancora le quote reali di tutti i gradini e marciapiedi.

## Statue e fontane

square-details-data.js contiene coordinate, fonte, tipologia e stato dei singoli oggetti; square-details.js contiene i modelli procedurali. Le posizioni provengono dalla cartografia disponibile; per Quilmes la collocazione centrale nella fontana è documentata dalla ricerca UNQ. Le dimensioni di visualizzazione sono adattate al lotto e non equivalgono sempre alle misure originali.

Esempi ricostruiti: Pirámide de Mayo con figura sommitale e quattro allegorie; San Martín anziano in piedi su base rocciosa a Mar del Plata; San Martín equestre nella fontana a Quilmes; fontana bronzea con figura alata a Lima; Bolívar con spada e libro a Bogotá; Artigas equestre a Montevideo; colonna dell'Indipendenza a Quito; fontana con figura della Libertà a Santiago. Sono interpretazioni 3D stilizzate: non scansioni né riproduzioni esatte delle sculture.

Le statue riservano un'area che esclude alberi, panchine, fioriere e lampioni integrativi. Le parti sono raggruppate per geometria e materiale mediante instancing. L'acqua delle fontane ha vasche e getti geometrici; non è una simulazione idraulica animata.

## Stati e aggiornamento

- reference-model: tipologia ricostruita con riferimento documentale; comprende anche sottoelementi dello stesso monumento.
- mapped-archetype: oggetto e posizione cartografici, forma generica coerente con il tipo disponibile.
- needs-model: oggetto individuato ma forma non documentata a sufficienza; non viene inventata una statua.

L'inventario attuale contiene 69 voci: 12 di riferimento, 11 archetipi, 46 in attesa. Non sono 69 monumenti tutti modellati. Il menu della piazza espone elementi e fonti. Per città nuove, il resolver cerca anche fontane e monumenti nel tassello; applica un archetipo solo se la tipologia è riconoscibile. Questo automatismo non certifica l'identità della piazza principale né la fedeltà di tutti i dettagli. Le fonti mancanti richiedono ulteriori rilievi o fotografie documentate.

La copertura dei contorni rimane 214 delle 234 città selezionabili; 20 usano il ripiego. Altre 451 città del catalogo hanno geografia da verificare. Le piazze predefinite mantengono il nome della città. Non viene promessa copertura completa o identica al reale.

## Riferimenti consultati il 7 novembre 2026

Dati © OpenStreetMap contributors, ODbL: https://www.openstreetmap.org/copyright . Geometrie e identificatori sono conservati nei dati distribuiti.

- Buenos Aires, Pirámide e quattro allegorie: https://buenosaires.gob.ar/gcaba_historico/plaza-de-mayo/piramide-de-mayo
- Museo Luis Perlotti, San Martín a Mar del Plata: https://buenosaires.gob.ar/gcaba_historico/museoluisperlotti/elmuseo/monumentosperlotti/sanmartin
- Quilmes, ricerca UNQ sul monumento e la fontana: https://syv.web.unq.edu.ar/2024/09/10/la-plaza-san-martin-de-quilmes-y-sus-monumentos-una-perspectiva-de-comparacion-desde-los-momentos-historicos-de-su-construccion/
- Lima, PromPerú: https://target2.promperu.gob.pe/teapuntas-lima-callao/distritos-con-historia/centro-historico-de-lima/plaza-mayor-lima
- Montevideo, Artigas: https://montevideo.gub.uy/monumento-al-general-jose-gervasio-artigas
- Quito: https://www.quito-turismo.gob.ec/news/el-quinde-visitors-center-el-espacio-insustituible-para-el-turista-que-visita-quito/
- Bogotá, IDPC: https://idpc.gov.co/el-monumento-al-libertadorde-la-plaza-de-bolivar-ya-brilla-con-luz-propia/
- Santiago: https://www.santiagoturismo.cl/es/plaza-de-armas/

## Verifica e limiti

Test di generazione e ingombro su 261 piazze più il ripiego, controllo dei modelli da due lati mediante proiezioni CPU, trasformazioni finite, prenotazione dello spazio e navigazione degli obiettivi. Questi controlli non sostituiscono un test del sito completo in un browser WebGL. Tale test non è stato possibile nell'ambiente corrente. Vedere PIAZZE_E_VERIFICHE.md per metriche e limiti della versione.
