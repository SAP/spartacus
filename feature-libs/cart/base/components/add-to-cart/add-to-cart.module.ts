/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import { AddToCartComponent } from './add-to-cart.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, ItemCounterModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductAddToCartComponent: {
          component: AddToCartComponent,
          data: {
            inventoryDisplay: false,
          },
        },
      },
    }),
  ],
  declarations: [AddToCartComponent],
  exports: [AddToCartComponent],
})
export class AddToCartModule {}
