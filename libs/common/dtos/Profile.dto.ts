import { ApiProperty } from '@nestjs/swagger';
export class ProfileRequestDto {}

export class ProfileResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  roles: string[];
}
