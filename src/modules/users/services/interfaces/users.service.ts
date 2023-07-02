import { UserInputDto } from '../../dtos/user.input.dto';
import { UserOutputDto } from '../../dtos/user.output.dto';

export interface IUsersService {
  create(createUserDto: UserInputDto): Promise<UserOutputDto>;
  findByEmail(email: string): Promise<UserOutputDto[]>;
}
