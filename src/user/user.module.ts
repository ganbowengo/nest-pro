/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 10:37:17
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 14:32:54
 * @Descripttion :
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
