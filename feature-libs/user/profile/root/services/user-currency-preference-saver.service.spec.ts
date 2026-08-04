/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  CurrencySetEvent,
  CxEvent,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { UserAccountConfig } from '@spartacus/user/account/root';
import { Subject, of } from 'rxjs';
import { UserProfileFacade } from '../facade/user-profile.facade';
import { UserCurrencyPreferenceSaverService } from './user-currency-preference-saver.service';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  update = createSpy().and.returnValue(of({}));
}

describe('UserCurrencyPreferenceSaverService', () => {
  let userProfileFacade: UserProfileFacade;

  function setup(configEnabled: boolean, userId = 'current'): void {
    TestBed.configureTestingModule({
      providers: [
        UserCurrencyPreferenceSaverService,
        { provide: EventService, useClass: MockEventService },
        { provide: UserProfileFacade, useClass: MockUserProfileFacade },
        {
          provide: UserIdService,
          useValue: { getUserId: createSpy().and.returnValue(of(userId)) },
        },
        {
          provide: UserAccountConfig,
          useValue: { userAccount: { applyUserCurrencyOnLogin: configEnabled } },
        },
      ],
    });

    TestBed.inject(UserCurrencyPreferenceSaverService);
    userProfileFacade = TestBed.inject(UserProfileFacade);
  }

  describe('with config disabled', () => {
    beforeEach(() => setup(false));

    it('should not save currency to server when currency changes', () => {
      const event = new CurrencySetEvent();
      event.activeCurrency = 'EUR';
      mockEventStream$.next(event);

      expect(userProfileFacade.update).not.toHaveBeenCalled();
    });
  });

  describe('with config enabled', () => {
    describe('logged-in user', () => {
      beforeEach(() => setup(true, 'current'));

      it('should save currency to server when currency changes', () => {
        const event = new CurrencySetEvent();
        event.activeCurrency = 'EUR';
        mockEventStream$.next(event);

        expect(userProfileFacade.update).toHaveBeenCalledWith({
          currency: { isocode: 'EUR' },
        });
      });

      it('should save updated currency on each currency change', () => {
        const event1 = new CurrencySetEvent();
        event1.activeCurrency = 'EUR';
        mockEventStream$.next(event1);

        const event2 = new CurrencySetEvent();
        event2.activeCurrency = 'GBP';
        mockEventStream$.next(event2);

        expect(userProfileFacade.update).toHaveBeenCalledTimes(2);
        expect(userProfileFacade.update).toHaveBeenCalledWith({
          currency: { isocode: 'GBP' },
        });
      });
    });

    describe('anonymous user', () => {
      beforeEach(() => setup(true, OCC_USER_ID_ANONYMOUS));

      it('should not save currency to server when user is anonymous', () => {
        const event = new CurrencySetEvent();
        event.activeCurrency = 'EUR';
        mockEventStream$.next(event);

        expect(userProfileFacade.update).not.toHaveBeenCalled();
      });
    });
  });
});
