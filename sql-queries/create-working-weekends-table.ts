import { query } from '../db';

export const createWorkingWeekendsTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS workingWeekends (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        isWeekend BOOLEAN NOT NULL DEFAULT false
      )
    `);
    console.log('Table workingWeekends created successfully');
  } catch (err) {
    console.error('Failed to create table workingWeekends', err);
    throw err;
  }
};

