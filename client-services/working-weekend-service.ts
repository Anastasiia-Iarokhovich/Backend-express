import axios from 'axios';
import { WorkingWeekend } from '../models/working-weekend';

class WorkingWeekendService {

  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetchWorkingWeekends(): Promise<WorkingWeekend[]> {
    try {
      const response = await axios.get(`${this.baseURL}/working-weekend/list`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch working weekends:', error);
      return [];
    }
  }
}

export default WorkingWeekendService;