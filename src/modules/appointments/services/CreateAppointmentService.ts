import { startOfHour } from 'date-fns';
import {inject, injectable} from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from  '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface Request {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository,) {}

    public async execute({provider_id, date}: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentsInSameDate) {
            throw new AppError('Spot not available');
        }
        const appointment = await this.appointmentsRepository.create({provider_id, date: appointmentDate});
    
        return appointment;
    }
}

export default CreateAppointmentService;

/* ----- Utilizado durante aprendizado Bootcamp  

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
          this.appointmentsRepository = appointmentsRepository;
    }

*/ 