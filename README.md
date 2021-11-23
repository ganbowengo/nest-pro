<!--
 * @Author       : ganbowen
 * @Date         : 2021-11-19 19:28:18
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 09:45:39
 * @Descripttion : 
-->
# nest从爬到走

## 新建项目
```bash
npm i -g @nestjs/cli
nest new project-name
```
## 快速创建controller、service、dto、module、entity
> 注意：应该先创建module，再创建controller、service会自动导入module中
```bash
nest g [文件类型] [文件名] [文件目录（src目录下）]
```