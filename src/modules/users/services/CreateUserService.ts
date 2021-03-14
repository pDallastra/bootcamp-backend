import { inject, injectable } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(@inject('UsersRepository') private usersRepository: IUsersRepository,
                @inject('HashProvider') private hashProvider: IHashProvider,) {}

    public async execute({name, email, password}: Request): Promise<User> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(checkUserExists) {
            throw new AppError('Email address already used.')
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }
}

export default CreateUserService;