import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Permission, PermissionService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-permission-edit',
  templateUrl: './permission-edit.component.html',
})
export class PermissionEditComponent implements OnInit {
  permission$: Observable<Permission>;
  permissionCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected permissionsService: PermissionService
  ) {}

  ngOnInit(): void {
    console.log('permission');
    this.permission$ = this.permissionCode$.pipe(
      tap(code => this.permissionsService.loadPermission(code)),
      switchMap(code => this.permissionsService.get(code))
    );
  }

  updatePermission(permission: Permission) {
    this.permissionCode$
      .pipe(take(1))
      .subscribe(permissionCode =>
        this.permissionsService.update(permissionCode, permission)
      );
    this.routingService.go({
      cxRoute: 'permissionDetails',
      params: permission,
    });
  }
}
