import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderHistoryAdapter } from './order-history.adapter';
import { OrderHistoryConnector } from './order-history.connector';

class MockOrderHistoryAdapter implements OrderHistoryAdapter {
  load = vi
    .fn('OrderHistoryAdapter.load')
    .mockImplementation((userId, orderCode) =>
      of(`order-${userId}-${orderCode}`)
    );

  loadHistory = vi
    .fn('OrderHistoryAdapter.loadHistory')
    .mockImplementation((userId) => of(`orderHistory-${userId}`));

  getConsignmentTracking = vi
    .fn('OrderHistoryAdapter.getConsignmentTracking')
    .mockImplementation((orderCode, consignmentCode, userId) =>
      of(`consignmentTracking-${userId}-${orderCode}-${consignmentCode}`)
    );

  createReturnRequest = vi
    .fn('OrderHistoryAdapter.createReturnRequest')
    .mockImplementation((userId, {}) => of(`orderReturnRequest-${userId}`));

  loadReturnRequestList = vi
    .fn('OrderHistoryAdapter.loadReturnRequestList')
    .mockImplementation((userId) => of(`loadReturnRequestList-${userId}`));

  loadReturnRequestDetail = vi
    .fn('OrderHistoryAdapter.loadReturnRequestDetail')
    .mockImplementation((userId, returnRequestCode) =>
      of(`loadReturnRequestDetail-${userId}-${returnRequestCode}`)
    );

  cancel = vi
    .fn('OrderHistoryAdapter.cancel')
    .mockImplementation((userId, orderCode, {}) =>
      of(`cancel-${userId}-${orderCode}`)
    );

  cancelReturnRequest = vi
    .fn('OrderHistoryAdapter.cancelReturnRequest')
    .mockImplementation((userId, returnRequestCode, {}) =>
      of(`cancelReturnRequest-${userId}-${returnRequestCode}`)
    );
}

describe('OrderHistoryConnector', () => {
  let service: OrderHistoryConnector;
  let adapter: OrderHistoryAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderHistoryConnector,
        { provide: OrderHistoryAdapter, useClass: MockOrderHistoryAdapter },
      ],
    });

    service = TestBed.inject(OrderHistoryConnector);
    adapter = TestBed.inject(OrderHistoryAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should call adapter', () => {
    let result;
    service.get('user2', 'order2').subscribe((res) => (result = res));
    expect(result).toBe('order-user2-order2');
    expect(adapter.load).toHaveBeenCalledWith('user2', 'order2');
  });

  it('getHistory should call adapter', () => {
    let result;
    service.getHistory('user3').subscribe((res) => (result = res));
    expect(result).toBe('orderHistory-user3');
    expect(adapter.loadHistory).toHaveBeenCalledWith(
      'user3',
      undefined,
      undefined,
      undefined
    );
  });

  it('getConsignmentTracking should call adapter', () => {
    let result;
    service
      .getConsignmentTracking('orderCode', 'consignmentCode', 'userId')
      .subscribe((res) => (result = res));
    expect(result).toBe('consignmentTracking-userId-orderCode-consignmentCode');
    expect(adapter.getConsignmentTracking).toHaveBeenCalledWith(
      'orderCode',
      'consignmentCode',
      'userId'
    );
  });

  it('cancel should call adapter', () => {
    let result;
    service
      .cancel('userId', 'orderCode', {})
      .subscribe((res) => (result = res));
    expect(result).toBe('cancel-userId-orderCode');
    expect(adapter.cancel).toHaveBeenCalledWith('userId', 'orderCode', {});
  });

  it('return should call adapter', () => {
    let result;
    service.return('userId', {}).subscribe((res) => (result = res));
    expect(result).toBe('orderReturnRequest-userId');
    expect(adapter.createReturnRequest).toHaveBeenCalledWith('userId', {});
  });

  it('getReturnRequestList should call adapter', () => {
    let result;
    service.getReturnRequestList('userId').subscribe((res) => (result = res));
    expect(result).toBe('loadReturnRequestList-userId');
    expect(adapter.loadReturnRequestList).toHaveBeenCalledWith(
      'userId',
      undefined,
      undefined,
      undefined
    );
  });

  it('getReturnRequestDetail should call adapter', () => {
    let result;
    service
      .getReturnRequestDetail('userId', 'returnRequestCode')
      .subscribe((res) => (result = res));
    expect(result).toBe('loadReturnRequestDetail-userId-returnRequestCode');
    expect(adapter.loadReturnRequestDetail).toHaveBeenCalledWith(
      'userId',
      'returnRequestCode'
    );
  });

  it('cancelReturnRequest should call adapter', () => {
    let result;
    service
      .cancelReturnRequest('userId', 'returnRequestCode', {
        status: 'CANCELLING',
      })
      .subscribe((res) => (result = res));
    expect(result).toBe('cancelReturnRequest-userId-returnRequestCode');
    expect(adapter.cancelReturnRequest).toHaveBeenCalledWith(
      'userId',
      'returnRequestCode',
      { status: 'CANCELLING' }
    );
  });
});
