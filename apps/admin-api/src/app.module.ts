import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as controllers from './controllers';
import { configuration } from 'libs/common/config';
import { AuthModule } from 'libs/core/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
  ],
  controllers: Object.values(controllers),
  providers: [],
})
export class AppModule {}
