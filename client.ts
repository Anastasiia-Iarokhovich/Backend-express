import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import HolidayService from './client-services/holiday-service';
import WorkingHourService from './client-services/working-hour-service';
import WorkingWeekendService from './client-services/working-weekend-service';


class App {

  private holidayService: HolidayService;
  private workingHourService: WorkingHourService;
  private workingWeekendService: WorkingWeekendService;

  constructor() {
    this.holidayService = new HolidayService('http://localhost:3000/api/holidays');
    this.workingHourService = new WorkingHourService('http://localhost:3000/api/working-hours');
    this.workingWeekendService = new WorkingWeekendService('http://localhost:3000/api/working-weekends');
  }

  async saveToYAML() {
    try {

      const holidays = await this.holidayService.fetchHolidays();
      const workingWeekends = await this.workingWeekendService.fetchWorkingWeekends();

      // const workingHoursForApril2023 = await this. workingHourService.calculateWorkingHours(new Date(2023, 3), holidays, workingWeekends);
      // const workingHoursForMay2023 = await this.workingHourService.calculateWorkingHours(new Date(2023, 4), holidays, workingWeekends);
      // const workingHoursFromApril2023ToMarch2024 = await this.workingHourService.calculateTotalWorkingHours(new Date(2023, 3), new Date(2024, 2), holidays, workingWeekends);
      // const workingHoursForApril2024 = await this. workingHourService.calculateWorkingHours(new Date(2024, 3), holidays, workingWeekends);
      // const workingHoursForMay2024 = await this.workingHourService.calculateWorkingHours(new Date(2024, 4), holidays, workingWeekends);
      // const deleteHoliday_01_05_24 = await this.holidayService.deleteHoliday(177);

      // // делать проверку в сервисе
      // const dayType = await this.workingHourService.checkDayType(new Date('2024-05-06'), holidays, workingWeekends);

      // if (dayType === "Holiday") {
      //   console.log("already exist");
      // } else {
      //   const addHoliday_06_05_24 = await this.holidayService.addHoliday("Новый праздник 6 мая", new Date('2024-05-06'), true);
      //   console.log('New holiday added:', addHoliday_06_05_24);
      // }

      // const deleteHoliday_01_05_23 = await this.holidayService.deleteHoliday(167);    

      const yamlData = yaml.dump({ 
        holidays, 
        // workingHoursForApril2023, 
        // workingHoursForMay2023, 
        // workingHoursFromApril2023ToMarch2024, 
        // workingHoursForApril2024, 
        // workingHoursForMay2024, 
        // deleteHoliday_01_05_24, 
        // dayType,
        // deleteHoliday_01_05_23
      });

      fs.writeFileSync('client-request.yaml', yamlData);
      console.log('Requests saved to client-request.yaml');
    } catch (error) {
      console.error('Error during operation:', error);
    }
  }
}

const app = new App();

app.saveToYAML();


