import { api } from "../api/Api";

function Home() {

  api.testConnexion(); // Exemple d'appel GET à une route '/api/data' sur le serveur

  return (
    <div>
      <h1>TEST</h1>
    </div>
  );
}

export default Home; 