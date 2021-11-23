/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 10:57:00
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 16:42:05
 * @Descripttion :
 */
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { encryptPassword } from '../../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByName(username);
    if (!user) {
      throw new HttpException('用户不存在', 400);
    }
    const salt = user.password_salt;
    const hashPwd = encryptPassword(password, salt);
    if (hashPwd !== user.password) {
      throw new HttpException('密码不正确', 401);
    }
    return user;
  }

  async certificate(user: any): Promise<any> {
    const payload = {
      username: user.name,
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
