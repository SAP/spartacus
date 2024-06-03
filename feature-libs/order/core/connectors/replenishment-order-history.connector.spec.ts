import { TestBed } from '@angular/core/testing';
import {
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '@spartacus/order/root';
import { Observable, of } from 'rxjs';
import { ReplenishmentOrderHistoryAdapter } from './replenishment-order-history.adapter';
import { ReplenishmentOrderHistoryConnector } from './replenishment-order-history.connector';

const userId = 'test-user-id';
const replenishmentCode = 'test-order-id';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

const mockOrderHistoryList: OrderHistoryList = {
  orders: [
    {
      code: 'test-order-code',
    },
  ],
  pagination: {},
  sorts: [],
};

class MockReplenishmentOrderHistoryAdapter
  implements Partial<ReplenishmentOrderHistoryAdapter>
{
  load(
    _userId: string,
    _replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }

  loadReplenishmentDetailsHistory(
    _userId: string,
    _replenishmentOrderCode: string,
    _pageSize?: number,
    _currentPage?: number,
    _sort?: string
  ): Observable<OrderHistoryList> {
    return of({});
  }

  cancelReplenishmentOrder(
    _userId: string,
    _replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }

  loadHistory(_userId: string): Observable<ReplenishmentOrderList> {
    return of({});
  }
}

describe('ReplenishmentOrderHistoryConnector', () => {
  let adapter: ReplenishmentOrderHistoryAdapter;
  let connector: ReplenishmentOrderHistoryConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReplenishmentOrderHistoryConnector,
        {
          provide: ReplenishmentOrderHistoryAdapter,
          useClass: MockReplenishmentOrderHistoryAdapter,
        },
      ],
    });

    adapter = TestBed.inject(ReplenishmentOrderHistoryAdapter);
    connector = TestBed.inject(ReplenishmentOrderHistoryConnector);
  });

  it('should create', () => {
    expect(connector).toBeTruthy();
  });

  it('load should call adapter', () => {
    spyOn(adapter, 'load').and.returnValue(of(mockReplenishmentOrder));

    let result: ReplenishmentOrder;

    connector
      .load(userId, replenishmentCode)
      .subscribe((res) => (result = res))
      .unsubscribe();

    expect(result).toBe(mockReplenishmentOrder);
    expect(adapter.load).toHaveBeenCalledWith(userId, replenishmentCode);
  });

  it('loadReplenishmentDetailsHistory should call adapter', () => {
    spyOn(adapter, 'loadReplenishmentDetailsHistory').and.returnValue(
      of(mockOrderHistoryList)
    );

    let result: OrderHistoryList;

    connector
      .loadReplenishmentDetailsHistory(userId, replenishmentCode)
      .subscribe((res) => (result = res))
      .unsubscribe();

    expect(result).toBe(mockOrderHistoryList);
    expect(adapter.loadReplenishmentDetailsHistory).toHaveBeenCalledWith(
      userId,
      replenishmentCode,
      undefined,
      undefined,
      undefined
    );
  });

  it('cancelReplenishmentOrder should call adapter', () => {
    spyOn(adapter, 'cancelReplenishmentOrder').and.returnValue(
      of(mockReplenishmentOrder)
    );

    let result: ReplenishmentOrder;

    connector
      .cancelReplenishmentOrder(userId, replenishmentCode)
      .subscribe((res) => (result = res))
      .unsubscribe();

    expect(result).toBe(mockReplenishmentOrder);
    expect(adapter.cancelReplenishmentOrder).toHaveBeenCalledWith(
      userId,
      replenishmentCode
    );
  });

  it('loadHistory should call adapter', () => {
    spyOn(adapter, 'loadHistory').and.returnValue(of(mockOrderHistoryList));
    let result: ReplenishmentOrderList;
    connector
      .loadHistory('user3')
      .subscribe((res) => (result = res))
      .unsubscribe();
    expect(result).toBe(mockOrderHistoryList);
    expect(adapter.loadHistory).toHaveBeenCalledWith(
      'user3',
      undefined,
      undefined,
      undefined
    );
  });
});
