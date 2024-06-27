import { query } from '../db';
import Holidays from 'date-holidays';
import { Holiday } from '../models/holiday';

export const insertHolidays = async (holidays: Holiday[]) => {

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