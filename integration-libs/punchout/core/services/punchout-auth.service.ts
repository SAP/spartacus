/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  AuthService,
  AuthStorageService,
  GlobalMessageService,
  GlobalMessageType,
  UserIdService,
} from '@spartacus/core';
import { from, map, Observable, of, switchMap, take } from 'rxjs';

@Injectable()
export class PunchoutAuthService {
  protected authService = inject(AuthService);
  protected globalMessageService = inject(GlobalMessageService);
  protected authStorageService = inject(AuthStorageService);
  protected userIdService = inject(UserIdService);
  protected store = inject(Store);

  logout(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      take(1),
      switchMap((isLoggedIn) => {
        return isLoggedIn
          ? from(this.authService.coreLogout()).pipe(
              map(() => {
                console.log('logging out');
                this.globalMessageService.remove(
                  GlobalMessageType.MSG_TYPE_CONFIRMATION
                );
                return true;
              })
            )
          : of(false);
      })
    );
  }

  loginWithToken(accessToken: string, userId: string) {
    // Code mostly based on auth lib we use and the way it handles token properties
    this.authStorageService.setItem('access_token', accessToken);
    this.authStorageService.setItem('access_token_stored_at', '' + Date.now());

    this.userIdService.setUserId(userId);

    this.store.dispatch(new AuthActions.Login());
    this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
  }

  checkPunchoutSessionIdInLocalStorage() {
    this.authStorageService.getItem;
  }
}
