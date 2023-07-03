/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  OrderAdapter,
  OrderHistoryAdapter,
  ReplenishmentOrderHistoryAdapter,
  ScheduledReplenishmentOrderAdapter,
} from '@spartacus/order/core';
import {
  ORDER_NORMALIZER,
  ORDER_RETURN_REQUEST_NORMALIZER,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '@spartacus/order/root';
import { OccOrderNormalizer } from './adapters/converters/occ-order-normalizer';
import { OccReplenishmentOrderNormalizer } from './adapters/converters/occ-replenishment-order-normalizer';
import { OccReturnRequestNormalizer } from './adapters/converters/occ-return-request-normalizer';
import { OccScheduledReplenishmentOrderFormSerializer } from './adapters/converters/occ-scheduled-replenishment-order-form-serializer';
import { OccOrderHistoryAdapter } from './adapters/occ-order-history.adapter';
import { OccOrderAdapter } from './adapters/occ-order.adapter';
import { OccReplenishmentOrderHistoryAdapter } from './adapters/occ-replenishment-order-history.adapter';
import { OccScheduledReplenishmentOrderAdapter } from './adapters/occ-scheduled-replenishment-order.adapter';
import { defaultOccOrderConfig } from './config/default-occ-order-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOrderConfig),
    { provide: OrderHistoryAdapter, useClass: OccOrderHistoryAdapter },
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
  ],
})
export class OrderOccModule {}
