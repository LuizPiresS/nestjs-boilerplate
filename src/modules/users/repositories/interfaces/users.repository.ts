import { CreateUserInputDto } from '../../dto/create-user-input.dto';
import { Users } from '../../entities/user.entity';

export interface IUsersRepository {
  create(data: CreateUserInputDto): Promise<Users>;
  countUsersByEmail(email: string): Promise<number>;
  findByEmail(email: string): Promise<Users[]>;
}
