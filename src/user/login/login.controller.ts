/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 15:13:00
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 16:11:55
 * @Descripttion :
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { LoginService } from './login.service';
import { LoginDto } from './login.dto';

@ApiTags('用户登录')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: '登录' })
  @Post()
  async login(@Body() body: LoginDto): Promise<any> {
    return this.loginService.login(body);
  }
}
