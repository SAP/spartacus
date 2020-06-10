import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthService,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '@spartacus/core';
import { of } from 'rxjs';
import { EntitiesModel } from '../../model/misc.model';
import {
  OrderApprovalDecision,
  OrderApproval,
} from '../../model/order-approval.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
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
  decision: 'APPROVE',
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
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
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
  });
});
