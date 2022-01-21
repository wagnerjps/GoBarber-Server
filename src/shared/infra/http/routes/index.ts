import { Router } from 'express';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);

routes.use('/users', usersRoutes);
routes.get('/userbymail', usersRoutes);
routes.get('/userbyname', usersRoutes);

routes.use('/sessions', sessionsRoutes);

routes.get('/', (request, response) => {
    return response.json({ message: 'Server On Air!' });
});

export default routes;
