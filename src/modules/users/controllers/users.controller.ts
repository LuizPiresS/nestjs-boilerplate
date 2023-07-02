import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUsersService } from '../services/interfaces/users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInputDto } from '../dtos/user.input.dto';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUsersService')
    private readonly usersService: IUsersService,
  ) {}

  @ApiResponse({
    status: 409,
    description: 'Conflict - email already exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - unfilled fields',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  @Post()
  public async create(@Body() createUserDto: UserInputDto) {
    return this.usersService.create(createUserDto);
  }
}
