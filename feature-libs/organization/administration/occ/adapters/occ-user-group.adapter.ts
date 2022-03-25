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
  B2B_USERS_NORMALIZER,
  Permission,
  PERMISSIONS_NORMALIZER,
  UserGroup,
  UserGroupAdapter,
  USER_GROUPS_NORMALIZER,
  USER_GROUP_NORMALIZER,
  USER_GROUP_SERIALIZER,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccUserGroupAdapter implements UserGroupAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, userGroupId: string): Observable<UserGroup> {
    return this.http
      .get<Occ.OrgUnitUserGroup>(this.getUserGroupEndpoint(userId, userGroupId))
      .pipe(this.converter.pipeable(USER_GROUP_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<UserGroup>> {
    return this.http
      .get<Occ.OrgUnitUserGroupList>(this.getUserGroupsEndpoint(userId, params))
      .pipe(this.converter.pipeable(USER_GROUPS_NORMALIZER));
  }

  loadAvailableOrderApprovalPermissions(
    userId: string,
    userGroupId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.http
      .get<Occ.OrgUnitUserGroupList>(
        this.getPermissionsEndpoint(userId, userGroupId, params)
      )
      .pipe(this.converter.pipeable(PERMISSIONS_NORMALIZER));
  }

  loadAvailableOrgCustomers(
    userId: string,
    userGroupId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.http
      .get<Occ.OrgUnitUserGroupList>(
        this.getAvailableCustomersEndpoint(userId, userGroupId, params)
      )
      .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
  }

  create(userId: string, userGroup: UserGroup): Observable<UserGroup> {
    userGroup = this.converter.convert(userGroup, USER_GROUP_SERIALIZER);
    return this.http
      .post<Occ.OrgUnitUserGroup>(this.getUserGroupsEndpoint(userId), userGroup)
      .pipe(this.converter.pipeable(USER_GROUP_NORMALIZER));
  }

  delete(userId: string, userGroupId: string): Observable<UserGroup> {
    return this.http
      .delete<Occ.OrgUnitUserGroup>(
        this.getUserGroupEndpoint(userId, userGroupId)
      )
      .pipe(this.converter.pipeable(USER_GROUP_NORMALIZER));
  }

  update(
    userId: string,
    userGroupId: string,
    userGroup: UserGroup
  ): Observable<UserGroup> {
    userGroup = this.converter.convert(userGroup, USER_GROUP_SERIALIZER);
    return this.http
      .patch<Occ.OrgUnitUserGroup>(
        this.getUserGroupEndpoint(userId, userGroupId),
        userGroup
      )
      .pipe(this.converter.pipeable(USER_GROUP_NORMALIZER));
  }

  assignMember(
    userId: string,
    userGroupId: string,
    orgCustomerId: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getMembersEndpoint(userId, userGroupId, {
        orgCustomerId,
      }),
      null
    );
  }

  assignOrderApprovalPermission(
    userId: string,
    userGroupId: string,
    orderApprovalPermissionCode: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getOrderApprovalPermissionsEndpoint(userId, userGroupId, {
        orderApprovalPermissionCode,
      }),
      null
    );
  }

  unassignMember(
    userId: string,
    userGroupId: string,
    orgCustomerId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getMemberEndpoint(userId, userGroupId, orgCustomerId)
    );
  }

  unassignAllMembers(userId: string, userGroupId: string): Observable<any> {
    return this.http.delete<any>(this.getMembersEndpoint(userId, userGroupId));
  }

  unassignOrderApprovalPermission(
    userId: string,
    userGroupId: string,
    orderApprovalPermissionCode: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getOrderApprovalPermissionEndpoint(
        userId,
        userGroupId,
        orderApprovalPermissionCode
      )
    );
  }

  protected getUserGroupEndpoint(userId: string, userGroupId: string): string {
    return this.occEndpoints.buildUrl('userGroup', {
      urlParams: {
        userId,
        userGroupId,
      },
    });
  }

  protected getUserGroupsEndpoint(
    userId: string,
    params?: SearchConfig
  ): string {
    return this.occEndpoints.buildUrl('userGroups', {
      urlParams: { userId },
      queryParams: params,
    });
  }

  protected getAvailableCustomersEndpoint(
    userId: string,
    userGroupId: string,
    params?: SearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.buildUrl('userGroupAvailableOrgCustomers', {
      urlParams: { userId, userGroupId },
      queryParams: params,
    });
  }

  protected getPermissionsEndpoint(
    userId: string,
    userGroupId: string,
    params?: SearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.buildUrl(
      'userGroupAvailableOrderApprovalPermissions',
      { urlParams: { userId, userGroupId }, queryParams: params }
    );
  }

  protected getMemberEndpoint(
    userId: string,
    userGroupId: string,
    orgCustomerId: string
  ): string {
    return this.occEndpoints.buildUrl('userGroupMember', {
      urlParams: {
        userId,
        userGroupId,
        orgCustomerId,
      },
    });
  }

  protected getMembersEndpoint(
    userId: string,
    userGroupId: string,
    params?: SearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.buildUrl('userGroupMembers', {
      urlParams: { userId, userGroupId },
      queryParams: params,
    });
  }

  protected getOrderApprovalPermissionsEndpoint(
    userId: string,
    userGroupId: string,
    params?: SearchConfig | { orderApprovalPermissionCode: string }
  ): string {
    return this.occEndpoints.buildUrl('userGroupOrderApprovalPermissions', {
      urlParams: { userId, userGroupId },
      queryParams: params,
    });
  }

  protected getOrderApprovalPermissionEndpoint(
    userId: string,
    userGroupId: string,
    orderApprovalPermissionCode: string
  ): string {
    return this.occEndpoints.buildUrl('userGroupOrderApprovalPermission', {
      urlParams: {
        userId,
        userGroupId,
        orderApprovalPermissionCode,
      },
    });
  }
}
