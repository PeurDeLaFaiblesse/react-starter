import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`Log`);
  async use(req: Request, _, next: NextFunction) {
    this.logger.log(`[${new Date().toISOString()}] ---> ${req.method} ${req.originalUrl}`);
    await next();
  }
}
