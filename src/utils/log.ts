/*
 * @Author       : ganbowen
 * @Date         : 2021-11-23 15:56:13
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-23 17:38:04
 * @Descripttion : 日志文件
 */
import * as path from 'path';
import * as log from 'log4js';
import * as moment from 'moment';
import * as chalk from 'chalk';
import * as util from 'util';
import * as StackTrace from 'stacktrace-js';
import config from '../../config/log';

// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

// 内容跟踪类
export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

// 设置日志输出格式及内容
log.addLayout('awesome-nest', (logConfig: any) => {
  return (logEvent: log.LoggingEvent): string => {
    let moduleName = '';
    let position = '';
    const messageList = [];
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        // 显示触发日志的坐标（行，列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`;
        }
        return;
      }

      if (typeof value !== 'string') {
        value = util.inspect(value, false, 3, true);
      }

      messageList.push(value);
    });
    let levelOutput = `[${logEvent.level}] ${messageList.join(' ')}`;
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
    const dateOutput = `${moment(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    )}`;
    const moduleOutput = moduleName ? `[${moduleName}] ` : '[LoggerService] ';
    const positionOutput: string = position ? ` [${position}]` : '';
    console.log('++++', levelOutput);
    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = chalk.hex('#DD4C35')(levelOutput);
        break;
      default:
        levelOutput = chalk.grey(levelOutput);
        break;
    }

    return `${chalk.green(typeOutput)}${dateOutput}  ${chalk.yellow(
      moduleOutput,
    )}123+++++${levelOutput}${positionOutput}`;
  };
});

// 注入配置项
log.configure(config);

// 实例化
const logger = log.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args) {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args) {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args) {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args) {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args) {
    const loggerCustom = log.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
