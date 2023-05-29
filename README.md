# Registro Elettronico Universitario

Lo scopo del progetto è costruire una dashboard universitaria unificata (una sorta di registro elettronico) che permetta lo scambio di circolari, calendario lezioni, contatto di segreteria, lettura presenze, e che sia responsive, lightweight e semplice da utilizzare.

## RestAPI

Il software è collegato ad un backend scritto in Java SpringBoot sempre da me realizzato, disponibile [qui](https://github.com/maioranav/registroelettronico).

## Stack Utilizzato

- React
- Typescript
- Redux - Persist - Encrypt
- Bootstrap
- PWA

## Script Disponibili

I seguenti comandi sono eseguibili da terminale:

### `npm start`

Avvia l'applicazione in modalità DEVELOPMENTE.\
Apri https://localhost:3000 nel browser per accedere.

Eventuali modifiche al codice vengono refreshate live.\
ESLint blocca e mostra sul browser eventuali errori.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Ringraziamenti

Il progetto deriva da una discussione con Beatrice Chianese, una persona a me molto cara, con la quale è emerso che la sua App Universitaria è molto confusionaria e quindi, cito testualemtente "Puoi fare un'app dell'università dove si capisce qualcosa".\
La UI è stata progettata visivamente da Antonio Calderone, mio caro amico che ha creduto nel mio progetto mettendosi a disposizione in maniera repentina.\
Un ringraziamento enorme va invece ai miei docenti e teaching Assistant in Epicode, che mi hanno supportato e insegnato quello che so fare, e con i quali ho potuto esaltare le mie capacità di ProblemSolving in questo progetto nello specifico. (Su questo progetto specificatamente: Lidia Kovac, Rino Marra).

## SSL

Il software viene avviato di default in modalità HTTPs ma non dispone di certificati all'apertura. Potrebbe essere necessario implementare dei certificati di sicurezza o aggiungere un'eccezione al tuo browser/antivirus per permettere l'apertura della pagina web.

## Support PWA

E' gia disponibile la funzionalità di PWA, seppur basica. Per testare la funzionalità PWA in ambiente DEVELOPMENT è necessario disattivare il supporto SSL dal file .env e modificare il PUBLIC_URL in http (al posto di HTTPs). Eseguire quindi la build del progetto con `npm run build` e avviare il progetto con `npx serve build`. Se `serve` non è installato, il gestore pacchetti ti chiederà di installarlo.
