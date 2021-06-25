import AppError from '@shared/server/errors/appError.model';
import ShowClientService from '@modules/clients/services/showClient.service';
import FakeClientRepository from '@modules/clients/repositories/fakeClient.repository';

let fakeClientRepository: FakeClientRepository;
let showClientService: ShowClientService;

describe('ShowClientService', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    showClientService = new ShowClientService(fakeClientRepository);
  });

  it('Should be able to Show a Client', async () => {
    const client = await fakeClientRepository.create({
      email: 'test@test.com',
      name: 'Test',
      password: 'test@123',
    });

    const showClient = await showClientService.execute({
      _id: client._id as string,
    });

    expect(showClient.email).toBe('test@test.com');
    expect(showClient.name).toBe('Test');
  });

  it("Shouldn't be able to Show a inexistent Client", async () => {
    await expect(
      showClientService.execute({
        _id: 'non-existent-client',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
