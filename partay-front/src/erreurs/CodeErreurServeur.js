const CodeErreurServeur = {
  //COMMUN
  ERREUR_SERVEUR: 'Une erreur serveur est survenue.',
  PARAM_MANQUANT: 'Tous les champs obligatoire doivent être remplis.',

  //INSCRIPTION
  ECHEC_INSCRIPTION: 'Impossible de finaliser l\'inscription.',
  PARAM_LONGUEUR: 'La taille des champs est limité à 50 caractères.',
  IDENTIFIANT_MANQUANT: 'Au moins un des champs mail ou téléphone doit être saisi.',

  EMAIL_UNIQUE: 'Cette adresse mail est déjà utilisée.',
  EMAIL_FORMAT : 'L\'adresse mail ne respecte pas le format attendu.',
  TELEPHONE_UNIQUE: 'Ce numéro de téléphone est déjà utilisé.',

  MDP_TAILLE: 'Le mot de passe doit contenir au moins 14 caractères.',
  MDP_MAJUSCULE: 'Le mot de passe doit contenir au moins 1 lettre majuscule.',
  MDP_MINUSCULE: 'Le mot de passe doit contenir au moins 1 lettre minuscule.',
  MDP_CHIFFRE: 'Le mot de passe doit contenir au moins 1 chiffre.',
  MDP_CARACTERE_SPECIAL: 'Le mot de passe doit contenir au moins 1 caractère spécial.',

  //CONNEXION
  IDENTIFIANTS_INVALIDES: 'Identifiant ou mot de passe incorrect.',
};

module.exports = CodeErreurServeur;