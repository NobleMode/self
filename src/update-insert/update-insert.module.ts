import { Module } from '@nestjs/common';
import { UpdateInsertController } from './update-insert.controller';
import { UpdateInsertService } from './update-insert.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';
import { CommonService } from '../db-connect/common.service';

@Module({
  imports: [dbConnect, GlobalJwtModule, CommonService],
  controllers: [UpdateInsertController],
  providers: [UpdateInsertService]
})
export class UpdateInsertModule {}
