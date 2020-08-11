import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  UserGroupAdapter,
  USER_GROUP_NORMALIZER,
  USER_GROUPS_NORMALIZER,
  PERMISSIONS_NORMALIZER,
  B2B_USERS_NORMALIZER,
} from '../../../connectors/index';
import {
  OccEndpointsService,
  ConverterService,
  Occ,
  Permission,
  EntitiesModel,
  B2BUser,
} from '@spartacus/core';
import { B2BSearchConfig, UserGroup } from '../../../model';

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
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<UserGroup>> {
    return this.http
      .get<Occ.OrgUnitUserGroupList>(this.getUserGroupsEndpoint(userId, params))
      .pipe(this.converter.pipeable(USER_GROUPS_NORMALIZER));
  }

  loadAvailableOrderApprovalPermissions(
    userId: string,
    userGroupId: string,
    params?: B2BSearchConfig
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
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.http
      .get<Occ.OrgUnitUserGroupList>(
        this.getAvailableCustomersEndpoint(userId, userGroupId, params)
      )
      .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
  }

  create(userId: string, userGroup: UserGroup): Observable<UserGroup> {
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
    return this.occEndpoints.getUrl('userGroup', {
      userId,
      userGroupId,
    });
  }

  protected getUserGroupsEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('userGroups', { userId }, params);
  }

  protected getAvailableCustomersEndpoint(
    userId: string,
    userGroupId: string,
    params?: B2BSearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'userGroupAvailableOrgCustomers',
      { userId, userGroupId },
      params
    );
  }

  protected getPermissionsEndpoint(
    userId: string,
    userGroupId: string,
    params?: B2BSearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'userGroupAvailableOrderApprovalPermissions',
      { userId, userGroupId },
      params
    );
  }

  protected getMemberEndpoint(
    userId: string,
    userGroupId: string,
    orgCustomerId: string
  ): string {
    return this.occEndpoints.getUrl('userGroupMember', {
      userId,
      userGroupId,
      orgCustomerId,
    });
  }

  protected getMembersEndpoint(
    userId: string,
    userGroupId: string,
    params?: B2BSearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'userGroupMembers',
      { userId, userGroupId },
      params
    );
  }

  protected getOrderApprovalPermissionsEndpoint(
    userId: string,
    userGroupId: string,
    params?: B2BSearchConfig | { orderApprovalPermissionCode: string }
  ): string {
    return this.occEndpoints.getUrl(
      'userGroupOrderApprovalPermissions',
      {
        userId,
        userGroupId,
      },
      params
    );
  }

  protected getOrderApprovalPermissionEndpoint(
    userId: string,
    userGroupId: string,
    orderApprovalPermissionCode: string
  ): string {
    return this.occEndpoints.getUrl('userGroupOrderApprovalPermission', {
      userId,
      userGroupId,
      orderApprovalPermissionCode,
    });
  }
}
