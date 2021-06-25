import { IClient, Client } from '@modules/clients/models/client.model';
import IClientRepository from '@modules/clients/repositories/IClient.repository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClient.dto';

class ClientRepository implements IClientRepository {
  async create({ email, name, password }: ICreateClientDTO): Promise<IClient> {
    const client = await Client.create({
      email,
      name,
      password,
    });
    return client;
  }

  async update(data: ICreateClientDTO): Promise<IClient> {
    const client: unknown = await Client.updateOne({ _id: data._id }, data, {
      new: true,
    });

    return client as IClient;
  }

  async find(): Promise<IClient[]> {
    const clients = await Client.find();
    return clients;
  }

  async findById(id: string): Promise<IClient | null> {
    const client = await Client.findById(id);
    return client;
  }

  async findByEmail(email: string): Promise<IClient | null> {
    const client = await Client.findOne({ email });
    return client;
  }

  async delete(id: string): Promise<void> {
    await Client.deleteOne({
      _id: id,
    });
    return;
  }
}

export default ClientRepository;
