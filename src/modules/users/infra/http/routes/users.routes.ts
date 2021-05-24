// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthorizated from '../middleware/ensureAuthorizated';

const usersRoutes = Router();
const upload = multer(uploadConfig);

// Adicionada interface para solucionar erro do TS ao deletar o campo "password" do objeto user
interface User {
    name: string;
    email: string;
    password?: string;
}
/**
 *
// ROUTE GET
usersRoutes.get('/', async (request, response) => {
    return response.status(200).json({ ok: true });
});
 */
// ROUTE POST
usersRoutes.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: User = await createUser.execute({
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
        const updateUserAvatarService = new UpdateUserAvatarService();

        const user: User = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.status(200).json(user);
    },
);

export default usersRoutes;
