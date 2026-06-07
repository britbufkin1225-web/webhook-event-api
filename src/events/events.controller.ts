import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

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
  findAll(
    @Query('source') source?: string,
    @Query('eventType') eventType?: string,
    @Query('processed') processed?: string,
  ) {
    if (
      processed !== undefined &&
      processed !== 'true' &&
      processed !== 'false'
    ) {
      throw new BadRequestException('processed must be either true or false');
    }

    return this.eventsService.findAll({
      source,
      eventType,
      processed,
    });
  }

  @Get('summary')
  getSummary() {
    return this.eventsService.getSummary();
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
