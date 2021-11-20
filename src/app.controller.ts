/*
 * @Author       : ganbowen
 * @Date         : 2021-11-19 19:28:18
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 14:39:04
 * @Descripttion : app Controller
 */
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
