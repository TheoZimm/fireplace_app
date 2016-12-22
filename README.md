# Installation du projet
## Prérequis
    NodeJS version 6.9.1
    npm version 4.0.3
    Un compte reddit
    Un compte twitter

## Marche à suivre
-  Copier le dossier Fireplace_app en local et faites npm install dans un bash à la racine de celui-ci afin d'installer toutes les dépendences présentes dans le fichier package.json
-  Aller sur https://www.reddit.com/prefs/apps puis créer une nouvelle application
- Dans l'objet snoowrap qui se trouve dans le fichier app.js à la racine du projet, insérer vos crédentials reddit
- Pour la génération d'un refreshToken et des différents scopes dépendant à chaque refreshToken (voir ma doc sur reddit API) ouvrer un bash à la racine du projet et rentrer 
    ```npm install -g reddit-oauth-helper``` puis ```reddit-oauth-helper```
- Suivre la marche à suivre ensuite une nouvelle page reddit s'ouvrire depuis votre browser (ne pas oublier la modification du redirect_uri et la definition correcte du scope) 
- Cliquer sur "autoriser" - récuperer le "refresh_token" et l'insérer dans le fichier app.js

- Aller sur https://apps.twitter.com/ puis créer une nouvelle application
- Dans la rubrique "Keys and Access Tokens" générer un "access token" 
- Dans l'objet twitter qui se trouve dans le fichier app.js insérer vos crédentials
- à la racine du projet lancer un bash ```npm start```

Les requêtes de test s'affichent dans votre bash juste après avoir lancer npm start

## Technologies utilisées
    le projet est constitué de plusieurs couches -
        NodeJS pour la base 
            ExpressJS qui est un framework minimaliste pour NodeJS
            PUGjs qui est un template engine pour NodeJS
        un Wrapper "snoowrap" pour l'api de reddit
        un Wrapper "twitter" pour l'api de twitter
