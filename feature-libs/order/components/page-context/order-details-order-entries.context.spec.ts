import { TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/cart/base/root';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderDetailsOrderEntriesContext } from './order-details-order-entries.context';
import createSpy = jasmine.createSpy;

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

class MockUserOrderService implements Partial<OrderHistoryFacade> {
  getOrderDetails = createSpy().and.returnValue(of({ entries: mockEntries }));
}

describe('OrderDetailsOrderEntriesContext', () => {
  let service: OrderDetailsOrderEntriesContext;
  let userOrderService: OrderHistoryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useClass: MockUserOrderService, provide: OrderHistoryFacade },
      ],
    });
    service = TestBed.inject(OrderDetailsOrderEntriesContext);
    userOrderService = TestBed.inject(OrderHistoryFacade);
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
