/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';

describe('B2bRedirectCoordinator', () => {
  let service: B2bRedirectCoordinator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(B2bRedirectCoordinator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should start in the allowed (unblocked) state', () => {
      expect(service.isBlocked()).toBeFalse();
    });
  });

  describe('blockRedirect()', () => {
    it('should transition to blocked state', () => {
      service.blockRedirect();
      expect(service.isBlocked()).toBeTrue();
    });
  });

  describe('allowRedirect()', () => {
    it('should transition back to allowed state after blocking', () => {
      service.blockRedirect();
      service.allowRedirect();
      expect(service.isBlocked()).toBeFalse();
    });
  });

  describe('whenAllowed$()', () => {
    it('should emit immediately when already allowed', (done) => {
      let emitted = false;
      service.whenAllowed$().subscribe(() => {
        emitted = true;
        done();
      });
      expect(emitted).toBeTrue();
    });

    it('should not emit while blocked, then emit once after allowRedirect()', () => {
      service.blockRedirect();
      const values: boolean[] = [];
      const sub = service.whenAllowed$().subscribe((v) => values.push(v));

      expect(values.length).toBe(0);

      service.allowRedirect();
      expect(values).toEqual([true]);

      // Verify take(1): a second allowRedirect() should not cause another emission.
      service.allowRedirect();
      expect(values.length).toBe(1);

      sub.unsubscribe();
    });

    it('should complete after emitting once', () => {
      let completed = false;
      service.whenAllowed$().subscribe({ complete: () => (completed = true) });
      expect(completed).toBeTrue();
    });
  });
});
