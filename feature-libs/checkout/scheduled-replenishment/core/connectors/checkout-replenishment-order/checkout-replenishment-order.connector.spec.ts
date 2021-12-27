import { TestBed, waitForAsync } from '@angular/core/testing';
import { ScheduleReplenishmentForm } from '@spartacus/checkout/scheduled-replenishment/root';
import { ReplenishmentOrder } from '@spartacus/order/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutReplenishmentOrderAdapter } from './checkout-replenishment-order.adapter';
import { CheckoutReplenishmentOrderConnector } from './checkout-replenishment-order.connector';
import createSpy = jasmine.createSpy;

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
  scheduleReplenishmentOrder = createSpy().and.returnValue(of({}));
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

  it('scheduleReplenishmentOrder should call adapter', (done) => {
    adapter.scheduleReplenishmentOrder = createSpy().and.returnValue(
      of(mockReplenishmentOrder)
    );

    connector
      .scheduleReplenishmentOrder(
        'cartId',
        mockReplenishmentOrderFormData,
        true,
        'userId'
      )
      .pipe(take(1))
      .subscribe((result) => {
        expect(adapter.scheduleReplenishmentOrder).toHaveBeenCalledWith(
          'cartId',
          mockReplenishmentOrderFormData,
          true,
          'userId'
        );
        expect(result).toEqual(mockReplenishmentOrder);
        done();
      });
  });
});
