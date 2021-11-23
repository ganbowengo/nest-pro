/*
 * @Author       : ganbowen
 * @Date         : 2021-11-20 15:34:34
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-20 20:32:51
 * @Descripttion : common interface
 */

/**
 * 分页接口
 */
export interface Page<T> {
  count: number;
  list: T[];
}
