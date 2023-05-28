import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class ExceptionMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) =>
        of({
          statusCode: err.status,
          data: null,
          errors: [err.name],
          message: err.message,
        }),
      ),
    );
  }
}
