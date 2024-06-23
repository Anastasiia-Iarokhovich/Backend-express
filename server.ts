import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import workingWeekendRouter from './routes/working-weekend-router';
import holidayRouter from './routes/holiday-router';
import { createHolidaysTable } from './db-tables/create-holidays-table';
import { createWorkingWeekendsTable } from './db-tables/create-working-weekends-table';
import workingHourRouter from './routes/working-hour-router';
import { createMonthlyWorkingHoursTable } from './db-tables/create-working-hours-table';
import { addColumnToHolidaysTable } from './db-tables/add-column-to-holidays-table';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/holidays', holidayRouter);
app.use('/api/working-weekends', workingWeekendRouter);
app.use('/api/working-hours', workingHourRouter);

const createTables = async () => {
  await createHolidaysTable();
  await createWorkingWeekendsTable();
  await createMonthlyWorkingHoursTable();
  // await addColumnToHolidaysTable(); // Добавление нового столбца
};

createTables()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server', err);
  });



