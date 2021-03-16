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

  /**
   * Utility to make access to authentication config easier.
   */
  private get config(): AuthConfig['authentication'] {
    return this.authConfig?.authentication ?? {};
  }

  /**
   * Get client_id
   *
   * @return client_id
   */
  public getClientId(): string {
    return this.config.client_id ?? '';
  }

  /**
   * Get client_secret. OAuth server shouldn't require it from web apps (but Hybris OAuth server requires).
   *
   * @return client_secret
   */
  public getClientSecret(): string {
    return this.config.client_secret ?? '';
  }

  /**
   * Returns base url of the authorization server
   */
  public getBaseUrl(): string {
    return (
      this.config.baseUrl ??
      (this.occConfig?.backend?.occ?.baseUrl ?? '') + '/authorizationserver'
    );
  }

  /**
   * Returns endpoint for getting the auth token
   */
  public getTokenEndpoint(): string {
    const tokenEndpoint = this.config.tokenEndpoint ?? '';
    return this.prefixEndpoint(tokenEndpoint);
  }

  /**
   * Returns url for redirect to the authorization server to get token/code
   */
  public getLoginUrl(): string {
    const loginUrl = this.config.loginUrl ?? '';
    return this.prefixEndpoint(loginUrl);
  }

  /**
   * Returns endpoint for token revocation (both access and refresh token).
   */
  public getRevokeEndpoint(): string {
    const revokeEndpoint = this.config.revokeEndpoint ?? '';
    return this.prefixEndpoint(revokeEndpoint);
  }

  /**
   * Returns logout url to redirect to on logout.
   */
  public getLogoutUrl(): string {
    const logoutUrl = this.config.logoutUrl ?? '';
    return this.prefixEndpoint(logoutUrl);
  }

  /**
   * Returns userinfo endpoint of the OAuth server.
   */
  public getUserinfoEndpoint(): string {
    const userinfoEndpoint = this.config.userinfoEndpoint ?? '';
    return this.prefixEndpoint(userinfoEndpoint);
  }

  /**
   * Returns configuration specific for the angular-oauth2-oidc library.
   */
  public getOAuthLibConfig(): AuthLibConfig {
    return this.config.OAuthLibConfig ?? {};
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
    const responseType = this.config.OAuthLibConfig?.responseType;
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
