/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { CheckoutOPFComponent } from './checkout-opf.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOPF: {
          component: CheckoutOPFComponent,
        },
      },
    }),
  ],
  declarations: [CheckoutOPFComponent],
  exports: [CheckoutOPFComponent],
})
export class CheckoutOPFModule {}
