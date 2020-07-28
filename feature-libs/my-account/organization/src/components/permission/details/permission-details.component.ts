import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService, Permission } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-permission-details',
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionDetailsComponent {
  protected code$: Observable<string> = this.route.params.pipe(
    map((params) => params['code']),
    filter((code) => Boolean(code))
  );

  permission$: Observable<Permission> = this.code$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.permissionService.loadPermission(code)),
    switchMap((code) => this.permissionService.get(code)),
    filter((permissions) => Boolean(permissions))
  );

  constructor(
    protected route: ActivatedRoute,
    protected permissionService: PermissionService
  ) {}

  update(permission: Permission) {
    this.permissionService.update(permission.code, permission);
  }
}
