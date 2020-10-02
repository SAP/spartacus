import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  Permission,
  PermissionService,
  OrganizationItemStatus,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { PermissionFormService } from '../form/permission-form.service';
import { CurrentPermissionService } from './current-permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionItemService extends OrganizationItemService<Permission> {
  constructor(
    protected currentItemService: CurrentPermissionService,
    protected routingService: RoutingService,
    protected formService: PermissionFormService,
    protected permissionService: PermissionService
  ) {
    super(currentItemService, routingService, formService);
  }

  load(code: string): Observable<Permission> {
    this.permissionService.loadPermission(code);
    return this.permissionService.get(code);
  }

  update(
    code,
    value: Permission
  ): Observable<OrganizationItemStatus<Permission>> {
    this.permissionService.update(code, value);
    return this.permissionService.getLoadingStatus(code);
  }

  protected create(value: Permission) {
    this.permissionService.create(value);
  }

  protected getDetailsRoute(): string {
    return 'permissionDetails';
  }
}
