import { createSelector, MemoizedSelector } from '@ngrx/store';
import { B2BSearchConfig } from '../../model/search-config';
import { denormalizeB2BSearch } from '../../utils/serializer';
import { StateUtils, EntitiesModel, OrderApproval } from '@spartacus/core';
import {
  OrganizationState,
  OrderApprovalManagement,
  ORDER_APPROVAL_FEATURE,
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
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<OrderApproval>>
> =>
  createSelector(
    getOrderApprovalManagementState,
    (state: OrderApprovalManagement) =>
      denormalizeB2BSearch<OrderApproval>(state, params)
  );
