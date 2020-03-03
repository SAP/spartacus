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
import { denormalizeB2BSearch } from '../../utils/serializer';
import { EntitiesModel } from '../../../model/misc.model';
import { OrgUnitUserGroup } from 'projects/core/src/model';
import { B2BSearchConfig } from '../../model';

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
  orgUnitUserGroupCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<OrgUnitUserGroup>> =>
  createSelector(
    getOrgUnitUserGroupsState,
    (state: EntityLoaderState<OrgUnitUserGroup>) =>
      entityStateSelector(state, orgUnitUserGroupCode)
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
