import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = container.resolve(
            CreateAppointmentService,
        );

        // Necessário usar async/await
        const appointment = await createAppointmentService.execute({
            provider_id,
            date: parsedDate,
        });

        return response.status(201).json(appointment);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        // const { date } = request.body;

        const appointmentRepository = container.resolve(AppointmentsRepository);
        const appointments = await appointmentRepository.findAll();

        return response.status(200).json(appointments);
    }
}
