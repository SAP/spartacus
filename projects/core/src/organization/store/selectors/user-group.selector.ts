import { createSelector, MemoizedSelector } from '@ngrx/store';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  OrganizationState,
  StateWithOrganization,
  OrgUnitUserGroupManagement,
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

export const getOrgUnitUserGroupManagementState: MemoizedSelector<
  StateWithOrganization,
  OrgUnitUserGroupManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[USER_GROUP_FEATURE]
);

export const getOrgUnitUserGroupsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<OrgUnitUserGroup>
> = createSelector(
  getOrgUnitUserGroupManagementState,
  (state: OrgUnitUserGroupManagement) => state && state.entities
);

export const getUserGroupState = (
  orgUnitUserGroupUid: string
): MemoizedSelector<StateWithOrganization, LoaderState<OrgUnitUserGroup>> =>
  createSelector(
    getOrgUnitUserGroupsState,
    (state: EntityLoaderState<OrgUnitUserGroup>) =>
      entityStateSelector(state, orgUnitUserGroupUid)
  );

export const getUserGroupList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<OrgUnitUserGroup>>
> =>
  createSelector(
    getOrgUnitUserGroupManagementState,
    (state: OrgUnitUserGroupManagement) =>
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
    getOrgUnitUserGroupManagementState,
    getB2BUsersState,
    (
      state: OrgUnitUserGroupManagement,
      customers: EntityLoaderState<B2BUser>
    ) => denormalizeCustomB2BSearch(state.customers, customers, params, code)
  );

export const getAvailableOrderApprovalPermissions = (
  code: string,
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<Permission>>
> =>
  createSelector(
    getOrgUnitUserGroupManagementState,
    getPermissionsState,
    (
      state: OrgUnitUserGroupManagement,
      permissions: EntityLoaderState<Permission>
    ) =>
      denormalizeCustomB2BSearch(state.permissions, permissions, params, code)
  );
