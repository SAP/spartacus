import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Permission } from '../../../model/permission.model';
import { EntitiesModel } from '../../../model/misc.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { B2BSearchConfig } from '../../model/search-config';
import { denormalizeB2BSearch } from '../../utils/serializer';
import {
  PERMISSION_ENTITIES,
  PERMISSION_FEATURE,
  PERMISSION_LISTS,
  PermissionManagement,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';

export const getPermissionManagementState: MemoizedSelector<
  StateWithOrganization,
  PermissionManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[PERMISSION_FEATURE]
);

export const getPermissionsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<Permission>
> = createSelector(
  getPermissionManagementState,
  (state: PermissionManagement) => state && state[PERMISSION_ENTITIES]
);

export const getPermissionState = (
  permissionCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<Permission>> =>
  createSelector(
    getPermissionsState,
    (state: EntityLoaderState<Permission>) =>
      entityStateSelector(state, permissionCode)
  );

export const getPermissionList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<Permission>>
> =>
  createSelector(
    getPermissionManagementState,
    (state: PermissionManagement) =>
      denormalizeB2BSearch(state, PERMISSION_LISTS, PERMISSION_ENTITIES, params)
  );
