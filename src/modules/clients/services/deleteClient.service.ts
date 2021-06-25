import { IClient } from '../models/client.model';
import AppError from '@shared/server/errors/appError.model';
import IClientRepository from '@modules/clients/repositories/IClient.repository';

interface IRequest {
  _id: string;
}

class DeleteClientService {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ _id }: IRequest): Promise<void> {
    const client = await this.clientRepository.findById(_id);

    if (!client) {
      throw new AppError("User doesn't exists");
    }

    await this.clientRepository.delete(_id);

    return;
  }
}

export default DeleteClientService;
