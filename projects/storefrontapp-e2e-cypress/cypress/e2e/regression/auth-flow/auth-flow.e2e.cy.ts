/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { authFlowTests } from '../../../helpers/auth-redirects';

context('Authentication Flows', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  // REQUIRES JDK21 backend
  authFlowTests('Authentication Code', {});

  /*
  authFlowTests('Kyma Authentication Code', {
    authentication: {
      client_id: 'client4kyma',
      client_secret: 'secret',
      tokenEndpoint: '/oauth/token',
      revokeEndpoint: '/oauth/revoke',
      loginUrl: '/oauth/authorize',
      sendAuthHeaderOnRevoke: true,
      OAuthLibConfig: {
        responseType: 'code',
        scope: '',
        customTokenParameters: ['token_type'],
        strictDiscoveryDocumentValidation: false,
        skipIssuerCheck: true,
        disablePKCE: true,
        oidc: false,
        clearHashAfterLogin: false,
      },
    },
  });
  */
});
