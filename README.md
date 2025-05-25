# Task Manager Application - MERN Stack

Une application de gestion de tâches complète construite avec le stack MERN (MongoDB, Express.js, React, Node.js).

## Phases du Projet

### Phase 1 - Configuration du Projet et Backend
- [Voir le code de la Phase 1](https://github.com/fazalaye/Task-manager/tree/phase1-project-setup)
- Configuration initiale du projet MERN
- Configuration du serveur Express.js
- Connection à MongoDB Atlas
- Structure de base des API

### Phase 2 - Authentification et Autorisation
- [Voir le code de la Phase 2](https://github.com/fazalaye/Task-manager/tree/phase2-authentication)
- Système d'inscription et de connexion
- Authentification JWT
- Protection des routes
- Gestion des utilisateurs

### Phase 3 - Création et Listing des Tâches
- [Voir le code de la Phase 3](https://github.com/fazalaye/Task-manager/tree/phase3-task-creation)
- Création de nouvelles tâches
- Affichage des tâches
- Interface utilisateur de base
- Validation des données

### Phase 4 - Mise à jour et Suppression des Tâches
- [Voir le code de la Phase 4](https://github.com/fazalaye/Task-manager/tree/phase4-task-update)
- Modification des tâches existantes
- Suppression des tâches
- Interface d'édition
- Gestion des erreurs

### Phase 5 - Filtrage et Tri des Tâches
- [Voir le code de la Phase 5](https://github.com/fazalaye/Task-manager/tree/phase5-task-filtering)
- Filtres par statut
- Recherche par titre/description
- Tri par date/priorité
- Interface de filtrage

### Phase 6 - Déploiement et Finalisation
- [Voir le code de la Phase 6](https://github.com/fazalaye/Task-manager/tree/phase6-deployment)
- Configuration pour la production
- Déploiement sur Render.com
- Tests finaux
- Documentation

## Installation et Démarrage

1. Cloner le repository :
```bash
git clone https://github.com/fazalaye/Task-manager.git
cd task-manager
```

2. Installer les dépendances :
```bash
# Installation des dépendances racine
npm install

# Installation des dépendances du client
cd client
npm install

# Installation des dépendances du serveur
cd ../server
npm install
```

3. Configuration :
- Créer un fichier `.env` dans le dossier server
- Ajouter les variables d'environnement nécessaires

4. Démarrer l'application :
```bash
# Depuis la racine du projet
npm run dev
```

## Technologies Utilisées

- **Frontend** : React, TypeScript, Material-UI
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB Atlas
- **Authentication** : JWT
- **Validation** : Express-validator, Yup
- **State Management** : Context API
- **Styling** : Material-UI, CSS-in-JS

## Structure du Projet

```
task-manager/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── contexts/      # Context API
│   │   ├── pages/        # Pages de l'application
│   │   ├── services/     # Services API
│   │   └── types/        # Types TypeScript
│   └── public/
├── server/                # Backend Node.js
│   ├── models/           # Modèles Mongoose
│   ├── routes/           # Routes API
│   ├── middleware/       # Middleware personnalisé
│   └── server.js         # Point d'entrée du serveur
└── README.md
```

## Features

- User Authentication (Register/Login)
- Create, Read, Update, and Delete Tasks
- Task Categories and Priority Levels
- Due Date Management
- Task Status Tracking
- Responsive Modern UI

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: JWT
- Styling: Tailwind CSS

## Project Structure

```
Task-manager/
├── client/             # React frontend
├── server/             # Node.js backend
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm start
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

Create `.env` files in both client and server directories:

### Server (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```