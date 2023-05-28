import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { JwtAccess, JwtPayload, JwtRefresh, Payload } from './auth.interface';
import { IUser, UserService } from '../shared/user';
import { hash } from 'libs/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
    private config: ConfigService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<IUser | null> {
    const user = await this.user.fetch(username);
    if (user.password === hash(password)) {
      const { password: _, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
      return result;
    }

    return null;
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (
      !this.jwt.verify(refreshToken, {
        secret: this.config.get('jwtRefreshSecret'),
      })
    ) {
      return false;
    }

    const payload = <{ sub: number }>this.jwt.decode(refreshToken);
    return payload.sub === data.userId;
  }

  public jwtSign(data: Payload): JwtAccess & JwtRefresh {
    const payload: JwtPayload = {
      sub: data.userId,
      username: data.username,
      role: data.role,
    };
    const accessResult = this.sign<JwtAccess>(payload, 'access');
    const refreshResult = this.sign<JwtRefresh>(payload, 'refresh', {
      secret: this.config.get('jwtRefreshSecret'),
      expiresIn: '7d',
    });
    return Object.assign<JwtAccess, JwtRefresh>(accessResult, refreshResult);
  }

  public refreshAccessToken<T>(data: Payload): T {
    const payload: JwtPayload = {
      sub: data.userId,
      ...data,
    };
    return this.sign<T>(payload, 'access');
  }

  private sign<T>(payload: any, name: string, options?: JwtSignOptions): T {
    const token = this.jwt.sign(payload, options);
    const expire = this.jwt.decode(token)['exp'];
    const entries = new Map([
      [`${name}Token`, token],
      [`${name}Expired`, expire],
    ]);
    return Object.fromEntries(entries) as T;
  }
}
