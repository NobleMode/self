import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';
import { CommonModule } from 'src/db-connect/common.module';

@Module({
  imports: [dbConnect, GlobalJwtModule, CommonModule],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
