/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseSiteService, TranslationService } from '@spartacus/core';
import {
  Cart,
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import {
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpfCheckoutReviewCartDetailsComponent } from './opf-checkout-review-cart-details.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Directive({
  selector: '[cxOutlet]',
  standalone: false,
})
class MockOutletDirective {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: any;
}

@Pipe({
  name: 'cxTranslate',
  standalone: false,
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-cart-item-list',
  template: '',
  standalone: false,
})
class MockCartItemListComponent {
  @Input() items: OrderEntry[];
  @Input() readonly: boolean;
  @Input() promotionLocation: PromotionLocation;
}

@Component({
  selector: 'cx-order-summary',
  template: '',
  standalone: false,
})
class MockOrderSummaryComponent {
  @Input() cart: Cart;
}

@Component({
  selector: 'cx-applied-coupons',
  template: '',
  standalone: false,
})
class MockAppliedCouponsComponent {
  @Input() cart: Cart;
  @Input() promotionLocation: PromotionLocation;
}

@Component({
  selector: 'cx-promotions',
  template: '',
  standalone: false,
})
class MockPromotionsComponent {
  @Input() promotions: any[];
}

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
  get: () => of({
    uid: 'electronics-spa',
    // Add other properties that might be required
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
      declarations: [
        OpfCheckoutReviewCartDetailsComponent,
        MockCartItemListComponent,
        MockOrderSummaryComponent,
        MockAppliedCouponsComponent,
        MockPromotionsComponent,
        MockTranslatePipe,
        MockOutletDirective,
      ],

      providers: [
        {
          provide: TranslationService,
          useValue: {
            translate: jasmine.createSpy('translate').and.returnValue(''),
          },
        },
         {    provide: Store,
        useValue: {
          pipe: jasmine.createSpy('pipe').and.returnValue(of({})),
          dispatch: jasmine.createSpy('dispatch'),
          select: jasmine.createSpy('select').and.returnValue(of({}))
        }  },
         {provide:BaseSiteService,useValue:baseSiteServiceMock}
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
  expect(component.cart).toEqual(mockCart);
  expect(component.entries).toEqual(mockEntries);
  expect(component.cart.totalPrice?.formattedValue).toBe('$100.00');
  expect(component.entries.length).toBe(2);
});
});
