/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveCartFacade, Cart, CartOutlets } from '@spartacus/cart/base/root';
import {
  BaseSiteService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { vi } from 'vitest';
import { OpfGiftCardCheckoutOrderSummaryComponent } from './opf-gift-card-checkout-order-summary.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('OpfGiftCardCheckoutOrderSummaryComponent', () => {
  let component: OpfGiftCardCheckoutOrderSummaryComponent;
  let fixture: ComponentFixture<OpfGiftCardCheckoutOrderSummaryComponent>;
  let mockActiveCartFacade: any;

  beforeEach(async () => {
    mockActiveCartFacade = { getActive: vi.fn(), addEntry: vi.fn(), removeEntry: vi.fn() };

    mockActiveCartFacade.getActive.mockReturnValue(
      of({
        code: 'cart-123',
        totalItems: 2,
        totalPrice: {
          value: 150,
        },
      } as Cart)
    );

    const mockStore = { pipe: vi.fn(), dispatch: vi.fn(), select: vi.fn() };
    mockStore.pipe.mockReturnValue(of({}));

    const translationServiceSpy = { translate: vi.fn() };
    translationServiceSpy.translate.mockReturnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardCheckoutOrderSummaryComponent],
      providers: [
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: CheckoutStepService, useValue: {} },
        { provide: BaseSiteService, useValue: {} },
        { provide: RoutingService, useValue: { getRouterState: () => of({}) } },
        { provide: Store, useValue: mockStore },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfGiftCardCheckoutOrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ActiveCartFacade', () => {
    expect(component['activeCartFacade']).toBe(mockActiveCartFacade);
  });

  it('should initialize cart$ observable on ngOnInit', async () => {
    fixture.detectChanges();

    component.cart$.subscribe((cart) => {
      expect(cart).toEqual({
        code: 'cart-123',
        totalItems: 2,
        totalPrice: {
          value: 150,
        },
      });    });
  });

  it('should call getActive on activeCartFacade during ngOnInit', () => {
    fixture.detectChanges();
    expect(mockActiveCartFacade.getActive).toHaveBeenCalled();
  });

  it('should have cartOutlets property defined', () => {
    expect(component.cartOutlets).toBeDefined();
    expect(component.cartOutlets).toBe(CartOutlets);
  });

  it('should have cart$ as Observable', () => {
    fixture.detectChanges();
    expect(component.cart$).toBeDefined();
  });

  it('should handle empty cart', async () => {
    mockActiveCartFacade.getActive.mockReturnValue(of({} as Cart));

    fixture.detectChanges();

    component.cart$.subscribe((cart) => {
      expect(cart).toEqual({});    });
  });

  it('should handle null cart', async () => {
    mockActiveCartFacade.getActive.mockReturnValue(of(undefined));

    fixture.detectChanges();

    component.cart$.subscribe((cart) => {
      expect(cart).toBeUndefined();    });
  });
});
