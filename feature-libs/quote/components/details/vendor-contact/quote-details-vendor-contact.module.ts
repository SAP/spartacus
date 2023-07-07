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
import { ChatMessagingModule, IconModule } from '@spartacus/storefront';
import { QuoteDetailsVendorContactComponent } from './quote-details-vendor-contact.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, ChatMessagingModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteContactVendorComponent: {
          component: QuoteDetailsVendorContactComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteDetailsVendorContactComponent],
  exports: [QuoteDetailsVendorContactComponent],
})
export class QuoteDetailsVendorContactModule {}
