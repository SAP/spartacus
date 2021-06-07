import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Cart, I18nTestingModule, Order } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderConfirmationTotalsComponent } from './order-confirmation-totals.component';

import createSpy = jasmine.createSpy;

@Component({ selector: 'cx-order-summary', template: '' })
class MockOrderSummaryComponent {
  @Input()
  cart: Cart;
}

class MockCheckoutService {
  clearCheckoutData = createSpy();

  getOrderDetails(): Observable<Order> {
    return of({
      code: 'test-code-412',
    });
  }
}

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationTotalsComponent;
  let fixture: ComponentFixture<OrderConfirmationTotalsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          OrderConfirmationTotalsComponent,
          MockOrderSummaryComponent,
        ],
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

  it('should display order-summary', () => {
    const getOrderSummary = () =>
      fixture.debugElement.query(By.css('cx-order-summary'));
    component.ngOnInit();
    fixture.detectChanges();
    expect(getOrderSummary()).toBeTruthy();
  });
});
