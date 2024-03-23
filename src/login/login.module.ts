import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnect } from 'src/db-connect/db-connect.module';

@Module({
  imports: [dbConnect],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
