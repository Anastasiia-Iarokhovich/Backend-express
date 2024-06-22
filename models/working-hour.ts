export class WorkingHour {
    
    id?: number;
    month?: string;
    sumOfHours?: number;
  
    constructor(id?: number, month?: string, sumOfHours?: number) {
      this.id = id;
      this.month = month;
      this.sumOfHours = sumOfHours;
    }
}