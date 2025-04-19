import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';User
import { User } from '../users/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
