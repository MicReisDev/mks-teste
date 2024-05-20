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
    UseGuards
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateMovieDTO, UpdateMovieDTO } from './DTO/movie.dto';
import { IAuthUser, IErrorReturn, ISuccessReturn } from 'src/DefaultTypes/IServicesDefault';
import { MovieService } from './movie.service'
import { SuccessReturnDto, ErrorReturnDto } from 'src/DefaultDTO/Default.DTO';

@ApiTags('movie')
@ApiBearerAuth()
@Controller('movie')
export class MovieController {
    constructor(private readonly MovieService: MovieService) { }

    @Post('create')

    @ApiResponse({
        status: 201,
        description: 'The movie has been successfully created.',
        type: SuccessReturnDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: ErrorReturnDto,
    })
    @ApiBody({
        description: 'Create movie',
        type: CreateMovieDTO,
        examples: {
            example1: {
                value: {
                    "title": "Matrix",
                    "description": "Young programmer Thomas Anderson is tormented by strange nightmares in which he is always connected by cables to a huge computer system from the future. As the dream repeats itself, he begins to distrust reality. Thomas meets the mysterious world Morpheus and Trinity creates and discovers that he is the victim of an intelligent and artificial system called the Matrix, which manipulates people's minds and the illusion of a real one while using the brains and bodies of individuals to produce energy.",
                    "release_date": "1999-05-21",
                    "rating": 9.9,
                    "duration": 180,
                    "genre": "Sci-Fi",
                    "director": "Lana Wachowski"
                },
            },
        },
    })
    async CreateMovie(
        @Req() req: Request & { user: IAuthUser },
        @Body() data: CreateMovieDTO
    ): Promise<ISuccessReturn | IErrorReturn | any> {
        try {
            const user = req.user
            return this.MovieService.Create(data, user)
        } catch (e) {
            throw e
        }
    }

    @Put('update/:id')
    @ApiResponse({
        status: 201,
        description: 'The movie has been successfully updated.',
        type: SuccessReturnDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: ErrorReturnDto,
    })
    @ApiBody({
        description: 'Update movie',
        type: UpdateMovieDTO,
        examples: {
            example1: {
                value: {
                    "title": "Matrix",
                    "description": "Young programmer Thomas Anderson is tormented by strange nightmares in which he is always connected by cables to a huge computer system from the future. As the dream repeats itself, he begins to distrust reality. Thomas meets the mysterious world Morpheus and Trinity creates and discovers that he is the victim of an intelligent and artificial system called the Matrix, which manipulates people's minds and the illusion of a real one while using the brains and bodies of individuals to produce energy.",
                    "release_date": "1999-05-21",
                    "rating": 9.9,
                    "duration": 180,
                    "genre": "Sci-Fi",
                    "director": "Lana Wachowski"
                },
            },
        },
    })
    async UpdateMovie(
        @Req() req: Request,
        @Body() data: UpdateMovieDTO,
        @Param('id') id: string
    ): Promise<ISuccessReturn | IErrorReturn | any> {
        try {
            return this.MovieService.Update(id, data)
        } catch (e) {
            throw e
        }
    }

    @Get('list')
    @ApiResponse({
        status: 201,
        description: 'The movies has been successfully listed in.',
        type: SuccessReturnDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: ErrorReturnDto,
    })
    async ListMovies(): Promise<ISuccessReturn | IErrorReturn | any> {
        try {
            return this.MovieService.List()
        } catch (e) {
            throw e
        }
    }


    @Delete('delete/:id')
    @ApiResponse({
        status: 201,
        description: 'The movie has been successfully deleted.',
        type: SuccessReturnDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: ErrorReturnDto,
    })
    async Delete(
        @Param('id') id: string
    ): Promise<ISuccessReturn | IErrorReturn | any> {
        try {
            return this.MovieService.Delete(id)
        } catch (e) {
            throw e
        }
    }

}