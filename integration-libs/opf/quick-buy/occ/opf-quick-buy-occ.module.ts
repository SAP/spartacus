/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfQuickBuyCartAdapter } from '@spartacus/opf/quick-buy/core';
import { OccOpfQuickBuyCartAdapter } from './adapters';
import { defaultOccOpfQuickBuyCartConfig } from './config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccOpfQuickBuyCartConfig),
    {
      provide: OpfQuickBuyCartAdapter,
      useClass: OccOpfQuickBuyCartAdapter,
    },
  ],
})
export class OpfQuickBuyOccModule {}
