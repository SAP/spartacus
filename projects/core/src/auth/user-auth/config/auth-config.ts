import { Injectable } from '@angular/core';
import { AuthConfig as LibConfig } from 'angular-oauth2-oidc';
import { Config } from '../../../config/config-tokens';

// siletRefreshTimeout - omitted as it is deprecated of typo
// clientId - we need it for client credentials flow
// dummyClientSecret - we need it for client credentials flow
// loginUrl - similarly like the rest of endpoints we want to have full control over that
// logoutUrl - similarly like the rest of endpoints we want to have full control over that
// tokenEndpoint - similarly like the rest of endpoints we want to have full control over that
// revocationEndpoint - similarly like the rest of endpoints we want to have full control over that
// userinfoEndpoint - similarly like the rest of endpoints we want to have full control over that
//
export type AuthLibConfig = Omit<
  LibConfig,
  | 'clientId'
  | 'dummyClientSecret'
  | 'siletRefreshTimeout'
  | 'loginUrl'
  | 'logoutUrl'
  | 'tokenEndpoint'
  | 'revocationEndpoint'
  | 'userinfoEndpoint'
>;

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AuthConfig {
  authentication?: {
    /**
     * OAuth client id.
     */
    client_id?: string;
    /**
     * Secret for client required by Hybris OAuth.
     */
    client_secret?: string;
    /**
     * Base url for auth server (for login, token, revoke endpoints).
     */
    baseUrl?: string;
    /**
     * Endpoint for getting token.
     */
    tokenEndpoint?: string;
    /**
     * Endpoint url for revoking tokens.
     */
    revokeEndpoint?: string;
    /**
     * Url for login redirect for Implicit and Authorization Code Flow.
     */
    loginUrl?: string;
    /**
     * Redirect url after logout.
     */
    logoutUrl?: string;
    /**
     * Userinfo endpoint.
     */
    userinfoEndpoint?: string;
    /**
     * Config for angular-oauth-oidc library.
     */
    OAuthLibConfig?: AuthLibConfig;
  };
}

declare module '../../../config/config-tokens' {
  interface Config extends AuthConfig {}
}
