import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: {
        receivedAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }
}
