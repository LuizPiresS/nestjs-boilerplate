import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users.repository';
import { LoggerService } from '../logger/services/logger.service';
import { LoggerModule } from '../logger/logger.module';
import { HashingService } from '../hashing/services/hashing.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';

@Module({
  providers: [
    { provide: 'IUsersService', useClass: UsersService },
    { provide: 'IUsersRepository', useClass: UsersRepository },
    { provide: 'ILoggerService', useClass: LoggerService },
    { provide: 'IHashingService', useClass: HashingService },
  ],
  imports: [LoggerModule, TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
})
export class UsersModule {}
