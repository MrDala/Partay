import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import Content from "../composants/Content";
import "../css/pages/AccueilUtilisateur.css";
import { api } from '../api/Api';

function AccueilUtilisateur() {
  const { utilisateur } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!utilisateur) {
      navigate('/connexion');
    }
  }, [utilisateur, navigate]);

  function ajoutContact() {
    api.ajoutContact({Id_Utilisateur : "9c7781c3-44be-417c-8360-7941c40a5501", Id_Contact:"9c7781c3-44be-417c-8360-7941c40a5501"});
  }

  async function getContact() {
    try {
      const contacts = await api.getContacts(utilisateur.Id_Utilisateur);
      console.log(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }
  

  return (
    <Content className="AccueilUtilisateur">
      <h1>Accueil</h1>
      <button onClick={() => ajoutContact()}>Ajout Contact</button>
      <button onClick={() => getContact()}>Voir Contacts</button>
    </Content>
  );
}

export default AccueilUtilisateur; 