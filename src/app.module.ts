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


@Module({
  imports: [
    LoginModule,
    HomeModule,
    LogoutModule,     
    GlobalJwtModule, ProfileModule, ActiveSignModule, ListModule, UpdateInsertModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
