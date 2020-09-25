import { createSelector, MemoizedSelector } from '@ngrx/store';
import { B2BUser, EntitiesModel, StateUtils } from '@spartacus/core';
import { Permission } from '../../model/permission.model';
import { B2BSearchConfig } from '../../model/search-config';
import { UserGroup } from '../../model/user-group.model';
import {
  denormalizeB2BSearch,
  denormalizeCustomB2BSearch,
} from '../../utils/serializer';
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

export const getUserList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<B2BUser>>
> =>
  createSelector(getB2BUserManagementState, (state: B2BUserManagement) =>
    denormalizeB2BSearch<B2BUser>(state, params)
  );

export const getB2BUserApprovers = (
  code: string,
  params: B2BSearchConfig
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
    ) => denormalizeCustomB2BSearch(state.approvers, approvers, params, code)
  );

export const getB2BUserPermissions = (
  code: string,
  params: B2BSearchConfig
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
      denormalizeCustomB2BSearch(state.permissions, permissions, params, code)
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
  params: B2BSearchConfig
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
    ) => denormalizeCustomB2BSearch(state.userGroups, userGroups, params, code)
  );
