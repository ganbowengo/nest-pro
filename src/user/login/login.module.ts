/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 15:12:15
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 15:18:21
 * @Descripttion :
 */
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
