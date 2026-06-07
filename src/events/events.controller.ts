import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const event = await this.eventsService.create(createEventDto);

    return {
      data: event,
      message: 'Event created successfully',
    };
  }

  @Get()
  async findAll() {
    const events = await this.eventsService.findAll();

    return {
      count: events.length,
      data: events,
      message: 'Events retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);

    return {
      data: event,
      message: 'Event retrieved successfully',
    };
  }

  @Patch(':id/process')
  async markAsProcessed(@Param('id') id: string) {
    const event = await this.eventsService.markAsProcessed(id);

    return {
      data: event,
      message: 'Event marked as processed successfully',
    };
  }
}
