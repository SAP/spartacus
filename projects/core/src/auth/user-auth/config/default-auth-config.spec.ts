import { TestBed } from '@angular/core/testing';
import { provideFeatureToggles } from '@spartacus/core';
import { AuthConfig } from './auth-config';
import { defaultAuthConfigFactory } from './default-auth-config';

const expectedAuthorizationCodeDefault: AuthConfig = {
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
    customLoginPage: { csrfEndpoint: '/csrf', loginFormEndpoint: '/login' },
  },
};

/** Legacy JDK17 configuration */
const expectedResourceOwnerDefault: AuthConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret',
    tokenEndpoint: '/oauth/token',
    revokeEndpoint: '/oauth/revoke',
    loginUrl: '/oauth/authorize',
    sendAuthHeaderOnRevoke: true,
    useClientTokens: true,
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

describe('defaultAuthConfigFactory', () => {
  it('should provide the resource owner default configuration', () => {
    TestBed.configureTestingModule({
      providers: [],
    });

    const actual = TestBed.runInInjectionContext(defaultAuthConfigFactory);

    expect(actual).toEqual(expectedResourceOwnerDefault);
  });

  describe('with authorizationCodeFlowByDefault flag', () => {
    it('should provide the authorization code default configuration', () => {
      TestBed.configureTestingModule({
        providers: [
          provideFeatureToggles({ authorizationCodeFlowByDefault: true }),
        ],
      });

      const actual = TestBed.runInInjectionContext(defaultAuthConfigFactory);

      expect(actual).toEqual(expectedAuthorizationCodeDefault);
    });
  });
});
