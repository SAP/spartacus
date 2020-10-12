import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthStorageService } from '../../auth/user-auth/facade/auth-storage.service';
import { UserToken } from '../../auth/user-auth/models/user-token.model';

enum TokenTarget {
  CSAgent = 'CSAgent',
  User = 'User',
  Emulated = 'Emulated',
}

@Injectable({
  providedIn: 'root',
})
export class AsmAuthStorageService extends AuthStorageService {
  protected stream$: Observable<UserToken> = this._userToken$.asObservable();

  protected _tokenTarget$ = new BehaviorSubject<TokenTarget>(TokenTarget.User);

  protected _csAgentToken$ = new BehaviorSubject<UserToken>({} as UserToken);

  /** Async API for spartacus use */
  getCSAgentToken(): Observable<UserToken> {
    return this._csAgentToken$.asObservable();
  }

  setCSAgentToken(csAgentToken: UserToken): void {
    this._userToken$.next(csAgentToken);
  }

  copyCSAgentTokenForUser(): void {
    this._userToken$.next(this._csAgentToken$.value);
  }

  switchToCSAgent(): void {
    this.stream$ = this._csAgentToken$.asObservable();
    this._tokenTarget$.next(TokenTarget.CSAgent);
  }

  switchToEmulated(): void {
    this.stream$ = this._userToken$.asObservable();
    this._tokenTarget$.next(TokenTarget.Emulated);
  }

  switchToUser(): void {
    this.stream$ = this._userToken$.asObservable();
    this._tokenTarget$.next(TokenTarget.User);
  }

  isEmulated(): Observable<boolean> {
    return this._tokenTarget$
      .asObservable()
      .pipe(map((tokenTarget) => tokenTarget === TokenTarget.Emulated));
  }

  protected getToken(): Observable<UserToken> {
    let token;
    this.stream$.pipe(take(1)).subscribe((tok) => (token = tok));
    return token;
  }

  /** Sync API for oAuth lib use */
  getItem(key: string): any {
    return this.decode(key, this.getToken()[key]);
  }

  removeItem(key: string): void {
    if (this._tokenTarget$.value !== TokenTarget.User) {
      const val = { ...this._csAgentToken$.value };
      delete val[key];
      this._csAgentToken$.next({
        ...val,
      });
    }
    if (this._tokenTarget$.value !== TokenTarget.CSAgent) {
      const val = { ...this._userToken$.value };
      delete val[key];
      this._userToken$.next({
        ...val,
      });
    }
  }

  setItem(key: string, data: any): void {
    if (this._tokenTarget$.value !== TokenTarget.User) {
      this._csAgentToken$.next({
        ...this._csAgentToken$.value,
        [key]: this.encode(key, data),
      });
    }
    if (this._tokenTarget$.value !== TokenTarget.CSAgent) {
      this._userToken$.next({
        ...this._userToken$.value,
        [key]: this.encode(key, data),
      });
    }
  }
}
