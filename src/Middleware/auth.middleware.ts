import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor() { }
    async use(req: Request & { user: any }, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (token) {
            const tokenValue = token.split(' ')[1];
            try {
                const verifyResult = jwt.verify(
                    tokenValue,
                    process.env.JWT_SECRET,
                    (error, decode) => {
                        if (error) {
                            throw 'Token inválido ou expirado, faça login novamente para obter um novo';
                        } else {
                            return decode;
                        }
                    },
                );

                req.user = verifyResult;
            } catch (error) {
                throw new BadRequestException({
                    error: 'Erro de validação',
                    message: 'Token Inválido',
                });
            }
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Erro de validação',
                    message: 'Token não fornecido',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        next();
    }
}