export interface IErrorReturn {
    status?: string;
    message?: string;
    code?: number;
}

export interface ISuccessReturn {
    status?: string;
    message?: string;
    code?: number;
    result?: any;
    pagination?: any;
}

export interface IFilter {
    id?: number; //id especifico
    search?: string; //busca por palavra
    page?: number; //pagina atual
    perPage?: number; //limite por pagina
    filter?: any; //filter específicos de alguma rota
    date_start?: string; //data inicial
    date_end?: string; // data final
    orderBy?: string; // ordenar por
    order?: string; // asc, desc
    limit?: number; //limite de requisição.
}

export interface IAuthUser {
    user_id: number,
    name: string,
    email: string,
}