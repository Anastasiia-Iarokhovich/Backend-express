import { Router } from 'express';
import { getHolidays, addHoliday, deleteHoliday } from '../controllers/holidayController';

const holidayRouter = Router();

holidayRouter.get('/holiday/list', getHolidays);
holidayRouter.post('/holiday/add', addHoliday);
holidayRouter.delete('/holiday/delete/:id', deleteHoliday);

export default holidayRouter;