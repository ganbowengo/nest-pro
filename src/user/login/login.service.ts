/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 10:41:13
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 16:29:38
 * @Descripttion :
 */
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoginService {
  constructor(private readonly authService: AuthService) {}

  async login(user): Promise<any> {
    const { name, password } = user;
    const res = await this.authService.validateUser(name, password);
    const token = await this.authService.certificate(res);
    return token;
  }
}
