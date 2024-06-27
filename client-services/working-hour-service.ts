import axios from 'axios';
import { WorkingHour } from '../models/working-hour';
import { Holiday } from '../models/holiday';
import { WorkingWeekend } from '../models/working-weekend';

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

  async addWorkingHour(workingHour: WorkingHour): Promise<any> {
    try {
      const response = await axios.post(`${this.baseURL}/working-hour/add`, workingHour);
      return response.data;
    } catch (error) {
      console.error('Failed to save working hour:', error);
      throw error;
    }
  }

  async calculateWorkingHours(date: Date, holidays: Holiday[], workingWeekends: WorkingWeekend[]): Promise<WorkingHour> {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let totalHours = 0;

    for (let day = 1; day <= daysInMonth; day++) {

      const currentDate = new Date(year, month, day);
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) or Saturday (6)

      const isHoliday = holidays.some(holiday => this.isSameDate(new Date(holiday.date!), currentDate));
      const isWorkingWeekend = workingWeekends.some(ww => this.isSameDate(new Date(ww.date!), currentDate));

      if (isHoliday || (!isWorkingWeekend && isWeekend)) {
        continue; // Skip holidays and non-working weekends
      }

      const nextDay = new Date(year, month, day + 1);
      const isNextDayHoliday = holidays.some(holiday => this.isSameDate(new Date(holiday.date!), nextDay));
      
      if (isNextDayHoliday && !isWeekend) {
        totalHours += 7; // Pre-holiday working day
      } else if (!isWeekend) {
        totalHours += 8; // Regular working day
      } else if (isWorkingWeekend) {
        totalHours += 8; // Working weekend
    }
    }

    return new WorkingHour(undefined, year, month + 1, totalHours); // month + 1 to make it readable 
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  async calculateTotalWorkingHours(startDate: Date, endDate: Date, holidays: Holiday[], workingWeekends: WorkingWeekend[]): Promise<number> {
    let totalWorkingHours = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const workingHours = await this.calculateWorkingHours(currentDate, holidays, workingWeekends);
      totalWorkingHours += workingHours.sumOfHours  ?? 0;

      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }

    return totalWorkingHours;
  }

  async checkDayType(date: Date, holidays: Holiday[], workingWeekends: WorkingWeekend[]): Promise<string> {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) or Saturday (6)
    const isHoliday = holidays.some(holiday => this.isSameDate(new Date(holiday.date!), date));
    const isWorkingWeekend = workingWeekends.some(ww => this.isSameDate(new Date(ww.date!), date));

    if (isHoliday) {
      return 'Holiday';
    } else if (isWorkingWeekend) {
      return 'Working Weekend';
    } else if (isWeekend) {
      return 'Weekend';
    } else {
      return 'Working Day';
    }
  }
}

export default WorkingHourService;