import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';

export class TransformResponseDto<T> {
  @ApiProperty()
  statusCode: number;
  data: T;
  @ApiProperty()
  errors: string[];

  @ApiProperty()
  message: string;
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(TransformResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(TransformResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  );
