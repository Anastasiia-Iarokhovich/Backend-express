import { Request, Response } from 'express';
import { query } from '../db';

class WorkingWeekendController {

  async getWorkingWeekends(req: Request, res: Response) {
    try {
      const result = await query('SELECT * FROM workingWeekends');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async addWorkingWeekend(req: Request, res: Response) {
    try {
      const { date, isWeekend } = req.body;
      const result = await query('INSERT INTO workingWeekends (date, isWeekend) VALUES ($1, $2) RETURNING *', [date, isWeekend]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  }

  async deleteWorkingWeekend(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await query('DELETE FROM workingWeekends WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 1) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Working weekend not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

}

export default new WorkingWeekendController();

