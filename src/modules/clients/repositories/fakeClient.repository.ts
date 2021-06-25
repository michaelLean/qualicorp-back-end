import { v4 } from 'uuid';
import { IClient } from '@modules/clients/models/client.model';
import IClientRepository from '@modules/clients/repositories/IClient.repository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClient.dto';
import { hash } from 'bcryptjs';
import securityConfig from '@config/security.config';

class FakeClientRepository implements IClientRepository {
  private clients: IClient[] = [];

  async create({ name, email, password }: ICreateClientDTO): Promise<IClient> {
    const hashedPassword = await hash(password as string, securityConfig.salt);
    const client = {
      name,
      email,
      password: hashedPassword,
      _id: v4(),
    };
    this.clients.push(client);
    return client;
  }

  async update(client: ICreateClientDTO): Promise<IClient> {
    const clientIndex = this.clients.findIndex(
      clientFind => client._id === clientFind._id,
    );

    if (clientIndex > -1) {
      this.clients[clientIndex] = client;
    }
    return client;
  }

  async find(): Promise<IClient[]> {
    return this.clients;
  }

  async findById(id: string): Promise<IClient | null> {
    const client = this.clients.find(client => client._id === id);
    return client || null;
  }

  async findByEmail(email: string): Promise<IClient | null> {
    const client = this.clients.find(client => client.email === email);
    return client || null;
  }

  async delete(id: string): Promise<void> {
    const findIndex = this.clients.findIndex(client => client._id === id);
    this.clients.splice(findIndex, 1);
    return;
  }
}

export default FakeClientRepository;
