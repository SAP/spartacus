/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
     * Determine if the `Authorization` header should be sent with revocation requests.
     *
     * In particular, you must set this property to `true` when using the legacy Authorization
     * Server from SAP Commerce Cloud versions prior to September 2025. For SAP Commerce Cloud
     * versions from September 2025 onwards, which include the rebuilt Authorization server,
     * set `sendAuthHeaderOnRevoke` to `false`.
     */
    sendAuthHeaderOnRevoke?: boolean;
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

    customLoginPage?: {
      enabled: boolean;
      csfrPath: string;
      /** auth server's login form action */
      loginForm?: string;
    };
  };
}

declare module '../../../config/config-tokens' {
  interface Config extends AuthConfig {}
}
