import { Injectable } from '@angular/core';
import {
  EntitiesModel,
  SearchConfig,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';
import { PermissionAdapter } from './permission.adapter';

@Injectable({
  providedIn: 'root',
})
export class PermissionConnector {
  constructor(protected adapter: PermissionAdapter) {}

  get(userId: string, permissionCode: string): Observable<Permission> {
    return this.adapter.load(userId, permissionCode);
  }

  getList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.adapter.loadList(userId, params);
  }

  create(userId: string, permission: Permission): Observable<Permission> {
    return this.adapter.create(userId, permission);
  }

  update(
    userId: string,
    permissionCode: string,
    permission: Permission
  ): Observable<Permission> {
    return this.adapter.update(userId, permissionCode, permission);
  }

  getTypes(): Observable<OrderApprovalPermissionType[]> {
    return this.adapter.loadTypes();
  }
}
