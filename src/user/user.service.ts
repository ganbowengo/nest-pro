/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 10:38:02
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 20:56:30
 * @Descripttion : user service
 */
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Page } from '../interface/page.interface';

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

  async create(user: UserEntity): Promise<UserEntity> {
    const { name } = user;
    if (!name) {
      throw new HttpException('缺少名称', 401);
    }
    const cru = await this.userRepository.findOne({ where: { name } });
    if (cru) {
      throw new HttpException(`${name}已存在`, 401);
    }
    return await this.userRepository.save(user);
  }

  async update(id, user): Promise<UserEntity> {
    const cur = await this.userRepository.findOne({ where: { id } });
    if (!cur) {
      throw new HttpException('当前用户不存在', 401);
    }
    const updateUser = this.userRepository.merge(cur, user);
    updateUser.update_time = new Date();
    return this.userRepository.save(updateUser);
  }

  async remove(id) {
    const cur = await this.userRepository.findOne({ where: { id } });
    if (!cur) {
      throw new HttpException('当前用户不存在', 401);
    }
    return await this.userRepository.remove(cur);
  }
}
