import { TestBed } from '@angular/core/testing';
import {
  Order,
  OrderApproval,
  OrderApprovalService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderApprovalDetailService } from './order-approval-detail.service';

const mockOrder: Order = {
  code: '1',
  statusDisplay: 'orderDetails.statusDisplay context:Shipped',
} as Order;

const approvalCode = '000AP';

const mockOrderApproval = {
  approvalDecisionRequired: true,
  code: approvalCode,
  order: mockOrder,
} as OrderApproval;

class MockRoutingService {
  getRouterState() {
    return of({
      state: {
        params: {
          approvalCode,
        },
      },
    });
  }
}
class MockOrderApprovalService {
  loadOrderApproval(_orderApprovalCode: string): void {}
  get(_orderApprovalCode: string): Observable<OrderApproval> {
    return of(mockOrderApproval);
  }
}

describe('OrderApprovalDetailService', () => {
  let service: OrderApprovalDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrderApprovalService, useClass: MockOrderApprovalService },
      ],
    });
    service = TestBed.inject(OrderApprovalDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide the order data', () => {
    let order: Order;
    service.getOrderDetails().subscribe((value) => (order = value));
    expect(order).toBeTruthy();
    expect(order).toEqual(mockOrder);
  });
});
