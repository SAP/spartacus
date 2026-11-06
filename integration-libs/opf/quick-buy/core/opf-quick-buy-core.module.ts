/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfQuickBuyCartConnector, OpfQuickBuyConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [],
  providers: [
    ...facadeProviders,
    OpfQuickBuyConnector,
    OpfQuickBuyCartConnector,
  ],
})
export class OpfQuickBuyCoreModule {}
