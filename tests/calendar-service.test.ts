import { Holiday } from '../models/holiday';
import { WorkingWeekend } from '../models/working-weekend';
import { WorkingHour } from '../models/working-hour';
import WorkingHourService from '../client-services/working-hour-service';


describe('Working-hours service', () => {

  let workingHourService: WorkingHourService;

  beforeEach(() => {
    workingHourService = new WorkingHourService('http://localhost:3000/api/working-hours');
  });

  const holidays: Holiday[] = [
    { date: new Date('2024-01-01'), name: 'Новый год', isWeekend: true },
    { date: new Date('2024-01-07'), name: 'Рождество Христово', isWeekend: true },
    { date: new Date('2024-02-23'), name: 'День защитника Отечества', isWeekend: true },
    { date: new Date('2024-03-08'), name: 'Международный женский день', isWeekend: true },
    { date: new Date('2024-05-01'), name: 'Праздник весны и труда', isWeekend: true },
    { date: new Date('2024-05-09'), name: 'День Победы', isWeekend: true },
    // { date: new Date('2024-06-12'), name: 'День России', isWeekend: true },
    { date: new Date('2024-11-04'), name: 'День народного единства', isWeekend: true },
  ];

  const workingWeekends: WorkingWeekend[] = [
    { date: new Date('2024-03-16'), isWeekend: false },
  ];

  describe('Calculate working hours', () => {

    it('should calculate working hours for June 2024', async () => {
      const date = new Date(2024, 5);
      const result = await workingHourService.calculateWorkingHours(date, holidays, workingWeekends);
      expect(result).toEqual(new WorkingHour(undefined, 2024, 6, 160));
    });

    it('should calculate working hours for January 2024', async () => {
      const date = new Date(2024, 0);
      const result = await workingHourService.calculateWorkingHours(date, holidays, workingWeekends);
      expect(result).toEqual(new WorkingHour(undefined, 2024, 1, 176)); 
    });

    it('should calculate working hours for March 2024', async () => {
      const date = new Date(2024, 2);
      const result = await workingHourService.calculateWorkingHours(date, holidays, workingWeekends);
      expect(result.sumOfHours).toBe(167);
      expect(result).toEqual(new WorkingHour(undefined, 2024, 3, 167)); 
    });
  });


  describe('Day check type', () => {
  
    it('should return - Holiday - for 9 May', async () => {
      const date = new Date('2024-05-09'); 
      const result = await workingHourService.checkDayType(date, holidays, workingWeekends);
      expect(result).toBe('Holiday');
    });
  
    it('should return - Working Weekend - for a working weekend', async () => {
      const date = new Date('2024-03-16');
      const result = await workingHourService.checkDayType(date, holidays, workingWeekends);
      expect(result).toBe('Working Weekend');
    });
  
    it('should return - Weekend - for a regular weekend', async () => {
      const date = new Date('2024-06-23');
      const result = await workingHourService.checkDayType(date, holidays, workingWeekends);
      expect(result).toBe('Weekend');
    });
  
    it('should return - Working Day - for a regular working day', async () => {
      const date = new Date('2024-06-26');
      const result = await workingHourService.checkDayType(date, holidays, workingWeekends);
      expect(result).toBe('Working Day');
    });
  });
});

