import { ApiProperty } from '@nestjs/swagger';
export class RefreshTokenRequestDto {
  @ApiProperty()
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  accessExpired: number;
}
