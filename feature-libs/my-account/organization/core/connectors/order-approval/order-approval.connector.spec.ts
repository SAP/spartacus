import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import {
  OrderApprovalDecision,
  OrderApprovalDecisionValue,
} from '../../model/order-approval.model';
import { B2BSearchConfig } from '../../model/search-config';
import { OrderApprovalAdapter } from './order-approval.adapter';
import { OrderApprovalConnector } from './order-approval.connector';
import createSpy = jasmine.createSpy;

const userId = 'userId';
const orderApprovalCode = 'orderApprovalCode';

const orderApproval = {
  code: orderApprovalCode,
};

const orderApprvalDecision: OrderApprovalDecision = {
  decision: OrderApprovalDecisionValue.APPROVE,
  comment: 'yeah',
};

class MockOrderApprovalAdapter implements OrderApprovalAdapter {
  load = createSpy('OrderApprovalAdapter.load').and.returnValue(
    of(orderApproval)
  );
  loadList = createSpy('OrderApprovalAdapter.loadList').and.returnValue(
    of([orderApproval])
  );
  makeDecision = createSpy('OrderApprovalAdapter.makeDecision').and.returnValue(
    of(orderApprvalDecision)
  );
}

describe('OrderApprovalConnector', () => {
  let service: OrderApprovalConnector;
  let adapter: OrderApprovalAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderApprovalConnector,
        { provide: OrderApprovalAdapter, useClass: MockOrderApprovalAdapter },
      ],
    });

    service = TestBed.inject(OrderApprovalConnector);
    adapter = TestBed.inject(OrderApprovalAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load orderApproval', () => {
    service.get(userId, orderApprovalCode);
    expect(adapter.load).toHaveBeenCalledWith(userId, orderApprovalCode);
  });

  it('should load orderApprovals', () => {
    const params: B2BSearchConfig = { sort: 'code' };
    service.getList(userId, params);
    expect(adapter.loadList).toHaveBeenCalledWith(userId, params);
  });

  it('should make decision', () => {
    service.makeDecision(userId, orderApprovalCode, orderApprvalDecision);
    expect(adapter.makeDecision).toHaveBeenCalledWith(
      userId,
      orderApprovalCode,
      orderApprvalDecision
    );
  });
});
