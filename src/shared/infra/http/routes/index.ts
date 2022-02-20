import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.use('/users', usersRouter);
// routes.get('/userbymail', usersRouter);
// routes.get('/userbyname', usersRouter);

routes.use('/profile', profileRouter);

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.get('/', (request, response) => {
    return response.json({ message: 'Server On Air!' });
});

export default routes;
