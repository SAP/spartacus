import { TestBed } from '@angular/core/testing';
import { LoggerService } from '@spartacus/core';
import { REQUEST } from '../../tokens/express.tokens';
import { EXPRESS_SERVER_LOGGER, ExpressServerLogger } from '../loggers';
import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';
import { serverLoggerServiceFactory } from './server-logger-service-factory';

class MockExpressServerLogger implements ExpressServerLogger {
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
        {
          provide: EXPRESS_SERVER_LOGGER,
          useValue: new MockExpressServerLogger(),
        },
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
        {
          provide: EXPRESS_SERVER_LOGGER,
          useValue: new MockExpressServerLogger(),
        },
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
