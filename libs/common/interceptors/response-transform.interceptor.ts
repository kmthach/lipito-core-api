import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IResponse } from '../interfaces';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => ({
        statusCode: res['statusCode'],
        data: data,
        errors: null,
        message: null,
      })),
    );
  }
}
