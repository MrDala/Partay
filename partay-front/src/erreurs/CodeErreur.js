const CodeErreur = {
  //INSCRIPTION
  PARAM_MANQUANT: 'Tous les champs obligatoires doivent être remplis.',
  PARAM_LONGUEUR: 'Le nombre de caractères ne doit pas dépasser 50.',
  
  FORM_ERROR : 'Veuillez corriger les erreurs dans le formulaire avant de soumettre.',

  MAIL_FORMAT: 'L\'adresse mail doit être valide.',

  MDP_TAILLE: 'Le mot de passe doit contenir au moins 14 caractères.',
  MDP_MAJUSCULE: 'Le mot de passe doit contenir au moins 1 lettre majuscule.',
  MDP_MINUSCULE: 'Le mot de passe doit contenir au moins 1 lettre minuscule.',
  MDP_CHIFFRE: 'Le mot de passe doit contenir au moins 1 chiffre.',
  MDP_CARACTERE_SPECIAL: 'Le mot de passe doit contenir au moins 1 caractère spécial.',

  CONFIRM_MDP_DIFF: 'Les mots de passe doivent être identiques.',

  PSEUDO_LONGUEUR: 'Le pseudo ne doit dépasser 14 caractères.'
};

module.exports = CodeErreur;