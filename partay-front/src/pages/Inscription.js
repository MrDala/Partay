import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { api } from '../api/Api';
import CodeErreurServeur from '../erreurs/CodeErreurServeur';
import CodeErreur from '../erreurs/CodeErreur';
import Champ from '../composants/Champ';

function Inscription() {
  /* Déclaration des variables */
  const { utilisateur, setUtilisateur } = useContext(UserContext);
  const navigate = useNavigate();
  const [erreurMessage, setErreurMessage] = useState('');
  const [emailErreur, setEmailErreur] = useState('');
  const [telephoneErreur, setTelephoneErreur] = useState('');
  const [mdpErreur, setMdpErreur] = useState('');
  const [confirmMdpErreur, setConfirmMdpErreur] = useState('');
  const [pseudoErreur, setPseudoErreur] = useState('');
  const [dateNaissanceErreur, setDateNaissance] = useState('');
  const [prenomErreur, setPrenomErreur] = useState('');
  const [nomErreur, setNomErreur] = useState('');
  const [inscriptionData, setInscriptionData] = useState({
    Mail: '',
    Telephone: '',
    MotDePasse: '',
    ConfirmMotDePasse: '',
    Pseudo: '',
    DateNaissance: '',
    Prenom: '',
    Nom: '',
  });

  const [motDePasseValide, setMotDePasseValide] = useState({
    taille: false,
    majuscule: false,
    minuscule: false,
    chiffre: false,
    specialChar: false,
  });
  /* Fin déclaration des variables */

  /* Déclaration des fonctions */

  // Enregistrement de l'utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.inscription(inscriptionData);
      setUtilisateur(response);
    } catch (error) {
      setErreurMessage(CodeErreurServeur[error]);
    }
  };

  // Connexion de l'utilisateur une fois inscrit
  useEffect(() => {
    if (utilisateur) {
      navigate('/accueil-utilisateur');
    }
  }, [utilisateur, navigate]);

  // Vérification Adresse mail
  const handleBlurEmail = (e) => {
    const email = e.target.value;
    const errors = [];
    const emailReg = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
    );

    if (!emailReg.test(email)) {
      errors.push(CodeErreur.MAIL_FORMAT);
    }

    if (email.length > 50) {
      errors.push(CodeErreur.PARAM_LONGUEUR);
    }

    setEmailErreur(errors);
  };

  // Vérification Téléphone
  const handleChangeTelephone = (e) => {
    const telephone = e.target.value;
    const errors = [];

    if (telephone.length > 50) {
      errors.push(CodeErreur.PARAM_LONGUEUR);
    }

    setTelephoneErreur(errors);
  }

  // Vérification Mot de passe
  const handleChangeMotDePasse = (e) => {
    const motDePasse = e.target.value;
    const errors = [];
    const taille = /.{14,}/;
    const majuscule = /[A-Z]/;
    const minuscule = /[a-z]/;
    const chiffre = /[0-9]/;
    const specialChar = /\W/;

    setMotDePasseValide({
      taille: taille.test(motDePasse),
      majuscule: majuscule.test(motDePasse),
      minuscule: minuscule.test(motDePasse),
      chiffre: chiffre.test(motDePasse),
      specialChar: specialChar.test(motDePasse),
    });

    if (motDePasse.length > 50) {
      errors.push(CodeErreur.PARAM_LONGUEUR);
    }

    setMdpErreur(errors);
  };


  // Vérification que les deux mots de passe sont identiques
  const handleChangeConfirmerMotDePasse = (e) => {
    const confirmMdp = e.target.value;
    const errors = [];

    if (inscriptionData.MotDePasse != confirmMdp) {
      errors.push(CodeErreur.CONFIRM_MDP_DIFF);
    }

    setConfirmMdpErreur(errors);
  };

  // Vérification Pseudo
  const handleChangePseudo = (e) => {
    const pseudo = e.target.value;
    const errors = [];

    if (pseudo.length > 14) {
      errors.push(CodeErreur.PSEUDO_LONGUEUR)
    }

    setPseudoErreur(errors);
  };

  // Vérification Date de naissance
  const handleChangeDateNaissance = (e) => {
    const date = e.target.value;
    const errors = [];

    setPseudoErreur(errors);
  };

  // Vérification Prénom
  const handleChangePrenom = (e) => {
    const prenom = e.target.value;
    const errors = [];

    if (prenom.length > 14) {
      errors.push(CodeErreur.PARAM_LONGUEUR)
    }

    setPrenomErreur(errors);
  };

  // Vérification Nom
  const handleChangeNom = (e) => {
    const nom = e.target.value;
    const errors = [];

    if (nom.length > 14) {
      errors.push(CodeErreur.PARAM_LONGUEUR)
    }

    setNomErreur(errors);
  };

  /* Fin déclaration des fonctions */

  /* Contenu HTML */
  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <h4>Identifiant</h4>
          <Champ
            label={"Adresse mail"}
            type={"email"}
            name={"mil"}
            value={inscriptionData.Mail}
            onChange={(e) => setInscriptionData({ ...inscriptionData, Mail: e.target.value })}
            onBlur={handleBlurEmail}
            required={true}
            erreur={emailErreur}
          />
          <Champ
            label={"Numéro de téléphone"}
            type={"tel"}
            name={"telephone"}
            value={inscriptionData.Telephone}
            onChange={(e) => {
              setInscriptionData({ ...inscriptionData, Telephone: e.target.value })
              handleChangeTelephone(e);
            }}
            required={true}
            erreur={telephoneErreur}
          />
        </div>

        <div>
          <h4>Mot de passe</h4>
          <Champ
            label={"Choisir un mot de passe"}
            type={"password"}
            name={"motDePasse"}
            value={inscriptionData.MotDePasse}
            onChange={(e) => {
              setInscriptionData({ ...inscriptionData, MotDePasse: e.target.value });
              handleChangeMotDePasse(e);
            }}
            required={true}
            erreur={mdpErreur}
          >
            <p>
              Votre mot de passe doit contenir :<br />
              Au moins 14 caractères: {motDePasseValide.taille ? '✓' : '✗'}<br />
              Au moins 1 lettre majuscule: {motDePasseValide.majuscule ? '✓' : '✗'}<br />
              Au moins 1 lettre minuscule: {motDePasseValide.minuscule ? '✓' : '✗'}<br />
              Au moins 1 chiffre: {motDePasseValide.chiffre ? '✓' : '✗'}<br />
              Au moins 1 caractère spécial: {motDePasseValide.specialChar ? '✓' : '✗'}<br />
            </p>
          </Champ>
          <Champ
            label={"Confirmer le mot de passe"}
            type={"password"}
            name={"confirmMotDePasse"}
            value={inscriptionData.ConfirmMotDePasse}
            onChange={(e) => {
              setInscriptionData({ ...inscriptionData, ConfirmMotDePasse: e.target.value })
              handleChangeConfirmerMotDePasse(e);
            }}
            required={true}
            erreur={confirmMdpErreur}
          />
        </div>

        <div>
          <h4>Informations complémentaires</h4>
          <Champ
            label={"Pseudo"}
            name={"pseudo"}
            value={inscriptionData.Pseudo}
            onChange={(e) => {
              setInscriptionData({ ...inscriptionData, Pseudo: e.target.value })
              handleChangePseudo(e);
            }}
            required={true}
            erreur={pseudoErreur}
          />
          <Champ
            label={"Date de naissance"}
            type={"date"}
            name={"dateNaissance"}
            value={inscriptionData.DateNaissance}
            onChange={(e) => {
              setInscriptionData({ ...inscriptionData, DateNaissance: e.target.value })
              handleChangeDateNaissance(e);
            }}
            required={true}
            erreur={dateNaissanceErreur}
          />
          <Champ
            label={"Prénom"}
            name={"prenom"}
            value={inscriptionData.Prenom}
            onChange={(e) => {
              setInscriptionData({ ...inscriptionData, Prenom: e.target.value })
              handleChangePrenom(e);
            }}
            required={true}
            erreur={prenomErreur}
          />
          <Champ
            label={"Nom"}
            name={"nom"}
            value={inscriptionData.Nom}
            onChange={(e) => {
              setInscriptionData({ ...inscriptionData, Nom: e.target.value })
              handleChangeNom(e);
            }}
            required={true}
            erreur={nomErreur}
          />
        </div>

        {erreurMessage && <p>{erreurMessage}</p>}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
