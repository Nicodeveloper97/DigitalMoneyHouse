class TransactionsAPI {
  baseURL: string;

  constructor(baseURL: string = "https://digitalmoney.digitalhouse.com") {
    this.baseURL = baseURL;
  }

  async getAllTransactions(accountId: number) {
    const response = await fetch(
      `${this.baseURL}/api/accounts/${accountId}/activity`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  }

  async createTransaction(accountId: string, transactionData: object) {
    const response = await fetch(
      `${this.baseURL}/api/accounts/${accountId}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(transactionData),
      }
    );
    return response.json();
  }

  async getTransaction(accountId: string, transactionId: string) {
    const response = await fetch(
      `${this.baseURL}/api/accounts/${accountId}/transactions/${transactionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  }
}

export const transactionsAPI = new TransactionsAPI();
