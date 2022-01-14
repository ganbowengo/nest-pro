/*
 * @Author       : ganbowen
 * @Date         : 2021-11-24 10:57:21
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-24 16:58:02
 * @Descripttion : 守卫的方式实现权限操作
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    // private readonly role: number,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get('no-auth', context.getHandler());
    if (noAuth) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(1, user);
    // if (user.role > this.role) {
    if (user.role > -1) {
      throw new ForbiddenException('对不起，您无权操作');
    }
    return true;
  }
}
