/*
 * @Author       : ganbowen
 * @Date         : 2021-11-24 16:40:56
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-24 16:43:54
 * @Descripttion : 不走验证
 */
import { SetMetadata } from '@nestjs/common';

export const NoAuth = (...args: string[]) => SetMetadata('no-auth', args);
