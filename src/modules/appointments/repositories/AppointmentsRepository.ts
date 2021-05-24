/*
import { isEqual } from 'date-fns';
*/
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

/* Não será mais necessário no typeorm
interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}
 */
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    /* Não será mais necessário no typeorm
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }


    public all(): Appointment[] {
        return this.appointments;
    }
    */
    public async findByProviderAndDate(
        provider_id: string,
        date: Date,
    ): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { provider_id, date },
        });

        return findAppointment || null;
    }

    /* Metodos substituidos para procurar por providers e dates
    public async findByProvider(provider: string): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { provider },
        });

        return findAppointment || null;
    }

    public async findByDate(date: Date): Promise<Appointment | null> {
        // Refaremos utilizando o .findOne()
        // const findAppointment = this.appointments.find(appointment =>
        //     isEqual(date, appointment.date),
        // );
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    } */

    /* Não será mais necessário no typeorm
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }
    */
}

export default AppointmentsRepository;
