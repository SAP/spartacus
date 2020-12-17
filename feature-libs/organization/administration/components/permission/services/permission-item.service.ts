import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { PermissionFormService } from '../form/permission-form.service';
import { CurrentPermissionService } from './current-permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionItemService extends ItemService<Permission> {
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
    return this.permissionService.getLoadingStatus(value.code);
  }

  protected create(
    value: Permission
  ): Observable<OrganizationItemStatus<Permission>> {
    this.permissionService.create(value);
    return this.permissionService.getLoadingStatus(value.code);
  }

  protected getDetailsRoute(): string {
    return 'orgPurchaseLimitDetails';
  }
}
