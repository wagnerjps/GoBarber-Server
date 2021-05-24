import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthorizated from '../middleware/ensureAuthorizated';

const appointmentsRoutes = Router();
/* Não será mais necessário no typeorm
const appointmentRepository = new AppointmentsRepository();
 */

appointmentsRoutes.use(ensureAuthorizated);

// ROUTE GET
appointmentsRoutes.get('/', async (request, response) => {
    // Criando o appointmentRepository com getCustomRepository
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    // LIST --- Alterado o metodo all() para find
    const appointments = await appointmentRepository.find();
    return response.status(200).json(appointments);
});

// ROUTE POST
appointmentsRoutes.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    // Não passamos mais o appointmentRepository
    const createAppointmentService = new CreateAppointmentService();

    // Necessário usar async/await
    const appointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });

    return response.status(201).json(appointment);
});

export default appointmentsRoutes;
