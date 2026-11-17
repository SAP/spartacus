/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { OpfGlobalFunctionsDomain } from '@spartacus/opf/global-functions/root';
import { OpfPaymentGlobalMethods } from '@spartacus/opf/payment/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { of } from 'rxjs';
import { WindowRef, UserIdService, RoutingService } from '@spartacus/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OpfCtaFacade } from '@spartacus/opf/cta/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import { OpfQuickBuyFacade } from '@spartacus/opf/quick-buy/root';
import { OpfGlobalFunctionsGlobalDomainRegistrationsService } from './opf-global-functions-global-domain-registrations.service';
import { OpfGlobalFunctionsGlobalDomainService } from './opf-global-functions-global-domain.service';
import { OpfGlobalFunctionsSharedService } from '../../opf-global-functions-shared.service';
import { OpfGlobalFunctionsSharedRegistrationsService } from '../../opf-global-functions-shared-registrations.service';

const mockCart = { code: 'test-cart-id' } as any;

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog() {
    return EMPTY;
  }
  launch() {
    return EMPTY;
  }
  clear() {}
}

class MockOpfCtaFacade implements Partial<OpfCtaFacade> {
  emitScriptReadyEvent = vi.fn();
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

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  getCart = vi.fn().mockReturnValue(of(mockCart));
  reloadCart = vi.fn();
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  isStable = vi.fn().mockReturnValue(of(false, true));
  reloadActiveCart = vi.fn();
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

class MockRoutingService implements Partial<RoutingService> {
  getFullUrl(_options?: any): string {
    return 'https://test-url';
  }
}

class MockOpfQuickBuyTransactionService
  implements Partial<OpfQuickBuyTransactionService>
{
  getCurrentCart = vi.fn()
    .mockReturnValue(of(mockCart));
  getCurrentCartId = vi.fn()
    .mockReturnValue(of('test-cart-id'));
  getDeliveryAddress = vi.fn()
    .mockReturnValue(of(undefined));
  getSelectedDeliveryMode = vi.fn()
    .mockReturnValue(of(undefined));
}

class MockOpfQuickBuyFacade implements Partial<OpfQuickBuyFacade> {
  getApplePayWebSession = vi.fn();
}

function createOpfPaymentFacadeMock(): any {
  return { submitPayment: vi.fn(), submitCompletePayment: vi.fn(), getActiveConfigurationsState: vi.fn(), verifyPayment: vi.fn(), initiatePayment: vi.fn(), updatePaymentTransaction: vi.fn() };
}

describe('OpfGlobalFunctionsGlobalDomainRegistrationsService', () => {
  let service: OpfGlobalFunctionsGlobalDomainRegistrationsService;
  let opfPaymentFacadeMock: any;
  let container: OpfPaymentGlobalMethods;

  const mockPaymentSessionId = 'mockSessionId';

  beforeEach(() => {
    opfPaymentFacadeMock = createOpfPaymentFacadeMock();
    TestBed.configureTestingModule({
      providers: [
        OpfGlobalFunctionsGlobalDomainRegistrationsService,
        OpfGlobalFunctionsGlobalDomainService,
        OpfGlobalFunctionsSharedService,
        OpfGlobalFunctionsSharedRegistrationsService,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: OpfCtaFacade, useClass: MockOpfCtaFacade },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: CartAccessCodeFacade, useClass: MockCartAccessCodeFacade },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: OpfQuickBuyTransactionService,
          useClass: MockOpfQuickBuyTransactionService,
        },
        { provide: OpfQuickBuyFacade, useClass: MockOpfQuickBuyFacade },
      ],
    });
    service = TestBed.inject(
      OpfGlobalFunctionsGlobalDomainRegistrationsService
    );
    container = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerAll', () => {
    beforeEach(() => {
      service.registerAll(container, {
        domain: OpfGlobalFunctionsDomain.GLOBAL,
        paymentSessionId: mockPaymentSessionId,
        vcr: {} as ViewContainerRef,
      });
    });

    it('should register all global domain functions on container', () => {
      expect(container.scriptReady).toBeDefined();
      expect(container.getCart).toBeDefined();
      expect(container.setBillingAddress).toBeDefined();
      expect(container.getBillingAddress).toBeDefined();
      expect(container.setDeliveryAddress).toBeDefined();
      expect(container.getDeliveryAddress).toBeDefined();
      expect(container.setDeliveryMode).toBeDefined();
      expect(container.getDeliveryMode).toBeDefined();
      expect(container.deleteAddress).toBeDefined();
      expect(container.updateCartGuestUserEmail).toBeDefined();
      expect(container.createCartGuestUser).toBeDefined();
      expect(container.startLoadIndicator).toBeDefined();
      expect(container.stopLoadIndicator).toBeDefined();
      expect(container.throwPaymentError).toBeDefined();
      expect(container.initiatePayment).toBeDefined();
      expect(container.updatePaymentTransaction).toBeDefined();
      expect(container.verifyPayment).toBeDefined();
      expect(container.submit).toBeDefined();
      expect(container.submitComplete).toBeDefined();
      expect((container as any).getApplePayWebSession).toBeDefined();
      expect(container.prepareTransactionCart).toBeDefined();
    });

    it('should handle getCart through registered function', async () => {
      const result = await container.getCart?.();
      expect(result).toEqual(mockCart);
    });

    it('should handle initiatePayment through registered function', async () => {
      opfPaymentFacadeMock.initiatePayment.mockReturnValue(
        of({ paymentSessionId: 'test-session-id' })
      );

      const result = await container.initiatePayment?.('2301');

      expect(opfPaymentFacadeMock.initiatePayment).toHaveBeenCalled();
      expect(result).toEqual({ paymentSessionId: 'test-session-id' });
    });
  });
});
