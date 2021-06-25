import { IClient } from '@modules/clients/models/client.model';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClient.dto';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<IClient>;
  update(data: ICreateClientDTO): Promise<IClient>;
  find(): Promise<IClient[]>;
  findById(id: string): Promise<IClient | null>;
  findByEmail(email: string): Promise<IClient | null>;
  delete(id: string): Promise<void>;
}
