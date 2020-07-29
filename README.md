# ItemsJS app

Appplication de gestion d'objets avec un système de connexion.

## Build Setup

### Back-end

La configuration de l'accès à la base de données MongoDB se trouve dans `server/config/database.js`. Un accès expérimental est fourni avec le projet.

Le serveur communique avec le front à l'adresse `http://localhost:3001/`

```bash
# accès au dossier
$ cd server

# installation des dépendances
$ npm install

# Lancement du serveur node
$ node server.js

```

### Front-end
```bash
# accès au dossier
$ cd front

# installation des dépendances
$ npm install

# Lancement du serveur en mode développeur à l'adresse localhost:3000
$ npm run dev

# Build pour le mode production et lancement du serveur
$ npm run build
$ npm run start

```

## Structure des objets
Les objets sont composés les propriétés suivantes :

- name : String
- description : String
- img : File (.PNG ou .JPG)
- foundDate : Date
