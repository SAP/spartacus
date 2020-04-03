import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { UserGroupActions } from '../store/actions/index';
import { B2BSearchConfig } from '../model/search-config';
import { OrgUnitUserGroup } from '../../model/user-group.model';
import { Permission } from '../../model/permission.model';
import {
  getUserGroupState,
  getUserGroupList,
  getAvailableOrgCustomers,
  getAvailableOrderApprovalPermissions,
} from '../store/selectors/user-group.selector';
import { B2BUser } from '../../model';

@Injectable()
export class UserGroupService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadUserGroup(orgUnitUserGroupUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.LoadUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      )
    );
  }

  loadUserGroups(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.LoadUserGroups({ userId, params })
      )
    );
  }

  private getUserGroupState(
    orgUnitUserGroupUid: string
  ): Observable<LoaderState<OrgUnitUserGroup>> {
    return this.store.select(getUserGroupState(orgUnitUserGroupUid));
  }

  private getUserGroupList(
    params
  ): Observable<LoaderState<EntitiesModel<OrgUnitUserGroup>>> {
    return this.store.select(getUserGroupList(params));
  }

  private getAvailableOrgCustomersList(
    orgUnitUserGroupUid: string,
    params
  ): Observable<LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(
      getAvailableOrgCustomers(orgUnitUserGroupUid, params)
    );
  }

  private getAvailableOrderApprovalPermissionsList(
    orgUnitUserGroupUid: string,
    params
  ): Observable<LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(
      getAvailableOrderApprovalPermissions(orgUnitUserGroupUid, params)
    );
  }

  get(userGroupUid: string): Observable<OrgUnitUserGroup> {
    return this.getUserGroupState(userGroupUid).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadUserGroup(userGroupUid);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getList(
    params: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>> {
    return this.getUserGroupList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<OrgUnitUserGroup>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadUserGroups(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<OrgUnitUserGroup>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  create(orgUnitUserGroup: OrgUnitUserGroup) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.CreateUserGroup({
          userId,
          orgUnitUserGroup,
        })
      )
    );
  }

  update(orgUnitUserGroupUid: string, orgUnitUserGroup: OrgUnitUserGroup) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.UpdateUserGroup({
          userId,
          orgUnitUserGroupUid,
          orgUnitUserGroup,
        })
      )
    );
  }

  delete(orgUnitUserGroupUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.DeleteUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      )
    );
  }

  loadAvailableOrgCustomers(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.LoadAvailableOrgCustomers({
          userId,
          orgUnitUserGroupUid,
          params,
        })
      )
    );
  }

  loadAvailableOrderApprovalPermissions(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.LoadPermissions({
          userId,
          orgUnitUserGroupUid,
          params,
        })
      )
    );
  }

  getAvailableOrgCustomers(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.getAvailableOrgCustomersList(orgUnitUserGroupUid, params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadAvailableOrgCustomers(orgUnitUserGroupUid, params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<B2BUser>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  getAvailableOrderApprovalPermissions(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.getAvailableOrderApprovalPermissionsList(
      orgUnitUserGroupUid,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<Permission>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadAvailableOrderApprovalPermissions(
            orgUnitUserGroupUid,
            params
          );
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<Permission>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  assignMember(orgUnitUserGroupUid: string, customerId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.AssignMember({
          userId,
          orgUnitUserGroupUid,
          customerId,
        })
      )
    );
  }

  unassignMember(orgUnitUserGroupUid: string, customerId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.UnassignMember({
          userId,
          orgUnitUserGroupUid,
          customerId,
        })
      )
    );
  }

  unassignAllMembers(orgUnitUserGroupUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.UnassignAllMembers({
          userId,
          orgUnitUserGroupUid,
        })
      )
    );
  }

  assignPermission(orgUnitUserGroupUid: string, permissionUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.AssignPermission({
          userId,
          orgUnitUserGroupUid,
          permissionUid,
        })
      )
    );
  }

  unassignPermission(orgUnitUserGroupUid: string, permissionUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new UserGroupActions.UnassignPermission({
          userId,
          orgUnitUserGroupUid,
          permissionUid,
        })
      )
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
