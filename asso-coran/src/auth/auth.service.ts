

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(dto: any) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role || 'student', 
    });
  
    return this.usersRepository.save(user);
  }
  
  async signin(dto: any) {
    const user = await this.usersRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }

    return { message: 'Signed in successfully', user };
  }
}
