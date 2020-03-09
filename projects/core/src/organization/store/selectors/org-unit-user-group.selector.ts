import { createSelector, MemoizedSelector } from '@ngrx/store';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  OrganizationState,
  StateWithOrganization,
  OrgUnitUserGroupManagement,
  ORG_UNIT_USER_GROUP_FEATURE,
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
  User,
} from '../../../model';
import { B2BSearchConfig } from '../../model';
import { getPermissionsState } from './permission.selector';

export const getOrgUnitUserGroupManagementState: MemoizedSelector<
  StateWithOrganization,
  OrgUnitUserGroupManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[ORG_UNIT_USER_GROUP_FEATURE]
);

export const getOrgUnitUserGroupsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<OrgUnitUserGroup>
> = createSelector(
  getOrgUnitUserGroupManagementState,
  (state: OrgUnitUserGroupManagement) => state && state.entities
);

export const getOrgUnitUserGroupState = (
  orgUnitUserGroupUid: string
): MemoizedSelector<StateWithOrganization, LoaderState<OrgUnitUserGroup>> =>
  createSelector(
    getOrgUnitUserGroupsState,
    (state: EntityLoaderState<OrgUnitUserGroup>) =>
      entityStateSelector(state, orgUnitUserGroupUid)
  );

export const getOrgUnitUserGroupList = (
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

export const getMembers = (
  code: string,
  params: B2BSearchConfig
): MemoizedSelector<StateWithOrganization, LoaderState<EntitiesModel<User>>> =>
  createSelector(
    getOrgUnitUserGroupManagementState,
    getPermissionsState,
    (state: OrgUnitUserGroupManagement, customers: EntityLoaderState<User>) =>
      denormalizeCustomB2BSearch(state.customers, customers, params, code)
  );

export const getOrgUnitUserGroupAvailableOrderApprovalPermissions = (
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
