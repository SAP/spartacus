import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { PermissionAdapter } from '../../../organization/connectors/permission/permission.adapter';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import {
  PERMISSION_NORMALIZER,
  PERMISSIONS_NORMALIZER,
} from '../../../organization/connectors/permission/converters';
import { B2BSearchConfig } from '../../../organization/model/search-config';
import { Occ } from '../../occ-models/occ.models';
import { Permission } from '../../../model/permission.model';
import { EntitiesModel } from '../../../model/misc.model';

@Injectable()
export class OccPermissionAdapter implements PermissionAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, permissionCode: string): Observable<Permission> {
    return this.http
      .get<Occ.Permission>(this.getPermissionEndpoint(userId, permissionCode))
      .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.http
      .get<Occ.PermissionsList>(this.getPermissionsEndpoint(userId, params))
      .pipe(this.converter.pipeable(PERMISSIONS_NORMALIZER));
  }

  create(userId: string, permission: Permission): Observable<Permission> {
    return this.http
      .post<Permission>(this.getPermissionsEndpoint(userId), permission)
      .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
  }

  update(
    userId: string,
    permissionCode: string,
    permission: Permission
  ): Observable<Permission> {
    return this.http
      .patch<Permission>(
        this.getPermissionEndpoint(userId, permissionCode),
        permission
      )
      .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
  }

  protected getPermissionEndpoint(
    userId: string,
    permissionCode: string
  ): string {
    return this.occEndpoints.getUrl('permission', { userId, permissionCode });
  }

  protected getPermissionsEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('permissions', { userId }, params);
  }
}
