import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import {
  Permission,
  OrderApprovalPermissionType,
} from '../../model/permission.model';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { PermissionActions } from '../store/actions/index';
import {
  getPermissionState,
  getPermissionList,
} from '../store/selectors/permission.selector';
import { B2BSearchConfig } from '../model/search-config';

@Injectable()
export class PermissionService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadPermission(permissionCode: string): void {
    this.withUserId(userId =>
      this.store.dispatch(
        new PermissionActions.LoadPermission({
          userId,
          permissionCode,
        })
      )
    );
  }

  loadPermissions(params?: B2BSearchConfig): void {
    this.withUserId(userId =>
      this.store.dispatch(
        new PermissionActions.LoadPermissions({ userId, params })
      )
    );
  }

  private getPermissionState(
    permissionCode: string
  ): Observable<LoaderState<Permission>> {
    return this.store.select(getPermissionState(permissionCode));
  }

  private getPermissionList(
    params
  ): Observable<LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(getPermissionList(params));
  }

  get(permissionCode: string): Observable<Permission> {
    return this.getPermissionState(permissionCode).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadPermission(permissionCode);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getTypes(): Observable<OrderApprovalPermissionType[]> {
    // Todo: update after #6391 & #6392
    return of([
      {
        code: 'B2BOrderThresholdPermission',
        name: 'Allowed Order Threshold (per order)',
      },
      {
        code: 'B2BBudgetExceededPermission',
        name: 'Budget Exceeded Permission',
      },
      {
        code: 'B2BOrderThresholdTimespanPermission',
        name: 'Allowed Order Threshold (per timespan)',
      },
    ]);
  }

  getList(params: B2BSearchConfig): Observable<EntitiesModel<Permission>> {
    return this.getPermissionList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<Permission>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadPermissions(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<Permission>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  create(permission: Permission): void {
    this.withUserId(userId =>
      this.store.dispatch(
        new PermissionActions.CreatePermission({ userId, permission })
      )
    );
  }

  update(permissionCode: string, permission: Permission): void {
    this.withUserId(userId =>
      this.store.dispatch(
        new PermissionActions.UpdatePermission({
          userId,
          permissionCode,
          permission,
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
