import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { CheckoutReviewOverviewComponent } from './checkout-review-overview.component';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';

const mockCart: Cart = {
  guid: 'test',
  code: 'test',
  deliveryItemsQuantity: 3,
  pickupItemsQuantity: 5,
  totalUnitCount: 8,
  totalPrice: { formattedValue: '$999.98' },
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive = createSpy().and.returnValue(of(mockCart));
}

describe('CheckoutReviewOverviewComponent', () => {
  let component: CheckoutReviewOverviewComponent;
  let fixture: ComponentFixture<CheckoutReviewOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutReviewOverviewComponent],
      imports: [I18nTestingModule, PromotionsModule],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutReviewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get cart', () => {
    let cart: Cart | undefined;
    component.cart$.subscribe((data: Cart) => {
      cart = data;
    });

    expect(cart).toEqual(mockCart);
  });

  describe('UI cart total section', () => {
    const getCartTotalText = () =>
      fixture.debugElement.query(By.css('.cx-review-cart-total')).nativeElement
        .textContent;

    it('should contain total number of items', () => {
      fixture.detectChanges();
      expect(getCartTotalText()).toContain(8);
    });

    it('should contain total price', () => {
      fixture.detectChanges();
      expect(getCartTotalText()).toContain('$999.98');
    });
  });
});
