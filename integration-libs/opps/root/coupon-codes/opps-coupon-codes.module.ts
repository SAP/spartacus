/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject } from '@angular/core';
import { LOCATION_INITIALIZED_MULTI } from '@spartacus/core';
import { oppsCouponCodesInterceptors } from './http-interceptors';
import { OppsCouponCodesService } from './opps-coupon-codes.service';

export function saveCouponCodesFactory(): () => void {
  const service = inject(OppsCouponCodesService);
  return () => {
    service.saveUrlCouponCodes();
  };
}

@NgModule({
  providers: [
    ...oppsCouponCodesInterceptors,
    {
      provide: LOCATION_INITIALIZED_MULTI,
      useFactory: saveCouponCodesFactory,
      multi: true,
    },
  ],
})
export class OppsCouponCodesModule {}
