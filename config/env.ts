/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 10:53:47
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 10:57:00
 * @Descripttion :
 */
import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  return { path: filePath };
}
export default parseEnv();
