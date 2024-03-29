import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileControllers {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({ user_id });

        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user: ICreateUserDTO = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });

        delete user.password;

        return response.json(user);
    }
}
