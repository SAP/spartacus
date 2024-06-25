/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutAuthGuard } from '@spartacus/checkout/base/components';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CheckoutServiceDetailsComponent } from './checkout-service-details.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutServiceDetails: {
          component: CheckoutServiceDetailsComponent,
          guards: [CheckoutAuthGuard],
        },
      },
    }),
  ],
})
export class CheckoutServiceDetailsModule {}
