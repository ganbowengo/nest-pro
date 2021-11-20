/*
 * @Author       : ganbowen
 * @Date         : 2021-11-19 19:28:18
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 11:05:48
 * @Descripttion : 根模块
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from 'db/db.module';

@Module({
  imports: [DbModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
