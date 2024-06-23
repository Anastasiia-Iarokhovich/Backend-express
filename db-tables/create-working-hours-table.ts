import { query } from '../db';

export const createMonthlyWorkingHoursTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS workingHours (
        id SERIAL PRIMARY KEY,
        year INT NOT NULL,
        month INT NOT NULL,
        sumOfHours DECIMAL(5, 2) NOT NULL
      )
    `);
    console.log('Table workingHours created successfully');
  } catch (err) {
    console.error('Failed to create table workingHours', err);
    throw err;
  }
};