import { Module } from '@nestjs/common';
import { ActiveSignController } from './active-sign.controller';
import { ActiveSignService } from './active-sign.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';
import { CommonService } from '../db-connect/common.service';

@Module({
  imports: [dbConnect, GlobalJwtModule],
  controllers: [ActiveSignController],
  providers: [ActiveSignService, CommonService]
})
export class ActiveSignModule {}
