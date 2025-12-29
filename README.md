Repository ufficiale di BugBoard26®. Autori: Donadio Vincenzo; Filosa Walter. Docenti: Sergio Di Martino; Luigi Libero Lucio Starace.
Progetto a fini didattici propedeutico all'insegnamento di Ingegneria del Software.

### Esecuzione in Locale ###
Per eseguire il software in locale è necessario impostare i seguenti valori come configurazioni di avvio/variabili d'ambiente: </br>
<ol>
  <li><em><strong>spring.datasource.url</strong></em>: URL del Database Postgres (consigliato jdbc:postgresql://localhost:5432/BugBoard26)</li>
  <li><em><strong>spring.datasource.password</strong></em>: Password del database</li>
  <li><em><strong>server.ssl.key-store-password</strong></em>: Modificare se si vuole aggiungere un certificato proprio, altrimenti impostare "ForzaNapoli" per il certificato di default</li>
  <li><em><strong>azure.storage.connection.string</strong></em>: Stringa di connessione per Azure BLOB Storage</li>
</ol>

### Esecuzione con Docker ###
Per eseguire il software tramite configurazione Docker Compose è necessario impostare i seguenti valori all'interno del file <em>docker-compose.yaml</em> oppure in un file con estensione .env:
<ol>
  <li><em><strong>SPRING_DATASOURCE_PASSWORD</strong></em>: Password del database, deve coincidere con <em>POSTGRES_PASSWORD</em></li>
  <li><em><strong>AZURE_STORAGE_CONNECTION_STRING</strong></em>: Stringa di connessione per Azure BLOB Storage</li>
  <li><em><strong>SERVER_SSL_KEY_STORE_PASSWORD</strong></em>: Modificare se si vuole aggiungere un certificato proprio, altrimenti impostare "ForzaNapoli" per il certificato di default</li>
  <li><em><strong>POSTGRES_USER</strong></em>: Nome del proprietario del database, si consiglia "postgres"</li>
  <li><em><strong>POSTGRES_PASSWORD</strong></em>: Password per l'accesso al database, deve coincidere con <em>SPRING_DATASOURCE_PASSWORD</em></li>
  <li><em><strong>POSTGRES_DB</strong></em>: bugboard26</li>
</ol>

