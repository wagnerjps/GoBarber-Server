import { container } from 'tsyringe';
import BCryptHashProvider from './HashpProvider/implemetations/BCryptHashProvider';
import IHashProvider from './HashpProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
