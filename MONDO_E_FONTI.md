# Mondo — v9.0.1

La mappa è estesa a tutti i continenti. Il catalogo GeoNames cities500 importato il 7 novembre 2026 contiene 236.953 località distribuite in 246 paesi e territori. Include località con oltre 500 abitanti o sedi amministrative; non è l'elenco di ogni villaggio o insediamento esistente sulla Terra. Gli estremi polari sono limitati dalla proiezione Mercatore della mappa; l'Antartide non ha un normale catalogo di città popolose.

I confini delle terre emerse sono Natural Earth 1:110 milioni. Le coste 1:10 milioni sono usate per stimare distanza e direzione del mare entro 40 km. Non equivalgono a rilievi locali: piccole isole e coste complesse possono richiedere correzioni. Le direzioni costiere già curate per il Sud America prevalgono sulle stime.

I paesi caricano il proprio catalogo compresso a blocchi di massimo 4.000 località solo quando selezionati. All'avvio sono presenti 633 località di orientamento mondiale, oltre al catalogo precedente. I punti della mappa usano un indice spaziale e un massimo di 450 marcatori visibili; quelli fuori vista vengono rilasciati. Il menu mostra fino a 120 risultati alla volta. La città 3D resta limitata a 5.000 case indipendentemente dalla popolazione reale.

Il menu consente di scegliere continente, paese e località. Il campo di ricerca agisce nel paese selezionato e gestisce anche nomi nativi e traslitterati. La popolazione reale serve a ordinare le città; abitanti, punti e case del gioco sono simulati. Non sono una misura demografica.

Gli identificativi delle città precedenti sono conservati. Le località GeoNames usano un identificativo stabile gn-ID. Quando nome, paese e posizione corrispondono a una città preesistente, viene mantenuta la città precedente. I record geografici precedentemente sospesi rimangono sospesi: non vengono promossi automaticamente a verificati.

Le piazze mondiali usano il resolver cartografico esistente e un ripiego nominato. Non sono tutte ricostruite fedelmente: statue e dettagli documentati della v8.8.10 restano disponibili. Le catene montuose mondiali sono scenari approssimati lungo assi geografici, non modelli di elevazione locali. Le architetture e l'arredo restano quelli del gioco: non è una riproduzione fotografica di ogni città del pianeta.

## Fonti e licenze

- GeoNames: https://download.geonames.org/export/dump/readme.txt . Dati CC BY 4.0: https://creativecommons.org/licenses/by/4.0/ . Fonte: https://www.geonames.org/ . Le coordinate, i nomi, le popolazioni e le elevazioni provengono da cities500; i paesi da countryInfo. Dati forniti senza garanzia di completezza o aggiornamento uniforme.
- Natural Earth: https://www.naturalearthdata.com/ . Pubblico dominio: https://www.naturalearthdata.com/about/terms-of-use/ . Geometrie dalla distribuzione ufficiale https://github.com/nvkelso/natural-earth-vector .
- Piazze: OpenStreetMap contributors, ODbL, come documentato in METODO_PIAZZE.md.

## Avvio

Estrarre tutto lo ZIP e servire la cartella con un server HTTP oppure pubblicarla come sito statico. La cartella world-cities è necessaria. Aprire index.html con file:// non permette normalmente i caricamenti dei paesi. Il catalogo compresso richiede un browser moderno con DecompressionStream.

Dalla v9.0.1 la mappa non usa più tessere stradali reali. Rimangono le terre emerse Natural Earth e la rete stilizzata descritta in RETE_STILIZZATA.md.

Per le 633 località di orientamento sono inclusi anche i nomi alternativi GeoNames: per esempio Roma/Rome e Tokyo/東京. Per le altre località la ricerca usa nome principale e traslitterazione; non include tutte le traduzioni in ogni lingua.
## Verifiche della v9.0.0

Caricati e decompressi tutti i 279 blocchi dei 246 paesi: 236.953 record sorgente. Verificati identificativi unici, coordinate finite, ricaricamenti senza duplicati e conservazione di coordinate, punti e stato geografico delle 685 voci precedenti. Ricerca verificata in Europa, Asia, Africa, America e Oceania, compresi nomi alternativi Roma e 東京. Un campione di vista italiana con 9.055 candidati viene interrogato dall'indice in circa 8–10 ms nell'ambiente di prova; non è una misura FPS del browser.

Verificata la generazione geometrica di terreno e vegetazione per dodici città di continenti differenti; verificata la corrispondenza della presenza del mare ai dati importati. Restano i controlli delle case, delle attività e delle piazze precedenti. I test CPU non certificano la resa WebGL su ogni dispositivo o la fedeltà storica delle piazze mondiali.
