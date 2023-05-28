import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

type options = {
  getConfig: (a: ConfigService) => any;
};
@Module({})
export class DatabaseModule {
  static register(options: options): DynamicModule {
    return TypeOrmModule.forRootAsync({
      useFactory: options.getConfig,
      inject: [ConfigService],
    });
  }
}
