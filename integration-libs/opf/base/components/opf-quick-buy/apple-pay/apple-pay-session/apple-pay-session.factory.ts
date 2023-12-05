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
  protected isDeviceSupported = false;
  protected applePaySession: typeof ApplePaySession;

  constructor() {
    try {
      // @ts-ignore
      this.applePaySession = this.createApplePaySession() as ApplePaySession;
      if (this.applePaySession) {
        this.isDeviceSupported = this.applePaySession.canMakePayments();
      }
    } catch (error) {
      throw error;
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
    return this.isDeviceSupported ? this.applePaySession.STATUS_SUCCESS : 1;
  }

  get STATUS_FAILURE(): number {
    return this.isDeviceSupported ? this.applePaySession.STATUS_FAILURE : 1;
  }

  supportsVersion(version: number): boolean {
    try {
      return (
        this.isDeviceSupported && this.applePaySession.supportsVersion(version)
      );
    } catch (err) {
      return false;
    }
  }

  canMakePayments(): boolean {
    try {
      return this.isDeviceSupported && this.applePaySession.canMakePayments();
    } catch (err) {
      return false;
    }
  }

  canMakePaymentsWithActiveCard(merchantId: string): Observable<boolean> {
    return this.isDeviceSupported
      ? fromPromise(
          this.applePaySession.canMakePaymentsWithActiveCard(merchantId)
        )
      : of(false);
  }

  startApplePaySession(
    version: number,
    paymentRequest: ApplePayJS.ApplePayPaymentRequest
  ): ApplePaySession | undefined {
    return this.isDeviceSupported
      ? new this.applePaySession(version, paymentRequest)
      : undefined;
  }
}
