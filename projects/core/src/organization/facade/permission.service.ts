import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { Permission } from '../../model/permission.model';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { PermissionActions } from '../store/actions/index';
import {
  getPermissionState,
  getPermissionList,
} from '../store/selectors/permission.selector';
import { B2BSearchConfig } from '../model/search-config';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';

@Injectable()
export class PermissionService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadPermission(permissionCode: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new PermissionActions.LoadPermission({ userId, permissionCode })
      )
    );
  }

  loadPermissions(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(
        new PermissionActions.LoadPermissions({ userId, params })
      )
    );
  }

  private getPermissionState(permissionCode: string) {
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

  create(permission: Permission) {
    this.withUserId(userId =>
      this.store.dispatch(
        new PermissionActions.CreatePermission({ userId, permission })
      )
    );
  }

  update(permissionCode: string, permission: Permission) {
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
    if (this.authService) {
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe(userId => callback(userId));
    } else {
      // TODO(issue:#5628) Deprecated since 1.3.0
      callback(OCC_USER_ID_CURRENT);
    }
  }
}
