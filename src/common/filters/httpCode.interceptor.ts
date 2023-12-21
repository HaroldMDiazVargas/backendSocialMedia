import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpCodeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.method === 'POST') {
      request.res.statusCode = 200; // Set the desired HTTP status code for POST requests
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
