import { UserNotFoundError } from '../types/user-not-found.error';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class UserNotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UserNotFoundError) {
          throw new HttpException('User not found', 404);
        } else {
          throw error;
        }
      }),
    );
  }
}
