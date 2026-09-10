/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, NgModule } from '@angular/core';
import {
  CmsConfig,
  FeatureModuleConfig,
  FeatureToggles,
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
  const featureToggles = inject(FeatureToggles);

  const config: CmsConfig = {
    featureModules: {
      [USER_ACCOUNT_FEATURE]: {
        cmsComponents: [
          'LoginComponent',
          'OAuthCallbackComponent',
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

  if (!featureToggles.oauthCallbackPage) {
    const cmsComponents = (
      config.featureModules as Record<string, FeatureModuleConfig>
    )[USER_ACCOUNT_FEATURE].cmsComponents as string[];
    const index = cmsComponents.indexOf('OAuthCallbackComponent');
    cmsComponents.splice(index, 1);
  }

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
