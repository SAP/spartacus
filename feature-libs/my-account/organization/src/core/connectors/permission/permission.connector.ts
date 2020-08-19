import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  OrderApprovalPermissionType,
  EntitiesModel,
  Permission,
} from '@spartacus/core';
import { B2BSearchConfig } from '../../model/search-config';
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
    params?: B2BSearchConfig
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
