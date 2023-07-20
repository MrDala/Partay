import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { api } from '../api/Api';
import CodeErreur from '../api/CodeErreur';

function Connexion() {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const { utilisateur, setUtilisateur } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction de soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {  
      const response = await api.connexion(identifiant, motDePasse);
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
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Identifiant:</label>
          <input value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} placeholder='Téléphone ou adresse mail' />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Connexion;
