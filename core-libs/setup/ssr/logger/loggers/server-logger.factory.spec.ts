import * as injectFn from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DefaultServerLogger } from './default-server-logger';
import { ServerLogger, serverLoggerToken } from './server-logger';
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
        { provide: serverLoggerToken, useValue: undefined },
        { provide: ServerLogger, useFactory: serverLoggerFactory },
      ],
    });

    expect(TestBed.inject(ServerLogger)).toBeInstanceOf(DefaultServerLogger);
  });

  it('should return original logger', () => {
    jest.spyOn(injectFn, 'inject').mockReturnValue(new MockServerLogger());

    TestBed.configureTestingModule({
      providers: [{ provide: ServerLogger, useFactory: serverLoggerFactory }],
    });

    expect(TestBed.inject(ServerLogger)).toBeInstanceOf(MockServerLogger);
  });
});
