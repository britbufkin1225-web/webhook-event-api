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

type EventSummary = {
  totalEvents: number;
  processedEvents: number;
  unprocessedEvents: number;
  sources: Record<string, number>;
  eventTypes: Record<string, number>;
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
    await this.findOne(id);

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

  async getSummary(): Promise<EventSummary> {
    const [
      totalEvents,
      processedEvents,
      unprocessedEvents,
      sourceGroups,
      eventTypeGroups,
    ] = await Promise.all([
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
      this.prisma.event.groupBy({
        by: ['source'],
        _count: {
          source: true,
        },
      }),
      this.prisma.event.groupBy({
        by: ['eventType'],
        _count: {
          eventType: true,
        },
      }),
    ]);

    const sources = sourceGroups.reduce<Record<string, number>>(
      (acc, group) => {
        acc[group.source] = group._count.source;
        return acc;
      },
      {},
    );

    const eventTypes = eventTypeGroups.reduce<Record<string, number>>(
      (acc, group) => {
        acc[group.eventType] = group._count.eventType;
        return acc;
      },
      {},
    );

    return {
      totalEvents,
      processedEvents,
      unprocessedEvents,
      sources,
      eventTypes,
    };
  }
}
