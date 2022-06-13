import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ScheduledReplenishmentOrderAdapter } from './scheduled-replenishment-order.adapter';
import { ScheduledReplenishmentOrderConnector } from './scheduled-replenishment-order.connector';
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

class MockScheduledReplenishmentOrderAdapter
  implements ScheduledReplenishmentOrderAdapter
{
  scheduleReplenishmentOrder = createSpy().and.returnValue(of({}));
}

describe('Scheduled Replenishment Order Connector', () => {
  let adapter: ScheduledReplenishmentOrderAdapter;
  let connector: ScheduledReplenishmentOrderConnector;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          ScheduledReplenishmentOrderConnector,
          {
            provide: ScheduledReplenishmentOrderAdapter,
            useClass: MockScheduledReplenishmentOrderAdapter,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    adapter = TestBed.inject(ScheduledReplenishmentOrderAdapter);
    connector = TestBed.inject(ScheduledReplenishmentOrderConnector);
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
