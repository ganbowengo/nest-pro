/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 10:58:34
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 14:59:23
 * @Descripttion :
 */

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from '../config/env';

import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [UserEntity],
        host: configService.get('DB_HOST', 'localhost'), // 主机
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', '995821G@gbw'), // 密码
        database: configService.get('DB_DATABASE', 'user'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
  ],
})
export class DbModule {}
