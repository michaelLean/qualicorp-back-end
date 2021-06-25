import AppError from '@shared/server/errors/appError.model';
import AuthenticateClientService from '@modules/clients/services/authenticateClient.service';
import FakeClientsRepository from '@modules/clients/repositories/fakeClient.repository';

let fakeClientsRepository: FakeClientsRepository;
let authenticateClientService: AuthenticateClientService;

describe('AuthenticateClientService', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    authenticateClientService = new AuthenticateClientService(
      fakeClientsRepository,
    );
  });

  it('should be able to Authenticate the Client', async () => {
    await fakeClientsRepository.create({
      email: 'test@test.com.br',
      name: 'test',
      password: '123456',
    });

    const token = await authenticateClientService.execute({
      email: 'test@test.com.br',
      password: '123456',
    });

    expect(token).toHaveProperty('token');
  });

  it('Should be able to verify if Client exists', async () => {
    const client = authenticateClientService.execute({
      email: 'test@test.com.br',
      password: '123456',
    });
    await expect(client).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to verify if the password matches', async () => {
    await fakeClientsRepository.create({
      email: 'test@test.com.br',
      name: 'test',
      password: 'test@123',
    });

    await expect(
      authenticateClientService.execute({
        email: 'test@test.com.br',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
