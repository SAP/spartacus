/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  AuthRedirectService,
  AuthService,
  AuthStorageService,
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  PunchoutDetectionService,
  PunchoutStoreService,
} from '@spartacus/punchout/root';
import { from, map, Observable, of, switchMap, take, tap } from 'rxjs';

const ACCESS_TOKEN = 'access_token';
const ACCESS_TOKEN_STORED_AT = 'access_token_stored_at';
const TOKEN_TYPE = 'token_type';

@Injectable()
export class PunchoutAuthService {
  protected authService = inject(AuthService);
  protected globalMessageService = inject(GlobalMessageService);
  protected authStorageService = inject(AuthStorageService);
  protected authRedirectService = inject(AuthRedirectService);
  protected userIdService = inject(UserIdService);
  protected store = inject(Store);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  protected routingService = inject(RoutingService);

  silentLogout(isPageRefresh = false): Observable<boolean> {
    return this.isUserLoggedIn().pipe(
      tap(() => {
        if (!isPageRefresh) {
          this.punchoutStoreService.clearPunchoutState();
        }
      }),
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

  loginWithToken(accessToken: string): void {
    // Code mostly based on auth lib we use and the way it handles token properties
    this.authStorageService.setItem(ACCESS_TOKEN, accessToken);
    this.authStorageService.setItem(
      ACCESS_TOKEN_STORED_AT,
      Date.now().toString()
    );
    this.authStorageService.setItem(TOKEN_TYPE, 'Bearer');
    this.userIdService.setUserId(OCC_USER_ID_CURRENT);
    this.store.dispatch(new AuthActions.Login());
    this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(take(1));
  }

  endPunchoutSession(): void {
    this.punchoutStoreService.clearPunchoutState();
    this.globalMessageService.add(
      { key: 'httpHandlers.unauthorized.common' },
      GlobalMessageType.MSG_TYPE_ERROR
    );

    if (this.punchoutDetectionService.isPunchoutSessionPage()) {
      this.authRedirectService.setRedirectUrl('/');
    }

    this.authService.coreLogout().finally(() => {
      this.routingService.go({
        cxRoute: 'punchoutError',
      });
    });
  }
}
