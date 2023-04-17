/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '@spartacus/storefront';
import { CommerceQuotesDetailsCartComponent } from './commerce-quotes-details-cart.component';

@NgModule({
  imports: [CommonModule, OutletModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesCartComponent: {
          component: CommerceQuotesDetailsCartComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CommerceQuotesDetailsCartComponent],
  exports: [CommerceQuotesDetailsCartComponent],
})
export class CommerceQuotesDetailsCartModule {}
