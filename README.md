<!--
 * @Author       : ganbowen
 * @Date         : 2021-11-19 19:28:18
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-24 16:23:33
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

## 生命周期及执行阶段
1. client -> middleware -> guard -> interceptor -> pipe -> controller -> interceptor -> client