/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { WindowRef } from '../../window';
import { FederatedLoginContext } from '../model/federated-login-context.mode';
import {
  FEDERATED_LOGIN_STATE_KEY,
  FederatedLoginContextStorageService,
} from './federated-login-context-storage';

function mockLocalStorage() {
  let store: Record<string, string> = {};
  return {
    length: 0,
    key: (index: number) => {
      return Object.keys(store)[index];
    },
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
}

describe('FederatedLoginContextStorageService', () => {
  let service: FederatedLoginContextStorageService;
  let localStorage: Storage;

  beforeEach(() => {
    localStorage = mockLocalStorage();

    TestBed.configureTestingModule({
      providers: [
        FederatedLoginContextStorageService,
        {
          provide: WindowRef,
          useValue: { localStorage },
        },
      ],
    });

    service = TestBed.inject(FederatedLoginContextStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use FEDERATED_LOGIN_STATE_KEY as the storage key', () => {
    expect(service.storageKey).toBe(FEDERATED_LOGIN_STATE_KEY);
  });

  describe('write()', () => {
    it('should persist the context to localStorage', () => {
      const context: FederatedLoginContext = {
        origin: 'https://shop.example.com',
        language: 'en',
      };

      service.write(context);

      expect(localStorage.getItem(FEDERATED_LOGIN_STATE_KEY)).toBe(
        JSON.stringify(context)
      );
    });
  });

  describe('read()', () => {
    it('should return undefined when nothing has been stored', () => {
      expect(service.read()).toBeUndefined();
    });

    it('should return the stored context', () => {
      const context: FederatedLoginContext = {
        origin: 'https://shop.example.com',
        language: 'en',
      };
      service.write(context);

      expect(service.read()).toEqual(context);
    });

    it('should return the last written context after multiple writes', () => {
      service.write({ language: 'en' });
      service.write({ language: 'de' });

      expect(service.read()).toEqual({ language: 'de' });
    });
  });

  describe('read() / write() round-trip', () => {
    it('should recover the full context after a write', () => {
      const context: FederatedLoginContext = {
        origin: 'https://shop.example.com',
        language: 'en',
      };
      service.write(context);

      expect(service.read()).toEqual(context);
    });
  });

  describe('when localStorage is unavailable (SSR)', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          FederatedLoginContextStorageService,
          {
            provide: WindowRef,
            useValue: { localStorage: undefined },
          },
        ],
      });
      service = TestBed.inject(FederatedLoginContextStorageService);
    });

    it('should not throw when write() is called', () => {
      expect(() => service.write({ language: 'en' })).not.toThrow();
    });

    it('should return undefined when read() is called', () => {
      expect(service.read()).toBeUndefined();
    });
  });
});
