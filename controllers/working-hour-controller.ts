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
}

export default new WorkingHourController();

