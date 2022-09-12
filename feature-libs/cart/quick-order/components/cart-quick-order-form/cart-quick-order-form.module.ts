/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@commerce-storefront-toolset/core';
import { FormErrorsModule } from '@commerce-storefront-toolset/storefront';
import { CartQuickOrderFormComponent } from './cart-quick-order-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CartQuickOrderFormComponent: {
          component: CartQuickOrderFormComponent,
        },
      },
    }),
  ],
  declarations: [CartQuickOrderFormComponent],
  exports: [CartQuickOrderFormComponent],
})
export class CartQuickOrderFormModule {}
