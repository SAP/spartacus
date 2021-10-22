import { TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/core';
import { of } from 'rxjs';
import { OrderDetailsExportContextService } from './order-details-export-context.service';
import { OrderFacade } from '../facade/order.facade';
import createSpy = jasmine.createSpy;

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

class MockUserOrderService implements Partial<OrderFacade> {
  getOrderDetails = createSpy().and.returnValue(of({ entries: mockEntries }));
}

describe('OrderDetailsExportContextService', () => {
  let service: OrderDetailsExportContextService;
  let userOrderService: OrderFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ useClass: MockUserOrderService, provide: OrderFacade }],
    });
    service = TestBed.inject(OrderDetailsExportContextService);
    userOrderService = TestBed.inject(OrderFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEntries', () => {
    it('getEntries from order details', () => {
      let entries: OrderEntry[];
      service
        .getEntries()
        .subscribe((result) => {
          entries = result;
        })
        .unsubscribe();

      expect(userOrderService.getOrderDetails).toHaveBeenCalledWith();
      expect(entries).toEqual(mockEntries);
    });
  });
});
