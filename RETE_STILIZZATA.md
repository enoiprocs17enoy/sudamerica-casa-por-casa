# Rete stilizzata — v9.0.2

La rete della mappa è una dorsale minima con diramazioni: usa un albero ricoprente minimo per ogni componente collegabile delle città rappresentate. Una catena A–B–C ha due strade, senza aggiungere A–C. Con N città ci sono al massimo N−1 collegamenti: vengono eliminati i cicli e i triangoli ridondanti della v9.0.1. Il progetto non riproduce una rete di viabilità reale.

Il grafo viene costruito sugli stessi marcatori effettivamente presenti nella mappa, fino a 450: non aggiunge capolinea su città nascoste. I percorsi sono quasi rettilinei, con curvatura lieve, anziché le precedenti curve ad S con tangenti cardinali. Ogni punto iniziale e finale coincide esattamente con la coordinata della propria città. Corretto l'errore fra coseno della latitudine media e coseno della città iniziale che spostava le estremità delle vecchie curve.

I collegamenti hanno lunghezza fra 500 metri e 350 km. Sono controllati tutti i punti interni campionati rispetto alla terra emersa, senza inventare ponti verso isole o collegamenti sopra il mare. La costa rimane semplificata: il controllo non certifica ogni metro rispetto a fiordi, laghi o piccoli specchi d'acqua. Il grafo può cambiare quando cambiano i marcatori rappresentati con lo zoom; a parità di città il risultato è deterministico e memorizzato.

## Costa e coordinate

Aggiunta la base Natural Earth 1:50 milioni, semplificata a 0,006 gradi e suddivisa in sette file. La base 1:110 milioni dava l'impressione che alcune città fossero spostate in mare. Le coordinate delle città precedenti non sono state spostate. Mar del Plata rimane a −38,0055°, −57,5426°, e il suo centro risulta sulla terra emersa nella nuova base. La dimensione del simbolo può naturalmente estendersi oltre la linea di costa.

Fonte: Natural Earth, pubblico dominio: https://www.naturalearthdata.com/ ; distribuzione ufficiale https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_land.geojson .

## Corrispondenza col 3D

Il grafo attivo viene sincronizzato prima dell'ingresso nel 3D. Est corrisponde a +X e nord a −Z. La griglia della città selezionata compare dal livello 9 e usa le stesse dimensioni degli isolati (184 × 92 metri) e gli stessi isolati occupati del 3D. Eliminati dalla mappa i tronconi di uscita di 1,1 km che terminavano senza un marcatore.

Le uscite 3D partono da incroci effettivi e si dirigono verso le città collegate dal grafo attivo. Le superfici seguono il terreno e la vegetazione integrativa viene esclusa dal corridoio stradale. Sono renderizzati circa 1,1 km di uscita nel paesaggio locale: non è ancora possibile percorrere senza interruzioni l'intera distanza fra due città. Le strade interne sono quelle generate dal gioco, non le vie del mondo reale.

L'ingresso dal planisfero rimane orientato a nord; la rotazione resta disponibile nel 3D. Il disegno Canvas usa un numero limitato di tracciati e riutilizza il grafo se l'insieme delle città non cambia.

## Verifiche

- Catena di tre città: esattamente due strade, nessuna scorciatoia A–C.
- Campione di 100 città italiane: 97 collegamenti invece dei 286 precedenti; nessun ciclo e nessun duplicato.
- Tutte le estremità coincidono con le coordinate delle città; curve canoniche indipendenti dall'ordine degli estremi.
- Anteprima geometrica della regione di Mar del Plata: 40 città e 38 collegamenti; centro di Mar del Plata sulla terra, coordinate conservate. Non è uno screenshot del browser.
- Verificati griglia, orientamento, geometrie stradali finite, facce rivolte verso l'alto, fascia libera dagli alberi e selezioni preesistenti.

La verifica visiva completa nel browser Windows rimane limitata dal blocco dello strumento già segnalato; i controlli geometrici non la sostituiscono.
