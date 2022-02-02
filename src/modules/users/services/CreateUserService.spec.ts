import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashpProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    const newUser = {
        name: 'John Doe',
        email: 'johndoe@exemple.com',
        password: '654321',
    };

    it('should be able to create a new user', async () => {
        const user = await createUser.execute(newUser);

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create new user if same already exists', async () => {
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
        await createUser.execute(newUser);

        expect(createUser.execute(newUser)).rejects.toBeInstanceOf(AppError);
    });
});
