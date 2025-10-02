/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpfCheckoutReviewCartDetailsComponent } from './opf-checkout-review-cart-details.component';
import {
  Cart,
  PromotionLocation,
  CartOutlets,
  OrderEntry,
} from '@spartacus/cart/base/root';
import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  Directive,
} from '@angular/core';

@Directive({ selector: '[cxOutlet]' })
class MockOutletDirective {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: any;
}

@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
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

describe('OpfCheckoutReviewCartDetailsComponent', () => {
  let component: OpfCheckoutReviewCartDetailsComponent;
  let fixture: ComponentFixture<OpfCheckoutReviewCartDetailsComponent>;

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
      imports: [
        OpfCheckoutReviewCartDetailsComponent,
        MockCartItemListComponent,
        MockOrderSummaryComponent,
        MockAppliedCouponsComponent,
        MockPromotionsComponent,
        MockTranslatePipe,
        MockOutletDirective,
      ],
    }).compileComponents();
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

    const compiled = fixture.debugElement.nativeElement;
    const cartTotal = compiled.querySelector('.cx-review-cart-total');
    expect(cartTotal).toBeTruthy();
    expect(cartTotal.textContent).toContain('$100.00');

    const promotions = compiled.querySelector('cx-promotions');
    expect(promotions).toBeTruthy();

    const itemsToShipLabel = compiled.querySelector('.cx-items-to-ship-label');
    expect(itemsToShipLabel).toBeTruthy();
  });
});
