# Rete stilizzata — v9.0.1

Rimosse le tessere con le strade reali. La mappa geografica conserva le terre emerse e le città alle loro coordinate, con sottili collegamenti curvi tra località vicine. I collegamenti iniziano a comparire dal livello 4; il dettaglio cresce con lo zoom. Dal livello 9 compare anche la griglia della città selezionata, ricavata dagli stessi isolati occupati da case, attività e strutture nel 3D.

Non sono tracciati stradali reali. È una rete procedurale di gioco: ciascuna città cerca fino a tre collegamenti locali, con distanza massima di 350 km, scartando i percorsi i cui punti di controllo attraversano il mare nella base geografica disponibile. Le isole isolate non vengono collegate con ponti inventati. I controlli usano una costa semplificata e non certificano ogni tratto rispetto a fiordi, laghi o piccoli specchi d'acqua. Non sono modellati tunnel, traghetti o infrastrutture del mondo reale.

La coppia di città determina un collegamento unico e canonico: invertirne l'ordine non cambia il percorso. I cataloghi caricati determinano le città disponibili alla rete; caricare un paese può introdurre nuove connessioni locali. La mappa usa un massimo di 240 nodi per aggiornamento, disegno Canvas e aggiornamenti raggruppati, evitando migliaia di oggetti DOM.

## Corrispondenza col 3D

Il grafo dei collegamenti e la conversione geografica sono condivisi: est corrisponde a +X, nord a -Z. La griglia sulla mappa usa le stesse dimensioni degli isolati (184 × 92 metri) e gli stessi isolati occupati della città caricata. Le uscite iniziano su incroci effettivi della griglia e proseguono nella direzione delle città collegate.

Le strade esterne seguono l'altezza del terreno mediante superfici suddivise; gli alberi integrativi vengono esclusi da un corridoio intorno alla strada. Gli sbocchi verso il mare virtuale sono tagliati prima della riva. I collegamenti esterni renderizzati in 3D si estendono per circa 1,1 km dall'uscita: il gioco non carica centinaia di chilometri di terreno né consente ancora di percorrere senza interruzioni l'intero spazio fra due città. Sulla mappa il collegamento rappresenta invece la relazione completa fra le città.

L'ingresso dal planisfero avviene col nord in alto e una vista più ampia della città. I comandi di rotazione restano disponibili dopo l'ingresso. Le strade interne restano quelle generate dal gioco, non le vie reali della città geografica.

## Verifiche

Verificati 100 centri italiani con 286 collegamenti unici: assenza di duplicati, coordinate finite, simmetria delle connessioni, controllo dei punti sul terreno, corrispondenza delle direzioni nord/est e gestione del cambio di longitudine. Verificato che non venga generata una strada sopra la Manica fra Londra e Parigi.

Verificati gli ancoraggi a incroci di isolati occupati, facce stradali rivolte verso l'alto e visibili con raggi verticali, superfici finite, fascia libera da alberi, assenza di layer stradali raster e comparsa progressiva dei livelli della mappa. Restano validi i test sulle selezioni delle case e delle 24 attività. La verifica visiva WebGL completa resta limitata dal blocco del controllo del browser Windows già segnalato.
