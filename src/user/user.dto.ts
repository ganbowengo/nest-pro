/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 19:30:02
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 11:25:54
 * @Descripttion :
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatedUserDto {
  @ApiPropertyOptional({ description: '用户Id' })
  readonly id: number;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly name: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({ description: '确认密码' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  readonly repassword: string;

  @ApiPropertyOptional({ description: '用户联系方式' })
  @IsString()
  readonly phone: string;

  @ApiPropertyOptional({ description: '用户年龄' })
  @IsNumber()
  readonly age: number;

  @ApiPropertyOptional({ description: '创建时间' })
  readonly create_time: Date;

  @ApiPropertyOptional({ description: '更新时间' })
  readonly update_time: Date;
}

export class GetUsersDto {
  @ApiPropertyOptional({ description: '当前页展示数量' })
  readonly pageSize: number;

  @ApiPropertyOptional({ description: '当前页码' })
  readonly pageNumber: number;
}
