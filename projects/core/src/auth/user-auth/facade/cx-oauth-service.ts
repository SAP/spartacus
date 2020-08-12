import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthConfig } from '../config/auth-config';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthStorageService } from './auth-storage.service';

// TODO: Rethink the name
@Injectable({
  providedIn: 'root',
})
export class CxOAuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected oAuthService: OAuthService,
    protected authStorageService: AuthStorageService,
    protected config: AuthConfig,
    protected authConfigService: AuthConfigService
  ) {
    this.oAuthService.configure({
      tokenEndpoint: this.authConfigService.getLoginEndpoint(),
      clientId: this.config.authentication.client_id,
      dummyClientSecret: this.config.authentication.client_secret,
      scope: '', // Add openid to get id_token in case of password flow
      customTokenParameters: ['token_type', ''], // Add id_token to store id_token in case of password flow
      strictDiscoveryDocumentValidation: false,
      skipIssuerCheck: true,
      revocationEndpoint: this.authConfigService.getRevokeEndpoint(),
    });
    this.oAuthService.events.subscribe((event) => {
      setTimeout(() => {
        console.group('events');
        console.warn(event);
        console.log(this.oAuthService.getAccessToken());
        console.log(this.oAuthService.getAccessTokenExpiration());
        console.log(this.oAuthService.getGrantedScopes());
        console.log(this.oAuthService.getIdToken());
        console.log(this.oAuthService.getIdTokenExpiration());
        console.log(this.oAuthService.getIdentityClaims());
        console.log(this.oAuthService.getRefreshToken());
        console.groupEnd();
      });
    });
  }

  authorizeWithPasswordFlow(
    userId: string,
    password: string
  ): Promise<TokenResponse> {
    return this.oAuthService
      .fetchTokenUsingPasswordFlow(userId, password)
      .then((res) => {
        console.log(res);
        return res;
      });
  }

  refreshToken(): void {
    this.oAuthService.refreshToken();
  }

  revokeAndLogout(): Promise<any> {
    return new Promise((resolve) => {
      this.oAuthService
        .revokeTokenAndLogout()
        .catch(() => {
          // when there would be some kind of error during revocation we can't do anything else, so at least we logout user.
          this.oAuthService.logOut();
        })
        .finally(() => {
          resolve();
        });
    });
  }

  logout(): void {
    this.oAuthService.logOut();
  }

  getIdToken(): string {
    return this.oAuthService.getIdToken();
  }
}
