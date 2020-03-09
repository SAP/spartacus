import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { B2BSearchConfig } from '../../../organization/model/search-config';
import { Occ } from '../../occ-models/occ.models';
import {
  OrgUnitUserGroupAdapter,
  ORG_UNIT_USER_GROUP_NORMALIZER,
  ORG_UNIT_USER_GROUPS_NORMALIZER,
} from '../../../organization/connectors/org-unit-user-group';
import { OrgUnitUserGroup, EntitiesModel, User } from '../../../model';

@Injectable()
export class OccOrgUnitUserGroupAdapter implements OrgUnitUserGroupAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<OrgUnitUserGroup> {
    return this.http
      .get<Occ.OrgUnitUserGroup>(
        this.getOrgUnitUserGroupEndpoint(userId, orgUnitUserGroupUid)
      )
      .pipe(this.converter.pipeable(ORG_UNIT_USER_GROUP_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>> {
    return this.http
      .get<Occ.OrgUnitUserGroupList>(
        this.getOrgUnitUserGroupsEndpoint(userId, params)
      )
      .pipe(this.converter.pipeable(ORG_UNIT_USER_GROUPS_NORMALIZER));
  }

  loadAvailableOrderApprovalPermissions(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>> {
    return this.http
      .get<Occ.OrgUnitUserGroupList>(
        this.getOrgUnitUserGroupAvailableOrderApprovalPermissionsEndpoint(
          userId,
          orgUnitUserGroupUid,
          params
        )
      )
      .pipe(this.converter.pipeable(ORG_UNIT_USER_GROUPS_NORMALIZER));
  }

  loadAvailableOrgCustomers(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<User>> {
    return this.http
      .get<Occ.OrgUnitUserGroupList>(
        this.getOrgUnitUserGroupAvailableOrgCustomersEndpoint(
          userId,
          orgUnitUserGroupUid,
          params
        )
      )
      .pipe(this.converter.pipeable(ORG_UNIT_USER_GROUPS_NORMALIZER));
  }

  create(
    userId: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup> {
    return this.http
      .post<Occ.OrgUnitUserGroup>(
        this.getOrgUnitUserGroupsEndpoint(userId),
        orgUnitUserGroup
      )
      .pipe(this.converter.pipeable(ORG_UNIT_USER_GROUP_NORMALIZER));
  }

  delete(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<OrgUnitUserGroup> {
    return this.http
      .delete<Occ.OrgUnitUserGroup>(
        this.getOrgUnitUserGroupEndpoint(userId, orgUnitUserGroupUid)
      )
      .pipe(this.converter.pipeable(ORG_UNIT_USER_GROUP_NORMALIZER));
  }

  update(
    userId: string,
    orgUnitUserGroupUid: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup> {
    return this.http
      .patch<Occ.OrgUnitUserGroup>(
        this.getOrgUnitUserGroupEndpoint(userId, orgUnitUserGroupUid),
        orgUnitUserGroup
      )
      .pipe(this.converter.pipeable(ORG_UNIT_USER_GROUP_NORMALIZER));
  }

  assignMember(
    userId: string,
    orgUnitUserGroupUid: string,
    orgCustomerId: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getOrgUnitUserGroupMembersEndpoint(userId, orgUnitUserGroupUid, {
        orgCustomerId,
      }),
      null
    );
  }

  assignOrderApprovalPermission(
    userId: string,
    orgUnitUserGroupUid: string,
    orderApprovalPermissionCode: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getOrgUnitUserGroupOrderApprovalPermissionsEndpoint(
        userId,
        orgUnitUserGroupUid,
        {
          orderApprovalPermissionCode,
        }
      ),
      null
    );
  }

  unassignMember(
    userId: string,
    orgUnitUserGroupUid: string,
    orgCustomerId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getOrgUnitUserGroupsMemberEndpoint(
        userId,
        orgUnitUserGroupUid,
        orgCustomerId
      )
    );
  }

  unassignAllMembers(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getOrgUnitUserGroupMembersEndpoint(userId, orgUnitUserGroupUid)
    );
  }

  unassignOrderApprovalPermission(
    userId: string,
    orgUnitUserGroupUid: string,
    orderApprovalPermissionCode: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getOrgUnitUserGroupsOrderApprovalPermissionEndpoint(
        userId,
        orgUnitUserGroupUid,
        orderApprovalPermissionCode
      )
    );
  }

  protected getOrgUnitUserGroupEndpoint(
    userId: string,
    orgUnitUserGroupUid: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitUserGroup', {
      userId,
      orgUnitUserGroupUid,
    });
  }

  protected getOrgUnitUserGroupsEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('orgUnitUserGroups', { userId }, params);
  }

  protected getOrgUnitUserGroupAvailableOrgCustomersEndpoint(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitUserGroupAvailableOrgCustomers',
      { userId, orgUnitUserGroupUid },
      params
    );
  }

  protected getOrgUnitUserGroupAvailableOrderApprovalPermissionsEndpoint(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitUserGroupAvailableOrderApprovalPermissions',
      { userId, orgUnitUserGroupUid },
      params
    );
  }

  protected getOrgUnitUserGroupsMemberEndpoint(
    userId: string,
    orgUnitUserGroupUid: string,
    orgCustomerId: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitUserGroupMember', {
      userId,
      orgUnitUserGroupUid,
      orgCustomerId,
    });
  }

  protected getOrgUnitUserGroupMembersEndpoint(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig | { orgCustomerId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitUserGroupMembers',
      { userId, orgUnitUserGroupUid },
      params
    );
  }

  protected getOrgUnitUserGroupOrderApprovalPermissionsEndpoint(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig | { orderApprovalPermissionCode: string }
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitUserGroupOrderApprovalPermissions',
      {
        userId,
        orgUnitUserGroupUid,
      },
      params
    );
  }

  protected getOrgUnitUserGroupsOrderApprovalPermissionEndpoint(
    userId: string,
    orgUnitUserGroupUid: string,
    orderApprovalPermissionCode: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitUserGroupOrderApprovalPermission', {
      userId,
      orgUnitUserGroupUid,
      orderApprovalPermissionCode,
    });
  }
}
