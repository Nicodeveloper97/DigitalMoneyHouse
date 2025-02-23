import axios from 'axios';

const BASE_URL = 'https://digitalmoney.digitalhouse.com/api/accounts';

export class TransferencesService {
  private accountId: number;
  private token: string;

  constructor(accountId: number, token: string) {
    this.accountId = accountId;
    this.token = token;
  }

  async getTransferences() {
    try {
      const response = await axios.get(`${BASE_URL}/${this.accountId}/transferences`, {
        headers: {
          Authorization: `${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transferences', error);
      throw error;
    }
  }

  async createTransference(transferenceData: { amount: number; destination: string }) {
    try {
      const response = await axios.post(`${BASE_URL}/${this.accountId}/transferences`, transferenceData, {
        headers: {
          Authorization: `${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating transference', error);
      throw error;
    }
  }
  async createDeposit(depositData: { amount: number; dated: string; destination: string; origin: string }) {
    try {
      const response = await axios.post(`${BASE_URL}/${this.accountId}/deposits`, depositData, {
        headers: {
          Authorization: `${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating deposit', error);
      throw error;
    }
  }
}
