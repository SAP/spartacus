/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { B2BPaymentTypeEnum } from '@spartacus/checkout/b2b/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import {
  CommandService,
  EventService,
  QueryService,
  UserIdService,
  provideConfig,
} from '@spartacus/core';
import { of } from 'rxjs';
import { OpfB2bCheckoutPaymentTypeService } from './opf-b2b-checkout-payment-type.service';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive = jasmine.createSpy().and.returnValue(
    of({
      code: 'test-cart',
      paymentType: { code: B2BPaymentTypeEnum.ACCOUNT_PAYMENT },
      purchaseOrderNumber: 'test-po',
    })
  );
  takeActiveCartId = jasmine.createSpy().and.returnValue(of('test-cart'));
  isGuestCart = jasmine.createSpy().and.returnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = jasmine.createSpy().and.returnValue(of('test-user'));
}

class MockQueryService implements Partial<QueryService> {
  create = jasmine.createSpy().and.returnValue(of({}));
}

class MockCommandService implements Partial<CommandService> {
  create = jasmine.createSpy().and.returnValue({
    execute: jasmine.createSpy().and.returnValue(of({})),
  });
}

class MockEventService implements Partial<EventService> {
  dispatch = jasmine.createSpy();
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = jasmine.createSpy().and.returnValue(of({}));
}

class MockOpfPaymentFacade implements Partial<OpfPaymentFacade> {
  setCartPaymentOption = jasmine.createSpy().and.returnValue(of({}));
}

describe('OpfB2bCheckoutPaymentTypeService', () => {
  let service: OpfB2bCheckoutPaymentTypeService;
  let mockActiveCartFacade: MockActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfB2bCheckoutPaymentTypeService,
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: QueryService, useClass: MockQueryService },
        { provide: CommandService, useClass: MockCommandService },
        { provide: EventService, useClass: MockEventService },
        { provide: CheckoutQueryFacade, useClass: MockCheckoutQueryFacade },
        { provide: OpfPaymentFacade, useClass: MockOpfPaymentFacade },
        provideConfig({
          features: {
            cartBaseCore: true,
          },
        }),
      ],
    });

    service = TestBed.inject(OpfB2bCheckoutPaymentTypeService);
    mockActiveCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as unknown as MockActiveCartFacade;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty state for payment types', () => {
    service.getPaymentTypesState().subscribe((state) => {
      expect(state).toBeUndefined();
    });
  });

  it('should return empty array for payment types', () => {
    service.getPaymentTypes().subscribe((types) => {
      expect(types).toEqual([]);
    });
  });

  it('should return payment type state', () => {
    service.getSelectedPaymentTypeState().subscribe((state) => {
      expect(state).toEqual({
        data: { code: B2BPaymentTypeEnum.ACCOUNT_PAYMENT },
        loading: false,
        error: false,
      });
    });
  });

  it('should return true for account payment', () => {
    service.isAccountPayment().subscribe((isAccount) => {
      expect(isAccount).toBeTruthy();
    });
  });

  it('should return false for non-account payment', () => {
    mockActiveCartFacade.getActive.and.returnValue(
      of({
        code: 'test-cart',
        paymentType: { code: B2BPaymentTypeEnum.CARD_PAYMENT },
      })
    );

    service.isAccountPayment().subscribe((isAccount) => {
      expect(isAccount).toBeFalsy();
    });
  });

  it('should return purchase order number state', () => {
    service.getPurchaseOrderNumberState().subscribe((state) => {
      expect(state).toEqual({
        data: 'test-po',
        loading: false,
        error: false,
      });
    });
  });
});
