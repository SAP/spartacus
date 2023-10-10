/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, NgModule } from '@angular/core';
import {
  ConverterService,
  OccEndpointsService,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  OrderAdapter,
  OrderHistoryAdapter,
  ReorderOrderAdapter,
  ReplenishmentOrderHistoryAdapter,
  ScheduledReplenishmentOrderAdapter,
} from '@spartacus/order/core';
import {
  MYACCOUNT_ORDER_ENHANCED_UI,
  ORDER_NORMALIZER,
  ORDER_RETURN_REQUEST_NORMALIZER,
  REORDER_ORDER_NORMALIZER,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '@spartacus/order/root';
import {
  OccOrderHistoryAdapter,
  OccOrderHistoryExtendedAdapter,
} from './adapters';
import { OccOrderNormalizer } from './adapters/converters/occ-order-normalizer';
import { OccReorderOrderNormalizer } from './adapters/converters/occ-reorder-order-normalizer';
import { OccReplenishmentOrderNormalizer } from './adapters/converters/occ-replenishment-order-normalizer';
import { OccReturnRequestNormalizer } from './adapters/converters/occ-return-request-normalizer';
import { OccScheduledReplenishmentOrderFormSerializer } from './adapters/converters/occ-scheduled-replenishment-order-form-serializer';
import { OccOrderAdapter } from './adapters/occ-order.adapter';
import { OccReorderOrderAdapter } from './adapters/occ-reorder-order.adapter';
import { OccReplenishmentOrderHistoryAdapter } from './adapters/occ-replenishment-order-history.adapter';
import { OccScheduledReplenishmentOrderAdapter } from './adapters/occ-scheduled-replenishment-order.adapter';
import { defaultOccOrderConfig } from './config/default-occ-order-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOrderConfig),
    {
      provide: ReplenishmentOrderHistoryAdapter,
      useClass: OccReplenishmentOrderHistoryAdapter,
    },
    {
      provide: OrderAdapter,
      useClass: OccOrderAdapter,
    },
    {
      provide: ScheduledReplenishmentOrderAdapter,
      useClass: OccScheduledReplenishmentOrderAdapter,
    },
    {
      provide: ReorderOrderAdapter,
      useClass: OccReorderOrderAdapter,
    },
    {
      provide: ORDER_RETURN_REQUEST_NORMALIZER,
      useExisting: OccReturnRequestNormalizer,
      multi: true,
    },
    {
      provide: ORDER_NORMALIZER,
      useExisting: OccOrderNormalizer,
      multi: true,
    },
    {
      provide: REPLENISHMENT_ORDER_NORMALIZER,
      useExisting: OccReplenishmentOrderNormalizer,
      multi: true,
    },
    {
      provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
      useExisting: OccScheduledReplenishmentOrderFormSerializer,
      multi: true,
    },
    {
      provide: REORDER_ORDER_NORMALIZER,
      useExisting: OccReorderOrderNormalizer,
      multi: true,
    },
    OccOrderHistoryExtendedAdapter,
    OccOrderHistoryAdapter,
    {
      provide: OrderHistoryAdapter,
      useFactory: () => {
        const enhancedUI = inject(MYACCOUNT_ORDER_ENHANCED_UI);
        return enhancedUI
          ? inject(OccOrderHistoryExtendedAdapter)
          : inject(OccOrderHistoryAdapter);
      },
      deps: [HttpClient, OccEndpointsService, ConverterService],
    },
  ],
})
export class OrderOccModule {}
