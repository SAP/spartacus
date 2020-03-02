import { createSelector, MemoizedSelector } from '@ngrx/store';
import { EntitiesModel } from '../../../model/misc.model';
import { OrderApprovalPermissionType } from '../../../model/permission.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { denormalizeB2BSearch } from '../../utils/serializer';
import {
  OrganizationState,
  PermissionTypesManagement,
  PERMISSION_TYPES_FEATURE,
  StateWithOrganization,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';

export const getPermissionTypeManagementState: MemoizedSelector<
  StateWithOrganization,
  PermissionTypesManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[PERMISSION_TYPES_FEATURE]
);

export const getPermissionTypesState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<OrderApprovalPermissionType>
> = createSelector(
  getPermissionTypeManagementState,
  (state: PermissionTypesManagement) => state && state.entities
);

// export const getPermissionTypeState = (
//   permissionCode: string
// ): MemoizedSelector<StateWithOrganization, LoaderState<OrderApprovalPermissionType>> =>
//   createSelector(
//     getPermissionsState,
//     (state: EntityLoaderState<OrderApprovalPermissionType>) =>
//       entityStateSelector(state, permissionCode)
//   );

export const getPermissionTypeList = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<OrderApprovalPermissionType>>
> =>
  createSelector(
    getPermissionTypeManagementState,
    (state: PermissionTypesManagement) =>
      denormalizeB2BSearch<OrderApprovalPermissionType>(state)
  );
