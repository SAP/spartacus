import { createSelector, MemoizedSelector } from '@ngrx/store';
import { EntitiesModel } from '../../../model/misc.model';
import { OrderApproval } from '../../../model/order-approval.model';
import { entityLoaderStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { B2BSearchConfig } from '../../model/search-config';
import { denormalizeB2BSearch } from '../../utils/serializer';
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
  EntityLoaderState<OrderApproval>
> = createSelector(
  getOrderApprovalManagementState,
  (state: OrderApprovalManagement) => state && state.entities
);

export const getOrderApproval = (
  orderApprovalCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<OrderApproval>> =>
  createSelector(
    getOrderApprovalsState,
    (state: EntityLoaderState<OrderApproval>) =>
      entityLoaderStateSelector(state, orderApprovalCode)
  );

export const getOrderApprovalList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<OrderApproval>>
> =>
  createSelector(
    getOrderApprovalManagementState,
    (state: OrderApprovalManagement) =>
      denormalizeB2BSearch<OrderApproval>(state, params)
  );
