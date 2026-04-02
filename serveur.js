
// Ce fichier est responsable du démarrage du serveur Express

// Importation de l'application Express définie dans le fichier app.js
const app = require('./app');

// Définition du numéro de port sur lequel le serveur va écouter les connexions
const PORT = 3000;

// Démarrage du serveur en écoutant sur le port spécifié, avec une fonction de rappel exécutée une fois le serveur prêt
app.listen(PORT, () => {
    // Affichage d'un message dans la console pour confirmer que le serveur a démarré avec succès
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});