import { Request, Response } from 'express';
import { query } from '../db';

export const getHolidays = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM holidays');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addHoliday = async (req: Request, res: Response) => {
  try {
    const { name, date } = req.body;
    const result = await query('INSERT INTO holidays (name, date) VALUES ($1, $2) RETURNING *', [name, date]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

export const deleteHoliday = async (req: Request, res: Response) => {
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
};

