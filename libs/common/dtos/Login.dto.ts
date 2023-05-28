import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  roles: string[];

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessExpired: number;

  @ApiProperty()
  refreshExpired: number;
}
