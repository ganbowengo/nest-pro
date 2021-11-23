/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 16:09:15
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 16:09:15
 * @Descripttion :
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly name: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
