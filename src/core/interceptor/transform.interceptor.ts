/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 17:21:16
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-23 17:21:25
 * @Descripttion :
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from '../../utils/log';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        User: ${JSON.stringify(req.user)}
        Response data:\n ${JSON.stringify(data.data)}
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return {
          data,
          code: 0,
          message: '请求成功',
        };
      }),
    );
  }
}
