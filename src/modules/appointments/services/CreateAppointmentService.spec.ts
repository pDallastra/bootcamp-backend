import AppError from '@shared/errors/AppError';
import 'reflect-metadata';


import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointmnet = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123123123',
        })

        expect(appointmnet).toHaveProperty('id');
        expect(appointmnet.provider_id).toBe('123123123123');
    })

    it('should not be able to create an appointment on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointmentDate = new Date(2021, 4, 10, 11);
        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123123',
        });

        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123123',
        })).rejects.toBeInstanceOf(AppError);
    })
})