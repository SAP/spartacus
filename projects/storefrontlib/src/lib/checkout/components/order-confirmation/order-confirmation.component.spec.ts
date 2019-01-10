import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import createSpy = jasmine.createSpy;

import { OrderConfirmationComponent } from './order-confirmation.component';
import { Order, CheckoutService } from '@spartacus/core';

@Component({ selector: 'cx-order-summary', template: '' })
class MockOrderSummaryComponent {
  @Input()
  cart: any;
}
@Component({ selector: 'cx-cart-item-list', template: '' })
class MockReviewSubmitComponent {
  @Input()
  items: any;
  @Input()
  isReadOnly: any;
}
@Component({ selector: 'cx-card', template: '' })
class MockCartComponent {
  @Input()
  content: any;
}

@Component({ selector: 'cx-add-to-home-screen-banner', template: '' })
class MockAddtoHomeScreenBannerComponent {}

class MockCheckoutService {
  clearCheckoutData = createSpy();

  getOrderDetails(): Observable<Order> {
    return of({
      code: 'test-code-412',
      deliveryAddress: {
        country: {}
      },
      deliveryMode: {},
      paymentInfo: {
        billingAddress: {
          country: {}
        }
      }
    });
  }
}

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderConfirmationComponent,
        MockReviewSubmitComponent,
        MockCartComponent,
        MockOrderSummaryComponent,
        MockAddtoHomeScreenBannerComponent
      ],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }]
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
    const titleText = fixture.debugElement.query(By.css('.cx-page__title'))
      .nativeElement.textContent;

    expect(titleText).toContain('test-code-412');
  });
});
