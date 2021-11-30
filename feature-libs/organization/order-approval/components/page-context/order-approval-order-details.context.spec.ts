import { TestBed } from '@angular/core/testing';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderApprovalDetailService } from '../details/order-approval-detail.service';
import { OrderApprovalOrderDetailsContext } from './order-approval-order-details.context';
import createSpy = jasmine.createSpy;

const mockOrder = { code: 'testOrder' };

class MocOrderDetailsService {
  getOrderDetails = createSpy().and.returnValue(of(mockOrder));
}

describe('OrderApprovalOrderDetailsContext', () => {
  let service: OrderApprovalOrderDetailsContext;
  let orderApprovalDetailService: OrderApprovalDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useClass: MocOrderDetailsService,
          provide: OrderApprovalDetailService,
        },
      ],
    });
    service = TestBed.inject(OrderApprovalOrderDetailsContext);
    orderApprovalDetailService = TestBed.inject(OrderApprovalDetailService);
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

      expect(orderApprovalDetailService.getOrderDetails).toHaveBeenCalledWith();
      expect(order).toEqual(mockOrder);
    });
  });
});
