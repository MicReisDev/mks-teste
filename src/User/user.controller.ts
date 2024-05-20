import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Req,
    Request,
    Query,
    Headers,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateUserDTO, LoginDTO } from './DTO/user.dto';
import { UserService } from './user.service';
import { throwError } from 'rxjs';
import { IErrorReturn, ISuccessReturn } from 'src/DefaultTypes/IServicesDefault';
import { ErrorReturnDto, SuccessReturnDto } from 'src/DefaultDTO/default.DTO';

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Post('create')
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
        type: SuccessReturnDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: ErrorReturnDto,
    })
    @ApiBody({
        description: 'Create User DTO',
        type: CreateUserDTO,
        examples: {
            example1: {
                summary: 'Exemplo Payload',
                value: {
                    name: 'admin@exemplo.com',
                    email: 'admin@exemplo.com',
                    password: '123456',
                    confirm_password: '123456',
                },
            },
        },
    })
    async CreateUser(
        @Req() req: Request,
        @Body() data: CreateUserDTO
    ): Promise<ISuccessReturn | IErrorReturn | any> {
        try {
            return this.UserService.CreateUser(data)
        } catch (e) {
            throw e
        }
    }

    @Post('login')
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully logged in.',
        type: SuccessReturnDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: ErrorReturnDto,
    })
    @ApiBody({
        description: 'Login DTO',
        type: LoginDTO,
        examples: {
            example1: {
                summary: 'admin@exemplo.com',
                value: {
                    email: 'admin@exemplo.com',
                    password: '123456'
                },
            },
        },
    })
    async Login(
        @Req() req: Request,
        @Body() data: LoginDTO
    ): Promise<ISuccessReturn | IErrorReturn | any> {

        try {
            return await this.UserService.Login(data)
        } catch (e) {
            throw e
        }

    }

}