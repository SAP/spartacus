import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  EntitiesModel,
  ProcessModule,
  SearchConfig,
  UserIdService,
} from '@spartacus/core';
import {
  OrderApproval,
  OrderApprovalDecision,
  OrderApprovalDecisionValue,
} from '../model/order-approval.model';
import { OrderApprovalActions } from '../store/actions/index';
import {
  OrderApprovalState,
  ORDER_APPROVAL_FEATURE,
} from '../store/order-approval-state';
import * as fromReducers from '../store/reducers/index';
import { OrderApprovalService } from './order-approval.service';

import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

const userId = 'current';
const orderApprovalCode = 'testOrderApproval';
const orderApproval = { code: orderApprovalCode };
const orderApproval2 = { code: 'testOrderApproval2' };
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const orderApprovalList: EntitiesModel<OrderApproval> = {
  values: [orderApproval, orderApproval2],
  pagination,
  sorts,
};
const orderApprovalDecision: OrderApprovalDecision = {
  decision: OrderApprovalDecisionValue.APPROVE,
  comment: 'yeah',
};

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.callFake(() => {
    return of(userId);
  });
}

describe('OrderApprovalService', () => {
  let service: OrderApprovalService;
  let userIdService: UserIdService;
  let store: Store<OrderApprovalState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORDER_APPROVAL_FEATURE,
          fromReducers.getReducers()
        ),
        ProcessModule.forRoot(),
      ],
      providers: [
        OrderApprovalService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(OrderApprovalService);
    userIdService = TestBed.inject(UserIdService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should OrderApprovalService is injected', inject(
    [OrderApprovalService],
    (orderApprovalService: OrderApprovalService) => {
      expect(orderApprovalService).toBeTruthy();
    }
  ));

  describe('get orderApproval', () => {
    it('get() should trigger load orderApproval details when they are not present in the store', () => {
      let orderApprovalDetails: OrderApproval;
      service
        .get(orderApprovalCode)
        .subscribe((data) => {
          orderApprovalDetails = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(orderApprovalDetails).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderApprovalActions.LoadOrderApproval({
          userId,
          orderApprovalCode,
        })
      );
    });

    it('get() should be able to get orderApproval details when they are present in the store', () => {
      store.dispatch(
        new OrderApprovalActions.LoadOrderApprovalSuccess([
          orderApproval,
          orderApproval2,
        ])
      );
      let orderApprovalDetails: OrderApproval;
      service
        .get(orderApprovalCode)
        .subscribe((data) => {
          orderApprovalDetails = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(orderApprovalDetails).toEqual(orderApproval);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrderApprovalActions.LoadOrderApproval({
          userId,
          orderApprovalCode,
        })
      );
    });
  });

  describe('get order approval loading state', () => {
    it('getOrderApprovalLoading() should return true when order approval is loading.', () => {
      let result = true;
      service
        .getOrderApprovalLoading(orderApprovalCode)
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(false);

      store.dispatch(
        new OrderApprovalActions.LoadOrderApproval({
          userId,
          orderApprovalCode,
        })
      );

      service
        .getOrderApprovalLoading(orderApprovalCode)
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('get orderApprovals', () => {
    const params: SearchConfig = { sort: 'code' };

    it('getList() should trigger load orderApprovals when they are not present in the store', () => {
      let orderApprovals: EntitiesModel<OrderApproval>;
      service
        .getList(params)
        .subscribe((data) => {
          orderApprovals = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(orderApprovals).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderApprovalActions.LoadOrderApprovals({ userId, params })
      );
    });

    it('getList() should be able to get orderApprovals when they are present in the store', () => {
      store.dispatch(
        new OrderApprovalActions.LoadOrderApprovalSuccess([
          orderApproval,
          orderApproval2,
        ])
      );
      store.dispatch(
        new OrderApprovalActions.LoadOrderApprovalsSuccess({
          params,
          page: {
            ids: [orderApproval.code, orderApproval2.code],
            pagination,
            sorts,
          },
        })
      );
      let orderApprovals: EntitiesModel<OrderApproval>;
      service
        .getList(params)
        .subscribe((data) => {
          orderApprovals = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(orderApprovals).toEqual(orderApprovalList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrderApprovalActions.LoadOrderApprovals({ userId, params })
      );
    });
  });

  describe('make decision', () => {
    it('update() should should dispatch MakeDecision action', () => {
      service.makeDecision(orderApprovalCode, orderApprovalDecision);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderApprovalActions.MakeDecision({
          userId,
          orderApprovalCode,
          orderApprovalDecision,
        })
      );
    });

    it('should getMakeDecisionResultLoading() return loading flag', () => {
      store.dispatch(
        new OrderApprovalActions.MakeDecision({
          userId,
          orderApprovalCode,
          orderApprovalDecision,
        })
      );

      let result = false;
      service
        .getMakeDecisionResultLoading()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getMakeDecisionResultError() return the error flag', () => {
      store.dispatch(
        new OrderApprovalActions.MakeDecisionFail({
          orderApprovalCode,
          error: 'error',
        })
      );

      let result = false;
      service
        .getMakeDecisionResultError()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getMakeDecisionResultSuccess() return the success flag', () => {
      store.dispatch(
        new OrderApprovalActions.MakeDecisionSuccess({
          orderApprovalCode,
          orderApprovalDecision,
        })
      );

      let result = false;
      service
        .getMakeDecisionResultSuccess()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should resetMakeDecisionProcessState() dispatch an MakeDecisionReset action', () => {
      service.resetMakeDecisionProcessState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrderApprovalActions.MakeDecisionReset()
      );
    });
  });
});
