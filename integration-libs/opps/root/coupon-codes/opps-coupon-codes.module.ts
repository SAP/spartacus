/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject } from '@angular/core';
import { provideLocationInitializerFactory } from '@spartacus/core';
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
    provideLocationInitializerFactory(() => {
      // convert incorrect type `() => void` to `() => Promise<void>`
      const locationInitializer = saveCouponCodesFactory();
      return () => Promise.resolve(locationInitializer());
    }),
  ],
})
export class OppsCouponCodesModule {}
