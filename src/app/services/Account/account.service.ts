class AccountAPI {
  baseUrl: string;

  constructor() {
    this.baseUrl = 'https://digitalmoney.digitalhouse.com';
  }

  async getAccountInfo(token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/account`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }

  async updateAccountAlias(token: string, accountId: number, newAlias: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/accounts/${accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ alias: newAlias }), 
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating account alias:', error);
      throw error;
    }
  }
}

export default AccountAPI;
