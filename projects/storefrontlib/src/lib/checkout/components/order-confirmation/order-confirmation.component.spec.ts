import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Cart,
  CheckoutService,
  I18nTestingModule,
  Order,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Item } from '../../../../cms-components/checkout/cart/index';
import { Card } from '../../../../shared/components/card/card.component';
import { OrderConfirmationComponent } from './order-confirmation.component';

import createSpy = jasmine.createSpy;

@Component({ selector: 'cx-order-summary', template: '' })
class MockOrderSummaryComponent {
  @Input()
  cart: Cart;
}
@Component({ selector: 'cx-cart-item-list', template: '' })
class MockReviewSubmitComponent {
  @Input()
  items: Item[];
  @Input()
  isReadOnly: boolean;
}
@Component({ selector: 'cx-card', template: '' })
class MockCardComponent {
  @Input()
  content: Card;
}

@Component({ selector: 'cx-add-to-home-screen-banner', template: '' })
class MockAddtoHomeScreenBannerComponent {}

class MockCheckoutService {
  clearCheckoutData = createSpy();

  getOrderDetails(): Observable<Order> {
    return of({
      code: 'test-code-412',
      deliveryAddress: {
        country: {},
      },
      deliveryMode: {},
      paymentInfo: {
        billingAddress: {
          country: {},
        },
      },
    });
  }
}

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        OrderConfirmationComponent,
        MockReviewSubmitComponent,
        MockCardComponent,
        MockOrderSummaryComponent,
        MockAddtoHomeScreenBannerComponent,
      ],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const titleText = fixture.debugElement.query(By.css('.cx-page-title'))
      .nativeElement.textContent;

    expect(titleText).toContain('test-code-412');
  });
});
