import { AuthConfig } from '@spartacus/core';
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
      // baseUrl: 'https://40.76.109.9',
      client_id: 'client4kyma',
      client_secret: 'secret',
      tokenEndpoint: '/oauth/token',
      revokeEndpoint: '/oauth/revoke',
      loginUrl: '/oauth/authorize',
      logoutUrl: '/oauth/logout',
      OAuthLibConfig: {
        responseType: 'token',
        scope: 'openId',
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
      baseUrl: 'https://40.76.109.9',
      client_id: 'client4kyma',
      client_secret: 'secret',
      tokenEndpoint: '/oauth/token',
      revokeEndpoint: '/oauth/revoke',
      loginUrl: '/oauth/authorize',
      logoutUrl: '/oauth/logout',
      OAuthLibConfig: {
        responseType: 'code',
        scope: 'openId',
        customTokenParameters: ['token_type'],
        strictDiscoveryDocumentValidation: false,
        skipIssuerCheck: true,
        disablePKCE: true,
        oidc: false,
        clearHashAfterLogin: false,
      },
    },
  });

  function authFlowTests(name: string, config: AuthConfig) {
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
