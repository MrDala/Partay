import { createBrowserRouter } from "react-router-dom";
import AccueilUtilisateur from "../pages/AccueilUtilisateur";
import Connexion from "../pages/Connexion";
import Accueil from "../pages/Accueil";
import Inscription from "../pages/Inscription";


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

