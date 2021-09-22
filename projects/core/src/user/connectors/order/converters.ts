import { InjectionToken } from '@angular/core';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import {
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
} from '../../../model/order.model';
import { Converter } from '../../../util/converter.service';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, OrderHistoryList>
>('OrderHistoryNormalizer');

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CONSIGNMENT_TRACKING_NORMALIZER = new InjectionToken<
  Converter<any, ConsignmentTracking>
>('ConsignmentTrackingNormalizer');

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const ORDER_RETURN_REQUEST_NORMALIZER = new InjectionToken<
  Converter<any, ReturnRequest>
>('OrderReturnRequestNormalizer');

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const ORDER_RETURN_REQUEST_INPUT_SERIALIZER = new InjectionToken<
  Converter<ReturnRequestEntryInputList, any>
>('OrderReturnRequestInputSerializer');

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const ORDER_RETURNS_NORMALIZER = new InjectionToken<
  Converter<any, ReturnRequestList>
>('OrderReturnsNormalizer');
