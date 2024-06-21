import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';
import { CommonService } from 'src/db-connect/common.service';
import { CommonModule } from 'src/db-connect/common.module';

@Module({
  imports: [
    dbConnect, 
    GlobalJwtModule,
    CommonModule,
  ],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
