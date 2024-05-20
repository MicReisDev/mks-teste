import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AllRoutesMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ branchDev: 'Servidor teste MKS' });
    }
}