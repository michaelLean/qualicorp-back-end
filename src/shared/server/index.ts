import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import serverConfig from '@config/server.config';
import router from '@shared/server/routes';
import errorHandling from '@shared/server/middlewares/errorHandling.middleware';

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
server.use(router);
server.use(errorHandling);

server.listen(serverConfig.port, () => {
  console.log(`Server is listening on port ${serverConfig.port}`);
});
