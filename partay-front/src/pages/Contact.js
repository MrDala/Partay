import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import Content from "../composants/Content";

function Contact() {
  const { utilisateur } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!utilisateur) {
      navigate('/connexion');
    }
  }, [utilisateur, navigate]);

  return (
    <Content className="Contact">
      <h1>Accueil</h1>
    </Content>
  );
}

export default Contact; 