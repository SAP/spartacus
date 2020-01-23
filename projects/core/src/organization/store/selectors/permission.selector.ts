import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  Permission,
  PermissionListModel,
} from '../../../model/permission.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeB2BSearchConfig } from '../../utils/serializer';
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

// TODO: better mechanism for denormalization
// create service encapsulating denormalization

export const getPermissionList = (
  params: B2BSearchConfig
): MemoizedSelector<StateWithOrganization, LoaderState<PermissionListModel>> =>
  createSelector(
    getPermissionManagementState,
    (state: PermissionManagement) => {
      const list: any = entityStateSelector(
        state[PERMISSION_LISTS],
        serializeB2BSearchConfig(params)
      );
      if (!list.value || !list.value.ids) {
        return list;
      }
      const res: LoaderState<PermissionListModel> = Object.assign({}, list, {
        value: {
          permissions: list.value.ids.map(
            code => entityStateSelector(state[PERMISSION_ENTITIES], code).value
          ),
          pagination: list.value.pagination,
          sorts: list.value.sorts,
        },
      });
      return res;
    }
  );
