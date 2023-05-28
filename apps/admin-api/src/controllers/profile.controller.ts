import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReqUser } from 'lib/common/decorators';
import { ResponseTransformInterceptor } from 'lib/common/interceptors';
import { JwtAuthGuard, Payload } from 'lib/core/auth';
import { ApiOkResponsePaginated } from 'lib/common/dtos';
import { ProfileResponseDto } from 'lib/common/dtos/Profile.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  @ApiOperation({ summary: 'Get Profile' })
  @ApiHeaders([
    {
      name: 'Authorization',
    },
  ])
  @ApiOkResponsePaginated(ProfileResponseDto)
  @Get('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ResponseTransformInterceptor<Payload>)
  getProfile(@ReqUser() user: Payload): Payload {
    return user;
  }
}
