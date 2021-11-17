import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfigFactory,
  UserAccountFacadeTransitionalToken,
} from '@spartacus/core';
import { UserAccountFacade } from './facade/user-account.facade';
import {
  USER_ACCOUNT_CORE_FEATURE,
  USER_ACCOUNT_FEATURE,
} from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserAccountComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
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
  providers: [
    provideDefaultConfigFactory(defaultUserAccountComponentsConfig),
    {
      provide: UserAccountFacadeTransitionalToken,
      useExisting: UserAccountFacade,
    },
  ],
})
export class UserAccountRootModule {}
