import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`User ${id} not found`);
    }
    return { affected: result.affected };
  }
}
