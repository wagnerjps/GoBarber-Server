/*
import { isEqual } from 'date-fns';
*/
import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

/* Não será mais necessário no typeorm
interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}
 */
class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    /* Não será mais necessário no typeorm
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }


    public all(): Appointment[] {
        return this.appointments;
    }
    */

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async findAll(): Promise<Appointment[]> {
        const findAppointments = await this.ormRepository.find();

        return findAppointments;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async findByProviderAndDate(
        provider_id: string,
        date: Date,
    ): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { provider_id, date },
        });

        return findAppointment;
    }

    /* Metodos substituidos para procurar por providers e dates
    public async findByProvider(provider: string): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { provider },
        });

        return findAppointment || null;
    }

    */

    /* Não será mais necessário no typeorm
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }
    */
}

export default AppointmentsRepository;
