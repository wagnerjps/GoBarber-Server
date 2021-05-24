import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    /* Não será mais necessário no typeorm
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    } */

    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        /* const findAppointmentInSameProvider = await appointmentsRepository.findByProvider(
            provider,
        );
        // FINDBYDATE --- removido o this de this.appointmentsRepository.findByDate
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        ); */

        const findAppointmentInSameProviderAndDate = await appointmentsRepository.findByProviderAndDate(
            provider_id,
            appointmentDate,
        );

        if (findAppointmentInSameProviderAndDate) {
            throw new AppError('This appointment is already booked');
        }

        // CREATE --- removido o this de this.appointmentsRepository.findByDate
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        // Com o modelo typeorm é necessário utilizar o save
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
