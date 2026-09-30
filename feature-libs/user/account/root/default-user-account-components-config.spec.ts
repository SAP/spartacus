import { TestBed } from '@angular/core/testing';
import { CmsConfig, FeatureToggles } from '@spartacus/core';
import {
  USER_ACCOUNT_CORE_FEATURE,
  USER_ACCOUNT_FEATURE,
} from './feature-name';
import { defaultUserAccountComponentsConfig } from './user-account-root.module';

// expected value with no feature toggles enabled
const expectedLegacyConfig: CmsConfig = {
  featureModules: {
    [USER_ACCOUNT_FEATURE]: {
      cmsComponents: [
        'LoginComponent',
        'ReturningCustomerLoginComponent',
        'VerifyOTPTokenComponent',
        'ReturningCustomerRegisterComponent',
        'MyAccountViewUserComponent',
        'ReturningCustomerOTPLoginComponent',
        'RegisterCustomerWithOTPComponent',
        'ReturningOrganizationUserRegisterComponent',
      ],
    },
    // by default core is bundled together with components
    [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
  },
};

// expected value with all relevant feature toggles enabled
const expectedDefaultConfig: CmsConfig = {
  featureModules: {
    [USER_ACCOUNT_FEATURE]: {
      cmsComponents: [
        'LoginComponent',
        'OAuthCallbackComponent',
        'ReturningCustomerLoginComponent',
        'VerifyOTPTokenComponent',
        'ReturningCustomerRegisterComponent',
        'MyAccountViewUserComponent',
        'ReturningCustomerOTPLoginComponent',
        'RegisterCustomerWithOTPComponent',
        'ReturningOrganizationUserRegisterComponent',
      ],
    },
    // by default core is bundled together with components
    [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
  },
};

describe('defaultUserAccountComponentsConfig', () => {
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FeatureToggles,
          useValue: {
            authorizationCodeFlowByDefault: false,
            asyncAuthConfigInitializer: false,
            oauthCallbackPage: false,
          } satisfies FeatureToggles,
        },
      ],
    });

    featureToggles = TestBed.inject(FeatureToggles);
  });

  describe('with feature toggles disabled', () => {
    it('should provide the legacy default configuration', () => {
      const actual = TestBed.runInInjectionContext(
        defaultUserAccountComponentsConfig
      );

      expect(actual).toEqual(expectedLegacyConfig);
    });
  });

  describe('with feature toggles enabled', () => {
    beforeEach(() => {
      featureToggles.authorizationCodeFlowByDefault = true;
      featureToggles.asyncAuthConfigInitializer = true;
      featureToggles.oauthCallbackPage = true;
    });

    it('should provide the full default configuration', () => {
      const actual = TestBed.runInInjectionContext(
        defaultUserAccountComponentsConfig
      );

      expect(actual).toEqual(expectedDefaultConfig);
    });
  });
});
