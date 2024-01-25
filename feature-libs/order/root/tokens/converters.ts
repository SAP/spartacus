/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';
import { ConsignmentTracking } from '../model/consignment-tracking.model';
import {
  Order,
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
} from '../model/order.model';
import {
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '../model/replenishment-order.model';
import { ScheduleReplenishmentForm } from '../model/scheduled-replenishment.model';

export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);

export const REPLENISHMENT_ORDER_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrder>
>('ReplenishmentOrderNormalizer');

export const REORDER_ORDER_NORMALIZER = new InjectionToken<
  Converter<any, CartModificationList>
>('ReorderOrderNormalizer');

export const ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, OrderHistoryList>
>('OrderHistoryNormalizer');

export const CONSIGNMENT_TRACKING_NORMALIZER = new InjectionToken<
  Converter<any, ConsignmentTracking>
>('ConsignmentTrackingNormalizer');

export const ORDER_RETURN_REQUEST_NORMALIZER = new InjectionToken<
  Converter<any, ReturnRequest>
>('OrderReturnRequestNormalizer');

export const ORDER_RETURN_REQUEST_INPUT_SERIALIZER = new InjectionToken<
  Converter<ReturnRequestEntryInputList, any>
>('OrderReturnRequestInputSerializer');

export const ORDER_RETURNS_NORMALIZER = new InjectionToken<
  Converter<any, ReturnRequestList>
>('OrderReturnsNormalizer');

export const REPLENISHMENT_ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrderList>
>('ReplenishmentOrderHistoryNormalizer');

export const REPLENISHMENT_ORDER_FORM_SERIALIZER = new InjectionToken<
  Converter<ScheduleReplenishmentForm, any>
>('ReplenishmentOrderFormSerializer');
