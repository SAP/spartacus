import {
  createSelector,
  MemoizedSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { EntitiesModel, SearchConfig, StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/order-approval.model';
import {
  OrderApprovalManagement,
  ORDER_APPROVAL_FEATURE,
  OrderHistoryState,
} from '../order-approval-state';

export const getOrderApprovalState: MemoizedSelector<
  OrderHistoryState,
  OrderHistoryState
> = createFeatureSelector<OrderHistoryState>(ORDER_APPROVAL_FEATURE);

export const getOrderApprovalManagementState: MemoizedSelector<
  OrderHistoryState,
  OrderApprovalManagement
> = createSelector(
  getOrderApprovalState,
  (state: OrderHistoryState) => state[ORDER_APPROVAL_FEATURE]
);

export const getOrderApprovalsState: MemoizedSelector<
  OrderHistoryState,
  StateUtils.EntityLoaderState<OrderApproval>
> = createSelector(
  getOrderApprovalManagementState,
  (state: OrderApprovalManagement) => state && state.entities
);

export const getOrderApproval = (
  orderApprovalCode: string
): MemoizedSelector<
  OrderHistoryState,
  StateUtils.LoaderState<OrderApproval>
> =>
  createSelector(
    getOrderApprovalsState,
    (state: StateUtils.EntityLoaderState<OrderApproval>) =>
      StateUtils.entityLoaderStateSelector(state, orderApprovalCode)
  );

export const getOrderApprovalList = (
  params: SearchConfig
): MemoizedSelector<
  OrderHistoryState,
  StateUtils.LoaderState<EntitiesModel<OrderApproval>>
> =>
  createSelector(
    getOrderApprovalManagementState,
    (state: OrderApprovalManagement) =>
      StateUtils.denormalizeSearch<OrderApproval>(state, params)
  );
