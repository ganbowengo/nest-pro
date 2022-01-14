/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 10:37:32
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-24 21:18:04
 * @Descripttion : user controller
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  //   UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreatedUserDto, GetUsersDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
// import { RbacInterceptor } from 'src/core/interceptor/rbac.interceptor';
import { RbacGuard } from 'src/core/guards/rbac.guard';
import { NoAuth } from 'src/core/decorator/noauth.decorator';
@ApiTags('用户管理')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RbacGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 获取指定用户
   * @param id
   * @returns
   */
  @ApiOperation({ summary: '获取指定用户' })
  @NoAuth()
  @Get(':id')
  async getUserById(@Param('id') id) {
    return await this.userService.getUserById(id);
  }

  /**
   * 获取所有用户
   * @param query
   * @returns
   */
  @ApiOperation({ summary: '获取所有用户' })
  @Get()
  async getUsers(@Body() query: GetUsersDto) {
    return await this.userService.getUsers(query);
  }

  /**
   * 新增用户
   * @param user
   * @returns
   */
  @ApiOperation({ summary: '新增用户' })
  @Post()
  async createUser(@Body() user: CreatedUserDto) {
    return await this.userService.create(user);
  }

  /**
   * 更新用户
   * @param id
   * @param user
   * @returns
   */
  @ApiOperation({ summary: '更新用户' })
  @Put(':id')
  async updateUser(@Param('id') id, @Body() user) {
    return await this.userService.update(id, user);
  }

  /**
   * 删除用户
   * @param id
   * @returns
   */
  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  async removeUser(@Param('id') id) {
    return await this.userService.remove(id);
  }
}
