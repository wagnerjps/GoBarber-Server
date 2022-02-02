import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

// CI - Executar testes online

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appoitment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123123',
        });

        expect(appoitment).toHaveProperty('id');
        expect(appoitment.provider_id).toBe('123123123');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const appointmentDate = new Date(2022, 0, 25, 12, 5, 0);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
