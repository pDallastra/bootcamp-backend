import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {        
        const findAppointment = await this.findOne({
            where: {date},
        })
        return findAppointment || null;
    };

}

export default AppointmentRepository;
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