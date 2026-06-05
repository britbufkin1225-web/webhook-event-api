import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { EventsService } from './events.service';

type CreateEventBody = {
  source: string;
  eventType: string;
  payload: string;
};

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventBody: CreateEventBody) {
    return this.eventsService.create(createEventBody);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
}
