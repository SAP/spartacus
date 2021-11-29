import { TestBed } from '@angular/core/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderConfirmationOrderDetailsContext } from './order-confirmation-order-details-context';
import createSpy = jasmine.createSpy;

const mockOrder: Order = { code: 'testOrder' };

class MockUserOrderService implements Partial<CheckoutFacade> {
  getOrderDetails = createSpy().and.returnValue(of(mockOrder));
}

describe('OrderConfirmationOrderDetailsContext', () => {
  let service: OrderConfirmationOrderDetailsContext;
  let userOrderService: CheckoutFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ useClass: MockUserOrderService, provide: CheckoutFacade }],
    });
    service = TestBed.inject(OrderConfirmationOrderDetailsContext);
    userOrderService = TestBed.inject(CheckoutFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrderDetails', () => {
    it('should be able to order details', () => {
      let order: Order;
      service
        .getOrderDetails()
        .subscribe((result) => {
          order = result;
        })
        .unsubscribe();

      expect(userOrderService.getOrderDetails).toHaveBeenCalledWith();
      expect(order).toEqual(mockOrder);
    });
  });
});
