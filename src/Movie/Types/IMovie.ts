export interface IMovie {
    movie_id: number;
    title: string;
    description?: string;
    release_date: string;
    rating?: number;
    genre: string;
    duration: number;
    director: string;
    user_id?: number;
    created: Date;
    updated: Date;
    deleted?: Date;
};
