import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const event = await this.eventsService.create(createEventDto);

    return {
      message: 'Event created successfully',
      data: event,
    };
  }

  @Get()
  async findAll() {
    const events = await this.eventsService.findAll();

    return {
      message: 'Events retrieved successfully',
      count: events.length,
      data: events,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);

    return {
      message: 'Event retrieved successfully',
      data: event,
    };
  }
}
