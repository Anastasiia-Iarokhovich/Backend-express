// import axios from 'axios';
// import * as fs from 'fs';
// import * as yaml from 'js-yaml';

// // const baseURL = 'http://localhost:3000/api/holidays';

// const baseURL = 'http://localhost:3000/api/holidays/holiday/list';

// async function fetchHolidays(): Promise<any[]> {
//   try {
//     const response = await axios.get(`${baseURL}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch holidays:', error);
//     return [];
//   }
// }

// async function saveHolidaysToYAML() {
//   const holidays = await fetchHolidays();
//   const yamlData = yaml.dump(holidays);
//   fs.writeFileSync('holidays.yaml', yamlData);
//   console.log('Holidays saved to holidays.yaml');
// }

// saveHolidaysToYAML();

import axios from 'axios';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { Holiday } from '../models/holiday';

const baseURL = 'http://localhost:3000/api/holidays';

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

  async addHoliday(name: string, date: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseURL}/holiday/add`, { name, date });
      return response.data;
    } catch (error) {
      console.error('Failed to add holiday:', error);
      throw error;
    }
  }

  async deleteHoliday(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseURL}/holiday/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete holiday:', error);
      throw error;
    }
  }

  async saveHolidaysToYAML() {
    const holidays = await this.fetchHolidays();
    const yamlData = yaml.dump(holidays);
    fs.writeFileSync('holidays.yaml', yamlData);
    console.log('Holidays saved to holidays.yaml');
  }
}

// Использование класса HolidayService
const holidayService = new HolidayService(baseURL);
holidayService.saveHolidaysToYAML();

