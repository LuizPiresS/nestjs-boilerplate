import { UserInputDto } from '../../dtos/user.input.dto';
import { Users } from '../../entities/user.entity';

export interface IUsersRepository {
  create(data: UserInputDto): Promise<Users>;
  countUsersByEmail(email: string): Promise<number>;
  findByEmail(email: string): Promise<Users[]>;
}
