const CodeErreur = require("./CodeErreur");

const contrainteMotDePasse = (MotDePasse) => {
  if (!/.{14,}/.test(MotDePasse)) {
    return CodeErreur.MDP_TAILLE;

  } else if (!/[A-Z]/.test(MotDePasse)) {
    return CodeErreur.MDP_MAJUSCULE;

  } else if (!/[a-z]/.test(MotDePasse)) {
    return CodeErreur.MDP_MINUSCULE;

  } else if (!/[0-9]/.test(MotDePasse)) {
    return CodeErreur.MDP_CHIFFRE;

  } else if (!/\W/.test(MotDePasse)) {
    return CodeErreur.MDP_CARACTERE_SPECIAL;
  }

  return true;
};

module.exports = {contrainteMotDePasse}



