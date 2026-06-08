import {
  ArgumentsHost,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { HttpExceptionFilter } from './http-exception.filter';

type ErrorResponseBody = {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  error: string;
};

type MockHttpResponse = {
  status: jest.MockedFunction<
    (statusCode: number) => {
      json: jest.MockedFunction<(body: ErrorResponseBody) => void>;
    }
  >;
};

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  const mockJson: jest.MockedFunction<(body: ErrorResponseBody) => void> =
    jest.fn();

  const mockStatus: MockHttpResponse['status'] = jest.fn().mockReturnValue({
    json: mockJson,
  });

  const mockRequest = {
    url: '/events/test-id',
    method: 'GET',
  };

  const mockResponse: MockHttpResponse = {
    status: mockStatus,
  };

  const mockArgumentsHost = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(mockRequest),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    }),
  } as unknown as ArgumentsHost;

  beforeEach(() => {
    filter = new HttpExceptionFilter();

    jest.clearAllMocks();
  });

  it('should return a standardized response for NotFoundException', () => {
    const exception = new NotFoundException('Event not found');

    filter.catch(exception, mockArgumentsHost);

    const responseBody = mockJson.mock.calls[0][0];

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(responseBody).toMatchObject({
      statusCode: 404,
      path: '/events/test-id',
      method: 'GET',
      message: 'Event not found',
      error: 'Not Found',
    });
    expect(typeof responseBody.timestamp).toBe('string');
  });

  it('should return a standardized response for BadRequestException', () => {
    const exception = new BadRequestException('Invalid request');

    filter.catch(exception, mockArgumentsHost);

    const responseBody = mockJson.mock.calls[0][0];

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(responseBody).toMatchObject({
      statusCode: 400,
      path: '/events/test-id',
      method: 'GET',
      message: 'Invalid request',
      error: 'Bad Request',
    });
    expect(typeof responseBody.timestamp).toBe('string');
  });

  it('should include a timestamp in the error response', () => {
    const exception = new BadRequestException('Invalid request');

    filter.catch(exception, mockArgumentsHost);

    const responseBody = mockJson.mock.calls[0][0];

    expect(responseBody.timestamp).toBeTruthy();
    expect(typeof responseBody.timestamp).toBe('string');
  });
});
