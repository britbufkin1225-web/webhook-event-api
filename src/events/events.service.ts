import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

type CreateEventInput = {
  source: string;
  eventType: string;
  payload: string;
};

type FindEventsFilters = {
  source?: string;
  eventType?: string;
  processed?: string;
};

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventInput: CreateEventInput) {
    return this.prisma.event.create({
      data: createEventInput,
    });
  }

  async findAll(filters: FindEventsFilters = {}) {
    const where: {
      source?: string;
      eventType?: string;
      processed?: boolean;
    } = {};

    if (filters.source) {
      where.source = filters.source;
    }

    if (filters.eventType) {
      where.eventType = filters.eventType;
    }

    if (filters.processed === 'true') {
      where.processed = true;
    }

    if (filters.processed === 'false') {
      where.processed = false;
    }

    return this.prisma.event.findMany({
      where,
      orderBy: {
        receivedAt: 'desc',
      },
    });
  }

  async getSummary() {
    const [totalEvents, processedEvents, unprocessedEvents] = await Promise.all(
      [
        this.prisma.event.count(),
        this.prisma.event.count({
          where: {
            processed: true,
          },
        }),
        this.prisma.event.count({
          where: {
            processed: false,
          },
        }),
      ],
    );

    return {
      totalEvents,
      processedEvents,
      unprocessedEvents,
    };
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

  async markAsProcessed(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return this.prisma.event.update({
      where: {
        id,
      },
      data: {
        processed: true,
        processedAt: new Date(),
      },
    });
  }
}
