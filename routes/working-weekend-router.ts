import express from 'express';
import WorkingWeekendController from '../controllers/working-weekend-controller';

const workingWeekendRouter = express.Router();

workingWeekendRouter.get('/working-weekend/list', WorkingWeekendController.getWorkingWeekends);
workingWeekendRouter.post('/working-weekend/add', WorkingWeekendController.addWorkingWeekend);
workingWeekendRouter.delete('/working-weekend/delete/:id', WorkingWeekendController.deleteWorkingWeekend);

export default workingWeekendRouter;