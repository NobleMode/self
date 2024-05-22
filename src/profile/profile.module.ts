import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';
import { CommonService } from '../db-connect/common.service';

@Module({
  imports: [dbConnect, GlobalJwtModule, CommonService],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
