// -------------------------
// app.js corrigé complet
// -------------------------

const express = require('express');
const mysql2 = require('mysql2');
const myconnection = require('express-myconnection');

const app = express();

// ... tout ton code Express ici (middlewares, routes, etc.)

module.exports = app; // <-- important pour l'utiliser dans serveur.js
// Connexion MySQL
const optionsConnexion = {
    host: "localhost",
    user: "root",
    password: "Irwane240319",
    database: "medicalinfo",
    port: 3306
};
app.use(myconnection(mysql2, optionsConnexion, "pool"));

// Vues et fichiers statiques
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));


// -------------------------
// PAGE ACCUEIL
// -------------------------

// Redirige la racine vers /api/accueil
app.get('/', (req, res) => {
    res.redirect('/api/accueil');
});

// Affiche la page d'accueil
app.get('/api/accueil', (req, res) => {
    console.log('Je passe dans /api/accueil');
    res.render('accueil'); // <-- C’est ici que l’erreur se produit
});
// -------------------------
// PATIENTS
// -------------------------
app.get('/api/patients', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        connection.query("SELECT * FROM patients", [], (err, resultatPatients) => {
            if (err) return console.log("Erreur SQL SELECT patients :", err);
            res.render('patients', { resultatPatients });
        });
    });
});

app.post('/api/patients', (req, res) => {
    const { nom, prenom, date_naissance, sexe, date_admission, service_affecte, statut } = req.body;
    const requeteSql = `
        INSERT INTO patients 
        (nom, prenom, date_naissance, sexe, date_admission, service_affecte, statut) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const ordreChamps = [nom, prenom, date_naissance, sexe, date_admission, service_affecte, statut];

    req.getConnection((err, connection) => {
        if (err) return console.log("Erreur connexion :", err);
        connection.query(requeteSql, ordreChamps, (err) => {
            if (err) return console.log("Erreur ajout patient :", err);
            res.redirect('/api/patients');
        });
    });
});

app.delete('/api/patients/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, connection) => {
        if (err) return console.log("Erreur connexion :", err);
        connection.query("DELETE FROM patients WHERE id_patient = ?", [id], (err) => {
            if (err) return console.log("Erreur suppression patient :", err);
            res.status(200).json({ routeAccueil: "/api/patients" });
        });
    });
});

// -------------------------
// MEDECINS
// -------------------------
app.get('/api/medecins', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        connection.query("SELECT * FROM medecins", [], (err, resultatMedecins) => {
            if (err) return console.log("Erreur SQL SELECT medecins :", err);
            res.render('medecins', { resultatMedecins });
        });
    });
});

app.post('/api/medecins', (req, res) => {
    const { nom, prenom, specialite, service_affecte } = req.body;
    const requeteSql = `
        INSERT INTO medecins 
        (nom, prenom, specialite, service_affecte) 
        VALUES (?, ?, ?, ?)
    `;
    req.getConnection((err, connection) => {
        if (err) return console.log("Erreur connexion :", err);
        connection.query(requeteSql, [nom, prenom, specialite, service_affecte], (err) => {
            if (err) return console.log("Erreur ajout médecin :", err);
            res.redirect('/api/medecins');
        });
    });
});

app.delete('/api/medecins/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, connection) => {
        if (err) return console.log("Erreur connexion :", err);
        connection.query("DELETE FROM medecins WHERE id_medecin = ?", [id], (err) => {
            if (err) return console.log("Erreur suppression médecin :", err);
            res.status(200).json({ routeAccueil: "/api/medecins" });
        });
    });
});

// -------------------------
// SERVICES
// -------------------------
app.get('/api/services', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        connection.query("SELECT * FROM services", [], (err, resultatServices) => {
            if (err) return console.log("Erreur SQL SELECT services :", err);
            res.render('services', { resultatServices });
        });
    });
});

app.post('/api/services', (req, res) => {
    const { nom_service, responsable, capacite } = req.body;
    const requeteSql = `
        INSERT INTO services 
        (nom_service, responsable, capacite) 
        VALUES (?, ?, ?)
    `;
    req.getConnection((err, connection) => {
        if (err) return console.log("Erreur connexion :", err);
        connection.query(requeteSql, [nom_service, responsable, capacite], (err) => {
            if (err) return console.log("Erreur ajout service :", err);
            res.redirect('/api/services');
        });
    });
});

// -------------------------
// RENDEZ-VOUS
// -------------------------
// Route pour afficher tous les rendez-vous
// Route pour afficher tous les rendez-vous
app.get('/api/rendezvous', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return console.log(err);

        connection.query("SELECT * FROM rendez_vous", (err, resultatRdv) => {
            if (err) return console.log(err);
            
            // On rend la vue 'rendezvous.ejs'
            res.render('rendezvous', { resultatRdv });
        });
    });
});

// -------------------------
// SERVEUR
// -------------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));