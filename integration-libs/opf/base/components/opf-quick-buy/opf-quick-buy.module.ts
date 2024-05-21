/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OpfApplePayModule } from './apple-pay/apple-pay.module';
import { OpfGooglePayModule } from './google-pay/google-pay.module';
import { OpfQuickBuyComponent } from './opf-quick-buy.component';

@NgModule({
  declarations: [OpfQuickBuyComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfQuickBuyComponent: {
          component: OpfQuickBuyComponent,
        },
      },
    }),
  ],
  exports: [OpfQuickBuyComponent],
  imports: [CommonModule, OpfApplePayModule, OpfGooglePayModule],
})
export class OpfQuickBuyModule {}
