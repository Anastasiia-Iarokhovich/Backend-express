import { query } from '../db';
import Holidays from 'date-holidays';
import { Holiday } from '../models/holiday';

export const insertHolidays = async () => {

    const hd = new Holidays('RU');
    const years = [2023, 2024];
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

    const values = holidays.map(holiday => {
        if (!holiday.date) {
            throw new Error(`Holiday date is undefined for holiday: ${holiday.name}`);
        }
        return `('${holiday.name}', '${holiday.date.toISOString().split('T')[0]}', ${holiday.isWeekend})`;
    }).join(', ');

    try {
        await query(`
            INSERT INTO holidays (name, date, isWeekend)
            VALUES ${values}
        `);
        console.log('Holidays inserted successfully');
    } catch (err) {
        console.error('Failed to insert holidays', err);
        throw err;
    }
};