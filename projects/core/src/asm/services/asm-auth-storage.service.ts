import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthStorageService } from '../../auth/user-auth/facade/auth-storage.service';
import { AuthToken } from '../../auth/user-auth/models/auth-token.model';

export enum TokenTarget {
  CSAgent = 'CSAgent',
  User = 'User',
}

@Injectable({
  providedIn: 'root',
})
export class AsmAuthStorageService extends AuthStorageService {
  protected _tokenTarget$ = new BehaviorSubject<TokenTarget>(TokenTarget.User);
  protected emulatedUserToken: AuthToken;

  public getTokenTarget(): Observable<TokenTarget> {
    return this._tokenTarget$.asObservable();
  }

  public getEmulatedUserToken(): AuthToken {
    return this.emulatedUserToken;
  }

  public setEmulatedUserToken(token: AuthToken): void {
    this.emulatedUserToken = token;
  }

  public setTokenTarget(tokenTarget: TokenTarget): void {
    this._tokenTarget$.next(tokenTarget);
  }

  public switchTokenTargetToCSAgent(): void {
    this._tokenTarget$.next(TokenTarget.CSAgent);
  }

  public switchTokenTargetToUser(): void {
    this._tokenTarget$.next(TokenTarget.User);
  }

  /**
   * When we start emulation from the UI (not by ASM login) we can't restore user session on cs agent logout.
   * That's why we clear it, to not restore user session that happened before cs agent login.
   */
  public clearEmulatedUserToken(): void {
    this.emulatedUserToken = undefined;
  }
}
