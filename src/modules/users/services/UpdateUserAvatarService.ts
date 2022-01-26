// import path from 'path';
// import fs from 'fs';

// import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStotageProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        // Caso exista um avatar
        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
            // Deletar Avatar anterior
            // Modificado para utilização o StorageProvider
            // const userAvatarFilePath = path.join(
            //     uploadConfig.directory,
            //     user.avatar,
            // );

            // const userAvatarFileExists = await fs.promises.stat(
            //     userAvatarFilePath,
            // );

            // if (userAvatarFileExists) {
            //     await fs.promises.unlink(userAvatarFilePath);
            // }
        }

        // Persistir os dados do avatar no banco
        // user.avatar = avatarFilename;

        const filename = await this.storageProvider.saveFile(avatarFilename);
        user.avatar = filename;

        await this.usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;
