import { EmailAlreadyRegisteredError } from '../types/email-already-registered.error';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class EmailAlreadyRegisteredInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EmailAlreadyRegisteredError) {
          throw new HttpException('Email Already Registered', 409);
        } else {
          throw error;
        }
      }),
    );
  }
}
