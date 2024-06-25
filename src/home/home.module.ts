import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { dbConnect } from 'src/db-connect/db-connect.module';
import { GlobalJwtModule } from 'src/db-connect/globalJWT.module';
import { CommonModule } from 'src/db-connect/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { Member } from 'src/entities/member.entities';

@Module({
  imports: [
    dbConnect, 
    GlobalJwtModule,
    CommonModule,
    TypeOrmModule.forFeature([User, Member]),
  ],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
