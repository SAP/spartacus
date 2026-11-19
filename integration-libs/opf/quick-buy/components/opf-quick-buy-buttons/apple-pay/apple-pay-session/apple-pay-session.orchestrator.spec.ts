/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ApplePaySessionConfig } from '@spartacus/opf/quick-buy/root';
import { Observable, of, throwError } from 'rxjs';
import { ApplePaySessionWrapperService } from './apple-pay-session-wrapper.service';
import { ApplePaySessionOrchestrator } from './apple-pay-session.orchestrator';

class MockEventTarget implements EventTarget {
  _stubEventListeners: Array<{ type: string; listener: Function }> = [];

  /** Method to call registered events of specified type with provided arguments */
  _stubMockEvent(type: string, ...args: Array<any>): void {
    this._stubEventListeners.forEach((listener) => {
      if (listener.type === type) {
        listener.listener(...args);
      }
    });
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    _options?: boolean | AddEventListenerOptions
  ): void {
    this._stubEventListeners.push({ type, listener: listener as Function });
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    _options?: boolean | EventListenerOptions
  ): void {
    const index = this._stubEventListeners.findIndex(
      (registeredListener) =>
        registeredListener.type === type &&
        registeredListener.listener === listener
    );

    if (index > -1) {
      this._stubEventListeners.splice(index, 1);
    }
  }

  dispatchEvent(_evt: Event): boolean {
    return true;
  }
}

class MockApplePaySession
  extends MockEventTarget
  implements Partial<ApplePaySession>
{
  static readonly STATUS_SUCCESS: number;

  static readonly STATUS_FAILURE: number;

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

  static supportsVersion(_version: number): boolean {
    return true;
  }

  abort(): void {}

  begin(): void {}

  completeMerchantValidation(_merchantSession: any): void {}

  completePayment(
    _result: number | ApplePayJS.ApplePayPaymentAuthorizationResult
  ): void {}

  completePaymentMethodSelection(
    newTotal: ApplePayJS.ApplePayLineItem,
    newLineItems: Array<ApplePayJS.ApplePayLineItem>
  ): void;
  completePaymentMethodSelection(
    update: ApplePayJS.ApplePayPaymentMethodUpdate
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
    _status: number,
    _newTotal: ApplePayJS.ApplePayLineItem,
    _newLineItems: Array<ApplePayJS.ApplePayLineItem>
  ): void;
  completeShippingMethodSelection(
    _update: ApplePayJS.ApplePayShippingMethodUpdate
  ): void;
  completeShippingMethodSelection(
    _status: any,
    _newTotal?: any,
    _newLineItems?: any
  ): void {}
}

interface ApplePaySessionConfigExt extends ApplePaySessionConfig {
  [key: string]: any;
}

