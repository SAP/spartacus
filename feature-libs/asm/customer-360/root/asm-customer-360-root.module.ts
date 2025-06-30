/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import {
  ASM_CUSTOMER_360_CORE_FEATURE,
  ASM_CUSTOMER_360_FEATURE,
} from './feature-name';
import { SiteContextInterceptor } from './interceptors/site-context.interceptor';

@NgModule({
  imports: [PageComponentModule],
  providers: [
    provideDefaultConfig({
      featureModules: {
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
