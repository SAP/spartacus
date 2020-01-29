import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../../../model/permission.model';
import { PermissionAdapter } from './permission.adapter';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '../../../model/misc.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionConnector {
  constructor(protected adapter: PermissionAdapter) {}

  get(
    userId: string,
    orderApprovalPermissionCode: string
  ): Observable<Permission> {
    return this.adapter.load(userId, orderApprovalPermissionCode);
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
}
