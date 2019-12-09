import { InjectionToken } from '@angular/core';

import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import { OrderHistoryList } from '../../../model/order.model';
import { Converter } from '../../../util/converter.service';

export const ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, OrderHistoryList>
>('OrderHistoryNormalizer');

export const CONSIGNMENT_TRACKING_NORMALIZER = new InjectionToken<
  Converter<any, ConsignmentTracking>
>('ConsignmentTrackingNormalizer');
