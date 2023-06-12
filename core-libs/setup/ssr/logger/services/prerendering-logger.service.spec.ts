import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { SERVER_LOGGER, ServerLogger } from '../loggers';
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
        { provide: SERVER_LOGGER, useClass: MockServerLogger },
      ],
    });

    ssrLogger = TestBed.inject(SERVER_LOGGER);
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

    it('should info', () => {
      const info = jest.spyOn(ssrLogger, 'info');

      loggerService.info('test');

      expect(info).toHaveBeenCalledWith('test', request);
    });

    it('should debug', () => {
      const debug = jest.spyOn(ssrLogger, 'debug');

      loggerService.debug('test');

      expect(debug).toHaveBeenCalledWith('test', request);
    });
  });
});
