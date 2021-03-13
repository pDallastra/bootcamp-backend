import {Request, Response} from 'express';
import {container} from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {email, password} = req.body;

        const authenticateUser = container.resolve(AuthenticateUserService);;

        const {user, token} = await authenticateUser.execute({email, password});

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
            };

        return res.status(200).json({user: userWithoutPassword, token});
    }
}