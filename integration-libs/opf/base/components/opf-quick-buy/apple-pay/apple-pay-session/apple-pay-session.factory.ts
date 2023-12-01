/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable()
export class ApplePaySessionFactory {
  protected winRef = inject(WindowRef);
  canMake = false;

  applePaySession: typeof ApplePaySession;

  constructor() {
    try {
      // @ts-ignore
      this.applePaySession = this.createApplePaySession();
      if (this.applePaySession) {
        this.canMake = this.applePaySession.canMakePayments();
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  createApplePaySession(): ApplePaySession | undefined {
    const window = this.winRef.nativeWindow as any;
    if (!window['ApplePaySession']) {
      return undefined;
    }
    return window['ApplePaySession'] as ApplePaySession;
  }

  get STATUS_SUCCESS(): number {
    return this.canMake ? this.applePaySession.STATUS_SUCCESS : 1;
  }

  get STATUS_FAILURE(): number {
    return this.canMake ? this.applePaySession.STATUS_FAILURE : 1;
  }

  supportsVersion(version: number): boolean {
    try {
      return this.canMake && this.applePaySession.supportsVersion(version);
    } catch (err) {
      return false;
    }
  }

  canMakePayments(): boolean {
    try {
      return this.canMake && this.applePaySession.canMakePayments();
    } catch (err) {
      return false;
    }
  }

  canMakePaymentsWithActiveCard(merchantId: string): Observable<boolean> {
    if (this.canMake) {
      return fromPromise(
        this.applePaySession.canMakePaymentsWithActiveCard(merchantId)
      );
    } else {
      return of(false);
    }
  }

  make(
    version: number,
    paymentRequest: ApplePayJS.ApplePayPaymentRequest
  ): ApplePaySession | undefined {
    return this.canMake
      ? new this.applePaySession(version, paymentRequest)
      : undefined;
  }
}
