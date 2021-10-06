import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  B2BUser,
  ConverterService,
  EntitiesModel,
  Occ,
  OccEndpointsService,
  SearchConfig,
} from '@spartacus/core';
import {
  B2BUserAdapter,
  B2B_USERS_NORMALIZER,
  B2B_USER_NORMALIZER,
  PERMISSIONS_NORMALIZER,
  UserGroup,
  USER_GROUPS_NORMALIZER,
  B2B_USER_SERIALIZER,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccB2BUserAdapter implements B2BUserAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, orgUnitCustomerId: string): Observable<B2BUser> {
    return this.http
      .get<Occ.B2BUser>(this.getB2BUserEndpoint(userId, orgUnitCustomerId))
      .pipe(this.converter.pipeable(B2B_USER_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.http
      .get<Occ.OrgUnitUserList>(this.getB2BUsersEndpoint(userId, params))
      .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
  }

  create(userId: string, orgCustomer: B2BUser): Observable<B2BUser> {
    orgCustomer = this.converter.convert(orgCustomer, B2B_USER_SERIALIZER);
    return this.http
      .post<Occ.B2BUser>(this.getB2BUsersEndpoint(userId), orgCustomer)
      .pipe(this.converter.pipeable(B2B_USER_NORMALIZER));
  }

  update(
    userId: string,
    orgCustomerId: string,
    orgCustomer: B2BUser
  ): Observable<B2BUser> {
    orgCustomer = this.converter.convert(
      orgCustomer,
      B2B_USER_SERIALIZER
    ) as B2BUser;
    return this.http
      .patch<Occ.B2BUser>(
        this.getB2BUserEndpoint(userId, orgCustomerId),
        orgCustomer
      )
      .pipe(this.converter.pipeable(B2B_USER_NORMALIZER));
  }

  loadApprovers(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.http
      .get<Occ.OrgUnitUserList>(
        this.getApproversEndpoint(userId, orgCustomerId, params)
      )
      .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
  }

  assignApprover(
    userId: string,
    orgCustomerId: string,
    approverId: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getApproverEndpoint(userId, orgCustomerId, approverId),
      null
    );
  }

  unassignApprover(
    userId: string,
    orgCustomerId: string,
    approverId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getApproverEndpoint(userId, orgCustomerId, approverId)
    );
  }

  loadPermissions(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.http
      .get<Occ.OrgUnitUserList>(
        this.getPermissionsEndpoint(userId, orgCustomerId, params)
      )
      .pipe(this.converter.pipeable(PERMISSIONS_NORMALIZER));
  }

  assignPermission(
    userId: string,
    orgCustomerId: string,
    permissionId: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getPermissionEndpoint(userId, orgCustomerId, permissionId),
      null
    );
  }

  unassignPermission(
    userId: string,
    orgCustomerId: string,
    permissionId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getPermissionEndpoint(userId, orgCustomerId, permissionId)
    );
  }

  loadUserGroups(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<UserGroup>> {
    return this.http
      .get<Occ.OrgUnitUserList>(
        this.getUserGroupsEndpoint(userId, orgCustomerId, params)
      )
      .pipe(this.converter.pipeable(USER_GROUPS_NORMALIZER));
  }

  assignUserGroup(
    userId: string,
    orgCustomerId: string,
    userGroupId: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getUserGroupEndpoint(userId, orgCustomerId, userGroupId),
      null
    );
  }

  unassignUserGroup(
    userId: string,
    orgCustomerId: string,
    userGroupId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getUserGroupEndpoint(userId, orgCustomerId, userGroupId)
    );
  }

  protected getB2BUserEndpoint(userId: string, orgCustomerId: string): string {
    return this.occEndpoints.buildUrl('b2bUser', {
      urlParams: {
        userId,
        orgCustomerId,
      },
    });
  }

  protected getB2BUsersEndpoint(userId: string, params?: SearchConfig): string {
    return this.occEndpoints.buildUrl('b2bUsers', {
      urlParams: { userId },
      queryParams: params,
    });
  }

  protected getApproverEndpoint(
    userId: string,
    orgCustomerId: string,
    approverId: string
  ): string {
    return this.occEndpoints.buildUrl('b2bUserApprover', {
      urlParams: {
        userId,
        orgCustomerId,
        approverId,
      },
    });
  }

  protected getApproversEndpoint(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.buildUrl('b2bUserApprovers', {
      urlParams: { userId, orgCustomerId },
      queryParams: params,
    });
  }

  protected getPermissionEndpoint(
    userId: string,
    orgCustomerId: string,
    premissionId: string
  ): string {
    return this.occEndpoints.buildUrl('b2bUserPermission', {
      urlParams: {
        userId,
        orgCustomerId,
        premissionId,
      },
    });
  }

  protected getPermissionsEndpoint(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig
  ): string {
    return this.occEndpoints.buildUrl('b2bUserPermissions', {
      urlParams: {
        userId,
        orgCustomerId,
      },
      queryParams: params,
    });
  }

  protected getUserGroupEndpoint(
    userId: string,
    orgCustomerId: string,
    userGroupId: string
  ): string {
    return this.occEndpoints.buildUrl('b2bUserUserGroup', {
      urlParams: {
        userId,
        orgCustomerId,
        userGroupId,
      },
    });
  }

  protected getUserGroupsEndpoint(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig
  ): string {
    return this.occEndpoints.buildUrl('b2bUserUserGroups', {
      urlParams: { userId, orgCustomerId },
      queryParams: params,
    });
  }
}
