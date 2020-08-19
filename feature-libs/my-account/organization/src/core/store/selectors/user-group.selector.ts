import { createSelector, MemoizedSelector } from '@ngrx/store';
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
  StateUtils,
  EntitiesModel,
  Permission,
  B2BUser,
} from '@spartacus/core';
import { B2BSearchConfig } from '../../model/search-config';
import { getPermissionsState } from './permission.selector';
import { getB2BUsersState } from './b2b-user.selector';
import { UserGroup } from '../../model/user-group.model';

export const getUserGroupManagementState: MemoizedSelector<
  StateWithOrganization,
  UserGroupManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[USER_GROUP_FEATURE]
);

export const getUserGroupsState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<UserGroup>
> = createSelector(
  getUserGroupManagementState,
  (state: UserGroupManagement) => state && state.entities
);

export const getUserGroup = (
  userGroupId: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<UserGroup>> =>
  createSelector(
    getUserGroupsState,
    (state: StateUtils.EntityLoaderState<UserGroup>) =>
      StateUtils.entityLoaderStateSelector(state, userGroupId)
  );

export const getUserGroupList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<UserGroup>>
> =>
  createSelector(getUserGroupManagementState, (state: UserGroupManagement) =>
    denormalizeB2BSearch<UserGroup>(state, params)
  );

export const getAvailableOrgCustomers = (
  code: string,
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<B2BUser>>
> =>
  createSelector(
    getUserGroupManagementState,
    getB2BUsersState,
    (
      state: UserGroupManagement,
      customers: StateUtils.EntityLoaderState<B2BUser>
    ) => denormalizeCustomB2BSearch(state.customers, customers, params, code)
  );

export const getAvailableOrderApprovalPermissions = (
  code: string,
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<Permission>>
> =>
  createSelector(
    getUserGroupManagementState,
    getPermissionsState,
    (
      state: UserGroupManagement,
      permissions: StateUtils.EntityLoaderState<Permission>
    ) =>
      denormalizeCustomB2BSearch(state.permissions, permissions, params, code)
  );
