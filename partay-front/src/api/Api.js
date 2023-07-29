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
      const connexion = await this.get(`/test/`);
      console.log(connexion);
    } catch (error) {
      console.error("Connexion KO " + error);
    }
  }

  async inscription(utilisateurData) {
    try {
      const response = await this.post('/utilisateurs/ajout', utilisateurData);
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

  async getContacts(Id_Utilisateur) {
    try {
      const response = await this.get(`/contacts/${Id_Utilisateur}`);
      return response;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

  async ajoutContact(contactData) {
    try {
      const response = await this.post('/contacts/ajout', contactData);
      return response.message;
    } catch (error) {
      throw error.response.data.erreur;
    }
  }

}

export const api = new Api("http://localhost:3000");
