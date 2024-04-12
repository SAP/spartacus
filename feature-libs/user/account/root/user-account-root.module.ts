/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  RoutingConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CmsPageGuard } from '@spartacus/storefront';
import { VerificationTokenFormComponent } from '../components/verification-token-form';
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
        ],
      },
      // by default core is bundled together with components
      [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [
    UserAccountEventModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: VerificationTokenFormComponent,
        data: {
          cxRoute: 'loginByVerifyToken',
          // cxContext: {
          //   [ORDER_ENTRIES_CONTEXT]: SavedCartOrderEntriesContextToken,
          // },
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultUserAccountComponentsConfig),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          loginByVerifyToken: {
            paths: ['login/verify-token'],
            paramsMapping: { savedCartId: 'savedCartId' },
          },
        },
      },
    }),
  ],
})
export class UserAccountRootModule {}
