import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import {
  AuthService,
  EntitiesModel,
  OrderApproval,
  OrderApprovalDecision,
  OrderApprovalDecisionValue,
  ProcessModule,
} from '@spartacus/core';
import {
  StateWithOrganization,
  ORGANIZATION_FEATURE,
} from '../store/organization-state';
import { B2BSearchConfig } from '../model/search-config';
import { OrderApprovalActions } from '../store/actions/index';
import * as fromReducers from '../store/reducers/index';
import { OrderApprovalService } from './order-approval.service';

import createSpy = jasmine.createSpy;

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

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

describe('OrderApprovalService', () => {
  let service: OrderApprovalService;
  let authService: AuthService;
  let store: Store<StateWithOrganization>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
        ProcessModule.forRoot(),
      ],
      providers: [
        OrderApprovalService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    service = TestBed.get(OrderApprovalService as Type<OrderApprovalService>);
    authService = TestBed.get(AuthService as Type<AuthService>);
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

      expect(authService.getOccUserId).toHaveBeenCalled();
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

      expect(authService.getOccUserId).not.toHaveBeenCalled();
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
    const params: B2BSearchConfig = { sort: 'code' };

    it('getList() should trigger load orderApprovals when they are not present in the store', () => {
      let orderApprovals: EntitiesModel<OrderApproval>;
      service
        .getList(params)
        .subscribe((data) => {
          orderApprovals = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
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

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(orderApprovals).toEqual(orderApprovalList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrderApprovalActions.LoadOrderApprovals({ userId, params })
      );
    });
  });

  describe('make decision', () => {
    it('update() should should dispatch MakeDecision action', () => {
      service.makeDecision(orderApprovalCode, orderApprovalDecision);

      expect(authService.getOccUserId).toHaveBeenCalled();
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
