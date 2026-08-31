/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultUserAccountConfig } from './config/default-user-account-config';
import { UserAccountEventModule } from './events/user-account-event.module';
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
          'VerifyOTPTokenComponent',
          'ReturningCustomerRegisterComponent',
          'MyAccountViewUserComponent',
          'ReturningCustomerOTPLoginComponent',
          'RegisterCustomerWithOTPComponent',
          'ReturningOrganizationUserRegisterComponent',
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
    provideDefaultConfig(defaultUserAccountConfig),
    provideDefaultConfigFactory(defaultUserAccountComponentsConfig),
  ],
})
export class UserAccountRootModule {}
