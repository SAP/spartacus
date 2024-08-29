/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CONFIG_INITIALIZER,
  CmsConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { UserAccountEventModule } from './events/user-account-event.module';
import {
  USER_ACCOUNT_CORE_FEATURE,
  USER_ACCOUNT_FEATURE,
} from './feature-name';
import { OidcConfigInitializer } from './configs/oidc-config-initializer';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserAccountComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [USER_ACCOUNT_FEATURE]: {
        cmsComponents: [
          'LoginComponent',
          'ReturningCustomerLoginComponent',
          'VerifyOTPTokenComponent',
          'ReturningCustomerRegisterComponent',
          'MyAccountViewUserComponent',
          'ReturningCustomerOTPLoginComponent',
          'ReturningOIDCLoginComponent',
        ],
      },
      // by default core is bundled together with components
      [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
    },
  };
  return config;
}

export function initCdcConfigFactory(
  oidcConfigInitializer: OidcConfigInitializer
) {
  return oidcConfigInitializer;
}

@NgModule({
  imports: [UserAccountEventModule],
  providers: [
    provideDefaultConfigFactory(defaultUserAccountComponentsConfig),
    {
      provide: CONFIG_INITIALIZER,
      useFactory: initCdcConfigFactory,
      deps: [OidcConfigInitializer],
      multi: true,
    },
  ],
})
export class UserAccountRootModule {}
