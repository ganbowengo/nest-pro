/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 10:38:02
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-23 19:22:52
 * @Descripttion : user service
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Page } from '../core/interface/page.interface';
import { UserResult } from './user.interface';
import { makeSalt, encryptPassword } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // 获取指定用户
  async getUserById(id): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  // 获取指定用户
  async getUserByName(name): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { name } });
  }

  // 获取用户列表
  async getUsers(query): Promise<Page<UserEntity>> {
    const qb = await getRepository(UserEntity).createQueryBuilder('user');
    qb.where('1 = 1');
    qb.orderBy('user.create_time', 'DESC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const posts = await qb.getMany();

    return { count: count, list: posts };
  }

  // 新增用户
  async create(user): Promise<UserResult> {
    const { name, password, repassword } = user;
    if (password !== repassword) {
      throw new HttpException(`两次密码输入不一致`, HttpStatus.BAD_REQUEST);
    }
    const cru = await this.userRepository.findOne({ where: { name } });
    if (cru) {
      throw new HttpException(`${name}已存在`, HttpStatus.BAD_REQUEST);
    }
    const salt = makeSalt();
    user.password_salt = salt;
    user.password = encryptPassword(password, salt);
    delete user.repassword;
    const res = await this.userRepository.save(user);
    return Promise.resolve({
      name: res.name,
      phone: res.phone,
      age: res.age,
    });
  }

  // 更新用户
  async update(id, user): Promise<UserEntity> {
    const cur = await this.userRepository.findOne({ where: { id } });
    if (!cur) {
      throw new HttpException('当前用户不存在', HttpStatus.BAD_REQUEST);
    }
    const updateUser = this.userRepository.merge(cur, user);
    updateUser.update_time = new Date();
    return this.userRepository.save(updateUser);
  }

  // 删除用户
  async remove(id) {
    const cur = await this.userRepository.findOne({ where: { id } });
    if (!cur) {
      throw new HttpException('当前用户不存在', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.remove(cur);
  }
}
