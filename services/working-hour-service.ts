import axios from 'axios';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { WorkingHour } from '../models/working-hour';

class WorkingHourService {

  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetchWorkingHours(): Promise<WorkingHour[]> {
    try {
      const response = await axios.get(`${this.baseURL}/working-hour/get`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch workinghours:', error);
      return [];
    }
  }

  async saveHolidaysToYAML() {
    const workingHours = await this.fetchWorkingHours();
    const yamlData = yaml.dump(workingHours);
    fs.writeFileSync('workingHours.yaml', yamlData);
    console.log('Working hours saved to workingHours.yaml');
  }
}

export default WorkingHourService;