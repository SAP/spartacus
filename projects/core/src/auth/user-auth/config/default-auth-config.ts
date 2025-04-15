/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { FeatureToggles } from '@spartacus/core';
import { AuthConfig } from './auth-config';

const defaultAuthConfig: AuthConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret',
    tokenEndpoint: '/oauth/token',
    revokeEndpoint: '/oauth/revoke',
    loginUrl: '/oauth/authorize',
    OAuthLibConfig: {
      scope: '',
      customTokenParameters: ['token_type'],
      strictDiscoveryDocumentValidation: false,
      skipIssuerCheck: true,
      disablePKCE: true,
      oidc: false,
      clearHashAfterLogin: false,
    },
  },
};

export function defaultAuthConfigProvider(): AuthConfig {
  const { enableOAuth2_1 } = inject(FeatureToggles);

  if (enableOAuth2_1) {
    return {
      authentication: {
        ...defaultAuthConfig.authentication,

        // TODO: endpoints will likely change to old paths
        tokenEndpoint: '/authserver/oauth2/token',
        revokeEndpoint: '/authserver/oauth2/revoke',
        loginUrl: '/authserver/oauth2/authorize',

        OAuthLibConfig: {
          ...defaultAuthConfig.authentication?.OAuthLibConfig,
          disablePKCE: false, // PKCE required
          responseType: 'code', // only 'code' supported
          redirectUri: 'http://localhost:4200/oauth-callback', // must be absolute.  TODO: need validator?
        },
      },
    };
  } else {
    return defaultAuthConfig;
  }
}
