// client.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../client.service';
import { ClientRepository } from '../../database/repositories/clients/clientRepository';
import { JwtService } from '@nestjs/jwt';
import { ClientRole } from '../dtos/register-client-dto';
import { ClientEntityMock } from '../__mocks__/client.mock';

describe('ClientService', () => {
  let service: ClientService;
  let clientRepository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        JwtService,
        {
          provide: ClientRepository,
          useValue: {
            createWithHash: jest.fn().mockResolvedValue(ClientEntityMock),
            findAll: jest.fn().mockResolvedValue([ClientEntityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    clientRepository = module.get<ClientRepository>(ClientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(clientRepository).toBeDefined();
  });

  it('should create a client', async () => {
    const dto = {
      name: 'Tawan',
      email: 'tawan@gmail.com',
      password: '123456',
      role: ClientRole.CLIENT,
    };

    const client = await service.signUp(dto);
    console.log(client);
    expect(client).toHaveProperty('name', dto.name);
    expect(client).toHaveProperty('email', dto.email);
    expect(client).not.toHaveProperty('role');
    expect(clientRepository.createWithHash).toHaveBeenCalledWith(dto);
  });

  it('should return all clients', async () => {
    const clients = await service.findAll();
    expect(clients).toEqual([ClientEntityMock]);
    expect(clientRepository.findAll).toHaveBeenCalled();
  });
});
