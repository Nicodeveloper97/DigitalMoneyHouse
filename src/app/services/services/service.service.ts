import axios from 'axios';

const API_URL = 'https://digitalmoney.digitalhouse.com/service';

export class ServiceAPI {
  // Obtener todos los servicios y devolver sus IDs, nombres y fechas
  static async getAllServiceIds() {
    try {
      const response = await axios.get(`${API_URL}`);
      // Supone que la respuesta es un array de objetos [{ id, name, date }]
      const services = response.data;
      return services; // Devuelve los objetos completos con id, name, y date
    } catch (error) {
      console.error('Error fetching all services', error);
      throw error;
    }
  }

  // Obtener un servicio por ID
  static async getServiceById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // Devuelve los detalles del servicio
    } catch (error) {
      console.error(`Error fetching service with id ${id}`, error);
      throw error;
    }
  }

  // Obtener servicios por query
  static async getServicesByQuery(query: string) {
    try {
      const response = await axios.get(`${API_URL}/${query}`);
      return response.data; // Devuelve los servicios que coinciden con la query
    } catch (error) {
      console.error(`Error fetching services with query ${query}`, error);
      throw error;
    }
  }
}