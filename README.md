# Description du projet
##

# Installation du projet
## Prérequis
    NodeJS version 6.9.1
    npm version 4.0.3
    Un compte reddit
    Un compte twitter

## Marche à suivre
-  Copier le dossier Fireplace_app en local et faites npm install dans un bash à la racine de celui-ci afin d'installer toutes les dépendences présentes dans le fichier package.json
-  Aller sur https://www.reddit.com/prefs/apps puis créer une nouvelle application
- Dans l'objet redditApi qui se trouve dans le fichier /services/RedditService.js insérer vos crédentials reddit
- Pour la génération d'un refreshToken et des différents scopes dépendant à chaque refreshToken (voir ma doc sur reddit API) ouvrer un bash à la racine du projet et rentrer 
    ```npm install -g reddit-oauth-helper``` puis ```reddit-oauth-helper```
- Suivre la marche à suivre ensuite une nouvelle page reddit s'ouvrira depuis votre browser  
- Cliquer sur "autoriser" - récuperer le "refresh_token" et l'insérer dans le fichier app.js
- Aller sur https://apps.twitter.com/ puis créer une nouvelle application
- Dans la rubrique "Keys and Access Tokens" générer un "access token" 
- Dans l'objet twitterApi qui se trouve dans le fichier /services/TwitterService.js insérer vos crédentials twitter
- à la racine du projet lancer un bash ```npm start```

Le projet se lance par défault à l'adresse localhost:3000

## Technologies utilisées
le projet est constitué de plusieurs couches :
- NodeJS pour la base 
- ExpressJS qui est un framework minimaliste pour NodeJS
- PUGjs qui est un template engine pour NodeJS
- Un Wrapper "snoowrap" pour l'api de reddit
- Un Wrapper "twitter" pour l'api de twitter

# Utilisation du projet

- Une fois vos credentials setup vous pouvez lancer l'application sur localhost:3000
- Dans le bord haut droite de votre écran vous trouverez votre pseudo reddit et twitter reliés à vos credentials
- Vous pouvez rechercher n'importequelle mots clés et l'application va ressortir les 5 articles les plus récent concernant celui-ci.

