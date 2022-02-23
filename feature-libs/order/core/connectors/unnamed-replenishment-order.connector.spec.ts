import { TestBed, waitForAsync } from '@angular/core/testing';
import { ScheduleReplenishmentForm } from '@spartacus/checkout/scheduled-replenishment/root';
import { ReplenishmentOrder } from '@spartacus/order/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UnnamedReplenishmentOrderAdapter } from './unnamed-replenishment-order.adapter';
import { UnnamedReplenishmentOrderConnector } from './unnamed-replenishment-order.connector';
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

class MockUnnamedReplenishmentOrderAdapter
  implements UnnamedReplenishmentOrderAdapter
{
  scheduleReplenishmentOrder = createSpy().and.returnValue(of({}));
}

describe('Unnamed Replenishment Order Connector', () => {
  let adapter: UnnamedReplenishmentOrderAdapter;
  let connector: UnnamedReplenishmentOrderConnector;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          UnnamedReplenishmentOrderConnector,
          {
            provide: UnnamedReplenishmentOrderAdapter,
            useClass: MockUnnamedReplenishmentOrderAdapter,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    adapter = TestBed.inject(UnnamedReplenishmentOrderAdapter);
    connector = TestBed.inject(UnnamedReplenishmentOrderConnector);
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
