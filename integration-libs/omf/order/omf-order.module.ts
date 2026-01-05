/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OrderHistoryAdapter } from '@spartacus/order/core';
import { OccOmfOrderHistoryAdapter } from './occ-omf-order-history.adapter';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { OmfOrderHistoryService } from './omf-order-history.service';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOmfConfig } from './config/default-omf-config';

@NgModule({
  providers: [
    OmfOrderHistoryService,
    provideDefaultConfig(defaultOmfConfig),
    { provide: OrderHistoryAdapter, useClass: OccOmfOrderHistoryAdapter },
    {
      provide: OrderHistoryFacade,
      useClass: OmfOrderHistoryService,
    },
  ],
})
export class OmfOrderModule {}
