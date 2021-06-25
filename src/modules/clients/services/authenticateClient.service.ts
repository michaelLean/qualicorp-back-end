import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import securityConfig from '@config/security.config';
import AppError from '@shared/server/errors/appError.model';
import IClientRepository from '@modules/clients/repositories/IClient.repository';
import { IClient } from '@modules/clients/models/client.model';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  client: IClient;
  token: string;
}

class AuthenticateClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const client = await this.clientRepository.findByEmail(email);

    if (!client) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, <string>client.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, securityConfig.secret, {
      subject: client.email,
      expiresIn: '1d',
    });
    return {
      client,
      token,
    };
  }
}

export default AuthenticateClientService;
