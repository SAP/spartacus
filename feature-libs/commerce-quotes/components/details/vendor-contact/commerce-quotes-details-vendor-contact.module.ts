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
import { CardModule, IconModule, SpinnerModule } from '@spartacus/storefront';
import { CommerceQuotesDetailsVendorContactComponent } from './commerce-quotes-details-vendor-contact.component';

@NgModule({
  imports: [CommonModule, CardModule, I18nModule, IconModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteContactVendorComponent: {
          component: CommerceQuotesDetailsVendorContactComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CommerceQuotesDetailsVendorContactComponent],
  exports: [CommerceQuotesDetailsVendorContactComponent],
})
export class CommerceQuotesDetailsVendorContactModule {}
