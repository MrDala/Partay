import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

function Contact() {
  const { utilisateur } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!utilisateur) {
      navigate('/connexion');
    }
  }, [utilisateur, navigate]);

  return (
    <div className="Contact">
      <h1>Contact</h1>
    </div>
  );
}

export default Contact; 