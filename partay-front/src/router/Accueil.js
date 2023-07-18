import { createBrowserRouter } from "react-router-dom";
import Accueil from "../pages/Accueil";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />
  }
]);

