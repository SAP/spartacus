/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { OppsConfig } from '../config';

@Injectable({ providedIn: 'root' })
export class OppsCouponCodesService {
  protected winRef = inject(WindowRef);
  protected config = inject(OppsConfig);
  protected localStorageKey =
    this.config.opps?.couponcodes?.localStorageKey ?? '';

  saveUrlCouponCodes(): void {
    const urlParam = this.config.opps?.couponcodes?.urlParameter ?? '';
    const url = this.winRef.location.href ?? '';
    const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
    const oppsCoupon = queryParams.get(urlParam);
    if (oppsCoupon) {
      this.setCouponCodes(oppsCoupon);
    }
  }
  setCouponCodes(couponCodes: string): void {
    if (this.localStorageKey && couponCodes) {
      this.winRef.localStorage?.setItem(this.localStorageKey, couponCodes);
    }
  }
  getCouponCodes(): string | undefined | null {
    if (this.localStorageKey) {
      return this.winRef.localStorage?.getItem(this.localStorageKey);
    }
  }
}
