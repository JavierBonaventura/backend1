# Curso CoderHouse Backend

## Entregable 1 -> JavierBonaventura.js
### Clases y contrtuctores

## Entregable 2 -> fs.js
### MANEJO DE ARCHIVOS

## Entregable 3 -> servidorExpress.js
### SERVIDOR CON EXPRESS

## Entregable 4 -> index.js
### SERVIDOR CON EXPRESS API RESTful

## Entregable 5 -> server.js
### PLANTILLAS PUG, HANDLEBARS Y EJS

## Entregable 6 -> server.js
### WEBSOCKETS, HANDLEBARS, CHAT

## Proyecto_Final_1 -> index.js
### PRIMERA ENTREGA PROYECTO FINAL
Se ejecuta con index.js
Para setear al usuario como admin hacer post a la ruta /login

## Entregable 8 -> server.js
### Integracion de BD MYSQL y SQLlite y Websockets
Se ejecuta con server.js
Antes crear una BD con nombre "nuestra_primera_db" y ejecutar:
node createTableMessages.js
node createTableProducts.js

## Entregable 9 -> CRUD_Mongo.txt
### MONGO DB (CLI)
Transacciones con mongo por CLI

## Proyecto_Final_2 -> index.js
### SEGUNDA ENTREGA PROYECTO FINAL
Se ejecuta con index.js
Para setear al usuario como admin "localhost:8080/api/productos/?admin=true"

## Entregable 11 -> src/app.js
### Mocks y normalización
Se ejecuta con src/app.js

## Entregable 12 -> src/app.js
### LOG-IN POR FORMULARIO
Se ejecuta con src/app.js


## Entregable 13 -> src/app.js
### INICIO DE SESION
Se ejecuta con src/app.js

## Entregable 14 -> src/server.js
### USANDO EL OBJETO PROCESS
Se ejecuta con npm run start
rutas: 
http://localhost:8080/random/(un numero cualquiera)
http://localhost:8080/info

## Entregable 15 -> src/server.js
Se ejecuta con npm run start

comandos utilizados para métodos fork y cluster
pm2 start src/server.js --name="cluster" --watch -i 0 -- 8081
pm2 start src/server.js --name="fork1" --watch -- 8082
pm2 start src/server.js --name="fork2" --watch -- 8083
pm2 start src/server.js --name="fork3" --watch -- 8084
pm2 start src/server.js --name="fork4" --watch -- 8085

## Entregable 16 -> src/app.js
### LOGUEO
Comadnos para las consignas del entregable:
1) Se ejecuta node src/server.js
2) node --prof src/server.js 
3) artillery quick -c 50 -n 20 "http://localhost:8080/api/info"> artyllery-suma.log
4) node --prof-process info-v8.log > info.log.txt
5) npm start
6) npm run test

## Entregable 17 -> src/app.js
### Desplegar nuestro proyecto en la nube

## Proyecto_Final_3 -> app.js
### TERCERA ENTREGA PROYECTO FINAL
Iniciar proyecto con "node -r dotenv/config cluster.js 8080 cluster

## Entregable 19 -> src/server.js
### Dividir en capas nuestro proyecto
Iniciar proyecto con node server.js