import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from '../../auth/user-auth/models/auth-token.model';
import { AuthStorageService } from '../../auth/user-auth/services/auth-storage.service';

/**
 * Indicates if auth token is for regular user or Customer Support Agent
 */
export enum TokenTarget {
  CSAgent = 'CSAgent',
  User = 'User',
}

/**
 * With AsmAuthStorageService apart from storing the token also need to store
 * information for which user is the token (regular user or CS Agent).
 */
@Injectable({
  providedIn: 'root',
})
export class AsmAuthStorageService extends AuthStorageService {
  protected _tokenTarget$ = new BehaviorSubject<TokenTarget>(TokenTarget.User);

  /**
   * When CS Agent logs in during regular user session we store the regular
   * user token to restore the session after CS Agent logout.
   *
   * This supports in-store use case when CS Agent want's to quickly help
   * customer and then give an option to customer to continue the process.
   */
  protected emulatedUserToken: AuthToken;

  getTokenTarget(): Observable<TokenTarget> {
    return this._tokenTarget$.asObservable();
  }

  setTokenTarget(tokenTarget: TokenTarget): void {
    this._tokenTarget$.next(tokenTarget);
  }

  getEmulatedUserToken(): AuthToken {
    return this.emulatedUserToken;
  }

  setEmulatedUserToken(token: AuthToken): void {
    this.emulatedUserToken = token;
  }

  switchTokenTargetToCSAgent(): void {
    this._tokenTarget$.next(TokenTarget.CSAgent);
  }

  switchTokenTargetToUser(): void {
    this._tokenTarget$.next(TokenTarget.User);
  }

  /**
   * When we start emulation from the UI (not by ASM login) we can't restore user session on cs agent logout.
   * Only available solution is to drop session we could restore, to avoid account hijack.
   */
  clearEmulatedUserToken(): void {
    this.emulatedUserToken = undefined;
  }
}
