import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import ShortUniqueId from 'short-unique-id';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

const { randomUUID } = new ShortUniqueId({ length: 5 });

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<User> {
    const nowDate = new Date();
    createEventDto.createdAt = nowDate;
    const event = this.eventRepository.create(createEventDto);
    if (!event) {
      throw new Error('Event not created');
    }
    const savedEvent = await this.eventRepository.save(event);
    const updatedUser = await this.usersService.update(createEventDto.userId, {
      events: savedEvent,
    });
    return updatedUser;
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

  async generatePdf(eventData: any): Promise<any> {
    try {
      const doc = new PDFDocument();

      doc.font('Times-Roman');
      doc.fontSize(25).text('Bilet na wydarzenie!', 100, 50);
      doc.fontSize(14).text(`Wydarzenie: ${eventData.eventTitle}`, 100, 100);
      doc.text(`Opis wydarzenia: ${eventData.eventDesc}`, 100, 150);
      doc.text(`Data wydarzenia: ${eventData.eventDate}`, 100, 200);
      doc.text(`Lokalizacja: ${eventData.eventLoc}`, 100, 250);
      doc.text(
        `Bilet dla: ${eventData.userName} ${eventData.userSurname}`,
        100,
        300,
      );

      const randomId = randomUUID();
      const fileName =
        `${eventData.eventTitle}-${eventData.userName}-${eventData.userSurname}-${randomId}.pdf`.replace(
          ' ',
          '-',
        );
      const stream = fs.createWriteStream(`tickets/${fileName}`);
      doc.pipe(stream);
      doc.end();
      return fileName;
    } catch (error) {
      console.log('error', error);
      throw error;
    } finally {
      console.log('PDF Generated');
    }
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Event ${id} not found`);
    }
    return { affected: result.affected };
  }
}
