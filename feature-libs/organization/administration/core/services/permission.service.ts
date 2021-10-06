import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  EntitiesModel,
  OrderApprovalPermissionType,
  SearchConfig,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { Permission } from '../model/permission.model';
import { PermissionActions } from '../store/actions/index';
import { StateWithOrganization } from '../store/organization-state';
import {
  getPermission,
  getPermissionList,
  getPermissionState,
  getPermissionTypes,
  getPermissionValue,
} from '../store/selectors/permission.selector';
import { getItemStatus } from '../utils/get-item-status';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  loadPermission(permissionCode: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new PermissionActions.LoadPermission({
            userId,
            permissionCode,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadPermissions(params?: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new PermissionActions.LoadPermissions({ userId, params })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadPermissionTypes() {
    this.userIdService.takeUserId(true).subscribe(
      () => this.store.dispatch(new PermissionActions.LoadPermissionTypes()),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
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
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new PermissionActions.CreatePermission({ userId, permission })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  update(permissionCode: string, permission: Permission): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new PermissionActions.UpdatePermission({
            userId,
            permissionCode,
            permission,
          })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  getLoadingStatus(
    permissionCode: string
  ): Observable<OrganizationItemStatus<Permission>> {
    return getItemStatus(this.getPermission(permissionCode));
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
