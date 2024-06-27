import { Request, Response } from 'express';
import { query } from '../db';

class WorkingHourController {

  async getWorkingHours(req: Request, res: Response) {
    try {
      const result = await query('SELECT * FROM workingHours');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async addWorkingHours(req: Request, res: Response) {
    try {
      const { year, month, sumOfHours } = req.body;
      const result = await query('INSERT INTO workingHours (year, month, sumOfHours) VALUES ($1, $2, $3) RETURNING *', [year, month, sumOfHours]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  }
}

export default new WorkingHourController();

