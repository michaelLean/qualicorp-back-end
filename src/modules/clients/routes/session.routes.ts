import { Router } from 'express';

import SessionController from '@modules/clients/controllers/session.controller';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
