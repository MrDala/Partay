-- CREATE DATABASE
DROP DATABASE IF EXISTS PARTAY;
CREATE DATABASE PARTAY;
USE PARTAY;

-- CREATE Utilisateurs
CREATE TABLE Utilisateurs (
   Id_Utilisateur VARCHAR(36),
   MotDePasse VARCHAR(50) NOT NULL,
   Mail VARCHAR(50) UNIQUE,
   Telephone VARCHAR(50) UNIQUE,
   Pseudo VARCHAR(14) NOT NULL,
   Prenom VARCHAR(50),
   Nom VARCHAR(50),
   DateNaissance DATE NOT NULL,
   DateInscription DATETIME NOT NULL,
   DerniereConnexion DATETIME NOT NULL,
   
   PRIMARY KEY(Id_Utilisateur),
   CONSTRAINT contrainte_identifiant CHECK (
     Mail IS NOT NULL OR Telephone IS NOT NULL
   )
);

-- CREATE Contact
CREATE TABLE Contact (
   Id_Utilisateur VARCHAR(36) NOT NULL,
   Id_Contact VARCHAR(36),
   Mail VARCHAR(50),
   Telephone VARCHAR(50),
   Prenom VARCHAR(50),
   Nom VARCHAR(50),
   Pseudo VARCHAR(14),
   DateNaissance DATE,
   DateAjout DATETIME NOT NULL,

   PRIMARY KEY(Id_Utilisateur),
   FOREIGN KEY(Id_Utilisateur) REFERENCES Utilisateurs(Id_Utilisateur),
   CONSTRAINT contrainte_interne_exeterne CHECK (
       (Id_Contact IS NOT NULL) OR
       ((Mail IS NOT NULL OR Telephone IS NOT NULL) AND
       (Prenom IS NOT NULL OR Nom IS NOT NULL OR Pseudo IS NOT NULL))
   )
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
