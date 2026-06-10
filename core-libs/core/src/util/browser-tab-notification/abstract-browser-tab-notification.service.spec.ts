/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnvironmentInjector, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from '../../logger';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { WindowRef } from '../../window';
import {
  AbstractBrowserTabNotificationService,
  TabNotificationWrapper,
} from './abstract-browser-tab-notification.service';

class MockBaseSiteService implements Partial<BaseSiteService> {
  _mockControl = { getActive: new BehaviorSubject<string>('test-site') };

  getActive(): Observable<string> {
    return this._mockControl.getActive.asObservable();
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

const mockChannelId = 'spartacus_tab_notification';
@Injectable()
class TabNotificationService extends AbstractBrowserTabNotificationService<number> {
  protected channelId = mockChannelId;
  isolateBySite = true;

  protected payloadGuard(
    event: MessageEvent<TabNotificationWrapper<unknown>>
  ): event is MessageEvent<TabNotificationWrapper<number>> {
    return typeof event.data.payload === 'number';
  }
}

const mockEventPayload = 5;

describe('AbstractTabNotificationService', () => {
  let service: TabNotificationService;
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
        TabNotificationService,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    service = TestBed.inject(TabNotificationService);
    baseSiteService = TestBed.inject(BaseSiteService);
    logger = TestBed.inject(LoggerService) as unknown as MockLoggerService;
    windowRef = TestBed.inject(WindowRef) as MockWindowRef;
  });

  describe('listen()', () => {
    it('should create a BroadcastChannel with the correct channel id', () => {
      service.listen();

      expect(window.BroadcastChannel).toHaveBeenCalledWith(mockChannelId);
    });

    it('should register a message event listener on the channel', () => {
      service.listen();

      expect(mockChannel.addEventListener).toHaveBeenCalledWith(
        'message',
        jasmine.any(Function)
      );
    });

    it('should log a warning if BroadcastChannel throws', () => {
      const errorMessage = 'BroadcastChannel not supported';
      (window.BroadcastChannel as unknown as jasmine.Spy).and.throwError(
        errorMessage
      );

      service.listen();

      expect(logger.warn).toHaveBeenCalledWith(
        'Could not open AuthNotification channel: ' + errorMessage
      );
    });

    it('should not listen when server-side', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);

      service.listen();

      expect(window.BroadcastChannel).not.toHaveBeenCalled();
    });
  });

  describe('notifications$', () => {
    it('should emit when a message is received for the active base site', () => {
      service.listen();

      const listenerCallback = (
        mockChannel.addEventListener as jasmine.Spy
      ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

      const emittedValues: unknown[] = [];
      service.notifications$.subscribe((val) => emittedValues.push(val));

      const mockEvent = new MessageEvent<TabNotificationWrapper<number>>(
        'message',
        {
          data: { baseSite: 'test-site', payload: mockEventPayload },
        }
      );
      listenerCallback(mockEvent);

      expect(emittedValues).toEqual([mockEventPayload]);
    });

    it('should not emit when a message does not match the payload guard', () => {
      service.listen();

      const listenerCallback = (
        mockChannel.addEventListener as jasmine.Spy
      ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

      const emittedValues: unknown[] = [];
      service.notifications$.subscribe((val) => emittedValues.push(val));

      const mockEvent = new MessageEvent<TabNotificationWrapper<string>>(
        'message',
        {
          data: { baseSite: 'test-site', payload: 'NOT A NUMBER' },
        }
      );
      listenerCallback(mockEvent);

      expect(emittedValues).toEqual([]);
    });

    describe('when site isolation is enabled', () => {
      beforeEach(() => {
        service.isolateBySite = true;
      });

      it('should not emit when a message is received for a different base site', () => {
        service.listen();

        const listenerCallback = (
          mockChannel.addEventListener as jasmine.Spy
        ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

        const emittedValues: unknown[] = [];
        service.notifications$.subscribe((val) => emittedValues.push(val));

        const mockEvent = new MessageEvent<TabNotificationWrapper<number>>(
          'message',
          {
            data: { baseSite: 'other-site', payload: mockEventPayload },
          }
        );
        listenerCallback(mockEvent);

        expect(emittedValues).toEqual([]);
      });
    });

    describe('when site isolation is disabled', () => {
      beforeEach(() => {
        service.isolateBySite = false;
      });

      it('should emit messages received from different base sites', () => {
        service.listen();

        const listenerCallback = (
          mockChannel.addEventListener as jasmine.Spy
        ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

        const emittedValues: unknown[] = [];
        service.notifications$.subscribe((val) => emittedValues.push(val));

        const mockEvent = new MessageEvent<TabNotificationWrapper<number>>(
          'message',
          {
            data: { baseSite: 'other-site', payload: mockEventPayload },
          }
        );
        listenerCallback(mockEvent);

        expect(emittedValues).toEqual([mockEventPayload]);
      });
    });
  });

  describe('sendEvent()', () => {
    it('should post a message with the active base site and payload', () => {
      service.listen();
      service.sendEvent(mockEventPayload);

      expect(mockChannel.postMessage).toHaveBeenCalledWith({
        baseSite: 'test-site',
        payload: mockEventPayload,
      });
    });

    it('should not throw if channel is not initialized', () => {
      // listen() not called, channel is undefined
      expect(() => service.sendEvent(mockEventPayload)).not.toThrow();
    });

    it('should use the active base site from BaseSiteService', () => {
      (
        baseSiteService as unknown as MockBaseSiteService
      )._mockControl.getActive.next('custom-site');
      service.listen();
      service.sendEvent(mockEventPayload);

      expect(mockChannel.postMessage).toHaveBeenCalledWith({
        baseSite: 'custom-site',
        payload: mockEventPayload,
      });
    });
  });

  it('should close the BroadcastChannel on destruction', () => {
    const injector = TestBed.inject(EnvironmentInjector);
    service.listen();

    injector.destroy();

    expect(mockChannel.close).toHaveBeenCalled();
  });
});
