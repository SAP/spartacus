import { TestBed } from '@angular/core/testing';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderDetailsOrderDetailsContext } from './order-details-order-details.context';
import createSpy = jasmine.createSpy;

const mockOrder = { code: 'testReplenishmentOrder' };

class MocOrderDetailsService {
  getOrderDetails = createSpy().and.returnValue(of(mockOrder));
}

describe('OrderDetailsOrderDetailsContext', () => {
  let service: OrderDetailsOrderDetailsContext;
  let orderDetailsService: OrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OrderDetailsService,
          useClass: MocOrderDetailsService,
        },
      ],
    });
    service = TestBed.inject(OrderDetailsOrderDetailsContext);
    orderDetailsService = TestBed.inject(OrderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrderDetails', () => {
    it('should be able to get order', () => {
      let order: Order;
      service
        .getOrderDetails()
        .subscribe((result) => {
          order = result;
        })
        .unsubscribe();

      expect(orderDetailsService.getOrderDetails).toHaveBeenCalledWith();
      expect(order).toEqual(mockOrder);
    });
  });
});
