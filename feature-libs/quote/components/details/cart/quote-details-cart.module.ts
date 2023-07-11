/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { IconModule, OutletModule } from '@spartacus/storefront';
import { QuoteDetailsCartComponent } from './quote-details-cart.component';
import { QuoteDetailsCartSummaryComponent } from './summary/quote-details-cart-summary.component';
import { CartBaseComponentsModule } from '@spartacus/cart/base/components';

//CartBaseComponentsModule in order to ensure that the cart outlet implementations are
//loaded once this component is displayed

//Side note: importing CartBaseModule will lead to a duplicate rendering of the cart item list outlet
@NgModule({
  imports: [CommonModule, OutletModule, IconModule, I18nModule, CartBaseComponentsModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteCartComponent: {
          component: QuoteDetailsCartComponent,
          guards: [AuthGuard],
        },
        CommerceQuotesCartSummaryComponent: {
          component: QuoteDetailsCartSummaryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteDetailsCartComponent, QuoteDetailsCartSummaryComponent],
  exports: [QuoteDetailsCartComponent, QuoteDetailsCartSummaryComponent],
})
export class QuoteDetailsCartModule {}
