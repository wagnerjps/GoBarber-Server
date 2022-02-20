import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
}

interface IResponse {
    id: string;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const response: IResponse = user;

        delete response.password;

        return response;
    }
}
export default ShowProfileService;
