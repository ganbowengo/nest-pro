/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 09:56:27
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 09:57:51
 * @Descripttion :
 */
import * as crypto from 'crypto';

/**
 * 通过随机数制作密码盐
 * @returns
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * 加密密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}
