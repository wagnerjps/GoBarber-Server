import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionRoutes = Router();

interface IUserResponse {
    avatar: string;
    name: string;
    email: string;
    id: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

sessionRoutes.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });

    // Criei uma interface para realizar o delete do password sem o typescript reclamar
    const user2: IUserResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };

    delete user2.password;

    return response.json({ user2, token });
});

export default sessionRoutes;
