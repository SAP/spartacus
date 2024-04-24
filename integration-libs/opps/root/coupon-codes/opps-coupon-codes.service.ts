/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { OppsConfig } from '../public_api';

@Injectable()
export class OppsCouponCodesService {
  protected winRef = inject(WindowRef);
  protected config = inject(OppsConfig);
  protected LOCAL_STORAGE_KEY =
    this.config.opps?.couponcodes?.localStorageKey ?? '';
  saveUrlCouponCodes() {
    const URL_PARAM = this.config.opps?.couponcodes?.urlParameter ?? '';
    const url = this.winRef.location.href ?? '';
    const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
    let oppsCoupon = queryParams.get(URL_PARAM);
    if (oppsCoupon) {
      this.setCouponCodes(oppsCoupon);
    }
  }
  setCouponCodes(couponCodes: string) {
    this.winRef.localStorage?.setItem(this.LOCAL_STORAGE_KEY, couponCodes);
  }
  getCouponCodes(): string | undefined | null {
    return this.winRef.localStorage?.getItem(this.LOCAL_STORAGE_KEY);
  }
  clearCouponCodes() {
    return this.winRef.localStorage?.removeItem(this.LOCAL_STORAGE_KEY);
  }
}
