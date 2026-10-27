/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AuthStatePersistenceService, SyncedAuthState } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Responsible for saving the authorization data (userId, token, redirectUrl) in browser storage.
 */
@Injectable()
export class AuthProxyAuthStatePersistenceService extends AuthStatePersistenceService {
  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getAuthState(): Observable<SyncedAuthState> {
    return combineLatest([
      this.authStorageService.getToken().pipe(
        filter((state) => !!state),
        map((state) => {
          return {
            ...state,
          };
        })
      ),
      this.userIdService.getUserId(),
      this.authRedirectStorageService.getRedirectUrl(),
    ]).pipe(
      map(([authToken, userId, redirectUrl]) => {
        let token = authToken;
        if (token) {
          token = { ...token };
          // Real token is stored in HTTP-Only cookie session
          // delete token.refresh_token;
        }
        return { token, userId, redirectUrl };
      })
    );
  }
}
