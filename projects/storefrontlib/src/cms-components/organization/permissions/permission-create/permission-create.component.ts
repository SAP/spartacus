import { Component } from '@angular/core';
import { PermissionService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-permission-create',
  templateUrl: './permission-create.component.html',
})
export class PermissionCreateComponent {
  constructor(
    protected permissionService: PermissionService,
    protected routingService: RoutingService
  ) {}

  createPermission(permission) {
    this.permissionService.create(permission);
    this.routingService.go({
      cxRoute: 'permissionDetails',
      params: permission,
    });
  }
}
