import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { dbConnect } from './db-connect/db-connect.module';

@Module({
  imports: [LoginModule, AuthModule, UsersModule, dbConnect],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
