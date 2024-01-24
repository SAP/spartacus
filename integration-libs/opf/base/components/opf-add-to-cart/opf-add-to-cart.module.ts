/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';

import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import { OpfQuickBuyModule } from '../opf-quick-buy';
import { OpfAddToCartComponent } from './opf-add-to-cart.component';

@NgModule({
  imports: [AddToCartModule, OpfQuickBuyModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfAddToCartComponent: {
          component: OpfAddToCartComponent,
          data: {
            inventoryDisplay: false,
          },
        },
      },
    }),
  ],
  declarations: [OpfAddToCartComponent],
  exports: [OpfAddToCartComponent],
})
export class OpfAddToCartModule {}
