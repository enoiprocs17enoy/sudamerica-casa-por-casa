# Verifica v9.2.1

Correzione dei nomi delle città e della selezione geografica delle anteprime.

- Tutte le località del catalogo comprese nel raggio regionale di 46 km, incluse quelle prive di un collegamento diretto o appartenenti a una componente stradale separata.
- Strade regionali estratte dall’intero grafo condiviso; eliminato il limite di due collegamenti dalla città attiva.
- Cataloghi dei paesi necessari caricati automaticamente in base a una copertura geografica ricavata dalle località GeoNames già incluse nel progetto.
- Nomi a dimensione costante in pixel, senza nebbia o taglio del terreno. Etichette sovrapposte selezionate per distanza e spazio disponibile; tutte le città restano presenti in 3D e nel menu.
- Anteprime raccolte in due gruppi di edifici, indipendentemente dal numero di città. Esclusione della vegetazione dalle località tramite indice spaziale.
- Test automatici: visibilità contemporanea dei gruppi stradali separati di Guernsey e Jersey, collegamenti fra città diverse da quella attiva, conservazione delle coordinate e viaggio guidato corretto.

Controllo visivo: Conegliano, 441 anteprime e 455 collegamenti regionali fra località diverse da quella attiva. Verificate le etichette di Godega, Orsago, Cordignano e Mescolino-Minelle, senza tagli del terreno. Controllo aggiuntivo degli eventi tardivi della mappa per impedire la chiusura della scena 3D.

Viaggio verificato da Conegliano a Susegana: 447 anteprime nel nuovo dominio regionale, nessun errore JavaScript. Tempo mediano osservato a regime nell’ambiente di prova: circa 16,7 ms; il valore dipende dal dispositivo. I file caricati dalla pagina sono versionati per evitare combinazioni di moduli vecchi e nuovi nella cache.
