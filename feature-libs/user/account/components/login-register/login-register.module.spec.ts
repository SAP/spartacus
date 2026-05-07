import { TestBed } from '@angular/core/testing';
import { provideFeatureToggles } from '@spartacus/core';
import { LoginRegisterComponent } from './login-register.component';
import {
  defaultLoginRegisterComponentsConfig,
  EmptyLoginRegisterCmsComponent,
} from './login-register.module';

describe('defaultLoginRegisterComponentsConfig', () => {
  it('should not expose ReturningCustomerRegisterComponent when the toggle is disabled', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFeatureToggles({ a11yActiveB2bLoginRegisterCpnt: false }),
      ],
    });

    const config = TestBed.runInInjectionContext(
      defaultLoginRegisterComponentsConfig
    );

    expect(
      config.cmsComponents?.ReturningCustomerRegisterComponent
    ).toBeFalsy();
    expect(config.cmsComponents?.OrganizationUserRegistrationLink).toBeFalsy();
    expect(config.cmsComponents?.NoAccountParagraphComponent).toBeFalsy();
  });

  it('should expose the a11y B2B login/register CMS composition when the toggle is enabled', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFeatureToggles({ a11yActiveB2bLoginRegisterCpnt: true }),
      ],
    });

    const config = TestBed.runInInjectionContext(
      defaultLoginRegisterComponentsConfig
    );

    expect(
      config.cmsComponents?.ReturningCustomerRegisterComponent?.component
    ).toBe(LoginRegisterComponent);
    expect(
      config.cmsComponents?.OrganizationUserRegistrationLink?.component
    ).toBe(EmptyLoginRegisterCmsComponent);
    expect(config.cmsComponents?.NoAccountParagraphComponent?.component).toBe(
      EmptyLoginRegisterCmsComponent
    );
  });
});
