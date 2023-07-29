import axios from "axios";

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /** FONCTIONS GENERIQUE */

  async get(url) {
    try {
      const response = await axios.get(`${this.baseUrl}${url}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(url, body) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.post(`${this.baseUrl}${url}`, body, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(url, body) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.put(`${this.baseUrl}${url}`, body, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(url) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.delete(`${this.baseUrl}${url}`, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /** END FONCTIONS GENERIQUE */

  async testConnexion() {
    try {
      const connexion = await this.get(`/test/test`);
      console.log(connexion);
    } catch (error) {
      console.error("Connexion KO " + error);
    }
  }

  /** UTILISATEURS */

  async ajouterUtilisateur(utilisateurData) {
    try {
      const response = await this.post('/utilisateurs/ajout', utilisateurData);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async modifierUtilisateur(utilisateurData) {
    try {
      const response = await this.put(`/utilisateurs/modification/${utilisateurData.Id_Utilisateur}`, utilisateurData);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async supprimerUtilisateur(Id_Utilisateur) {
    try {
      const response = await this.delete(`/utilisateurs/suppression/${Id_Utilisateur}`);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async connexion(identifiant, motDePasse) {
    try {
      const body = {
        identifiant: identifiant,
        motDePasse: motDePasse
      };
      const response = await this.post('/utilisateurs/connexion', body);
      return response;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  /** CONTACTS */

  async ajoutContact(contactData) {
    try {
      const response = await this.post('/contacts/ajout', contactData);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async supprimerContact(Id_Contact) {
    try {
      const response = await this.delete(`/contacts/suppression/${Id_Contact}`);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async getContacts(Id_Utilisateur) {
    try {
      const response = await this.get(`/contacts/${Id_Utilisateur}`);
      return response;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  /** EVENEMENTS */

  async ajoutEvenement(evenementData) {
    try {
      const response = await this.post('/evenements/ajout', evenementData);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async modifierEvenement(evenementData) {
    try {
      const response = await this.put(`/evenements/modification/${evenementData.Id_Evenement}`, evenementData);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async supprimerEvenement(Id_Evenement) {
    try {
      const response = await this.delete(`/evenements/suppression/${Id_Evenement}`);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async getDetailEvenement(Id_Evenement) {
    try {
      const response = await this.get(`/evenements/${Id_Evenement}`);
      return response;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async getListeEvenementsOrganisateur(Id_Utilisateur) {
    try {
      const response = await this.get(`/evenements/organisateur/${Id_Utilisateur}`);
      return response;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  /** INVITATIONS */

  async ajoutInvitation(invitationData) {
    try {
      const response = await this.post('/invitation/ajout', invitationData);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async reponseInvitation(Id_Invitation, reponse) {
    try {
      const response = await this.put(`/invitations/reponse/${Id_Invitation}`, reponse);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async supprimerInvitation(Id_Invitation) {
    try {
      const response = await this.delete(`/invitations/suppression/${Id_Invitation}`);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }
}

export const api = new Api("http://localhost:3000");
