/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 16:51:36
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-23 17:46:12
 * @Descripttion : logger
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/log';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    // 组装日志信息
    const logFormat = `+>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}
