import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';

@Module({
  imports: [dbConnect, GlobalJwtModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
