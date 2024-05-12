import { QueryFailedErrorDto } from '@/filter/dto/query-fail.dto';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const {
      name,
      driverError: { constraint, detail },
    } = exception;
    console.info(exception);
    const columnName = constraint;
    const message = detail;
    const statusCode = HttpStatus.BAD_REQUEST;
    const errorType = name;

    const errorResponse: QueryFailedErrorDto = {
      context: columnName,
      message: message,
      type: errorType,
    };

    response.status(statusCode).json(errorResponse);
  }
}
