import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { api } from '../../api/Api';

function AccueilUtilisateur() {
  const { utilisateur } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!utilisateur) {
      navigate('/connexion');
    }
  }, [utilisateur, navigate]);

  function ajoutContact() {
    api.ajoutContact({Id_Utilisateur : "2e2c054b-32b6-4e5f-91ac-57df854a2c70", Id_Contact:"9441ed7b-87b3-4d3b-9753-19c7ce75c67c"});
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
    <div className="AccueilUtilisateur">
      <h1>Accueil</h1>
      <button onClick={() => ajoutContact()}>Ajout Contact</button>
      <button onClick={() => getContact()}>Voir Contacts</button>
    </div>
  );
}

export default AccueilUtilisateur; 