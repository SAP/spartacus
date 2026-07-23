/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionReducer } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';
import { createB2bLoginMetaReducer } from './b2b-login-meta-reducer';

describe('createB2bLoginMetaReducer', () => {
  let coordinator: jasmine.SpyObj<B2bRedirectCoordinator>;
  let mockReducer: jasmine.Spy;

  const state = {};
  const loginAction = { type: AuthActions.LOGIN };
  const otherAction = { type: '[Other] Some Action' };

  beforeEach(() => {
    coordinator = jasmine.createSpyObj('B2bRedirectCoordinator', [
      'blockRedirect',
    ]);
    mockReducer = jasmine.createSpy('reducer').and.returnValue(state);
  });

  function buildMetaReducer(): ActionReducer<any> {
    return createB2bLoginMetaReducer(coordinator)(mockReducer);
  }

  it('should always delegate to the inner reducer', () => {
    const metaReducer = buildMetaReducer();
    metaReducer(state, otherAction);
    expect(mockReducer).toHaveBeenCalledWith(state, otherAction);
  });

  it('should return the result of the inner reducer', () => {
    const expectedState = { key: 'value' };
    mockReducer.and.returnValue(expectedState);
    const metaReducer = buildMetaReducer();
    const result = metaReducer(state, otherAction);
    expect(result).toBe(expectedState);
  });

  it('should NOT call blockRedirect() for non-LOGIN actions', () => {
    const metaReducer = buildMetaReducer();
    metaReducer(state, otherAction);
    expect(coordinator.blockRedirect).not.toHaveBeenCalled();
  });

  describe('LOGIN action', () => {
    it('should NOT call blockRedirect() when URL is a plain page (no /login, no OAuth code)', () => {
      // In Karma, window.location.href is something like "http://localhost:9876/context.html"
      // — it contains neither "/login" nor "?code=...&state=...", so no block should occur.
      const metaReducer = buildMetaReducer();
      metaReducer(state, loginAction);

      // The module-load snapshot (captured at import time) also does not contain
      // code= / state= in a normal test run, so blockRedirect() should not be called.
      expect(coordinator.blockRedirect).not.toHaveBeenCalled();
    });

    it('should still call the inner reducer on LOGIN', () => {
      const metaReducer = buildMetaReducer();
      metaReducer(state, loginAction);
      expect(mockReducer).toHaveBeenCalledWith(state, loginAction);
    });
  });
});
