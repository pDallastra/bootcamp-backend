import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create)

export default sessionsRouter;
 
/* ------- Utilizado durante aprendizado Bootcamp
const appointmentsRepository = new AppointmentRepository();
*/