import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { ServerLogger, serverLoggerToken } from '../loggers';
import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';

class MockServerLogger extends ServerLogger {
  log = jest.fn();
  warn = jest.fn();
  error = jest.fn();
}

const mockWindowRef: Partial<WindowRef> = {
  location: { href: 'test/url' },
};

describe('PrerenderingLoggerService', () => {
  let ssrLogger: ServerLogger;
  let loggerService: PrerenderingLoggerService;
  let request: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpressLoggerService,
        { provide: WindowRef, useValue: mockWindowRef },
        { provide: serverLoggerToken, useClass: MockServerLogger },
      ],
    });

    ssrLogger = TestBed.inject(serverLoggerToken);
    loggerService = TestBed.inject(PrerenderingLoggerService);
    request = { request: { url: TestBed.inject(WindowRef).location.href } };
  });

  describe('log', () => {
    it('should log', () => {
      const log = jest.spyOn(ssrLogger, 'log');

      loggerService.log('test');

      expect(log).toHaveBeenCalledWith('test', request);
    });

    it('should warn', () => {
      const warn = jest.spyOn(ssrLogger, 'warn');

      loggerService.warn('test');

      expect(warn).toHaveBeenCalledWith('test', request);
    });

    it('should error', () => {
      const error = jest.spyOn(ssrLogger, 'error');

      loggerService.error('test');

      expect(error).toHaveBeenCalledWith('test', request);
    });
  });
});
