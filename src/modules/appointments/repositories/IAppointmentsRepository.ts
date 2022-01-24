import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

// SOLID
// Liskov Subistitution Principle

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;

    findByDate(date: Date): Promise<Appointment | undefined>;
    // Verificar futuramente se será necessário um método de procura por provider e date
    // Caso for descartar, alterar em AppointmentsRepository

    findByProviderAndDate(
        provider_id: string,
        date: Date,
    ): Promise<Appointment | undefined>;
}
