# Piazze, ricerca edifici e leggibilità — v8.8.6

Ogni città, anche nuova, riceve una piazza e il cartello con il proprio nome su entrambi i lati. Anche le piazzette di quartiere riportano il nome della città. Le posizioni di case, negozi e lotti pubblici non cambiano.

## Piazze reali e piazza predefinita

Otto città hanno un profilo basato su fonti municipali/turistiche: Buenos Aires, Mar del Plata, Quilmes, Santiago, Lima, Manaus, Montevideo e Quito. Sono rappresentazioni adattate al lotto del gioco, non ricostruzioni misurate complete.

Per una città senza profilo, entrando nel 3D viene cercata una piazza nominata nei dati OpenStreetMap vicini alle coordinate della città. Si privilegiano le piazze e i nomi che indicano centralità. Questo criterio non certifica che il luogo trovato sia la piazza principale ufficiale. Un contorno chiuso valido viene riprodotto in scala uniforme nel lotto; arredi e vegetazione sono generati. Le coordinate del catalogo segnate come non verificate non avviano ricerche, per evitare di attribuire luoghi errati.

Se non ci sono dati adatti, la rete è assente o il servizio non risponde, viene mantenuta la piazza civica predefinita con il nome della città. Il caricamento avviene in secondo piano, con una richiesta alla volta e salvataggio locale dei risultati. Non blocca l'ingresso nel 3D. Una risposta arrivata dopo il cambio di città non modifica quella attualmente aperta.

I monumenti principali non vengono collocati automaticamente nella piazza iniziale: restano separati dagli spazi pubblici iniziali e legati alle opere.

Dati cartografici: © OpenStreetMap contributors, ODbL — https://www.openstreetmap.org/copyright
Servizio di interrogazione: https://overpass-api.de/api/interpreter

## Fonti dei profili

- Buenos Aires: https://buenosaires.gob.ar/gcaba_historico/plaza-de-mayo
- Mar del Plata: https://turismomardelplata.gob.ar/ASP/SP/audioguias-extendida.htm
- Quilmes: https://www.quilmes.gov.ar/noticias/noticia.php?id_noti=3298
- Santiago: https://www.santiagoturismo.cl/es/plaza-de-armas/
- Lima: https://visitalima.pe/experiencia/plaza-mayor-de-lima/
- Manaus: https://www.manaus.am.gov.br/turismo/o-que-ver-e-fazer-em-manaus/
- Montevideo: https://www.descubrimontevideo.uy/plaza-independencia?page=8
- Quito: https://visitquito.ec/es/rutas-de-la-ciudad/

## Altre modifiche comprese

- Nickname con altezza di 34 pixel sullo schermo e riduzione delle sovrapposizioni.
- Selezione delle attività tramite le superfici 3D e identificazione delle singole istanze; restano selezionabili case e strutture pubbliche.
- Menu Trova con ricerca per nome, nickname e numero; collegamenti per raggiungere e aprire gli edifici.
- Le strutture pubbliche aprono gli obiettivi, distinguendo quelli raggiunti e quelli mancanti.
- Maggiori dettagli delle facciate, dei mezzi di servizio, degli arredi e delle attrezzature specifiche.

## Verifiche effettivamente eseguite

Verificati generazione e cartelli per tutte le 685 città del catalogo e una città futura di prova; contorni cartografici validi/errati, deduplicazione delle richieste, cache e comportamento offline con risposte simulate. Verificate 2.992 intersezioni reali Three.js sulle attività nelle otto evoluzioni, gratuite e Premium; controllati obiettivi, ricerca, nickname e ingombri.

Non è stato possibile completare la verifica WebGL nel browser: il controllo della finestra è stato bloccato nelle sessioni precedenti; il browser separato di prova non è riuscito ad avviarsi in questo ambiente. I test con risposte cartografiche simulate non verificano la disponibilità del servizio Overpass o la copertura reale di ogni città. Prestazioni FPS e resa visiva completa restano da verificare.
