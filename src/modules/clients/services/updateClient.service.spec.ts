import AppError from '@shared/server/errors/appError.model';
import UpdateClientService from '@modules/clients/services/updateClient.service';
import FakeClientRepository from '@modules/clients/repositories/fakeClient.repository';

let fakeClientRepository: FakeClientRepository;
let updateClientService: UpdateClientService;

describe('UpdateClientService', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    updateClientService = new UpdateClientService(fakeClientRepository);
  });

  it('Should be able to Update a Client', async () => {
    const client = await fakeClientRepository.create({
      email: 'test@test.com',
      name: 'Test',
      password: 'test@123',
    });

    const updatedClient = await updateClientService.execute({
      email: 'test1@test.com',
      name: 'Test 1',
      password: 'test@1234',
      _id: client._id as string,
    });

    expect(updatedClient.email).toBe('test1@test.com');
    expect(updatedClient.name).toBe('Test 1');
  });

  it("Shouldn't be able to Update a Client without update the password", async () => {
    const client = await fakeClientRepository.create({
      email: 'test@test.com',
      name: 'Test',
      password: 'test@123',
    });

    const updatedClient = await updateClientService.execute({
      email: 'test1@test.com',
      name: 'Test 1',
      _id: client._id as string,
    });

    expect(updatedClient.email).toBe('test1@test.com');
    expect(updatedClient.name).toBe('Test 1');
  });

  it("Shouldn't be able to Update a Client without _id", async () => {
    await expect(
      updateClientService.execute({
        email: 'test1@test.com',
        name: 'Test 1',
        _id: 'non-existent-client',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
