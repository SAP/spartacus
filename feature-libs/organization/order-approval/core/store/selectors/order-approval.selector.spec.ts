import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/order-approval.model';
import { OrderApprovalActions } from '../actions/index';
import {
  OrderApprovalManagement,
  ORDER_APPROVAL_FEATURE,
  OrderApprovalState,
} from '../order-approval-state';
import * as fromReducers from '../reducers/index';
import { OrderApprovalSelectors } from './index';

describe('OrderApproval Selectors', () => {
  let store: Store<OrderApprovalState>;

  const code = 'testCode';
  const orderApproval: OrderApproval = {
    code,
  };
  const orderApproval2: OrderApproval = {
    code: 'testCode2',
  };

  const entities = {
    testCode: {
      loading: false,
      error: false,
      success: true,
      value: orderApproval,
    },
    testCode2: {
      loading: false,
      error: false,
      success: true,
      value: orderApproval2,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORDER_APPROVAL_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrderApprovalManagementState ', () => {
    it('should return orderApprovals state', () => {
      let result: OrderApprovalManagement;
      store
        .pipe(select(OrderApprovalSelectors.getOrderApprovalManagementState))
        .subscribe((value) => (result = value));

      store.dispatch(
        new OrderApprovalActions.LoadOrderApprovalSuccess([
          orderApproval,
          orderApproval2,
        ])
      );
      expect(result).toEqual({
        entities: { entities },
        list: { entities: {} },
      });
    });
  });

  describe('getOrderApprovals', () => {
    it('should return orderApprovals', () => {
      let result: StateUtils.EntityLoaderState<OrderApproval>;
      store
        .pipe(select(OrderApprovalSelectors.getOrderApprovalsState))
        .subscribe((value) => (result = value));

      store.dispatch(
        new OrderApprovalActions.LoadOrderApprovalSuccess([
          orderApproval,
          orderApproval2,
        ])
      );
      expect(result).toEqual({ entities });
    });
  });

  describe('getOrderApproval', () => {
    it('should return orderApproval by id', () => {
      let result: StateUtils.LoaderState<OrderApproval>;
      store
        .pipe(select(OrderApprovalSelectors.getOrderApproval(code)))
        .subscribe((value) => (result = value));

      store.dispatch(
        new OrderApprovalActions.LoadOrderApprovalSuccess([
          orderApproval,
          orderApproval2,
        ])
      );
      expect(result).toEqual(entities.testCode);
    });
  });
});
