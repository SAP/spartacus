import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderDetailsService } from '../../order-details';
import { OccOrderHistoryAdapter } from '../../../occ/adapters';
import { of } from 'rxjs';
import {
  mockReturnRequestList,
  mock_orderDetails_1,
  mock_orderDetails_2,
  mock_orderHistoryList,
  mock_order_with_details,
  mock_order_with_details_2,
  mock_order_with_details_and_returns,
} from './unit-test-mock-data';
import { OrderHistoryEnhancedUIAdapter } from './order-history-enhanced-ui.adapter';
import createSpy = jasmine.createSpy;

class MockOrderDetailsService implements Partial<OrderDetailsService> {
  getGroupedConsignments = createSpy();
  getUnconsignedEntries = createSpy();
}

describe('OrderHistoryEnhancedUIAdapter', () => {
  let service: OrderHistoryEnhancedUIAdapter;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
      ],
    });
    service = TestBed.inject(OrderHistoryEnhancedUIAdapter);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('loadEnhancedUIOrderHistory', (done) => {
    spyOn(service, 'load')
      .withArgs('current', '0005000003')
      .and.returnValue(of(mock_orderDetails_1))
      .withArgs('current', '0005000005')
      .and.returnValue(of(mock_orderDetails_2));
    spyOn(OccOrderHistoryAdapter.prototype, 'loadHistory').and.returnValue(
      of(mock_orderHistoryList)
    );
    service.loadEnhancedUIOrderHistory('current').subscribe((response) => {
      expect(response).toEqual(mock_order_with_details_2);
    });
    done();
  });
  it('loadOrdersAndReturnsList', (done) => {
    service.loadEnhancedUIOrderHistory = createSpy().and.returnValue(
      of(mock_order_with_details)
    );
    spyOn(service, 'loadReturnRequestList').and.returnValue(
      of(mockReturnRequestList)
    );
    service.loadOrdersAndReturnsList('current').subscribe((response) => {
      expect(service.loadEnhancedUIOrderHistory).toHaveBeenCalled();
      expect(service.loadReturnRequestList).toHaveBeenCalled();
      expect(response).toEqual([
        mock_order_with_details,
        mockReturnRequestList,
      ]);
    });
    done();
  });
  it('loadHistory', (done) => {
    service.loadOrdersAndReturnsList = createSpy().and.returnValue(
      of([mock_order_with_details, mockReturnRequestList])
    );
    service.loadHistory('current').subscribe((response) => {
      expect(response).toEqual(mock_order_with_details_and_returns);
    });
    done();
  });
});
