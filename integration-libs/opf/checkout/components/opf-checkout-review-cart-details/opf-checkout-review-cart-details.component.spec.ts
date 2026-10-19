/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import {
  BaseSiteService,
  MockTranslatePipe,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';

import { Store } from '@ngrx/store';
import {
  AppliedCouponsComponent,
  CartItemListComponent,
  OrderSummaryComponent,
} from '@spartacus/cart/base/components';
import { PickUpItemsDetailsComponent } from '@spartacus/pickup-in-store/components';
import { OutletDirective, PromotionsComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfCheckoutReviewCartDetailsComponent } from './opf-checkout-review-cart-details.component';

@Directive({ selector: '[cxOutlet]' })
class MockOutletDirective {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: any;
}

@Component({
  selector: 'cx-cart-item-list',
  template: '',
})
class MockCartItemListComponent {
  @Input() items: OrderEntry[];
  @Input() readonly: boolean;
  @Input() promotionLocation: PromotionLocation;
}

@Component({
  selector: 'cx-order-summary',
  template: '',
})
class MockOrderSummaryComponent {
  @Input() cart: Cart;
}

@Component({
  selector: 'cx-applied-coupons',
  template: '',
})
class MockAppliedCouponsComponent {
  @Input() cart: Cart;
  @Input() promotionLocation: PromotionLocation;
}

@Component({
  selector: 'cx-promotions',
  template: '',
})
class MockPromotionsComponent {
  @Input() promotions: any[];
}

@Component({
  selector: 'cx-pick-up-in-store-items-details',
  template: '',
})
class MockPickUpItemsDetailsComponent
  implements Partial<PickUpItemsDetailsComponent> {}

describe('OpfCheckoutReviewCartDetailsComponent', () => {
  let component: OpfCheckoutReviewCartDetailsComponent;
  let fixture: ComponentFixture<OpfCheckoutReviewCartDetailsComponent>;
  let baseSiteServiceMock: any;

  const mockEntries: OrderEntry[] = [
    {
      entryNumber: 1,
      product: {
        code: 'test-product-1',
        name: 'Test Product 1',
      },
      quantity: 1,
      totalPrice: {
        currencyIso: 'USD',
        value: 50,
      },
    },
    {
      entryNumber: 2,
      product: {
        code: 'test-product-2',
        name: 'Test Product 2',
      },
      quantity: 1,
      totalPrice: {
        currencyIso: 'USD',
        value: 50,
      },
    },
  ];
  baseSiteServiceMock = {
    getActive: () => of('electronics-spa'),
    get: () =>
      of({
        uid: 'electronics-spa',
      }),
  };
  const mockCart: Cart = {
    code: 'test-cart',
    totalItems: 2,
    totalPrice: {
      currencyIso: 'USD',
      value: 100,
      formattedValue: '$100.00',
    },
    entries: mockEntries,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpfCheckoutReviewCartDetailsComponent],

      providers: [
        {
          provide: TranslationService,
          useValue: {
            translate: jasmine.createSpy('translate').and.returnValue(''),
          },
        },
        {
          provide: Store,
          useValue: {
            pipe: jasmine.createSpy('pipe').and.returnValue(of({})),
            dispatch: jasmine.createSpy('dispatch'),
            select: jasmine.createSpy('select').and.returnValue(of({})),
          },
        },
        { provide: BaseSiteService, useValue: baseSiteServiceMock },
      ],
    })
      .overrideComponent(OpfCheckoutReviewCartDetailsComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CartItemListComponent,
            OrderSummaryComponent,
            AppliedCouponsComponent,
            PromotionsComponent,
            OutletDirective,
            PickUpItemsDetailsComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockCartItemListComponent,
            MockOrderSummaryComponent,
            MockAppliedCouponsComponent,
            MockPromotionsComponent,
            MockOutletDirective,
            MockPickUpItemsDetailsComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfCheckoutReviewCartDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct promotion location', () => {
    expect(component.promotionLocation).toBe(PromotionLocation.Checkout);
  });

  it('should have correct cart outlets', () => {
    expect(component.cartOutlets).toBe(CartOutlets);
  });

  it('should handle null cart input', () => {
    component.cart = null;
    fixture.detectChanges();
    expect(component.cart).toBeNull();
  });

  it('should handle null entries input', () => {
    component.entries = null;
    fixture.detectChanges();
    expect(component.entries).toBeNull();
  });

  it('should display cart details when cart is provided', () => {
    component.cart = mockCart;
    component.entries = mockEntries;
    fixture.detectChanges();
    expect(component.cart).toEqual(mockCart);
    expect(component.entries).toEqual(mockEntries);
    expect(component.cart.totalPrice?.formattedValue).toBe('$100.00');
    expect(component.entries.length).toBe(2);
  });
});
