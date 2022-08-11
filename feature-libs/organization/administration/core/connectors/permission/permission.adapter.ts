import {
  EntitiesModel,
  SearchConfig,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';

export abstract class PermissionAdapter {
  /**
   * Abstract method used to load permissionManagement's details data.
   * Permission's data can be loaded from alternative sources, as long as the structure
   * converts to the `Permission`.
   *
   * @param userId The `userId` for given permissionManagement
   * @param permissionCode The `permissionCode` for given permissionManagement
   */
  abstract load(userId: string, permissionCode: string): Observable<Permission>;

  abstract loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<Permission>>;

  abstract create(
    userId: string,
    permission: Permission
  ): Observable<Permission>;

  abstract update(
    userId: string,
    permissionCode: string,
    permission: Permission
  ): Observable<Permission>;

  abstract loadTypes(): Observable<OrderApprovalPermissionType[]>;
}
