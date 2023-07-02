import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashingService } from './interfaces/hashing-service.interface';
@Injectable()
export class HashingService implements IHashingService {
  public async hashingPassword(
    password: string,
    salt: number,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
