/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthConfig } from './auth-config';

export const defaultAuthConfig: AuthConfig = {
  // authentication: {
  //   client_id: 'mobile_android',
  //   client_secret: 'secret',
  //   tokenEndpoint: '/oauth/token',
  //   revokeEndpoint: '/oauth/revoke',
  //   loginUrl: '/oauth/authorize',
  //   OAuthLibConfig: {
  //     scope: '',
  //     customTokenParameters: ['token_type'],
  //     strictDiscoveryDocumentValidation: false,
  //     skipIssuerCheck: true,
  //     disablePKCE: true,
  //     oidc: false,
  //     clearHashAfterLogin: false,
  //     silentRefreshTimeout: 3000,
  //     silentRefreshRedirectUri:
  //       'http://localhost:4200/assets/silent-refresh.html',
  //   },
  // },
  // Implicit flow
  // authentication: {
  //   client_id: 'client4kyma',
  //   client_secret: 'secret',
  //   tokenEndpoint: '/oauth/token',
  //   revokeEndpoint: '/oauth/revoke',
  //   loginUrl: '/oauth/authorize',
  //   OAuthLibConfig: {
  //     responseType: 'token',
  //     scope: '',
  //     customTokenParameters: ['token_type'],
  //     strictDiscoveryDocumentValidation: false,
  //     skipIssuerCheck: true,
  //     disablePKCE: false,
  //     oidc: false,
  //     clearHashAfterLogin: false,
  //     silentRefreshRedirectUri:
  //       'http://localhost:4200/assets/silent-refresh.html',
  //     useSilentRefresh: true,
  //     silentRefreshShowIFrame: true,
  //     showDebugInformation: true,
  //     silentRefreshTimeout: 3000,
  //   },
  // },
  // Code flow
  authentication: {
    client_id: 'client4kyma',
    client_secret: 'secret',
    tokenEndpoint: '/oauth/token',
    revokeEndpoint: '/oauth/revoke',
    loginUrl: '/oauth/authorize',
    OAuthLibConfig: {
      responseType: 'code',
      scope: '',
      customTokenParameters: ['token_type'],
      strictDiscoveryDocumentValidation: false,
      skipIssuerCheck: true,
      disablePKCE: false,
      oidc: false,
      clearHashAfterLogin: false,
      silentRefreshRedirectUri:
        'http://localhost:4200/assets/silent-refresh.html',
      useSilentRefresh: true,
      silentRefreshShowIFrame: true,
      showDebugInformation: true,
      silentRefreshTimeout: 3000,
    },
  },
};
