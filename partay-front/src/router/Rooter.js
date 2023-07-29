import { createBrowserRouter } from "react-router-dom";
import AccueilUtilisateur from "../composants/pages/AccueilUtilisateur";
import Connexion from "../composants/pages/Connexion";
import Accueil from "../composants/pages/Accueil";
import Inscription from "../composants/pages/Inscription";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />
  },
  {
    path: "/inscription",
    element: <Inscription />
  },
  {
    path: "/connexion",
    element: <Connexion /> 
  },
  {
    path: "/accueil-utilisateur",
    element: <AccueilUtilisateur />
  },
]);

