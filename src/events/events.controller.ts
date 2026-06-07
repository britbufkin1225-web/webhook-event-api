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
      success: true,
      message: 'Event created successfully',
      data: event,
    };
  }

  @Get()
  async findAll(
    @Query('source') source?: string,
    @Query('eventType') eventType?: string,
    @Query('processed') processed?: string,
  ) {
    if (processed && processed !== 'true' && processed !== 'false') {
      throw new BadRequestException('processed must be either true or false');
    }

    const events = await this.eventsService.findAll({
      source,
      eventType,
      processed,
    });

    return {
      success: true,
      message: 'Events retrieved successfully',
      data: events,
    };
  }

  @Get('summary')
  async getSummary() {
    const summary = await this.eventsService.getSummary();

    return {
      success: true,
      message: 'Event summary retrieved successfully',
      data: summary,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);

    return {
      success: true,
      message: 'Event retrieved successfully',
      data: event,
    };
  }

  @Patch(':id/processed')
  async markAsProcessed(@Param('id') id: string) {
    const event = await this.eventsService.markAsProcessed(id);

    return {
      success: true,
      message: 'Event marked as processed successfully',
      data: event,
    };
  }
}
