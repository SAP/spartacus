/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { LoggerService } from '../../../logger';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { WindowRef } from '../../../window';
import {
  AuthEventWrapper,
  AuthNotificationService,
} from './auth-notification.service';

class MockBaseSiteService implements Partial<BaseSiteService> {
  getActive(): Observable<string> {
    return of('test-site');
  }
}

class MockLoggerService implements Partial<LoggerService> {
  warn = jasmine.createSpy('warn');
}

class MockWindowRef implements Partial<WindowRef> {
  isBrowser(): boolean {
    return true;
  }
}

class MockBroadcastChannel implements Partial<BroadcastChannel> {
  addEventListener(_event: string, _listener: unknown) {}
  postMessage(_message: unknown) {}
  close() {}
}

describe('AuthNotificationService', () => {
  let service: AuthNotificationService;
  let baseSiteService: BaseSiteService;
  let logger: MockLoggerService;
  let mockChannel: MockBroadcastChannel;
  let windowRef: MockWindowRef;

  beforeEach(() => {
    mockChannel = new MockBroadcastChannel();
    spyOn(mockChannel, 'addEventListener');
    spyOn(mockChannel, 'postMessage');
    spyOn(mockChannel, 'close');
    spyOn(window, 'BroadcastChannel').and.returnValue(mockChannel as any);

    TestBed.configureTestingModule({
      providers: [
        AuthNotificationService,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    service = TestBed.inject(AuthNotificationService);
    baseSiteService = TestBed.inject(BaseSiteService);
    logger = TestBed.inject(LoggerService) as unknown as MockLoggerService;
    windowRef = TestBed.inject(WindowRef) as MockWindowRef;
  });

  describe('listen()', () => {
    it('should create a BroadcastChannel with the correct channel id', () => {
      service.listen();

      expect(window.BroadcastChannel).toHaveBeenCalledWith(
        'spartacus_auth_notification'
      );
    });

    it('should register a message event listener on the channel', () => {
      service.listen();

      expect(mockChannel.addEventListener).toHaveBeenCalledWith(
        'message',
        jasmine.any(Function)
      );
    });

    it('should log a warning if BroadcastChannel throws', () => {
      (window.BroadcastChannel as unknown as jasmine.Spy).and.throwError(
        'BroadcastChannel not supported'
      );

      service.listen();

      expect(logger.warn).toHaveBeenCalledWith(
        'Could not open AuthNotification channel.'
      );
    });

    it('should not listen when server-side', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);

      service.listen();

      expect(window.BroadcastChannel).not.toHaveBeenCalled();
    });
  });

  describe('events$', () => {
    it('should emit when a message is received for the active base site', () => {
      service.listen();

      const listenerCallback = (
        mockChannel.addEventListener as jasmine.Spy
      ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

      const emittedValues: unknown[] = [];
      service.events$.subscribe((val) => emittedValues.push(val));

      const mockEvent = new MessageEvent<AuthEventWrapper<string>>('message', {
        data: { baseSite: 'test-site', payload: 'logout' },
      });
      listenerCallback(mockEvent);

      expect(emittedValues).toEqual(['logout']);
    });

    it('should not emit when a message is received for a different base site', () => {
      service.listen();

      const listenerCallback = (
        mockChannel.addEventListener as jasmine.Spy
      ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

      const emittedValues: unknown[] = [];
      service.events$.subscribe((val) => emittedValues.push(val));

      const mockEvent = new MessageEvent<AuthEventWrapper<string>>('message', {
        data: { baseSite: 'other-site', payload: 'logout' },
      });
      listenerCallback(mockEvent);

      expect(emittedValues).toEqual([]);
    });

    it('should emit undefined payload when no payload is provided', () => {
      service.listen();

      const listenerCallback = (
        mockChannel.addEventListener as jasmine.Spy
      ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

      const emittedValues: unknown[] = [];
      service.events$.subscribe((val) => emittedValues.push(val));

      const mockEvent = new MessageEvent<AuthEventWrapper<unknown>>('message', {
        data: { baseSite: 'test-site' },
      });
      listenerCallback(mockEvent);

      expect(emittedValues).toEqual([undefined]);
    });
  });

  describe('sendEvent()', () => {
    it('should post a message with the active base site and payload', () => {
      service.listen();
      service.sendEvent('my-payload');

      expect(mockChannel.postMessage).toHaveBeenCalledWith({
        baseSite: 'test-site',
        payload: 'my-payload',
      });
    });

    it('should post a message with undefined payload when no data is provided', () => {
      service.listen();
      service.sendEvent();

      expect(mockChannel.postMessage).toHaveBeenCalledWith({
        baseSite: 'test-site',
        payload: undefined,
      });
    });

    it('should not throw if channel is not initialized', () => {
      // listen() not called, channel is undefined
      expect(() => service.sendEvent('data')).not.toThrow();
    });

    it('should use the active base site from BaseSiteService', () => {
      spyOn(baseSiteService, 'getActive').and.returnValue(of('custom-site'));
      service.listen();
      service.sendEvent('payload');

      expect(mockChannel.postMessage).toHaveBeenCalledWith({
        baseSite: 'custom-site',
        payload: 'payload',
      });
    });
  });
});
