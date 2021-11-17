import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  B2BUser,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';
import { Budget } from '../model/budget.model';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { Permission } from '../model/permission.model';
import { UserGroup } from '../model/user-group.model';
import { UserGroupActions } from '../store/actions/index';
import { StateWithOrganization } from '../store/organization-state';
import {
  getAvailableOrderApprovalPermissions,
  getAvailableOrgCustomers,
  getUserGroup,
  getUserGroupList,
  getUserGroupState,
  getUserGroupValue,
} from '../store/selectors/user-group.selector';
import { getItemStatus } from '../utils/get-item-status';

@Injectable({ providedIn: 'root' })
export class UserGroupService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  load(userGroupId: string) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.LoadUserGroup({
            userId,
            userGroupId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadList(params?: SearchConfig) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.LoadUserGroups({ userId, params })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  private getUserGroup(
    userGroupId: string
  ): Observable<StateUtils.LoaderState<UserGroup>> {
    return this.store.select(getUserGroup(userGroupId));
  }

  private getUserGroupValue(userGroupId: string): Observable<Budget> {
    return this.store
      .select(getUserGroupValue(userGroupId))
      .pipe(filter(Boolean));
  }

  private getUserGroupList(
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<UserGroup>>> {
    return this.store.select(getUserGroupList(params));
  }

  private getAvailableOrgCustomersList(
    userGroupId: string,
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(getAvailableOrgCustomers(userGroupId, params));
  }

  private getAvailableOrderApprovalPermissionsList(
    userGroupId: string,
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(
      getAvailableOrderApprovalPermissions(userGroupId, params)
    );
  }

  get(userGroupUid: string): Observable<UserGroup> {
    const loading$ = this.getUserGroup(userGroupUid).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.load(userGroupUid);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getUserGroupValue(userGroupUid)
    );
  }

  getList(params: SearchConfig): Observable<EntitiesModel<UserGroup>> {
    return this.getUserGroupList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<UserGroup>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadList(params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<UserGroup>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  create(userGroup: UserGroup) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.CreateUserGroup({
            userId,
            userGroup,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  update(userGroupId: string, userGroup: UserGroup) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.UpdateUserGroup({
            userId,
            userGroupId,
            userGroup,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  getLoadingStatus(
    budgetCode: string
  ): Observable<OrganizationItemStatus<UserGroup>> {
    return getItemStatus(this.getUserGroup(budgetCode));
  }

  delete(userGroupId: string) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.DeleteUserGroup({
            userId,
            userGroupId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadAvailableOrgCustomers(userGroupId: string, params: SearchConfig) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.LoadAvailableOrgCustomers({
            userId,
            userGroupId,
            params,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadAvailableOrderApprovalPermissions(
    userGroupId: string,
    params: SearchConfig
  ) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.LoadPermissions({
            userId,
            userGroupId,
            params,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  getAvailableOrgCustomers(
    userGroupId: string,
    params: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.getAvailableOrgCustomersList(userGroupId, params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadAvailableOrgCustomers(userGroupId, params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  getAvailableOrderApprovalPermissions(
    userGroupId: string,
    params: SearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.getAvailableOrderApprovalPermissionsList(
      userGroupId,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<Permission>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadAvailableOrderApprovalPermissions(userGroupId, params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<Permission>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  assignMember(userGroupId: string, customerId: string) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.AssignMember({
            userId,
            userGroupId,
            customerId,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  unassignMember(userGroupId: string, customerId: string) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.UnassignMember({
            userId,
            userGroupId,
            customerId,
          })
        ),
      () => {}
    );
  }

  unassignAllMembers(userGroupId: string) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.UnassignAllMembers({
            userId,
            userGroupId,
          })
        ),
      () => {}
    );
  }

  assignPermission(userGroupId: string, permissionUid: string) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.AssignPermission({
            userId,
            userGroupId,
            permissionUid,
          })
        ),
      () => {}
    );
  }

  unassignPermission(userGroupId: string, permissionUid: string) {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new UserGroupActions.UnassignPermission({
            userId,
            userGroupId,
            permissionUid,
          })
        ),
      () => {}
    );
  }

  private getUserGroupState(
    code: string
  ): Observable<StateUtils.LoaderState<UserGroup>> {
    return this.store.select(getUserGroupState(code));
  }

  getErrorState(code): Observable<boolean> {
    return this.getUserGroupState(code).pipe(map((state) => state.error));
  }
}
