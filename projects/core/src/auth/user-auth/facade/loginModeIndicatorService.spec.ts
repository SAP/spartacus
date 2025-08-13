/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { LoginModeIndicatorService } from './loginModeIndicatorService';
import { WindowRef } from '../../../window/window-ref';

describe('LoginModeIndicatorService', () => {
  let service: LoginModeIndicatorService;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockWindowRef: { localStorage: Storage };

  beforeEach(() => {
    mockLocation = jasmine.createSpyObj('Location', ['path']);

    // Use a fake localStorage for testing
    let localStorageMock = new Map<string, string>();

    mockWindowRef = {
      localStorage: {
        getItem: (key: string) => localStorageMock.get(key) || null,
        setItem: (key: string, value: string) =>
          localStorageMock.set(key, value),
        removeItem: (key: string) => localStorageMock.delete(key),
        clear: () => localStorageMock.clear(),
        key: (index: number) =>
          Array.from(localStorageMock.keys())[index] || null,
        length: 0,
      },
    };

    TestBed.configureTestingModule({
      providers: [
        LoginModeIndicatorService,
        { provide: Location, useValue: mockLocation },
        { provide: WindowRef, useValue: mockWindowRef },
      ],
    });

    service = TestBed.inject(LoginModeIndicatorService);
  });

  describe('isLaunched', () => {
    it('should return true if asm=true is in query params', () => {
      mockLocation.path.and.returnValue('/somepath?asm=true');
      expect((service as any).isLaunched()).toBeTruthy;
    });

    it('should return false if asm=true is not present', () => {
      mockLocation.path.and.returnValue('/somepath?other=true');
      expect((service as any).isLaunched()).toBeFalsy;
    });
  });

  describe('isEmulateInURL', () => {
    it('should return true if URL includes assisted-service/emulate', () => {
      mockLocation.path.and.returnValue(
        '/cx/assisted-service/emulate?customer=123'
      );
      expect(service.isEmulateInURL()).toBeTruthy;
    });

    it('should return false if URL does not include assisted-service/emulate', () => {
      mockLocation.path.and.returnValue('/cx/home');
      expect(service.isEmulateInURL()).toBeFalsy;
    });
  });

  describe('isUsedBefore', () => {
    it('should return true if asm_enabled is set to true in localStorage', () => {
      mockWindowRef.localStorage.setItem('asm_enabled', 'true');
      expect((service as any).isUsedBefore()).toBeTruthy;
    });

    it('should return false if asm_enabled is not set', () => {
      mockWindowRef.localStorage.removeItem('asm_enabled');
      expect((service as any).isUsedBefore()).toBeFalsy;
    });
  });

  describe('isEnabled', () => {
    it('should enable ASM if asm=true is in URL', () => {
      mockLocation.path.and.returnValue('/path?asm=true');
      mockWindowRef.localStorage.removeItem('asm_enabled');

      expect(service.isEnabled()).toBeTruthy;
      expect(mockWindowRef.localStorage.getItem('asm_enabled')).toBe('true');
    });

    it('should enable ASM if asm_enabled is already in localStorage', () => {
      mockLocation.path.and.returnValue('/path');
      mockWindowRef.localStorage.setItem('asm_enabled', 'true');

      expect(service.isEnabled()).toBeTruthy;
    });

    it('should enable ASM if emulate is in URL', () => {
      mockLocation.path.and.returnValue(
        '/cx/assisted-service/emulate?customer=123'
      );
      mockWindowRef.localStorage.removeItem('asm_enabled');

      expect(service.isEnabled()).toBeTruthy;
    });

    it('should return false if no ASM-related conditions are met', () => {
      mockLocation.path.and.returnValue('/cx/home');
      mockWindowRef.localStorage.removeItem('asm_enabled');

      expect(service.isEnabled()).toBeFalsy;
    });
  });
});
