import { InjectionToken } from '@angular/core';
import { Request } from 'express';

export interface LogMetadata {
  request?: Request | any;
  options?: any;
}

export class SsrLogger {
  log(message: string, _context?: LogMetadata): void {
    console.log(message);
  }
  error(message: string, _context?: LogMetadata): void {
    console.error(message);
  }
  warn(message: string, _context?: LogMetadata): void {
    console.warn(message);
  }
}

export const ssrLoggerToken = new InjectionToken<SsrLogger>('ssrLogger');

export const loggerFeatureFlag = new InjectionToken<boolean>(
  'featureFlag.logger'
);
