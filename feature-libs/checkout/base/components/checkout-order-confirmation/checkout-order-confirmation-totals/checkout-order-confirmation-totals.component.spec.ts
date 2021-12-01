import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cart } from '@spartacus/cart/main/root';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutOrderConfirmationTotalsComponent } from './checkout-order-confirmation-totals.component';
import createSpy = jasmine.createSpy;

@Component({ selector: 'cx-order-summary', template: '' })
class MockOrderSummaryComponent {
  @Input()
  cart: Cart;
}

class MockCheckoutService implements Partial<CheckoutFacade> {
  getOrder = createSpy().and.returnValue(
    of({
      code: 'test-code-412',
    })
  );
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
    expect(component).toBeTruthy();
  });

  it('should display order-summary', () => {
    const getOrderSummary = () =>
      fixture.debugElement.query(By.css('cx-order-summary'));
    fixture.detectChanges();
    expect(getOrderSummary()).toBeTruthy();
  });
});
