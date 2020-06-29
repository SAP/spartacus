import { TestBed } from '@angular/core/testing';
import { OrderApprovalDetailService } from './order-approval-detail.service';

describe('OrderApprovalDetailService', () => {
  let service: OrderApprovalDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderApprovalDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
