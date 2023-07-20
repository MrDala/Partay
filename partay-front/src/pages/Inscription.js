import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { api } from '../api/Api';
import CodeErreurServeur from '../erreurs/CodeErreurServeur';
import CodeErreur from '../erreurs/CodeErreur';
import Champ from '../composants/Champ';

function Inscription() {
  /* --------------------- DECLARATION DES VARIABLES  ---------------------*/
  const { utilisateur, setUtilisateur } = useContext(UserContext);
  const navigate = useNavigate();
  const [erreurMessage, setErreurMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
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

  const validationFunctions = {
    Mail: validateEmail,
    Telephone: validateTelephone,
    MotDePasse: validateMotDePasse,
    ConfirmMotDePasse: validateConfirmerMotDePasse,
    Pseudo: validatePseudo,
    DateNaissance: validateDateNaissance,
    Prenom: validatePrenom,
    Nom: validateNom,
  };

  /* ---------- FONCTION COMPORTEMENT PAGE  ---------*/
  // Envoi du formulaire pour création de compte
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const response = await api.inscription(inscriptionData);
        setUtilisateur(response);
      } catch (error) {
        setErreurMessage(CodeErreurServeur[error]);
      }
    } else {
      setErreurMessage("Veuillez corriger les erreurs dans le formulaire avant de soumettre.");
    }
  };

  // Redirection une fois l'utilisateur inscrit
  useEffect(() => {
    if (utilisateur) {
      navigate('/accueil-utilisateur');
    }
  }, [utilisateur, navigate]);

  // Vérification dynamique des champs
  const handleInputChange = (e) => {
    setInscriptionData({ ...inscriptionData, [e.target.name]: e.target.value });
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const fieldErrors = validationFunctions[fieldName](fieldValue);

    // Mettre à jour l'erreur du champ spécifique
    setFormErrors({ ...formErrors, [fieldName]: fieldErrors });
  };

  /* --------------------- FONCTIONS DE VALIDATION DES CHAMPS  ---------------------*/
  // Fonction de validation pour l'adresse email
  function validateEmail(email) {
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

    return errors;
  }

  // Fonction de validation pour le numéro de téléphone
  function validateTelephone(telephone) {
    const errors = [];

    if (telephone.length > 50) {
      errors.push(CodeErreur.PARAM_LONGUEUR);
    }

    return errors;
  }

  // Fonction de validation pour le mot de passe
  function validateMotDePasse(motDePasse) {
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

    return errors;
  }

  // Fonction de validation pour la confirmation du mot de passe
  function validateConfirmerMotDePasse(confirmMdp) {
    const errors = [];

    if (inscriptionData.MotDePasse !== confirmMdp) {
      errors.push(CodeErreur.CONFIRM_MDP_DIFF);
    }

    return errors;
  }

  // Fonction de validation pour le pseudo
  function validatePseudo(pseudo) {
    const errors = [];

    if (pseudo.length > 14) {
      errors.push(CodeErreur.PSEUDO_LONGUEUR);
    }

    return errors;
  }

  // Fonction de validation pour la date de naissance
  function validateDateNaissance(date) {
    return [];
  }

  // Fonction de validation pour le prénom
  function validatePrenom(prenom) {
    const errors = [];

    if (prenom.length > 50) {
      errors.push(CodeErreur.PARAM_LONGUEUR);
    }

    return errors;
  }

  // Fonction de validation pour le nom
  function validateNom(nom) {
    const errors = [];

    if (nom.length > 50) {
      errors.push(CodeErreur.PARAM_LONGUEUR);
    }

    return errors;
  }

  function validateField(fieldName, value) {
    return validationFunctions[fieldName](value);
  }

  function validateForm() {
    const errors = {};
    let isFormValid = true;

    for (const fieldName in inscriptionData) {
      const fieldValue = inscriptionData[fieldName];
      const fieldErrors = validateField(fieldName, fieldValue);
      errors[fieldName] = fieldErrors;
      if (fieldErrors.length > 0) {
        isFormValid = false;
      }
    }

    setFormErrors(errors);
    return isFormValid;
  }

  /* --------------------- FIN  ---------------------*/

  /* Contenu HTML */
  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <div>
          <h4>Identifiant</h4>
          <Champ
            label={"Adresse mail"}
            type={"email"}
            name={"Mail"}
            value={inscriptionData.Mail}
            onChange={handleInputChange}
            required={true}
            erreur={formErrors.Mail}
          />
          <Champ
            label={"Numéro de téléphone"}
            type={"tel"}
            name={"Telephone"}
            value={inscriptionData.Telephone}
            onChange={handleInputChange}
            required={true}
            erreur={formErrors.Telephone}
          />
        </div>

        <div>
          <h4>Mot de passe</h4>
          <Champ
            label={"Choisir un mot de passe"}
            type={"password"}
            name={"MotDePasse"}
            value={inscriptionData.MotDePasse}
            onChange={handleInputChange}
            required={true}
            erreur={formErrors.MotDePasse}
          >
            <p>
              Votre mot de passe doit contenir :<br />
              Au moins 14 caractères: {motDePasseValide?.taille ? '✓' : '✗'}<br />
              Au moins 1 lettre majuscule: {motDePasseValide?.majuscule ? '✓' : '✗'}<br />
              Au moins 1 lettre minuscule: {motDePasseValide?.minuscule ? '✓' : '✗'}<br />
              Au moins 1 chiffre: {motDePasseValide?.chiffre ? '✓' : '✗'}<br />
              Au moins 1 caractère spécial: {motDePasseValide?.specialChar ? '✓' : '✗'}<br />
            </p>
          </Champ>
          <Champ
            label={"Confirmer le mot de passe"}
            type={"password"}
            name={"ConfirmMotDePasse"}
            value={inscriptionData.ConfirmMotDePasse}
            onChange={handleInputChange}
            required={true}
            erreur={formErrors.ConfirmMotDePasse}
          />
        </div>

        <div>
          <h4>Informations complémentaires</h4>
          <Champ
            label={"Pseudo"}
            name={"Pseudo"}
            value={inscriptionData.Pseudo}
            onChange={handleInputChange}
            required={true}
            erreur={formErrors.Pseudo}
          />
          <Champ
            label={"Date de naissance"}
            type={"date"}
            name={"DateNaissance"}
            value={inscriptionData.DateNaissance}
            onChange={handleInputChange}
            required={true}
            erreur={formErrors.DateNaissance}
          />
          <Champ
            label={"Prénom"}
            name={"Prenom"}
            value={inscriptionData.Prenom}
            onChange={handleInputChange}
            required={true}
            erreur={formErrors.Prenom}
          />
          <Champ
            label={"Nom"}
            name={"Nom"}
            value={inscriptionData.Nom}
            onChange={handleInputChange}
            required={true}
            erreur={formErrors.Nom}
          />
        </div>

        {erreurMessage && <p>{erreurMessage}</p>}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
