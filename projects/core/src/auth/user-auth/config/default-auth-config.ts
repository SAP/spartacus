/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { FeatureToggles } from '../../../features-config/feature-toggles';
import { AuthConfig } from './auth-config';

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

    return config;
  }
}
