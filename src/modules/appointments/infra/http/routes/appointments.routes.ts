import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthorizated from '@modules/users/infra/http/middleware/ensureAuthorizated';

const appointmentsRoutes = Router();

/* Não será mais necessário no typeorm
const appointmentRepository = new AppointmentsRepository();
 */

appointmentsRoutes.use(ensureAuthorizated);

// ROUTE GET - Aguardando

appointmentsRoutes.get('/', async (request, response) => {
    // Criando o appointmentRepository com getCustomRepository
    // Não é mais necessário
    // const appointmentRepository = getCustomRepository(AppointmentsRepository);
    // LIST --- Alterado o metodo all() para find

    const { date } = request.body;

    const appointmentRepository = container.resolve(AppointmentsRepository);
    const appointments = await appointmentRepository.findByDate(date);

    // eslint-disable-next-line no-console
    console.log(`${date} #$# ${appointments}`);

    return response.status(200).json(appointments);
});

// ROUTE POST
appointmentsRoutes.post('/', async (request, response) => {
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
});

export default appointmentsRoutes;
