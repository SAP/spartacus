/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { authFlowTests } from '../../../helpers/auth-redirects';
import { whenJDK17, whenJDK21 } from '../../../support/utils/jdk-versions';

context('Authentication Flows', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  whenJDK17(() => {
    // Redirection flow
    authFlowTests('Resource Owner Password Grant', {
      authentication: {
        client_id: 'mobile_android',
        client_secret: 'secret',
        tokenEndpoint: '/oauth/token',
        revokeEndpoint: '/oauth/revoke',
        loginUrl: '/oauth/authorize',
        sendAuthHeaderOnRevoke: true,
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
        sendAuthHeaderOnRevoke: true,
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

    // code flow
    authFlowTests('Kyma Authentication Code Grant', {
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
  });

  whenJDK21(() => {
    authFlowTests('Authentication Code', {});
  });
});
