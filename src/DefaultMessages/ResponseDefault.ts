import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IErrorReturn, ISuccessReturn } from '../DefaultTypes/IServicesDefault';

class SucessResponseDto implements ISuccessReturn {
    constructor(
        public code: number,
        public status: string,
        public message: string,
        public result: any = null,
        public pagination?: any, // Paginação agora é opcional
    ) { }
}

class ErrorResponseDto implements IErrorReturn {
    constructor(
        public code: number,
        public status: string,
        public message: string,
    ) { }
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const status_code = context.switchToHttp().getResponse().statusCode;
                let response: ISuccessReturn;

                const url = context.switchToHttp().getRequest();

                if (url?.path == '/email/external-site') {
                    return data;
                } else {
                    if (data && data.pagination) {
                        response = new SucessResponseDto(
                            status_code,
                            'Sucesso',
                            'Ação realizada com sucesso',
                            data.data,
                            data.pagination,
                        );
                    } else {
                        response = new SucessResponseDto(
                            status_code,
                            'Sucesso',
                            'Ação realizada com sucesso',
                            data,
                        );
                    }

                    return response;
                }
            }),
            catchError((error) => {
                if (error instanceof BadRequestException) {
                    const erro: any = error.getResponse();
                    const errorResponse = new ErrorResponseDto(
                        erro.statusCode || 400,
                        erro.status || 'erro de validação',
                        erro.message,
                    );
                    throw new HttpException(errorResponse, errorResponse.code);
                } else {
                    const internalServerError = new ErrorResponseDto(500, 'error', error);
                    throw new HttpException(internalServerError, 500);
                }
            }),
        );
    }
}