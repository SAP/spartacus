/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ApplePayObservableConfig } from '@spartacus/opf/quick-buy/root';
import { Observable, of, throwError } from 'rxjs';
import { ApplePaySessionFactory } from '../apple-pay-session/apple-pay-session.factory';
import { ApplePayObservableFactory } from './apple-pay-observable.factory';

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

interface ApplePayObservableConfigExt extends ApplePayObservableConfig {
  [key: string]: any;
}

describe('ApplePayObservableFactory', () => {
  let factory: ApplePayObservableFactory;
  let mockApplePaySessionFactory: jasmine.SpyObj<ApplePaySessionFactory>;
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
  const mockConfig: ApplePayObservableConfig = {
    request: mockRequest,
    validateMerchant: () => of({}),
    paymentMethodSelected: () =>
      of({} as ApplePayJS.ApplePayPaymentMethodUpdate),
    shippingContactSelected: () =>
      of({} as ApplePayJS.ApplePayShippingContactUpdate),
    shippingMethodSelected: () =>
      of({} as ApplePayJS.ApplePayShippingMethodUpdate),
    paymentAuthorized: () =>
      of({} as ApplePayJS.ApplePayPaymentAuthorizationResult),
  };

  beforeEach(() => {
    const MockApplePaySessionFactory = jasmine.createSpyObj(
      'ApplePaySessionFactory',
      ['startApplePaySession']
    );

    TestBed.configureTestingModule({
      providers: [
        ApplePayObservableFactory,
        {
          provide: ApplePaySessionFactory,
          useValue: MockApplePaySessionFactory,
        },
      ],
    });

    factory = TestBed.inject(ApplePayObservableFactory);
    mockApplePaySessionFactory = TestBed.inject(
      ApplePaySessionFactory
    ) as jasmine.SpyObj<ApplePaySessionFactory>;

    mockApplePaySession = new MockApplePaySession(
      1,
      {} as ApplePayJS.ApplePayPaymentRequest
    );
    spyOn(mockApplePaySession, 'addEventListener').and.callThrough();
  });

  it('should be created', () => {
    expect(factory).toBeTruthy();
  });

  it('should return an observable that creates an apple pay session', () => {
    const actual = factory.initApplePayEventsHandler({
      ...mockConfig,
    });

    mockApplePaySessionFactory.startApplePaySession.and.returnValue(
      mockApplePaySession
    );
    expect(actual instanceof Observable).toBe(true);
    expect(
      mockApplePaySessionFactory.startApplePaySession
    ).not.toHaveBeenCalled();

    actual.subscribe();

    expect(
      mockApplePaySessionFactory.startApplePaySession
    ).toHaveBeenCalledTimes(1);
    expect(
      mockApplePaySessionFactory.startApplePaySession
    ).toHaveBeenCalledWith(mockRequest);
  });

  it('should bind config event handlers to ApplePaySession', () => {
    mockApplePaySessionFactory.startApplePaySession.and.returnValue(
      mockApplePaySession
    );
    factory.initApplePayEventsHandler(mockConfig).subscribe();

    expect(mockApplePaySession.addEventListener).toHaveBeenCalledTimes(6);
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'cancel',
      jasmine.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'paymentauthorized',
      jasmine.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'paymentmethodselected',
      jasmine.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'shippingcontactselected',
      jasmine.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'shippingmethodselected',
      jasmine.any(Function)
    );
    expect(mockApplePaySession.addEventListener).toHaveBeenCalledWith(
      'validatemerchant',
      jasmine.any(Function)
    );
  });

  it('should complete if the session is cancelled', () => {
    let complete = false;
    let actualEmit: any;
    let actualError: any;
    spyOn(mockApplePaySession, 'abort').and.stub();

    mockApplePaySessionFactory.startApplePaySession.and.returnValue(
      mockApplePaySession
    );
    factory.initApplePayEventsHandler(mockConfig).subscribe(
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
    let configuration: ApplePayObservableConfigExt;

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
        paymentAuthorized: jasmine.createSpy('paymentAuthorized'),
        validateMerchant: jasmine.createSpy('validateMerchant'),
        shippingContactSelected: jasmine.createSpy('shippingContactSelected'),
        paymentMethodSelected: jasmine.createSpy('paymentMethodSelected'),
        shippingMethodSelected: jasmine.createSpy('shippingMethodSelected'),
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

      (configuration.paymentAuthorized as jasmine.Spy).and.returnValue(
        of(paymentAuthorizedReturnValue)
      );
      (configuration.validateMerchant as jasmine.Spy).and.returnValue(
        of(validateMerchantReturnValue)
      );
      (configuration.shippingContactSelected as jasmine.Spy).and.returnValue(
        of(shippingContactSelectedReturnValue)
      );
      (configuration.paymentMethodSelected as jasmine.Spy).and.returnValue(
        of(paymentMethodSelectedReturnValue)
      );
      (configuration.shippingMethodSelected as jasmine.Spy).and.returnValue(
        of(shippingMethodSelectedReturnValue)
      );
      mockApplePaySessionFactory.startApplePaySession.and.returnValue(
        mockApplePaySession
      );
      actual = factory.initApplePayEventsHandler(configuration);
      actualEmit = undefined;
      actualError = undefined;
      actualComplete = false;
      actual.subscribe(
        (next) => (actualEmit = next),
        (error) => (actualError = error),
        () => (actualComplete = true)
      );

      spyOn(mockApplePaySession, 'completeMerchantValidation').and.stub();
      spyOn(mockApplePaySession, 'completePayment').and.stub();
      spyOn(mockApplePaySession, 'completePaymentMethodSelection').and.stub();
      spyOn(mockApplePaySession, 'completeShippingContactSelection').and.stub();
      spyOn(mockApplePaySession, 'completeShippingMethodSelection').and.stub();
    });

    it('should use validateMerchant callback to fill validateMerchant', () => {
      const event = <ApplePayJS.ApplePayValidateMerchantEvent>{
        validationURL: '',
      };

      mockApplePaySession._stubMockEvent('validatemerchant', event);
      expect(actualComplete).toBe(false);
      expect(configuration.validateMerchant).toHaveBeenCalledWith(event);
      expect(
        mockApplePaySession.completeMerchantValidation
      ).toHaveBeenCalledWith(validateMerchantReturnValue);
    });

    it('should use shippingContactSelected callback to fill shippingContactSelected', () => {
      const event = <ApplePayJS.ApplePayShippingContactSelectedEvent>{
        shippingContact: {},
      };

      mockApplePaySession._stubMockEvent('shippingcontactselected', event);

      expect(configuration.shippingContactSelected).toHaveBeenCalledWith(event);
      expect(
        mockApplePaySession.completeShippingContactSelection
      ).toHaveBeenCalledWith(shippingContactSelectedReturnValue);
    });

    it('should use shippingMethodSelected callback to fill shippingMethodSelected', () => {
      const event = <ApplePayJS.ApplePayShippingMethodSelectedEvent>{
        shippingMethod: {},
      };

      mockApplePaySession._stubMockEvent('shippingmethodselected', event);

      expect(configuration.shippingMethodSelected).toHaveBeenCalledWith(event);
      expect(
        mockApplePaySession.completeShippingMethodSelection
      ).toHaveBeenCalledWith(shippingMethodSelectedReturnValue);
    });

    it('should use paymentMethodSelected callback to fill paymentMethodSelected', () => {
      const event = <ApplePayJS.ApplePayPaymentMethodSelectedEvent>{
        paymentMethod: {},
      };

      mockApplePaySession._stubMockEvent('paymentmethodselected', event);

      expect(configuration.paymentMethodSelected).toHaveBeenCalledWith(event);
      expect(
        mockApplePaySession.completePaymentMethodSelection
      ).toHaveBeenCalledWith(paymentMethodSelectedReturnValue);
    });

    it('should use paymentAuthorized callback to fill completePayment', () => {
      const event = <ApplePayJS.ApplePayPaymentAuthorizedEvent>{
        payment: {},
      };
      mockApplePaySession._stubMockEvent('paymentauthorized', event);

      expect(configuration.paymentAuthorized).toHaveBeenCalledWith(event);
      expect(mockApplePaySession.completePayment).toHaveBeenCalledWith(
        paymentAuthorizedReturnValue
      );
    });

    describe('on callback error', () => {
      it('should emit an error when validateMerchant failed', () => {
        const event = <ApplePayJS.ApplePayValidateMerchantEvent>{
          validationURL: '',
        };
        (configuration.validateMerchant as jasmine.Spy).and.returnValue(
          throwError(new Error('Validation Error'))
        );

        mockApplePaySession._stubMockEvent('validatemerchant', event);

        expect(configuration.validateMerchant).toHaveBeenCalledWith(event);
        expect(
          mockApplePaySession.completeMerchantValidation
        ).not.toHaveBeenCalled();
        expect(actualError).toBeDefined();
      });

      it('should abort when paymentauthorized failed with errors', () => {
        spyOn(mockApplePaySession, 'abort').and.stub();
        const event = <ApplePayJS.ApplePayPaymentAuthorizedEvent>{
          payment: {},
        };
        const paymentAuthorizedReturnValue = {
          status: 0,
          errors: [{ message: 'paymentauthorized failed' }],
        };
        (configuration.paymentAuthorized as jasmine.Spy).and.returnValue(
          of(paymentAuthorizedReturnValue)
        );

        mockApplePaySession._stubMockEvent('paymentauthorized', event);

        expect(configuration.paymentAuthorized).toHaveBeenCalledWith(event);
        expect(mockApplePaySession.abort).toHaveBeenCalled();
      });

      [
        ['paymentAuthorized', 'paymentauthorized'],
        ['paymentMethodSelected', 'paymentmethodselected'],
        ['shippingContactSelected', 'shippingcontactselected'],
        ['shippingMethodSelected', 'shippingmethodselected'],
        ['validateMerchant', 'validatemerchant'],
      ].forEach(([callback, eventType]) => {
        it(`should abort the session on an error in ${callback}`, () => {
          const event = {};
          const callbackError = new Error('Error');
          (configuration[callback] as jasmine.Spy).and.returnValue(
            throwError(callbackError)
          );
          spyOn(mockApplePaySession, 'abort').and.stub();

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
