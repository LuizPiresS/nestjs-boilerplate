import { UserInputDto } from '../dtos/user.input.dto';
import { IUsersRepository } from './interfaces/users.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(data: UserInputDto): Promise<Users> {
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }

  async countUsersByEmail(email: string): Promise<number> {
    return this.userRepository.count({ where: { email } });
  }

  async findByEmail(email: string): Promise<Users[]> {
    return this.userRepository.find({ where: { email } });
  }
}
