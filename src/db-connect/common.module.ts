import { Module } from '@nestjs/common';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';
import { CommonService } from 'src/db-connect/common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { Member } from 'src/entities/member.entities';

@Module({
  imports: [
    dbConnect, 
    GlobalJwtModule,
    TypeOrmModule.forFeature([User, Member]), 
  ],
  providers: [CommonService],
  exports: [CommonService]
})
export class CommonModule {}
