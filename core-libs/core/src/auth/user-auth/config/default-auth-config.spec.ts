import { TestBed } from '@angular/core/testing';
import { FeatureToggles } from '@spartacus/core';
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

/** Complete configuration when all flags are enabled */
const expectedAsyncAuthConfigInitializer: AuthConfig = {
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
    initializerOptions: {
      baseSiteSuffix: 'auto',
      addBaseSiteToRedirectUri: 'auto',
    },
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
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FeatureToggles,
          useValue: {
            authorizationCodeFlowByDefault: false,
            asyncAuthConfigInitializer: false,
          } satisfies FeatureToggles,
        },
      ],
    });

    featureToggles = TestBed.inject(FeatureToggles);
  });

  it('should provide the resource owner default configuration', () => {
    const actual = TestBed.runInInjectionContext(defaultAuthConfigFactory);

    expect(actual).toEqual(expectedResourceOwnerDefault);
  });

  describe('with authorizationCodeFlowByDefault flag', () => {
    beforeEach(() => {
      featureToggles.authorizationCodeFlowByDefault = true;
    });

    it('should provide the authorization code default configuration', () => {
      const actual = TestBed.runInInjectionContext(defaultAuthConfigFactory);

      expect(actual).toEqual(expectedAuthorizationCodeDefault);
    });

    describe('with asyncAuthConfigInitializer flag enabled', () => {
      beforeEach(() => {
        featureToggles.asyncAuthConfigInitializer = true;
      });

      it('should provide the auth config with initializer options', () => {
        const actual = TestBed.runInInjectionContext(defaultAuthConfigFactory);

        expect(actual).toEqual(expectedAsyncAuthConfigInitializer);
      });
    });
  });
});
