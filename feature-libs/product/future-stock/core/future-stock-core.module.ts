/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { FutureStockConnector } from './connectors/future-stock.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [...facadeProviders, FutureStockConnector],
})
export class FutureStockCoreModule {
  static forRoot(): ModuleWithProviders<FutureStockCoreModule> {
    return {
      ngModule: FutureStockCoreModule,
    };
  }
}
