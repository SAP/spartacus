/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, InjectionToken, ValueProvider } from '@angular/core';
import { FeatureToggles } from '../../../features-config/feature-toggles';
import { AuthConfig } from './auth-config';

/**
 * @deprecated since 221121.1
 * Please use the `authorizationCodeFlowByDefault` feature toggle instead.
 */
export const USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT =
  new InjectionToken<boolean>('USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT', {
    factory: () => false,
    providedIn: 'root',
  });

/**
 * When `authorizationCodeFlowByDefault` feature toggle is enabled, it sets the default oAuth configuration to use authorization.
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
  const authorizationCodeFlowByDefault =
    inject(FeatureToggles).authorizationCodeFlowByDefault;
  return {
    provide: USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT,
    useValue: authorizationCodeFlowByDefault ?? enable,
  };
}

export const defaultAuthConfig: AuthConfig = {
  authentication: {
    client_id: 'mobile_android_public',
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
    customLoginPage: {
      csrfEndpoint: '/csrf',
      loginFormEndpoint: '/login',
    },
  },
};

export function defaultAuthConfigFactory(): AuthConfig {
  const { authorizationCodeFlowByDefault } = inject(FeatureToggles);

  if (authorizationCodeFlowByDefault) {
    return defaultAuthConfig;
  } else {
    const config = {
      authentication: {
        ...defaultAuthConfig.authentication,
        client_id: 'mobile_android',
        client_secret: 'secret',
        sendAuthHeaderOnRevoke: true,
        useClientTokens: true,
        OAuthLibConfig: {
          ...defaultAuthConfig.authentication?.OAuthLibConfig,
          disablePKCE: true,
        },
      },
    } satisfies AuthConfig;

    delete config.authentication.OAuthLibConfig.responseType;
    delete config.authentication.customLoginPage;
    return config;
  }
}
