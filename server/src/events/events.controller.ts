import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  StreamableFile,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { User } from 'src/users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body(ValidationPipe) createEventDto: CreateEventDto): Promise<User> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  // Generate pdf based on event id
  @Post('pdf')
  async generatePdf(@Body() eventData: any): Promise<any> {
    return this.eventsService.generatePdf(eventData);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(+id);
  }
}
