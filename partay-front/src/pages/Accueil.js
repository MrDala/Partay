import { api } from '../api/Api';

function Accueil() {

  function addJhon() {
    const utilisateurData = {
      Prenom: "John",
      MotDePasse: "L4)9M!5kek{v4F",
      Mail: "john@example.com",
      Telephone: "123456789",
      Nom: "Doe" 
    };

    api.inscription(utilisateurData)
    .then(response => {
      console.log(response); // Traitez la réponse
    })
    .catch(error => {
      console.error("Erreur lors de l'insertion de l'utilisateur :", error);
    });
  }

  return (
    <div>
      <h2>Accueil</h2>
      <button onClick={() => addJhon() }>Ajouter Jhon</button>
    </div>
  );
}

export default Accueil;
