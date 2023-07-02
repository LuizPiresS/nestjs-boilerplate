import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';

describe('HashingService', () => {
  let hasingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();
    hasingService = module.get<HashingService>(HashingService);
  });

  it('should encrypt password', () => {
    const input = 'P4ssw0rd@';
    const SALT_OR_ROUNDS = 13;
    const output = hasingService.hashingPassword(input, SALT_OR_ROUNDS);
    expect(output).not.toBe(input);
  });
});
