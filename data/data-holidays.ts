import Holidays from 'date-holidays';
import { Holiday } from '../models/holiday';

export const getHolidaysForYears = (countryCode: string, years: number[]): Holiday[] => {
  const hd = new Holidays(countryCode);
  let holidays: Holiday[] = [];

  years.forEach(year => {
    const holidaysList = hd.getHolidays(year);
    const yearHolidays = holidaysList.map(holiday => {
      if (!holiday.date) {
        throw new Error(`Holiday date is undefined for holiday: ${holiday.name}`);
      }
      const date = new Date(Date.UTC(
        new Date(holiday.date).getFullYear(),
        new Date(holiday.date).getMonth(),
        new Date(holiday.date).getDate()
      ));
      return new Holiday(
        undefined,
        holiday.name,
        date,
        holiday.type === 'public'
      );
    });
    holidays = holidays.concat(yearHolidays);
  });

  return holidays;
};
