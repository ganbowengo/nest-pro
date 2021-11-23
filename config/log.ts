/*
 * @Author       : ganbowen
 * @Date         : 2021-11-23 14:18:12
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-23 17:48:10
 * @Descripttion : 日志配置
 */
import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../../log');

export default {
  appenders: {
    console: {
      type: 'console',
    },
    access: {
      type: 'dateFile',
      filename: `${baseLogPath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd',
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExt: true,
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: `{\n  date: "%d", level: "%p", category: "%c", host: "%h", pid:"%z",\n  data: %m\n}`,
      },
      pattern: 'yyyy-MM-dd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: `{\n  date: "%d", level: "%p", category: "%c", host: "%h", pid:"%z",\n  data: %m\n}`,
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyy-MM-dd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
  },
  // 日志分类
  categories: {
    default: { appenders: ['console', 'app', 'errors'], level: 'DEBUG' },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
  pm2: true, // 使用 pm2 来管理项目时，打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};
