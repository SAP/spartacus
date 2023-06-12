import { TestBed } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LoggerService } from '@spartacus/core';
import { SERVER_LOGGER, ServerLogger } from '../loggers';
import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';
import { serverLoggerServiceFactory } from './server-logger-factory';

class MockServerLogger implements ServerLogger {
  log = jest.fn();
  warn = jest.fn();
  error = jest.fn();
  info = jest.fn();
  debug = jest.fn();
}

describe('serverLoggerServiceFactory', () => {
  it('should return ExpressLoggerService if REQUEST is available', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: REQUEST, useValue: {} },
        { provide: SERVER_LOGGER, useValue: new MockServerLogger() },
        {
          provide: LoggerService,
          useFactory: serverLoggerServiceFactory,
        },
      ],
    });
    expect(TestBed.inject(LoggerService)).toBeInstanceOf(ExpressLoggerService);
  });
  it('should return PrerenderingLoggerService if REQUEST is not available', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SERVER_LOGGER, useValue: new MockServerLogger() },
        {
          provide: LoggerService,
          useFactory: serverLoggerServiceFactory,
        },
      ],
    });
    expect(TestBed.inject(LoggerService)).toBeInstanceOf(
      PrerenderingLoggerService
    );
  });
});
