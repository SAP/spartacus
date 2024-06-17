/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { UserAccountEventModule } from './events/user-account-event.module';
import {
  USER_ACCOUNT_CORE_FEATURE,
  USER_ACCOUNT_FEATURE,
} from './feature-name';
import { OidcLoginService } from './facade/oidc-login.service';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserAccountComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [USER_ACCOUNT_FEATURE]: {
        cmsComponents: [
          'LoginComponent',
          'ReturningCustomerLoginComponent',
          'ReturningCustomerRegisterComponent',
          'MyAccountViewUserComponent',
        ],
      },
      // by default core is bundled together with components
      [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [UserAccountEventModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: oidcLoginFactory,
      deps: [OidcLoginService],
      multi: true,
    },
    provideDefaultConfigFactory(defaultUserAccountComponentsConfig)
  ],
})
export class UserAccountRootModule {}

export function oidcLoginFactory(loginService: OidcLoginService): () => void {
  const isReady = () => {
    loginService.tryLogin();
  };
  return isReady;
}
