import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { api } from '../api/Api';
import CodeErreur from '../api/CodeErreur';

function Inscription() {
  const { utilisateur, setUtilisateur } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.inscription(inscriptionData);
      setUtilisateur(response);
    } catch (error) {
      setErrorMessage(CodeErreur[error]);
    }
  };

  useEffect(() => {
    // Rediriger vers la page principale si l'utilisateur est connecté
    if (utilisateur) {
      navigate('/accueil-utilisateur');
    }
  }, [utilisateur, navigate]);

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Identifiant</h4>
          <div>
            <label>Adresse mail :</label>
            <input
              type="email"
              name="mail"
              value={inscriptionData.Mail}
              onChange={(e) => setInscriptionData({ ...inscriptionData, Mail: e.target.value })}
              placeholder='Adresse mail'
              required={true}
            />
          </div>
          <div>
            <label>Numéro de téléphone :</label>
            <input
              type="tel"
              name="telephone"
              value={inscriptionData.Telephone}
              onChange={(e) => setInscriptionData({ ...inscriptionData, Telephone: e.target.value })}
              placeholder='Téléphone'
              required={true}
            />
          </div>
        </div>

        <div>
          <h4>Mot de passe</h4>
          <div>
            <label>Choisir un mot de passe :</label>
            <input
              type='password'
              name="motDePasse"
              value={inscriptionData.MotDePasse}
              onChange={(e) => setInscriptionData({ ...inscriptionData, MotDePasse: e.target.value })}
              placeholder='Mot de passe'
              required={true}
            />
          </div>
          <div>
            <label>Confirmer le mot de passe :</label>
            <input
              type='password'
              name="confirmMotDePasse"
              value={inscriptionData.ConfirmMotDePasse}
              onChange={(e) => setInscriptionData({ ...inscriptionData, ConfirmMotDePasse: e.target.value })}
              placeholder='Confirmer le mot de passe'
              required={true}
            />
          </div>
        </div>

        <div>
          <h4>Informations complémentaires</h4>
          <div>
            <label>Pseudo :</label>
            <input
              name="pseudo"
              value={inscriptionData.Pseudo}
              onChange={(e) => setInscriptionData({ ...inscriptionData, Pseudo: e.target.value })}
              placeholder='Pseudo'
              required={true}
            />
          </div>
          <div>
            <label>Date de naissance :</label>
            <input
              type="date"
              name="dateNaissance"
              value={inscriptionData.DateNaissance}
              onChange={(e) => setInscriptionData({ ...inscriptionData, DateNaissance: e.target.value })}
              required={true}
            />
          </div>
          <div>
            <label>Prénom</label>
            <input
              name="prenom"
              value={inscriptionData.Prenom}
              onChange={(e) => setInscriptionData({ ...inscriptionData, Prenom: e.target.value })}
              placeholder='Prénom'
              required={true}
            />
          </div>
          <div>
            <label>Nom :</label>
            <input
              name="nom"
              value={inscriptionData.Nom}
              onChange={(e) => setInscriptionData({ ...inscriptionData, Nom: e.target.value })}
              placeholder='Nom'
              required={true}
            />
          </div>
        </div>

        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
