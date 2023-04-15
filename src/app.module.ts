import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import config from './config/config';

@Module({
  imports: [ConfigModule.forRoot({ validate, isGlobal: true, load: [config] })],
  controllers: [],
  providers: [],
})
export class AppModule {}
