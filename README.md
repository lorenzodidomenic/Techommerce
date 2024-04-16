# TECHOMMERCE

## Introduzione
Questo progetto consiste in una semplice e-commerce per la vendita di dispositivi elettronici.

E' stato realizzato parte backend in Typescript , utilizzando per il frontend il framework Bootstrap

Essa permette all'utente di visionare i prodotti in vendita , filtrandoli in base alla categoria richiesta.\
L'utente può aggiungere un prodotto di suo interesse nel carrello, procedendo successivamente al suo acquisto.\
Visionando il carrello prima della conferma dell'acquisto, è possibile modificare le quantità dei prodotti selezionati.\
All'utente è data la possibilità di visionare , dalla pagina del suo profilo, la lista degli ordini effettuati in una sessione sulla piattaforma,visualizzando il totale speso.\
L'utente può anche ottenere infrormazioni sui proprietari della piattaforma dalla pagina ed eventuali contatti per assistenza, visionare recensioni di altri utenti.

## Requisiti 

- node.js
- npm
- database mysql

## Come avviarlo 


- <code> npm install </code>
-  creare un file .env che segua il seguente template:
  ```bash
     #Environment variables.
     STATUS=development
     #Development port
     DEV_PORT=8000 
     #DB CONFIG
     HOST=localhost
     USER=
     PASSWORD=
     DB=techommerce
     DIALECT=mysql
  ```
- <code> npm start </code>

Un semplice esempio di database può essere generato passando al server mysql il file techommerce.sql che si trova all'interno della cartella db 
