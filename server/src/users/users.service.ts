import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const nowDate = new Date();
    createUserDto.createdAt = nowDate;
    createUserDto.events = null;
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error(`User ${email} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    console.log('id', id);
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('updateUserDto', updateUserDto);
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    }
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
    console.log('updatedUser', updatedUser);
    return updatedUser;
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`User ${id} not found`);
    }
    return { affected: result.affected };
  }
}
