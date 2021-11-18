import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  B2BUser,
  B2BUserRole,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';
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
  getB2BUserValue,
  getUserList,
} from '../store/selectors/b2b-user.selector';
import { getItemStatus } from '../utils/get-item-status';

@Injectable({ providedIn: 'root' })
export class B2BUserService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  load(orgCustomerId: string) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.LoadB2BUser({
            userId,
            orgCustomerId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadList(params?: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.LoadB2BUsers({ userId, params })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
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

  getErrorState(orgCustomerId): Observable<boolean> {
    return this.getB2BUserState(orgCustomerId).pipe(
      map((state) => state.error)
    );
  }

  create(orgCustomer: B2BUser): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.CreateB2BUser({
            userId,
            orgCustomer,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  update(orgCustomerId: string, orgCustomer: B2BUser): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.UpdateB2BUser({
            userId,
            orgCustomerId,
            orgCustomer,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  getLoadingStatus(
    orgCustomerId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    return getItemStatus(this.getB2BUserState(orgCustomerId));
  }

  loadApprovers(orgCustomerId: string, params: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.LoadB2BUserApprovers({
            userId,
            orgCustomerId,
            params,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
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
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.AssignB2BUserApprover({
            userId,
            orgCustomerId,
            approverId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  unassignApprover(orgCustomerId: string, approverId: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.UnassignB2BUserApprover({
            userId,
            orgCustomerId,
            approverId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadPermissions(orgCustomerId: string, params: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.LoadB2BUserPermissions({
            userId,
            orgCustomerId,
            params,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
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
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.AssignB2BUserPermission({
            userId,
            orgCustomerId,
            permissionId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  unassignPermission(orgCustomerId: string, permissionId: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.UnassignB2BUserPermission({
            userId,
            orgCustomerId,
            permissionId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadUserGroups(orgCustomerId: string, params: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.LoadB2BUserUserGroups({
            userId,
            orgCustomerId,
            params,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
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
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.AssignB2BUserUserGroup({
            userId,
            orgCustomerId,
            userGroupId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  unassignUserGroup(orgCustomerId: string, userGroupId: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new B2BUserActions.UnassignB2BUserUserGroup({
            userId,
            orgCustomerId,
            userGroupId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
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
  getAllRoles(): B2BUserRole[] {
    return [
      B2BUserRole.CUSTOMER,
      B2BUserRole.MANAGER,
      B2BUserRole.APPROVER,
      B2BUserRole.ADMIN,
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
}
