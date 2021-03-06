import {Request, Response} from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { provider_id, date } = req.body;
        const user_id = req.user.id;

        const parsedDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);
    
        const appointment = await createAppointment.execute({date: parsedDate, provider_id, user_id,});
    
        return res.status(201).json({appointment});
    }
}