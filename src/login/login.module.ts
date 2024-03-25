import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.stategies';
import { JwtStrategy } from './strategies/jwt.strategies';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    PassportModule,
    dbConnect,
    GlobalJwtModule
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, JwtStrategy]
})
export class LoginModule {}
