import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let mockRepository = createMock<Repository<Event>>();
  const mockEvent = new Event();
  const createEventDto: CreateEventDto = {
    name: 'Test Event',
    description: 'Test Event Description',
    when: new Date(),
    address: '123 Test St',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    mockRepository = module.get(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEvent', () => {
    it('should create an event', async () => {
      mockRepository.create.mockReturnValue(mockEvent);
      mockRepository.save.mockResolvedValue(mockEvent);
      const result = await service.create(createEventDto);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      mockRepository.find.mockResolvedValue([mockEvent]);
      const result = await service.findAll();
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findOne', () => {
    it('should return an event', async () => {
      mockRepository.findOne.mockResolvedValue(mockEvent);
      const result = await service.findOne(1);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('remove', () => {
    it('should delete an event', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 } as any);
      const result = await service.remove(1);
      expect(result).toEqual({ affected: 1 } as any);
    });
  });
});
