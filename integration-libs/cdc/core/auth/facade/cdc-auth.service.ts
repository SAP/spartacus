import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsmAuthStorageService, TokenTarget } from '@spartacus/asm/root';
import {
  AuthActions,
  AuthRedirectService,
  AuthStorageService,
  AuthToken,
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { CdcAuthActions } from '../store/actions/index';
import { CdcAuthFacade } from '@spartacus/cdc/root';

/**
 * Service to support custom CDC OAuth flow.
 */
@Injectable()
export class CdcAuthService implements CdcAuthFacade {
  constructor(
    protected store: Store,
    protected authStorageService: AuthStorageService,
    protected userIdService: UserIdService,
    protected globalMessageService: GlobalMessageService,
    protected authRedirectService: AuthRedirectService
  ) {}

  /**
   * Loads a new user token using custom oauth flow
   *
   * @param UID
   * @param UIDSignature
   * @param signatureTimestamp
   * @param idToken
   * @param baseSite
   */
  loginWithCustomCdcFlow(
    UID: string,
    UIDSignature: string,
    signatureTimestamp: string,
    idToken: string,
    baseSite: string
  ): void {
    this.store.dispatch(
      new CdcAuthActions.LoadCdcUserToken({
        UID: UID,
        UIDSignature: UIDSignature,
        signatureTimestamp: signatureTimestamp,
        idToken: idToken,
        baseSite: baseSite,
      })
    );
  }

  /**
   * Utility to differentiate between AuthStorageService and AsmAuthStorageService
   */
  private isAsmAuthStorageService(
    service: AuthStorageService | AsmAuthStorageService
  ): service is AsmAuthStorageService {
    return 'getTokenTarget' in service;
  }

  /**
   * Transform and store the token received from custom flow to library format and login user.
   *
   * @param token
   */
  loginWithToken(token: Partial<AuthToken> & { expires_in?: number }): void {
    let stream$ = of(true);
    if (this.isAsmAuthStorageService(this.authStorageService)) {
      stream$ = combineLatest([
        this.authStorageService.getToken(),
        this.authStorageService.getTokenTarget(),
      ]).pipe(
        take(1),
        map(([currentToken, tokenTarget]) => {
          return (
            !!currentToken?.access_token && tokenTarget === TokenTarget.CSAgent
          );
        }),
        tap((isAsmAgentLoggedIn) => {
          if (isAsmAgentLoggedIn) {
            this.globalMessageService.add(
              {
                key: 'asm.auth.agentLoggedInError',
              },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        }),
        map((isAsmAgentLoggedIn) => !isAsmAgentLoggedIn)
      );
    }

    stream$.pipe(take(1)).subscribe((canLogin) => {
      if (canLogin) {
        // Code mostly based on auth lib we use and the way it handles token properties
        this.authStorageService.setItem('access_token', token.access_token);

        if (token.granted_scopes && Array.isArray(token.granted_scopes)) {
          this.authStorageService.setItem(
            'granted_scopes',
            JSON.stringify(token.granted_scopes)
          );
        }

        this.authStorageService.setItem(
          'access_token_stored_at',
          '' + Date.now()
        );

        if (token.expires_in) {
          const expiresInMilliseconds = token.expires_in * 1000;
          const now = new Date();
          const expiresAt = now.getTime() + expiresInMilliseconds;
          this.authStorageService.setItem('expires_at', '' + expiresAt);
        }

        if (token.refresh_token) {
          this.authStorageService.setItem('refresh_token', token.refresh_token);
        }

        // OCC specific code
        this.userIdService.setUserId(OCC_USER_ID_CURRENT);

        this.store.dispatch(new AuthActions.Login());

        // Remove any global errors and redirect user on successful login
        this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
        this.authRedirectService.redirect();
      }
    });
  }
}
