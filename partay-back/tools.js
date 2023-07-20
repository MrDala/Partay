const CodeErreur = require("./CodeErreur");

const contrainteMotDePasse = (MotDePasse) => {

  const taille = /.{14,}/;
  const majuscule = /[A-Z]/;
  const minuscule = /[a-z]/;
  const chiffre = /[0-9]/;
  const specialChar = /\W/;

  if (!taille.test(MotDePasse)) {
    return CodeErreur.MDP_TAILLE;

  } else if (!majuscule.test(MotDePasse)) {
    return CodeErreur.MDP_MAJUSCULE;

  } else if (!minuscule.test(MotDePasse)) {
    return CodeErreur.MDP_MINUSCULE;

  } else if (!chiffre.test(MotDePasse)) {
    return CodeErreur.MDP_CHIFFRE;

  } else if (!specialChar.test(MotDePasse)) {
    return CodeErreur.MDP_CARACTERE_SPECIAL;
  }

  return true;
};

module.exports = {contrainteMotDePasse}



