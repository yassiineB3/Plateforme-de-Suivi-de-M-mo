import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  @Get('students')
  async findStudents(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: 'student' } });
  }

  @Get('sheikhs')
  async findSheikhs(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: 'sheikh' } });
  }
}
