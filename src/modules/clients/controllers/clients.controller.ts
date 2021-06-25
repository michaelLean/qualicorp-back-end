import { Request, Response } from 'express';

import serverResponse from '@shared/server/response';
import CreateClientService from '@modules/clients/services/createClient.service';
import UpdateClientService from '@modules/clients/services/updateClient.service';
import ClientRepository from '@modules/clients/repositories/client.repository';
import ShowClientService from '../services/showClient.service';
import DeleteClientService from '../services/deleteClient.service';

class ClientsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const clientRepository = new ClientRepository();
    const createClientService = new CreateClientService(clientRepository);
    const client = await createClientService.execute({
      name,
      email,
      password,
    });

    return serverResponse(response, {
      name: client.name,
      _id: client._id,
      email: client.email,
    });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const { id } = request.params;

    const clientRepository = new ClientRepository();
    const updateClientService = new UpdateClientService(clientRepository);
    const client = await updateClientService.execute({
      _id: id,
      name,
      email,
      password,
    });

    return serverResponse(response, {
      name: client.name,
      _id: client._id,
      email: client.email,
    });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const clientRepository = new ClientRepository();
    const showClientService = new ShowClientService(clientRepository);
    const { email, name, _id } = await showClientService.execute({ _id: id });
    return serverResponse(response, { email, name, _id });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const clientRepository = new ClientRepository();
    const deleteClientService = new DeleteClientService(clientRepository);
    await deleteClientService.execute({ _id: id });
    return serverResponse(response, 'No Content', 204);
  }
}

export default ClientsController;
