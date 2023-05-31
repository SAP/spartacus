import { TestBed } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LoggerService } from '@spartacus/core';
import { ServerLogger, serverLoggerToken } from '../loggers';
import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';
import { serverLoggerServiceFactory } from './server-logger-factory';

describe('serverLoggerServiceFactory', () => {
  it('should return ExpressLoggerService if REQUEST is available', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: REQUEST, useValue: {} },
        { provide: serverLoggerToken, useValue: new ServerLogger() },
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
        { provide: serverLoggerToken, useValue: new ServerLogger() },
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
