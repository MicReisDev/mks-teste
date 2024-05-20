import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDecimal,
    Min,
    Max,
    IsNumber,
} from 'class-validator';
import { Messages } from 'src/DefaultMessages/Messagem';


export class CreateMovieDTO {

    @IsString({ message: Messages.IsString('Título') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Título') })
    title: string;

    @IsString({ message: Messages.IsString('Descrição') })
    @IsOptional()
    description?: string;

    @IsString({ message: Messages.IsString('Data de lançamento') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Data de lançamento') })
    release_date: string;

    @IsNumber()
    @Min(0, { message: Messages.minLength('Avaliação', 10) })
    @Max(10, { message: Messages.maxLength('Avaliação', 10) })
    @IsNotEmpty({ message: Messages.isNotEmpty('Avaliação') })
    @IsOptional()
    rating?: number;

    @IsString({ message: Messages.IsString('Gênero') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Gênero') })
    genre: string;

    @IsNotEmpty({ message: Messages.isNotEmpty('Duração') })
    duration: number;

    @IsString({ message: Messages.IsString('Diretor') })
    @IsNotEmpty({ message: Messages.isNotEmpty('Diretor') })
    director: string;
}

export class UpdateMovieDTO {
    @IsString({ message: Messages.IsString('Título') })
    @IsOptional()
    @IsNotEmpty({ message: Messages.isNotEmpty('Título') })
    title?: string;

    @IsString({ message: Messages.IsString('Descrição') })
    @IsOptional()
    @IsNotEmpty({ message: Messages.isNotEmpty('Descrição') })
    description?: string;

    @IsString({ message: Messages.IsString('Data de lançamento') })
    @IsOptional()
    @IsNotEmpty({ message: Messages.isNotEmpty('Data de lançamento') })
    release_date?: string;

    @Min(0, { message: Messages.minLength('Avaliação', 0) })
    @Max(10, { message: Messages.maxLength('Avaliação', 10) })
    @IsOptional()
    @IsNotEmpty({ message: Messages.isNotEmpty('Avaliação') })
    rating?: number;

    @Min(0)
    @IsOptional()
    @IsNotEmpty({ message: Messages.isNotEmpty('Duração') })
    duration: number;

    @IsString({ message: Messages.IsString('Gênero') })
    @IsOptional()
    @IsNotEmpty({ message: Messages.isNotEmpty('Gênero') })
    genre?: string;

    @IsString({ message: Messages.IsString('Diretor') })
    @IsOptional()
    @IsNotEmpty({ message: Messages.isNotEmpty('Diretor') })
    director?: string;
}