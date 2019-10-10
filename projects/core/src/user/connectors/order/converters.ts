import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { OrderHistoryList } from '../../../model/order.model';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';

export const ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, OrderHistoryList>
>('OrderHistoryNormalizer');

export const CONSIGNMENT_TRACKING_NORMALIZER = new InjectionToken<
  Converter<any, ConsignmentTracking>
>('ConsignmentTrackingNormalizer');
