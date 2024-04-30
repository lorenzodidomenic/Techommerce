# TECHOMMERCE

## Introduzione
Questo progetto consiste in un semplice e-commerce per la vendita di dispositivi elettronici.

E' stato realizzato parte backend in Typescript, utilizzando per il frontend il framework Bootstrap.

Esso permette all'utente di visionare i prodotti in vendita, filtrandoli in base alla categoria richiesta.\
L'utente può aggiungere un prodotto di suo interesse nel carrello, procedendo successivamente al suo acquisto.\
Visionando il carrello prima della conferma dell'acquisto, è possibile modificare le quantità dei prodotti selezionati.\
All'utente è data la possibilità di visionare, dalla pagina del suo profilo, la lista degli ordini effettuati in una sessione sulla piattaforma, visualizzando il totale speso.\
L'utente può anche ottenere informazioni sui proprietari della piattaforma, eventuali contatti per assistenza e visionare recensioni di altri utenti.

## Come avviarlo 
- npm
- docker

## Avviarlo con npm

#### Requisiti:
- node.js
- npm
- database mysql

#### Steps:
1)  <code> npm install </code>
2)  creare un file .env che segua il seguente template:
  ```bash
     # ENVIRONMENT VARIABLES
     STATUS=development
     # Development port
     DEV_PORT=8000 
     # DB config
     HOST=localhost
     USER=root
     PASSWORD=
     DB=techommerce
     DIALECT=mysql
  ```
3) <code> npm start </code>
4) go to http://localhost:8000

Un semplice esempio di database può essere generato passando al server mysql il file techommerce.sql che si trova all'interno della cartella db.

## Avviarlo con Docker

#### Requisiti:
- docker engine

#### Steps:
1)  creare un file .env che segua il seguente template:
  ```bash
     # ENVIRONMENT VARIABLES
     STATUS=development
     # Development port
     DEV_PORT=8000 
     # DB config
     HOST=localhost
     USER=root
     PASSWORD=
     DB=techommerce
     DIALECT=mysql

    # For docker compose
    MYSQLDB_USER=root
    MYSQLDB_ROOT_PASSWORD=
    MYSQL_ALLOW_EMPTY_PASSWORD=true
    MYSQLDB_DATABASE=techommerce
    MYSQLDB_LOCAL_PORT=3307
    MYSQLDB_DOCKER_PORT=3306
    
    NODE_LOCAL_PORT=8000
    NODE_DOCKER_PORT=8000
  ```
2) <code> docker compose up </code>
3) go to http://localhost:8000
