import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/* SOLID
        [v] Single Responsability Principle
        [ ] Open Cloded Principle
        [v] Liskov Substitution Principle
        [ ] Interface Segregation Principle
        [v] Dependency Invertion Principle
*/
interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    /* Não será mais necessário no typeorm
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    } */

    public async execute({
        provider_id,
        date,
    }: IRequest): Promise<Appointment> {
        // Não será mais utilizado
        /*
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        */

        const appointmentDate = startOfHour(date);

        /* const findAppointmentInSameProvider = await appointmentsRepository.findByProvider(
            provider,
        );
        // FINDBYDATE --- removido o this de this.appointmentsRepository.findByDate
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        ); */

        const findAppointmentInSameProviderAndDate = await this.appointmentsRepository.findByProviderAndDate(
            provider_id,
            appointmentDate,
        );

        if (findAppointmentInSameProviderAndDate) {
            throw new AppError('This appointment is already booked');
        }

        // CREATE --- removido o this de this.appointmentsRepository.findByDate
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        // Com o modelo typeorm é necessário utilizar o save
        // Salva no repositório
        // await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
