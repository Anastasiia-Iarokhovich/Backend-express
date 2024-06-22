import express from 'express';
import bodyParser from 'body-parser';
import holidayRoutes from './routes/holidayRouter';
import { query } from './db';
import cors from 'cors';

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/holidays', holidayRoutes);

const createTable = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS holidays (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    )
  `);
};

createTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to create table', err);
  });


