import { EntitiesModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  OrderApprovalPermissionType,
  Permission,
} from '../../model/permission.model';
import { B2BSearchConfig } from '../../model/search-config';

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
    params?: B2BSearchConfig
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
