import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  EntitiesModel,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import {
  B2BSearchConfig,
  OrderApprovalPermissionType,
  Permission,
  PermissionAdapter,
  PERMISSIONS_NORMALIZER,
  PERMISSION_NORMALIZER,
  PERMISSION_TYPES_NORMALIZER,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';

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
      .post<Occ.Permission>(this.getPermissionsEndpoint(userId), permission)
      .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
  }

  update(
    userId: string,
    permissionCode: string,
    permission: Permission
  ): Observable<Permission> {
    return this.http
      .patch<Occ.Permission>(
        this.getPermissionEndpoint(userId, permissionCode),
        permission
      )
      .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
  }

  loadTypes(): Observable<OrderApprovalPermissionType[]> {
    return this.http
      .get<Occ.OrderApprovalPermissionTypeList>(
        this.getPermissionTypesEndpoint()
      )
      .pipe(this.converter.pipeable(PERMISSION_TYPES_NORMALIZER));
  }

  protected getPermissionEndpoint(
    userId: string,
    orderApprovalPermissionCode: string
  ): string {
    return this.occEndpoints.getUrl('permission', {
      userId,
      orderApprovalPermissionCode,
    });
  }

  protected getPermissionsEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('permissions', { userId }, params);
  }

  protected getPermissionTypesEndpoint(): string {
    return this.occEndpoints.getUrl('orderApprovalPermissionTypes');
  }
}
