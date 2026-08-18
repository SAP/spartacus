/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  CurrencyService,
  CxEvent,
  EventService,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { Subject, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserAccountConfig } from '../config/user-account-config';
import { UserAccountFacade } from '../facade/user-account.facade';
import {
  PRE_LOGIN_CURRENCY_STORAGE_KEY,
  UserLoginCurrencyPersistenceService,
} from './user-login-currency-persistence.service';
import { UserLoginCurrencyService } from './user-login-currency.service';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.callFake((eventType: any) =>
    mockEventStream$.asObservable().pipe(filter((e) => e instanceof eventType))
  );
}

class MockCurrencyService implements Partial<CurrencyService> {
  getActive = createSpy().and.returnValue(of('USD'));
  setActive = createSpy();
}

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get = createSpy().and.returnValue(
    of({
      currency: { isocode: 'EUR', name: 'Euro', active: true, symbol: '€' },
    })
  );
}

const mockStorage: { [key: string]: string | undefined } = {};

class MockUserLoginCurrencyPersistenceService
  implements Partial<UserLoginCurrencyPersistenceService>
{
  savePreLoginCurrency = createSpy().and.callFake((isocode: string) => {
    mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY] = JSON.stringify(isocode);
  });
  getPreLoginCurrency = createSpy().and.callFake(() => {
    const raw = mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY];
    return raw ? (JSON.parse(raw) as string) : null;
  });
  clearPreLoginCurrency = createSpy().and.callFake(() => {
    delete mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY];
  });
}

describe('UserLoginCurrencyService', () => {
  let currencyService: CurrencyService;
  let userAccountFacade: UserAccountFacade;
  let currencyPersistence: UserLoginCurrencyPersistenceService;

  function setup(configEnabled: boolean): void {
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);

    TestBed.configureTestingModule({
      providers: [
        UserLoginCurrencyService,
        { provide: EventService, useClass: MockEventService },
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        {
          provide: UserLoginCurrencyPersistenceService,
          useClass: MockUserLoginCurrencyPersistenceService,
        },
        {
          provide: UserAccountConfig,
          useValue: {
            userAccount: { enableUserCurrencySync: configEnabled },
          },
        },
      ],
    });

    TestBed.inject(UserLoginCurrencyService);
    currencyService = TestBed.inject(CurrencyService);
    userAccountFacade = TestBed.inject(UserAccountFacade);
    currencyPersistence = TestBed.inject(UserLoginCurrencyPersistenceService);
  }

  describe('with config disabled', () => {
    beforeEach(() => setup(false));

    it('should not apply OCC currency on login', () => {
      mockEventStream$.next(new LoginEvent());

      expect(currencyService.getActive).not.toHaveBeenCalled();
      expect(userAccountFacade.get).not.toHaveBeenCalled();
      expect(currencyService.setActive).not.toHaveBeenCalled();
    });

    it('should not restore currency on logout', () => {
      mockEventStream$.next(new LogoutEvent());

      expect(currencyService.setActive).not.toHaveBeenCalled();
    });
  });

  describe('with config enabled', () => {
    beforeEach(() => setup(true));

    describe('on LoginEvent', () => {
      it('should save pre-login currency to localStorage and apply OCC currency', () => {
        mockEventStream$.next(new LoginEvent());

        expect(currencyService.getActive).toHaveBeenCalled();
        expect(currencyPersistence.savePreLoginCurrency).toHaveBeenCalledWith(
          'USD'
        );
        expect(userAccountFacade.get).toHaveBeenCalled();
        expect(currencyService.setActive).toHaveBeenCalledWith('EUR');
      });

      it('should not call setActive when OCC user has no currency', () => {
        (userAccountFacade.get as jasmine.Spy).and.returnValue(
          of({ currency: undefined })
        );

        mockEventStream$.next(new LoginEvent());

        expect(currencyService.setActive).not.toHaveBeenCalled();
      });

      it('should not call setActive when OCC user currency has no isocode', () => {
        (userAccountFacade.get as jasmine.Spy).and.returnValue(
          of({ currency: { name: 'Euro' } })
        );

        mockEventStream$.next(new LoginEvent());

        expect(currencyService.setActive).not.toHaveBeenCalled();
      });

      it('should not call setActive when OCC currency matches pre-login currency', () => {
        (userAccountFacade.get as jasmine.Spy).and.returnValue(
          of({ currency: { isocode: 'USD' } })
        );

        mockEventStream$.next(new LoginEvent());

        expect(currencyService.setActive).not.toHaveBeenCalled();
      });
    });

    describe('on LogoutEvent', () => {
      it('should restore pre-login currency and clear storage', () => {
        mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY] = JSON.stringify('GBP');
        (
          currencyPersistence.getPreLoginCurrency as jasmine.Spy
        ).and.returnValue('GBP');

        mockEventStream$.next(new LogoutEvent());

        expect(currencyService.setActive).toHaveBeenCalledWith('GBP');
        expect(currencyPersistence.clearPreLoginCurrency).toHaveBeenCalled();
      });

      it('should not call setActive when no pre-login currency is stored', () => {
        mockEventStream$.next(new LogoutEvent());

        expect(currencyService.setActive).not.toHaveBeenCalled();
      });

      it('should still clear storage even when setActive is not called', () => {
        mockEventStream$.next(new LogoutEvent());

        expect(currencyPersistence.clearPreLoginCurrency).toHaveBeenCalled();
      });
    });
  });
});
