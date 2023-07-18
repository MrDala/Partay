import { api } from "../api/Api";

function Accueil() {

  api.testConnexion();

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
    <div>
      <h1>TEST</h1>
      <button onClick={() => addJhon() }>Ajouter Jhon</button>
    </div>
  );
}

export default Accueil; 