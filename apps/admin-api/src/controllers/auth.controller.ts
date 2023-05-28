import {
  Controller,
  Get,
  Post,
  UseGuards,
  UnauthorizedException,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUser } from 'lib/common/decorators';
import {
  ApiOkResponsePaginated,
  LoginResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
} from 'lib/common/dtos';
import { LoginRequestDto } from 'lib/common/dtos';
import {
  ExceptionMappingInterceptor,
  ResponseTransformInterceptor,
} from 'lib/common/interceptors';

import {
  AuthService,
  JwtAccess,
  JwtRefresh,
  JwtSign,
  JwtVerifyGuard,
  LocalLoginGuard,
  Payload,
} from 'libs/core/auth';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(ExceptionMappingInterceptor)
export class AuthController {
  constructor(private auth: AuthService) {}

  /**
   * See test/e2e/local-auth.spec.ts
   * need username, password in body
   * skip guard to @Public when using global guard
   */

  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiOkResponsePaginated(LoginResponseDto)
  @UseGuards(LocalLoginGuard)
  @Post('login')
  @UseInterceptors(ResponseTransformInterceptor<Payload & JwtSign>)
  public login(@ReqUser() user: Payload): Payload & JwtSign {
    const tokens = this.auth.jwtSign(user);
    // throw new UnauthorizedException()
    return {
      ...user,
      ...tokens,
    };
  }

  // Only verify is performed without checking the expiration of the access_token.
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiBody({
    type: RefreshTokenRequestDto,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
    },
  ])
  @ApiOkResponsePaginated(RefreshTokenResponseDto)
  @UseGuards(JwtVerifyGuard)
  @Post('refresh-token')
  @UseInterceptors(ResponseTransformInterceptor<JwtRefresh>)
  public jwtRefresh(
    @ReqUser() user: Payload,
    @Body('refreshToken') token?: string,
  ): JwtAccess {
    if (!token || !this.auth.validateRefreshToken(user, token)) {
      throw new UnauthorizedException('InvalidRefreshToken');
    }
    return this.auth.refreshAccessToken<JwtAccess>(user);
  }

  @ApiOperation({ summary: 'Logout' })
  @Get('logout')
  @UseInterceptors(ResponseTransformInterceptor<Record<string, any>>)
  public logout(): Record<string, any> {
    return {
      msg: 'Success to logout',
    };
  }

  // @Get('check')
  // @UseGuards(AuthenticatedGuard)
  // public check(@ReqUser() user: Payload): Payload {
  //   return user;
  // }

  // /**
  //  * See test/e2e/jwt-auth.spec.ts
  //  */
  // // @UseGuards(LocalAuthGuard)
  // // @Post('jwt/login')
  // // public jwtLogin(@ReqUser() user: Payload): JwtSign {
  // //   return this.auth.jwtSign(user);
  // // }
}
