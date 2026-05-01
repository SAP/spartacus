import { TestBed } from '@angular/core/testing';
import { USER_ACCOUNT_FEATURE } from './feature-name';
import { defaultUserAccountComponentsConfig } from './user-account-root.module';

describe('defaultUserAccountComponentsConfig', () => {
  it('should return the fixed list of CMS components without ReturningCustomerRegisterComponent', () => {
    TestBed.configureTestingModule({});

    const config = TestBed.runInInjectionContext(
      defaultUserAccountComponentsConfig
    );

    const featureConfig = config.featureModules?.[USER_ACCOUNT_FEATURE];
    const cmsComponents =
      (typeof featureConfig === 'object'
        ? featureConfig?.cmsComponents
        : undefined) ?? [];

    expect(cmsComponents).toEqual([
      'LoginComponent',
      'ReturningCustomerLoginComponent',
      'VerifyOTPTokenComponent',
      'MyAccountViewUserComponent',
      'ReturningCustomerOTPLoginComponent',
      'RegisterCustomerWithOTPComponent',
    ]);
    expect(cmsComponents).not.toContain('ReturningCustomerRegisterComponent');
  });
});
