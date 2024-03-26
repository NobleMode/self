import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
config();

@Global()
@Module({
  imports: [
    JwtModule.register({ secret: process.env.KEY, signOptions: { expiresIn: '10m' } }),
  ],
  exports: [JwtModule],
})
export class GlobalJwtModule {}