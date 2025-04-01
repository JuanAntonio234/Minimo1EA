# API Projecte EA

## Requisits previs
Abans d'executar el projecte, assegura't de tenir instal·lat:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Organització carpetes del projecte
- Config: arxius de configuració tant de MonogDB, Swagger, CORS, etc.
- Controllers: es defineixen les respostes del servidor
- Middleware: anirà definit elements com JWT i OAuth 2.0
- Models: definició dels models amb interfaces i schema.
- Routes: es gestiona les peticions a la base de dades
- Services: peticions a la base de dades

## Instal·lació
Clona el repositori i executa la següent comanda per instal·lar les dependències:

```sh
npm install
```

## Execució
Per compilar i executar l'API:

```sh
npm run build
npm run start
```

Si es vol compilar amb nodemon:

```sh
npm run dev
```

## Documentació
Una vegada que el servidor està executat, es pot accedir a Swagger a través del següent enllaç:
```
http://localhost:3143/api-docs
```






## Minim


La función que corresponde a pagination en service no esta hecha por falta de tiempo, pero su implementación 
seguiria la lógica que usa la de paginar users