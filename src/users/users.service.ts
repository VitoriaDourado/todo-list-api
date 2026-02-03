import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(data: Partial<User>) {
    const hashedPassword = await bcrypt.hash(data.password!, 10);

    const user = this.repo.create({
      ...data,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
    });
  }

  findAll() {
    return this.repo.find({
      select: ['id', 'name', 'email', 'createdAt'],
    });
  }
}
