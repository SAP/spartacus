/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { ApplePaySessionWrapperService } from './apple-pay-session-wrapper.service';

class MockApplePaySession
  extends EventTarget
  implements Partial<ApplePaySession>
{
  static readonly STATUS_SUCCESS: number = 2;

  static readonly STATUS_FAILURE: number = 3;

  oncancel: (event: ApplePayJS.Event) => void;

  onpaymentauthorized: (
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent
  ) => void;

  onpaymentmethodselected: (
    event: ApplePayJS.ApplePayPaymentMethodSelectedEvent
  ) => void;

  onshippingcontactselected: (
    event: ApplePayJS.ApplePayShippingContactSelectedEvent
  ) => void;

  onshippingmethodselected: (
    event: ApplePayJS.ApplePayShippingMethodSelectedEvent
  ) => void;

  onvalidatemerchant: (event: ApplePayJS.ApplePayValidateMerchantEvent) => void;

  _stubConstructorArguments: Array<any>;

  constructor(
    version: number,
    paymentRequest: ApplePayJS.ApplePayPaymentRequest
  ) {
    super();
    this._stubConstructorArguments = [version, paymentRequest];
  }

  static canMakePayments(): boolean {
    return true;
  }

  static canMakePaymentsWithActiveCard(
    _merchantIdentifier: string
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  static openPaymentSetup(_merchantIdentifier: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  static supportsVersion(_dialogCloseversion: number): boolean {
    return true;
  }

  abort(): void {}

  begin(): void {}

  completeMerchantValidation(_eventmerchantSession: any): void {}

  completePayment(
    _result: number | ApplePayJS.ApplePayPaymentAuthorizationResult
  ): void {}

  completePaymentMethodSelection(
    _newTotal: ApplePayJS.ApplePayLineItem,
    _newLineItems: Array<ApplePayJS.ApplePayLineItem>
  ): void;
  completePaymentMethodSelection(
    _update: ApplePayJS.ApplePayPaymentMethodUpdate
  ): void;
  completePaymentMethodSelection(_newTotal: any, _newLineItems?: any): void {}

  completeShippingContactSelection(
    _status: number,
    _newShippingMethods: Array<ApplePayJS.ApplePayShippingMethod>,
    _newTotal: ApplePayJS.ApplePayLineItem,
    _newLineItems: Array<ApplePayJS.ApplePayLineItem>
  ): void;
  completeShippingContactSelection(
    _update: ApplePayJS.ApplePayShippingContactUpdate
  ): void;
  completeShippingContactSelection(
    _status: any,
    _newShippingMethods?: any,
    _newTotal?: any,
    _newLineItems?: any
  ): void {}

  completeShippingMethodSelection(
    status: number,
    newTotal: ApplePayJS.ApplePayLineItem,
    newLineItems: Array<ApplePayJS.ApplePayLineItem>
  ): void;
  completeShippingMethodSelection(
    update: ApplePayJS.ApplePayShippingMethodUpdate
  ): void;
  completeShippingMethodSelection(
    _status: any,
    _newTotal?: any,
    _openElementnewLineItems?: any
  ): void {}
}
@Injectable()
class ApplePaySessionFactoryExt extends ApplePaySessionWrapperService {
  setIsDeviceSupported(newValue: boolean) {
    this.isDeviceSupported = newValue;
  }
}

describe('ApplePaySessionFactory', () => {
  let applePaySessionWrapperService: ApplePaySessionFactoryExt;
  let windowRef: WindowRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowRef,
          useValue: { nativeWindow: { ApplePaySession: MockApplePaySession } },
        },
        ApplePaySessionFactoryExt,
      ],
    });

    applePaySessionWrapperService = TestBed.inject(ApplePaySessionFactoryExt);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(applePaySessionWrapperService).toBeTruthy();
  });

  it('should create ApplePaySession if available', () => {
    const applePaySession =
      applePaySessionWrapperService['getApplePaySession']();
    expect(applePaySession).toBeDefined();
  });

  it('should not create ApplePaySession if not available', () => {
    (windowRef as any).nativeWindow['ApplePaySession'] = null;
    const applePaySession =
      applePaySessionWrapperService['getApplePaySession']();
    expect(applePaySession).not.toBeDefined();
  });

  it('should return STATUS_SUCCESS for statusSuccess when device is supported', () => {
    applePaySessionWrapperService.setIsDeviceSupported(true);
    expect(applePaySessionWrapperService.statusSuccess).toEqual(
      MockApplePaySession.STATUS_SUCCESS
    );
  });

  it('should return 1 for statusSuccess when device is not supported', () => {
    applePaySessionWrapperService.setIsDeviceSupported(false);
    expect(applePaySessionWrapperService.statusSuccess).toEqual(1);
  });

  it('should return STATUS_FAILURE for statusFailure when device is supported', () => {
    applePaySessionWrapperService.setIsDeviceSupported(true);
    expect(applePaySessionWrapperService.statusFailure).toEqual(
      MockApplePaySession.STATUS_FAILURE
    );
  });

  it('should return 1 for statusFailure when device is not supported', () => {
    applePaySessionWrapperService.setIsDeviceSupported(false);
    expect(applePaySessionWrapperService.statusFailure).toEqual(1);
  });

  it('should return true for isApplePaySupported when device is supported', (done: DoneFn) => {
    applePaySessionWrapperService.setIsDeviceSupported(true);
    const merchantId = 'merchantId';
    applePaySessionWrapperService
      .isApplePaySupported(merchantId)
      .subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
  });
  it('should return false for isApplePaySupported when device is not supported', (done: DoneFn) => {
    applePaySessionWrapperService.setIsDeviceSupported(false);
    const merchantId = 'merchantId';
    applePaySessionWrapperService
      .isApplePaySupported(merchantId)
      .subscribe((result) => {
        expect(result).toEqual(false);
        done();
      });
  });

  it('should return ApplePaySession when device is supported', () => {
    applePaySessionWrapperService.setIsDeviceSupported(true);
    const startSession = applePaySessionWrapperService.createSession(
      {} as ApplePayJS.ApplePayPaymentRequest
    );
    expect(startSession).not.toEqual(undefined);
  });

  it('should not return ApplePaySession when device is not supported', () => {
    applePaySessionWrapperService.setIsDeviceSupported(false);
    const startSession = applePaySessionWrapperService.createSession(
      {} as ApplePayJS.ApplePayPaymentRequest
    );
    expect(startSession).toEqual(undefined);
  });
});
