import React from 'react';
import { Link } from 'react-router-dom';

function Accueil() {
  return (
    <div className='Accueil'>
      <h2>Accueil</h2>
      <div>
        <Link to="/connexion">
          <button>Connexion</button>
        </Link>
        <Link to="/inscription">
          <button>Inscription</button>
        </Link>
      </div>
    </div>
  );
}

export default Accueil;

