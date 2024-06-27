import { Request, Response } from 'express';
import { query } from '../db';

class HolidayController {

  async getHolidays(req: Request, res: Response) {
    try {
      const result = await query('SELECT * FROM holidays');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async addHoliday(req: Request, res: Response) {
    try {
      const { name, date, isWeekend } = req.body;
      const result = await query('INSERT INTO holidays (name, date, isWeekend) VALUES ($1, $2, $3) RETURNING *', [name, date, isWeekend]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  }

  async deleteHoliday(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await query('DELETE FROM holidays WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 1) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Holiday not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

}

export default new HolidayController();

