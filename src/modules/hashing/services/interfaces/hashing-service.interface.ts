export interface IHashingService {
  hashingPassword(password: string, salt: number): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
