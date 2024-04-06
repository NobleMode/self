import { Module } from '@nestjs/common';
import { UpdateInsertController } from './update-insert.controller';
import { UpdateInsertService } from './update-insert.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';

@Module({
  imports: [dbConnect, GlobalJwtModule],
  controllers: [UpdateInsertController],
  providers: [UpdateInsertService]
})
export class UpdateInsertModule {}
