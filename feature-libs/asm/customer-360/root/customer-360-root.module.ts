/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ASM_FEATURE } from '@spartacus/asm/root';
import { provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import {
  CUSTOMER_360_CORE_FEATURE,
  CUSTOMER_360_FEATURE,
} from './feature-name';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SiteContextInterceptor } from './interceptors/site-context.interceptor';

@NgModule({
  imports: [PageComponentModule],
  providers: [
    provideDefaultConfig({
      featureModules: {
        [CUSTOMER_360_FEATURE]: {
          // cmsComponents: ['AsmCustomer360Component'],
          dependencies: [ASM_FEATURE],
        },
        [CUSTOMER_360_CORE_FEATURE]: CUSTOMER_360_FEATURE,
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: SiteContextInterceptor,
      multi: true,
    },
  ],
})
export class Customer360RootModule {}
