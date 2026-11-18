/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { WindowRef } from '@spartacus/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OpfPaymentGlobalMethods } from '@spartacus/opf/payment/root';
import {
  OpfPaymentFacade,
  OpfPaymentMethod,
} from '@spartacus/opf/payment/root';
import { OpfQuickBuyProviderType } from '@spartacus/opf/quick-buy/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import { BehaviorSubject, of } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';
import { OpfGlobalFunctionsSharedRegistrationsService } from './opf-global-functions-shared-registrations.service';
import { OpfGlobalFunctionsSharedService } from './opf-global-functions-shared.service';

const mockPaymentMethod =
  OpfQuickBuyProviderType.APPLE_PAY as unknown as OpfPaymentMethod;

class MockOpfMetadataStoreService implements Partial<OpfMetadataStoreService> {
  opfMetadataState = new BehaviorSubject<OpfMetadataModel>({
    termsAndConditionsChecked: false,
    selectedPaymentOptionId: undefined,
    isPaymentInProgress: false,
    opfPaymentSessionId: undefined,
    isTermsAndConditionsAlertClosed: false,
  });
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId = vi.fn().mockReturnValue(of('test-cart-id'));
}

class MockOpfQuickBuyTransactionService
  implements Partial<OpfQuickBuyTransactionService>
{
  getCurrentCartId = vi.fn().mockReturnValue(of('test-cart-id'));
}

class MockCartAccessCodeFacade implements Partial<CartAccessCodeFacade> {
  getCartAccessCode(_userId: string, _cartId: string) {
    return of('test-access-code');
  }
}

function createOpfPaymentFacadeMock(): any {
  return {
    submitPayment: vi.fn(),
    submitCompletePayment: vi.fn(),
    getActiveConfigurationsState: vi.fn(),
    verifyPayment: vi.fn(),
    initiatePayment: vi.fn(),
    updatePaymentTransaction: vi.fn(),
  };
}

describe('OpfGlobalFunctionsSharedRegistrationsService', () => {
  let service: OpfGlobalFunctionsSharedRegistrationsService;
  let sharedService: OpfGlobalFunctionsSharedService;
  let opfPaymentFacadeMock: any;
  let container: OpfPaymentGlobalMethods;

  const mockPaymentSessionId = 'mockSessionId';

  beforeEach(() => {
    opfPaymentFacadeMock = createOpfPaymentFacadeMock();
    TestBed.configureTestingModule({
      providers: [
        OpfGlobalFunctionsSharedService,
        OpfGlobalFunctionsSharedRegistrationsService,
        WindowRef,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        {
          provide: LaunchDialogService,
          useValue: { launch: vi.fn(), clear: vi.fn(), openDialog: vi.fn() },
        },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: CartAccessCodeFacade, useClass: MockCartAccessCodeFacade },
        {
          provide: OpfQuickBuyTransactionService,
          useClass: MockOpfQuickBuyTransactionService,
        },
      ],
    });
    service = TestBed.inject(OpfGlobalFunctionsSharedRegistrationsService);
    sharedService = TestBed.inject(OpfGlobalFunctionsSharedService);
    container = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerSubmit', () => {
    it('should assign container.submit that delegates to shared service', async () => {
      vi.spyOn(sharedService, 'submit').mockReturnValue(Promise.resolve(true));
      service.registerSubmit(
        container,
        mockPaymentSessionId,
        {} as ViewContainerRef
      );

      await container.submit?.({
        additionalData: [],
        submitSuccess: () => {},
        submitPending: () => {},
        submitFailure: () => {},
        paymentMethod: mockPaymentMethod,
      });

      expect(sharedService.submit).toHaveBeenCalled();
    });
  });

  describe('registerSubmitComplete', () => {
    it('should assign container.submitComplete that delegates to shared service', async () => {
      vi.spyOn(sharedService, 'submitComplete').mockReturnValue(
        Promise.resolve(true)
      );
      service.registerSubmitComplete(
        container,
        mockPaymentSessionId,
        {} as ViewContainerRef
      );

      await container.submitComplete?.({
        additionalData: [],
        submitSuccess: () => {},
        submitPending: () => {},
        submitFailure: () => {},
      });

      expect(sharedService.submitComplete).toHaveBeenCalled();
    });
  });

  describe('registerUpdatePaymentTransaction', () => {
    it('should assign container.updatePaymentTransaction', async () => {
      const updateFn = vi
        .fn()
        .mockReturnValue(Promise.resolve({ paymentSessionId: 'updated' }));

      service.registerUpdatePaymentTransaction(container, updateFn);

      await container.updatePaymentTransaction?.({ paymentSessionId: 'test' });

      expect(updateFn).toHaveBeenCalled();
    });
  });

  describe('integration via shared service', () => {
    it('should wire submit to payment facade through shared service', async () => {
      opfPaymentFacadeMock.submitPayment.mockReturnValue(of(true));
      service.registerSubmit(container, mockPaymentSessionId);

      await container.submit?.({
        additionalData: [],
        submitSuccess: () => {},
        submitPending: () => {},
        submitFailure: () => {},
        paymentMethod: mockPaymentMethod,
      });

      expect(opfPaymentFacadeMock.submitPayment).toHaveBeenCalled();
    });
  });
});
