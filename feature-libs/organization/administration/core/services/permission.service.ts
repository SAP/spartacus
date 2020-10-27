import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthService,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, take, tap } from 'rxjs/operators';
import {
  OrderApprovalPermissionType,
  Permission,
} from '../model/permission.model';
import { PermissionActions } from '../store/actions/index';
import { StateWithOrganization } from '../store/organization-state';
import {
  getPermission,
  getPermissionList,
  getPermissionState,
  getPermissionTypes,
  getPermissionValue,
} from '../store/selectors/permission.selector';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { getItemStatus } from '../utils/get-item-status';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadPermission(permissionCode: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new PermissionActions.LoadPermission({
          userId,
          permissionCode,
        })
      )
    );
  }

  loadPermissions(params?: SearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new PermissionActions.LoadPermissions({ userId, params })
      )
    );
  }

  loadPermissionTypes() {
    this.store.dispatch(new PermissionActions.LoadPermissionTypes());
  }

  private getPermission(
    permissionCode: string
  ): Observable<StateUtils.LoaderState<Permission>> {
    return this.store.select(getPermission(permissionCode));
  }

  private getPermissionValue(permissionCode: string): Observable<Permission> {
    return this.store
      .select(getPermissionValue(permissionCode))
      .pipe(filter(Boolean));
  }

  private getPermissionList(
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(getPermissionList(params));
  }

  private getPermissionTypeList(): Observable<
    StateUtils.LoaderState<OrderApprovalPermissionType[]>
  > {
    return this.store.select(getPermissionTypes());
  }

  get(permissionCode: string): Observable<Permission> {
    const loading$ = this.getPermission(permissionCode).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadPermission(permissionCode);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getPermissionValue(permissionCode)
    );
  }

  getTypes(): Observable<OrderApprovalPermissionType[]> {
    return this.getPermissionTypeList().pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<OrderApprovalPermissionType[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadPermissionTypes();
        }
      }),
      filter(
        (process: StateUtils.LoaderState<OrderApprovalPermissionType[]>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  getList(params: SearchConfig): Observable<EntitiesModel<Permission>> {
    return this.getPermissionList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<Permission>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadPermissions(params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<Permission>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  create(permission: Permission): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new PermissionActions.CreatePermission({ userId, permission })
      )
    );
  }

  update(permissionCode: string, permission: Permission): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new PermissionActions.UpdatePermission({
          userId,
          permissionCode,
          permission,
        })
      )
    );
  }

  getLoadingStatus(
    permissionCode: string
  ): Observable<OrganizationItemStatus<Permission>> {
    return getItemStatus(this.getPermission(permissionCode));
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe((userId) => callback(userId));
  }

  private getPermissionState(
    code: string
  ): Observable<StateUtils.LoaderState<Permission>> {
    return this.store.select(getPermissionState(code));
  }

  getErrorState(permissionCode): Observable<boolean> {
    return this.getPermissionState(permissionCode).pipe(
      map((state) => state.error)
    );
  }
}
