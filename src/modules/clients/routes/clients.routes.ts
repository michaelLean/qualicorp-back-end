import { Router } from 'express';

import ClientsController from '@modules/clients/controllers/clients.controller';
import ensureAuthenticated from '@shared/server/middlewares/ensureAuthenticate.middleware';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.post('/', clientsController.create);
clientsRouter.use(ensureAuthenticated);
clientsRouter.get('/:id', clientsController.show);
clientsRouter.put('/:id', clientsController.update);
clientsRouter.delete('/:id', clientsController.delete);

export default clientsRouter;
