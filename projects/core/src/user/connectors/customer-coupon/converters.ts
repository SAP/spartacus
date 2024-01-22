/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { Converter } from '../../../util/converter.service';

export const CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER = new InjectionToken<
  Converter<any, CustomerCouponSearchResult>
>('CustomerCouponSearchResultNormalizer');
