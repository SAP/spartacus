/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfQuickBuyAdapter } from '@spartacus/opf/quick-buy/core';
import { OpfApiQuickBuyAdapter } from './adapters/opf-api-quick-buy.adapter';
import { defaultOpfApiQuickBuyConfig } from './config/default-opf-api-quick-buy-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOpfApiQuickBuyConfig),
    {
      provide: OpfQuickBuyAdapter,
      useClass: OpfApiQuickBuyAdapter,
    },
  ],
})
export class OpfApiQuickBuyModule {}
