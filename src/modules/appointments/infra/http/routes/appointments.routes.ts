import { Router } from 'express';

import ensureAuthorizated from '@modules/users/infra/http/middleware/ensureAuthorizated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();

/* Não será mais necessário no typeorm
const appointmentRepository = new AppointmentsRepository();
 */

appointmentsRoutes.use(ensureAuthorizated);

// ROUTE GET - Aguardando

appointmentsRoutes.get('/', appointmentsController.show);

// ROUTE POST
appointmentsRoutes.post('/', appointmentsController.create);

export default appointmentsRoutes;
