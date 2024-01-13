import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const nowDate = new Date();
    createEventDto.createdAt = nowDate;
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async addParticipant(id: number, userId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error(`Event ${id} not found`);
    }
    event.participants.push({ id: userId } as any);
    return await this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    const events = await this.eventRepository.find();
    if (events.length === 0) {
      throw new NotFoundException('Events not found');
    }
    return events;
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error(`Event ${id} not found`);
    }
    return event;
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Event ${id} not found`);
    }
    return { affected: result.affected };
  }
}
