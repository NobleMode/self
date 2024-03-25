import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.stategies';
import { JwtStrategy } from './strategies/jwt.strategies';
import { CryptoService } from 'src/db-connect/crypto.service';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    PassportModule,
    dbConnect,
    JwtModule.register({ secret: process.env.KEY, signOptions: { expiresIn: '10m' } })
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, JwtStrategy, CryptoService]
})
export class LoginModule {}
