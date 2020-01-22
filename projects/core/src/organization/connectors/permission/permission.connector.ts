import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../../../model/permission.model';
import { PermissionAdapter } from './permission.adapter';
import { B2BSearchConfig } from '../../model/search-config';
import { Occ } from '../../../occ/occ-models/occ.models';
import PermissionsList = Occ.PermissionsList;

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
  ): Observable<PermissionsList> {
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
