class CardService {
    apiBaseUrl: string;

    constructor(apiBaseUrl: string) {
      this.apiBaseUrl = apiBaseUrl;
    }
  
    // Función para obtener los encabezados comunes
    private getHeaders() {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autorización no disponible');
      }
      return {
        'Content-Type': 'application/json',
        Authorization: token,  // Usamos el token que hemos recuperado del almacenamiento local
      };
    }

    // GET: Find cards by account id
    async getCardsByAccountId(accountId: string) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/api/accounts/${accountId}/cards`, {
          method: 'GET',
          headers: this.getHeaders(),  // Utilizamos los encabezados generados
        });
        if (!response.ok) throw new Error('Error fetching cards');
        return await response.json();
      } catch (error) {
        console.error('Error getting cards:', error);
        throw error;
      }
    }
  
    // POST: Create a new card associated to the account
    async createCard(accountId: string, cardData: object) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/api/accounts/${accountId}/cards`, {
          method: 'POST',
          headers: this.getHeaders(),  // Utilizamos los encabezados generados
          body: JSON.stringify(cardData),
        });
        if (!response.ok) throw new Error('Error creating card');
        return await response.json();
      } catch (error) {
        console.error('Error creating card:', error);
        throw error;
      }
    }
  
    // GET: Find a card by card_id and account_id
    async getCardById(accountId: string, cardId: string) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/api/accounts/${accountId}/cards/${cardId}`, {
          method: 'GET',
          headers: this.getHeaders(),  // Utilizamos los encabezados generados
        });
        if (!response.ok) throw new Error('Error fetching card');
        return await response.json();
      } catch (error) {
        console.error('Error getting card:', error);
        throw error;
      }
    }
  
    // DELETE: Delete a card associated to the account
    async deleteCard(accountId: string, cardId: string) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/api/accounts/${accountId}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this.getHeaders(),  // Utilizamos los encabezados generados
        });
        if (!response.ok) throw new Error('Error deleting card');
        return await response.json();
      } catch (error) {
        console.error('Error deleting card:', error);
        throw error;
      }
    }
}

const cardService = new CardService('https://digitalmoney.digitalhouse.com');

export default cardService;
