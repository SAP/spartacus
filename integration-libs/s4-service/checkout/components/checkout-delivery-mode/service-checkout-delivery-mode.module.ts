/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  CmsConfig,
  I18nModule,
  FeaturesConfigModule,
} from '@spartacus/core';
import { ServiceCheckoutDeliveryModeComponent } from './service-checkout-delivery-mode.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SpinnerModule,
  OutletModule,
  PageComponentModule,
} from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    SpinnerModule,
    OutletModule,
    PageComponentModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutDeliveryMode: {
          component: ServiceCheckoutDeliveryModeComponent,
        },
      },
    }),
  ],
  declarations: [ServiceCheckoutDeliveryModeComponent],
  exports: [ServiceCheckoutDeliveryModeComponent],
})
export class ServiceCheckoutDeliveryModeModule {}
