import { TestBed } from '@angular/core/testing';
import { Order, RoutingService } from '@spartacus/core';
import { OrderApproval } from '../../core/model/order-approval.model';
import { OrderApprovalService } from '../../core/services/order-approval.service';
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

const mockRouterState = {
  state: {
    params: {
      approvalCode,
    },
  },
};
class MockRoutingService {
  getRouterState() {
    return of(mockRouterState);
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
    service
      .getOrderDetails()
      .subscribe((value) => (order = value))
      .unsubscribe();
    expect(order).toBeTruthy();
    expect(order).toEqual(mockOrder);
  });

  it('should provide the order approval data', () => {
    let orderApproval: OrderApproval;
    service
      .getOrderApproval()
      .subscribe((value) => (orderApproval = value))
      .unsubscribe();
    expect(orderApproval).toBeTruthy();
    expect(orderApproval).toEqual(mockOrderApproval);
  });

  it('should provide the order approval code', () => {
    let approvalCodeReturned: string;
    service
      .getOrderApprovalCodeFromRoute()
      .subscribe((value) => (approvalCodeReturned = value))
      .unsubscribe();
    expect(approvalCodeReturned).toBeTruthy();
    expect(approvalCodeReturned).toEqual(
      mockRouterState.state.params.approvalCode
    );
  });
});
