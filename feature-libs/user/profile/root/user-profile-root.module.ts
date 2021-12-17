import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfigFactory,
  UserProfileFacadeTransitionalToken,
} from '@spartacus/core';
import { UserProfileFacade } from './facade/user-profile.facade';
import {
  USER_PROFILE_CORE_FEATURE,
  USER_PROFILE_FEATURE,
} from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserProfileComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [USER_PROFILE_FEATURE]: {
        cmsComponents: [
          'RegisterCustomerComponent',
          'UpdateProfileComponent',
          'UpdateEmailComponent',
          'UpdatePasswordComponent',
          'ForgotPasswordComponent',
          'ResetPasswordComponent',
          'CloseAccountComponent',
        ],
      },
      // by default core is bundled together with components
      [USER_PROFILE_CORE_FEATURE]: USER_PROFILE_FEATURE,
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultUserProfileComponentsConfig),
    {
      provide: UserProfileFacadeTransitionalToken,
      useExisting: UserProfileFacade,
    },
  ],
})
export class UserProfileRootModule {}
