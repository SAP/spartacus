import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { B2BUserActions } from '../store/actions/index';
import { B2BSearchConfig } from '../model/search-config';
import { B2BUser } from '../../model/org-unit.model';
import {
  getB2BUserState,
  getUserList,
  getB2BUserPermissions,
  getB2BUserApprovers,
  getB2BUserUserGroups,
} from '../store/selectors/b2b-user.selector';
import { Permission } from '../../model/permission.model';

@Injectable()
export class B2BUserService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadB2BUser(orgCustomerId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUser({
          userId,
          orgCustomerId,
        })
      )
    );
  }

  loadB2BUsers(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(new B2BUserActions.LoadB2BUsers({ userId, params }))
    );
  }

  get(orgCustomerId: string): Observable<B2BUser> {
    return this.getB2BUserState(orgCustomerId).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadB2BUser(orgCustomerId);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getList(params: B2BSearchConfig): Observable<EntitiesModel<B2BUser>> {
    return this.getUserList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadB2BUsers(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<B2BUser>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  // create(orgCustomer: B2BUser) {
  //   this.withUserId(userId =>
  //     this.store.dispatch(
  //       new B2BUserActions.create .CreateOrgUnitUserGroup({
  //         userId,
  //         orgUnitUserGroup,
  //       })
  //     )
  //   );
  // }

  loadB2BUserApprovers(
    orgCustomerId: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUserApprovers({
          userId,
          orgCustomerId,
          params,
        })
      )
    );
  }

  getB2BUserApprovers(
    orgCustomerId: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<any>> {
    return this.getB2BUserApproverList(
      orgCustomerId,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<any>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadB2BUserApprovers(
            orgCustomerId,
            params
          );
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<any>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  assignApprover(orgCustomerId: string, approverId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.CreateB2BUserApprover({
          userId,
          orgCustomerId,
          approverId,
        })
      )
    );
  }

  unassignApprover(orgCustomerId: string, approverId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.DeleteB2BUserApprover({
          userId,
          orgCustomerId,
          approverId,
        })
      )
    );
  }

  loadB2BUserPermissions(
    orgCustomerId: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUserPermissions({
          userId,
          orgCustomerId,
          params,
        })
      )
    );
  }

  getB2BUserPermissions(
    orgCustomerId: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<any>> {
    return this.getB2BUserPermissionList(
      orgCustomerId,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<any>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadB2BUserPermissions(
            orgCustomerId,
            params
          );
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<any>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  assignPermission(orgCustomerId: string, permissionId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.CreateB2BUserPermission({
          userId,
          orgCustomerId,
          permissionId,
        })
      )
    );
  }

  unassignPermission(orgCustomerId: string, permissionId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.DeleteB2BUserPermission({
          userId,
          orgCustomerId,
          permissionId,
        })
      )
    );
  }

  loadB2BUserUserGroups(
    orgCustomerId: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        })
      )
    );
  }

  getB2BUserUserGroups(
    orgCustomerId: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<any>> {
    return this.getB2BUserUserGroupList(
      orgCustomerId,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<any>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadB2BUserUserGroups(
            orgCustomerId,
            params
          );
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<any>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  assignUserGroup(orgCustomerId: string, userGroupId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.CreateB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        })
      )
    );
  }

  unassignUserGroup(orgCustomerId: string, userGroupId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.DeleteB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        })
      )
    );
  }

  private getB2BUserApproverList(
    orgCustomerId: string,
    params
  ): Observable<LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(getB2BUserApprovers(orgCustomerId, params));
  }

  private getB2BUserPermissionList(
    orgCustomerId: string,
    params
  ): Observable<LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(getB2BUserPermissions(orgCustomerId, params));
  }

  private getB2BUserUserGroupList(
    orgCustomerId: string,
    params
  ): Observable<LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(getB2BUserUserGroups(orgCustomerId, params));
  }

  private getB2BUserState(
    orgCustomerId: string
  ): Observable<LoaderState<B2BUser>> {
    return this.store.select(getB2BUserState(orgCustomerId));
  }

  private getUserList(params): Observable<LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(getUserList(params));
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
