import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { CheckoutService } from '../../facade';
import { OrderConfirmationComponent } from './order-confirmation.component';

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

const mockCheckoutService = {
  orderDetails$: of({
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
  }),
  clearCheckoutData: createSpy()
};

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
      providers: [{ provide: CheckoutService, useValue: mockCheckoutService }]
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
