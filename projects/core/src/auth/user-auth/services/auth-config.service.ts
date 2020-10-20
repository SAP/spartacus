import { Injectable } from '@angular/core';
import { OccConfig } from '../../../occ/config/occ-config';
import { AuthConfig, AuthLibConfig } from '../config/auth-config';
import { OAuthFlow } from '../models/oauth-flow';

/**
 * Utility service on top of the authorization config.
 * Provides handy defaults, when not everything is set in the configuration.
 * Use this service instead of direct configuration.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  constructor(
    protected authConfig: AuthConfig,
    protected occConfig: OccConfig
  ) {}

  public getClientId(): string {
    return this.authConfig.authentication.client_id ?? '';
  }

  public getClientSecret(): string {
    return this.authConfig.authentication.client_secret ?? '';
  }

  /**
   * Returns base url of the authorization server
   */
  public getBaseUrl(): string {
    return (
      this.authConfig.authentication.baseUrl ??
      this.occConfig.backend.occ.baseUrl + '/authorizationserver'
    );
  }

  /**
   * Returns endpoint for getting the auth token
   */
  public getTokenEndpoint(): string {
    const tokenEndpoint = this.authConfig.authentication.tokenEndpoint ?? '';
    return this.prefixEndpoint(tokenEndpoint);
  }

  /**
   * Returns url for redirect to the authorization server to get token/code
   */
  public getLoginEndpoint(): string {
    const loginEndpoint = this.authConfig.authentication.loginEndpoint ?? '';
    return this.prefixEndpoint(loginEndpoint);
  }

  /**
   * Returns endpoint for token revocation (both access and refresh token).
   */
  public getRevokeEndpoint(): string {
    const revokeEndpoint = this.authConfig.authentication.revokeEndpoint ?? '';
    return this.prefixEndpoint(revokeEndpoint);
  }

  public getLogoutUrl(): string {
    const logoutUrl = this.authConfig.authentication.logoutUrl ?? '';
    return this.prefixEndpoint(logoutUrl);
  }

  public getUserinfoEndpoint(): string {
    const userinfoEndpoint =
      this.authConfig.authentication.userinfoEndpoint ?? '';
    return this.prefixEndpoint(userinfoEndpoint);
  }

  public getOAuthLibConfig(): AuthLibConfig {
    return this.authConfig.authentication?.OAuthLibConfig ?? {};
  }

  protected prefixEndpoint(endpoint: string): string {
    let url = endpoint;
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    return `${this.getBaseUrl()}${url}`;
  }

  /**
   * Returns the type of the OAuth flow based on auth config.
   * Use when you have to perform particular action only in some of the OAuth flow scenarios.
   */
  public getOAuthFlow(): OAuthFlow {
    const responseType = this.authConfig.authentication?.OAuthLibConfig
      ?.responseType;
    if (responseType) {
      const types = responseType.split(' ');
      if (types.includes('code')) {
        return OAuthFlow.AuthorizationCode;
      } else if (types.includes('token')) {
        return OAuthFlow.ImplicitFlow;
      } else {
        return OAuthFlow.ResourceOwnerPasswordFlow;
      }
    }
    return OAuthFlow.ResourceOwnerPasswordFlow;
  }
}
