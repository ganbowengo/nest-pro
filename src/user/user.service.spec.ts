/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 10:38:02
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 11:33:53
 * @Descripttion :
 */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
