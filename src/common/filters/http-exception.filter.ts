import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

type NestErrorResponse = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

type ErrorResponseBody = {
  success: false;
  message: string | string[];
  error: string;
  statusCode: number;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<{
      status: (statusCode: number) => {
        json: (body: ErrorResponseBody) => void;
      };
    }>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const responseBody = this.buildErrorResponse(exceptionResponse, statusCode);

    response.status(statusCode).json(responseBody);
  }

  private buildErrorResponse(
    exceptionResponse: string | object | null,
    statusCode: number,
  ): ErrorResponseBody {
    if (typeof exceptionResponse === 'string') {
      return {
        success: false,
        message: exceptionResponse,
        error: this.getDefaultError(statusCode),
        statusCode,
      };
    }

    if (this.isNestErrorResponse(exceptionResponse)) {
      return {
        success: false,
        message:
          exceptionResponse.message ?? this.getDefaultMessage(statusCode),
        error: exceptionResponse.error ?? this.getDefaultError(statusCode),
        statusCode,
      };
    }

    return {
      success: false,
      message: this.getDefaultMessage(statusCode),
      error: this.getDefaultError(statusCode),
      statusCode,
    };
  }

  private isNestErrorResponse(
    response: unknown,
  ): response is NestErrorResponse {
    return typeof response === 'object' && response !== null;
  }

  private getDefaultMessage(statusCode: number): string {
    if (statusCode === 500) {
      return 'Internal server error';
    }

    return this.getDefaultError(statusCode);
  }

  private getDefaultError(statusCode: number): string {
    const statusName = HttpStatus[statusCode];

    if (typeof statusName !== 'string') {
      return 'Error';
    }

    return this.formatHttpStatus(statusName);
  }

  private formatHttpStatus(status: string): string {
    return status
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
