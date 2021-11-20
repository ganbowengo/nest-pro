/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 17:21:16
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 17:22:01
 * @Descripttion :
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 0,
          message: '请求成功',
        };
      }),
    );
  }
}
