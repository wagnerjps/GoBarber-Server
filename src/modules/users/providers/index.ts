import { container } from 'tsyringe';
import BCryptHashProvider from './hashpProvider/implemetations/BCryptHashProvider';
import IHashProvider from './hashpProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
