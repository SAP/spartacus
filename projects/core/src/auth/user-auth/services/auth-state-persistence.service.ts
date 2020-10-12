import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StatePersistenceService } from '../../../state/services/state-persistence.service';
import { AuthStorageService } from '../facade/auth-storage.service';
import { UserIdService } from '../facade/user-id.service';
import { AuthToken } from '../models/auth-token.model';

// TODO: Should we declare basic parameters like in UserToken or keep everything custom?
export interface SyncedAuthState {
  userId: string;
  access_token: string;
  [token_param: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected userIdService: UserIdService,
    protected authStorageService: AuthStorageService
  ) {}

  protected key = 'auth';

  public sync() {
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
    ]).pipe(map(([token, userId]) => ({ ...token, userId })));
  }

  // TODO: Should we still omit refresh_token as before?
  protected onRead(state: SyncedAuthState) {
    if (state) {
      const tokenData = Object.fromEntries(
        Object.entries(state).filter(([key]) => {
          // userId used only for userIdService
          return key !== 'userId';
        })
      );
      this.authStorageService.setToken(tokenData as AuthToken);
      this.userIdService.setUserId(state.userId);
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
