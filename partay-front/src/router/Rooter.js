import { createBrowserRouter } from "react-router-dom";
import AccueilUtilisateur from "../pages/AccueilUtilisateur";
import Connexion from "../pages/Connexion";
import Accueil from "../pages/Accueil";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />
  },
  {
    path: "/accueil-utilisateur",
    element: <AccueilUtilisateur />
  },
  {
    path: "/connexion",
    element: <Connexion /> 
  }
]);

