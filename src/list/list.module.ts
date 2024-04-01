import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';

@Module({
  imports: [dbConnect, GlobalJwtModule],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
