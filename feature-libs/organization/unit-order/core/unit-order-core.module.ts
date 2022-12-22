/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { UnitOrderDetailsOrderEntriesContext } from '../components/page-context/unit-order-details-order-entries.context';
import { UnitOrderFacade, UnitOrderDetailsOrderEntriesContextToken } from '@spartacus/organization/unit-order/root';
import { UnitOrderConnector } from './connectors';
import { UnitOrderService } from './services';
import { UnitOrderStoreModule } from './store/unit-order-store.module';

@NgModule({
  imports: [UnitOrderStoreModule],
})
export class UnitOrderCoreModule {
  static forRoot(): ModuleWithProviders<UnitOrderCoreModule> {
    return {
      ngModule: UnitOrderCoreModule,
      providers: [
        {
          provide: UnitOrderFacade,
          useExisting: UnitOrderService,
        },
        UnitOrderConnector,
        {
          provide: UnitOrderDetailsOrderEntriesContextToken,
          useExisting: UnitOrderDetailsOrderEntriesContext,
        },
      ],
    };
  }
}
