/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ASM_FEATURE } from '@spartacus/asm/root';
import { provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import {
  ASM_CUSTOMER_360_CORE_FEATURE,
  ASM_CUSTOMER_360_FEATURE,
} from './feature-name';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SiteContextInterceptor } from './interceptors/site-context.interceptor';

@NgModule({
  imports: [PageComponentModule],
  providers: [
    provideDefaultConfig({
      featureModules: {
        [ASM_CUSTOMER_360_FEATURE]: {
          dependencies: [ASM_FEATURE],
        },
        [ASM_CUSTOMER_360_CORE_FEATURE]: ASM_CUSTOMER_360_FEATURE,
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: SiteContextInterceptor,
      multi: true,
    },
  ],
})
export class AsmCustomer360RootModule {}
