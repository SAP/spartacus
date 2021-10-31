import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReplenishmentOrder, ScheduleReplenishmentForm } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutReplenishmentOrderAdapter } from './checkout-replenishment-order.adapter';
import { CheckoutReplenishmentOrderConnector } from './checkout-replenishment-order.connector';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

class MockCheckoutReplenishmentOrderAdapter
  implements CheckoutReplenishmentOrderAdapter
{
  scheduleReplenishmentOrder(
    _cartId: string,
    _scheduleReplenishmentForm: ScheduleReplenishmentForm,
    _termsChecked: boolean,
    _userId: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }
}

describe('Checkout Replenishment Order Connector', () => {
  let adapter: CheckoutReplenishmentOrderAdapter;
  let connector: CheckoutReplenishmentOrderConnector;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          CheckoutReplenishmentOrderConnector,
          {
            provide: CheckoutReplenishmentOrderAdapter,
            useClass: MockCheckoutReplenishmentOrderAdapter,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    adapter = TestBed.inject(CheckoutReplenishmentOrderAdapter);
    connector = TestBed.inject(CheckoutReplenishmentOrderConnector);
  });

  it('should create', () => {
    expect(connector).toBeTruthy();
  });

  it('scheduleReplenishmentOrder should call adapter', () => {
    spyOn(adapter, 'scheduleReplenishmentOrder').and.returnValue(
      of(mockReplenishmentOrder)
    );
    let result;

    connector
      .scheduleReplenishmentOrder(
        'cartId',
        mockReplenishmentOrderFormData,
        true,
        'userId'
      )
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockReplenishmentOrder);
    expect(adapter.scheduleReplenishmentOrder).toHaveBeenCalledWith(
      'cartId',
      mockReplenishmentOrderFormData,
      true,
      'userId'
    );
  });
});
