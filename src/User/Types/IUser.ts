export interface ILogin {
    email: string,
    password: string
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    confirm_password?: string;
    created: any;
    updated: any;
    deleted?: any
}
