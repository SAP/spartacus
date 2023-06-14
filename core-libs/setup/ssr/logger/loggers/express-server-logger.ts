import { InjectionToken } from '@angular/core';
import { Request } from 'express';

export interface ExpressServerLoggerContext {
  request: Request;
  [_key: string]: any;
}

export interface ExpressServerLogger {
  log(message: string, context: ExpressServerLoggerContext): void;
  warn(message: string, context: ExpressServerLoggerContext): void;
  error(message: string, context: ExpressServerLoggerContext): void;
  info(message: string, context: ExpressServerLoggerContext): void;
  debug(message: string, context: ExpressServerLoggerContext): void;
}

export const EXPRESS_SERVER_LOGGER = new InjectionToken<ExpressServerLogger>(
  'EXPRESS_SERVER_LOGGER'
);
