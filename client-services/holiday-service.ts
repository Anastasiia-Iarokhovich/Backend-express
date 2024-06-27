import axios from 'axios';
import { Holiday } from '../models/holiday';

class HolidayService {

  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetchHolidays(): Promise<Holiday[]> {
    try {
      const response = await axios.get(`${this.baseURL}/holiday/list`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch holidays:', error);
      return [];
    }
  }

  async addHoliday(name: string, date: Date, isWeekend: Boolean): Promise<any> {
    try {
      const response = await axios.post(`${this.baseURL}/holiday/add`, { name, date, isWeekend });
      return response.data;

    } catch (error) {
      console.error('Failed to add holiday:', error);
      throw error;
    }
  }

  async deleteHoliday(id: number): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseURL}/holiday/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete holiday:', error);
      throw error;
    }
  }
}

export default HolidayService;