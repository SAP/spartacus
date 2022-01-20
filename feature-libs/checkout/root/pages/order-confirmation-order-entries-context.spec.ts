import { TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutFacade } from '../facade/checkout.facade';
import { OrderConfirmationOrderEntriesContext } from './order-confirmation-order-entries-context';
import createSpy = jasmine.createSpy;

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

class MockUserOrderService implements Partial<CheckoutFacade> {
  getOrderDetails = createSpy().and.returnValue(of({ entries: mockEntries }));
}

describe('OrderConfirmationOrderEntriesContext', () => {
  let service: OrderConfirmationOrderEntriesContext;
  let userOrderService: CheckoutFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ useClass: MockUserOrderService, provide: CheckoutFacade }],
    });
    service = TestBed.inject(OrderConfirmationOrderEntriesContext);
    userOrderService = TestBed.inject(CheckoutFacade);
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
