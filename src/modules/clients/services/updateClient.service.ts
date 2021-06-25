import { hash } from 'bcryptjs';

import { IClient } from '../models/client.model';
import AppError from '@shared/server/errors/appError.model';
import securityConfig from '@config/security.config';
import IClientRepository from '@modules/clients/repositories/IClient.repository';

interface IRequest {
  name: string;
  password?: string;
  email: string;
  _id: string;
}

class UpdateClientService {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ password, email, name, _id }: IRequest): Promise<IClient> {
    const checkClientExists = await this.clientRepository.findById(_id);

    if (!checkClientExists) {
      throw new AppError("User doesn't exists");
    }

    if (password) {
      const hashedPassword = await hash(password, securityConfig.salt);

      await this.clientRepository.update({
        _id,
        email,
        name,
        password: hashedPassword,
      });
      return {
        _id,
        email,
        name,
      };
    }

    await this.clientRepository.update({
      _id,
      email,
      name,
    });
    return {
      _id,
      email,
      name,
    };
  }
}

export default UpdateClientService;
