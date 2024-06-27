import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import workingWeekendRouter from './routes/working-weekend-router';
import holidayRouter from './routes/holiday-router';
import workingHourRouter from './routes/working-hour-router';
import { createHolidaysTable } from './sql-queries/create-holidays-table';
import { createWorkingWeekendsTable } from './sql-queries/create-working-weekends-table';
import { createMonthlyWorkingHoursTable } from './sql-queries/create-working-hours-table';
import { insertHolidays } from './sql-queries/insert-holidays';
import { getHolidaysForYears } from './data/data-holidays';
import { Holiday } from './models/holiday';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Route setup
app.use('/api/holidays', holidayRouter);
app.use('/api/working-weekends', workingWeekendRouter);
app.use('/api/working-hours', workingHourRouter);

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    await createHolidaysTable();
    await createWorkingWeekendsTable();
    await createMonthlyWorkingHoursTable();

    // const holidays: Holiday[] = getHolidaysForYears('RU', [2023, 2024]);
    // await insertHolidays(holidays); 

    console.log('Database tables created and initial data inserted successfully.');
  } catch (error) {
      console.error('Error initializing database:', error);
      throw error; 
  }
};

// Start the server
const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Run the server
startServer();



