/*
 * @Author       : ganbowen
 * @Date         : 2021-11-24 10:49:11
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-24 17:18:27
 * @Descripttion : 权限拦截器
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RbacInterceptor implements NestInterceptor {
  constructor(private readonly role: number) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    if (req.user.role > this.role) {
      throw new ForbiddenException('对不起你无此操作权限！');
    }
    return next.handle();
  }
}
