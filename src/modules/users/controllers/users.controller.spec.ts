import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { LoggerService } from '../../logger/services/logger.service';
import { HashingService } from '../../hashing/services/hashing.service';
import { LoggerModule } from '../../logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { HashingModule } from '../../hashing/hashing.module';
import { UsersRepositoryMemory } from '../repositories/users.repository.memory';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, ConfigModule, HashingModule],
      providers: [
        { provide: 'IUsersService', useClass: UsersService },
        { provide: 'IUsersRepository', useClass: UsersRepositoryMemory },
        { provide: 'ILoggerService', useClass: LoggerService },
        { provide: 'IHashingService', useClass: HashingService },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('# create', async () => {
    const result = await controller.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '1234',
    });

    expect(result).toEqual({
      id: 1,
      name: 'teste',
      email: 'teste@teste.com',
    });
  });
});
