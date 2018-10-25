import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { OrderConfirmationComponent } from './order-confirmation.component';
import { By } from '@angular/platform-browser';
import { CheckoutService } from '../../services';
import { CartService } from '../../../cart/services';

@Component({ selector: 'y-order-summary', template: '' })
class MockOrderSummaryComponent {
  @Input()
  cart: any;
}
@Component({ selector: 'y-cart-item-list', template: '' })
class MockReviewSubmitComponent {
  @Input()
  items: any;
  @Input()
  isReadOnly: any;
}
@Component({ selector: 'y-card', template: '' })
class MockCartComponent {
  @Input()
  content: any;
}

class CheckoutServiceMock {
  entries;
  orderDetails = {
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
  };
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
        MockOrderSummaryComponent
      ],
      providers: [
        { provide: CheckoutService, useClass: CheckoutServiceMock },
        { provide: CartService, useValue: {} }
      ]
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
    const titleText = fixture.debugElement.query(By.css('.y-page__title'))
      .nativeElement.textContent;

    expect(titleText).toContain('test-code-412');
  });
});
