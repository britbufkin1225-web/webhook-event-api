import { Test, TestingModule } from '@nestjs/testing';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;

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

  const mockProcessedEvent = {
    ...mockEvent,
    processed: true,
    processedAt: new Date(),
  };

  const mockEventsService = {
    create: jest.fn().mockResolvedValue(mockEvent),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(mockEvent),
    markAsProcessed: jest.fn().mockResolvedValue(mockProcessedEvent),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an event', async () => {
    const createEventDto = {
      source: 'stripe',
      eventType: 'payment.created',
      payload: '{"amount":1000}',
    };

    const result = await controller.create(createEventDto);

    expect(result).toEqual({
      data: mockEvent,
      message: 'Event created successfully',
    });
    expect(mockEventsService.create).toHaveBeenCalledWith(createEventDto);
  });

  it('should return an empty events array', async () => {
    mockEventsService.findAll.mockResolvedValue([]);

    const result = await controller.findAll();

    expect(result).toEqual([]);
    expect(mockEventsService.findAll).toHaveBeenCalledWith({
      source: undefined,
      eventType: undefined,
      processed: undefined,
    });
  });

  it('should return an events array', async () => {
    mockEventsService.findAll.mockResolvedValue([mockEvent]);

    const result = await controller.findAll();

    expect(result).toEqual([mockEvent]);
    expect(mockEventsService.findAll).toHaveBeenCalledWith({
      source: undefined,
      eventType: undefined,
      processed: undefined,
    });
  });

  it('should pass query filters to the events service', async () => {
    mockEventsService.findAll.mockResolvedValue([mockEvent]);

    const result = await controller.findAll(
      'stripe',
      'payment.created',
      'false',
    );

    expect(result).toEqual([mockEvent]);
    expect(mockEventsService.findAll).toHaveBeenCalledWith({
      source: 'stripe',
      eventType: 'payment.created',
      processed: 'false',
    });
  });

  it('should return one event by id', async () => {
    const result = await controller.findOne('event-test-id');

    expect(result).toEqual({
      data: mockEvent,
      message: 'Event retrieved successfully',
    });
    expect(mockEventsService.findOne).toHaveBeenCalledWith('event-test-id');
  });

  it('should mark an event as processed', async () => {
    const result = await controller.markAsProcessed('event-test-id');

    expect(result).toEqual({
      data: mockProcessedEvent,
      message: 'Event marked as processed successfully',
    });
    expect(mockEventsService.markAsProcessed).toHaveBeenCalledWith(
      'event-test-id',
    );
  });
});
