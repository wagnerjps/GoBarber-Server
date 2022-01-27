import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashpProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    const newUser = {
        name: 'John Doe',
        email: 'johndoe@exemple.com',
        password: '654321',
    };

    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute(newUser);

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create new user if same already exists', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute(newUser);

        await expect(
            createUser.execute({
                name: 'John Doe',
                email: 'johndoe@exemple.com',
                password: '654321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create two user on the same time', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute(newUser);

        expect(createUser.execute(newUser)).rejects.toBeInstanceOf(AppError);
    });
});
