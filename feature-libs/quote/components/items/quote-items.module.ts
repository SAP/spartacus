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

@NgModule({
  imports: [CommonModule, OutletModule, IconModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteItemsComponent: {
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
