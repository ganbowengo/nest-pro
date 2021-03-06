/*
 * @Author       : ganbowen
 * @Date         : 2021-11-19 19:28:18
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-23 17:58:05
 * @Descripttion : 入口文件
 */

import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from './core/pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { AnyExceptionFilter } from './core/filter/any-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AnyExceptionFilter()); // 全局其他异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局http异常过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局成功拦截器
  app.useGlobalPipes(new ValidationPipe());
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('用户管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
  console.log('server start : http://localhost:3000/');
}
bootstrap();
