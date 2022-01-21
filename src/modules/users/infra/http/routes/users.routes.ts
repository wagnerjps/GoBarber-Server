// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthorizated from '../middleware/ensureAuthorizated';

const usersRoutes = Router();
const upload = multer(uploadConfig);

// Adicionada interface para solucionar erro do TS ao deletar o campo "password" do objeto user
interface IUser {
    name: string;
    email: string;
    password?: string;
}
// ROUTE GET USER BY EMAIL
usersRoutes.get('/userbyname', async (request, response) => {
    const { name } = request.body;

    const usersRepository = container.resolve(UsersRepository);
    const user = await usersRepository.findByName(name);

    return response.json(user);
});

// ROUTE GET USER BY EMAIL
usersRoutes.get('/userbymail', async (request, response) => {
    const { email } = request.body;

    const usersRepository = container.resolve(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    return response.json(user);
});

// ROUTE POST
usersRoutes.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user: IUser = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

// ROUTE AVATAR UPDALOAD
usersRoutes.patch(
    '/avatar',
    ensureAuthorizated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );

        const user: IUser = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.status(200).json(user);
    },
);

export default usersRoutes;
