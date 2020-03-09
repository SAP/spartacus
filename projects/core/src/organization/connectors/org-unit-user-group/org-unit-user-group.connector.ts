import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel, User } from '../../../model/misc.model';
import { OrgUnitUserGroupAdapter } from './org-unit-user-group.adapter';
import { OrgUnitUserGroup, Permission } from 'projects/core/src/model';

@Injectable({
  providedIn: 'root',
})
export class OrgUnitUserGroupConnector {
  constructor(protected adapter: OrgUnitUserGroupAdapter) {}

  get(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<OrgUnitUserGroup> {
    return this.adapter.load(userId, orgUnitUserGroupUid);
  }

  getList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>> {
    return this.adapter.loadList(userId, params);
  }

  getAvailableOrderApprovalPermissions(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.adapter.loadAvailableOrderApprovalPermissions(
      userId,
      orgUnitUserGroupUid,
      params
    );
  }

  getAvailableOrgCustomers(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<User>> {
    return this.adapter.loadAvailableOrgCustomers(
      userId,
      orgUnitUserGroupUid,
      params
    );
  }

  create(
    userId: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup> {
    return this.adapter.create(userId, orgUnitUserGroup);
  }

  delete(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<OrgUnitUserGroup> {
    return this.adapter.delete(userId, orgUnitUserGroupUid);
  }

  update(
    userId: string,
    orgUnitUserGroupUid: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup> {
    return this.adapter.update(userId, orgUnitUserGroupUid, orgUnitUserGroup);
  }

  assignMember(
    userId: string,
    orgUnitUserGroupUid: string,
    orgCustomerId: string
  ): Observable<any> {
    return this.adapter.assignMember(
      userId,
      orgUnitUserGroupUid,
      orgCustomerId
    );
  }

  assignOrderApprovalPermission(
    userId: string,
    orgUnitUserGroupUid: string,
    orderApprovalPermissionCode: string
  ): Observable<any> {
    return this.adapter.assignOrderApprovalPermission(
      userId,
      orgUnitUserGroupUid,
      orderApprovalPermissionCode
    );
  }

  unassignMember(
    userId: string,
    orgUnitUserGroupUid: string,
    orgCustomerId: string
  ): Observable<any> {
    return this.adapter.unassignMember(
      userId,
      orgUnitUserGroupUid,
      orgCustomerId
    );
  }

  unassignAllMembers(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<any> {
    return this.adapter.unassignAllMembers(userId, orgUnitUserGroupUid);
  }

  unassignOrderApprovalPermission(
    userId: string,
    orgUnitUserGroupUid: string,
    orderApprovalPermissionCode: string
  ): Observable<any> {
    return this.adapter.unassignOrderApprovalPermission(
      userId,
      orgUnitUserGroupUid,
      orderApprovalPermissionCode
    );
  }
}
