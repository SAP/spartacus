import { TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/cart/base/root';
import { OrderFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderConfirmationOrderEntriesContext } from './order-confirmation-order-entries.context';
import createSpy = jasmine.createSpy;

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

class MockOrderFacade implements Partial<OrderFacade> {
  getOrderDetails = createSpy().and.returnValue(of({ entries: mockEntries }));
}

describe('OrderConfirmationOrderEntriesContext', () => {
  let service: OrderConfirmationOrderEntriesContext;
  let orderFacade: OrderFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ useClass: MockOrderFacade, provide: OrderFacade }],
    });
    service = TestBed.inject(OrderConfirmationOrderEntriesContext);
    orderFacade = TestBed.inject(OrderFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEntries', () => {
    it('getEntries from order details', () => {
      let entries: OrderEntry[] | undefined;
      service
        .getEntries()
        .subscribe((result) => {
          entries = result;
        })
        .unsubscribe();

      expect(orderFacade.getOrderDetails).toHaveBeenCalledWith();
      expect(entries).toEqual(mockEntries);
    });
  });
});
