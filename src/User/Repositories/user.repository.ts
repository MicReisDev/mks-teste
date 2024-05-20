import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ICreateUser, ILogin } from '../Types/IUser';

@Injectable()
export class UserRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async CreateUser(data: Partial<ICreateUser>) {
        const user = await this.prisma.user.create({ data: { email: data.email, name: data.name, password: data.password } })
        return user.user_id
    }
    async Login(data: ILogin) {
        let exist_user = await this.prisma.user.findUnique({
            where: { email: data.email }
        })
        if (!exist_user) throw 'Usuário ou Senha incorretos'

        return exist_user

    }
}