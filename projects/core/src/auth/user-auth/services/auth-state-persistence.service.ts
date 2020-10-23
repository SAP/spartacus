import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StatePersistenceService } from '../../../state/services/state-persistence.service';
import { AuthStorageService } from '../facade/auth-storage.service';
import { UserIdService } from '../facade/user-id.service';
import { AuthRedirectStorageService } from '../guards/auth-redirect-storage.service';
import { AuthToken } from '../models/auth-token.model';

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

  protected key = 'auth';

  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getAuthState(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

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
        const token = authToken;
        if (token) {
          // To minimize risk of user account hijacking we don't persist user refresh_token
          delete token.refresh_token;
        }
        return { token, userId, redirectUrl };
      })
    );
  }

  protected onRead(state: SyncedAuthState) {
    if (state) {
      if (state.token) {
        this.authStorageService.setToken(state.token);
      }
      if (state.userId) {
        this.userIdService.setUserId(state.userId);
      }
      if (state.redirectUrl) {
        this.authRedirectStorageService.setRedirectUrl(state.redirectUrl);
      }
    }
  }

  public readStateFromStorage() {
    return this.statePersistenceService.readStateFromStorage<SyncedAuthState>({
      key: this.key,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
