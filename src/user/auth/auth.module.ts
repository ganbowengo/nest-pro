/*
 * @Author       : ganbowen
 * @Date         : 2021-11-21 10:56:36
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-11-21 15:56:54
 * @Descripttion :
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constats';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' }, // token 过期时效
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
