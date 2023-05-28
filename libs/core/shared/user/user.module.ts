import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../base';
import { ConfigService } from '@nestjs/config';
import { User } from 'lib/common/entities';

@Module({
  imports: [
    DatabaseModule.register({
      getConfig: (configService: ConfigService) => {
        const dbConfig = configService.get('db');
        return Object.assign({}, dbConfig, dbConfig?.replication?.master);
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
