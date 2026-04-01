
// Ce fichier démarre le serveur HTTP pour Medicalinfo
// Il importe l'application Express depuis app.js

const app = require('./app');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});