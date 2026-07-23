/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionReducer } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';

/**
 * Captured at module load time — before any APP_INITIALIZER runs.
 * angular-oauth2-oidc strips ?code=...&state=... query params during its
 * APP_INITIALIZER phase, so we must snapshot the href here to detect OAuth
 * Code Flow callbacks reliably.
 */
const _hrefAtModuleLoad =
  typeof window !== 'undefined' ? window.location.href : '';

/**
 * MetaReducer factory that calls blockRedirect() only for genuine login events,
 * not for token restoration on page refresh.
 *
 * Detection logic (evaluated in order):
 *   1. Module-load href contains ?code=...&state=... → Authorization Code Flow callback
 *   2. Current href contains /login               → ROPC (user submitted the login form)
 *   3. Anything else                              → token restore or unrelated, no block
 */
export function createB2bLoginMetaReducer(
  coordinator: B2bRedirectCoordinator
): (reducer: ActionReducer<any>) => ActionReducer<any> {
  const hasFreshOAuthCode =
    _hrefAtModuleLoad.includes('code=') && _hrefAtModuleLoad.includes('state=');

  return (reducer) =>
    (state, action) => {
      if (action.type === AuthActions.LOGIN) {
        const currentHref =
          typeof window !== 'undefined' ? window.location.href : '';
        const isFreshLogin =
          hasFreshOAuthCode || currentHref.includes('/login');
        if (isFreshLogin) {
          coordinator.blockRedirect();
        }
      }
      return reducer(state, action);
    };
}
