import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy, JwtVerifyStrategy } from './strategies';
import { UserModule } from 'libs/core/shared/user';
import { configuration } from 'lib/common/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthSerializer,
    LocalStrategy,
    JwtStrategy,
    JwtVerifyStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
