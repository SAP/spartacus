import { Injectable } from '@angular/core';
import { StaticPersistenceService } from 'projects/core/src/util';
import { SyncedAuthState } from './auth-state-persistence.service';

@Injectable({ providedIn: 'root' })
export class AuthStatePersistenceHelperService {
  constructor(protected staticPersistenceService: StaticPersistenceService) {}

  public key = 'auth';

  /**
   * Reads synchronously state from storage and returns it.
   */
  protected readStateFromStorage(): SyncedAuthState {
    return this.staticPersistenceService.readFromStorage<SyncedAuthState>({
      key: this.key,
    }) as SyncedAuthState;
  }

  /**
   * Check synchronously in browser storage if user is logged in (required by transfer state reducer).
   * For most cases `isUserLoggedIn` from the `AuthService` should be used instead of this.
   */
  public isUserLoggedIn(): boolean {
    return Boolean(this.readStateFromStorage()?.token?.access_token);
  }
}
