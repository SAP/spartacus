import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { USER_PROFILE_FEATURE } from './feature-name';

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
    },
  };
  return config;
}

@NgModule({
  providers: [provideDefaultConfigFactory(defaultUserProfileComponentsConfig)],
})
export class UserProfileRootModule {}
