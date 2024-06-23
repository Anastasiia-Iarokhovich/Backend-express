export class Holiday {
  id?: number;
  name?: string;
  date?: Date;
  isWeekend?: boolean;

  constructor(id?: number, name?: string, date?: Date, isWeekend?: boolean) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.isWeekend = isWeekend;
  }
}
  
  
