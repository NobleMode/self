import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { dbConnect } from '../db-connect/db-connect.module';
import { GlobalJwtModule } from '../db-connect/globalJWT.module';
import { CommonModule } from 'src/db-connect/common.module';

@Module({
  imports: [dbConnect, GlobalJwtModule, CommonModule],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
