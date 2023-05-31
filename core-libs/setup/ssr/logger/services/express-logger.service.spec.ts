import { TestBed } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { ServerLogger, serverLoggerToken } from '../loggers';
import { ExpressLoggerService } from './express-logger.service';

const mockRequest: Partial<Request> = { url: 'test/url' };

class MockServerLogger extends ServerLogger {
  log = jest.fn();
  warn = jest.fn();
  error = jest.fn();
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
        { provide: serverLoggerToken, useClass: MockServerLogger },
      ],
    });

    request = TestBed.inject(REQUEST);
    ssrLogger = TestBed.inject(serverLoggerToken);
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
  });

  describe('formatLogMessage', () => {
    it('should format log message', () => {
      const result = loggerService['formatLogMessage']('some %s', 'test');

      expect(result).toEqual('some test');
    });
  });
});
