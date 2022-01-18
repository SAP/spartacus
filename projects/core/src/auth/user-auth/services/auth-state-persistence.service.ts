import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
    protected authRedirectStorageService: AuthRedirectStorageService
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'auth';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getAuthState(),
        onRead: (state) => this.onRead(state),
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
    } else {
      this.userIdService.clearUserId();
    }
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
