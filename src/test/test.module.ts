import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { dbConnect } from '../db-connect/db-connect.module';
import { GlobalJwtModule } from '../db-connect/globalJWT.module';
import { CommonService } from '../db-connect/common.service';

@Module({
  imports: [dbConnect, GlobalJwtModule],
  controllers: [TestController],
  providers: [TestService, CommonService]
})
export class TestModule {}
