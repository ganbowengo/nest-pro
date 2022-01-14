/*
 * @Author       : ganbowen
 * @Date         : 2021-11-24 10:49:11
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-24 17:18:35
 * @Descripttion :
 */
import { RbacInterceptor } from './rbac.interceptor';

describe('RbacInterceptor', () => {
  it('should be defined', () => {
    expect(new RbacInterceptor(1)).toBeDefined();
  });
});
