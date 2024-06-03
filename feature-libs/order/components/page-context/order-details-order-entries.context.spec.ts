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

class MockOrderHistoryFacade implements Partial<OrderHistoryFacade> {
  getOrderDetails = createSpy().and.returnValue(of({ entries: mockEntries }));
}

describe('OrderDetailsOrderEntriesContext', () => {
  let service: OrderDetailsOrderEntriesContext;
  let orderHistoryFacade: OrderHistoryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useClass: MockOrderHistoryFacade, provide: OrderHistoryFacade },
      ],
    });
    service = TestBed.inject(OrderDetailsOrderEntriesContext);
    orderHistoryFacade = TestBed.inject(OrderHistoryFacade);
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

      expect(orderHistoryFacade.getOrderDetails).toHaveBeenCalledWith();
      expect(entries).toEqual(mockEntries);
    });
  });
});
