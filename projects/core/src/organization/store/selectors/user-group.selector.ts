import { createSelector, MemoizedSelector } from '@ngrx/store';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  OrganizationState,
  StateWithOrganization,
  UserGroupManagement,
  USER_GROUP_FEATURE,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import {
  denormalizeB2BSearch,
  denormalizeCustomB2BSearch,
} from '../../utils/serializer';
import {
  OrgUnitUserGroup,
  EntitiesModel,
  Permission,
  B2BUser,
} from '../../../model';
import { B2BSearchConfig } from '../../model/search-config';
import { getPermissionsState } from './permission.selector';
import { getB2BUsersState } from './b2b-user.selector';

export const getUserGroupManagementState: MemoizedSelector<
  StateWithOrganization,
  UserGroupManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[USER_GROUP_FEATURE]
);

export const getUserGroupsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<OrgUnitUserGroup>
> = createSelector(
  getUserGroupManagementState,
  (state: UserGroupManagement) => state && state.entities
);

export const getUserGroupState = (
  orgUnitUserGroupUid: string
): MemoizedSelector<StateWithOrganization, LoaderState<OrgUnitUserGroup>> =>
  createSelector(
    getUserGroupsState,
    (state: EntityLoaderState<OrgUnitUserGroup>) =>
      entityStateSelector(state, orgUnitUserGroupUid)
  );

export const getUserGroupList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<OrgUnitUserGroup>>
> =>
  createSelector(getUserGroupManagementState, (state: UserGroupManagement) =>
    denormalizeB2BSearch<OrgUnitUserGroup>(state, params)
  );

export const getAvailableOrgCustomers = (
  code: string,
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<B2BUser>>
> =>
  createSelector(
    getUserGroupManagementState,
    getB2BUsersState,
    (state: UserGroupManagement, customers: EntityLoaderState<B2BUser>) =>
      denormalizeCustomB2BSearch(state.customers, customers, params, code)
  );

export const getAvailableOrderApprovalPermissions = (
  code: string,
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<Permission>>
> =>
  createSelector(
    getUserGroupManagementState,
    getPermissionsState,
    (state: UserGroupManagement, permissions: EntityLoaderState<Permission>) =>
      denormalizeCustomB2BSearch(state.permissions, permissions, params, code)
  );
