import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStotageProvider';
import DiskStorageProvider from './StorageProvider/implemetations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);
