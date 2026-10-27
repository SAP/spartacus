import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthStorageService,
  AuthToken,
  OAuthLibWrapperService,
  OAuthTryLoginResult,
} from '@spartacus/core';
import { OAuthEvent, TokenResponse } from 'angular-oauth2-oidc';
import { catchError, firstValueFrom, map, of, Subject } from 'rxjs';

@Injectable()
export class AuthProxyOAuthLibWrapperService extends OAuthLibWrapperService {
  _event$ = new Subject<OAuthEvent>();
  events$ = this._event$.asObservable();

  protected httpClient = inject(HttpClient);
  protected authStorageService = inject(AuthStorageService);

  authorizeWithPasswordFlow(
    _userId: string,
    _password: string
  ): Promise<TokenResponse> {
    throw new Error('ROPC is no longer supported');
  }

  logout(): void {
    throw new Error('Logout not implemented');
  }

  refreshToken(): void {
    this.httpClient
      .get<AuthToken>('https://localhost:3000/refresh', {
        withCredentials: true,
      })
      .subscribe({
        next: (token) => {
          token.access_token += `_${Date.now()}`; // make token unique
          // save token
          this.authStorageService.setToken(token);
          // send events
          const refreshEvent: OAuthEvent = { type: 'token_refreshed' };
          this._event$.next(refreshEvent);
        },
        error: () => {
          const refreshErrorEvent: OAuthEvent = { type: 'token_refresh_error' };
          this._event$.next(refreshErrorEvent);
        },
      });
  }

  revokeAndLogout(): Promise<void> {
    return firstValueFrom(
      this.httpClient
        .get('https://localhost:3000/revoke', { withCredentials: true })
        .pipe(
          map(() => {
            // clear token
            this.authStorageService.removeItem('access_token');
            this.authStorageService.removeItem('id_token');
            this.authStorageService.removeItem('refresh_token');
            this.authStorageService.removeItem('nonce');
            this.authStorageService.removeItem('PKCE_verifier');
            this.authStorageService.removeItem('expires_at');
            this.authStorageService.removeItem('id_token_claims_obj');
            this.authStorageService.removeItem('id_token_expires_at');
            this.authStorageService.removeItem('id_token_stored_at');
            this.authStorageService.removeItem('access_token_stored_at');
            this.authStorageService.removeItem('granted_scopes');
            this.authStorageService.removeItem('session_state');

            // emit logout event
            const refreshEvent: OAuthEvent = { type: 'logout' };
            this._event$.next(refreshEvent);
          }),
          catchError((err) => {
            const refreshErrorEvent: OAuthEvent = {
              type: 'token_revoke_error',
            };
            this._event$.next(refreshErrorEvent);
            throw err;
          })
        )
    );
  }

  initLoginFlow(): void {
    this.winRef.location.href = 'https://localhost:3000/auth';
  }

  tryLogin(): Promise<OAuthTryLoginResult> {
    if (!this.winRef.location?.search?.includes('authsuccess=true')) {
      return Promise.resolve({ result: false, tokenReceived: false });
    }
    return firstValueFrom(
      this.httpClient
        .get<AuthToken>('https://localhost:3000/token', {
          withCredentials: true,
        })
        .pipe(
          map((_res) => {
            console.log('got token', _res);
            this.authStorageService.setToken(_res);
            return <OAuthTryLoginResult>{ result: true, tokenReceived: true };
          }),
          catchError(() => {
            console.log('error getting token');
            return of(<OAuthTryLoginResult>{
              result: false,
              tokenReceived: false,
            });
          })
        )
    );
  }

  getIdToken(): string {
    throw new Error('Open ID not supported');
  }
}
