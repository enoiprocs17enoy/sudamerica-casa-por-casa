# Piazze e verifiche — v8.8.8

## Revisione dello spazio e degli arredi — v8.8.8

La piazza occupa ora tutto il lotto con una base pavimentata, una passeggiata perimetrale e terrazze arredate negli spazi residui. La planimetria centrale viene ruotata per adattare il suo asse lungo al lotto e scalata uniformemente; i rapporti dimensionali dei dati originali non vengono deformati. Per Buenos Aires la superficie del nucleo cartografico è 2,96 volte quella della versione precedente. L’orientamento della piazza rispetto al nord reale può quindi cambiare.

Bordure e cordoli hanno spessore 3D. Aiuole rialzate, fioriture lungo i bordi verdi, sedute a listelli con braccioli, lampioni, cestini, alberi con chiome composte e pergolati completano lo spazio. Questi elementi integrativi servono all’adattamento della piazza alla città virtuale e non vanno considerati una misura di tutti gli arredi reali. Dove sono disponibili, vengono utilizzate le posizioni cartografiche degli alberi, con un massimo di 72 alberi per piazza. Il cartello è largo al massimo 8 metri, basso e laterale, invece del precedente pannello centrale da circa 24 metri.

Anche le piazze predefinite usano questo sistema di dettaglio. Restano indicate come piazze civiche predefinite, con il nome della città.

Verificati 262 modelli (261 mappati più quello predefinito): 197.866 parti restano nei lotti; il modello più complesso conta 104.579 triangoli e il massimo è 43 gruppi di disegno. Le superfici alla stessa quota e con lo stesso materiale vengono unite. Sono limiti geometrici verificati, non misure di FPS nel browser.

## Cosa è cambiato nella base cartografica

La v8.8.6 applicava arredi e giardini generici anche a contorni diversi. La v8.8.7 include un archivio di 261 planimetrie distinte e disegna i contorni, le superfici verdi, le superfici pedonali e i percorsi disponibili nei dati cartografici. Non aggiunge quattro aiuole uguali a ogni piazza.

Sono state controllate e corrette in modo specifico le associazioni di Buenos Aires (Plaza de Mayo), Mar del Plata (Plaza San Martín), Quilmes (Parque General José de San Martín), Lima (Plaza Mayor), Santiago (Plaza de Armas), Bogotá (Plaza de Bolívar), Montevideo (Plaza Independencia) e Quito (Plaza Grande). Manaus usa la geometria di Praça São Sebastião / Largo de São Sebastião.

La copertura è 214/234 città selezionabili. Le altre 451 voci del catalogo hanno coordinate già marcate come non verificate e non sono selezionabili. Il totale di 261 geometrie include 47 candidati di queste voci: non certifica una copertura di quasi tutte le 685 piazze principali. Vedere COPERTURA_PIAZZE.md per stato e fonte di ciascuna città.

## Precisione e limiti

I contorni e i percorsi provengono da OpenStreetMap; le dimensioni sono ridotte uniformemente per rientrare nel lotto permanente, senza deformare il rapporto tra larghezza e profondità. Le posizioni di case e attività non cambiano.

I dati cartografici possono omettere alberi, arredi e aiuole. Gli alberi puntuali sono usati quando disponibili; dove mancano, una parte della vegetazione è collocata sulle aiuole mappate come integrazione grafica. Questa integrazione non è una misura reale delle posizioni dei singoli alberi. Non è stata verificata manualmente la scelta della piazza principale per ogni città. I candidati centrali non vanno presentati come ricostruzioni complete certificate.

Ogni piazza porta il nome della città su entrambe le facce del cartello. Monumenti e statue principali restano separati dalle piazze iniziali e legati alle opere. La piazza predefinita ha due fasce verdi laterali e una pavimentazione centrale semplice; rimossi i percorsi diagonali sovrapposti.

Per le città nuove, il resolver legge dati vettoriali OpenFreeMap, cerca una piazza nominata con un contorno utilizzabile e ne importa le geometrie disponibili. Le risposte vengono salvate localmente; in caso di dati assenti o rete non disponibile resta la piazza predefinita. Il risultato automatico resta un candidato da verificare come piazza principale.

## Difetto delle righe diagonali

Separati i materiali di pavimentazione e i dettagli che proiettano ombra: le superfici sottili delle piazze non proiettano più ombre su se stesse. Corretto il distacco delle superfici sovrapposte e adattato il bias delle ombre all'estensione effettiva della mappa. La conferma visiva WebGL nel browser resta da eseguire.

## Fonti e licenze

Dati © OpenStreetMap contributors, ODbL: https://www.openstreetmap.org/copyright
Schema vettoriale © OpenMapTiles: https://openmaptiles.org/
Fornitura vettoriale OpenFreeMap: https://openfreemap.org/
Versione dei vettori utilizzata: 20261101_080013_pt.
Metadati geografici Wikidata, CC0: https://www.wikidata.org/
Le singole fonti geometriche sono elencate in COPERTURA_PIAZZE.md. Sono stati scaricati 721 tasselli, circa 48,65 MiB, con al massimo quattro richieste contemporanee; nel pacchetto vengono distribuite solo le geometrie estratte, non l'archivio dei tasselli.

Riferimenti municipali usati: Buenos Aires https://buenosaires.gob.ar/gcaba_historico/plaza-de-mayo ; Mar del Plata https://turismomardelplata.gob.ar/ASP/SP/audioguias-extendida.htm ; Quilmes https://www.quilmes.gov.ar/noticias/noticia.php?id_noti=3298 ; Santiago https://www.santiagoturismo.cl/es/plaza-de-armas/ ; Lima https://visitalima.pe/experiencia/plaza-mayor-de-lima/ ; Manaus https://www.manaus.am.gov.br/turismo/o-que-ver-e-fazer-em-manaus/ ; Montevideo https://www.descubrimontevideo.uy/plaza-independencia?page=8 ; Quito https://visitquito.ec/es/rutas-de-la-ciudad/ .

## Verifiche

Generate e controllate tutte le 261 geometrie: coordinate finite, pannelli con il nome della città, assenza di auto-ombre sulle pavimentazioni. Tutti i 261 asset hanno planimetrie distinte. Controllata la generazione di una piazza futura usando un vero tassello vettoriale, oltre a cache, deduplicazione e ripiego senza rete. Confrontate 18 proiezioni geometriche di nove città.

Queste proiezioni e verifiche CPU non sostituiscono il controllo WebGL della città completa, che resta da completare. Restano valide le modifiche della v8.8.6 a nickname, selezione delle superfici, menu Trova e obiettivi pubblici.
