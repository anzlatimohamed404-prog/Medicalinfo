

// Importation du framework Express pour construire l'application web
const express = require('express');

// Importation du module mysql2 pour interagir avec la base de données MySQL
const mysql2 = require('mysql2');

// Importation du module express-myconnection pour gérer les connexions MySQL dans Express
const myconnection = require('express-myconnection');

// Création d'une instance de l'application Express
const app = express();


// ==========================
// MIDDLEWARES
// ==========================

// Ajout d'un middleware pour analyser les corps de requêtes JSON
app.use(express.json());

// Ajout d'un middleware pour analyser les corps de requêtes encodés en URL (formulaires HTML)
app.use(express.urlencoded({ extended: true }));


// ==========================
// CONNEXION MYSQL
// ==========================

// Définition des options de connexion à la base de données MySQL
const optionsConnexion = {
    // Adresse IP ou nom d'hôte du serveur MySQL
    host: "localhost",

    // Nom d'utilisateur pour se connecter à MySQL
    user: "root",

    // Mot de passe pour l'utilisateur MySQL
    password: "Irwane240319",

    // Nom de la base de données à utiliser
    database: "medicalinfo",

    // Numéro de port sur lequel MySQL écoute (par défaut 3306)
    port: 3306
};

// Configuration de la connexion MySQL en mode pool pour une gestion efficace des connexions
app.use(myconnection(mysql2, optionsConnexion, "pool"));
// Active la connexion MySQL en mode pool


// ==========================
// CONFIG VUES
// ==========================

app.set('views', './views');
// Dossier des fichiers EJS

app.set('view engine', 'ejs');
// Moteur de templates EJS

app.use(express.static('public'));
// Sert les fichiers statiques du dossier public


// ==========================
// ACCUEIL
// ==========================

app.get('/', (req, res) => {
// Route GET racine

    res.redirect('/api/accueil');
    // Redirige vers l'accueil
});

app.get('/api/accueil', (req, res) => {
// Route GET accueil

    res.render('accueil');
    // Affiche views/accueil.ejs
});


// ==========================
// PATIENTS
// ==========================

app.get('/api/patients', (req, res) => {
// Route GET — affiche la liste des patients

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query("SELECT * FROM patients", [], (err, resultatPatients) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.render('patients', { resultatPatients });
            // Affiche patients.ejs avec les données
        });
    });
});

