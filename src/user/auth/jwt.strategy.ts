/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 11:29:52
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 14:03:41
 * @Descripttion :
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constats';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return {
      userId: payload.sub,
      username: payload.username,
      realName: payload.realName,
      role: payload.role,
    };
  }
}
