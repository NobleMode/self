import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import the TypeOrmModule

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'selfproj',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
