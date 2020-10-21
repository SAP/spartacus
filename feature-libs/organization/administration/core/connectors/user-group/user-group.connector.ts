import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';
import { UserGroup } from '../../model/user-group.model';
import { UserGroupAdapter } from './user-group.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserGroupConnector {
  constructor(protected adapter: UserGroupAdapter) {}

  get(userId: string, userGroupId: string): Observable<UserGroup> {
    return this.adapter.load(userId, userGroupId);
  }

  getList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<UserGroup>> {
    return this.adapter.loadList(userId, params);
  }

  getAvailableOrderApprovalPermissions(
    userId: string,
    userGroupId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.adapter.loadAvailableOrderApprovalPermissions(
      userId,
      userGroupId,
      params
    );
  }

  getAvailableOrgCustomers(
    userId: string,
    userGroupId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.adapter.loadAvailableOrgCustomers(userId, userGroupId, params);
  }

  create(userId: string, userGroup: UserGroup): Observable<UserGroup> {
    return this.adapter.create(userId, userGroup);
  }

  delete(userId: string, userGroupId: string): Observable<UserGroup> {
    return this.adapter.delete(userId, userGroupId);
  }

  update(
    userId: string,
    userGroupId: string,
    userGroup: UserGroup
  ): Observable<UserGroup> {
    return this.adapter.update(userId, userGroupId, userGroup);
  }

  assignMember(
    userId: string,
    userGroupId: string,
    orgCustomerId: string
  ): Observable<any> {
    return this.adapter.assignMember(userId, userGroupId, orgCustomerId);
  }

  assignOrderApprovalPermission(
    userId: string,
    userGroupId: string,
    orderApprovalPermissionCode: string
  ): Observable<any> {
    return this.adapter.assignOrderApprovalPermission(
      userId,
      userGroupId,
      orderApprovalPermissionCode
    );
  }

  unassignMember(
    userId: string,
    userGroupId: string,
    orgCustomerId: string
  ): Observable<any> {
    return this.adapter.unassignMember(userId, userGroupId, orgCustomerId);
  }

  unassignAllMembers(userId: string, userGroupId: string): Observable<any> {
    return this.adapter.unassignAllMembers(userId, userGroupId);
  }

  unassignOrderApprovalPermission(
    userId: string,
    userGroupId: string,
    orderApprovalPermissionCode: string
  ): Observable<any> {
    return this.adapter.unassignOrderApprovalPermission(
      userId,
      userGroupId,
      orderApprovalPermissionCode
    );
  }
}