app.post('/api/patients', (req, res) => {
// Route POST — ajoute un patient

    const { nom, prenom, date_naissance, sexe, date_admission, service_affecte, statut } = req.body;
    // Récupère les champs du formulaire

    const sql = `INSERT INTO patients (nom, prenom, date_naissance, sexe, date_admission, service_affecte, statut) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    // Requête SQL d'insertion

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query(sql, [nom, prenom, date_naissance, sexe, date_admission, service_affecte, statut], (err) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.redirect('/api/patients');
            // Redirige vers la liste
        });
    });
});

app.delete('/api/patients/:id', (req, res) => {
// Route DELETE — supprime un patient

    const id = req.params.id;
    // Récupère l'id depuis l'URL

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query("DELETE FROM patients WHERE id_patient = ?", [id], (err) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.status(200).json({ message: "Supprimé" });
            // Succès
        });
    });
});


// ==========================
// MEDECINS
// ==========================

app.get('/api/medecins', (req, res) => {
// Route GET — affiche la liste des médecins

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query("SELECT * FROM medecins", [], (err, resultatMedecins) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.render('medecins', { resultatMedecins });
            // Affiche medecins.ejs avec les données
        });
    });
});

app.post('/api/medecins', (req, res) => {
// Route POST — ajoute un médecin

    const { nom, prenom, specialite, service_affecte } = req.body;
    // Récupère les champs du formulaire

    const sql = `INSERT INTO medecins (nom, prenom, specialite, service_affecte) VALUES (?, ?, ?, ?)`;
    // Requête SQL d'insertion

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query(sql, [nom, prenom, specialite, service_affecte], (err) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.redirect('/api/medecins');
            // Redirige vers la liste
        });
    });
});

app.delete('/api/medecins/:id', (req, res) => {
// Route DELETE — supprime un médecin

    const id = req.params.id;
    // Récupère l'id depuis l'URL

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query("DELETE FROM medecins WHERE id_medecin = ?", [id], (err) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.status(200).json({ message: "Supprimé" });
            // Succès
        });
    });
});


// ==========================
// SERVICES
// ==========================

app.get('/api/services', (req, res) => {
// Route GET — affiche la liste des services

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query("SELECT * FROM services", [], (err, resultatServices) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.render('services', { resultatServices });
            // Affiche services.ejs avec les données
        });
    });
});

app.post('/api/services', (req, res) => {
// Route POST — ajoute un service

    const { nom_service, responsable, capacite } = req.body;
    // Récupère les champs du formulaire

    const sql = `INSERT INTO services (nom_service, responsable, capacite) VALUES (?, ?, ?)`;
    // Requête SQL d'insertion

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query(sql, [nom_service, responsable, capacite], (err) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.redirect('/api/services');
            // Redirige vers la liste
        });
    });
});

app.delete('/api/services/:id', (req, res) => {
// Route DELETE — supprime un service

    const id = req.params.id;
    // Récupère l'id depuis l'URL

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query("DELETE FROM services WHERE id_service = ?", [id], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Erreur SQL", erreur: err });
                // Renvoie l'erreur
            }

            res.status(200).json({ message: "Service supprimé" });
            // Succès
        });
    });
});


// ==========================
// RENDEZ-VOUS
// ==========================

app.get('/api/rendezvous', (req, res) => {
// Route GET — affiche la liste des rendez-vous

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query("SELECT * FROM rendez_vous", (err, resultatRdv) => {
            if (err) return console.log(err);
            // Erreur SQL

            res.render('rendezvous', { resultatRdv });
            // Affiche rendezvous.ejs avec les données
        });
    });
});

app.post('/api/rendezvous', (req, res) => {
// Route POST — ajoute un rendez-vous

    const { patient_id, medecin_id, date_rdv, motif, statut } = req.body;
    // Récupère les champs du formulaire

    const sql = `INSERT INTO rendez_vous (patient_id, medecin_id, date_rdv, motif, statut) VALUES (?, ?, ?, ?, ?)`;
    // Requête SQL d'insertion

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query(sql, [patient_id, medecin_id, date_rdv, motif, statut], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Erreur SQL", erreur: err });
                // Renvoie l'erreur
            }

            res.redirect('/api/rendezvous');
            // Redirige vers la liste
        });
    });
});

app.delete('/api/rendezvous/:id', (req, res) => {
// Route DELETE — supprime un rendez-vous

    const id = req.params.id;
    // Récupère l'id depuis l'URL

    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        // Erreur de connexion

        connection.query("DELETE FROM rendez_vous WHERE id_rdv = ?", [id], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Erreur SQL", erreur: err });
                // Renvoie l'erreur
            }

            res.status(200).json({ message: "Rendez-vous supprimé" });
            // Succès
        });
    });
});

// Route pour afficher la page recherche
app.get('/recherche', (req, res) => {

    // On récupère ce que l'utilisateur a tapé dans l'input
    // (req.query.query vient du formulaire)
    const query = req.query.query?.toLowerCase();

    // Exemple de liste de patients (à remplacer plus tard par une base de données)
    let patients = [
        { prenom: "zamrati", dateNaissance: "2010-04-24" },
        { prenom: "habachia", dateNaissance: "2002-06-03" },
        { prenom: "andjouzati", dateNaissance: "2000-11-23" }
    ];

    // Tableau vide pour stocker les résultats
    let resultats = [];

    // Si l'utilisateur a écrit quelque chose
    if (query) {

        // On filtre les patients
        resultats = patients.filter(p =>

            // Vérifie si le prénom contient ce que l'utilisateur a tapé
            p.prenom.toLowerCase().includes(query)

            // OU si la date correspond
            || p.dateNaissance.includes(query)
        );
    }

    // On envoie les résultats à la page recherche.ejs
    res.render('recherche', { patients: resultats });
});


// ==========================
// EXPORT
// ==========================

module.exports = app;
// Exporte l'application pour serveur.js