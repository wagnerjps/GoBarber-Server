// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ensureAuthorizated from '../middleware/ensureAuthorizated';
import UsersControllers from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersControllers();
const userAvatarController = new UserAvatarController();

// Adicionada interface para solucionar erro do TS ao deletar o campo "password" do objeto user
interface IUser {
    name: string;
    email: string;
    password?: string;
}
// ROUTE GET USER BY EMAIL
usersRouter.get('/userbyname', async (request, response) => {
    const { name } = request.body;

    const usersRepository = container.resolve(UsersRepository);
    const user = await usersRepository.findByName(name);

    return response.json(user);
});

// ROUTE GET USER BY EMAIL
usersRouter.get('/userbymail', async (request, response) => {
    const { email } = request.body;

    const usersRepository = container.resolve(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    return response.json(user);
});

// ROUTE POST
usersRouter.post('/', usersController.create);

// ROUTE AVATAR UPDALOAD
usersRouter.patch(
    '/avatar',
    ensureAuthorizated,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
