/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MockResponseInterceptor } from './interceptor/mock-response.interceptor';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccSubscriptionBillingConfig } from './occ-config/default-occ-subscription-billing-config';
import { SubscriptionProductModule } from './product';

@NgModule({
  imports: [SubscriptionProductModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockResponseInterceptor,
      multi: true,
    },
    provideDefaultConfig(defaultOccSubscriptionBillingConfig),
  ],
})
export class SubscriptionBillingRootModule {}
