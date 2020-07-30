import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthStorageService } from './auth-storage.service';
import { UserIdService } from './user-id.service';

// TODO: Rethink the name
@Injectable({
  providedIn: 'root',
})
export class CxOAuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected oAuthService: OAuthService,
    protected occEndpointService: OccEndpointsService,
    protected authStorageService: AuthStorageService
  ) {
    this.oAuthService.configure({
      // TODO(#8243): Remove from occ endpoints
      tokenEndpoint: this.occEndpointService.getRawEndpoint('login'),
      clientId: 'mobile_android',
      dummyClientSecret: 'secret',
      scope: '',
      customTokenParameters: ['token_type'],
      strictDiscoveryDocumentValidation: false,
      skipIssuerCheck: true,
      // TODO(#8243): Remove from occ endpoints
      revocationEndpoint: this.occEndpointService.getRawEndpoint('revoke'),
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
}
