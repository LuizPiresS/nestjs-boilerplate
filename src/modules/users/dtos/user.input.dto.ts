import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserInputDto {
  @ApiProperty({
    description: 'User email that will be used to login',
    example: 'random@random.com',
  })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description:
      'The password must contain at least one uppercase letter, one special character and one number and be made up of at least 8 characters.',
    example: 'R@nd0mP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;

  @ApiProperty({
    description: 'Full name',
    example: 'Random Name',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;
}
