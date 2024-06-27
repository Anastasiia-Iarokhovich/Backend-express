import { Pool } from 'pg';

const pool = new Pool({
  user: 'calendar', 
  host: 'localhost',
  database: 'calendar',
  password: 'test24password',
  port: 5438,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);