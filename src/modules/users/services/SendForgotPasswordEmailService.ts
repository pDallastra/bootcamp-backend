import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';


interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(@inject('UsersRepository') private usersRepository: IUsersRepository,
                @inject('MailProvider') private mailProvider: IMailProvider,
                @inject('UserTokensRepository') private userTokensRepository: IUserTokensRepository ) {}

    public async execute({email}: Request): Promise<void> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email not register previously');
        }

        await this.userTokensRepository.generate(user.id);
        
        this.mailProvider.sendMail(email, 'Pedido de Recuperacao de Senha Recebido');
    }
}

export default SendForgotPasswordEmailService;