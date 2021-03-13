import { getRepository, Repository} from 'typeorm';

import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({provider_id, date});

        await this.ormRepository.save(appointment);

        return appointment
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {        
        const findAppointment = await this.ormRepository.findOne({
            where: {date},
        })
        return findAppointment || undefined;
    };

}

export default AppointmentsRepository;
/* --- Utilizado durante aprendizado Bootcamp ----

private appointments: Appointment[] = [];

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

constructor() {
    this.appointments = [];
}

public all(): Appointment[] {
    return this.appointments;
}


public create({provider, date}: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);

    return appointment;
}

(PARA FINDBYDATE) - const findAppointmentsInSameDate = this.appointments.find(appointment => isEqual(date, appointment.date));

*/ 