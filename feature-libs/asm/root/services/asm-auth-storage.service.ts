import { Injectable } from '@angular/core';
import { AuthStorageService, AuthToken } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Indicates if auth token is for regular user or CS Agent.
 */
export enum TokenTarget {
  CSAgent = 'CSAgent',
  User = 'User',
}

/**
 * With AsmAuthStorageService apart from storing the token we also need to store
 * information for which user is the token (regular user or CS Agent).
 *
 * Overrides `AuthStorageService`.
 */
@Injectable({
  providedIn: 'root',
})
export class AsmAuthStorageService extends AuthStorageService {
  protected _tokenTarget$: Observable<TokenTarget> =
    new BehaviorSubject<TokenTarget>(TokenTarget.User);

  /**
   * When CS Agent logs in during regular user session we store the regular
   * user token to restore the session after CS Agent logout.
   *
   * This supports in-store use case when CS Agent want's to quickly help
   * customer and then give an option to customer to continue the process.
   */
  protected emulatedUserToken?: AuthToken;

  /**
   * Get target user for current auth token.
   *
   * @return observable with TokenTarget
   */
  getTokenTarget(): Observable<TokenTarget> {
    return this._tokenTarget$;
  }

  /**
   * Set new token target.
   *
   * @param tokenTarget
   */
  setTokenTarget(tokenTarget: TokenTarget): void {
    (this._tokenTarget$ as BehaviorSubject<TokenTarget>).next(tokenTarget);
  }

  /**
   * Get token for previously user session, when it was interrupted by CS agent login.
   *
   * @return previously logged in user token.
   */
  getEmulatedUserToken(): AuthToken | undefined {
    return this.emulatedUserToken;
  }

  /**
   * Save user token on CS agent login.
   *
   * @param token
   */
  setEmulatedUserToken(token: AuthToken): void {
    this.emulatedUserToken = token;
  }

  /**
   * Change token target to CS Agent.
   */
  switchTokenTargetToCSAgent(): void {
    (this._tokenTarget$ as BehaviorSubject<TokenTarget>).next(
      TokenTarget.CSAgent
    );
  }

  /**
   * Change token target to user.
   */
  switchTokenTargetToUser(): void {
    (this._tokenTarget$ as BehaviorSubject<TokenTarget>).next(TokenTarget.User);
  }

  /**
   * When we start emulation from the UI (not by ASM login) we can't restore user session on cs agent logout.
   * Only available solution is to drop session we could restore, to avoid account hijack.
   */
  clearEmulatedUserToken(): void {
    this.emulatedUserToken = undefined;
  }
}
