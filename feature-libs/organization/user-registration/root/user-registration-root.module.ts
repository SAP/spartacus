/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject } from '@angular/core';
import {
  CmsConfig,
  FeatureToggles,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { USER_ACCOUNT_FEATURE } from '@spartacus/user/account/root';
import { ORGANIZATION_USER_REGISTRATION_FEATURE } from './feature-name';

export function defaultOrganizationUserRegistrationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
        cmsComponents: [
          'OrganizationUserRegistrationComponent',
          'RegisterB2BCustomerWithOTPComponent',
          'VerifyOTPForB2BRegistrationComponent',
        ],
      },
    },
  };

  return config;
}

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserAccountB2bComponentsConfig(): CmsConfig {
  const featureToggles = inject(FeatureToggles);

  if (!featureToggles.a11yActiveB2bLoginRegisterCpnt) {
    return {};
  }

  return {
    featureModules: {
      [USER_ACCOUNT_FEATURE]: {
        cmsComponents: [
          'LoginComponent',
          'ReturningCustomerLoginComponent',
          'VerifyOTPTokenComponent',
          'ReturningCustomerRegisterComponent',
          'OrganizationUserRegistrationLink',
          'NoAccountParagraphComponent',
          'MyAccountViewUserComponent',
          'ReturningCustomerOTPLoginComponent',
          'RegisterCustomerWithOTPComponent',
        ],
      },
    },
  };
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(
      defaultOrganizationUserRegistrationComponentsConfig
    ),
    provideDefaultConfigFactory(defaultUserAccountB2bComponentsConfig),
  ],
})
export class OrganizationUserRegistrationRootModule {}
