import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const PORT = 3333;

const app = express();

app.use(
    cors({
        origin: '*',
        methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    }),
);
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        // eslint-disable-next-line no-console
        console.log(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error.',
        });
    },
);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Servidor rodando na porta', PORT);
});
