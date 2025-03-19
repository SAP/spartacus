/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OpfApplePayModule } from './apple-pay';
import { OpfGooglePayModule } from './google-pay/google-pay.module';
import { OpfQuickBuyButtonsComponent } from './opf-quick-buy-buttons.component';
import { OpfQuickBuyButtonsService } from './opf-quick-buy-buttons.service';

@NgModule({
  declarations: [OpfQuickBuyButtonsComponent],
  providers: [
    OpfQuickBuyButtonsService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfQuickBuyButtonsComponent: {
          component: OpfQuickBuyButtonsComponent,
        },
      },
    }),
  ],
  exports: [OpfQuickBuyButtonsComponent],
  imports: [CommonModule, OpfApplePayModule, OpfGooglePayModule],
})
export class OpfQuickBuyButtonsModule {}
