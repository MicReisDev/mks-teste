

import { Injectable } from '@nestjs/common';
import { Movie, PrismaClient } from '@prisma/client';
import { IMovie } from '../Types/IMovie';
import * as moment from 'moment';


@Injectable()

export class MovieRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async Create(data: Partial<IMovie>): Promise<Number> {

        const created = moment().toDate()
        const updated = created
        const release_date = moment(data.release_date).toDate()

        const movie = await this.prisma.movie.create({
            data:
            {
                title: data.title,
                description: data.description,
                genre: data.genre,
                director: data.director,
                release_date,
                rating: data.rating,
                duration: data.duration,
                user_id: data.user_id,
                created,
                updated
            }
        })
        return movie.movie_id
    }

    async List(): Promise<Movie[]> {
        const movies = await this.prisma.movie.findMany({ where: { deleted: null } })
        return movies
    }


    async Update(movie_id: number, data: Partial<IMovie>): Promise<number> {
        const updated = moment().toDate()



        const movie = await this.prisma.movie.update({
            where: { movie_id },
            data:
            {
                ...data,
                release_date: data.release_date ? moment(data.release_date).toDate() : undefined,
                updated,
            }
        })
        return movie.movie_id
    }

    async Delete(movie_id: number): Promise<number> {
        const deleted = moment().toDate()

        const movie = await this.prisma.movie.update({
            where: { movie_id },
            data:
            {
                deleted
            }
        })
        return movie.movie_id
    }

}