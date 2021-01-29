import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PageLayoutModule } from '@spartacus/storefront';

@NgModule({
  imports: [PageLayoutModule],

  providers: [
    provideDefaultConfig({
      featureModules: {
        userDetails: {
          cmsComponents: [
            'LoginComponent',
            'ReturningCustomerLoginComponent',
            'ReturningCustomerRegisterComponent',
          ],
        },
      },
    }),
  ],
})
export class UserAccountRootModule {}
