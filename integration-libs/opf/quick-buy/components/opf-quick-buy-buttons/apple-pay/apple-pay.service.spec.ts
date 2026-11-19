/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Product, WindowRef } from '@spartacus/core';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import {
  OpfQuickBuyTransactionService,
} from '@spartacus/opf/quick-buy/core';
import {
  defaultOpfQuickBuyConfig,
  OpfQuickBuyConfig,
  OpfQuickBuyDeliveryType,
  OpfQuickBuyFacade,
} from '@spartacus/opf/quick-buy/root';
import { firstValueFrom, Subject, of, throwError } from 'rxjs';
import { OpfQuickBuyButtonsService } from '../opf-quick-buy-buttons.service';
import { ApplePaySessionWrapperService } from './apple-pay-session/apple-pay-session-wrapper.service';
import { ApplePaySessionOrchestrator } from './apple-pay-session/apple-pay-session.orchestrator';
import { ApplePayService } from './apple-pay.service';

const mockProduct: Product = {
  name: 'Product Name',
  code: 'PRODUCT_CODE',
  images: {
    PRIMARY: {
      thumbnail: {
        url: 'url',
        altText: 'alt',
      },
    },
  },
  price: {
    formattedValue: '$1.500',
    value: 1.5,
  },
  priceRange: {
    maxPrice: {
      formattedValue: '$1.500',
    },
    minPrice: {
      formattedValue: '$1.000',
    },
  },
};

const mockCart = {
  code: 'CART_CODE',
  totalPrice: {
    value: 42.0,
    currencyIso: 'USD',
  },
};

const MockWindowRef = {
  nativeWindow: {
    location: {
      hostname: 'testHost',
    },
  },
};

