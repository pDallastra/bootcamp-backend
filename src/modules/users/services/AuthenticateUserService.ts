import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import {inject,injectable} from 'tsyringe';

import authConfig from '@config/auth';
import AppError from  '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

@injectable()
class AutheticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({email, password}: Request): Promise<Response> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Incorrect credentials', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Incorrect credentials', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return {
            user,
            token
        }
    }       
}

export default AutheticateUserService;