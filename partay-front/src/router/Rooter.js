import { createBrowserRouter } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Connexion from "../pages/Connexion";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />
  },
  {
    path: "/Connexion",
    element: <Connexion /> 
  }
]);

