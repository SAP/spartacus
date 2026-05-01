import { TestBed } from '@angular/core/testing';
import { provideFeatureToggles } from '@spartacus/core';
import { USER_ACCOUNT_FEATURE } from '@spartacus/user/account/root';
import { defaultUserAccountB2bComponentsConfig } from './user-registration-root.module';

describe('defaultUserAccountB2bComponentsConfig', () => {
  it('should not add ReturningCustomerRegisterComponent when the toggle is disabled', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFeatureToggles({ a11yActiveB2bLoginRegisterCpnt: false }),
      ],
    });

    const config = TestBed.runInInjectionContext(
      defaultUserAccountB2bComponentsConfig
    );

    expect(
      config.featureModules?.[USER_ACCOUNT_FEATURE]?.cmsComponents
    ).toBeFalsy();
  });

  it('should add ReturningCustomerRegisterComponent to USER_ACCOUNT_FEATURE when the toggle is enabled', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFeatureToggles({ a11yActiveB2bLoginRegisterCpnt: true }),
      ],
    });

    const config = TestBed.runInInjectionContext(
      defaultUserAccountB2bComponentsConfig
    );

    expect(
      config.featureModules?.[USER_ACCOUNT_FEATURE]?.cmsComponents
    ).toContain('ReturningCustomerRegisterComponent');
    expect(
      config.featureModules?.[USER_ACCOUNT_FEATURE]?.cmsComponents
    ).toContain('ReturningCustomerLoginComponent');
    expect(
      config.featureModules?.[USER_ACCOUNT_FEATURE]?.cmsComponents
    ).toContain('OrganizationUserRegistrationLink');
    expect(
      config.featureModules?.[USER_ACCOUNT_FEATURE]?.cmsComponents
    ).toContain('NoAccountParagraphComponent');
  });
});
