import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsIn,
    IsBoolean,
    IsArray,
    IsDateString,
} from 'class-validator';
import { Messages } from 'src/DefaultMessages/Messagem';


export class LoginDTO {
    @IsString({ message: Messages.IsString('Email') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Email') })
    readonly email: string;

    @IsString({ message: Messages.IsString('Senha') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Senha') })
    readonly password: string;
}


export class CreateUserDTO {
    @IsString({ message: Messages.IsString('Nome') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Nome') })
    readonly name: string;

    @IsString({ message: Messages.IsString('Email') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Email') })
    readonly email: string;

    @IsString({ message: Messages.IsString('Senha') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Senha') })
    readonly password: string;

    @IsString({ message: Messages.IsString('Confirme Senha') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Confirme Senha') })
    readonly confirm_password: string;
}
