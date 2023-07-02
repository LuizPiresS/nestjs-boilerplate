import { IUsersRepository } from './interfaces/users.repository';
import { UserInputDto } from '../dtos/user.input.dto';
import { Users } from '../entities/user.entity';

export class UsersRepositoryMemory implements IUsersRepository {
  private readonly users: any[];

  constructor() {
    this.users = [];
  }

  async create(data: UserInputDto): Promise<Users> {
    this.users.push(data);
    return {
      id: 1,
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    };
  }

  async countUsersByEmail(email: string): Promise<number> {
    return this.users.filter((user) => user.email === email).length;
  }

  async findByEmail(email: string): Promise<Users[]> {
    const user = this.users.filter((user) => user.email === email);

    return [
      {
        id: 1,
        name: 'teste',
        email: 'teste@teste.com',
        password: 'teste',
      },
    ];
  }
}
