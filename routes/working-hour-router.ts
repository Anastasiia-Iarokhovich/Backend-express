import express from 'express';
import WorkingHourController from '../controllers/working-hour-controller';

const workingHourRouter = express.Router();

workingHourRouter.get('/working-hour/get', WorkingHourController.getWorkingHours);
workingHourRouter.post('/working-hour/add', WorkingHourController.addWorkingHours)

export default workingHourRouter;