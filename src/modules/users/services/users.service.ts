import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../repositories/interfaces/users.repository';
import { IUsersService } from './interfaces/users.service';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { ILoggerService } from '../../logger/services/interfaces/logger-service.interface';
import { IHashingService } from '../../hashing/services/interfaces/hashing-service.interface';
import { Users } from '../entities/user.entity';
import { EmailAlreadyRegisteredError } from '../../../common/errors/types/email-already-registered.error';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,

    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,

    @Inject('IHashingService')
    private readonly hashingService: IHashingService,

    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserInputDto): Promise<Users> {
    const existingUser = await this.usersRepository.countUsersByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      this.loggerService.contextName = `${UsersService.name}.create`;
      this.loggerService.error('Email Already Registered');
      throw new EmailAlreadyRegisteredError();
    }

    const hashedPassword = await this.hashingService.hashingPassword(
      createUserDto.password,
      +this.configService.get('SALTS'),
    );

    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findByEmail(email: string): Promise<Users[]> {
    return this.usersRepository.findByEmail(email);
  }
}
