-- ===============================
-- Créer la base de données
-- ===============================
CREATE DATABASE IF NOT EXISTS medicalinfo;
USE medicalinfo;

-- ===============================
-- Créer les tables
-- ===============================

CREATE TABLE IF NOT EXISTS patients (
    id_patient INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE,
    sexe ENUM('H','F') NOT NULL,
    date_admission DATE NOT NULL,
    service_affecte VARCHAR(100),
    statut VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS medecins (
    id_medecin INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    specialite VARCHAR(100),
    service_affecte VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS services (
    id_service INT AUTO_INCREMENT PRIMARY KEY,
    nom_service VARCHAR(100) NOT NULL,
    responsable VARCHAR(100),
    capacite INT
);

CREATE TABLE IF NOT EXISTS rendez_vous (
    id_rdv INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    medecin_id INT NOT NULL,
    date_rdv DATETIME NOT NULL,
    motif VARCHAR(255),
    statut ENUM('prévu','annulé','terminé') NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id_patient),
    FOREIGN KEY (medecin_id) REFERENCES medecins(id_medecin)
);

-- ===============================
-- Insérer des données de test
-- ===============================

INSERT INTO patients (nom, prenom, date_naissance, sexe, date_admission, service_affecte, statut) VALUES
('Dupont', 'Jean', '1985-03-15', 'H', '2026-03-01', 'Cardiologie', 'hospitalisé'),
('Martin', 'Sophie', '1992-07-22', 'F', '2026-03-15', 'Pédiatrie', 'sorti'),
('Bernard', 'Pierre', '1978-11-05', 'H', '2026-04-01', 'Urgences', 'hospitalisé');

INSERT INTO medecins (nom, prenom, specialite, service_affecte) VALUES
('Lefebvre', 'Marie', 'Cardiologie', 'Cardiologie'),
('Moreau', 'Paul', 'Pédiatrie', 'Pédiatrie'),
('Simon', 'Claire', 'Médecine générale', 'Urgences');

INSERT INTO services (nom_service, responsable, capacite) VALUES
('Cardiologie', 'Dr Lefebvre', 20),
('Pédiatrie', 'Dr Moreau', 15),
('Urgences', 'Dr Simon', 30);

INSERT INTO rendez_vous (patient_id, medecin_id, date_rdv, motif, statut) VALUES
(1, 1, '2026-04-01 10:00:00', 'Consultation générale', 'prévu'),
(2, 2, '2026-04-02 11:30:00', 'Suivi médical', 'prévu'),
(3, 3, '2026-04-03 09:00:00', 'Urgence', 'terminé');

-- ===============================
-- Requêtes utiles pour tester
-- ===============================

-- Voir tous les patients
SELECT * FROM patients;

-- Voir tous les médecins
SELECT * FROM medecins;

-- Voir tous les services
SELECT * FROM services;

-- Voir tous les rendez-vous
SELECT * FROM rendez_vous;

-- Voir les rendez-vous avec le nom du patient et du médecin
SELECT 
    rdv.id_rdv,
    p.nom AS nom_patient,
    p.prenom AS prenom_patient,
    m.nom AS nom_medecin,
    m.prenom AS prenom_medecin,
    rdv.date_rdv,
    rdv.motif,
    rdv.statut
FROM rendez_vous rdv
JOIN patients p ON rdv.patient_id = p.id_patient
JOIN medecins m ON rdv.medecin_id = m.id_medecin;

-- Voir uniquement les rendez-vous prévus
SELECT * FROM rendez_vous WHERE statut = 'prévu';

-- Supprimer un rendez-vous par son id
DELETE FROM rendez_vous WHERE id_rdv = 1;

-- Supprimer un patient par son id
DELETE FROM patients WHERE id_patient = 1;

-- Supprimer un médecin par son id
DELETE FROM medecins WHERE id_medecin = 1;