/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cart } from '@spartacus/cart/base/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { OpfGiftCardOrderSummaryComponent } from './opf-gift-card-order-summary.component';
import { Order } from '@spartacus/order/root';
import { Router } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';

describe('OpfGiftCardOrderSummaryComponent', () => {
  let component: OpfGiftCardOrderSummaryComponent;
  let fixture: ComponentFixture<OpfGiftCardOrderSummaryComponent>;
  let mockCheckoutStepService: jasmine.SpyObj<CheckoutStepService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoutingService: jasmine.SpyObj<RoutingService>;

  beforeEach(async () => {
    mockCheckoutStepService = jasmine.createSpyObj('CheckoutStepService', [
      'goToNextStep',
      'getPreviousStep',
    ]);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockRoutingService = jasmine.createSpyObj('RoutingService', [
      'getRouterState',
    ]);

    mockRoutingService.getRouterState.and.returnValue(
      of({
        navigationId: 1,
        state: {
          semanticRoute: 'checkoutPaymentReview',
          url: '/checkout/payment-review',
          queryParams: {},
          params: {},
          context: {},
          cmsRequired: false,
        },
      } as any)
    );

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardOrderSummaryComponent],
      providers: [
        { provide: CheckoutStepService, useValue: mockCheckoutStepService },
        { provide: Router, useValue: mockRouter },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfGiftCardOrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject CheckoutStepService', () => {
    expect(component['checkoutStepService']).toBe(mockCheckoutStepService);
  });

  it('should inject Router', () => {
    expect(component['router']).toBe(mockRouter);
  });

  it('should inject RoutingService', () => {
    expect(component['routingService']).toBe(mockRoutingService);
  });

  it('should accept cart input', () => {
    const mockCart: Cart = {
      code: 'test-cart-123',
      totalPriceWithTax: {
        value: 100,
      },
    } as Cart;

    component.cart = mockCart;
    expect(component.cart).toEqual(mockCart);
  });

  it('should accept order input', () => {
    const mockOrder: Order = {
      code: 'test-order-123',
      totalPriceWithTax: {
        value: 200,
      },
    } as Order;

    component.cart = mockOrder;
    expect(component.cart).toEqual(mockOrder);
  });

  it('should initialize isPaymentAndReviewStep$ observable', (done) => {
    fixture.detectChanges();

    component.isPaymentAndReviewStep$.subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should return false for isPaymentAndReviewStep$ when on delivery address step', (done) => {
    mockRoutingService.getRouterState.and.returnValue(
      of({
        navigationId: 2,
        state: {
          semanticRoute: 'checkoutDeliveryAddress',
          url: '/checkout/delivery-address',
          queryParams: {},
          params: {},
          context: {},
          cmsRequired: false,
        },
      } as any)
    );

    // Recreate component with updated mock
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [OpfGiftCardOrderSummaryComponent],
      providers: [
        { provide: CheckoutStepService, useValue: mockCheckoutStepService },
        { provide: Router, useValue: mockRouter },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfGiftCardOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.isPaymentAndReviewStep$.subscribe((result) => {
      expect(result).toBe(false);
      done();
    });
  });

  it('should calculate giftCardCartTotal correctly', () => {
    const mockCart: Cart = {
      code: 'test-cart',
      totalPriceWithTax: {
        value: 150,
      },
       opfGiftCardSummary: {
        totalAppliedAmount: {
          value: 50,
        },
      },
    } as Cart;

    component.cart = mockCart;
    expect(component.giftCardCartTotal).toBe(100);
  });

  it('should handle null totalPriceWithTax in giftCardCartTotal', () => {
    const mockCart: Cart = {
      code: 'test-cart',
       opfGiftCardSummary: {
        totalAppliedAmount: {
          value: 50,
        },
      },
    } as Cart;

    component.cart = mockCart;
    expect(component.giftCardCartTotal).toBe(50);
  });

  it('should handle null  opfGiftCardSummary in giftCardCartTotal', () => {
    const mockCart: Cart = {
      code: 'test-cart',
      totalPriceWithTax: {
        value: 150,
      },
    } as Cart;

    component.cart = mockCart;
    expect(component.giftCardCartTotal).toBe(150);
  });

  it('should call getRouterState on RoutingService during initialization', () => {
    fixture.detectChanges();
    expect(mockRoutingService.getRouterState).toHaveBeenCalled();
  });
});
