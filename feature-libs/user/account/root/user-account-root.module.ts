import { NgModule } from '@angular/core';
import {
  provideDefaultConfigFactory,
  UserAccountFacadeTransitionalToken,
} from '@spartacus/core';
import { PageLayoutModule } from '@spartacus/storefront';
import {
  USER_ACCOUNT_CORE_FEATURE,
  USER_ACCOUNT_FEATURE,
} from './feature-name';
import { UserAccountFacade } from './facade/user-account.facade';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserAccountComponentsConfig() {
  const config = {
    featureModules: {
      [USER_ACCOUNT_FEATURE]: {
        cmsComponents: [
          'LoginComponent',
          'ReturningCustomerLoginComponent',
          'ReturningCustomerRegisterComponent',
        ],
      },
      // by default core is bundled together with components
      [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [PageLayoutModule],
  providers: [
    provideDefaultConfigFactory(defaultUserAccountComponentsConfig),
    {
      provide: UserAccountFacadeTransitionalToken,
      useExisting: UserAccountFacade,
    },
  ],
})
export class UserAccountRootModule {}
