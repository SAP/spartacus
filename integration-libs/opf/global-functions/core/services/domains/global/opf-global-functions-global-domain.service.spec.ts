/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Address } from '@spartacus/core';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import { OpfCtaFacade } from '@spartacus/opf/cta/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import {
  OpfPaymentSessionData,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import { of } from 'rxjs';
import { RoutingService, UserIdService, WindowRef } from '@spartacus/core';
import { CartAccessCodeFacade } from '@spartacus/cart/base/root';
import {
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { OpfGlobalFunctionsGlobalDomainService } from './opf-global-functions-global-domain.service';
import { OpfGlobalFunctionsSharedService } from '../../opf-global-functions-shared.service';

const mockBillingAddress: Address = {
  id: 'billing-address-id',
  firstName: 'Jane',
  lastName: 'Smith',
  line1: '789 Business Blvd',
  town: 'Los Angeles',
  postalCode: '90002',
  country: { isocode: 'US' },
  region: { isocodeShort: 'CA' },
};

const mockDeliveryAddress: Address = {
  id: 'delivery-address-id',
  firstName: 'John',
  lastName: 'Doe',
  line1: '123 Main St',
  town: 'City',
  postalCode: '12345',
  country: { isocode: 'US' },
};

const mockDeliveryMode = {
  code: 'standard',
  name: 'Standard Delivery',
};

const mockCart = {
  code: 'test-cart-id',
  sapBillingAddress: mockBillingAddress,
  deliveryAddress: mockDeliveryAddress,
  deliveryMode: mockDeliveryMode,
} as any;

class MockOpfCtaFacade implements Partial<OpfCtaFacade> {
  emitScriptReadyEvent = jasmine.createSpy('emitScriptReadyEvent');
}

class MockOpfMetadataStoreService implements Partial<OpfMetadataStoreService> {
  opfMetadataState = new BehaviorSubject<OpfMetadataModel>({
    termsAndConditionsChecked: false,
    selectedPaymentOptionId: undefined,
    isPaymentInProgress: false,
    opfPaymentSessionId: undefined,
    isTermsAndConditionsAlertClosed: false,
  });
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog() {
    return EMPTY;
  }
  launch() {
    return EMPTY;
  }
  clear() {}
}

class MockRoutingService implements Partial<RoutingService> {
  getFullUrl(_options?: any): string {
    return 'https://test-url';
  }
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId = jasmine
    .createSpy('getActiveCartId')
    .and.returnValue(of('test-cart-id'));
  takeActive = jasmine.createSpy('takeActive').and.returnValue(of(mockCart));
  isStable = jasmine.createSpy('isStable').and.returnValue(of(false, true));
  reloadActiveCart = jasmine.createSpy('reloadActiveCart');
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  getCart = jasmine.createSpy('getCart').and.returnValue(of(mockCart));
  reloadCart = jasmine.createSpy('reloadCart');
}

class MockUserIdService implements Partial<UserIdService> {
  getUserId() {
    return of('test-user-id');
  }
}

class MockCartAccessCodeFacade implements Partial<CartAccessCodeFacade> {
  getCartAccessCode(_userId: string, _cartId: string) {
    return of('test-access-code');
  }
}

class MockOpfQuickBuyTransactionService
  implements Partial<OpfQuickBuyTransactionService>
{
  setDeliveryAddress = jasmine
    .createSpy('setDeliveryAddress')
    .and.returnValue(of('test-address-id'));
  setDeliveryMode = jasmine
    .createSpy('setDeliveryMode')
    .and.returnValue(of(mockDeliveryMode));
  deleteUserAddresses = jasmine.createSpy('deleteUserAddresses');
  updateCartGuestUserEmail = jasmine
    .createSpy('updateCartGuestUserEmail')
    .and.returnValue(of(true));
  createCartGuestUser = jasmine
    .createSpy('createCartGuestUser')
    .and.returnValue(of(true));
}

function createOpfPaymentFacadeMock(): jasmine.SpyObj<OpfPaymentFacade> {
  return jasmine.createSpyObj('OpfPaymentFacade', [
    'submitPayment',
    'submitCompletePayment',
    'getActiveConfigurationsState',
    'verifyPayment',
    'initiatePayment',
    'updatePaymentTransaction',
  ]);
}

describe('OpfGlobalFunctionsGlobalDomainService', () => {
  let service: OpfGlobalFunctionsGlobalDomainService;
  let opfPaymentFacadeMock: jasmine.SpyObj<OpfPaymentFacade>;
  let opfQuickBuyTransactionService: OpfQuickBuyTransactionService;

  beforeEach(() => {
    opfPaymentFacadeMock = createOpfPaymentFacadeMock();
    TestBed.configureTestingModule({
      providers: [
        OpfGlobalFunctionsGlobalDomainService,
        OpfGlobalFunctionsSharedService,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: OpfCtaFacade, useClass: MockOpfCtaFacade },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: CartAccessCodeFacade, useClass: MockCartAccessCodeFacade },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: OpfQuickBuyTransactionService,
          useClass: MockOpfQuickBuyTransactionService,
        },
      ],
    });
    service = TestBed.inject(OpfGlobalFunctionsGlobalDomainService);
    opfQuickBuyTransactionService = TestBed.inject(
      OpfQuickBuyTransactionService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('scriptReady', () => {
    it('should emit script ready event', () => {
      const opfCtaFacade = TestBed.inject(
        OpfCtaFacade
      ) as unknown as MockOpfCtaFacade;
      service.scriptReady('test-script');
      expect(opfCtaFacade.emitScriptReadyEvent).toHaveBeenCalledWith(
        'test-script'
      );
    });
  });

  describe('getCart', () => {
    it('should return active cart when cartId is not provided', async () => {
      const activeCartFacade = TestBed.inject(
        ActiveCartFacade
      ) as jasmine.SpyObj<ActiveCartFacade>;

      const result = await service.getCart();

      expect(activeCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(activeCartFacade.isStable).toHaveBeenCalled();
      expect(activeCartFacade.takeActive).toHaveBeenCalled();
      expect(result).toEqual(mockCart);
    });

    it('should return cart by id when cartId is provided', async () => {
      const multiCartFacade = TestBed.inject(
        MultiCartFacade
      ) as jasmine.SpyObj<MultiCartFacade>;
      const cartId = 'specific-cart-id';

      const result = await service.getCart(cartId);

      expect(multiCartFacade.reloadCart).toHaveBeenCalledWith(cartId);
      expect(multiCartFacade.getCart).toHaveBeenCalledWith(cartId);
      expect(result).toEqual(mockCart);
    });
  });

  describe('addresses and delivery', () => {
    it('should handle getBillingAddress', async () => {
      const result = await service.getBillingAddress();
      expect(result).toEqual(mockBillingAddress);
    });

    it('should handle getDeliveryAddress', async () => {
      const result = await service.getDeliveryAddress();
      expect(result).toEqual(mockDeliveryAddress);
    });

    it('should handle setDeliveryAddress', async () => {
      const mockAddress: Address = {
        id: 'test-address-id',
        firstName: 'John',
        lastName: 'Doe',
        line1: '123 Main St',
        town: 'City',
        postalCode: '12345',
        country: { isocode: 'US' },
      };

      const result = await service.setDeliveryAddress(mockAddress);

      expect(
        opfQuickBuyTransactionService.setDeliveryAddress
      ).toHaveBeenCalledWith(mockAddress);
      expect(result).toBe('test-address-id');
    });

    it('should handle setDeliveryMode', async () => {
      const result = await service.setDeliveryMode('standard');
      expect(
        opfQuickBuyTransactionService.setDeliveryMode
      ).toHaveBeenCalledWith('standard');
      expect(result).toEqual(mockDeliveryMode);
    });

    it('should handle getDeliveryMode', async () => {
      const result = await service.getDeliveryMode();
      expect(result).toEqual(mockDeliveryMode);
    });

    it('should handle deleteAddress', async () => {
      await service.deleteAddress('test-address-id');
      expect(
        opfQuickBuyTransactionService.deleteUserAddresses
      ).toHaveBeenCalledWith(['test-address-id']);
    });
  });

  describe('guest user', () => {
    it('should handle updateCartGuestUserEmail', async () => {
      const result = await service.updateCartGuestUserEmail('test@example.com');
      expect(
        opfQuickBuyTransactionService.updateCartGuestUserEmail
      ).toHaveBeenCalledWith('test@example.com');
      expect(result).toBe(true);
    });

    it('should handle createCartGuestUser', async () => {
      const result = await service.createCartGuestUser();
      expect(
        opfQuickBuyTransactionService.createCartGuestUser
      ).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('verifyPayment', () => {
    it('should call payment facade verifyPayment', async () => {
      const mockPayload: OpfPaymentVerificationPayload = {
        responseMap: [{ key: 'key1', value: 'value1' }],
      };
      const mockResponse: OpfPaymentVerificationResponse = {
        result: 'success',
      };
      opfPaymentFacadeMock.verifyPayment.and.returnValue(of(mockResponse));

      const result = await service.verifyPayment(
        'test-session-id',
        mockPayload
      );

      expect(opfPaymentFacadeMock.verifyPayment).toHaveBeenCalledWith(
        'test-session-id',
        mockPayload
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('initiatePayment', () => {
    const mockSessionData: OpfPaymentSessionData = {
      paymentSessionId: 'test-session-id',
    };

    beforeEach(() => {
      opfPaymentFacadeMock.initiatePayment.and.returnValue(of(mockSessionData));
    });

    it('should handle string configurationId', async () => {
      const result = await service.initiatePayment('2301');
      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(result).toEqual(mockSessionData);
    });

    it('should handle number configurationId', async () => {
      const result = await service.initiatePayment(2301);
      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(result).toEqual(mockSessionData);
    });

    it('should handle PaymentConfig object', async () => {
      const result = await service.initiatePayment({
        configurationId: '2301',
      });
      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(result).toEqual(mockSessionData);
    });

    it('should reject when configurationId is missing', async () => {
      await expectAsync(
        service.initiatePayment({} as any)
      ).toBeRejectedWithError('configurationId is required');
    });

    it('should reject when cartId is missing', async () => {
      const activeCartFacade = TestBed.inject(ActiveCartFacade) as any;
      activeCartFacade.getActiveCartId.and.returnValue(of(undefined));

      await expectAsync(service.initiatePayment('2301')).toBeRejectedWithError(
        'Cart ID is required. No active cart found.'
      );
    });
  });

  describe('normalizePaymentConfig', () => {
    it('should normalize payment config from string', () => {
      expect(service['normalizePaymentConfig']('2301')).toEqual({
        configurationId: '2301',
      });
    });

    it('should normalize payment config from number', () => {
      expect(service['normalizePaymentConfig'](2301)).toEqual({
        configurationId: '2301',
      });
    });

    it('should normalize payment config from object', () => {
      const config = { configurationId: '2301', channel: 'BROWSER' };
      expect(service['normalizePaymentConfig'](config)).toEqual(config);
    });
  });
});
