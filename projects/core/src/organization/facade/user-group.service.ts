import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { OrgUnitUserGroupActions } from '../store/actions/index';
import { B2BSearchConfig } from '../model/search-config';
import { OrgUnitUserGroup } from '../../model/user-group.model';
import { Permission } from '../../model/permission.model';
import {
  getOrgUnitUserGroupState,
  getOrgUnitUserGroupList,
  getOrgUnitUserGroupAvailableOrgCustomers,
  getOrgUnitUserGroupAvailableOrderApprovalPermissions,
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
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      )
    );
  }

  loadUserGroups(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({ userId, params })
      )
    );
  }

  private getUserGroupState(
    orgUnitUserGroupUid: string
  ): Observable<LoaderState<OrgUnitUserGroup>> {
    return this.store.select(getOrgUnitUserGroupState(orgUnitUserGroupUid));
  }

  private getUserGroupList(
    params
  ): Observable<LoaderState<EntitiesModel<OrgUnitUserGroup>>> {
    return this.store.select(getOrgUnitUserGroupList(params));
  }

  private getUserGroupAvailableOrgCustomersList(
    orgUnitUserGroupUid: string,
    params
  ): Observable<LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(
      getOrgUnitUserGroupAvailableOrgCustomers(orgUnitUserGroupUid, params)
    );
  }

  private getGroupAvailableOrderApprovalPermissionsList(
    orgUnitUserGroupUid: string,
    params
  ): Observable<LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(
      getOrgUnitUserGroupAvailableOrderApprovalPermissions(
        orgUnitUserGroupUid,
        params
      )
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
        new OrgUnitUserGroupActions.CreateOrgUnitUserGroup({
          userId,
          orgUnitUserGroup,
        })
      )
    );
  }

  update(orgUnitUserGroupUid: string, orgUnitUserGroup: OrgUnitUserGroup) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.UpdateOrgUnitUserGroup({
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
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      )
    );
  }

  loadUserGroupAvailableOrgCustomers(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomers({
          userId,
          orgUnitUserGroupUid,
          params,
        })
      )
    );
  }

  loadUserGroupAvailableOrderApprovalPermissions(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissions(
          {
            userId,
            orgUnitUserGroupUid,
            params,
          }
        )
      )
    );
  }

  getUserGroupAvailableOrgCustomers(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.getUserGroupAvailableOrgCustomersList(
      orgUnitUserGroupUid,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadUserGroupAvailableOrgCustomers(orgUnitUserGroupUid, params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<B2BUser>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  getUserGroupAvailableOrderApprovalPermissions(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.getGroupAvailableOrderApprovalPermissionsList(
      orgUnitUserGroupUid,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<Permission>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadUserGroupAvailableOrderApprovalPermissions(
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
        new OrgUnitUserGroupActions.CreateOrgUnitUserGroupMember({
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
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMember({
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
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMembers({
          userId,
          orgUnitUserGroupUid,
        })
      )
    );
  }

  assignPermission(orgUnitUserGroupUid: string, permissionUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermission(
          {
            userId,
            orgUnitUserGroupUid,
            permissionUid,
          }
        )
      )
    );
  }

  unassignPermission(orgUnitUserGroupUid: string, permissionUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermission(
          {
            userId,
            orgUnitUserGroupUid,
            permissionUid,
          }
        )
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
