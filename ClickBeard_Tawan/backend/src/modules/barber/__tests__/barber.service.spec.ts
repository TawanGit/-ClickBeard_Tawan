import { Test, TestingModule } from '@nestjs/testing';
import { BarberService } from '../barber.service';
import { BarberRepository } from '../../database/repositories/barbers/barberRepository';
import { RegisterBarberDto } from '../dtos/register-barber-dto';
import { BarberEntityMock } from '../__mocks__/barber.mock';
import { BarberSpecialtiesRepository } from '../../database/repositories/barber_specialties/barberSpecialtiesRepository';

describe('BarberService', () => {
  let service: BarberService;
  let barberRepository: BarberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarberService,
        {
          provide: BarberRepository,
          useValue: {
            createWithSpecialty: jest.fn().mockResolvedValue(BarberEntityMock),
            findAll: jest.fn().mockResolvedValue([BarberEntityMock]),
            findByCpf: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: BarberSpecialtiesRepository,
          useValue: {
            addSpecialtyToBarber: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BarberService>(BarberService);
    barberRepository = module.get<BarberRepository>(BarberRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(barberRepository).toBeDefined();
  });

  it('should create a barber', async () => {
    const dto: RegisterBarberDto = {
      cpf: '12345678999',
      name: 'Tawan',
      age: 18,
      specialtyId: 1,
      accounting_date: new Date(),
    };

    const barber = await service.signUp(dto);

    expect(barberRepository.createWithSpecialty).toHaveBeenCalledWith(dto);
    expect(barber).toEqual(BarberEntityMock);
  });

  it('should return all barbers', async () => {
    const barbers = await service.findAll();
    expect(barberRepository.findAll).toHaveBeenCalled();
    expect(barbers).toEqual([BarberEntityMock]);
  });
});
