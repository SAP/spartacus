/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  IconModule,
  ItemCounterModule,
  OutletModule,
} from '@spartacus/storefront';
import { OpfQuickBuyModule } from '../opf-quick-buy';
import { OpfAddToCartComponent } from './opf-add-to-cart.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    IconModule,
    ItemCounterModule,
    OutletModule,
    OpfQuickBuyModule,
  ],
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
