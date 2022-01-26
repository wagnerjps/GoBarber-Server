import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

// Pasta raiz do projeto utilizando a bibliotéca 'path'
const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    tempFolder,
    uploadsFolder: path.resolve(tempFolder, 'uploads'),
    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filenName = `${fileHash}-${file.originalname}`;

            return callback(null, filenName);
        },
    }),
};
