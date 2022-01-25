import { v4 as uuid } from 'uuid';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        // O Object faz a mesma função das instruões abaixo e reduz linhas de código
        // appointment.id = uuid();
        // appointment.date = date;
        // appointment.provider_id = provider_id;

        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }

    public async findAll(): Promise<Appointment[]> {
        return this.appointments;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }

    public async findByProviderAndDate(
        provider_id: string,
        date: Date,
    ): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment => {
            return appointment.date === date ||
                appointment.provider_id === provider_id
                ? appointment
                : undefined;
        });

        return findAppointment;
    }
}

export default AppointmentsRepository;
