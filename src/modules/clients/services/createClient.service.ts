import { hash } from 'bcryptjs';

import { IClient } from '@modules/clients/models/client.model';
import AppError from '@shared/server/errors/appError.model';
import securityConfig from '@config/security.config';
import IClientRepository from '@modules/clients/repositories/IClient.repository';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

class CreateClientService {
  constructor(private clientRepository: IClientRepository) {}

  async execute({ password, email, name }: IRequest): Promise<IClient> {
    const checkClientExists = await this.clientRepository.findByEmail(email);
    if (checkClientExists) {
      throw new AppError('Email already used!');
    }

    const hashedPassword = await hash(password, securityConfig.salt);

    const client = await this.clientRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return client;
  }
}

export default CreateClientService;
