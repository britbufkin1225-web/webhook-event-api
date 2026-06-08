import { BadRequestException } from '@nestjs/common';
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

  const mockSummary = {
    totalEvents: 2,
    processedEvents: 1,
    unprocessedEvents: 1,
    sources: {
      stripe: 2,
    },
    eventTypes: {
      'payment.created': 2,
    },
  };

  const mockEventsService = {
    create: jest.fn().mockResolvedValue(mockEvent),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(mockEvent),
    markAsProcessed: jest.fn().mockResolvedValue(mockProcessedEvent),
    remove: jest.fn().mockResolvedValue(mockEvent),
    getSummary: jest.fn().mockResolvedValue(mockSummary),
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
      success: true,
      message: 'Event created successfully',
      data: mockEvent,
    });

    expect(mockEventsService.create).toHaveBeenCalledWith(createEventDto);
  });

  it('should return an empty events array', async () => {
    mockEventsService.findAll.mockResolvedValue([]);

    const result = await controller.findAll();

    expect(result).toEqual({
      success: true,
      message: 'Events retrieved successfully',
      data: [],
    });

    expect(mockEventsService.findAll).toHaveBeenCalledWith({
      source: undefined,
      eventType: undefined,
      processed: undefined,
    });
  });

  it('should return an events array', async () => {
    mockEventsService.findAll.mockResolvedValue([mockEvent]);

    const result = await controller.findAll();

    expect(result).toEqual({
      success: true,
      message: 'Events retrieved successfully',
      data: [mockEvent],
    });

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

    expect(result).toEqual({
      success: true,
      message: 'Events retrieved successfully',
      data: [mockEvent],
    });

    expect(mockEventsService.findAll).toHaveBeenCalledWith({
      source: 'stripe',
      eventType: 'payment.created',
      processed: 'false',
    });
  });

  it('should allow processed=true query filter', async () => {
    mockEventsService.findAll.mockResolvedValue([mockProcessedEvent]);

    const result = await controller.findAll(undefined, undefined, 'true');

    expect(result).toEqual({
      success: true,
      message: 'Events retrieved successfully',
      data: [mockProcessedEvent],
    });

    expect(mockEventsService.findAll).toHaveBeenCalledWith({
      source: undefined,
      eventType: undefined,
      processed: 'true',
    });
  });

  it('should reject an invalid processed query value', async () => {
    await expect(
      controller.findAll(undefined, undefined, 'banana'),
    ).rejects.toThrow(BadRequestException);

    expect(mockEventsService.findAll).not.toHaveBeenCalled();
  });

  it('should return event summary', async () => {
    const result = await controller.getSummary();

    expect(result).toEqual({
      success: true,
      message: 'Event summary retrieved successfully',
      data: mockSummary,
    });

    expect(mockEventsService.getSummary).toHaveBeenCalledWith();
  });

  it('should return one event by id', async () => {
    const result = await controller.findOne('event-test-id');

    expect(result).toEqual({
      success: true,
      message: 'Event retrieved successfully',
      data: mockEvent,
    });

    expect(mockEventsService.findOne).toHaveBeenCalledWith('event-test-id');
  });

  it('should mark an event as processed', async () => {
    const result = await controller.markAsProcessed('event-test-id');

    expect(result).toEqual({
      success: true,
      message: 'Event marked as processed successfully',
      data: mockProcessedEvent,
    });

    expect(mockEventsService.markAsProcessed).toHaveBeenCalledWith(
      'event-test-id',
    );
  });

  it('should delete an event', async () => {
    const result = await controller.remove('event-test-id');

    expect(result).toEqual({
      success: true,
      message: 'Event deleted successfully',
      data: mockEvent,
    });

    expect(mockEventsService.remove).toHaveBeenCalledWith('event-test-id');
  });
});