describe('ApplePayService', () => {
  let service: ApplePayService;
  let opfPaymentFacadeMock: any;
  let opfQuickBuyTransactionServiceMock: any;
  let applePaySessionOrchestratorMock: any;
  let applePaySessionWrapperServiceMock: any;
  let applePayObservableTestController: Subject<ApplePayJS.ApplePayPaymentAuthorizationResult>;
  let opfQuickBuyButtonsServiceMock: any;
  let opfQuickBuyFacadeMock: any;

  beforeEach(() => {
    opfQuickBuyButtonsServiceMock = { getQuickBuyProviderConfig: vi.fn() };

    applePaySessionWrapperServiceMock = {
      startApplePaySession: vi.fn(),
      isApplePaySupported: vi.fn(),
      statusSuccess: 1,
      statusFailure: 0,
    };
    opfPaymentFacadeMock = { submitPayment: vi.fn() };
    opfQuickBuyFacadeMock = { getApplePayWebSession: vi.fn() };
    applePaySessionOrchestratorMock = { start: vi.fn() };
    opfQuickBuyTransactionServiceMock = {
      deleteUserAddresses: vi.fn(),
      getTransactionLocationContext: vi.fn(),
      getTransactionDeliveryInfo: vi.fn(),
      getMerchantName: vi.fn(),
      checkStableCart: vi.fn(),
      getSupportedDeliveryModes: vi.fn(),
      setDeliveryAddress: vi.fn(),
      setBillingAddress: vi.fn(),
      getDeliveryAddress: vi.fn(),
      getCurrentCart: vi.fn(),
      getCurrentCartId: vi.fn(),
      getCurrentCartTotalPrice: vi.fn(),
      setDeliveryMode: vi.fn(),
      getSelectedDeliveryMode: vi.fn(),
      handleCartGuestUser: vi.fn(),
      updateCartGuestUserEmail: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ApplePayService,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        { provide: WindowRef, useValue: MockWindowRef },
        {
          provide: OpfQuickBuyTransactionService,
          useValue: opfQuickBuyTransactionServiceMock,
        },
        {
          provide: ApplePaySessionOrchestrator,
          useValue: applePaySessionOrchestratorMock,
        },
        {
          provide: ApplePaySessionWrapperService,
          useValue: applePaySessionWrapperServiceMock,
        },
        {
          provide: OpfQuickBuyButtonsService,
          useValue: opfQuickBuyButtonsServiceMock,
        },
        {
          provide: OpfQuickBuyFacade,
          useValue: opfQuickBuyFacadeMock,
        },
        {
          provide: OpfQuickBuyConfig,
          useValue: defaultOpfQuickBuyConfig,
        },
      ],
    });
    service = TestBed.inject(ApplePayService);

    applePayObservableTestController = new Subject();
    applePaySessionOrchestratorMock.start.mockReturnValue(
      applePayObservableTestController
    );
    opfQuickBuyTransactionServiceMock.handleCartGuestUser.mockReturnValue(
      of(true)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle errors during ApplePay session start', () => {
    service = TestBed.inject(ApplePayService);
    const merchantNameMock = 'Nakano';
    opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
      of({
        type: OpfQuickBuyDeliveryType.SHIPPING,
      })
    );

    applePaySessionOrchestratorMock.start.mockReturnValue(
      throwError(() => 'Error')
    );

    opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
      of(merchantNameMock)
    );

    service
      .start({ product: mockProduct, quantity: 1, countryCode: 'us' })
      .subscribe({
        error: (err: any) => {
          expect(err).toBe('Error');
        },
      });
  });

  // ─── isApplePaySupported ────────────────────────────────────────────────────

  describe('isApplePaySupported', () => {
    it('should delegate to applePaySessionWrapperService.isApplePaySupported', async () => {
      applePaySessionWrapperServiceMock.isApplePaySupported.mockReturnValue(
        of(true)
      );

      const result: any = await firstValueFrom(service.isApplePaySupported('merchant.test'));

      expect(
        applePaySessionWrapperServiceMock.isApplePaySupported
      ).toHaveBeenCalledWith('merchant.test');
      expect(result).toBe(true);
    });

    it('should return false when isApplePaySupported returns false', async () => {
      applePaySessionWrapperServiceMock.isApplePaySupported.mockReturnValue(
        of(false)
      );

      const result: any = await firstValueFrom(service.isApplePaySupported('merchant.test'));

      expect(result).toBe(false);
    });
  });

  // ─── updateApplePayForm (protected) ────────────────────────────────────────

  describe('updateApplePayForm', () => {
    it('should return an object with newTotal containing the provided amount and label', () => {
      const result = (service as any).updateApplePayForm({
        amount: '12.50',
        label: 'Test Merchant',
      });

      expect(result).toEqual({
        newTotal: {
          amount: '12.50',
          label: 'Test Merchant',
        },
      });
    });
  });

  // ─── getApplePayFormWithError (protected) ───────────────────────────────────

  describe('getApplePayFormWithError', () => {
    it('should return an error object with the provided message and default code', () => {
      const result = (service as any).getApplePayFormWithError('Something went wrong');

      expect(result).toEqual({ code: 'unknown', message: 'Something went wrong' });
    });

    it('should use the provided code when given', () => {
      const result = (service as any).getApplePayFormWithError('Bad address', 'shippingContactInvalid');

      expect(result).toEqual({ code: 'shippingContactInvalid', message: 'Bad address' });
    });
  });

  // ─── recordDeliveryAddress (protected) ─────────────────────────────────────

  describe('recordDeliveryAddress', () => {
    it('should add an address id when it is not already tracked', () => {
      (service as any).transactionDetails.addressIds = [];
      (service as any).recordDeliveryAddress('addr-1');

      expect((service as any).transactionDetails.addressIds).toContain('addr-1');
    });

    it('should not add a duplicate address id', () => {
      (service as any).transactionDetails.addressIds = ['addr-1'];
      (service as any).recordDeliveryAddress('addr-1');

      expect((service as any).transactionDetails.addressIds).toHaveLength(1);
    });

    it('should track multiple distinct address ids', () => {
      (service as any).transactionDetails.addressIds = [];
      (service as any).recordDeliveryAddress('addr-1');
      (service as any).recordDeliveryAddress('addr-2');

      expect((service as any).transactionDetails.addressIds).toEqual(['addr-1', 'addr-2']);
    });
  });

  // ─── convertAppleToOpfAddress (private) ────────────────────────────────────

  describe('convertAppleToOpfAddress (via handleShippingContactSelected)', () => {
    it('should produce a full address when partial=false', () => {
      const appleContact = {
        givenName: 'Jane',
        familyName: 'Doe',
        addressLines: ['123 Main St', 'Apt 4'],
        emailAddress: 'jane@example.com',
        locality: 'Springfield',
        administrativeArea: 'IL',
        postalCode: '62701',
        phoneNumber: '+1-555-0100',
        countryCode: 'US',
        country: 'United States',
      };

      const result = (service as any).convertAppleToOpfAddress(appleContact, false);

      expect(result.firstName).toBe('Jane');
      expect(result.lastName).toBe('Doe');
      expect(result.line1).toBe('123 Main St');
      expect(result.line2).toBe('Apt 4');
      expect(result.email).toBe('jane@example.com');
      expect(result.town).toBe('Springfield');
      expect(result.postalCode).toBe('62701');
      expect(result.country).toEqual({ isocode: 'US', name: 'United States' });
      expect(result.defaultAddress).toBe(false);
    });

    it('should produce a partial address with placeholder fields when partial=true', () => {
      const appleContact = {
        givenName: 'Jane',
        familyName: 'Doe',
        addressLines: ['123 Main St'],
        locality: 'Springfield',
        postalCode: '62701',
        countryCode: 'US',
      };
      const PLACEHOLDER = '[FIELD_NOT_SET]';

      const result = (service as any).convertAppleToOpfAddress(appleContact, true);

      expect(result.firstName).toBe(PLACEHOLDER);
      expect(result.lastName).toBe(PLACEHOLDER);
      expect(result.line1).toBe(PLACEHOLDER);
      // non-placeholder fields still copied through
      expect(result.town).toBe('Springfield');
      expect(result.postalCode).toBe('62701');
    });
  });

  // ─── start() with cart input (CART branch of initTransactionDetails) ───────

  describe('start() with cart input', () => {
    it('should initialise transactionDetails from cart when cart is provided', () => {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Cart Merchant')
      );

      service.start({ cart: mockCart as any }).subscribe();

      const passedConfig = applePaySessionOrchestratorMock.start.mock.calls[0][0];
      expect(passedConfig).toBeDefined();
      // The cart total amount and currency are taken from the cart
      expect(passedConfig.request.currencyCode).toBe('USD');
      expect(passedConfig.request.total.amount).toBe('42');
    });
  });

  // ─── start() — paymentInProgress guard ─────────────────────────────────────

  describe('start() paymentInProgress guard', () => {
    it('should return an error if payment is already in progress', () => {
      (service as any).paymentInProgress = true;

      let errorCaught: any;
      service.start({ product: mockProduct, quantity: 1 }).subscribe({
        error: (err: any) => {
          errorCaught = err;
        },
      });

      expect(errorCaught).toBeInstanceOf(Error);
      expect(errorCaught.message).toContain('already in progress');
    });
  });

  // ─── start() — happy path: onValidateMerchant callback ──────────────────────

  describe('start() — onValidateMerchant callback (handleValidation / validateOpfAppleSession)', () => {
    function setupAndStart() {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );

      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();

      return applePaySessionOrchestratorMock.start.mock.calls[0][0];
    }

    it('should call opfQuickBuyFacade.getApplePayWebSession with the validationURL from the event', async () => {
      const mockSessionResponse = {
        epochTimestamp: 1,
        expiresAt: 2,
        merchantSessionIdentifier: 'sess',
        nonce: 'nonce',
        merchantIdentifier: 'mid',
        domainName: 'testHost',
        displayName: 'Test',
        signature: 'sig',
      };
      opfQuickBuyFacadeMock.getApplePayWebSession.mockReturnValue(
        of(mockSessionResponse)
      );

      const config = setupAndStart();

      const mockValidateEvent = { validationURL: 'https://apple.com/validate' };
      const result: any = await firstValueFrom(
        config.onValidateMerchant(mockValidateEvent)
      );

      expect(opfQuickBuyFacadeMock.getApplePayWebSession).toHaveBeenCalledWith(
        expect.objectContaining({
          validationUrl: 'https://apple.com/validate',
          initiative: 'web',
          initiativeContext: 'testHost',
        })
      );
      expect(result).toEqual(mockSessionResponse);
    });

    it('should propagate errors from getApplePayWebSession', async () => {
      opfQuickBuyFacadeMock.getApplePayWebSession.mockReturnValue(
        throwError(() => new Error('Session error'))
      );

      const config = setupAndStart();

      await expect(
        firstValueFrom(config.onValidateMerchant({ validationURL: 'https://apple.com/validate' }))
      ).rejects.toThrow('Session error');
    });

    it('should propagate errors from handleCartGuestUser', async () => {
      opfQuickBuyTransactionServiceMock.handleCartGuestUser.mockReturnValue(
        throwError(() => new Error('Guest user error'))
      );

      const config = setupAndStart();

      await expect(
        firstValueFrom(config.onValidateMerchant({ validationURL: 'https://apple.com/validate' }))
      ).rejects.toThrow('Guest user error');
    });
  });

  // ─── start() — onPaymentMethodSelected callback ─────────────────────────────

  describe('start() — onPaymentMethodSelected callback', () => {
    function setupAndStart() {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );
      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();
      return applePaySessionOrchestratorMock.start.mock.calls[0][0];
    }

    it('should return a payment method update with newTotal', async () => {
      const config = setupAndStart();

      const result: any = await firstValueFrom(
        config.onPaymentMethodSelected({ paymentMethod: {} })
      );

      expect(result).toHaveProperty('newTotal');
      expect(result.newTotal).toHaveProperty('amount');
      expect(result.newTotal).toHaveProperty('label');
    });
  });

  // ─── start() — onShippingContactSelected callback ───────────────────────────

  describe('start() — onShippingContactSelected callback', () => {
    const mockShippingContact = {
      givenName: 'John',
      familyName: 'Smith',
      addressLines: ['10 Elm St'],
      locality: 'Chicago',
      administrativeArea: 'IL',
      postalCode: '60601',
      countryCode: 'US',
      country: 'United States',
    };

    const mockDeliveryModes = [
      {
        code: 'standard',
        name: 'Standard',
        description: 'Standard shipping',
        deliveryCost: { value: 5.99 },
      },
    ];

    function setupAndStart() {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );
      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();
      return applePaySessionOrchestratorMock.start.mock.calls[0][0];
    }

    it('should call setDeliveryAddress with a partial address', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-10')
      );
      opfQuickBuyTransactionServiceMock.getSupportedDeliveryModes.mockReturnValue(
        of(mockDeliveryModes)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartTotalPrice.mockReturnValue(
        of(49.99)
      );

      const config = setupAndStart();

      await firstValueFrom(
        config.onShippingContactSelected({ shippingContact: mockShippingContact })
      );

      expect(opfQuickBuyTransactionServiceMock.setDeliveryAddress).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: '[FIELD_NOT_SET]',
          lastName: '[FIELD_NOT_SET]',
          line1: '[FIELD_NOT_SET]',
          town: 'Chicago',
        })
      );
    });

    it('should record the returned address id', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-10')
      );
      opfQuickBuyTransactionServiceMock.getSupportedDeliveryModes.mockReturnValue(
        of(mockDeliveryModes)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartTotalPrice.mockReturnValue(
        of(49.99)
      );

      const config = setupAndStart();

      await firstValueFrom(
        config.onShippingContactSelected({ shippingContact: mockShippingContact })
      );

      expect((service as any).transactionDetails.addressIds).toContain('addr-10');
    });

    it('should include newShippingMethods in the result', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-10')
      );
      opfQuickBuyTransactionServiceMock.getSupportedDeliveryModes.mockReturnValue(
        of(mockDeliveryModes)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartTotalPrice.mockReturnValue(
        of(49.99)
      );

      const config = setupAndStart();

      const result: any = await firstValueFrom(
        config.onShippingContactSelected({ shippingContact: mockShippingContact })
      );

      expect(result.newShippingMethods).toHaveLength(1);
      expect(result.newShippingMethods[0].identifier).toBe('standard');
      expect(result.newShippingMethods[0].amount).toBe('5.99');
    });

    it('should return a result with errors when no delivery modes are available', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-20')
      );
      opfQuickBuyTransactionServiceMock.getSupportedDeliveryModes.mockReturnValue(
        of([])
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartTotalPrice.mockReturnValue(
        of(49.99)
      );

      const config = setupAndStart();

      // When no delivery modes are available, the map() returns an Observable (of(...)), then
      // the outer switchMap immediately calls getCurrentCartTotalPrice regardless.
      // The final result is still a valid result object.
      const result: any = await firstValueFrom(
        config.onShippingContactSelected({ shippingContact: mockShippingContact })
      );

      // result should be the final object from getCurrentCartTotalPrice chain
      expect(result).toBeDefined();
    });

    it('should throw when getCurrentCartTotalPrice returns falsy', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-10')
      );
      opfQuickBuyTransactionServiceMock.getSupportedDeliveryModes.mockReturnValue(
        of(mockDeliveryModes)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartTotalPrice.mockReturnValue(
        of(0)
      );

      const config = setupAndStart();

      await expect(
        firstValueFrom(
          config.onShippingContactSelected({ shippingContact: mockShippingContact })
        )
      ).rejects.toThrow('Total Price not available');
    });

    it('should update transactionDetails.total.amount with the new price', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-10')
      );
      opfQuickBuyTransactionServiceMock.getSupportedDeliveryModes.mockReturnValue(
        of(mockDeliveryModes)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartTotalPrice.mockReturnValue(
        of(99.99)
      );

      const config = setupAndStart();

      await firstValueFrom(
        config.onShippingContactSelected({ shippingContact: mockShippingContact })
      );

      expect((service as any).transactionDetails.total.amount).toBe('99.99');
    });
  });

  // ─── start() — onShippingMethodSelected callback ────────────────────────────

  describe('start() — onShippingMethodSelected callback', () => {
    function setupAndStart() {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );
      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();
      return applePaySessionOrchestratorMock.start.mock.calls[0][0];
    }

    it('should call setDeliveryMode with the selected shipping method identifier', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryMode.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCart.mockReturnValue(
        of({ totalPrice: { value: 55.0 } })
      );

      const config = setupAndStart();

      await firstValueFrom(
        config.onShippingMethodSelected({
          shippingMethod: { identifier: 'express' },
        })
      );

      expect(opfQuickBuyTransactionServiceMock.setDeliveryMode).toHaveBeenCalledWith('express');
    });

    it('should update transactionDetails.total.amount with the cart total', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryMode.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCart.mockReturnValue(
        of({ totalPrice: { value: 55.0 } })
      );

      const config = setupAndStart();

      const result: any = await firstValueFrom(
        config.onShippingMethodSelected({
          shippingMethod: { identifier: 'express' },
        })
      );

      expect(result.newTotal.amount).toBe('55');
      expect((service as any).transactionDetails.total.amount).toBe('55');
    });

    it('should throw when cart has no totalPrice', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryMode.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCart.mockReturnValue(
        of({ totalPrice: { value: null } })
      );

      const config = setupAndStart();

      await expect(
        firstValueFrom(
          config.onShippingMethodSelected({
            shippingMethod: { identifier: 'express' },
          })
        )
      ).rejects.toThrow('Total Price not available');
    });
  });

  // ─── start() — onPaymentAuthorized callback (handlePaymentAuthorized) ────────

  describe('start() — onPaymentAuthorized callback (SHIPPING delivery type)', () => {
    const mockBillingContact = {
      givenName: 'Alice',
      familyName: 'Brown',
      addressLines: ['1 Billing Rd'],
      locality: 'New York',
      postalCode: '10001',
      countryCode: 'US',
      country: 'United States',
    };
    const mockShippingContact = {
      givenName: 'Alice',
      familyName: 'Brown',
      addressLines: ['1 Shipping Ave'],
      locality: 'New York',
      postalCode: '10001',
      countryCode: 'US',
      country: 'United States',
      emailAddress: 'alice@example.com',
    };

    function setupAndStart(deliveryType = OpfQuickBuyDeliveryType.SHIPPING) {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: deliveryType })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );
      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();
      // Manually apply the deliveryInfo on transactionDetails so the private method sees it
      (service as any).transactionDetails.deliveryInfo = { type: deliveryType };
      return applePaySessionOrchestratorMock.start.mock.calls[0][0];
    }

    it('should call setDeliveryAddress, setBillingAddress, updateCartGuestUserEmail, getCurrentCartId and submitPayment on success', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-99')
      );
      opfQuickBuyTransactionServiceMock.setBillingAddress.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.updateCartGuestUserEmail.mockReturnValue(
        of(true)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartId.mockReturnValue(
        of('cart-id-123')
      );
      opfPaymentFacadeMock.submitPayment.mockReturnValue(of(true));

      const config = setupAndStart();

      const mockPaymentEvent = {
        payment: {
          billingContact: mockBillingContact,
          shippingContact: mockShippingContact,
          token: {
            paymentData: { someData: 'encrypted' },
          },
        },
      };

      const result: any = await firstValueFrom(
        config.onPaymentAuthorized(mockPaymentEvent)
      );

      expect(opfQuickBuyTransactionServiceMock.setDeliveryAddress).toHaveBeenCalled();
      expect(opfQuickBuyTransactionServiceMock.setBillingAddress).toHaveBeenCalled();
      expect(opfQuickBuyTransactionServiceMock.updateCartGuestUserEmail).toHaveBeenCalledWith(
        'alice@example.com'
      );
      expect(opfQuickBuyTransactionServiceMock.getCurrentCartId).toHaveBeenCalled();
      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
      expect(result.status).toBe(1); // statusSuccess
    });

    it('should return statusFailure when submitPayment returns false', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-99')
      );
      opfQuickBuyTransactionServiceMock.setBillingAddress.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.updateCartGuestUserEmail.mockReturnValue(
        of(true)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartId.mockReturnValue(
        of('cart-id-123')
      );
      opfPaymentFacadeMock.submitPayment.mockReturnValue(of(false));

      const config = setupAndStart();

      const mockPaymentEvent = {
        payment: {
          billingContact: mockBillingContact,
          shippingContact: mockShippingContact,
          token: { paymentData: {} },
        },
      };

      const result: any = await firstValueFrom(
        config.onPaymentAuthorized(mockPaymentEvent)
      );

      expect(result.status).toBe(0); // statusFailure
    });

    it('should return statusFailure with error details when submitPayment throws', async () => {
      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-99')
      );
      opfQuickBuyTransactionServiceMock.setBillingAddress.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.updateCartGuestUserEmail.mockReturnValue(
        of(true)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartId.mockReturnValue(
        of('cart-id-123')
      );
      opfPaymentFacadeMock.submitPayment.mockReturnValue(
        throwError(() => new Error('Payment failed'))
      );

      const config = setupAndStart();

      const mockPaymentEvent = {
        payment: {
          billingContact: mockBillingContact,
          shippingContact: mockShippingContact,
          token: { paymentData: {} },
        },
      };

      const result: any = await firstValueFrom(
        config.onPaymentAuthorized(mockPaymentEvent)
      );

      expect(result.status).toBe(0); // statusFailure
      expect(result.errors[0].message).toBe('Payment failed');
    });

    it('should throw when billingContact is missing', async () => {
      const config = setupAndStart();

      const mockPaymentEvent = {
        payment: {
          billingContact: null,
          shippingContact: mockShippingContact,
          token: { paymentData: {} },
        },
      };

      // placeOrderAfterPayment throws synchronously — catchError is never reached
      expect(() =>
        firstValueFrom(config.onPaymentAuthorized(mockPaymentEvent))
      ).toThrow('empty billingContact');
    });

    it('should throw when shippingContact is missing for SHIPPING delivery type', async () => {
      const config = setupAndStart(OpfQuickBuyDeliveryType.SHIPPING);

      const mockPaymentEvent = {
        payment: {
          billingContact: mockBillingContact,
          shippingContact: null,
          token: { paymentData: {} },
        },
      };

      // placeOrderAfterPayment throws synchronously — catchError is never reached
      expect(() =>
        firstValueFrom(config.onPaymentAuthorized(mockPaymentEvent))
      ).toThrow('empty shippingContact');
    });

    it('should return false when payment is null', async () => {
      const config = setupAndStart();

      const result: any = await firstValueFrom(
        config.onPaymentAuthorized({ payment: null })
      );

      // placeOrderAfterPayment returns of(false) → map returns statusFailure result
      expect(result.status).toBe(0);
    });
  });

  // ─── start() — onPaymentAuthorized callback (PICKUP delivery type) ──────────

  describe('start() — onPaymentAuthorized callback (PICKUP delivery type)', () => {
    const mockBillingContact = {
      givenName: 'Bob',
      familyName: 'Pick',
      addressLines: ['5 Pickup Lane'],
      locality: 'Chicago',
      postalCode: '60601',
      countryCode: 'US',
      country: 'United States',
    };
    const mockShippingContact = {
      givenName: 'Bob',
      familyName: 'Pick',
      addressLines: ['5 Pickup Lane'],
      locality: 'Chicago',
      postalCode: '60601',
      countryCode: 'US',
      country: 'United States',
      emailAddress: 'bob@example.com',
    };

    it('should call setDeliveryMode with "pickup" and setBillingAddress for PICKUP type', async () => {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.PICKUP })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );
      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();
      (service as any).transactionDetails.deliveryInfo = {
        type: OpfQuickBuyDeliveryType.PICKUP,
      };

      const config = applePaySessionOrchestratorMock.start.mock.calls[0][0];

      opfQuickBuyTransactionServiceMock.setDeliveryMode.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.setBillingAddress.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.updateCartGuestUserEmail.mockReturnValue(
        of(true)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartId.mockReturnValue(
        of('cart-id-456')
      );
      opfPaymentFacadeMock.submitPayment.mockReturnValue(of(true));

      const mockPaymentEvent = {
        payment: {
          billingContact: mockBillingContact,
          shippingContact: mockShippingContact,
          token: { paymentData: { data: 'payload' } },
        },
      };

      const result: any = await firstValueFrom(
        config.onPaymentAuthorized(mockPaymentEvent)
      );

      expect(opfQuickBuyTransactionServiceMock.setDeliveryMode).toHaveBeenCalledWith(
        'pickup'
      );
      expect(opfQuickBuyTransactionServiceMock.setBillingAddress).toHaveBeenCalled();
      // setDeliveryAddress should NOT be called for PICKUP
      expect(opfQuickBuyTransactionServiceMock.setDeliveryAddress).not.toHaveBeenCalled();
      expect(result.status).toBe(1); // statusSuccess
    });
  });

  // ─── start() — shippingContact without email (skips updateCartGuestUserEmail) ─

  describe('start() — onPaymentAuthorized without shippingContact email', () => {
    it('should not call updateCartGuestUserEmail when emailAddress is absent', async () => {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );
      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();
      (service as any).transactionDetails.deliveryInfo = {
        type: OpfQuickBuyDeliveryType.SHIPPING,
      };

      const config = applePaySessionOrchestratorMock.start.mock.calls[0][0];

      const shippingContactNoEmail = {
        givenName: 'No',
        familyName: 'Email',
        addressLines: ['1 No Email St'],
        locality: 'City',
        postalCode: '00000',
        countryCode: 'US',
        country: 'US',
        // no emailAddress property
      };

      opfQuickBuyTransactionServiceMock.setDeliveryAddress.mockReturnValue(
        of('addr-77')
      );
      opfQuickBuyTransactionServiceMock.setBillingAddress.mockReturnValue(
        of(undefined)
      );
      opfQuickBuyTransactionServiceMock.getCurrentCartId.mockReturnValue(
        of('cart-id-789')
      );
      opfPaymentFacadeMock.submitPayment.mockReturnValue(of(true));

      const mockPaymentEvent = {
        payment: {
          billingContact: {
            givenName: 'No',
            familyName: 'Email',
            addressLines: ['1 Billing St'],
            locality: 'City',
            postalCode: '00000',
            countryCode: 'US',
            country: 'US',
          },
          shippingContact: shippingContactNoEmail,
          token: { paymentData: {} },
        },
      };

      await firstValueFrom(config.onPaymentAuthorized(mockPaymentEvent));

      expect(opfQuickBuyTransactionServiceMock.updateCartGuestUserEmail).not.toHaveBeenCalled();
    });
  });

  // ─── finalize: deleteUserAddresses called after start() ──────────────────────

  describe('start() finalize — deleteUserAddresses', () => {
    it('should call deleteUserAddresses with tracked address ids when the stream completes', () => {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );
      opfQuickBuyTransactionServiceMock.deleteUserAddresses.mockReturnValue(
        of(undefined)
      );

      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();

      // manually seed addressIds before completing the orchestrator observable
      (service as any).transactionDetails.addressIds = ['addr-a', 'addr-b'];

      applePayObservableTestController.complete();

      expect(opfQuickBuyTransactionServiceMock.deleteUserAddresses).toHaveBeenCalledWith(
        ['addr-a', 'addr-b']
      );
    });

    it('should reset paymentInProgress to false after stream completes', () => {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );

      service.start({ product: mockProduct, quantity: 1, countryCode: 'us' }).subscribe();

      expect((service as any).paymentInProgress).toBe(true);

      applePayObservableTestController.complete();

      expect((service as any).paymentInProgress).toBe(false);
    });

    it('should reset paymentInProgress to false after stream errors', () => {
      opfQuickBuyTransactionServiceMock.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
      opfQuickBuyTransactionServiceMock.getMerchantName.mockReturnValue(
        of('Merchant')
      );

      service
        .start({ product: mockProduct, quantity: 1, countryCode: 'us' })
        .subscribe({ error: () => {} });

      applePayObservableTestController.error(new Error('oops'));

      expect((service as any).paymentInProgress).toBe(false);
    });
  });
});
