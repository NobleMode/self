import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { LogoutModule } from './logout/logout.module';
import { GlobalJwtModule } from './db-connect/globalJWT.module';
import { ProfileModule } from './profile/profile.module';
import { ActiveSignModule } from './active-sign/active-sign.module';
import { ListModule } from './list/list.module';
import { UpdateInsertModule } from './update-insert/update-insert.module';
import { TestModule } from './test/test.module';
import "reflect-metadata"
import { TypeOrmModule } from './db-connect/db.module';


@Module({
  imports: [
    TypeOrmModule,
    LoginModule,
    HomeModule,
    LogoutModule,     
    GlobalJwtModule,
    ProfileModule,
    ActiveSignModule,
    ListModule,
    UpdateInsertModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
