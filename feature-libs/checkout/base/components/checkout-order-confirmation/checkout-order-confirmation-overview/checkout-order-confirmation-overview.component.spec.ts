import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { I18nTestingModule, Order } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutOrderConfirmationOverviewComponent } from './checkout-order-confirmation-overview.component';

const mockOrder: Order = {
  code: 'test-code-412',
  statusDisplay: 'test-status-display',
  created: new Date('2019-02-11T13:02:58+0000'),
  purchaseOrderNumber: 'test-po',
  costCenter: {
    name: 'Rustic Global',
    unit: {
      name: 'Rustic',
    },
  },
};

class MockCheckoutService implements Partial<CheckoutFacade> {
  getOrder(): Observable<Order> {
    return of(mockOrder);
  }
}

describe('CheckoutOrderConfirmationOverviewComponent', () => {
  let component: CheckoutOrderConfirmationOverviewComponent;
  let fixture: ComponentFixture<CheckoutOrderConfirmationOverviewComponent>;
  let checkoutService: CheckoutFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [CheckoutOrderConfirmationOverviewComponent],
        providers: [{ provide: CheckoutFacade, useClass: MockCheckoutService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CheckoutOrderConfirmationOverviewComponent
    );
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutFacade);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get order details', () => {
    let result: Order | undefined;

    checkoutService
      .getOrder()
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockOrder);
  });
});
