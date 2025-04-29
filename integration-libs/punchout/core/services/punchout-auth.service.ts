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
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { PunchoutStoreService } from '@spartacus/punchout/root';
import { from, map, Observable, of, switchMap, take, tap } from 'rxjs';

const ACCESS_TOKEN = 'access_token';
const ACCESS_TOKEN_STORED_AT = 'access_token_stored_at';

@Injectable()
export class PunchoutAuthService {
  protected authService = inject(AuthService);
  protected globalMessageService = inject(GlobalMessageService);
  protected authStorageService = inject(AuthStorageService);
  protected userIdService = inject(UserIdService);
  protected store = inject(Store);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected routingService = inject(RoutingService);

  isSameAccessToken(punchoutToken: string | undefined): Observable<boolean> {
    if (!punchoutToken) {
      return of(false);
    }
    return this.authStorageService.getToken().pipe(
      take(1),
      map((token) => {
        console.log('storedAccessToken', token?.access_token);
        console.log('punchoutToken', punchoutToken);
        const storedAccessToken = token?.access_token;
        return storedAccessToken === punchoutToken;
      })
    );
  }

  logout(): Observable<boolean> {
    return this.isUserLoggedIn().pipe(
      tap(() => this.punchoutStoreService.clearPunchoutState()),
      switchMap((isLoggedIn) => {
        return isLoggedIn
          ? from(this.authService.coreLogout()).pipe(
              map(() => {
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

  loginWithToken(accessToken: string, userId: string): void {
    // Code mostly based on auth lib we use and the way it handles token properties
    this.authStorageService.setItem(ACCESS_TOKEN, accessToken);
    this.authStorageService.setItem(
      ACCESS_TOKEN_STORED_AT,
      Date.now().toString()
    );
    this.userIdService.setUserId(userId);
    this.store.dispatch(new AuthActions.Login());
    this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(take(1));
  }

  routeToLogout() {
    this.authService.coreLogout().finally(() => {
      this.routingService.go({ cxRoute: 'login' });
    });
  }
}