describe('ApplePaySessionOrchestrator', () => {
  let factory: ApplePaySessionOrchestrator;
  let mockApplePaySessionFactory: any;
  let mockApplePaySession: MockApplePaySession;

  const mockRequest: ApplePayJS.ApplePayPaymentRequest = {
    countryCode: '',
    currencyCode: '',
    merchantCapabilities: [],
    supportedNetworks: [],
    total: {
      label: '',
      amount: '',
    },
  };
  const mockConfig: ApplePaySessionConfig = {
    request: mockRequest,
    onValidateMerchant: () => of({}),
    onPaymentMethodSelected: () =>
      of({} as ApplePayJS.ApplePayPaymentMethodUpdate),
    onShippingContactSelected: () =>
      of({} as ApplePayJS.ApplePayShippingContactUpdate),
    onShippingMethodSelected: () =>
      of({} as ApplePayJS.ApplePayShippingMethodUpdate),
    onPaymentAuthorized: () =>
      of({} as ApplePayJS.ApplePayPaymentAuthorizationResult),
  };

  beforeEach(() => {
    const MockApplePaySessionFactory = { createSession: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        ApplePaySessionOrchestrator,
        {
          provide: ApplePaySessionWrapperService,
          useValue: MockApplePaySessionFactory,
        },
      ],
    });

    factory = TestBed.inject(ApplePaySessionOrchestrator);
    mockApplePaySessionFactory = TestBed.inject(
      ApplePaySessionWrapperService
    ) as any;

    mockApplePaySession = new MockApplePaySession(
      1,
      {} as ApplePayJS.ApplePayPaymentRequest
    );
    vi.spyOn(mockApplePaySession, 'addEventListener');
  });

  it('should be created', () => {
    expect(factory).toBeTruthy();
  });

  it('should return an observable that creates an apple pay session', () => {
    const actual = factory.start({
      ...mockConfig,
    });

    mockApplePaySessionFactory.createSession.mockReturnValue(
      mockApplePaySession
    );
    expect(actual instanceof Observable).toBe(true);
    expect(mockApplePaySessionFactory.createSession).not.toHaveBeenCalled();

    actual.subscribe();

    expect(mockApplePaySessionFactory.createSession).toHaveBeenCalledTimes(1);
    expect(mockApplePaySessionFactory.createSession).toHaveBeenCalledWith(
      mockRequest
    );
  });

  it('should bind config event handlers to ApplePaySession', () => {
    mockApplePaySessionFactory.createSession.mockReturnValue(
      mockApplePaySession
    );
    factory.start(mockConfig).subscribe();

    expect(mockApplePaySession.addEventListener).toHaveBeenCalledTimes(6);
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'cancel',
      expect.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'paymentauthorized',
      expect.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'paymentmethodselected',
      expect.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'shippingcontactselected',
      expect.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'shippingmethodselected',
      expect.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'validatemerchant',
      expect.any(Function)
    );
  });

  it('should complete if the session is cancelled', () => {
    let complete = false;
    let actualEmit: any;
    let actualError: any;
    vi.spyOn(mockApplePaySession, 'abort').mockImplementation(() => {});

    mockApplePaySessionFactory.createSession.mockReturnValue(
      mockApplePaySession
    );
    factory.start(mockConfig).subscribe(
      (next) => (actualEmit = next),
      (error) => (actualError = error),
      () => (complete = true)
    );
    expect(complete).toBe(false);
    expect(actualError).toEqual(undefined);
    expect(actualEmit).toEqual(undefined);

    mockApplePaySession._stubMockEvent('cancel');

    expect(complete).toBe(false);
    expect(actualError).toEqual({ type: 'PAYMENT_CANCELLED' });
    expect(actualEmit).toEqual(undefined);
  });

  describe('callback behavior', () => {
    let actual: Observable<ApplePayJS.ApplePayPaymentAuthorizationResult>;
    let configuration: ApplePaySessionConfigExt;

    let paymentAuthorizedReturnValue: ApplePayJS.ApplePayPaymentAuthorizationResult;
    let validateMerchantReturnValue: Object;
    let shippingContactSelectedReturnValue: ApplePayJS.ApplePayShippingContactUpdate;
    let paymentMethodSelectedReturnValue: ApplePayJS.ApplePayPaymentMethodUpdate;
    let shippingMethodSelectedReturnValue: ApplePayJS.ApplePayShippingMethodUpdate;
    let actualEmit: any;
    let actualError: any;
    let actualComplete: boolean;
    beforeEach(() => {
      configuration = {
        request: mockRequest,
        onPaymentAuthorized: vi.fn(),
        onValidateMerchant: vi.fn(),
        onShippingContactSelected: vi.fn(),
        onPaymentMethodSelected: vi.fn(),
        onShippingMethodSelected: vi.fn(),
      };

      paymentAuthorizedReturnValue = { status: 0 };
      validateMerchantReturnValue = {};
      shippingContactSelectedReturnValue = {
        newTotal: { amount: '5.00', label: 'Shipping' },
      };
      paymentMethodSelectedReturnValue = {
        newTotal: { amount: '5.00', label: 'Payment' },
      };
      shippingMethodSelectedReturnValue = {
        newTotal: { amount: '5.00', label: 'Shipping' },
      };

      (configuration.onPaymentAuthorized as any).mockReturnValue(
        of(paymentAuthorizedReturnValue)
      );
      (configuration.onValidateMerchant as any).mockReturnValue(
        of(validateMerchantReturnValue)
      );
      (configuration.onShippingContactSelected as any).mockReturnValue(
        of(shippingContactSelectedReturnValue)
      );
      (configuration.onPaymentMethodSelected as any).mockReturnValue(
        of(paymentMethodSelectedReturnValue)
      );
      (configuration.onShippingMethodSelected as any).mockReturnValue(
        of(shippingMethodSelectedReturnValue)
      );
      mockApplePaySessionFactory.createSession.mockReturnValue(
        mockApplePaySession
      );
      actual = factory.start(configuration);
      actualEmit = undefined;
      actualError = undefined;
      actualComplete = false;
      actual.subscribe(
        (next) => (actualEmit = next),
        (error) => (actualError = error),
        () => (actualComplete = true)
      );

      vi.spyOn(
        mockApplePaySession,
        'completeMerchantValidation'
      ).mockImplementation(() => {});
      vi.spyOn(mockApplePaySession, 'completePayment').mockImplementation(
        () => {}
      );
      vi.spyOn(
        mockApplePaySession,
        'completePaymentMethodSelection'
      ).mockImplementation(() => {});
      vi.spyOn(
        mockApplePaySession,
        'completeShippingContactSelection'
      ).mockImplementation(() => {});
      vi.spyOn(
        mockApplePaySession,
        'completeShippingMethodSelection'
      ).mockImplementation(() => {});
    });

    it('should use validateMerchant callback to fill validateMerchant', () => {
      const event = <ApplePayJS.ApplePayValidateMerchantEvent>{
        validationURL: '',
      };

      mockApplePaySession._stubMockEvent('validatemerchant', event);
      expect(actualComplete).toBe(false);
      expect(configuration.onValidateMerchant).toHaveBeenCalledWith(event);
      expect(
        mockApplePaySession.completeMerchantValidation
      ).toHaveBeenCalledWith(validateMerchantReturnValue);
    });

    it('should use shippingContactSelected callback to fill shippingContactSelected', () => {
      const event = <ApplePayJS.ApplePayShippingContactSelectedEvent>{
        shippingContact: {},
      };

      mockApplePaySession._stubMockEvent('shippingcontactselected', event);

      expect(configuration.onShippingContactSelected).toHaveBeenCalledWith(
        event
      );
      expect(
        mockApplePaySession.completeShippingContactSelection
      ).toHaveBeenCalledWith(shippingContactSelectedReturnValue);
    });

    it('should use shippingMethodSelected callback to fill shippingMethodSelected', () => {
      const event = <ApplePayJS.ApplePayShippingMethodSelectedEvent>{
        shippingMethod: {},
      };

      mockApplePaySession._stubMockEvent('shippingmethodselected', event);

      expect(configuration.onShippingMethodSelected).toHaveBeenCalledWith(
        event
      );
      expect(
        mockApplePaySession.completeShippingMethodSelection
      ).toHaveBeenCalledWith(shippingMethodSelectedReturnValue);
    });

    it('should use paymentMethodSelected callback to fill paymentMethodSelected', () => {
      const event = <ApplePayJS.ApplePayPaymentMethodSelectedEvent>{
        paymentMethod: {},
      };

      mockApplePaySession._stubMockEvent('paymentmethodselected', event);

      expect(configuration.onPaymentMethodSelected).toHaveBeenCalledWith(event);
      expect(
        mockApplePaySession.completePaymentMethodSelection
      ).toHaveBeenCalledWith(paymentMethodSelectedReturnValue);
    });

    it('should use paymentAuthorized callback to fill completePayment', () => {
      const event = <ApplePayJS.ApplePayPaymentAuthorizedEvent>{
        payment: {},
      };
      mockApplePaySession._stubMockEvent('paymentauthorized', event);

      expect(configuration.onPaymentAuthorized).toHaveBeenCalledWith(event);
      expect(mockApplePaySession.completePayment).toHaveBeenCalledWith(
        paymentAuthorizedReturnValue
      );
    });

    describe('on callback error', () => {
      it('should emit an error when validateMerchant failed', () => {
        const event = <ApplePayJS.ApplePayValidateMerchantEvent>{
          validationURL: '',
        };
        (configuration.onValidateMerchant as any).mockReturnValue(
          throwError(new Error('Validation Error'))
        );

        mockApplePaySession._stubMockEvent('validatemerchant', event);

        expect(configuration.onValidateMerchant).toHaveBeenCalledWith(event);
        expect(
          mockApplePaySession.completeMerchantValidation
        ).not.toHaveBeenCalled();
        expect(actualError).toBeDefined();
      });

      it('should abort when paymentauthorized failed with errors', () => {
        vi.spyOn(mockApplePaySession, 'abort').mockImplementation(() => {});
        const event = <ApplePayJS.ApplePayPaymentAuthorizedEvent>{
          payment: {},
        };
        const paymentAuthorizedReturnValue = {
          status: 0,
          errors: [{ message: 'paymentauthorized failed' }],
        };
        (configuration.onPaymentAuthorized as any).mockReturnValue(
          of(paymentAuthorizedReturnValue)
        );

        mockApplePaySession._stubMockEvent('paymentauthorized', event);

        expect(configuration.onPaymentAuthorized).toHaveBeenCalledWith(event);
        expect(mockApplePaySession.abort).toHaveBeenCalled();
      });

      [
        ['onPaymentAuthorized', 'paymentauthorized'],
        ['onPaymentMethodSelected', 'paymentmethodselected'],
        ['onShippingContactSelected', 'shippingcontactselected'],
        ['onShippingMethodSelected', 'shippingmethodselected'],
        ['onValidateMerchant', 'validatemerchant'],
      ].forEach(([callback, eventType]) => {
        it(`should abort the session on an error in ${callback}`, () => {
          const event = {};
          const callbackError = new Error('Error');
          (configuration[callback] as any).mockReturnValue(
            throwError(callbackError)
          );
          vi.spyOn(mockApplePaySession, 'abort').mockImplementation(() => {});

          mockApplePaySession._stubMockEvent(eventType, event);

          expect(configuration[callback]).toHaveBeenCalledWith(event);
          expect(mockApplePaySession.abort).toHaveBeenCalled();
          expect(actualEmit).toBeUndefined();
          expect(actualError).toBe(callbackError);
        });
      });
    });
  });
});
