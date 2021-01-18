import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        userProfile: {
          cmsComponents: [
            'RegisterCustomerComponent',
            'UpdateProfileComponent',
            'UpdateEmailComponent',
            'UpdatePasswordComponent',
            'ForgotPasswordComponent',
            'ResetPasswordComponent',
          ],
        },
      },
    }),
  ],
})
export class UserProfileRootModule {}
