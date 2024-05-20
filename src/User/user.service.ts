import { Injectable } from '@nestjs/common';
import { ICreateUser, ILogin } from './Types/IUser';
import { UserRepository } from './Repositories/user.repository';
import { PrismaClient } from '@prisma/client';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
dotenv.config()

@Injectable()
export class UserService {

    private prisma: PrismaClient;
    constructor(
        private readonly UserRepository: UserRepository
    ) {
        this.prisma = new PrismaClient();
    }
    async CreateUser(data: Partial<ICreateUser>) {
        let exist_user = await this.prisma.user.findUnique({
            where: { email: data.email }
        })

        if (exist_user) throw 'Email já cadastrado.'
        if (data.password !== data.confirm_password) throw 'Senha e Confirme Senha devem ser iguais.'

        delete data.confirm_password
        data.created = moment().format('YYYY-MM-DD')
        data.updated = data.created

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        data.password = await bcrypt.hash(data.password, salt)

        return await this.UserRepository.CreateUser(data)
    }

    async Login(data: ILogin) {
        let user = await this.UserRepository.Login(data)

        const confirm_password = await bcrypt.compare(data.password, user.password);

        if (!confirm_password) {
            throw "Usuário ou senha incorretos";
        }

        let secret = process.env.JWT_SECRET

        let user_env = {
            user_id: user.user_id,
            name: user.name,
            email: user.email
        }

        const token = jwt.sign(user_env, secret, { expiresIn: '1d' });



        return {
            ...user_env,
            token
        };

    }
}