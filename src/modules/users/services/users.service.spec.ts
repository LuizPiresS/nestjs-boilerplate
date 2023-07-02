import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { LoggerService } from '../../logger/services/logger.service';
import { HashingService } from '../../hashing/services/hashing.service';
import { LoggerModule } from '../../logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { HashingModule } from '../../hashing/hashing.module';
import { UsersRepositoryMemory } from '../repositories/users.repository.memory';
import { EmailAlreadyRegisteredError } from '../../../common/errors/types/email-already-registered.error';
import { IHashingService } from '../../hashing/services/interfaces/hashing-service.interface';
describe('UsersService', () => {
  let service: UsersService;
  let hashingService: IHashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'IUsersRepository', useClass: UsersRepositoryMemory },
        { provide: 'ILoggerService', useClass: LoggerService },
        { provide: 'IHashingService', useClass: HashingService },
      ],
      imports: [LoggerModule, ConfigModule, HashingModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
    hashingService = module.get<HashingService>('IHashingService');
  });

  describe('create', () => {
    test('should create new user', async () => {
      hashingService.hashingPassword = jest.fn().mockResolvedValue({});

      const result = await service.create({
        name: 'teste',
        email: 'teste@teste.com',
        password: 'teste',
      });

      expect(result).toEqual({
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
      });

      expect(hashingService.hashingPassword).toHaveBeenCalledTimes(1);
    });
  });

  it('not should be created a new user if user already registered', async () => {
    await service.create({
      name: 'teste',
      email: 'user@gmail.com',
      password: '1234',
    });
    await expect(
      service.create({
        name: 'teste',
        email: 'user@gmail.com',
        password: '1234',
      }),
    ).rejects.toThrow(new EmailAlreadyRegisteredError());
  });
});
