/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, InjectionToken, ValueProvider } from '@angular/core';
import { AuthConfig } from './auth-config';

const USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT = new InjectionToken<boolean>(
  'USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT',
  {
    factory: () => false,
    providedIn: 'root',
  }
);

/**
 * When enabled, sets the default oAuth configuration to use authorization
 * code flow with PKCE. This results in a more secure authorization scheme
 * as the default configuration.
 *
 * NOTE: This flag should only be enabled when used with a CCv2 Authorization
 * Server running the September 2025 update or higher. The CCv2 Authorization
 * Server only supports Authorization Code flow for public clients from
 * that version and onwards.
 *
 * @usageNotes
 * Add to the root module providers:
 * ```
 * provideAuthorizationCodeFlowByDefault()
 * ```
 */
export function provideAuthorizationCodeFlowByDefault(
  enable = true
): ValueProvider {
  return {
    provide: USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT,
    useValue: enable,
  };
}

export const defaultAuthConfig: AuthConfig = {
  authentication: {
    client_id: 'customloginpage_public',
    tokenEndpoint: '/oauth/token',
    revokeEndpoint: '/oauth/revoke',
    loginUrl: '/oauth/authorize',
    OAuthLibConfig: {
      scope: '',
      customTokenParameters: ['token_type'],
      strictDiscoveryDocumentValidation: false,
      skipIssuerCheck: true,
      disablePKCE: false,
      oidc: false,
      clearHashAfterLogin: false,
      responseType: 'code',
    },
  },
};

export function defaultAuthConfigFactory(): AuthConfig {
  const useAuthorizationCodeFlowByDefault = inject(
    USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT
  );

  if (useAuthorizationCodeFlowByDefault) {
    return defaultAuthConfig;
  } else {
    const config = {
      authentication: {
        ...defaultAuthConfig.authentication,
        client_secret: 'secret',
        sendAuthHeaderOnRevoke: true,
        OAuthLibConfig: {
          ...defaultAuthConfig.authentication?.OAuthLibConfig,
          disablePKCE: true,
        },
      },
    } satisfies AuthConfig;

    delete config.authentication.OAuthLibConfig.responseType;

    return config;
  }
}
