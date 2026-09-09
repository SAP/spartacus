import { TestBed } from '@angular/core/testing';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { firstValueFrom, of } from 'rxjs';
import { ScheduledReplenishmentOrderAdapter } from './scheduled-replenishment-order.adapter';
import { ScheduledReplenishmentOrderConnector } from './scheduled-replenishment-order.connector';

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
  scheduleReplenishmentOrder = vi.fn().mockReturnValue(of({}));
}

describe('Scheduled Replenishment Order Connector', () => {
  let adapter: ScheduledReplenishmentOrderAdapter;
  let connector: ScheduledReplenishmentOrderConnector;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ScheduledReplenishmentOrderConnector,
        {
          provide: ScheduledReplenishmentOrderAdapter,
          useClass: MockScheduledReplenishmentOrderAdapter,
        },
      ],
    });
  });

  beforeEach(() => {
    adapter = TestBed.inject(ScheduledReplenishmentOrderAdapter);
    connector = TestBed.inject(ScheduledReplenishmentOrderConnector);
  });

  it('should create', () => {
    expect(connector).toBeTruthy();
  });

  it('scheduleReplenishmentOrder should call adapter', async () => {
    adapter.scheduleReplenishmentOrder = vi
      .fn()
      .mockReturnValue(of(mockReplenishmentOrder));

    const result = await firstValueFrom(
      connector.scheduleReplenishmentOrder(
        'cartId',
        mockReplenishmentOrderFormData,
        true,
        'userId'
      )
    );
    expect(adapter.scheduleReplenishmentOrder).toHaveBeenCalledWith(
      'cartId',
      mockReplenishmentOrderFormData,
      true,
      'userId'
    );
    expect(result).toEqual(mockReplenishmentOrder);
  });
});
