/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  FormErrorsModule,
  FormRequiredAsteriksModule,
  FormRequiredLegendModule,
} from '@spartacus/storefront';
import { CartQuickOrderFormComponent } from './cart-quick-order-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    FeaturesConfigModule,
    FormRequiredAsteriksModule,
    FormRequiredLegendModule,
  ],
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
