import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from './Repositories/movie.repository';
import { IMovie } from './Types/IMovie';
import { IAuthUser } from 'src/DefaultTypes/IServicesDefault';
import { client_redis } from '../main'

@Injectable()
export class MovieService {
    private prisma: PrismaClient;
    constructor(
        private readonly MovieRepository: MovieRepository
    ) {
        this.prisma = new PrismaClient();
    }
    async Create(data: Partial<IMovie>, user: IAuthUser) {
        data.user_id = user.user_id
        return await this.MovieRepository.Create(data)
    }
    async Update(movie_id: string | number, data: Partial<IMovie>) {
        movie_id = Number(movie_id)
        return await this.MovieRepository.Update(movie_id, data)
    }
    async List() {

        if (await client_redis.exists('movies')) {

            const movies = await client_redis.get('movies')
            return JSON.parse(movies)
        }

        const create_chache = await this.MovieRepository.List()
        client_redis.set('movies', JSON.stringify(create_chache), { ex: 10 })
        return create_chache

    }
    async Delete(movie_id: string | number) {
        movie_id = Number(movie_id)
        return await this.MovieRepository.Delete(movie_id)
    }
}