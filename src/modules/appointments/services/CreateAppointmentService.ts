import { startOfHour, isBefore, getHours } from 'date-fns';
import {inject, injectable} from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from  '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface Request {
    provider_id: string;
    date: Date;
    user_id: string;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository,
        ) {}

        public async execute({
            date,
            provider_id,
            user_id,
          }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't create an appointment on a past date.");
          }
      
          if (user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself.");
          }
      
          if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
              'You can only create appontments between 8am and 5pm.',
            );
          }

        const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentsInSameDate) {
            throw new AppError('Spot not available');
        }
        const appointment = await this.appointmentsRepository.create({provider_id, date: appointmentDate, user_id,});
    
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