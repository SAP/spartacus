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
  OrderApprovalState,
} from '../order-approval-state';

export const getOrderApprovalState: MemoizedSelector<
  OrderApprovalState,
  OrderApprovalState
> = createFeatureSelector<OrderApprovalState>(ORDER_APPROVAL_FEATURE);

export const getOrderApprovalManagementState: MemoizedSelector<
  OrderApprovalState,
  OrderApprovalManagement
> = createSelector(
  getOrderApprovalState,
  (state: OrderApprovalState) => state[ORDER_APPROVAL_FEATURE]
);

export const getOrderApprovalsState: MemoizedSelector<
  OrderApprovalState,
  StateUtils.EntityLoaderState<OrderApproval>
> = createSelector(
  getOrderApprovalManagementState,
  (state: OrderApprovalManagement) => state && state.entities
);

export const getOrderApproval = (
  orderApprovalCode: string
): MemoizedSelector<
  OrderApprovalState,
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
  OrderApprovalState,
  StateUtils.LoaderState<EntitiesModel<OrderApproval>>
> =>
  createSelector(
    getOrderApprovalManagementState,
    (state: OrderApprovalManagement) =>
      StateUtils.denormalizeSearch<OrderApproval>(state, params)
  );
