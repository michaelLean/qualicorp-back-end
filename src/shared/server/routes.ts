import { Router } from 'express';

import clientsRouter from '@modules/clients/routes/clients.routes';
import sessionRouter from '@modules/clients/routes/session.routes';

const router = Router();

router.use('/clients', clientsRouter);
router.use('/session', sessionRouter);

router.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

export default router;
