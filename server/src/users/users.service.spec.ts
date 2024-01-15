import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository = createMock<Repository<User>>();
  const mockUser = new User();
  const createUserDto: CreateUserDto = {
    name: 'User',
    surname: 'Surname',
    email: 'test@test.com',
    password: 'test1234',
    role: 'USER',
    createdAt: new Date(),
  };
  const updateUserDto: UpdateUserDto = {
    email: 'new@test.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);
      const result = await service.create(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockRepository.find.mockResolvedValue([mockUser]);
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.save.mockResolvedValue({
        ...mockUser,
        ...updateUserDto,
      });
      const result = await service.update(1, updateUserDto);
      expect(result).toEqual({ ...mockUser, ...updateUserDto });
    });
  });

  describe('removeUser', () => {
    it('should delete a user', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 } as any);
      const result = await service.remove(1);
      expect(result).toEqual({ affected: 1 } as any);
    });
  });
});
