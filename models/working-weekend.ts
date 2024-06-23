export class WorkingWeekend {
  id?: number;
  date?: Date;
  isWeekend?: boolean;

  constructor(id?: number, date?: Date, isWeekend?: boolean) {
    this.id = id;
    this.date = date;
    this.isWeekend = isWeekend;
  }
}