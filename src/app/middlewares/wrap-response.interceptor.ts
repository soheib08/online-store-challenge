import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (response === undefined || response === null) {
          // Default success response if nothing is returned
          return {
            success: true,
            message: 'Operation completed successfully',
          };
        }

        // Wrap existing response in a data property
        return {
          success: true,
          data: response,
        };
      }),
    );
  }
}
