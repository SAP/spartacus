import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { Cart, I18nTestingModule, Order } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutOrderConfirmationTotalsComponent } from './checkout-order-confirmation-totals.component';

@Component({ selector: 'cx-order-summary', template: '' })
class MockOrderSummaryComponent {
  @Input()
  cart: Cart;
}

class MockCheckoutService implements Partial<CheckoutFacade> {
  getOrder(): Observable<Order> {
    return of({
      code: 'test-code-412',
    });
  }
}

describe('CheckoutOrderConfirmationTotalsComponent', () => {
  let component: CheckoutOrderConfirmationTotalsComponent;
  let fixture: ComponentFixture<CheckoutOrderConfirmationTotalsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          CheckoutOrderConfirmationTotalsComponent,
          MockOrderSummaryComponent,
        ],
        providers: [{ provide: CheckoutFacade, useClass: MockCheckoutService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderConfirmationTotalsComponent);
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
