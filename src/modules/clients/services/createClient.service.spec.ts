import AppError from '@shared/server/errors/appError.model';
import CreateClientService from '@modules/clients/services/createClient.service';
import FakeClientRepository from '@modules/clients/repositories/fakeClient.repository';

let fakeClientRepository: FakeClientRepository;
let createClientService: CreateClientService;

describe('CreateClientService', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    createClientService = new CreateClientService(fakeClientRepository);
  });

  it('Should be able to Create a Client', async () => {
    const client = await createClientService.execute({
      email: 'test@test.com',
      name: 'Test',
      password: 'test@123',
    });

    expect(client).toHaveProperty('_id');
  });

  it("Shouldn't be able to Create a Client with an used email", async () => {
    await createClientService.execute({
      email: 'test@test.com',
      name: 'Test',
      password: 'test@123',
    });

    await expect(
      createClientService.execute({
        email: 'test@test.com',
        name: 'Test',
        password: 'test@123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
