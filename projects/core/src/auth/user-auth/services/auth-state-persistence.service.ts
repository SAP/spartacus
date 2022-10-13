/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { DeepLinkService } from 'feature-libs/asm/root/deep-link/deep-link.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take, mergeMap } from 'rxjs/operators';
import { StatePersistenceService } from '../../../state/services/state-persistence.service';
import { UserIdService } from '../facade/user-id.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';
import { AuthStorageService } from './auth-storage.service';

/**
 * Auth state synced to browser storage.
 */
export interface SyncedAuthState {
  userId?: string;
  token?: AuthToken;
  redirectUrl?: string;
}

/**
 * Responsible for saving the authorization data (userId, token, redirectUrl) in browser storage.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected userIdService: UserIdService,
    protected authStorageService: AuthStorageService,
    protected authRedirectStorageService: AuthRedirectStorageService,
    protected deepLinkService: DeepLinkService
  ) {
    this.subscription.add(
      this.deepLinkService.paramData
        .pipe(
          filter((paramData) => !!paramData),
          mergeMap((paramData) => {
            return this.authStorageService.getToken().pipe(
              map((token) => ({ paramData, token })),
            );
          }),
          take(1)
        )
        .subscribe((objectThing) => {
          const linkedCustomerId = objectThing.paramData?.customerId;
          const accessToken = objectThing.token.access_token;
          if (linkedCustomerId && accessToken) {
            this.initSync({ userId: linkedCustomerId });
          }
        })
    );
  }

  /**
   * Identifier used for storage key.
   */
  protected key = 'auth';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync(stateOverrides: Partial<SyncedAuthState> = {}) {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getAuthState(),
        onRead: (state) => this.onRead({ ...state, ...stateOverrides }),
      })
    );
  }

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
          // To minimize risk of user account hijacking we don't persist user refresh_token
          delete token.refresh_token;
        }
        return { token, userId, redirectUrl };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: SyncedAuthState | undefined) {
    if (state?.token) {
      this.authStorageService.setToken(state.token);
    }
    if (state?.redirectUrl) {
      this.authRedirectStorageService.setRedirectUrl(state.redirectUrl);
    }

    if (state?.userId) {
      this.userIdService.setUserId(state.userId);
      return;
    }

    this.userIdService.clearUserId();
  }

  /**
   * Reads synchronously state from storage and returns it.
   */
  protected readStateFromStorage() {
    return this.statePersistenceService.readStateFromStorage<SyncedAuthState>({
      key: this.key,
    });
  }

  /**
   * Check synchronously in browser storage if user is logged in (required by transfer state reducer).
   * For most cases `isUserLoggedIn` from the `AuthService` should be used instead of this.
   */
  public isUserLoggedIn(): boolean {
    return Boolean(this.readStateFromStorage()?.token?.access_token);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
