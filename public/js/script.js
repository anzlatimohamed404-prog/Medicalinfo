// Importation du module Express pour créer et gérer un serveur web
const express = require('express');

// Création d'une instance de l'application Express
const app = express();

// Définition du port sur lequel le serveur va fonctionner
const PORT = 3000;

// Ajout d'un middleware pour analyser les corps de requêtes JSON entrants
app.use(express.json());

// Définition d'une route GET pour l'URL racine '/' qui répond avec un message de statut
app.get('/', (req, res) => {
    // Envoi d'une réponse texte indiquant que l'API Medicalinfo fonctionne correctement
    res.send('Medicalinfo API fonctionne !');
});

// Cette ligne est OBLIGATOIRE — elle garde le serveur actif
// Démarrage du serveur en écoutant sur le port défini, avec une fonction de rappel pour la confirmation
app.listen(PORT, () => {
    // Affichage d'un message de confirmation dans la console une fois le serveur démarré
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});