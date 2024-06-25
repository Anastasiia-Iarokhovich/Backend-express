import { query } from '../db';

export const addColumnToHolidaysTable = async () => {
  try {
    await query(`
      ALTER TABLE holidays ADD COLUMN isWeekend BOOLEAN NOT NULL DEFAULT true;
    `);
    console.log('Column isWeekend added to table holidays successfully');
  } catch (err) {
    console.error('Failed to add column isWeekend to table holidays', err);
    throw err;
  }
};