/* eslint-disable @typescript-eslint/indent */
/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 11:13:49
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 16:12:22
 * @Descripttion : Entity
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
