import { InjectionToken } from '@angular/core';
import {
  Converter,
  OrderHistoryList,
  ReplenishmentOrderList,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
} from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';

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
