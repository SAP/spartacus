/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  testRedirectAfterForcedLogin,
  testRedirectBackfterLogin,
} from '../../../helpers/auth-redirects';

context('Authentication Flows', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  authFlowTests('Redirection flow', {
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
  });

  authFlowTests('Implicit flow', {
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
      },
    },
  });

  authFlowTests('Code flow', {
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
        disablePKCE: true,
        oidc: false,
        clearHashAfterLogin: false,
      },
    },
  });

  function authFlowTests(name: string, config: any) {
    describe(name, () => {
      beforeEach(() => {
        cy.cxConfig(config);
      });

      const useKyma = config.authentication.client_id === 'client4kyma';

      testRedirectBackfterLogin(useKyma);
      testRedirectAfterForcedLogin(useKyma);
    });
  }
});
