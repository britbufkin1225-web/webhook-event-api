import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;

  const createEventDto = {
    source: 'stripe',
    eventType: 'payment.created',
    payload: '{"amount":1000}',
  };

  const mockEvent = {
    id: 'event-test-id',
    source: 'stripe',
    eventType: 'payment.created',
    payload: '{"amount":1000}',
    processed: false,
    receivedAt: new Date(),
    processedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    event: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an event', async () => {
    mockPrismaService.event.create.mockResolvedValue(mockEvent);

    const result = await service.create(createEventDto);

    expect(result).toEqual(mockEvent);
    expect(mockPrismaService.event.create).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.event.create).toHaveBeenCalledWith({
      data: createEventDto,
    });
  });

  it('should return all events ordered by receivedAt descending', async () => {
    mockPrismaService.event.findMany.mockResolvedValue([mockEvent]);

    const result = await service.findAll();

    expect(result).toEqual([mockEvent]);
    expect(mockPrismaService.event.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.event.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: {
        receivedAt: 'desc',
      },
    });
  });

  it('should return one event by id', async () => {
    mockPrismaService.event.findUnique.mockResolvedValue(mockEvent);

    const result = await service.findOne('event-test-id');

    expect(result).toEqual(mockEvent);
    expect(mockPrismaService.event.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.event.findUnique).toHaveBeenCalledWith({
      where: {
        id: 'event-test-id',
      },
    });
  });

  it('should throw NotFoundException when event does not exist', async () => {
    mockPrismaService.event.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing-event-id')).rejects.toThrow(
      NotFoundException,
    );

    await expect(service.findOne('missing-event-id')).rejects.toThrow(
      'Event with id missing-event-id not found',
    );
  });
});
