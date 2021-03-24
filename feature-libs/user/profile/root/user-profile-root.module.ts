import { NgModule } from '@angular/core';
import {
  provideDefaultConfigFactory,
  UserProfileFacadeTransitionalToken,
} from '@spartacus/core';
import {
  USER_PROFILE_CORE_FEATURE,
  USER_PROFILE_FEATURE,
} from './feature-name';
import { UserProfileFacade } from './facade';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserProfileComponentsConfig() {
  const config = {
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
