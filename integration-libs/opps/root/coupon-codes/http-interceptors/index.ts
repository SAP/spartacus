/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OccOppsCouponCodesInterceptor } from './occ-opps-coupon-codes.interceptor';

export const oppsCouponCodesInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: OccOppsCouponCodesInterceptor,
    multi: true,
  },
];

export * from './occ-opps-coupon-codes.interceptor';
