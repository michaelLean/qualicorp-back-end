import { Request, Response } from 'express';

import serverResponse from '@shared/server/response';
import AuthenticateClientService from '@modules/clients/services/authenticateClient.service';
import ClientRepository from '@modules/clients/repositories/client.repository';

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const clientRepository = new ClientRepository();
    const authenticateClientService = new AuthenticateClientService(
      clientRepository,
    );
    const { token } = await authenticateClientService.execute({
      email,
      password,
    });

    return serverResponse(response, { token });
  }
}

export default SessionController;
