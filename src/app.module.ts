import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import { HashingModule } from './modules/hashing/hashing.module';
import { LoggerModule } from './modules/logger/logger.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    LoggerModule,
    UsersModule,
    HashingModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USER'),
        password: configService.get<string>('TYPEORM_PASS'),
        database: configService.get<string>('TYPEORM_NAME'),
        entities: [Users],
        synchronize: configService.get<boolean>('TYPEORM_SYNC'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
