comment initier un projet node
npm init -y
npm i -s express nodemon dotenv
npm i -s mongoose
npm i -s validator
npm i -s body-parser
npm i -s bcrypt
npm i -s jsonwebtoken
npm i -s cookie-parser

script -> start: nodemon server

__ server.js

importer express
appeler app
initier le port d'écoute de l'app

__ config_db.js

importer mongoose
appeler mongoose.connect pour se connecter au cluster mongoDb
mongodb+srv://dlopoel:<password>@cluster0.dwycwp2.mongodb.net/***nom_de_la_bd_a_incrémenter***
!!! pas de "@" dans le password

__ server.js

import le fichier de config db.js

__ /models

configurer les models
importer mongoose, appeler mongoose.Schema

importer la fonction de validation d'Email, depuis Validator

exporter le model : mongoose.model("**nom de la sous base**", **nomdumodel**Schema)

__ CRUD USER
_ SignUp
-> server.js 
créer les routes
app.use(**path**, fichierRoutes)

    _/routes
    fichier user.routes.js

    const router = require("express").Router();

    créer les router post/put/delete

    _/controllers/
     créer les controllers

     psenser à body parser, pour gérere la req

     exporter la fonction

        Crypter le password
        dans le model
        avec la méthode mongoose .pre('save', function) ET la bibliothèque bcrypt 

 __________________
| editer les users |
|__________________|

    _user.controller

    getAllUsers mais attention fitrer ce qui sort de la DB ! exemple le password
    avec des option dans le select()

    getUserInfo
    avec une route 'dynamique', req.params.id
    Tester si l'id donné en req.params est connu dans la DB avec ObjectID.isValid(req.params.id)

    si OK UserModel.findById()

    UPDATE USER
    try/catch await la data du user

    DELETE USER
    USerModel.deleteOne()

    Follow/Unfollow
    Double update dans la même fonction, donc impossible d'avoir deux res pour une seule req, donc on retourne la res avec la docs de la fonction follow avec la data du user qui est entrain de follow

    pour unfollow, utiliser $pull; pour retirer, le $ demande à ne pas écrasser le reste

L'authentification des user
avec l'utilisation de la librairie  JsonWebToken JWT
cléf unique d'authentification, crée par une clef de hashage secrète

pour le login: penser a désaler le password avec une fonction static liée a bcrypt dans le model user

pour le logout: retirer le cookie de connection

surveiller l'authentification du user pendant sa navigation, en vérifiant ses tokens ICI untilisation de middelware

    pour etre en meusure de lire un cookie on a besoin de la librairie cookie-parser

    Ce middleware intersepte tous les get sur notre app
    PENSER AU next() pour passer a la suite de l'execution

RequireAuth

Gérer les erreurs de connection
  le pseudo et l'email doivent etres uniques, l'email lui aussi doit etre valide
  le password lui doit etre au minimu de 6 caratères
