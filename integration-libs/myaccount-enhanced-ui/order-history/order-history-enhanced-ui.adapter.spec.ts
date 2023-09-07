import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderDetailsService } from '@spartacus/order/components';
import { OccOrderHistoryAdapter } from '@spartacus/order/occ';
import { of } from 'rxjs';
import {
  mockReturnRequestList,
  mock_order_with_details,
  mock_order_with_details_and_returns,
} from './mock-data';
import { OrderHistoryEnhancedUIAdapter } from './order-history-enhanced-ui.adapter';
import createSpy = jasmine.createSpy;

class MockOccOrderHistoryAdapter implements Partial<OccOrderHistoryAdapter> {
  loadReturnRequestList = createSpy();
  load = createSpy();
  loadHistory = createSpy();
}

class MockOrderDetailsService implements Partial<OrderDetailsService> {
  getGroupedConsignments = createSpy();
  getUnconsignedEntries = createSpy();
}

describe('OrderHistoryEnhancedUIAdapter', () => {
  let service: OrderHistoryEnhancedUIAdapter;
  //let occOrderHistoryAdapter: OccOrderHistoryAdapter;
  //   let orderDetailsService: OrderDetailsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        {
          provide: OccOrderHistoryAdapter,
          useClass: MockOccOrderHistoryAdapter,
        },
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
      ],
    });
    service = TestBed.inject(OrderHistoryEnhancedUIAdapter);
    //occOrderHistoryAdapter = TestBed.inject(OccOrderHistoryAdapter);
    // orderDetailsService = TestBed.inject(OrderDetailsService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('loadHistory()', () => {
    service.loadOrderAndReturnList = createSpy().and.returnValue(
      of([mock_order_with_details, mockReturnRequestList])
    );
    service.loadHistory('current').subscribe((response) => {
      expect(response).toEqual(mock_order_with_details_and_returns);
    });
  });
});
