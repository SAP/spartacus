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
import { OpfGiftCardCheckoutOrderSummaryComponent } from './opf-gift-card-checkout-order-summary.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('OpfGiftCardCheckoutOrderSummaryComponent', () => {
  let component: OpfGiftCardCheckoutOrderSummaryComponent;
  let fixture: ComponentFixture<OpfGiftCardCheckoutOrderSummaryComponent>;
  let mockActiveCartFacade: jasmine.SpyObj<ActiveCartFacade>;

  beforeEach(async () => {
    mockActiveCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'getActive',
      'addEntry',
      'removeEntry',
    ]);

    mockActiveCartFacade.getActive.and.returnValue(
      of({
        code: 'cart-123',
        totalItems: 2,
        totalPrice: {
          value: 150,
        },
      } as Cart)
    );

    const mockStore = jasmine.createSpyObj('Store', [
      'pipe',
      'dispatch',
      'select',
    ]);
    mockStore.pipe.and.returnValue(of({}));

    const translationServiceSpy = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);
    translationServiceSpy.translate.and.returnValue(of({}));

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

  it('should initialize cart$ observable on ngOnInit', (done) => {
    fixture.detectChanges();

    component.cart$.subscribe((cart) => {
      expect(cart).toEqual({
        code: 'cart-123',
        totalItems: 2,
        totalPrice: {
          value: 150,
        },
      });
      done();
    });
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

  it('should handle empty cart', (done) => {
    mockActiveCartFacade.getActive.and.returnValue(of({} as Cart));

    fixture.detectChanges();

    component.cart$.subscribe((cart) => {
      expect(cart).toEqual({});
      done();
    });
  });

  it('should handle null cart', (done) => {
    mockActiveCartFacade.getActive.and.returnValue(of(undefined));

    fixture.detectChanges();

    component.cart$.subscribe((cart) => {
      expect(cart).toBeUndefined();
      done();
    });
  });
});
