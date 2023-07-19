import { useContext } from 'react';

import { UserContext } from '../context/UserContext';
import { api } from "../api/Api";
import Content from "../components/Content";

function Accueil() {
  const { utilisateur } = useContext(UserContext);
  console.log(utilisateur);

  function addJhon() {
    const utilisateurData = {
      Prenom: "John",
      MotDePasse: "L4)9M!5kek{v4F",
      Mail: "john@example.com",
      Telephone: "123456789",
      Nom: "Doe" 
    };

    api.insertUtilisateur(utilisateurData)
    .then(response => {
      console.log(response); // Traitez la réponse
    })
    .catch(error => {
      console.error("Erreur lors de l'insertion de l'utilisateur :", error);
    });
  }

  return (
    <Content className="Accueil">
      <h1>TEST</h1>
      <button onClick={() => addJhon() }>Ajouter Jhon</button>
    </Content>
  );
}

export default Accueil; 