/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import {
  PRE_LOGIN_CURRENCY_STORAGE_KEY,
  UserLoginCurrencyPersistenceService,
} from './user-login-currency-persistence.service';

const mockStorage: { [key: string]: string } = {};
const mockLocalStorage: Partial<Storage> = {
  getItem: (key: string) => mockStorage[key] ?? null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = value;
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
};

class MockWindowRef implements Partial<WindowRef> {
  get localStorage(): Storage {
    return mockLocalStorage as Storage;
  }
}

describe('UserLoginCurrencyPersistenceService', () => {
  let service: UserLoginCurrencyPersistenceService;

  beforeEach(() => {
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);

    TestBed.configureTestingModule({
      providers: [
        UserLoginCurrencyPersistenceService,
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    service = TestBed.inject(UserLoginCurrencyPersistenceService);
  });

  describe('savePreLoginCurrency', () => {
    it('should save isocode as JSON string to localStorage', () => {
      service.savePreLoginCurrency('USD');

      expect(mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY]).toBe(
        JSON.stringify('USD')
      );
    });
  });

  describe('getPreLoginCurrency', () => {
    it('should return isocode when key exists in localStorage', () => {
      mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY] = JSON.stringify('EUR');

      expect(service.getPreLoginCurrency()).toBe('EUR');
    });

    it('should return null when key does not exist', () => {
      expect(service.getPreLoginCurrency()).toBeNull();
    });

    it('should return null when stored value is invalid JSON', () => {
      mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY] = 'not-valid-json{';

      expect(service.getPreLoginCurrency()).toBeNull();
    });
  });

  describe('clearPreLoginCurrency', () => {
    it('should remove the key from localStorage', () => {
      mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY] = JSON.stringify('GBP');

      service.clearPreLoginCurrency();

      expect(mockStorage[PRE_LOGIN_CURRENCY_STORAGE_KEY]).toBeUndefined();
    });
  });
});
