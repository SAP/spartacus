import { createSelector, MemoizedSelector } from '@ngrx/store';
import { EntitiesModel } from '../../../model/misc.model';
import {
  OrderApprovalPermissionType,
  Permission,
} from '../../../model/permission.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { B2BSearchConfig } from '../../model/search-config';
import { denormalizeB2BSearch } from '../../utils/serializer';
import {
  OrganizationState,
  PermissionManagement,
  PERMISSION_FEATURE,
  StateWithOrganization,
  PERMISSION_TYPES,
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
  (state: PermissionManagement) => state && state.entities
);

export const getPermissionTypesState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<OrderApprovalPermissionType[]>
> = createSelector(
  getPermissionManagementState,
  (state: PermissionManagement) => state && state.permissionTypes
);

export const getPermission = (
  permissionCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<Permission>> =>
  createSelector(getPermissionsState, (state: EntityLoaderState<Permission>) =>
    entityStateSelector(state, permissionCode)
  );

export const getPermissionList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<Permission>>
> =>
  createSelector(getPermissionManagementState, (state: PermissionManagement) =>
    denormalizeB2BSearch<Permission>(state, params)
  );

export const getPermissionTypes = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<OrderApprovalPermissionType[]>
> =>
  createSelector(
    getPermissionTypesState,
    (state: EntityLoaderState<OrderApprovalPermissionType[]>) =>
      entityStateSelector(state, PERMISSION_TYPES)
  );
