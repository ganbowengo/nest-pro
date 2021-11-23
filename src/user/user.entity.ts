/* eslint-disable @typescript-eslint/indent */
/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 11:13:49
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 10:16:24
 * @Descripttion : Entity
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  password: string;

  @Column()
  password_salt: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
