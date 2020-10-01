import { createSelector, MemoizedSelector } from '@ngrx/store';
import { EntitiesModel, SearchConfig, StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/order-approval.model';
import { denormalizeSearch } from '../../utils/serializer';
import {
  OrderApprovalManagement,
  ORDER_APPROVAL_FEATURE,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';

export const getOrderApprovalManagementState: MemoizedSelector<
  StateWithOrganization,
  OrderApprovalManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[ORDER_APPROVAL_FEATURE]
);

export const getOrderApprovalsState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<OrderApproval>
> = createSelector(
  getOrderApprovalManagementState,
  (state: OrderApprovalManagement) => state && state.entities
);

export const getOrderApproval = (
  orderApprovalCode: string
): MemoizedSelector<
  StateWithOrganization,
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
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<OrderApproval>>
> =>
  createSelector(
    getOrderApprovalManagementState,
    (state: OrderApprovalManagement) =>
      denormalizeSearch<OrderApproval>(state, params)
  );
