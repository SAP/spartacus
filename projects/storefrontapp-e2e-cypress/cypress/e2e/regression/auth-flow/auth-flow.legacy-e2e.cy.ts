/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { authFlowTests } from '../../../helpers/auth-redirects';

context('Authentication Flows (Legacy)', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  // TODO: REQUIRES JDK17 server, not supported on JDK21
  authFlowTests('Resource Owner Password (Redirection flow)', {
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
        responseType: undefined,
        sendAuthHeaderOnRevoke: true,
      },
    },
  });

  // TODO: REQUIRES JDK17 server, not supported on JDK21
  authFlowTests('Implicit', {
    authentication: {
      client_id: 'client4kyma',
      client_secret: 'secret',
      tokenEndpoint: '/oauth/token',
      revokeEndpoint: '/oauth/revoke',
      loginUrl: '/oauth/authorize',
      OAuthLibConfig: {
        responseType: 'token',
        scope: '',
        customTokenParameters: ['token_type'],
        strictDiscoveryDocumentValidation: false,
        skipIssuerCheck: true,
        disablePKCE: true,
        oidc: false,
        clearHashAfterLogin: false,
        sendAuthHeaderOnRevoke: true,
      },
    },
  });
});
