import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    const {email, password} = req.body;

    const authenticateUser = new AuthenticateUserService();

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

})

export default sessionsRouter;
 
/* ------- Utilizado durante aprendizado Bootcamp
const appointmentsRepository = new AppointmentRepository();
*/