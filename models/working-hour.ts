export class WorkingHour {
  id?: number;
  year?: number;
  month?: number;
  sumOfHours?: number;

  constructor(id?: number, year?: number, month?: number, sumOfHours?: number) {
    this.id = id;
    this.year = year;
    this.month = month;
    this.sumOfHours = sumOfHours;
  }
}
