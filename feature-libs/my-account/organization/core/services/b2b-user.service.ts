import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthService,
  B2BUser,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { Permission } from '../model/permission.model';
import { UserGroup } from '../model/user-group.model';
import { B2BUserActions } from '../store/actions/index';
import { StateWithOrganization } from '../store/organization-state';
import {
  getB2BUserApprovers,
  getB2BUserPermissions,
  getB2BUserState,
  getB2BUserUserGroups,
  getUserList,
} from '../store/selectors/b2b-user.selector';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { getItemStatus } from '../utils/get-item-status';

@Injectable({ providedIn: 'root' })
export class B2BUserService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  load(orgCustomerId: string) {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUser({
          userId,
          orgCustomerId,
        })
      )
    );
  }

  loadList(params?: SearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(new B2BUserActions.LoadB2BUsers({ userId, params }))
    );
  }

  get(orgCustomerId: string): Observable<B2BUser> {
    return this.getB2BUserState(orgCustomerId).pipe(
      observeOn(queueScheduler),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.load(orgCustomerId);
        }
      }),
      filter((state) => state.success || state.error),
      map((state) => state.value)
    );
  }

  getList(params: SearchConfig): Observable<EntitiesModel<B2BUser>> {
    return this.getUserList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadList(params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  create(orgCustomer: B2BUser): void {
    delete orgCustomer.isAssignedToApprovers;

    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.CreateB2BUser({
          userId,
          orgCustomer,
        })
      )
    );
  }

  update(orgCustomerId: string, orgCustomer: B2BUser): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.UpdateB2BUser({
          userId,
          orgCustomerId,
          orgCustomer,
        })
      )
    );
  }

  getLoadingStatus(
    orgCustomerId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    return getItemStatus(this.getB2BUserState(orgCustomerId));
  }

  loadApprovers(orgCustomerId: string, params: SearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUserApprovers({
          userId,
          orgCustomerId,
          params,
        })
      )
    );
  }

  getApprovers(
    orgCustomerId: string,
    params: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.getB2BUserApproverList(orgCustomerId, params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadApprovers(orgCustomerId, params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  assignApprover(orgCustomerId: string, approverId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.CreateB2BUserApprover({
          userId,
          orgCustomerId,
          approverId,
        })
      )
    );
  }

  unassignApprover(orgCustomerId: string, approverId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.DeleteB2BUserApprover({
          userId,
          orgCustomerId,
          approverId,
        })
      )
    );
  }

  loadPermissions(orgCustomerId: string, params: SearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUserPermissions({
          userId,
          orgCustomerId,
          params,
        })
      )
    );
  }

  getPermissions(
    orgCustomerId: string,
    params: SearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.getB2BUserPermissionList(orgCustomerId, params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<Permission>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadPermissions(orgCustomerId, params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<Permission>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  assignPermission(orgCustomerId: string, permissionId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.CreateB2BUserPermission({
          userId,
          orgCustomerId,
          permissionId,
        })
      )
    );
  }

  unassignPermission(orgCustomerId: string, permissionId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.DeleteB2BUserPermission({
          userId,
          orgCustomerId,
          permissionId,
        })
      )
    );
  }

  loadUserGroups(orgCustomerId: string, params: SearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        })
      )
    );
  }

  getUserGroups(
    orgCustomerId: string,
    params: SearchConfig
  ): Observable<EntitiesModel<UserGroup>> {
    return this.getB2BUserUserGroupList(orgCustomerId, params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<UserGroup>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadUserGroups(orgCustomerId, params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<UserGroup>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  assignUserGroup(orgCustomerId: string, userGroupId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.CreateB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        })
      )
    );
  }

  unassignUserGroup(orgCustomerId: string, userGroupId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new B2BUserActions.DeleteB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        })
      )
    );
  }

  getB2BUserRoles() {
    // TODO: get the roles via the roles endpoint when they are available
    const roles = [
      { name: 'buyer', id: 'b2bcustomergroup', selected: false },
      { name: 'manager', id: 'b2bmanagergroup', selected: false },
      { name: 'approver', id: 'b2bapprovergroup', selected: false },
      { name: 'administrator', id: 'b2badmingroup', selected: false },
    ];

    return roles;
  }

  private getB2BUserApproverList(
    orgCustomerId: string,
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(getB2BUserApprovers(orgCustomerId, params));
  }

  private getB2BUserPermissionList(
    orgCustomerId: string,
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(getB2BUserPermissions(orgCustomerId, params));
  }

  private getB2BUserUserGroupList(
    orgCustomerId: string,
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<UserGroup>>> {
    return this.store.select(getB2BUserUserGroups(orgCustomerId, params));
  }

  private getB2BUserState(
    orgCustomerId: string
  ): Observable<StateUtils.LoaderState<B2BUser>> {
    return this.store.select(getB2BUserState(orgCustomerId));
  }

  private getUserList(
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(getUserList(params));
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe((userId) => callback(userId));
  }
}
