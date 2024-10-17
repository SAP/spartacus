/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfQuickBuyComponentsModule } from '@spartacus/opf/quick-buy/components';
import { OpfQuickBuyCoreModule } from '@spartacus/opf/quick-buy/core';
import { OpfApiQuickBuyModule } from '@spartacus/opf/quick-buy/opf-api';

@NgModule({
  imports: [
    OpfQuickBuyComponentsModule,
    OpfQuickBuyCoreModule,
    OpfApiQuickBuyModule,
  ],
})
export class OpfQuickBuyModule {}
