import { CreateUserInputDto } from '../../dto/create-user-input.dto';
import { Users } from '../../entities/user.entity';

export interface IUsersService {
  create(createUserDto: CreateUserInputDto): Promise<Users>;
  findByEmail(email: string): Promise<Users[]>;
}
