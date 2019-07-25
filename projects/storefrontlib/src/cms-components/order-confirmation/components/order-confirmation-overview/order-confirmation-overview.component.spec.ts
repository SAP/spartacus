import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutService, I18nTestingModule, Order } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Card } from '../../../../shared/components/card/card.component';
import { OrderConfirmationOverviewComponent } from './order-confirmation-overview.component';

import createSpy = jasmine.createSpy;

@Component({ selector: 'cx-card', template: '' })
class MockCardComponent {
  @Input()
  content: Card;
}

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

describe('OrderConfirmationOverviewComponent', () => {
  let component: OrderConfirmationOverviewComponent;
  let fixture: ComponentFixture<OrderConfirmationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [OrderConfirmationOverviewComponent, MockCardComponent],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
