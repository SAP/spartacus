/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/applepayjs" />
import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplePaySessionFactory {
  protected winRef = inject(WindowRef);
  protected isDeviceSupported = false;
  private applePaySession: typeof ApplePaySession;
  protected applePayApiVersion = 3;

  constructor() {
    // @ts-ignore
    this.applePaySession = this.createApplePaySession() as ApplePaySession;
    if (this.applePaySession) {
      this.isDeviceSupported = this.applePaySession.canMakePayments();
    }
  }

  private createApplePaySession(): ApplePaySession | undefined {
    const window = this.winRef.nativeWindow as any;
    if (!window['ApplePaySession']) {
      return undefined;
    }
    return window['ApplePaySession'] as ApplePaySession;
  }

  get statusSuccess(): number {
    return this.isDeviceSupported ? this.applePaySession.STATUS_SUCCESS : 1;
  }

  get statusFailure(): number {
    return this.isDeviceSupported ? this.applePaySession.STATUS_FAILURE : 1;
  }

  isApplePaySupported$(merchantIdentifier: string): Observable<boolean> {
    return this.isDeviceSupported &&
      this.supportsVersion(this.applePayApiVersion)
      ? this.canMakePaymentsWithActiveCard(merchantIdentifier)
      : of(false);
  }

  protected supportsVersion(version: number): boolean {
    try {
      return (
        this.isDeviceSupported && this.applePaySession.supportsVersion(version)
      );
    } catch (err) {
      return false;
    }
  }

  protected canMakePayments(): boolean {
    try {
      return this.isDeviceSupported && this.applePaySession.canMakePayments();
    } catch (err) {
      return false;
    }
  }

  protected canMakePaymentsWithActiveCard(
    merchantId: string
  ): Observable<boolean> {
    return this.isDeviceSupported
      ? from(this.applePaySession.canMakePaymentsWithActiveCard(merchantId))
      : of(false);
  }

  startApplePaySession(paymentRequest: any): any {
    return this.isDeviceSupported
      ? new this.applePaySession(this.applePayApiVersion, paymentRequest)
      : undefined;
  }
}
