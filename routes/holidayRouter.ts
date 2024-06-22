import express from 'express';
import HolidayController from '../controllers/holidayController';

const holidayRouter = express.Router();

holidayRouter.get('/holiday/list', HolidayController.getHolidays);
holidayRouter.post('/holiday/add', HolidayController.addHoliday);
holidayRouter.delete('/holiday/delete/:id', HolidayController.deleteHoliday);

export default holidayRouter;