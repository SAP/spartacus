import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  B2BUser,
  EntitiesModel,
  SearchConfig,
  StateUtils,
} from '@spartacus/core';
import { Permission } from '../../model/permission.model';
import { UserGroup } from '../../model/user-group.model';
import {
  OrganizationState,
  StateWithOrganization,
  UserGroupManagement,
  USER_GROUP_FEATURE,
} from '../organization-state';
import { getB2BUsersState } from './b2b-user.selector';
import { getOrganizationState } from './feature.selector';
import { getPermissionsState } from './permission.selector';

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

export const getUserGroupValue = (
  userGroupId: string
): MemoizedSelector<StateWithOrganization, UserGroup> => {
  return createSelector(getUserGroup(userGroupId), (userGroupState) =>
    StateUtils.loaderValueSelector(userGroupState)
  );
};

export const getUserGroupList = (
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<UserGroup>>
> =>
  createSelector(getUserGroupManagementState, (state: UserGroupManagement) =>
    StateUtils.denormalizeSearch<UserGroup>(state, params)
  );

export const getAvailableOrgCustomers = (
  code: string,
  params: SearchConfig
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
    ) =>
      StateUtils.denormalizeCustomB2BSearch(
        state.customers,
        customers,
        params,
        code
      )
  );

export const getAvailableOrderApprovalPermissions = (
  code: string,
  params: SearchConfig
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
      StateUtils.denormalizeCustomB2BSearch(
        state.permissions,
        permissions,
        params,
        code
      )
  );

export const getUserGroupState = (
  code: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<UserGroup>> =>
  createSelector(
    getUserGroupsState,
    (state: StateUtils.EntityLoaderState<UserGroup>) =>
      StateUtils.entityLoaderStateSelector(state, code)
  );
