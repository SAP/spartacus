/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfQuickBuyComponentsModule } from '@spartacus/opf/quick-buy/components';
import { OpfQuickBuyCoreModule } from '@spartacus/opf/quick-buy/core';
import { OpfQuickBuyOccModule } from '@spartacus/opf/quick-buy/occ';
import { OpfApiQuickBuyModule } from '@spartacus/opf/quick-buy/opf-api';

@NgModule({
  imports: [
    OpfQuickBuyComponentsModule,
    OpfQuickBuyCoreModule,
    OpfApiQuickBuyModule,
    OpfQuickBuyOccModule,
  ],
})
export class OpfQuickBuyModule {}
