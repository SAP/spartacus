/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { AuthNotificationType } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LoggerService } from '../../../logger';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { TabNotificationWrapper } from '../../../util/browser-tab-notification';
import { WindowRef } from '../../../window';
import {
  AuthNotificationService,
  authNotificationServiceChannelId,
} from './auth-notification.service';

const mockActiveBaseSite = 'electronics-spa';

class MockBaseSiteService implements Partial<BaseSiteService> {
  getActive(): Observable<string> {
    return of(mockActiveBaseSite);
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
  let mockChannel: MockBroadcastChannel;

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
  });

  describe('listen()', () => {
    it('should create a BroadcastChannel with the correct channel id', () => {
      service.listen();

      expect(window.BroadcastChannel).toHaveBeenCalledWith(
        authNotificationServiceChannelId
      );
    });
  });

  describe('events$', () => {
    it('should isolate by the active base site', () => {
      service.listen();

      const listenerCallback = (
        mockChannel.addEventListener as jasmine.Spy
      ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

      const emittedValues: unknown[] = [];
      service.notifications$.subscribe((val) => emittedValues.push(val));

      const sameBaseSiteEvent = new MessageEvent<
        TabNotificationWrapper<AuthNotificationType>
      >('message', {
        data: {
          baseSite: mockActiveBaseSite,
          payload: AuthNotificationType.LOGOUT,
        },
      });
      const differentBaseSiteEvent = new MessageEvent<
        TabNotificationWrapper<AuthNotificationType>
      >('message', {
        data: {
          baseSite: 'other-base-site',
          payload: AuthNotificationType.LOGOUT,
        },
      });
      listenerCallback(sameBaseSiteEvent);
      listenerCallback(differentBaseSiteEvent);

      expect(emittedValues).toEqual([AuthNotificationType.LOGOUT]);
    });

    it('should filter payload to valid values', () => {
      service.listen();

      const listenerCallback = (
        mockChannel.addEventListener as jasmine.Spy
      ).calls.mostRecent().args[1] as (event: MessageEvent) => void;

      const emittedValues: unknown[] = [];
      service.notifications$.subscribe((val) => emittedValues.push(val));

      const validEvent = new MessageEvent<
        TabNotificationWrapper<AuthNotificationType>
      >('message', {
        data: {
          baseSite: mockActiveBaseSite,
          payload: AuthNotificationType.LOGOUT,
        },
      });
      const invalidEvent = new MessageEvent<TabNotificationWrapper<number>>(
        'message',
        {
          data: { baseSite: mockActiveBaseSite, payload: 5 },
        }
      );
      listenerCallback(validEvent);
      listenerCallback(invalidEvent);

      expect(emittedValues).toEqual([AuthNotificationType.LOGOUT]);
    });
  });
});
