/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';

import { CartProceedToCheckoutModule } from '@spartacus/cart/base/components';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OpfQuickBuyModule } from '../opf-quick-buy';
import { OpfCartProceedToCheckoutComponent } from './opf-cart-proceed-to-checkout.component';

@NgModule({
  imports: [CartProceedToCheckoutModule, OpfQuickBuyModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfCartProceedToCheckoutComponent: {
          component: OpfCartProceedToCheckoutComponent,
        },
      },
    }),
  ],
  declarations: [OpfCartProceedToCheckoutComponent],
  exports: [OpfCartProceedToCheckoutComponent],
})
export class OpfCartProceedToCheckoutModule {}
