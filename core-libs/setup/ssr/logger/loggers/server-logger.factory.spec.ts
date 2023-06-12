import * as injectFn from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PrerenderingServerLogger } from './prerendering-server-logger';
import { SERVER_LOGGER, ServerLogger } from './server-logger';
import { serverLoggerFactory } from './server-logger.factory';

class MockServerLogger extends ServerLogger {
  log = jest.fn();
  warn = jest.fn();
  error = jest.fn();
}

describe('serverLoggerFactory', () => {
  it('should return DefaultServerLogger', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SERVER_LOGGER, useValue: undefined },
        { provide: ServerLogger, useFactory: serverLoggerFactory },
      ],
    });

    expect(TestBed.inject(ServerLogger)).toBeInstanceOf(
      PrerenderingServerLogger
    );
  });

  it('should return original logger', () => {
    jest.spyOn(injectFn, 'inject').mockReturnValue(new MockServerLogger());

    TestBed.configureTestingModule({
      providers: [{ provide: ServerLogger, useFactory: serverLoggerFactory }],
    });

    expect(TestBed.inject(ServerLogger)).toBeInstanceOf(MockServerLogger);
  });
});
