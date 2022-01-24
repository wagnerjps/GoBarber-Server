import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import IUserResponse from '@modules/users/dtos/IUsersResponse';

// Um controller deve ter apenas 5 métodos conforme a arquitetura RESTfull
// index, show, create, update, delete

export default class SessionsControllers {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
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
    }
}
