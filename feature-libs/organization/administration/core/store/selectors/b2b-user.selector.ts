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
  B2BUserManagement,
  B2B_USER_FEATURE,
  OrganizationState,
  StateWithOrganization,
  USER_GROUP_FEATURE,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { getPermissionsState } from './permission.selector';

export const getB2BUserManagementState: MemoizedSelector<
  StateWithOrganization,
  B2BUserManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[B2B_USER_FEATURE]
);

export const getB2BUsersState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<B2BUser>
> = createSelector(
  getB2BUserManagementState,
  (state: B2BUserManagement) => state && state.entities
);

export const getB2BUserState = (
  orgCustomerId: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<B2BUser>> =>
  createSelector(
    getB2BUsersState,
    (state: StateUtils.EntityLoaderState<B2BUser>) =>
      StateUtils.entityLoaderStateSelector(state, orgCustomerId)
  );

export const getB2BUserValue = (
  orgCustomerId: string
): MemoizedSelector<StateWithOrganization, B2BUser> => {
  return createSelector(getB2BUserState(orgCustomerId), (b2BUserState) =>
    StateUtils.loaderValueSelector(b2BUserState)
  );
};

export const getUserList = (
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<B2BUser>>
> =>
  createSelector(getB2BUserManagementState, (state: B2BUserManagement) =>
    StateUtils.denormalizeSearch<B2BUser>(state, params)
  );

export const getB2BUserApprovers = (
  code: string,
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<B2BUser>>
> =>
  createSelector(
    getB2BUserManagementState,
    getB2BUsersState,
    (
      state: B2BUserManagement,
      approvers: StateUtils.EntityLoaderState<B2BUser>
    ) =>
      StateUtils.denormalizeCustomB2BSearch(
        state.approvers,
        approvers,
        params,
        code
      )
  );

export const getB2BUserPermissions = (
  code: string,
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<Permission>>
> =>
  createSelector(
    getB2BUserManagementState,
    getPermissionsState,
    (
      state: B2BUserManagement,
      permissions: StateUtils.EntityLoaderState<Permission>
    ) =>
      StateUtils.denormalizeCustomB2BSearch(
        state.permissions,
        permissions,
        params,
        code
      )
  );

// avoid circular dependency
const getUserGroupsState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<UserGroup>
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[USER_GROUP_FEATURE].entities
);

export const getB2BUserUserGroups = (
  code: string,
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<UserGroup>>
> =>
  createSelector(
    getB2BUserManagementState,
    getUserGroupsState,
    (
      state: B2BUserManagement,
      userGroups: StateUtils.EntityLoaderState<UserGroup>
    ) =>
      StateUtils.denormalizeCustomB2BSearch(
        state.userGroups,
        userGroups,
        params,
        code
      )
  );
