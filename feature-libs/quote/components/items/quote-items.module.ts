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
import { QuoteItemsComponent } from './quote-items.component';

//https://jira.tools.sap/browse/CXSPA-4039

//CartBaseComponentsModule import in order to ensure that the cart outlet implementations are
//loaded once this component is displayed. Still after one interaction, outlet displays twice

//Side note: importing CartBaseModule will lead to a duplicate rendering of the cart item list outlet
@NgModule({
  imports: [CommonModule, OutletModule, IconModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteCartComponent: {
          component: QuoteItemsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteItemsComponent],
  exports: [QuoteItemsComponent],
})
export class QuoteItemsModule {}
