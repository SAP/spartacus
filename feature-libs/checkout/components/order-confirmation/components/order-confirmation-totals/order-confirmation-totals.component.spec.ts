import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { I18nTestingModule } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { OrderConfirmationTotalsComponent } from './order-confirmation-totals.component';

import createSpy = jasmine.createSpy;

class MockCheckoutService {
  clearCheckoutData = createSpy();

  getOrderDetails(): Observable<Order> {
    return of({
      code: 'test-code-412',
    });
  }
}

describe('OrderConfirmationTotalsComponent', () => {
  let component: OrderConfirmationTotalsComponent;
  let fixture: ComponentFixture<OrderConfirmationTotalsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [OrderConfirmationTotalsComponent],
        providers: [{ provide: CheckoutFacade, useClass: MockCheckoutService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationTotalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
