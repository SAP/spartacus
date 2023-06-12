import { TestBed } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { SERVER_LOGGER, ServerLogger } from '../loggers';
import { ExpressLoggerService } from './express-logger.service';

const mockRequest: Partial<Request> = { url: 'test/url' };

class MockServerLogger extends ServerLogger {
  log = jest.fn();
  warn = jest.fn();
  error = jest.fn();
  info = jest.fn();
  debug = jest.fn();
}

describe('ExpressLoggerService', () => {
  let request: Request;
  let ssrLogger: ServerLogger;
  let loggerService: ExpressLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpressLoggerService,
        { provide: REQUEST, useValue: mockRequest },
        { provide: SERVER_LOGGER, useClass: MockServerLogger },
      ],
    });

    request = TestBed.inject(REQUEST);
    ssrLogger = TestBed.inject(SERVER_LOGGER);
    loggerService = TestBed.inject(ExpressLoggerService);
  });

  describe('log', () => {
    it('should log', () => {
      const log = jest.spyOn(ssrLogger, 'log');

      loggerService.log('test');

      expect(log).toHaveBeenCalledWith('test', { request });
    });

    it('should warn', () => {
      const warn = jest.spyOn(ssrLogger, 'warn');

      loggerService.warn('test');

      expect(warn).toHaveBeenCalledWith('test', { request });
    });

    it('should error', () => {
      const error = jest.spyOn(ssrLogger, 'error');

      loggerService.error('test');

      expect(error).toHaveBeenCalledWith('test', { request });
    });

    it('should info', () => {
      const info = jest.spyOn(ssrLogger, 'info');

      loggerService.info('test');

      expect(info).toHaveBeenCalledWith('test', { request });
    });

    it('should debug', () => {
      const debug = jest.spyOn(ssrLogger, 'debug');

      loggerService.debug('test');

      expect(debug).toHaveBeenCalledWith('test', { request });
    });
  });

  describe('formatLogMessage', () => {
    it('should format log message', () => {
      const result = loggerService['formatLogMessage']('some %s', 'test');

      expect(result).toEqual('some test');
    });
  });
});
