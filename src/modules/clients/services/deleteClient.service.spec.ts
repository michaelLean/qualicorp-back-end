import AppError from '@shared/server/errors/appError.model';
import DeleteClientService from '@modules/clients/services/deleteClient.service';
import FakeClientRepository from '@modules/clients/repositories/fakeClient.repository';

let fakeClientRepository: FakeClientRepository;
let deleteClientService: DeleteClientService;

describe('DeleteClientService', () => {
  beforeEach(() => {
    fakeClientRepository = new FakeClientRepository();
    deleteClientService = new DeleteClientService(fakeClientRepository);
  });

  it('Should be able to Delete a Client', async () => {
    const client = await fakeClientRepository.create({
      email: 'test@test.com',
      name: 'Test',
      password: 'test@123',
    });

    await deleteClientService.execute({
      _id: client._id as string,
    });

    const deletedClient = await fakeClientRepository.findById(
      client._id as string,
    );
    expect(deletedClient).toBe(null);
  });

  it("Shouldn't be able to Delete a inexistent Client", async () => {
    await expect(
      deleteClientService.execute({
        _id: 'non-existent-client',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
