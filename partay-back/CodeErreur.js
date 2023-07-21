const CodeErreur = {
  //COMMUN
  ERREUR_SERVEUR: 'ERREUR_SERVEUR',
  PARAM_MANQUANT: 'PARAM_MANQUANT',

  //INSCRIPTION
  ECHEC_INSCRIPTION: 'ECHEC_INSCRIPTION',
  PARAM_LONGUEUR: 'PARAM_LONGUEUR',
  IDENTIFIANT_MANQUANT: 'IDENTIFIANT_MANQUANT',

  EMAIL_UNIQUE: 'EMAIL_UNIQUE',
  EMAIL_FORMAT : 'EMAIL_FORMAT',
  TELEPHONE_UNIQUE: 'TELEPHONE_UNIQUE',

  MDP_TAILLE: 'MDP_TAILLE',
  MDP_MAJUSCULE: 'MDP_MAJUSCULE',
  MDP_MINUSCULE: 'MDP_MINUSCULE',
  MDP_CHIFFRE: 'MDP_CHIFFRE',
  MDP_CARACTERE_SPECIAL: 'MDP_CARACTERE_SPECIAL',

  //CONNEXION
  IDENTIFIANTS_INVALIDES: 'IDENTIFIANTS_INVALIDES',
};

module.exports = CodeErreur;