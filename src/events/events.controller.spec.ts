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

  const mockEventsService = {
    create: jest.fn().mockResolvedValue(mockEvent),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(mockEvent),
  };

  beforeEach(async () => {
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

  afterEach(() => {
    jest.clearAllMocks();
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

    expect(mockEventsService.create).toHaveBeenCalledTimes(1);
    expect(mockEventsService.create).toHaveBeenCalledWith(createEventDto);
  });

  it('should return an empty events response', async () => {
    const result = await controller.findAll();

    expect(result).toEqual({
      count: 0,
      data: [],
      message: 'Events retrieved successfully',
    });

    expect(mockEventsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return an events response with data', async () => {
    mockEventsService.findAll.mockResolvedValue([mockEvent]);

    const result = await controller.findAll();

    expect(result).toEqual({
      count: 1,
      data: [mockEvent],
      message: 'Events retrieved successfully',
    });

    expect(mockEventsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return one event by id', async () => {
    const result = await controller.findOne('event-test-id');

    expect(result).toEqual({
      data: mockEvent,
      message: 'Event retrieved successfully',
    });

    expect(mockEventsService.findOne).toHaveBeenCalledTimes(1);
    expect(mockEventsService.findOne).toHaveBeenCalledWith('event-test-id');
  });
});
