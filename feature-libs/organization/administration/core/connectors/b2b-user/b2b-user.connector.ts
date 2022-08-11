import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';
import { UserGroup } from '../../model/user-group.model';
import { B2BUserAdapter } from './b2b-user.adapter';

@Injectable({
  providedIn: 'root',
})
export class B2BUserConnector {
  constructor(protected adapter: B2BUserAdapter) {}

  get(userId: string, orgUnitCustomerId: string): Observable<B2BUser> {
    return this.adapter.load(userId, orgUnitCustomerId);
  }

  create(userId: string, orgCustomer: B2BUser): Observable<B2BUser> {
    return this.adapter.create(userId, orgCustomer);
  }

  update(
    userId: string,
    orgCustomerId: string,
    orgCustomer: B2BUser
  ): Observable<B2BUser> {
    return this.adapter.update(userId, orgCustomerId, orgCustomer);
  }

  getList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.adapter.loadList(userId, params);
  }

  getApprovers(
    userId: string,
    orgUnitCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.adapter.loadApprovers(userId, orgUnitCustomerId, params);
  }

  assignApprover(
    userId: string,
    orgCustomerId: string,
    approverId: string
  ): Observable<any> {
    return this.adapter.assignApprover(userId, orgCustomerId, approverId);
  }

  unassignApprover(
    userId: string,
    orgCustomerId: string,
    approverId: string
  ): Observable<any> {
    return this.adapter.unassignApprover(userId, orgCustomerId, approverId);
  }

  getPermissions(
    userId: string,
    orgUnitCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.adapter.loadPermissions(userId, orgUnitCustomerId, params);
  }

  assignPermission(
    userId: string,
    orgCustomerId: string,
    permissionId: string
  ): Observable<any> {
    return this.adapter.assignPermission(userId, orgCustomerId, permissionId);
  }

  unassignPermission(
    userId: string,
    orgCustomerId: string,
    permissionId: string
  ): Observable<any> {
    return this.adapter.unassignPermission(userId, orgCustomerId, permissionId);
  }

  getUserGroups(
    userId: string,
    orgUnitCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<UserGroup>> {
    return this.adapter.loadUserGroups(userId, orgUnitCustomerId, params);
  }

  assignUserGroup(
    userId: string,
    orgCustomerId: string,
    userGroupId: string
  ): Observable<any> {
    return this.adapter.assignUserGroup(userId, orgCustomerId, userGroupId);
  }

  unassignUserGroup(
    userId: string,
    orgCustomerId: string,
    userGroupId: string
  ): Observable<any> {
    return this.adapter.unassignUserGroup(userId, orgCustomerId, userGroupId);
  }
}
