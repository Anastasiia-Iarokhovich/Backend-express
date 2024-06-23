import { query } from '../db';

export const createHolidaysTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS holidays (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        isWeekend BOOLEAN NOT NULL DEFAULT true
      )
    `);
    console.log('Table holidays created successfully');
  } catch (err) {
    console.error('Failed to create table holidays', err);
    throw err;
  }
};
