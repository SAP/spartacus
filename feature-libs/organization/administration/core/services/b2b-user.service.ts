import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthService,
  B2BUser,
  B2BUserGroup,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, take, tap } from 'rxjs/operators';
import { OrganizationItemStatus } from '../model/organization-item-status';
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
  getB2BUserValue,
} from '../store/selectors/b2b-user.selector';
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

  private getB2BUserValue(orgCustomerId: string): Observable<B2BUser> {
    return this.store
      .select(getB2BUserValue(orgCustomerId))
      .pipe(filter(Boolean));
  }

  get(orgCustomerId: string): Observable<B2BUser> {
    const loading$ = this.getB2BUserState(orgCustomerId).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.load(orgCustomerId);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getB2BUserValue(orgCustomerId)
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

  /**
   * Get list of all roles for B2BUser sorted by increasing privileges.
   *
   * This list is not driven by the backend (lack of API), but reflects roles
   * from the backend: `b2badmingroup`, `b2bcustomergroup`, `b2bmanagergroup` and `b2bapprovergroup`.
   *
   * If you reconfigure those roles in the backend or extend the list, you should change
   * this implementation accordingly.
   */
  getAllRoles(): B2BUserGroup[] {
    return [
      B2BUserGroup.B2B_CUSTOMER_GROUP,
      B2BUserGroup.B2B_MANAGER_GROUP,
      B2BUserGroup.B2B_APPROVER_GROUP,
      B2BUserGroup.B2B_ADMIN_GROUP,
    ];
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
