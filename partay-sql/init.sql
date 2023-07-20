-- CREATE DATABASE
DROP DATABASE IF EXISTS PARTAY;
CREATE DATABASE PARTAY;
USE PARTAY;

-- CREATE Utilisateurs
CREATE TABLE Utilisateurs (
   Id_Utilisateur VARCHAR(36),
   MotDePasse VARCHAR(50) NOT NULL,
   Mail VARCHAR(50) UNIQUE NOT NULL,
   Telephone VARCHAR(50) UNIQUE,
   Prenom VARCHAR(50) NOT NULL,
   Nom VARCHAR(50) NOT NULL,
   Pseudo VARCHAR(14) NOT NULL,
   DateNaissance DATE NOT NULL,
   DateInscription DATETIME NOT NULL,
   DerniereConnexion DATETIME NOT NULL,
   
   PRIMARY KEY(Id_Utilisateur)
);

-- CREATE Evenements
CREATE TABLE Evenements (
   Id_Evenement VARCHAR(36),
   Organisateur VARCHAR(36) NOT NULL,
   Lieu VARCHAR(50),
   DateDebut DATETIME NOT NULL,
   DateFin DATETIME,
   DateCreation DATETIME NOT NULL,
   DateModification DATETIME NOT NULL,
   
   PRIMARY KEY(Id_Evenement),
   FOREIGN KEY(Organisateur) REFERENCES Utilisateurs(Id_Utilisateur)
);

-- CREATE Invitations
CREATE TABLE Invitations (
   Id_Utilisateur VARCHAR(36),
   Id_Evenement VARCHAR(36),
   Reponse BOOL,
   DateInvitation DATETIME NOT NULL,
   DateModification DATETIME NOT NULL,
   
   PRIMARY KEY(Id_Utilisateur, Id_Evenement),
   FOREIGN KEY(Id_Utilisateur) REFERENCES Utilisateurs(Id_Utilisateur),
   FOREIGN KEY(Id_Evenement) REFERENCES Evenements(Id_Evenement)
);
