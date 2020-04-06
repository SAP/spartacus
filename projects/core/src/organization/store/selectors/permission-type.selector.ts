import { createSelector, MemoizedSelector } from '@ngrx/store';
import { entityStateSelector } from 'projects/core/src/state/utils/entity-loader/entity-loader.selectors';
import { OrderApprovalPermissionType } from '../../../model/permission.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  PermissionManagement,
  PermissionTypesManagement,
  PERMISSION_TYPES_FEATURE,
  StateWithOrganization,
} from '../organization-state';
import { getPermissionManagementState } from './permission.selector';

/*export const getPermissionTypeManagementState: MemoizedSelector<
  StateWithOrganization,
  PermissionTypesManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[PERMISSION_TYPES_FEATURE]
);

export const getPermissionTypesState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<OrderApprovalPermissionType[]>
> = createSelector(
  getPermissionTypeManagementState,
  (state: PermissionTypesManagement) => state && state.entities
);

export const getPermissionTypeList = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<OrderApprovalPermissionType[]>>
> =>
  createSelector(
    getPermissionTypeManagementState,
    (state: PermissionTypesManagement) =>
      denormalizeB2BSearch<OrderApprovalPermissionType[]>(state)
  );*/

export const getPermissionTypeManagementState2: MemoizedSelector<
  StateWithOrganization,
  PermissionTypesManagement
> = createSelector(
  getPermissionManagementState, //getOrganizationState,
  (state: PermissionManagement) => state[PERMISSION_TYPES_FEATURE]
);
export const getPermissionTypesStateNew2: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<OrderApprovalPermissionType[]>
> = createSelector(
  getPermissionTypeManagementState2,
  (state: PermissionTypesManagement) => state && state.entities
);

export const getPermissionTypesState2 = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<OrderApprovalPermissionType[]>
> =>
  createSelector(
    getPermissionTypesStateNew2,
    (state: EntityLoaderState<OrderApprovalPermissionType[]>) =>
      entityStateSelector(state, PERMISSION_TYPES_FEATURE)
  );
